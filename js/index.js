
setTimeout(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("pass");
}, 50000);

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
        document.getElementById("btn-login").addEventListener("click", function() {
  if ((localStorage.getItem("email") !== null) && (localStorage.getItem("pass") !== null)){
    document.getElementById("alert-yeslogin").classList.add('show');
    setTimeout(() => {
        document.getElementById("alert-yeslogin").classList.remove('show');
    }, 2500);
}else {
   document.getElementById("alert-nologin").classList.add('show');
    setTimeout(() => {
        document.getElementById("alert-nologin").classList.remove('show');
        location.href="login.html"
    }, 2000);
};
        });
});