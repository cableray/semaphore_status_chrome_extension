import React from 'react'
import ReactDOM from 'react-dom'
import http from 'axios'

class Server extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ServerStatusDetail'
    this.state = {semaphoreResponse: {commit:{}}}
  }

  componentDidMount () {
    http.get(this.props.data.server_url)
      .then((response) => { this.setState({semaphoreResponse: response.data}) })
      .catch((response) => console.error('semaphore server error:', response))
  }

  render() {
    const {
      message,
      url: github_url,
      id: commit_sha
    } = this.state.semaphoreResponse.commit

    return (
      <li>
        <span className='server-name'>{this.props.data.name}</span> -
        <a href={github_url} title={commit_sha} target='_blank'>{message}</a>
      </li>
      )
  }
}

export default Server
