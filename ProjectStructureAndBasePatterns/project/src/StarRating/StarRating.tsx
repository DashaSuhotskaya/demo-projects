import { FC, useContext, useState } from "react";
import StarSvg from "../assets/star.svg?react"; 
import "./StarRating.css"
import { RestaurantContext } from "../Context/RestaurantContext";

interface StarRatingProps {
    raiting: number,
    restaurantId?: string;
}

export const StarRating: FC<StarRatingProps> = ({raiting, restaurantId}) => {
    const restaurantContext = useContext(RestaurantContext);
    const [error, setError] = useState<string | null>(null);
    
    const handleClick = async (star: number) => {
        if (restaurantId && restaurantContext) {
          setError(null)
          try {
            await restaurantContext.updateRating(restaurantId, star);
          } catch (e) {
            setError("Не удалось изменить рейтинг");
          }
        }
      };

    return (
      <>
        <div className="star-raiting">
            {[1, 2, 3, 4, 5].map((starValue) => {
                const isFilled = starValue <= raiting;
                return (
                    <span
                    key={starValue}
                    className={'star'}
                    onClick={() => handleClick(starValue)}
                  >
                    <StarSvg 
                      fill={isFilled ? "#FC350E" : "none"}
                      stroke="#FC350E"
                      width="20"
                      height="20"
                    />
                  </span>
                )
            })}
        </div>
        {error && <div className="star-error">{error}</div>}
        </>
    )
}