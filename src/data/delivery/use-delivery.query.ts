import { QueryParamsType, DeliveriesQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Delivery from "@repositories/delivery";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { TagPaginator } from "@ts-types/generated";

const fetchDeliveries = async ({
  queryKey,
}: QueryParamsType): Promise<{ tags: TagPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    shop_id,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as DeliveriesQueryOptionsType;

  const searchString = stringifySearchQuery({
    ref_no: text,
    type,
  });
  const url = `${API_ENDPOINTS.DELIVERIES}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&shop_id=${shop_id}`;
  const {
    data: { data, ...rest },
  } = await Delivery.all(url);

  return {
    deliveries: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useDeliveriesQuery = (options: DeliveriesQueryOptionsType) => {
  return useQuery<{ tags: TagPaginator }, Error>(
    [API_ENDPOINTS.TAGS, options],
    fetchDeliveries,
    {
      keepPreviousData: true,
    }
  );
};

export { useDeliveriesQuery, fetchDeliveries };
