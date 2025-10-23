# Git Worktree解説

Git worktreeは、同じリポジトリの複数のブランチを同時に異なるディレクトリで作業できる機能です。

## 基本概念

通常のGitでは、1つのリポジトリで1つのブランチしか同時にチェックアウトできません。しかし、git worktreeを使用すると、同じリポジトリの異なるブランチを別々のディレクトリで同時に作業できます。

## 主な使用場面

- **並行開発**: 複数のfeatureブランチで同時に作業
- **比較作業**: 異なるバージョンのコードを比較
- **緊急対応**: 現在の作業を中断せずに別ブランチで緊急修正
- **テスト**: 複数のブランチでテストを並行実行

## 基本コマンド

```bash
# 新しいworktreeを作成
git worktree add <パス> <ブランチ名>

# 既存のworktreeを一覧表示
git worktree list

# worktreeを削除
git worktree remove <パス>

# 不要なworktreeを整理
git worktree prune
```

## 実践例

```bash
# メインブランチのworktreeを作成
git worktree add ../main-branch main

# 新しいfeatureブランチのworktreeを作成
git worktree add ../feature-login feature/login

# 現在のworktreeを確認
git worktree list
```

## メリット

1. **効率的な並行作業**: ブランチ切り替えの時間を削減
2. **安全性**: 異なるブランチでの作業が干渉しない
3. **比較の容易さ**: 複数のバージョンを同時に確認可能

## 注意点

- 同じブランチを複数のworktreeでチェックアウトはできません
- ディスク容量を多く使用します
- worktreeの管理に注意が必要です

Git worktreeは、複雑なプロジェクトや並行開発が必要な場合に非常に有用な機能です。