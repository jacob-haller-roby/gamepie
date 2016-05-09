var SelectedGame = React.createClass({
    getInitialState: function () {
        return {doReview: false};
    },
    openModal: function () {
        this.setState({doReview: true});
    },
    handleClose: function () {
        this.setState({doReview: false});
    },
    reviewButton: function () {
        if (this.props.myReview.id) {
            return <MaterialUi.RaisedButton label="Update Your Review" onClick={this.openModal}/>
        } else {
            return <MaterialUi.RaisedButton label="Create a New Review" onClick={this.openModal}/>
        }
    },

    render: function () {
        return <MaterialUi.Paper style={{padding: 50}}>
            <div className="container-fluid">
                <div className="col-md-6 col-sm-12 text-center">
                    <MaterialUi.RaisedButton label="Go Back" onClick={this.props.back}  />

                    <p >SELECTED GAME IS: {this.props.game.name}</p>

                    <p>A description of the game is: {this.props.game.description}</p>

                </div>
                <div className="col-md-6 col-sm-12">
                    <MaterialUi.Paper style={{padding: 8}}>
                        <h2>Community Review:</h2>
                    </MaterialUi.Paper>
                    <StaticColorBadge game={this.props.game} size={VIEW_CONSTANTS.SIZE.L} community={true}/>
                    <MaterialUi.Paper style={{padding: 8}} className="container">
                        <h2 className="col-md-8">My Review:</h2> <span className="col-md-4"
                                                                       style={{float: 'right'}}>{this.reviewButton()}</span>
                    </MaterialUi.Paper>
                    <StaticColorBadge game={this.props.game} size={VIEW_CONSTANTS.SIZE.L}/>

                </div>
            </div>
            <ReviewColorBadge game={this.props.game} myReview={this.props.myReview} open={this.state.doReview}
                              close={this.handleClose}/>
        </MaterialUi.Paper>
    }
});