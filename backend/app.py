import os
import psycopg2
import json
from flask import Flask, render_template, request, send_from_directory
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)

from models import Pool, Build

# Route front-end

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/admin/')
def admin():
    # Page for debugging/dev
    builds = Build.query.all()
    pools = Pool.query.all()
    return render_template('admin.html', pools=pools, builds=builds)

# API

@app.route('/build/', methods=['POST'])
def add_build():
    pool_id = request.get_json().get('pool')
    cards = request.get_json().get('cards')
    pool = Pool.query.filter_by(id=pool_id).first()
    build = Build(cards, pool)
    db.session.add(build)
    db.session.commit()
    return 'Build Added %s' % (build)

@app.route('/build/<string:build_id>', methods=['GET'])
def get_build(build_id):
    build = Build.query.filter_by(id=build_id).first()
    return jsonify(cards=build.cards)

@app.route('/pool/', methods=['POST'])
def add_pool():
    cards = request.get_json().get('cards')
    pool = Pool(json.dumps(cards))
    db.session.add(pool)
    db.session.commit()
    return 'Pool Added %s' % (pool)

@app.route('/pool/<string:pool_id>', methods=['GET'])
def get_pool(pool_id):
    pool = Pool.query.filter_by(id=pool_id).first()
    return jsonify(cards=pool.cards)

@app.route('/sets/<string:set_id>', methods=['GET'])
def get_set(set_id):
    return send_from_directory('fixtures', filename=set_id + '.json')

#####

def init_db():
    db.create_all()


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
