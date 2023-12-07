export default function MediaFeed({ data }) {
    return (
        <>
        <div className="text-center">
            <div id="media">
                {data === 'Sem avaliações' ? <div className="text-2xl">{data}</div> 
                : data > 0 && data <= 0.5 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star-half"></i></div>
                : data > 0.5 && data <= 1 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i></div>
                : data > 1 && data <= 1.5 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half"></i></div>
                : data > 1.5 && data <= 2 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                : data > 2 && data <= 2.5 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half"></i></div>
                : data > 2.5 && data <= 3 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                : data > 3 && data <= 3.5 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half"></i></div>
                : data > 3.5 && data <= 4 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                : data > 4 && data <= 4.5 ? <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half"></i></div>
                : <div className="text-5xl text-yellow-300"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>}
            </div>
            <p className="text-xl mt-2">Média: {data}/5</p>
        </div>
        </>
    )
}