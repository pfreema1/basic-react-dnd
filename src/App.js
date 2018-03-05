import React, { Component } from "react";
import "./App.css";
import { createStore } from "redux";
import TableView from "./Components/TableView";
import DroppingAreaView from "./Components/DroppingAreaView";
import Card from "./Containers/Card";
import { Provider } from "react-redux";

const initialState = {
  cards: []
};

const createCards = () => {
  for (let i = 0; i < 5; i++) {
    let tempCard = {
      name: Date.now(),
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
    case "CARD_DROPPED": {
      return {
        ...state
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
            <DroppingAreaView />
          </TableView>
          {cards.map((card, index) => {
            let top = Math.floor(Math.random() * 100);
            let left = Math.floor(Math.random() * 100);
            return <Card top={top} left={left} key={index} cardIndex={index} />;
          })}
        </div>
      </Provider>
    );
  }
}

export default App;
