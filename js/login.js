function login(event) {
    //Función para loogearse en la pagina, guarda el email y la contraseña en localstorage
    event.preventDefault();
    document.getElementById("alert-login").classList.remove("show");
    if (document.getElementById("email").value !== "" && document.getElementById("password").value !== "" && document.getElementById("checkbox-login").checked) {
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("password", document.getElementById("password").value);
        location.href="index.html";
    } else if (document.getElementById("email").value !== "" && document.getElementById("password").value !== "" && !(document.getElementById("checkbox-login").checked)) {
        sessionStorage.setItem("email", document.getElementById("email").value);
        sessionStorage.setItem("password", document.getElementById("password").value);
        location.href="index.html";
    } else {
        document.getElementById("alert-login").classList.add('show');
        setTimeout(() => {
            document.getElementById("alert-login").classList.remove('show');
        }, 2500);
    };
};

document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("btnLogin").addEventListener("click", login);
});
