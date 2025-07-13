pings = []

def add_ping(data):
    ping = {
        'subject': data.get('subject'),
        'room': data.get('room'),
        'name': data.get('name') or "Anonymous",
        'description': data.get('description') or "",
    }
    pings.insert(0, ping)
    return ping
