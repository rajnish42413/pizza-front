import React, { Component }  from 'react' ;
import axios from "axios";
import Common from '../components/layouts/App';
import Link from 'next/link';
import {Form, InputNumber,Radio,Button,Row,Col,message} from 'antd';
import Loader from '../components/loader';

import { withRouter } from 'next/router';

const size = [
  {
    "name":"S",
    "amount":10,
    "inch": "9"
  },
  {
    "name":"M",
    "amount":12,
    "inch":"11"
  },
  {
    "name":"L",
    "amount":15,
    "inch":"13"
  },  {
    "name":"XL",
    "amount":20,
    "inch":"15"
      }
  ];

interface IState {
  pizza?: any ;
  loading:boolean;
  toppings?:any;
  baseUrl:string;
  basePrice:number;
  selectToppings?:any;
  selectSize?:string;
}

interface IProps {
  form?: any ;
  slug? : string;
  value?:any;
}

class Maker extends Component<IProps, IState> {

 state = {
    pizza: null,
    pizzaSlug: this.props.slug,
    loading: true,
    toppings:null,
    baseUrl : 'https://backend-pizza.herokuapp.com/',
    basePrice:0,
    selectToppings:[],
    selectSize:"9"
  }

 getInitialProps({query}) {
    return query;
  }

  componentDidMount(){
    this.getData();
    this.getToppings();
   }

   handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         console.log('Received values of form: ', values);
      }
    });
  };

  async getData() {
        await axios.get('pizza/margherita-classic')
        .then(response => {
          this.setState({ pizza: response.data ,basePrice:response.data.amount});
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

// Add topping
toppingAdd = (value) => {
  let basePrice = this.state.basePrice;
  let price = +basePrice +  +value.amount;
   this.setState({basePrice:price ,selectToppings: [...this.state.selectToppings, value]});
   message.success( value.name + ' Added Successfully');
}


  // Select Size
  selectSize = (e) => {
      this.setState({loading:true});
      this.setState({selectSize: e.target.value });
       const findsize =  size.filter((size)=>{
         return size.inch ==  e.target.value;
      });
      this.setState({basePrice:findsize[0].amount});
      this.calculateTotalPrice();
      message.success(e.target.value + 'inch Size Updated Successfully');
       this.setState({loading:false});
  }
  

  //Calculate total price
  calculateTotalPrice = () =>
  {
    let total = this.state.basePrice;
     this.state.selectToppings.map((topping,i)=> {
       return total = +total +  +topping.amount ;
      });
      this.setState({basePrice:total});
  };


getPizzaName(): string | undefined {
  return ;
}

getTotalPrice(): number {
  const form = this.props.form;
  let amount = 0;
  if (!form) return amount;
  return amount;
  const s = form.getFieldsValue("size");
  const mySize = size.find(a => a.inch === s);
  if (mySize) {
    amount += mySize.amount;
  }
  
  return 0;
}

render() {
 const { getFieldDecorator: decorator }  = this.props.form;
 const price = this.getTotalPrice();
 const name = this.getPizzaName();
	return (
		<>
		<Common title='Pizza Maker'>
      {this.state.loading ? <Loader /> :(
		    <Row>
		       <Col span={24} className="pizzamaker-box" >
		        <Row>
		        <Col span={16} className="pizzamaker-toppings">
              { name && <h1 className="pizza-tittle"> {name} </h1> }
              <h1 className="pizza-tittle"><b>TOTAL PRICE :</b> $ {price} </h1>
		              <Form labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} onSubmit={this.handleSubmit}>
		                  <Form.Item label="Select Pizza Size" className="select-size">
                        {decorator("size")(
                               <Radio.Group onChange={this.selectSize} value={this.state.selectSize}>
                                 {size.map((size, i: number) => 
                                    <Radio value={size.inch}>{size.inch} inch</Radio>
                                 )}
                                </Radio.Group>
                        )}
                       </Form.Item>
            
                    <Row>
                     {this.state.toppings.map((topping, i: number) => 
                       <Col span={12} key={i}>
                        <Form.Item label={'$ '+topping.amount + ' ' +topping.name} size="large"  className="topping-box">
                          {decorator(topping.slug, { initialValue: 0 })(<InputNumber min={0} max={3}
                          onChange={()=>this.toppingAdd(topping)}/>)}
                        </Form.Item>
                         { topping.icon && (<img src={ this.state.baseUrl+'images/toppings/'+topping.icon} className="img-icon" />)}
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
		 </Common>
		</>
	)
 }
}

export default Form.create({ name: 'pizza_maker' })(Maker);
