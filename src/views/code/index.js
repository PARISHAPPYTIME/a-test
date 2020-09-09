import React from 'react'
import Highlight from 'react-highlight'
import './index.less'
import Axios from 'axios'
import AddCodeForm from './add'

class PageCode extends React.Component {
  state = {
    language: 'javascript',
    content: '',
  }
  render() {
    return (
      <div className="app-code">
        <Highlight language={this.state.language}>
          {this.state.content}
        </Highlight>
        <AddCodeForm />
      </div>
    )
  }

  componentDidMount() {
    Axios.get('http://localhost:3010/v2/Node/node.js')
      .then((res) => {
        console.log(res)
        this.setState({
          content: res.data.data,
        })
      })
      .finally(() => {
        console.log('结束')
      })
  }
}

export default PageCode
