#include <Arduino.h>
#include "config.h"
#include "ultrasonico.h"

void ultrasonicoInit() {
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  digitalWrite(PIN_TRIG, LOW);
}

static float medirUnaVez() {
  digitalWrite(PIN_TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(20);
  digitalWrite(PIN_TRIG, LOW);
  unsigned long us = pulseIn(PIN_ECHO, HIGH, 30000);
  if (us == 0) return -1;
  return us * VEL_SONIDO_MS / 20000.0f;  // ida y vuelta, en cm
}

float ultrasonicoLeerCm() {
  float suma = 0;
  int validas = 0;
  for (int i = 0; i < MUESTRAS; i++) {
    float d = medirUnaVez();
    if (d > 0) { suma += d; validas++; }
    delay(60);
  }
  return validas ? suma / validas : -1; //
}