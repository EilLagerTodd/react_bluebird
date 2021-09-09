import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();

  const onLongOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLongOutClick}>Long Out</button>
    </>
  );
};

export default Profile;
