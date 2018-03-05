import React from 'react';
import { connect } from 'react-redux';
import DroppingAreaView from '../Components/DroppingAreaView';
import { DropTarget } from 'react-dnd';

const boxTarget = {};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

class DroppingArea extends React.Component {
  render() {
    const { isOver, connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        <DroppingAreaView isOver={isOver} />
      </div>
    );
  }
}

DroppingArea = DropTarget('card', boxTarget, collect)(DroppingArea);

export default connect()(DroppingArea);
