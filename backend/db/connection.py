import pymongo
import time

class MONGO_CLIENT:
    def __init__(self, host="10.70.39.68", port="22022", uri=None):
        self.host = host
        self.port = port
        if uri is not None:
            self.uri = uri
        else:
            self.uri = f"mongodb://{host}:{port}"
        pass

    def connect(self):
        for i in range(3):
            try:
                client = pymongo.MongoClient(self.uri)
                return client
            except Exception as e:
                print(f"Try to connect to {self.uri} - {i+1}/3 time(s)")
                time.sleep(1)
                
        raise ConnectionError("Can't connect to database!")