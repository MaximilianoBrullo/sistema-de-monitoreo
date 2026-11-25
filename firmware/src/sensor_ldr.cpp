#include <Arduino.h>
#include "config.h"
#include "sensor_ldr.h"

void sensorLdrInit() {
  analogReadResolution(12);         // 0 a 4095
  analogSetAttenuation(ADC_11db);   // rango completo de 0 a 3,3 V
}

float sensorLdrLeer() {
  long suma = 0;
  for (int i = 0; i < LDR_MUESTRAS; i++) {
    suma += analogRead(PIN_LDR);
    delay(5);
  }
  return (float)suma / LDR_MUESTRAS;
}