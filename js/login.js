document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('inicio').addEventListener('click', function(event){
        event.preventDefault();

        document.getElementById("alert-login").classList.remove("show");
    
        if (document.getElementById("InputEmail1").value !== "" && document.getElementById("InputPassword1").value !== "" && document.getElementById("checkbox-login").checked) {
            localStorage.setItem("email", document.getElementById("InputEmail1").value);
            localStorage.setItem("password", document.getElementById("InputPassword1").value);
            location.href="index.html";
        } else if (document.getElementById("InputEmail1").value !== "" && document.getElementById("InputPassword1").value !== "" && !(document.getElementById("checkbox-login").checked)) {
            sessionStorage.setItem("email", document.getElementById("InputEmail1").value);
            sessionStorage.setItem("password", document.getElementById("InputPassword1").value);
            location.href="index.html";
        } else {
            document.getElementById("alert-login").classList.add('show');
            setTimeout(() => {
                document.getElementById("alert-login").classList.remove('show');
            }, 2500);
        };
    });

});