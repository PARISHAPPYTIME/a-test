import React from "react"
import { List, Avatar, Space } from "antd"
import { BranchesOutlined, StarOutlined, EyeOutlined } from "@ant-design/icons"

import { connect } from "react-redux"
import { reqGetGitHubListAction } from "../../store/actions/actions"

// import { getGitHubList } from "../../apis/api"

let IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
)

class GitHubList extends React.Component {
	componentDidMount() {
		this.props.dispatch(reqGetGitHubListAction) //加载数据
	}
	render() {
		return (
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page)
					},
					pageSize: 5,
				}}
				dataSource={this.props.post.list}
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
}

const mapStateProps = (state) => {
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
