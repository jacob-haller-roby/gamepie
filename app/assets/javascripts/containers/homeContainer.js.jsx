var HomeContainer = React.createClass({
    componentDidMount: function(){
        this._unsubscribe = ReduxStore.subscribe(this._onChange);
        ActionCreator.loadGames();
    },
    componentWillUnmount: function(){
        this._unsubscribe();
    },
    _calculateState: function(){
        let reduxState = ReduxStore.getState();
        return {
            games: reduxState.gameReducer.list.data || [],
            selectedGame: reduxState.gameReducer.selected || {},
            myReview: reduxState.reviewReducer.myReview || {}
        }
    },
    _onChange: function(){
        this.setState(this._calculateState());
    },
    getInitialState: function(){
        return {
            games: [],
            selectedGame: {}
        };
    },
    render: function(){
        return <Games {...this.state}/>
    }
});