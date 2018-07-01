from flask import (Flask, request, jsonify, make_response)
import sqlite3
from sqlite3 import Error

app = Flask(__name__)

@app.route('/services/retrieve', methods=('GET','POST'))
def retrieve():
    if request.method == 'POST':
        try:
            db = sqlite3.connect('services.sqlite')
        except Error as e:
            print(e)
        
        #service = request.form['service']
        service = 'service title 1'
        error = None

        if not service:
            error = 'A service is required in the request body.'
        elif db.execute(
            "SELECT 'explanation', explanation FROM services WHERE title = ? UNION ALL SELECT 'image', url FROM images WHERE id = (SELECT id FROM services WHERE title = ?) UNION ALL SELECT 'video', url FROM videos WHERE id = (SELECT id FROM services WHERE title = ?)",
            (service, service, service)
        ).fetchone() is not None:
            cur = db.execute(
                "SELECT 'explanation', explanation FROM services WHERE title = ? UNION ALL SELECT 'image', url FROM images WHERE id = (SELECT id FROM services WHERE title = ?) UNION ALL SELECT 'video', url FROM videos WHERE id = (SELECT id FROM services WHERE title = ?)",
                (service, service, service)
            ).fetchall()
            data = {}
            for row in cur:
                if row[0] not in data:
                    data[row[0]] = [row[1]]
                else:
                    data[row[0]].append(row[1])
            resp = make_response(jsonify(data))
            resp.headers['Access-Control-Allow-Origin'] = '*'
            #resp.headers.set('Access-Control-Allow-Methods', 'GET')
            #resp.headers.set('Access-Control-Allow-Headers', 'Content-Type')
            return resp
            #return jsonify(data)
        else:
            return 'This request seemed to fail.'
    return 'Wasn\'t a post request, so the server will reject this.'
        