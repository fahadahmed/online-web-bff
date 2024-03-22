import A2PCustomerAPI from 'datasources/a2p/customer/CustomerAPI';
import A2PShortcodesAPI from 'datasources/a2p/shortcodes/ShortcodesAPI';

export type A2pDataSources = {
  a2pCustomerAPI: A2PCustomerAPI;
  a2pShortcodesAPI: A2PShortcodesAPI;
};

const a2pDataSources = (): A2pDataSources => ({
  a2pCustomerAPI: new A2PCustomerAPI(),
  a2pShortcodesAPI: new A2PShortcodesAPI(),
});

export default a2pDataSources;
