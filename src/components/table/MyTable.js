import React from "react"
import { Table, message } from "antd"

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		render: (text) => <a href="https://ant.design">{text}</a>,
	},
	{
		title: "Cash Assets",
		className: "column-money",
		dataIndex: "money",
		align: "right",
	},
	{
		title: "Address",
		dataIndex: "address",
	},
]

const data = [
	{
		key: "1",
		name: "John Brown",
		money: "￥300,000.00",
		address: "New York No. 1 Lake Park",
	},
	{
		key: "2",
		name: "Jim Green",
		money: "￥1,256,000.00",
		address: "London No. 1 Lake Park",
	},
	{
		key: "3",
		name: "Joe Black",
		money: "￥120,000.00",
		address: "Sidney No. 1 Lake Park",
	},
]

class MyTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	info = () => {
		message.info("This is a normal message")
	}
	render() {
		return (
			<>
				<Table
					columns={columns}
					dataSource={data}
					bordered
					title={() => "Header"}
					footer={() => "Footer"}
				/>
			</>
		)
	}
}

export default MyTable
