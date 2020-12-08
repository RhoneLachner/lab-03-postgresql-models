const pool = require('../utils/pool');

module.exports = class Guitar {
id;
brand;
model;
url;

constructor(row) {
  this.id = row.id;
  this.brand = row.title;
  this.model = row.author;
  this.url = row.url;
}

//CRUD

static async insert({ brand, model, url }) {
  const { rows } = await pool.query(
    'INSERT INTO guitars (brand, model, url) VALUES ($1, $2, $3) RETURNING *',
    [brand, model, url]
  );

  return new Guitar(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM guitars');

  return rows.map(row => new Guitar(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM guitars WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No guitar with id ${id}`);

  return new Guitar(rows[0]);
}

static async update(id, { brand, model, url }) {
  const { rows } = await pool.query(
    `UPDATE guitars
        SET title=$1,
        author=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [brand, model, url, id]
  );

  return new Guitar(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM guitars WHERE id=$1 RETURNING *',
    [id]
  );

  return new Guitar(rows[0]);
}

};
