const connection = require('../data/db.js');


function index(req, res) {
    let sql = ` SELECT * 
    FROM  properties`

    connection.query(sql, (err, properties) => {
        // console.log(err)
        if (err) return res.status(500).json({ message: err.message })




        res.json(properties)
    })
    console.log(res)
}





function show(req, res) {
    console.log(res)
}



module.exports = { index, show }