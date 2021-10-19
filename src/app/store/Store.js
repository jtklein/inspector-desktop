import { observable, action } from 'mobx';
import { ipcRenderer } from 'electron';

import * as ipc from '../../constants/ipc';
import StoreBase from './StoreBase';

class Store extends StoreBase {
  constructor() {
    super();
    this.listen();
  }

  @observable folder = {};
  @observable files = [];

  @action
  selectFolder = () => {
    ipcRenderer.send(ipc.FOLDER_SELECT, this.id);
  };

  @action
  onFolderSelected = (event, { folderPath, files }) => {
    this.folder = { folderPath };
    this.files = files;
    console.log('folderPath :>> ', folderPath);
    console.log('files :>> ', files);
  };

  listen = () => {
    this.listenTo(ipc.FOLDER_SELECTED, this.onFolderSelected);
  };
}

export default Store;
