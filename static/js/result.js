let str_rel = document.getElementById("relate_text").innerHTML;
let str_dup = document.getElementById("duplicate_text").innerHTML;

let score = document.getElementById("score").innerHTML;
let urls = document.getElementById("urls").innerHTML;

for (let index in str_rel){
    str_rel[index] = str_rel[index].replace("[","");
    str_rel[index] = str_rel[index].replace("]","");
    str_rel[index] = str_rel[index].replaceAll("'","");
    
    str_dup[index] = str_dup[index].replace("[","");
    str_dup[index] = str_dup[index].replace("]","");
    str_dup[index] = str_dup[index].replaceAll("'","");
    
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
    }
    console.log(str);
    console.log(score[index]);
    console.log(url[index]);
    document.getElementById("relate_text").innerHTML += str;   
    document.getElementById("score").innerHTML += score[index];
    document.getElementById("urls").innerHTML += url[index];
}