import React from 'react';
import ReactDOM from 'react-dom';

class ConvSimple extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            firstNumber: 0,
            firstVal: 'AUD',
            secondVal: 'AUD',
            resultNumber: ''
            
        }
    }
    
    getData() {
        fetch(`http://api.fixer.io/latest?base=${this.state.firstVal}`)
        .then( response => {
            if (response.ok) {
                return response.json();
            } else {throw new Error('Błąd sieci!')};
        })
        .then( obj => {            
            
            this.setState({values: obj.rates})
            this.setState({names: Object.keys(obj.rates)});
            console.log("VALUES: ", this.state.values)
        });
    }
    
    numberChange=(e)=>{
        this.setState({firstNumber: e.target.value})
    }
    
    FirstSelect=(e)=>{
        this.setState({firstVal: e.target.value});
        this.setState({resultNumber: ''});
    }
    
    SecondSelect = (e) => {
        this.setState({secondVal: e.target.value});
        this.setState({resultNumber: ''});
    }
    
    exchangeValues = (e) => {
        this.setState({firstVal: this.state.secondVal});
        this.setState({secondVal: this.state.firstVal});
        this.setState({resultNumber: ''});
    }
    
    getResult = () => {
        let firstNumConverter = (1 / (this.state.values[this.state.firstVal])).toFixed(4);
        let secondNumConverter = (1 / (this.state.values[this.state.secondVal])).toFixed(4);
        this.setState({resultNumber: ((this.state.firstNumber * firstNumConverter) / secondNumConverter).toFixed(4)})
    }
    
    
    componentDidMount(){
        this.getData();
    }

    
    
    render(){
        
        let options=this.state.names.map((el)=>{
            return <option key={el} value={el}>{el}</option>
        })
        
        let result = this.state.firstNumber+' '+
            this.state.firstVal+' '+"="+' '+
            this.state.resultNumber+' '+
            this.state.secondVal;
        
        return (
            <div>
                <section id="conv_simple">
                 <div className='row'>
                     <div className="col-12-12">
                      <h2>SIMPLE CURRENCY CONVERTER</h2>
                  </div>
                 </div>
                 <div className="row">
                     <div className="col-12-12">
                         <input type="number" className="simpleCalcPutNumber" placeholder="0"  onChange={this.numberChange}/>
                     </div>
                 </div>
                 <div className="row">
                     <div className="col-12-12">
                         <select className="simpleCalcSelectFirst" onClick={this.FirstSelect} onChange={this.FirstSelect}>
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
                         <select className="simpleCalcSelectSecond" onChange={this.SecondSelect} onClick={this.SecondSelect}>
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
                             <p>{result}</p>
                         </div>
                     </div>
                 </div> 
              </section>
            </div>
        );
    }
}

export {ConvSimple};