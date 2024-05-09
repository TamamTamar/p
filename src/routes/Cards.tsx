import { Link } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useCardContext } from "../contexts/CardsContext";
import "./Cards.scss";
import { useState, useEffect } from "react";
import FavoriteButton from "../components/FavoriteButton";
import { useCards } from "../hooks/useCards";
import { useAuth } from "../contexts/AuthContext";

import axios from "axios";
import { useSearch } from "../hooks/useSearch";
import { CardType } from "../@types/cardData";
import { getCards } from "../services/cards";





const Cards = ({ favoritesOnly = false }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { token,isLoggedIn } = useAuth();
  const { searchTerm } = useSearch();

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(currentFavorites);

    setLoading(true);
    getCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch(() => setError("Error fetching cards"))
      .finally(() => setLoading(false));
  }, []);

  const addToFavorites = (cardId: string) => {
    const newFavorites = favorites.includes(cardId)
        ? favorites.filter(id => id !== cardId)
        : [...favorites, cardId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
};
  const filteredCards = cards.filter(card => { // Filter cards based on search term and favorites
    const matchesSearchTerm = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    return favoritesOnly
      ? matchesSearchTerm && favorites.includes(card._id)
      : matchesSearchTerm;
  })

  return (
    <div className="cards-container dark:bg-gray-700">
      {filteredCards.map((card: CardType) => (
        <div key={card._id}>
          <Link to={`/cards/${card._id}`} className="card-link dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
            {isLoggedIn && (
                <FavoriteButton
                cardId={card._id}
                isFavorite={favorites.includes(card._id)}
                onToggleFavorite={addToFavorites} token={""}
              />
            )}
          
            <h2 className="card-title">{card.title}</h2>
            <hr />
            <p className="card-subtitle">{card.subtitle}</p>
            <img src={card.image.url} alt={card.image.alt} className="card-image" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
