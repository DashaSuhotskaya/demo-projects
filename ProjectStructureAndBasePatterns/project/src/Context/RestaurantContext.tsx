import { useMutation } from "@tanstack/react-query";
import { createContext } from "react";
import { Restaurant, updateRestaurantRating } from "../api";
import { queryClient } from "../queryClient";

interface RestaurantContextType {
  updateRating: (
    restaurantId: string,
    newRating: number
  ) => Promise<Restaurant>;
}

export const RestaurantContext = createContext<
  RestaurantContextType | undefined
>(undefined);

export const useRestaurantRating = () => {
  const updateRatingMutation = useMutation(
    {
      mutationFn: updateRestaurantRating,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      },
    },
    queryClient
  );
  return updateRatingMutation;
};
