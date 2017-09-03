import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {
    render(){
        return (
            <div>
                <header id="nav">
                    <ul>
                        <li><a href='#checkData'>CURRENCIES</a></li>
                        <li><a href='#conv_simple'>SIMPLE</a></li>
                        <li><a href='#conv_multi'>MULTI</a></li>
                    </ul>
                </header>
            </div>
        );
    }
}

export {Nav};