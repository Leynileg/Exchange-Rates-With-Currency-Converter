import React from 'react';
import ReactDOM from 'react-dom';

class ConvMulti extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            convertVal: 'AUD',
            resultNumber: ''
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
            this.setState({ values: obj.rates, names: Object.keys(obj.rates) })
        })
    }

    PlusFunction = (e) => {
        let list = document.querySelectorAll('.hidden');
        list.length == 0 ? e.preventDefault() : list[0].classList.remove('hidden');
    }

    MinusFunction = (e) => {
        let element = e.target.parentElement.parentElement;
        element.querySelector('input').value = '';
        element.querySelector('select').value = 'BGN';
        element.className += element.className ? ' hidden' : 'hidden';
        this.getResult();
    }

    ConvertorSelect = (e) => {
        this.setState({ convertVal: e.target.value, resultNumber: '' });
    }
    
    getResult = (e) => {
        if ((document.querySelectorAll(".multiSelect")[0].value == 'default') || (document.querySelector(".convertToSelect").value == 'default') ) e.preventDefault();
        else {
            document.querySelectorAll('.calcResult')[1].classList.remove('hidden');
            let numConverter  = [].map.call(document.querySelectorAll('.multiSelect'), ( select ) => {
                return 1 / (this.state.values[select.value]);
            });
            let toConvert = 1 / (this.state.values[this.state.convertVal]);
            let numbers  = [].map.call(document.querySelectorAll('.multiInput'), ( input ) => { return input.value });
            let result = [].map.call(numConverter, (el,i) => { return (el * numbers[i] ) / toConvert }).reduce( (a,b) => { return a + b }).toFixed(4);
            this.setState({resultNumber: result});
        }
    }
        
    componentDidMount(){
        this.getData();
    }

    render(){
        let options = this.state.names.map( (el) => { return <option key={el} value={el}>{el}</option> });
        let hidden = [1,2,3,4].map( (el) => {
            return (
                <div className="row  hidden" key={el}>
                    <div className="col-12-12">
                        <input type="number" className="multiInput" placeholder="0"/>
                        <select className="multiSelect">{options}</select>
                        <i className="icon-minus-circled" onClick={this.MinusFunction}/>
                    </div>
                </div>
            )
        });
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
                        <input type="number" className="multiInput" placeholder="0"/>
                        <select className="multiSelect" defaultValue="default">
                            <option value="default" disabled>Choose Currency</option>
                            {options}
                        </select>
                        <i className="icon-plus-circled" onClick={this.PlusFunction}/>
                    </div>
                </div>
                {hidden}
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
                        <div className="calcResult hidden"><p>{result}</p></div>
                    </div>
                </div>   
            </section>
        )
    }
}
export {ConvMulti};