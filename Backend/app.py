from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

# Configuration de la base de données
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '0000',  # Remplace par ton mot de passe réel
    'database': 'salamiadb',
    'cursorclass': pymysql.cursors.DictCursor
}

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    texte = data.get('text', '').lower()
    dialecte = data.get('dialect', '').lower()

    if not texte or not dialecte:
        return jsonify({'error': 'Champs manquants'}), 400

    traduction = f"[{dialecte.upper()}] {texte}"  # Simulation simple

    try:
        conn = pymysql.connect(**db_config)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO traductions (texte_source, dialecte, traduction) VALUES (%s, %s, %s)",
            (texte, dialecte, traduction)
        )
        conn.commit()
        cur.close()
        conn.close()
    except pymysql.MySQLError as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'translated': traduction})

if __name__ == '__main__':
    app.run(debug=True)
