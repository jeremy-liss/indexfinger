import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import axios from 'axios';

import AllPosts from './AllPosts';
import IndexPosts from './IndexPosts';
import Moon from './Moon';
import Post from './Post';

import history from './helpers/history';

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = { loading: true, showMenu: false, showMoonPopup: false, popupMoonLoading: true }
  }

  componentDidMount() {
    this.getTags()
  }

  getTags() {
    axios.get(`https://public-api.wordpress.com/rest/v1/sites/indexfinger771404303.wordpress.com/tags?number=1000`)
    .then((res) => {
      const tags = [];
      res.data.tags.forEach((tag) => {
        if (tag.post_count > 0) {
          tags.push(tag.slug)
        }
      })
      this.setState({ tags: tags.sort(), loading: false })
    })
  }

  toggleMenu(toggle) {
    if (toggle === false) {
      document.body.style.overflow = 'initial';
      document.documentElement.style.overflow = 'initial';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    this.setState({ showMenu: toggle })
  }

  toggleMoonPopup(toggle) {
    if (toggle === false) {
      document.body.style.overflow = 'initial';
      document.documentElement.style.overflow = 'initial';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    this.setState({ showMoonPopup: toggle })
  }

  render() {

    if (this.state.loading) {
      return <div className="loading">loading...</div>
    }

    return (
      <div>
        <div className="home">
          <div className="content">
            <div className="mobile-bar">
              <div className="mobile-moon-box">
                <Moon size={30} thumbnail toggleMoonPopup={(toggle) => this.toggleMoonPopup(toggle)}/>
              </div>
              <i className="fas fa-bars hamburger" onClick={() => this.toggleMenu(true)}></i>
            </div>
            <div className="topbar" onClick={() => history.push('/')}>
              <Moon size={70} desktop />
              <h1 className="title">Index Finger</h1>
            </div>
            <div className="posts">
              <Router history={history}>
                <Switch>
                  <Route path="/index/:index" component={IndexPosts} />
                  <Route path="/:post" component={Post} />
                  <Route path="/" component={AllPosts} />
                </Switch>
              </Router>
            </div>

          </div>

          <div className="index">
            <h4>Index:</h4>
            {this.state.tags.map((tag, i) => {
              return (
                <div key={i} className="index-tag" onClick={() => history.push(`/index/${tag}`)}>{tag}</div>
              )
            })}
          </div>

          { this.state.showMenu &&
            <div className="mobile-menu">
              <div className="mobile-index">
                <div className="mobile-menu-header">
                  <div className="mobile-index-title">Index:</div>
                  <i className="fas fa-times mobile-menu-close" onClick={() => this.toggleMenu(false)}></i>
                </div>
                {this.state.tags.map((tag) => {
                  return (
                    <div className="mobile-index-tag" onClick={() => {history.push(`/index/${tag}`); this.toggleMenu(false)}}>{tag}</div>
                  )
                })}
              </div>
            </div>
          }
          { this.state.showMoonPopup &&
            <div className="mobile-menu">
              <div  className="moon-popup">
                <div className="moon-popup-header">
                  <i className="fas fa-times moon-popup-close" onClick={() => { this.toggleMoonPopup(false); this.setState({ popupMoonLoading: true }) }}></i>
                </div>
                {this.state.popupMoonLoading && <div className="loading">loading...</div>}
                <Moon size={100} popup moonLoaded={() => this.setState({ popupMoonLoading: false })} />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App
