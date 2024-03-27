import React from "react"

import Code from '../Code'
import styles from './Right.module.less'


const Right:React.FC = ()=>
    (
        <div className={styles.container}>
            <div className={styles.inner}>
                <Code/ >
            </div>
        </div>
    )

export default Right

