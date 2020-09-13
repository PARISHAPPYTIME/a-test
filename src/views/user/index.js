import React from 'react'
// import MyForm from '../../components/form/MyForm'
// import './index.less'
// import { Link } from 'react-router-dom'
// import logo from '../../assets/logo.svg'

import { Button } from 'antd'

import { GithubOutlined } from '@ant-design/icons'
// import url from 'url'

class PageLogin extends React.Component {
  state = {
    userInfo: {},
  }
  LinkToGitHub = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=4becd600482e091af2b4&redirect_uri=http://localhost:3001/personal-center'
  }

  render() {
    return (
      <div className="container">
        <div className="app-form">
          {/* <MyForm /> */}

          <Button
            type="primary"
            className="github"
            shape="round"
            icon={<GithubOutlined />}
            onClick={this.LinkToGitHub}
          >
            GitHub 登录
          </Button>
        </div>
        {/* clientId: 4becd600482e091af2b4 */}
        {/* ClientSecret: 16686ed199d974ee3913dbab8e2efdbd4a6e8622 */}
      </div>
    )
  }
  myurl = {
    url: window.location.href,
    data: function (a, b) {
      var aVal = this.queryString(a, this.url)
      if (!b && b !== '') {
        return aVal
      }
      if (b === '') {
        this.url = this.url
          .replace('&' + a + '=' + aVal, b)
          .replace(a + '=' + aVal, b)
      }

      if (!!b) {
        if (aVal) {
          this.url = this.url
            .replace('&' + a + '=' + aVal, '&' + a + '=' + b)
            .replace(a + '=' + aVal, a + '=' + b)
        }
        if (!aVal) {
          this.url =
            this.url.indexOf('?') !== -1
              ? this.url + '&' + a + '=' + b
              : this.url + '?' + a + '=' + b
          this.url = this.url.replace('?&', '?')
        }
      }
    },
    queryString: function (key, href) {
      href = href === undefined ? window.location.search : href
      var m = new RegExp('(?:&|/?)' + key + '=([^&$]+)').exec(href)
      return m ? m[1] : ''
    },
  }
  componentDidMount() {
    // console.log(this.myurl.data('code'))
    const code = this.myurl.data('code')
    // console.log(
    if (code) {
      //   githubLogin(code).then((res) => {
      //     // console.log(res.data.message)
      //     console.log(res.data)
      //     if (
      //       res.data.status === 102
      //       //   ||
      //       //   true
      //       //   res.data.data.message.indexOf('Requires authentication') !== -1
      //     ) {
      //     } else {
      //     }
      //   })
    }
  }
}

export default PageLogin
