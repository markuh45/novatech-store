

function verProducto() {
    document.getElementById("modal-titulo").textContent = "Laptop Pro";
    document.getElementById("modal-descripcion").textContent = "Computadora portátil ideal para trabajar y estudiar.";
    document.getElementById("modal-precio").textContent = "$850";

    document.getElementById("ventana-producto").hidden = false;
}



function verAudifonos() {
    document.getElementById("modal-titulo").textContent = "Audífonos Wireless";
    document.getElementById("modal-descripcion").textContent = "Audífonos inalámbricos con excelente calidad de sonido.";
    document.getElementById("modal-precio").textContent = "$75";

    document.getElementById("ventana-producto").hidden = false;
}



function verTeclado() {
    document.getElementById("modal-titulo").textContent = "Teclado Mecánico";
    document.getElementById("modal-descripcion").textContent = "Teclado moderno ideal para trabajar y estudiar.";
    document.getElementById("modal-precio").textContent = "$120";

    document.getElementById("ventana-producto").hidden = false;
}



function verMonitor() {
    document.getElementById("modal-titulo").textContent = "Monitor Full HD";
    document.getElementById("modal-descripcion").textContent = "Monitor de alta definición para oficina y entretenimiento.";
    document.getElementById("modal-precio").textContent = "$210";

    document.getElementById("ventana-producto").hidden = false;
}



function cerrarProducto() {
    document.getElementById("ventana-producto").hidden = true;
}

document.getElementById("ventana-producto").addEventListener("click", function(event) {
    if (event.target === this) {
        cerrarProducto();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        cerrarProducto();
    }
});

/* CARRITO DE COMPRAS */


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoAgrupado = [];

carrito.forEach(function(producto) {
    const existente = carritoAgrupado.find(function(item) {
        return item.nombre === producto.nombre;
    });

    if (existente) {
        existente.cantidad += producto.cantidad || 1;
    } else {
        carritoAgrupado.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad || 1
        });
    }
});

carrito = carritoAgrupado;




function agregarAlCarrito(nombre, precio) {

    const productoExistente = carrito.find(function(producto) {
        return producto.nombre === nombre;
    });

    if (productoExistente) {
        productoExistente.cantidad =
            (productoExistente.cantidad || 1) + 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    mostrarCarrito();
}


/* VACIAR TODOS LOS PRODUCTOS */


function vaciarCarrito() {
    if (carrito.length === 0) {
        alert("Tu carrito ya está vacío.");
        return;
    }

    const confirmar = confirm(
        "¿Estás seguro de que deseas vaciar el carrito?"
    );

    if (confirmar) {
        carrito = [];
        mostrarCarrito();
    }
}


function mostrarCarrito() {
    
localStorage.setItem("carrito", JSON.stringify(carrito));

    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total-carrito");
    const mensaje = document.getElementById("carrito-vacio");

    lista.innerHTML = "";

    let suma = 0;

   
carrito.forEach(function(producto, indice) {
  
const elemento = document.createElement("div");
elemento.className = "item-carrito";

   

const cantidad = producto.cantidad || 1;
const subtotal = producto.precio * cantidad;


const informacionProducto = document.createElement("div");

informacionProducto.className = "info-producto";


informacionProducto.innerHTML =
    "<strong>" + producto.nombre + "</strong><br>" +
    "Cantidad: " + cantidad + "<br>" +
    "Subtotal: $" + subtotal.toLocaleString("en-US");


elemento.appendChild(informacionProducto);




const botonMenos = document.createElement("button");

botonMenos.textContent = "−";
botonMenos.className = "btn-cantidad";

botonMenos.onclick = function() {
    if (producto.cantidad > 1) {
        producto.cantidad--;
        mostrarCarrito();
    }
};

elemento.appendChild(botonMenos);

const campoCantidad = document.createElement("input");

campoCantidad.type = "number";
campoCantidad.min = "1";
campoCantidad.step = "1";
campoCantidad.value = producto.cantidad || 1;
campoCantidad.style.width = "65px";

campoCantidad.className = "campo-cantidad";


campoCantidad.onchange = function() {
    const nuevaCantidad = Number(campoCantidad.value);

    if (Number.isSafeInteger(nuevaCantidad) && nuevaCantidad >= 1) {
        producto.cantidad = nuevaCantidad;
    }

    mostrarCarrito();
};

elemento.appendChild(campoCantidad);

const botonMas = document.createElement("button");

botonMas.textContent = "+";
botonMas.className = "btn-cantidad";

botonMas.onclick = function() {
    producto.cantidad++;
    mostrarCarrito();
};

elemento.appendChild(botonMas);

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "btn-eliminar";

    

botonEliminar.onclick = function() {
    carrito.splice(indice, 1);
    mostrarCarrito();
};



    elemento.appendChild(botonEliminar);
    lista.appendChild(elemento);

   
suma += producto.precio * (producto.cantidad || 1);

});


    total.textContent = suma.toLocaleString("en-US");
    mensaje.hidden = carrito.length > 0;
    

const cantidadTotal = carrito.reduce(function(acumulador, producto) {
    return acumulador + (producto.cantidad || 1);
}, 0);

document.getElementById("contador-carrito").textContent = cantidadTotal;


}

/* MOSTRAR CARRITO AL CARGAR LA PAGINA */

mostrarCarrito();
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    let confirmar = confirm("¿Estás seguro de que deseas finalizar la compra?");

    if (!confirmar) {
        return;
    }

    alert("¡Compra de demostración realizada con éxito!");

    carrito = [];
    mostrarCarrito();
}