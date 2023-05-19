import { pool } from "../db/index.js";

export async function getBooks() {
  // Query the database and return all books
  const allBooks = await pool.query("SELECT * FROM books;");
  return allBooks.rows;
}

export async function searchBooksByTitle(searchTerm) {
  // Query the database and return all books that have a matching title matching the searchTerm
  const someBooks = await pool.query(
    "SELECT * FROM books WHERE books.title LIKE $1;",
    [`%${searchTerm}%`] //check solution and ask how the matching works
  );
  return someBooks.rows; //solution returns someBooks.rows[0] - ask why
}

export async function searchBooksByAuthor(searchTerm) {
  // Query the database and return all books that have an author name matching the searchTerm

  const someBooks = await pool.query(
    "SELECT * FROM books JOIN author_id ON books.author_id = authors.id WHERE author.first_name LIKE $1 OR author.last_name LIKE $1;",
    [`%${searchTerm}%`]
  );
  return someBooks.rows;
}

export async function getBookById(id) {
  // Query the database and return the book with a matching id
  const book = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
  return book.rows;
}

export async function createBook(book) {
  // Query the database to create a book and return the newly created book
  const newBook = await pool.queryBook(
    "INSERT INTO book (id, author_id, title, published_date) VALUES($1, $2, $3, $4 );",
    [book.id, book.author_id, book.title, book.published_date]
  );
  return newBook.rows;
}

export async function updateBookById(id, updates) {
  // Query the database to update a book and return the newly updated book
  // const newBook = await pool.query("UPDATE book SET id WHERE id = $1  ; ", [
  //   id,
  // ]);
  return {};
}

export async function deleteBookById(id) {
  // Query the database to delete a book and return the deleted book
  const delBook = await pool.query(`DELETE FROM books WHERE id=$1`, [id]);
  return delBook.rows;
}
