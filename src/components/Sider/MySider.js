import React from "react"
import { Menu } from "antd"
import arrayToTree from "array-to-tree"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import "./MySider.less"
import { getMenuList } from "../../apis/api"
import { reqGetCodeListAction } from "../../store/actions/actions"

import {
	// 	// 	AppstoreOutlined,
	// PieChartOutlined,
	GithubOutlined,
	// 	// 	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
	FieldBinaryOutlined,
	ReadOutlined,
} from "@ant-design/icons"

// import { react } from "react.eval"
const { SubMenu } = Menu

class MySider extends React.Component {
	state = {
		mode: "inline",
		theme: "light",
		collapsed: false,
		list: [],
	}
	changeMode = (value) => {
		this.setState({
			mode: value ? "vertical" : "inline",
		})
	}

	changeTheme = (value) => {
		this.setState({
			theme: value ? "dark" : "light",
		})
	}

	matchMap = new Map([
		["<GithubOutlined />", <GithubOutlined />],
		["<ReadOutlined />", <ReadOutlined />],
	])

	onOpenChange = (openKeys) => {
		const latestOpenKey = openKeys.find(
			(key) => this.state.openKeys.indexOf(key) === -1
		)
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys })
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			})
		}
	}

	bindClick = (e) => {
		this.props.dispatch(reqGetCodeListAction(e.key))
	}

	menuList = (obj) => {
		if (!obj) return
		if (!obj.children || obj.children.length <= 1) {
			return (
				<Menu.Item key={obj.id} icon={this.matchMap.get(obj.icon)}>
					<Link to={`/container/${obj.id}`}>{obj.name}</Link>
				</Menu.Item>
			)
		} else {
			return (
				<SubMenu
					key={obj.id}
					title={
						<span>
							<MailOutlined />
							<span>{obj.name}</span>
						</span>
					}
				>
					{obj.children.map((item) => {
						if (item.children) {
							return this.menuList(item)
						} else {
							return (
								<Menu.Item key={item.id} icon={<ContainerOutlined />}>
									{/* <Link to="/container/">{item.name}</Link> */}
									{item.name}
								</Menu.Item>
							)
						}
					})}
				</SubMenu>
			)
		}
	}

	render() {
		return (
			<div className="sider-container">
				<Menu
					defaultSelectedKeys={["10"]}
					defaultOpenKeys={["1"]}
					onOpenChange={this.onOpenChange}
					mode="inline"
					theme={this.state.theme}
					inlineCollapsed={this.state.collapsed}
					onClick={this.bindClick}
				>
					{this.state.list[0] &&
						this.state.list[0].children.map((item) => {
							return this.menuList(item)
						})}
				</Menu>
			</div>
		)
	}

	arrayToTree = (list) => {
		const newList = list.map((item) => {
			return {
				...item,
				path: item.href,
				colName: item.name,
			}
		})
		return arrayToTree(newList, {
			parentProperty: "parentId",
			customID: "id",
		})
	}

	getMenuList = () => {
		getMenuList().then((res) => {
			this.setState({
				list: this.arrayToTree(res.data.data),
			})
		})
	}

	componentDidMount() {
		this.getMenuList()
	}
}

export default connect()(MySider)
