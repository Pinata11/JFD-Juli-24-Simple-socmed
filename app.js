const express   = require('express')
const app       = express()
const port      = 3000
const c_beranda = require('./controller/c_beranda')
const c_auth = require('./controller/c_auth')



app.use( express.urlencoded({extended:false}) )
app.use(express.static('public'))


app.set('view engine', 'ejs')
app.set('views', './view')


app.get('/', c_beranda.index)
app.get('/login', c_auth.form_login)


app.listen(port, ()=>{
    console.log(`Aplikasi sudah siap, buka http://localhost:${port}`)
})