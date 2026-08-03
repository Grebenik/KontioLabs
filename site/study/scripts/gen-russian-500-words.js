/* Builds site/study/topics/russian-500-words.js from a categorized word list.
   GENERATED FILE ITSELF, but also hand-maintainable: edit SECTIONS below and
   re-run `node gen-russian-500-words.js` (writes the topic file + reports dupes/count).
   Shares its underlying [English, Russian] concept set 1:1 with
   gen-english-500-words.js — the two decks are generated from the same word pairs,
   just with front/back and the language direction flipped. */
'use strict';
const fs = require('fs');
const path = require('path');

/* [front, back] pairs, grouped by category (category name becomes a
   comment marker in the generated file so the deck stays readable/editable). */
const SECTIONS = [
["Pronouns & question words", [
  ["я", "I"], ["ты", "you (singular)"], ["он / она", "he / she"], ["мы", "we"],
  ["вы", "you (plural / formal)"], ["они", "they"], ["это / этот", "this"],
  ["то (вон там)", "that (over there)"], ["это / то", "it / that"], ["эти", "these"],
  ["те (вон там)", "those (over there)"], ["те / их", "those / them"], ["кто-то", "someone"],
  ["что-то", "something"], ["всё / все", "all / everyone / everything"],
  ["который", "which / who (relative pronoun)"], ["кто", "who"],
  ["что / какой", "what / which"], ["где", "where"], ["когда", "when"], ["почему", "why"],
  ["как", "how"], ["сколько", "how much / how many"],
  ["который (из двух)", "which one (of two)"]
]],
["Common verbs", [
  ["быть", "to be"], ["делать", "to do / to make"], ["идти / ходить", "to go"],
  ["приходить", "to come"], ["видеть", "to see"], ["сказать", "to say"],
  ["знать", "to know (a fact)"],
  ["знать (человека) / чувствовать", "to know (a person) / to feel"], ["хотеть", "to want"],
  ["мочь", "to be able to / may"], ["нравиться / быть должным", "to like / to have to"],
  ["получать / иметь право", "to get / to be allowed to"], ["давать", "to give"],
  ["брать", "to take"], ["говорить", "to speak"], ["спрашивать", "to ask"],
  ["отвечать", "to answer"], ["думать", "to think"], ["понимать", "to understand"],
  ["помнить", "to remember"], ["забывать", "to forget"], ["учиться / изучать", "to learn"],
  ["преподавать / учить (кого-то)", "to teach"], ["читать", "to read"], ["писать", "to write"],
  ["есть", "to eat"], ["пить", "to drink"], ["спать", "to sleep"],
  ["просыпаться", "to wake up"], ["жить", "to live"], ["умирать", "to die"],
  ["любить", "to love"], ["помогать", "to help"], ["работать", "to work"],
  ["покупать", "to buy"], ["продавать", "to sell"], ["платить / стоить", "to pay / to cost"],
  ["путешествовать", "to travel"], ["водить (машину)", "to drive"],
  ["ходить пешком", "to walk"], ["бегать", "to run"], ["сидеть", "to sit"],
  ["стоять", "to stand"], ["открывать", "to open"], ["закрывать", "to close"],
  ["начинать", "to begin"], ["заканчивать", "to stop / finish"], ["продолжать", "to continue"],
  ["ждать", "to wait"], ["искать", "to search / look for"], ["находить", "to find"],
  ["смотреть", "to look / to watch"], ["слышать", "to hear"],
  ["показывать / казаться", "to show / to seem"],
  ["звонить / играть (на инструменте)", "to call (phone) / to play (instrument)"],
  ["отправлять", "to send"], ["получать (письмо, посылку)", "to receive"],
  ["использовать", "to use"], ["нуждаться (в чём-то)", "to need"], ["выбирать", "to choose"],
  ["решать", "to decide"], ["пытаться", "to try"], ["преуспевать", "to succeed"],
  ["терпеть неудачу", "to fail"], ["менять / переезжать", "to change / to move (residence)"],
  ["оставаться", "to stay / remain"], ["уходить / уезжать", "to leave / depart"],
  ["возвращаться", "to return"], ["вставать", "to rise / get up"],
  ["считать / опускать", "to count / to calculate / to lower"],
  ["останавливаться", "to stop (oneself)"], ["встречать(ся)", "to meet"],
  ["казаться / хотеться", "to feel like / to seem"],
  ["принадлежать / быть слышным", "to belong / to be heard"], ["слушать", "to listen"],
  ["разглядывать / смотреть по сторонам", "to watch / look around"],
  ["играть (в игры, о детях)", "to play (games, kids)"],
  ["играть (в спорт/игру)", "to play (a sport/game)"], ["петь", "to sing"],
  ["танцевать", "to dance"], ["рисовать (карандашом)", "to draw"],
  ["писать красками", "to paint"], ["строить", "to build"],
  ["чинить / ремонтировать", "to fix / repair"], ["ломать", "to break (something)"],
  ["падать / ронять", "to fall / to drop"], ["бросать", "to throw"], ["нести", "to carry"],
  ["поднимать", "to lift"], ["толкать", "to push"], ["тянуть", "to pull"],
  ["класть / готовить", "to put / to cook"],
  ["подготавливать / изготавливать", "to prepare / to manufacture"],
  ["убирать(ся)", "to clean (tidy)"], ["мыть / стирать", "to wash"],
  ["сушить", "to dry (something)"], ["варить", "to boil"],
  ["жарить / печь / светить (о солнце)", "to fry / to bake / to shine (sun)"],
  ["резать", "to cut"], ["шить", "to sew"], ["плавать", "to swim"], ["прыгать", "to jump"],
  ["замечать", "to notice"], ["проверять", "to check"],
  ["бронировать", "to reserve / to book"], ["заказывать", "to order"],
  ["арендовать / снимать", "to rent"], ["брать взаймы / одалживать", "to borrow / to lend"],
  ["возвращать (отдавать)", "to return (give back)"],
  ["копить / сберегать", "to save (money)"], ["тратить / потреблять", "to spend / to consume"],
  ["зарабатывать", "to earn"], ["владеть", "to own"],
  ["увлекаться (чем-то)", "to have as a hobby"], ["подражать", "to imitate"]
]],
["Common adjectives", [
  ["хороший", "good"], ["плохой", "bad"], ["большой", "big"], ["маленький", "small"],
  ["новый", "new"], ["старый", "old"], ["молодой", "young"], ["красивый", "beautiful"],
  ["некрасивый", "ugly"], ["длинный", "long"], ["короткий", "short"],
  ["высокий", "high / tall"], ["низкий", "low"], ["широкий", "wide"], ["узкий", "narrow"],
  ["быстрый", "fast"], ["медленный", "slow"], ["холодный", "cold"], ["горячий", "hot"],
  ["тёплый", "warm"], ["твёрдый", "hard"], ["мягкий", "soft"], ["тяжёлый", "heavy"],
  ["лёгкий (по весу)", "light (weight)"], ["дорогой", "expensive"], ["дешёвый", "cheap"],
  ["лёгкий (простой)", "easy"], ["трудный", "difficult"], ["важный", "important"],
  ["интересный", "interesting"], ["скучный", "boring"], ["весёлый / смешной", "fun / funny"],
  ["грустный", "sad"], ["счастливый", "happy"], ["злой / сердитый", "angry"],
  ["уставший", "tired"], ["здоровый", "healthy"], ["больной", "sick"], ["чистый", "clean"],
  ["грязный", "dirty"], ["полный", "full"], ["пустой", "empty"],
  ["правильный", "right / correct"], ["неправильный", "wrong"], ["одинаковый", "same"],
  ["другой / разный", "different"], ["возможный", "possible"], ["невозможный", "impossible"],
  ["готовый", "ready / finished"], ["свободный", "free"], ["занятой", "busy"],
  ["тихий", "quiet"], ["громкий", "loud"], ["яркий / ясный", "bright / clear"],
  ["тёмный", "dark"], ["мокрый", "wet"], ["сухой", "dry"], ["сильный", "strong"],
  ["слабый", "weak"], ["богатый", "rich"], ["бедный", "poor"],
  ["дружелюбный / добрый", "friendly / kind"], ["недружелюбный", "unfriendly"],
  ["вежливый", "polite"], ["умный", "smart / clever"], ["глупый", "stupid"],
  ["безопасный", "safe"], ["опасный", "dangerous"], ["уверенный", "sure / certain"],
  ["неуверенный", "uncertain"], ["настоящий", "real"], ["поддельный", "fake / counterfeit"],
  ["популярный", "popular"], ["редкий", "rare"], ["обычный", "ordinary / common"],
  ["странный", "strange / odd"], ["приятный / удобный", "nice / comfortable"],
  ["неудобный", "uncomfortable"], ["простой", "simple"], ["сложный", "complicated"],
  ["сладкий", "sweet"], ["кислый", "sour"]
]],
["Everyday nouns — home, places, people", [
  ["дом (здание)", "house"], ["дом (родной очаг)", "home"], ["комната", "room"],
  ["дверь", "door"], ["окно", "window"], ["стол", "table"], ["стул", "chair"],
  ["кровать", "bed"], ["кухня", "kitchen"], ["ванная комната", "bathroom"],
  ["гостиная", "living room"], ["спальня", "bedroom"], ["машина", "car"], ["дорога", "road"],
  ["улица", "street"], ["город", "city / town"], ["страна / земля", "country / land / earth"],
  ["мир", "world"], ["человек", "human / person"], ["мужчина", "man"], ["женщина", "woman"],
  ["ребёнок", "child"], ["семья", "family"], ["друг", "friend"], ["работа", "work / job"],
  ["школа", "school"], ["деньги", "money"], ["время", "time"], ["день", "day"],
  ["ночь", "night"], ["неделя", "week"], ["месяц", "month"], ["год", "year"],
  ["вода", "water"], ["еда", "food"], ["хлеб", "bread"], ["молоко", "milk"],
  ["кофе", "coffee"], ["чай", "tea"], ["воздух", "air"], ["погода", "weather"],
  ["солнце", "sun"], ["луна", "moon"], ["звезда", "star"], ["небо", "sky"], ["море", "sea"],
  ["озеро", "lake"], ["лес", "forest"], ["дерево", "tree / wood"], ["цветок", "flower"],
  ["животное", "animal"], ["собака", "dog"], ["кошка", "cat"], ["птица", "bird"],
  ["книга", "book"], ["ручка", "pen"], ["бумага", "paper"], ["телефон", "phone"],
  ["компьютер", "computer"], ["телевизор", "television"], ["радио", "radio"],
  ["музыка", "music"], ["фильм", "movie"], ["игра", "game"], ["спорт", "sport"],
  ["поездка / путешествие", "trip / journey"], ["самолёт", "airplane"], ["поезд", "train"],
  ["автобус", "bus"], ["корабль", "ship"], ["магазин", "store / shop"],
  ["ресторан", "restaurant"], ["больница", "hospital"], ["университет", "university"],
  ["церковь", "church"], ["парк", "park"], ["мост", "bridge"],
  ["рыночная площадь", "market square"], ["библиотека", "library"], ["вокзал", "station"],
  ["аэропорт", "airport"], ["гостиница", "hotel"], ["офис", "office"], ["завод", "factory"],
  ["район города", "city district"], ["жилой квартал", "neighborhood"],
  ["сельская местность", "countryside"], ["остров", "island"], ["гора", "mountain"],
  ["долина", "valley"], ["берег / пляж", "shore / beach"], ["река", "river"],
  ["крыша", "roof"], ["стена", "wall"], ["пол", "floor"], ["лестница", "stairs"],
  ["двор", "yard"], ["сад", "garden"], ["забор", "fence"], ["ключ", "key"], ["замок", "lock"],
  ["свет", "light"], ["лампа", "lamp"], ["зеркало", "mirror"], ["часы", "clock / watch"],
  ["сумка", "bag"], ["рюкзак", "backpack"], ["кошелёк", "wallet"]
]],
["Function words — conjunctions, prepositions, adverbs, particles", [
  ["и", "and"], ["но", "but"], ["или", "or"], ["потому что", "because"], ["если", "if"],
  ["когда (союз)", "when / as (conj.)"], ["что (союз)", "that (conj.)"],
  ["чем / как", "than / as / like"], ["хотя", "although"], ["пока не", "until"],
  ["до / перед", "before"], ["после", "after"], ["во время", "during"], ["без", "without"],
  ["с", "with"], ["через", "through"], ["вокруг", "around"], ["под", "under / below"],
  ["на (поверх)", "on top of"], ["внутри", "inside"], ["снаружи", "outside"],
  ["рядом с", "next to / beside"], ["между", "between"], ["позади", "behind"],
  ["перед", "in front of"], ["около", "near"], ["далеко", "far away"],
  ["вверх", "up (direction)"], ["вниз", "down (direction)"], ["внутрь", "in (direction)"],
  ["наружу", "out (direction)"], ["здесь", "here"], ["там", "there"],
  ["вон там", "over there"], ["сейчас", "now"], ["тогда", "then / at that time"],
  ["всегда", "always"], ["никогда", "never"], ["иногда", "sometimes"], ["часто", "often"],
  ["редко", "rarely"], ["уже", "already"], ["всё ещё", "still / yet"], ["снова", "again"],
  ["тоже", "also / too"], ["только", "only"], ["однако", "however / anyway"],
  ["поэтому", "so / therefore"], ["например", "for example"], ["конечно", "of course"],
  ["может быть", "maybe"], ["наверняка", "surely / certainly"], ["возможно", "perhaps"],
  ["почти", "almost"], ["полностью", "completely"], ["немного", "a little"],
  ["много", "a lot / much"], ["слишком", "too (excessively)"], ["очень", "very"],
  ["чрезвычайно", "extremely"], ["совсем", "quite / totally"],
  ["наверное", "probably / I guess"], ["нет / не", "no / not"], ["да", "yes"],
  ["спасибо", "thank you"], ["пожалуйста", "you're welcome / please"],
  ["извините", "sorry / excuse me"], ["безусловно", "absolutely"]
]],
["Time — days, months, seasons, time of day", [
  ["понедельник", "Monday"], ["вторник", "Tuesday"], ["среда", "Wednesday"],
  ["четверг", "Thursday"], ["пятница", "Friday"], ["суббота", "Saturday"],
  ["воскресенье", "Sunday"], ["январь", "January"], ["февраль", "February"], ["март", "March"],
  ["апрель", "April"], ["май", "May"], ["июнь", "June"], ["июль", "July"],
  ["август", "August"], ["сентябрь", "September"], ["октябрь", "October"],
  ["ноябрь", "November"], ["декабрь", "December"], ["весна", "spring"], ["лето", "summer"],
  ["осень", "autumn / fall"], ["зима", "winter"], ["сегодня", "today"], ["завтра", "tomorrow"],
  ["вчера", "yesterday"], ["послезавтра", "the day after tomorrow"],
  ["позавчера", "the day before yesterday"], ["утро", "morning"], ["вечер", "evening"],
  ["полдень", "midday / noon"], ["полночь", "midnight"], ["момент", "moment"],
  ["минута", "minute"], ["час", "hour"], ["секунда", "second"], ["выходные", "weekend"],
  ["будни / повседневная жизнь", "weekday / everyday life"],
  ["государственный праздник", "public holiday"], ["возраст", "age"], ["век", "century"]
]],
["Family & people", [
  ["мать", "mother"], ["отец", "father"], ["брат", "brother"], ["сестра", "sister"],
  ["сын / мальчик", "son / boy"], ["дочь", "daughter"], ["жена", "wife"], ["муж", "husband"],
  ["бабушка", "grandmother"], ["дедушка", "grandfather"], ["тётя", "aunt"], ["дядя", "uncle"],
  ["двоюродный брат / сестра", "cousin"], ["сосед", "neighbor"], ["учитель", "teacher"],
  ["врач", "doctor"], ["медсестра", "nurse"], ["полицейский", "police officer"],
  ["продавец", "salesperson"], ["клиент", "customer"], ["начальник", "boss"],
  ["коллега", "colleague"], ["студент / ученик", "student / pupil"], ["инженер", "engineer"],
  ["юрист / адвокат", "lawyer"], ["повар", "cook / chef"], ["художник", "artist"],
  ["писатель", "writer / author"], ["музыкант", "musician"], ["спортсмен", "athlete"]
]],
["Food & drink", [
  ["яблоко", "apple"], ["банан", "banana"], ["картофель", "potato"], ["мясо", "meat"],
  ["рыба", "fish"], ["курица", "chicken"], ["рис", "rice"], ["макароны", "pasta"],
  ["сыр", "cheese"], ["сливочное масло", "butter"], ["сахар", "sugar"], ["соль", "salt"],
  ["перец", "pepper"], ["фрукт", "fruit"], ["овощ", "vegetable"], ["ягода", "berry"],
  ["клубника", "strawberry"], ["черника", "blueberry"], ["суп", "soup"], ["салат", "salad"],
  ["десерт", "dessert"], ["завтрак", "breakfast"], ["обед", "lunch"],
  ["ужин", "dinner / supper"], ["каша", "porridge"], ["колбаса", "sausage"], ["яйцо", "egg"],
  ["мёд", "honey"], ["сок", "juice"], ["пиво", "beer"]
]],
["Body parts", [
  ["голова", "head"], ["глаз", "eye"], ["ухо", "ear"], ["нос", "nose"], ["рот", "mouth"],
  ["рука", "hand / arm"], ["нога", "foot / leg"], ["палец (руки)", "finger"],
  ["палец (ноги)", "toe"], ["спина", "back"], ["живот", "stomach"], ["сердце", "heart"],
  ["кожа", "skin"], ["волосы", "hair"], ["зуб", "tooth"], ["шея", "neck"]
]],
["Colors", [
  ["красный", "red"], ["синий", "blue"], ["жёлтый", "yellow"], ["зелёный", "green"],
  ["чёрный", "black"], ["белый", "white"], ["серый", "gray"], ["коричневый", "brown"],
  ["оранжевый", "orange"], ["фиолетовый", "purple"], ["розовый", "pink"]
]],
["Clothing", [
  ["рубашка", "shirt"], ["брюки", "pants"], ["юбка", "skirt"], ["платье", "dress"],
  ["куртка", "jacket / coat"], ["туфли", "shoes"], ["носки", "socks"], ["шапка", "hat"],
  ["перчатка", "glove"], ["ремень", "belt"], ["шарф", "scarf"], ["блузка", "blouse"]
]],
["Emotions & abstract concepts", [
  ["любовь", "love"], ["ненависть / злость", "hate / anger"], ["страх", "fear"],
  ["счастье / удача", "happiness / luck"], ["грусть / горе", "sadness / grief"],
  ["надежда", "hope"], ["мечта", "dream (aspiration)"], ["правда", "truth"], ["ложь", "lie"],
  ["жизнь", "life"], ["смерть", "death"], ["свобода", "freedom"],
  ["мир (спокойствие)", "peace"], ["война", "war"], ["вера", "faith / belief"],
  ["сомнение", "doubt"], ["стыд", "shame"], ["гордость", "pride"], ["зависть", "envy"],
  ["честь", "honor"]
]]
];

const cards = [];
let idx = 0;
const seen = new Map();
const dupes = [];
SECTIONS.forEach(([section, pairs]) => {
  pairs.forEach(([front, back]) => {
    idx += 1;
    const id = 'rw-' + String(idx).padStart(3, '0');
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

const header = `/* Topic: Russian — 500 Popular Words. High-frequency vocabulary across word
   classes (pronouns, verbs, adjectives, everyday nouns, function words, time,
   family, food, body, colors, clothing, emotions) for general fluency.
   Audience: English-speaking learners of Russian.
   Front = Russian word, back = English meaning.
   GENERATED by scripts/gen-russian-500-words.js from a categorized word list —
   edit the SECTIONS array there and re-run rather than hand-editing this file. */
SRS.registerTopic({
  id: "russian-500-words",
  name: "Russian: 500 Popular Words",
  description: "The 500 most useful everyday Russian words — pronouns, verbs, adjectives, nouns, and function words — for English-speaking learners building general fluency fast.",
  cards: [
${body}  ]
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'topics', 'russian-500-words.js'), header, 'utf8');
console.log('Wrote generated topic file.');
