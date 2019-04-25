from flask import Flask
from flask import jsonify
from flask import request
from tensorflow.keras.models import load_model
from tensorflow.keras.backend import clear_session
import numpy as np
import gc

app = Flask(__name__)

def recommend_softmax(team):
    softmax_model = load_model('softmax_prediction.model')
    vector = [0] * 234
    for t in team[0:4]:
        vector[t] = 1
    for t in team[4:]:
        vector[117 + t] = 1
    test = []
    test.append(vector)
    test = np.array(test)
    prediction = softmax_model.predict(test) 
    res = prediction[0].argsort()[-5:][::-1]
    clear_session()
    del softmax_model
    gc.collect()
    return res

def recommend_sigmoid(team):
    sigmoid_model = load_model('sigmoid_prediction.model')
    vector = [0] * 234
    res = [0] * 117
    for t in team[0:4]:
        vector[t] = 1
    for t in team[4:]:
        vector[117 + t] = 1
    for z in range(117):
        top = list(vector[0:117]) 
        bot = list(vector[117:234])
        if(top[z] == 1 or bot[z] == 1):
            continue
        top[z] = 1
        test = []
        test.append(top + bot)
        test.append(bot + top)
        test = np.array(test)
        prediction = sigmoid_model.predict(test) 
        winning_chance = (prediction[0] + 1 - prediction[1]) / 2
        res[z] = float(winning_chance)
    res=np.array(res)
    clear_session()
    del sigmoid_model
    gc.collect()
    return(res.argsort()[-5:][::-1])

@app.route('/recommendations', methods=['POST'])
def recommend():
    data = request.get_json()
    vec = data['vec']
    model = data['model']
    result = []
    if model == 'softmax':
        result = recommend_softmax(vec)
    else:
        result = recommend_sigmoid(vec)
    res = []
    for n in result:
        res.append(int(n))
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)