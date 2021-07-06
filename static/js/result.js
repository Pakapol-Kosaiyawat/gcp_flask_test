var str_rel0 = document.getElementById("relate_text0").innerHTML;
var str_dup0 = document.getElementById("duplicate0").innerHTML;

var str_rel1 = document.getElementById("relate_text1").innerHTML;
var str_dup1 = document.getElementById("duplicate1").innerHTML;

var str_rel2 = document.getElementById("relate_text2").innerHTML;
var str_dup2 = document.getElementById("duplicate2").innerHTML;

document.getElementById("score0").innerHTML = Math.round(parseFloat(document.getElementById("score0").innerHTML)*100);
document.getElementById("score1").innerHTML = Math.round(parseFloat(document.getElementById("score1").innerHTML)*100);
document.getElementById("score2").innerHTML = Math.round(parseFloat(document.getElementById("score2").innerHTML)*100);

console.log(str_rel0);
str_rel0 = str_rel0.replace("[","");
str_rel0 = str_rel0.replace("]","");
str_rel0 = str_rel0.replaceAll("'","");

str_dup0 = str_dup0.replace("[","");
str_dup0 = str_dup0.replace("]","");
str_dup0 = str_dup0.replaceAll("'","");

const arr_relate0 =  str_rel0.split(", ");
const arr_duplicate0 =  str_dup0.split(", ");
console.log(arr_relate0);
console.log(arr_duplicate0);

console.log(str_rel1);
str_rel1 = str_rel1.replace("[","");
str_rel1 = str_rel1.replace("]","");
str_rel1 = str_rel1.replaceAll("'","");

str_dup1 = str_dup1.replace("[","");
str_dup1 = str_dup1.replace("]","");
str_dup1 = str_dup1.replaceAll("'","");

const arr_relate1 =  str_rel1.split(", ");
const arr_duplicate1 =  str_dup1.split(", ");
console.log(arr_relate1);
console.log(arr_duplicate1);

console.log(str_rel2);
str_rel2 = str_rel2.replace("[","");
str_rel2 = str_rel2.replace("]","");
str_rel2 = str_rel2.replaceAll("'","");

str_dup2 = str_dup2.replace("[","");
str_dup2 = str_dup2.replace("]","");
str_dup2 = str_dup2.replaceAll("'","");

const arr_relate2 =  str_rel2.split(", ");
const arr_duplicate2 =  str_dup2.split(", ");
console.log(arr_relate2);
console.log(arr_duplicate2);

let str0 = "";
for (let text0 in arr_relate0){
    if (arr_duplicate0.includes(arr_relate0[text0])) {
      str0 += '<mark>'+arr_relate0[text0]+'</mark>';
    } else {
      str0 += arr_relate0[text0] ;
    }
};
console.log(str0);
document.getElementById("relate_text0").innerHTML = str0;
    
let str1 = "";
for (let text1 in arr_relate1){
    if (arr_duplicate1.includes(arr_relate1[text1])) {
      str1 += '<mark>'+arr_relate1[text1]+'</mark>';
    } else {
      str1 += arr_relate1[text1] ;
    }
};
console.log(str1);
document.getElementById("relate_text1").innerHTML = str1;
    
let str2 = "";
for (let text2 in arr_relate2){
    if (arr_duplicate2.includes(arr_relate0[text2])) {
      str2 += '<mark>'+arr_relate2[text2]+'</mark>';
    } else {
      str2 += arr_relate0[text2] ;
    }
};
console.log(str2);
document.getElementById("relate_text2").innerHTML = str2;