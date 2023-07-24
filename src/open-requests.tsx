import { List } from "@raycast/api";
import { useState } from "react";

import RequestListItem from "./components/RequestListItem";
import { useOpenRequests } from "./hooks/useOpenRequests";

const filters = [
  {
    label: "Related",
    value: "related",
  },
  {
    label: "My interested requests",
    value: "interested",
  },
  {
    label: "Others",
    value: "other",
  },
  {
    label: "All",
    value: "",
  },
];

export default function OpenRequests() {
  const [filterType, setFilterBy] = useState<string>("related");
  const { data, isLoading, mutate: mutateList } = useOpenRequests(filterType);

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Filter by title"
      searchBarAccessory={
        <List.Dropdown tooltip="Filter type" defaultValue={"related"} storeValue onChange={setFilterBy}>
          {filters.map((item) => {
            return <List.Dropdown.Item key={item.label} title={item.label} value={item.value} />;
          })}
        </List.Dropdown>
      }
    >
      {data?.map((item, i) => {
        return <RequestListItem key={i} request={item} mutateList={mutateList} />;
      })}

      <List.EmptyView title="No requests found" />
    </List>
  );
}
