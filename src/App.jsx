import { getPageUrl, getWikiData, preventEventDefault } from "./utils.js";
import { languages, russianFlag, britishFlag } from "./constants.js";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import "normalize.css";
import "./App.css";

const App = observer(({ store }) => {
    const { language, searchValue, dataArray, imgSrc } = store;

    const createLinksList = (array) =>
        array.map(({ key, title }) => (
            <li key={nanoid()} className="wikiSearch__list-item">
                <a
                    className="wikiSearch__link"
                    href={getPageUrl(language, key)}
                    target="_blank"
                >
                    {title}
                </a>
            </li>
        ));

    const getTitles = async () => {
        const rawData = await getWikiData(language, searchValue);
        const data = rawData.pages.map(({ key, title }) => ({ key, title }));
        store.setDataArr(createLinksList(data));
    };

    const setSearchValue = (e) => store.setSearchValue(e.target.value);

    const switchLanguage = () => {
        if (language === languages.ru) {
            store.setImgSrc(britishFlag);
            store.setLanguage(languages.en);
        } else if (language === languages.en) {
            store.setImgSrc(russianFlag);
            store.setLanguage(languages.ru);
        }
    };

    return (
        <form className="wikiSearch" onSubmit={preventEventDefault}>
            <div className="wikiSearch__panel">
                <input
                    className="wikiSearch__input"
                    onChange={setSearchValue}
                    type="text"
                />
                <button className="wikiSearch__search" onClick={getTitles}>
                    Поиск
                </button>
                <button
                    onClick={switchLanguage}
                    className="wikiSearch__language"
                >
                    <img className="wikiSearch__img" src={imgSrc} />
                </button>
            </div>
            <ul className="wikiSearch__list">{dataArray}</ul>
        </form>
    );
});

export default App;
