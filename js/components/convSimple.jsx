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
            secondVal: '',
            resultNumber: ''
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
            this.setState({values: obj.rates})
            this.setState({names: Object.keys(obj.rates)});
        });
    }
    
    numberChange=(e)=>{
        this.setState({firstNumber: e.target.value})
    }
    
    FirstSelect=(e)=>{
        this.setState({firstVal: e.target.value});
        this.setState({resultNumber: ''});
        this.getData();
    }
    
    SecondSelect = (e) => {
        this.setState({secondVal: e.target.value});
        this.setState({resultNumber: ''});
    }
    
    exchangeValues = (e) => {
        document.querySelector(".simpleCalcSelectFirst").value = this.state.secondVal;
        document.querySelector(".simpleCalcSelectSecond").value = this.state.firstVal;
        this.setState({firstVal: document.querySelector(".simpleCalcSelectFirst").value});
        this.setState({secondVal:  document.querySelector(".simpleCalcSelectSecond").value});
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
                         <select className="simpleCalcSelectFirst" defaultValue="default" onChange={this.FirstSelect}>
                            <option value="default" disabled>Choose First Currency</option>
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
                         <select className="simpleCalcSelectSecond" defaultValue="default" onChange={this.SecondSelect} >
                            <option value="default" disabled>Choose Second Currency</option>
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