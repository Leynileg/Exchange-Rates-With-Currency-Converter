import React from 'react';
import ReactDOM from 'react-dom';

class ConvMulti extends React.Component {
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
            <section id="conv_multi">
                <div className="row">
                    <div className="col-12-12">
                        <h2>MULTI CURRENCY CONVERTER</h2>
                    </div>
                </div>
                <div className="row">
                <div className="col-12-12">
                    <input type="number" className="defaultPutNumber" placeholder="0"/>
                    <select className="multiCalcSelect" defaultValue="default">
                        <option value="default" disabled>Choose Currency</option>
                        {options}
                    </select>
                    <i className="icon-plus-circled" onclick=""></i>
                </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="addedInput" placeholder="0"/>
                <select className="multiCalcSelect" defaultValue="default">
                    <option value="default" disabled>Choose Currency</option>
                    {options}
                </select>
                <i className="icon-minus-circled" onclick=""></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="addedInput" placeholder="0"/>
                <select className="multiCalcSelect" defaultValue="default">
                    <option value="default" disabled>Choose Currency</option>
                    {options}
                </select>
                <i className="icon-minus-circled" onclick=""></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="addedInput" placeholder="0"/>
                <select className="multiCalcSelect" defaultValue="default">
                    <option value="default" disabled>Choose Currency</option>
                    {options}
                </select>
                <i className="icon-minus-circled" onclick=""></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="addedInput" placeholder="0"/>
                <select className="multiCalcSelect" defaultValue="default">
                    <option value="default" disabled>Choose Currency</option>
                    {options}
                </select>
                <i className="icon-minus-circled" onclick=""></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <select className="convertToSelect" defaultValue="default">
                <option value="default" disabled>CONVERT TO</option>
                    {options}
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <i className="icon-down-circled" onclick=""></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <div className="calcResult">
                    <p><span className="result">STILL...</span><span className="primVal">IN PROGRESS!</span></p>
                </div>
            </div>
        </div>   
        </section>
        );
    }
}

export {ConvMulti};