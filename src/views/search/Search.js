import React, { Component } from "react"
import { Dropdown, PageHeader, Tag, Input, Menu, Button, Divider } from "antd"

import { connect } from "react-redux"

class Search extends Component {
	state = {
		searchKey: "",
	}

	bindSearchFn = (e) => {
		this.props.PropsSetListType(e)
		this.props.setSearchKey(this.state.searchKey)
	}

	bindOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	menu2 = (value) => {
		return (
			<Menu className="search-menu">
				<Menu.Item key="0">
					<div onClick={() => this.bindSearchFn("gitHub")}>{value}</div>
				</Menu.Item>

				<Menu.Item key="3">
					翻译
					<Divider type="vertical" /> {value}
				</Menu.Item>
			</Menu>
		)
	}

	render() {
		return (
			<PageHeader
				className="site-page-header"
				tags={<Tag color="blue">超级管理员</Tag>}
				extra={[
					<Button key="1" type="primary">
						Primary
					</Button>,
				]}
				avatar={{
					src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
				}}
			>
				<Dropdown
					overlay={this.menu2(this.state.searchKey)}
					trigger={["focus"]}
				>
					<Input
						value={this.state.searchKey}
						name="searchKey"
						autoComplete="off"
						onChange={this.bindOnChange}
						placeholder="Basic usage"
					/>
				</Dropdown>
			</PageHeader>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		type: state.type,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		PropsSetListType: async (type) => {
			dispatch({
				type: "SET_LIST_TYPE",
				payload: type,
			})
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
