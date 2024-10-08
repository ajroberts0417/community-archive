DROP MATERIALIZED VIEW IF EXISTS public.global_activity_summary;

CREATE MATERIALIZED VIEW
  public.global_activity_summary AS
SELECT
  (
    SELECT COUNT(DISTINCT account_id) FROM public.account
  ) AS total_accounts,
  (
    SELECT COUNT(DISTINCT tweet_id) FROM public.tweets
  ) AS total_tweets,
  (
    SELECT COUNT(DISTINCT liked_tweet_id) FROM public.likes
  ) AS total_likes,
  (
    SELECT COUNT(DISTINCT tweet_id) FROM public.user_mentions
  ) AS total_user_mentions,
  (
    SELECT json_agg(row_to_json(t))
    FROM (
      SELECT * FROM public.get_top_mentioned_users(30)
    ) t
  ) AS top_mentioned_users,
  (
    SELECT json_agg(row_to_json(t))
    FROM (
      SELECT * FROM public.get_top_accounts_with_followers(10)
    ) t
  ) AS top_accounts_with_followers;
