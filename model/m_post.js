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
            // image_path: req.file.path.replace('public', ''),
            // updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        return execute( mysql.format(
            `INSERT INTO posts SET ?`,
            [data]
        ))
    },
}