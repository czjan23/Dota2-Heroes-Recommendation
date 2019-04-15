from flask import Flask
from flask import jsonify
from flask import request
from flask import g
from recommendation import SoftmaxRecommendation
from recommendation import SigmoidRecommendation

app = Flask(__name__)

def get_softmax_agent():
    agent = getattr(g, '_softmax', None)
    if agent is None:
        agent = g._softmax = SoftmaxRecommendation()
    return agent

def get_sigmoid_agent():
    agent = getattr(g, '_sigmoid', None)
    if agent is None:
        agent = g._sigmoid = SigmoidRecommendation()
    return agent

@app.route('/recommendations', methods=['POST'])
def recommend():
    data = request.get_json()
    vec = data['vec']
    model = data['model']
    agent = get_softmax_agent() if model == 'softmax' else get_sigmoid_agent()
    result = agent.get_result(vec)
    res = []
    for n in result:
        res.append(int(n))
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)
