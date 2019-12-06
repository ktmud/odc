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
  return items.map(({ title, featured_media: image, path }) => {
    const { width, height } = image
      ? image.media_details.sizes.full
      : { width: 400, height: 300 };
    return {
      title,
      image,
      path,
      width,
      height,
    };
  });
};
