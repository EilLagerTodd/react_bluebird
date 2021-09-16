import { dbService, storageService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetobj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetobj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제를 원해?");
    if (ok) {
      await dbService.doc(`nweets/${nweetobj.id}`).delete();
      if (nweetobj.attachmentUrl !== "")
        await storageService.refFromURL(nweetobj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.doc(`nweets/${nweetobj.id}`).update({ text: newNweet });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newNweet} required />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetobj.text}</h4>
          {nweetobj.attachmentUrl && (
            <img src={nweetobj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
