const path = require('path')
const m_user = require('./../model/m_user')
const m_post = require('../model/m_post')
const moment = require('moment')
moment.locale('id')

module.exports = {
    index: async (req,res) => {
        let dataview = {
            req: req,
            moment: moment,
            message: req.query.msg,
            postingan: await m_post.get_all(),
        }
        res.render('profile/index', dataview)
    },

    form_edit: (req, res) => {
        let dataview = {
            req: req,
        }
        res.render('profile/form-edit', dataview)
    },

    proses_update: async (req, res) => {
        try {
            let update = await m_user.update(req)
            if (update.affectedRows > 0) {
                req.session.user[0].nama_lengkap    = req.body.form_fullname
                req.session.user[0].bio             = req.body.form_bio
                res.redirect('/profile?msg=berhasil edit profile')
            }
        } catch (error) {
            throw error
        }
    },

    form_edit_foto: (req, res) => {
        let dataview = {
            req: req,
        }
        res.render('profile/form-edit-foto', dataview)
    },

    proses_update_foto: (req, res) => {
        let foto = req.files.form_uploadfoto

        // ganti nama file asli
        let username = req.session.user[0].username.replaceAll('.', '-')
        let datetime = moment().format('YYYYMMDD_HHmmss')
        let file_name = username + '_' + datetime + '_' + foto.name
        let folder_simpan = path.join(__dirname, '../public/upload', file_name)

        // pakai function mv() untuk meletakkan file di suatu folder/direktori
        foto.mv(folder_simpan, async (err) => {
            if (err) {
                return res.status(500).send(err)
            }
            // jika fotonya berhasil terupload ke folder_simpan
            try {
                let update = await m_user.update_foto(req, file_name)
                if (update.affectedRows > 0) {
                    // ubah data session yang lama
                    req.session.user[0].foto = file_name
                    // kembalikan ke halaman profile
                    res.redirect('/profile?msg=berhasil update profile picture')
                }
            } catch (error) {
                throw error
            }
        })
    },
}