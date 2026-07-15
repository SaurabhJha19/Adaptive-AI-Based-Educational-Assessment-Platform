from pydantic import BaseModel


class ParseResponse(BaseModel):

    success: bool

    document: dict