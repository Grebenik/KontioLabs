/* Builds site/study/topics/finnish-500-nouns.js from a categorized noun list.
   Run: node gen-finnish-500-nouns.js  (writes the topic file + reports dupes/count) */
'use strict';
const fs = require('fs');
const path = require('path');

const SECTIONS = [
["Household & furniture", [
  ["pöytäliina", "tablecloth"], ["verho", "curtain"], ["matto", "rug / carpet"],
  ["hylly", "shelf"], ["kaappi", "cabinet / cupboard"], ["laatikko", "box / drawer"],
  ["tyyny", "pillow / cushion"], ["peitto", "blanket"], ["lakana", "bed sheet"],
  ["patja", "mattress"], ["sohva", "sofa / couch"], ["nojatuoli", "armchair"],
  ["uuni", "oven"], ["jääkaappi", "refrigerator"], ["pakastin", "freezer"],
  ["astianpesukone", "dishwasher"], ["pesukone", "washing machine"],
  ["kuivausrumpu", "clothes dryer"], ["silitysrauta", "iron (appliance)"],
  ["pölynimuri", "vacuum cleaner"], ["roskakori", "wastebasket / trash can"],
  ["kynttilä", "candle"], ["maljakko", "vase"], ["taulu", "painting / picture (framed)"],
  ["seinäkello", "wall clock"], ["verhotanko", "curtain rod"], ["lattialamppu", "floor lamp"],
  ["kirjahylly", "bookshelf"], ["naulakko", "coat rack"], ["kynttilänjalka", "candle holder"],
  ["sisustus", "interior design / decor"]
]],
["Kitchen & dining", [
  ["veitsi", "knife"], ["haarukka", "fork"], ["lusikka", "spoon"], ["lautanen", "plate"],
  ["kuppi", "cup"], ["lasi", "drinking glass"], ["kattila", "pot"],
  ["paistinpannu", "frying pan"], ["leikkuulauta", "cutting board"],
  ["avaaja", "opener (e.g. can/bottle)"], ["pata", "pot / cauldron"],
  ["uunivuoka", "baking dish"], ["sekoitin", "mixer / blender"],
  ["mittakuppi", "measuring cup"], ["tarjotin", "tray"], ["termospullo", "thermos bottle"],
  ["ruokalista", "menu"], ["tarjoilija", "waiter / waitress"]
]],
["Nature & geography", [
  ["aavikko", "desert"], ["tundra", "tundra"], ["niitty", "meadow"], ["suo", "swamp / marsh"],
  ["kallio", "rock / cliff"], ["luola", "cave"], ["vesiputous", "waterfall"],
  ["maanjäristys", "earthquake"], ["tulivuori", "volcano"], ["jäätikkö", "glacier"],
  ["aalto", "wave"], ["mannermaa", "continent"], ["valtameri", "ocean"],
  ["niemi", "peninsula / cape"], ["lahti", "bay"], ["salmi", "strait"],
  ["luonto", "nature (the natural world)"], ["ympäristö", "environment"],
  ["ilmasto", "climate"], ["saaste", "pollution"], ["kierrätys", "recycling"]
]],
["Animals", [
  ["hevonen", "horse"], ["lehmä", "cow"], ["sika", "pig"], ["lammas", "sheep"],
  ["vuohi", "goat"], ["ankka", "duck"], ["hanhi", "goose"], ["hai", "shark"],
  ["delfiini", "dolphin"], ["valas", "whale"], ["karhu", "bear"], ["susi", "wolf"],
  ["kettu", "fox"], ["jänis", "rabbit / hare"], ["orava", "squirrel"], ["hiiri", "mouse"],
  ["rotta", "rat"], ["käärme", "snake"], ["sammakko", "frog"], ["perhonen", "butterfly"],
  ["mehiläinen", "bee"], ["muurahainen", "ant"], ["hämähäkki", "spider"],
  ["kärpänen", "fly (insect)"], ["hyttynen", "mosquito"], ["leijona", "lion"],
  ["tiikeri", "tiger"], ["norsu", "elephant"], ["apina", "monkey"], ["kirahvi", "giraffe"],
  ["seepra", "zebra"], ["pöllö", "owl"], ["kotka", "eagle"], ["joutsen", "swan"],
  ["pingviini", "penguin"], ["kotieläin", "domestic / farm animal"],
  ["villieläin", "wild animal"], ["hyönteinen", "insect"], ["matelija", "reptile"],
  ["nisäkäs", "mammal"], ["siili", "hedgehog"], ["majava", "beaver"], ["hirvi", "elk / moose"],
  ["poro", "reindeer"], ["peura", "deer"], ["ilves", "lynx"], ["saukko", "otter"]
]],
["Plants & garden", [
  ["ruoho", "grass"], ["lehti", "leaf"], ["juuri", "root"], ["oksa", "branch"],
  ["siemen", "seed"], ["ruusu", "rose"], ["tammi", "oak"], ["koivu", "birch"],
  ["mänty", "pine tree"], ["kuusi", "spruce tree"], ["pensas", "bush / shrub"],
  ["hedelmäpuu", "fruit tree"], ["kasvimaa", "vegetable garden"], ["nurmikko", "lawn"]
]],
["Body & health", [
  ["luu", "bone"], ["lihas", "muscle"], ["aivot", "brain"], ["keuhkot", "lungs"],
  ["maksa", "liver"], ["munuainen", "kidney"], ["veri", "blood"], ["kyynärpää", "elbow"],
  ["polvi", "knee"], ["olkapää", "shoulder"], ["rintakehä", "chest"], ["nilkka", "ankle"],
  ["ranne", "wrist"], ["kynsi", "nail (finger/toe)"], ["otsa", "forehead"],
  ["leuka", "chin / jaw"], ["poski", "cheek"], ["kulmakarva", "eyebrow"],
  ["ripset", "eyelashes"]
]],
["Professions & workplace", [
  ["palomies", "firefighter"], ["sotilas", "soldier"], ["pankkiiri", "banker"],
  ["kirjanpitäjä", "accountant"], ["sihteeri", "secretary"], ["johtaja", "manager / director"],
  ["yrittäjä", "entrepreneur"], ["toimittaja", "journalist"], ["tutkija", "researcher"],
  ["arkkitehti", "architect"], ["sähköasentaja", "electrician"], ["putkimies", "plumber"],
  ["maanviljelijä", "farmer"], ["kalastaja", "fisherman"], ["leipuri", "baker"],
  ["parturi", "hairdresser / barber"], ["siivooja", "cleaner"], ["vartija", "security guard"],
  ["lentäjä", "pilot"], ["merimies", "sailor"], ["pastori", "pastor"],
  ["valokuvaaja", "photographer"], ["ohjaaja", "director (film)"], ["näyttelijä", "actor"],
  ["tanssija", "dancer"], ["muotoilija", "designer"], ["ohjelmoija", "programmer"],
  ["apulainen", "assistant"], ["harjoittelija", "intern / trainee"],
  ["eläkeläinen", "retiree"], ["työtön", "unemployed person"]
]],
["Buildings & places", [
  ["museo", "museum"], ["teatteri", "theater"], ["elokuvateatteri", "cinema"],
  ["kirjakauppa", "bookstore"], ["apteekki", "pharmacy"], ["pankki", "bank"],
  ["posti", "post office"], ["vankila", "prison"], ["linna", "castle"],
  ["palatsi", "palace"], ["maatila", "farm"], ["leirintäalue", "campsite"],
  ["uimahalli", "swimming hall"], ["urheilukenttä", "sports field"], ["jäähalli", "ice rink"],
  ["leikkikenttä", "playground"], ["parkkipaikka", "parking lot"],
  ["huoltoasema", "gas station"], ["ostoskeskus", "shopping mall"],
  ["tunneli", "tunnel"], ["risteys", "intersection"], ["liikennevalo", "traffic light"],
  ["pysäkki", "bus stop"], ["katuvalo", "streetlight"], ["viemäri", "sewer"],
  ["sähköverkko", "electric grid"], ["vesijohto", "water pipe"]
]],
["Transportation & travel", [
  ["polkupyörä", "bicycle"], ["moottoripyörä", "motorcycle"], ["rekka", "truck"],
  ["taksi", "taxi"], ["raitiovaunu", "tram"], ["metro", "subway / metro"],
  ["vene", "boat"], ["kanootti", "canoe"], ["potkulauta", "scooter"], ["traktori", "tractor"],
  ["matkalaukku", "suitcase"], ["passi", "passport"], ["viisumi", "visa"],
  ["lippu", "ticket"], ["aikataulu", "schedule"], ["reitti", "route"],
  ["matkailija", "tourist"], ["opas", "guide / guidebook"], ["majoitus", "accommodation"],
  ["matkamuisto", "souvenir"]
]],
["Technology & tools", [
  ["näppäimistö", "keyboard"], ["tietokonehiiri", "mouse (computer device)"], ["näyttö", "screen / monitor"],
  ["tulostin", "printer"], ["kamera", "camera"], ["latauskaapeli", "charging cable"],
  ["akku", "battery (rechargeable)"], ["sovellus", "app / application"],
  ["ohjelmisto", "software"], ["verkko", "network"], ["vasara", "hammer"],
  ["naula", "nail (hardware)"], ["ruuvi", "screw"], ["ruuvimeisseli", "screwdriver"],
  ["pihdit", "pliers"], ["saha", "saw"], ["tikkaat", "ladder"], ["mittanauha", "tape measure"],
  ["internet", "internet"], ["verkkosivu", "website"], ["tiedosto", "file (computer)"],
  ["salasana", "password"], ["käyttäjätunnus", "username"]
]],
["Clothing & accessories", [
  ["solmio", "necktie"], ["pyjama", "pajamas"], ["alusvaatteet", "underwear"],
  ["uimapuku", "swimsuit"], ["saappaat", "boots"], ["tossut", "slippers"],
  ["korut", "jewelry"], ["sormus", "ring"], ["kaulaketju", "necklace"],
  ["silmälasit", "eyeglasses"], ["aurinkolasit", "sunglasses"], ["käsilaukku", "handbag"]
]],
["Abstract, business & law", [
  ["laki", "law"], ["oikeus", "right / justice / court"], ["sopimus", "contract"],
  ["yritys", "company / attempt"], ["talous", "economy"], ["politiikka", "politics"],
  ["hallitus", "government"], ["presidentti", "president"], ["kansalainen", "citizen"],
  ["yhteiskunta", "society"], ["kulttuuri", "culture"], ["historia", "history"],
  ["tiede", "science"], ["teknologia", "technology"], ["tieto", "information / knowledge"],
  ["vastuu", "responsibility"], ["oikeudenmukaisuus", "justice / fairness"],
  ["tasa-arvo", "equality"], ["demokratia", "democracy"], ["tuomioistuin", "court (of law)"],
  ["tuomari", "judge"], ["syyttäjä", "prosecutor"], ["rangaistus", "punishment"],
  ["rikos", "crime"], ["todiste", "evidence"], ["markkinointi", "marketing"],
  ["mainos", "advertisement"], ["brändi", "brand"], ["tuote", "product"],
  ["palvelu", "service"], ["asiakaspalvelu", "customer service"], ["neuvottelu", "negotiation"]
]],
["Sports & hobbies", [
  ["jalkapallo", "football / soccer"], ["koripallo", "basketball"], ["jääkiekko", "ice hockey"],
  ["tennis", "tennis"], ["uinti", "swimming"], ["hiihto", "skiing"], ["luistelu", "skating"],
  ["pyöräily", "cycling"], ["juoksu", "running"], ["kalastus", "fishing"],
  ["metsästys", "hunting"], ["valokuvaus", "photography"], ["kirjallisuus", "literature"],
  ["maalaus", "painting (the art form)"], ["veistos", "sculpture"], ["maila", "bat / racket"],
  ["joukkue", "team"], ["ottelu", "match / game"], ["mitali", "medal"], ["stadion", "stadium"],
  ["käsityö", "handicraft"], ["taide", "art (general)"], ["näyttely", "exhibition"],
  ["galleria", "gallery"]
]],
["Materials & shapes", [
  ["metalli", "metal"], ["muovi", "plastic"], ["kivi", "stone"], ["betoni", "concrete"],
  ["kangas", "fabric"], ["nahka", "leather"], ["kumi", "rubber"], ["ympyrä", "circle"],
  ["neliö", "square"], ["kolmio", "triangle"], ["suorakulmio", "rectangle"],
  ["pallo", "ball / sphere"], ["piste", "point / dot"], ["viiva", "line"],
  ["kulma", "angle / corner"], ["pinta-ala", "area"], ["tilavuus", "volume"]
]],
["School & education", [
  ["luokka", "classroom / class"], ["oppitunti", "lesson"], ["koe", "exam / test"],
  ["todistus", "certificate / report card"], ["muistikirja", "notebook"],
  ["tutkinto", "degree (academic)"], ["tutkielma", "thesis / essay"], ["luento", "lecture"],
  ["kansio", "folder"], ["niitti", "staple"], ["niittikone", "stapler"], ["teippi", "tape"],
  ["viivotin", "ruler"], ["pyyhekumi", "eraser"], ["liitutaulu", "chalkboard"],
  ["tussi", "marker pen"], ["muistilappu", "sticky note"],
  ["matematiikka", "mathematics"], ["fysiikka", "physics"], ["kemia", "chemistry"],
  ["biologia", "biology"]
]],
["Weather & seasons", [
  ["sade", "rain"], ["lumi", "snow"], ["tuuli", "wind"], ["pilvi", "cloud"],
  ["ukkonen", "thunder"], ["salama", "lightning"], ["sumu", "fog"], ["jää", "ice"],
  ["routa", "ground frost"], ["kuura", "frost / rime"], ["revontulet", "northern lights"],
  ["kaste", "dew"], ["myrsky", "storm"], ["tulva", "flood"], ["kuivuus", "drought"]
]],
["Money & shopping", [
  ["hinta", "price"], ["alennus", "discount"], ["lasku", "bill / invoice"],
  ["kuitti", "receipt"], ["pankkikortti", "debit / credit card"], ["käteinen", "cash"],
  ["palkka", "salary"], ["vero", "tax"], ["budjetti", "budget"], ["sijoitus", "investment"]
]],
["Emotions & personality (nouns)", [
  ["rohkeus", "courage"], ["viisaus", "wisdom"], ["kärsivällisyys", "patience"],
  ["ahkeruus", "diligence"], ["laiskuus", "laziness"], ["rehellisyys", "honesty"],
  ["luottamus", "trust"], ["ystävyys", "friendship"], ["yksinäisyys", "loneliness"],
  ["ilo", "joy"], ["jännitys", "excitement / tension"], ["helpotus", "relief"],
  ["pettymys", "disappointment"], ["ihmetys", "wonder / surprise"],
  ["kiitollisuus", "gratitude"], ["myötätunto", "compassion"], ["inho", "disgust"],
  ["nauru", "laughter"], ["itku", "crying"], ["hymy", "smile"], ["huokaus", "sigh"]
]],
["Household chores & city life", [
  ["pyykki", "laundry"], ["roska", "trash / litter"], ["harja", "brush"], ["luuta", "broom"],
  ["ämpäri", "bucket"], ["pesuaine", "detergent"], ["riita", "argument / quarrel"],
  ["sopu", "harmony / reconciliation"], ["yhteistyö", "cooperation"],
  ["kilpailu", "competition"], ["voitto", "victory"], ["tappio", "defeat"]
]],
["Measurement & science", [
  ["metri", "meter"], ["kilometri", "kilometer"], ["senttimetri", "centimeter"],
  ["kilogramma", "kilogram"], ["gramma", "gram"], ["litra", "liter"], ["aste", "degree"],
  ["lämpötila", "temperature"], ["paino", "weight"], ["pituus", "length / height"],
  ["planeetta", "planet"], ["maapallo", "Earth / globe"], ["galaksi", "galaxy"],
  ["universumi", "universe"], ["atomi", "atom"], ["molekyyli", "molecule"],
  ["solu", "cell (biology)"], ["geeni", "gene"], ["energia", "energy"], ["voima", "force"],
  ["painovoima", "gravity"], ["summa", "sum"], ["erotus", "difference (math)"],
  ["tulos", "result / product"], ["jako", "division"], ["yhtälö", "equation"],
  ["kaava", "formula"]
]],
["Family & relationships (extra)", [
  ["puoliso", "spouse"], ["poikaystävä", "boyfriend"], ["tyttöystävä", "girlfriend"],
  ["avioliitto", "marriage"], ["ero", "divorce / difference"], ["sukulainen", "relative"],
  ["lapsenlapsi", "grandchild"], ["kummi", "godparent"]
]],
["Food (extra)", [
  ["mauste", "spice"], ["öljy", "oil"], ["etikka", "vinegar"], ["kastike", "sauce"],
  ["keksi", "cookie / biscuit"], ["kakku", "cake"], ["suklaa", "chocolate"],
  ["jäätelö", "ice cream"], ["pizza", "pizza"], ["hampurilainen", "hamburger"],
  ["voileipä", "sandwich"], ["pähkinä", "nut"], ["sitruuna", "lemon"],
  ["appelsiini", "orange (fruit)"], ["viinirypäle", "grape"], ["vesimeloni", "watermelon"],
  ["ananas", "pineapple"], ["sipuli", "onion"], ["valkosipuli", "garlic"],
  ["tomaatti", "tomato"], ["kurkku", "cucumber"], ["porkkana", "carrot"],
  ["maissi", "corn"], ["herne", "pea"], ["papu", "bean"]
]],
["Sleep, daily routine & communication", [
  ["uni", "sleep / dream"], ["painajainen", "nightmare"], ["herätyskello", "alarm clock"],
  ["päiväuni", "nap"], ["viesti", "message"], ["sähköposti", "email"],
  ["kirje", "letter (mail)"], ["postikortti", "postcard"], ["puhelu", "phone call"],
  ["keskustelu", "conversation"], ["ilmoitus", "announcement / ad"]
]],
["Music & the arts", [
  ["kitara", "guitar"], ["piano", "piano"], ["rummut", "drums"], ["viulu", "violin"],
  ["huilu", "flute"], ["trumpetti", "trumpet"], ["laulaja", "singer"]
]],
["Geography & nations", [
  ["valtio", "state / nation"], ["pääkaupunki", "capital city"], ["raja", "border"],
  ["kartta", "map"], ["kieli", "language"], ["kansalaisuus", "nationality"],
  ["kansallislippu", "national flag"]
]],
["Home appliances (extra)", [
  ["mikroaaltouuni", "microwave oven"], ["kahvinkeitin", "coffee maker"],
  ["leivänpaahdin", "toaster"], ["hiustenkuivaaja", "hair dryer"],
  ["sähköhammasharja", "electric toothbrush"], ["kaiutin", "speaker"]
]]
];

const cards = [];
let idx = 0;
const seen = new Map();
const dupes = [];
SECTIONS.forEach(([section, pairs]) => {
  pairs.forEach(([fi, en]) => {
    idx += 1;
    const id = 'su-' + String(idx).padStart(3, '0');
    if (seen.has(fi)) dupes.push(fi + ' (first: ' + seen.get(fi) + ', again: ' + id + ')');
    else seen.set(fi, id);
    cards.push({ id, section, fi, en });
  });
});

if (dupes.length) {
  console.log('DUPLICATE Finnish headwords found:');
  dupes.forEach((d) => console.log('  ' + d));
} else {
  console.log('No duplicate Finnish headwords.');
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
  body += `    { id: "${c.id}", front: "${esc(c.fi)}", back: "${esc(c.en)}" },\n`;
});
body = body.replace(/,\n$/, '\n');

const header = `/* Topic: Finnish — 500 Nouns. Concrete and abstract nouns across household,
   nature, animals, professions, places, technology, science, food, and more —
   complements the Popular Words deck, which covers pronouns/verbs/adjectives.
   GENERATED by scripts/gen-finnish-500-nouns.js from a categorized word list —
   edit the SECTIONS array there and re-run rather than hand-editing this file.
   Front = Finnish noun, back = English meaning. */
SRS.registerTopic({
  id: "finnish-500-nouns",
  name: "Finnish: 500 Nouns",
  description: "500 Finnish nouns across household, nature, animals, professions, places, technology, science, food, and more.",
  cards: [
${body}  ]
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'topics', 'finnish-500-nouns.js'), header, 'utf8');
console.log('Wrote generated topic file.');
