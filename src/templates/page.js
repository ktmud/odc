import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import WordpressContent from '../components/wordpressContent';
import SEO from '../components/seo';
import BaiduMap from '../components/baidumap';
import H1 from '../components/h1';

const loc = {
  lng: 114.038778,
  lat: 22.541259,
  width: 240,
  height: 80,
  icon: require('../images/odc-marker.svg'),
  placeId: '4ea3f2f1c3ef9ed7afcb668b', // baidu place UID
  invokeURI: true,
  title: '城像设计顾问（深圳）有限公司',
  content: `
  深圳市福田区天安数码时代大厦A座2209 <br>
  电话：+86-755-23823639 <br>
  Email：office@odcstudios.com
  `,
};

export const ContactPageContent = ({ content, title }) => {
  return (
    <>
      <H1 className="title inline-title" title={title} />
      <div className="grid">
        <div className="col-md-5">
          <WordpressContent className="content" content={content} />
        </div>
        <div className="col-md-7">
          <BaiduMap center={loc} markers={[loc]} />
        </div>
      </div>
    </>
  );
};

export const PageTemplate = ({ title, content, slug }) => {
  return (
    <div className="container">
      {slug === 'contact' ? (
        <ContactPageContent content={content} title={title} />
      ) : (
        <>
          <div className="entry-content">
            <H1 className="title inline-title" title={title} />
            <span></span>
          </div>
          <WordpressContent content={content} />
        </>
      )}
    </div>
  );
};

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  slug: PropTypes.string,
};

const Page = ({ data, location }) => {
  const { wordpressPage: page } = data;

  return (
    <Layout className="post-page" location={location}>
      <SEO title={page.title} />
      <PageTemplate {...page} />
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
      slug
    }
  }
`;
