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
                        className="color-bar fill"
                        style={{borderRadius: 10*this.props.size, width: this.state.value * 20 + '%', backgroundColor: this.dark(), height: 20*this.props.size}}
                        zDepth={2}/>
                    <MaterialUi.Paper
                        className="color-bar"
                        style={{borderRadius: 10*this.props.size, width: '100%', backgroundColor: this.light(), height: 20*this.props.size}}/>
                </div>
                <div className="col-md-2">
                    <MaterialUi.FlatButton onClick={this.increase}
                                           style={{fontSize: 'large', fontWeight: 'bolder'}} tabIndex={-1}>
                        <span>+</span>
                    </MaterialUi.FlatButton>
                    <MaterialUi.FlatButton onClick={this.decrease}
                                           style={{fontSize: 'large', fontWeight: 'bolder'}} tabIndex={-1}>
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