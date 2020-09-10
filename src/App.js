import React from 'react'
import Sider from './components/Sider/MySider'
import Scrollbars from 'react-custom-scrollbars'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MyTable from './components/table/MyTable'
import MyDescriptions from './components/descriptions/MyDescriptions'

// import MyPageHeader from './components/pageHeader/MyPageHeader.js'
import PageCode from './views/code/index'
import PageLogin from './views/user/index'

import { Button, Divider } from 'antd'
import { FormOutlined, SkinOutlined } from '@ant-design/icons'

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
      {/* <MyPageHeader></MyPageHeader> */}
      <header>
        <div className="nav-content">
          <Button
            className="close-bg active"
            type="primary"
            shape="circle"
            icon={<SkinOutlined />}
          />
          <Divider type="vertical" />
          <Button type="primary" shape="round" icon={<FormOutlined />}>
            添加代码片段
          </Button>
        </div>
      </header>
      <main>
        <Router>
          <Route path="/container">
            <Scrollbars
              style={{ height: '100vh', width: 286 }} //这里给个足够高的高度就好
              renderThumbVertical={renderThumb} //传入函数，设置滚动条样式
              autoHide
            >
              <Sider />
            </Scrollbars>
            <div className="app-container">
              <div className="p-24">
                <Route path="/" component={PageCode}></Route>
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
