"use client";

import { createContext } from "react";

type PageContextProps = {
  pagination?: any;
  setPagination?: any;
  data?: any;
  setData?: any;
  orderBy?: string;
  setOrderBy?: any;
  totalData?: number;
};

export const PageContextContext = createContext<PageContextProps>({});
