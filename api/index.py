from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)
CORS(app)

tokenizer_translation = None
model_translation = None

def load_translation_model(source_lang, target_lang):
    global tokenizer_translation, model_translation
    model_name = f"Helsinki-NLP/opus-mt-{source_lang}-{target_lang}"
    
    # Always reload instead of caching
    tokenizer_translation = AutoTokenizer.from_pretrained(model_name)
    model_translation = AutoModelForSeq2SeqLM.from_pretrained(model_name, return_dict=True)

import nltk
from nltk.tokenize import sent_tokenize

nltk.download('punkt')  # Ensure sentence tokenizer is available

def translate_text(text, source_lang, target_lang):
    try:
        load_translation_model(source_lang, target_lang)
        # Split text into sentences
        sentences = sent_tokenize(text)

        translated_sentences = []
        for sentence in sentences:
            inputs = tokenizer_translation.encode(sentence, return_tensors='pt', max_length=512, truncation=True)
            translated_ids = model_translation.generate(
                inputs, 
                max_length=512,  # Increase to avoid truncation
                num_beams=5, 
                length_penalty=1.2, 
                early_stopping=False
            )
            translated_text = tokenizer_translation.decode(translated_ids[0], skip_special_tokens=True)
            translated_sentences.append(translated_text)

        return " ".join(translated_sentences)
    except Exception as e:
        return str(e)

# Summarization Model
summary_tokenizer = AutoTokenizer.from_pretrained('t5-base')
summary_model = AutoModelForSeq2SeqLM.from_pretrained('t5-base', return_dict=True)

def summarize_text(text):
    try:
        inputs = summary_tokenizer.encode("summarize: " + text, return_tensors='pt', max_length=1024, truncation=True)
        summary_ids = summary_model.generate(inputs, max_length=1024, min_length=80, length_penalty=5.0, num_beams=8)
        summary = summary_tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        summary = summary.capitalize().replace(" .", ".")
        return summary
    except Exception as e:
        return str(e)

@app.route('/api/textanalyze', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get('text')
    action = data.get('action')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        if action == "summarize":
            result = summarize_text(text)
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
