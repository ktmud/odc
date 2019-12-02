import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Pagination from '../components/pagination';
import ProjectList from '../components/projectlist';
import SEO from '../components/seo';
import TaxoNav from '../components/taxo-nav';

export default ({ data, pageContext, location }) => {
  const { nodes: posts } = data.allWordpressPost;
  const category = data.wordpressCategory;
  const { categoryChildren: kids, categorySiblings: siblings } = data;
  const { nodes: categories } = kids.nodes.length > 0 ? kids : siblings;
  return (
    <Layout className="list-page" location={location}>
      <SEO title={category.name} />
      <div className="container-full">
        <TaxoNav
          items={categories}
          toAll={{ path: '/projects/', name: '所有项目' }}
          taxotype="category"
        />
        <div className="chrono-list">
          <ProjectList items={posts} />
          <Pagination pageContext={pageContext} pathPrefix="/" />
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query CategoryPosts(
    $limit: Int!
    $skip: Int!
    $slug: String!
    $parent: String
  ) {
    categorySiblings: allWordpressCategory(
      filter: { count: { gt: 0 }, parent_element: { slug: { eq: $parent } } }
    ) {
      nodes {
        name
        slug
        path
        count
      }
    }
    categoryChildren: allWordpressCategory(
      filter: { count: { gt: 0 }, parent_element: { slug: { eq: $slug } } }
    ) {
      nodes {
        name
        slug
        path
        count
      }
    }
    wordpressCategory(slug: { eq: $slug }) {
      name
      count
    }
    allWordpressPost(
      sort: { fields: date, order: DESC }
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...PostImageFields
        ...PostListFields
      }
    }
  }
`;
