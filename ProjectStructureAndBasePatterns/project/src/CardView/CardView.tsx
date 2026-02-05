import { FC } from "react"
import { Restaurant } from "../api"
import "./CardView.css"
import { StarRating } from "../StarRating/StarRating"

interface CardViewProps {
    card: Restaurant
}

export const CardView: FC<CardViewProps> = ({ card }) => {
    return (
        <div className="card-view">
            <img src={card.url} alt={card.name} className="card-view__img"/>
            <h1 className="card-view__heading">{card.name}</h1>
            <span className="card-view__description">{card.description}</span>
            <StarRating raiting={card.raiting}
    restaurantId={card.id}/>
            <div></div>
        </div>
    )
}