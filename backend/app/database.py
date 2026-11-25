from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

es_sqlite = settings.database_url.startswith("sqlite")

# Crea la carpeta de la base si no existe
if es_sqlite:
    Path(settings.database_url.replace("sqlite:///", "")).parent.mkdir(
        parents=True, exist_ok=True
    )

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False} if es_sqlite else {},
)

SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    pass


def get_db():
    """Dependencia: una sesión por request, se cierra siempre."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()