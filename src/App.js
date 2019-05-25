import React, { Component } from 'react';
import axios from 'axios';

import Moon from './Moon.js'

import './App.css';

const styles = ['post1', 'post2', 'post3', 'post4', 'post5', 'post6', 'post7']

class App extends Component {
  constructor() {
    super()
    this.state = { results: [], loading: true, showMenu: false, page: 1 }
    this.filterResults = this.filterResults.bind(this);
  }

  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts() {
    axios.get(`https://public-api.wordpress.com/rest/v1/sites/indexfinger771404303.wordpress.com/posts`)
      .then((res) => {
        const results = res.data.posts
        const totalPages = Math.ceil(res.data.found / res.data.posts.length);
        const tags = []
        results.forEach((result) => {
          Object.keys(result.tags).forEach((tag) => {
            if (!tags.includes(tag)) {
              tags.push(tag)
            }
          })
        })
        tags.sort()
        this.setState({ results, tags, loading: false, totalPages })
      })
  }

  changePage(page) {
    this.setState({ loading: true })
    axios.get(`https://public-api.wordpress.com/rest/v1/sites/indexfinger771404303.wordpress.com/posts?page=` + page)
      .then((res) => {
        this.setState({ results: res.data.posts, page, loading: false })
      })
  }

  filterResults(filter) {
    const tag = filter.replace(/ /g, "-");
    this.setState({ loading: true })
    axios.get(`https://public-api.wordpress.com/rest/v1/sites/indexfinger771404303.wordpress.com/posts?tag=` + tag)
      .then((res) => {
        this.setState({ results: res.data.posts, loading: false, page: 1, totalPages: 1 })
      })
  }

  toggleMenu() {
    const showMenu = !this.state.showMenu
    this.setState({ showMenu })
  }

  render() {

    if (this.state.loading) {
      return <div>loading</div>
    }

    const nextPage = this.state.page + 1;
    const previousPage = this.state.page - 1;

    return (
      <div>
        <div className="home">
          <div className="content">
            <div className="mobile-bar">
              <i className="fas fa-bars hamburger" onClick={() => this.toggleMenu()}></i>
            </div>
            <div className="topbar" onClick={() => this.getAllPosts()}>
              <Moon size={70} />
              <h1 className="title">Index Finger</h1>
            </div>
            <div className="posts">
              {this.state.results.map((result, i) => {
                let size
                if (result.categories.hasOwnProperty('large')) {
                  size = 'large'
                } else if (result.categories.hasOwnProperty('medium')) {
                  size = 'medium'
                }
                const tags = Object.keys(result.tags)
                return (
                  <div key={i} className={styles[Math.floor(Math.random() * styles.length)] + ' ' + size}>
                    <img src={result.featured_image} className="post-image"/>
                    <h1 className="post-title">{result.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: result.content }} />
                    {tags.length > 0 && <div className="post-tags">
                      Index:
                      {tags.map((tag, j) => {
                        return (
                          <div key={j} className="post-tags-tag" onClick={() => this.filterResults(tag)}>{j+1 === tags.length? tag : tag + ', '}</div>
                        )
                      })}
                    </div>}
                  </div>
                )
              })}
            </div>

            <div className='page-button-wrap'>
              {this.state.page > 1 && <div onClick={() => this.changePage(previousPage)} className='page-button'>Previous Page</div>}
              {this.state.page < this.state.totalPages && <div onClick={() => this.changePage(nextPage)} className='page-button'>Next Page</div>}
            </div>

          </div>

          <div className="index">
            <h4>Index:</h4>
            {this.state.tags.map((tag, i) => {
              return (
                <div key={i} className="index-tag" onClick={() => this.filterResults(tag)}>{tag}</div>
              )
            })}
          </div>

          {this.state.showMenu && <div className="mobile-menu">
            <div className="mobile-index">
              <div className="mobile-menu-header">
                <div className="mobile-index-title">Index:</div>
                <i className="fas fa-times mobile-menu-close" onClick={() => this.toggleMenu()}></i>
              </div>
              {this.state.tags.map((tag) => {
                return (
                  <div className="mobile-index-tag" onClick={() => {this.filterResults(tag); this.toggleMenu()}}>{tag}</div>
                )
              })}
            </div>
          </div>
        }
        </div>
      </div>
    )
  }
}

export default App
