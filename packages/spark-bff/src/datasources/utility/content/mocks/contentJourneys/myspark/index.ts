import cartReview from './cart-review.mock.json';
import extrasBuy from './buyExtras/extras-buy.mock.json';
import profile from './profile.mock.json';
import subscriptionsAdd from './subscriptions/subscriptions-add.mock.json';
import subscriptionsGroupNeon from './subscriptions/subscriptions-group-neon.mock.json';
import subscriptionsGroupNetflix from './subscriptions/subscriptions-group-netflix.mock.json';
import subscriptionsGroupMcAfee from './subscriptions/subscriptions-group-mcafee.mock.json';
import subscriptionsGroupSparkSport from './subscriptions/subscriptions-group-spark-sport.mock.json';
import subscriptionsGroupSpotifyPremium from './subscriptions/subscriptions-group-spotify-premium.mock.json';
import subscriptionsUltimateSportsPackSkySportNow from './subscriptions/subscriptions-group-ultimate-sports-pack-sky-sport-now.mock.json';
import subscriptionsUltimateSportsPackSparkSport from './subscriptions/subscriptions-group-ultimate-sports-pack-spark-sport.mock.json';
import subscriptionsManage from './subscriptions/subscriptions-manage.mock.json';
import usageHistory from './usage-history.mock.json';
import changePrepaidPack from './changePlan/prepaid.mock.json';
import changePrepaidToPostpaid from './changePlan/prepaidToPostpaid.mock.json';
import changePostpaidPlan from './changePlan/postpaid.mock.json';
import checkout from './checkout.mock.json';

export const JOURNEY_MOCKS_MYSPARK = {
  'myspark/extras/buy': extrasBuy,
  'myspark/profile': profile,
  'myspark/subscriptions/add': subscriptionsAdd,
  'myspark/subscriptions/group/neon': subscriptionsGroupNeon,
  'myspark/subscriptions/group/spark_sport': subscriptionsGroupSparkSport,
  'myspark/subscriptions/group/Netflix': subscriptionsGroupNetflix,
  'myspark/subscriptions/group/mcafee': subscriptionsGroupMcAfee,
  'myspark/subscriptions/group/spotify_premium':
    subscriptionsGroupSpotifyPremium,
  'myspark/subscriptions/group/ultimate_sky_sport_now':
    subscriptionsUltimateSportsPackSkySportNow,
  'myspark/subscriptions/group/ultimate_spark_sport':
    subscriptionsUltimateSportsPackSparkSport,
  'myspark/subscriptions/manage': subscriptionsManage,
  'myspark/usage/history': usageHistory,
  'myspark/checkout': checkout,
  'myspark/cart/review': cartReview,
  'myspark/change/prepaid-pack"': changePrepaidPack,
  'myspark/change/prepaid-to-postpaid': changePrepaidToPostpaid,
  'myspark/change/postpaid-plan': changePostpaidPlan,
};
