"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const store = new electron_store_1.default();
store.set('currentFolder', '');
store.set('emails', []);
const fetchData = () => {
    node_fetch_1.default('https://gist.githubusercontent.com/dospolov/3428ec13910cdf1dafdc6770aa4a6580/raw/9561840bae2e01a5c46b18dd2e29dfb6f2a0468f/spark-test-data.json')
        .then(r => r.json())
        .then(r => store.set('emails', r));
};
exports.default = () => {
    fetchData();
    const filterEmailsByFolder = (currentFolder) => {
        store.set('currentFolder', currentFolder);
        return store
            .get('emails')
            .filter((email) => currentFolder === 'trash'
            ? email.isDeleted
            : email.folder === currentFolder && !email.isDeleted);
    };
    electron_1.ipcMain.on('setCurrentFolder', (event, currentFolder) => {
        console.log(currentFolder);
        event.reply('sendEmailList', filterEmailsByFolder(currentFolder));
    });
    const updateEmail = (id, flagName) => store.set('emails', store.get('emails').map((email) => email.id === id
        ? {
            ...email,
            [flagName]: !email[flagName],
        }
        : email));
    electron_1.ipcMain.on('updateEmail', (event, id, flagName) => {
        updateEmail(id, flagName);
        event.reply('sendEmailList', filterEmailsByFolder(store.get('currentFolder')));
    });
};
//# sourceMappingURL=store.js.map