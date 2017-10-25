import React from 'react';
import ReactDOM from 'react-dom';

export class ConvMulti extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            convertVal: 'AUD',
            resultNumber: '',
            display: 'none'
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
        let element = e.target.parentElement;
        element.querySelector('input').value = '';
        element.querySelector('select').value = 'BGN';
        element.className += element.className ? ' hidden' : 'hidden'; 
        if (this.state.resultNumber != '') this.getResult();
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

            let result = [].map.call(numConverter, (el,i) => { return (el * numbers[i] ) / toConvert })
            .reduce( (a,b) => { return a + b }).toFixed(4);

            this.setState({resultNumber: result, display:'block'});
        }
    }
        
    componentDidMount(){
        this.getData();
    }

    render(){
        let options = this.state.names.map( (el) => { return <option key={el} value={el}>{el}</option> });
        let hidden = [1,2,3,4,5,6].map( (el) => {
            return (
                <div className="hidden" key={el}>
                    <label>
                        <input type="number" className="multiInput" placeholder="0"/>
                        <select className="multiSelect">{options}</select>
                        <i className="icon-minus-circled" onClick={this.MinusFunction}/>
                    </label>
                </div>
            )
        });
        let result = this.state.resultNumber + ' ' + this.state.convertVal;
        
        return (
            <section id="convMulti">
                <div className="row">
                    <div className="col-12-12">
                        <h2>MULTI CURRENCY CONVERTER</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6-12">
                        <form>
                            <label>
                                <input type="number" className="multiInput" placeholder="0"/>
                                <select className="multiSelect" defaultValue="default">
                                    <option value="default" disabled>Choose Currency</option>
                                    {options}
                                </select>
                                <i className="icon-plus-circled" onClick={this.PlusFunction}/>
                            </label>
                            {hidden}
                            <label>
                                <select className="convertToSelect" defaultValue="default" onChange={this.ConvertorSelect}>
                                    <option value="default" disabled>CONVERT TO</option>
                                    {options}
                                </select>
                            </label>
                            <i className="icon-down-circled" onClick={this.getResult}/>
                        </form>
                    </div>
                    <div className="col-6-12">
                        <div className="calcResult"><p style={{display: this.state.display}}>{result}</p></div>
                    </div>
                </div>
            </section>
        )
    }
}