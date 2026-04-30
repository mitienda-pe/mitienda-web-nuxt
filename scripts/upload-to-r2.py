#!/usr/bin/env python3
"""
Sube imágenes de blog desde URLs de Evolink al bucket R2 de MiTienda.

Uso:
    pip install boto3 requests
    python scripts/upload-to-r2.py

Requiere variables de entorno (o editar las constantes abajo):
    R2_ACCOUNT_ID
    R2_ACCESS_KEY_ID
    R2_SECRET_ACCESS_KEY
"""

import os
import sys
import requests
import boto3
from botocore.config import Config

# ─── Configuración ─────────────────────────────────────────────────────────────
ACCOUNT_ID       = os.getenv("R2_ACCOUNT_ID", "TU_ACCOUNT_ID_AQUI")
ACCESS_KEY_ID    = os.getenv("R2_ACCESS_KEY_ID", "TU_ACCESS_KEY_AQUI")
SECRET_ACCESS_KEY= os.getenv("R2_SECRET_ACCESS_KEY", "TU_SECRET_KEY_AQUI")
BUCKET_NAME      = "mitiendape"
CDN_DOMAIN       = "https://cdn.mitienda.pe"

# ─── Imágenes a subir ──────────────────────────────────────────────────────────
# Formato: { "nombre-en-r2.jpg": "url-de-origen" }
# Llena este dict antes de correr el script. No commitear URLs presigned con
# credenciales (X-Tos-Credential, X-Amz-Credential, etc.).
IMAGES = {
    # "blog/ejemplo.jpg": "https://origen.example.com/ruta/imagen.jpg",
}
# ───────────────────────────────────────────────────────────────────────────────


def get_r2_client():
    return boto3.client(
        "s3",
        endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",
        aws_access_key_id=ACCESS_KEY_ID,
        aws_secret_access_key=SECRET_ACCESS_KEY,
        config=Config(signature_version="s3v4"),
        region_name="auto",
    )


def download_image(url: str) -> bytes:
    print(f"  ↓ Descargando...", end=" ", flush=True)
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    print(f"{len(resp.content) // 1024} KB")
    return resp.content


def upload_to_r2(client, key: str, data: bytes):
    print(f"  ↑ Subiendo a R2 como '{key}'...", end=" ", flush=True)
    client.put_object(
        Bucket=BUCKET_NAME,
        Key=key,
        Body=data,
        ContentType="image/jpeg",
        CacheControl="public, max-age=31536000",  # 1 año de caché
    )
    url = f"{CDN_DOMAIN}/{key}"
    print(f"OK → {url}")
    return url


def main():
    if ACCOUNT_ID == "TU_ACCOUNT_ID_AQUI":
        print("❌ Configura las credenciales R2 antes de ejecutar.")
        print("   Edita las constantes al inicio del archivo o usa variables de entorno:")
        print("   export R2_ACCOUNT_ID=xxx")
        print("   export R2_ACCESS_KEY_ID=xxx")
        print("   export R2_SECRET_ACCESS_KEY=xxx")
        sys.exit(1)

    client = get_r2_client()
    results = []

    for r2_key, evolink_url in IMAGES.items():
        print(f"\n📸 {r2_key}")
        try:
            data = download_image(evolink_url)
            cdn_url = upload_to_r2(client, r2_key, data)
            results.append((r2_key, cdn_url, "✅"))
        except Exception as e:
            print(f"  ❌ Error: {e}")
            results.append((r2_key, "-", f"❌ {e}"))

    print("\n" + "─" * 60)
    print("Resumen:")
    for key, url, status in results:
        print(f"  {status}  {url}")
    print("─" * 60)
    print("\nActualiza el frontmatter de los artículos con las URLs de CDN.")


if __name__ == "__main__":
    main()
