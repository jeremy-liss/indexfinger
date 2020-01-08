import React, { Component } from 'react';

import history from './helpers/history';

import './App.css';

const styles = ['post1', 'post2', 'post3', 'post4', 'post5', 'post6', 'post7']

class Posts extends Component {
  constructor(props) {
    super(props)
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <div className="posts">
          {this.props.posts.map((result, i) => {
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
                      <div key={j} className="post-tags-tag" onClick={() => history.push(`/index/${tag}`)}>{j+1 === tags.length? tag : tag + ', '}</div>
                    )
                  })}
                </div>}
              </div>
            )
          })}
        </div>

      </div>
    )
  }
}

export default Posts
