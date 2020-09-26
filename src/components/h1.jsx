import React from 'react';

export default ({ title, className = 'title' }) => {
  const tmp = title.split(' / ');
  if (tmp.length === 2) {
    title = `<span class="zh">${tmp[0]}</span> <span class="en">${tmp[1]}</span>`;
  }
  return (
    <h1 className={className} dangerouslySetInnerHTML={{ __html: title }} />
  );
};
