var ActionCreator = {
    selectGame: function (game_id) {
        WebAPI.getSelectedGame(game_id, function (response) {
            ReduxStore.dispatch({
                type: ACTIONS.SELECT_GAME,
                data: response
            })
        });
        WebAPI.getMyReview(game_id, function(response){
            console.log('my review:')
            console.log(response)
            ReduxStore.dispatch({
                type: ACTIONS.MY_REVIEW,
                data: response
            })
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
        WebAPI.createReview(review, function (response) {
            ReduxStore.dispatch({
                type: ACTIONS.POST_REVIEW,
                data: response
            });
        })
    },
    updateReview: function(review){
        WebAPI.updateReview(review, function(response){
            ReduxStore.dispatch({
                type: ACTIONS.UPDATE_REVIEW,
                data: response
            })
        })
    }

};