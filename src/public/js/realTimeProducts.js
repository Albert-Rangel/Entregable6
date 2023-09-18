const socket = io()

socket.on('AllProducts', (data) => {
    console.log('el cliente escucho el llamado allproducts')//eliminar
    updateProductList(data);
});

// Función para actualizar la lista de productos en la página web
function updateProductList(products) {
    const containerDiv = document.getElementById("allProductsContainer");
    let contenidocambiante = ""

    products.forEach(({ thumbnail, price, description, _id, code, stock, status, category, title }) => {
        contenidocambiante += `<div class="form-container">
            <div>
                <div class="card">
                    <img src= "${thumbnail}" alt="..." class="images">
                    <div class="card-body">
                        Title: ${title} </br> 
                        Id: ${_id} </br> 
                        Price: ${price} $ </br> 
                        Description : ${description} </br> 
                        Code: ${code}</br> 
                        Stock: ${stock}</br> 
                        Status: ${status}</br> 
                        Category: ${category}</br> 
                    </div>
                </div>
            </div>
        </div>`

    });
    console.log('renderizo nada porque no vino objeto') //eliminar

    containerDiv.innerHTML = contenidocambiante
}

let productForm = document.getElementById("formProduct");
productForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    console.log('Entro en el addEventListener') //eliminar

    let description = productForm.elements.description.value;
    let title = productForm.elements.title.value;
    let price = productForm.elements.price.value;
    let thumbnail = productForm.elements.thumbnail.value;
    let code = productForm.elements.code.value;
    let stock = productForm.elements.stock.value;
    // let status = productForm.elements.status.value;
    var status = document.getElementById('status').checked;
    let category = productForm.elements.category.value;

    console.log('Entro en el metodo de enviar el formulario en el clientside, emite sennewproduct y limpia form') //eliminar

    
    socket.emit('sendNewProduct', {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
    })
    productForm.reset()
})

document.getElementById("deleteBoton").addEventListener("click", function () {
    const producttoDelete = document.getElementById("ProductID");
    const PRODID = producttoDelete.value;
    socket.emit("functionDeleteProduct", PRODID);
    producttoDelete.value = "";
});
