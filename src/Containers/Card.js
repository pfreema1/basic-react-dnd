import React from 'react';
import { connect } from 'react-redux';
import CardView from '../Components/CardView';
import { DragSource } from 'react-dnd';

//specifies the drag source contract
const cardSource = {
  beginDrag(props) {
    let { cards, cardIndex } = props;
    // return the data describing the dragged item
    const item = cards[cardIndex];

    return item;
  },

  // could use this to not allow song changing while
  // playing song
  canDrag(props, monitor) {
    return true;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    //when dropped on a compatible target, do something
    const card = monitor.getItem();
    const dropResult = monitor.getDropResult();

    props.dispatch({ type: 'CARD_DROPPED', card });
  }
};

//specifies which props to inject into component
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Card extends React.Component {
  render() {
    let { cardIndex, cards, top, left } = this.props;

    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        <CardView
          name={cards[cardIndex].name}
          timesDropped={cards[cardIndex].timesDropped}
          top={top}
          left={left}
          isDragging={isDragging}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

Card = DragSource('card', cardSource, collect)(Card);
export default connect(mapStateToProps)(Card);
