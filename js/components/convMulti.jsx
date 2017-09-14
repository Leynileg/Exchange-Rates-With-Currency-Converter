import React from 'react';
import ReactDOM from 'react-dom';

class ConvMulti extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            firstVal: '',
            secondVal: 'BGN',
            thirdVal: 'BGN',
            fourthVal: 'BGN',
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

    PlusFunction = (e) => {
        let list = document.querySelectorAll(".hidden");
        let plus = document.querySelector(".icon-plus-circled");
        list.length == 0 ? e.preventDefault() : list[0].classList.remove("hidden");
    }

    MinusFunction = (e) => {
        let list = document.querySelectorAll(".hidden");
        let minus = document.querySelectorAll(".icon-minus-circled");
        let element = e.target.parentElement.parentElement;
        element.querySelector("input").value = '';
        element.querySelector('select').value = "BGN";
        this.getResult();
        element.className += element.className ? ' hidden' : 'hidden';
    }

    FirstSelect=(e)=>{
        this.setState({firstVal: e.target.value});
    }
    
    SecondSelect = (e) => {
        this.setState({secondVal: e.target.value});
    }

    ThirdSelect = (e) => {
        this.setState({thirdVal: e.target.value});
    }

    FourthSelect = (e) => {
        this.setState({fourthVal: e.target.value});
    }

    FifthSelect = (e) => {
        this.setState({fifthVal: e.target.value});
    }

    ConvertorSelect = (e) => {
        this.setState({convertVal: e.target.value});
        this.setState({resultNumber: ''});
        this.getData();
    }
    
    getResult = () => {
        let firstNumConverter = (1 / (this.state.values[this.state.firstVal])).toFixed(4);
        let secondNumConverter = (1 / (this.state.values[this.state.secondVal])).toFixed(4);
        let thirdNumConverter = (1 / (this.state.values[this.state.thirdVal])).toFixed(4);
        let fourthNumConverter = (1 / (this.state.values[this.state.fourthVal])).toFixed(4);
        let fifthNumConverter = (1 / (this.state.values[this.state.fifthVal])).toFixed(4);
        let converter = (1 / (this.state.values[this.state.convertVal])).toFixed(4);

        let firstNum = document.querySelectorAll('.multiInput')[0].value;
        let secondNum = document.querySelectorAll('.multiInput')[1].value;
        let thirdNum = document.querySelectorAll('.multiInput')[2].value;
        let fourthNum = document.querySelectorAll('.multiInput')[3].value;
        let fifthNum = document.querySelectorAll('.multiInput')[4].value;

        let resultNum = +(((firstNum * firstNumConverter) / converter).toFixed(4)) + 
                     +(((secondNum * secondNumConverter) / converter).toFixed(4)) + 
                     +(((thirdNum * thirdNumConverter) / converter).toFixed(4)) + 
                     +(((fourthNum * fourthNumConverter) / converter).toFixed(4)) +
                     +(((fifthNum* fifthNumConverter) / converter).toFixed(4));

        this.setState({resultNumber: resultNum})
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
                        <input type="number" className="multiInput" placeholder="0" onChange={this.FirstNumber}/>
                        <select className="firstSelect" defaultValue="default" onChange={this.FirstSelect}>
                            <option value="default" disabled>Choose Currency</option>
                            {options}
                        </select>
                        <i className="icon-plus-circled" onClick={this.PlusFunction}></i>
                    </div>
                </div>
                <div className="row  hidden">
                    <div className="col-12-12">
                        <input type="number" className="multiInput" placeholder="0" onChange={this.SecondNumber}/>
                        <select className="secondSelect"  onChange={this.SecondSelect}>
                            {options}
                        </select>
                        <i className="icon-minus-circled" onClick={this.MinusFunction}></i>
                    </div>
                </div>
                <div className="row hidden">
                    <div className="col-12-12">
                        <input type="number" className="multiInput" placeholder="0" onChange={this.ThirdNumber}/>
                        <select className="thirdSelect" onChange={this.ThirdSelect}>   
                            {options}
                        </select>
                        <i className="icon-minus-circled" onClick={this.MinusFunction}></i>
                    </div>
                </div>
                <div className="row hidden">
                    <div className="col-12-12">
                        <input type="number" className="multiInput" placeholder="0" onChange={this.FourthNumber}/>
                        <select className="fourthSelec"  onChange={this.FourthSelect}>
                            {options}
                        </select>
                        <i className="icon-minus-circled" onClick={this.MinusFunction}></i>
                    </div>
                </div>
                <div className="row hidden">
                    <div className="col-12-12">
                        <input type="number" className="multiInput" placeholder="0"  onChange={this.FifthNumber}/>
                        <select className="fifthSelect" onChange={this.FifthSelect}>
                            {options}
                        </select>
                        <i className="icon-minus-circled" onClick={this.MinusFunction}></i>
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