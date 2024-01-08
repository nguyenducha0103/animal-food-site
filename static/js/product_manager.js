$(document).ready( function() {
    loadProducts()
})


function loadProducts(){
      
      // call api get all product from db
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
                                <p class="mb-3">${1200}</p>
                                <ul class="list-unstyled mb-3">
                                    <li class="bg-success-light rounded-circle iq-card-icon-small mr-4 btn" id="add">
                                        <a href="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                        </svg>
                                    </li>
                                    <li class="bg-primary-light rounded-circle iq-card-icon-small mr-4 btn" id="update">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </li>
                                    <li class="bg-secondary-light rounded-circle iq-card-icon-small mr-4 btn" id="btn-remove1">
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

$("#btn-remove1").on("click", function() {
    console.log('aaaaaaaaaaaaa')
})

