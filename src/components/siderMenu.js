import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

import { Link } from 'react-router-dom';

import '../App.css';
// import { FaRegBuilding, FaUserFriends, FaChalkboardTeacher, FaUniversity } from "react-icons/fa";

import {
  UserOutlined, DashboardOutlined, AuditOutlined, TeamOutlined, BarChartOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const SiderMenu = ({ theme, collapsed }) => {
  return (
    <Menu theme={theme} mode="inline" className="pointer bg-greenSideBar" >
      {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
        <SubMenu key="grade/level" icon={<BarChartOutlined />} title="Grade And Level">
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade1" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 1 Management</span>
              <Link to={'/grade1'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade2" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 2 Management</span>
              <Link to={'/grade2'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade3" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 3 Management</span>
              <Link to={'/grade3'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade4" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 4 Management</span>
              <Link to={'/grade4'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade5" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 5 Management</span>
              <Link to={'/grade5'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade6" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 6 Management</span>
              <Link to={'/grade6'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade7" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 7 Management</span>
              <Link to={'/grade7'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade8" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 8 Management</span>
              <Link to={'/grade8'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade9" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 9 Management</span>
              <Link to={'/grade9'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="grade10" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">Grade 10 Management</span>
              <Link to={'/grade10'} className="nav-link" />
            </Menu.Item> : null}
        </SubMenu> : null}

      {JSON.parse(sessionStorage.user).role === "Admin" ?
        <Menu.Item key="dashboard" className="menus">
          <DashboardOutlined />
          <span className="fs-13">Dashboard</span>
          <Link to={'/dashboard'} className="nav-link" />
        </Menu.Item> : null}


      {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
        <SubMenu key="userManagement" icon={<TeamOutlined />} title="User Management">
          {JSON.parse(sessionStorage.user).role === "Admin" ?
            <Menu.Item key="admin" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">List Of Admin</span>
              <Link to={'/admin'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" ?
            <Menu.Item key="parent" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">List Of Parent</span>
              <Link to={'/parent'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
            <Menu.Item key="student" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">List Of Student</span>
              <Link to={'/student'} className="nav-link" />
            </Menu.Item> : null}
          {JSON.parse(sessionStorage.user).role === "Admin" ?
            <Menu.Item key="teacher" className="menus bg-greenSubMenu">
              <UserOutlined />
              <span className="fs-13">List Of Teacher</span>
              <Link to={'/teacher'} className="nav-link" />
            </Menu.Item> : null}
        </SubMenu> : null}

      {JSON.parse(sessionStorage.user).role === "Admin" || JSON.parse(sessionStorage.user).role === "Teacher" ?
        <Menu.Item key="timekeeping" className="menus">
          <UserOutlined />
          <span className="fs-13">Student Attendance</span>
          <Link to={'/timekeeping'} className="nav-link" />
        </Menu.Item> : null}

      {JSON.parse(sessionStorage.user).role === "Parent" || JSON.parse(sessionStorage.user).role === "Parent" ?
        <Menu.Item key="offspring" className="menus bg-greenSubMenu">
          <UserOutlined />
          <span className="fs-13">Student Grade</span>
          <Link to={'/offspring'} className="nav-link" />
        </Menu.Item> : null}

      {JSON.parse(sessionStorage.user).role === "Admin" ?
        <Menu.Item key="auditTrail" className="menus">
          <AuditOutlined />
          <span className="fs-13">Audit Trail</span>
          <Link to={'/auditTrail'} className="nav-link" />
        </Menu.Item> : null}

      {JSON.parse(sessionStorage.user).role === "Teacher" ?
        <Menu.Item key="advisoryClass" className="menus">
          <UserOutlined />
          <span className="fs-13">Advisory Class</span>
          <Link to={'/advisoryclass'} className="nav-link" />
        </Menu.Item> :
        null}

      {JSON.parse(sessionStorage.user).role === "Admin" ?
        <Menu.Item key="clearance" className="menus">
          <UserOutlined />
          <span className="fs-13">Clearance</span>
          <Link to={'/clearance'} className="nav-link" />
        </Menu.Item> :
        null}
    </Menu>
  );
}

export default SiderMenu;
