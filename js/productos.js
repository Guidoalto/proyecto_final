// Array de productos
const productos = [
    {
        id: 1,
        nombre: "Sprinter Minibus",
        precio: 48000,
        imagen: "imagen1.jpeg"
    },
    {
        id: 2,
        nombre: "Polo Highline",
        precio: 57000,
        imagen: "imagen2.jpeg"
    },
    {
        id: 3,
        nombre: "Cronos Precision",
        precio: 42000,
        imagen: "imagen3.jpeg"
    },
    {
        id: 4,
        nombre: "Vento Luxury",
        precio: 21000,
        imagen: "imagen4.jpeg"
    },
    {
        id: 5,
        nombre: "Golfg GTI",
        precio: 70000,
        imagen: "imagen5.jpeg"
    
    
    

    }
];

// Carrito de compras
let carrito = [];

// Elementos del DOM
const productosContainer = document.getElementById('productos-container');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Función para renderizar productos
function renderProductos() {
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');
        productoCard.innerHTML = `
            <img src="../imagenes/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoCard);
    });
}

// Función para agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <span>${item.nombre}</span>
            <span>$${item.precio} x ${item.cantidad}</span>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.precio * item.cantidad;
    });

    cartTotalPrice.textContent = total.toFixed(2);
    cartCount.textContent = carrito.length;
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Eventos para mostrar/ocultar carrito
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    cartModal.style.display = 'block';
});

closeCart.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault(); 
    cartModal.style.display = 'none';
});

// Evento de checkout (solo muestra un mensaje)
checkoutBtn.addEventListener('click', () => {
    alert('Gracias por tu compra!');
    carrito = [];
    actualizarCarrito();
    cartModal.style.display = 'none';
});

// Renderizar productos al cargar la página
renderProductos();
