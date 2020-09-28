import React from 'react';
import Logo from '../images/odc-logo.svg';
import Img from 'gatsby-image';

const Footer = ({ meta, beianImage }) => {
  return (
    <footer>
      <img className="logo-icon" src={Logo} alt="" />
      <div className="container">
        <div className="copyright">
          &copy; {new Date().getFullYear()} {meta.description} &nbsp;
          <span className="beian">
            <a href="http://beian.miit.gov.cn/" target="beian">
              粤ICP备19118330号
            </a>
            <a
              target="beian"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030402003504"
            >
              <Img fixed={beianImage} />
              <span>粤公网安备44030402003504号</span>
            </a>
          </span>
        </div>
        <div className="contact-info">
          <p>深圳市 福田区 天安数码时代大厦A座2209</p>
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
