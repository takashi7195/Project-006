# Project-006

Codex Cloud 上で、特定フレームワークに固定せずに Web サービスを開発するための初期ワークスペースです。現時点ではアプリケーション本体、画面、API、データベーススキーマは作成していません。

## 現在の Codex Cloud 実行環境（2026-09-01 確認）

| 項目 | 確認結果 |
| --- | --- |
| OS | Ubuntu 24.04.4 LTS（Linux） |
| Git | 2.43.0 |
| Python | 3.14.4（OS パッケージは 3.12.3） |
| Node.js / npm | 24.15.0 / 11.4.2 |
| JavaScript package manager | npm（`packageManager` で固定）。corepack、pnpm、Yarn、Bun も利用可能 |
| Python tooling | pip、uv、pipx、pytest、Ruff、mypy が利用可能 |
| 基本 CLI | bash、make、curl、git、gh、jq、sqlite3、openssl、zip/unzip、wget |
| コンテナ | Docker CLI は未インストール |

Codex Cloud の Linux セッション内で、Node/Python のコマンド、テスト、ローカル HTTP サーバー、Git 操作を実行できます。永続的な公開ホスティングや Docker を前提とする検証は、この初期構成には含めません。`npm run serve` はセッション内のポート 4173 で静的ファイルを配信します。ブラウザからの確認は Codex Cloud が提供するポート公開・プレビュー機能が利用できる場合に限られ、外部公開サービスの代替ではありません。

## 再現手順

```bash
# Node のバージョンは .nvmrc に合わせる
npm ci
make check
make python-check

# 必要な場合だけ、Python 品質ツールを隔離環境へ入れる
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
.venv/bin/python -m ruff check .

# フレームワークを選定した後、public/ を一時的に確認するためのローカル HTTP サーバー
npm run serve
```

`package-lock.json` により JavaScript 依存関係の解決結果を固定し、`.nvmrc`、`.python-version`、`pyproject.toml`、`requirements-dev.txt` に実行系・Python ツールの基準を記録しています。GitHub Actions でも同じ Node/Python 系と `make` タスクを検査します。

## 用意済みの開発タスク

| コマンド | 用途 |
| --- | --- |
| `npm ci` / `make bootstrap` | lockfile に従って Node ワークスペースを再現 |
| `npm run serve` / `make serve` | `public/` を `http://127.0.0.1:4173` で配信 |
| `npm test` / `make test` | Node 組み込みテストによるワークスペース検査 |
| `npm run lint` / `make lint` | 必須の初期構成ファイルを検査 |
| `npm run format:check` | テキスト設定ファイルの末尾改行を検査 |
| `make check` | Node の全基本検査 |
| `make python-check` | Ruff による Python/設定ファイルの静的検査 |

フレームワークは未選定です。採用が決まった時点で、そのフレームワークの依存関係、実行・テストスクリプトを追加してください。

## 秘密情報と将来の Supabase 連携

1. `.env.example` を `.env` にコピーします。`.env` は Git の追跡対象外です。
2. 実際の値は Codex Cloud のシークレット/環境変数設定（利用できる場合）または実行セッションに注入し、Issue、コミット、ログへ書き出しません。
3. `SUPABASE_URL` と `SUPABASE_ANON_KEY` は将来のクライアント接続用の名前として予約しています。`SUPABASE_SERVICE_ROLE_KEY` はサーバー専用であり、ブラウザ、静的配信物、クライアント側の環境変数には絶対に含めません。
4. Supabase のプロジェクト作成、CLI 認証、マイグレーション、SDK の導入は、採用するバックエンド/フロントエンド構成を決めてから行います。

## GitHub 連携

この作業時点ではリポジトリに `origin` remote はなく、`gh auth status` も未認証でした。そのため、この環境から既存 GitHub リポジトリへ push できる状態であることは確認できていません。GitHub 側でリポジトリを作成または接続した後、Codex Cloud の GitHub 連携または認証済みの Git 資格情報を用いて次を実行してください。

```bash
git remote add origin <GitHub repository URL>
git push -u origin work
```

CI 定義は `.github/workflows/ci.yml` に含めています。remote を設定して push すれば、push と pull request で再現・検査タスクが実行されます。
