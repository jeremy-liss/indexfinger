import React, { Component } from 'react';
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
        if (this.props.popup && this.props.moonLoaded) {
          this.props.moonLoaded();
        }
      }
    })
  }

  render() {

    if (this.state.loading) {
      return <div className="moon-load" />
    }

    const moon = this.state.moon;
    const today = new Date();
    const day = today.getDate();

    const thumbSvg = moon.phase[day].svg.replace(`<a xlink:href="http://www.icalendar37.net/lunar/app/" target="_blank">`, '').replace('</a>', '');

    return (
      <>
        { this.props.desktop &&
          <div className="moon">
            <div>{moment(today).format('dddd')}</div>
            <div>{moment(today).format('DD MMMM YYYY')}</div>
            <div className="moon-image" dangerouslySetInnerHTML={{ __html: moon.phase[day].svg }}></div>
            <div>{moon.phase[day].phaseName + " "+ Math.round(moon.phase[day].lighting) + "%"}</div>
          </div>
        }
        { this.props.thumbnail &&
          <div className="moon-mobile-menu" onClick={() => this.props.toggleMoonPopup(true)} dangerouslySetInnerHTML={{ __html: thumbSvg }}></div>
        }
        { this.props.popup &&
          <div>
            <h1 className="moon-popup-text">{moment(today).format('dddd')}</h1>
            <h1 className="moon-popup-text">{moment(today).format('DD MMMM YYYY')}</h1>
            <div className="moon-image" dangerouslySetInnerHTML={{ __html: moon.phase[day].svg }}></div>
            <h1 className="moon-popup-text">{moon.phase[day].phaseName + " "+ Math.round(moon.phase[day].lighting) + "%"}</h1>
          </div>
        }
      </>
    )
  }
}

export default Moon;
