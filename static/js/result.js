var str_rel = document.getElementById("relate_text").innerHTML;
var str_dup = document.getElementById("duplicate_text").innerHTML;

var score = document.getElementById("score").innerHTML;
var urls = document.getElementById("urls").innerHTML;

for (let index in str_rel){
    str_rel[index] = str_rel.replace("[","");
    str_rel[index] = str_rel.replace("]","");
    str_rel[index] = str_rel.replaceAll("'","");
    
    str_dup[index] = str_dup.replace("[","");
    str_dup[index] = str_dup.replace("]","");
    str_dup[index] = str_dup.replaceAll("'","");
    
    const arr_relate =  str_rel[index].split(", ");
    const arr_duplicate =  str_dup[index].split(", ");
    
    const relate_list = arr_relate;
    const duplicate = arr_duplicate;
    
    let str = "";
    for (let text in relate_list){
        if (duplicate.includes(relate[text])) {
          str += '<mark>'+relate[text]+'</mark>';
        } else {
          str += relate[text] ;
        }
    };
    document.getElementById("relate_text").innerHTML += str;   
    document.getElementById("score").innerHTML += score[index];
    document.getElementById("urls").innerHTML += url[index];
};