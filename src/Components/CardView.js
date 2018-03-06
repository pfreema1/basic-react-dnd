import React from 'react';
import ColorPalette from '../ColorPalette';

const styling = {
  width: '200px',
  height: '70px',
  background: ColorPalette.fourth,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // position: "absolute",
  borderRadius: '5px',
  cursor: 'move'
};

const CardView = ({ name, timesDropped, top, left, isDragging }) => (
  <div
    style={{
      ...styling,
      top: top + '%',
      left: left + '%',
      background: isDragging ? 'skyblue' : ColorPalette.fourth
    }}
  >
    name: {name} timesDropped: {timesDropped}
  </div>
);

export default CardView;
