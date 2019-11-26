import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = (props) => (
  <Layout {...props}>
    <SEO title="404: Not found" />
    <div className="container">
      <h1>404: 找不到</h1>
      <p>可惜，你要访问的页面已经不见了</p>
    </div>
  </Layout>
);

export default NotFoundPage;
