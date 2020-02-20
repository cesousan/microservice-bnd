from app import db, ma


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(64), index=True)
    lastname = db.Column(db.String(64), index=True)
    username = db.Column(db.String(120), index=True)
    email = db.Column(db.String(120), index=True)
    password = db.Column(db.String(64))
    location = db.Column(db.String(128))


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
