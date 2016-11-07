import React from 'react';
import { render } from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider ,connect} from 'react-redux';

import { myApp } from './reducer.jsx'
import { changeText, buttonClick } from './action.jsx'

// require('../app/css/main.sass')
// require('../../css/main.sass')
//store
let store = createStore(myApp);

class Hello extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.actions.changeText();
    }
    render() {
        return (
            <h1 onClick={this.handleClick}> {this.props.text} </h1>
        );
    }
}

class Change extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.actions.buttonClick();
    }
    render() {
        return (
            <button onClick={this.handleClick} >change</button>
        );
    }
}

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const { actions, text} = this.props;
        return (
            <div>
                <Hello actions={actions} text={text}/>
                <Change actions={actions}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return { text: state.text }
}

function mapDispatchToProps(dispatch){
    return{
        actions : 
            bindActionCreators({
                changeText: changeText,
                buttonClick: buttonClick
            },dispatch)
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('wrap')
)

