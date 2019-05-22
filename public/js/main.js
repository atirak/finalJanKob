function loadTerm() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/Term/get",
        data: JSON.stringify(""),
        dataType: 'json',
        success: function (customer) {
            console.log(customer);
            sessionStorage.setItem("year", customer[0].year);
            sessionStorage.setItem("term", customer[0].term);
            showSession()
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}
function showSession() {
    console.log(555)
    console.log(sessionStorage.getItem('year'))
    document.getElementById("showterm").innerHTML = "ภาคเรียนที่ : "+sessionStorage.getItem('term') +" / " +sessionStorage.getItem("year")
}
function setSession(data){
    sessionStorage.setItem("name", data[0].name);
    sessionStorage.setItem("lastname", data[0].lastname);
}
function showUser(){
    $('#showUser').text("ยินดีต้อนรับคุณ : " + sessionStorage.getItem("name") +" "+ sessionStorage.getItem('lastname'));
}