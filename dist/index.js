import { definePlugin as f } from "@ygo-build-x/plugin-sdk";
import { defineComponent as g, inject as h, computed as k, ref as _, onMounted as b, openBlock as o, createElementBlock as n, createElementVNode as s, toDisplayString as i, Fragment as w, renderList as C, normalizeStyle as S, createCommentVNode as V } from "vue";
const x = { class: "deck-stats-plugin" }, B = {
  key: 0,
  class: "empty-state"
}, D = {
  key: 1,
  class: "stats-content"
}, I = { class: "stat-section" }, M = { class: "stat-item" }, N = { class: "stat-value" }, E = { class: "stat-item" }, j = { class: "stat-value" }, z = { class: "stat-item" }, F = { class: "stat-value" }, L = { class: "stat-item" }, O = { class: "stat-value" }, P = { class: "stat-section" }, T = {
  key: 0,
  class: "loading"
}, Y = {
  key: 1,
  class: "type-stats"
}, $ = { class: "type-label" }, q = { class: "type-count" }, A = { class: "type-bar" }, G = /* @__PURE__ */ g({
  __name: "DeckStatsView",
  setup(p) {
    const e = h("pluginContext"), a = k(() => e == null ? void 0 : e.deck.getCurrent()), d = _(!1), c = _(null);
    async function v() {
      if (!(!a.value || !e)) {
        d.value = !0;
        try {
          const r = a.value.main, t = await e.cards.getByIds(r), l = {};
          for (const u of t) {
            const m = u.type || "未知";
            l[m] = (l[m] || 0) + 1;
          }
          c.value = l;
        } catch (r) {
          console.error("加载卡片统计失败:", r), e == null || e.ui.notify({
            type: "error",
            message: "加载统计数据失败",
            duration: 3e3
          });
        } finally {
          d.value = !1;
        }
      }
    }
    function y() {
      v(), e == null || e.ui.notify({
        type: "success",
        message: "统计已刷新",
        duration: 2e3
      });
    }
    return b(() => {
      v(), e && e.deck.onChange(() => {
        v();
      });
    }), (r, t) => (o(), n("div", x, [
      t[6] || (t[6] = s("div", { class: "stats-header" }, [
        s("h3", null, "卡组统计")
      ], -1)),
      a.value ? (o(), n("div", D, [
        s("div", I, [
          s("div", M, [
            t[1] || (t[1] = s("span", { class: "stat-label" }, "卡组名称", -1)),
            s("span", N, i(a.value.name), 1)
          ]),
          s("div", E, [
            t[2] || (t[2] = s("span", { class: "stat-label" }, "主卡组", -1)),
            s("span", j, i(a.value.main.length) + " 张", 1)
          ]),
          s("div", z, [
            t[3] || (t[3] = s("span", { class: "stat-label" }, "额外卡组", -1)),
            s("span", F, i(a.value.extra.length) + " 张", 1)
          ]),
          s("div", L, [
            t[4] || (t[4] = s("span", { class: "stat-label" }, "副卡组", -1)),
            s("span", O, i(a.value.side.length) + " 张", 1)
          ])
        ]),
        s("div", P, [
          t[5] || (t[5] = s("h4", null, "卡片类型分布", -1)),
          d.value ? (o(), n("div", T, "加载中...")) : c.value ? (o(), n("div", Y, [
            (o(!0), n(w, null, C(c.value, (l, u) => (o(), n("div", {
              key: u,
              class: "type-item"
            }, [
              s("span", $, i(u), 1),
              s("span", q, i(l) + " 张", 1),
              s("div", A, [
                s("div", {
                  class: "type-bar-fill",
                  style: S({ width: `${l / a.value.main.length * 100}%` })
                }, null, 4)
              ])
            ]))), 128))
          ])) : V("", !0)
        ]),
        s("div", { class: "actions" }, [
          s("button", {
            onClick: y,
            class: "btn-refresh"
          }, "刷新统计")
        ])
      ])) : (o(), n("div", B, [...t[0] || (t[0] = [
        s("p", null, "当前没有加载卡组", -1)
      ])]))
    ]));
  }
}), H = (p, e) => {
  const a = p.__vccOpts || p;
  for (const [d, c] of e)
    a[d] = c;
  return a;
}, J = /* @__PURE__ */ H(G, [["__scopeId", "data-v-ef5c054b"]]), R = f({
  meta: {
    id: "@example/deck-stats",
    name: "卡组统计",
    version: "1.0.0",
    description: "显示当前卡组的详细统计信息",
    author: {
      name: "Your Name",
      email: "your.email@example.com",
      url: "https://github.com/your-name"
    },
    icon: "📊",
    keywords: ["statistics", "deck", "analysis"],
    type: "calculator",
    permissions: ["cards.read", "deck.read", "ui.sidebar", "ui.notify"],
    displayMode: "sidebar"
  },
  setup() {
    return console.log("卡组统计插件已加载"), {
      views: [
        {
          id: "deck-stats-view",
          title: "卡组统计",
          component: J,
          displayMode: "sidebar",
          sidebar: {
            icon: "📊",
            order: 100,
            group: "calculator"
          }
        }
      ]
    };
  },
  teardown() {
    console.log("卡组统计插件已卸载");
  }
});
export {
  R as default
};
