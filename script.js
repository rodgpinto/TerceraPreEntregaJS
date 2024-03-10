let burgers = [
    {
        id: 1, nombre: "Atari", contiene: "Doble carne, doble cheddar, doble panceta, lechuga, tomate y una chimimayonesa", precio: 6700, rutaImagen: "atari.jpg"
    },
    {
        id: 2, nombre: "Contra", contiene: "Doble carne, cheddar, lechuga, tomate, cebolla, pepinos, huevo y mayonesa", precio: 5700, rutaImagen: "Contra.jpg"
    },
    {
        id: 3, nombre: "Donkey Kong", contiene: "Doble carne, cheddar, huevo, lechuga, tomate, cebolla pepino y mayonesa", precio: 6500, rutaImagen: "DonkeyKong.jpg"
    },
    {
        id: 4, nombre: "Game Over", contiene: "Doble carne, doble cheddar, doble panceta, lechuga, pepinos y salsa big mac", precio: 6700, rutaImagen: "GameOver.jpg"
    },
    {
        id: 5, nombre: "Luigi", contiene: "Doble carne, provoleta, guacamole, pico de gallo, alioli y salsa picante casera", precio: 3000, rutaImagen: "luigi.jpg"
    },
    {
        id: 6, nombre: "Megaman", contiene: "Doble carne, queso roquefort, rúcula, cebolla caramelizada y alioli", precio: 6500, rutaImagen: "Megaman.jpg"
    },
    {
        id: 7, nombre: "Nes", contiene: "Doble carne, cheddar, panceta, salsa marinara, fried muzzarella", precio: 7200, rutaImagen: "Nes.jpg"
    },
    {
        id: 8, nombre: "Pac-Man", contiene: "Doble carne, doble cheddar, cebolla smasheada, mayonesa y ketchup", precio: 5500, rutaImagen: "Pac-Man.jpg"
    },
    {
        id: 9, nombre: "Sunset Riders", contiene: "Doble carne, doble cheddar, doble panceta, salsa barbacoa casera y cebolla", precio: 6700, rutaImagen: "SunSetRiders.jpg"
    },
    {
        id: 10, nombre: "Super Mario", contiene: "Doble carne, cheddar, panceta, lechuga, tomate, cebolla, pepino (nueva salsa)", precio: 6300, rutaImagen: "SuperMario.jpg"
    },
    {
        id: 11, nombre: "Tetris", contiene: "Doble carne, doble cheddar, cebolla picada, pepinos, ketchup y mostaza", precio: 5500, rutaImagen: "Tetris.jpg"
    }

]



function principal(burgers) {

    renderizarBurgers(burgers);
    renderizarCarrito()
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "Old Fashioned Burgers"

    let inputNombre = document.getElementById("inputNombre");

    let botonBuscar = document.getElementById("buscar");
    botonBuscar.addEventListener("click", () => filtrarTarjetas(inputNombre));
    let botonComprar = document.getElementById("comprar");
    botonComprar.addEventListener("click", finalizarCompra);

    let botonVerOcultar = document.getElementById("verOcultarInfo");
    botonVerOcultar.addEventListener("click", verOcultarBurgersCarrito);

    function verOcultarBurgersCarrito(e) {
        let seccionVenta = document.getElementById("seccionVenta");
        let seccionCarrito = document.getElementById("seccionCarrito");

        seccionVenta.classList.toggle("oculta");
        seccionCarrito.classList.toggle("oculta");

        if (e.target.innerText === "Ver compra") {
            e.target.innerText = "Ver burgers";
        } else {
            e.target.innerText = "Ver compra";
        }
    }
    let copyright = document.getElementById("copyright");
    let hoy = new Date();
    let anioActual = hoy.getFullYear();
    copyright.innerHTML = "Copyright " + anioActual;

}
function finalizarCompra() {
    renderizarCarrito();

    let mensajeCompra = document.getElementById("mensajeCompra");
    if (localStorage.getItem("carrito") !== null) {
        mensajeCompra.innerText = "¡Compra finalizada! Gracias por tu compra.";
        mensajeCompra.classList.remove("oculta");
        localStorage.removeItem("carrito");

    } else {
        mensajeCompra.innerText = "No has agregado nada al carrito";
        mensajeCompra.classList.remove("oculta");
        localStorage.removeItem("carrito");

    }
}

function renderizarBurgers(burgers) {
    let contenedor = document.getElementById("burgers");
    contenedor.innerHTML = " ";
    burgers.forEach(burger => {
        let tarjetaProd = document.createElement("div");
        tarjetaProd.className = "burger";
        tarjetaProd.innerHTML = `
         <img src= ./media/${burger.rutaImagen} />
         <h3>${burger.nombre}</h3>
         <p> ${burger.contiene}</p>
         <h4>Precio: $${burger.precio}</h4>
         <br>
         <button id=${burger.id}>Agregar al carrito</button>
         <br>
    `
        contenedor.append(tarjetaProd);
        let botonAgregarAlCarrito = document.getElementById(burger.id);
        botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito)

    })
}
function agregarAlCarrito(e) {
    let carrito = obtenerCarrito();
    let idBotonBurger = Number(e.target.id);
    let burgerBuscado = burgers.find(burger => burger.id == idBotonBurger);
    let burgerEnCarrito = carrito.find(burger => burger.id == idBotonBurger);

    if (burgerEnCarrito) {
        burgerEnCarrito.unidades++;
        burgerEnCarrito.subtotal = burgerEnCarrito.precioUnitario * burgerEnCarrito.unidades;
    } else {
        carrito.push({
            id: burgerBuscado.id,
            nombre: burgerBuscado.nombre,
            precioUnitario: burgerBuscado.precio,
            unidades: 1,
            subtotal: burgerBuscado.precio

        })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();

    let totalPagar = calcularTotal(carrito);

    mostrarTotal(totalPagar);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}




function calcularTotal(carrito) {
    return carrito.reduce((total, burger) => total + burger.subtotal, 0);
}

function mostrarTotal(total) {
    let elementoTotal = document.getElementById("totalPagar");

    if (elementoTotal) {
        elementoTotal.innerText = `Total a pagar: $${total.toFixed(2)}`;
    } else {
        console.error("Elemento con ID 'totalPagar' no encontrado en el HTML.");
    }

}



function renderizarCarrito() {
    let carrito = obtenerCarrito();
    let contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";
    carrito.forEach(burger => {
        let item = document.createElement("tr");
        item.innerText = burger.nombre + " " + burger.precioUnitario + " " + burger.unidades + " " + burger.subtotal;
        item.innerHTML = `
        <td>${burger.nombre}</td>
        <td>${burger.precioUnitario}</td>
        <td>${burger.unidades}</td>
        <td>${burger.subtotal}</td>
        `
        contenedor.append(item);
    })

}

function filtrarTarjetas(inputNombre) {
    let nombreFiltrado = inputNombre.value.trim();
    let burgersFiltrados;

    if (nombreFiltrado) {
        burgersFiltrados = burgers.filter(burger => burger.nombre.toLowerCase().includes(nombreFiltrado.toLowerCase()));
    } else {
        burgersFiltrados = burgers;
    }

    renderizarBurgers(burgersFiltrados);
}
function filtrarTarjetas(inputNombre) {
    let filtro = inputNombre.value.trim().toLowerCase();

    let burgersFiltrados = burgers.filter(burger =>
        burger.nombre.toLowerCase().includes(filtro) ||
        burger.contiene.toLowerCase().includes(filtro)
    );

    renderizarBurgers(burgersFiltrados);
}
function obtenerCarrito() {
    let carrito = [];
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    };
    return carrito
}

principal(burgers);
