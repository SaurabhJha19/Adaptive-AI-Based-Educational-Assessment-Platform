from pathlib import Path
import shutil
import uuid

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from services.docling_service import parse_pdf

from config import settings

router = APIRouter()


@router.post("/parse")
async def parse(
    file: UploadFile = File(...)
):

    Path(
        settings.TEMP_DIR
    ).mkdir(
        parents=True,
        exist_ok=True
    )

    filename = (
        f"{uuid.uuid4()}.pdf"
    )

    destination = (
        Path(settings.TEMP_DIR)
        / filename
    )

    with open(
        destination,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = await parse_pdf(
        str(destination)
    )

    return result