import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';

class Github extends React.Component {

    render(){
        return <i style={this.props.iconStyle} className="icon-github-circled"/>
    }
}

class LinkedIn extends React.Component {

    render(){
        return <i style={this.props.iconStyle} className="icon-linkedin"/>
    }
}

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
        const author = {
            fontSize: '25px',
            marginTop: '60px',
        }
        const iconStyle = {
            fontSize: '24px'
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
                        <a href='#checkData'>
                            <MenuItem onClick={this.handleClick}>Check Currency</MenuItem>
                        </a>
                        <a href='#convSimple'>
                            <MenuItem onClick={this.handleClick}>Simple Converter</MenuItem>
                        </a>
                        <a href='#convMulti'>
                            <MenuItem onClick={this.handleClick}>Multi Converter</MenuItem>
                        </a>
                        <MenuItem style={author}>AUTHOR</MenuItem>
                        <Divider/>
                        <a href='https://github.com/Leynileg/Exchange-Rates-With-Currency-Converters'>
                            <MenuItem>Github <Github iconStyle={iconStyle}/></MenuItem>
                        </a>
                        <a href='https://www.linkedin.com/in/paweltur/'>
                            <MenuItem>LinkedIn <LinkedIn iconStyle={iconStyle}/></MenuItem>
                        </a>
                        <MenuItem>paweltur123@gmail.com</MenuItem>
                    </Menu>
                </Drawer>
            </AppBar>
        );
      }
    }