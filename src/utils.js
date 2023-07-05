export const getTitlesUrl = (lang, content) =>
    `https://api.wikimedia.org/core/v1/wikipedia/${lang}/search/title?q=${content}&limit=5`;

export const getPageUrl = (lang,key) => `https://${lang}.wikipedia.org/wiki/${key}`;

export const getWikiData = async (lang, content) => {
    const request = await fetch(getTitlesUrl(lang,content));
    const response = await request.json();

    return response;
};

export const preventEventDefault = (e) => e.preventDefault();
