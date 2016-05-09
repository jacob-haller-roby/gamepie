var Games = React.createClass({

    getInitialState: function () {
        return {
            slideDirection: 'forward',
            search: '',
            games: this.props.games || []
        }

    },

    componentWillReceiveProps: function(newProps){

    },

    selectGame: function (game_id) {
        this.setState({slideDirection: 'forward'},
            ActionCreator.selectGame(game_id)
        )

    },
    back: function () {
        this.setState({slideDirection: 'backward'},
            ActionCreator.clearSelectedGame()
        )
    },

    setSearch: function (event) {
        this.setState({
            search: event.target.value
        });


    },

    view: function () {
        console.log(this.props.selectedGame.name + " is the name of the game");

        if (this.props.selectedGame.name) {
            return <div style={{padding:25, position: 'absolute', width: '100%'}} key="game-view">
                <MaterialUi.Paper style={{padding: 50}}  zDepth={5}>
                    <SelectedGame game={this.props.selectedGame} myReview={this.props.myReview} back={this.back}/>
                </MaterialUi.Paper>

            </div>
        } else {

            var games = [];
            if (this.state.search == '') {
                games = this.props.games;
            } else {
                games = this.props.games.filter(function (game) {
                    console.log(game.name + game.name.includes(this.state.search))
                    return (game.name.includes(this.state.search))
                }, this);
            }
            console.log(games)
            return <div style={{padding:25, position: 'absolute', width: '100%'}} key="index-view">
                <MaterialUi.Paper style={{padding: 50}} zDepth={5}>
                    <MaterialUi.AppBar
                        title="Check out some games!"

                        iconElementRight={<MaterialUi.FlatButton label="EXPLORE!"/>}
                        />
                    <MaterialUi.TextField floatingLabelText="Search..." onChange={this.setSearch}
                                                           defaultValue={this.state.search} />
                    <MaterialUi.Table selectable={false} wrapperStyle={{width: '100%', overflow: 'visible'}}>
                        <MaterialUi.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <MaterialUi.TableRow>
                                <MaterialUi.TableHeaderColumn>Game Name</MaterialUi.TableHeaderColumn>
                                <MaterialUi.TableHeaderColumn>Description</MaterialUi.TableHeaderColumn>
                                <MaterialUi.TableHeaderColumn>Community Ratings</MaterialUi.TableHeaderColumn>
                                <MaterialUi.TableHeaderColumn>My Ratings</MaterialUi.TableHeaderColumn>
                                <MaterialUi.TableHeaderColumn>Actions</MaterialUi.TableHeaderColumn>
                            </MaterialUi.TableRow>
                        </MaterialUi.TableHeader>
                        <MaterialUi.TableBody displayRowCheckbox={false}>
                            {games.map(function (game) {
                                return (
                                    <MaterialUi.TableRow>
                                        <MaterialUi.TableRowColumn>
                                            {game.name}
                                        </MaterialUi.TableRowColumn>
                                        <MaterialUi.TableRowColumn>
                                            {game.description}
                                        </MaterialUi.TableRowColumn>
                                        <MaterialUi.TableRowColumn>
                                            <StaticColorBadge game={game} community={true}
                                                              size={VIEW_CONSTANTS.SIZE.S}/>
                                        </MaterialUi.TableRowColumn>
                                        <MaterialUi.TableRowColumn>
                                            <StaticColorBadge game={game} size={VIEW_CONSTANTS.SIZE.S}/>
                                        </MaterialUi.TableRowColumn>
                                        <MaterialUi.TableRowColumn>
                                            <MaterialUi.FloatingActionButton mini={true}
                                                                             onClick={this.selectGame.bind(this, game.id)}
                                                                             style={{fontSize: 'large', fontWeight: 'bolder'}}>
                                                <span>?</span>
                                            </MaterialUi.FloatingActionButton>
                                        </MaterialUi.TableRowColumn>
                                    </MaterialUi.TableRow>
                                )
                            }, this)}
                        </MaterialUi.TableBody>
                    </MaterialUi.Table>


                </MaterialUi.Paper>
            </div>;
        }
    },


    render: function () {
        return (<div>
            <ReactCSSTransitionGroup transitionName={"slide-" + this.state.slideDirection} transitionEnterTimeout={1000}
                                     transitionLeaveTimeout={1000}>
                {this.view()}
            </ReactCSSTransitionGroup>
        </div>);
    }
});
