const emailSession = sessionStorage.getItem("email");
const emailLocal = localStorage.getItem("email");

if (emailSession){
    document.getElementById('emailProfile').value = emailSession;
} else {
    document.getElementById('emailProfile').value = emailLocal;
}
