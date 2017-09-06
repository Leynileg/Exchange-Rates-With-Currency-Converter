import React from 'react';
import ReactDOM from 'react-dom';

class CheckData extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            checked: 'AUD',
            checkedValue: ''
        }
    }
    
    getData() {
        fetch('https://api.fixer.io/latest?base=PLN')
        .then( response => {
            if (response.ok) {
                return response.json();
            } else {throw new Error('Błąd sieci!')};
        })
        .then( obj => {            
            this.setState({values: obj.rates})
            this.setState({names: Object.keys(obj.rates)});
            this.setState({checkedValue: (1 / this.state.values[this.state.checked]).toFixed(4)});
        });
    }
    
    handleChange=(e)=>{
        this.setState({checked: e.target.value});
        this.setState({checkedValue: (1 / this.state.values[this.state.checked]).toFixed(4)});
    }
    componentDidMount(){
        this.getData();
    }
    
    render(){
        
        let usd = (1 / this.state.values.USD).toFixed(4);
        let eur = (1 / this.state.values.EUR).toFixed(4);
        let nok = (1 / this.state.values.NOK).toFixed(4);
        let gbp = (1 / this.state.values.GBP).toFixed(4);
        let rub = (1 / this.state.values.RUB).toFixed(4);
        let czk = (1 / this.state.values.CZK).toFixed(4);
        
        let options=this.state.names.map((el)=>{
            return <option key={el} value={el}>{el}</option>
        })
         
        return (
            <div>
                <section id="checkData">
                  <div className="row">
                      <div className="col-2-12">
                         <div className="littleBoxes">USD: {usd} </div>
                      </div>
                      <div className="col-2-12">
                              <div className="littleBoxes">EUR: {eur}</div>
                      </div>
                      <div className="col-2-12">
                          <div className="littleBoxes">NOK: {nok}</div>
                      </div>
                      <div className="col-2-12">
                          <div className="littleBoxes">GDP: {gbp}</div>
                      </div>
                      <div className="col-2-12">
                          <div className="littleBoxes">RUB: {rub}</div>
                      </div>
                      <div className="col-2-12">
                          <div className="littleBoxes">CZK: {czk}</div>
                      </div>
                 </div>
                  <div className="row">
                    <h1>CHECK CURRENCY</h1>
                  </div>
                  <div className="row">
                     <div className="col-2-12"/>
                     <div className="col-2-12">
                    <select className="selectData" onClick={this.handleChange} onChange={this.handleChange}>
                        {options}
                    </select>
                 </div>
                 <div className="col-8-12">
                      <div className="dataContainer">{this.state.checked}: {this.state.checkedValue}</div>
                 </div>
              </div>
          </section>
        </div>
        );
    }
}

export {CheckData};