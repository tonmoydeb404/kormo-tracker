import React, { Fragment } from "react";

const GenSekeleton = ({ element = <></>, count = 0 }) => {
  return [...Array(count).keys()].map((item) => (
    <Fragment key={item}>{element}</Fragment>
  ));
};

export default GenSekeleton;
