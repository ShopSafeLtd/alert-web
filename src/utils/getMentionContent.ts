const getMentionContent = (content: string) =>
  content.split(/(@\[.*?]\(.*?\))/).map((item) => {
    if (item.includes('@[')) {
      return item.replace('@[', '').replace(/(]\(.*?\))/, '');
    }
    return item;
  });
export default getMentionContent;
