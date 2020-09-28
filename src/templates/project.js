import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import WordpressContent from '../components/wordpressContent';
import SEO from '../components/seo';
import H1 from '../components/h1';
import { wpFluid } from '../utils';

const acfFields = [
  ['venue_type', '场所类型'],
  ['client', '业主'],
  ['loc', '位置'],
  ['scale', '项目规模'],
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
  const filteredCategories =
    categories &&
    categories
      .filter(({ parent_element: parent }) => {
        return parent && parent.slug === 'projects';
      })
      .map(({ path, name }) => ({
        path: path.replace('/category', ''),
        name,
      }));

  return (
    <>
      {image ? (
        <Img
          className="hero-image"
          fluid={wpFluid(image)}
          alt={image.alt_text}
          title={image.title}
        />
      ) : null}
      <div className="entry">
        <div className="entry-content">
          <H1 title={title} />
          <div className="project-details">
            <table>
              <tbody>
                {filteredCategories && filteredCategories.length > 0 ? (
                  <tr key="categories">
                    <th>项目类型</th>
                    <td>
                      {filteredCategories.map(({ path, name }) => {
                        return (
                          <Fragment key={path}>
                            {/* <a>{tag.name}</a> */}
                            <Link to={path}>{name}</Link>
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
        client
        started_on
        completed_on
        venue_type {
          name
          slug
        }
        loc
        scale
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
        path
        slug
        name
        parent_element {
          slug
        }
      }
    }
  }
`;
