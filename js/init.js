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

function cambiarFondo() {
    // Pauta 3 -Entrega 4
    if (localStorage.getItem("theme") === null || localStorage.getItem("theme") === "light") {
        document.getElementsByTagName("body")[0].classList.add("dark-mode");
        localStorage.setItem("theme", "dark"); 
    } else {
        document.getElementsByTagName("body")[0].classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    };
};

document.addEventListener("DOMContentLoaded", ()=> {
	//Pauta 1 - Entrega 2
    if (localStorage.getItem("email") !== null) {
      document.getElementById("navbarScrollingDropdown").innerHTML = localStorage.getItem("email");
    };

    if (localStorage.getItem("theme") === "dark") {
        document.getElementsByTagName("body")[0].classList.add("dark-mode");
    };

    document.getElementById("cambioFondo").addEventListener("click", ()=> {
        cambiarFondo();
    });
});