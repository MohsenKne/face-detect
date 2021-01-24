import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUsers } from "../../../store/actions";
import { truncString } from "../../../helpers/truncString";

const style = {
  dashboard: css`
    padding: 65px 15px 15px;
    h3 {
      margin: 5px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      td,
      th {
        border: 1px solid #aaa;
        padding: 7px 15px;
      }
      th {
        background: #eee;
      }
      button {
        cursor: pointer;
      }
    }
    label: dashboard;
  `,
  tblHeading: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > div:last-child {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        cursor: pointer;
      }
    }
    label: tbl-heading;
  `,
};

const Dashboard = (props) => {
  const { dispatch, users } = props;
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers()).then((result) => {
      // console.log(result);
    });
  }, []);

  const handleRollcall = () => {
    history.push("/rollcall");
  };

  const handleCapture = (p_id) => {
    console.log(p_id);
    history.push({
      pathname: "/capture",
      state: {
        p_id,
      },
    });
  };

  return (
    <div className={style.dashboard}>
      <h1>Dashboard</h1>
      <div className={style.tblHeading}>
        <div>
          <h3>Users</h3>
        </div>
        <div>
          <button onClick={handleRollcall}>Roll Call</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>row</th>
            <th>Personal ID</th>
            <th>Face ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={`user-item-${index}`}>
                <td>{index + 1}</td>
                <td>{user.personal_id}</td>
                <td>{truncString(user.face_id.toString(), 30)}</td>
                <td>
                  <button onClick={() => handleCapture(user.personal_id)}>
                    Capture Face
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return {
    users: users.data,
  };
};

export default connect(mapStateToProps)(Dashboard);

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  users: PropTypes.array,
};
