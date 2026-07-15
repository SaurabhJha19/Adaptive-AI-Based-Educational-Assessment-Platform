from pathlib import Path
import traceback

from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import (
    PdfPipelineOptions,
)
from docling.document_converter import (
    DocumentConverter,
    PdfFormatOption,
)

pipeline_options = PdfPipelineOptions()

# Disable OCR for digital PDFs
pipeline_options.do_ocr = False

# Disable expensive image generation
pipeline_options.generate_page_images = False
pipeline_options.generate_picture_images = False

converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(
            pipeline_options=pipeline_options,
        )
    }
)


def convert_document(pdf_path: str):

    print("=" * 60)
    print("Starting Docling")
    print(pdf_path)
    print("=" * 60)

    if not Path(pdf_path).exists():
        raise FileNotFoundError(pdf_path)

    try:

        result = converter.convert(pdf_path)

        print("Conversion finished")

        document = result.document

        print("Exporting")

        data = document.export_to_dict()

        print("Export complete")

        return data

    except Exception:

        traceback.print_exc()

        raise