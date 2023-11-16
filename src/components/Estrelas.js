import React, {useState} from 'react';
import { FaStar } from 'react-icons/fa';




const Estrelas = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
    <section>
        <div className='estrelas'>
            {[...Array(5)].map((star, i) => {
            const ratingvalue = i + 1;

            return (
            <label>
                <input
                className='hidden' 
                type='radio'
                name='rating'
                value={{ratingvalue}}
                onClick={() => setRating(ratingvalue)}
                            
                />
                            
                    <FaStar className='star'
                    size={30}
                    color={ratingvalue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(ratingvalue)}
                    onMouseLeave={() => setHover(null)}
                    />
                             
            </label>
            );
        })}
        </div>
    <p>Você avaliou o nosso site em {rating} estrelas.</p>
</section>
    );
}

export default Estrelas