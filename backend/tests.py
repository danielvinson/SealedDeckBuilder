from flask.ext.testing import TestCase
from app import db
from models import Pool, Build

class DBTests(TestCase):

    SQLALCHEMY_DATABASE_URI = ['test db uri...']
    TESTING = True

    def create_app(self):
	app = Flask(__name__)
	app.config['TESTING'] = True
        return app

    def setUp(self):
	db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


