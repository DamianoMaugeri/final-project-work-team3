const connection = require("../data/db");



function index(req, res) {
    let sql = "SELECT * FROM properties"
    const params = [];
    if (req.query.city) {
        sql += " WHERE city= ?"
        params.push(req.query.city)
    }
    sql += " ORDER BY vote DESC"
    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    });

}





function show(req, res) {
    console.log(res)
}



module.exports = { index, show }