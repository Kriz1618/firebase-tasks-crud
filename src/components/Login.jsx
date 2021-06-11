import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const registerUser = (e) => {
    e.preventDefault();
    console.log("11 ", email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
        alert("User registered!!");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setErrorMsg("Invalid email format!!");
        } else if (error.code === "auth/weak-password") {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("");
        }
      });
  };

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((r) => {
        history.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("");
        }
      });
  };

  return (
    <div className="row mt-5">
      <div className="col"></div>
      <div className="col">
        <form onSubmit={registerUser} className="form-group">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            placeholder="Introduce your Email"
            type="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control mt-4"
            placeholder="Introduce your Password"
            type="password"
          />
          <input
            className="btn btn-dark btn-block mt-4 form-control"
            value="Create user"
            type="submit"
          />
        </form>
        <button
          onClick={login}
          className="btn btn-success btn-block form-control mt-2"
        >
          SignIn
        </button>
        {errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : (
          <span></span>
        )}
      </div>
      <div className="col"></div>
    </div>
  );
};
