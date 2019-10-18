import React from "react";
import "antd/dist/antd.css";
import '../css/variables.scss';
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import Axios from "axios";
import store from "../store";

import "../css/app.scss";

if (typeof document !== "undefined") {
    Axios.defaults.baseURL = "https://backend-pizza.herokuapp.com";
    Axios.defaults.headers.common["Accept"] = "application/json";
    Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
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
