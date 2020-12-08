const pool = require('../utils/pool');

module.exports = class Flute {
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
    'INSERT INTO flutes (brand, model, url) VALUES ($1, $2, $3) RETURNING *',
    [brand, model, url]
  );

  return new Flute(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM flutes');

  return rows.map(row => new Flute(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM flutes WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No flute with id ${id}`);

  return new Flute(rows[0]);
}

static async update(id, { brand, model, url }) {
  const { rows } = await pool.query(
    `UPDATE flutes
        SET title=$1,
        author=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [brand, model, url, id]
  );

  return new Flute(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM flutes WHERE id=$1 RETURNING *',
    [id]
  );

  return new Flute(rows[0]);
}

};
