import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, message, Button } from 'antd';

import '../../App.css';
import LoginForm from './loginForm';
import UserAction from '../user/userAction'

const version = process.env.REACT_APP_VERSION


const Login = () => {
    let [showLogin, setShowLogin] = useState(false);
    let [showContact, setShowContact] = useState(false);
    let [showAboutUs, setShowAboutUs] = useState(false);
    let [showHome, setShowHome] = useState(true);
    const {Content} = Layout;
    let {
        login,
        loginCounter
      } = UserAction({});
    
    const loginUser = async (credentials) => {
        login(credentials);
    }

    const loginFunction = async () => {
        setShowHome(false)
        setShowLogin(true)
    }

    const contactFunction = async () => {
        setShowHome(false)
        setShowContact(true)
    }

    const aboutUsFunction = async () => {
        setShowHome(false)
        setShowAboutUs(true)
    }

    return (
        <Layout className="login">
            {/* Landing Page */}
            {showHome ? <Content className="contentLogin bg-homepage">
                <Row className="center">
                    <Col>
                        <Button className="btn-home mr-10">HOME</Button>
                        <Button className="btn-about mr-10" onClick={()=> aboutUsFunction()}>ABOUT US</Button>
                        <Button className="btn-contact mr-10" onClick={()=>contactFunction()}>CONTACT</Button>
                        <Button className="btnLogin" onClick={()=>loginFunction()}>LOGIN</Button>
                    </Col>
                </Row>
            </Content> : null}
            

            {/* Login Page */}
            {showLogin 
            
            ?             <Content className="contentLogin mt-5P">
            <div className="center mb-15">
                <img className="center" width={120} src="./ts.png"/><br/>
            </div>
            <b className="center fs-20">WELCOME TO</b><br/>
            <Typography.Title className="text-center">THE STO. NINO THE SHEPHERD SCHOOL</Typography.Title>
            <Row className="mt-10 center">
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }}>
                    <LoginForm login={loginUser}/>
                </Col>
            </Row>
        </Content> : null}


             {/* Contact Page */}
            {showContact ?            <Content className="contentLogin mt-35">
                <div className="center mb-40">
                    <img className="center" src="./contact.png"/><br/>
                </div>
                <Typography className="text-center">
                    <b>Telephone Number:</b> 8 245 4148<br/>
                    <b>FB Page:</b> SnssYour HomeSchool<br/>
                    <b>Email Address: </b>
                    <u className="blue">
                        admission.snss@gmail.com
                    </u>
                </Typography>
            </Content>:null}
 


            {/* About Page */}
            {showAboutUs ?  <Content className="contentLogin mt-35">
                <div className="center h-70 mb-35">
                    <img className="center w-90P" src="./about.jpg"/><br/>
                </div>
                <Typography className="text-center">
                    In 1986 St. Niño the Shepherd Learning Center was established by Mrs. Susan Catipon Garcia, it is the school's aim<br/>
                    that each student reaches his/her full potential academically but also personally, socially, emotionally<br/>
                    physically and spiritually in preparation for becoming responsible citizens of the future. This is achieved <br/>
                    by giving pupils equal access to a program of education that is tailored to meet their individual needs. <br/>
                    And giving them access to a wide range of extra-curricular activities. Central to the school's vision is the<br/>
                    belief that students must be taught respect for themselves, for others and for the environment in which they live. 
                </Typography>
            </Content> : null}
           
        </Layout>
    );
}

export default Login;