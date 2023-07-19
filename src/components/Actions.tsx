import { Action, ActionPanel, Icon } from "@raycast/api";
import { MutatePromise } from "@raycast/utils";

import { RequestDetail, RequestItem } from "../helpers/models";

type RequestActionsProps = {
  request: RequestDetail | RequestItem;
  mutateList?: MutatePromise<RequestItem[] | undefined>;
  mutateDetail?: MutatePromise<RequestDetail>;
  children?: React.ReactNode;
};

export default function RequestActions({ request, mutateList, mutateDetail, children }: RequestActionsProps) {
  const requestUrl = `https://www.codementor.io`;

  async function mutate() {
    if (mutateList) {
      await mutateList();
    }

    if (mutateDetail) {
      await mutateDetail();
    }
  }

  return (
    <ActionPanel title={`Shortcuts`}>
      {children}

      <Action.OpenInBrowser url={`${requestUrl}/m/dashboard/open-requests/${request.random_key}`} />

      <ActionPanel.Section>
        <Action.OpenInBrowser
          url={`${requestUrl}/@${request.user.username}`}
          title={`View ${request.user.name}'s profile`}
          shortcut={{ modifiers: ["cmd"], key: "o" }}
        />
        <Action.CopyToClipboard
          content={`${requestUrl}/${request.random_key}`}
          title="Copy Request URL"
          shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
        />
      </ActionPanel.Section>

      <ActionPanel.Section>
        <Action
          icon={Icon.ArrowClockwise}
          title="Refresh"
          onAction={mutate}
          shortcut={{ modifiers: ["cmd"], key: "r" }}
        />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
