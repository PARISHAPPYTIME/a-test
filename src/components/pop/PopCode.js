import React, { Component } from "react"
import Highlight from "react-highlight"
import { Button, Empty, Modal, message } from "antd"
import copy from "copy-to-clipboard"

class PopCode extends Component {
	copyInput = React.createRef()
	state = {
		loading: false,
	}
	// setPopCodeVisible(PopCodeVisible) {
	// 	this.setState({ PopCodeVisible })
	// }

	copy = () => {
		copy(this.props.content)
		message.success("复制成功，如果失败，请在输入框内手动复制.")
	}

	render() {
		return (
			<div className="app-pop-code">
				<Modal
					title="Vertically centered modal dialog"
					bodyStyle={{
						maxHeight: "500px",
						overflowY: "scroll",
					}}
					width={800}
					centered
					visible={this.props.PopCodeVisible}
					// onOk={() => this.props.closePop(false)}
					onCancel={() => this.props.closePop(false)}
					footer={[
						<Button key="back" onClick={() => this.props.closePop(false)}>
							关闭
						</Button>,
						<Button
							key="copy"
							type="primary"
							loading={this.state.loading}
							onClick={this.copy}
						>
							全部复制
						</Button>,
					]}
				>
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
									// react.eval('myHeader.setPopCodeVisible', true)
								}}
							>
								Create Now
							</Button>
						</Empty>
					)}
				</Modal>
			</div>
		)
	}
}

export default PopCode
