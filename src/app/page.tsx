"use client";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Table from "./table";
import { PageContextContext } from "@/Context/PageContext";
import { ParamGetUsers, getUsers } from "@/api/users";

export default function Home() {
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState<any>([]);
  const [orderBy, setOrderBy] = useState<string>("id asc");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchUser = useMemo(
    () => async (params: ParamGetUsers) => {
      try {
        const getDataUsers = await getUsers({
          ...params,
        });

        setData(getDataUsers.data);
        setTotalData(getDataUsers.paginate.totalItems);
        setPagination({
          pageIndex: getDataUsers.paginate.currentPage - 1,
          pageSize: 10,
        });
        setOrderBy(getDataUsers.paginate.orderBy);
      } catch (error) {
        setPagination({ pageIndex: 0, pageSize: 10 });
        setData([]);
        setOrderBy("id asc");
      }
    },
    []
  );

  useEffect(() => {
    fetchUser({
      orderBy,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    });
  }, [orderBy, pagination]);

  return (
    <PageContextContext.Provider
      value={{
        pagination,
        setPagination,
        data,
        setData,
        orderBy,
        setOrderBy,
        totalData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            <Table />
          </div>
        </div>
      </div>
    </PageContextContext.Provider>
  );
}
