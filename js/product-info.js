let cart = [];

function showComments() {
    //Pauta 3 - Entrega 3
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("prodID")}.json`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            document.getElementById("comentarios").innerHTML += `
                <li class="list-group-item">
                    <p class="mb-0">Aún no hay comentarios sobre este producto. Sé el primero en comentar</p>
                </li>
            `;
        } else {
            for (let i = 0; i < data.length; i++) {
                let stars = "";  
                for (let j = 0; j < 5; j++) {
                    if (j < data[i].score) {
                        stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>`;
                    } else {
                            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>`;
                    }
                };
                document.getElementById("comentarios").innerHTML += `
                    <li class="list-group-item">
                        <div style="display: flex;">
                            <p class="mb-0"><strong>${data[i].user}</strong>-</p><p class="mb-0 d-none d-lg-block">${data[i].dateTime}-</p><p class="mb-0">${stars}</p> 
                        </div>
                        <div class="row">
                            <p class="mb-0">${data[i].description}</p>
                        </div>
                    </li>
                `;
                stars = "";
            };
        };
    })
    .catch(error => {
        console.error("Error al cargar los comentarios:", error);
    });
};

function score() {
    let stars = document.querySelectorAll('.fa-star');
    let selectedRating = 0; 
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            let rating = star.getAttribute('value');
            if (selectedRating === rating) {
                selectedRating = 0;
                for (let i = 0; i <= 5; i++) {
                    stars[i].classList.remove('checkedd');
                    document.getElementById('selectedRating').textContent = `${selectedRating}`;
                };
            } else {
                selectedRating = rating;
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add('checkedd');
                };
            };
            for (let i = index + 1; i < stars.length; i++) {
                stars[i].classList.remove('checkedd');
            };
            document.getElementById('selectedRating').textContent = `${selectedRating}`;
        });
    });
}

function showProductInfo() {
    //Pauta 2 - Entrega 3
    fetch(`https://japceibal.github.io/emercado-api/products/${localStorage.getItem("prodID")}.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("container").innerHTML = `

        <div class="d-flex justify-content-between">
                <p class="fs-2 mt-4 mb-4">${data.name}</p>
                <button type="button" class="btn btn-success m-4" onclick="addToCart(${data.id})">Comprar</button>
            </div>

            <hr>
            <div class="row">
                <p class="mb-0"><strong>Precio</strong></p>
                <p>${data.currency} ${data.cost}</p>
            </div>
            <div class="row">
                <p class="mb-0"><strong>Descripción</strong></p>
                <p>${data.description}</p>
            </div>
            <div class="row">
                <p class="mb-0"><strong>Categoría</strong></p>
                <p>${data.category}</p>
            </div>
            <div class="row">
                <p class="mb-0"><strong>Cantidad de vendidos</strong></p>
                <p>${data.soldCount}</p>
            </div>
            <div class="row">
                <p class="mb-2"><strong>Imágenes Ilustrativas</strong></p>
                <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
                 <div class="carousel-indicators">
                     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="${data.images[0]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${data.images[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${data.images[2]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${data.images[3]}" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
            </div>
        `;
        // Entrega 4 - Pauta 1
        for (let i = 0; i < data.relatedProducts.length; i++) {
            document.getElementById("relatedProducts").innerHTML += `
                <div class="m-2 card cursor-active" style="width: 18rem;" onclick="setProdID(${data.relatedProducts[i].id})">
                    <img src="${data.relatedProducts[i].image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.relatedProducts[i].name}</h5>
                    </div>
                </div>
            `;
        };
    })
    .catch(error => {
        console.error("Error al cargar la información del producto:", error);
    });
};

function addComment(){
    //Desafiate - Entrega 3 
    let date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

    let comment = document.getElementById('review').value;
    let star = (document.getElementById('selectedRating').textContent);
  
    let stars = "";
    for (let i = 0; i < 5; i++) {
        if (i < star) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>`;
        } else {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>`;
        };
    };
    document.getElementById("comentarios").innerHTML += `
        <li class="list-group-item">
            <div class="row">
                <p class="mb-0"><strong>${localStorage.getItem("email")}</strong> - ${currentDate} - ${stars}</p> 
            </div>
            <div class="row">
                <p class="mb-0">${comment}</p>
            </div>
        </li>
    `;
    document.getElementById("review").value = "";
    document.getElementById("selectedRating").innerText = 0;
};

function setProdID(id) {
    //Pauta 1 - Entrega 3
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
};

//Entrega 5 - Desafiate
function addToCart(id) {
    //Recuerda los elementos guardados en el almacenamiento, y actualiza la lista cart. 
    //Cada vez que se carga una pagina-info, la lista cart es vacia.
    if (localStorage.getItem("cart") !== null) {cart = JSON.parse(localStorage.getItem("cart"))};

    //Si el producto está incluido en el carrito, no se añade el producto. 
    //En caso contrario, lo añade y actualiza la lista cart en el almacenamiento.
    if (cart.includes(id)) {
        alert("El producto ya está añadido al carrito de compras")
    } else {
        cart.push(JSON.parse(id))
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Añadiste el producto al carrito de compras");
    }
};

document.addEventListener("DOMContentLoaded", ()=> {
    showProductInfo();
    score();

    showComments();

    document.getElementById("sendComment").addEventListener("click", ()=> {
        addComment();
    });
});
