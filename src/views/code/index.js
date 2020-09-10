import React from "react"
import Highlight from "react-highlight"
import "./index.less"
import Axios from "axios"
import {
	Button,
	Modal,
	Form,
	Input,
	Upload,
	message,
	Select,
	Divider,
	Avatar,
} from "antd"
import { UploadOutlined, CopyOutlined } from "@ant-design/icons"

import copy from "copy-to-clipboard"

let fileid = ""

const props = {
	name: "wenjian",
	action: "http://192.168.0.57:3000/file/Node",
	headers: {
		authorization: "authorization-text",
	},
	onChange(info) {
		if (info.file.status !== "uploading") {
			console.log(info.file, info.fileList)
			fileid = info.file.response.fileId
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`)
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`)
		}
	},
}

// console.log(Form.useForm())
class PageCode extends React.Component {
	state = {
		language: "javascript",
		content: "function",
		modal2Visible: false,
		loading: false,

		title: "",
		type: "",
	}
	formRef = React.createRef()
	copyInput = React.createRef()

	setModal2Visible(modal2Visible) {
		this.setState({ modal2Visible })
	}
	onFinish = (values) => {
		console.log("Success:", values)
	}

	onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo)
	}

	onGenderChange = (value) => {
		console.log(this.formRef)
		this.setState({
			type: value,
		})
	}
	layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	}
	setUploadFile = () => {
		console.log({
			fileid: fileid,
			title: this.state.title,
			type: this.state.type,
		})
		Axios.post("http://192.168.0.57:3000/api/a/code/saveCode", {
			fileid: fileid,
			title: this.state.title,
			type: this.state.type,
		}).then((res) => {})
	}
	bindOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	copy = () => {
		// 粘贴输入框中的内容
		copy(this.state.content)
		message.success("复制成功，如果失败，请在输入框内手动复制.")
	}

	render() {
		return (
			<div className="app-code">
				<div className="code-controls-box">
					<Avatar
						style={{ backgroundColor: "#ffbf00", verticalAlign: "middle" }}
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
				<Highlight className={this.state.language} ref={this.copyInput}>
					{this.state.content}
				</Highlight>

				<Button type="link" onClick={() => this.setModal2Visible(true)}>
					添加内容
				</Button>
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
						initialValues={{ remember: true }}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						ref={this.formRef}
					>
						<Form.Item
							label="标签标题"
							name="username"
							rules={[
								{ required: true, message: "Please input your username!" },
							]}
						>
							<Input
								name="title"
								value={this.state.title}
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
							name="type"
							label="代码块的类型"
							rules={[{ required: true }]}
						>
							<Select
								placeholder="Select a option and change input text above"
								onChange={this.onGenderChange}
								allowClear
							>
								<Select.Option value="male">male</Select.Option>
								<Select.Option value="female">female</Select.Option>
								<Select.Option value="other">other</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}

	componentDidMount() {
		Axios.get("http://192.168.0.57:3000/v2/Node/node.js")
			.then((res) => {
				this.setState({
					content: res.data.data,
				})
			})
			.finally(() => {
				console.log("结束")
			})
	}
}

export default PageCode
