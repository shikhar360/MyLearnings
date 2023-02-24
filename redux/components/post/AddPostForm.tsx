import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { postAdded } from "./postSlice";
import { AppDispatch } from "../../store/store";

const AddPostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUsers);

  const canSave = Boolean(title) && Boolean(content) && Boolean(user);

  const onSaveClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, user));
      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={user}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setUser(e.target.value)
          }
        >
          <option value=""></option>
          {users &&
          
            users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <button type="button" onClick={onSaveClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
