/* Builds site/study/topics/english-500-nouns.js from a categorized word list.
   GENERATED FILE ITSELF, but also hand-maintainable: edit SECTIONS below and
   re-run `node gen-english-500-nouns.js` (writes the topic file + reports dupes/count).
   Shares its underlying [English, Russian] concept set 1:1 with
   gen-russian-500-nouns.js — the two decks are generated from the same word pairs,
   just with front/back and the language direction flipped. */
'use strict';
const fs = require('fs');
const path = require('path');

/* [front, back] pairs, grouped by category (category name becomes a
   comment marker in the generated file so the deck stays readable/editable). */
const SECTIONS = [
["Household & furniture", [
  ["tablecloth", "скатерть"], ["curtain", "занавеска"], ["rug / carpet", "ковёр"],
  ["shelf", "полка"], ["cabinet / cupboard", "шкаф"], ["box / drawer", "коробка / ящик"],
  ["pillow / cushion", "подушка"], ["blanket", "одеяло"], ["bed sheet", "простыня"],
  ["mattress", "матрас"], ["sofa / couch", "диван"], ["armchair", "кресло"],
  ["oven", "духовка"], ["refrigerator", "холодильник"], ["freezer", "морозильник"],
  ["dishwasher", "посудомоечная машина"], ["washing machine", "стиральная машина"],
  ["clothes dryer", "сушильная машина"], ["iron (appliance)", "утюг"],
  ["vacuum cleaner", "пылесос"], ["wastebasket / trash can", "мусорное ведро"],
  ["candle", "свеча"], ["vase", "ваза"], ["painting / picture (framed)", "картина"],
  ["wall clock", "настенные часы"], ["curtain rod", "карниз для штор"],
  ["floor lamp", "торшер"], ["bookshelf", "книжная полка"],
  ["coat rack", "вешалка для одежды"], ["candle holder", "подсвечник"],
  ["interior design / decor", "интерьер"]
]],
["Kitchen & dining", [
  ["knife", "нож"], ["fork", "вилка"], ["spoon", "ложка"], ["plate", "тарелка"],
  ["cup", "чашка"], ["drinking glass", "стакан"], ["pot", "кастрюля"],
  ["frying pan", "сковорода"], ["cutting board", "разделочная доска"],
  ["opener (can/bottle)", "открывалка"], ["cauldron", "котелок"],
  ["baking dish", "форма для запекания"], ["mixer / blender", "миксер"],
  ["measuring cup", "мерный стакан"], ["tray", "поднос"], ["thermos bottle", "термос"],
  ["menu", "меню"], ["waiter / waitress", "официант"]
]],
["Nature & geography", [
  ["desert", "пустыня"], ["tundra", "тундра"], ["meadow", "луг"], ["swamp / marsh", "болото"],
  ["rock / cliff", "скала"], ["cave", "пещера"], ["waterfall", "водопад"],
  ["earthquake", "землетрясение"], ["volcano", "вулкан"], ["glacier", "ледник"],
  ["wave", "волна"], ["continent", "континент"], ["ocean", "океан"],
  ["peninsula / cape", "полуостров"], ["bay", "залив"], ["strait", "пролив"],
  ["nature", "природа"], ["environment", "окружающая среда"], ["climate", "климат"],
  ["pollution", "загрязнение"], ["recycling", "переработка отходов"]
]],
["Animals", [
  ["horse", "лошадь"], ["cow", "корова"], ["pig", "свинья"], ["sheep", "овца"],
  ["goat", "коза"], ["duck", "утка"], ["goose", "гусь"], ["shark", "акула"],
  ["dolphin", "дельфин"], ["whale", "кит"], ["bear", "медведь"], ["wolf", "волк"],
  ["fox", "лиса"], ["rabbit / hare", "кролик"], ["squirrel", "белка"], ["mouse", "мышь"],
  ["rat", "крыса"], ["snake", "змея"], ["frog", "лягушка"], ["butterfly", "бабочка"],
  ["bee", "пчела"], ["ant", "муравей"], ["spider", "паук"], ["fly (insect)", "муха"],
  ["mosquito", "комар"], ["lion", "лев"], ["tiger", "тигр"], ["elephant", "слон"],
  ["monkey", "обезьяна"], ["giraffe", "жираф"], ["zebra", "зебра"], ["owl", "сова"],
  ["eagle", "орёл"], ["swan", "лебедь"], ["penguin", "пингвин"],
  ["domestic / farm animal", "домашнее животное"], ["wild animal", "дикое животное"],
  ["insect", "насекомое"], ["reptile", "рептилия"], ["mammal", "млекопитающее"],
  ["hedgehog", "ёж"], ["beaver", "бобёр"], ["elk / moose", "лось"],
  ["reindeer", "северный олень"], ["deer", "олень"], ["lynx", "рысь"], ["otter", "выдра"]
]],
["Plants & garden", [
  ["grass", "трава"], ["leaf", "лист"], ["root", "корень"], ["branch", "ветка"],
  ["seed", "семя"], ["rose", "роза"], ["oak", "дуб"], ["birch", "берёза"],
  ["pine tree", "сосна"], ["spruce tree", "ель"], ["bush / shrub", "куст"],
  ["fruit tree", "плодовое дерево"], ["vegetable garden", "огород"], ["lawn", "газон"]
]],
["Body & health", [
  ["bone", "кость"], ["muscle", "мышца"], ["brain", "мозг"], ["lungs", "лёгкие"],
  ["liver", "печень"], ["kidney", "почка"], ["blood", "кровь"], ["elbow", "локоть"],
  ["knee", "колено"], ["shoulder", "плечо"], ["chest", "грудная клетка"], ["ankle", "лодыжка"],
  ["wrist", "запястье"], ["nail (finger/toe)", "ноготь"], ["forehead", "лоб"],
  ["chin / jaw", "подбородок"], ["cheek", "щека"], ["eyebrow", "бровь"],
  ["eyelashes", "ресницы"]
]],
["Professions & workplace", [
  ["firefighter", "пожарный"], ["soldier", "солдат"], ["banker", "банкир"],
  ["accountant", "бухгалтер"], ["secretary", "секретарь"], ["manager / director", "менеджер"],
  ["entrepreneur", "предприниматель"], ["journalist", "журналист"],
  ["researcher", "исследователь"], ["architect", "архитектор"], ["electrician", "электрик"],
  ["plumber", "сантехник"], ["farmer", "фермер"], ["fisherman", "рыбак"], ["baker", "пекарь"],
  ["hairdresser / barber", "парикмахер"], ["cleaner", "уборщик"],
  ["security guard", "охранник"], ["pilot", "пилот"], ["sailor", "моряк"],
  ["pastor", "пастор"], ["photographer", "фотограф"], ["director (film)", "режиссёр"],
  ["actor", "актёр"], ["dancer", "танцор"], ["designer", "дизайнер"],
  ["programmer", "программист"], ["assistant", "ассистент"], ["intern / trainee", "стажёр"],
  ["retiree", "пенсионер"], ["unemployed person", "безработный"]
]],
["Buildings & places", [
  ["museum", "музей"], ["theater", "театр"], ["cinema", "кинотеатр"],
  ["bookstore", "книжный магазин"], ["pharmacy", "аптека"], ["bank", "банк"],
  ["post office", "почта"], ["prison", "тюрьма"], ["castle", "замок"], ["palace", "дворец"],
  ["farm", "ферма"], ["campsite", "кемпинг"], ["swimming hall", "крытый бассейн"],
  ["sports field", "спортивное поле"], ["ice rink", "каток"],
  ["playground", "детская площадка"], ["parking lot", "автостоянка"],
  ["gas station", "заправка"], ["shopping mall", "торговый центр"], ["tunnel", "туннель"],
  ["intersection", "перекрёсток"], ["traffic light", "светофор"],
  ["bus stop", "автобусная остановка"], ["streetlight", "уличный фонарь"],
  ["sewer", "канализация"], ["electric grid", "электросеть"], ["water pipe", "водопровод"]
]],
["Transportation & travel", [
  ["bicycle", "велосипед"], ["motorcycle", "мотоцикл"], ["truck", "грузовик"],
  ["taxi", "такси"], ["tram", "трамвай"], ["subway / metro", "метро"], ["boat", "лодка"],
  ["canoe", "каноэ"], ["scooter", "самокат"], ["tractor", "трактор"], ["suitcase", "чемодан"],
  ["passport", "паспорт"], ["visa", "виза"], ["ticket", "билет"], ["schedule", "расписание"],
  ["route", "маршрут"], ["tourist", "турист"], ["guide / guidebook", "гид"],
  ["accommodation", "жильё для проживания"], ["souvenir", "сувенир"]
]],
["Technology & tools", [
  ["keyboard", "клавиатура"], ["mouse (computer device)", "компьютерная мышь"],
  ["screen / monitor", "экран"], ["printer", "принтер"], ["camera", "фотоаппарат"],
  ["charging cable", "зарядный кабель"], ["battery (rechargeable)", "аккумулятор"],
  ["app / application", "приложение"], ["software", "программное обеспечение"],
  ["network", "сеть"], ["hammer", "молоток"], ["nail (hardware)", "гвоздь"],
  ["screw", "шуруп"], ["screwdriver", "отвёртка"], ["pliers", "плоскогубцы"], ["saw", "пила"],
  ["ladder", "стремянка"], ["tape measure", "рулетка"], ["internet", "интернет"],
  ["website", "веб-сайт"], ["file (computer)", "файл"], ["password", "пароль"],
  ["username", "имя пользователя"]
]],
["Clothing & accessories", [
  ["necktie", "галстук"], ["pajamas", "пижама"], ["underwear", "нижнее бельё"],
  ["swimsuit", "купальник"], ["boots", "сапоги"], ["slippers", "тапочки"],
  ["jewelry", "украшения"], ["ring", "кольцо"], ["necklace", "ожерелье"],
  ["eyeglasses", "очки"], ["sunglasses", "солнцезащитные очки"], ["handbag", "сумочка"]
]],
["Abstract, business & law", [
  ["law", "закон"], ["right / justice", "право"], ["contract", "контракт"],
  ["company / attempt", "компания / попытка"], ["economy", "экономика"],
  ["politics", "политика"], ["government", "правительство"], ["president", "президент"],
  ["citizen", "гражданин"], ["society", "общество"], ["culture", "культура"],
  ["history", "история"], ["science", "наука"], ["technology", "технология"],
  ["information / knowledge", "информация"], ["responsibility", "ответственность"],
  ["justice / fairness", "справедливость"], ["equality", "равенство"],
  ["democracy", "демократия"], ["court (of law)", "суд"], ["judge", "судья"],
  ["prosecutor", "прокурор"], ["punishment", "наказание"], ["crime", "преступление"],
  ["evidence", "доказательство"], ["marketing", "маркетинг"], ["advertisement", "реклама"],
  ["brand", "бренд"], ["product", "продукт"], ["service", "услуга"],
  ["customer service", "обслуживание клиентов"], ["negotiation", "переговоры"]
]],
["Sports & hobbies", [
  ["football / soccer", "футбол"], ["basketball", "баскетбол"], ["ice hockey", "хоккей"],
  ["tennis", "теннис"], ["swimming", "плавание"], ["skiing", "лыжный спорт"],
  ["skating", "катание на коньках"], ["cycling", "велоспорт"], ["running", "бег"],
  ["fishing", "рыбалка"], ["hunting", "охота"], ["photography", "фотография"],
  ["literature", "литература"], ["painting (art form)", "живопись"],
  ["sculpture", "скульптура"], ["bat / racket", "ракетка"], ["team", "команда"],
  ["match / game", "матч"], ["medal", "медаль"], ["stadium", "стадион"],
  ["handicraft", "рукоделие"], ["art (general)", "искусство"], ["exhibition", "выставка"],
  ["gallery", "галерея"]
]],
["Materials & shapes", [
  ["metal", "металл"], ["plastic", "пластик"], ["stone", "камень"], ["concrete", "бетон"],
  ["fabric", "ткань"], ["leather", "кожа (материал)"], ["rubber", "резина"],
  ["circle", "круг"], ["square", "квадрат"], ["triangle", "треугольник"],
  ["rectangle", "прямоугольник"], ["ball / sphere", "мяч / шар"], ["point / dot", "точка"],
  ["line", "линия"], ["angle / corner", "угол"], ["area", "площадь"], ["volume", "объём"]
]],
["School & education", [
  ["classroom", "классная комната"], ["lesson", "урок"], ["exam / test", "экзамен"],
  ["certificate / report card", "табель успеваемости"], ["notebook", "тетрадь"],
  ["degree (academic)", "учёная степень"], ["thesis / essay", "диссертация"],
  ["lecture", "лекция"], ["folder", "папка"], ["staple", "скоба для степлера"],
  ["stapler", "степлер"], ["tape", "клейкая лента"], ["ruler", "линейка"],
  ["eraser", "ластик"], ["chalkboard", "школьная доска"], ["marker pen", "маркер"],
  ["sticky note", "стикер"], ["mathematics", "математика"], ["physics", "физика"],
  ["chemistry", "химия"], ["biology", "биология"]
]],
["Weather & seasons", [
  ["rain", "дождь"], ["snow", "снег"], ["wind", "ветер"], ["cloud", "облако"],
  ["thunder", "гром"], ["lightning", "молния"], ["fog", "туман"], ["ice", "лёд"],
  ["ground frost", "заморозки"], ["frost / rime", "иней"],
  ["northern lights", "северное сияние"], ["dew", "роса"], ["storm", "буря"],
  ["flood", "наводнение"], ["drought", "засуха"]
]],
["Money & shopping", [
  ["price", "цена"], ["discount", "скидка"], ["bill / invoice", "счёт"], ["receipt", "чек"],
  ["debit / credit card", "банковская карта"], ["cash", "наличные"], ["salary", "зарплата"],
  ["tax", "налог"], ["budget", "бюджет"], ["investment", "инвестиция"]
]],
["Emotions & personality (nouns)", [
  ["courage", "смелость"], ["wisdom", "мудрость"], ["patience", "терпение"],
  ["diligence", "усердие"], ["laziness", "лень"], ["honesty", "честность"],
  ["trust", "доверие"], ["friendship", "дружба"], ["loneliness", "одиночество"],
  ["joy", "радость"], ["excitement / tension", "волнение"], ["relief", "облегчение"],
  ["disappointment", "разочарование"], ["wonder / surprise", "удивление"],
  ["gratitude", "благодарность"], ["compassion", "сострадание"], ["disgust", "отвращение"],
  ["laughter", "смех"], ["crying", "плач"], ["smile", "улыбка"], ["sigh", "вздох"]
]],
["Household chores & city life", [
  ["laundry", "стирка"], ["trash / litter", "мусор"], ["brush", "щётка"], ["broom", "метла"],
  ["bucket", "ведро"], ["detergent", "моющее средство"], ["argument / quarrel", "спор"],
  ["harmony / reconciliation", "примирение"], ["cooperation", "сотрудничество"],
  ["competition", "соревнование"], ["victory", "победа"], ["defeat", "поражение"]
]],
["Measurement & science", [
  ["meter", "метр"], ["kilometer", "километр"], ["centimeter", "сантиметр"],
  ["kilogram", "килограмм"], ["gram", "грамм"], ["liter", "литр"], ["degree", "градус"],
  ["temperature", "температура"], ["weight", "вес"], ["length / height", "длина"],
  ["planet", "планета"], ["Earth / globe", "земной шар"], ["galaxy", "галактика"],
  ["universe", "вселенная"], ["atom", "атом"], ["molecule", "молекула"],
  ["cell (biology)", "клетка"], ["gene", "ген"], ["energy", "энергия"], ["force", "сила"],
  ["gravity", "гравитация"], ["sum", "сумма"], ["difference (math)", "разность"],
  ["result / product", "результат"], ["division", "деление"], ["equation", "уравнение"],
  ["formula", "формула"]
]],
["Family & relationships (extra)", [
  ["spouse", "супруг / супруга"], ["boyfriend", "парень"], ["girlfriend", "девушка"],
  ["marriage", "брак"], ["divorce", "развод"], ["relative", "родственник"],
  ["grandchild", "внук / внучка"], ["godparent", "крёстный"]
]],
["Food (extra)", [
  ["spice", "специя"], ["oil", "растительное масло"], ["vinegar", "уксус"], ["sauce", "соус"],
  ["cookie / biscuit", "печенье"], ["cake", "торт"], ["chocolate", "шоколад"],
  ["ice cream", "мороженое"], ["pizza", "пицца"], ["hamburger", "гамбургер"],
  ["sandwich", "бутерброд"], ["nut", "орех"], ["lemon", "лимон"],
  ["orange (fruit)", "апельсин"], ["grape", "виноград"], ["watermelon", "арбуз"],
  ["pineapple", "ананас"], ["onion", "лук"], ["garlic", "чеснок"], ["tomato", "помидор"],
  ["cucumber", "огурец"], ["carrot", "морковь"], ["corn", "кукуруза"], ["pea", "горох"],
  ["bean", "фасоль"]
]],
["Sleep, daily routine & communication", [
  ["sleep / dream", "сон"], ["nightmare", "кошмар"], ["alarm clock", "будильник"],
  ["nap", "дневной сон"], ["message", "сообщение"], ["email", "электронная почта"],
  ["letter (mail)", "письмо"], ["postcard", "открытка"], ["phone call", "телефонный звонок"],
  ["conversation", "разговор"], ["announcement / ad", "объявление"]
]],
["Music & the arts", [
  ["guitar", "гитара"], ["piano", "пианино"], ["drums", "барабаны"], ["violin", "скрипка"],
  ["flute", "флейта"], ["trumpet", "труба"], ["singer", "певец"]
]],
["Geography & nations", [
  ["state / nation", "государство"], ["capital city", "столица"], ["border", "граница"],
  ["map", "карта"], ["language", "язык"], ["nationality", "национальность"],
  ["national flag", "государственный флаг"]
]],
["Home appliances (extra)", [
  ["microwave oven", "микроволновая печь"], ["coffee maker", "кофеварка"],
  ["toaster", "тостер"], ["hair dryer", "фен"],
  ["electric toothbrush", "электрическая зубная щётка"], ["speaker", "колонка"]
]]
];

const cards = [];
let idx = 0;
const seen = new Map();
const dupes = [];
SECTIONS.forEach(([section, pairs]) => {
  pairs.forEach(([front, back]) => {
    idx += 1;
    const id = 'eo-' + String(idx).padStart(3, '0');
    if (seen.has(front)) dupes.push(front + ' (first: ' + seen.get(front) + ', again: ' + id + ')');
    else seen.set(front, id);
    cards.push({ id, section, front, back });
  });
});

if (dupes.length) {
  console.log('DUPLICATE headwords found:');
  dupes.forEach((d) => console.log('  ' + d));
} else {
  console.log('No duplicate headwords.');
}
console.log('Total cards:', cards.length);

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

let body = '';
let lastSection = null;
cards.forEach((c) => {
  if (c.section !== lastSection) {
    body += (lastSection ? '\n' : '') + '    /* --- ' + c.section + ' --- */\n';
    lastSection = c.section;
  }
  body += `    { id: "${c.id}", front: "${esc(c.front)}", back: "${esc(c.back)}" },\n`;
});
body = body.replace(/,\n$/, '\n');

const header = `/* Topic: English — 500 Nouns. Concrete and abstract nouns across household,
   nature, animals, professions, places, technology, science, food, and more —
   complements the Popular Words deck, which covers pronouns/verbs/adjectives.
   Audience: Russian-speaking learners of English.
   Front = English noun, back = Russian meaning.
   GENERATED by scripts/gen-english-500-nouns.js from a categorized word list —
   edit the SECTIONS array there and re-run rather than hand-editing this file. */
SRS.registerTopic({
  id: "english-500-nouns",
  name: "English: 500 Nouns",
  description: "500 English nouns across household, nature, animals, professions, places, technology, science, food, and more — for Russian-speaking learners of English.",
  cards: [
${body}  ]
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'topics', 'english-500-nouns.js'), header, 'utf8');
console.log('Wrote generated topic file.');
