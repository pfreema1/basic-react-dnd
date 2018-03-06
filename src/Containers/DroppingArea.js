import React from 'react';
import { connect } from 'react-redux';
import DroppingAreaView from '../Components/DroppingAreaView';
import { DropTarget } from 'react-dnd';

const boxTarget = {
  hover(props, monitor, component) {
    let hoverer = monitor.getItem();

    let findResults = props.droppedCards.find(card => {
      return card.UID === hoverer.UID;
    });

    //if hoverer.UID is not in the array of droppedCards, add it
    if (findResults) {
      //card already added - start sorting
    } else {
      //card not added yet, add card
      props.dispatch({ type: 'NEW_CARD_HOVER_BEGIN', card: hoverer });
    }
  },
  drop(props, monitor, component) {
    const item = monitor.getItem();

    //add item to dropped cards
    // props.dispatch({ type: 'CARD_DROPPED', item });
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

class DroppingArea extends React.Component {
  render() {
    const { isOver, connectDropTarget, droppedCards } = this.props;

    return connectDropTarget(
      <div>
        <DroppingAreaView isOver={isOver} droppedCards={droppedCards} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    droppedCards: state.droppedCards
  };
};

DroppingArea = DropTarget('card', boxTarget, collect)(DroppingArea);

export default connect(mapStateToProps)(DroppingArea);
