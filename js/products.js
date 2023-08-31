const ORDER_ASC_BY_COST = "HIGH_TO_LOW";
const ORDER_DESC_BY_COST = "LOW_TO_HIGH";
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "RELEVANCE";
let productsArray = [];
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array) {
    let result = [];

    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort((a, b) => parseInt(b.soldCount) - parseInt(a.soldCount));
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort((a, b) => parseInt(b.cost) - parseInt(a.cost));
    } else if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort((a, b) => parseInt(a.cost) - parseInt(b.cost));
    }
    return result;
};
   
function redirectToInfo() {
    window.location.href="product-info.html";
};

function showProductsList() {
    let htmlContentToAppend = "";

    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) && ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
                htmlContentToAppend += `
                <div class="row cursor-active" onclick="redirectToInfo()">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.cost} ${product.currency}</h4>
                            <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>`;
        };
        
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    };
};

function sortAndShowProducts(sortCriteria, categoriesArray){
    if (categoriesArray != undefined) {
        productsArray = categoriesArray;
    };
    
    productsArray = sortProducts(sortCriteria, productsArray);
    
    showProductsList();
};
   
           
document.addEventListener('DOMContentLoaded', function() {
    validar_login();
    resetear();

    document.getElementById('search_product').addEventListener('input', function() {
        let busqueda = document.getElementById('search_product').value;
        productsArray = productsArray.filter(item => item.name.toLowerCase().includes(busqueda.toLowerCase()));
                    
        if (busqueda !== "") {
            showProductsList();
        } else {
            resetear();
        }
    });

    function resetear() {
        //Pauta 2 - Entrega 2
        fetch(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`)
            .then(response => response.json())
            .then(data => {
                productsArray = data.products;
                showProductsList();
            })
            .catch(error => {
                console.error("Error al cargar los productos:", error);
            });
    };
        
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
            
        minCount = undefined;
        maxCount = undefined;
            
        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
    
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        };
        
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        };
    
        showProductsList();
    });
       
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.clear();
        sessionStorage.clear();
        document.getElementById("alert-logout").classList.add('show');
        setTimeout(() => {
            document.getElementById("alert-logout").classList.remove('show');
            location.href="login.html"
        }, 2500);
    });

    function validar_login() {
        if ((localStorage.getItem("email") === null) && (sessionStorage.getItem("email") === null)) {
            document.getElementById("alert-nologin").classList.add('show');
            setTimeout(() => {
                document.getElementById("alert-nologin").classList.remove('show');
                location.href="login.html"
            }, 2000);
        } if ((localStorage.getItem("email") === null) && (sessionStorage.getItem("email") !== null)) {
            document.getElementById("alert-yeslogin").classList.add('show');
            setTimeout(() => {
                document.getElementById("alert-yeslogin").classList.remove('show');
            }, 2500);
        } if ((localStorage.getItem("email") !== null) && (sessionStorage.getItem("email") === null)) {
            document.getElementById("alert-yeslogin").classList.add('show');
            setTimeout(() => {
                document.getElementById("alert-yeslogin").classList.remove('show');
            }, 2500);
        };
    };
});
