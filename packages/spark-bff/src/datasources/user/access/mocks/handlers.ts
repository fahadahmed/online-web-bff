import { rest } from 'msw';
import { definitions } from 'generated/typings/accessServiceV2';
import addAccountAccessFailureLineNotUnderAccount from './add-account-access-failure-line-not-under-account.mock.json';
import addAccountAccessFailurePasswordNoMatch from './add-account-access-failure-password-no-match.mock.json';
import addAccountAccessIncompleteRequireBusinessName from './add-account-access-incomplete-require-business-name.mock.json';
import addAccountAccessIncompleteRequireFullName from './add-account-access-incomplete-require-full-name.mock.json';
import addAccountAccessIncompleteRequireLineNumber from './add-account-access-incomplete-require-line-number.mock.json';
import addAccountAccessIncompleteRequirePassword from './add-account-access-incomplete-require-password.mock.json';
import addAccountAccessSuccessAsOwner from './add-account-access-success-as-owner.mock.json';
import addAccountAccessSuccessNotifiedOwner from './add-account-access-success-notified-owner.mock.json';
import addLineAccessIncomplete from './add-line-access-incomplete.mock.json';
import addLineAccessSuccess from './add-line-access-success.mock.json';
import associatedUsers from './associated-users.mock.json';
import revokeAccessFailureInvalidId from './revoke-access-failure-invalid-id.mock.json';
import revokeAccessFailureInsufficientPermission from './revoke-access-failure-insufficient-permission.mock.json';
import revokeAccessFailureNotLoggedIn from './revoke-access-failure-not-logged-in.mock.json';
import revokeAccessFailureValidationError from './revoke-access-failure-validation-error.mock.json';
import revokeAccessSuccess from './revoke-access-success.mock.json';
import userAccessMany from './user-access-many.mock.json';

const baseUrl = 'http://testhost/v2/user/access';

const accountAssociatedUsersMock = rest.get(
  `${baseUrl}/account/:accountNumber`,
  async (req, res, ctx) => {
    const { accountNumber } = req.params;
    if (accountNumber === 'e9001') {
      return res(ctx.status(500), ctx.json({}));
    }
    return res(ctx.status(200), ctx.json(associatedUsers));
  },
);

interface AddAccountAccessMockBody {
  accountNumber: string;
  authorisation: {
    businessName?: string;
    firstName?: string;
    lastName?: string;
    lineNumber?: string;
    password?: string;
  };
}

const addAccountAccessMock = rest.post<AddAccountAccessMockBody>(
  `${baseUrl}/me/account`,
  async (
    {
      body: {
        accountNumber,
        authorisation: {
          businessName,
          firstName,
          lastName,
          lineNumber,
          password,
        },
      },
    },
    res,
    ctx,
  ) => {
    if (accountNumber === '123456' || accountNumber === '112233') {
      if (accountNumber === '112233' && !businessName) {
        return res(
          ctx.status(300),
          ctx.json(addAccountAccessIncompleteRequireBusinessName),
        );
      }
      if (accountNumber === '123456' && (!firstName || !lastName)) {
        return res(
          ctx.status(300),
          ctx.json(addAccountAccessIncompleteRequireFullName),
        );
      }
      if (!lineNumber) {
        return res(
          ctx.status(300),
          ctx.json(addAccountAccessIncompleteRequireLineNumber),
        );
      }
      if (lineNumber === '0211884434') {
        return res(
          ctx.status(400),
          ctx.json(addAccountAccessFailureLineNotUnderAccount),
        );
      }
      if (!password) {
        return res(
          ctx.status(300),
          ctx.json(addAccountAccessIncompleteRequirePassword),
        );
      }
      if (password === 'password') {
        return res(
          ctx.status(400),
          ctx.json(addAccountAccessFailurePasswordNoMatch),
        );
      }
      return res(ctx.status(200), ctx.json(addAccountAccessSuccessAsOwner));
    }
    return res(ctx.status(200), ctx.json(addAccountAccessSuccessNotifiedOwner));
  },
);

interface AddLineAccessBody {
  authorisation: {
    authCode?: string;
  };
}

const addLineAccessMock = rest.post<AddLineAccessBody>(
  `${baseUrl}/me/line`,
  async (
    {
      body: {
        authorisation: { authCode },
      },
    },
    res,
    ctx,
  ) => {
    if (authCode) {
      return res(ctx.status(200), ctx.json(addLineAccessSuccess));
    }
    return res(ctx.status(300), ctx.json(addLineAccessIncomplete));
  },
);

const lineAssociatedUsersMock = rest.get(
  `${baseUrl}/line/:lineNumber`,
  async (req, res, ctx) => {
    const { lineNumber } = req.params;
    if (lineNumber === 'e9001') {
      return res(ctx.status(403), ctx.json({}));
    }
    return res(ctx.status(200), ctx.json(associatedUsers));
  },
);

const userAccessManyMock = rest.get(`${baseUrl}/me`, async (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(userAccessMany));
});

interface RevokeAccessParams {
  entityId: string;
  number: string;
  type: string;
}

const revokeAccessMock = rest.delete<
  definitions['Response'],
  RevokeAccessParams
>(
  `${baseUrl}/:entityId/:type/:number`,
  async ({ params: { number, entityId } }, res, ctx) => {
    if (entityId === 'SSC7333845957327295') {
      return res(
        ctx.status(400),
        ctx.json(revokeAccessFailureInsufficientPermission),
      );
    }
    switch (number) {
      case '4065':
        return res(ctx.status(400), ctx.json(revokeAccessFailureInvalidId));
      case '4183':
        return res(
          ctx.status(400),
          ctx.json(revokeAccessFailureInsufficientPermission),
        );
      case '4002':
        return res(
          ctx.status(400),
          ctx.json(revokeAccessFailureValidationError),
        );
      case '4007':
        return res(ctx.status(401), ctx.json(revokeAccessFailureNotLoggedIn));
      default:
        return res(ctx.status(200), ctx.json(revokeAccessSuccess));
    }
  },
);

const handlers = [
  accountAssociatedUsersMock,
  addAccountAccessMock,
  addLineAccessMock,
  lineAssociatedUsersMock,
  userAccessManyMock,
  revokeAccessMock,
];

export default handlers;
