import React from "react";
import ColorPalette from "../ColorPalette";

const styling = {
  width: "300px",
  height: "300px",
  borderRadius: "10px",
  border: "5px dashed white",
  background: ColorPalette.third,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const DroppingAreaView = () => (
  <div style={styling}>Hello im dropping area</div>
);

export default DroppingAreaView;
