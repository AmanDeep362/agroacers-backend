import sys
from flask import Markup
import pandas as pd

# =============================================================================================
# render crop recommendation result page

N = int(sys.argv[1])
P = int(sys.argv[2])
K = int(sys.argv[3])
ph = int(sys.argv[4])
rainfall = int(sys.arvg[5])
state = sys.arvg[6]
city = sys.arvg[7]

# N = 20
# P = 30
# K = 40
# ph = 7
# rainfall = 144
# state = "Haryana"
# city = "Ynr"

print("My ans is", N, P, K, ph, rainfall, state, city)
