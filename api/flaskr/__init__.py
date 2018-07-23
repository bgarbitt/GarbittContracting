import os

from flask import Flask
from flask_mail import Mail

def create_app(test_config=None):
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        DATABASE = os.path.join(app.instance_path, 'services.sqlite'),
    )
    #GMAIL settings
    '''
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='bgarbitt@ualberta.ca',
    MAIL_PASSWORD='Bretzky2499'
    '''
    #TELUS settings
    app.config.update(
        MAIL_SERVER='smtp.telus.net',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME='garbitt@telus.net',
        MAIL_PASSWORD='Garbh1943'
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    # registering the database functions.
    from . import db
    db.init_app(app)

    # simple test page
    @app.route('/test')
    def test():
        return 'This is a test.'

    # registering the blueprint for services
    from . import services
    app.register_blueprint(services.bp)

    # registering the blueprint for fleet
    from . import fleet
    app.register_blueprint(fleet.bp)
    app.add_url_rule('/', endpoint='fleet')

    # where the email will be constructed and sent.
    from . import contact
    app.register_blueprint(contact.bp)

    return app