var gameReducer = function (state = {}, action) {

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

            return React.addons.update(state, {list: {data: {$set: listData}}});
        default:
            return state;
    }


};


var reviewReducer = function (state = {}, action) {
    console.log('review Reducer')
    switch (action.type) {
        case(ACTIONS.MY_REVIEW):
            console.log('reducer selecting game\'s reviews');
            return Object.assign({}, state, {myReview: action.data});
        case(ACTIONS.POST_REVIEW):
        case(ACTIONS.UPDATE_REVIEW):
            return Object.assign({}, state, {myReview: action.data});
        default:
            return state;
    }

};