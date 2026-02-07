import asyncio
import aiohttp
from time import perf_counter
import requests
from concurrent.futures import ProcessPoolExecutor

URL = "https://httpbin.org/delay/2"

async def async_get(session: aiohttp.ClientSession, i: int):
    async with session.get(URL):
        print(f"async get sent №{i}")

def sync_get(i: int):
    requests.get(URL, timeout=30)
    print(f"sync get sent №{i}")

async def main():
    start = perf_counter()
    async with aiohttp.ClientSession() as session:
        await asyncio.gather(*(async_get(session, i) for i in range(1, 6)))
    print(f"Асинхронный вызов отработал за: {perf_counter() - start:.2f}")

    start = perf_counter()
    for i in range(1, 6):
        sync_get(i)
    print(f"Синхронный вызов отработал за: {perf_counter() - start:.2f}")

    start = perf_counter()
    with ProcessPoolExecutor(max_workers=5) as ex:
        list(ex.map(sync_get, range(1, 6)))
    print(f"Многопроцессорный вызов отработал за: {perf_counter() - start:.2f}")

if __name__ == "__main__":
    asyncio.run(main())