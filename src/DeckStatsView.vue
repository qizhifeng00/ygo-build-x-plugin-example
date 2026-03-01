<template>
  <div class="deck-stats-plugin">
    <div class="stats-header">
      <h3>卡组统计</h3>
    </div>

    <div v-if="!deck" class="empty-state">
      <p>当前没有加载卡组</p>
    </div>

    <div v-else class="stats-content">
      <!-- 卡组基本信息 -->
      <div class="stat-section">
        <div class="stat-item">
          <span class="stat-label">卡组名称</span>
          <span class="stat-value">{{ deck.name }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">主卡组</span>
          <span class="stat-value">{{ deck.main.length }} 张</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">额外卡组</span>
          <span class="stat-value">{{ deck.extra.length }} 张</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">副卡组</span>
          <span class="stat-value">{{ deck.side.length }} 张</span>
        </div>
      </div>

      <!-- 卡片类型统计 -->
      <div class="stat-section">
        <h4>卡片类型分布</h4>
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="typeStats" class="type-stats">
          <div v-for="(count, type) in typeStats" :key="type" class="type-item">
            <span class="type-label">{{ type }}</span>
            <span class="type-count">{{ count }} 张</span>
            <div class="type-bar">
              <div
                class="type-bar-fill"
                :style="{ width: `${(count / deck.main.length) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button @click="refresh" class="btn-refresh">刷新统计</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import type { PluginContext } from '@ygo-build-x/plugin-sdk'

const context = inject<PluginContext>('pluginContext')
const deck = computed(() => context?.deck.getCurrent())
const loading = ref(false)
const typeStats = ref<Record<string, number> | null>(null)

async function loadTypeStats() {
  if (!deck.value || !context) return

  loading.value = true
  try {
    const cardIds = deck.value.main
    const cards = await context.cards.getByIds(cardIds)

    const stats: Record<string, number> = {}
    for (const card of cards) {
      const type = card.type || '未知'
      stats[type] = (stats[type] || 0) + 1
    }

    typeStats.value = stats
  } catch (error) {
    console.error('加载卡片统计失败:', error)
    context?.ui.notify({
      type: 'error',
      message: '加载统计数据失败',
      duration: 3000,
    })
  } finally {
    loading.value = false
  }
}

function refresh() {
  loadTypeStats()
  context?.ui.notify({
    type: 'success',
    message: '统计已刷新',
    duration: 2000,
  })
}

onMounted(() => {
  loadTypeStats()

  if (context) {
    context.deck.onChange(() => {
      loadTypeStats()
    })
  }
})
</script>

<style scoped>
.deck-stats-plugin {
  padding: 16px;
  background: var(--bg-primary, #ffffff);
}

.stats-header h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #37352f);
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: var(--text-secondary, #6b6b6b);
}

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stat-section {
  padding: 16px;
  background: var(--bg-secondary, #f7f6f3);
  border-radius: 6px;
}

.stat-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #37352f);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border, rgba(55, 53, 47, 0.09));
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary, #6b6b6b);
}

.stat-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #37352f);
}

.loading {
  padding: 16px;
  text-align: center;
  color: var(--text-secondary, #6b6b6b);
}

.type-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.type-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.type-label {
  font-size: 13px;
  color: var(--text-primary, #37352f);
}

.type-count {
  font-size: 12px;
  color: var(--text-secondary, #6b6b6b);
}

.type-bar {
  height: 6px;
  background: var(--bg-tertiary, #f1f1ef);
  border-radius: 3px;
  overflow: hidden;
}

.type-bar-fill {
  height: 100%;
  background: var(--accent, #2eaadc);
  transition: width 0.3s ease;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.btn-refresh {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--text-primary, #37352f);
  background: transparent;
  border: 1px solid var(--border, rgba(55, 53, 47, 0.16));
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-refresh:hover {
  background: var(--bg-hover, rgba(55, 53, 47, 0.08));
}
</style>
