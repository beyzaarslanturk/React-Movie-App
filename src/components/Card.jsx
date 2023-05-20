import React from 'react'

const Card = (movie) => {
    console.log(movie.info);
    let img_path = "https://image.tmdb.org/t/p/w500"

    return (
        <>
            <div className='movie xl:w-1/5 lg:w-1/4 md:w-1/3 flex flex-col justify-center bg-secondary p-3 border-2 border-dark rounded-lg relative overflow-hidden'>
                <img src={img_path+movie.info.poster_path} className='poster' />
                <div className="movie-details flex flex-col justify-center items-center">
                    <div className="box w-full flex items-center justify-around p-3">
                        <h4 className="title text-sm font-bold">{movie.info.original_title}</h4>
                        <p className="rating bg-dark text-white text-center p-2 rounded-lg">{movie.info.vote_average}</p>
                    </div>
                    <div className="overview text-center absolute bg-secondary opacity-90 color-white p-4 w-full">
                        <h1 className='text-xl font-bold'>Overview</h1>
                        {movie.info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card