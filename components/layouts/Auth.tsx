import React, { Component, ReactNode } from 'react';
import Link from 'next/link';
import { Layout,} from 'antd';
const { Content } = Layout;
import Head from 'next/head';

interface IProps {
  title?: string;
  children: ReactNode,
}


function Auth (props: IProps) {
    return (
      <>
      <Head>
        <title>{props.title} || Coworking Space || Piston Portal </title>
      </Head>
        <Layout>
          <Layout>

            <Layout>
                <Content style={{ background: '#ddd', padding: 0, margin: 0, minHeight: '100vh', }}>
                  {props.children}
                </Content>
            </Layout>
          </Layout>
        </Layout>
      </>
    );
}

export default Auth;