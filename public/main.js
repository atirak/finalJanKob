var list = <%-JSON.stringify(data)%>;
var build = JSON.parse(list);
console.log(list);
console.log(build[0].name +" "+build[0].lastname);
sessionStorage.setItem("name",build[0].name +" "+build[0].lastname)

function showUser(){
    document.getElementById('showUser').innerHTML = sessionStorage.getItem("name")
    console.log("555")
    
}