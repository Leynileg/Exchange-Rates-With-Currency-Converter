import React from 'react';
import ReactDOM from 'react-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Options extends React.Component {
    
    render() {
        let options = this.props.names.map( (el) => { 
            return <MenuItem value={el} key={el} label={`${el}`} primaryText={`${el}`}/> 
        })

        const styles = {
            customWidth: {
                width: 260,
                background: 'whitesmoke',
                color: 'black',
                textAlign: 'center',
                fontSize: '30px'
            },
            listStyle: {
                width: 200,
                fontSize: '25px',
                background: 'whitesmoke',
                textAlign: 'center',
            }
          };

        return (
            <DropDownMenu style={styles.customWidth} listStyle={styles.listStyle} maxHeight={300} value={this.props.val} onChange={this.props.onChangeFunc}>
                {options}
            </DropDownMenu>
        );
      }
}

export class CheckData extends React.Component{
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            boxesVal: ['USD','EUR','NOK','GBP','RUB','CZK'],
            checked: 'AUD',
            checkedValue: ''
        }
    }
    
    getData(){
        fetch('https://api.fixer.io/latest?base=PLN')
        .then( response => {
            if (response.ok) {
                return response.json();
            } else {throw new Error('Błąd sieci!')};
        })
        .then( obj => {            
            this.setState({ values: obj.rates, names: Object.keys(obj.rates) });
            this.setState({ checkedValue: (1 / this.state.values[this.state.checked]).toFixed(4) })
        });
    }
    
    handleChange = (e,index,value) => {
        this.setState({ checked: value });
        this.setState({ checkedValue: (1 / this.state.values[value]).toFixed(4) });
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        let options = this.state.names.map( (el) => { return <option key={el} value={el}>{el}</option> });

        let littleBoxes = this.state.boxesVal.map( (el) => {
            return (
                <div className="col-2-12" key={el}>
                    <div className="littleBoxes">{el} : { (1 / this.state.values[el]).toFixed(4) }</div>
                </div>
            ) 
        });
 
        return (
            <section id="checkData">
                <div className="row boxes" >
                    <div className="col-12-12">
                        {littleBoxes}
                    </div>
                </div>
                <div className="row title">
                    <div className="col-12-12"><h1>CHECK CURRENCY</h1></div>   
                </div>
                <div className="row currency">
                    <div className="col-12-12">
                        <MuiThemeProvider>
                            <Options names={this.state.names} val={this.state.checked} onChangeFunc={this.handleChange}/>
                        </MuiThemeProvider>
                        <div className="dataContainer">
                            {this.state.checked}: {this.state.checkedValue}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}