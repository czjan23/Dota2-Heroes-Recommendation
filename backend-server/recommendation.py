from tensorflow.keras.models import load_model
import numpy as np

class SigmoidRecommendation():
    def __init__(self):
        self.model = load_model('sigmoid_prediction.model')

    def get_result(self, team):        

        if(len(team)==9):
            vector = [0]*234 # if hero id is 5, index 5 will be 1
            res = [] #this vector stores each hero's winning change from index 0-116, each index is a hero

            for t in team[0:4]:
                vector[t] = 1
            for t in team[4:]:
                vector[117+t] = 1

            for z in range(117):
                top = list(vector[0:117]) 
                bot = list(vector[117:234])
                
                if(top[z]==1): #skip for heroes those are already chosen
                    continue
                top[z] = 1 #hero we try to predict from 0-116

                test = []
                test.append(top + bot)#regular    
                test.append(bot + top) #flip top and bot

                test = np.array(test)

                
                prediction = self.model.predict(test) 
                winning_chance = (prediction[0] + 1-prediction[1])/2
                res.append(float(winning_chance))

            res=np.array(res)
            return(res.argsort()[-5:][::-1])#print top 5 recommended heroes based on their winning rate
        else:
            print('wrong team size')

class SoftmaxRecommendation():
    def __init__(self):
        self.model = load_model('softmax_prediction.model')  
        
    def get_result(self, team):        

        if(len(team)==9):
            vector = [0]*234 # if hero id is 5, index 5 will be 1
            
            for t in team[0:4]:
                vector[t] = 1
            for t in team[4:]:
                vector[117+t] = 1

            test = []
            test.append(vector)
            test = np.array(test)

            prediction = self.model.predict(test) 
            res = prediction[0].argsort()[-5:][::-1]  #show top 5 recommendation
            
            return(res)
        else:
            print('wrong team size')

