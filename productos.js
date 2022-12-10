//crear productos con constructor

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const dino = new Producto(1, "DinoClip", 200, "../imgjs/imgdino.png");
const combi = new Producto(2, "Combi PortaLapiz", 300, "../imgjs/imgcombi.png");
const cortador = new Producto(3, "Cortador Pacman", 300, "../imgjs/imgcortador.png");
const audifonos = new Producto(4, "Porta Audifonos", 400, "../imgjs/imgaudifonos.png");
const porta = new Producto(5, "Porta Lapiz", 500, "../imgjs/imgporta.png");
const vasos = new Producto(6, "Porta Vasos", 300, "../imgjs/imgvasos.jpg");
const salero = new Producto(7, "Salero", 400, "../imgjs/imgsalero.jpg");
const alexa = new Producto(8, "Soporte Alexa", 600, "../imgjs/imgalexa.jpg");

//almacenando en un array de productos

const productos = [dino, combi, cortador, audifonos, porta, vasos, salero, alexa]

// array carrito para almacenarlo

let carrito = [];
/* Para cargar carrito en el LocalStorage */

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}

//DOM

const contenedorProductos = document.getElementById("contenedorProductos");
const mostrarProductos = () => {
    productos.forEach((producto) => {
        const { img, nombre, precio, id } = producto
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12"); // estamos a;adiendo clases a las cards es con classList.add 
        card.innerHTML = `
            <div class ="card m-2"> 
                <img src="${img}" class ="card-img-top imgProductosJs" alt="${nombre}" 
                <div class="card-body">
                <h5 class="card-title"> ${nombre}</h5>
                <p class="card-text"> Costo= ${precio}</p>
                
                <button class="btn colorBoton" id="boton ${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        // agregando productos al carrito

        const boton = document.getElementById(`boton ${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
            Swal.fire({
                title: 'Gracias!',
                text: 'Se agrego correctamente.',
                imageUrl: '../imgjs/hacer-venta.gif',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                timer: 1500
            })
        })
    })
}
//para que se ejecute cuando se carga la pagina
mostrarProductos();


//para agregar al carrito
const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push(producto);
        //Local Storage
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    calcularTotal();
}

//para ver el carrito

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = " "; //limpiar el carrito
    carrito.forEach((producto) => {
        const { img, nombre, precio, cantidad, id } = producto
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12"); // es para que esas card tenga esos stilos 
        card.innerHTML = `
                <div class ="card"> 
                    <img src="${img}" class ="card-img-top imgProductosJs" alt="${nombre}" 
                    <div class="card-body">
                    <h5 class="card-title"> ${nombre}</h5>
                    <p class="card-text"> Cantidad = ${cantidad} </p>
                    <p class="card-text"> Total unitario = ${precio * cantidad}</p>
                    <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                    </div>
                </div>
            `

        contenedorCarrito.appendChild(card);

        //eliminar productos del carrito
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id)
            Swal.fire({
                title: 'Se elimino correctamente',
                text: ':(',
                imageUrl: '../imgjs/pikachu.gif',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                timer: 1500
            })
        })
    })
    calcularTotal();
}




// para eliminar del carrito
const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//boton vaciar carrito
const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodo();
})

const eliminarTodo = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

//total de compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = ` de $${totalCompra}`;
}

