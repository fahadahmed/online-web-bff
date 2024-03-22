import { getAdminOverviewMock } from './getAdminOverview';
import { getCustomerOverviewMock } from './getCustomerOverview';
import { getContentProvidersMock } from './getContentProviders';
import { getServiceRequestsMock } from './getServiceRequests';
import { getShortcodesMock } from './getShortcodes';
import { getShortcodeMock } from './getShortcode';
import { getUsageMock } from './getUsage';
import { addContentProviderMock } from './addContentProvider';
import { addServiceRequestMock } from './addServiceRequest';
import { modifyShortcodeMock } from './modifyShortcode';
import { modifyContentProviderMock } from './modifyContentProvider';
import { deleteContentProviderMock } from './deleteContentProvider';

const handlers = [
  addContentProviderMock,
  addServiceRequestMock,
  getAdminOverviewMock,
  getCustomerOverviewMock,
  getContentProvidersMock,
  getServiceRequestsMock,
  getShortcodesMock,
  getShortcodeMock,
  getUsageMock,
  modifyShortcodeMock,
  modifyContentProviderMock,
  deleteContentProviderMock,
];

export default handlers;
