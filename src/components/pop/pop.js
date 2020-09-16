import React from "react"
import { Modal } from "antd"
import "./pop.less"

function info(imgPath) {
	Modal.info({
		title: "This is a notification message",
		content: (
			<div className="info-box">
				<img src={imgPath} alt="img" />
			</div>
		),
		centered: true,
		onOk() {
			console.log(123123)
		},
	})
}

function success() {
	Modal.success({
		content: "some messages...some messages...",
	})
}

function error() {
	Modal.error({
		title: "This is an error message",
		content: "some messages...some messages...",
	})
}

function warning() {
	Modal.warning({
		title: "This is a warning message",
		content: "some messages...some messages...",
	})
}

export default {
	info,
	success,
	error,
	warning,
}
