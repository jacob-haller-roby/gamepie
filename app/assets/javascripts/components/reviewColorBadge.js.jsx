var ReviewColorBadge = React.createClass({
    getInitialState: function () {
        myReview = this.props.myReview;
        return {
            red: myReview.red || 0,
            black: myReview.black || 0,
            white: myReview.white || 0,
            blue: myReview.blue || 0,
            green: myReview.green || 0
        }
    },
    componentWillReceiveProps: function (newProps) {

        this.setState({
            red: newProps.myReview.red || 0,
            black: newProps.myReview.black || 0,
            white: newProps.myReview.white || 0,
            blue: newProps.myReview.blue || 0,
            green: newProps.myReview.green || 0
        });

    },

    resetState: function (newProps) {
        myReview = newProps.myReview;

    },
    handleChange: function (color, value) {
        obj = {};
        obj[color] = value;
        var newState = Object.assign({}, this.state, obj);
        this.setState(newState);
    },
    save: function () {
        ActionCreator.createReview({

            game_id: this.props.game.id,
            black: this.state.black,
            red: this.state.red,
            blue: this.state.blue,
            green: this.state.green,
            white: this.state.white

        });
        this.props.close();
    },
    update: function () {

        review = {
            id: this.props.myReview.id,
            game_id: this.props.game.id,
            black: this.state.black,
            red: this.state.red,
            blue: this.state.blue,
            green: this.state.green,
            white: this.state.white
        }
        console.log('updating: ');
        console.log(review)
        ActionCreator.updateReview(
            review
        );
        this.props.close();
    },
    action: function () {
        if (this.props.myReview.id) {
            return <MaterialUi.RaisedButton label="Update" onClick={this.update}/>
        }
        return <MaterialUi.RaisedButton label="Save" onClick={this.save}/>;
    },
    size: function () {
        switch (this.props.size) {
            case(VIEW_CONSTANTS.SIZE.M):
                return 0.8;
            case(VIEW_CONSTANTS.SIZE.S):
                return 0.5;
            default:
                return 1.5;
        }
    },
    render: function () {
        return <MaterialUi.Dialog
            title="Submit a Review"
            actions={[<MaterialUi.RaisedButton label="Close" onClick={this.props.close}/>, this.action()]}
            open={this.props.open}
            onRequestClose={this.props.close}
            modal={false}
            autoScrollBodyContent={true}
            >
            <MaterialUi.Paper style={{padding: 50, backgroundColor: '#eeeeee'}}>

                <ReviewSlider color="black" defaultValue={this.state.black}
                              onChange={this.handleChange.bind(this, 'black')}
                              size={this.size()}/>
                <ReviewSlider color="red" defaultValue={this.state.red}
                              onChange={this.handleChange.bind(this, 'red')}
                              size={this.size()}/>
                <ReviewSlider color="green" defaultValue={this.state.green}
                              onChange={this.handleChange.bind(this, 'green')}
                              size={this.size()}/>
                <ReviewSlider color="blue" defaultValue={this.state.blue}
                              onChange={this.handleChange.bind(this, 'blue')}
                              size={this.size()}/>
                <ReviewSlider color="white" defaultValue={this.state.white}
                              onChange={this.handleChange.bind(this, 'white')}
                              size={this.size()}/>
            </MaterialUi.Paper>
        </MaterialUi.Dialog>
    }
});