from flask import Flask, jsonify
from flask.ext.mysql import mysql
import math

app = Flask(__name__)
#mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'my_user'
app.config['MYSQL_DATABASE_PASSWORD'] = 'my_password'
app.config['MYSQL_DATABASE_DB'] = 'my_database'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

#mysql.init_app(app)

@app.route('/')
def main():
    #cur = mysql.connect().cursor()
    #cur.execute('''select * from my_database.my_table''')
    #r = [dict((cur.description[i][0], value)
     #   for i, value in enumerate(row)) for row in cur.fetchall()]
    #return jsonify({'myCollection' : r})
    return "Get!"



if __name__ == '__main__':
    app.run()