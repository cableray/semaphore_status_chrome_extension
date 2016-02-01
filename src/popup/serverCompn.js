import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import http from 'axios'

class Server extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.displayName = 'ServerStatusDetail'
    this.state = {
      serverStatusData: { commit: {} },
      buildStatusData: {}
    }
  }

  componentDidMount () {
    http.get(this.props.data.server_url)
      .then(({data}) => {
        this.setState({ serverStatusData: data })
        return http.get(data.build_url)
      })
      .then(({data}) => {
        this.setState({ buildStatusData: data })
      })
      .catch((response) => console.error('semaphore server error:', response))
  }

  render () {
    const {
      serverStatusData: {
        result: status,
        server_html_url,
        build_html_url,
        commit: {
          message,
          url: github_url,
          id: commit_sha
        }
      },
      buildStatusData: {branch_name}
    } = this.state

    return !!status && (
      <li className={status}>
        <a className='server-name' href={server_html_url} title='server page' target='_blank'>{this.props.data.name}</a> -{' '}
        <a href={build_html_url} title='build page' target='_blank'>{branch_name || '(no build found)'} - {message}</a>{' '}
        <a href={github_url} title='github repo' className='hash' target='_blank'>{(commit_sha||'').substr(0,7)}</a>
      </li>
      )
  }
}

export default Server
