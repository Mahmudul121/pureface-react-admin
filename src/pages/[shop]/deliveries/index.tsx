
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import Card from "@components/common/card";
import ShopLayout from "@components/layouts/shop";
import Search from "@components/common/search";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import DeliverList from "@components/deliver/deliver-list";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { useDeliveriesQuery } from "@data/delivery/use-delivery.query";
import { SortOrder } from "@ts-types/generated";
import { useShopQuery } from "@data/shop/use-shop.query";

export default function Deliveries() {
	
	const {
    query: { shop },
  } = useRouter();

  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );
  const shopId = shopData?.shop?.id!;

  console.log(shopId);

	const { t } = useTranslation();
	const [ searchTerm, setSearchTerm ] = useState("");
	const [ page, setPage ] =useState(1);
	const [ orderBy, setOrder ] = useState("created_at");
	const [ sortedBy, setColumn ] = useState<SortOrder>(SortOrder.Desc);
	const{
		data,
		isLoading: loading,
		error,
	} = useDeliveriesQuery({
		limit: 10,
		shop_id: Number(shopId),
		orderBy,
		sortedBy,
		text: searchTerm,
		page,
	});

	if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

	return (
		<>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
             {/*{t("common:sidebar-nav-item-tags")}*/}
             Deliveries
          </h1>
        </div>

        <div className="w-full xl:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />
        </div>
      </Card>

      <DeliverList
        deliveries={data?.deliveries}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
	);
}

Deliveries.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};

Deliveries.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
