import { definePlugin } from '@ygo-build-x/plugin-sdk'
import DeckStatsView from './DeckStatsView.vue'

export default definePlugin({
  meta: {
    id: '@example/deck-stats',
    name: '卡组统计',
    version: '1.0.0',
    description: '显示当前卡组的详细统计信息',
    author: {
      name: 'Your Name',
      email: 'your.email@example.com',
      url: 'https://github.com/your-name',
    },
    icon: '📊',
    keywords: ['statistics', 'deck', 'analysis'],
    type: 'calculator',
    permissions: ['cards.read', 'deck.read', 'ui.sidebar'],
    displayMode: 'sidebar',
  },

  setup() {
    console.log('卡组统计插件已加载')

    return {
      views: [
        {
          id: 'deck-stats-view',
          title: '卡组统计',
          component: DeckStatsView,
          displayMode: 'sidebar',
          sidebar: {
            icon: '📊',
            order: 100,
            group: 'calculator',
          },
        },
      ],
    }
  },

  teardown() {
    console.log('卡组统计插件已卸载')
  },
})
