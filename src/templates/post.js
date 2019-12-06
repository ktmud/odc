import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import WordpressContent from '../components/wordpressContent';
import SEO from '../components/seo';

export default function PostPage({ data, location }) {
  const { wordpressPost: post } = data;
  const { title, content } = post;
  return (
    <Layout className="post-page" location={location}>
      <SEO title={title} />
      <div className="container">
        <h1 className="title">{title}</h1>
        <WordpressContent content={content} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      acf {
        client
        completed_on
        started_on
        loc
        scale
      }
      type
      title
      sticky
      slug
      status
      path
      modified
      link
      format
      date
      content
      categories {
        slug
        name
      }
    }
  }
`;
