import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import TableView from './Components/TableView';

import Card from './Containers/Card';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DroppingArea from './Containers/DroppingArea';
import CardWrapperView from './Components/CardWrapperView';

const initialState = {
  cards: []
};

const createCards = () => {
  for (let i = 0; i < 5; i++) {
    let tempCard = {
      name: Date.now() + i,
      timesDropped: 0
    };

    initialState.cards.push(tempCard);
  }
};

createCards();

/*****************
 *
 *  REDUCER
 *****************/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARD_DROPPED': {
      let droppedCard = action.card;

      let newCardArr = state.cards.map(card => {
        let tempCard = { ...card };
        if (droppedCard.name === card.name) {
          tempCard.timesDropped++;
        }

        return tempCard;
      });

      return {
        ...state,
        cards: newCardArr
      };
    }
    default:
      return state;
  }
};

let store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

class App extends Component {
  render() {
    const cards = store.getState().cards;
    return (
      <Provider store={store}>
        <div>
          <TableView>
            <DroppingArea />
          </TableView>
          <CardWrapperView>
            {cards.map((card, index) => {
              let top = Math.floor(Math.random() * 100);
              let left = Math.floor(Math.random() * 100);
              return (
                <Card top={top} left={left} key={index} cardIndex={index} />
              );
            })}
          </CardWrapperView>
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
