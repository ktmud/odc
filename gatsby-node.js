const path = require(`path`);
const slash = require(`slash`);
const { paginate } = require('gatsby-awesome-pagination');

const filterPublished = (nodes) => {
  return process.env.NODE_ENV === 'production'
    ? nodes.filter((node) => node.status === 'publish')
    : nodes;
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // query content for WordPress posts
  const result = await graphql(`
    query PagesAndPosts {
      allWordpressPage {
        nodes {
          id
          slug
          path
          title
          status
        }
      }
      allWordpressPost {
        nodes {
          id
          slug
          path
          title
          status
          categories {
            slug
          }
          acf {
            venue_type {
              slug
            }
          }
        }
      }
    }
  `);

  const pages = filterPublished(result.data.allWordpressPage.nodes);
  const posts = filterPublished(result.data.allWordpressPost.nodes);

  const getTemplate = (pageType) => {
    return slash(path.resolve(`./src/templates/${pageType}.js`));
  };

  const create = (node) => {
    const { categories } = node;
    const isPage = !categories;
    const isProject =
      categories && categories.some((x) => x.slug === 'projects');
    const pageType = isPage ? 'page' : isProject ? 'project' : 'post';
    const tmpl = getTemplate(pageType);

    node.pageType = pageType;

    createPage({
      // will be the url for the page
      path: `${node.path}`,
      // specify the component template of your choice
      component: tmpl,
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: node.id,
      },
    });
  };

  posts.forEach(create);
  pages.forEach(create);

  const postsByCategory = {};
  const postsByVenueType = {};

  const collectToDict = (node, dict, items) => {
    if (!items) return;
    items.forEach((cat) => {
      if (!dict.hasOwnProperty(cat.slug)) {
        dict[cat.slug] = [];
      }
      dict[cat.slug].push(node);
    });
  };
  posts.forEach((node) => {
    collectToDict(node, postsByCategory, node.categories);
    if (node.acf) {
      collectToDict(node, postsByVenueType, node.acf.venue_type);
    }
  });

  const genIndexes = (dict, taxotype) => {
    // for category taxonomy, dont add a prefix, use the slug itself as the root subfolder
    const prefix = taxotype === 'category' ? '' : `/${taxotype}`;
    for (let [cat, items] of Object.entries(dict)) {
      paginate({
        createPage,
        items,
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) =>
          pageNumber === 0 ? `${prefix}/${cat}/` : `${prefix}/${cat}/page`,
        component: getTemplate(`${taxotype}-items`),
        context: {
          slug: cat,
        },
      });
    }
  };
  genIndexes(postsByCategory, 'category');
  genIndexes(postsByVenueType, 'program');
};
