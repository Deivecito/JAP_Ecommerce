document.getElementById("alert-login").classList.remove('show');
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('inicio').addEventListener('click', function(){
        event.preventDefault();
        document.getElementById("alert-login").classList.remove("show");
    
if (document.getElementById('InputEmail1').value !== "" &&
    document.getElementById('InputPassword1').value !== "") {
    location.href="index.html";
    }else
    document.getElementById("alert-login").classList.add('show');
    setTimeout(() => { 
        document.getElementById("alert-login").classList.remove('show');
        
    }, 2500);



});
});