from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client['leakdb']
collection = db['matches']

@app.route('/api/matches', methods=['GET'])
def get_matches():
    matches = list(collection.find({}, {"_id": 0}))
    return jsonify(matches)

if __name__ == '__main__':
    app.run(debug=True)
