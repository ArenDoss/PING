from flask import Flask, request, jsonify
from flask_cors import CORS
from data import pings, add_ping

app = Flask(__name__)
CORS(app)

@app.route('/ping', methods=['POST'])
def post_ping():
    data = request.get_json()
    new_ping = add_ping(data)
    return jsonify(new_ping), 201

@app.route('/pings', methods=['GET'])
def get_pings():
    subject = request.args.get('subject')
    if subject:
        return jsonify([p for p in pings if p['subject'] == subject])
    return jsonify(pings)

if __name__ == '__main__':
    app.run(debug=True)