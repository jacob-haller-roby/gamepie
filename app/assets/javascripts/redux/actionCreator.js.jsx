var ActionCreator = {
    selectGame: function (game_id) {
        WebAPI.getSelectedGame(game_id, function (response) {
            ReduxStore.dispatch({
                type: ACTIONS.SELECT_GAME,
                data: response
            })
        });
        WebAPI.getMyReview(game_id, function(response){
            ReduxStore.dispatch({
                type: ACTIONS.MY_REVIEW,
                data: response
            })
        })

    },
    calculateGame: function(game_id){
        WebAPI.calculateGame(game_id, function(response){
            ReduxStore.dispatch({
                type: ACTIONS.CALCULATE_GAME,
                data: response
            })
        });
    },
    clearSelectedGame: function(){
        ReduxStore.dispatch({
            type: ACTIONS.CLEAR_GAME
        })
    },
    loadGames: function () {
        ReduxStore.dispatch({
            type: ACTIONS.LOAD_GAMES,
            data: {games: {status: STATUS.LOADING}}
        });

        WebAPI.getAllGames(function (response) {
            ReduxStore.dispatch({
                type: ACTIONS.LOAD_GAMES,
                data: {
                    games: {
                        status: STATUS.READY,
                        data: response
                    }
                }
            });
        });

    },
    createReview: function (review) {
        let calculateGame = this.calculateGame;
        WebAPI.createReview(review, function (response) {
            ReduxStore.dispatch({
                type: ACTIONS.POST_REVIEW,
                data: response
            });
            calculateGame(review.game_id);
        })
    },
    updateReview: function(review){
        let calculateGame = this.calculateGame;
        WebAPI.updateReview(review, function(response){
            ReduxStore.dispatch({
                type: ACTIONS.UPDATE_REVIEW,
                data: response
            });
            calculateGame(review.game_id);
        })
    }

};