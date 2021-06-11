import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";

export const Menu = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        setUser(userInfo.uid);
        setUserEmail(userInfo.email);
      }
    });
  }, []);

  const singUp = () => {
    auth.signOut();
    setUser(null);
    setUserEmail(null);
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Init
            </Link>
          </li>
          <li>
            {!user ? (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            ) : (
              <span>Not</span>
            )}
          </li>
          <li>
            {user ? (
              <Link
                className="nav-link"
                to={{ pathname: "/tasks", state: { userId: user } }}
              >
                Tasks
              </Link>
            ) : (
              <span>Not</span>
            )}
          </li>
        </ul>
        <span class="navbar-text ms-auto mb-2 mb-lg-0">{userEmail}</span>
        {user ? (
          <button className="btn btn-danger ms-auto me-1" onClick={singUp}>
            SingOut{" "}
          </button>
        ) : (
          <span></span>
        )}
      </nav>
    </div>
  );
};
