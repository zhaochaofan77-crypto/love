(function (root, factory) {
  const value = factory();
  if (typeof module === 'object' && module.exports) module.exports = value;
  root.LELE_CONTENT = value;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return {
    stationTitle: '乐乐快乐补给站',
    welcomeEyebrow: 'FOR PRINCESS LELE',
    stationEyebrow: 'GOOD THINGS ARE COMING',
    intro: '这里收集着一些，正在向乐乐靠近的好事。',
    cards: [
      {
        id: 'card-1',
        emoji: '💗',
        label: '好事靠近',
        message: '烦恼暂时静音，好事正在靠近。'
      },
      {
        id: 'card-2',
        emoji: '🌷',
        label: '一路生花',
        message: '乐乐期待的美好，都在一点一点来到身边。'
      },
      {
        id: 'card-3',
        emoji: '✨',
        label: '越来越好',
        message: '所有认真走过的路，都会开出漂亮的花。'
      },
      {
        id: 'card-4',
        emoji: '💄',
        label: '期待成真',
        message: '接下来的日子，会有更多惊喜值得期待。'
      },
      {
        id: 'card-5',
        emoji: '👸🏻',
        label: '乐乐闪耀',
        message: '生活正在悄悄变好，乐乐也会越来越闪耀。'
      },
      {
        id: 'card-6',
        emoji: '💫',
        label: '未来可期',
        message: '往后的每一页，都会比上一页更精彩。'
      }
    ],
    completion: '好事不会缺席，美好正在路上。乐乐小公主，继续带着期待往前走吧，你喜欢的生活也正在向你靠近。'
  };
});
