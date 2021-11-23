import uvicorn

from main import app

if __name__ == '__main__':
    uvicorn.run(app=app, port=8080, debug=True)
