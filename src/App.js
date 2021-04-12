import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Avatar, Icon, Dropdown, Typography, Select } from 'antd';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';

import Dashboard from "./components/dashboard/dashboard";
import User from "./components/user/user.js";
import Student from "./components/user/student.js";
import Parent from "./components/user/parent.js";
import Teacher from "./components/user/teacher.js";
import UserDetail from "./components/userDetails/userDetails.js";
import Grade1 from "./components/grade/grade1";
import Grade2 from "./components/grade/grade2";
import Grade3 from "./components/grade/grade3";
import Grade4 from "./components/grade/grade4";
import Grade5 from "./components/grade/grade5";
import Grade6 from "./components/grade/grade6";
import Grade7 from "./components/grade/grade7";
import Grade8 from "./components/grade/grade8";
import Grade9 from "./components/grade/grade9";
import Grade10 from "./components/grade/grade10";
import Offspring from "./components/offspring/offspring.js";
import Timekeeping from "./components/timeKeeping/timeKeeping";
import QuarterService from "../src/components/quarter/quarterService"
// import Item from "./components/item/item.js";
import Login from "./components/login/login.js";
import SiderMenu from "./components/siderMenu"
import UserMenu from "./components/userMenu"
import AuditTrail from "./components/auditTrail/auditTrail"

import { UserContext } from './components/userContext'

const { Option } = Select;

const renderStudents = isAdvisory => {
  return (<Student />);
};

const App = () => {
  const { Content, Sider, Header } = Layout;
  let [loggedUser, setLoggedUser] = useState(null);
  let [collapsed, setCollapsed] = useState(false);
  let [theme] = useState("dark");

  const providerValue = useMemo(() => ({ loggedUser, setLoggedUser }), [loggedUser, setLoggedUser]);

  useEffect(() => {
    if (sessionStorage.user) {
      setLoggedUser(JSON.parse(sessionStorage.user));
    }
  }, []);

  const onChangeFunction = async (value) => {
    // console.log(value)
    let response = await QuarterService.update({_id: sessionStorage._id, quarter : value})
    sessionStorage.setItem("quarter", value)
    window.location.reload(false)
    // console.log(sessionStorage._id)
    // console.log(sessionStorage.quarter)
  };

  return (
    <UserContext.Provider value={providerValue}>
      {
        loggedUser ?
          <BrowserRouter>
            <Layout>
              <BrowserRouter>
                {JSON.parse(sessionStorage.user).role !== "Student" && JSON.parse(sessionStorage.user).role !== "Parent" ?
                  <Sider className="sider" collapsed={collapsed}>
                    <Header className="sideBarHeader text-white">
                      {!collapsed ? <b className="font"> Grading System </b> : <b className="font"> GS </b>}
                    </Header>
                    <Content className="mt-20">
                      <SiderMenu className="bg-greenSideBar" theme={theme} collapsed={collapsed} />
                    </Content>
                  </Sider>
                : null}
                <Layout>
                  <Header className="bg-white">
                    <a href onClick={() => {
                      setCollapsed(!collapsed)
                    }}>
                      {/* <Icon className="text-black" type={collapsed ? 'menu-unfold' : 'menu-fold'} /> */}
                    </a>
                    {JSON.parse(sessionStorage.user).role === "Admin" ?                     <span className="left">
                      Quarter: &nbsp;
                    <Select onChange={
                      (value)=> 
                      onChangeFunction(value)
                      } defaultValue={sessionStorage.quarter} name="quarter">
                              <Option value="1">1</Option>
                              <Option value="2">2</Option>
                              <Option value="3">3</Option>
                              <Option value="4">4</Option>
                           </Select>
                    </span> : null}

                    {JSON.parse(sessionStorage.user).role === "Student" || JSON.parse(sessionStorage.user).role === "Parent" ?
                      <span>
                        <img width={45} src="/logo.png" className="mr-10"/>
                        <b className="fs-20">Sto. Niño The Shepherd School</b>
                      </span>
                    : null}


                    <span className="right">
                      <Avatar className="avatar" src="https://picsum.photos/id/237/200/300" />
                      <Dropdown overlay={<UserMenu />}>
                        <Typography.Text className="user">Sample User</Typography.Text>
                      </Dropdown>
                    </span>
                  </Header>
                  <Layout>
                    <Content className="pt-30 pb-30">
                      <Switch>
                      {JSON.parse(sessionStorage.user).role === "Admin" ?  
                       <Redirect
                       exact
                       from="/login"
                       to="/dashboard"
                       /> :   
                       JSON.parse(sessionStorage.user).role === "Parent" ?                      
                       <Redirect
                       exact
                       from="/login"
                       to="/offspring"
                       /> :                        JSON.parse(sessionStorage.user).role === "Teacher" ?                      
                       <Redirect
                       exact
                       from="/login"
                       to="/grade1"
                       />: <Redirect
                       exact
                       from="/login"
                       to="/"
                       />}
 
                            <Route path="/admin" component={User} />
                            <Route path="/student" component={ Student } />
                            <Route path="/advisoryclass" render={(props) => { return (<Student isAdvisory="true"/>)}} />
                            <Route path="/parent" component={Parent} />
                            <Route path="/teacher" component={Teacher} />
                            <Route path="/dashboard" component={Dashboard}/>
                            <Route path="/grade1" component={Grade1} />
                            <Route path="/grade2" component={Grade2} />
                            <Route path="/grade3" component={Grade3} />
                            <Route path="/grade4" component={Grade4} />
                            <Route path="/grade5" component={Grade5} />
                            <Route path="/grade6" component={Grade6} />
                            <Route path="/grade7" component={Grade7} />
                            <Route path="/grade8" component={Grade8} />
                            <Route path="/grade9" component={Grade9} />
                            <Route path="/grade10" component={Grade10} />
                            <Route path="/offspring" component={Offspring} />
                            <Route path="/timekeeping" component={Timekeeping}/>
                            <Route path="/auditTrail" component={AuditTrail}/>
                            <Route path="/" component={UserDetail} />
                      </Switch>
                    </Content>
                  </Layout>
                </Layout>
              </BrowserRouter>
            </Layout>
            <Layout>
            </Layout>
          </BrowserRouter>
                    :
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Redirect from="*" to="/login" />
            </Switch>
          </BrowserRouter>
          }
    </UserContext.Provider>
  );

}

export default App;
