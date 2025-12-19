from fastapi import FastAPI

app = FastAPI(
    title="Braguinho API",
    description="API para a aplicação educativa Braguinho",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {"message": "Olá! O backend do Braguinho está a funcionar! 🏰"}

@app.get("/status")
async def status():
    return {"status": "ok", "mascote": "Braguinho"}
