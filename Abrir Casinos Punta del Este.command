#!/bin/bash
# Doble clic para abrir el sitio de Casinos Punta del Este.
# La primera vez instala lo necesario (puede tardar 1-2 minutos).

cd "$(dirname "$0")" || exit 1

echo ""
echo "  Casinos Punta del Este"
echo "  ----------------------"
echo ""

# Verificar que Node.js esté instalado
if ! command -v node >/dev/null 2>&1; then
  echo "  ⚠  Falta instalar Node.js."
  echo "     Descargalo (versión LTS) desde: https://nodejs.org"
  echo "     Instalalo y volvé a hacer doble clic en este archivo."
  echo ""
  read -r -p "  Presioná Enter para cerrar..."
  exit 1
fi

# Instalar dependencias solo la primera vez
if [ ! -d "node_modules" ]; then
  echo "  Instalando (solo la primera vez, aguantá un momento)..."
  npm install || { echo "  Error al instalar."; read -r -p "  Enter para cerrar..."; exit 1; }
fi

echo "  Iniciando el sitio..."
echo "  Se abrirá solo en tu navegador en unos segundos."
echo ""
echo "  👉 Para APAGARLO: cerrá esta ventana negra."
echo ""

# Abrir el navegador cuando el servidor esté listo
( for i in $(seq 1 30); do
    if curl -s -o /dev/null http://localhost:3000; then
      open http://localhost:3000
      break
    fi
    sleep 1
  done ) &

npm run dev
