import React from 'react';
import CookieMessage from '../index.es6';
import reactCookie from 'react-cookie';
import { stub, spy } from 'sinon';

describe('CookieMessage component', () => {
  it('is compatible with React.Component', () => {
    CookieMessage.should.be.a('function').and.respondTo('render');
  });
  it('renders a React element', () => {
    React.isValidElement(
      <CookieMessage/>
    ).should.equal(true);
  });
  describe('cookie', () => {
    function renderCookieMessage(reactCookieInstance) {
      return React.renderToString(
        <CookieMessage reactCookieInstance={reactCookieInstance}/>
      );
    }
    const cookieName = 'ec_cookie_message_0';
    let cookie = null;
    beforeEach(() => {
      cookie = Object.create(reactCookie);
    });
    afterEach(() => {
      /* eslint-disable brace-style */
      if (cookie.load.restore) { cookie.load.restore(); }
      if (cookie.save.restore) { cookie.save.restore(); }
    });
    it('is set if no cookie present', () => {
      stub(cookie, 'load').returns(false);
      spy(cookie, 'save');
      renderCookieMessage(cookie);
      cookie.save.calledWith(cookieName).should.equal(true);
    });
    it('is not set if it exists', () => {
      stub(cookie, 'load').returns(true);
      spy(cookie, 'save');
      renderCookieMessage(cookie);
      cookie.save.called.should.equal(false);
    });
    it('does not return a message if the cookie exists', () => {
      stub(cookie, 'load').returns(true);
      const cookieMessageRenderedString = renderCookieMessage(cookie);
      cookieMessageRenderedString.should.contain('<noscript');
      cookieMessageRenderedString.should.not.contain('cookie');
    });
  });
});
