import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import {Home} from "./pages/Home/Home"
import {AuthLayout} from "./pages/Auth/index";
import {Login} from "./pages/Auth/Login";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes path="/sign" element={<AuthLayout />}>
          <Route path="/sign/in" element={<Login />} />
        </Routes>
      </Layout>
    );
  }
}
