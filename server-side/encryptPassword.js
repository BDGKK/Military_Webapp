const bcrypt = require('bcrypt');

const encryptPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

module.exports = encryptPassword;