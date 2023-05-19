import { pool } from "../db/index.js";

export async function getAuthors() {
  // Query the database and return all authors✔
  const allAuthors = await pool.query("SELECT * FROM authors;");
  //console.log(allAuthors.rows);
  return allAuthors.rows;
}

await getAuthors();

export async function searchAuthorsByName(searchTerm) {
  // Query the database and return all authors that have a name matching the searchTerm
  const author = searchTerm;
  const values = [author];
  const query = "SELECT * FROM authors WHERE first_name LIKE $1;";
  const result = await pool.query(query, values);
  return result.rows;
}

await searchAuthorsByName("J.K.");

export async function getAuthorById(id) {
  // Query the database and return the book with a matching id
  const authorId = id;
  const values = [authorId];
  const query = "SELECT * FROM authors WHERE author_id = $1;";
  const result = await pool.query(query, values);

  return result.rows;
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  const { first_name, last_name } = author;
  const values = [first_name, last_name];
  const query = "INSERT INTO authors (first_name, last_name) VALUES ($1, $2);";
  const result = await pool.query(query, values);
  return result.rows;
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author
  // const id = id;
  const { first_name, last_name } = updates;
  const values = [first_name, last_name, id];
  const query =
    "UPDATE authors SET first_name = $1, last_name = $2 WHERE author_id = $3;";
  const result = await pool.query(query, values);
  return result.rows;
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author
  const authorId = id;
  const values = [authorId];
  const query = "DELETE FROM authors WHERE author_id = $1;";
  const result = await pool.query(query, values);
  return result.rows;
}
