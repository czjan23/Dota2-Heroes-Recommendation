#!/usr/bin/env python
# coding: utf-8

# In[31]:


import numpy as np
from tensorflow.keras.models import load_model

class hero_recommendation():
    def __init__(self,team):
        self.model = load_model('sigmoid prediction.model')  
        self.team = team
        
    def get_result(self):        

        if(len(team)==9):
            vector = [0]*234 # if hero id is 5, index 5 will be 1
            res = [] #this vector stores each hero's winning change from index 0-116, each index is a hero

            for t in self.team:
                vector[t] = 1

            for z in range(117):
                top = list(vector[0:117]) 
                bot = list(vector[117:234])

                top[z] = 1 #hero we try to predict from 0-116

                test = []
                test.append(top + bot)#regular    
                test.append(bot + top) #flip top and bot

                test = np.array(test)

                prediction = model.predict(test) 
                winning_chance = (prediction[0] + 1-prediction[1])/2
                res.append(float(winning_chance))

            res=np.array(res)
            return(res.argsort()[-5:][::-1])#print top 5 recommended heroes based on their winning rate
        else:
            print('wrong team size')

