import React from 'react';
import ReactDOM from 'react-dom';

class ConvMulti extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            firstNum: 0,
            firstVal: '',
            secondNum: 0,
            secondVal: 'BGN',
            thirdNum: 0,
            thirdVal: 'BGN',
            fourthNum: 0,
            fourthVal: 'BGN',
            fifthNum: 0,
            fifthVal: 'BGN',
            convertVal: 'AUD',
            resultNumber: 0
        }
    }
    
    getData() {
        fetch(`https://api.fixer.io/latest?base=${this.state.convertVal}`)
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
    
    FirstSelect=(e)=>{
        this.setState({firstVal: e.target.value});
        this.setState({resultNumber: ''});
    }

    FirstNumber = (e) => {
        this.setState({firstNum: e.target.value});
    }
    
    SecondSelect = (e) => {
        this.setState({secondVal: e.target.value});
        this.setState({resultNumber: ''});
    }

    SecondNumber = (e) => {
        this.setState({secondNum: e.target.value});
    }

    ThirdSelect = (e) => {
        this.setState({thirdVal: e.target.value});
        this.setState({resultNumber: ''});
    }

    ThirdNumber = (e) => {
        this.setState({thirdNum: e.target.value});
    }

    FourthSelect = (e) => {
        this.setState({fourthVal: e.target.value});
        this.setState({resultNumber: ''});
    }

    FourthNumber = (e) => {
        this.setState({fourthNum: e.target.value});
    }

    FifthSelect = (e) => {
        this.setState({fifthVal: e.target.value});
        this.setState({resultNumber: ''});
    }

    FifthNumber = (e) => {
        this.setState({fifthNum: e.target.value});
    }

    ConvertorSelect = (e) => {
        this.setState({convertVal: e.target.value})
        this.getData();
    }
    
    getResult = () => {
    
        let firstNumConverter = (1 / (this.state.values[this.state.firstVal])).toFixed(4);
        let secondNumConverter = (1 / (this.state.values[this.state.secondVal])).toFixed(4);
        let thirdNumConverter = (1 / (this.state.values[this.state.thirdVal])).toFixed(4);
        let fourthNumConverter = (1 / (this.state.values[this.state.fourthVal])).toFixed(4);
        let fifthNumConverter = (1 / (this.state.values[this.state.fifthVal])).toFixed(4);
        let converter = (1 / (this.state.values[this.state.convertVal])).toFixed(4);

        let result = +(((this.state.firstNum * firstNumConverter) / converter).toFixed(4)) + 
                     +(((this.state.secondNum * secondNumConverter) / converter).toFixed(4)) + 
                     +(((this.state.thirdNum * thirdNumConverter) / converter).toFixed(4)) + 
                     +(((this.state.fourthNum * fourthNumConverter) / converter).toFixed(4)) +
                     +(((this.state.fifthNum * fifthNumConverter) / converter).toFixed(4));

        this.setState({resultNumber: result})
    }
        
    componentDidMount(){
        this.getData();
    }

    render(){
        let options=this.state.names.map((el)=>{
            return <option key={el} value={el}>{el}</option>
        })
        
        let result = this.state.resultNumber + ' ' + this.state.convertVal;
        
        return (
            <section id="conv_multi">
                <div className="row">
                    <div className="col-12-12">
                        <h2>MULTI CURRENCY CONVERTER</h2>
                    </div>
                </div>
                <div className="row">
                <div className="col-12-12">
                    <input type="number" className="firstNumber" placeholder="0" onChange={this.FirstNumber}/>
                    <select className="firstSelect" defaultValue="default" onChange={this.FirstSelect}>
                        <option value="default" disabled>Choose Currency</option>
                        {options}
                    </select>
                    <i className="icon-plus-circled"></i>
                </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="secondNumber" placeholder="0" onChange={this.SecondNumber}/>
                <select className="secondSelect"  onChange={this.SecondSelect}>
                    {options}
                </select>
                <i className="icon-minus-circled"></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="thirdNumber" placeholder="0"/>
                <select className="thirdSelect" onChange={this.ThirdtSelect}>   
                    {options}
                </select>
                <i className="icon-minus-circled"></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="fourthNumber" placeholder="0"/>
                <select className="fourthSelec"  onChange={this.FourthSelect}>
                    {options}
                </select>
                <i className="icon-minus-circled"></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <input type="number" className="fifthNumber" placeholder="0"/>
                <select className="fifthSelect" onChange={this.FifthSelect}>
                    {options}
                </select>
                <i className="icon-minus-circled"></i>
            </div>
        </div>
        <div className="row">
            <div className="col-12-12">
                <select className="convertToSelect" defaultValue="default" onChange={this.ConvertorSelect}>
                    <option value="default" disabled>CONVERT TO</option>
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
        );
    }
}

export {ConvMulti};