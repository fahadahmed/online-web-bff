import { setupServer } from 'msw/node';
import a2pCustomerHandlers from 'datasources/a2p/customer/mocks/handlers';
import accessHandlers from 'datasources/user/access/mocks/handlers';
import accountSummaryHandlers from 'datasources/customer/accountsService/mocks/handlers';
import addressHandlers from 'datasources/location/address/mocks/handlers';
import airpointsHandlers from 'datasources/airpoints/mocks/handlers';
import availableNumbers from 'datasources/shop/availableNumbers/mocks/handlers';
import balanceServiceHandlers from 'datasources/finance/balanceService/mocks/handlers';
import billPaymentHandlers from 'datasources/finance/paymentService/billPayment/mocks/handlers';
import cartServicesHandlers from 'datasources/shop/cart/mocks/handlers';
import checkoutServicesHandlers from 'datasources/shop/checkout/mocks/handlers';
import connectionDiagnosticsHandlers from 'datasources/line/assure/connectionDiagnostics/mocks/handlers';
import connectionPromiseHandler from 'datasources/line/assure/connectionPromise/mocks/handlers';
import contentServiceHandlers from 'datasources/utility/content/mocks/handlers';
import digitalBillHandlers from 'datasources/finance/digitalBill/mocks/handlers';
import identityServiceHandlers from 'datasources/user/identityService/mocks/handlers';
import lineConfiguarationHandlers from 'datasources/line/lineConfiguration/mocks/handlers';
import lineDetailServiceHandlers from 'datasources/line/lineDetails/mocks/handlers';
import lineDetailsHandlers from 'datasources/line/lineSummary/mocks/handlers';
import lineSpendHistoryHandlers from 'datasources/line/spend/mocks/handlers';
import lineSubscriptionsService from 'datasources/line/lineSubscriptionsService/mocks/handlers';
import lineUsageDetailsMocks from 'datasources/line/usage/usageDetailsService/mocks';
import lineUsageHistoryMocks from 'datasources/line/usage/usageHistoryService/mocks';
import lineUsageMocks from 'datasources/line/usage/mocks/handlers';
import lineUsageTransactionMocks from 'datasources/line/usage/usageTransactionsService/mocks';
import networkSettingsHandlers from 'datasources/technology/networkSettingsService/mocks/handlers';
import orderHandlers from 'datasources/shop/order/mocks/handlers';
import paymentServiceHandlers from 'datasources/finance/paymentService/mocks/handlers';
import pointOfAddressHandlers from 'datasources/location/pointOfInterest/mocks/handlers';
import pointOfOutageHandlers from 'datasources/location/pointOfInterest/outagesPointOfInterest/mocks/handlers';
import preferenceHandlers from 'datasources/user/preference/mocks/handlers';
import prepaidBalanceServiceHandlers from 'datasources/finance/prepaidBalanceService/mocks/handlers';
import productDetailServiceHandlers from 'datasources/product/details/mocks/handlers';
import productFiltersServiceHandlers from 'datasources/product/filters/mocks/handlers';
import productOffersHandlers from 'datasources/product/offers/mocks/handlers';
import productPromotionsMPDServiceHandlers from 'datasources/product/promotions/mpd/mocks/handlers';
import profileServiceHandlers from 'datasources/marketing/profileService/mocks/handlers';
import resourceHandlers from 'datasources/utility/resource/mocks/handlers';
import roamingRatesHandlers from 'datasources/product/roamingRates/mocks/handlers';
import subscriptionActivationHandlers from 'datasources/line/subscriptionActivationService/mocks/handlers';
import topupHandlers from 'datasources/finance/paymentService/topup/mocks/handlers';
import transactionsListHandlers from 'datasources/line/transactionsService/mocks/handlers';
import troubleshootHandlers from 'datasources/line/assure/connectionTroubleshooter/mocks/handlers';
import userInfoHandlers from 'datasources/user/userInfo/mocks/handlers';
import walletServiceHandlers from 'datasources/finance/walletService/mocks/handlers';

const handlers = [
  ...a2pCustomerHandlers,
  ...accessHandlers,
  ...accountSummaryHandlers,
  ...addressHandlers,
  ...availableNumbers,
  ...airpointsHandlers,
  ...balanceServiceHandlers,
  ...billPaymentHandlers,
  ...cartServicesHandlers,
  ...checkoutServicesHandlers,
  ...connectionDiagnosticsHandlers,
  ...connectionPromiseHandler,
  ...contentServiceHandlers,
  ...digitalBillHandlers,
  ...identityServiceHandlers,
  ...lineConfiguarationHandlers,
  ...lineDetailServiceHandlers,
  ...lineDetailsHandlers,
  ...lineSpendHistoryHandlers,
  ...lineSubscriptionsService,
  ...lineUsageDetailsMocks,
  ...lineUsageHistoryMocks,
  ...lineUsageMocks,
  ...lineUsageTransactionMocks,
  ...networkSettingsHandlers,
  ...orderHandlers,
  ...paymentServiceHandlers,
  ...pointOfAddressHandlers,
  ...pointOfOutageHandlers,
  ...preferenceHandlers,
  ...prepaidBalanceServiceHandlers,
  ...productDetailServiceHandlers,
  ...productFiltersServiceHandlers,
  ...productOffersHandlers,
  ...productPromotionsMPDServiceHandlers,
  ...profileServiceHandlers,
  ...resourceHandlers,
  ...roamingRatesHandlers,
  ...subscriptionActivationHandlers,
  ...topupHandlers,
  ...transactionsListHandlers,
  ...troubleshootHandlers,
  ...userInfoHandlers,
  ...walletServiceHandlers,
];

const server = setupServer(...handlers);
export default server;
