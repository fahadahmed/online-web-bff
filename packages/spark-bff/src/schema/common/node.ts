import { interfaceType, idArg, queryField } from 'nexus';
import { introspectNodeID } from '../../utils/graphNode';

export const Node = interfaceType({
  name: 'Node',
  description: 'Superclass for other objects',
  resolveType(item) {
    return introspectNodeID(item.id).type;
  },
  definition(t) {
    t.id('id', {
      description: 'GUID for a resource',
    });
  },
});

export const NodeQuery = queryField((t) => {
  t.nullable.field('node', {
    type: Node,
    description: 'Allows to refetch any node by its ID',
    args: {
      id: idArg({ description: 'ID of the node' }),
    },
    resolve() {
      return null;
    },
  });
});
