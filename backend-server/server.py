from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommend():
    data = request.get_json()

    # results = getResults(data)

    result = [1,2,3]

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
