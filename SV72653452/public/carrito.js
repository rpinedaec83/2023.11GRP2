let carrito = [];
let stripe;

document.addEventListener('DOMContentLoaded', function() {
    stripe = Stripe('pk_test_51OsBgTJU0Twa6Mrr9IsQqlPIsucYf5jn3qzM2oZ1Wf82VgUap9Sh36FlOeYU5K22XrVhJM3a71tb2pIk2gfsmNZk00Omaok4Vb');

    const form = document.getElementById('miFormulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
  
        stripe.createToken(card).then(function(result) {
            if (result.error) {
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                stripeTokenHandler(result.token);
            }
        });
    });
});

function agregarAlCarrito(curso, imgId, precio) {
    const imagen = document.getElementById(imgId).cloneNode(true);
    imagen.classList.add("imagen-carrito");
    const imgSrc = imagen.src;
    precio = parseFloat(precio.replace('$', '')); 
    carrito.push({ nombre: curso, imagen: imgSrc, precio: precio });
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    itemsCarrito.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = item.imagen;
        img.classList.add("imagen-carrito"); 
        li.appendChild(img);
        li.appendChild(document.createTextNode(item.nombre));
        const button = document.createElement('button');
        button.textContent = 'Eliminar';
        button.onclick = function() { eliminarDelCarrito(index); };
        li.appendChild(button);
        itemsCarrito.appendChild(li);
    });
}

function comprar() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de comprar.');
        return;
    }

    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ carrito: carrito }) 
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function(result) {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
  alert('Gracias por tu compra!');
}
