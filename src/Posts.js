import React, { Component } from 'react';
import axios from 'axios';

import Moon from './Moon.js'

import history from './helpers/history';

import './App.css';

const styles = ['post1', 'post2', 'post3', 'post4', 'post5', 'post6', 'post7']

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = { results: [], loading: true, page: 1 }
    this.filterResults = this.filterResults.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.index) {
      this.filterResults(this.props.match.params.index)
    } else this.getAllPosts()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params && this.props.match.params.index) {
      if (prevProps.match.params.index !== this.props.match.params.index) {
        this.filterResults(this.props.match.params.index)
      }
    } 
  }

  getAllPosts() {
    axios.get(`https://public-api.wordpress.com/rest/v1/sites/indexfinger771404303.wordpress.com/posts`)
      .then((res) => {
        const results = res.data.posts
        const totalPages = Math.ceil(res.data.found / res.data.posts.length);
        this.setState({ results, loading: false, totalPages })
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

  render() {

    if (this.state.loading) {
      return <div className="loading">loading...</div>
    }

    const nextPage = this.state.page + 1;
    const previousPage = this.state.page - 1;

    return (
      <div>
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
                <img src={result.featured_image} className="post-image" alt="" />
                <h1 className="post-title-clickable" onClick={() => history.push(`/${result.slug}`)}>{result.title}</h1>
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
    )
  }
}

export default Posts
