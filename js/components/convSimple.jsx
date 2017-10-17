import React from 'react';
import ReactDOM from 'react-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class ConvSimple extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            firstVal: 'AUD',
            secondVal: '',
            result: '',
            resultDisplay: 'none'
        }
    }
    
    getData() {
        fetch(`https://api.fixer.io/latest?base=${this.state.firstVal}`)
        .then( response => {
            if (response.ok) {
                return response.json();
            } else {throw new Error('Błąd sieci!')};
        })
        .then( obj => { 
            this.setState({ values: obj.rates, names: Object.keys(obj.rates) })
        });
    }
    
    FirstSelect = (e) => {
        this.setState({firstVal: e.target.value});
        this.getData();
    }

    SecondSelect = (e) => { this.setState({secondVal: e.target.value}) }
    
    exchangeValues = () => {
        document.querySelectorAll(".simpleSelect")[0].value = this.state.secondVal;
        document.querySelectorAll(".simpleSelect")[1].value = this.state.firstVal;
        this.setState({ 
            firstVal: document.querySelectorAll(".simpleSelect")[0].value, 
            secondVal: document.querySelectorAll(".simpleSelect")[1].value,
            result: ''
        });
    }
    
    getResult = (e) => {
        let number = document.querySelector('.simpleInput').value;
        if ((document.querySelectorAll(".simpleSelect")[0].value == 'default') || (document.querySelectorAll(".simpleSelect")[1].value == 'default') || (number == '') ) e.preventDefault();
        else {
            document.querySelectorAll('.calcResult')[0].classList.remove('hidden');
            let firstNumConverter = (1 / (this.state.values[this.state.firstVal])).toFixed(4);
            let secondNumConverter = (1 / (this.state.values[this.state.secondVal])).toFixed(4);
            
            let all = number + ' ' + document.querySelectorAll('.simpleSelect')[0].value + ' = ' + ((number * firstNumConverter) / secondNumConverter).toFixed(4) + ' ' + document.querySelectorAll('.simpleSelect')[1].value;
            this.setState({result: all, resultDisplay: 'block'});
        }
    }
        
    componentDidMount(){
        this.getData();
    }

    render(){
        let options = this.state.names.map( (el) => { 
            return <option key={el} value={el}>{el}</option>
            
        })

        return (
            <section id="convSimple">
                <div className='row'>
                    <div className="col-12-12">
                        <h2>SIMPLE CURRENCY CONVERTER</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                        <form>
                            <input type="number" className="simpleInput" placeholder="0" required/>
                            <select className="simpleSelect" defaultValue="default" onChange={this.FirstSelect} required>
                                <option value="default" disabled>Choose First Currency</option>
                                {options}
                            </select>
                            <i className="icon-exchange" onClick={this.exchangeValues}/>
                            <select className="simpleSelect" defaultValue="default" onChange={this.SecondSelect} required>
                                <option value="default" disabled>Choose Second Currency</option>
                                {options}
                            </select>
                            <i className="icon-down-circled" onClick={this.getResult}/>
                            <div className="calcResult" style={{display: this.state.resultDisplay}}><p>{this.state.result}</p></div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}