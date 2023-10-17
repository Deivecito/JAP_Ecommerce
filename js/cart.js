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
                    <td align="center">
                        <div class="input-group input-responsive"  >
                        <button class='btn-operador' onclick="restar(${data.articles[i].id}, ${data.articles[i].unitCost})">-</button> <input type="number" min="1" class="form-control" value="${data.articles[i].count}" id="${data.articles[i].id}" oninput="cost(${data.articles[i].id}, ${data.articles[i].unitCost})"> <button  onclick="sumar(${data.articles[i].id}, ${data.articles[i].unitCost})" class="btn-operador">+</button>
                        </div>
                    </td>
                    <td><strong>${data.articles[i].currency} </strong><strong id="${data.articles[i].id}_total">${data.articles[i].unitCost}</strong></td>
                    <td><p class="cursor-active" onclick="deleteCartID(${data.articles[i].id})"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg></p></td>
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
                    <td align="center">
                        <div class="input-group input-responsive" >
                        <button class='btn-operador' onclick="restar(${data.id}, ${data.cost})">-</button><input type="number" min="1" class="form-control" value="1" id="${data.id}" oninput="cost(${data.id}, ${data.cost})"> <button  onclick="sumar(${data.id}, ${data.cost})" class="btn-operador">+</button>
                        </div>
                    </td>
                    <td><strong>${data.currency} </strong><strong id="${data.id}_total">${data.cost}</strong></td>
                    <td><p class="cursor-active" onclick="deleteCartID(${i})"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg></p></td>
                </tr>
            `;
            document.getElementById("tbody").innerHTML = htmlContent;
        })
        .catch(error => console.log("Error: ", error));
    };
};

function cost(id, price) {
    //Entrega 5 - Pauta 3
    document.addEventListener("input", ()=>{
        let count = document.getElementById(id).value;
        if (count > 0){
        document.getElementById(`${id}_total`).innerHTML = price * count; 
    }
    });
};

document.addEventListener("DOMContentLoaded", ()=>{
    getCart();
});

function deleteCartID(i) {
       let cart = JSON.parse(localStorage.getItem('cart'));
    if (i >= 0 && i < cart.length) {
        cart.splice(i, 1)
        localStorage.setItem('cart',JSON.stringify(cart));
        window.location='cart.html';
    }
}



function sumar(id, price){
    let contador = parseInt(document.getElementById(`${id}`).value);
   contador +=1;
   if (contador < 1) {
       contador = 1;
   }
   document.getElementById(`${id}`).value = contador;
   calcSubtotal(id, price);
   
}

function restar(id, price){
   let contador = parseInt(document.getElementById(`${id}`).value);
   contador -=1;
   if (contador >= 1){
   document.getElementById(`${id}`).value = contador;
   calcSubtotal(id, price)
}}

function calcSubtotal(id, price){
   let contador = parseInt(document.getElementById(`${id}`).value);
   if (contador > 0){
   let subtotal = contador * price;
   document.getElementById(`${id}_total`).innerHTML = subtotal;
  }             
}