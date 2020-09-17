import React, { useState } from "react"
import { Button } from "antd"
import pop from "../../components/pop/pop"

import PopCode from "../../components/pop/PopCode"
// import { CopyOutlined } from "@ant-design/icons"

import { connect } from "react-redux"
import { getCodeList, getCode } from "../../apis/api"

class CodeList extends React.Component {
	constructor(props) {
		super(props)
		this.showPop = this.showPop.bind(this)
		this.closePop = this.closePop.bind(this)
		this.state = {
			PopCodeVisible: false,
		}
	}

	showPop = (e) => {
		return (cb) => {
			setTimeout(() => {
				this.props.PropsGetCode(e.id, () => {
					if (
						this.props.contentType === "img" ||
						this.props.contentType === "Img"
					) {
						pop.info(this.props.content)
						cb()
					} else {
						this.closePop(true, () => cb())
					}
				})
			}, 500)
		}
	}

	closePop(PopCodeVisible, cb) {
		this.setState({ PopCodeVisible }, cb)
	}

	componentDidMount() {
		this.props.PropsGetCodeList()
	}

	render() {
		return (
			<div className="app-code">
				{this.props.CodeList &&
					this.props.CodeList.map((item) => {
						return (
							<ClickButton
								key={item.id}
								item={item}
								bindClick={this.showPop(item)}
							/>
						)
					})}

				<PopCode
					PopCodeVisible={this.state.PopCodeVisible}
					closePop={this.closePop}
					content={this.props.content}
				/>
			</div>
		)
	}
}

const mapStateProps = (state) => {
	return {
		CodeList: state.data.CodeList && state.data.CodeList.data,
		contentType: state.data.CodeContent && state.data.CodeContent.type,
		content: state.data.CodeContent.data,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		PropsGetCodeList: async () => {
			const res = await getCodeList()
			dispatch({
				type: "REQ_GET_CODE_LIST_ACTION",
				payload: res.data,
			})
		},
		PropsGetCode: async (id, cb) => {
			const res = await getCode(id)
			dispatch({
				type: "REQ_GET_CODE_ACTION",
				payload: res.data,
			})
			cb()
		},
	}
}

export default connect(mapStateProps, mapDispatchToProps)(CodeList)

function ClickButton(props) {
	const [loading, setLoading] = useState(false)
	let { item, bindClick } = props

	let myButton = () => {
		setLoading(!loading)
		bindClick(() => {
			setLoading(false)
		})
	}

	return (
		<Button
			onClick={myButton}
			className="app-list-item"
			type="primary"
			loading={loading}
		>
			{item.name}
		</Button>
	)
}
