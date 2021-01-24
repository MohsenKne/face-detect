import React from "react";
import PropTypes from "prop-types";

import SampleHeader from "../components/SampleHeader";

const AppTheme = (props) => {
  const { children } = props;

  return (
    <div>
      <SampleHeader />
      <div>{children}</div>
    </div>
  );
};

export default AppTheme;

AppTheme.propTypes = {
  children: PropTypes.node,
};
