import React from 'react';
import ReactDOM from 'react-dom';

class CheckData extends React.Component{
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
    
    handleChange = (e) => {
        this.setState({ checked: e.target.value, checkedValue: (1 / this.state.values[e.target.value]).toFixed(4) });
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
                <div className="row">{littleBoxes}</div>
                <div className="row"><h1>CHECK CURRENCY</h1></div>
                <div className="row">
                    <div className="col-2-12"/>
                    <div className="col-2-12">
                        <select className="selectData" onChange={this.handleChange}>{options}</select>
                    </div>
                    <div className="col-8-12">
                        <div className="dataContainer">{this.state.checked}: {this.state.checkedValue}</div>
                    </div>
                </div>
            </section>
        );
    }
}
export {CheckData};