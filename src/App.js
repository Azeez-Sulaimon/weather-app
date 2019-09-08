import React, { Component } from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';


const API_KEY = "bcf6a9f87569bc9f3340871c471034ce";

class App extends Component {

    state = {
      temperature: undefined,
      city: undefined,
      humidity: undefined,
      country: undefined,
      description: undefined,
      error: undefined
     
    }
   
   getWeather = async (e) => {

     e.preventDefault();
    
     const city = e.target.elements.city.value;
     const country = e.target.elements.country.value;
     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},
     ${country}&appid=${API_KEY}&units=metric`);

     const data = await api_call.json();
     

     if(city && country){

        this.setState({
        
            temperature: data.main.temp,
            city: data.name,
            humidity: data.main.humidity,
            country: data.sys.country,
            description: data.weather[0].description,
            error: ""
    
         });
       
      
     } else {
         this.setState({
            temperature: undefined,
            city: undefined,
            humidity: undefined,
            country: undefined,
            description: undefined,
            error: "Please enter the values..." 
         })
     }
     
   }

    render() { 
        return ( 
            <div>
             <div className="wrapper">
               <div className="main">
                 <div className="container">
                   <div className="row">
                     <div className="col-5 title-container">
                       <Titles />
                     </div>
                     <div class="col-7 form-container">
                       <Form getWeather={this.getWeather}/>
                       <Weather 
                       temperature={this.state.temperature}
                       city={this.state.city}
                       humidity={this.state.humidity}
                       country={this.state.country}
                       description={this.state.description}
                       error={this.state.error}

                       />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
            </div>
         );
    }
}
 




export default App;