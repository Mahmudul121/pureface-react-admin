import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import * as categoriesIcon from "@components/icons/category";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";
import TitleWithSort from "@components/ui/title-with-sort";

export type IProps = {
  deliveries: any | undefined | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const DeliverList = ({ deliveries, onPagination, onSort, onOrder }: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = deliveries! ?? {};
  const rowExpandable = (record: any) => record.children?.length;

  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: "Order Number",
      dataIndex: "ref_no",
      key: "ref_no",
      align: "center",
      width: 150,
    },
    {
      title: "Cash Amount",
      dataIndex: "cash",
      key: "cash",
      align: "center",
      width: 150,
    },
    {
      title: "Sender Name",
      dataIndex: "sender_name",
      key: "sender_name",
      align: "center",
      width: 150,
    },
    {
      title: "Sender Address",
      dataIndex: "sender_address",
      key: "sender_address",
      align: "center",
      width: 400,
    },
    {
      title: "Sender Mobile",
      dataIndex: "sender_mobile",
      key: "sender_mobile",
      align: "center",
      width: 150,
    },
    {
      title: "Sender Email",
      dataIndex: "sender_email",
      key: "sender_email",
      align: "center",
      width: 150,
    },
    {
      title: "Receiver Name",
      dataIndex: "receiver_name",
      key: "receiver_name",
      align: "center",
      width: 150,
    },
    {
      title: "Receiver Address",
      dataIndex: "receiver_address",
      key: "receiver_address",
      align: "center",
      width: 400,
    },
    {
      title: "Receiver Mobile",
      dataIndex: "receiver_mobile",
      key: "receiver_mobile",
      align: "center",
      width: 150,
    },
    {
      title: "Receiver Email",
      dataIndex: "receiver_email",
      key: "receiver_email",
      align: "center",
      width: 150,
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          //@ts-ignore
          data={data}
          rowKey="id"
          scroll={{ x: 1500 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default DeliverList;
