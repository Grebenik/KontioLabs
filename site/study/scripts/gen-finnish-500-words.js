/* Builds site/study/topics/finnish-500-words.js from a categorized word list.
   Run: node gen-finnish-500-words.js  (writes the topic file + reports dupes/count) */
'use strict';
const fs = require('fs');
const path = require('path');

/* [finnish, english] pairs, grouped by category (category name becomes a
   comment marker in the generated file so the deck stays readable/editable). */
const SECTIONS = [
["Pronouns & question words", [
  ["minä", "I"], ["sinä", "you (singular)"], ["hän", "he / she"], ["me", "we"],
  ["te", "you (plural / formal)"], ["he", "they"], ["tämä", "this"], ["tuo", "that (over there)"],
  ["se", "it / that"], ["nämä", "these"], ["nuo", "those (over there)"], ["ne", "those / them"],
  ["joku", "someone"], ["jokin", "something"], ["kaikki", "all / everyone / everything"],
  ["joka", "which / who (relative pronoun)"], ["kuka", "who"], ["mikä", "what / which"],
  ["missä", "where"], ["milloin", "when"], ["miksi", "why"], ["miten", "how"],
  ["kuinka", "how (also: how much/many)"], ["kumpi", "which one (of two)"]
]],
["Common verbs", [
  ["olla", "to be"], ["tehdä", "to do / to make"], ["mennä", "to go"], ["tulla", "to come"],
  ["nähdä", "to see"], ["sanoa", "to say"], ["tietää", "to know (a fact)"],
  ["tuntea", "to know (a person) / to feel"], ["haluta", "to want"],
  ["voida", "to be able to / may"], ["pitää", "to like / to have to"],
  ["saada", "to get / to be allowed to"], ["antaa", "to give"], ["ottaa", "to take"],
  ["puhua", "to speak"], ["kysyä", "to ask"], ["vastata", "to answer"],
  ["ajatella", "to think"], ["ymmärtää", "to understand"], ["muistaa", "to remember"],
  ["unohtaa", "to forget"], ["oppia", "to learn"], ["opettaa", "to teach"],
  ["lukea", "to read"], ["kirjoittaa", "to write"], ["syödä", "to eat"],
  ["juoda", "to drink"], ["nukkua", "to sleep"], ["herätä", "to wake up"],
  ["elää", "to live"], ["kuolla", "to die"], ["rakastaa", "to love"],
  ["auttaa", "to help"], ["työskennellä", "to work"], ["ostaa", "to buy"],
  ["myydä", "to sell"], ["maksaa", "to pay / to cost"], ["matkustaa", "to travel"],
  ["ajaa", "to drive"], ["kävellä", "to walk"], ["juosta", "to run"],
  ["istua", "to sit"], ["seistä", "to stand"], ["avata", "to open"],
  ["sulkea", "to close"], ["alkaa", "to begin"], ["lopettaa", "to stop / finish"],
  ["jatkaa", "to continue"], ["odottaa", "to wait"], ["etsiä", "to search / look for"],
  ["löytää", "to find"], ["katsoa", "to look / to watch"], ["kuulla", "to hear"],
  ["näyttää", "to show / to seem"], ["soittaa", "to call (phone) / to play (instrument)"],
  ["lähettää", "to send"], ["vastaanottaa", "to receive"], ["käyttää", "to use"],
  ["tarvita", "to need"], ["valita", "to choose"], ["päättää", "to decide"],
  ["yrittää", "to try"], ["onnistua", "to succeed"], ["epäonnistua", "to fail"],
  ["muuttaa", "to change / to move (residence)"], ["jäädä", "to stay / remain"],
  ["lähteä", "to leave / depart"], ["palata", "to return"], ["nousta", "to rise / get up"],
  ["laskea", "to count / to calculate / to lower"], ["pysähtyä", "to stop (oneself)"],
  ["tavata", "to meet"], ["tuntua", "to feel like / to seem"], ["kuulua", "to belong / to be heard"],
  ["kuunnella", "to listen"], ["katsella", "to watch / look around"], ["leikkiä", "to play (games, kids)"],
  ["pelata", "to play (a sport/game)"], ["laulaa", "to sing"], ["tanssia", "to dance"],
  ["piirtää", "to draw"], ["maalata", "to paint"], ["rakentaa", "to build"],
  ["korjata", "to fix / repair"], ["rikkoa", "to break (something)"], ["pudota", "to fall / to drop"],
  ["heittää", "to throw"], ["kantaa", "to carry"], ["nostaa", "to lift"],
  ["työntää", "to push"], ["vetää", "to pull"], ["laittaa", "to put / to cook"],
  ["valmistaa", "to prepare / to manufacture"], ["siivota", "to clean (tidy)"],
  ["pestä", "to wash"], ["kuivata", "to dry (something)"], ["keittää", "to boil / to cook"],
  ["paistaa", "to fry / to bake / to shine (sun)"], ["leikata", "to cut"], ["ommella", "to sew"],
  ["uida", "to swim"], ["hypätä", "to jump"], ["huomata", "to notice"],
  ["tarkistaa", "to check"], ["varata", "to reserve / to book"], ["tilata", "to order"],
  ["vuokrata", "to rent"], ["lainata", "to borrow / to lend"], ["palauttaa", "to return (give back)"],
  ["säästää", "to save (money)"], ["kuluttaa", "to spend / to consume"], ["ansaita", "to earn"],
  ["omistaa", "to own"], ["harrastaa", "to have as a hobby"], ["matkia", "to imitate"]
]],
["Common adjectives", [
  ["hyvä", "good"], ["huono", "bad"], ["iso", "big"], ["pieni", "small"],
  ["uusi", "new"], ["vanha", "old"], ["nuori", "young"], ["kaunis", "beautiful"],
  ["ruma", "ugly"], ["pitkä", "long / tall"], ["lyhyt", "short"], ["korkea", "high / tall"],
  ["matala", "low"], ["leveä", "wide"], ["kapea", "narrow"], ["nopea", "fast"],
  ["hidas", "slow"], ["kylmä", "cold"], ["kuuma", "hot"], ["lämmin", "warm"],
  ["kova", "hard"], ["pehmeä", "soft"], ["raskas", "heavy"], ["kevyt", "light (weight)"],
  ["kallis", "expensive"], ["halpa", "cheap"], ["helppo", "easy"], ["vaikea", "difficult"],
  ["tärkeä", "important"], ["mielenkiintoinen", "interesting"], ["tylsä", "boring"],
  ["hauska", "fun / funny"], ["surullinen", "sad"], ["iloinen", "happy"],
  ["vihainen", "angry"], ["väsynyt", "tired"], ["terve", "healthy"], ["sairas", "sick"],
  ["puhdas", "clean"], ["likainen", "dirty"], ["täysi", "full"], ["tyhjä", "empty"],
  ["oikea", "right / correct"], ["väärä", "wrong"], ["sama", "same"], ["erilainen", "different"],
  ["mahdollinen", "possible"], ["mahdoton", "impossible"], ["valmis", "ready / finished"],
  ["vapaa", "free"], ["kiireinen", "busy"], ["hiljainen", "quiet"], ["äänekäs", "loud"],
  ["kirkas", "bright / clear"], ["pimeä", "dark"], ["märkä", "wet"], ["kuiva", "dry"],
  ["vahva", "strong"], ["heikko", "weak"], ["rikas", "rich"], ["köyhä", "poor"],
  ["ystävällinen", "friendly / kind"], ["epäystävällinen", "unfriendly"], ["kohtelias", "polite"],
  ["fiksu", "smart / clever"], ["tyhmä", "stupid"],
  ["turvallinen", "safe"], ["vaarallinen", "dangerous"], ["varma", "sure / certain"],
  ["epävarma", "uncertain"], ["todellinen", "real"], ["väärennetty", "fake / counterfeit"],
  ["suosittu", "popular"], ["harvinainen", "rare"], ["tavallinen", "ordinary / common"],
  ["outo", "strange / odd"], ["mukava", "nice / comfortable"], ["epämukava", "uncomfortable"],
  ["yksinkertainen", "simple"], ["monimutkainen", "complicated"], ["makea", "sweet"],
  ["hapan", "sour"]
]],
["Everyday nouns — home, places, people", [
  ["talo", "house"], ["koti", "home"], ["huone", "room"], ["ovi", "door"],
  ["ikkuna", "window"], ["pöytä", "table"], ["tuoli", "chair"], ["sänky", "bed"],
  ["keittiö", "kitchen"], ["kylpyhuone", "bathroom"], ["olohuone", "living room"],
  ["makuuhuone", "bedroom"], ["auto", "car"], ["tie", "road"], ["katu", "street"],
  ["kaupunki", "city / town"], ["maa", "country / land / earth"], ["maailma", "world"],
  ["ihminen", "human / person"], ["mies", "man"], ["nainen", "woman"], ["lapsi", "child"],
  ["perhe", "family"], ["ystävä", "friend"], ["työ", "work / job"], ["koulu", "school"],
  ["raha", "money"], ["aika", "time"], ["päivä", "day"], ["yö", "night"],
  ["viikko", "week"], ["kuukausi", "month"], ["vuosi", "year"], ["vesi", "water"],
  ["ruoka", "food"], ["leipä", "bread"], ["maito", "milk"], ["kahvi", "coffee"],
  ["tee", "tea"], ["ilma", "air"], ["sää", "weather"], ["aurinko", "sun"],
  ["kuu", "moon"], ["tähti", "star"], ["taivas", "sky"], ["meri", "sea"],
  ["järvi", "lake"], ["metsä", "forest"], ["puu", "tree / wood"], ["kukka", "flower"],
  ["eläin", "animal"], ["koira", "dog"], ["kissa", "cat"], ["lintu", "bird"],
  ["kirja", "book"], ["kynä", "pen"], ["paperi", "paper"], ["puhelin", "phone"],
  ["tietokone", "computer"], ["televisio", "television"], ["radio", "radio"],
  ["musiikki", "music"], ["elokuva", "movie"], ["peli", "game"], ["urheilu", "sport"],
  ["matka", "trip / journey"], ["lentokone", "airplane"], ["juna", "train"],
  ["bussi", "bus"], ["laiva", "ship"], ["kauppa", "store / shop"],
  ["ravintola", "restaurant"], ["sairaala", "hospital"], ["yliopisto", "university"],
  ["kirkko", "church"], ["puisto", "park"], ["silta", "bridge"], ["tori", "market square"],
  ["kirjasto", "library"], ["asema", "station"], ["lentokenttä", "airport"],
  ["hotelli", "hotel"], ["toimisto", "office"], ["tehdas", "factory"],
  ["kaupunginosa", "city district / neighborhood"], ["naapurusto", "neighborhood"],
  ["maaseutu", "countryside"], ["saari", "island"], ["vuori", "mountain"],
  ["laakso", "valley"], ["ranta", "shore / beach"], ["joki", "river"],
  ["katto", "roof"], ["seinä", "wall"], ["lattia", "floor"], ["portaat", "stairs"],
  ["piha", "yard"], ["puutarha", "garden"], ["aita", "fence"], ["avain", "key"],
  ["lukko", "lock"], ["valo", "light"], ["lamppu", "lamp"], ["peili", "mirror"],
  ["kello", "clock / watch"], ["laukku", "bag"], ["reppu", "backpack"], ["lompakko", "wallet"]
]],
["Function words — conjunctions, prepositions, adverbs, particles", [
  ["ja", "and"], ["mutta", "but"], ["tai", "or"], ["koska", "because"],
  ["jos", "if"], ["kun", "when / as (conj.)"], ["että", "that (conj.)"],
  ["kuin", "than / as / like"], ["vaikka", "although"], ["kunnes", "until"],
  ["ennen", "before"], ["jälkeen", "after"], ["aikana", "during"], ["ilman", "without"],
  ["kanssa", "with"], ["läpi", "through"], ["ympäri", "around"], ["alla", "under / below"],
  ["päällä", "on top of"], ["sisällä", "inside"], ["ulkona", "outside"],
  ["vieressä", "next to / beside"], ["välissä", "between"], ["takana", "behind"],
  ["edessä", "in front of"], ["lähellä", "near"], ["kaukana", "far away"],
  ["ylös", "up (direction)"], ["alas", "down (direction)"], ["sisään", "in (direction)"],
  ["ulos", "out (direction)"], ["tässä", "here (this spot)"], ["tuossa", "there (that spot)"],
  ["siellä", "there"], ["täällä", "here"], ["tuolla", "over there"], ["nyt", "now"],
  ["silloin", "then / at that time"], ["aina", "always"], ["koskaan", "ever / never"],
  ["joskus", "sometimes"], ["usein", "often"], ["harvoin", "rarely"], ["jo", "already"],
  ["vielä", "still / yet"], ["taas", "again"], ["myös", "also / too"], ["vain", "only"],
  ["kuitenkin", "however / anyway"], ["siis", "so / therefore"], ["esimerkiksi", "for example"],
  ["tietenkin", "of course"], ["ehkä", "maybe"], ["varmasti", "surely / certainly"],
  ["ehkäpä", "perhaps"], ["melkein", "almost"], ["täysin", "completely"], ["vähän", "a little"],
  ["paljon", "a lot / much"], ["liian", "too (excessively)"], ["hyvin", "well / very"],
  ["erittäin", "extremely"], ["ihan", "quite / totally"], ["kai", "probably / I guess"],
  ["ei", "no / not"], ["kyllä", "yes"], ["kiitos", "thank you"], ["ole hyvä", "you're welcome / please"],
  ["anteeksi", "sorry / excuse me"], ["ehdottomasti", "absolutely"]
]],
["Time — days, months, seasons, time of day", [
  ["maanantai", "Monday"], ["tiistai", "Tuesday"], ["keskiviikko", "Wednesday"],
  ["torstai", "Thursday"], ["perjantai", "Friday"], ["lauantai", "Saturday"],
  ["sunnuntai", "Sunday"], ["tammikuu", "January"], ["helmikuu", "February"],
  ["maaliskuu", "March"], ["huhtikuu", "April"], ["toukokuu", "May"], ["kesäkuu", "June"],
  ["heinäkuu", "July"], ["elokuu", "August"], ["syyskuu", "September"], ["lokakuu", "October"],
  ["marraskuu", "November"], ["joulukuu", "December"], ["kevät", "spring"],
  ["kesä", "summer"], ["syksy", "autumn / fall"], ["talvi", "winter"],
  ["tänään", "today"], ["huomenna", "tomorrow"], ["eilen", "yesterday"],
  ["ylihuomenna", "the day after tomorrow"], ["toissapäivänä", "the day before yesterday"],
  ["aamu", "morning"], ["ilta", "evening"], ["keskipäivä", "midday / noon"],
  ["keskiyö", "midnight"], ["hetki", "moment"], ["minuutti", "minute"],
  ["tunti", "hour"], ["sekunti", "second"], ["viikonloppu", "weekend"],
  ["arki", "weekday / everyday life"], ["juhlapyhä", "public holiday"],
  ["ikä", "age"], ["vuosisata", "century"]
]],
["Family & people", [
  ["äiti", "mother"], ["isä", "father"], ["veli", "brother"], ["sisko", "sister"],
  ["poika", "son / boy"], ["tytär", "daughter"], ["vaimo", "wife"], ["mies (aviomies)", "husband"],
  ["isoäiti", "grandmother"], ["isoisä", "grandfather"], ["täti", "aunt"], ["setä", "uncle"],
  ["serkku", "cousin"], ["naapuri", "neighbor"], ["opettaja", "teacher"],
  ["lääkäri", "doctor"], ["sairaanhoitaja", "nurse"], ["poliisi", "police officer"],
  ["myyjä", "salesperson"], ["asiakas", "customer"], ["pomo", "boss"], ["kollega", "colleague"],
  ["oppilas", "student / pupil"], ["insinööri", "engineer"], ["asianajaja", "lawyer"],
  ["kokki", "cook / chef"], ["taiteilija", "artist"], ["kirjailija", "writer / author"],
  ["muusikko", "musician"], ["urheilija", "athlete"]
]],
["Food & drink", [
  ["omena", "apple"], ["banaani", "banana"], ["peruna", "potato"], ["liha", "meat"],
  ["kala", "fish"], ["kana", "chicken"], ["riisi", "rice"], ["pasta", "pasta"],
  ["juusto", "cheese"], ["voi", "butter"], ["sokeri", "sugar"], ["suola", "salt"],
  ["pippuri", "pepper"], ["hedelmä", "fruit"], ["vihannes", "vegetable"], ["marja", "berry"],
  ["mansikka", "strawberry"], ["mustikka", "blueberry"], ["keitto", "soup"],
  ["salaatti", "salad"], ["jälkiruoka", "dessert"], ["aamiainen", "breakfast"],
  ["lounas", "lunch"], ["päivällinen", "dinner (early evening meal)"],
  ["illallinen", "dinner (evening meal)"], ["makkara", "sausage"], ["muna", "egg"],
  ["hunaja", "honey"], ["mehu", "juice"], ["olut", "beer"]
]],
["Body parts", [
  ["pää", "head"], ["silmä", "eye"], ["korva", "ear"], ["nenä", "nose"],
  ["suu", "mouth"], ["käsi", "hand / arm"], ["jalka", "foot / leg"], ["sormi", "finger"],
  ["varvas", "toe"], ["selkä", "back"], ["vatsa", "stomach"], ["sydän", "heart"],
  ["iho", "skin"], ["hiukset", "hair"], ["hammas", "tooth"], ["kaula", "neck"]
]],
["Colors", [
  ["punainen", "red"], ["sininen", "blue"], ["keltainen", "yellow"], ["vihreä", "green"],
  ["musta", "black"], ["valkoinen", "white"], ["harmaa", "gray"], ["ruskea", "brown"],
  ["oranssi", "orange"], ["violetti", "purple"], ["vaaleanpunainen", "pink"]
]],
["Clothing", [
  ["paita", "shirt"], ["housut", "pants"], ["hame", "skirt"], ["mekko", "dress"],
  ["takki", "jacket / coat"], ["kengät", "shoes"], ["sukat", "socks"], ["hattu", "hat"],
  ["käsine", "glove"], ["vyö", "belt"], ["huivi", "scarf"], ["pusero", "blouse"]
]],
["Emotions & abstract concepts", [
  ["rakkaus", "love"], ["viha", "hate / anger"], ["pelko", "fear"], ["onni", "happiness / luck"],
  ["suru", "sadness / grief"], ["toivo", "hope"], ["unelma", "dream (aspiration)"],
  ["totuus", "truth"], ["valhe", "lie"], ["elämä", "life"], ["kuolema", "death"],
  ["vapaus", "freedom"], ["rauha", "peace"], ["sota", "war"], ["usko", "faith / belief"],
  ["epäilys", "doubt"], ["häpeä", "shame"], ["ylpeys", "pride"], ["kateus", "envy"],
  ["kunnia", "honor"]
]]
];

const cards = [];
let idx = 0;
const seen = new Map();
const dupes = [];
SECTIONS.forEach(([section, pairs]) => {
  pairs.forEach(([fi, en]) => {
    idx += 1;
    const id = 'fw-' + String(idx).padStart(3, '0');
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

const header = `/* Topic: Finnish — 500 Popular Words. High-frequency vocabulary across word
   classes (pronouns, verbs, adjectives, everyday nouns, function words, time,
   family, food, body, colors, clothing, emotions) for general fluency.
   GENERATED by scripts/gen-finnish-500-words.js from a categorized word list —
   edit the SECTIONS array there and re-run rather than hand-editing this file.
   Front = Finnish word, back = English meaning. */
SRS.registerTopic({
  id: "finnish-500-words",
  group: "Finnish",
  name: "Finnish: 500 Popular Words",
  description: "The 500 most useful everyday Finnish words — pronouns, verbs, adjectives, nouns, and function words — for building general fluency fast.",
  cards: [
${body}  ]
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'topics', 'finnish-500-words.js'), header, 'utf8');
console.log('Wrote generated topic file.');
