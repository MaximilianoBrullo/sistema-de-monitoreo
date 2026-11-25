#include <Arduino.h>
#include "config.h"
#include "sensor_ldr.h"
#include "red.h"
#include "envio.h"

void setup() {
  Serial.begin(115200);
  sensorLdrInit();
  Serial.println(redConectar() ? "WiFi OK" : "WiFi sin conexion");
}

void loop() {
  float valor = sensorLdrLeer();
  Serial.printf("LDR: %.0f\n", valor);

  if (redConectar()) {
    int code = enviarLectura(valor);
    Serial.printf("HTTP %d\n", code);
  } else {
    Serial.println("Sin WiFi, lectura no enviada");
  }

  delay(INTERVALO_MS);
}