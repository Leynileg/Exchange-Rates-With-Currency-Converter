import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Nav} from './components/nav.jsx';
import {CheckData} from './components/checkData.jsx';
import {ConvSimple} from './components/convSimple.jsx';
import {ConvMulti} from './components/convMulti.jsx';
import {Footer} from './components/Footer.jsx';


class App extends React.Component {
    render(){
        return (
            <div>
                <MuiThemeProvider><Nav/></MuiThemeProvider>
                <CheckData/>
                <ConvSimple/>
                <ConvMulti/>
                <Footer/>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('wrapper')
    );
});