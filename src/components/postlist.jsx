import React from 'react';
import { Link, graphql } from 'gatsby';

export default ({ posts, title }) => {
  return (
    <section className="post-list">
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      {posts.map((post) => (
        <Link key={post.id} className="content" to={post.path}>
          <h3>{post.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.replace(/<p class="link-more.*/, ''),
            }}
          />
          <span className="button read-more" to={post.slug}>
            &raquo; 阅读更多
          </span>
        </Link>
      ))}
    </section>
  );
};

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    sticky
    title
    excerpt
    date
    modified
    slug
    path
    # acf {
    #   address
    #   client
    #   completed_on
    #   loc
    #   started_on
    # }
    categories {
      name
      slug
    }
    tags {
      name
      slug
    }
  }
`;
