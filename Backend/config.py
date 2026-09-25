import os

class Config:
    # Configuration de la base de données
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:0000@localhost:3306/salamiadb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Clé secrète pour la sécurité
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'votre-clé-secrète-ici'
