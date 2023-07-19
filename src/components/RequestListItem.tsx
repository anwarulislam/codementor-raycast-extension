import { Action, Color, Icon, Image, List } from "@raycast/api";
import { MutatePromise } from "@raycast/utils";
import { format } from "date-fns";

import { RequestDetail, RequestItem } from "../helpers/models";
import { getColor, getIcon, getRate } from "../helpers/utils";
import RequestActions from "./Actions";
import RequestDetailView from "./RequestDetail";

type RequestListItemProps = {
  request: RequestItem | RequestDetail;
  mutateList: MutatePromise<RequestItem[] | undefined>;
};

export default function RequestListItem({ request, mutateList }: RequestListItemProps) {
  // from unix timestamp
  const updatedAt = new Date(request.created_at * 1000);

  const accessories: List.Item.Accessory[] = [
    {
      date: updatedAt,
      tooltip: `Opened: ${format(updatedAt, "EEEE d MMMM yyyy 'at' hh:mm")}`,
    },
    {
      icon: {
        source: request.user.small_avatar_url,
        mask: Image.Mask.Circle,
      },
      tooltip: `Mentee: ${request.user.name}`,
    },
  ];

  if (request.read) {
    accessories.unshift({
      icon: {
        source: Icon.Checkmark,
        tintColor: Color.Green,
      },
      tooltip: `Read`,
    });
  }

  return (
    <List.Item
      icon={{
        source: getIcon(request.request_type),
        tintColor: getColor(request.request_type),
      }}
      key={request.random_key}
      title={request.title}
      subtitle={{
        value: `${getRate(request.request_type, request.estimated_budget)} · ${request.interest_count}`,
        tooltip: request.categories.map((c) => c.name).join(", "),
      }}
      accessories={accessories}
      actions={
        <RequestActions request={request} mutateList={mutateList}>
          <Action.Push
            title="Show Details"
            icon={Icon.Sidebar}
            target={<RequestDetailView initialRequest={request} />}
          />
        </RequestActions>
      }
    />
  );
}
