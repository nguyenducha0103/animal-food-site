
from backend.db.connection import MONGO_CLIENT
from backend.db.crud import CRUDBase
import datetime


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

    def get_all(self):
        data = self.p_table.find_many({})
       
        return data