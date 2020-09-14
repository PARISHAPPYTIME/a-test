import React from "react"

import { react } from "react.eval"
import cookie from "react-cookies"

// import { githubLogin } from '../../apis/api'

import {
	Button,
	Divider,
	Modal,
	Form,
	Input,
	Upload,
	message,
	Checkbox,
	Dropdown,
	Menu,
} from "antd"
import {
	FormOutlined,
	UploadOutlined,
	LogoutOutlined,
	DeploymentUnitOutlined,
	PauseCircleOutlined,
	PlayCircleOutlined,
	GithubOutlined,
	DownOutlined,
	UserOutlined,
	SearchOutlined,
} from "@ant-design/icons"

import { uploadFile } from "../../apis/api"

let fileid = ""

const props = {
	name: "wenjian",
	action: "http://192.168.0.57:3000/file/Node",
	headers: {
		authorization: "authorization-text",
	},
	onChange(info) {
		if (info.file.status !== "uploading") {
			fileid = info.file.response.fileId
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`)
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`)
		}
	},
}
console.log(cookie.load("userInfo"))
class MyHeader extends React.Component {
	state = {
		language: "javascript",
		content: "function",
		modal2Visible: false,
		loading: false,

		name: "",
		type: "",
		musicPlay: true,
		cookie: cookie.load("userInfo"),

		searchKey: "react",
	}
	constructor(props) {
		super(props)
		react.init(this)
	}

	setModal2Visible = (modal2Visible) => {
		this.setState({ modal2Visible })
	}

	setUploadFile = () => {
		uploadFile({
			fileid: fileid,
			name: this.state.name,
			type: this.state.type,
		}).then((res) => {
			this.setModal2Visible(false)
			message.success("复制成功，如果失败，请在输入框内手动复制.")
			react.eval("MySider.getMenuList")
		})
	}

	layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	}

	onChange = (checkedValues) => {
		this.setState({
			type: checkedValues.join(","),
		})
	}

	plainOptions = [
		"Javascript",
		"Html",
		"Css",
		"Img",
		"Vue",
		"I do not know",
		"Jsx/Tsx",
	]

	bindOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
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

	bindSearchFn = (e) => {
		console.log(1)
		react.eval("MyList.change")
	}

	menu2 = (value) => {
		return (
			<Menu className="search-menu">
				<Menu.Item key="0">
					<div
						onClick={() => {
							this.bindSearchFn("GitHub")
						}}
					>
						<Button type="link" icon={<GithubOutlined />}>
							GitHub
							<Divider type="vertical" />
						</Button>
						{value}
					</div>
				</Menu.Item>
				<Menu.Item key="1">
					<div>
						<Button type="link" icon={<SearchOutlined />}>
							Local
							<Divider type="vertical" />
						</Button>
						{value}
					</div>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="3">
					3rd menu item
					<Divider type="vertical" />
				</Menu.Item>
			</Menu>
		)
	}

	render() {
		return (
			<header>
				<div className="nav-content">
					<Dropdown
						overlay={this.menu2(this.state.searchKey)}
						trigger={["focus"]}
					>
						<Input
							value={this.state.searchKey}
							name="searchKey"
							onChange={this.bindOnChange}
							placeholder="Basic usage"
							style={{ width: 440 }}
						/>
					</Dropdown>
					<Divider type="vertical" />
					<Button
						type="primary"
						shape="round"
						icon={<FormOutlined />}
						onClick={() => this.setModal2Visible(true)}
					>
						添加代码片段
					</Button>
					<Divider type="vertical" />
					<Button
						className="close-bg active"
						shape="round"
						icon={
							this.state.musicPlay ? (
								<PauseCircleOutlined />
							) : (
								<PlayCircleOutlined />
							)
						}
					>
						...
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

				<Modal
					title="Vertically centered modal dialog"
					centered
					visible={this.state.modal2Visible}
					onOk={() => this.setModal2Visible(false)}
					onCancel={() => this.setModal2Visible(false)}
					footer={[
						<Button key="back" onClick={() => this.setModal2Visible(false)}>
							Return
						</Button>,
						<Button
							key="submit"
							type="primary"
							loading={this.state.loading}
							onClick={() => this.setUploadFile(false)}
						>
							Submit
						</Button>,
					]}
				>
					<Form
						name="basic"
						{...this.layout}
						initialValues={{
							remember: true,
							"checkbox-group": ["Javascript"],
						}}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						ref={this.formRef}
					>
						<Form.Item
							label="标签标题"
							name="name"
							rules={[
								{ required: true, message: "Please input your username!" },
							]}
						>
							<Input
								name="name"
								value={this.state.name}
								onChange={this.bindOnChange}
							/>
						</Form.Item>
						<Form.Item
							label="上传文件"
							rules={[{ required: true, message: "Please   your username!" }]}
						>
							<Upload {...props}>
								<Button icon={<UploadOutlined />}>Click to Upload</Button>
							</Upload>
						</Form.Item>
						<Form.Item
							name="checkbox-group"
							label="代码块的类型"
							rules={[{ required: true }]}
						>
							<Checkbox.Group
								options={this.plainOptions}
								onChange={this.onChange}
							/>
						</Form.Item>
					</Form>
				</Modal>
			</header>
		)
	}

	// componentWillUnmount() {
	// console.log(cookie.load('userInfo'))
	// cookie.save('userInfo', res.data)
	// }
}

export default MyHeader
