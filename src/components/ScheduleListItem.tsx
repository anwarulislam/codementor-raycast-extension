import { Color, Icon, Image, List } from "@raycast/api";
import { MutatePromise } from "@raycast/utils";

import { ScheduleItem } from "../helpers/models";
import { format } from "date-fns";
import { capitalizeFC } from "../helpers/utils";

type ScheduleListItemProps = {
  schedule: ScheduleItem;
  mutateList: MutatePromise<ScheduleItem[] | undefined>;
};

export default function ScheduleListItem({ schedule, mutateList }: ScheduleListItemProps) {
  // from unix timestamp
  const startedAt = new Date(schedule.start_at * 1000);
  const endedAt = new Date(schedule.end_at * 1000);

  const accessories: List.Item.Accessory[] = [
    {
      tag: {
        value: capitalizeFC(schedule.aasm_state),
        color: schedule.aasm_state === "confirmed" ? Color.Green : Color.Orange,
      },
    },
    {
      date: startedAt,
      tooltip: `${format(startedAt, "EEEE d MMMM yyyy 'from' hh:mm 'to'")} ${format(endedAt, "hh:mm")}`,
    },
    {
      icon: {
        source: schedule.user.small_avatar_url,
        mask: Image.Mask.Circle,
      },
      tooltip: `Mentee: ${schedule.user.name}`,
    },
  ];

  // if (request.read) {
  //   accessories.unshift({
  //     icon: {
  //       source: Icon.Checkmark,
  //       tintColor: Color.Green,
  //     },
  //     tooltip: `Read`,
  //   });
  // }

  return (
    <List.Item
      icon={Icon.Calendar}
      title={`Scheduled session with ${schedule.user.name}`}
      subtitle={`${format(startedAt, "hh:mm 'to'")} ${format(endedAt, "hh:mm")}`}
      accessories={accessories}
    />
  );
}
