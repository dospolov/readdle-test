import { ipcMain } from 'electron';
import Store from 'electron-store';
import fetch from 'node-fetch';

const store = new Store();
store.set('currentFolder', '');
store.set('emails', []);

const fetchData = () => {
  fetch(
    'https://gist.githubusercontent.com/dospolov/3428ec13910cdf1dafdc6770aa4a6580/raw/9561840bae2e01a5c46b18dd2e29dfb6f2a0468f/spark-test-data.json',
  )
    .then(r => r.json())
    .then(r => store.set('emails', r));
};

export default () => {
  fetchData();

  const filterEmailsByFolder = (currentFolder: string) => {
    store.set('currentFolder', currentFolder);

    return store
      .get('emails')
      .filter((email: any) =>
        currentFolder === 'trash'
          ? email.isDeleted
          : email.folder === currentFolder && !email.isDeleted,
      );
  };

  ipcMain.on('setCurrentFolder', (event, currentFolder) => {
    console.log(currentFolder);
    event.reply('sendEmailList', filterEmailsByFolder(currentFolder));
  });

  const updateEmail = (id: number, flagName: string) =>
    store.set(
      'emails',
      store.get('emails').map((email: any) =>
        email.id === id
          ? {
              ...email,
              [flagName]: !email[flagName],
            }
          : email,
      ),
    );

  ipcMain.on('updateEmail', (event, id, flagName) => {
    updateEmail(id, flagName);
    event.reply('sendEmailList', filterEmailsByFolder(store.get('currentFolder')));
  });
};
