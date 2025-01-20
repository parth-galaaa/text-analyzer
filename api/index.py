from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/textanalyze', methods=['GET', 'POST'])  # Allow both GET and POST
def summarize():
    if request.method == 'POST':
        data = request.get_json()
        text = data.get('text')
        summary = text[:100]  # Summarizing text by taking the first 100 characters
        return jsonify({"summary": summary})
    elif request.method == 'GET':
        # You can return a message or documentation for GET requests
        return jsonify({"message": "Use POST to send text for summarization."})

if __name__ == '__main__':
    app.run(debug=True, port=5328)  # Run on port 5328
