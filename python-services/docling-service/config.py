from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    HOST: str = "0.0.0.0"

    PORT: int = 8001

    MAX_UPLOAD_SIZE_MB: int = 100

    TEMP_DIR: str = "./temp"

    OUTPUT_DIR: str = "./output"

    class Config:
        env_file = ".env"


settings = Settings()