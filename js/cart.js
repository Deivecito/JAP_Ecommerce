let contadorAntiguo = {};

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
                        <button class='btn-operador' onclick="restar(${data.articles[i].id}, ${data.articles[i].unitCost}, '${data.articles[i].currency}')">-</button> <input type="number" min="1" class="form-control" value="${data.articles[i].count}" id="${data.articles[i].id}" oninput="cost(${data.articles[i].id}, ${data.articles[i].unitCost}, '${data.articles[i].currency}')"> <button  onclick="sumar(${data.articles[i].id}, ${data.articles[i].unitCost}, '${data.articles[i].currency}')" class="btn-operador">+</button>
                        </div>
                    </td>
                    <td><strong>${data.articles[i].currency} </strong><strong id="${data.articles[i].id}_total">${data.articles[i].unitCost}</strong></td>
                    <td><p class="cursor-active" onclick="deleteCartID(${data.articles[i].id})"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg></p></td>
                </tr>
            `;

            productCost(data.articles[i].unitCost, data.articles[i].currency);
            commision(15);
            totalCost();
            
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
                        <button class='btn-operador' onclick="restar(${data.id}, ${data.cost}, '${data.currency}')">-</button><input type="number" min="1" class="form-control" value="1" id="${data.id}" oninput="cost(${data.id}, ${data.cost}, '${data.currency}')"> <button  onclick="sumar(${data.id}, ${data.cost}, '${data.currency}')" class="btn-operador">+</button>
                        </div>
                    </td>
                    <td><strong>${data.currency} </strong><strong id="${data.id}_total">${data.cost}</strong></td>
                    <td><p class="cursor-active" onclick="deleteCartID(${i})"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg></p></td>
                </tr>
                    `;

                productCost(data.cost, data.currency);
                commision(15);
                totalCost();



                document.getElementById("tbody").innerHTML = htmlContent;
            })
            .catch(error => console.log("Error: ", error));
    };
};

function validateForm() {
    const a = document.getElementById('ccv').value;
    const b = document.getElementById('credit').value;
    const c = document.getElementById('expired').value;
    const d = document.getElementById('acc').value;
    const cr = document.getElementById('creditCard');
    const cd = document.getElementById('bankTransfer');
    const seleccionarClass = document.getElementById('seleccionar');

    if (cr.checked) {
        if (a !== "" && b !== "" && c !== "") {
            seleccionarClass.classList.remove('is-invalid');
            return true;
        } else {
            seleccionarClass.classList.add('is-invalid');
            return false;
        }
    } else if (cd.checked) {
        if (d !== "") {
            seleccionarClass.classList.remove('is-invalid');
            return true;
        } else {
            seleccionarClass.classList.add('is-invalid');
            return false;
        }
    } else {
        seleccionarClass.classList.add('is-invalid');
        return false;
    }

}

(function () {
    'use strict';

    let forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)

        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity() || !validateForm()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (form.checkValidity() && validateForm()) {
                    event.preventDefault();
                    event.stopPropagation();
                    document.getElementById("alert-successBuy").classList.add('show');
                    localStorage.removeItem("cart");
                    setTimeout(() => {
                        window.location.href = 'cart.html';
                    }, 4000);
                }
                validateForm();

                form.classList.add('was-validated');
            }, false);
        });
})();

// desactivar metodo de pago
document.getElementById('creditCard').addEventListener('change', () => {
    disable({
        deshabilitar: [document.getElementById('ccv'), document.getElementById('expired'), document.getElementById('credit')],
        habilitar: [document.getElementById('acc')]
    });
});

document.getElementById('bankTransfer').addEventListener('change', () => {
    disable({
        deshabilitar: [document.getElementById('acc')],
        habilitar: [document.getElementById('ccv'), document.getElementById('credit'), document.getElementById('expired')]
    });
});

function disable(params) {
    params.deshabilitar.forEach(elemento => {
        elemento.disabled = false;
    });

    params.habilitar.forEach(elemento => {
        elemento.disabled = true;
    });
}

function productCost(price, currency) {
    let ignoreString = document.getElementById('productCostText').innerHTML;
    let totalCost = parseFloat(ignoreString.replace('USD', '').trim());

    if (currency === "USD") {
        totalCost += price;
    } else {
        totalCost += (price * 0.025);
    }

    document.getElementById('productCostText').innerHTML = 'USD ' + totalCost.toFixed(2);
}

function totalCost() {
    let ignoreString = document.getElementById('productCostText').innerHTML;
    let totalPrice = parseFloat(ignoreString.replace('USD', '').trim());
    let ignoreCommisionSting = document.getElementById('comissionText').innerHTML;
    let totalCommision = parseFloat(ignoreCommisionSting.replace('USD', '').trim());
    let totalCost = totalPrice + totalCommision;
    document.getElementById('totalCostText').innerHTML = "USD " + (Math.round(totalCost) - 0.01);
}

function cost(id, price, currency) {

    let contadorPrevio = contadorAntiguo[id] || 1;

    let count = document.getElementById(id).value;

    let diferencia = count - contadorPrevio;

    if (count > 0) {
        contadorAntiguo[id] = count;
        document.getElementById(`${id}_total`).innerHTML = price * count;
        productCost((price * diferencia), currency)
    }
    totalCost()

}


function commision(porcent){
    let ignoreString = document.getElementById('productCostText').innerHTML;
    let totalPrice = parseFloat(ignoreString.replace('USD', '').trim());
    document.getElementById("comissionText").innerHTML = "USD " + Math.trunc( (totalPrice*porcent) / 100);
}


document.addEventListener("DOMContentLoaded", ()=>{
    getCart();
   
   

    document.getElementById('premiumShip').addEventListener('change', ()=>{
        commision(15);
        totalCost();
    })
    document.getElementById('expressShip').addEventListener('change', ()=>{
        commision(7);
        totalCost();
    })
    document.getElementById('standardShip').addEventListener('change', ()=>{
        commision(5);
        totalCost();
    })


    document.getElementById('creditCard').addEventListener('change', () => {
        document.getElementById('divpay').innerHTML = 'Tarjeta de credito';
    })
    document.getElementById('bankTransfer').addEventListener('change', () => {
        document.getElementById('divpay').innerHTML = 'Transferencia bancaria';
    })


});

function deleteCartID(i) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (i >= 0 && i < cart.length) {
        cart.splice(i, 1)
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location = 'cart.html';
    }
}

function sumar(id, price, currency) {
    let contador = parseInt(document.getElementById(`${id}`).value);
    contador += 1;
    if (contador < 1) {
        contador = 1;
    }
    document.getElementById(`${id}`).value = contador;
    calcSubtotal(id, price);
    productCost(price, currency);
    totalCost();
    contadorAntiguo[id] = contador;

}

function restar(id, price, currency) {
    let contador = parseInt(document.getElementById(`${id}`).value);
    contador -= 1;
    if (contador >= 1) {
        document.getElementById(`${id}`).value = contador;
        calcSubtotal(id, price);
        productCost(-price, currency);
        totalCost();
        contadorAntiguo[id] = contador;
    }
}

function calcSubtotal(id, price) {
    let contador = parseInt(document.getElementById(`${id}`).value);
    if (contador > 0) {
        let subtotal = contador * price;
        document.getElementById(`${id}_total`).innerHTML = subtotal;

    }
}