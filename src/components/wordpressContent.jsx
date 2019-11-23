import React from 'react';

export default ({ content, className }) => {
  return (
    <div
      className={`${className || 'entry-content'}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
