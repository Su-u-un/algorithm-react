import React from "react"

import Code from '../Code'
import Play from "../Play"
import styles from './Right.module.less'


const Right:React.FC = ()=>
    (
        <div className={styles.container}>
            <div className={styles.inner}>
                <Play/ >
                <Code/ >
            </div>
        </div>
    )

export default Right

