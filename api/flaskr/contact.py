from flask import (
    Blueprint, request,
    jsonify, make_response,
    current_app
)
from flask_mail import (Mail, Message)

bp = Blueprint('contact', __name__)

@bp.route('/contact', methods=('GET','POST'))
def contact():
    if request.method == 'POST':
        mail = Mail(current_app)

        # The fields the user has filled out (might be empty)
        name = request.form['name']
        organization = request.form['organization']
        email = request.form['email']
        phone = request.form['phone']
        message = request.form['message']

        if not name:
            name = "[no name given]"
        if not organization:
            organization = "[no organization given]"
        if not email:
            email = "[no email given]"
        if not phone:
            phone = "[no phone number given]"
        if not message:
            message = "[no message given]"
        body = \
            "Name: " + name + "\n" + \
            "Organization: " + organization + "\n" + \
            "Email: " + email + "\n" + \
            "Phone: " + phone + "\n" + \
            "Message: " + message + "\n"
        msg = Message("Website Contact Message", 
                      sender="garbitt@telus.net",
                      recipients=["garbitt@telus.net"]
                      )
        msg.body = body
        mail.send(msg)
        data = {"confirmed": True}
        resp = make_response(jsonify(data))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    else:
        print("huh?")