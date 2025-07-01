from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

import requests
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

CLIENT_ID = os.environ.get("TWITCH_CLIENT_ID")
CLIENT_SECRET = os.environ.get("TWITCH_CLIENT_SECRET")
TOKEN = None

def get_token():
    global TOKEN
    if not TOKEN:
        url = "https://id.twitch.tv/oauth2/token"
        params = {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "grant_type": "client_credentials"
        }
        res = requests.post(url, params=params)
        TOKEN = res.json().get("access_token")
    return TOKEN

@app.route('/api/is_live', methods=['GET'])
def is_live():
    username = request.args.get('username')
    token = get_token()
    headers = {
        "Client-ID": CLIENT_ID,
        "Authorization": f"Bearer {token}"
    }
    url = f"https://api.twitch.tv/helix/streams?user_login={username}"
    res = requests.get(url, headers=headers)
    data = res.json().get("data", [])
    return jsonify({
        "live": len(data) > 0,
        "stream_data": data[0] if data else None
    })

if __name__ == '__main__':
    app.run(debug=True)
