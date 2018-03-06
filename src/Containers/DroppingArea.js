import React from 'react';
import { connect } from 'react-redux';
import DroppingAreaView from '../Components/DroppingAreaView';
import { DropTarget } from 'react-dnd';

const boxTarget = {
  hover(props, monitor, component) {},
  drop(props, monitor, component) {
    const item = monitor.getItem();

    //add item to dropped cards
    props.dispatch({ type: 'CARD_DROPPED', item });
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
