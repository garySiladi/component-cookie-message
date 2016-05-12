import React from 'react';
import { renderToString } from 'react-dom/server';
import CookieMessage from '../src';
import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();

describe('CookieMessage component', () => {
  it('is compatible with React.Component', () => {
    CookieMessage.should.be.a('function').and.respondTo('render');
  });
  it('renders a React element', () => {
    React.isValidElement(
      <CookieMessage />
    ).should.equal(true);
  });
  describe('cookie', () => {
    function renderCookieMessage(reactCookieInstance) {
      return renderToString(
        <CookieMessage reactCookieInstance={reactCookieInstance} />
      );
    }
    const cookieName = 'ec_cookie_message_0';
    let cookie = null;
    beforeEach(() => {
      cookie = {
        load: chai.spy(() => false),
        save: chai.spy('save'),
      };
    });
    it('is set if no cookie present', () => {
      renderCookieMessage(cookie);
      cookie.save.should.have.been.called.with(cookieName);
    });
    it('is not set if it exists', () => {
      cookie.load = chai.spy(() => true);
      renderCookieMessage(cookie);
      cookie.save.should.not.have.been.called();
    });
    it('does not return a message if the cookie exists', () => {
      cookie.load = chai.spy(() => true);
      const cookieMessageRenderedString = renderCookieMessage(cookie);
      cookieMessageRenderedString.should.not.contain('cookie');
    });
  });
});
