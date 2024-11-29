const pruebaModel = require('../models/pruebaModel');

const createPrueba = (req, res) => {
    try {
        const nuevaPrueba = req.body;
        const pruebas = pruebaModel.readData();
        pruebas.push(nuevaPrueba);
        pruebaModel.saveData(pruebas);

        res.status(201).json({
            message: 'Prueba agregada exitosamente',
            data: nuevaPrueba,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al guardar la prueba',
            error: error.message,
        });
    }
};

const getPruebas = (req, res) => {
    try {
        const pruebas = pruebaModel.readData();
        res.status(200).json({
            message: 'Pruebas obtenidas exitosamente',
            data: pruebas,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las pruebas',
            error: error.message,
        });
    }
};

module.exports = {
    createPrueba,
    getPruebas,
};
