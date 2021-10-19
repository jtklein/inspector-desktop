import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import App from './App';
import store from './store';

const Index = () => {
  const { light, dark } = theme;
  const muiTheme = store?.config?.isDarkMode ? dark : light;
  return (
    <ThemeProvider theme={muiTheme}>
        <App />
    </ThemeProvider>
  );
}

export default observer(Index);

