import asyncio
import aiohttp
from time import perf_counter
import requests
from concurrent.futures import ProcessPoolExecutor


async def async_get(session: aiohttp.ClientSession, i: int):
    async with session.get("http://127.0.0.1:8000/async"):
        print(f"async get sent №{i}")

def sync_get(i: int):
    requests.get("http://127.0.0.1:8000/sync", timeout=30)
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

"""
Разница во времени исполнения 5 асинхронных запросов и 5 синхронных возникает потому 
что во время исполнения 5 асинхронных запросов event loop видит что у нас io bound задача потому 
что в этом месте мы указали await, выполняет ее и не ждет пока придет ответ а идет работать с другими 
корутинами, потом когда ответ приходит он продолжает работу. А когда у нас синхронное исполнение мы 
отправляем запрос и просто ждем пока придет ответ, соответственно просто простаиваем
"""