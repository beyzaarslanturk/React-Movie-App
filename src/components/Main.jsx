import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

let API_key = "&api_key=6661017fb88d019ac38da649793f6e80";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];

const Main = () => {
    const [movieData, setMovieData] = useState([]);
    const [urlSet, setUrlSet] = useState(url);
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(urlSet);
                setMovieData(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [urlSet]);

    const getData = (movieType) => {
        if (movieType === "Popular") {
            url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
        }
        if (movieType === "Theatre") {
            url =
                base_url +
                "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
                API_key;
        }
        if (movieType === "Kids") {
            url =
                base_url +
                "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
                API_key;
        }
        if (movieType === "Drama") {
            url =
                base_url +
                "/discover/movie?with_genres=18&primary_release_year=2014" +
                API_key;
        }
        if (movieType === "Comedie") {
            url =
                base_url +
                "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
                API_key;
        }

        setUrlSet(url);
        setIsMenuOpen(false);
    };

    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            url =
                base_url +
                "/search/movie?api_key=6661017fb88d019ac38da649793f6e80&query=" +
                search;
            setUrlSet(url);
            setSearch("");
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="header bg-secondary flex md:h-[100px] w-full justify-around items-center py-3">
                <nav>
                    <ul className={`hidden md:flex ${isMenuOpen ? "" : "hidden"}`}>
                        {arr.map((value) => (
                            <li className="me-4" key={value}>
                                <a
                                    className="text-white text-md lg:text-xl font-bold py-1 px-2.5 relative"
                                    href="#"
                                    name={value}
                                    onClick={(e) => {getData(e.target.name);}}
                                >
                                    {value}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="md:hidden">
                        <button
                            className={`text-dark hover:text-white focus:outline-none ${isMenuOpen ? "active" : ""}`}
                            onClick={toggleMenu}
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                <path
                                    fillRule="evenodd"
                                    d="M3 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm18 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"
                                />
                            </svg>
                        </button>
                    </div>
                    <ul className={`md:hidden ${isMenuOpen ? "" : "hidden"}`}>
                        {arr.map((value) => (
                            <li className="me-4 pt-4" key={value}>
                                <a
                                    className="text-white text-md lg:text-xl font-bold py-1 px-2.5 relative"
                                    href="#"
                                    name={value}
                                    onClick={(e) => {
                                        getData(e.target.name);
                                    }}
                                >
                                    {value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <form>
                    <div className="search-btn flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Movie Name"
                            className="inputText rounded-lg ps-2 py-1 outline-none	border-2 border-primary"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            value={search}
                            onKeyPress={searchMovie}
                        />
                        <button className="bg-white py-1 px-2 rounded-md border-2 border-primary text-secondary">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="movies-container flex justify-center my-10">
                <div className="container px-10">
                    <div className="flex gap-3 flex-wrap items-center justify-center m-auto">
                        {movieData
                            .filter(
                                (movie) =>
                                    movie.poster_path !== null &&
                                    movie.vote_average > 0 &&
                                    movie.title.split(" ").length <= 5
                            )
                            .map((res, pos) => (
                                <Card
                                    info={{ ...res, vote_average: res.vote_average.toFixed(1), }}
                                    key={pos}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;