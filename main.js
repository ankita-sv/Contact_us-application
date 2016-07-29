const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
var {ipcMain} = require('electron');

let win;
app.on('ready', function(){
win=new BrowserWindow({width: 800, height: 600});;
win.on('close', () => {
   win = null;
})
  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();
  let win2;
    ipcMain.on('Request from index', function(){
      win2 = new BrowserWindow({ width: 400, height: 200});
      win2.loadURL(`file://${__dirname}/addelem.html`);
     //win2.webContents.openDevTools();
     ipcMain.on("Request from addelem", function(){

      win2.hide();

    });
      win2.on('closed', function () {
         win2=null;
       });
       });

  });
