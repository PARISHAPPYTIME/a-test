import React from "react"
import Highlight from "react-highlight"
import "./index.less"

class PageCode extends React.Component {
	state = {
		language: "javascript",
		content: `let a = (req, res) => {
    console.log("this is page-code")
}`,
	}
	render() {
		return (
			<div className="app-code">
				<Highlight language={this.state.language}>
					{this.state.content}
				</Highlight>
			</div>
		)
	}
}

export default PageCode
