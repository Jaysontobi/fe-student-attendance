import React, { useContext } from 'react';
import {  Menu } from 'antd';
import { UserContext } from './userContext';

import {
    LogoutOutlined
  } from '@ant-design/icons';


const UserMenu = () => {

   const { setLoggedUser } = useContext(UserContext);

   const logout = async () => {
    sessionStorage.removeItem('user');
    window.location.reload(false);
    //   setLoggedUser(null);
    //   sessionStorage.removeItem('token');
    //   sessionStorage.removeItem('user');
   }

   return (
      <Menu className="mt-20">
         <Menu.Item onClick={()=>logout()} className="dropdown-item">
            <LogoutOutlined />Logout
         </Menu.Item>
      </Menu>
   );
}

export default UserMenu;