export const wpFluid = (image) => {
  let fluid = {
    aspectRatio: 1,
    base64: '',
    sizes: '',
    src: 'about:blank',
    srcSet: '',
  };
  if (image.localFile) {
    fluid = image.localFile.childImageSharp.fluid;
    fluid.sizes = '(max-width: 1960px) 100vw, 1960px';
    fluid.srcSet = Object.entries(image.media_details.sizes)
      .filter((x) => x.width > 0)
      .map(([_, vals]) => {
        if (vals) {
          const { source_url, width } = vals;
          return `${source_url} ${width}w`;
        }
        return '';
      })
      .join(', ');
    if (image.media_details.sizes.full) {
      fluid.src = image.media_details.sizes.full.source_url;
    } else {
      fluid.src = fluid.base64;
    }
  }
  return fluid;
};

export const photoList = (items) => {
  return items.map(({ title, path, sticky, featured_media: image }) => {
    let width = 400;
    let height = 300;
    if (image && image.localFile) {
      width = image.localFile.childImageSharp.fluid.aspectRatio;
      height = 1;
    }
    console.log(width, height);
    return {
      title,
      path,
      sticky,
      image,
      width,
      height,
    };
  });
};
