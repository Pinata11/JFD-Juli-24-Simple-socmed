const m_user = require('./../model/m_user')
const moment = require('moment')
moment.locale('id')

module.exports = {
    index: (req,res) => {
        let dataview = {
            req: req,
            moment: moment,
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
                res.redirect('/profile?berhasil edit profile')
            }
        } catch (error) {
            throw error
        }
    },
}