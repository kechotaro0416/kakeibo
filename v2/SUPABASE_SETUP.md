# のこりん v2 Supabase設定

1. Supabaseで新しいプロジェクトを作成する。
2. SQL Editorで `supabase-schema.sql` 全体を実行する。
3. AuthenticationのURL ConfigurationでSite URLを次に設定する。
   `https://kechotaro0416.github.io/kakeibo/v2/`
4. Redirect URLsにも、末尾の `/` を含む同じURLを完全一致で追加する。
5. Google CloudのGoogle Auth PlatformでOAuth同意画面を設定する。
   - Audienceは「External」にする。
   - Data Accessは `openid`、メールアドレス、プロフィールの基本スコープだけにする。
   - テスト公開中は、利用する友達のGoogleアカウントをTest usersへ追加する。
6. Google Auth PlatformのClientsで、種類「Web application」のOAuth Clientを作成する。
   - Authorized JavaScript origins: `https://kechotaro0416.github.io`
   - Authorized redirect URIs: SupabaseのAuthentication → Providers → Googleに表示されるCallback URL
     （形式: `https://<project-ref>.supabase.co/auth/v1/callback`）
7. SupabaseのAuthentication → Providers → Googleを有効にし、GoogleのClient IDとClient Secretを設定する。
8. SupabaseのProject URLとPublishable keyを `cloud-config.js` に設定する。

ローカルで認証を試す場合は、使用するローカルURLもRedirect URLsへ個別に追加する。

`service_role` keyやSecret key（`sb_secret_...`）はブラウザへ公開せず、Gitにも保存しない。
Publishable key（`sb_publishable_...`）だけを使用する。データの保護は `supabase-schema.sql` のRLSで行う。
Google Client SecretもSupabaseの設定画面にだけ入力し、`cloud-config.js` やGitには保存しない。

Googleログインでは認証メールを送らないため、独自SMTPやメールテンプレートの設定は不要。

公開前に別々の2アカウントでログインし、一方から他方のデータを取得・更新できないことを確認する。
iPhoneではSafariとホーム画面版のローカル保存領域が分かれるため、ホーム画面の「のこりん」内からGoogleログインし、認証後に同じ画面へ戻って「ログイン中」と表示されるところまで実機確認する。
