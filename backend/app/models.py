from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, Index, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


def ahora_utc() -> datetime:
    # Se guarda siempre en UTC "naive" para que SQLite compare bien
    return datetime.now(timezone.utc).replace(tzinfo=None)


class Lectura(Base):
    __tablename__ = "lecturas"

    id: Mapped[int] = mapped_column(primary_key=True)
    device_id: Mapped[str] = mapped_column(String(50), index=True)
    distancia_cm: Mapped[float] = mapped_column(Float)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=ahora_utc, index=True)

    __table_args__ = (Index("ix_device_timestamp", "device_id", "timestamp"),)