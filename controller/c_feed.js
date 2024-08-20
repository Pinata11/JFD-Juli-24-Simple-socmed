module.exports = {
    index: (req, res) => {
        let dataview = {
            req: req
        }
        res.render('feed/index', dataview)
    }
}