document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnLogin").addEventListener("click", function(event) {
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
    });
});
