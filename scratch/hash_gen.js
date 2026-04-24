const bcrypt = require('bcryptjs');
const password = 'GrowXAdmin2026!';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
console.log('Password: ' + password);
console.log('Hash: ' + hash);
