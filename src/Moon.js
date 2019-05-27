import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import getMoon  from './helpers/moon.js'

import './App.css';

class Moon extends Component {

  constructor() {
    super();

    this.state = { loading: true }
  }

  componentDidMount() {
    getMoon(this.props.size, (moon, success) => {
      if(success) {
        this.setState({ moon, loading: false })
      }
    })
  }

  render() {

    if (this.state.loading) {
      return <div className="moon-load" />
    }

    const moon = this.state.moon;
    const today = new Date;
    const day = today.getDate();
    const dayWeek = moon.phase[day].dayWeek

    return (
      <>
        <div className="moon">
          <div>{moment(today).format('dddd')}</div>
          <div>{moment(today).format('DD MMMM YYYY')}</div>
          <div className="moon-image" dangerouslySetInnerHTML={{ __html: moon.phase[day].svg }}></div>
          <div>{moon.phase[day].phaseName + " "+ Math.round(moon.phase[day].lighting) + "%"}</div>
        </div>

        <div className="moon-mobile-menu" dangerouslySetInnerHTML={{ __html: moon.phase[day].svg }}></div>
      </>
    )
  }
}

export default Moon;
