import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FC } from 'react';
import { FavoriteButtonProps } from '../@types/cardData';
import { isFavoriteUrl } from '../services/cards';
import dialogs from "../ui/dialogs";



const FavoriteButton: FC<FavoriteButtonProps> = ({ cardId, isFavorite, onToggleFavorite, token }) => {
    const toggleFavorite = () => {

        // Make a PATCH request to toggle favorite status on the server
        isFavoriteUrl(cardId)
            .then(() => {
                onToggleFavorite(cardId); // Update local state after successful server call
            })
            .catch(err => {
               dialogs.error("Error", err.response.data);
            });
    };

    return (
        <button
            className="add-to-favorite-button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite();
            }}
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
};

export default FavoriteButton;
