import React from "react"
import cookie from "react-cookies"
import { connect } from "react-redux"

import { Button, message, Dropdown, Menu } from "antd"
import { githubLogin } from "../../apis/api"
import urlParser from "../../utils/urlParser"

import {
	LogoutOutlined,
	DeploymentUnitOutlined,
	GithubOutlined,
	DownOutlined,
	UserOutlined,
} from "@ant-design/icons"

// console.log(cookie.load("userInfo"))
class MyHeader extends React.Component {
	state = {
		cookie: null,
	}

	LinkToGitHub = () => {
		window.location.href =
			"https://github.com/login/oauth/authorize?client_id=4becd600482e091af2b4&redirect_uri=http://localhost:3001/container"
	}

	componentDidMount() {
		let userInfo = cookie.load("userInfo")
		if (userInfo && userInfo.data.name) {
			this.setState({
				cookie: cookie.load("userInfo"),
			})
		} else {
			var myurl = urlParser()
			if (myurl.data("code")) {
				githubLogin(myurl.data("code")).then((res) => {
					console.log(res)
					if (res.data.status === 100 && res.data.data.name) {
						message.success(`${res.data.data.name} 登陆成功.`)
						cookie.save("userInfo", res.data)
						this.setState({
							cookie: cookie.load("userInfo"),
						})
					} else {
						message.error(`${res.data.msg}`)
					}
				})
			}
		}
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

	render() {
		console.log(cookie.load("userInfo"))
		return (
			<header>
				<div className="nav-content">
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
			</header>
		)
	}
}

export default connect()(MyHeader)
