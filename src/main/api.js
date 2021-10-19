import { app, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';

import * as ipc from '../constants/ipc';

function send(event, channel, data) {
  if (!data.error) {
    return event.sender.send(channel, data);
  }
  return event.sender.send(
    channel,
    Object.assign({}, data, { error: serializeError(data.error) })
  );
}

// Init the app state with some relevant information
ipcMain.on(ipc.INIT_APP_STATE, (event) => {
  const version = app.getVersion();
  send(event, ipc.INIT_APP_STATE_RECEIVED, {
    version,
  });
});

// Open a dialog to select a folder
ipcMain.on(ipc.FOLDER_SELECT, (event) => {
  dialog
    .showOpenDialog({
      title: 'Select a folder',
      properties: ['openDirectory'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
    })
    .then((result) => {
      console.debug(ipc.FOLDER_SELECTED, result);
      if (result.canceled) {
        return;
      }
      const folderPath = result.filePaths[0];
      const files = fs.readdirSync(folderPath).map((filename) => {
        const filePath = path.join(folderPath, filename);
        const base64 = fs.readFileSync(filePath).toString('base64');
        return {
          path: filePath,
          name: path.basename(filePath),
          base64,
        };
      });
      send(event, ipc.FOLDER_SELECTED, { folderPath, files });
    })
    .catch((err) => {
      console.debug(ipc.FOLDER_SELECTED, err);
    });
});
