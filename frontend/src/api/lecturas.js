import { API_URL } from "../config";

async function pedir(ruta) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`);
  } catch {
    throw new Error(`No se pudo conectar con el backend en ${API_URL}. Revisá que esté corriendo.`);
  }
  if (respuesta.status === 404) return null;
  if (!respuesta.ok) throw new Error(`El backend respondió con error ${respuesta.status}.`);
  return respuesta.json();
}

export const getUltima = (deviceId) =>
  pedir(`/lecturas/ultima?device_id=${encodeURIComponent(deviceId)}`);

export const getHistorial = (deviceId) =>
  pedir(`/lecturas?device_id=${encodeURIComponent(deviceId)}`);