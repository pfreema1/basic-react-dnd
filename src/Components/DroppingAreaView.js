import React from 'react';
import ColorPalette from '../ColorPalette';

const styling = {
  width: '80vw',
  height: '150px',
  borderRadius: '10px',
  border: '5px dashed white',
  background: ColorPalette.third,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.5s'
};

const DroppingAreaView = ({ isOver }) => (
  <div
    style={{
      ...styling,
      border: isOver ? '10px solid white' : '5px dashed white'
    }}
  >
    Hello im dropping area
  </div>
);

export default DroppingAreaView;
