import React from 'react';
import CookieMessage from './';

// this ensures the cookie is never written
const fakeCookie = {
  load: () => {},
  save: () => {},
};
export default (
  <CookieMessage reactCookieInstance={fakeCookie}/>
);
