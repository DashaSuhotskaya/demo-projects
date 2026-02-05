import LogoIcon from "./assets/stair.svg?react";
import "./styles.css";
import { FetchCardListView } from "./CardListView/FetchCardListView";
import {
  RestaurantContext,
  useRestaurantRating,
} from "./Context/RestaurantContext";
import { useState } from "react";

function App() {
  const updateRatingMutation = useRestaurantRating();

  const [findRestaurants, setFindRestaurants] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFindRestaurants(newValue);
  };

  const contextValue = {
    updateRating: (id: string, newRating: number) => {
      return updateRatingMutation.mutateAsync({ id, raiting: newRating });
    },
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      <header>
        <div className="logo">
          <LogoIcon width={16} height={16} className="logo__icon" />
          <span>Eats</span>
        </div>
        <div className="profile">
          <img alt="profile" src="/avatar.png" />
        </div>
      </header>
      <main>
        <input
          className="input"
          placeholder="Search for restaurants"
          value={findRestaurants}
          onChange={handleInputChange}
        />
        <section>
          <FetchCardListView searchValue={findRestaurants} />
        </section>
      </main>
      <footer>
        <p>Privacy Policy</p>
        <p className="corporation">2022 Eats</p>
        <p>Terms Of Service</p>
      </footer>
    </RestaurantContext.Provider>
  );
}

export default App;
