import React from "react";
import ColorPalette from "../ColorPalette";

const styling = {
  width: "200px",
  height: "70px",
  background: ColorPalette.fourth,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  borderRadius: "5px"
};

const CardView = ({ name, timesDropped, top, left }) => (
  <div style={{ ...styling, top: top + "%", left: left + "%" }}>
    name: {name} timesDropped: {timesDropped}
  </div>
);

export default CardView;
