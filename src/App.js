import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
     
        
          name: '',
          avgAge: '',
          avgDailyIncomeInUSD: '',
          avgDailyIncomePopulation: '',
        
        population: '',
        timeToElapse: '',
        reportedCases: '',
        totalHospitalBeds: '',
        periodType: 'days',

      
      response: '',
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  
  }

  handleSubmit(e) {
    e.preventDefault();
    let formfields = { ...this.state};
    const data = { };
    const region  = {};
   
    region.name = formfields.name;
    region.avgAge = Number(formfields.avgAge);
    region.avgDailyIncomeInUSD =Number(formfields.avgDailyIncomeInUSD);
    region.avgDailyIncomePopulation = Number(formfields.avgDailyIncomePopulation);


    data.region = region;

    data.population = Number(formfields.population);
    data.timeToElapse =  Number(formfields.timeToElapse);
    data.totalHospitalBeds = Number(formfields.totalHospitalBeds);
    data.periodType = formfields.periodType;
    data.reportedCases = Number(formfields.reportedCases);

    console.log(data);
    
   
    axios.post('https://covid-19-estimator-tk.herokuapp.com/api/v1/on-covid-19', data, 
    
     { headers: {
          'Content-Type': 'application/json',
      }})
      .then((response) => {
        console.log(response);
        const result =  JSON.stringify(response.data.impact) + " " + JSON.stringify(response.data.severeImpact) ;

        this.setState({ response: result });
      })
      .catch((error) => {
        console.log(error);
        //this.setState({ response: error });
      });
  
  }

  render() {
    return (
      <section className="App">
        <header className="App-header">

          <form onSubmit={this.handleSubmit} >
            <div>
              Name:
        <input
                name="name"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              AvgAge:
        <input
                //name="data-avg-age"
                name="avgAge"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              AvgDailyIncomeInUSD:
        <input
                //name="data-avg-daily-income-in-USD"
                name="AvgDailyIncomeInUSD"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              AvgDailyIncomePopulation:
        <input
                //name="data-avg-daily-income-population"
                 name="AvgDailyIncomePopulation"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              Population:
        <input
                //name="data-population"
                name="population"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              TimeToElapse:
        <input
                //name="data-time-to-elapse"
                name="timeToElapse"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              ReportedCases:
        <input
                //name="data-reported-cases"
                name="reportedCases"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              TotalHospitalBeds:
        <input
                //name="data-total-hospital-beds"
                name="totalHospitalBeds"
                style={{ marginLeft: '.5rem' }}
                type="text"
                onChange={this.handleChange}

              />
            </div>
            <div>

              PeriodType:
              <select onChange={this.handleChange}  style={{backgroundColor:'white', width:'100px', height:'50px', color:'#FF4000'}}name="periodType" >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>/option>
                <option value="months">Months</option>
              </select>
            </div>
            <input name="data-go-estimate" style={{borderRadius:'8px', width:'100px', height:'50px', color:'#FF4000', marginLeft: '.5rem' }} type="submit" value="Submit" />
          </form>

          <label>
            Response:
          <textarea className="textarea" style={{ width: '300px', height: '150px' }} onChange={this.handleChange} 
          
         defaultValue={this.state.response} />
          </label>

        </header>
      </section>

    )
  }
}
export default App;
