import fastapi
from fastapi import FastAPI, HTTPException, APIRouter, Request, UploadFile, Form
from fastapi.responses import HTMLResponse, StreamingResponse
from typing_extensions import Annotated
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from backend.src.tools import image_decode, image_encode

import numpy as np
import cv2
import io
import json
import time
from collections import deque

from backend.db.database import DBManager

HOST = '127.0.0.1'
PORT = 9000

app = fastapi.FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/template", StaticFiles(directory="template"), name="template")
app.mount("/data", StaticFiles(directory="data"), name="data")


templates = Jinja2Templates(directory="template")

db = DBManager(host='10.70.39.68', port=22022)

def response_data(data=None, msg="Successful", status_code=1):
    return {
        "status_code": status_code,
        "data": data,
        "msg":msg
    }

@app.get('/')
async def home():
    return 'OK'

@app.get("/home", response_class=HTMLResponse)
async def homepage(request: Request):
    return templates.TemplateResponse('index.html', context={"request": request, "name": "Ha", "HOST": HOST, "PORT": PORT})

@app.get('/products/all')
async def get_all_products():
    data = db.get_all_items()
    if data['status_code'] == 1:
        new_data = []
        for item in data['data']:
            d = {}
            d['id'] = str(item['_id'])
            d['name'] = item['name']
            d['type'] = item['type']
            d['quantity'] = item['quantity']
            d['price'] = item['price']
            d['image_link'] = item['image_link']
            new_data.append(d)
        
        return response_data(data=new_data)
    else:
        return 0
    
@app.get("/types/all")
async def get_all_products():
    data = db.get_all_types()
    if data['status_code'] == 1:
        new_data = []
        for item in data['data']:
            d = {}
            d['id'] = str(item['_id'])
            d['name'] = item['name']
            d['image_link'] = item['image_link']
            new_data.append(d)
        
        return response_data(data=new_data)
    else:
        return 0
    
@app.post("/product/add")
async def add_product(item_name :str =  Form(), image_base64 :str =  Form(), quantity:str =  Form(), item_type:str =  Form(), price:str =  Form()):
    image = image_decode(image_base64.split(';')[1].replace('base64,',''))
    response_data = db.add_item(item_name, item_type, quantity=quantity, image=image, price=price)
    return 1

@app.post('/type/add')
async def add_type(image_base64 :str =  Form(), type_name:str =  Form()):
    image = image_decode(image_base64.split(';')[1].replace('base64,',''))
    response_data = db.add_type(type_name=type_name, image=image)
    return 1

@app.post("/login")
async def login(username:str =  Form(), password:str = Form()):
    if (username == 'admin') and (password == 'admin'):
        print('Login successfuly')
        return 1
    print('Login Unsuccessfuly')
    return 0




if __name__ == '__main__':
    
	# start a thread that will perform motion detection
    uvicorn.run(app, host=HOST, port=PORT, access_log=True)