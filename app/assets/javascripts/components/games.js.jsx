var Games = React.createClass({

    selectGame: function (game_id) {
        ActionCreator.selectGame(game_id);
    },

    selectedGame: function () {
        if (this.props.selectedGame.name) {
            return <SelectedGame game={this.props.selectedGame} myReview={this.props.myReview}/>
        }
    },

    render: function () {
        return <div style={{padding:25}}>
            <MaterialUi.Paper style={{padding: 50}}>

                <MaterialUi.Table selectable={false}>
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
                        {this.props.games.map(function (game) {
                            console.log('loading row');
                            console.log(game);
                            return (
                                <MaterialUi.TableRow>
                                    <MaterialUi.TableRowColumn>
                                        {game.name}
                                    </MaterialUi.TableRowColumn>
                                    <MaterialUi.TableRowColumn>
                                        {game.description}
                                    </MaterialUi.TableRowColumn>
                                    <MaterialUi.TableRowColumn>
                                        <StaticColorBadge game={game} community={true}/>
                                    </MaterialUi.TableRowColumn>
                                    <MaterialUi.TableRowColumn>
                                        <StaticColorBadge game={game}  />
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

                {this.selectedGame()}
            </MaterialUi.Paper>
        </div>;
    }
});

var SelectedGame = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        }
    },


    render: function () {
        return <MaterialUi.Paper style={{padding: 50}}>
            <div className="container-fluid">
                <div className="col-md-6 col-sm-12 text-center">
                    SELECTED GAME IS: {this.props.game.name}
                    <ReviewColorBadge game={this.props.game} myReview={this.props.myReview}/>
                </div>
                <div className="col-md-6 col-sm-12">
                    Description?
                    <StaticColorBadge game={this.props.game}/>

                </div>
            </div>
        </MaterialUi.Paper>
    }
});

var StaticColorBadge = React.createClass({

    render: function () {
        if(this.props.community){
            review = this.props.game
        } else {
            review = this.props.game.myReview
        }
        
        
        return <MaterialUi.Paper style={{padding: 50, backgroundColor: '#eeeeee'}}>

            <StaticSlider color="black" value={review.black}/>
            <StaticSlider color="red" value={review.red}/>
            <StaticSlider color="green" value={review.green}/>
            <StaticSlider color="blue" value={review.blue}/>
            <StaticSlider color="yellow" value={review.white}/>

        </MaterialUi.Paper>
    }
});

var ReviewColorBadge = React.createClass({
    getInitialState: function(){
        myReview = this.props.myReview;
        return {
            red: myReview.red,
            black: myReview.black,
            white: myReview.white,
            blue: myReview.blue,
            green: myReview.green
        }
    },
    componentWillReceiveProps: function(newProps){
        
        this.setState({
            red: newProps.myReview.red,
            black: newProps.myReview.black,
            white: newProps.myReview.white,
            blue: newProps.myReview.blue,
            green: newProps.myReview.green
        });

    },
    resetState: function(newProps){
        myReview = newPropsthis.props.myReview;

    },
    handleChange: function (color, value) {
        obj = {};
        obj[color] = value;
        var newState = Object.assign({}, this.state, obj);
        this.setState(newState);
        console.log(newState);
    },
    save: function () {
        ActionCreator.createReview({
            review: {
                game_id: this.props.game.id,
                black: this.state.black,
                red: this.state.red,
                blue: this.state.blue,
                green: this.state.green,
                white: this.state.white
            }
        });
    },
    update: function () {
        ActionCreator.updateReview({
            review: {
                id: this.props.myReview.id,
                game_id: this.props.game.id,
                black: this.state.black,
                red: this.state.red,
                blue: this.state.blue,
                green: this.state.green,
                white: this.state.white
            }
        });
    },
    action: function(){
        if(this.props.myReview.id){
            return <MaterialUi.RaisedButton label="Update" onClick={this.update}/>
        }
        return <MaterialUi.RaisedButton label="Save" onClick={this.save}/>;
    },
    render: function () {
        return <MaterialUi.Paper style={{padding: 50, backgroundColor: '#eeeeee'}}>

            <ReviewSlider color="black" defaultValue={this.state.black}
                          onChange={this.handleChange.bind(this, 'black')}/>
            <ReviewSlider color="red" defaultValue={this.state.red} onChange={this.handleChange.bind(this, 'red')}/>
            <ReviewSlider color="green" defaultValue={this.state.green}
                          onChange={this.handleChange.bind(this, 'green')}/>
            <ReviewSlider color="blue" defaultValue={this.state.blue}
                          onChange={this.handleChange.bind(this, 'blue')}/>
            <ReviewSlider color="yellow" defaultValue={this.state.white}
                          onChange={this.handleChange.bind(this, 'white')}/>
            {this.action()}
        </MaterialUi.Paper>
    }
});

var StaticSlider = React.createClass({

    dark: function () {
        if (this.props.color == 'yellow') {
            return '#ffea00';
        }
        return this.props.color;
    },

    light: function () {
        switch (this.props.color) {
            case('red'):
                return '#ef9a9a';
            case('blue'):
                return '#90caf9';
            case('black'):
                return '#757575';
            case('green'):
                return '#a5d6a7';
            case('yellow'):
                return '#fff9c4'
        }
    },

    render: function () {
        return <div style={{padding: 15}}>
            <div className="row" style={{position: 'relative'}}>
                <MaterialUi.Paper
                    style={{width: this.props.value * 20 + '%', backgroundColor: this.dark(), height: 20, float: 'left', position: 'absolute', zIndex: 10}}
                    zDepth={2}/>
                <MaterialUi.Paper
                    style={{width: '100%', backgroundColor: this.light(), height: 20, float: 'left', position: 'absolute'}}/>
            </div>
        </div>
    }
});

var ReviewSlider = React.createClass({

    getInitialState: function () {
        return {value: this.props.defaultValue || 0, formValue: ''}
    },
    min: 0,
    max: 5,

    componentWillReceiveProps: function (newProps) {
        this.setState({value: newProps.defaultValue || 0});
    },

    dark: function () {
        if (this.props.color == 'yellow') {
            return '#ffea00';
        }
        return this.props.color;
    },

    light: function () {
        switch (this.props.color) {
            case('red'):
                return '#ef9a9a';
            case('blue'):
                return '#90caf9';
            case('black'):
                return '#757575';
            case('green'):
                return '#a5d6a7';
            case('yellow'):
                return '#fff9c4'
        }
    },

    increase: function () {
        console.log('increase')
        if (this.state.value < this.max) {
            this.setValue(this.state.value + 1);
        }
    },
    decrease: function () {
        if (this.state.value > this.min) {
            this.setValue(this.state.value - 1);
        }
    },
    typed: function (event) {
        let value = event.target.value;
        if (value < this.min) {
            value = this.min;
        } else if (value > this.max) {
            value = this.max;
        }
        this.setValue(parseInt(value));
        this.setState({formValue: ''});

    },
    setValue: function (value) {
        this.setState({value: value});
        this.props.onChange(value);

    },

    render: function () {
        return <div style={{padding: 15}}>
            <div className="row">
                <div className="col-md-9">
                    <MaterialUi.Paper
                        style={{width: this.state.value * 20 + '%', backgroundColor: this.dark(), height: 20, float: 'left', position: 'absolute', zIndex: 10}}
                        zDepth={2}/>
                    <MaterialUi.Paper
                        style={{width: '100%', backgroundColor: this.light(), height: 20, float: 'left', position: 'absolute'}}/>
                </div>
                <div className="col-md-2">
                    <MaterialUi.FlatButton onClick={this.increase}
                                           style={{fontSize: 'large', fontWeight: 'bolder'}}>
                        <span>+</span>
                    </MaterialUi.FlatButton>
                    <MaterialUi.FlatButton onClick={this.decrease}
                                           style={{fontSize: 'large', fontWeight: 'bolder'}}>
                        <span>-</span>
                    </MaterialUi.FlatButton>

                </div>
                <div className="col-md-1">
                    <MaterialUi.TextField hintText={this.state.value.toString()}
                                          hintStyle={{color: 'black'}}
                                          value={this.state.formValue}
                                          onChange={this.typed}
                                          fullWidth={true}/>
                </div>
            </div>
        </div>
    }
});