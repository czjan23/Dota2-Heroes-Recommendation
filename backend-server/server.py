from flask import Flask
from flask import jsonify
from flask import request
from recommendation import SoftmaxRecommendation
from recommendation import SigmoidRecommendation

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommend():
    data = request.get_json()
    vec = data['vec']
    model = data['model']
    agent = SoftmaxRecommendation() if model == 'softmax' else SigmoidRecommendation()
    result = agent.get_result(vec)
    res = []
    for n in result:
        res.append(int(n))
    del agent
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)