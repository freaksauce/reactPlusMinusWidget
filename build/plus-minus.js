var _self = this;
function callbackFunc(val) {
	console.log('callbackFunc '+val);
}

var PlusMinusWidget = React.createClass({displayName: "PlusMinusWidget",
	getInitialState: function() {
		return {
			valuesArr: this.props.values.split(","),
			counter: 0
		}
	},
	componentDidMount: function() {
		callbackFunc('init'); // test callback on mount
		this.setState({cb: this.props.callback});
		this.setState({output: this.state.valuesArr[0]});
		this.setState({valuesArrLen: this.state.valuesArr.length});
	},
	increment: function() {
		console.log('increment');
		if (this.state.output < this.state.valuesArrLen) {			
			this.state.counter++;
			this.setState({output: this.state.valuesArr[this.state.counter]});
			this.notifyCallback(this.state.valuesArr[this.state.counter]);
		}
	},
	decrement: function() {
		if (this.state.counter > 0) {			
			this.state.counter--;
			this.setState({output: this.state.valuesArr[this.state.counter]});
			this.notifyCallback(this.state.valuesArr[this.state.counter]);
		}
	},
	notifyCallback: function(val) {
		_self[this.state.cb]('Output '+val); // pass output to callback
	},
  render: function() {
    return (
      React.createElement("div", {className: "plusMinusWidget"}, 
      	React.createElement("a", {href: "#", className: "btn minus", onClick: this.decrement}, "-"), " ", React.createElement("input", {name: "output", value: this.state.output, readonly: true}), " ", React.createElement("a", {href: "#", className: "btn plus", onClick: this.increment}, "+")
      )
    );
  }
});

React.render(
  React.createElement(PlusMinusWidget, {values: "1,2,3,4,4+", callback: "callbackFunc"}),
  document.getElementById('plusMinus')
);