const m_post = require('./../model/m_post')
const path = require('path')
const moment = require('moment')
moment.locale('id')

module.exports = {
    index: (req,res) => {
        let dataview = {
            req: req,
            moment: moment,
            message: req.query.msg,
        }
        res.render('posting/index', dataview)
    },

    proses_insert: async (req, res) => {
        let caption = req.body.form_caption
        let media1  = req.files.form_media1
        let media2  = req.files.form_media2
        let media3  = req.files.form_media3

        if (caption || (media1 || media2 || media3) ) {
            // proses insert ke database
            try {
                let max_size = 1024 * 1024 * 5 // 5MB

                // cek ukuran media
                if (media1.size > max_size) {
                    return res.redirect('/posting?msg=Upload failed! Media1 exceeds size limit.')
                }
                else if (media2.size > max_size) {
                    return res.redirect('/posting?msg=Upload failed! Media2 exceeds size limit.')
                }
                else if (media3.size > max_size) {
                    return res.redirect('/posting?msg=Upload failed! Media3 exceeds size limit.')
                } else {
                    // proses insert ke database
                    let insert = await m_post.insert(req)
                    if (insert.affectedRows > 0) {
                        return res.redirect('/feed?msg=Media uploaded!')
                    }
                }
            } catch (error) {
                // menangkap error dari proses try (insert ke database)
                console.log(error)
                res.redirect(`/posting?msg=${error}`)
            }
        } else {
            // kirim pesan error/warning-alert
            // terhadap pengecekan antara caption atau media, salah satunya harus terisi
            let pesan_error = 'Either caption or media has to be filled'
            res.redirect(`/posting?msg=${pesan_error}`)
        }
    },
}