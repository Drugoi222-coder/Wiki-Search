import { getPageUrl, getWikiData, preventEventDefault } from "./utils.js";
import { languages } from "./constants.js";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import "normalize.css";
import "./App.css";

const App = observer(({ store }) => {
    const { langInfo, searchValue, dataArray } = store;

    const createLinksList = (array) =>
        array.map(({ key: wikiKey, title }) => (
            <li key={nanoid()} className="wikiSearch__list-item">
                <a
                    className="wikiSearch__link"
                    href={getPageUrl(langInfo.langKey, wikiKey)}
                    target="_blank"
                >
                    {title}
                </a>
            </li>
        ));

    const getTitles = async () => {
        if (searchValue.length > 0) {
            const rawData = await getWikiData(langInfo.langKey, searchValue);
            const data = rawData.pages.map(({ key, title }) => ({
                key,
                title,
            }));
            if (data.length > 0) {
                store.setDataArr(createLinksList(data));
            }
        } else {
            store.setDataArr([]);
        }
    };

    const setSearchValue = (e) => store.setSearchValue(e.target.value);

    const switchLanguage = () => {
        if (langInfo.langKey === languages.ru) {
            store.setLangInfo(languages.en);
        } else if (langInfo.langKey === languages.en) {
            store.setLangInfo(languages.ru);
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
                    <img className="wikiSearch__img" src={langInfo.imgSrc} />
                </button>
            </div>
            <ul className="wikiSearch__list">{dataArray}</ul>
        </form>
    );
});

export default App;
