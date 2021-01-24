import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../../store/actions";

const Login = (props) => {
  const { dispatch } = props;
  const history = useHistory();

  const handleLogin = ({ username, password }) => {
    dispatch(login({ username, password })).then(() => {
      history.push("/");
    });
  };

  return (
    <div>
      <p>
        Click to login:{" "}
        <button
          onClick={() =>
            handleLogin({ username: "username", password: "password" })
          }
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default connect()(Login);
