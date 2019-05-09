// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/controller/app';
import ExportAppMsg from '../../../app/controller/appMsg';
import ExportUserMsg from '../../../app/controller/userMsg';

declare module 'egg' {
  interface IController {
    app: ExportApp;
    appMsg: ExportAppMsg;
    userMsg: ExportUserMsg;
  }
}
