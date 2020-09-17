import React, { Component } from "react"

import { Button, Modal, message, Form, Input, Upload, Checkbox } from "antd"

import { uploadFile } from "../../apis/api"
import { UploadOutlined } from "@ant-design/icons"

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

class SaveCodeForm extends Component {
	state = {
		loading: false,
		modal2Visible: false,
	}

	formRef = React.createRef()

	setUploadFile = async () => {
		try {
			const values = await this.formRef.current.validateFields()
			values.fileid = fileid
			values.type = values.type.join(',')
			uploadFile(values).then((res) => {
				message.success("标签插入成功！")
			})
		} catch (errorInfo) {
			console.log("Failed:", errorInfo)
		}
		// this.formRef.current.validateFields(
		// 	[
		// 		"name",
		// 		(err, value) => {
		// 			console.lof(err, value)
		// 			console.log(2)
		// 		},
		// 	],
		// 	[
		// 		"checkbox-group",
		// 		(err, value) => {
		// 			console.lof(err, value)
		// 			console.log(3)
		// 		},
		// 	]
		// )
		// this.formRef
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	setModal2Visible = (modal2Visible) => {
		this.setState({ modal2Visible })
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
	layout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 19 },
	}

	onChange = (checkedValues) => {
		this.setState({
			type: checkedValues.join(","),
		})
	}

	render() {
		return (
			<Modal
				title="Vertically centered modal dialog"
				centered
				bodyStyle={{
					maxHeight: "500px",
				}}
				width={800}
				visible={this.state.modal2Visible}
				onOk={() => this.setModal2Visible(false)}
				onCancel={() => this.setModal2Visible(false)}
				footer={[
					<Button key="back" onClick={() => this.props.setModal2Visible(false)}>
						Return
					</Button>,
					<Button
						key="submit"
						type="primary"
						loading={this.state.loading}
						onClick={() => this.setUploadFile()}
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
					}}
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					ref={this.formRef}
				>
					<Form.Item
						label="标签标题"
						name="name"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input
							name="name"
							value={this.state.name}
							autoComplete="off"
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
						<Checkbox.Group
							options={this.plainOptions}
							onChange={this.onChange}
						/>
					</Form.Item>
				</Form>
			</Modal>
		)
	}
}

export default SaveCodeForm
