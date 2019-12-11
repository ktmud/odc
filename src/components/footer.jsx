import React from 'react';
import Logo from '../images/odc-logo.svg';

const Footer = ({ meta }) => {
  return (
    <footer>
      <img className="logo-icon" src={Logo} alt="" />
      <div className="container">
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} {meta.description} &nbsp;
            <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备19118330号-1</a>
          </p>
        </div>
        <div className="contact-info">
          <p>
            深圳市 福田区
            天安数码时代大厦A座2209
          </p>
          <p>
            Room 2209, Tiannan Cyber Times Building
            <br />
            Futian District, Shenzhen, China
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
