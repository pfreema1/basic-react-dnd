import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import CardView from '../Components/CardView';
import { DragSource, DropTarget } from 'react-dnd';

/*****************************/
//card drag source methods
/*****************************/
//specifies the drag source contract
const cardSource = {
  beginDrag(props) {
    let { cards, cardIndex } = props;
    // return the data describing the dragged item
    const item = { ...cards[cardIndex] };

    item.UID = Date.now();

    return item;
  },

  // could use this to not allow song changing while
  // playing song
  canDrag(props, monitor) {
    return true;
  },

  endDrag(props, monitor, component) {
    const card = monitor.getItem();

    if (!monitor.didDrop()) {
      //droppped outside of drop target - remove the card from droppedCards list
      props.dispatch({ type: 'CARD_DROPPED_OUTSIDE_DROP_TARGET', card });

      return;
    }

    //when dropped on a compatible target, do something
    const dropResult = monitor.getDropResult();
  }
};

/*****************************/
// card drop target methods
/*****************************/
const cardTarget = {
  hover(props, monitor, component) {
    //get the hoverer
    let hoverer = monitor.getItem();
    //get the hoveree
    // if (hoverer.name === props.cards[props.cardIndex].name) {
    //   console.log('hovering over self!');
    //   return;
    // }
  }
};

/*****************************/
//collect functions
/*****************************/

//specifies which props to inject into component
function dragSourceCollect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

function dropTargetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Card extends React.Component {
  render() {
    let { cardIndex, cards } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div>
          <CardView
            name={cards[cardIndex].name}
            timesDropped={cards[cardIndex].timesDropped}
            isDragging={isDragging}
          />
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

Card = DropTarget('card', cardTarget, dropTargetCollect)(Card);
Card = DragSource('card', cardSource, dragSourceCollect)(Card);
export default connect(mapStateToProps)(Card);
