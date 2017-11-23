/* global window document */
import React from 'react';
import PropTypes from 'prop-types';
import reactCookie from 'react-cookie';
import Icon from '@economist/component-icon';

export default class CookieMessage extends React.Component {

  static get defaultProps() {
    return {
      cookieName: 'ec_cookie_message_0',
      reactCookieInstance: reactCookie,
    };
  }

  constructor(...args) {
    super(...args);
    this.state = {
      isCookieMessageRequired: false,
    };
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  componentDidMount() {
    const cookie = this.props.reactCookieInstance;
    const isCookieMessageRequired = !cookie.load(this.props.cookieName);
    /* eslint-disable */
    this.setState({ isCookieMessageRequired });
    /* eslint-enable */
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

    if (typeof window !== 'undefined' && window.document) {
      const trusteScript = document.createElement('script');
      trusteScript.async = true;
      trusteScript.type = 'text/javascript';
      trusteScript.src = '//consent.truste.com/notice?domain=economist.com&c=teconsent-preferences&text=true';
      document.head.appendChild(trusteScript);
    }
  }

  handleCloseClick() {
    this.setState({ isCookieMessageRequired: false });
  }

  render() {
    if (!this.state.isCookieMessageRequired) {
      return null;
    }

    const closeButtonProps = {
      className: 'cookie-message--close-wrapper',
      tabIndex: 0,
      role: 'button',
      onClick: this.handleCloseClick,
      children: <Icon icon="close" className="cookie-message--close" />,
    };
    const closeButton = this.props.renderCloseButton ? this.props.renderCloseButton(closeButtonProps) : (
      <span {...closeButtonProps}></span>
    );

    const policyLinkProps = {
      className: 'cookie-message--link cookie-message--link__policy',
      href: '//www.economist.com/cookies-info',
      children: 'cookies policy',
    };
    const policyLink = this.props.renderPolicyLink ? this.props.renderPolicyLink(policyLinkProps) : (
      <a {...policyLinkProps}></a>
    );

    const preferencesLinkProps = {
      className: 'cookie-message--link-preferences cookie-message--link',
      id: 'teconsent-preferences',
      children: <a href="//www.economist.com/cookies-info"
        className="cookie-message--link cookie-message__link--temporary-cookie-preferences"
                >
          cookies preferences
        </a>,
    };
    const preferencesLink = this.props.renderPreferencesLink ?
      this.props.renderPreferencesLink(preferencesLinkProps) : (<span {...preferencesLinkProps}></span>);
    return (
      <div className="cookie-message">
        <div className="cookie-message--message-container">
          {closeButton}
          By continuing to browse this site you permit us and our partners to place identification
          cookies on your browser and agree to our use of cookies.
          Review our {policyLink} for details or change your {preferencesLink}.
        </div>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  CookieMessage.propTypes = {
    cookieName: PropTypes.string,
    reactCookieInstance: PropTypes.shape({
      load: PropTypes.func.isRequired,
      save: PropTypes.func.isRequired,
    }),
    renderCloseButton: PropTypes.func,
    renderPolicyLink: PropTypes.func,
    renderPreferencesLink: PropTypes.func,
  };
}
