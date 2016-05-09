var StaticSlider = React.createClass({

    dark: function () {
        if (this.props.color == 'white') {
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
            case('white'):
                return '#fff9c4'
        }
    },


    render: function () {
        return <div style={{padding: 15*this.props.size}}>
            <div className="row" style={{position: 'relative'}}>
                <MaterialUi.Paper
                    className="color-bar fill"
                    style={{borderRadius: 10*this.props.size, width: this.props.value * 20 + '%', backgroundColor: this.dark(), height: 20*this.props.size, textAlign:'center'}}
                    zDepth={2}>
                    <MaterialUi.IconButton tooltip={this.props.color + " : " + this.props.value} style={{width: '100%',height: 20*this.props.size}} tooltipPosition="top-center"/>
                </MaterialUi.Paper>
                <MaterialUi.Paper
                    className="color-bar"
                    style={{borderRadius: 10*this.props.size, width: '100%', backgroundColor: this.light(), height: 20*this.props.size}}>
                    </MaterialUi.Paper>
            </div>
        </div>
    }
});
