baseReducer = Redux.combineReducers({gameReducer, reviewReducer});
ReduxStore = Redux.createStore(baseReducer);
console.log('store created');