#pragma once

// WiFi
#define WIFI_SSID     "TU_WIFI"
#define WIFI_PASS     "TU_CLAVE"
#define WIFI_TIMEOUT_MS 10000

// Backend
#define BACKEND_URL   "http://192.168.1.50:8000/lecturas"
#define DEVICE_ID     "tanque-01"

// Sensor
#define PIN_TRIG      5
#define PIN_ECHO      18
#define MUESTRAS      5
#define VEL_SONIDO_MS 343.0f   // m/s a ~20 °C

// Ciclo
#define INTERVALO_MS  30000