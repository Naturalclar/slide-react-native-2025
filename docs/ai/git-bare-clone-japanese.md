# Git Bare Clone解説

Git bare cloneは、作業ディレクトリを持たない「裸の」リポジトリをクローンする機能です。

## 基本概念

通常のGitリポジトリは、作業ディレクトリ（ファイルが実際に置かれている場所）と`.git`ディレクトリ（Gitの管理情報）の両方を含みます。しかし、bare repositoryは`.git`ディレクトリの内容のみを含み、作業ディレクトリは持ちません。

## 基本コマンド

```bash
# bare repositoryをクローン
git clone --bare <リポジトリURL> <ディレクトリ名>

# 例：GitHubリポジトリをbare cloneする
git clone --bare https://github.com/user/repo.git repo.git
```

## 主な特徴

- **ファイルが見えない**: 作業ディレクトリがないため、ソースコードファイルは直接見えません
- **直接編集不可**: ファイルを直接編集することはできません
- **プッシュ可能**: 通常のリポジトリとは異なり、bare repositoryには直接プッシュできます
- **容量効率**: 作業ディレクトリがない分、ディスク容量を節約できます

## 主な使用場面

### 1. 中央リポジトリとして使用
```bash
# サーバー上でbare repositoryを作成
git clone --bare myproject.git /path/to/server/myproject.git

# 開発者がこのbare repositoryにプッシュ
git remote add origin /path/to/server/myproject.git
git push origin main
```

### 2. バックアップ用途
```bash
# プロジェクトの完全バックアップを作成
git clone --bare /path/to/original/repo /backup/repo.git
```

### 3. ミラーリング
```bash
# GitHubからGitLabへのミラー作成
git clone --bare https://github.com/user/repo.git
cd repo.git
git push --mirror https://gitlab.com/user/repo.git
```

## 通常のクローンとの違い

| 項目 | 通常のクローン | Bare Clone |
|------|----------------|------------|
| 作業ディレクトリ | あり | なし |
| ファイル編集 | 可能 | 不可能 |
| 直接プッシュ | 不可能 | 可能 |
| 用途 | 開発作業 | サーバー・バックアップ |

## 実践例

### サーバー上でのbare repository設定
```bash
# サーバー上でbare repositoryを作成
ssh user@server
git clone --bare /local/repo.git /srv/git/repo.git

# 開発者側での設定
git remote add origin user@server:/srv/git/repo.git
git push origin main
```

### 既存リポジトリからbare repositoryを作成
```bash
# 既存のリポジトリをbare repositoryに変換
git clone --bare myproject myproject.git
```

## メリット

1. **中央リポジトリに最適**: 複数の開発者が同じリポジトリにプッシュできます
2. **容量効率**: 作業ディレクトリがないため軽量です
3. **安全性**: 直接ファイル編集ができないため、意図しない変更を防げます
4. **バックアップに最適**: 完全なGit履歴を保持しながらコンパクトです

## 注意点

- 作業ディレクトリがないため、ファイルの直接確認や編集はできません
- 開発作業には適していません（別途作業用リポジトリが必要）
- bare repositoryから直接ファイルを確認するには`git show`コマンドなどを使用する必要があります

Git bare cloneは、主にサーバー上での中央リポジトリやバックアップ用途で威力を発揮する機能です。