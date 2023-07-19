import { Detail, Image } from "@raycast/api";

import { RequestDetail, RequestItem } from "../helpers/models";
import { capitalizeFC, getColor, getLabel, getMarkdown, getRate } from "../helpers/utils";
import { useRequestDetail } from "../hooks/useRequestDetail";
import RequestActions from "./Actions";

type RequestDetailProps = {
  initialRequest: RequestDetail | RequestItem;
};

export default function RequestDetailView({ initialRequest }: RequestDetailProps) {
  const interestCount = initialRequest.interest_count || 0;
  const { data: request, isLoading, mutate: mutateDetail } = useRequestDetail(initialRequest);

  const markdown = request.detail ? getMarkdown(request) : "";

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      navigationTitle={`${request.title}`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.TagList title={`Type`}>
            <Detail.Metadata.TagList.Item
              text={getLabel(request.request_type)}
              color={getColor(request.request_type)}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Label
            title="Expected Budget"
            text={`${getRate(request.request_type, request.estimated_budget)}`}
          />
          <Detail.Metadata.Label title="Request status" text={`${capitalizeFC(request.aasm_state)}`} />
          {interestCount && <Detail.Metadata.Label title="Interested" text={`${interestCount} People`} />}
          <Detail.Metadata.Label
            title="Opened by"
            text={`${request.user.name}`}
            icon={{
              source: request.user.small_avatar_url,
              mask: Image.Mask.Circle,
            }}
          />

          {request.categories && request.categories.length > 0 ? (
            <Detail.Metadata.TagList title={`${request.categories.length} Category`}>
              {request.categories.map((label) => {
                if (!label) {
                  return null;
                }

                return <Detail.Metadata.TagList.Item key={label.url_string} text={label.name} />;
              })}
            </Detail.Metadata.TagList>
          ) : null}

          {request.interest && <Detail.Metadata.Label title="Requested message" text={`${request.interest.message}`} />}
        </Detail.Metadata>
      }
      actions={<RequestActions request={request} mutateDetail={mutateDetail}></RequestActions>}
    />
  );
}
