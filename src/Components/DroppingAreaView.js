import React from 'react';
import ColorPalette from '../ColorPalette';
import CardView from './CardView';

const styling = {
  width: '80vw',
  height: '150px',
  borderRadius: '10px',
  border: '5px dashed white',
  background: ColorPalette.third,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  color: 'white',
  transition: 'all 0.5s'
};

const DroppingAreaView = ({ isOver, droppedCards }) => (
  <div
    style={{
      ...styling,
      border: isOver ? '10px solid white' : '5px dashed white'
    }}
  >
    {droppedCards.map((droppedCard, index) => (
      <CardView
        key={index}
        name={droppedCard.name}
        isDragging={droppedCard.isDragging}
      />
    ))}
  </div>
);

export default DroppingAreaView;
