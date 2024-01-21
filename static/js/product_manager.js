$(document).ready( function() {
    loadProducts();
    loadTypes();
})


function loadProducts(){
      let url = 'http://127.0.0.1:9000/products/all'
      $.ajax({
        type: "GET",
        processData: false,
        cache: false,
        contentType: false,
        //data: form_data,
        url: url,
        success: function (res) {
          let data = res.data
          let head = ''
          head+= ``

          let content;
          console.log(data)
          for (var i = 0; i < data.length; i++){

            let item = data[i]
            content = 
            `
            <div class="col-lg-4 col-md-6">
                <div class="card-transparent card-block card-stretch card-height">
                    <div class="card-body text-center p-0">                            
                        <div class="item border-bottom">
                            <div class="odr-img">
                                <img src=${item.image_link} class="img-fluid rounded-circle avatar-90 m-auto" alt="image">
                            </div>                        
                            <div class="odr-content rounded">                                          
                                <h4 class="mb-2">${item.name}</h4>
                                <p class="mb-3">${item.price} VNĐ</p>
                                <ul class="list-unstyled mb-3">
                                    <li class="bg-success-light rounded-circle iq-card-icon-small mr-4 btn" id="add">
                                        <a href="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                        </svg>
                                        </a>
                                    </li>
                                    <li class="bg-primary-light rounded-circle iq-card-icon-small mr-4 btn" id="update">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </li>
                                    <li class="bg-secondary-light rounded-circle iq-card-icon-small mr-4 btn" id="btn-remove">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </li>
                                </ul>                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            $("#row-item").append(content)
            }
        }
      });
}

function loadTypes(){
    let url = 'http://127.0.0.1:9000/types/all'
    $.ajax({
        type: "GET",
        processData: false,
        cache: false,
        contentType: false,
        //data: form_data,
        url: url,
        success: function(res){
            let data = res.data
            for (var i = 0; i < data.length; i++){
                $("#item-type").append($('<option>', {
                    value: data[i].name,
                    text: data[i].name
                }));
                $("#item-fillter").append($('<option>', {
                    value: data[i].name,
                    text: data[i].name
                }));
            }
        }
    })
}

$("#btn-remove").on("click", function() {
    console.log('aaaaaaaaaaaaa')
})

function readURLType(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#type-image").val(e.target.result)

            var i = $("#type-image-upload").prev('label').clone();
            var filename = input.files[0].name;
            console.log(filename)
            $("#type-image-upload").prev('label').text(filename);
            
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function readURLItem(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#item-image").val(e.target.result)
            var i = $("#item-image-upload").prev('label').clone();
            var filename = input.files[0].name;
            console.log(filename)
            $("#item-image-upload").prev('label').text(filename);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#type-image-upload").change(function(){
    readURLType(this);
});

$("#item-image-upload").change(function(){
    readURLItem(this);
});

$("#save-type-btn").on("click", function() {
    let type_name = $("#type-name").val()
    let image_base64 = $("#type-image").val()
    let formData = new FormData()
    formData.append('type_name', type_name)
    formData.append('image_base64', image_base64)
    console.log(type_name)
    console.log(formData)
    let url = 'http://127.0.0.1:9000/type/add'
    $.ajax({
        type: "POST",
        processData: false,
        cache: false,
        contentType: false,
        data: formData,
        url: url,
        success: function (res) {
            if (res==1){
                console.log('Add type thanh cong')
            }
            else{
                console.log("Add type khong thanh cong")
            }
        }
    });
});


$("#save-item-btn").on("click", function() {
    console.log('Dang add item')
    let item_name = $("#item-name").val()
    let item_type = $("#item-type").val()
    let quantity = $("#num").val()
    let price = $("#price").val()
    let image_base64 = $("#item-image").val()
    console.log(image_base64)
    let formData = new FormData()

    formData.append('item_name', item_name)
    formData.append('image_base64', image_base64)
    formData.append('quantity', quantity)
    formData.append('item_type', item_type)
    formData.append('price', price)
    
    let url = 'http://127.0.0.1:9000/product/add'
    $.ajax({
        type: "POST",
        processData: false,
        cache: false,
        contentType: false,
        data: formData,
        url: url,
        success: function (res) {
            if (res==1){
                console.log('Add item thanh cong')
            }
            else{
                console.log("Add item khong thanh cong")
            }
        }
    });
});

