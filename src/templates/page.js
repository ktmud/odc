import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

export const PageTemplate = ({ title, content }) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

const Page = ({ data }) => {
  const { wordpressPage: page } = data;

  return (
    <Layout className="post-page">
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
    }
  }
`;
