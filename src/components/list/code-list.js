import React from "react"
import Highlight from "react-highlight"
import "./code-list.less"
import { Button, Empty } from "antd"
// import { CopyOutlined } from "@ant-design/icons"

// import copy from "copy-to-clipboard"

import { connect } from "react-redux"

class CodeList extends React.Component {
	// componentDidMount() {
	// this.props.dispatch(reqGetCodeListAction()) //加载数据
	// }
	copyInput = React.createRef()
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

	render() {
		return (
			<div className="app-code">
				{this.props.content ? (
					<Highlight
						className={
							this.props.contentType
								? this.props.contentType.type
								: "javascript"
						}
						ref={this.copyInput}
					>
						{this.props.content}
					</Highlight>
				) : (
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
				)}

				{/* {!!this.props.content ? (
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
						)}
					</div>
				) : (
					<div>
						
					</div>
				)} */}
			</div>
		)
	}
}

const mapStateProps = (state) => {
	return {
		content: state.data.CodeContent.data,
		contentType: state.data.CodeContent && state.data.CodeContent.type,
	}
}

export default connect(mapStateProps)(CodeList)
