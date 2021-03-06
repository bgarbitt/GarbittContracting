from flask import (
    Blueprint, request, 
    jsonify, make_response
)
from flaskr.db import get_db

bp = Blueprint('services', __name__, url_prefix='/services')

@bp.route('/retrieve', methods=('GET','POST'))
def retrieve():
    if request.method == 'POST':
        service = request.form['service']
        db = get_db()
        error = None

        if not service:
            error = 'A service is required.'
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
            return resp
        else:
            return 'This request seemed to fail.'
    return 'Wasn\'t a POST request for some reason.'