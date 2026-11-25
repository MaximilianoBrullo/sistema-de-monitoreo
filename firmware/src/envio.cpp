#include <HTTPClient.h>
#include "config.h"
#include "envio.h"

int enviarLectura(float distanciaCm) {
  HTTPClient http;
  http.begin(BACKEND_URL);
  http.addHeader("Content-Type", "application/json");

  String body = String("{\"device_id\":\"") + DEVICE_ID +
                "\",\"distancia_cm\":" + String(distanciaCm, 1) + "}";

  int code = http.POST(body);
  http.end();
  return code;
}