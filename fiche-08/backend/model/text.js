const { parse, serialize } = require("../utils/json");
var escape = require("escape-html");

const jsonDbPath = __dirname + "/../data/texts.json";

const DEFAULT_TEXTS = [
    {
        id: 1,
        content: "voici un texte a dactylographier sans caractere complique",
        level: "facile",
    },
    {
        id: 2,
        content: "et voila que nous apprenons tous a taper sur un clavier",
        level: "facile",
    },
    {
        id: 3,content:
        `Si c'est ça être sage, alors je préfère rester un idiot pour le resta
        nt de mes jours !`,
        level: "moyen",
    },
    {
        id: 4,
        content:
        `J'étais devenu une relique du passé qu'ils souhaitaient tous voir dis
        paraître. Jeune, je me suis demandé pourquoi j'existais.`,
        level: "moyen",
    },
    {
        id: 5,
        content:
        `Les gens vivent en s'appuyant sur leurs convictions et leurs connaiss
        ances et ils appellent ça la réalité : mais le savoir et la compréhension so
        nt des concepts si ambigus que cette réalité ne pourrait être alors qu'une i
        llusion.`,
        level: "difficile",
    },
    {
        id: 6,
        content:
        `C'est vrai... Dans le monde des ninjas, ceux qui ne respectent pas le
        s règles et transgressent les lois... Sont considérés comme des moins-querien. Mais... Ceux qui ne pensent pas à leurs compagnons... Sont encore pire
        s.`,
        level: "difficile",
    },
];



class TextADactylographier {
  constructor(dbPath = jsonDbPath, defaultItems = DEFAULT_TEXTS) {
    this.jsonDbPath = dbPath;
    this.defaultTexts = defaultItems;
  }

  getNextId() {
    const texts = parse(this.jsonDbPath, this.defaultTexts);
    let nextId;
    if (texts.length === 0) nextId = 1;
    else nextId = texts[texts.length - 1].id + 1;

    return nextId;
  }

  getRandomText(level) {
    const texts = parse(this.jsonDbPath, this.defaultTexts);
    let levelTexts = [];
    texts
      .filter((t) => t.level === level)
      .forEach((t) => levelTexts.push(t));
    if(levelTexts.length==0) return;
    let text = levelTexts[Math.floor(Math.random() * levelTexts.length)];
    return text;
  }

  addOne(body) {
    const texts = parse(this.jsonDbPath, this.defaultTexts);

    // add new pizza to the menu : escape the title & content in order to protect agains XSS attacks
    const newText = {
      id: this.getNextId(),
      content: escape(body.content),
      level: escape(body.level),
    };
    texts.push(newText);
    serialize(this.jsonDbPath, texts);
    return newText;
  }

}

module.exports = { TextADactylographier };
