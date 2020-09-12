import React from "react"
import Highlight from "react-highlight"
import "./index.less"
import { Button, message, Divider, Avatar, Empty } from "antd"
import { CopyOutlined } from "@ant-design/icons"

import copy from "copy-to-clipboard"

import { react } from "react.eval"
import { getCode } from "../../apis/api"

// console.log(Form.useForm())
class PageCode extends React.Component {
	state = {
		language: "javascript",
		content: "",
		type: "type",
		imgUrl: "",
	}

	constructor(props) {
		super(props)
		react.init(this)
	}
	copyInput = React.createRef()

	copy = () => {
		// 粘贴输入框中的内容
		copy(this.state.content)
		message.success("复制成功，如果失败，请在输入框内手动复制.")
	}

	render() {
		return (
			<div className="app-code">
				{!!this.state.content ? (
					<div>
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
						{this.state.language === "img" ? (
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
					<Empty
						image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
						imageStyle={{
							height: 60,
						}}
						description={
							<span>
								Customize <a href="#API">Description</a>
							</span>
						}
					>
						<Button
							type="primary"
							onClick={() => {
								react.eval("myHeader.setModal2Visible", true)
							}}
						>
							Create Now
						</Button>
					</Empty>
				)}
			</div>
		)
	}

	getCode = (id) => {
		getCode(id).then((res) => {
			if (res.data.data) {
				this.setState({
					content: res.data.data,
					language: res.data.other[0].type,
				})
			}

			if (res.data.type === "img") {
				console.log(res.data.imgUrl)
				this.setState({
					content: res.data.imgUrl,
					imgUrl: res.data.imgUrl,
					language: "img",
				})
			}
		})
	}

	componentDidMount() {
		this.getCode()
	}
}

export default PageCode
