import React from 'react'
import ReactDOM from 'react-dom'
import http from 'axios'
import {map} from 'lodash'
import "shared/page.css"
import Server from './serverCompn'

class ServerStatus extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ServerStatus'
    this.state = {semaphoreResponse: {}}
  }

  componentDidMount () {
    const {auth_hash_id, auth_key} = this.props.options
    http.get(`https://semaphoreci.com/api/v1/projects/${auth_hash_id}/servers`, {params:{auth_token: auth_key}})
      .then((response) => { this.setState({semaphoreResponse: response.data}) })
      .catch((response) => console.error('semaphore server error:', response))
  }

  render() {
    return (
      <ul>
        {map(this.state.semaphoreResponse, (response) => (
          <Server key={response.id} data={response} />
          ))}
      </ul>
      )
  }
}

chrome.storage.sync.get(null, options => {
  console.log('rendering with', options)
  ReactDOM.render(
    <ServerStatus options={options} />,
    document.getElementById('status')
  )
})
