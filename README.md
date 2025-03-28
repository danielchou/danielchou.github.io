# DanielChou 的個人網站

這是我的個人網站專案，使用 MkDocs 建置，並通過 GitHub Pages 發布。

## 專案結構

```
danielchou.github.io/
├── docs/                # 網站內容（Markdown 文件）
│   ├── assets/         # 圖片等資源文件
│   ├── index.md        # 首頁
│   ├── aboutme.md      # 關於我
│   └── portfolio.md    # 作品集
├── overrides/          # MkDocs 主題客製化
│   ├── assets/        # 主題資源
│   └── partials/      # 主題組件
├── .github/workflows/  # GitHub Actions 配置
│   └── ci.yml         # 自動部署工作流程
└── mkdocs.yml         # MkDocs 配置文件
```

## 分支管理

- `source` 分支：存放原始碼和開發內容
- `master` 分支：存放建置後的網站文件（由 GitHub Actions 自動更新）

## 本地開發

1. 克隆專案並切換到 source 分支：
```bash
git clone https://github.com/danielchou/danielchou.github.io.git
cd danielchou.github.io
git checkout source
```

2. 安裝依賴：
```bash
pip install mkdocs-material
```

3. 本地預覽：
```bash
mkdocs serve
```

4. 瀏覽 http://127.0.0.1:8000 查看效果

## 部署流程

1. 所有更改都應該在 `source` 分支進行
2. 推送到 GitHub 後，GitHub Actions 會自動：
   - 建置網站
   - 將建置結果推送到 `master` 分支
   - GitHub Pages 會自動更新網站

```bash
git add .
git commit -m "你的提交訊息"
git push origin source
```

## 重要配置文件

### mkdocs.yml
```yaml
site_name: DanielChou的異想世界
site_url: https://danielchou.github.io
use_directory_urls: true
docs_dir: docs
site_dir: site
remote_branch: master  # 部署到 master 分支
```

### .github/workflows/ci.yml
```yaml
name: ci
on:
  push:
    branches:
      - source  # 監聽 source 分支的推送
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # ... 其他步驟
      - run: mkdocs gh-deploy --force
```

## 注意事項

1. 不要直接在 `master` 分支上修改文件
2. 所有的內容更新都應該在 `source` 分支進行
3. 圖片等資源文件應放在 `docs/assets/` 目錄下
4. 確保 GitHub Pages 設置為從 `master` 分支的根目錄提供服務

## 相關連結

- 網站地址：https://danielchou.github.io
- MkDocs 文檔：https://www.mkdocs.org/
- Material for MkDocs：https://squidfunk.github.io/mkdocs-material/
