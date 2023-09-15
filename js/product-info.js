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
                let stars = "";  

                for (let j = 0; j < 5; j++) {
                    if (j < data[i].score) {
                        stars += `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
                    } else {
                        stars += `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>`;
                    } 
                };

                document.getElementById("comments").innerHTML += `
                    <li class="list-group-item">
                        <div class="row">
                            <p class="mb-0"><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${stars}</p> 
                        </div>
                        <div class="row">
                            <p class="mb-0">${data[i].description}</p>
                        </div>
                    </li>
                `;
                stars = "";
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
    let currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    let stars = "";  
     for (let j = 0; j < 5; j++) {
        if (j < data[i].score) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>`;
        } else {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>`;
        } 
    };

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