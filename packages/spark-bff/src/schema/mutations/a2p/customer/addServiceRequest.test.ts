import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { addServiceRequestMock } from 'datasources/a2p/customer/mocks/addServiceRequest';

test('request add service request', async () => {
  server.use(addServiceRequestMock);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        a2pAddServiceRequest(
          input: {
            companyName: "Twillio"
            customerNumber: "123"
            contentProviderId: 1
            preferredNumber: "1234"
            messageType: STANDARD
            messageUsage: MARKETING
            serviceEndDateTime: "2020-12-25T00:00:00.000Z"
            carriers: [SPARK, TWODEGREES, VODAFONE]
            serviceName: "Two-factor authentication for email account log-in"
            serviceDescription: "Every seven days, employees using their company email account on their mobile phones are automatically logged out of the network and required to log back in for security reasons. As part of this they are sent a code via SMS and asked to enter this along with their email network password in order to log in."
            mobileTerminatingMessageExample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut."
            mobileOriginatingMessageExample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut."
            serviceMarketingChannels: ["PRINT", "ONLINE", "RADIO"]
            expectedMessageVolume: LOW
            expectedMessageVolumeDescription: "5000-1000"
            predictedPeakTimeDescription: "Every Friday, Christmas eve"
            firstName: "John"
            lastName: "Doe"
            jobTitle: "Master Roaster"
            serviceComplianceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut."
            address: {
              label: "50 Auckland Road, Greenmeadows, Napier 4112"
              elid: "301344270"
            }
            technicalContact: {
              firstName: "Fred"
              lastName: "Smith"
              phoneNumber: "+6427427527"
              email: "fred.smith@tech.co"
            }
            signature: "test signature"
          }
        ) {
          serviceRequestId
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "a2pAddServiceRequest": Object {
        "serviceRequestId": "REQ001055759",
      },
    }
  `);
});
