import React, { Component, ReactNode } from 'react';
import Link from 'next/link';
import {withRouter, Router as RouterType} from "next/router";
import Router from "next/router";

import { Layout } from 'antd';
const { Header, Content,Footer} = Layout;

import NProgress from 'nprogress';
import Head from 'next/head';
import cookie from "js-cookie";


interface IProps {
  title?: string;
  children: ReactNode,
  router: RouterType
}

Router.events.on('routeChangeStart', (url: any) => {
  console.log('App is changing to: ', url);
  NProgress.start();
});

Router.events.on('routeChangeComplete', (url: any) => {
  NProgress.done();
});

function App (props: IProps) {
    return (
      <>
      <Head>
        <title>{props.title} | Coworking Space | Piston Portal </title>
        <link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"></link>
      </Head>
        <Layout>
          <style jsx>{`
  
        `}</style>
         <Layout>
            <header className="header">
                <h1>PIZZA MENU</h1>
            </header>
              <Content>
                  <div> {props.children}</div>
               </Content>
            <Footer style={{ textAlign: 'center' }}>©2019 Created by Rajnish Singh</Footer>
          </Layout>
        </Layout>
      </>
    );
}

export default withRouter(App);