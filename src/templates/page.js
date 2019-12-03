import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import WordpressContent from '../components/wordpressContent';
import SEO from '../components/seo';

export const PageTemplate = ({ title, content, slug }) => {
  return (
    <div className="container">
      <SEO title={title} />
      <h1 className="title">{title}</h1>
      <WordpressContent className="content" content={content} slug={slug} />
    </div>
  );
};

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

const Page = ({ data, location }) => {
  const { wordpressPage: page } = data;

  return (
    <Layout className="post-page" location={location}>
      <PageTemplate title={page.title} content={page.content} />
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Page;

export const query = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      path
      slug
    }
  }
`;
