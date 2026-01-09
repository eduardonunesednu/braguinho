from fastapi import FastAPI

app = FastAPI(
    title="Briguinho API",
    description="API para a aplicação educativa Briguinho",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {"message": "Olá! O backend do Briguinho está a funcionar! 🏰"}

@app.get("/status")
async def status():
    return {"status": "ok", "mascote": "Briguinho"}
