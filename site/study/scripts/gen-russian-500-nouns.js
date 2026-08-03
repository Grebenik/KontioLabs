/* Builds site/study/topics/russian-500-nouns.js from a categorized word list.
   GENERATED FILE ITSELF, but also hand-maintainable: edit SECTIONS below and
   re-run `node gen-russian-500-nouns.js` (writes the topic file + reports dupes/count).
   Shares its underlying [English, Russian] concept set 1:1 with
   gen-english-500-nouns.js — the two decks are generated from the same word pairs,
   just with front/back and the language direction flipped. */
'use strict';
const fs = require('fs');
const path = require('path');

/* [front, back] pairs, grouped by category (category name becomes a
   comment marker in the generated file so the deck stays readable/editable). */
const SECTIONS = [
["Household & furniture", [
  ["скатерть", "tablecloth"], ["занавеска", "curtain"], ["ковёр", "rug / carpet"],
  ["полка", "shelf"], ["шкаф", "cabinet / cupboard"], ["коробка / ящик", "box / drawer"],
  ["подушка", "pillow / cushion"], ["одеяло", "blanket"], ["простыня", "bed sheet"],
  ["матрас", "mattress"], ["диван", "sofa / couch"], ["кресло", "armchair"],
  ["духовка", "oven"], ["холодильник", "refrigerator"], ["морозильник", "freezer"],
  ["посудомоечная машина", "dishwasher"], ["стиральная машина", "washing machine"],
  ["сушильная машина", "clothes dryer"], ["утюг", "iron (appliance)"],
  ["пылесос", "vacuum cleaner"], ["мусорное ведро", "wastebasket / trash can"],
  ["свеча", "candle"], ["ваза", "vase"], ["картина", "painting / picture (framed)"],
  ["настенные часы", "wall clock"], ["карниз для штор", "curtain rod"],
  ["торшер", "floor lamp"], ["книжная полка", "bookshelf"],
  ["вешалка для одежды", "coat rack"], ["подсвечник", "candle holder"],
  ["интерьер", "interior design / decor"]
]],
["Kitchen & dining", [
  ["нож", "knife"], ["вилка", "fork"], ["ложка", "spoon"], ["тарелка", "plate"],
  ["чашка", "cup"], ["стакан", "drinking glass"], ["кастрюля", "pot"],
  ["сковорода", "frying pan"], ["разделочная доска", "cutting board"],
  ["открывалка", "opener (can/bottle)"], ["котелок", "cauldron"],
  ["форма для запекания", "baking dish"], ["миксер", "mixer / blender"],
  ["мерный стакан", "measuring cup"], ["поднос", "tray"], ["термос", "thermos bottle"],
  ["меню", "menu"], ["официант", "waiter / waitress"]
]],
["Nature & geography", [
  ["пустыня", "desert"], ["тундра", "tundra"], ["луг", "meadow"], ["болото", "swamp / marsh"],
  ["скала", "rock / cliff"], ["пещера", "cave"], ["водопад", "waterfall"],
  ["землетрясение", "earthquake"], ["вулкан", "volcano"], ["ледник", "glacier"],
  ["волна", "wave"], ["континент", "continent"], ["океан", "ocean"],
  ["полуостров", "peninsula / cape"], ["залив", "bay"], ["пролив", "strait"],
  ["природа", "nature"], ["окружающая среда", "environment"], ["климат", "climate"],
  ["загрязнение", "pollution"], ["переработка отходов", "recycling"]
]],
["Animals", [
  ["лошадь", "horse"], ["корова", "cow"], ["свинья", "pig"], ["овца", "sheep"],
  ["коза", "goat"], ["утка", "duck"], ["гусь", "goose"], ["акула", "shark"],
  ["дельфин", "dolphin"], ["кит", "whale"], ["медведь", "bear"], ["волк", "wolf"],
  ["лиса", "fox"], ["кролик", "rabbit / hare"], ["белка", "squirrel"], ["мышь", "mouse"],
  ["крыса", "rat"], ["змея", "snake"], ["лягушка", "frog"], ["бабочка", "butterfly"],
  ["пчела", "bee"], ["муравей", "ant"], ["паук", "spider"], ["муха", "fly (insect)"],
  ["комар", "mosquito"], ["лев", "lion"], ["тигр", "tiger"], ["слон", "elephant"],
  ["обезьяна", "monkey"], ["жираф", "giraffe"], ["зебра", "zebra"], ["сова", "owl"],
  ["орёл", "eagle"], ["лебедь", "swan"], ["пингвин", "penguin"],
  ["домашнее животное", "domestic / farm animal"], ["дикое животное", "wild animal"],
  ["насекомое", "insect"], ["рептилия", "reptile"], ["млекопитающее", "mammal"],
  ["ёж", "hedgehog"], ["бобёр", "beaver"], ["лось", "elk / moose"],
  ["северный олень", "reindeer"], ["олень", "deer"], ["рысь", "lynx"], ["выдра", "otter"]
]],
["Plants & garden", [
  ["трава", "grass"], ["лист", "leaf"], ["корень", "root"], ["ветка", "branch"],
  ["семя", "seed"], ["роза", "rose"], ["дуб", "oak"], ["берёза", "birch"],
  ["сосна", "pine tree"], ["ель", "spruce tree"], ["куст", "bush / shrub"],
  ["плодовое дерево", "fruit tree"], ["огород", "vegetable garden"], ["газон", "lawn"]
]],
["Body & health", [
  ["кость", "bone"], ["мышца", "muscle"], ["мозг", "brain"], ["лёгкие", "lungs"],
  ["печень", "liver"], ["почка", "kidney"], ["кровь", "blood"], ["локоть", "elbow"],
  ["колено", "knee"], ["плечо", "shoulder"], ["грудная клетка", "chest"], ["лодыжка", "ankle"],
  ["запястье", "wrist"], ["ноготь", "nail (finger/toe)"], ["лоб", "forehead"],
  ["подбородок", "chin / jaw"], ["щека", "cheek"], ["бровь", "eyebrow"],
  ["ресницы", "eyelashes"]
]],
["Professions & workplace", [
  ["пожарный", "firefighter"], ["солдат", "soldier"], ["банкир", "banker"],
  ["бухгалтер", "accountant"], ["секретарь", "secretary"], ["менеджер", "manager / director"],
  ["предприниматель", "entrepreneur"], ["журналист", "journalist"],
  ["исследователь", "researcher"], ["архитектор", "architect"], ["электрик", "electrician"],
  ["сантехник", "plumber"], ["фермер", "farmer"], ["рыбак", "fisherman"], ["пекарь", "baker"],
  ["парикмахер", "hairdresser / barber"], ["уборщик", "cleaner"],
  ["охранник", "security guard"], ["пилот", "pilot"], ["моряк", "sailor"],
  ["пастор", "pastor"], ["фотограф", "photographer"], ["режиссёр", "director (film)"],
  ["актёр", "actor"], ["танцор", "dancer"], ["дизайнер", "designer"],
  ["программист", "programmer"], ["ассистент", "assistant"], ["стажёр", "intern / trainee"],
  ["пенсионер", "retiree"], ["безработный", "unemployed person"]
]],
["Buildings & places", [
  ["музей", "museum"], ["театр", "theater"], ["кинотеатр", "cinema"],
  ["книжный магазин", "bookstore"], ["аптека", "pharmacy"], ["банк", "bank"],
  ["почта", "post office"], ["тюрьма", "prison"], ["замок", "castle"], ["дворец", "palace"],
  ["ферма", "farm"], ["кемпинг", "campsite"], ["крытый бассейн", "swimming hall"],
  ["спортивное поле", "sports field"], ["каток", "ice rink"],
  ["детская площадка", "playground"], ["автостоянка", "parking lot"],
  ["заправка", "gas station"], ["торговый центр", "shopping mall"], ["туннель", "tunnel"],
  ["перекрёсток", "intersection"], ["светофор", "traffic light"],
  ["автобусная остановка", "bus stop"], ["уличный фонарь", "streetlight"],
  ["канализация", "sewer"], ["электросеть", "electric grid"], ["водопровод", "water pipe"]
]],
["Transportation & travel", [
  ["велосипед", "bicycle"], ["мотоцикл", "motorcycle"], ["грузовик", "truck"],
  ["такси", "taxi"], ["трамвай", "tram"], ["метро", "subway / metro"], ["лодка", "boat"],
  ["каноэ", "canoe"], ["самокат", "scooter"], ["трактор", "tractor"], ["чемодан", "suitcase"],
  ["паспорт", "passport"], ["виза", "visa"], ["билет", "ticket"], ["расписание", "schedule"],
  ["маршрут", "route"], ["турист", "tourist"], ["гид", "guide / guidebook"],
  ["жильё для проживания", "accommodation"], ["сувенир", "souvenir"]
]],
["Technology & tools", [
  ["клавиатура", "keyboard"], ["компьютерная мышь", "mouse (computer device)"],
  ["экран", "screen / monitor"], ["принтер", "printer"], ["фотоаппарат", "camera"],
  ["зарядный кабель", "charging cable"], ["аккумулятор", "battery (rechargeable)"],
  ["приложение", "app / application"], ["программное обеспечение", "software"],
  ["сеть", "network"], ["молоток", "hammer"], ["гвоздь", "nail (hardware)"],
  ["шуруп", "screw"], ["отвёртка", "screwdriver"], ["плоскогубцы", "pliers"], ["пила", "saw"],
  ["стремянка", "ladder"], ["рулетка", "tape measure"], ["интернет", "internet"],
  ["веб-сайт", "website"], ["файл", "file (computer)"], ["пароль", "password"],
  ["имя пользователя", "username"]
]],
["Clothing & accessories", [
  ["галстук", "necktie"], ["пижама", "pajamas"], ["нижнее бельё", "underwear"],
  ["купальник", "swimsuit"], ["сапоги", "boots"], ["тапочки", "slippers"],
  ["украшения", "jewelry"], ["кольцо", "ring"], ["ожерелье", "necklace"],
  ["очки", "eyeglasses"], ["солнцезащитные очки", "sunglasses"], ["сумочка", "handbag"]
]],
["Abstract, business & law", [
  ["закон", "law"], ["право", "right / justice"], ["контракт", "contract"],
  ["компания / попытка", "company / attempt"], ["экономика", "economy"],
  ["политика", "politics"], ["правительство", "government"], ["президент", "president"],
  ["гражданин", "citizen"], ["общество", "society"], ["культура", "culture"],
  ["история", "history"], ["наука", "science"], ["технология", "technology"],
  ["информация", "information / knowledge"], ["ответственность", "responsibility"],
  ["справедливость", "justice / fairness"], ["равенство", "equality"],
  ["демократия", "democracy"], ["суд", "court (of law)"], ["судья", "judge"],
  ["прокурор", "prosecutor"], ["наказание", "punishment"], ["преступление", "crime"],
  ["доказательство", "evidence"], ["маркетинг", "marketing"], ["реклама", "advertisement"],
  ["бренд", "brand"], ["продукт", "product"], ["услуга", "service"],
  ["обслуживание клиентов", "customer service"], ["переговоры", "negotiation"]
]],
["Sports & hobbies", [
  ["футбол", "football / soccer"], ["баскетбол", "basketball"], ["хоккей", "ice hockey"],
  ["теннис", "tennis"], ["плавание", "swimming"], ["лыжный спорт", "skiing"],
  ["катание на коньках", "skating"], ["велоспорт", "cycling"], ["бег", "running"],
  ["рыбалка", "fishing"], ["охота", "hunting"], ["фотография", "photography"],
  ["литература", "literature"], ["живопись", "painting (art form)"],
  ["скульптура", "sculpture"], ["ракетка", "bat / racket"], ["команда", "team"],
  ["матч", "match / game"], ["медаль", "medal"], ["стадион", "stadium"],
  ["рукоделие", "handicraft"], ["искусство", "art (general)"], ["выставка", "exhibition"],
  ["галерея", "gallery"]
]],
["Materials & shapes", [
  ["металл", "metal"], ["пластик", "plastic"], ["камень", "stone"], ["бетон", "concrete"],
  ["ткань", "fabric"], ["кожа (материал)", "leather"], ["резина", "rubber"],
  ["круг", "circle"], ["квадрат", "square"], ["треугольник", "triangle"],
  ["прямоугольник", "rectangle"], ["мяч / шар", "ball / sphere"], ["точка", "point / dot"],
  ["линия", "line"], ["угол", "angle / corner"], ["площадь", "area"], ["объём", "volume"]
]],
["School & education", [
  ["классная комната", "classroom"], ["урок", "lesson"], ["экзамен", "exam / test"],
  ["табель успеваемости", "certificate / report card"], ["тетрадь", "notebook"],
  ["учёная степень", "degree (academic)"], ["диссертация", "thesis / essay"],
  ["лекция", "lecture"], ["папка", "folder"], ["скоба для степлера", "staple"],
  ["степлер", "stapler"], ["клейкая лента", "tape"], ["линейка", "ruler"],
  ["ластик", "eraser"], ["школьная доска", "chalkboard"], ["маркер", "marker pen"],
  ["стикер", "sticky note"], ["математика", "mathematics"], ["физика", "physics"],
  ["химия", "chemistry"], ["биология", "biology"]
]],
["Weather & seasons", [
  ["дождь", "rain"], ["снег", "snow"], ["ветер", "wind"], ["облако", "cloud"],
  ["гром", "thunder"], ["молния", "lightning"], ["туман", "fog"], ["лёд", "ice"],
  ["заморозки", "ground frost"], ["иней", "frost / rime"],
  ["северное сияние", "northern lights"], ["роса", "dew"], ["буря", "storm"],
  ["наводнение", "flood"], ["засуха", "drought"]
]],
["Money & shopping", [
  ["цена", "price"], ["скидка", "discount"], ["счёт", "bill / invoice"], ["чек", "receipt"],
  ["банковская карта", "debit / credit card"], ["наличные", "cash"], ["зарплата", "salary"],
  ["налог", "tax"], ["бюджет", "budget"], ["инвестиция", "investment"]
]],
["Emotions & personality (nouns)", [
  ["смелость", "courage"], ["мудрость", "wisdom"], ["терпение", "patience"],
  ["усердие", "diligence"], ["лень", "laziness"], ["честность", "honesty"],
  ["доверие", "trust"], ["дружба", "friendship"], ["одиночество", "loneliness"],
  ["радость", "joy"], ["волнение", "excitement / tension"], ["облегчение", "relief"],
  ["разочарование", "disappointment"], ["удивление", "wonder / surprise"],
  ["благодарность", "gratitude"], ["сострадание", "compassion"], ["отвращение", "disgust"],
  ["смех", "laughter"], ["плач", "crying"], ["улыбка", "smile"], ["вздох", "sigh"]
]],
["Household chores & city life", [
  ["стирка", "laundry"], ["мусор", "trash / litter"], ["щётка", "brush"], ["метла", "broom"],
  ["ведро", "bucket"], ["моющее средство", "detergent"], ["спор", "argument / quarrel"],
  ["примирение", "harmony / reconciliation"], ["сотрудничество", "cooperation"],
  ["соревнование", "competition"], ["победа", "victory"], ["поражение", "defeat"]
]],
["Measurement & science", [
  ["метр", "meter"], ["километр", "kilometer"], ["сантиметр", "centimeter"],
  ["килограмм", "kilogram"], ["грамм", "gram"], ["литр", "liter"], ["градус", "degree"],
  ["температура", "temperature"], ["вес", "weight"], ["длина", "length / height"],
  ["планета", "planet"], ["земной шар", "Earth / globe"], ["галактика", "galaxy"],
  ["вселенная", "universe"], ["атом", "atom"], ["молекула", "molecule"],
  ["клетка", "cell (biology)"], ["ген", "gene"], ["энергия", "energy"], ["сила", "force"],
  ["гравитация", "gravity"], ["сумма", "sum"], ["разность", "difference (math)"],
  ["результат", "result / product"], ["деление", "division"], ["уравнение", "equation"],
  ["формула", "formula"]
]],
["Family & relationships (extra)", [
  ["супруг / супруга", "spouse"], ["парень", "boyfriend"], ["девушка", "girlfriend"],
  ["брак", "marriage"], ["развод", "divorce"], ["родственник", "relative"],
  ["внук / внучка", "grandchild"], ["крёстный", "godparent"]
]],
["Food (extra)", [
  ["специя", "spice"], ["растительное масло", "oil"], ["уксус", "vinegar"], ["соус", "sauce"],
  ["печенье", "cookie / biscuit"], ["торт", "cake"], ["шоколад", "chocolate"],
  ["мороженое", "ice cream"], ["пицца", "pizza"], ["гамбургер", "hamburger"],
  ["бутерброд", "sandwich"], ["орех", "nut"], ["лимон", "lemon"],
  ["апельсин", "orange (fruit)"], ["виноград", "grape"], ["арбуз", "watermelon"],
  ["ананас", "pineapple"], ["лук", "onion"], ["чеснок", "garlic"], ["помидор", "tomato"],
  ["огурец", "cucumber"], ["морковь", "carrot"], ["кукуруза", "corn"], ["горох", "pea"],
  ["фасоль", "bean"]
]],
["Sleep, daily routine & communication", [
  ["сон", "sleep / dream"], ["кошмар", "nightmare"], ["будильник", "alarm clock"],
  ["дневной сон", "nap"], ["сообщение", "message"], ["электронная почта", "email"],
  ["письмо", "letter (mail)"], ["открытка", "postcard"], ["телефонный звонок", "phone call"],
  ["разговор", "conversation"], ["объявление", "announcement / ad"]
]],
["Music & the arts", [
  ["гитара", "guitar"], ["пианино", "piano"], ["барабаны", "drums"], ["скрипка", "violin"],
  ["флейта", "flute"], ["труба", "trumpet"], ["певец", "singer"]
]],
["Geography & nations", [
  ["государство", "state / nation"], ["столица", "capital city"], ["граница", "border"],
  ["карта", "map"], ["язык", "language"], ["национальность", "nationality"],
  ["государственный флаг", "national flag"]
]],
["Home appliances (extra)", [
  ["микроволновая печь", "microwave oven"], ["кофеварка", "coffee maker"],
  ["тостер", "toaster"], ["фен", "hair dryer"],
  ["электрическая зубная щётка", "electric toothbrush"], ["колонка", "speaker"]
]]
];

const cards = [];
let idx = 0;
const seen = new Map();
const dupes = [];
SECTIONS.forEach(([section, pairs]) => {
  pairs.forEach(([front, back]) => {
    idx += 1;
    const id = 'ro-' + String(idx).padStart(3, '0');
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

const header = `/* Topic: Russian — 500 Nouns. Concrete and abstract nouns across household,
   nature, animals, professions, places, technology, science, food, and more —
   complements the Popular Words deck, which covers pronouns/verbs/adjectives.
   Audience: English-speaking learners of Russian.
   Front = Russian noun, back = English meaning.
   GENERATED by scripts/gen-russian-500-nouns.js from a categorized word list —
   edit the SECTIONS array there and re-run rather than hand-editing this file. */
SRS.registerTopic({
  id: "russian-500-nouns",
  group: "Russian",
  name: "Russian: 500 Nouns",
  description: "500 Russian nouns across household, nature, animals, professions, places, technology, science, food, and more — for English-speaking learners of Russian.",
  cards: [
${body}  ]
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'topics', 'russian-500-nouns.js'), header, 'utf8');
console.log('Wrote generated topic file.');
