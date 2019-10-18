import React, { Component } from 'react';
import Common from '../components/layouts/App';
import { Row, Col, Card, PageHeader,message} from 'antd';

import axios from "axios";
import Link from 'next/link';
const { Meta } = Card;

interface IState {
  pizzas?: null ;
}
export default class Home extends Component<IState>{

  state = {
        pizzas: null ,
        baseUrl : 'http://localhost:80001/'
    }

  componentDidMount(){
    this.getData();
    console.log(this.state);
  }

async getData() {
  axios.get('pizza')
    .then(response => {
      this.setState({ pizzas: [ ...response.data]});
    })
    .catch(function (error) {
        message.error(error);
    })
  }

render() {
  return (
        <>
          <Common title='Top 10 Pizzas'>
              { this.state.pizzas ? (
               <Row gutter={16}>
                  {this.state.pizzas.map((pizza, i) =>
                  <Col span={6} key={i}>
                        <Card
                           style={{ margin:'20px'}}
                            hoverable
                            cover={<img alt={pizza.name} src={this.state.baseUrl +'images/' + pizza.image.medium} height="300px" />}
                        >
                        <Meta title={pizza.name} />
                     </Card>
                  </Col>
                  )}
              </Row>
              ): null }
          </Common>
        </>
    )
}
}
