# Vimium C 自定义构建

本仓库保存基于 Vimium C 2.12.3 的自定义构建，用于配合本地 Web Highlight 标注扩展使用。

## 更新时间

- 2026-06-25 CST

## 改动说明

1. **Visual mode 放行 `d` / `m` / `1-5`**
   - 在 Vimium C visual mode 中，未输入数字前缀或组合前缀，且当前有选中文本时，`d`、`m`、`1`、`2`、`3`、`4`、`5` 不再由 Vimium C 消费。
   - 这些按键会 pass through 给页面和其他扩展，不需要在 Vimium C 的排除按键里配置。
   - `y` 不再放行，保留 Vimium C 原本的复制 / yank 功能。
   - 没有选中文本时，以上按键保持 Vimium C 原有行为，不会全站失效。
   - 配合 Web Highlight 扩展后：
     - `d`：删除当前 Vimium 光标 / 选区所在的高亮标记。
     - `m`：交给页面或 Web Highlight 扩展处理当前选区。
     - `1-5`：使用对应编号的高亮颜色标注当前选区。

2. **支持 Vim 风格 text object**
   - `viw` / `vaw`：按当前光标所在文本节点的词边界选中当前词。
   - `vis`：选中当前句子。
   - `vip`：选中当前段落。
   - 原有 `vas` / `vap` 保持可用。

3. **大写 `W` / `E` / `B` 片段移动**
   - 小写 `w` / `e` / `b` 保持原来的词维度。
   - 大写 `W` / `E` / `B` 按标点和符号分隔的句子片段移动，空格不作为边界。

4. **调整 `v` 进入模式**
   - 普通模式首次按 `v`：进入 caret / 光标模式。
   - caret 模式中再次按 `v`：切换到 visual / 选取模式。

## 目录结构

```text
vimium-c-source/                         # 修改后的 Vimium C 源码
vimium-c-pass-y-d/                       # 已构建、可直接加载的扩展目录
vimium-c-punctuation-only-segment-2026-06-20.zip
vimium-c-pass-y-d-vis-vip-viw-vaw-caret-selected.patch          # 本次完整补丁
vimium-c-pass-y-d.patch                # 早期仅 y/d 放行补丁
vimium-c-pass-y-d-install.md             # 本地安装说明
```

## 安装方式

1. 打开 `chrome://extensions` 或 `edge://extensions`。
2. 开启“开发者模式”。
3. 停用官方 Vimium C，避免重复注入。
4. 点击“加载已解压的扩展程序”。
5. 选择目录：

```text
vimium-c-pass-y-d
```

## 构建方式

```bash
cd vimium-c-source
npm install --registry=https://registry.npmjs.org/
npm run chrome
```

构建后会生成 Chrome 版本 zip，可重新解压同步到 `vimium-c-pass-y-d/`。
