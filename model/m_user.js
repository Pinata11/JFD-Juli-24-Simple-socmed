const mysql = require('mysql2')
const execute = require('../config/database').execute
const moment = require('moment')

module.exports = {
    update: (req) => {
        let data = {
            nama_lengkap: req.body.form_fullname,
            bio: req.body.form_bio,
            last_update: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        let id_user = req.session.user[0].id
        return execute( mysql.format(
            'UPDATE user SET ? WHERE id = ?',
            [data, id_user]
        ))
    },
}