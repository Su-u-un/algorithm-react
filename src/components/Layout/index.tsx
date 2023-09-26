import React from 'react'
import styles from './Layout.module.less'
import Left from '../Left'
import Charts from '../Charts'
import Right from '../Right'

function Layout (){
  return (
    <div className={styles.app}>
      <Left/ >
      <Charts/ >
      <Right/ >
    </div>
    
  )
}

export default Layout
