import React, { Fragment, useState } from "react"
import CodeList from "../../components/list/code-list"
import pop from "../../components/pop/pop"
import "./list.less"

import { Modal, Button } from "antd"
import { getCodeList, getCode } from "../../apis/api"

import { connect } from "react-redux"

class PageList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			modal2Visible: false,
		}
		this.showPop = this.showPop.bind(this)
	}
	componentDidMount() {
		this.props.PropsGetCodeList()
	}

	showPop = (e) => {
		return (cb) => {
			setTimeout(() => {
				this.props.PropsGetCode(e.id, () => {
					if (this.props.contentType === "img") {
						console.log(this.props.content)
						pop.info(this.props.content)
						cb()
					} else {
						this.setState(
							{
								modal2Visible: true,
							},
							() => cb()
						)
					}
				})
			}, 500)
		}
	}

	setModal2Visible(modal2Visible) {
		this.setState({ modal2Visible })
	}

	render() {
		return (
			<Fragment>
				<div className="app-list">
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
				</div>

				<Modal
					title="Vertically centered modal dialog"
					width={800}
					centered
					visible={this.state.modal2Visible}
					onOk={() => this.setModal2Visible(false)}
					onCancel={() => this.setModal2Visible(false)}
				>
					<CodeList />
				</Modal>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PageList)

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
			type={item.type}
			loading={loading}
			shape="round"
		>
			{item.name}
		</Button>
	)
}
