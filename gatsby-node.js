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
      allWordpressCategory(filter: { count: { gt: 0 } }) {
        nodes {
          slug
          path
          parent_element {
            slug
          }
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
  const categories = result.data.allWordpressCategory.nodes;

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
      path: decodeURIComponent(`${node.path}`),
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

  // give each category a parent, and update add their path
  categories.forEach((node) => {
    if (node.parent_element) {
      postsByCategory[node.slug].parent = node.parent_element.slug;
    }
    postsByCategory[node.slug].path = (node.path || `/${node.slug}/`).replace(
      '/category/',
      '',
    );
  });

  const genIndexes = (dict, taxotype) => {
    for (let [key, items] of Object.entries(dict)) {
      const path = items.path || `/${taxotype}/${key}/`;
      paginate({
        createPage,
        items,
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) =>
          pageNumber === 0 ? `${path}` : `${path}/page`,
        component: getTemplate(`${taxotype}-items`),
        context: {
          slug: key,
          parent: items.parent || null,
        },
      });
    }
  };
  genIndexes(postsByCategory, 'category');
  genIndexes(postsByVenueType, 'tag');
};
