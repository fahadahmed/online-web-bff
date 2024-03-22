import { NexusGenEnums, NexusGenRootTypes } from 'generated/nexusTypes';
import { formatQuery } from 'utils/query';
import { A2PBaseAPI } from '../A2PBaseAPI';

/**
 * The A2P Messaging Shortcode API also metrics to understand the near-real
 * time performance of message carriage including message statuses, delivery rates,
 * volumes and average delivery time for a given shortcode. It also allows the management
 * and creation of new shortcodes.
 */
class ShortcodesAPI extends A2PBaseAPI {
  constructor() {
    super('v1/services/a2p-messaging/shortcodes');
  }

  public async getShortcodes(
    dateRange: NexusGenEnums['A2PDateRange'],
  ): Promise<NexusGenRootTypes['A2PAdminShortcodeItem'][]> {
    const queryParameters = formatQuery({
      dateRange,
    });

    return (
      await this.get<{
        shortcodes: NexusGenRootTypes['A2PAdminShortcodeItem'][];
      }>(`/`, queryParameters)
    )?.shortcodes;
  }

  public async getShortcodesOverview(
    dateRange: NexusGenEnums['A2PDateRange'],
  ): Promise<NexusGenRootTypes['A2PAdminShortcodesOverview']> {
    return (
      await this.get<{
        overview: NexusGenRootTypes['A2PAdminShortcodesOverview'];
      }>(`/overview`, {
        dateRange,
      })
    )?.overview;
  }
}

export default ShortcodesAPI;
