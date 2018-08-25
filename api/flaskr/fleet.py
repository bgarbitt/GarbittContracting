from flask import (
    Blueprint, request, 
    jsonify, make_response
)
from flaskr.db import get_db

bp = Blueprint('fleet', __name__)

@bp.route('/')
def fleet():
    if request.method == 'GET':
        db = get_db()
        error = None

        size = request.args.get('size')

        if db.execute(
            "SELECT f.machine, fi.url FROM fleet f, fleet_images fi WHERE f.id = fi.id and fi.size = ?", (size,)
        ).fetchone() is not None:
            
            cur = db.execute(
                "SELECT f.machine, fi.url FROM fleet f, fleet_images fi WHERE f.id = fi.id and fi.size = ?", (size,)
            ).fetchall()
            
            data = {}
            
            for row in cur:
                if row[0] not in data:
                    data[row[0]] = [row[1]]
                else:
                    data[row[0]].append(row[1])
            
            resp = make_response(jsonify(data))
            resp.headers['Access-Control-Allow-Origin'] = '*'
            
            return resp
        else:
            return 'This request seemed to fail.'
    return 'Wasn\'t a GET request for some reason.'