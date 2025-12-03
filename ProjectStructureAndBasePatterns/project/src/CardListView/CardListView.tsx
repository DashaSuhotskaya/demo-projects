import { FC } from "react";
import { Restaurant } from "../api";
import { CardView } from "../CardView/CardView";
import "./CardListView.css"

export interface CardListViewProps {
  cardList: Restaurant[];
}

export const CardListView: FC<CardListViewProps> = ({ cardList }) => {
  return (
    <ul className="cardlist-view">
      {cardList.map((card) => (
        <li className="" key={card.id}>
          <CardView card={card} />
        </li>
      ))}
    </ul>
  );
};
