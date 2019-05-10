// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/service/app';
import ExportAppMsg from '../../../app/service/appMsg';
import ExportAuth from '../../../app/service/auth';
import ExportUserMsg from '../../../app/service/userMsg';

declare module 'egg' {
  interface IService {
    app: ExportApp;
    appMsg: ExportAppMsg;
    auth: ExportAuth;
    userMsg: ExportUserMsg;
  }
}
