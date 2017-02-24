import os

from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)

# Route front-end

@app.route('/')
def home():
    return render_template('home.html')


# API

from models import Pool, Build

@app.route('/build/', methods=['POST'])
def add_build():
    return True

@app.route('/build/<string:build_id>', methods=['GET'])
def get_build(build_id):
    return "Build"

@app.route('/pool/', methods=['POST'])
def add_pool():
    return True

@app.route('/pool/<string:pool_id>', methods=['GET'])
def get_pool(pool_id):
    return "Pool ID: %s" % (pool_id)

#####

def init_db():
    db.create_all()


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
