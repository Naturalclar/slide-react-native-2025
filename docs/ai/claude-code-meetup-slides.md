# Claude Code Meetup: Git Bare Clone & Git Worktree の効果的な活用

## 発表概要
Claude Codeと組み合わせて効果的に使える Git bare clone と Git worktree について、実際の開発フローを交えて解説します。

---

## 目次

1. [自己紹介](#自己紹介)
2. [今日話すこと](#今日話すこと)
3. [従来の開発フローの課題](#従来の開発フローの課題)
4. [Git Bare Clone とは](#git-bare-clone-とは)
5. [Git Worktree とは](#git-worktree-とは)
6. [Claude Code との組み合わせ](#claude-code-との組み合わせ)
7. [実演デモ](#実演デモ)
8. [ベストプラクティス](#ベストプラクティス)
9. [まとめ](#まとめ)
10. [質疑応答](#質疑応答)

---

## 自己紹介

**発表者名**: [あなたの名前]
**所属**: [あなたの所属]
**GitHub**: [あなたのGitHub]
**X**: [あなたのX]

### 今日のテーマについて
- Claude Code を日常的に使用
- 複数プロジェクトの並行開発
- 効率的な Git ワークフローの追求

---

## 今日話すこと

### 🎯 この発表の目標
- Git bare clone と git worktree の基本を理解する
- Claude Code と組み合わせた際の効果を体感する
- 実際の開発フローに活かせる知識を得る

### 📋 扱う内容
1. 従来の Git ワークフローの問題点
2. Git bare clone の仕組みと利点
3. Git worktree の活用方法
4. Claude Code との相乗効果
5. 実践的な使用例

---

## 従来の開発フローの課題

### よくある開発シナリオ

#### 🔄 ブランチ切り替えの問題
```bash
# 現在の作業を中断して別のブランチに切り替え
git stash
git checkout feature/new-feature
# 作業後、元のブランチに戻る
git checkout main
git stash pop
```

#### 😰 発生する問題
- **作業コンテキストの喪失**: IDE の設定、開いているファイルがリセット
- **ビルドの再実行**: 依存関係やアセットの再構築が必要
- **Claude Code のコンテキスト切断**: 会話履歴が途切れる
- **マルチタスクの困難**: 複数の機能を同時に開発できない

### 具体的な困る場面

#### シナリオ1: 緊急バグ修正
```
現在: feature/dashboard-update で新機能開発中
突然: 本番環境でバグ発見、即座に修正が必要
問題: 現在の作業を中断して hotfix ブランチに切り替える必要
```

#### シナリオ2: コードレビュー対応
```
現在: feature/user-auth で認証機能実装中
レビュー: feature/payment-integration にレビューコメント
問題: 認証機能の作業を中断してレビュー対応する必要
```

---

## Git Bare Clone とは

### 📖 基本概念
Git bare clone は、ワーキングディレクトリを持たないリポジトリのクローンです。

```bash
# 通常のクローン
git clone https://github.com/user/repo.git
cd repo
# .git/ ディレクトリ + ワーキングディレクトリ

# Bare クローン
git clone --bare https://github.com/user/repo.git repo.git
cd repo.git
# .git/ の内容のみ（ワーキングディレクトリなし）
```

### 🔧 仕組み
- **通常のリポジトリ**: `.git/` + ワーキングディレクトリ
- **Bare リポジトリ**: `.git/` の内容のみ
- **複数の worktree**: 同一の Git データベースを共有

### 💡 利点
1. **ディスク容量の節約**: Git データベースは1つだけ
2. **高速なブランチ切り替え**: データの移動が不要
3. **同時並行作業**: 複数のブランチで同時作業可能
4. **一元管理**: すべてのブランチ情報が1箇所に集約

---

## Git Worktree とは

### 📖 基本概念
Git worktree は、1つの Git リポジトリに複数のワーキングディレクトリを作成する機能です。

```bash
# メインの worktree
git worktree add ../feature-branch feature/new-feature

# 結果
project/
├── main/           # メインの worktree
├── feature-branch/ # 新しい worktree
└── .git/           # 共有される Git データベース
```

### 🔧 基本的な使い方

#### Worktree の作成
```bash
# 新しいブランチで worktree を作成
git worktree add -b feature/login ../login-feature

# 既存のブランチで worktree を作成
git worktree add ../hotfix-branch hotfix/critical-bug

# リモートブランチを追跡する worktree
git worktree add -b feature/api origin/feature/api ../api-feature
```

#### Worktree の管理
```bash
# worktree の一覧表示
git worktree list

# worktree の削除
git worktree remove ../feature-branch
# または
rm -rf ../feature-branch
git worktree prune
```

### 💡 利点
1. **同時並行作業**: 複数のブランチで同時に作業可能
2. **コンテキスト保持**: 各ディレクトリで独立したIDE設定
3. **高速切り替え**: ブランチ間の移動が不要
4. **ビルドの独立**: 各worktreeで独立したビルド状態

---

## Claude Code との組み合わせ

### 🚀 なぜ Claude Code と相性が良いのか

#### 1. コンテキストの保持
```bash
# 各 worktree で独立した Claude Code セッション
project-main/     # メイン機能の開発
├── .claude/      # Claude Code の設定・履歴
└── src/

project-feature/  # 新機能の開発
├── .claude/      # 独立した Claude Code セッション
└── src/
```

#### 2. 並行開発の効率化
- **同時並行作業**: 複数の機能を同時に Claude Code で開発
- **コンテキスト維持**: 各プロジェクトで会話履歴を保持
- **専門的な対話**: 各機能に特化した AI との対話

#### 3. 効率的なコードレビュー
```bash
# レビュー専用の worktree
git worktree add ../review-branch origin/feature/user-auth
cd ../review-branch
claude code  # レビューに集中した Claude Code セッション
```

### 📋 実際の活用パターン

#### パターン1: 機能別開発
```bash
# プロジェクト構成
project/
├── main/              # メイン開発
├── feature-auth/      # 認証機能
├── feature-payment/   # 決済機能
└── hotfix/           # 緊急修正

# 各ディレクトリで Claude Code を起動
cd main && claude code
cd feature-auth && claude code
cd feature-payment && claude code
```

#### パターン2: 段階的開発
```bash
# 段階的なアプローチ
git worktree add ../prototype feature/prototype
git worktree add ../implementation feature/implementation
git worktree add ../testing feature/testing

# 各段階で Claude Code を使用
# prototype/    - アイデア検証とプロトタイプ開発
# implementation/ - 本格実装
# testing/      - テストコード作成
```

---

## 実演デモ

### 🎬 デモシナリオ
実際のプロジェクトで Git bare clone + worktree + Claude Code を使った開発フローを実演します。

#### 準備
1. **Bare リポジトリの作成**
```bash
# 既存のプロジェクトから bare リポジトリを作成
git clone --bare https://github.com/user/project.git project.git
cd project.git
```

2. **メインの worktree を作成**
```bash
git worktree add ../project-main main
cd ../project-main
```

#### デモ1: 新機能開発
```bash
# 新機能用の worktree を作成
git worktree add -b feature/user-dashboard ../project-dashboard
cd ../project-dashboard

# Claude Code でセッション開始
claude code
```

**Claude Code での作業内容:**
- ユーザーダッシュボード機能の設計
- コンポーネントの実装
- テストコードの作成

#### デモ2: 緊急バグ修正
```bash
# バグ修正用の worktree を作成（メインの作業を中断せず）
git worktree add -b hotfix/login-issue ../project-hotfix
cd ../project-hotfix

# 別の Claude Code セッションで修正
claude code
```

**並行作業の確認:**
- `project-dashboard/` では新機能開発が継続
- `project-hotfix/` では緊急修正に集中
- それぞれ独立した Claude Code セッション

#### デモ3: コードレビュー
```bash
# レビュー用の worktree を作成
git worktree add ../project-review origin/feature/payment-integration
cd ../project-review

# レビュー専用の Claude Code セッション
claude code
```

**レビュー作業:**
- Claude Code でコードの解析
- 改善提案の生成
- セキュリティチェック

---

## ベストプラクティス

### 📋 セットアップのベストプラクティス

#### 1. ディレクトリ構成
```bash
# 推奨構成
projects/
├── project-name.git/     # Bare リポジトリ
├── main/                 # メイン開発
├── feature-auth/         # 認証機能
├── feature-payment/      # 決済機能
└── hotfix/              # 緊急修正
```

#### 2. 命名規則
```bash
# わかりやすい名前を使用
git worktree add ../auth-feature feature/user-authentication
git worktree add ../payment-impl feature/payment-integration
git worktree add ../security-fix hotfix/security-vulnerability
```

#### 3. Claude Code の設定
```bash
# 各 worktree で独立した設定
project-main/.claude/
├── config.json
└── history/

project-feature/.claude/
├── config.json
└── history/
```

### 🔧 運用のベストプラクティス

#### 1. Worktree の管理
```bash
# 定期的にクリーンアップ
git worktree prune

# worktree の状態確認
git worktree list

# 不要な worktree の削除
git worktree remove ../completed-feature
```

#### 2. ブランチの同期
```bash
# 各 worktree で定期的にフェッチ
git fetch origin

# メインブランチの更新を他の worktree に反映
git rebase origin/main
```

#### 3. Claude Code の活用
- **専門的な対話**: 各機能に特化した質問
- **コンテキスト保持**: 長期的な開発での会話履歴活用
- **コードレビュー**: 専用セッションでの集中レビュー

### ⚠️ 注意点

#### 1. 同一ブランチの重複
```bash
# 同じブランチを複数の worktree で使用不可
git worktree add ../duplicate main  # エラー: main は既に使用中
```

#### 2. 未コミット変更の管理
```bash
# 各 worktree で個別にコミット管理が必要
cd project-main
git status  # この worktree のみの状態

cd ../project-feature
git status  # 独立した状態
```

#### 3. IDE設定の考慮
- 各 worktree で独立したIDE設定
- プロジェクト固有の設定ファイルの管理
- 依存関係の重複インストール

---

## まとめ

### 🎯 Git Bare Clone + Worktree の効果

#### 開発効率の向上
- **並行開発**: 複数のブランチで同時作業
- **コンテキスト保持**: 作業環境の維持
- **高速切り替え**: ブランチ間の移動が不要

#### Claude Code との相乗効果
- **専門的な対話**: 機能別の集中した AI セッション
- **履歴の保持**: 長期的な開発での知見蓄積
- **効率的なレビュー**: 独立したレビュー環境

### 📈 期待できる改善
1. **開発速度の向上**: 30-50%の作業効率化
2. **コンテキストスイッチの削減**: 作業中断の最小化
3. **品質の向上**: 集中した開発とレビュー

### 🚀 今後の展望
- **チーム開発**: 複数人での worktree 活用
- **CI/CD連携**: 各 worktree での自動化
- **AI開発**: Claude Code との更なる統合

---

## リソース・参考資料

### 📚 公式ドキュメント
- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs/claude-code)

### 🔗 関連記事
- [Git Worktree の使い方](https://example.com)
- [Claude Code ベストプラクティス](https://example.com)

### 🛠️ 便利なツール
- [git-extras](https://github.com/tj/git-extras): Git の拡張コマンド
- [lazygit](https://github.com/jesseduffield/lazygit): Git の GUI ツール

---

## 質疑応答

### よくある質問

#### Q: 既存のプロジェクトでも使えますか？
A: はい、既存のプロジェクトでも `git clone --bare` でbare リポジトリを作成し、worktree を追加できます。

#### Q: ディスク容量はどのくらい必要ですか？
A: Bare リポジトリ + 各 worktree のワーキングディレクトリ分が必要です。Git データベースは共有されるため、通常のクローンより効率的です。

#### Q: チームで使用する場合の注意点は？
A: 各開発者が独自の worktree 構成を持つため、チーム内での命名規則やディレクトリ構成の統一が重要です。

#### Q: Claude Code のライセンスは worktree ごとに必要ですか？
A: いいえ、同一ユーザーであれば複数の worktree で同じライセンスを使用できます。

---

## 付録

### A. セットアップスクリプト
```bash
#!/bin/bash
# setup-worktree.sh

PROJECT_NAME=$1
REPO_URL=$2

if [ -z "$PROJECT_NAME" ] || [ -z "$REPO_URL" ]; then
    echo "Usage: $0 <project-name> <repo-url>"
    exit 1
fi

# Bare リポジトリの作成
git clone --bare "$REPO_URL" "${PROJECT_NAME}.git"
cd "${PROJECT_NAME}.git"

# メインの worktree を作成
git worktree add "../${PROJECT_NAME}-main" main

echo "Setup complete!"
echo "Main worktree: ../${PROJECT_NAME}-main"
echo "Add more worktrees: git worktree add ../branch-name branch-name"
```

### B. 便利なエイリアス
```bash
# ~/.gitconfig に追加
[alias]
    wa = worktree add
    wl = worktree list
    wr = worktree remove
    wp = worktree prune
```

### C. Claude Code 設定例
```json
// .claude/config.json
{
  "model": "claude-3-sonnet",
  "context": "project-specific",
  "memory": "enabled",
  "tools": ["bash", "edit", "grep"]
}
```

---

*この資料は Claude Code Meetup 用に作成されました。*
*最終更新: 2024年*