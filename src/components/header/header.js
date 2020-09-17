import React from "react"
import cookie from "react-cookies"
import { connect } from "react-redux"

import SaveCodeForm from "../../components/form/SaveCodeForm"

import { Button, Divider, Dropdown, Menu } from "antd"
import {
	FormOutlined,
	LogoutOutlined,
	DeploymentUnitOutlined,
	GithubOutlined,
	DownOutlined,
	UserOutlined,
} from "@ant-design/icons"

// console.log(cookie.load("userInfo"))
class MyHeader extends React.Component {
	state = {
		cookie: cookie.load("userInfo"),
	}

	LinkToGitHub = () => {
		window.location.href =
			"https://github.com/login/oauth/authorize?client_id=4becd600482e091af2b4&redirect_uri=http://localhost:3001/container"
	}

	menu = (
		<Menu>
			<Menu.Item key="0" icon={<UserOutlined />}>
				<a href="http://www.alipay.com/">个人中心</a>
			</Menu.Item>
			<Menu.Item key="1">
				<a href="http://www.taobao.com/">设置</a>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="3" icon={<LogoutOutlined />}>
				退出登录
			</Menu.Item>
		</Menu>
	)

	onRef = (ref) => {
		this.ChildSaveCodeForm = ref
	}

	render() {
		return (
			<header>
				<div className="nav-content">
					<Button
						type="primary"
						shape="round"
						icon={<FormOutlined />}
						onClick={() => this.ChildSaveCodeForm.setModal2Visible(true)}
					>
						添加代码片段
					</Button>
					<Divider type="vertical" />
					{this.state.cookie && this.state.cookie.data.name ? (
						<Dropdown overlay={this.menu} trigger={["click"]}>
							<Button
								className="github"
								type="primary"
								shape="round"
								onClick={(e) => e.preventDefault()}
								icon={<DeploymentUnitOutlined />}
							>
								{this.state.cookie.data.name}
								<DownOutlined />
							</Button>
						</Dropdown>
					) : (
						<Button
							type="primary"
							className="github"
							shape="round"
							icon={<GithubOutlined />}
							onClick={this.LinkToGitHub}
						>
							GitHub 登录
						</Button>
					)}
				</div>

				<SaveCodeForm onRef={this.onRef} />
			</header>
		)
	}
}

export default connect()(MyHeader)
