import { Handler } from 'aws-lambda';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

import { unsubAll, updateOpt } from './emailPreferences';

export const updateEmailPreferences: Handler = (event: any) => {
  console.log('Received event:', event);
  var optOutAll = event.optOutAll;
  
  if (optOutAll === false) { 
    updateOpt(event);
  } else if (optOutAll === true) {
    unsubAll(event);
  }
};
