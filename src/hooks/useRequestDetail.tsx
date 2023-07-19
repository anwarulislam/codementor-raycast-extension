import { useCachedPromise } from "@raycast/utils";

import { ENDPOINTS } from "../helpers/endpoints";
import { RequestDetail, RequestItem } from "../helpers/models";
import { customFetch } from "../helpers/utils";

export function useRequestDetail(initialRequest: RequestDetail | RequestItem) {
  const { data: response, ...rest } = useCachedPromise<(requestId: string) => Promise<RequestDetail>, RequestDetail>(
    async (requestId) => {
      const params = new URLSearchParams();
      params.append("access_as", "mentor");

      return customFetch({
        url: `${ENDPOINTS.requestDetail}/${requestId}?${params.toString()}`,
        method: "GET",
      });
    },
    [initialRequest.random_key],
    { initialData: initialRequest as RequestDetail }
  );

  return { data: response ?? {}, ...rest };
}
