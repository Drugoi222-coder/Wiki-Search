import { makeAutoObservable } from "mobx";
import { languages } from "./constants";
import russianFlag from "./assets/img/Russian_flag.png";

class WikiStore {
    searchValue = "";
    dataArray = [];
    language = languages.ru;
    imgSrc = russianFlag;

    constructor() {
        makeAutoObservable(this);
    }

    setDataArr(dataArr) {
        this.dataArray = dataArr; 
    }

    setSearchValue(value) {
        this.searchValue = value;
    }

    setLanguage(language) {
        this.language = language;
    }

    setImgSrc(src) {
        this.imgSrc = src;
    }
}

const mainWikiStore = new WikiStore();

export default mainWikiStore;