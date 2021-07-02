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
        if (duplicate[index].includes(relate_list[index][text])) {
          str += '<mark>'+relate_list[index][text]+'</mark>';
        } else {
          str += relate_list[index][text] ;
        }
    }
    console.log(str);
	console.log(arr_relate[index]);
	console.log(arr_duplicate[index]);
    console.log(arr_score[index]);
    console.log(arr_urls[index]);
    document.getElementById("relate_text").innerHTML += str;   
    document.getElementById("score").innerHTML += arr_score[index];
    document.getElementById("urls").innerHTML += arr_urls[index];
}