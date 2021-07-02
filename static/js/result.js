let str_rel = document.getElementById("relate_text").innerHTML;
let str_dup = document.getElementById("duplicate_text").innerHTML;

let score = document.getElementById("score").innerHTML;
let urls = document.getElementById("urls").innerHTML;

str_rel = str_rel.replace("[","");
str_rel = str_rel.replace("]","");
str_rel = str_rel.replaceAll("'","");
    
str_dup = str_dup.replace("[","");
str_dup = str_dup.replace("]","");
str_dup = str_dup.replaceAll("'","");

score = score.replace("[","");
score = score.replace("]","");
	
urls = urls.replace("[","");
urls = urls.replace("]","");
urls = urls.replaceAll("'","")

const arr_relate =  str_rel.split(", ");
const arr_duplicate =  str_dup.split(", ");
const arr_score =  score.split(", ");
const arr_urls =  urls.split(", ");
    
const relate_list = arr_relate;
const duplicate = arr_duplicate;
	
for (let index in str_rel){
    
    let str = "";
    for (let text in relate_list[index]){
        if (duplicate.includes(relate_list[text])) {
          str += '<mark>'+relate_list[text]+'</mark>';
        } else {
          str += relate_list[text] ;
        }
    }
    console.log(str);
	console.log(arr_relate);
	console.log(arr_duplicate);
    console.log(arr_score);
    console.log(arr_urls);
    document.getElementById("relate_text").innerHTML += str;   
    document.getElementById("score").innerHTML += arr_score;
    document.getElementById("urls").innerHTML += arr_urls;
}