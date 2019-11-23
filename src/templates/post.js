import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

export default function PostPage({ data }) {
  const { wordpressPost: post } = data;
  const { title, content } = post;
  return (
    <Layout className="post-page">
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
        address
        client
        completed_on
        loc
        started_on
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
