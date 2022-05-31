import React, {Component} from 'react'
import { Card, Form, Input, } from 'antd';
import {HeartOutlined, HeartFilled, MailOutlined, GlobalOutlined, PhoneOutlined,EditOutlined,DeleteFilled} from '@ant-design/icons';
import { Modal } from 'antd';

const CollectionCreateForm = ({ visible, onCreate, onCancel, user }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Update the user data"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="name"
        initialValues={{
          modifier: "public"
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter the name of the user!"
            }
          ]}
          initialValue = {user.name}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="email" 
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter the email of the user!"
            }
          ]}
          initialValue = {user.email}>
          <Input />
        </Form.Item>
        
        <Form.Item 
          name="phone" 
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please enter the phone number of the user!"
            }
          ]}
          initialValue = {user.phone}
          >
          <Input />
        </Form.Item>
        <Form.Item 
          name="website" 
          label="Website"
          rules={[
            {
              required: true,
              message: "Please enter the website of the user!"
            }
          ]}
          initialValue = {user.website}
          >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
class Item extends Component {
  
  state = {
    liked: false,
    visible: false
  };
  heartLiked = () => {
    this.setState((prevState) => ({
      liked: !prevState.liked
    }));
        
  };
  onCreate = (values) => {
    console.log(values);
      this.props.updateItem(this.props.user.id, values);
      this.setState((prevState) => ({
        visible: !prevState.visible
      }));
        
  };
  render() {
    const { user, deleteItem,updateItem} = this.props;
    return (
      <Card
        style={{ margin: 15 }}
        cover={
          <div className="cardHeadImage" style={{backgroundColor: '#f5f5f5', textAlign:'center'}}>
            <img
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              alt="Avatar"
              style={{ width: 200, height: 200 }}
            />
          </div>
        }
        actions={[
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
            onClick={this.heartLiked}
          >
            {this.state.liked? <HeartFilled  style = {{color: "red", fontSize:'1.3em'}}/>: <HeartOutlined style = {{color: "red", fontSize:'1.3em'}}/>}
          </button>,
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
            onClick={() => {
              this.setState((prevState) => ({
                visible: !prevState.visible
              }));
            }}
          >
            <EditOutlined style={{fontSize:'1.3em'}}/>
          </button>,
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
            onClick={() => {
              deleteItem(user.id);
            }}
          >
            <DeleteFilled style={{fontSize:'1.3em'}}/>           
          </button>,
      ]}
      >
        <h3>{user.name}</h3>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MailOutlined style={{fontSize:'1.3em'}}/>
        
          <p style={{ marginLeft: 10 }}>{user.email}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          
          <PhoneOutlined style={{fontSize:'1.3em'}} />
          <p style={{ marginLeft: 10 }}>{user.phone}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          
          <GlobalOutlined  style={{fontSize:'1.3em'}}/>
          <p style={{ marginLeft: 10 }}>http://{user.website}</p>
        </div>
        <CollectionCreateForm
          visible={this.state.visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState((prevState) => ({
              visible: !prevState.visible
            }));
          }}
          user = {user}
        />
      </Card>
    )
  }
}

export default Item;