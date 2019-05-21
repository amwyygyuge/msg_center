// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/model/app';
import ExportAppMsg from '../../../app/model/appMsg';
import ExportStaff from '../../../app/model/staff';
import ExportUser from '../../../app/model/user';
import ExportUserMsg from '../../../app/model/userMsg';

declare module 'egg' {
  interface IModel {
    App: ReturnType<typeof ExportApp>;
    AppMsg: ReturnType<typeof ExportAppMsg>;
    Staff: ReturnType<typeof ExportStaff>;
    User: ReturnType<typeof ExportUser>;
    UserMsg: ReturnType<typeof ExportUserMsg>;
  }
}
