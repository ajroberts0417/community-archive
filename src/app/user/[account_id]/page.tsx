import './user.css'
import { getUserData, getFirstTweets, getTopTweets } from '@/lib-server/user'
import Tweet from '@/components/TweetRefactor'
import SearchTweets from '@/components/SearchTweets'

export default async function User({ params, searchParams }:any) {
    const { account_id } = params
    const userData = await getUserData(account_id)
    if (!userData) {
      return (<h1>Not found</h1>)
    }

    const { tweetCount, account } = userData
    const firstTweets = await getFirstTweets(account.account_id)
    const topTweets = await getTopTweets(account.account_id)

    return (
      <div id="user-page">
        <h1>{account.username} ({new Intl.NumberFormat().format(tweetCount as number)} tweets)</h1>

        <SearchTweets displayText={`Search ${account.username}'s archive`} account_id={account.account_id} />
        <hr style={{ marginBottom: '50px' }}/>


        <h2>Top 20 tweets</h2>
        <div className="short-tweet-container">
          {topTweets && topTweets.map((tweet: any) => (
            <Tweet key={tweet.tweet_id} tweet={tweet}/>
          ))}
        </div>
        
        <h2>First 100 tweets</h2>
        <div className="short-tweet-container">
          {firstTweets && firstTweets.map((tweet: any) => (
            <Tweet key={tweet.tweet_id} tweet={tweet}/>
          ))}
        </div>
      </div>
    )
}