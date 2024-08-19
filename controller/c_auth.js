const db = require('../config/database').db
const execute = require('../config/database').execute
const mysql = require('mysql2')

let cari_username = (username) => {
    return execute( mysql.format(
        "SELECT * FROM user WHERE username = ?",
        [username]
    ))
}

module.exports = {
    form_login: (req, res) => {
        res.render('auth/form-login')
    },

    proses_login: async (req, res) => {
        let username = req.body.form_username
        let password = req.body.form_password

        let user = await cari_username(username)
        if (user.length > 0) {
            res.end('User ditemukan')
        } else {
            res.end('User tidak ditemukan')
        }
    },
}