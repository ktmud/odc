import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props;

    return (
      <section className="post-list">
        <div className="container">
          <h1>{title}</h1>
          {posts.map(({ node: post }) => (
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
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    date(formatString: "MMMM DD, YYYY")
    slug
    path
  }
`;
