
from backend.db.connection import MONGO_CLIENT
from backend.db.crud import CRUDBase
import datetime
import uuid
import cv2
import os

def remove_accents(input_str):
    s1 = u'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ'
    s0 = u'AAAAEEEIIOOOOUUYaaaaeeeiioooouuyAaDdIiUuOoUuAaAaAaAaAaAaAaAaAaAaAaAaEeEeEeEeEeEeEeEeIiIiOoOoOoOoOoOoOoOoOoOoOoOoUuUuUuUuUuUuUuYyYyYyYy'
    s = ''
    for c in input_str:
        if c in s1:
            s += s0[s1.index(c)]
        else:
            s += c
    return s

def response_data(data=None, msg="Successful", status_code=1):
    return {
        "status_code": status_code,
        "data": data,
        "msg":msg
    }

class DBManager():
    def __init__(self, host, port):
        self.db_client = MONGO_CLIENT(host, port).connect()
        self.p_table = CRUDBase(self.db_client, 'animal-products', 'products')
        self.type_table = CRUDBase(self.db_client, 'animal-products', 'product-type')

    def get_all_items(self):
        data = self.p_table.find_many({})
        return data
    
    def get_all_types(self):
        data = self.type_table.find_many({})
        return data
    
    def add_type(self, type_name, image):
        _id = uuid.uuid4().hex
        type_name_encode = type_name.replace(' ', "_")

        os.makedirs(os.path.join('data/images/types/', type_name_encode), exist_ok=True)
        image_path = f'data/images/types/{type_name_encode}/{_id}.jpg'
        image_link = f'/{image_path}'
        cv2.imwrite(image_path, image)

        data = {'id':_id, 'name': type_name, "type_name_encode":type_name_encode, "image_link": image_link}

        respone = self.type_table.insert_one(data)

    def add_item(self, item_name, type_name, quantity, image, price):
        _id = uuid.uuid4().hex
        item_name_encode = item_name.replace(' ', "_")

        # os.makedirs(os.path.join('data/images/items/', item_name_encode), exist_ok=True)
        image_path = f'data/images/items/{_id}.jpg'
        image_link = f'/{image_path}'
        cv2.imwrite(image_path, image)

        data = {'id':_id,
                'name': item_name,
                "item_name_encode":item_name_encode,
                "quantity": quantity,
                "type": type_name,
                "price": price,
                "image_link": image_link}

        respone = self.p_table.insert_one(data)
        return respone
    
    def remove_item(self, item_id):
        query = {'id': item_id}
        item_data = self.p_table.find_one(query)
        if item_data['status_code'] == 1:
            image_path = item_data['data']['image_link'][1:]
            os.remove(image_path)
            res_data = self.p_table.delete_one(query)
            return res_data
        return response_data(status_code=0)