module.exports = {
    index: (req,res) => {
        let dataview = {
            req: req,
        }
        res.render('profile/index', dataview)
    },
}