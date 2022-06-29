
$(document).ready(() => {
    if ($(".LYAF-header")[0]){
      $(".LYAF-header").hide();
    }
  
    checkActiveElement($(".LYAF-option-active"));
    hideSidebars();
    hideMenu($(".LYAF-menu-active"));
  
    for (var i of $(".LYAF-menu-active")) {
      if (
        !$(i)
          .find(".LYAF-menu-content .LYAF-option-active")
          .hasClass("LYAF-option-active")
      ) {
        $(i).removeClass("LYAF-menu-active");
        deactiveMenu(i);
      }
    }
    $(".LYAF-side-bar-header i").click(() => {
      if ($(".LYAF-side-bar-header i").hasClass("fa-bars")) {
        showSidebars();
        showMenu($(".LYAF-option-active").parent().parent());
      } else if ($(".LYAF-side-bar-header i").hasClass("fa-window-close")) {
        hideSidebars();
        hideMenu($(".LYAF-menu-active"));
        for (var i of $(".LYAF-menu-active")) {
          if (
            !$(i)
              .find(".LYAF-menu-content .LYAF-option-active")
              .hasClass("LYAF-option-active")
          ) {
            $(i).removeClass("LYAF-menu-active");
            deactiveMenu(i);
          }
        }
      }
    });
  
    $(document).click((e) => {
      var $target = $(e.target);
      if (!$target.closest(".LYAF-side-bar").length) {
        if ($(".LYAF-side-bar-header i").hasClass("fa-window-close")) {
          hideSidebars();
          hideMenu($(".LYAF-menu-active"));
          for ( var i of $(".LYAF-menu-active")) {
            if (
              !$(i)
                .find(".LYAF-menu-content .LYAF-option-active")
                .hasClass("LYAF-option-active")
            ) {
              $(i).removeClass("LYAF-menu-active");
              deactiveMenu(i);
            }
          }
        }
      }
    });
  
    $(".LYAF-menu").hover(
      function () {
        activeMenu($(this));
      },
      function () {
        deactiveMenu($(this));
      }
    );
  
    $(".LYAF-menu-option").hover(
      function () {
        activeOption($(this));
      },
      function () {
        deactiveOption($(this));
      }
    );
  
    $(".LYAF-menu-header").click(function () {
      tongleMenu($(this));
    });
  
  });
  
  const showSidebars = () => {
    $(".LYAF-side-bar").css("left", "0");
    $(".LYAF-side-bar-menu .LYAF-menu .LYAF-menu-header .icon").css("left", "0");
    $(".LYAF-dasboard-body").css("left", "180px");
  
    $(".LYAF-side-bar-menu .LYAF-menu .LYAF-menu-header .icon").css("left", "0");
    $(".LYAF-side-bar-menu .LYAF-menu .end").fadeIn(500);
    $(".LYAF-side-bar-menu .LYAF-menu .title").fadeIn(500);
  
    $(".LYAF-side-bar-header i").addClass("fas fa-window-close");
    $(".LYAF-side-bar-header i").removeClass("fas fa-bars");
    $(".LYAF-side-bar-header i").addClass("fas fa-window-close");
  };
  
  const hideSidebars = () => {
    $(".LYAF-side-bar").css("left", "-180px");
    $(".LYAF-side-bar-menu .LYAF-menu .LYAF-menu-header .icon").css(
      "left",
      "180px"
    );
    $(".LYAF-dasboard-body").css("left", "0");
  
    $(".LYAF-side-bar-menu .LYAF-menu .end").fadeOut(100);
    $(".LYAF-side-bar-menu .LYAF-menu .title").fadeOut(100);
  
    $(".LYAF-side-bar-header i").removeClass("fas fa-window-close");
    $(".LYAF-side-bar-header i").addClass("fas fa-bars");
  };
  
  const checkActiveElement = (element) => {
    var parentElement = $(element).parent().parent();
    activeMenu(parentElement);
    parentElement.addClass("LYAF-menu-active");
    activeOption(element);
  };
  const activeOption = (element) => {
    $(element).find(".icon").css("color", "rgb(72, 153, 190)");
    $(element).css("background-color", "#1B1B28");
    $(element).find("span").css("color", "white");
  };
  
  const deactiveOption = (element) => {
    if (!$(element).hasClass("LYAF-option-active")) {
      $(element).find(".icon").css("color", "rgb(183, 183, 185)");
      $(element).css("background-color", "#1E1E2D");
      $(element).find("span").css("color", "rgb(183, 183, 185)");
    }
  };
  
  const activeMenu = (element) => {
    $(element).find(".LYAF-menu-header .icon").css("color", "rgb(72, 153, 190)");
    $(element).find(".LYAF-menu-header").css("background-color", "#1B1B28");
    $(element).find(".LYAF-menu-header").css("color", "white");
  };
  
  const deactiveMenu = (element) => {
    if (
      !$(element).hasClass("LYAF-menu-active") &&
      !$(element).find(".LYAF-menu-option").hasClass("LYAF-option-active")
    ) {
      $(element).find(".icon").css("color", "rgb(183, 183, 185)");
      $(element).find(".LYAF-menu-header").css("background-color", "#1E1E2D");
      $(element).find(".LYAF-menu-header").css("color", "rgb(183, 183, 185)");
    }
  };
  
  const showMenu = (element) => {
    $(element).find(".LYAF-menu-header .end").css("transform", "rotate(90deg)");
    $(element).find(".LYAF-menu-content").slideDown();
  };
  
  const hideMenu = (element) => {
    $(element).find(".LYAF-menu-header .end").css("transform", "rotate(0deg)");
    $(element).find(".LYAF-menu-content").slideUp();
    // deactiveMenu(element)
  };
  
  const tongleMenu = (element) => {
    if ($(".LYAF-side-bar-header i").hasClass("fa-bars")) {
      showSidebars();
    }
    element = $(element).parent().hasClass("LYAF-menu")
      ? $(element).parent()
      : null;
    if (element) {
      if (!$(element).find(".LYAF-menu-content").is(":visible")) {
        for (var i of $(".LYAF-menu-active")) {
          if (
            !$(i)
              .find(".LYAF-menu-content .LYAF-option-active")
              .hasClass("LYAF-option-active")
          ) {
            $(i).removeClass("LYAF-menu-active");
          }
          hideMenu(i);
          deactiveMenu(i);
        }
        $(element).addClass("LYAF-menu-active");
        showMenu(element);
        activeMenu(element);
      } else {
        $(element).removeClass("LYAF-menu-active");
        hideMenu(element);
      }
    }
  };
  
//Event Post Image:
   if(document.querySelector('#addpostbtn')){
     document.querySelector('#addpostbtn').addEventListener('click',function(e){
       if(document.querySelector('#post-addname').value && document.querySelector('#post-adddesc').value && document.querySelector('#post-addpurport').value && document.querySelector('#post-addimg').files[0]){
          // e.preventDefault();
        var formdata = new FormData();
        console.log('img',document.querySelector('#post-addimg').files[0]);
        formdata.append('postimg',document.querySelector('#post-addimg').files[0]);
        formdata.append('postname',document.querySelector('#post-addname').value);
        formdata.append('postdesc',document.querySelector('#post-adddesc').value);
        formdata.append('postpurport',document.querySelector('#post-addpurport').value);
        console.log('formdata',formdata);
        console.log(window.location.origin+'/manager/post/add/process')
        fetch(window.location.origin+'/manager/post/add/process',{method:'post',body:formdata})
        .then(data=>{
          if(data.status == 200){
            window.location.href = "/manager/post";
          }
          else{
            alert('Create New Post is Failed');
          }
        })
       }
       else{
          alert('Input(s) Empty')
       }
        
       
     })
   }
const postDelete = function(){
  if(document.querySelectorAll('.post-delete')){
    for(let i of document.querySelectorAll('.post-delete')){
      i.addEventListener('click',function(){
        console.log(this.id);
        document.querySelector('.deleteaccept').id = this.id;
        console.log(document.querySelector('.deleteaccept').id);
      })
    }
  }
}
if(document.querySelector('.deleteaccept')){
  document.querySelector('.deleteaccept').addEventListener('click',function(){
    const data = JSON.stringify({
      postid:this.id,
    })
    fetch(window.location.origin+'/manager/post/delete',{
      method:"post",
      body:data,
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(data=>{
      if(data.status == 200){
        console.log('empty: ',data.empty);
        if(data.empty == 1){
          return 1;
        
        }
        else{
          return data.json();
          
        }
      }
      else{
        alert('Delete Failed !');
      }
    })
    .then(data=>{
      console.log('result:',data);
      if(data.empty){
          document.querySelector('#post-tbody').innerHTML = `<p>List is Empty !.
                                                              <a href="/manager/post/add">Add a new post here</a></p> `;
          $('#deleteModal').modal('hide');
          postDelete();
          postEdit();
      }
      else{
        console.log('data for delete:',data);
          var postlist = '';
          for( let i of data){
            const row =`<tr class="post-row" id="${i._id}">
                            <td class="post-name">${i.name}</td>
                            <td class="post-desc">${i.desc}</td>
                            <td class="post-options">
                            
                                <button type="button" class="btn btn-success post-edit">Edit</button>
                                <button type="button" class="btn btn-danger post-delete" id="${i._id}" data-toggle="modal" data-target="#deleteModal">Delete</button>

                            </td>
                        </tr>`;
            postlist+=row;
          }
          document.querySelector('#post-tbody').innerHTML = postlist;
          $('#deleteModal').modal('hide');
          postDelete();
          postEdit();
      }
     
    })
  })
}
postDelete();


const postEdit = function(){
  if(document.querySelectorAll('.post-edit')){
    for(let i of document.querySelectorAll('.post-edit')){
      i.addEventListener('click',function(){
        const data = JSON.stringify({
          postid: this.id,
        })
        fetch(window.location.origin+'/manager/post/update',{
          method:'post',
          body:data,
          headers:{
            'Content-Type':'application/json',
          }
        })
        .then(data=>{
          if(data.status == 200){
            return data.json();
          }
          else{
            alert('Show Detail Failed !');
          }
        })
        .then(data=>{
          console.log(data);
          document.querySelector('#post-updatename').value = data.name;
          document.querySelector('#post-updatedesc').value = data.desc;
          document.querySelector('#post-updatepurport').value = data.purport;
          document.querySelector('.updateaccept').id = data._id;
        })
      })
    }
  }
  if(document.querySelector('.updateaccept')){
    document.querySelector('.updateaccept').addEventListener('click',function(e){
       // e.preventDefault();
      var formdata = new FormData();
      console.log('img',document.querySelector('#post-updateimg').files[0]);
      formdata.append('postimg',document.querySelector('#post-updateimg').files[0]);
       formdata.append('postname',document.querySelector('#post-updatename').value);
       formdata.append('postdesc',document.querySelector('#post-updatedesc').value);
       formdata.append('postpurport',document.querySelector('#post-updatepurport').value);
       formdata.append('postid',document.querySelector('.updateaccept').id);
       fetch(window.location.origin+'/manager/post/update/process',{method:'post',body:formdata})
       .then(data=>{
         if(data.status == 200){
           window.location.href = "/manager/post";
         }
         else{
           alert('Update is Failed');
         }
       })
      
    })
  }
}
postEdit();


  if(document.querySelector('.accList')){
    console.log('1');
    fetch(window.location.origin+'/manager/account/load',{method:'get',headers:{
      'Content-Type':'application/json',
    }})
    .then(data=>{
      if(data.status == 200){
        return data.json();
        
      }
      else{
        alert('Load Data Failed');
      }
    })
      .then(data=>{
        console.log(data);
        var acclist = '';
        for(let i in data.accs){
          var accrow =  `<tr class="post-row">
                            <td class="acc-name">${data.users[i].name}</td>
                            <td class="acc-username">${data.users[i]._id}</td>
                            <td class="acc-role">${data.users[i].role}</td>
                            <td class="post-options">
                            
                                <button type="button" class="btn btn-success acc-edit" data-toggle="modal" data-target="#updateModal" id="${data.users[i]._id}">Edit</button>
                                <button type="button" class="btn btn-danger acc-delete"  data-toggle="modal" data-target="#deleteModal" id="${data.users[i]._id}">Delete</button>

                            </td>
                        </tr>`;
           acclist+=accrow;             
        }
     
        document.querySelector('#acc-tbody').innerHTML = acclist;
        accDelete();
        accUpdate();
      })
   
  }
//////////////////////////////////
/////////Event Account:
if(document.querySelector('#addaccbtn')){
  document.querySelector('#addaccbtn').addEventListener('click',function(e){
    if(document.querySelector('#acc-addname').value && document.querySelector('#acc-adddusername').value && document.querySelector('#acc-addpass').value && document.querySelector('#acc-addrole').value){
       // e.preventDefault();
 
     console.log('accname: ',document.querySelector('#acc-addname').value);
     console.log('accusername: ',document.querySelector('#acc-adddusername').value);
     console.log('accpass: ',document.querySelector('#acc-addpass').value);
     console.log('accrole: ',document.querySelector('#acc-addrole').value);
      const data = JSON.stringify({
        name:document.querySelector('#acc-addname').value,
        username:document.querySelector('#acc-adddusername').value,
        password:document.querySelector('#acc-addpass').value,
        role:document.querySelector('#acc-addrole').value,
      })
     fetch(window.location.origin+'/manager/account/add/process',{method:'post',body:data,headers:{'Content-Type':'application/json'}})
      .then(data=>{
        if(data.status == 200){
          window.location.href = "/manager/account";
        }
        else{
          alert('Create Account Failled');
        }
      })
   
    }
    else{
      alert('Input(s) empty or wrong !');
    }
    
  })
  
}

const accDelete = function(){
  if(document.querySelectorAll('.acc-delete')){
    for(let i of document.querySelectorAll('.acc-delete')){
      i.addEventListener('click',function(){
        console.log(this.id);
        document.querySelector('.deletacceaccept').id = this.id;
        console.log(document.querySelector('.deletacceaccept').id);
      })
    }
  }
  
}
if(document.querySelector('.deletacceaccept')){
  document.querySelector('.deletacceaccept').addEventListener('click',function(){
    const data = JSON.stringify({
      accid:this.id,
    })
    fetch(window.location.origin+'/manager/account/delete',{
      method:"post",
      body:data,
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(data=>{
      if(data.status == 200){
        console.log('empty: ',data.empty);
        if(data.empty == 1){
          return 1;
        
        }
        else{
          return data.json();
          
        }
      }
      else{
        alert('Delete Failed !');
      }
    })
    .then(data=>{
      console.log('result:',data);
      if(data.empty){
          document.querySelector('#acc-tbody').innerHTML = `<p>List is Empty !.
                                                              <a href="/manager/account/add">Add a new account here</a></p> `;
          $('#deleteModal').modal('hide');
          accDelete();
          
      }
      else{
        console.log('data for delete:',data);
        
          var acclist = '';
          for( let i of data){
  
            var row =`<tr class="post-row">
                            <td class="acc-name">${i.name}</td>
                            <td class="acc-username">${i._id}</td>
                            <td class="acc-role">${i.role}</td>
                            <td class="post-options">
                            
                                <button type="button" class="btn btn-success acc-edit"  data-toggle="modal" data-target="#updateModal" id="${i._id}">Edit</button>
                                <button type="button" class="btn btn-danger acc-delete"  data-toggle="modal" data-target="#deleteModal" id="${i._id}">Delete</button>

                            </td>
                        </tr>`;
            console.log('###',row);
            acclist+=row;
          }
      
          document.querySelector('#acc-tbody').innerHTML = acclist;
          $('#deleteModal').modal('hide');
          accDelete();
          accUpdate();
      }
     
    })
  })
}
accDelete();

const accUpdate = function(){
  if(document.querySelectorAll('.acc-edit')){
    for(let i of document.querySelectorAll('.acc-edit')){
      i.addEventListener('click',function(){
        const data = JSON.stringify({
          accid: this.id,
        })
        fetch(window.location.origin+'/manager/account/update',{
          method:'post',
          body:data,
          headers:{
            'Content-Type':'application/json',
          }
        })
        .then(data=>{
          if(data.status == 200){
            return data.json();
          }
          else{
            alert('Show Detail Failed !');
          }
        })
        .then(data=>{
          console.log(data);
          document.querySelector('#acc-updatename').value = data.name;
          document.querySelector('#acc-updateusername').value = data._id;
          document.querySelector('#acc-updaterole').value = data.role;
          document.querySelector('.updateaccaccept').id = data._id;
        })
      })
    }
  }

  
}
if(document.querySelector('.updateaccaccept')){
  document.querySelector('.updateaccaccept').addEventListener('click',function(e){
     if(document.querySelector('#acc-updatename').value && document.querySelector('#acc-updateusername').value && document.querySelector('#acc-updaterole').value){
      const data = JSON.stringify({
        name:document.querySelector('#acc-updatename').value,
        username:document.querySelector('#acc-updateusername').value,
        role:document.querySelector('#acc-updaterole').value,
      })
       fetch(window.location.origin+'/manager/account/update/process',{method:'post',body:data,headers:{'Content-Type':'application/json'}})
       .then(data=>{
         if(data.status == 200){
           window.location.href = "/manager/account";
         }
         else{
           alert('Update is Failed');
         }
       })
     }
     else{
      alert('Input(s) Empty');
     }
    
    
  })
}
accUpdate();
////////////////////////////////
const comDelete =()=>{
  if(document.querySelectorAll('.com-delete')){
    for(let i of document.querySelectorAll('.com-delete')){
      
      document.querySelector('.deletecomaccept').id = i.id;
    }
  }
}
comDelete();
  if(document.querySelector('.deletecomaccept')){
    document.querySelector('.deletecomaccept').addEventListener('click',function(){
      console.log('acc-id: ',this.id);
      const data = JSON.stringify({
        comid: this.id,
      })
      fetch(window.location.origin+'/manager/comment/delete',{method:'post',body:data,headers:{'Content-Type':'application/json'}})
      .then(result=>{
        if(result.status == 200){
          return result.json();
        } 
        else{
          alert('Delete Failed !');
        }
       
      })
      .then(result=>{
       
          console.log('result =',result);
          console.log('empty =',result.empty);
          if(result.empty == 0){
           
          var comList = '';
          for(let i of result.data){
            var row =`<tr class="com-row" id="${i._id}">
                          <td class="com-name">${i.name}</td>
                          <td class="com-post">${i.postname}</td>
                          <td class="com-purport">${i.purport}</td>
                          <td class="post-options">
                              <button type="button" class="btn btn-danger com-delete" id="${i._id}" data-toggle="modal" data-target="#deleteModal">Delete</button>
                          </td>
                      </tr>`;
             comList+=row;         
            }
            document.querySelector('#com-tbody').innerHTML = comList;
            $('#deleteModal').modal('hide');
            comDelete();
          }
          else{
            document.querySelector('#com-tbody').innerHTML = `<p>List is Empty !.</p> `;
            $('#deleteModal').modal('hide');
            comDelete();
          }
       

      })

    })
  }


 
