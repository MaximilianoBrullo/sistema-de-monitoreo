from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.models import ahora_utc
from app.schemas import LecturaCrear, LecturaSalida

router = APIRouter(prefix="/lecturas", tags=["lecturas"])


def a_utc_naive(dt: datetime | None) -> datetime | None:
    """Normaliza fechas recibidas (con o sin zona) a UTC sin zona."""
    if dt is None:
        return None
    if dt.tzinfo:
        dt = dt.astimezone(timezone.utc).replace(tzinfo=None)
    return dt


@router.post("", response_model=LecturaSalida, status_code=201)
def crear(datos: LecturaCrear, db: Session = Depends(get_db)):
    return crud.crear_lectura(db, datos)


@router.get("", response_model=list[LecturaSalida])
def listar(
    device_id: str,
    desde: datetime | None = None,
    hasta: datetime | None = None,
    limite: int = Query(1000, ge=1, le=10000),
    db: Session = Depends(get_db),
):
    hasta = a_utc_naive(hasta) or ahora_utc()
    desde = a_utc_naive(desde) or hasta - timedelta(hours=24)
    if desde > hasta:
        raise HTTPException(400, "'desde' no puede ser posterior a 'hasta'")
    return crud.listar_lecturas(db, device_id, desde, hasta, limite)


@router.get("/ultima", response_model=LecturaSalida)
def ultima(device_id: str, db: Session = Depends(get_db)):
    lectura = crud.ultima_lectura(db, device_id)
    if lectura is None:
        raise HTTPException(404, "No hay lecturas para ese dispositivo")
    return lectura