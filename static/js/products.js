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
              <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="box" id="${item.id}">
                  <a href="/template/details.html">
                    <div class="img-box">
                      <img src=${item.image_link} alt="">
                    </div>
                    <div class="detail-box">
                      <h6>
                          ${item.name}
                      </h6>
                      <h6>
                        <span>
                          ${item.price} VNĐ
                        </span>
                      </h6>
                    </div>
                    <div class="new">
                      <span>
                        New
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              `
              $("#row-product").append(content)
              }
        }
      });
  }

