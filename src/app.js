import React, { Component } from 'react';
import styles from './styles/main.scss';

class app extends Component {
  render() {
    return (
      <div>
        <p className={styles['heading-primary']}>Hello World!</p>
      </div>
    );
  }
}

export default app;