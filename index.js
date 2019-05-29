const express = require ('express');
const cors = require('cors');
const mysql = require('mysql');
 
const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM library';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'matthewstlibrary'
});

connection.connect(err =>{
	if(err){
		return err;
	}
})


app.use(cors());

app.get('/', (req, res)=> {
	res.send('go to /products')
	});


app.get('/products', (req, res)=> {
		connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.json({
			data: results	
			})
		}
	});
});










app.get('/products/add', (req, res)=> {
	    const { id, title, author, cost } = req.query;
		const INSERT_PRODUCTS_QUERY = "INSERT INTO library (id, title, author, cost) VALUES('${id}', '${title}', '${author}', '${cost}');"
	
		connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('Successfully added!')
			
		}
	});
});







app.get('/smoothly', (req, res)=> {
	res.send('Smooth! You are on the Smooth page')
	});



app.listen(4000, ()=> {
	console.log('Product server listening on port 4000')
	
	
})