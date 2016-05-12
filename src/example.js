import React from 'react';
import CookieMessage from './';
const emptyFunction = Function.prototype;
// this ensures the cookie is never written
const fakeCookie = {
  load: emptyFunction,
  save: emptyFunction,
};
export default (
  <CookieMessage reactCookieInstance={fakeCookie} />
);
