/* Builds site/study/topics/english-500-words.js from a categorized word list.
   GENERATED FILE ITSELF, but also hand-maintainable: edit SECTIONS below and
   re-run `node gen-english-500-words.js` (writes the topic file + reports dupes/count).
   Shares its underlying [English, Russian] concept set 1:1 with
   gen-russian-500-words.js — the two decks are generated from the same word pairs,
   just with front/back and the language direction flipped. */
'use strict';
const fs = require('fs');
const path = require('path');

/* [front, back] pairs, grouped by category (category name becomes a
   comment marker in the generated file so the deck stays readable/editable). */
const SECTIONS = [
["Pronouns & question words", [
  ["I", "я"], ["you (singular)", "ты"], ["he / she", "он / она"], ["we", "мы"],
  ["you (plural / formal)", "вы"], ["they", "они"], ["this", "это / этот"],
  ["that (over there)", "то (вон там)"], ["it / that", "это / то"], ["these", "эти"],
  ["those (over there)", "те (вон там)"], ["those / them", "те / их"], ["someone", "кто-то"],
  ["something", "что-то"], ["all / everyone / everything", "всё / все"],
  ["which / who (relative pronoun)", "который"], ["who", "кто"],
  ["what / which", "что / какой"], ["where", "где"], ["when", "когда"], ["why", "почему"],
  ["how", "как"], ["how much / how many", "сколько"],
  ["which one (of two)", "который (из двух)"]
]],
["Common verbs", [
  ["to be", "быть"], ["to do / to make", "делать"], ["to go", "идти / ходить"],
  ["to come", "приходить"], ["to see", "видеть"], ["to say", "сказать"],
  ["to know (a fact)", "знать"],
  ["to know (a person) / to feel", "знать (человека) / чувствовать"], ["to want", "хотеть"],
  ["to be able to / may", "мочь"], ["to like / to have to", "нравиться / быть должным"],
  ["to get / to be allowed to", "получать / иметь право"], ["to give", "давать"],
  ["to take", "брать"], ["to speak", "говорить"], ["to ask", "спрашивать"],
  ["to answer", "отвечать"], ["to think", "думать"], ["to understand", "понимать"],
  ["to remember", "помнить"], ["to forget", "забывать"], ["to learn", "учиться / изучать"],
  ["to teach", "преподавать / учить (кого-то)"], ["to read", "читать"], ["to write", "писать"],
  ["to eat", "есть"], ["to drink", "пить"], ["to sleep", "спать"],
  ["to wake up", "просыпаться"], ["to live", "жить"], ["to die", "умирать"],
  ["to love", "любить"], ["to help", "помогать"], ["to work", "работать"],
  ["to buy", "покупать"], ["to sell", "продавать"], ["to pay / to cost", "платить / стоить"],
  ["to travel", "путешествовать"], ["to drive", "водить (машину)"],
  ["to walk", "ходить пешком"], ["to run", "бегать"], ["to sit", "сидеть"],
  ["to stand", "стоять"], ["to open", "открывать"], ["to close", "закрывать"],
  ["to begin", "начинать"], ["to stop / finish", "заканчивать"], ["to continue", "продолжать"],
  ["to wait", "ждать"], ["to search / look for", "искать"], ["to find", "находить"],
  ["to look / to watch", "смотреть"], ["to hear", "слышать"],
  ["to show / to seem", "показывать / казаться"],
  ["to call (phone) / to play (instrument)", "звонить / играть (на инструменте)"],
  ["to send", "отправлять"], ["to receive", "получать (письмо, посылку)"],
  ["to use", "использовать"], ["to need", "нуждаться (в чём-то)"], ["to choose", "выбирать"],
  ["to decide", "решать"], ["to try", "пытаться"], ["to succeed", "преуспевать"],
  ["to fail", "терпеть неудачу"], ["to change / to move (residence)", "менять / переезжать"],
  ["to stay / remain", "оставаться"], ["to leave / depart", "уходить / уезжать"],
  ["to return", "возвращаться"], ["to rise / get up", "вставать"],
  ["to count / to calculate / to lower", "считать / опускать"],
  ["to stop (oneself)", "останавливаться"], ["to meet", "встречать(ся)"],
  ["to feel like / to seem", "казаться / хотеться"],
  ["to belong / to be heard", "принадлежать / быть слышным"], ["to listen", "слушать"],
  ["to watch / look around", "разглядывать / смотреть по сторонам"],
  ["to play (games, kids)", "играть (в игры, о детях)"],
  ["to play (a sport/game)", "играть (в спорт/игру)"], ["to sing", "петь"],
  ["to dance", "танцевать"], ["to draw", "рисовать (карандашом)"],
  ["to paint", "писать красками"], ["to build", "строить"],
  ["to fix / repair", "чинить / ремонтировать"], ["to break (something)", "ломать"],
  ["to fall / to drop", "падать / ронять"], ["to throw", "бросать"], ["to carry", "нести"],
  ["to lift", "поднимать"], ["to push", "толкать"], ["to pull", "тянуть"],
  ["to put / to cook", "класть / готовить"],
  ["to prepare / to manufacture", "подготавливать / изготавливать"],
  ["to clean (tidy)", "убирать(ся)"], ["to wash", "мыть / стирать"],
  ["to dry (something)", "сушить"], ["to boil", "варить"],
  ["to fry / to bake / to shine (sun)", "жарить / печь / светить (о солнце)"],
  ["to cut", "резать"], ["to sew", "шить"], ["to swim", "плавать"], ["to jump", "прыгать"],
  ["to notice", "замечать"], ["to check", "проверять"],
  ["to reserve / to book", "бронировать"], ["to order", "заказывать"],
  ["to rent", "арендовать / снимать"], ["to borrow / to lend", "брать взаймы / одалживать"],
  ["to return (give back)", "возвращать (отдавать)"],
  ["to save (money)", "копить / сберегать"], ["to spend / to consume", "тратить / потреблять"],
  ["to earn", "зарабатывать"], ["to own", "владеть"],
  ["to have as a hobby", "увлекаться (чем-то)"], ["to imitate", "подражать"]
]],
["Common adjectives", [
  ["good", "хороший"], ["bad", "плохой"], ["big", "большой"], ["small", "маленький"],
  ["new", "новый"], ["old", "старый"], ["young", "молодой"], ["beautiful", "красивый"],
  ["ugly", "некрасивый"], ["long", "длинный"], ["short", "короткий"],
  ["high / tall", "высокий"], ["low", "низкий"], ["wide", "широкий"], ["narrow", "узкий"],
  ["fast", "быстрый"], ["slow", "медленный"], ["cold", "холодный"], ["hot", "горячий"],
  ["warm", "тёплый"], ["hard", "твёрдый"], ["soft", "мягкий"], ["heavy", "тяжёлый"],
  ["light (weight)", "лёгкий (по весу)"], ["expensive", "дорогой"], ["cheap", "дешёвый"],
  ["easy", "лёгкий (простой)"], ["difficult", "трудный"], ["important", "важный"],
  ["interesting", "интересный"], ["boring", "скучный"], ["fun / funny", "весёлый / смешной"],
  ["sad", "грустный"], ["happy", "счастливый"], ["angry", "злой / сердитый"],
  ["tired", "уставший"], ["healthy", "здоровый"], ["sick", "больной"], ["clean", "чистый"],
  ["dirty", "грязный"], ["full", "полный"], ["empty", "пустой"],
  ["right / correct", "правильный"], ["wrong", "неправильный"], ["same", "одинаковый"],
  ["different", "другой / разный"], ["possible", "возможный"], ["impossible", "невозможный"],
  ["ready / finished", "готовый"], ["free", "свободный"], ["busy", "занятой"],
  ["quiet", "тихий"], ["loud", "громкий"], ["bright / clear", "яркий / ясный"],
  ["dark", "тёмный"], ["wet", "мокрый"], ["dry", "сухой"], ["strong", "сильный"],
  ["weak", "слабый"], ["rich", "богатый"], ["poor", "бедный"],
  ["friendly / kind", "дружелюбный / добрый"], ["unfriendly", "недружелюбный"],
  ["polite", "вежливый"], ["smart / clever", "умный"], ["stupid", "глупый"],
  ["safe", "безопасный"], ["dangerous", "опасный"], ["sure / certain", "уверенный"],
  ["uncertain", "неуверенный"], ["real", "настоящий"], ["fake / counterfeit", "поддельный"],
  ["popular", "популярный"], ["rare", "редкий"], ["ordinary / common", "обычный"],
  ["strange / odd", "странный"], ["nice / comfortable", "приятный / удобный"],
  ["uncomfortable", "неудобный"], ["simple", "простой"], ["complicated", "сложный"],
  ["sweet", "сладкий"], ["sour", "кислый"]
]],
["Everyday nouns — home, places, people", [
  ["house", "дом (здание)"], ["home", "дом (родной очаг)"], ["room", "комната"],
  ["door", "дверь"], ["window", "окно"], ["table", "стол"], ["chair", "стул"],
  ["bed", "кровать"], ["kitchen", "кухня"], ["bathroom", "ванная комната"],
  ["living room", "гостиная"], ["bedroom", "спальня"], ["car", "машина"], ["road", "дорога"],
  ["street", "улица"], ["city / town", "город"], ["country / land / earth", "страна / земля"],
  ["world", "мир"], ["human / person", "человек"], ["man", "мужчина"], ["woman", "женщина"],
  ["child", "ребёнок"], ["family", "семья"], ["friend", "друг"], ["work / job", "работа"],
  ["school", "школа"], ["money", "деньги"], ["time", "время"], ["day", "день"],
  ["night", "ночь"], ["week", "неделя"], ["month", "месяц"], ["year", "год"],
  ["water", "вода"], ["food", "еда"], ["bread", "хлеб"], ["milk", "молоко"],
  ["coffee", "кофе"], ["tea", "чай"], ["air", "воздух"], ["weather", "погода"],
  ["sun", "солнце"], ["moon", "луна"], ["star", "звезда"], ["sky", "небо"], ["sea", "море"],
  ["lake", "озеро"], ["forest", "лес"], ["tree / wood", "дерево"], ["flower", "цветок"],
  ["animal", "животное"], ["dog", "собака"], ["cat", "кошка"], ["bird", "птица"],
  ["book", "книга"], ["pen", "ручка"], ["paper", "бумага"], ["phone", "телефон"],
  ["computer", "компьютер"], ["television", "телевизор"], ["radio", "радио"],
  ["music", "музыка"], ["movie", "фильм"], ["game", "игра"], ["sport", "спорт"],
  ["trip / journey", "поездка / путешествие"], ["airplane", "самолёт"], ["train", "поезд"],
  ["bus", "автобус"], ["ship", "корабль"], ["store / shop", "магазин"],
  ["restaurant", "ресторан"], ["hospital", "больница"], ["university", "университет"],
  ["church", "церковь"], ["park", "парк"], ["bridge", "мост"],
  ["market square", "рыночная площадь"], ["library", "библиотека"], ["station", "вокзал"],
  ["airport", "аэропорт"], ["hotel", "гостиница"], ["office", "офис"], ["factory", "завод"],
  ["city district", "район города"], ["neighborhood", "жилой квартал"],
  ["countryside", "сельская местность"], ["island", "остров"], ["mountain", "гора"],
  ["valley", "долина"], ["shore / beach", "берег / пляж"], ["river", "река"],
  ["roof", "крыша"], ["wall", "стена"], ["floor", "пол"], ["stairs", "лестница"],
  ["yard", "двор"], ["garden", "сад"], ["fence", "забор"], ["key", "ключ"], ["lock", "замок"],
  ["light", "свет"], ["lamp", "лампа"], ["mirror", "зеркало"], ["clock / watch", "часы"],
  ["bag", "сумка"], ["backpack", "рюкзак"], ["wallet", "кошелёк"]
]],
["Function words — conjunctions, prepositions, adverbs, particles", [
  ["and", "и"], ["but", "но"], ["or", "или"], ["because", "потому что"], ["if", "если"],
  ["when / as (conj.)", "когда (союз)"], ["that (conj.)", "что (союз)"],
  ["than / as / like", "чем / как"], ["although", "хотя"], ["until", "пока не"],
  ["before", "до / перед"], ["after", "после"], ["during", "во время"], ["without", "без"],
  ["with", "с"], ["through", "через"], ["around", "вокруг"], ["under / below", "под"],
  ["on top of", "на (поверх)"], ["inside", "внутри"], ["outside", "снаружи"],
  ["next to / beside", "рядом с"], ["between", "между"], ["behind", "позади"],
  ["in front of", "перед"], ["near", "около"], ["far away", "далеко"],
  ["up (direction)", "вверх"], ["down (direction)", "вниз"], ["in (direction)", "внутрь"],
  ["out (direction)", "наружу"], ["here", "здесь"], ["there", "там"],
  ["over there", "вон там"], ["now", "сейчас"], ["then / at that time", "тогда"],
  ["always", "всегда"], ["never", "никогда"], ["sometimes", "иногда"], ["often", "часто"],
  ["rarely", "редко"], ["already", "уже"], ["still / yet", "всё ещё"], ["again", "снова"],
  ["also / too", "тоже"], ["only", "только"], ["however / anyway", "однако"],
  ["so / therefore", "поэтому"], ["for example", "например"], ["of course", "конечно"],
  ["maybe", "может быть"], ["surely / certainly", "наверняка"], ["perhaps", "возможно"],
  ["almost", "почти"], ["completely", "полностью"], ["a little", "немного"],
  ["a lot / much", "много"], ["too (excessively)", "слишком"], ["very", "очень"],
  ["extremely", "чрезвычайно"], ["quite / totally", "совсем"],
  ["probably / I guess", "наверное"], ["no / not", "нет / не"], ["yes", "да"],
  ["thank you", "спасибо"], ["you're welcome / please", "пожалуйста"],
  ["sorry / excuse me", "извините"], ["absolutely", "безусловно"]
]],
["Time — days, months, seasons, time of day", [
  ["Monday", "понедельник"], ["Tuesday", "вторник"], ["Wednesday", "среда"],
  ["Thursday", "четверг"], ["Friday", "пятница"], ["Saturday", "суббота"],
  ["Sunday", "воскресенье"], ["January", "январь"], ["February", "февраль"], ["March", "март"],
  ["April", "апрель"], ["May", "май"], ["June", "июнь"], ["July", "июль"],
  ["August", "август"], ["September", "сентябрь"], ["October", "октябрь"],
  ["November", "ноябрь"], ["December", "декабрь"], ["spring", "весна"], ["summer", "лето"],
  ["autumn / fall", "осень"], ["winter", "зима"], ["today", "сегодня"], ["tomorrow", "завтра"],
  ["yesterday", "вчера"], ["the day after tomorrow", "послезавтра"],
  ["the day before yesterday", "позавчера"], ["morning", "утро"], ["evening", "вечер"],
  ["midday / noon", "полдень"], ["midnight", "полночь"], ["moment", "момент"],
  ["minute", "минута"], ["hour", "час"], ["second", "секунда"], ["weekend", "выходные"],
  ["weekday / everyday life", "будни / повседневная жизнь"],
  ["public holiday", "государственный праздник"], ["age", "возраст"], ["century", "век"]
]],
["Family & people", [
  ["mother", "мать"], ["father", "отец"], ["brother", "брат"], ["sister", "сестра"],
  ["son / boy", "сын / мальчик"], ["daughter", "дочь"], ["wife", "жена"], ["husband", "муж"],
  ["grandmother", "бабушка"], ["grandfather", "дедушка"], ["aunt", "тётя"], ["uncle", "дядя"],
  ["cousin", "двоюродный брат / сестра"], ["neighbor", "сосед"], ["teacher", "учитель"],
  ["doctor", "врач"], ["nurse", "медсестра"], ["police officer", "полицейский"],
  ["salesperson", "продавец"], ["customer", "клиент"], ["boss", "начальник"],
  ["colleague", "коллега"], ["student / pupil", "студент / ученик"], ["engineer", "инженер"],
  ["lawyer", "юрист / адвокат"], ["cook / chef", "повар"], ["artist", "художник"],
  ["writer / author", "писатель"], ["musician", "музыкант"], ["athlete", "спортсмен"]
]],
["Food & drink", [
  ["apple", "яблоко"], ["banana", "банан"], ["potato", "картофель"], ["meat", "мясо"],
  ["fish", "рыба"], ["chicken", "курица"], ["rice", "рис"], ["pasta", "макароны"],
  ["cheese", "сыр"], ["butter", "сливочное масло"], ["sugar", "сахар"], ["salt", "соль"],
  ["pepper", "перец"], ["fruit", "фрукт"], ["vegetable", "овощ"], ["berry", "ягода"],
  ["strawberry", "клубника"], ["blueberry", "черника"], ["soup", "суп"], ["salad", "салат"],
  ["dessert", "десерт"], ["breakfast", "завтрак"], ["lunch", "обед"],
  ["dinner / supper", "ужин"], ["porridge", "каша"], ["sausage", "колбаса"], ["egg", "яйцо"],
  ["honey", "мёд"], ["juice", "сок"], ["beer", "пиво"]
]],
["Body parts", [
  ["head", "голова"], ["eye", "глаз"], ["ear", "ухо"], ["nose", "нос"], ["mouth", "рот"],
  ["hand / arm", "рука"], ["foot / leg", "нога"], ["finger", "палец (руки)"],
  ["toe", "палец (ноги)"], ["back", "спина"], ["stomach", "живот"], ["heart", "сердце"],
  ["skin", "кожа"], ["hair", "волосы"], ["tooth", "зуб"], ["neck", "шея"]
]],
["Colors", [
  ["red", "красный"], ["blue", "синий"], ["yellow", "жёлтый"], ["green", "зелёный"],
  ["black", "чёрный"], ["white", "белый"], ["gray", "серый"], ["brown", "коричневый"],
  ["orange", "оранжевый"], ["purple", "фиолетовый"], ["pink", "розовый"]
]],
["Clothing", [
  ["shirt", "рубашка"], ["pants", "брюки"], ["skirt", "юбка"], ["dress", "платье"],
  ["jacket / coat", "куртка"], ["shoes", "туфли"], ["socks", "носки"], ["hat", "шапка"],
  ["glove", "перчатка"], ["belt", "ремень"], ["scarf", "шарф"], ["blouse", "блузка"]
]],
["Emotions & abstract concepts", [
  ["love", "любовь"], ["hate / anger", "ненависть / злость"], ["fear", "страх"],
  ["happiness / luck", "счастье / удача"], ["sadness / grief", "грусть / горе"],
  ["hope", "надежда"], ["dream (aspiration)", "мечта"], ["truth", "правда"], ["lie", "ложь"],
  ["life", "жизнь"], ["death", "смерть"], ["freedom", "свобода"],
  ["peace", "мир (спокойствие)"], ["war", "война"], ["faith / belief", "вера"],
  ["doubt", "сомнение"], ["shame", "стыд"], ["pride", "гордость"], ["envy", "зависть"],
  ["honor", "честь"]
]]
];

const cards = [];
let idx = 0;
const seen = new Map();
const dupes = [];
SECTIONS.forEach(([section, pairs]) => {
  pairs.forEach(([front, back]) => {
    idx += 1;
    const id = 'ew-' + String(idx).padStart(3, '0');
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

const header = `/* Topic: English — 500 Popular Words. High-frequency vocabulary across word
   classes (pronouns, verbs, adjectives, everyday nouns, function words, time,
   family, food, body, colors, clothing, emotions) for general fluency.
   Audience: Russian-speaking learners of English.
   Front = English word, back = Russian meaning.
   GENERATED by scripts/gen-english-500-words.js from a categorized word list —
   edit the SECTIONS array there and re-run rather than hand-editing this file. */
SRS.registerTopic({
  id: "english-500-words",
  name: "English: 500 Popular Words",
  description: "The 500 most useful everyday English words — pronouns, verbs, adjectives, nouns, and function words — for Russian-speaking learners building general fluency fast.",
  cards: [
${body}  ]
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'topics', 'english-500-words.js'), header, 'utf8');
console.log('Wrote generated topic file.');
