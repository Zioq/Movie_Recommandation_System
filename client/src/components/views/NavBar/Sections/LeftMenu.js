import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>

    <Menu.Item key="favoirteList">
      <a href="/favoritelist">Favorite List</a>
    </Menu.Item>
   
  </Menu>
  )
}

export default LeftMenu