# Monitoreo de generadores diésel

Sistema para medir en forma remota el combustible y el estado de generadores diésel, avisar ante situaciones de riesgo (nivel bajo, posible robo, equipo desconectado) y guardar el historial para análisis.

## Estructura

```
├── firmware/   # Nodo de campo: ESP32 + FreeRTOS (PlatformIO)
├── backend/    # API: Python + FastAPI
├── frontend/   # Panel web: React + Vite
└── docs/       # Requerimientos, casos de uso y diagramas UML
```

## Estado

MVP en desarrollo. Los requerimientos, la arquitectura y los diagramas de clases y de secuencia están en `docs/`.

## Puesta en marcha local

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env         # Linux/Mac: cp
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Documentación interactiva de la API: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Panel: http://localhost:5173

### Firmware

Abrir la carpeta `firmware/` en VS Code con PlatformIO, copiar `include/secrets.example.h` como `include/secrets.h` con los datos del WiFi y del servidor, y usar Build y Upload.

## Seguridad

Nunca se suben al repositorio las credenciales: `backend/.env`, `frontend/.env` y `firmware/include/secrets.h` están en el `.gitignore`. Se versionan solo sus versiones `.example`.
