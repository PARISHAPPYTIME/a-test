import React from "react"
import MyForm from "../../components/form/MyForm"
import "./index.less"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"

class PageLogin extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="content">
					<div className="top">
						<div className="header">
							<Link to="/">
								<img alt="logo" className="logo" src={logo} />
								<span className="title">Ant Design</span>
							</Link>
						</div>
						<div className="desc">
							Ant Design 是西湖区最具影响力的 Web 设计规范
						</div>
					</div>

					<div className="main">
						<MyForm />
					</div>
				</div>
			</div>
		)
	}
}

export default PageLogin
