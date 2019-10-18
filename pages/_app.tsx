import React from "react";
import "antd/dist/antd.css";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import Axios from "axios";
import store from "../store";
import Cookie from "js-cookie";

if (typeof document !== "undefined") {
    Axios.defaults.baseURL = "http://localhost:8001/";
    Axios.defaults.headers.common["Accept"] = "application/json";
    Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    
    const token = Cookie.get('token');
    if (token) {
        Axios.defaults.headers.common['Authorization'] = `${token}`;
      } else {
    Axios.defaults.headers.common['Authorization'] = '';
    delete Axios.defaults.headers.common['Authorization'];
    }
}

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default MyApp;
