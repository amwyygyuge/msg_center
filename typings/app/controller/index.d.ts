// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/controller/app';
import ExportAppMsg from '../../../app/controller/appMsg';
import ExportAuth from '../../../app/controller/auth';
import ExportStaff from '../../../app/controller/staff';
import ExportUserMsg from '../../../app/controller/userMsg';
import ExportView from '../../../app/controller/view';

declare module 'egg' {
  interface IController {
    app: ExportApp;
    appMsg: ExportAppMsg;
    auth: ExportAuth;
    staff: ExportStaff;
    userMsg: ExportUserMsg;
    view: ExportView;
  }
}
