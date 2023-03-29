import bcrypt from 'bcrypt'

const password = 'Password01'

const salt = await bcrypt.genSaltSync(10)
const hash = await bcrypt.hash(password, salt)

console.log({
    password,
    salt,
    hash
})

