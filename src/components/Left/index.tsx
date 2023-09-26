import React, { useState } from 'react';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Menu } from 'antd';
import styles from './Left.module.less'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    children,
    label,
    type,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', [{type:'divider'},
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
    getItem('Option 9', '13'),
    getItem('Option 10', '14'),
    getItem('Option 11', '15'),
    getItem('Option 12', '16'),
    getItem('Option 10', '143'),
    getItem('Option 11', '152'),
    getItem('Option 12', '161'),
  ],'group'),
  
  getItem('Navigation Two', 'sub2', [{type:'divider'},
    getItem('Option 5', '5'),
    getItem('Option 6', '61'),
    getItem('Option 5', '52'),
    getItem('Option 6', '63'),
    getItem('Option 5', '54'),
    getItem('Option 6', '65'),
  ],'group')
];


const Left: React.FC = () => {

  return (
      <div className={styles.outer}>
        <div className={styles.inner}>
        <Menu
          mode="inline"
          style={{ width: 250 ,height:'100%'}}
          items={items}
        />
        </div>
      </div>
    
  );
};

export default Left;