import a2pDataSources, { A2pDataSources } from './A2pDataSources';
import sparkDataSources, { SparkDataSources } from './SparkDataSources';

export type DataSources = A2pDataSources & SparkDataSources;

const datasources = (): DataSources => ({
  ...a2pDataSources(),
  ...sparkDataSources(),
});

export default datasources;
