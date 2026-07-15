from parser import convert_document


async def parse_pdf(
    path: str
):

    return convert_document(
        path
    )