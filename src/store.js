import { makeAutoObservable } from "mobx";
import { languages } from "./constants";
import russianFlag from "./assets/img/Russian_flag.png";
import britishFlag from "./assets/img/british_flag.webp";

class WikiStore {
    searchValue = "";
    dataArray = [];
    langInfo = {
        langKey: languages.ru,
        imgSrc: russianFlag,
    };

    constructor() {
        makeAutoObservable(this);
    }

    setDataArr(dataArr) {
        this.dataArray = dataArr;
    }

    setSearchValue(value) {
        this.searchValue = value;
    }

    setLangInfo(language) {
        if (language === languages.ru) {
            this.langInfo.imgSrc = russianFlag;
        } else if (language === languages.en) {
            this.langInfo.imgSrc = britishFlag;
        }
        this.langInfo.langKey = language;
    }
}

const mainWikiStore = new WikiStore();

export default mainWikiStore;
