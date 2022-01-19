# -*- coding: utf-8 -*-
from pythainlp.tokenize import word_tokenize
import math
from googlesearch import search
from bs4 import BeautifulSoup
import re
import requests
import urllib3

urllib3.disable_warnings()  

def detect_similarity(Article):
    Article = Article.replace('\t','')
    Article = Article.replace('\t\t','')
    Article = Article.replace('\r','')
    Article = Article.replace('\r\r','')
    def check_plagiarized(Original_Text,Sus_text): 
    
        #variable
        tokennize_ori = word_tokenize(Original_Text, keep_whitespace=False, engine="newmm")
        tokennize_sus = word_tokenize(Sus_text, keep_whitespace=False, engine="newmm")
        duplicate_keys = [] #collect keys that original and suspect have the same 
        Origin_dict = {}
        Sus_dict = {}
        duplicate = []
        wkre=0      #is the weight of the reference document, which is obtained from the same keywords between reference document and second document
        wkse=0      #is the weight of the second document, which is obtained from the same keywords between reference document and the second document
        
        #creat dict of term frequnt of text
        for i in tokennize_ori:
            if i not in Origin_dict:
                Origin_dict[i] = 0
            Origin_dict[i] += 1
            if i in tokennize_sus:
                duplicate.append(i)
            
        for i in tokennize_sus:
            if i not in Sus_dict:
                Sus_dict[i] = 0
            Sus_dict[i] += 1
        
        for i in Sus_dict.keys():
            if (i in Origin_dict.keys()):
                duplicate_keys.append(i)
        #relevance_calculation using cosin similarity
        for i in duplicate_keys:#this for loop used for access key that original and suspect has the same
            wkre = wkre+Origin_dict[i]
            wkse = wkse+Sus_dict[i]
    
        
        max_ori = 1
        max_sus = 1
        if(bool(Origin_dict.values())):
            max_ori =max(Origin_dict.values())
        if(bool(Sus_dict.values())):
            max_sus =max(Sus_dict.values())
            
        wkre = wkre/max_ori
        wkse = wkse/max_sus
        wkr = sum(Origin_dict.values())/max_ori #the weight of the keywords in reference document
        wks = sum(Sus_dict.values())/max_sus       #the weight of the keywords in second document
        relevance = (wkre*wkse)/(math.sqrt(wkr**2)*math.sqrt(wks**2))
    
        return relevance,duplicate
        
    #get 3 urls relate article
    def search_relate(query) :  
        urls = []
        for j in search(query, num_results =5):
            if('.pdf'not in j and '/file?type=supplementary'not in j and 'siam.wiki'not in j and 'download' not in j):
                urls.append(j)
                
        return urls
    
    #extact paragraph from url and apply check_plagiarized function
    urls = search_relate(Article)
    url_score_list = []
    most_sim_list = []
    duplicate_list = []
    
    for url in urls:
        url_simi_score = 0.0
        res = requests.get(url,verify = False)
        
        #get charset from soup
        soup = BeautifulSoup(res.text, 'html.parser')
        encode = soup.original_encoding
        if(encode == None):
            if soup and soup.meta:
                encode = soup.meta.get('charset')
                if encode == None:
                    encode = soup.meta.get('content-type')
                    if encode == None:
                        content = soup.meta.get('content')
                        match = re.search('charset=(.*)', content)
                        if match:
                            encode = match.group(1)
        
        if(encode == None):
            encode = 'utf-8'
        res.encoding = encode     #set encoding type
        soup = BeautifulSoup(res.text, 'html.parser', from_encoding=encode)#create soup after set new encoder
        div = soup.find_all('div')
        span = soup.find_all('span')
        content = soup.find_all('p')
        most_sim = ''
        duplicate = []
        if content != None:
            for tag in content:
                clean_text = tag.text.replace('\xc2\xa0','')
                clean_text = clean_text.replace('\xa0','')
                clean_text = clean_text.replace('\n','')
                clean_text = clean_text.replace('\n\n','')
                clean_text = clean_text.replace('\r','')
                clean_text = clean_text.replace('\r\r','')
                if (word_tokenize(clean_text, keep_whitespace=False, engine="newmm") != []):
                    check_result = check_plagiarized(Article,clean_text)
                    if(check_result[0] > url_simi_score):
                        url_simi_score = check_result[0]
                        most_sim = clean_text
                        duplicate = check_result[1]
                        
        if div != None:
            for tag in div:
                clean_text = tag.text.replace('\xc2\xa0','')
                clean_text = clean_text.replace('\xa0','')
                clean_text = clean_text.replace('\n','')
                clean_text = clean_text.replace('\n\n','')
                clean_text = clean_text.replace('\r','')
                clean_text = clean_text.replace('\r\r','')
                if (word_tokenize(clean_text, keep_whitespace=False, engine="newmm") != []):
                   check_result = check_plagiarized(Article,clean_text)
                   if(check_result[0] > url_simi_score):
                        url_simi_score = check_result[0]
                        most_sim = clean_text
                        duplicate = check_result[1]
                        
        if span != None:
            for tag in span:
                clean_text = tag.text.replace('\xc2\xa0','')
                clean_text = clean_text.replace('\xa0','')
                clean_text = clean_text.replace('\n','')
                clean_text = clean_text.replace('\n\n','')
                clean_text = clean_text.replace('\r','')
                clean_text = clean_text.replace('\r\r','')
                if (word_tokenize(clean_text, keep_whitespace=False, engine="newmm") != []):
                    check_result = check_plagiarized(Article,clean_text)
                    if(check_result[0] > url_simi_score):
                        url_simi_score = check_result[0]
                        most_sim = clean_text
                        duplicate = check_result[1]
        
        most_sim_list.append(word_tokenize(most_sim, keep_whitespace=True, engine="newmm"))
        url_score_list.append(url_simi_score)
        duplicate_list.append(duplicate)
    
        
    #select 3 highest score source
    #sort by score
    for iter_num in range(len(url_score_list)-1,0,-1):
        for idx in range(iter_num):
            if url_score_list[idx]>url_score_list[idx+1]:
                temp = url_score_list[idx]
                url_score_list[idx] = url_score_list[idx+1]
                url_score_list[idx+1] = temp
               
                temp = most_sim_list[idx]
                most_sim_list[idx] = most_sim_list[idx+1]
                most_sim_list[idx+1] = temp
               
                temp = urls[idx]
                urls[idx] = urls[idx+1]
                urls[idx+1] = temp
                
                temp = duplicate_list[idx]
                duplicate_list[idx] = duplicate_list[idx+1]
                duplicate_list[idx+1] = temp
               
               
    Max_score = url_score_list[::-1]
    tokenized_maxpara = most_sim_list[::-1]
    Max_url = urls[::-1]
    duplicate = duplicate_list[::-1]
    
    return ([Article,tokenized_maxpara,Max_url,Max_score,duplicate])