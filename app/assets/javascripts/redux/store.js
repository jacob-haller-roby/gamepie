baseReducer = Redux.combineReducers({gameReducer: gameReducer, reviewReducer: reviewReducer});
ReduxStore = Redux.createStore(baseReducer);
console.log('store created');