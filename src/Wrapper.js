import React, {Component} from 'react';
import Item from './Item';

import { Row, Col} from 'antd';
// import { Card, Avatar } from 'antd';
// import { SettingOutlined,DeleteOutlined,HeartTwoTone, HeartOutlined, HeartFilled} from '@ant-design/icons';
// const { Meta } = Card;
class Wrapper extends Component {
    state = {
        data:[],
        // liked: false,

    }
    // 
    async componentDidMount() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            this.setState({data: data})
            console.log(typeof(data))
        }catch(err){
            console.log(err)
        }
        // fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((data) =>console.log(data))
    }
    deleteItem = (id) => {
        this.setState((prevState) => ({
          data: prevState.data.filter((e) => e.id !== id),
        }));
      };
      updateItem = (id, d) => {
        this.setState((prevState) => ({
          data: prevState.data.map((e) => {
            if (e.id === id){
              return { ...e, ...d };
            } 
            return e;
          }),
        }));
      };
    render() {
        const {data} = this.state;
		
        if (data.length === 0) {
          return (
            <div>
              <h1>Loading..</h1>
            </div>
          );
        }
			
              
      return (
        <Row>
        {data.map((user) => (
          <Col xs={24} sm={24} md={8} lg={8} xl={6} key={user.username}>
            <Item user={user} deleteItem={this.deleteItem} updateItem={this.updateItem} />
          </Col>
        ))}
      </Row>
      )
        
    }
}
export default Wrapper

