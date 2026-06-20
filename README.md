# Vimium C 自定义构建

本仓库保存基于 Vimium C 2.12.3 的自定义构建，用于配合本地 Web Highlight 标注扩展使用。

## 更新时间

- 2026-06-20 10:31 CST

## 改动说明

1. **Visual mode 放行 `y` / `d`**
   - 在 Vimium C visual mode 中，未输入数字前缀或组合前缀时，`y` 和 `d` 不再由 Vimium C 消费。
   - 这两个按键会继续冒泡给页面和其他扩展。
   - 配合 Web Highlight 扩展后：
     - `y`：使用最近一次高亮颜色标注当前选区。
     - `d`：删除当前 Vimium 光标 / 选区所在的高亮标记。

2. **支持 Vim 风格 text object**
   - `viw` / `vaw`：选中当前词。
   - `vis`：选中当前句子。
   - `vip`：选中当前段落。
   - 原有 `vas` / `vap` 保持可用。

3. **调整 `v` 进入模式**
   - 普通模式首次按 `v`：进入 caret / 光标模式。
   - caret 模式中再次按 `v`：切换到 visual / 选取模式。

## 目录结构

```text
vimium-c-source/                         # 修改后的 Vimium C 源码
vimium-c-pass-y-d/                       # 已构建、可直接加载的扩展目录
vimium_c-pass-y-d-vis-vip-viw-vaw-caret-2.12.3-chrome.zip
vimium-c-pass-y-d-vis-vip-viw-vaw-caret.patch          # 本次完整补丁
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
