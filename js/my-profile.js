
        
        function fillInput(){
            const emailSession = sessionStorage.getItem("email");
        const emailLocal = localStorage.getItem("email");

        if (emailSession){
            document.getElementById('email').value = emailSession;
        } else {
            document.getElementById('email').value = emailLocal;
        }
    document.getElementById('firstName').value = localStorage.getItem('firstName');
    document.getElementById('secondName').value = localStorage.getItem('secondName');
    document.getElementById('firstLastName').value = localStorage.getItem('firstLastName');
    document.getElementById('secondLastName').value = localStorage.getItem('secondLastName');
    document.getElementById('tel').value = localStorage.getItem('tel');



    fillInputImg()
}

function fillInputImg(){
        let URL = localStorage.getItem('imgProfile');
        if ((URL == "") || (URL == null)) {
             document.getElementById('imgProfile').innerHTML = `<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" id="img"></img>`;
        } else{ 
           let img = new Image();
           img.src = URL;
           document.getElementById('imgProfile').innerHTML = `<img src="${img.src}" alt="" id="img"></img>`;
        }
     }





 (function () {
    'use strict';

    

let forms = document.querySelectorAll('.needs-validation');

Array.prototype.slice.call(forms)

    .forEach(function (form) {
        form.addEventListener('submit', function (event) {    
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            else{
                setLocalStorage();
            }

            
            form.classList.add('was-validated');
            
        }, false);
    });
    
})();  

document.addEventListener('DOMContentLoaded', ()=>{
fillInput();

})



function setLocalStorage(){
        let firstName = document.getElementById('firstName').value  
        let firstLastName = document.getElementById('firstLastName').value 
        let tel = document.getElementById('tel').value    
        let secondName = document.getElementById('secondName').value
        let secondLastName = document.getElementById('secondLastName').value
        let email = document.getElementById('email').value
        

        localStorage.setItem('firstName', firstName)
        localStorage.setItem('firstLastName', firstLastName)
        localStorage.setItem('tel', tel)
        localStorage.setItem('secondName', secondName)
        localStorage.setItem('secondLastName', secondLastName)
        localStorage.setItem('email', email)


  
}



       let imgProfile = document.getElementById('imgInput');
        imgProfile.addEventListener('change', ()=>{
           let image = new FileReader() 
           image.readAsDataURL(imgProfile.files[0]);
           image.addEventListener('load', ()=>{
            let URL = image.result;
            
           localStorage.setItem('imgProfile', URL);
           fillInputImg();
           

           })
        })


