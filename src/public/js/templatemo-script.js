$(function() {
    $(".navbar-toggler").on("click", function(e) {
        $(".tm-header").toggleClass("show");
        e.stopPropagation();
      });
    
      $("html").click(function(e) {
        var header = document.getElementById("tm-header");
    
        if (!header.contains(e.target)) {
          $(".tm-header").removeClass("show");
        }
      });
    
      $("#tm-nav .nav-link").click(function(e) {
        $(".tm-header").removeClass("show");
      });
});

if(document.querySelector('#messagebtn')){
    
    document.querySelector('#messagebtn').addEventListener('click',function(e){
      e.preventDefault();
      console.log(document.querySelector('#commentPurport').value);
      console.log(document.querySelector('.comShow').id);
      const data = JSON.stringify({
        postid:document.querySelector('.comShow').id,
        commentPurport:document.querySelector('#commentPurport').value,
      })
      fetch(window.location.origin+'/comment',{
        method: "post",
        body:data,
        headers: {
            'Content-Type': 'application/json',
            }
    })
    .then(data=>{
      if(data.status == 200){
        return data.json();
      }
      else{
        alert("Upload Comment Failed");
        
      }
    })
    .then(data=>{
      console.log(data);
        var comData ='';
       for(let i of data){
         const com = `<div class="tm-comment tm-mb-45 com-item" id="${i._id}" style="cursor: pointer;">
                            <figure class="tm-comment-figure">
                                <img src="/img/unknown.jpg" alt="Image" class="mb-2 rounded-circle img-thumbnail">
                                <figcaption class="tm-color-primary text-center">${i.name}</figcaption>
                            </figure>
                            <div>
                                <p style="max-width: 400px;word-break:break-all">
                                   ${i.purport}
                                </p>
                                <div class="d-flex justify-content-between">
                                </div>                                                 
                            </div>                                
                        </div>`;
          comData+=com;
       }
       document.querySelector('.comShow').innerHTML = comData;
       comDelete();
    })
  })
 
}

const comDelete = ()=>{
  if(document.querySelectorAll('.com-item')){
    for(let i of  document.querySelectorAll('.com-item')){
      i.addEventListener('click',function(){
        console.log('comid: ',i.id);
        const data =JSON.stringify({
          comid:i.id,
        })
        fetch(window.location.origin+'/comment/check',{method:'post',body:data,headers:{'Content-Type':'application/json'}})
        // $('#updateModal').modal('show');
        .then(data=>{
          if(data.status == 200){
            return data.json();
          }
          else if(data.status == 404){
            window.location.href = '/login';
          }
        })
        .then(data=>{
          document.querySelector('#com-updatepurport').value = data.purport;
          document.querySelector('.deletecomclient').id = data._id;
          document.querySelector('.updatecomclient').id = data._id;
          $('#updateModal').modal('show');
        })
      })
    }
  }
}

comDelete();
if(document.querySelector('.deletecomclient')){
  document.querySelector('.deletecomclient').addEventListener('click',function(){
      console.log('comid: ',this.id);
      $('#deleteModal').modal('show');
  })
}

if(document.querySelector('.deletecomclientaccept')){
  document.querySelector('.deletecomclientaccept').addEventListener('click',function(){
    console.log('comid for delete: ',document.querySelector('.deletecomclient').id);
    const data = JSON.stringify({
      comid: document.querySelector('.deletecomclient').id,
      postid:document.querySelector('.comShow').id,
    })
    fetch(window.location.origin+'/comment/delete',{method:'post',body:data,headers:{'Content-Type':'application/json'}})
    .then(data=>{
      if(data.status == 200){
        return data.json();
      }
      else{
        alert('Delete Failed');
      }
    })
   .then(data=>{
     if(data.empty == 0){
      var comData ='';
      for(let i of data.data){
        console.log('purport: ',i.purport);
        const com = `<div class="tm-comment tm-mb-45 com-item" id="${i._id}" style="cursor: pointer;">
                           <figure class="tm-comment-figure">
                               <img src="/img/unknown.jpg" alt="Image" class="mb-2 rounded-circle img-thumbnail">
                               <figcaption class="tm-color-primary text-center">${i.name}</figcaption>
                           </figure>
                           <div>
                               <p style="max-width: 400px;word-break:break-all">
                                  ${i.purport}
                               </p>
                               <div class="d-flex justify-content-between">
                               </div>                                                 
                           </div>                                
                       </div>`;
         comData+=com;
      }
      document.querySelector('.comShow').innerHTML = comData;
      comDelete();
      $('#deleteModal').modal('hide');
      $('#updateModal').modal('hide');
      
     }
     else{
      document.querySelector('.comShow').innerHTML = '';
      comDelete();
      $('#deleteModal').modal('hide');
      $('#updateModal').modal('hide');
     }
   })
})
}

if(document.querySelector('.updatecomclient')){
  document.querySelector('.updatecomclient').addEventListener('click',function(){
      console.log('comid: ',this.id);
      const data = JSON.stringify({
        comid:this.id,
        postid:document.querySelector('.comShow').id,
        purport:document.querySelector('#com-updatepurport').value,
      })
      fetch(window.location.origin+'/comment/update',{method:'post',body:data,headers:{'Content-Type':'application/json'}})
      .then(data=>{
        if(data.status == 200){
          return data.json();
        }
        else{
          alert('Delete Failed');
        }
      })
     .then(data=>{
       if(data.empty == 0){
        var comData ='';
        for(let i of data.data){
          console.log('purport: ',i.purport);
          const com = `<div class="tm-comment tm-mb-45 com-item" id="${i._id}" style="cursor: pointer;">
                             <figure class="tm-comment-figure">
                                 <img src="/img/unknown.jpg" alt="Image" class="mb-2 rounded-circle img-thumbnail">
                                 <figcaption class="tm-color-primary text-center">${i.name}</figcaption>
                             </figure>
                             <div>
                                 <p style="max-width: 400px;word-break:break-all">
                                    ${i.purport}
                                 </p>
                                 <div class="d-flex justify-content-between">
                                 </div>                                                 
                             </div>                                
                         </div>`;
           comData+=com;
        }
        document.querySelector('.comShow').innerHTML = comData;
        comDelete();
        $('#deleteModal').modal('hide');
        $('#updateModal').modal('hide');
        
       }
       else{
        document.querySelector('.comShow').innerHTML = '';
        comDelete();
        $('#deleteModal').modal('hide');
        $('#updateModal').modal('hide');
       }
     })
  })
 
}