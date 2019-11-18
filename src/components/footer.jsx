import React from 'react';

const Footer = ({ meta }) => {
  return (
    <footer>
      <div className="container">
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} {meta.description}</p>
          <p>粤ICP备19118330号-1</p>
        </div>
        <div className="contact-info">
          <p>
            深圳市福田区
            <br />
            天安数码时代大厦A座2209
          </p>
          <p>
            Room 2209,Tiannan Cyber Times Building<br />
            Futian District, Shenzhen, China
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
