$(document).ready( function() {
    loadProducts()

})

function loadProducts(){
    var product = {id:'',
    name:'Hạt Sinko',
    price:"1000",
    quantity:0,
    img_link: "images/p1.png"
}
    // call api get all product from db
    let products = [product, product]
    let head = ''
    head+= `
    `

    let content;
    for (var i = 0; i < products.length; i++){

        let item = products[i]
        console.log(item)
        content = 
        `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="box" id="box-${i}">
            <a href="">
              <div class="img-box">
                <img src=${item.img_link} alt="">
              </div>
              <div class="detail-box">
                <h6>
                    ${item.name}
                </h6>
                <h6>
                  Price
                  <span>
                    ${item.price}
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
    $("#container").append(content)
    }
    
}
$(document).ready( function() {

});

$("#load-product").on("click", function(){
    console.log('load product')
    loadProducts()
})