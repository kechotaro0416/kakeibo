# のこりん v2 Supabase設定

1. Supabaseで新しいプロジェクトを作成する。
2. SQL Editorで `supabase-schema.sql` 全体を実行する。
3. AuthenticationのURL ConfigurationでSite URLを次に設定する。
   `https://kechotaro0416.github.io/kakeibo/v2/`
4. Redirect URLsにも、末尾の `/` を含む同じURLを完全一致で追加する。
5. 友達にもログインメールを送れるよう、AuthenticationのEmails → SMTP Settingsで独自SMTPを設定する。Supabase標準SMTPはプロジェクトのチームメンバー宛ての動作確認専用で、友達のアドレスには送れない。
6. AuthenticationのEmail Templatesで「Magic Link / OTP」テンプレートを開き、本文に6桁コードの `{{ .Token }}` を含める。リンクでのログインも残す場合は `{{ .ConfirmationURL }}` も併記する。
   ```html
   <h2>のこりん ログイン</h2>
   <p>ログインコード: <strong>{{ .Token }}</strong></p>
   <p><a href="{{ .ConfirmationURL }}">この端末でログイン</a></p>
   ```
7. Project URLとPublishable keyを `cloud-config.js` に設定する。

ローカルで認証を試す場合は、使用するローカルURLもRedirect URLsへ個別に追加する。

`service_role` keyやSecret key（`sb_secret_...`）はブラウザへ公開せず、Gitにも保存しない。
Publishable key（`sb_publishable_...`）だけを使用する。データの保護は `supabase-schema.sql` のRLSで行う。
SMTPのユーザー名・パスワードもSupabaseの設定画面にだけ入力し、`cloud-config.js` やGitには保存しない。

公開前に別々の2アカウントでログインし、一方から他方のデータを取得・更新できないことを確認する。
