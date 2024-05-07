import { FC, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinners from '../components/Spinners';
import FavoriteButton from '../components/FavoriteButton';
import { AuthContext } from '../contexts/AuthContext';
import './Cards.scss';
import { FiEdit2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { Card } from '../@types/cardData';



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
        axios.get<Card[]>('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', {
            headers: { 'x-auth-token': token }
        })
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
            axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                headers: { 'x-auth-token': token }
            })
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
            {cards.map((card) => (
                <div key={card._id} >
                    <Link to={`/cards/${card._id}`} className="card-link dark:bg-gray-800">
                        <div className='flex gap-2 m-2'>
                        <Link to={`/update/${card._id}`} className='color-#007bff'><FiEdit2 /></Link>
                        <FaTrash onClick={() => deleteCard(card._id)} className='cursor-pointer text-red-500' />
                        <FavoriteButton
                            cardId={card._id}
                            isFavorite={favorites.includes(card._id)}
                            onToggleFavorite={() => addToFavorites(card._id)}
                            token={''} // Note: Should this be removed or replaced with actual token?
                        />
                        </div>
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

export default MyCards;
