import React from 'react'
import { Menu } from 'antd'
import './MySider.less'
import { Link } from 'react-router-dom'

import arrayToTree from 'array-to-tree'
import axios from 'axios'
import NProgress from 'nprogress'

import {
  // 	// 	AppstoreOutlined,
  // PieChartOutlined,
  PlusOutlined,
  // 	// 	DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

class MySider extends React.Component {
  state = {
    mode: 'inline',
    theme: 'light',
    collapsed: false,
    list: [],
  }

  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    })
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    })
  }

  matchMap = new Map([['<PlusOutlined />', <PlusOutlined />]])

  menuList = (obj) => {
    if (!obj) return
    if (!obj.children || obj.children.length <= 1) {
      return (
        <Menu.Item key={obj.id} icon={this.matchMap.get(obj.icon)}>
          <Link to={obj.href}>{obj.name}</Link>
        </Menu.Item>
      )
    } else {
      return (
        <SubMenu
          key={obj.id}
          title={
            <span>
              <MailOutlined />
              <span>{obj.name}</span>
            </span>
          }
        >
          {obj.children.map((item) => {
            if (item.children) {
              return this.menuList(item)
            } else {
              return (
                <Menu.Item key={item.id} icon={<ContainerOutlined />}>
                  <Link to={item.href}>{item.name}</Link>
                </Menu.Item>
              )
            }
          })}
        </SubMenu>
      )
    }
  }

  render() {
    console.log(this.state.list)
    return (
      <div className="sider-container">
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="inline"
          theme={this.state.theme}
          inlineCollapsed={this.state.collapsed}
        >
          {this.state.list[0] &&
            this.state.list[0].children.map((item) => {
              return this.menuList(item)
            })}
        </Menu>
      </div>
    )
  }

  arrayToTree = (list) => {
    const newList = list.map((item) => {
      return {
        ...item,
        path: item.href,
        colName: item.name,
      }
    })
    return arrayToTree(newList, {
      parentProperty: 'parentId',
      customID: 'id',
    })
  }

  componentDidMount() {
    console.log(1)
    NProgress.start()
    axios({
      url: 'http://192.168.0.57:3000/api/a/data/getMenuList',
    })
      .then((res) => {
        this.setState({
          list: this.arrayToTree(res.data.data),
        })
      })
      .finally(() => {
        setTimeout(() => {
          NProgress.done(true)
        }, 2000)
      })
  }
}

export default MySider
