import React from "react"
import { PageHeader, Avatar } from "antd"

const routes = [
	{
		path: "index",
		breadcrumbName: "First-level Menu",
	},
	{
		path: "first",
		breadcrumbName: "Second-level Menu",
	},
	{
		path: "second",
		breadcrumbName: "Third-level Menu",
	},
]

class MyPageHeader extends React.Component {
	state = {
		background: "#fff",
	}

	handleChangeComplete = (color) => {
		this.setState({ background: color.hex })
	}
	render() {
		return (
			<div className="site-page-header-ghost-wrapper">
				<PageHeader
					ghost={false}
					title="Title"
					breadcrumb={{ routes }}
					subTitle="This is a subtitle"
					extra={[
						<Avatar
							key="3"
							style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
							size="large"
							gap={4}
						>
							U
						</Avatar>,
					]}
				>
					{/* <Descriptions size="small" column={3}>
						<Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
						<Descriptions.Item label="Association">
							<a href="www.baidu.com">421421</a>
						</Descriptions.Item>
						<Descriptions.Item label="Creation Time">
							2017-01-10
						</Descriptions.Item>
						<Descriptions.Item label="Effective Time">
							2017-10-10
						</Descriptions.Item>
						<Descriptions.Item label="Remarks">
							Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
						</Descriptions.Item>
					</Descriptions> */}
				</PageHeader>
			</div>
		)
	}
}

export default MyPageHeader
