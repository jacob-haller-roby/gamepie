var WebAPI = {
    getAllGames: function(callback){
        console.log('API fetching games')
        $.ajax({
            url: '/api/games',
            method: 'GET',
            success: function(response) {
                callback(response);
            }
        })
    },
    getSelectedGame: function(id, callback){
        console.log('API fetching game')
        $.ajax({
            url: '/api/games/' + id,
            method: 'GET',
            success: function(response){
                callback(response)
            }
        })
    },

    createReview: function(review, callback){
        console.log('API creating review');
        $.ajax({
            url: '/api/reviews',
            method: 'POST',
            data: review,
            success: function(response){
                callback(response)
            }
        })
    },
    getMyReview: function(game_id, callback){
        console.log('API getting my review');
        $.ajax({
            url: '/api/reviews/mine/' + game_id,
            method: 'GET',
            success: function(response){
                callback(response);
            }
        })
    },
    updateReview: function(review, callback){
        console.log('API updating review');
        $.ajax({
            url: '/api/reviews/' + review.id,
            method: 'PUT',
            data: review,
            success: function(response){
                callback(response);
            }
        })
    }
};