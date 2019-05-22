import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class Moon extends Component {

  constructor() {
    super();

    this.state = { loading: true }
  }

  componentDidMount() {
    const configMoon = {
  		lang  		:'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
  		month 		:new Date().getMonth() + 1, // 1  - 12
  		year  		:new Date().getFullYear(),
  		size		:40, //pixels
  		lightColor	:"#FFF", //CSS color
  		shadeColor	:"#111111", //CSS color
  		sizeQuarter	:20, //pixels
  		texturize	:true //true - false
  	}
  	configMoon.LDZ = new Date(configMoon.year,configMoon.month-1,1)/1000
  	this.loadMoonPhases(configMoon)
  }

  loadMoonPhases(obj) {
    let gets = []
    for (let i in obj){
      gets.push(i+"="+encodeURIComponent(obj[i]))
    }
    const url = "http://www.icalendar37.net/lunar/api/?"+gets.join("&")
    axios.get(url)
      .then((res) => {
        this.setState({ moon: res.data, loading: false })
      })
  }

  render() {

    if (this.state.loading) {
      return null;
    }

    const moon = this.state.moon;
    const day = new Date().getDate();
    const dayWeek = moon.phase[day].dayWeek
    return (
      <div className="moon">
        <div>{moon.nameDay[dayWeek]}</div>
        <div>{day + " " + moon.monthName + " "+moon.year}</div>
        <div className="moon-image" dangerouslySetInnerHTML={{ __html: moon.phase[day].svg }}></div>
        <div>{moon.phase[day].phaseName + " "+ Math.round(moon.phase[day].lighting) + "%"}</div>
      </div>
    )
  }
}

export default Moon;
