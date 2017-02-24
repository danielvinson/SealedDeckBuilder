from datetime import datetime

from app import db

class Pool(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    cards = db.Column(db.Text) # JSON string array of multiverse ids ex. json.dumps([12345, 12345, 12345])
    timestamp = db.Column(db.DateTime)
    
    def __init__(self, cards, timestamp=None):
        self.cards = cards
        if timestamp is None:
            timestamp = datetime.utcnow()
        self.timestamp = timestamp
    
    def __repr__(self):
        return '<Pool %r>' % self.id


class Build(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime)
    cards = db.Column(db.Text) 
    
    pool_id = db.Column(db.Integer, db.ForeignKey('pool.id'))
    pool = db.relationship('Pool', backref=db.backref('builds', lazy='dynamic'))

    def __init__(self, cards, pool, timestamp=None):
        self.cards = cards
        if timestamp is None:
            timestamp = datetime.utcnow()
        self.timestamp = timestamp
        self.pool = pool

    def __repr__(self):
        return '<Build %r>' % self.id
