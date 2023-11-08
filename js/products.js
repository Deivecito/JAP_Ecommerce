const ORDER_ASC_BY_COST = "HIGH_TO_LOW";
const ORDER_DESC_BY_COST = "LOW_TO_HIGH";
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "RELEVANCE";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array) {
    //Función que ordena el arreglo de productos según el filtro
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

function setProdID(id) {
    //Funcion que guarda el id del producto seleccionado y redirije a la info de ese profucto
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
};

function showProductsList() {
    //Función que muestra la lista de productos
    let htmlContentToAppend = "";

    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) && ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            htmlContentToAppend += `
                <div class="row cursor-active" onclick="setProdID(${product.id})">
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

function sortAndShowProducts(sortCriteria, productsArray){
    //Función que ordena y muestra productos ordenados
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    };
    
    currentProductsArray = sortProducts(sortCriteria, currentProductsArray);
    
    showProductsList();
};  
           
function searchProducts(){
    //Función que busca y filtra productos en tiempo real, segun el texto agregado
    let busqueda = document.getElementById('search_product').value;
    currentProductsArray = currentProductsArray.filter(item => item.name.toLowerCase().includes(busqueda.toLowerCase()));
                
    if (busqueda !== "") {
        showProductsList();
    } else {
        getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentProductsArray = resultObj.data.products
                showProductsList()
            }
        });
    };
};

document.addEventListener('DOMContentLoaded', function() {
    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProductsList()
        }
    });

    document.getElementById('search_product').addEventListener('input', searchProducts);

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });
        
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
       
});
