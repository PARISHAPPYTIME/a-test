import React from "react"
// import { ref } from 'react.eval'

// import GitHubList from "../../components/list/github-list"
// import CodeList from "../../components/list/code-list"
import "./list.less"

import { Input, Radio, Button } from "antd"

import { connect } from "react-redux"

import {
	reqGetCodeListAction,
	reqGetCodeAction,
} from "../../store/actions/actions"

// const matchMap = [
//   ['github', GitHubList],
//   ['myself', CodeList],
//   ['music', null],
// ]

// let type = 'github'
// console.log(wrapContext)
// loadPostsAction(this.props.dispatch)
class PageList extends React.Component {
	// fn = matchMap.find((item) => {
	//   return item[0] === type
	// })[1]
	// fn = (<div>qweqwe</div>)

	componentDidMount() {
		console.log(1)
		this.props.dispatch(reqGetCodeListAction())
		// this.props.dispatch(reqGetCodeListAction())
	}

	showPop = (e) => {
		this.props.dispatch(reqGetCodeAction(e.id))
	}

	render() {
		console.log(this.props)
		return (
			<div className="app-list">
				{/* <GitHubList /> */}
				{/* <CodeList /> */}
				{this.props.list.map((item) => {
					return (
						<Button
							onClick={() => {
								this.showPop(item)
							}}
							key={item.id}
							type={item.type}
							shape="round"
							type="primary"
						>
							{item.name}
						</Button>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log("state", state)
	return {
		list: state.post.list,
	}
}

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {
// 		// increment:
// 	}
// }

export default connect(mapStateToProps)(PageList)
// function RadioGroup() {
//   console.log('犯法迪奥itong')
//   return (
//     <Radio.Group
//       defaultValue="github"
//       buttonStyle="solid"
//       style={{ marginTop: 16 }}
//     >
//       {matchMap.map((item) => {
//         return (
//           <Radio.Button value={item[0]} key={item[0]}>
//             {item[0]}
//           </Radio.Button>
//         )
//       })}
//     </Radio.Group>
//   )
// }
