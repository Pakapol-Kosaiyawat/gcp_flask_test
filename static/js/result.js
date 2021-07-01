var str_rel = document.getElementById("relate_text").innerHTML;
console.log(str_rel);
str_rel = str_rel.replace("[","");
str_rel = str_rel.replace("]","");
str_rel = str_rel.replaceAll("'","");

var str_dup = document.getElementById("duplicate_text").innerHTML;
str_dup = str_dup.replace("[","");
str_dup = str_dup.replace("]","");
str_dup = str_dup.replaceAll("'","");

const arr_relate =  str_rel.split(", ");
const arr_duplicate =  str_dup.split(", ");

const relate = arr_relate;
const duplicate = arr_duplicate;
console.log(relate);
console.log(duplicate);

let str = "";
for (let text in relate){
    if (duplicate.includes(relate[text])) {
      str += '<mark>'+relate[text]+'</mark>';
    } else {
      str += relate[text] ;
    }
};
console.log(str);
document.getElementById("relate_text").innerHTML = str;