const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const path = require("path");
const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get('/products', async (req, res) => {
  try {
    const allProds = await pool.query(
      'select * from products'
    )
    res.json(allProds.rows)
  } catch (err) {
    console.error(err.message, 'ERROR');
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const prod = await pool.query(
      'select * from products where id = $1',
      [id]
    )
    res.json(prod.rows[0])
  } catch (err) {
    console.error(err.message);
  }
})

app.post('/products', async (req, res) => {
  try {
    const { name, price, img } = req.body;
    const newProd = await pool.query(
      'insert into products (name, price, img) values ($1, $2, $3) returning *',
      [name, price, img]
    );
    res.json(newProd.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, img } = req.body
    const updateProd = pool.query(
      'update products set (name, price, img) = ($2, $3, $4) where id = $1 returning *',
      [id, name, price, img]
    )
    res.json('product updated')
  } catch (err) {
    console.error(err.message);
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteProd = await pool.query(
      'delete from products where id = $1',
      [id]
    )
    res.json('product deleted')
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(PORT, () => {
  console.log(`Server is on ${PORT}`);
})