from flask import Flask, jsonify, redirect, request
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CLIENT_ID = os.getenv("TWITCH_CLIENT_ID")
CLIENT_SECRET = os.getenv("TWITCH_CLIENT_SECRET")

TOKEN_URL = "https://id.twitch.tv/oauth2/token"
API_BASE = "https://api.twitch.tv/helix"

access_token = None

def get_app_token():
    global access_token

    if access_token:
        return access_token
    
    response = requests.post(
        TOKEN_URL,
        params={
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "grant_type": "client_credentials"
        }
    )

    data = response.json()
    access_token = data["access_token"]
    return access_token

def twitch_headers():
    return {
        "Client-ID": CLIENT_ID,
        "Authorization": f"Bearer {get_app_token()}"
    }

def get_streamerID(username):
    r = requests.get(
        f"{API_BASE}/users",
        headers=twitch_headers(),
        params={"login": username}
    )

    data = r.json()["data"]
    if data:
        return data[0]["id"]

@app.route("/")
def check_running():
    r = requests.get(
        f"{API_BASE}/streams",
        headers=twitch_headers(),
        timeout=5
    )

    return jsonify({
        "twitch_status": r.status_code,
        "ok": r.status_code == 200
    }), r.status_code

@app.route("/live_stream/<username>")
def get_live_stream(username):
    r = requests.get(
        f"{API_BASE}/streams",
        headers=twitch_headers(),
        params={"user_login": username}
    )

    data = r.json()["data"]
    return data

@app.route("/users/<username>")
def get_streamer(username):
    r = requests.get(
        f"{API_BASE}/users",
        headers=twitch_headers(),
        params={"login": username}
    )

    data = r.json()["data"]
    return data

@app.route("/live_streams")
def get_live_streams():
    game = request.args.get("game")

    params = {}
    if game:
        params["game_name"] = game

    r = requests.get(
        f"{API_BASE}/streams",
        headers=twitch_headers(),
        params=params
    )

    return jsonify(r.json())


if __name__ == "__main__":
    app.run(debug=True)