import { makeVar } from "@apollo/client";

export const resultVar = makeVar([
  // {
  //   "kind": "customsearch#result",
  //   "title": "Zom 100 Anime GIF - Zom 100 Anime Zomato - Discover & Share GIFs",
  //   "htmlTitle":
  //     "<b>Zom 100</b> Anime <b>GIF</b> - <b>Zom 100</b> Anime Zomato - Discover &amp; Share <b>GIFs</b>",
  //   "link": "https://media.tenor.com/MhzNkQbCebYAAAAC/zom-100-anime.gif",
  //   "displayLink": "tenor.com",
  //   "snippet": "Zom 100 Anime GIF - Zom 100 Anime Zomato - Discover & Share GIFs",
  //   "htmlSnippet":
  //     "<b>Zom 100</b> Anime <b>GIF</b> - <b>Zom 100</b> Anime Zomato - Discover &amp; Share <b>GIFs</b>",
  //   "mime": "image/gif",
  //   "fileFormat": "image/gif",
  //   "image": {
  //     "contextLink":
  //       "https://tenor.com/view/zom-100-anime-zomato-zombie-chase-chasing-gif-3610987024011655606",
  //     "height": 246,
  //     "width": 498,
  //     "byteSize": 5653266,
  //     "thumbnailLink":
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hcr1ZkB8N_1jngegwpm2KFxoQIuNKGzXnX2em49Gzt-ZzrOxLKEhfxc&s",
  //     "thumbnailHeight": 64,
  //     "thumbnailWidth": 130,
  //   },
  // },
]);
export const currentIndexVar = makeVar(0);
export const showDemoVar = makeVar(true);
export const searchVar = makeVar("");
