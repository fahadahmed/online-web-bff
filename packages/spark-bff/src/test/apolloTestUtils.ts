import { DocumentNode } from 'graphql';
import { GraphQLRequest } from 'apollo-server-core';
import server from '../server';

type TestClientHandler = Omit<GraphQLRequest, 'query'> & {
  mutation?: DocumentNode;
  query?: DocumentNode;
};

export function createTestClient() {
  const handler = ({ query, mutation, ...params }: TestClientHandler) => {
    if (mutation) {
      return server.executeOperation({ query: mutation, ...params });
    }
    return server.executeOperation({ query, ...params });
  };

  return {
    mutate: handler,
    query: handler,
  };
}

export { gql } from 'apollo-server-fastify';
