import React from 'react';
import ReactDOM from 'react-dom';

class CheckData extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            checked: '',
            checkedValue: ''
        }
    }
    
    getData() {
        fetch('http://api.fixer.io/latest?base=PLN')
        .then( response => {
            if (response.ok) {
                return response.json();
            } else {throw new Error('Błąd sieci!')};
        })
        .then( obj => {            
            this.setState({values: obj.rates})
            this.setState({names: Object.keys(obj.rates)});
        });
    }
    
    handleChange=(e)=>{
        this.setState({checked: e.target.value}); 
        this.setState({checkedValue: this.state.values[this.state.checked]});
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
        
        let checkedd = (1 / this.state.checked).toFixed(4);
        
        
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
                    <h1>CHECK SELECTED CURRENCY</h1>
                  </div>
                  <div className="row">
                     <div className="col-4-12">
                    <select className="selectData" onChange={this.handleChange}>
                        {options}
                    </select>
                 </div>
                 <div className="col-2-12">
                     <div className="littleBoxes">{this.checkedValue}</div>
                 </div>
                 <div className="col-6-12">
                      <div className="dataContainer"></div>
                 </div>
              </div>
          </section>
        </div>
        );
    }
}

export {CheckData};