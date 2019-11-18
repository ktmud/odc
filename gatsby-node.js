const path = require(`path`);
const slash = require(`slash`);
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // query content for WordPress posts
  const result = await graphql(`
    query PagesAndPosts {
      allWordpressPage(filter: { status: { eq: "publish" } }) {
        nodes {
          id
          slug
          path
          title
        }
      }
      allWordpressPost {
        nodes {
          id
          slug
          path
          title
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

  const pages = result.data.allWordpressPage.nodes;
  const posts =
    process.env.NODE_ENV === 'production'
      ? result.data.allWordpressPost.nodes.filter(
          (node) => node.status === 'publish',
        )
      : result.data.allWordpressPost.nodes;

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
  const postsByTags = {};

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
    collectToDict(node, postsByTags, node.acf.venue_type);
  });

  const genIndexes = (dict, prefix, tmpl) => {
    for (let [cat, items] of Object.entries(dict)) {
      paginate({
        createPage,
        items,
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) =>
          pageNumber === 0 ? `${prefix}/${cat}/` : `${prefix}/${cat}/page`,
        component: tmpl(cat),
      });
    }
  };
  genIndexes(postsByCategory, '', (cat) =>
    getTemplate(`${cat === 'projects' ? cat : 'posts'}-list`),
  );
  genIndexes(postsByTags, '/tag', (cat) => getTemplate(`posts-list`));
};
