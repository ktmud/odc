import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

const acfFields = [
  ['loc', '地址'],
  ['started_on', '项目开始时间'],
  ['completed_on', '项目完成时间'],
  ['venue_type', '项目类型'],
];

export const ProjectPage = ({ title, content, acf }) => {
  const getFieldVal = (field) => {
    if (field === 'venue_type') {
      const tags = acf[field];
      return tags.map((tag) => {
        return (
          <Fragment key={tag.slug}>
            <a>{tag.name}</a>
            {/* <Link to={`/tag/${tag.slug}`}>{tag.name}</Link> */}
            <span className="sep">/</span>
          </Fragment>
        );
      });
    }
    return acf[field];
  };
  const image = acf.feature_image;

  return (
    <>
      {image ? (
        <Img className="hero-image"
          fluid={image.localFile.childImageSharp.fluid}
          alt={image.alt_text}
          title={image.title}
        />
      ) : null}
      <div className="container">
        <h1 className="title">{title}</h1>
        <div className="project-details">
          <table>
            <tbody>
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
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
};

ProjectPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

const Page = ({ data }) => {
  const { wordpressPost: page } = data;

  return (
    <Layout className="post-page project-page">
      <ProjectPage title={page.title} content={page.content} acf={page.acf} />
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
        feature_image {
          alt_text
          caption
          source_url
          title
          localFile {
            childImageSharp {
              fluid(jpegProgressive: true, fit: COVER) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
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
