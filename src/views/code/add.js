import React from 'react'
import { Modal, Button, Upload, Form, Input, Select } from 'antd'
import { UploadOutlined, StarOutlined } from '@ant-design/icons'

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList)
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: 'download ',
    showRemoveIcon: true,
    removeIcon: (
      <StarOutlined
        onClick={(e) => console.log(e, 'custom removeIcon event')}
      />
    ),
  },
}

class AddCodeForm extends React.Component {
  state = {
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    },
    visible: true,
  }
  // form = Form.useForm()[0]
  onGenderChange = (value) => {
    switch (value) {
      case 'male':
        // this.form.setFieldsValue({ note: 'Hi, man!' })
        return
      case 'female':
        // this.form.setFieldsValue({ note: 'Hi, lady!' })
        return
      case 'other':
        // this.form.setFieldsValue({ note: 'Hi there!' })
        return
    }
  }
  onFinish = (values) => {
    console.log(values)
  }
  onReset = () => {
    // this.form.resetFields()
  }
  onFill = () => {
    // this.form.setFieldsValue({
    //   note: 'Hello world!',
    //   gender: 'male',
    // })
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }
  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            {...this.layout}
            // form={this.form}
            name="control-hooks"
            onFinish={this.onFinish}
          >
            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.onGenderChange}
                allowClear
              >
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
                <Select.Option value="other">other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) => {
                return getFieldValue('gender') === 'other' ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }}
            </Form.Item>
            <Form.Item>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}

export default AddCodeForm
