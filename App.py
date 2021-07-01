# -*- coding: utf-8 -*-
'''
in spyder flask using localhost:5000 to open page
'''
from flask import Flask,render_template, request ,jsonify
import Processing
app = Flask(__name__)
app.config["CACHE_TYPE"] = "null"

data = [
        {
            "id": 1,
            "library": "pythainlp",
            "language": "Python"
        },
        {
            "id": 2,
            "library": "math",
            "language": "Python"
        },
        {
            "id": 3,
            "library": "googlesearch",
            "language": "Python"
        },
        {
            "id": 4,
            "library": "bs4",
            "language": "Python"
        },
        {
            "id": 5,
            "library": "re",
            "language": "Python"
        },
        {
            "id": 6,
            "library": "requests",
            "language": "Python"
        },
        {
            "id": 7,
            "library": "urllib3",
            "language": "Python"
        }
    ]

@app.route('/')
def index():
    return render_template('index.html',alert="")

@app.route('/api', methods=['GET'])
def get_api():
    return jsonify(data)

@app.route('/', methods=['POST'])
def my_form_post():
    text = request.form['text']
    if(text == ''):
        return render_template('index.html',alert = "alert")
    else:
        clean_text = text.replace('\xc2\xa0','')
        clean_text = clean_text.replace('\xa0','')
        clean_text = clean_text.replace('\n','')
        clean_text = clean_text.replace('\n\n','')
        processed_text = Processing.detect_similarity(clean_text)
        return render_template('result.html',Paragraph=processed_text[0]
                               ,Paragraph_relate=processed_text[1]
                               ,url=processed_text[2]
                               ,score=str(round(processed_text[3]*100))
                               ,duplicate = processed_text[4])
    
@app.after_request
def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response
    
if __name__ == '__main__':
    app.debug = True
    app.run()