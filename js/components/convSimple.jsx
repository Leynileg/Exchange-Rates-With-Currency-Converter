import React from 'react';
import ReactDOM from 'react-dom';

class ConvSimple extends React.Component {
    constructor(props){
        super(props);
        this.state={
            values: [],
            names: [],
            firstVal: 'AUD',
            secondVal: '',
            result: '',
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
            this.setState({ values: obj.rates, names: Object.keys(obj.rates) })
        });
    }
    
    FirstSelect = (e) => {
        this.setState({firstVal: e.target.value});
        this.getData();
    }

    SecondSelect = (e) => { this.setState({secondVal: e.target.value}) }
    
    exchangeValues = () => {
        document.querySelectorAll(".simpleSelect")[0].value = this.state.secondVal;
        document.querySelectorAll(".simpleSelect")[1].value = this.state.firstVal;
        this.setState({ firstVal: document.querySelectorAll(".simpleSelect")[0].value });
        this.setState({ secondVal: document.querySelectorAll(".simpleSelect")[1].value });
        this.setState({result: ''});
    }
    
    getResult = (e) => {
        let number = document.querySelector('.simpleInput').value;
        if ((document.querySelectorAll(".simpleSelect")[0].value == 'default') || (document.querySelectorAll(".simpleSelect")[1].value == 'default') || (number == '') ) e.preventDefault();
        else {
            document.querySelectorAll('.calcResult')[0].classList.remove('hidden');
            let firstNumConverter = (1 / (this.state.values[this.state.firstVal])).toFixed(4);
            let secondNumConverter = (1 / (this.state.values[this.state.secondVal])).toFixed(4);
            
            let all = number + ' ' + document.querySelectorAll('.simpleSelect')[0].value + ' = ' + ((number * firstNumConverter) / secondNumConverter).toFixed(4) + ' ' + document.querySelectorAll('.simpleSelect')[1].value;
            this.setState({result: all});
        }
    }
        
    componentDidMount(){
        this.getData();
    }

    render(){
        let options = this.state.names.map( (el) => { return <option key={el} value={el}>{el}</option> })

        return (
            <section id="conv_simple">
                <div className='row'>
                    <div className="col-12-12">
                        <h2>SIMPLE CURRENCY CONVERTER</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                         <input type="number" className="simpleInput" placeholder="0"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                        <select className="simpleSelect" defaultValue="default" onChange={this.FirstSelect}>
                            <option value="default" disabled>Choose First Currency</option>
                            {options}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                         <i className="icon-exchange" onClick={this.exchangeValues}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                        <select className="simpleSelect" defaultValue="default" onChange={this.SecondSelect} >
                            <option value="default" disabled>Choose Second Currency</option>
                            {options}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                        <i className="icon-down-circled" onClick={this.getResult}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-12">
                        <div className="calcResult hidden"><p>{this.state.result}</p></div>
                    </div>
                </div> 
            </section>
        );
    }
}
export {ConvSimple};