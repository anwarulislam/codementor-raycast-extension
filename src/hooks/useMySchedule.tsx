import { useCachedPromise } from "@raycast/utils";

import { ENDPOINTS } from "../helpers/endpoints";
import { ScheduleItem } from "../helpers/models";
import { customFetch } from "../helpers/utils";

export function useMySchedule(filterType: string) {
  const { data: response, ...rest } = useCachedPromise<(filterType: string) => Promise<ScheduleItem[]>, undefined>(
    (filterType) => {
      const params = new URLSearchParams();
      params.append("role", "mentor");
      if (filterType) params.append("filter_type", filterType);

      return customFetch({
        url: `${ENDPOINTS.mySchedule}?${params.toString()}`,
        method: "GET",
      });
    },
    [filterType]
  );

  return { data: response ?? [], ...rest };
}
