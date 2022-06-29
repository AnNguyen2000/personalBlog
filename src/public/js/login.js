//REGISTER:
if(document.querySelector('#registerbtn')){

    document.querySelector('#registerbtn').addEventListener('click',function(e){

        console.log(document.querySelector('#rname').value);
        console.log(document.querySelector('#rusername').value);
        console.log(document.querySelector('#rpassword').value);
        console.log(document.querySelector('#rpasswordcheck').value);
        if(document.querySelector('#rname').value && document.querySelector('#rusername').value && document.querySelector('#rpassword').value && document.querySelector('#rpasswordcheck').value){
            if(document.querySelector('#rpassword').value == document.querySelector('#rpasswordcheck').value){
                const data = JSON.stringify({
                    name:document.querySelector('#rname').value,
                    username: document.querySelector('#rusername').value,
                    password: document.querySelector('#rpassword').value,
                    passwordcheck: document.querySelector('#rpasswordcheck').value,
                })
                fetch(window.location.origin+'/registercheck',{
                    method: "post",
                    body:data,
                    headers: {
                        'Content-Type': 'application/json',
                        }
                })
                .then(data=>{
                    if(data.status != 200){
                        alert('Register failed !!!');
                    }
                    else{
                        alert('Register successfull !');
                        window.location.href="/login";
                    }
                })
            }
            else{
                alert(`Password's wrong`);
            }
        }
        else{
            alert(`Input(s) is empty`);
        }
        
    })
    
}
///LOGIN
// if(document.querySelector('#loginbtn')){

//     document.querySelector('#loginbtn').addEventListener('click',function(e){

//         console.log(document.querySelector('#username').value);
//         console.log(document.querySelector('#password').value);
//         if(document.querySelector('#username').value && document.querySelector('#password').value){
//                 const data = JSON.stringify({
//                     username: document.querySelector('#username').value,
//                     password: document.querySelector('#password').value,
//                 })
//                 fetch(window.location.origin+'/logincheck',{
//                     method: "post",
//                     body:data,
//                     headers: {
//                         'Content-Type': 'application/json',
//                         }
//                 })
//                 .then(data=>{
//                     if(data.status != 200){
//                         alert('Login failed !!!');
//                     }
//                     else{
//                         return data.json();
//                     }
//                 })
//                 .then(data=>{
//                     console.log(data);
//                     if(data.boss == 2){
//                         window.location.href=`/?user=2`;
//                     }
//                     else{
//                         window.location.href=`/?user=1`;
//                     }
               
//                 })
//         }
//         else{
//             alert(`Input(s) is empty`);
//         }
        
//     })
    
// }
//Check admin: