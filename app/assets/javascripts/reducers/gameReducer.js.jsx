var gameReducer = function (state = {}, action = null) {

    switch (action.type) {
        case(ACTIONS.SELECT_GAME):
            console.log('reducer selecting game');
            return Object.assign({}, state, {selected: action.data});
        case(ACTIONS.LOAD_GAMES):
            console.log('reducer loading games');
            return Object.assign({}, state, {list: action.data.games});
        case(ACTIONS.POST_REVIEW):
        case(ACTIONS.UPDATE_REVIEW):
            console.log('updating review for game');
            review = action.data;
            listData = state.list.data.map(function (game) {
                return game.id == review.game_id ?
                    React.addons.update(game, {myReview: {$set: review}})
                    : game;
            });

            newState = React.addons.update(state, {list: {data: {$set: listData}}})

            if (review.game_id == state.selected.id) {
                newState = React.addons.update(newState, {selected: {myReview: {$set: review}}});
            }
            return newState;
        case(ACTIONS.CLEAR_GAME):
            return Object.assign({}, state, {selected: {}});
        case(ACTIONS.CALCULATE_GAME):
            gameIndex = state.list.data.findIndex(function (game) {
                return game.id == action.data.id
            });
            newState = React.addons.update(state, {list: {data: {$splice: [[gameIndex, 1, action.data]]}}});
            if (action.data.id == state.selected.id) {
                newState = React.addons.update(newState, {selected: {$set: action.data}});
            }
            return newState;
        default:
            return state;
    }


};


var reviewReducer = function (state = {}, action = null) {
    console.log('review Reducer')
    switch (action.type) {
        case(ACTIONS.MY_REVIEW):
            console.log('reducer selecting game\'s reviews');
            return Object.assign({}, state, {myReview: action.data});
        case(ACTIONS.POST_REVIEW):
        case(ACTIONS.UPDATE_REVIEW):
            return Object.assign({}, state, {myReview: action.data});
        case(ACTIONS.CLEAR_GAME):
            return Object.assign({}, state, {myReview: {}});
        default:
            return state;
    }

};