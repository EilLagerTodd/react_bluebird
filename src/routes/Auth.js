import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        console.log(data);
      } else {
        const data = await signInWithPhoneNumber(authService, email, password);
        console.log(data);
      }
    } catch (error) {
      //console.log(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  /*const onSocialCLick = async (event) => {
    console.log(event.target.name);
  }; */

  const onSocialCLick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(authService, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      } else if (name === "github") {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(authService, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? "Ceate Account" : "Log in"} />
        <div>{error}</div>
      </form>

      <span onClick={toggleAccount}>
        {newAccount ? "sign up" : "Create Account"}
      </span>

      <div>
        <button onClick={onSocialCLick} name="google">
          Google
        </button>
        <button onClick={onSocialCLick} name="github">
          Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
