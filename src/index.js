import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
    this.create = this.create.bind(this)
  }

  async componentDidMount() {
    const response = await axios.get('api/posts')
    const posts = response.data
    this.setState({posts})
  }

  async create() {
    const response = await axios.post('/api/posts')
    const post = response.data
    const posts = [...this.state.posts, post]
    this.setState({posts})
  }

  render () {
    const { posts } = this.state
    return (
      <div id="container">
        <h1>#hashtag</h1>
        <button onClick={this.create}>Generate Post</button>
        <ul>
          {
            posts.map( (post) => {
              return <li key={ post.id }>{post.twit}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

const root = document.querySelector('#root')
ReactDOM.render(<HashRouter><App /></HashRouter>, root)

