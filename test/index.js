import React from 'react';
import CookieMessage from '../index.es6';
import reactCookie from 'react-cookie';
import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();

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
      chai.spy.on(cookie, 'load', () => false);
      chai.spy.on(cookie, 'save');
      renderCookieMessage(cookie);
      cookie.save.should.have.been.called.with(cookieName);
    });
    it('is not set if it exists', () => {
      chai.spy.on(cookie, 'load', () => true);
      renderCookieMessage(cookie);
      cookie.save.should.not.have.been.called();
    });
    it('does not return a message if the cookie exists', () => {
      chai.spy.on(cookie, 'load', () => true);
      const cookieMessageRenderedString = renderCookieMessage(cookie);
      cookieMessageRenderedString.should.contain('<noscript');
      cookieMessageRenderedString.should.not.contain('cookie');
    });
  });
});
