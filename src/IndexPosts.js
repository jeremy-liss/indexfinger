import React, { Component } from 'react';
import axios from 'axios';

import Posts from './Posts.js'

import './App.css';

class IndexPosts extends Component {
  constructor(props) {
    super(props)
    this.state = { results: [], loading: true }
    this.filterResults = this.filterResults.bind(this);
  }

  componentDidMount() {
    this.filterResults(this.props.match.params.index)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.index !== this.props.match.params.index) {
      this.filterResults(this.props.match.params.index)
    }
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

    return (
      <Posts posts={this.state.results} />
    )
  }
}

export default IndexPosts
