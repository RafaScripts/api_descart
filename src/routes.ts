import express from 'express';
import {createLead, getContacts, getInfoCnpj, loginuser} from "./controller";

export default (version: string, router: express.Router) => {
  router.post(version + '/create', createLead);
  router.get(version + '/all', getContacts);
  router.get(version + '/info', getInfoCnpj);
  router.post(version + '/login', loginuser);
}