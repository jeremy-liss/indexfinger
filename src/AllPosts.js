import React, { Component } from 'react';
import axios from 'axios';

import Posts from './Posts.js'

import './App.css';

class AllPosts extends Component {
  constructor(props) {
    super(props)
    this.state = { results: [], loading: true, page: 1 }
  }

  componentDidMount() {
    this.getAllPosts()
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

  render() {

    if (this.state.loading) {
      return <div className="loading">loading...</div>
    }

    const nextPage = this.state.page + 1;
    const previousPage = this.state.page - 1;

    return (
      <div>
        <Posts posts={this.state.results} />
        <div className='page-button-wrap'>
          {this.state.page > 1 && <div onClick={() => this.changePage(previousPage)} className='page-button'>Previous Page</div>}
          {this.state.page < this.state.totalPages && <div onClick={() => this.changePage(nextPage)} className='page-button'>Next Page</div>}
        </div>
      </div>
    )
  }
}

export default AllPosts
