const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/pruebas.json');

const readData = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
};

const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

module.exports = {
    readData,
    saveData,
};
