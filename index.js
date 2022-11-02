require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config')



//Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Rutas
app.use('/api/personas', require('./routes/personas'));
app.use('/api/mascotas', require('./routes/mascotas'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/mail', require('./routes/mail'));
app.use('/api/resetpass', require('./routes/resetpass'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/analisis', require('./routes/analisis'));

app.listen( 3000, () => {
    console.log('Servidor corriendo en puerto'+ 3000);
})