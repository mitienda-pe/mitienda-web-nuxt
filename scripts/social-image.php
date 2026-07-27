<?php
/**
 * Genera imagen social: ilustración base (sin texto) + titular + logo.
 *
 * Layouts:
 *   --layout=overlay  (default) Horizontal 1200x675, franja blanca sobre la imagen.
 *   --layout=stack    Vertical 1080x1350 (4:5), imagen arriba y texto abajo.
 *
 * Uso:
 *   php scripts/social-image.php \
 *     --base=ilustracion.jpg \
 *     --title="¿Qué es un ERP para ecommerce?" \
 *     --logo=public/img/logo-mitienda.png \
 *     --font=scripts/fonts/Inter_18pt-Bold.ttf \
 *     --layout=stack \
 *     --out=social.jpg
 *
 * Requiere PHP 8 con extensión GD (php-gd) y soporte FreeType.
 * Logo: SVG directo si php-imagick está instalado; si no, PNG transparente.
 */

$opts = getopt('', ['base:', 'title:', 'logo:', 'font:', 'out:', 'layout::', 'width::', 'height::']);
foreach (['base', 'title', 'logo', 'font', 'out'] as $req) {
    if (empty($opts[$req])) {
        fwrite(STDERR, "Falta el parámetro --$req\n");
        exit(1);
    }
}
$layout = $opts['layout'] ?? 'overlay';

// Colores de marca (variables.css)
const TEXT_DARK = [0x29, 0x3f, 0x54]; // --text-dark
const PRIMARY   = [0x00, 0xb2, 0xa6]; // --primary-color

function loadLogo(string $path): GdImage
{
    if (strtolower(pathinfo($path, PATHINFO_EXTENSION)) === 'svg') {
        if (!class_exists('Imagick')) {
            fwrite(STDERR, "Para usar SVG instala php-imagick, o exporta el logo a PNG.\n");
            exit(1);
        }
        $im = new Imagick();
        $im->setBackgroundColor(new ImagickPixel('transparent'));
        $im->readImage($path);
        $im->setImageFormat('png32');
        $im->resizeImage(880, 0, Imagick::FILTER_LANCZOS, 1);
        $gd = imagecreatefromstring($im->getImageBlob());
        $im->destroy();
        return $gd;
    }
    return imagecreatefrompng($path);
}

/** Parte el título en líneas que quepan en $maxW; reduce el tamaño si el bloque excede $maxBlockH. */
function fitText(string $title, string $font, int $maxW, int $maxBlockH, int $startSize = 56): array
{
    $fontSize = $startSize;
    do {
        $lines = [];
        $line = '';
        foreach (preg_split('/\s+/u', $title) as $word) {
            $test = $line === '' ? $word : "$line $word";
            $box = imagettfbbox($fontSize, 0, $font, $test);
            if (($box[2] - $box[0]) > $maxW && $line !== '') {
                $lines[] = $line;
                $line = $word;
            } else {
                $line = $test;
            }
        }
        $lines[] = $line;
        $lineH = (int)($fontSize * 1.35);
        $blockH = count($lines) * $lineH;
        if ($blockH > $maxBlockH) $fontSize -= 4;
    } while ($blockH > $maxBlockH && $fontSize > 24);
    return [$lines, $fontSize, $lineH, $blockH];
}

/** Copia $src escalada para cubrir (cover) el rectángulo destino WxH en $dst desde (0,$dstY). */
function coverCopy(GdImage $dst, GdImage $src, int $W, int $H, int $dstY = 0): void
{
    $sw = imagesx($src); $sh = imagesy($src);
    $scale = max($W / $sw, $H / $sh);
    $tw = (int)round($sw * $scale); $th = (int)round($sh * $scale);
    imagecopyresampled($dst, $src, (int)(($W - $tw) / 2), $dstY + (int)(($H - $th) / 2), 0, 0, $tw, $th, $sw, $sh);
}

$src  = imagecreatefromstring(file_get_contents($opts['base']));
$logo = loadLogo($opts['logo']);
$font = $opts['font'];

if ($layout === 'stack') {
    // ---- Vertical 4:5: texto arriba, imagen al centro, logo abajo ----
    $W = (int)($opts['width'] ?? 1080);
    $H = (int)($opts['height'] ?? 1350);
    $canvas = imagecreatetruecolor($W, $H);
    $white = imagecolorallocate($canvas, 255, 255, 255);
    imagefill($canvas, 0, 0, $white);

    $dark = imagecolorallocate($canvas, ...TEXT_DARK);
    $pad = 80;

    // Titular arriba, centrado
    [$lines, $fontSize, $lineH, $blockH] = fitText($opts['title'], $font, $W - $pad * 2, (int)($H * 0.25), 72);
    $y = $pad + $fontSize;
    foreach ($lines as $l) {
        $box = imagettfbbox($fontSize, 0, $font, $l);
        $x = (int)(($W - ($box[2] - $box[0])) / 2);
        imagettftext($canvas, $fontSize, 0, $x, $y, $dark, $font, $l);
        $y += $lineH;
    }
    $textBottom = $pad + $blockH;

    // Logo centrado abajo
    $logoTargetW = 260;
    $logoTargetH = (int)(imagesy($logo) * $logoTargetW / imagesx($logo));
    $logoTop = $H - $logoTargetH - $pad;
    imagecopyresampled(
        $canvas, $logo,
        (int)(($W - $logoTargetW) / 2), $logoTop,
        0, 0, $logoTargetW, $logoTargetH, imagesx($logo), imagesy($logo)
    );

    // Imagen al centro, ancho completo conservando proporción, centrada en el espacio libre
    $availTop = $textBottom + $pad;
    $availH = $logoTop - $pad - $availTop;
    $imgH = min((int)round($W * imagesy($src) / imagesx($src)), $availH);
    $imgW = ($imgH < $availH) ? $W : (int)round($availH * imagesx($src) / imagesy($src));
    $sw = imagesx($src); $sh = imagesy($src);
    imagecopyresampled(
        $canvas, $src,
        (int)(($W - $imgW) / 2), $availTop + (int)(($availH - $imgH) / 2),
        0, 0, $imgW, $imgH, $sw, $sh
    );
} else {
    // ---- Horizontal 16:9: franja blanca sobre la imagen ----
    $W = (int)($opts['width'] ?? 1200);
    $H = (int)($opts['height'] ?? 675);
    $canvas = imagecreatetruecolor($W, $H);
    coverCopy($canvas, $src, $W, $H, 0);

    $panelW = (int)($W * 0.52);
    $overlay = imagecreatetruecolor($panelW, $H);
    $white = imagecolorallocate($overlay, 255, 255, 255);
    imagefill($overlay, 0, 0, $white);
    imagecopymerge($canvas, $overlay, 0, 0, 0, 0, $panelW, $H, 88);

    $dark = imagecolorallocate($canvas, ...TEXT_DARK);
    [$lines, $fontSize, $lineH, $blockH] = fitText($opts['title'], $font, $panelW - 120, (int)($H * 0.55), 56);
    $y = (int)(($H - $blockH) / 2) + $fontSize;
    foreach ($lines as $l) {
        imagettftext($canvas, $fontSize, 0, 60, $y, $dark, $font, $l);
        $y += $lineH;
    }

    $logoTargetW = 220;
    $logoTargetH = (int)(imagesy($logo) * $logoTargetW / imagesx($logo));
    imagecopyresampled($canvas, $logo, 60, $H - $logoTargetH - 50, 0, 0, $logoTargetW, $logoTargetH, imagesx($logo), imagesy($logo));
}

imagejpeg($canvas, $opts['out'], 90);
echo "OK → {$opts['out']} ({$W}x{$H}, layout: $layout)\n";
