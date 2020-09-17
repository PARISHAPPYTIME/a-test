import React, { Fragment } from "react"
import "./list.less"

import Github from "../../components/list/github-list"
import Code from "../../components/list/code-list"

// import Search from "../search/Search"

import { connect } from "react-redux"

class PageList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchKey: "vue",
		}
		this.setSearchKey = this.setSearchKey.bind(this)
	}

	setSearchKey(searchKey) {
		this.setState({ searchKey })
	}

	render() {
		return (
			<Fragment>
				{/* <Search searchKey={this.state.key} setSearchKey={this.setSearchKey} /> */}
				<div className="app-list">
					{this.props.ListType === "localCode" ? (
						<Code searchKey={this.state.searchKey} />
					) : (
						<Github searchKey={this.state.searchKey} name="1231231" />
					)}
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ListType: state.data.ListType,
	}
}

export default connect(mapStateToProps)(PageList)
