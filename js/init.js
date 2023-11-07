const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function validar_login() {
    // Función que recuerda el inicio de sesión.
    let email = localStorage.getItem("email") || sessionStorage.getItem("email");
    let login = sessionStorage.getItem("login");

    if (login && email) {
        document.getElementById('navbarScrollingDropdown').innerHTML = email;
    } else if (email) {
        document.getElementById('navbarScrollingDropdown').innerHTML = email;
        sessionStorage.setItem("login", "true");
        document.getElementById("alert-yeslogin").classList.add('show');
        setTimeout(() => {
            document.getElementById("alert-yeslogin").classList.remove('show');
        }, 2500);
    } else {
        document.getElementById("alert-nologin").classList.add('show');
        setTimeout(() => {
            document.getElementById("alert-nologin").classList.remove('show');
            location.href = "login.html";
        }, 2000);
    };
};

function logout() {
    //Funión para cerrar sesion, muestra la alerta de que cerraste sesion y redirije al login
    localStorage.clear();
    sessionStorage.clear();
    document.getElementById("alert-logout").classList.add('show');
    setTimeout(() => {
        document.getElementById("alert-logout").classList.remove('show');
        location.href="login.html"
    }, 2500);
};

function cambiarFondo() {
    //Función para cambiar el fondo a modo dark 
    if (localStorage.getItem("theme") === null || localStorage.getItem("theme") === "light") {
        document.getElementsByTagName("body")[0].classList.add("dark-mode");
        localStorage.setItem("theme", "dark"); 
    } else {
        document.getElementsByTagName("body")[0].classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    };
};

document.addEventListener("DOMContentLoaded", ()=> {
    validar_login();

    if (localStorage.getItem("theme") === "dark") {
        document.getElementsByTagName("body")[0].classList.add("dark-mode");
    };

    document.getElementById("cambioFondo").addEventListener("click", cambiarFondo);

    document.getElementById("logout").addEventListener("click", logout);
});