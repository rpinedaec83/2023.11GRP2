const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());

const stripe = require('stripe')('sk_test_51OsBgTJU0Twa6MrrPZo5MqemrrMl3ttkxwxhMrU6lg1SArRu7cRUNPqOUPK9rG0EjL90DHBog9WHtNZSddTKUVfm00JVNyt3CR');

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pacha2024',
    database: 'hackaton16'
});

app.use(passport.initialize());
app.use(passport.session());

console.log('http://localhost:3000/auth/google');

passport.use(new GoogleStrategy({
    clientID: '781344536012-igsb8g6j7uiamo2jmp9icfnlh4ep9u2i.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    
    const query = 'INSERT INTO usuarios SET ?';
    const usuario = {
      id: profile.id,
      nombre: profile.name.givenName, 
      apellido: profile.name.familyName, 
      correo: undefined, 
      
    };

    connection.query(query, usuario, function(error, results, fields) {
      if (error) throw error;
      return cb(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('Usuario autenticado exitosamente');
    res.redirect('/index.html');
});

app.post('/create-checkout-session', async (req, res) => {
    const productosSeleccionados = req.body.carrito;

    productosSeleccionados.forEach(producto => {
        const orden = {
            nombre_curso: producto.nombre,
            precio: producto.precio
        };

        connection.query('INSERT INTO OrdenDeCompra SET ?', orden, function(error, results, fields) {
            if (error) throw error;
            console.log('Orden de compra guardada en la base de datos.');
        });
    });

    if (req.body.tarjeta) {
        const tarjeta = req.body.tarjeta;
        const datosTarjeta = {
          numero: tarjeta.numero,
            cvv: tarjeta.cvv,
            nombre: tarjeta.nombre,
            fecha_expiracion: tarjeta.fecha_expiracion,
        };

        connection.query('INSERT INTO DatosTarjeta SET ?', datosTarjeta, function(error, results, fields) {
            if (error) throw error;
            console.log('Datos de tarjeta guardados en la base de datos.');
        });
    }

    const line_items = productosSeleccionados.map(producto => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: producto.nombre,
                images: [producto.imagen],
            },
            unit_amount: producto.precio * 100,  
        },
        quantity: 1, 
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: 'http://localhost:3000/index.html',
        cancel_url: 'http://localhost:3000/index.html',
    });

    res.json({ id: session.id });
});

app.listen(3000, () => console.log('App listening on port 3000!'));
