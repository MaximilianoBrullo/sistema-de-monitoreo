from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Lectura
from app.schemas import LecturaCrear


def crear_lectura(db: Session, datos: LecturaCrear) -> Lectura:
    lectura = Lectura(**datos.model_dump())
    db.add(lectura)
    db.commit()
    db.refresh(lectura)
    return lectura


def listar_lecturas(
    db: Session, device_id: str, desde: datetime, hasta: datetime, limite: int
) -> list[Lectura]:
    # Trae las más recientes dentro del rango y las devuelve en orden cronológico
    consulta = (
        select(Lectura)
        .where(
            Lectura.device_id == device_id,
            Lectura.timestamp >= desde,
            Lectura.timestamp <= hasta,
        )
        .order_by(Lectura.timestamp.desc())
        .limit(limite)
    )
    return list(reversed(db.scalars(consulta).all()))


def ultima_lectura(db: Session, device_id: str) -> Lectura | None:
    consulta = (
        select(Lectura)
        .where(Lectura.device_id == device_id)
        .order_by(Lectura.timestamp.desc())
        .limit(1)
    )
    return db.scalars(consulta).first()