function showProductInfo() {
    //Pauta 2 - Entrega 3
    fetch(`https://japceibal.github.io/emercado-api/products/${localStorage.getItem("prodID")}.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("container").innerHTML = `
            <p class="fs-2 mt-4 mb-4">${data.name}</p>
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
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <img src="${data.images[0]}" class="img-thumbnail" alt="...">   
                        </div>
                        <div class="col">
                            <img src="${data.images[1]}" class="img-thumbnail" alt="...">
                        </div>
                        <div class="col">
                            <img src="${data.images[2]}" class="img-thumbnail" alt="...">
                        </div>
                        <div class="col">
                            <img src="${data.images[3]}" class="img-thumbnail" alt="...">
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
    .catch(error => {
        console.error("Error al cargar la información del producto:", error);
    });
};

function showComments() {
    //Pauta 3 - Entrega 3
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("prodID")}.json`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            document.getElementById("comments").innerHTML += `
                <li class="list-group-item">
                    <p class="mb-0">Aún no hay comentarios sobre este producto. Sé el primero en comentar</p>
                </li>
            `;
        } else {
            for (let i = 0; i < data.length; i++) {
                document.getElementById("comments").innerHTML += `
                    <li class="list-group-item">
                        <div class="row">
                            <p class="mb-0"><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score}</p> 
                        </div>
                        <div class="row">
                            <p class="mb-0">${data[i].description}</p>
                        </div>
                    </li>
                `;

            };
        }
    })
    .catch(error => {
        console.error("Error al cargar los comentarios:", error);
    });
};


function addComment(){
    //Desafiate - Entrega 3 
    let date = new Date();
    let currentDate = `${date.getFullYear()} - ${date.getMonth()+1} - ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    document.getElementById("comments").innerHTML += `
        <li class="list-group-item">
            <div class="row">
                <p class="mb-0"><strong>${localStorage.getItem("email")}</strong> - ${currentDate} - ${document.getElementById("score").value}</p> 
            </div>
            <div class="row">
                <p class="mb-0">${document.getElementById("my-comment").value}</p>
            </div>
        </li>
    `;
    document.getElementById("my-comment").value = "";
    document.getElementById("score").value = 1;
};

document.addEventListener("DOMContentLoaded", ()=> {
    showProductInfo();
    
    showComments();

    document.getElementById("sendComment").addEventListener("click", ()=> {
        addComment();
    });
});