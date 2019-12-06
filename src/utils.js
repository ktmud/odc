
export const wpFluid = (image) => {
  let fluid = {
    aspectRatio: 1,
    base64: '',
    sizes: '',
    src: '',
    srcSet: ''
  };
  if (image.localFile) {
    fluid = image.localFile.childImageSharp.fluid;
    fluid.sizes = '(max-width: 1960px) 100vw, 1960px';
    fluid.srcSet = Object.entries(image.media_details.sizes)
      .map(([_, { source_url, width }]) => {
        return `${source_url} ${width}w`;
      })
      .join(', ');
    fluid.src = image.media_details.sizes.full.source_url;
  }
  return fluid;
};
