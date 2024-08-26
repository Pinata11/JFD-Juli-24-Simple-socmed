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
                    // ganti nama file asli
                    let username = req.session.user[0].username.replaceAll('.', '-')
                    let datetime = moment().format('YYYYMMDD_HHmmss')

                    let file1_name = username + '_' + datetime + '_' + media1.name
                    let file2_name = username + '_' + datetime + '_' + media2.name
                    let file3_name = username + '_' + datetime + '_' + media3.name

                    let folder1_simpan = path.join(__dirname, '../public/feed', file1_name)
                    let folder2_simpan = path.join(__dirname, '../public/feed', file2_name)
                    let folder3_simpan = path.join(__dirname, '../public/feed', file3_name)

                    let pesan = ''
                    media1.mv(folder1_simpan, async (err) => {
                        if (err) {
                            pesan += `<br>Upload failed! Media 1 exceeds size limit.`
                        } else {
                            pesan += `<br>Success! Media 1 uploaded.`
                        }
                    })

                    media2.mv(folder2_simpan, async (err) => {
                        if (err) {
                            pesan += `<br>Upload failed! Media 2 exceeds size limit.`
                        } else {
                            pesan += `<br>Success! Media 2 uploaded.`
                        }
                    })

                    media3.mv(folder3_simpan, async (err) => {
                        if (err) {
                            pesan += `<br>Upload failed! Media 3 exceeds size limit.`
                        } else {
                            pesan += `<br>Success! Media 3 uploaded.`
                        }
                    })

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