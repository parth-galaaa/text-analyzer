from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)
CORS(app)

def translate_text(text, source_lang, target_lang):
    try:
        model_name = f'Helsinki-NLP/opus-mt-{source_lang}-{target_lang}'
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_name, return_dict=True)

        inputs = tokenizer.encode(text, return_tensors='pt', max_length=512, truncation=True)
        translated_ids = model.generate(inputs, max_length=512, num_beams=4, length_penalty=2.0, early_stopping=True)
        translated_text = tokenizer.decode(translated_ids[0], skip_special_tokens=True)

        return translated_text
    except Exception as e:
        return str(e)

@app.route('/api/textanalyze', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get('text')
    action = data.get('action')  # Determine the requested action

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        if action == "summarize":
            result = "Pending summary implementation"
        elif action == "paraphrase":
            result = "Pending paraphrase implementation"
        elif action == "sentiment":
            result = "Pending sentiment analysis implementation"
        elif action == "translate":
            source_lang = data.get('source_lang')
            target_lang = data.get('target_lang')
            result = translate_text(text, source_lang, target_lang)
        else:
            return jsonify({"error": "Invalid action"}), 400

        return jsonify({"output": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5328)