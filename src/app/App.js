import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import store from './store';

import './App.css';

const useStyles = makeStyles((theme) => ({
}));

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
    </React.Fragment>
  );
};

export default observer(App);
