from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

# from fastapi.encoders import jsonable_encoder
# from pydantic import BaseModel

import datetime
import pymongo
import time

def response_data(status_code=1, msg="Successfully!", data=None):
    return {
        "status_code": status_code,
        "msg": msg,
        "data": data
    }

class CRUDBase():
    def __init__(self, db_server, db_name, collection_name):
        self.db_name = db_name
        self.db_server = db_server
        self.collection_name = collection_name
        self.col = db_server[db_name][collection_name]
    
    def get_info(self):
        info = {
            "HOST": self.db_server.HOST,
            "PORT": self.db_server.PORT,
            "Address": self.db_server.address,
            "Database": self.db_name,
            "Collection": self.collection_name
        }
        return response_data(data=info)
    
    def insert_one(self, data):
        data.update({
            "created_at": datetime.datetime.now()
        })
        
        try:
            res = self.col.insert_one(data)
            if res.inserted_id is not None:
                return response_data()
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully!")
        except Exception as e:
            print('Unsccusessfuly')
            return response_data(status_code=2, msg=e)
        
        
    def insert_many(self, data):
        created_at = datetime.datetime.now()
        [d.update({
            "created_at": created_at
        }) for d in data]
        
        try:
            res = self.col.insert_many(data)
            if res.inserted_id is not None:
                return response_data()
                
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully")
        except Exception as e:
            return response_data(status_code=2, msg=e)
        
        
    def find_one(self, query, projection={}):
        try:
            res = self.col.find_one(query,projection)
            if res is not None:
                return response_data(data=res)
                
            else:
                return response_data(msg="Not Found!")
        except Exception as e:
            return response_data(status_code=2, msg=e)
        
    def get_first(self):
        query = {}
        return self.find_one(query=query)
        
    def find_one_by_id(self,id, projection={}):
        query = {
            "_id": id
        }
        return self.find_one(query=query, projection=projection)
        
    def find_many(self, query, projection={}):
        try:
            res = list(self.col.find(query, projection))
            return response_data(data=res)
        
        except Exception as e:
            return response_data(status_code=2, msg=e)
    
    def find_many_by_id(self, id, projection={}):
        query = {
            "_id": id
        }
        return self.find_many(query=query, projection=projection)
    
    def count_documents(self, query):
        try:
            res = self.col.count_documents(query)
            return response_data(data=res)
        
        except Exception as e:
            return response_data(status_code=2, msg=e)
    
    def push_ele_into_list(self, query, field, data):
        modTime = {
            "modified_at": datetime.datetime.now()
        }
        
        option = {
            "$push": {field: data}
        }
        option.update({
            "$set": modTime
        })
        
        # print(query, option)
        try:
            res = self.col.update_one(query, option)
            if res.modified_count > 0:
                return response_data()
                
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully!")
        except Exception as e:
            return response_data(status_code=2, msg=e)
    
    def pull_ele_into_list(self, query, field, data):
        modTime = {
            "modified_at": datetime.datetime.now()
        }
        
        option = {
            "$pull": {field: data}
        }
        option.update({
            "$set": modTime
        })
        
        # print(query, option)
        try:
            res = self.col.update_one(query, option)
            if res.modified_count > 0:
                return response_data()
                
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully!")
        except Exception as e:
            return response_data(status_code=2, msg=e)
    
    def update_one(self, query, data):
        modTime = {
            "modified_at": datetime.datetime.now()
        }
        data.update(modTime)
        
        option = {
            "$set": data
        }
        
        try:
            res = self.col.update_one(query, option)
            if res.modified_count > 0:
                return response_data()
                
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully!")
        except Exception as e:
            return response_data(status_code=2, msg=e)
        
    def update_many(self, query, option):
        modTime = {
            "$set": {
                "modified_at": datetime.datetime.now()
            }
        }
        option.update(modTime)
        
        
        try:
            res = self.col.update_many(query, option)
            if res.modified_count > 0:
                return response_data()
                
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully!")
        except Exception as e:
            return response_data(status_code=2, msg=e)
        
    def delete_one(self, query):
        try:
            res = self.col.delete_one(query)
            if res.deleted_count > 0:
                return response_data()
                
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully!")
        except Exception as e:
            return response_data(status_code=2, msg=e)
        
    def delete_many(self, query):
        try:
            res = self.col.delete_many(query)
            if res.deleted_count > 0:
                return response_data()
                
            else:
                return response_data(status_code=0,
                                    msg="Unsuccessfully!")
        except Exception as e:
            return response_data(status_code=2, msg=e)