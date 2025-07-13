pings = []

import time

def add_ping(data):
    ping = {
        'subject':     data.get('subject'),
        'room':        data.get('room'),
        'name':        data.get('name') or "Anonymous",
        'description': data.get('description') or "",
        'timestamp':   time.time()       # ← add this
    }
    pings.insert(0, ping)
    return ping