const db = require('../config/database').db
const execute = require('../config/database').execute
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')

let cari_username = (username) => {
    return execute(mysql.format(
        "SELECT * FROM user WHERE username = ?",
        [username]
    ))
}

module.exports = {
    form_login: (req, res) => {
        let dataview = {
            message: req.query.msg
        }
        res.render('auth/form-login', dataview)
    },

    proses_login: async (req, res) => {
        try {
            let username = req.body.form_username
            let password = req.body.form_password
            let user = await cari_username(username)

            if (user.length > 0) {
                let passwordCocok = bcrypt.compareSync(password, user[0].password)
                if (passwordCocok) {
                    req.session.user = user
                    res.redirect('/feed')
                } else {
                    let message = 'Password salah'
                    res.redirect(`/login?msg=${message}`)
                }
            } else {
                let message = 'User tidak ditemukan'
                res.redirect(`/login?msg=${message}`)
            }
        } catch (error) {
            console.error('Error during login process:', error)
            res.status(500).end('An error occurred during the login process')
        }
    },
}
