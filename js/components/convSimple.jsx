import React from 'react';
import ReactDOM from 'react-dom';

class ConvSimple extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            firstNumber: '',
            firstVal: '',
            secondVal: '',
            resultNumber: ''
            
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
    
    numberChange=(e)=>{
        this.setState({firstNumber: e.target.value + ' '})
    }
    
    FirstSelect=(e)=>{
        this.setState({firstVal: e.target.value + ' '})
    }
    
    SecondSelect = (e) => {
        this.setState({secondVal: e.target.value + ' '})
    }
    
    exchangeValues = (e) => {
        this.setState({firstVal: this.state.secondVal})
        this.setState({secondVal: this.state.firstVal})
    }
    
    getResult = (e) => {
        let first = this.statefirstVal;
        let second = this.state.values[this.state.secondVal];
        this.setState({resultNumber: eval(first*second)+' '})
    }
    
    
    componentDidMount(){
        this.getData();
    }
    
    render(){
        
        let first = this.statefirstVal;
        let second = this.state.values[this.state.secondVal];
        console.log(second)
        
        let options=this.state.names.map((el)=>{
            return <option key={el} value={el}>{el}</option>
        })
        
        return (
            <div>
                <section id="conv_simple">
                 <div className='row'>
                     <div className="col-12-12">
                      <h2>SIMPLE CONVERTER</h2>
                  </div>
                 </div>
                 <div className="row">
                     <div className="col-12-12">
                         <input type="number" className="simpleCalcPutNumber" placeholder="0"  onChange={this.numberChange}/>
                     </div>
                 </div>
                 <div className="row">
                     <div className="col-12-12">
                         <select className="simpleCalcSelectFirst" onChange={this.FirstSelect}>
                            {options}
                        </select>
                     </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                         <i className="icon-exchange" onClick={this.exchangeValues}></i>
                     </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                         <select className="simpleCalcSelectSecond" onChange={this.SecondSelect}>
                            {options}
                        </select>
                     </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                         <i className="icon-down-circled" onClick={this.getResult}></i>
                     </div>
                </div>
                 <div className="row">
                     <div className="col-12-12">
                         <div className="calcResult">
                             <p>{this.state.firstNumber} {this.state.firstVal} = {this.state.resultNumber} {this.state.secondVal}</p>
                         </div>
                     </div>
                 </div> 
              </section>
            </div>
        );
    }
}

export {ConvSimple};