from fastapi import FastAPI
import time
import asyncio
import uvicorn

app = FastAPI()

@app.get('/sync')
def sync_sleep():
    time.sleep(2)
    return 'END'

@app.get('/async')
async def async_sleep():
    await asyncio.sleep(2)
    return 'END'

if __name__ == "__main__":
    uvicorn.run("second_part_server:app", host="127.0.0.1", port=8000, reload=True)