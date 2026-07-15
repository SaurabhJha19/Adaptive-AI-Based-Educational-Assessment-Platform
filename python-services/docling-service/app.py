from fastapi import FastAPI
from routes.parse import router as parse_router

app = FastAPI(
    title="Docling Service",
    version="1.0.0"
)

app.include_router(parse_router)


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "docling"
    }