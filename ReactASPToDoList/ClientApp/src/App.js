import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import {Home} from "./pages/Home/Home"
import {AuthLayout} from "./pages/Auth/index";
import {Login} from "./pages/Auth/Login";
import NotFound from './pages/Special/NotFound';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<AuthLayout />}>
            <Route path="/sign/in" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    );
  }
}
