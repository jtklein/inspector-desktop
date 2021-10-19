import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import store from './store';

import './App.css';

const useStyles = makeStyles((theme) => ({
  selectFolder: {
    width: '200px',
    height: '200px',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className={`${classes.selectFolder}`}
        onClick={store.selectFolder}
      >
        {'Select folder'}
      </Button>
      {store.files.map(file => {
        const src = `data:image/jpg;base64,${file.base64}`;
        return <img src={src} className={`${classes.selectFolder}`} key={file.name} />;
      })}
    </React.Fragment>
  );
};

export default observer(App);
