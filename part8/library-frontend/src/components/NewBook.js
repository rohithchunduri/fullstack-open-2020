import React, { useState } from "react";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";
import styles from "./NewBook.module.css";
import Button from "./Button";
import Input from "./Input";

const NewBook = ({ setPage, show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  let [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    published = Number(published);
    createBook({ variables: { title, author, published, genres } });

    setPage("books");

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">title</label>
          <Input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="author">author</label>
          <Input
            id="author"
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="published">published</label>
          <Input
            id="published"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="genre">genre</label>
          <div className={styles.genreWrapper}>
            <Input
              id="genre"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />

            <Button
              className={styles.genreBtn}
              onClick={addGenre}
              type="button"
            >
              add genre
            </Button>
          </div>
        </div>
        <div className={styles.genres}>genres: {genres.join(" ")}</div>
        <Button type="submit">create book</Button>
      </form>
    </div>
  );
};

export default NewBook;
