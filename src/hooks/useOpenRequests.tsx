import { useCachedPromise } from "@raycast/utils";

import { ENDPOINTS } from "../helpers/endpoints";
import { RequestItem } from "../helpers/models";
import { customFetch } from "../helpers/utils";

export function useOpenRequests(filterBy: string) {
  const { data: response, ...rest } = useCachedPromise<(filterBy: string) => Promise<RequestItem[]>, undefined>(
    (filterBy) => {
      const params = new URLSearchParams();
      if (filterBy) params.append("search_type", filterBy);

      return customFetch({
        url: `${ENDPOINTS.requests}?${params.toString()}`,
        method: "GET",
      });
    },
    [filterBy]
  );

  return { data: response ?? [], ...rest };
}
