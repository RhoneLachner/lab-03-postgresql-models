const pool = require('../utils/pool');

module.exports = class Dog {
id;
name;
breed;
url;

constructor(row) {
  this.id = row.id;
  this.name = row.title;
  this.breed = row.author;
  this.url = row.url;
}

//CRUD

static async insert({ name, breed, url }) {
  const { rows } = await pool.query(
    'INSERT INTO dogs (name, breed, url) VALUES ($1, $2, $3) RETURNING *',
    [name, breed, url]
  );

  return new Dog(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM dogs');

  return rows.map(row => new Dog(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM dogs WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No flute with id ${id}`);

  return new Dog(rows[0]);
}

static async update(id, { name, breed, url }) {
  const { rows } = await pool.query(
    `UPDATE dogs
        SET title=$1,
        author=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [name, breed, url, id]
  );

  return new Dog(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM dogs WHERE id=$1 RETURNING *',
    [id]
  );

  return new Dog(rows[0]);
}

};
