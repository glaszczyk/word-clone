import React from "react";

export const Banner = ({ status, children }) => {
  return <div className={`banner ${status}`}>{children}</div>;
};
