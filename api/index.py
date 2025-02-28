from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import nltk
from nltk.tokenize import sent_tokenize

app = Flask(__name__)
CORS(app)

nltk.download('punkt')

# Load Paraphrasing Model
device = "cpu"
paraphrase_tokenizer = AutoTokenizer.from_pretrained("/Users/parth/Desktop/t5-base-chatgpt-150000")
paraphrase_model = AutoModelForSeq2SeqLM.from_pretrained("/Users/parth/Desktop/t5-base-chatgpt-150000").to(device)

def paraphrase_sentence(sentence):
    num_beams = 5
    num_beam_groups = 5
    num_return_sequences = 5
    repetition_penalty = 10.0
    diversity_penalty = 3.0
    no_repeat_ngram_size = 2
    temperature = 0.7
    max_length = 256

    input_ids = paraphrase_tokenizer(
        f'paraphrase: {sentence}',
        return_tensors="pt", padding="longest",
        max_length=max_length,
        truncation=True,
    ).input_ids.to(device)

    outputs = paraphrase_model.generate(
        input_ids, temperature=temperature, repetition_penalty=repetition_penalty,
        num_return_sequences=num_return_sequences, no_repeat_ngram_size=no_repeat_ngram_size,
        num_beams=num_beams, num_beam_groups=num_beam_groups,
        max_length=max_length, diversity_penalty=diversity_penalty
    )

    res = paraphrase_tokenizer.batch_decode(outputs, skip_special_tokens=True)
    
    # Return the 3rd, 4th, and 5th results
    return res[2:5]

def paraphrase_text(text):
    sentences = nltk.sent_tokenize(text)
    paraphrased_sentences = [paraphrase_sentence(sent) for sent in sentences]

    # Join the paraphrased sentences together, ensuring each paraphrased version is separate
    final_output = []
    for i, sentences_group in enumerate(zip(*paraphrased_sentences), 1):
        final_output.append(f"Paraphrased Version {i}:\n" + " ".join(sentences_group) + "\n")  # Adds newline after each version

    return "\n".join(final_output)  # Joins all versions with a newline in between

def load_translation_model(source_lang, target_lang):
    global tokenizer_translation, model_translation
    model_name = f"Helsinki-NLP/opus-mt-{source_lang}-{target_lang}"
    
    tokenizer_translation = AutoTokenizer.from_pretrained(model_name)
    model_translation = AutoModelForSeq2SeqLM.from_pretrained(model_name, return_dict=True)

def translate_text(text, source_lang, target_lang):
    try:
        load_translation_model(source_lang, target_lang)
        sentences = sent_tokenize(text)

        translated_sentences = []
        for sentence in sentences:
            inputs = tokenizer_translation.encode(sentence, return_tensors='pt', max_length=256, truncation=True)
            translated_ids = model_translation.generate(
                inputs, max_length=256, num_beams=5, length_penalty=1.2, early_stopping=False
            )
            translated_text = tokenizer_translation.decode(translated_ids[0], skip_special_tokens=True)
            translated_sentences.append(translated_text)

        return " ".join(translated_sentences)
    except Exception as e:
        return str(e)

# Summarization Model
summary_tokenizer = AutoTokenizer.from_pretrained('t5-base')
summary_model = AutoModelForSeq2SeqLM.from_pretrained('t5-base', return_dict=True)

import re

def summarize_text(text):
    try:
        inputs = summary_tokenizer.encode("summarize: " + text, return_tensors='pt', max_length=256, truncation=True)
        summary_ids = summary_model.generate(inputs, max_length=256, min_length=80, length_penalty=5.0, num_beams=4)
        summary = summary_tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        summary = summary.capitalize().replace(" .", ".")

        # Paraphrase the summary
        paraphrased_summaries = paraphrase_text(summary)

        # Extract the first paraphrased version
        first_paraphrased_version = paraphrased_summaries.split("\n\n")[0]

        # Remove "Paraphrased Version X:" using regex
        cleaned_output = re.sub(r'Paraphrased Version \d+:\s*', '', first_paraphrased_version).strip()

        return cleaned_output
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
            result = paraphrase_text(text)  # Now fully integrated
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
