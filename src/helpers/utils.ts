import { Color, Icon, getPreferenceValues } from "@raycast/api";
import fetch, { RequestInit, RequestInfo } from "node-fetch";
import { Detail, RequestDetail, RequestItem, RequestType } from "./models";
import { format } from "date-fns";

export const capitalizeFC = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getIcon = (type: RequestItem["request_type"]) => {
  switch (type) {
    case "one_on_one":
      return Icon.Video;
    case "longterm":
      return Icon.Livestream;
    case "offline_help":
      return Icon.Alarm;
    default:
      return Icon.Code;
  }
};

export const getLabel = (type: RequestItem["request_type"]) => {
  switch (type) {
    case "one_on_one":
      return "1:1 Live Session";
    case "longterm":
      return "Longterm";
    case "offline_help":
      return "Freelance Project";
    default:
      return "Code Review";
  }
};

export const getColor = (type: RequestItem["request_type"]): Color => {
  switch (type) {
    case "one_on_one":
      return Color.Yellow;
    case "longterm":
      return Color.Orange;
    case "offline_help":
      return Color.Green;
    default:
      return Color.Red;
  }
};

export const getRate = (type: RequestType, budget: string) => {
  if (type === "offline_help") return `$${budget}`;
  return `$${Number(budget) * 4}/hr`;
};

const ovObj = {
  // Request overview: key
  kind: "Kind",
  tech_family: "Tech Family",
  estimated_completion_date: "Expected to be completed by",
  estimated_length: "Estimated Length",

  // Request overview: value
  troubleshooting: "Troubleshooting",
  tutoring: "Tutoring",
  "existing-project": "Existing Project",
  "new-project": "New Project",
  "web-app": "Web App",
  "mobile-app": "Mobile App",
  "desktop-app": "Desktop App",
  other: "Other",
} as const;

export const getMarkdown = (request: RequestDetail): string => {
  if (!request || !request.detail) return "";

  let markdown = `## ${request.title}`;
  let overview = `\n\n## Request overview`;
  let details = `\n\n## Request detail`;
  details += `\n ${request.detail.description}`;

  // key is key of detail
  Object.keys(request.detail).forEach((key) => {
    if (key !== "description") {
      let data = request.detail[key as keyof Detail];
      if (data) {
        if (typeof data === "string") {
          data = ovObj[data as keyof typeof ovObj] ?? data;
        } else {
          data = format(new Date(data * 1000), "dd MMMM yyyy");
        }
        let title = ovObj[key as keyof typeof ovObj] ?? key;
        overview += `\n - ${title}: **${data.trim()}**`;
      }
    }
  });

  markdown += overview;
  markdown += details;

  return markdown;
};

export function customFetch<T>(options: RequestInit & { url: URL | RequestInfo }): Promise<T> {
  const pref = getPreferenceValues();

  return fetch(options.url, {
    ...options,
    headers: {
      "x-requested-from": "cm-web",
      cookie: `REFRESH_TOKEN=${pref["REFRESH_TOKEN"]}; ACCESS_TOKEN=${pref["ACCESS_TOKEN"]}`,
      ...options?.headers,
    },
  })
    .then((res) => res.json() as Promise<T>)
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
}
