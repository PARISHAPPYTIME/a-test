import React from 'react'
import Sider from './components/Sider/MySider'
import Scrollbars from 'react-custom-scrollbars'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { CookiesProvider } from 'react-cookie'

import MyHeader from './components/header/header'
import MyTable from './components/table/MyTable'
import MyDescriptions from './components/descriptions/MyDescriptions'

import { Input, Radio } from 'antd'

// import MyPageHeader from './components/pageHeader/MyPageHeader.js'
import PageList from './views/list/index'
import PageLogin from './views/user/index'

// import { Button, Divider } from "antd"
// import { FormOutlined, SkinOutlined } from "@ant-design/icons"

// const { Provider } = React.createContext(defaultValue)

// import { react } from "react.eval"

import './App.less'

function App() {
  let renderThumb = ({ style = {}, ...props }) => {
    //设置滚动条的样式
    const thumbStyle = {
      width: '8px',
      backgroundColor: '#000000',
      opacity: '0.2',
      borderRadius: '6px',
      right: '4px',
    }
    return <div style={{ ...style, ...thumbStyle }} {...props} />
  }

  return (
    <div className="App">
      <MyHeader id="myHeader" />
      <main>
        <Router>
          <Route path="/container">
            <Scrollbars
              style={{ height: '100vh', width: 286 }} //这里给个足够高的高度就好
              renderThumbVertical={renderThumb} //传入函数，设置滚动条样式
              autoHide
            >
              <Sider id="MySider" />
            </Scrollbars>
            <div className="app-container">
              <div className="p-24">
                <Input placeholder="Basic usage" style={{ width: 440 }} />
                <br />
                <Radio.Group
                  defaultValue="c"
                  buttonStyle="solid"
                  style={{ marginTop: 16 }}
                >
                  <Radio.Button value="a">本地代码</Radio.Button>
                  <Radio.Button value="b" disabled>
                    百度
                  </Radio.Button>
                  <Radio.Button value="c">GitHub</Radio.Button>
                  <Radio.Button value="d">网易云音乐</Radio.Button>
                </Radio.Group>
                <Route path="/">
                  <PageList id="MyCode" type="github" />
                </Route>
                <Route path="/descriptions" component={MyDescriptions}></Route>
                <Route path="/list" component={MyTable}></Route>
              </div>
            </div>
          </Route>
          <Route path="/personal-center" component={PageLogin}></Route>
        </Router>
      </main>
    </div>
  )
}

export default App
