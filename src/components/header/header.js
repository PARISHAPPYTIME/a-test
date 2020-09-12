import React from "react"

import { react } from "react.eval"

import {
	Button,
	Divider,
	Modal,
	Form,
	Input,
	Upload,
	message,
	Checkbox,
	Tooltip,
} from "antd"
import {
	FormOutlined,
	SkinOutlined,
	UploadOutlined,
	LogoutOutlined,
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

class MyHeader extends React.Component {
	state = {
		language: "javascript",
		content: "function",
		modal2Visible: false,
		loading: false,

		name: "",
		type: "",
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

	render() {
		return (
			<header>
				<div className="nav-content">
					<Button
						type="primary"
						shape="round"
						icon={<FormOutlined />}
						onClick={() => this.setModal2Visible(true)}
					>
						添加代码片段
					</Button>
					<Divider type="vertical" />
					<Tooltip placement="topLeft" title="切换皮肤">
						<Button
							className="close-bg active"
							type="primary"
							shape="circle"
							icon={<SkinOutlined />}
						/>
					</Tooltip>
					<Divider type="vertical" />
					<Tooltip placement="topLeft" title="退出登录">
						<Button
							className="close-bg active"
							type="primary"
							shape="circle"
							icon={<LogoutOutlined />}
						/>
					</Tooltip>
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
}

export default MyHeader
