import React from 'react';
import ReactDOM from 'react-dom';
import {Nav} from './components/nav.jsx';
import {CheckData} from './components/checkData.jsx';
import {ConvSimple} from './components/convSimple.jsx';

class App extends React.Component {
    render(){
        return (
            <div>
                <Nav/>
                <CheckData/>
                <ConvSimple/>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});