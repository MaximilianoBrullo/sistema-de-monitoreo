from datetime import datetime, timezone

from pydantic import BaseModel, ConfigDict, Field, field_validator


class LecturaCrear(BaseModel):
    """Lo que manda el ESP32."""
    device_id: str = Field(min_length=1, max_length=50)
    distancia_cm: float


class LecturaSalida(BaseModel):
    """Lo que devuelve la API."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    device_id: str
    distancia_cm: float
    timestamp: datetime

    @field_validator("timestamp")
    @classmethod
    def marcar_utc(cls, v: datetime) -> datetime:
        # Así el JSON sale con "+00:00" y React lo convierte bien a hora local
        return v if v.tzinfo else v.replace(tzinfo=timezone.utc)