document.getElementById('bnt-password').addEventListener('click' , () => {
    var inputPass = document.getElementById('password');
    var btnShowPass = document.getElementById('eye-icon');
    
    if(inputPass.type === 'password'){
        inputPass.setAttribute('type','text');
        btnShowPass.setAttribute('class','bi bi-eye-slash-fill');
    }
    else{
        inputPass.setAttribute('type','password');
        btnShowPass.setAttribute('class','bi bi-eye-fill');
    }
});