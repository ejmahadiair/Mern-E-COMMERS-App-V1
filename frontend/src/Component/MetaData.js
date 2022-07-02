import React from "react";
import Helmet from "react-helmet";
const MetaData = ({ title }) => {
  return (
    <>
      <div className="meta-container">
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </div>
    </>
  );
};

export default MetaData;
