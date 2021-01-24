import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { useHistory } from "react-router-dom";

import { storageHelper } from "../../../helpers";

const style = {
  sampleHeader: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 15px;
    background-color: white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > div {
      display: flex;
      align-items: center;
      &:last-child {
        justify-content: flex-end;
      }
      button {
        cursor: pointer;
      }
    }
    label: sample-header;
  `,
};

const SampleHeader = (props) => {
  const history = useHistory();

  const handleBackward = () => {
    history.goBack();
  };

  const handleLogout = () => {
    storageHelper.removeApiToken();
    history.push("/login");
  };

  return (
    <div className={style.sampleHeader}>
      <div>
        <button onClick={handleBackward}>Back</button>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default SampleHeader;

SampleHeader.propTypes = {
  history: PropTypes.object,
};
