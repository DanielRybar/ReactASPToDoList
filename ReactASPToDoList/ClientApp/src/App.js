import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './custom.css';
import {Home} from "./pages/Home/Home"
import {AuthLayout} from "./pages/Auth/index";
import {Login} from "./pages/Auth/Login";
import NotFound from './pages/Special/NotFound';
import Tasks from './pages/Tasks/Tasks';
import FrontLayout from './pages/Home';
import Register from './pages/Auth/Register';
import UsersLayout from './pages/Users';
import List from './pages/Users/List';
import TaskLayout from './pages/Tasks';
import AddTask from './pages/Tasks/AddTask';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/sign" element={<AuthLayout />}>
            <Route path="/sign/in" element={<Login />} />
            <Route path="/sign/register" element={<Register />} />
          </Route>
          <Route path="/users" element={<UsersLayout />}>
            <Route index element={<List />} />
          </Route>
          <Route path="/tasks" element={<TaskLayout />}>
            <Route index element={<Tasks />} />
            <Route path="/tasks/add" element={<AddTask/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
  }
}
