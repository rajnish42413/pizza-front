import React, { Component } from 'react';
import App from "./layouts/App";
import { IPizza ,Topping} from "../models/Pizza";
import paths from "../paths";
import Common from "./layouts/App";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from './loder/loader';
import { Row, Col, Card, PageHeader,message,Skeleton ,Spin} from 'antd';
import axios from "axios";
import Description from "./Description" ;


interface IProps {
    pizzas: IPizza[];
}


const { Meta } = Card;

interface IState {
 pizzas: IPizza[];
}


export default class Home extends Component<IState>{

   state = {
        pizzas: []
    };

  componentDidMount(){
    this.getData();
   }

async getData() {
        const { data } = await axios.get<IPizza[]>("pizza");
        this.setState({ pizzas: data });
  }

render() {
  return (
        <>
          <Common>
              { this.state.pizzas ? (
               <Row gutter={16}>
                  {this.state.pizzas.map((pizza:IPizza, i) =>
                  <Col span={8} key={i}>
                   <Link to={`/pizzas/${pizza.slug}`}>
                        <Card
                           style={{ margin:'20px'}}
                            hoverable
                            cover={<img alt={pizza.name} src={`${paths.image}/${pizza.image.medium}`} height="300px" />}
                        >
                        <Meta title={pizza.name} description={ <Description toppings={pizza.toppings} /> }/>
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