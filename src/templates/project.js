import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import WordpressContent from '../components/wordpressContent';
import SEO from '../components/seo';

const acfFields = [
  ['venue_type', '场所类型'],
  ['loc', '地址'],
  ['started_on', '项目开始时间'],
  ['completed_on', '项目完成时间'],
];

export const ProjectPage = ({
  title,
  content,
  acf,
  categories,
  featured_media: image,
}) => {
  const getFieldVal = (field) => {
    if (field === 'venue_type') {
      const tags = acf[field];
      return tags.map((tag) => {
        return (
          <Fragment key={tag.slug}>
            {/* <a>{tag.name}</a> */}
            <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
            <span className="sep">/</span>
          </Fragment>
        );
      });
    }
    return acf[field];
  };
  const filteredCategories = categories && categories.filter(({ slug }) => {
    return slug !== 'uncategoried' && slug !== 'projects';
  });

  return (
    <>
      {image ? (
        <Img
          className="hero-image"
          fluid={image.localFile.childImageSharp.fluid}
          alt={image.alt_text}
          title={image.title}
        />
      ) : null}
      <div className="entry">
        <h1 className="title">{title}</h1>
        <div className="project-details">
          <table>
            <tbody>
              {filteredCategories ? (
                <tr key="categories">
                  <th>项目类型</th>
                  <td>
                    {filteredCategories.map(({ slug, name }) => {
                      return (
                        <Fragment key={slug}>
                          {/* <a>{tag.name}</a> */}
                          <Link to={`/${slug}/`}>{name}</Link>
                          <span className="sep">/</span>
                        </Fragment>
                      );
                    })}
                  </td>
                </tr>
              ) : null}
              {acfFields.map(([field, name]) => {
                if (!acf[field]) return;
                return (
                  <tr key={field}>
                    <th>{name}</th>
                    <td>{getFieldVal(field)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <WordpressContent content={content} />
      </div>
    </>
  );
};

ProjectPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

const Page = ({ data, location }) => {
  const { wordpressPost: page } = data;

  return (
    <Layout className="post-page project-page" location={location}>
      <SEO title={page.title} />
      <ProjectPage {...page} />
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Page;

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      acf {
        address
        client
        completed_on
        loc
        venue_type {
          name
          slug
        }
        started_on
      }
      ...PostImageFields
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
      excerpt
      categories {
        slug
        name
      }
    }
  }
`;
