const pool = require('../lib/utils/pool');

module.exports = class Book {
id;
title;
author;
url;

constructor(row) {
  this.id = row.id;
  this.title = row.title;
  this.author = row.author;
  this.url = row.url;
}

//CRUD

static async insert({ title, author, url }) {
  const { rows } = await pool.query(
    'INSERT INTO books (title, author, url) VALUES ($1, $2, $3) RETURNING *',
    [title, author, url]
  );

  return new Book(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM books');

  return rows.map(row => new Book(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM books WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No book with id ${id}`);

  return new Book(rows[0]);
}

static async update(id, { title, author, url }) {
  const { rows } = await pool.query(
    `UPDATE books
        SET title=$1,
        author=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [title, author, url, id]
  );
  if(!rows[0]) throw new Error(`No book with id ${id}`);

  return new Book(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM books WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No book with id ${id}`);

  return new Book(rows[0]);
}



};
