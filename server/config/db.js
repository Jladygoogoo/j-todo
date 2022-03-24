const mysql = require('mysql')
const db = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	port: 3306,
	password: "SFpqwnj285798,.",
	database:"J_todo" 
})

module.exports = db;