import React, { useState } from 'react'
import { List, Avatar, Space } from 'antd'
import { BranchesOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons'

import { getGitHubList } from '../../apis/api'

const arr = []

let IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

function GitHubList(props) {
  let [listData, setListData] = useState([])
  const init = () => {
    getGitHubList().then((res) => {
      let list = res.data.items
      if (list && list.length > 0) {
        list.forEach((item) => {
          arr.push({
            href: item.clone_url,
            title: item.full_name,
            avatar: item.owner.avatar_url,
            description: item.description,
            stargazers_count: item.stargazers_count,
            language: item.language,
            watchers_count: item.watchers_count,
          })
        })
        console.log(arr)

        setListData((listData) => arr)
        console.log(listData)
      }
    })
  }
  init()
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
      dataSource={listData}
      footer={
        <div>
          <b>数据来源由 GitHub 提供</b>
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text={item.stargazers_count}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={BranchesOutlined}
              text={item.language}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={EyeOutlined}
              text={item.watchers_count}
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
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

export default GitHubList
