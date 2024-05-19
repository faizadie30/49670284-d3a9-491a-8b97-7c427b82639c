"use client";

export type ParamGetUsers = {
  orderBy?: string;
  page?: number;
  limit?: number;
};

const base_url = "http://localhost:3000";

export async function getUsers(params: ParamGetUsers) {
  const filter = {
    orderBy: !params.orderBy ? "" : params.orderBy,
    page: !params.page ? 1 : params.page,
    limit: 10,
  };

  const queryParams = Object.entries(filter)
    .filter(([value]) => value !== "") // Filter out empty values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  const url = `${base_url}/user/?${queryParams}`;
  const res = await fetch(url);

  return res.json();
}
