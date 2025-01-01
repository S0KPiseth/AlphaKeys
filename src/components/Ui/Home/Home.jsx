import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from '../../Button/Button.jsx';
import { fetchRandomWords } from '../../../utils/slug.jsx';

const Home = ({ loading, setLoading }) => {
    const [words, setWords] = useState("25");
    const [arrayword, setArrayWord] = useState([]);
    const [wpm, setWpm] = useState(0);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        const loadWords = async () => {
            const data = await fetchRandomWords(words);
            if (mounted) {
                setArrayWord(data);
            }
            setLoading(false);
        };

        loadWords();

        return () => {
            mounted = false;
        };
    }, [words, setLoading]);

    function handleRadio(e) {
        setWords(e.target.value);
        document.querySelector("#typeInput").focus();
        const radios = document.querySelectorAll(".labelRadio");
        radios.forEach((element) => (element.className = "labelRadio"));
        e.target.parentElement.className += " radio-bg";
    }

    return (
        <div className="page-wrapper">
            <div className="container hight-30">
                <div className="Panel">
                    <div className="wordContContainer">
                        <label htmlFor="twentyFive" className="labelRadio radio-bg">
                            <input type="radio" id="twentyFive" className="Radio" value="25" checked={words == "25"} onChange={handleRadio} />
                            25
                        </label>
                        <label htmlFor="Fifty" className="labelRadio">
                            <input type="radio" id="Fifty" className="Radio" value="50" checked={words == "50"} onChange={handleRadio} />
                            50
                        </label>
                        <label htmlFor="oneHundred" className="labelRadio">
                            <input type="radio" id="oneHundred" className="Radio" value="100" checked={words == "100"} onChange={handleRadio} />
                            100
                        </label>
                        <label htmlFor="oneFifty" className="labelRadio">
                            <input type="radio" id="oneFifty" className="Radio" value="150" checked={words == "150"} onChange={handleRadio} />
                            150
                        </label>
                    </div>
                    <p>WPM: {wpm}</p>
                </div>
            </div>
            <div className="typing-container">
                <Button 
                    word={arrayword} 
                    wpm={setWpm} 
                    setword={setWords} 
                    loading={loading} 
                    setLoading={setLoading} 
                />
            </div>
        </div>
    );
};

Home.propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default Home;

