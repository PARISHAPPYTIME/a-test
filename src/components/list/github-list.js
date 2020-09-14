import React, { useState, useEffect } from 'react'
import { List, Avatar, Space } from 'antd'
import { BranchesOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'
import { loadPostsAction } from '../../store/actions/post_action'

import { getGitHubList } from '../../apis/api'

let IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

class GitHubList extends React.Component {
  //   const arr = []
  //   let [listData, setListData] = useState([])

  //   useEffect(() => {
  //     getGitHubList().then((res) => {
  //       console.log('进去一次')
  //       let list = res.data.items
  //       if (list && list.length > 0) {
  //         setListData([
  //           ...listData,
  //           {
  //             href: list.clone_url,
  //             title: list.full_name,
  //             avatar: list.owner ? list.owner.avatar_url : '',
  //             description: list.description,
  //             stargazers_count: list.stargazers_count,
  //             language: list.language,
  //             watchers_count: list.watchers_count,
  //           },
  //         ])
  //       }
  //     })
  //   }, [])

  componentDidMount() {
    this.props.dispatch(loadPostsAction) //加载数据
  }

  listData = []
  render() {
    console.log(this.props)
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 3,
        }}
        dataSource={this.listData}
        //   footer={
        //     <div>
        //       <b>数据来源由 GitHub 提供</b>
        //     </div>
        //   }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            //   actions={[
            //     <IconText
            //       icon={StarOutlined}
            //       text={item.stargazers_count}
            //       key="list-vertical-star-o"
            //     />,
            //     <IconText
            //       icon={BranchesOutlined}
            //       text={item.language}
            //       key="list-vertical-like-o"
            //     />,
            //     <IconText
            //       icon={EyeOutlined}
            //       text={item.watchers_count}
            //       key="list-vertical-message"
            //     />,
            //   ]}
            //   extra={
            //     <img
            //       width={272}
            //       alt="logo"
            //       src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            //     />
            //   }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {/* {item.content} */}
          </List.Item>
        )}
      />
    )
  }
}

const mapStateProps = (state, ownProps) => {
  return {
    post: state.post,
  }
}

// const mapDispatchToProps = (() => {
// 	return {
// 		dispatch: () => {
// 			dispatch(action)
// 		}
// 	}
// })

export default connect(mapStateProps)(GitHubList)
