import { FC, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinners from '../components/Spinners';
import FavoriteButton from '../components/FavoriteButton';
import { AuthContext } from '../contexts/AuthContext';
import './Cards.scss';
import './MyCard.scss';
import { FiEdit2 } from 'react-icons/fi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Card } from '../@types/cardData';
import { deleteCardById, getMyCards } from '../services/cards';



const MyCards: FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useContext(AuthContext);
    const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        getMyCards()
            .then(response => {
                setCards(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.toString());
                setLoading(false);
            });
    }, [token]);

    const deleteCard = (cardId: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCardById(cardId)
                .then(() => {
                    setCards(cards.filter(card => card._id !== cardId));
                })
                .catch(err => {
                    console.error("Error deleting card:", err);
                });
        }
    };

    const addToFavorites = (cardId: string) => {
        const newFavorites = favorites.includes(cardId)
            ? favorites.filter(id => id !== cardId)
            : [...favorites, cardId];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    if (!token) return <p>Please log in to view your cards.</p>;
    if (loading) return <Spinners />;
    if (error) return <div>Error loading your cards: {error}</div>;

    return (
        <div className="cards-container dark:bg-gray-700">
            {cards.map((card: Card) => (
                <div key={card._id} >

                    <div>

                        <div className="card-link dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
                            <div className="card-actions ">
                                <Link to={`/update/${card._id}`} className="card-edit-icon">
                                    <FaEdit />
                                </Link>
                                <FaTrash
                                    onClick={() => deleteCard(card._id)}
                                    className="card-delete-icon"
                                />
                                <FavoriteButton
                                    cardId={card._id}
                                    isFavorite={favorites.includes(card._id)}
                                    onToggleFavorite={addToFavorites} token={''} />
                            </div>
                            <Link to={`/cards/${card._id}`} >

                                <h2 className="card-title">{card.title}</h2>
                                <hr />
                                <p className="card-subtitle">{card.subtitle}</p>
                                <img src={card.image.url} alt={card.image.alt} className="card-image" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyCards;
