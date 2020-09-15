import React, { useState, useEffect } from "react"
import Highlight from "react-highlight"
// import './index.less'
import { Button, message, Divider, Avatar, Empty, List } from "antd"
import { CopyOutlined } from "@ant-design/icons"

import copy from "copy-to-clipboard"

// import { react } from "react.eval"
import { getCode, getGitHubList } from "../../apis/api"
import MyList from "./github-list"

function CodeList() {
	let [listData, setListData] = useState([])

	useEffect(function afterRender() {
		getCode(20).then((res) => {
			if (res.data.data) {
				console.log(res)
				setListData([
					{
						content: res.data.data,
						title: res.data.other[0].name,
						language: res.data.other[0].type,
					},
				])
			}
		})
	}, [])

	let copyInput = React.createRef()
	//   state = {
	//     language: 'javascript',
	//     content: '',
	//     type: 'type',
	//     imgUrl: '',
	//     list: [], // github列表参数
	//   }

	//   constructor(props) {
	//     super(props)
	//     react.init(this)
	//   }

	//   copy = () => {
	//     // 粘贴输入框中的内容
	//     copy(this.state.content)
	//     message.success('复制成功，如果失败，请在输入框内手动复制.')
	//   }

	//   render() {

	// getCode = (id) => {
	// getCode(id).then((res) => {
	//   if (res.data.data) {
	//     this.setState({
	//       content: res.data.data,
	//       language: res.data.other[0].type,
	//     })
	//   }

	//   if (res.data.type === 'img') {
	//     console.log(res.data.imgUrl)
	//     this.setState({
	//       content: res.data.imgUrl,
	//       imgUrl: res.data.imgUrl,
	//       language: 'img',
	//     })
	//   }
	// })
	//   }

	//   getList = () => {
	// getGitHubList().then((res) => {
	//   console.log(res)
	//   this.setState({
	//     list: res.data.items,
	//   })
	// })
	//   }

	//   componentDidMount() {
	// this.getCode()
	// this.getList()
	//   }
	return (
		<div className="app-code">
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page)
					},
					pageSize: 2,
				}}
				dataSource={listData}
				renderItem={(item) => (
					<List.Item key={item.title}>
						<List.Item.Meta
							avatar={<Avatar src={item.avatar} />}
							title={<a href={item.href}>{item.title}</a>}
							description={item.description}
						/>
						<Highlight className={item.language} ref={copyInput}>
							{item.content}
						</Highlight>
					</List.Item>
				)}
			/>

			{/* {!!this.state.content ? (
          <div>
            <div className="code-controls-box">
              <Avatar
                style={{ backgroundColor: '#ffbf00', verticalAlign: 'middle' }}
                size="large"
                gap={4}
              >
                U
              </Avatar>
              <div className="kong"></div>
              <Button type="link">
                <CopyOutlined />
                编辑
              </Button>
              <Divider type="vertical" />
              <Button type="link" onClick={this.copy}>
                <CopyOutlined />
                复制
              </Button>
            </div>
            {this.state.language === 'img' ? (
              <div>
                <img src={this.state.imgUrl} alt="图片" />
              </div>
            ) : (
              <Highlight className={this.state.language} ref={this.copyInput}>
                {this.state.content}
              </Highlight>
            )}
          </div>
        ) : (
          <div>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>
                  Can't find more content you need <a href="#API">Why?</a>
                </span>
              }
            >
              <Button
                type="primary"
                onClick={() => {
                  // react.eval('myHeader.setModal2Visible', true)
                }}
              >
                Create Now
              </Button>
            </Empty>
          </div>
        )} */}
		</div>
	)
	//   }
}

export default CodeList
