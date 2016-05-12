/* global window document */
import React from 'react';
import reactCookie from 'react-cookie';
import Icon from '@economist/component-icon';

export default class CookieMessage extends React.Component {
  static get propTypes() {
    return {
      cookieName: React.PropTypes.string,
      reactCookieInstance: React.PropTypes.object,
    };
  }
  static get defaultProps() {
    return {
      cookieName: 'ec_cookie_message_0',
      reactCookieInstance: reactCookie,
    };
  }
  componentWillMount() {
    if (typeof window === 'undefined') {
      this.setState({ isCookieMessageRequired: false });
      return false;
    }
    const cookie = this.props.reactCookieInstance;
    const isCookieMessageRequired = !cookie.load(this.props.cookieName);
    this.setState({ isCookieMessageRequired });
    if (isCookieMessageRequired) {
      const isHttps = window.location.protocol === 'https:';
      const cookieOptions = {
        expires: new Date('01-01-2040'),
        secure: isHttps,
        httpOnly: false,
        path: '/',
      };
      cookie.save(this.props.cookieName, '1', cookieOptions);
    }
  }
  componentDidMount() {
    if (typeof window !== 'undefined' && window.document) {
      const trusteScript = document.createElement('script');
      trusteScript.async = true;
      trusteScript.type = 'text/javascript';
      trusteScript.src = '//consent.truste.com/notice?domain=economist.com&c=teconsent-preferences&text=true';
      document.head.appendChild(trusteScript);
    }
  }
  onCloseClick() {
    this.setState({ isCookieMessageRequired: false });
  }
  render() {
    if (!this.state.isCookieMessageRequired) {
      return false;
    }

    const policyLink = (
      <a href="//www.economist.com/cookies-info"
        className="cookie-message--link cookie-message--link__policy"
      >
        cookies policy
      </a>
    );
    const preferencesLink = (
      <span id="teconsent-preferences"
        className="cookie-message--link__preferences cookie-message--link"
      >
        <a href="//www.economist.com/cookies-info"
          className="cookie-message--link
          cookie-message__link--temporary-cookie-preferences"
        >
          cookies preferences
        </a>
      </span>
    );
    return (
      <div className="cookie-message">
        <div className="cookie-message--message-container">
          <span onClick={() => this.onCloseClick()}
            className="cookie-message--close-wrapper"
            tabIndex={0}
          >
            <Icon icon="close" className="cookie-message--close" />
          </span>
          By continuing to browse this site you are agreeing to our use of cookies.
          Review our {policyLink} for details or change your {preferencesLink}.
        </div>
      </div>
    );
  }
}
