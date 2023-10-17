import { useState } from "react";
import styles from "./styles/CommentSection.module.css";
import date from "date-and-time";

export default () => {
  let [emailInput, setEmailInput] = useState("");
  let [commentContentInput, setCommentContent] = useState("");
  let [comments, setComments] = useState([]);

  const performActions = (ev) => {
    ev.preventDefault();
    const commentDate = new Date();
    const formattedDate = date.format(commentDate, "DD/MM/YYYY HH:mm:ss");
    const newEmail = ev.target.emailInput.value;
    const newCommentContent = ev.target.textAreaInput.value;
    setEmailInput(newEmail);
    setCommentContent(newCommentContent);
    if (newCommentContent.length > 10) {
      const newComment = new Comment(
        newEmail,
        newCommentContent,
        formattedDate
      );
      setComments([...comments, newComment]);
      ev.target.emailInput.value = "";
      ev.target.textAreaInput.value = "";
    } else {
      alert("Mínimo de 10 letras");
    }
  };

  const removeComment = (ev) => {
    let newCommentsArray = [...comments];
    newCommentsArray.splice(ev, 1);
    setComments(newCommentsArray);
  };

  class Comment {
    constructor(emailInput, commentContent, commentDate) {
      this.emailInput = emailInput;
      this.commentContent = commentContent;
      this.commentDate = commentDate;
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={performActions}>
        <h1>Seção de Comentários</h1>
        <h3>Email: </h3>
        <label htmlFor="emailInput"></label>
        <input
          id="emailInput"
          name="emailInput"
          type="email"
          required={true}
          className={styles.emailInput}
        ></input>
        <h3>Comentário: </h3>
        <textarea
          id="textAreaInput"
          name="textAreaInput"
          className={styles.textAreaInput}
          required={true}
        ></textarea>
        <br />
        <button id="btn" name="btn" className={styles.btn} type="submit">
          Enviar comentário
        </button>
      </form>
      <div className={styles.commentSection}>
        {comments.length === 0 ? (
          <>
            <p style={{ fontStyle: "italic", fontSize: "15px" }}>
              Seja o primeiro a comentar!
            </p>
            <hr />
          </>
        ) : (
          <>
            <p style={{ fontStyle: "italic", fontSize: "15px" }}>
              Comentários:
            </p>
            <hr />
            {comments.map((comment) => (
              <div
                className={styles.commentListBody}
                key={comments.indexOf(comment)}
              >
                <p className={styles.emailOfComment}>{comment.emailInput}</p>
                <p className={styles.date}>{comment.commentDate}</p>
                <p>{comment.commentContent}</p>
                <button
                  className={styles.btn}
                  id={styles.btnRemove}
                  onClick={() => removeComment(comments.indexOf(comment))}
                >
                  Remover
                </button>
                <hr />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
