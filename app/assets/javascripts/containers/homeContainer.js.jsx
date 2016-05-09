var HomeContainer = React.createClass({
    componentDidMount: function () {
        this._unsubscribe = ReduxStore.subscribe(this._onChange);
        ActionCreator.loadGames();
    },
    componentWillUnmount: function () {
        this._unsubscribe();
    },
    _calculateState: function () {
        let reduxState = ReduxStore.getState();
        return {
            games: reduxState.gameReducer.list.data || [],
            selectedGame: reduxState.gameReducer.selected || {},
            myReview: reduxState.reviewReducer.myReview || {}
        }
    },
    _onChange: function () {
        this.setState(this._calculateState());
    },
    getInitialState: function () {
        return {
            games: [],
            selectedGame: {}
        };
    },
    render: function () {
        var logout = function(){$.ajax({
            method: 'DELETE',
            url: '/users/sign_out'
        })};
        return <div>
            <Games {...this.state}/>
            <MaterialUi.RaisedButton onClick={logout} style={{position: 'fixed', bottom: 0}}>Log Out</MaterialUi.RaisedButton>

        </div>
    }
});