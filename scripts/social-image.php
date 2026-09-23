<?php
/**
 * Genera imagen social: ilustración base (sin texto) + titular + logo.
 *
 * Layouts:
 *   --layout=overlay      (default) Horizontal 1200x675, franja blanca sobre la imagen.
 *   --layout=stack        Vertical 1080x1350 (4:5), imagen arriba y texto abajo.
 *   --layout=infographic  Vertical 1080x1350 (4:5), cabecera de color + lista numerada de puntos.
 *
 * Uso (stack / overlay):
 *   php scripts/social-image.php \
 *     --base=ilustracion.jpg \
 *     --title="¿Qué es un ERP para ecommerce?" \
 *     --logo=public/img/logo-mitienda.png \
 *     --font=scripts/fonts/Inter_18pt-Bold.ttf \
 *     --layout=stack \
 *     --out=social.jpg
 *
 * Uso (infographic):
 *   php scripts/social-image.php \
 *     --title="6 tareas que deberías automatizar" \
 *     --kicker="GUÍA MITIENDA" \
 *     --items="Correos de carrito abandonado||Guías de envío con tu courier||Facturación electrónica automática" \
 *     --logo=public/img/logo-mitienda.png \
 *     --font=scripts/fonts/Inter_18pt-Bold.ttf \
 *     --layout=infographic \
 *     --out=social.jpg
 *
 *   En infographic, --base es opcional (se ignora) y --items es obligatorio.
 *   Separador de items: "||". Máximo recomendado: 6 items.
 *
 * Requiere PHP 8 con extensión GD (php-gd) y soporte FreeType.
 * Logo: SVG directo si php-imagick está instalado; si no, PNG transparente.
 */

$opts = getopt('', ['base::', 'title::', 'logo:', 'font:', 'out:', 'layout::', 'width::', 'height::', 'items::', 'kicker::', 'logo-width::']);
$layout = $opts['layout'] ?? 'overlay';

$required = ['logo', 'font', 'out'];
if ($layout === 'infographic')  { $required[] = 'items'; $required[] = 'title'; }
elseif ($layout === 'poster')   { $required[] = 'base'; }   // el texto ya viene en la imagen
else                            { $required[] = 'base'; $required[] = 'title'; }

foreach ($required as $req) {
    if (empty($opts[$req])) {
        fwrite(STDERR, "Falta el parámetro --$req\n");
        exit(1);
    }
}

// Colores de marca (variables.css)
const TEXT_DARK    = [0x29, 0x3f, 0x54]; // --text-dark
const PRIMARY      = [0x00, 0xb2, 0xa6]; // --primary-color
const PRIMARY_DARK = [0x00, 0x7d, 0x74]; // --primary-hover
const CARD_BG      = [0xf1, 0xfa, 0xf9]; // teal muy claro

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
        $lines = wrapLines($title, $font, $fontSize, $maxW);
        $lineH = (int)($fontSize * 1.35);
        $blockH = count($lines) * $lineH;
        if ($blockH > $maxBlockH) $fontSize -= 4;
    } while ($blockH > $maxBlockH && $fontSize > 24);
    return [$lines, $fontSize, $lineH, $blockH];
}

/** Envuelve $text en líneas que quepan en $maxW al tamaño $size. */
function wrapLines(string $text, string $font, int $size, int $maxW): array
{
    $lines = [];
    $line = '';
    foreach (preg_split('/\s+/u', trim($text)) as $word) {
        $test = $line === '' ? $word : "$line $word";
        $box = imagettfbbox($size, 0, $font, $test);
        if (($box[2] - $box[0]) > $maxW && $line !== '') {
            $lines[] = $line;
            $line = $word;
        } else {
            $line = $test;
        }
    }
    $lines[] = $line;
    return $lines;
}

function textW(string $text, string $font, int $size): int
{
    $box = imagettfbbox($size, 0, $font, $text);
    return $box[2] - $box[0];
}

/** Rectángulo con esquinas redondeadas. */
function roundedRect(GdImage $im, int $x1, int $y1, int $x2, int $y2, int $r, int $color): void
{
    imagefilledrectangle($im, $x1 + $r, $y1, $x2 - $r, $y2, $color);
    imagefilledrectangle($im, $x1, $y1 + $r, $x2, $y2 - $r, $color);
    imagefilledellipse($im, $x1 + $r, $y1 + $r, $r * 2, $r * 2, $color);
    imagefilledellipse($im, $x2 - $r, $y1 + $r, $r * 2, $r * 2, $color);
    imagefilledellipse($im, $x1 + $r, $y2 - $r, $r * 2, $r * 2, $color);
    imagefilledellipse($im, $x2 - $r, $y2 - $r, $r * 2, $r * 2, $color);
}

/** Copia $src escalada para cubrir (cover) el rectángulo destino WxH en $dst desde (0,$dstY). */
function coverCopy(GdImage $dst, GdImage $src, int $W, int $H, int $dstY = 0): void
{
    $sw = imagesx($src); $sh = imagesy($src);
    $scale = max($W / $sw, $H / $sh);
    $tw = (int)round($sw * $scale); $th = (int)round($sh * $scale);
    imagecopyresampled($dst, $src, (int)(($W - $tw) / 2), $dstY + (int)(($H - $th) / 2), 0, 0, $tw, $th, $sw, $sh);
}

$src  = !empty($opts['base']) ? imagecreatefromstring(file_get_contents($opts['base'])) : null;
$logo = loadLogo($opts['logo']);
$font = $opts['font'];

if ($layout === 'poster') {
    // ---- Poster IA: recorta a 4:5 desde arriba y estampa el logo en el margen inferior ----
    $W = (int)($opts['width'] ?? 1080);
    $H = (int)($opts['height'] ?? 1350);

    $canvas = imagecreatetruecolor($W, $H);
    $sw = imagesx($src); $sh = imagesy($src);

    // Escalar al ancho y anclar arriba (el margen vacío queda abajo)
    $tw = $W;
    $th = (int)round($sh * $W / $sw);
    if ($th < $H) { $th = $H; $tw = (int)round($sw * $H / $sh); }
    imagecopyresampled($canvas, $src, (int)(($W - $tw) / 2), 0, 0, 0, $tw, $th, $sw, $sh);

    // Logo centrado en el margen inferior
    $logoTargetW = (int)($opts['logo-width'] ?? 240);
    $logoTargetH = (int)(imagesy($logo) * $logoTargetW / imagesx($logo));
    $logoTop = $H - $logoTargetH - 64;
    imagecopyresampled(
        $canvas, $logo,
        (int)(($W - $logoTargetW) / 2), $logoTop,
        0, 0, $logoTargetW, $logoTargetH, imagesx($logo), imagesy($logo)
    );
} elseif ($layout === 'infographic') {
    // ---- Vertical 4:5: cabecera de color + lista numerada ----
    $W = (int)($opts['width'] ?? 1080);
    $H = (int)($opts['height'] ?? 1350);

    $items = array_values(array_filter(array_map('trim', explode('||', $opts['items'])), 'strlen'));
    if (!$items) { fwrite(STDERR, "--items está vacío\n"); exit(1); }

    // Supersampling x2 para bordes y círculos suaves
    $SS = 2;
    $CW = $W * $SS; $CH = $H * $SS;
    $s = fn(int|float $n): int => (int)round($n * $SS);

    $canvas = imagecreatetruecolor($CW, $CH);
    $white   = imagecolorallocate($canvas, 255, 255, 255);
    $dark    = imagecolorallocate($canvas, ...TEXT_DARK);
    $primary = imagecolorallocate($canvas, ...PRIMARY);
    $cardBg  = imagecolorallocate($canvas, ...CARD_BG);
    imagefill($canvas, 0, 0, $white);

    $pad = 72;

    // --- Cabecera ---
    $titleMaxW = $W - $pad * 2;
    [$tLines, $tSize, $tLineH, $tBlockH] = fitText($opts['title'], $font, $s($titleMaxW), $s($H * 0.24), $s(60));
    $kicker = $opts['kicker'] ?? '';
    $kSize = $s(24);
    $kH = $kicker !== '' ? (int)($kSize * 2.2) : 0;
    $headerH = $s($pad) + $kH + $tBlockH + $s($pad * 0.8);

    imagefilledrectangle($canvas, 0, 0, $CW, $headerH, $primary);

    $y = $s($pad);
    if ($kicker !== '') {
        $kicker = mb_strtoupper($kicker, 'UTF-8');
        // Espaciado entre letras manual
        $spaced = implode(' ', preg_split('//u', $kicker, -1, PREG_SPLIT_NO_EMPTY));
        $kx = (int)(($CW - textW($spaced, $font, $kSize)) / 2);
        imagettftext($canvas, $kSize, 0, $kx, $y + $kSize, $white, $font, $spaced);
        $y += $kH;
    }
    foreach ($tLines as $l) {
        $x = (int)(($CW - textW($l, $font, $tSize)) / 2);
        $y += $tSize;
        imagettftext($canvas, $tSize, 0, $x, $y, $white, $font, $l);
        $y += $tLineH - $tSize;
    }

    // --- Footer (logo) ---
    $logoTargetW = $s(240);
    $logoTargetH = (int)(imagesy($logo) * $logoTargetW / imagesx($logo));
    $logoTop = $CH - $logoTargetH - $s($pad * 0.9);
    imagecopyresampled(
        $canvas, $logo,
        (int)(($CW - $logoTargetW) / 2), $logoTop,
        0, 0, $logoTargetW, $logoTargetH, imagesx($logo), imagesy($logo)
    );

    // --- Items: ajustar tamaño para que quepan ---
    $areaTop = $headerH + $s(56);
    $areaBottom = $logoTop - $s(48);
    $areaH = $areaBottom - $areaTop;

    $cardX1 = $s($pad);
    $cardX2 = $CW - $s($pad);
    $numD   = $s(64);                       // diámetro del círculo
    $cardPadX = $s(28);
    $cardPadY = $s(26);
    $textX  = $cardX1 + $cardPadX + $numD + $s(24);
    $textMaxW = $cardX2 - $cardPadX - $textX;

    $iSize = $s(34);
    $gap   = $s(22);
    do {
        $iLineH = (int)($iSize * 1.32);
        $blocks = [];
        $total = 0;
        foreach ($items as $it) {
            $lines = wrapLines($it, $font, $iSize, $textMaxW);
            $textH = count($lines) * $iLineH;
            $cardH = max($textH, $numD) + $cardPadY * 2;
            $blocks[] = [$lines, $cardH, $textH];
            $total += $cardH;
        }
        $total += $gap * (count($items) - 1);
        if ($total > $areaH) { $iSize -= $s(2); $gap = max($s(12), $gap - $s(1)); }
    } while ($total > $areaH && $iSize > $s(18));

    // Centrar verticalmente el bloque de items
    $cy = $areaTop + (int)max(0, ($areaH - $total) / 2);

    foreach ($blocks as $i => [$lines, $cardH, $textH]) {
        roundedRect($canvas, $cardX1, $cy, $cardX2, $cy + $cardH, $s(20), $cardBg);

        // Círculo con el número
        $ccx = $cardX1 + $cardPadX + (int)($numD / 2);
        $ccy = $cy + $cardPadY + (int)($numD / 2);
        imagefilledellipse($canvas, $ccx, $ccy, $numD, $numD, $primary);
        $num = (string)($i + 1);
        $nSize = (int)($numD * 0.46);
        $nBox = imagettfbbox($nSize, 0, $font, $num);
        imagettftext(
            $canvas, $nSize, 0,
            $ccx - (int)(($nBox[2] - $nBox[0]) / 2),
            $ccy + (int)(($nBox[1] - $nBox[7]) / 2),
            $white, $font, $num
        );

        // Texto del item
        $ty = $cy + $cardPadY + (int)max(0, ($numD - $textH) / 2);
        foreach ($lines as $l) {
            $ty += $iSize;
            imagettftext($canvas, $iSize, 0, $textX, $ty, $dark, $font, $l);
            $ty += $iLineH - $iSize;
        }

        $cy += $cardH + $gap;
    }

    // Downsample
    $final = imagecreatetruecolor($W, $H);
    imagecopyresampled($final, $canvas, 0, 0, 0, 0, $W, $H, $CW, $CH);
    $canvas = $final;
} elseif ($layout === 'stack') {
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
