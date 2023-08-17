document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    document.getElementById("login").addEventListener("click", function() {
        //Si la key email está vacia es porque no se inició sesión previamente.
        if (localStorage.getItem("email") === null) {
            //Aquí se debería mostrar el cartel de "Debe iniciar sesión."
        } else {
            document.getElementById("login").setAttribute("href", "#");
            //Aquí se debería mostrar el cartel de "Ya has iniciado sesión."
        };
    });
});

