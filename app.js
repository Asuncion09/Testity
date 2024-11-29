const express = require('express');
const bodyParser = require('body-parser');
const pruebaRoutes = require('./routes/pruebaRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/pruebas', pruebaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
