document.getElementById('submitButton').addEventListener('click' , function(){

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!email || !message){
        alert('Completeaza toate campurile.');
        return; 
    }

    if(email.include('@')){
        alert('Format invalid de email');
        return
    }

    localStorage.setItem(email,message);
    
    alert('Mesajul tau a fost trimis');

    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

})