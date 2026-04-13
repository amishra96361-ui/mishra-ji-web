from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os

PORT = 8000
HERE = os.path.dirname(__file__) or "."

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, directory=HERE, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

if __name__ == "__main__":
    os.chdir(HERE)
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Website चल रही है: http://localhost:{PORT}")
    print("बंद करने के लिए Ctrl+C दबाएँ")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
        print("सर्वर बंद हुआ")
