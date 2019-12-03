import React from 'react';

const pics = [
  ['tiananshumacheng.svg', '天安数码城'],
  ['tiananzhongguo.png', '天安中国'],
  ['baifudongfang.svg', '百富东方'],
  ['huaqiaocheng.png', '华侨城'],
  ['biguiyuan.png', '碧桂园'],
  ['yuanyangjituan.png', '远洋集团'],
  ['pengguangda.svg', '鹏广达集团'],
  ['fenxiangtongxin.png', '分享通信'],
  ['gaoshishicai.svg', '高时石材'],
  ['gongyeshejicheng.svg', '广东工业设计城'],
];

export default () => {
  return (
    <div className="logo-wall">
      {pics.map(([filename, brandname]) => {
        const src = require(`../images/logo-wall/${filename}`);
        return <img alt="" className={`${filename.split('.')[0]}`} title={brandname} key={filename} src={src} />;
      })}
    </div>
  );
};
