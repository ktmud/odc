import pinyin from 'pinyin';

export const slugify = (words) => {
  return pinyin(words, { style: pinyin.STYLE_NORMAL })
    .join('')
    .replace(' ', '-');
};
