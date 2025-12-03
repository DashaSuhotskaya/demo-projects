import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { getRestaurants } from "../api";
import { CardListView } from "./CardListView";
import { Loader } from "../Loader/Loader";

export const FetchCardListView = ({ searchValue }: { searchValue: string }) => {
  const cardListQuery = useQuery(
    {
      queryFn: () => getRestaurants(),
      queryKey: ["restaurants"],
    },
    queryClient
  );

  const filtered =
    cardListQuery.data?.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];

  switch (cardListQuery.status) {
    case "success":
      return <CardListView cardList={filtered} />;
    case "error":
      return <div>Произошла ошибка</div>;
    case "pending":
      return <Loader />;
  }
};
