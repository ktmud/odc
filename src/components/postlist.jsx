import React from 'react';
import { Link, graphql } from 'gatsby';

export default ({ posts, title }) => {
  return (
    <section className="post-list">
      <div className="container">
        <h1>{title}</h1>
        {posts.map(post => (
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
      </div>
    </section>
  );
};

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    date
    slug
    path
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
