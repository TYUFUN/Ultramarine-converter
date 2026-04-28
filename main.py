from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
import uvicorn 
from PIL import Image
from io import BytesIO    
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
@app.get("/")
def index():
    return FileResponse("index.html")
@app.post("/convert")
async def converter(photo: UploadFile = File(...), to: str = Form(...)):
    try:
        safe = BytesIO()
        if not photo.content_type:
            raise HTTPException(status_code=400)
        type = photo.content_type.split("/")[1]
        if not type.lower() in ("jpg", "jpeg", "png", "bmp", "webp", "ico", "tiff", "gif"):
            raise HTTPException(status_code=415, detail="Unsupported file format")
        await photo.seek(0)
        contents = await photo.read()
        if len(contents) < 20 * 1024 * 1024:  
            img = Image.open(BytesIO(contents))
            img.save(safe, format=to)
            safe.seek(0)
        else:
            raise HTTPException(status_code=413, detail="File too large")
        return StreamingResponse(safe, media_type=f"image/{to}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
uvicorn.run(app, host="127.0.0.1",port=5500)