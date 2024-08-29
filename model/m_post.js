const mysql = require('mysql2')
const execute = require('../config/database').execute
const moment = require('moment')
moment.locale('id')

module.exports = {
    insert: (req, file1_name, file2_name, file3_name) => {
        let data = {
            caption : req.body.form_caption,
            file1       : (file1_name) ? file1_name : null,
            file2       : (file2_name) ? file2_name : null,
            file3       : (file3_name) ? file3_name : null,
            created_at  : moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by  : req.session.user[0].id,
        }
        return execute( mysql.format(
            `INSERT INTO posts SET ?`,
            [data]
        ))
    },

    get_all: function() {
        return execute( mysql.format(
            `SELECT
                p.*,
                u.username, u.nama_lengkap, u.foto
            FROM posts AS p
            LEFT JOIN user AS u ON u.id = p.created_by  
            ORDER BY p.id DESC`
        ))
    },
}