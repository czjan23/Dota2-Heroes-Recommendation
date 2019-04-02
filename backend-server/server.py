from flask import Flask
from flask import jsonify
from flask import request
from recommendation import HeroRecommendation

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommend():
    data = request.get_json()
    rec = HeroRecommendation(data)
    result = rec.get_result()
    res = []
    for n in result:
        res.append(int(n))
    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)
