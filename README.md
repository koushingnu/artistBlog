# Artist Lyrics Media (Next.js + MDX)

自作楽曲の歌詞分析記事を掲載し、YouTube MV / 配信リンクへ自然に送客するための作品メディアです。

## 技術スタック

- Next.js (App Router) / TypeScript
- Tailwind CSS
- MDX (ローカルファイル管理)
- 静的生成 (SSG)
- SEO / OGP (`generateMetadata`)

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## ディレクトリ構成

```text
app/
components/
content/posts/
content/songs/
lib/
types/
public/images/
```

## MDX記事の追加方法

1. `content/posts/` に `your-post-slug.mdx` を作成
2. 以下の frontmatter を記述

```mdx
---
title: "記事タイトル"
description: "記事概要"
date: "2026-04-08"
tags: ["歌詞考察", "タグ2"]
songSlug: "night-window"
youtubeUrl: "https://www.youtube.com/watch?v=xxxxxxxxxxx"
streamingUrl: "https://example.com/stream/your-song"
coverImage: "/images/your-cover.svg"
published: true
---
```

`youtubeUrl` / `streamingUrl` は未設定でも動作します（準備中表示）。

3. 本文をMDXで記述
4. `published: true` の記事のみ一覧と詳細に表示されます

## 楽曲データの追加方法

1. `content/songs/` に `your-song.json` を作成
2. 以下の形式で記述

```json
{
  "title": "Song Title",
  "slug": "song-slug",
  "description": "短い紹介文",
  "coverImage": "/images/song-cover.svg",
  "youtubeUrl": "https://www.youtube.com/watch?v=xxxxxxxxxxx",
  "streamingUrl": "https://example.com/stream/song-slug"
}
```

`youtubeUrl` / `streamingUrl` は必要になった時点で追加してOKです。

3. 記事側 `songSlug` と一致させると自動で紐づきます

## Vercelデプロイ時の注意点

- Node.js バージョンは Vercel の推奨LTSを使用
- `lib/site.ts` の `siteConfig.url` を本番URLへ変更
- OGP画像は `coverImage` が未設定でもレイアウト崩れしない実装ですが、SNS表示品質のため設定推奨
- コンテンツは Git 管理前提 (`content/posts`, `content/songs`)

## 利用コマンド

```bash
npm run dev
npm run lint
npm run build
```

## 公式リンク

- YouTube: https://www.youtube.com/@koushingnu
- アーティストページ: https://www.tunecore.co.jp/artists/koushingnu
