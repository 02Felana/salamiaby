from flask import Blueprint, request, jsonify
from db import db
from models import Translation

translation_bp = Blueprint('translation', __name__)

@translation_bp.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    texte_source = data.get('texte_source')
    dialecte = data.get('dialecte')

    if not texte_source or not dialecte:
        return jsonify({'error': 'Texte source et dialecte requis'}), 400

    result = Translation.query.filter_by(texte_source=texte_source, dialecte=dialecte).first()

    if result:
        return jsonify({'traduction': result.traduction})
    else:
        return jsonify({'message': 'Traduction non trouvée'}), 404
