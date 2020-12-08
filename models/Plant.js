const pool = require('../utils/pool');

module.exports = class Plant {
id;
name;
medicinal_description;
bioregion;

constructor(row) {
  this.id = row.id;
  this.name = row.title;
  this.medicinal_description = row.author;
  this.bioregion = row.bioregion;
}

//CRUD

static async insert({ name, medicinal_description, bioregion }) {
  const { rows } = await pool.query(
    'INSERT INTO plants (name, medicinal_description, bioregion) VALUES ($1, $2, $3) RETURNING *',
    [name, medicinal_description, bioregion]
  );

  return new Plant(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM plants');

  return rows.map(row => new Plant(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM plants WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No flute with id ${id}`);

  return new Plant(rows[0]);
}

static async update(id, { name, medicinal_description, bioregion }) {
  const { rows } = await pool.query(
    `UPDATE plants
        SET title=$1,
        author=$2,
        bioregion=$3
    WHERE id=$4
    RETURNING *
    `,
    [name, medicinal_description, bioregion, id]
  );

  return new Plant(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM plants WHERE id=$1 RETURNING *',
    [id]
  );

  return new Plant(rows[0]);
}

};
