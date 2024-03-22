# Changelog

## 4.1.0

### Minor Changes

- a6813ab35: Add cartView query and updateCartUser mutation
- 0b815d937: Add cart field to addBundles and deleteBundle mutations

## 4.0.0

### Major Changes

- 27cc1217d: - [Breaking change] Removed productCharateristic field in productDetails schema
- 5b324af27: Breaking Use Generic mutation response for update status code instead of status
- ca3b747db: - Updated ProductCharateristic type
  - Deprecated productCharateristic field and added new filed productCharateristics in ProductDetails type
  - Convert swagger and DESL typo 'balanceManageMent' to BFF field 'balanceManagement'
- 276aae091: remove extras sorting from bff

### Minor Changes

- ee5384a98: Add missing fields for add service request
- 598dc8f93: - Added isAffected field in AddBundleMutation response
- 2aa6cdc12: Add generic mutation responses to add and modify content provider
- 099c72953: - Added optional field 'filterDate' in checkoutStructure query
- 86ac254c7: Add businessName to accountList
- c332c97f1: Add CheckoutField component and deprecate fieldType
- 6ddd4f6d7: Add change payment processing type to subscriptions
  Update line subscriptions query
- aa0bf86f6: Add mutation response to add service request
- 7ffc8410d: A2P - Remove enum from MarketingChannel type and sort channel providers by id
- 6e57e7f5f: Add id for cart for explicity id in relay store

## 3.0.0

### Major Changes

- 88f8a2a64: - [BREAKING CHANGE] Change action to a nullable field in cart query.

  - [BREAKING CHANGE] Change productOfferImages to a nullable field in cart query.

  - Stop fetching product images for empty carts.

### Minor Changes

- 53e83acc2: add lineNumberReservations field to availableNumbers
- 148100a5b: Add id field to CheckoutDataResponse
- 3d20d1658: Add cart and checkoutData field resolvers to saveCheckoutData

### Patch Changes

- d95d2bd6a: Add businessName to accountList

## 2.1.0

### Minor Changes

- 286eee10e: Don't throw an error for guest or unauthenticated accountList queries
- 0cb7a4a7d: Add changesets
- 414ca7558: Add segment to accountList query
- 7beb78b38: Add hasSparkId field to authenticatedInfo query

### Patch Changes

- 16c631cc5: Fix git push for bump

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2022-06-28

- Add subCategories and update mocks for Information Layer.

- Making major version bump to 2.0.0 as previous change is a breaking change.

## [1.9.0] - 2022-06-20

- [BREAKING CHANGE] Deleted minimumExpression field from checkoutStructure. Added new fields minimumRule and maximumRule.

## [1.8.0] - 2022-06-27

- Removed effectivePriceTax and always returning basePriceTax for gst field in cart query.

## [1.8.0] - 2022-06-27

- Rework SubmitOrder for self-service

## [1.7.0] - 2022-06-23

- Add ProductOfferImages field in cart query

## [1.6.0] - 2022-06-23

- Adding success/error handlers for relatedAddons and getCart
- Updating relatedAddons to return addonActions and cart meant for Addons page

## [1.5.0] - 2022-06-20

- Updated CartServiceV2 swagger, returns GST/Tax values in cart query
- Updated add item to bundle handler
- Added cart page journey content mock

## [1.4.1] - 2022-06-20

- Make autoRenew optional in schema

## [1.4.0] - 2022-06-20

- Add REACTIVATE to subscription schema
- Update LineSubscriptionService swagger

## [1.3.0] - 2022-06-19

- Added productOfferingId field in cart query under type Item.

## [1.2.0] - 2022-06-17

- Add PAYMENT_OPTIONS field type

## [1.1.0] - 2022-06-17

- Updating CartServiceV2 swagger and cart query to include contractTerm

## [1.0.0] - 2022-06-16

- Seperation of Online Shop and journey-commons into their own respective repositories
