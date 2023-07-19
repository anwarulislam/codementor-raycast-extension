import { List } from "@raycast/api";
import { useState } from "react";

import { useMySchedule } from "./hooks/useMySchedule";
import ScheduleListItem from "./components/ScheduleListItem";

export default function OpenRequests() {
  const [filterType, setfilterType] = useState<string>("past");
  const { data, isLoading, mutate: mutateList } = useMySchedule(filterType);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter by title">
      {data?.map((item, i) => {
        return <ScheduleListItem key={item.random_key} schedule={item} mutateList={mutateList} />;
      })}

      <List.EmptyView title="No schedule found" />
    </List>
  );
}
