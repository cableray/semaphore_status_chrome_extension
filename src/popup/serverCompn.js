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
      result: status,
      server_html_url,
      build_html_url,
      commit: {
        message,
        url: github_url,
        id: commit_sha
      }
    } = this.state.semaphoreResponse

    return (
      <li className={status}>
        <a className='server-name' href={server_html_url} title='server page' target='_blank'>{this.props.data.name}</a> -{' '}
        <a href={build_html_url} title='build page' target='_blank'>{message}</a>{' '}
        <a href={github_url} title='github repo' className='hash' target='_blank'>{(commit_sha||'').substr(0,7)}</a>
      </li>
      )
  }
}

export default Server
