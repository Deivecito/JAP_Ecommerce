function getCart() {
    let htmlContent = "";

    //Entrega 5 - Pauta 1
    fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.articles.length; i++) {
            htmlContent += `
                <tr>
                    <td><img src="${data.articles[i].image}" alt="imgProd" style="height: 50px"></td>
                    <td>${data.articles[i].name}</td>
                    <td>${data.articles[i].currency} ${data.articles[i].unitCost}</td>
                    <td>
                        <div class="input-group" style="width: 55px;">
                            <input type="number" min="1" class="form-control" value="${data.articles[i].count}" id="${data.articles[i].id}" onchange="cost(${data.articles[i].id}, ${data.articles[i].unitCost})">
                        </div>
                    </td>
                    <td><strong>${data.articles[i].currency} </strong><strong id="${data.articles[i].id}_total">${data.articles[i].unitCost}</strong></td>
                </tr>
            `;
        };
        document.getElementById("tbody").innerHTML = htmlContent;
    })
    .catch(error => console.log("Error: ", error));

    let cart = JSON.parse(localStorage.getItem("cart"));

    //Entrega 5 - Desafiate
    for (let i = 0; i < cart.length; i++) {
        fetch(`https://japceibal.github.io/emercado-api/products/${cart[i]}.json`)
        .then(response => response.json())
        .then(data => {
            htmlContent += `
                <tr>
                    <td><img src="${data.images[0]}" alt="imgProd" style="height: 50px"></td>
                    <td>${data.name}</td>
                    <td>${data.currency} ${data.cost}</td>
                    <td>
                        <div class="input-group" style="width: 55px;">
                            <input type="number" min="1" class="form-control" value="1" id="${data.id}" onchange="cost(${data.id}, ${data.cost})">
                        </div>
                    </td>
                    <td><strong>${data.currency} </strong><strong id="${data.id}_total">${data.cost}</strong></td>
                </tr>
            `;
            document.getElementById("tbody").innerHTML = htmlContent;
        })
        .catch(error => console.log("Error: ", error));
    };
};

function cost(id, price) {
    //Entrega 5 - Pauta 3
    document.addEventListener("change", ()=>{
        let count = document.getElementById(id).value;
        document.getElementById(`${id}_total`).innerHTML = price * count; 
    });
};

document.addEventListener("DOMContentLoaded", ()=>{
    getCart();
});