import AccessAPI from 'datasources/user/access/AccessAPI';
import AccountServiceAPI from 'datasources/customer/accountsService/AccountServiceAPI';
import AddressAPI from 'datasources/location/address/AddressAPI';
import AirPointsAPI from 'datasources/airpoints/AirPointsAPI';
import AvailableNumbersAPI from 'datasources/shop/availableNumbers/AvailableNumbersAPI';
import BalanceServiceAPI from 'datasources/finance/balanceService/BalanceServiceAPI';
import BillPaymentAPI from 'datasources/finance/paymentService/billPayment/BillPaymentAPI';
import CartAPI from 'datasources/shop/cart/CartAPI';
import CheckoutAPI from 'datasources/shop/checkout/CheckoutAPI';
import ConnectionDiagnosticsAPI from 'datasources/line/assure/connectionDiagnostics/ConnectionDiagnosticsAPI';
import ConnectionPromiseAPI from 'datasources/line/assure/connectionPromise/ConnectionPromiseAPI';
import ConnectionTroubleshooterAPI from 'datasources/line/assure/connectionTroubleshooter/ConnectionTroubleshooterAPI';
import ContentServiceAPI from 'datasources/utility/content/ContentServiceAPI';
import DigitalBillAPI from 'datasources/finance/digitalBill/DigitalBillAPI';
import IdentityServiceAPI from 'datasources/user/identityService/IdentityServiceAPI';
import LineConfigurationAPI from 'datasources/line/lineConfiguration/LineConfigurationAPI';
import LineDetailsAPI from 'datasources/line/lineDetails/LineDetailsAPI';
import LineSubscriptionsServiceAPI from 'datasources/line/lineSubscriptionsService/LineSubscriptionsServiceAPI';
import LineSummaryServiceAPI from 'datasources/line/lineSummary/LineSummaryServiceAPI';
import NetworkSettingsAPI from 'datasources/technology/networkSettingsService/NetworkSettingsAPI';
import OrderAPI from 'datasources/shop/order/OrderAPI';
import PointsOfInterestAPI from 'datasources/location/pointOfInterest/PointsOfInterestAPI';
import PreferenceAPI from 'datasources/user/preference/PreferenceAPI';
import PrepaidBalanceServiceAPI from 'datasources/finance/prepaidBalanceService/PrepaidBalanceServiceAPI';
import ProductDetailsAPI from 'datasources/product/details/ProductDetailsAPI';
import ProductFiltersAPI from 'datasources/product/filters/ProductFiltersAPI';
import ProductOffersAPI from 'datasources/product/offers/ProductOffersAPI';
import ProductPromotionsMPDAPI from 'datasources/product/promotions/mpd/ProductPromotionsMPDAPI';
import ProfileServiceAPI from 'datasources/marketing/profileService/ProfileServiceAPI';
import ResourceAPI from 'datasources/utility/resource/ResourceAPI';
import RoamingRatesAPI from 'datasources/product/roamingRates/RoamingRatesAPI';
import SpendHistoryServiceAPI from 'datasources/line/spend/SpendHistoryServiceAPI';
import SubscriptionActivationAPI from 'datasources/line/subscriptionActivationService/SubscriptionActivationAPI';
import TopupAPI from 'datasources/finance/paymentService/topup/TopupAPI';
import TransactionsServiceAPI from 'datasources/line/transactionsService/TransactionServiceAPI';
import UsageDetailsServiceAPI from 'datasources/line/usage/usageDetailsService/UsageDetailsAPI';
import UsageHistoryServiceAPI from 'datasources/line/usage/usageHistoryService/UsageHistoryAPI';
import UsageServicesAPI from 'datasources/line/usage/UsageServicesAPI';
import UsageTransactionServiceAPI from 'datasources/line/usage/usageTransactionsService/UsageTransactionAPI';
import UserInfoAPI from 'datasources/user/userInfo/UserInfoAPI';
import WalletServiceAPI from 'datasources/finance/walletService/WalletServiceAPI';
import PaymentServiceAPI from './finance/paymentService/PaymentServiceAPI';

const sparkDataSources = () => ({
  accessAPI: new AccessAPI(),
  accountServiceAPI: new AccountServiceAPI(),
  addressAPI: new AddressAPI(),
  airPointsAPI: new AirPointsAPI(),
  availableNumbersAPI: new AvailableNumbersAPI(),
  balanceServiceAPI: new BalanceServiceAPI(),
  billPaymentAPI: new BillPaymentAPI(),
  cartAPI: new CartAPI(),
  checkoutAPI: new CheckoutAPI(),
  connectionDiagnosticsAPI: new ConnectionDiagnosticsAPI(),
  connectionPromiseAPI: new ConnectionPromiseAPI(),
  connectionTroubleshooterAPI: new ConnectionTroubleshooterAPI(),
  contentServiceAPI: new ContentServiceAPI(),
  digitalBillAPI: new DigitalBillAPI(),
  identityServiceAPI: new IdentityServiceAPI(),
  lineConfigurationAPI: new LineConfigurationAPI(),
  lineDetailsAPI: new LineDetailsAPI(),
  lineSubscriptionsServiceAPI: new LineSubscriptionsServiceAPI(),
  lineSummaryServiceAPI: new LineSummaryServiceAPI(),
  networkSettingsAPI: new NetworkSettingsAPI(),
  orderAPI: new OrderAPI(),
  paymentServiceAPI: new PaymentServiceAPI(),
  pointsOfInterestAPI: new PointsOfInterestAPI(),
  preferenceAPI: new PreferenceAPI(),
  prepaidBalanceServiceAPI: new PrepaidBalanceServiceAPI(),
  productDetailsAPI: new ProductDetailsAPI(),
  productFiltersAPI: new ProductFiltersAPI(),
  productOffersAPI: new ProductOffersAPI(),
  productPromotionsMPDAPI: new ProductPromotionsMPDAPI(),
  profileServiceAPI: new ProfileServiceAPI(),
  resourceAPI: new ResourceAPI(),
  roamingRatesAPI: new RoamingRatesAPI(),
  spendHistoryServiceAPI: new SpendHistoryServiceAPI(),
  subscriptionActivationAPI: new SubscriptionActivationAPI(),
  topupAPI: new TopupAPI(),
  transactionServiceAPI: new TransactionsServiceAPI(),
  usageDetailsServiceAPI: new UsageDetailsServiceAPI(),
  usageHistoryServiceAPI: new UsageHistoryServiceAPI(),
  usageServicesAPI: new UsageServicesAPI(),
  usageTransactionServiceAPI: new UsageTransactionServiceAPI(),
  userInfoAPI: new UserInfoAPI(),
  walletServiceAPI: new WalletServiceAPI(),
});

export type SparkDataSources = ReturnType<typeof sparkDataSources>;

export default sparkDataSources;
