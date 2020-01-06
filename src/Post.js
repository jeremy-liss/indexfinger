import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

const styles = ['post1', 'post2', 'post3', 'post4', 'post5', 'post6', 'post7']

class Post extends Component {
  constructor() {
    super()
    this.state = { post: null, loading: true }
  }

  componentDidMount() {
    this.getPost()
  }

  getPost() {
    axios.get(`https://public-api.wordpress.com/rest/v1/sites/indexfinger771404303.wordpress.com/posts/slug:${this.props.match.params.post}`)
      .then((res) => {
        const post = res.data
        this.setState({ post, loading: false })
      })
  }

  render() {
    if (this.state.loading) {
      return <div className="loading">loading...</div>
    }

    let size
    if (this.state.post.categories.hasOwnProperty('large')) {
      size = 'large'
    } else if (this.state.post.categories.hasOwnProperty('medium')) {
      size = 'medium'
    }

    return (
      <div className={styles[Math.floor(Math.random() * styles.length)] + ' ' + size}>
        <img src={this.state.post.featured_image} className="post-image" alt="" />
        <h1 className="post-title">{this.state.post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
      </div>
    )
  }

}

export default Post;
