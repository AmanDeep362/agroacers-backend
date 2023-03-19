import sys 
from flask import Markup
import pandas as pd
from utils.fertilizer import fertilizer_dic

# =============================================================================================
# render crop recommendation result page

N = int(sys.argv[1])
P = int(sys.argv[2])
K = int(sys.argv[3]) 
crop_name = sys.argv[4]

# print("My ans is", N, P, K, crop_name)


df = pd.read_csv('data/fertilizer.csv')

nr = df[df['Crop'] == crop_name]['N'].iloc[0]
pr = df[df['Crop'] == crop_name]['P'].iloc[0]
kr = df[df['Crop'] == crop_name]['K'].iloc[0]

n = nr - N
p = pr - P
k = kr - K

temp = {abs(n): "N", abs(p): "P", abs(k): "K"}

max_value = temp[max(temp.keys())]

if max_value == "N":
    if n < 0:
        key = 'NHigh'
    else:
        key = "Nlow"
elif max_value == "P":
    if p < 0:
        key = 'PHigh'
    else:
        key = "Plow"
else:
    if k < 0:
        key = 'KHigh'
    else:
        key = "Klow"

response = Markup(str(fertilizer_dic[key]))

print(response)

