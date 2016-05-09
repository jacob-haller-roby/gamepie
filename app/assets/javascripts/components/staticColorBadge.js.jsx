var StaticColorBadge = React.createClass({


    size: function () {
        switch (this.props.size) {
            case(VIEW_CONSTANTS.SIZE.M):
                return 0.8;
            case(VIEW_CONSTANTS.SIZE.S):
                return 0.5;
            default:
                return 1;
        }
    },

    render: function () {

        if (this.props.community) {
            review = this.props.game
        } else {
            console.log('rerender?')
            review = this.props.game.myReview
            console.log(review)
        }


        if (review) {
            return <div style={{padding: 10*this.size()}}>
                <MaterialUi.Paper style={{padding: 30*this.size(), paddingTop: 10*this.size(), backgroundColor: '#eeeeee'}}>

                <StaticSlider color="black" value={review.black} size={this.size()}/>
                <StaticSlider color="red" value={review.red} size={this.size()}/>
                <StaticSlider color="green" value={review.green} size={this.size()}/>
                <StaticSlider color="blue" value={review.blue} size={this.size()}/>
                <StaticSlider color="white" value={review.white} size={this.size()}/>

            </MaterialUi.Paper>
                </div>
        }

        return <MaterialUi.Paper style={{padding: 50, backgroundColor: '#eeeeee'}}/>


    }
});