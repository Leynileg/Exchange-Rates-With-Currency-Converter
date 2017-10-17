import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Colors from 'material-ui/styles/colors';


export class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        barColor: '',
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClick = () =>  this.setState({open: false});

  scrollFunc = () => {
    window.onscroll = ( () => {
        (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) ? 
        this.setState({barColor: 'rgb(37, 152, 165)'}) : this.setState({barColor: 'transparent'});  
    });
  }
  
  componentDidMount(){
    this.scrollFunc();
  }

  render() {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center' ,
        alignItems: 'center',
        margin: '16px 32px 16px 0'
    }
    const titles = {
        marginTop: '60px',
        fontSize: '34px'
    }
    return (

        <AppBar
        style={{
        position: 'fixed',
        textAlign: 'center',
        background: this.state.barColor,
        }}
        title="Exchange Rates With Currency Converters"
        iconElementLeft={<IconButton><NavigationMenu onClick={this.handleToggle}/></IconButton>}
        >   
            <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            >
                <Menu style={style}>
                    <MenuItem style={titles}>SECTIONS</MenuItem>
                    <Divider/>
                    <a href='#checkData'><MenuItem onClick={this.handleClick}>Check Currency</MenuItem></a>
                    <a href='#convSimple'><MenuItem onClick={this.handleClick}>Simple Converter</MenuItem></a>
                    <a href='#convMulti'><MenuItem onClick={this.handleClick}>Multi Converter</MenuItem></a>
                    <MenuItem style={titles}>AUTHOR</MenuItem>
                    <Divider/>
                </Menu>
            </Drawer>
        </AppBar>
    );
  }
}