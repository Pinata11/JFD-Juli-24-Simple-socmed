module.exports = {
    index: (req,res) => {
        let dataview = {
            req: req,
        }
        res.render('profile/index', dataview)
    },

    form_edit: (req, res) => {
        let dataview = {
            req: req,
        }
        res.render('profile/form-edit', dataview)
    },
}