import React, { Component } from 'react';
import Common from '../components/layouts/App';
import Loader from '../components/loader';
import { Row, Col, Card, PageHeader,message,Skeleton ,Spin} from 'antd';
import axios from "axios";
import Link from 'next/link';


const { Meta } = Card;

interface IState {
  pizzas?: null ;
}
export default class Home extends Component<IState>{

  state = {
        pizzas: null ,
        baseUrl : 'https://backend-pizza.herokuapp.com/'
    }

  componentDidMount(){
    this.getData();
   }

async getData() {
  await axios.get('pizza')
    .then(response => {
      this.setState({ pizzas: [ ...response.data]});
    })
    .catch(function (err) {
       message.error(err);
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
                  <Link href={'/pizzamaker?slug='+pizza.name} as={'pizza/'+pizza.slug}>
                        <Card
                           style={{ margin:'20px'}}
                            hoverable
                            cover={<img alt={pizza.name} src={this.state.baseUrl +'images/' + pizza.image.medium} height="300px" />}
                        >
                        <Meta title={pizza.name} />
                     </Card>
                     </Link>
                  </Col>
                  )}
              </Row>
              ): <Loader/> }
          </Common>
        </>
    )
}
}
