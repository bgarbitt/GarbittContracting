import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, 
    session, url_for, jsonify, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('services', __name__, url_prefix='/services')

@bp.route('/retrieve', methods=('GET','POST'))
def retrieve():
    if request.method == 'POST':
        #print(request.form)
        #service = request.form['service']
        service = 'service title 1'
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
            #resp.headers['Access-Control-Allow-Methods'] = 'POST'
            #resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return resp
            #return jsonify(data)
        else:
            return 'This request seemed to fail.'
    return 'Wasn\'t a GET request for some reason.'