import React, {useState} from 'react';
import { FaStar } from 'react-icons/fa';


const Estrelas = ({setGrade, grade}) => {
    const [hover, setHover] = useState(null);

    return (
    <section>
        <div className='estrelas'>
            {[...Array(5)].map((star, i) => {
            const gradeValue = i + 1;

            return (
            <label key={i}>
                <input
                className='hidden' 
                type='radio'
                name='rating'
                value={{gradeValue}}
                onClick={() => setGrade(gradeValue)}
                            
                />
                            
                    <FaStar className='star'
                    size={30}
                    color={gradeValue <= (hover || grade) ? "#fbbf24" : "#d9d9d9"}
                    onMouseEnter={() => setHover(gradeValue)}
                    onMouseLeave={() => setHover(null)}
                    />
                             
            </label>
            );
        })}
        </div>
    <p>Você avaliou o nosso site em {grade} estrelas.</p>
</section>
    );
}

export default Estrelas