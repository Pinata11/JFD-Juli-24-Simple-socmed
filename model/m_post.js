const mysql = require('mysql2')
const execute = require('../config/database').execute
const moment = require('moment')
moment.locale('id')

module.exports = {
    insert: (req) => {
        let data = {
            caption : req.body.form_caption,
            file1   : req.files.form_media1.name,
            file2   : req.files.form_media2.name,
            file3   : req.files.form_media3.name,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            // image_path: req.file.path.replace('public', ''),
            // updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        return execute( mysql.format(
            `INSERT INTO posts SET ?`,
            [data]
        ))
    },
}