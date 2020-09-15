import React from "react"
// import { ref } from 'react.eval'

import GitHubList from "../components/list/github-list"
// import CodeList from "../../components/list/code-list"

// import { Input, Radio } from "antd"

// import { connect } from "react-redux"

// import { loadPostsAction } from "../store/actions/post_action"

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
	render() {
		console.log(this.props)
		return (
			<div>
				{/* <wrapContext.Consumer> */}
				{/* {(value) => <span>{value.fn()}</span>} */}
				{/* </wrapContext.Consumer> */}
				{/* <wrapContext.Consumer> */}
				{/* <div> */}
				<GitHubList />
				{/* </div> */}
				{/* <div> {(value) => <span>{value}</span>}</div> */}
				{/* </wrapContext.Consumer> */}
			</div>
		)
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		list: state,
// 	}
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {
// 		// increment:
// 	}
// }

export default PageList
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
