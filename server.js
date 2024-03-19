const express = require('express')
const http = require('http')
const mysql = require('mysql')
const path = require('path')
// end module

const app = express()
const port = 3000
// end server

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "checklist"
})

connection.connect((err) =>{
    if (err){
        console.log('koneksi database gagal')
    }
    else{
        console.log('koneksi database berhasil')
    }
})

app.set('views', 'views')

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) =>{
    const query = "SELECT * FROM exo_mengaji"
    connection.query(query, (err, result) =>{
        if (err){
            console.log('pemrosesan data darai database gagal')
        }
        else{
            res.render('index',{ data:result})
        }
    })
  
})

app.get('/complete/:id', (req,res) =>{
    const Id = req.params.id
    const query = "UPDATE exo_mengaji SET keterangan = true WHERE id = ?"
    connection.query(query, [Id], (error, results) => {
        if (error) {
            console.error('Error updating item:', error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Item updated successfully');
            // Redirect kembali ke halaman utama setelah pembaruan berhasil
            res.redirect('/');
        }
    });
})


app.listen(port, () =>{[
    console.log(`berjalan di port ${port}`)
]})