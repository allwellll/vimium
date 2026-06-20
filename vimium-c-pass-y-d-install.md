# Vimium C 自定义构建

本构建基于 Vimium C 2.12.3，包含以下改动：

1. Visual mode 下 `有选中文本时 `y` / `d` 放行给页面和其他扩展。
   - `y` 可由 Web Highlight 扩展处理为“最近色高亮”。
   - `d` 可由 Web Highlight 扩展处理为“删除当前高亮”。
2. Visual mode 支持 `viw` / `vaw` / `vis` / `vip`：
   - `viw` / `vaw`：选中当前词。
   - `vis`：选中当前句子。
   - `vip`：选中当前段落。
   - 原有 `vas` / `vap` 仍保留。
3. 普通模式首次按 `v` 进入 caret / 光标模式；在 caret 模式中再次按 `v` 进入 visual / 选取模式。

## 安装

1. 打开 `chrome://extensions` 或 `edge://extensions`。
2. 开启“开发者模式”。
3. 停用官方 Vimium C，避免重复注入。
4. 点击“加载已解压的扩展程序”。
5. 选择目录：

```text
/Users/wangyaqi49/code_room/extention/vimium/vimium-c-pass-y-d
```

## 产物

```text
/Users/wangyaqi49/code_room/extention/vimium/vimium-c-pass-y-d
/Users/wangyaqi49/code_room/extention/vimium/vimium_c-pass-y-d-vis-vip-viw-vaw-caret-selected-2.12.3-chrome.zip
/Users/wangyaqi49/code_room/extention/vimium/vimium-c-pass-y-d-vis-vip-viw-vaw-caret-selected.patch
/Users/wangyaqi49/code_room/extention/vimium/vimium-c-source
```
