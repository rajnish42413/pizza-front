import React, { Component }  from 'react' ;
import axios from "axios";
import Common from '../components/layouts/App';
import Link from 'next/link';
import {Form, InputNumber,Radio,Button,Icon,Rate,Checkbox,Row,Col,message} from 'antd';
import Loader from '../components/loader';

import { withRouter } from 'next/router';

interface IState {
  pizza?: any ;
  loading:boolean;
  toppings?:any;
  baseUrl:string;
}

interface IProps {
  form?: any ;
  slug? : string;

}

class Maker extends Component<IProps, IState> {
 

 state = {
    pizza: null,
    pizzaSlug: this.props.slug,
    loading: true,
    toppings:null,
     baseUrl : 'https://backend-pizza.herokuapp.com/'
  }

 getInitialProps({query}) {
    return query;
  }

  componentDidMount(){
    this.getData();
    this.getToppings();
   }

  async getData() {
        await axios.get('pizza/margherita-classic')
        .then(response => {
          this.setState({ pizza: response.data});
        })
         .catch(function (err) {
           message.error(err);
       })
   }

 async getToppings() {
    await axios.get('topping')
    .then(response => {
      this.setState({ toppings: [...response.data]});
      this.setState({ loading: false});
    })
    .catch(function (err) {
       message.error(err);
    })
  }


render(){

 const { getFieldDecorator }  = this.props.form;

	return (
		<>
		<Common title='Pizza Maker'>
      {this.state.loading ? <Loader /> :(
		    <Row>
		       <Col span={24} className="pizzamaker-box" >
		        <Row>
		        <Col span={16} className="pizzamaker-toppings">
		           <h1 className="pizza-tittle">{ this.state.pizza.name}</h1>
		            <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
		                  <Form.Item label="Select Pizza Size">
                             {getFieldDecorator('radio-group')(
                               <Radio.Group>
                                 <Radio value="S">7inch</Radio>
                                 <Radio value="M">9inch</Radio>
                                 <Radio value="L">11inch</Radio>
                                 <Radio value="XL">13inch</Radio>
                               </Radio.Group>,
                             )}
                           </Form.Item>
                    <Row>
                     {this.state.toppings.map((topping, i) => 
                       <Col span={12}>
                        <Form.Item label={topping.name} size="large" key={i} className="topping-box">
                          {getFieldDecorator(topping.slug, { initialValue: 0 })(<InputNumber min={1} max={3} />)}
                        </Form.Item>
                        <img src={ this.state.baseUrl+'images/toppings/'+topping.icons} className="img-icon" />
                      </Col>
                      )}
                    </Row>

                        <Form.Item  wrapperCol={{ span: 12, offset: 6 }} >
                            <Button type="primary" htmlType="submit"><Link href="/"> Home</Link></Button>
                            <Button type="primary" htmlType="submit" style={{ margin:"0 1.5rem" }}> Submit </Button>
                            <Button type="primary" htmlType="submit"> Reset </Button>
                         </Form.Item>

		              </Form>
		            </Col>
		           </Row>
		       </Col>
		     </Row>
       )}
      }
		 </Common>
		</>
	)
 }
}

const PizzaMaker = Form.create({ name: 'pizza_maker' })(Maker);

export default PizzaMaker;