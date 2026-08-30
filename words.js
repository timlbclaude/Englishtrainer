/* ═══════════════════════════════════════════════════════════════
   words.js — DATEN des English Trainers (kein Code!)
   ═══════════════════════════════════════════════════════════════
   Diese Datei wird vom ETA-Bot (.github/scripts/eta_process.py)
   und vom Bild-Resolver (resolve_images.py) automatisch beschrieben.

   Enthält genau drei Konstanten:
   - WORDS        Vokabel-Datenbank (ein Objekt pro Wort)
   - WIKI_TITLES  Wort → Wikipedia-Artikel (Bildquelle für Nomen)
   - IMG_URLS     Wort (kleingeschrieben) → feste Thumbnail-URL

   Die Logik der App liegt in app.js, das Design in styles.css.
   ═══════════════════════════════════════════════════════════════ */

const WORDS = [
  {
    id: 1,
    word: "ambitious",
    translation: "ehrgeizig, ambitioniert",
    pronunciation: "/æmˈbɪʃəs/",
    wordType: "Adjektiv",
    definition: "Having a strong desire and determination to succeed.",
    examples: [
      "She is very ambitious and plans to become a CEO before turning 30.",
      "His ambitious goals inspired everyone on the team."
    ], exampleDE: "Sie ist sehr ehrgeizig und plant, vor ihrem 30. Geburtstag CEO zu werden.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 2,
    word: "resilient",
    translation: "widerstandsfähig, belastbar",
    pronunciation: "/rɪˈzɪliənt/",
    wordType: "Adjektiv",
    definition: "Able to recover quickly from difficulties; tough and flexible.",
    examples: [
      "She is incredibly resilient and bounced back after losing her job within weeks.",
      "The resilient material can withstand extreme temperatures without breaking."
    ], exampleDE: "Sie ist unglaublich widerstandsfähig und hat sich innerhalb von Wochen erholt, nachdem sie ihren Job verloren hatte.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 3,
    word: "Threshold",
    translation: "Schwelle, Grenzwert",
    pronunciation: "/ˈθreʃhoʊld/",
    wordType: "Nomen",
    definition: "The level or point at which something starts or changes; also the strip at the bottom of a doorway.",
    examples: [
      "The threshold for pain varies greatly between individuals.",
      "She stood at the threshold of the doorway, hesitating before stepping inside."
    ], exampleDE: "Die Schmerzschwelle ist von Mensch zu Mensch sehr unterschiedlich.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 4,
    word: "to procrastinate",
    translation: "aufschieben, trödeln",
    pronunciation: "/prəˈkræstɪneɪt/",
    wordType: "Verb",
    definition: "To delay or postpone doing something, especially out of habit or laziness.",
    examples: [
      "I tend to procrastinate when I have difficult tasks to complete.",
      "Stop procrastinating and start working on your project now!"
    ], exampleDE: "Ich neige dazu, Dinge aufzuschieben, wenn ich schwierige Aufgaben zu erledigen habe.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 5,
    word: "Serendipity",
    translation: "glücklicher Zufall, Serendipität",
    pronunciation: "/ˌserənˈdɪpɪti/",
    wordType: "Nomen",
    definition: "The occurrence of events by chance in a happy or beneficial way.",
    examples: [
      "Meeting my best friend at that coffee shop was pure serendipity.",
      "The discovery of penicillin was a remarkable act of serendipity."
    ], exampleDE: "Meinen besten Freund in diesem Café zu treffen, war ein reiner glücklicher Zufall.",
    imageUrl: "",
    difficulty: "C1",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 6,
    word: "to refine",
    translation: "verfeinern, verbessern",
    pronunciation: "/rɪˈfaɪn/",
    wordType: "Verb",
    definition: "To improve something by making small changes; to remove impurities and make something purer or more precise.",
    examples: [
      "We need to refine our strategy before presenting it to the board.",
      "The chef constantly refines his recipes to achieve the perfect balance of flavors."
    ], exampleDE: "Wir müssen unsere Strategie verfeinern, bevor wir sie dem Vorstand präsentieren.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 7,
    word: "inevitable",
    translation: "unvermeidlich, unausweichlich",
    pronunciation: "/ɪˈnevɪtəbl/",
    wordType: "Adjektiv",
    definition: "Certain to happen and impossible to avoid or prevent.",
    examples: [
      "Change is inevitable — you cannot stop progress from happening.",
      "Conflict seemed inevitable as both sides refused to compromise."
    ], exampleDE: "Veränderung ist unvermeidlich – man kann den Fortschritt nicht aufhalten.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 8,
    word: "to struggle",
    translation: "kämpfen, sich abmühen, ringen",
    pronunciation: "/ˈstrʌɡl/",
    wordType: "Verb",
    definition: "To make great efforts to do something difficult; to fight against obstacles or resistance.",
    examples: [
      "She struggled to stay awake during the long, boring meeting.",
      "Many small businesses struggle to survive during their first year."
    ], exampleDE: "Sie kämpfte damit, während der langen, langweiligen Besprechung wach zu bleiben.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 9,
    word: "Breakthrough",
    translation: "Durchbruch",
    pronunciation: "/ˈbreɪkθruː/",
    wordType: "Nomen",
    definition: "A sudden and important development or discovery, especially in science or negotiations.",
    examples: [
      "Scientists made a major breakthrough in cancer research last year.",
      "The peace talks finally led to a breakthrough after weeks of difficult negotiations."
    ], exampleDE: "Wissenschaftler erzielten letztes Jahr einen großen Durchbruch in der Krebsforschung.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-02",
    category: "—"
  },
  {
    id: 10,
    word: "Fridge",
    translation: "Kühlschrank",
    pronunciation: "/frɪdʒ/",
    wordType: "Nomen",
    definition: "A household appliance used to keep food and drinks cold.",
    examples: [
      "Put the milk back in the fridge after you've used it.",
      "The fridge is nearly empty — we need to go shopping."
    ], exampleDE: "Stell die Milch wieder in den Kühlschrank, wenn du sie benutzt hast.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 11,
    word: "Refrigerator",
    translation: "Kühlschrank (formell)",
    pronunciation: "/rɪˈfrɪdʒəreɪtər/",
    wordType: "Nomen",
    definition: "The formal word for a fridge; an electrical appliance that keeps food cold.",
    examples: [
      "The refrigerator in the kitchen has been making a strange noise.",
      "Always store dairy products in the refrigerator to keep them fresh."
    ], exampleDE: "Der Kühlschrank in der Küche macht seit Kurzem ein seltsames Geräusch.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 12,
    word: "Coffee pot",
    translation: "Kaffeekanne",
    pronunciation: "/ˈkɒfi pɒt/",
    wordType: "Nomen",
    definition: "A pot used for brewing or serving coffee.",
    examples: [
      "She filled the coffee pot and switched it on before breakfast.",
      "There's a full coffee pot on the counter — help yourself."
    ], exampleDE: "Sie füllte die Kaffeekanne und schaltete sie vor dem Frühstück ein.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 13,
    word: "Cooker",
    translation: "Herd",
    pronunciation: "/ˈkʊkər/",
    wordType: "Nomen",
    definition: "A large kitchen appliance used for cooking food, consisting of an oven and hob.",
    examples: [
      "The cooker has four hobs and a large oven underneath.",
      "Be careful — the cooker is still hot from making dinner."
    ], exampleDE: "Der Herd hat vier Kochplatten und einen großen Backofen darunter.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 14,
    word: "Dishwasher",
    translation: "Spülmaschine",
    pronunciation: "/ˈdɪʃwɒʃər/",
    wordType: "Nomen",
    definition: "An electrical machine that washes dishes, glasses and cutlery automatically.",
    examples: [
      "Stack the dirty plates in the dishwasher after the meal.",
      "The dishwasher saves a lot of time compared to washing up by hand."
    ], exampleDE: "Stapel die schmutzigen Teller nach dem Essen in die Spülmaschine.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 15,
    word: "Freezer",
    translation: "Gefrierschrank, Tiefkühltruhe",
    pronunciation: "/ˈfriːzər/",
    wordType: "Nomen",
    definition: "An appliance that stores food at a temperature below freezing.",
    examples: [
      "I keep a bag of frozen peas in the freezer for emergencies.",
      "Take the chicken out of the freezer the night before to defrost it."
    ], exampleDE: "Ich habe für den Notfall immer eine Tüte tiefgefrorene Erbsen im Gefrierschrank.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 16,
    word: "Kettle",
    translation: "Wasserkocher",
    pronunciation: "/ˈketl/",
    wordType: "Nomen",
    definition: "An appliance used to boil water quickly, typically for making tea or coffee.",
    examples: [
      "Put the kettle on — I'll make us both a cup of tea.",
      "The kettle boiled in under two minutes."
    ], exampleDE: "Setz den Wasserkocher auf – ich mache uns beiden eine Tasse Tee.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 17,
    word: "Oven",
    translation: "Backofen, Ofen",
    pronunciation: "/ˈʌvən/",
    wordType: "Nomen",
    definition: "An enclosed compartment used for baking, roasting or heating food.",
    examples: [
      "Preheat the oven to 200°C before putting the bread in.",
      "The pizza came out of the oven perfectly golden and crispy."
    ], exampleDE: "Heize den Backofen auf 200 °C vor, bevor du das Brot hineingibst.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 18,
    word: "Stove",
    translation: "Herd, Kochstelle",
    pronunciation: "/stəʊv/",
    wordType: "Nomen",
    definition: "A cooking appliance with burners or hotplates on top; mainly used in American English.",
    examples: [
      "She stood at the stove stirring the soup carefully.",
      "Turn off the stove when you leave the kitchen."
    ], exampleDE: "Sie stand am Herd und rührte vorsichtig die Suppe um.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 19,
    word: "Toaster",
    translation: "Toaster",
    pronunciation: "/ˈtəʊstər/",
    wordType: "Nomen",
    definition: "A small electrical appliance used to toast bread.",
    examples: [
      "I put two slices of bread in the toaster for breakfast.",
      "The toaster is broken — the bread just stays pale no matter what."
    ], exampleDE: "Ich habe zwei Scheiben Brot zum Frühstück in den Toaster gesteckt.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 20,
    word: "Washing machine",
    translation: "Waschmaschine",
    pronunciation: "/ˈwɒʃɪŋ məˈʃiːn/",
    wordType: "Nomen",
    definition: "An electrical machine used to wash clothes and textiles.",
    examples: [
      "I put a full load of clothes into the washing machine.",
      "The washing machine takes about an hour per cycle."
    ], exampleDE: "Ich habe eine volle Ladung Wäsche in die Waschmaschine gegeben.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 21,
    word: "Grill",
    translation: "Grill, Grillrost",
    pronunciation: "/ɡrɪl/",
    wordType: "Nomen",
    definition: "A device used for cooking food over high heat; in British English also the overhead heating element inside an oven.",
    examples: [
      "Cook the sausages under the grill for ten minutes.",
      "We set up the grill in the garden and barbecued all afternoon."
    ], exampleDE: "Brate die Würstchen zehn Minuten lang unter dem Grill.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 22,
    word: "Bottle opener",
    translation: "Flaschenöffner",
    pronunciation: "/ˈbɒtl ˌəʊpənər/",
    wordType: "Nomen",
    definition: "A small tool used to remove the cap from a bottle.",
    examples: [
      "Use the bottle opener on the fridge door to open your beer.",
      "I can't find the bottle opener — has anyone seen it?"
    ], exampleDE: "Benutz den Flaschenöffner an der Kühlschranktür, um dein Bier zu öffnen.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 23,
    word: "Chopping board",
    translation: "Schneidebrett",
    pronunciation: "/ˈtʃɒpɪŋ bɔːd/",
    wordType: "Nomen",
    definition: "A flat board used as a surface for cutting food.",
    examples: [
      "Always use a chopping board to protect the counter when cutting vegetables.",
      "We have separate chopping boards for meat and vegetables."
    ], exampleDE: "Benutze beim Schneiden von Gemüse immer ein Schneidebrett, um die Arbeitsfläche zu schützen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 24,
    word: "Colander",
    translation: "Nudelsieb, Abtropfsieb",
    pronunciation: "/ˈkɒləndər/",
    wordType: "Nomen",
    definition: "A bowl-shaped kitchen utensil with holes, used to drain water from cooked food.",
    examples: [
      "Pour the cooked pasta into the colander to drain off the water.",
      "Rinse the salad leaves in the colander under cold running water."
    ], exampleDE: "Gib die gekochten Nudeln in das Sieb, um das Wasser abtropfen zu lassen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 25,
    word: "Corkscrew",
    translation: "Korkenzieher",
    pronunciation: "/ˈkɔːkskruː/",
    wordType: "Nomen",
    definition: "A tool with a spiral metal rod used for pulling corks out of bottles.",
    examples: [
      "Do you have a corkscrew? I'd like to open this bottle of wine.",
      "He twisted the corkscrew and pulled out the cork with a gentle pop."
    ], exampleDE: "Hast du einen Korkenzieher? Ich würde gern diese Flasche Wein öffnen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 26,
    word: "Frying pan",
    translation: "Bratpfanne",
    pronunciation: "/ˈfraɪɪŋ pæn/",
    wordType: "Nomen",
    definition: "A flat-bottomed pan with a long handle, used for frying food.",
    examples: [
      "Heat a little oil in the frying pan before adding the onions.",
      "She scrambled the eggs in a non-stick frying pan."
    ], exampleDE: "Erhitze etwas Öl in der Bratpfanne, bevor du die Zwiebeln hinzugibst.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 27,
    word: "Grater",
    translation: "Reibe, Raspel",
    pronunciation: "/ˈɡreɪtər/",
    wordType: "Nomen",
    definition: "A kitchen tool with a rough surface used to shred food into small pieces.",
    examples: [
      "Use the grater to grate the carrot finely for the salad.",
      "Be careful with the grater — the edges are very sharp."
    ], exampleDE: "Benutz die Reibe, um die Karotte für den Salat fein zu reiben.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 28,
    word: "Cheese grater",
    translation: "Käsereibe",
    pronunciation: "/tʃiːz ˈɡreɪtər/",
    wordType: "Nomen",
    definition: "A grater specifically designed for grating cheese.",
    examples: [
      "Grate some Parmesan over the pasta with the cheese grater.",
      "The cheese grater has four different sides for different textures."
    ], exampleDE: "Reibe mit der Käsereibe etwas Parmesan über die Nudeln.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 29,
    word: "Juicer",
    translation: "Entsafter, Saftpresse",
    pronunciation: "/ˈdʒuːsər/",
    wordType: "Nomen",
    definition: "An appliance or tool used to extract juice from fruits or vegetables.",
    examples: [
      "She uses an electric juicer every morning to make fresh orange juice.",
      "A manual juicer is fine for lemons, but an electric one is better for larger quantities."
    ], exampleDE: "Sie benutzt jeden Morgen einen elektrischen Entsafter, um frischen Orangensaft zu machen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 30,
    word: "Kitchen foil",
    translation: "Alufolie, Aluminiumfolie",
    pronunciation: "/ˈkɪtʃɪn fɔɪl/",
    wordType: "Nomen",
    definition: "Thin aluminium sheet used for wrapping food or covering dishes in the oven.",
    examples: [
      "Cover the roast with kitchen foil for the first hour of cooking.",
      "Wrap the leftover bread in kitchen foil to keep it fresh."
    ], exampleDE: "Bedecke den Braten in der ersten Stunde des Garens mit Alufolie.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 31,
    word: "Kitchen scales",
    translation: "Küchenwaage",
    pronunciation: "/ˈkɪtʃɪn skeɪlz/",
    wordType: "Nomen",
    definition: "A device used to weigh ingredients accurately when cooking or baking.",
    examples: [
      "You need kitchen scales to measure out the flour precisely.",
      "The recipe calls for 250g of sugar, so check the kitchen scales carefully."
    ], exampleDE: "Du brauchst eine Küchenwaage, um das Mehl genau abzuwiegen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 32,
    word: "Ladle",
    translation: "Schöpfkelle, Suppenkelle",
    pronunciation: "/ˈleɪdl/",
    wordType: "Nomen",
    definition: "A large, deep spoon with a long handle, used for serving soups or stews.",
    examples: [
      "She used a ladle to serve the soup into each bowl.",
      "Give the stew a good stir with the ladle before serving."
    ], exampleDE: "Sie benutzte eine Schöpfkelle, um die Suppe in jede Schüssel zu füllen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 33,
    word: "Mixing bowl",
    translation: "Rührschüssel",
    pronunciation: "/ˈmɪksɪŋ bəʊl/",
    wordType: "Nomen",
    definition: "A large bowl used for mixing ingredients when cooking or baking.",
    examples: [
      "Combine the flour, eggs and milk in a large mixing bowl.",
      "She whisked the cream in a chilled mixing bowl until it was stiff."
    ], exampleDE: "Vermische Mehl, Eier und Milch in einer großen Rührschüssel.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 34,
    word: "Oven cloth",
    translation: "Ofentuch, Topflappen",
    pronunciation: "/ˈʌvən klɒθ/",
    wordType: "Nomen",
    definition: "A thick cloth used to protect hands when handling hot dishes from the oven.",
    examples: [
      "Use the oven cloth when taking the casserole dish out of the oven.",
      "The oven cloth was scorched from years of heavy use."
    ], exampleDE: "Benutz das Ofentuch, wenn du die Auflaufform aus dem Ofen nimmst.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 35,
    word: "Oven gloves",
    translation: "Ofenhandschuhe",
    pronunciation: "/ˈʌvən ɡlʌvz/",
    wordType: "Nomen",
    definition: "Thick, heat-resistant gloves worn to protect hands and wrists when handling hot pans or dishes.",
    examples: [
      "Always put on the oven gloves before reaching into a hot oven.",
      "She grabbed the baking tray with her oven gloves and set it on the counter."
    ], exampleDE: "Zieh immer die Ofenhandschuhe an, bevor du in einen heißen Ofen greifst.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 36,
    word: "Rolling pin",
    translation: "Nudelholz, Teigrolle",
    pronunciation: "/ˈrəʊlɪŋ pɪn/",
    wordType: "Nomen",
    definition: "A cylindrical tool used to flatten dough when baking.",
    examples: [
      "Roll out the pastry with a rolling pin until it's about 3mm thick.",
      "Dust the rolling pin with flour to stop the dough from sticking."
    ], exampleDE: "Roll den Teig mit einem Nudelholz aus, bis er etwa 3 mm dick ist.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 37,
    word: "Saucepan",
    translation: "Kochtopf, Stieltopf",
    pronunciation: "/ˈsɔːspən/",
    wordType: "Nomen",
    definition: "A deep cooking pot with a handle and usually a lid, used on the hob.",
    examples: [
      "Bring the water to the boil in a large saucepan.",
      "She melted the butter in a small saucepan over low heat."
    ], exampleDE: "Bring das Wasser in einem großen Kochtopf zum Kochen.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 38,
    word: "Scouring pad",
    translation: "Scheuerschwamm, Topfreiniger",
    pronunciation: "/ˈskaʊərɪŋ pæd/",
    wordType: "Nomen",
    definition: "A rough pad used for scrubbing pots, pans and surfaces to remove stubborn dirt.",
    examples: [
      "You'll need a scouring pad to get that burnt food off the pan.",
      "Don't use a scouring pad on non-stick surfaces — it will scratch them."
    ], exampleDE: "Du brauchst einen Scheuerschwamm, um das angebrannte Essen von der Pfanne zu bekommen.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 39,
    word: "Scourer",
    translation: "Scheuerschwamm",
    pronunciation: "/ˈskaʊərər/",
    wordType: "Nomen",
    definition: "A rough pad or ball of wire used to scrub pots and pans clean.",
    examples: [
      "The scourer removed the burnt residue from the bottom of the pan.",
      "A steel scourer is perfect for cast iron pans but too harsh for coated ones."
    ], exampleDE: "Der Scheuerschwamm entfernte die angebrannten Reste vom Boden der Pfanne.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 40,
    word: "Sieve",
    translation: "Sieb",
    pronunciation: "/sɪv/",
    wordType: "Nomen",
    definition: "A utensil with a mesh bottom used to separate fine particles from coarser ones, or to drain liquids.",
    examples: [
      "Sift the flour through a sieve to remove any lumps before baking.",
      "He rinsed the rice through a fine sieve under cold water."
    ], exampleDE: "Siebe das Mehl durch ein Sieb, um vor dem Backen alle Klümpchen zu entfernen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 41,
    word: "Tin opener",
    translation: "Dosenöffner",
    pronunciation: "/tɪn ˈəʊpənər/",
    wordType: "Nomen",
    definition: "A tool used to open metal cans or tins of food.",
    examples: [
      "I need the tin opener to open this can of tomatoes.",
      "The electric tin opener makes it much easier to open large cans."
    ], exampleDE: "Ich brauche den Dosenöffner, um diese Dose Tomaten zu öffnen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 42,
    word: "Tongs",
    translation: "Zange, Grillzange",
    pronunciation: "/tɒŋz/",
    wordType: "Nomen",
    definition: "A tool with two arms joined at one end, used to grip and lift food.",
    examples: [
      "Use the tongs to turn the steaks on the grill.",
      "She picked up the salad with tongs and placed it neatly on the plate."
    ], exampleDE: "Benutz die Zange, um die Steaks auf dem Grill zu wenden.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 43,
    word: "Tray",
    translation: "Tablett",
    pronunciation: "/treɪ/",
    wordType: "Nomen",
    definition: "A flat, shallow container used for carrying food and drinks or baking.",
    examples: [
      "She carried the mugs of coffee through on a tray.",
      "Line the baking tray with greaseproof paper before putting the biscuits on it."
    ], exampleDE: "Sie trug die Tassen Kaffee auf einem Tablett herein.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 44,
    word: "Whisk",
    translation: "Schneebesen",
    pronunciation: "/wɪsk/",
    wordType: "Nomen",
    definition: "A kitchen tool with loops of wire used for beating or mixing ingredients.",
    examples: [
      "Whisk the eggs until they are light and frothy.",
      "Use a hand whisk or an electric mixer to beat the cream."
    ], exampleDE: "Schlage die Eier, bis sie locker und schaumig sind.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 45,
    word: "Wooden spoon",
    translation: "Holzlöffel",
    pronunciation: "/ˌwʊdən ˈspuːn/",
    wordType: "Nomen",
    definition: "A large spoon made of wood, used for stirring food while cooking.",
    examples: [
      "Stir the sauce slowly with a wooden spoon to prevent it from burning.",
      "A wooden spoon won't scratch non-stick pans, unlike metal ones."
    ], exampleDE: "Rühre die Soße langsam mit einem Holzlöffel um, damit sie nicht anbrennt.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 46,
    word: "Knife",
    translation: "Messer",
    pronunciation: "/naɪf/",
    wordType: "Nomen",
    definition: "A blade with a handle used for cutting food.",
    examples: [
      "Use a sharp knife to cut the vegetables into even pieces.",
      "Always keep your knives clean and store them safely."
    ], exampleDE: "Benutz ein scharfes Messer, um das Gemüse in gleichmäßige Stücke zu schneiden.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 47,
    word: "Fork",
    translation: "Gabel",
    pronunciation: "/fɔːk/",
    wordType: "Nomen",
    definition: "A utensil with prongs used for picking up food.",
    examples: [
      "She twirled the spaghetti around her fork.",
      "Set a knife and fork on each side of the plate."
    ], exampleDE: "Sie drehte die Spaghetti um ihre Gabel.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 48,
    word: "Spoon",
    translation: "Löffel",
    pronunciation: "/spuːn/",
    wordType: "Nomen",
    definition: "A utensil with a round bowl and a handle, used for eating or stirring.",
    examples: [
      "Stir your coffee with a spoon to dissolve the sugar.",
      "He ate the soup slowly with a large spoon."
    ], exampleDE: "Rühre deinen Kaffee mit einem Löffel um, damit sich der Zucker auflöst.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 49,
    word: "Dessert spoon",
    translation: "Dessertlöffel",
    pronunciation: "/dɪˈzɜːt spuːn/",
    wordType: "Nomen",
    definition: "A medium-sized spoon, larger than a teaspoon but smaller than a tablespoon, used for eating dessert.",
    examples: [
      "She ate the mousse with a small dessert spoon.",
      "A dessert spoon holds about 10ml — halfway between a teaspoon and tablespoon."
    ], exampleDE: "Sie aß die Mousse mit einem kleinen Dessertlöffel.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 50,
    word: "Soup spoon",
    translation: "Suppenlöffel",
    pronunciation: "/suːp spuːn/",
    wordType: "Nomen",
    definition: "A large, round spoon used for eating soup.",
    examples: [
      "The soup spoon is placed to the right of the other cutlery.",
      "He dipped his soup spoon into the bowl carefully to avoid spilling."
    ], exampleDE: "Der Suppenlöffel wird rechts neben das übrige Besteck gelegt.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 51,
    word: "Tablespoon",
    translation: "Esslöffel",
    pronunciation: "/ˈteɪblspuːn/",
    wordType: "Nomen",
    definition: "A large spoon used for serving food or as a unit of measurement in cooking (approx. 15ml).",
    examples: [
      "Add two tablespoons of olive oil to the pan.",
      "The recipe says one tablespoon of soy sauce — don't add more."
    ], exampleDE: "Gib zwei Esslöffel Olivenöl in die Pfanne.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 52,
    word: "Teaspoon",
    translation: "Teelöffel",
    pronunciation: "/ˈtiːspuːn/",
    wordType: "Nomen",
    definition: "A small spoon used for stirring tea or coffee, or as a unit of measurement (approx. 5ml).",
    examples: [
      "Add half a teaspoon of salt to the dough.",
      "She stirred her tea with a teaspoon before taking a sip."
    ], exampleDE: "Gib einen halben Teelöffel Salz in den Teig.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 53,
    word: "Carving knife",
    translation: "Tranchiermesser",
    pronunciation: "/ˈkɑːvɪŋ naɪf/",
    wordType: "Nomen",
    definition: "A long, sharp knife used for slicing cooked meat.",
    examples: [
      "He used the carving knife to slice the roast chicken at the table.",
      "A sharp carving knife makes cutting large joints of meat much easier."
    ], exampleDE: "Er benutzte das Tranchiermesser, um das Brathähnchen am Tisch zu zerteilen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 54,
    word: "Chopsticks",
    translation: "Essstäbchen",
    pronunciation: "/ˈtʃɒpstɪks/",
    wordType: "Nomen",
    definition: "A pair of thin sticks used as eating utensils, common in East Asian cuisine.",
    examples: [
      "She learned to eat sushi with chopsticks during her trip to Japan.",
      "It takes some practice to pick up food with chopsticks."
    ], exampleDE: "Sie lernte auf ihrer Japanreise, Sushi mit Stäbchen zu essen.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 55,
    word: "Cup",
    translation: "Tasse",
    pronunciation: "/kʌp/",
    wordType: "Nomen",
    definition: "A small container with a handle, used for drinking hot beverages.",
    examples: [
      "She made herself a cup of tea and sat down by the window.",
      "Could you pass me a clean cup from the cupboard, please?"
    ], exampleDE: "Sie machte sich eine Tasse Tee und setzte sich ans Fenster.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 56,
    word: "Bowl",
    translation: "Schüssel, Schale",
    pronunciation: "/bəʊl/",
    wordType: "Nomen",
    definition: "A round, deep dish used for serving or eating food, especially soups or cereals.",
    examples: [
      "She poured the cereal into a bowl and added some milk.",
      "He filled a large bowl with fresh salad leaves."
    ], exampleDE: "Sie schüttete die Cornflakes in eine Schüssel und gab etwas Milch dazu.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 57,
    word: "Crockery",
    translation: "Geschirr (Sammelbegriff)",
    pronunciation: "/ˈkrɒkəri/",
    wordType: "Nomen",
    definition: "Plates, bowls, cups and other ceramic dishes used for eating and serving food (collective noun).",
    examples: [
      "We bought a new set of crockery for the dining room.",
      "All the crockery is in the dishwasher — we'll need to wait before setting the table."
    ], exampleDE: "Wir haben ein neues Geschirr-Set für das Esszimmer gekauft.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 58,
    word: "Glass",
    translation: "Glas (Trinkglas)",
    pronunciation: "/ɡlɑːs/",
    wordType: "Nomen",
    definition: "A container made of glass, used for drinking cold beverages.",
    examples: [
      "He poured the orange juice into a tall glass.",
      "There's a glass of water on the bedside table for you."
    ], exampleDE: "Er goss den Orangensaft in ein hohes Glas.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 59,
    word: "Jar",
    translation: "Einmachglas, Marmeladenglas",
    pronunciation: "/dʒɑːr/",
    wordType: "Nomen",
    definition: "A glass container with a wide mouth and a lid, used for storing food such as jam or pickles.",
    examples: [
      "She opened a new jar of peanut butter.",
      "There's a jar of strawberry jam in the cupboard."
    ], exampleDE: "Sie öffnete ein neues Glas Erdnussbutter.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 60,
    word: "Jug",
    translation: "Krug, Karaffe",
    pronunciation: "/dʒʌɡ/",
    wordType: "Nomen",
    definition: "A container with a handle and a lip, used for pouring liquids.",
    examples: [
      "She brought a jug of cold water to the table.",
      "He poured the lemonade from a large jug into everyone's glasses."
    ], exampleDE: "Sie brachte einen Krug kaltes Wasser an den Tisch.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 61,
    word: "Mug",
    translation: "Becher, Kaffeebecher",
    pronunciation: "/mʌɡ/",
    wordType: "Nomen",
    definition: "A large cup without a saucer, typically used for hot drinks.",
    examples: [
      "He wrapped both hands around his mug of hot chocolate.",
      "I always drink my morning coffee from my favourite blue mug."
    ], exampleDE: "Er umfasste seine Tasse heiße Schokolade mit beiden Händen.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 62,
    word: "Plate",
    translation: "Teller",
    pronunciation: "/pleɪt/",
    wordType: "Nomen",
    definition: "A flat dish used for serving or eating food.",
    examples: [
      "She placed a warm plate in front of each guest.",
      "Pile the pasta high on the plate and add some grated cheese on top."
    ], exampleDE: "Sie stellte jedem Gast einen warmen Teller hin.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 63,
    word: "Saucer",
    translation: "Untertasse",
    pronunciation: "/ˈsɔːsər/",
    wordType: "Nomen",
    definition: "A small, shallow dish on which a cup is placed.",
    examples: [
      "She set the teacup back carefully on its saucer.",
      "The saucer caught the drips from the overfilled cup."
    ], exampleDE: "Sie stellte die Teetasse vorsichtig zurück auf ihre Untertasse.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 64,
    word: "Sugar bowl",
    translation: "Zuckerdose",
    pronunciation: "/ˈʃʊɡər bəʊl/",
    wordType: "Nomen",
    definition: "A small bowl used to hold sugar, often placed on the table at mealtimes.",
    examples: [
      "Could you pass the sugar bowl? I'd like one spoonful.",
      "The sugar bowl is on the table next to the teapot."
    ], exampleDE: "Könntest du mir die Zuckerdose reichen? Ich möchte einen Löffel.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 65,
    word: "Teapot",
    translation: "Teekanne",
    pronunciation: "/ˈtiːpɒt/",
    wordType: "Nomen",
    definition: "A pot with a spout and handle used for brewing and pouring tea.",
    examples: [
      "She let the tea steep in the teapot for five minutes before pouring.",
      "Would you like another cup? There's plenty left in the teapot."
    ], exampleDE: "Sie ließ den Tee fünf Minuten in der Teekanne ziehen, bevor sie ihn eingoss.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 66,
    word: "Wine glass",
    translation: "Weinglas",
    pronunciation: "/waɪn ɡlɑːs/",
    wordType: "Nomen",
    definition: "A glass with a stem and a wide bowl, designed for drinking wine.",
    examples: [
      "He poured the red wine into a large wine glass.",
      "Polish the wine glasses before the guests arrive so they shine."
    ], exampleDE: "Er goss den Rotwein in ein großes Weinglas.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 67,
    word: "Bin",
    translation: "Mülleimer, Abfalleimer",
    pronunciation: "/bɪn/",
    wordType: "Nomen",
    definition: "A container used for throwing away rubbish or food waste.",
    examples: [
      "Scrape the leftovers into the bin and rinse the plate.",
      "Don't forget to take the bin out — it's collection day tomorrow."
    ], exampleDE: "Kratz die Reste in den Mülleimer und spül den Teller ab.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 68,
    word: "Cling film",
    translation: "Frischhaltefolie",
    pronunciation: "/klɪŋ fɪlm/",
    wordType: "Nomen",
    definition: "Thin transparent plastic used to wrap and seal food to keep it fresh.",
    examples: [
      "Cover the bowl with cling film and put it in the fridge overnight.",
      "Wrap the leftover cheese tightly in cling film to stop it drying out."
    ], exampleDE: "Decke die Schüssel mit Frischhaltefolie ab und stell sie über Nacht in den Kühlschrank.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 69,
    word: "Plastic wrap",
    translation: "Frischhaltefolie",
    pronunciation: "/ˈplæstɪk ræp/",
    wordType: "Nomen",
    definition: "Thin transparent plastic used to seal food and keep it fresh; the American term for cling film.",
    examples: [
      "Cover the salad with plastic wrap before putting it in the fridge.",
      "Stretch a layer of plastic wrap over the bowl to keep it airtight."
    ], exampleDE: "Decke den Salat mit Frischhaltefolie ab, bevor du ihn in den Kühlschrank stellst.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 70,
    word: "Cookery book",
    translation: "Kochbuch",
    pronunciation: "/ˈkʊkəri bʊk/",
    wordType: "Nomen",
    definition: "A book containing recipes and instructions for preparing food.",
    examples: [
      "She followed the recipe step by step from her favourite cookery book.",
      "He bought a new cookery book about Italian cuisine as a birthday gift."
    ], exampleDE: "Sie folgte dem Rezept Schritt für Schritt aus ihrem Lieblingskochbuch.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 71,
    word: "Dishcloth",
    translation: "Spüllappen, Spültuch",
    pronunciation: "/ˈdɪʃklɒθ/",
    wordType: "Nomen",
    definition: "A cloth used for washing dishes or wiping kitchen surfaces.",
    examples: [
      "Wipe the counter down with a damp dishcloth after cooking.",
      "Replace the dishcloth regularly to prevent bacteria from building up."
    ], exampleDE: "Wisch die Arbeitsfläche nach dem Kochen mit einem feuchten Spültuch ab.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 72,
    word: "Draining board",
    translation: "Abtropfbrett, Abtropffläche",
    pronunciation: "/ˈdreɪnɪŋ bɔːd/",
    wordType: "Nomen",
    definition: "A grooved board or surface next to a sink where washed dishes are left to dry.",
    examples: [
      "Stack the clean dishes on the draining board to dry.",
      "The draining board was full of pots and pans from last night's cooking."
    ], exampleDE: "Stapel das saubere Geschirr zum Trocknen auf dem Abtropfbrett.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 73,
    word: "Kitchen roll",
    translation: "Küchenrolle, Küchenpapier",
    pronunciation: "/ˈkɪtʃɪn rəʊl/",
    wordType: "Nomen",
    definition: "A roll of absorbent paper used for cleaning surfaces and drying hands in the kitchen.",
    examples: [
      "Tear off a sheet of kitchen roll to wipe up the spill.",
      "Always keep a roll of kitchen roll handy when cooking messy dishes."
    ], exampleDE: "Reiß ein Blatt Küchenrolle ab, um das Verschüttete aufzuwischen.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 74,
    word: "Plug",
    translation: "Stöpsel (Abfluss), Stecker (Elektro)",
    pronunciation: "/plʌɡ/",
    wordType: "Nomen",
    definition: "A stopper used to block a drain in a sink or bath; also an electrical connector.",
    examples: [
      "Put the plug in the sink before filling it to wash the dishes.",
      "The sink plug is stuck — could you try to pull it out?"
    ], exampleDE: "Steck den Stöpsel ins Waschbecken, bevor du es zum Abwaschen füllst.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 75,
    word: "Tea towel",
    translation: "Geschirrtuch",
    pronunciation: "/tiː ˈtaʊəl/",
    wordType: "Nomen",
    definition: "A cloth used for drying dishes, glasses and cutlery after washing.",
    examples: [
      "Dry the glasses with a clean tea towel so they don't get watermarks.",
      "Hang the wet tea towel over the oven handle to let it dry."
    ], exampleDE: "Trockne die Gläser mit einem sauberen Geschirrtuch ab, damit sie keine Wasserflecken bekommen.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 76,
    word: "Shelf",
    translation: "Regal, Ablage",
    pronunciation: "/ʃelf/",
    wordType: "Nomen",
    definition: "A flat board fixed to a wall or inside a cupboard, used to store things.",
    examples: [
      "The spices are on the shelf above the cooker.",
      "She added an extra shelf to the kitchen cupboard to create more storage."
    ], exampleDE: "Die Gewürze stehen auf dem Regal über dem Herd.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 77,
    word: "Sink",
    translation: "Spüle, Spülbecken",
    pronunciation: "/sɪŋk/",
    wordType: "Nomen",
    definition: "A fixed basin in the kitchen connected to a water supply, used for washing up.",
    examples: [
      "Fill the sink with hot soapy water to wash the dishes.",
      "Leave the dirty pots in the sink and I'll wash them later."
    ], exampleDE: "Fülle das Spülbecken mit heißem Seifenwasser, um das Geschirr zu spülen.",
    imageUrl: "",
    difficulty: "A1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 78,
    word: "Tablecloth",
    translation: "Tischdecke",
    pronunciation: "/ˈteɪblklɒθ/",
    wordType: "Nomen",
    definition: "A cloth used to cover a table, especially during meals.",
    examples: [
      "She spread a clean white tablecloth over the dining table.",
      "The tablecloth is covered in wine stains — it needs a good wash."
    ], exampleDE: "Sie breitete eine saubere weiße Tischdecke über den Esstisch.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 79,
    word: "Washing-up liquid",
    translation: "Spülmittel",
    pronunciation: "/ˈwɒʃɪŋ ʌp ˈlɪkwɪd/",
    wordType: "Nomen",
    definition: "A liquid soap used for washing dishes by hand.",
    examples: [
      "Squirt a little washing-up liquid onto the sponge before scrubbing the pans.",
      "We've run out of washing-up liquid — could you pick some up at the shops?"
    ], exampleDE: "Gib etwas Spülmittel auf den Schwamm, bevor du die Töpfe schrubbst.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 80,
    word: "to do the dishes",
    translation: "das Geschirr spülen / abwaschen",
    pronunciation: "/tuː duː ðə ˈdɪʃɪz/",
    wordType: "Verb",
    definition: "To wash the plates, pots and cutlery after a meal.",
    examples: [
      "Who's going to do the dishes tonight? It's your turn.",
      "She did the dishes while her husband put the children to bed."
    ], exampleDE: "Wer spült heute Abend ab? Du bist dran.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 81,
    word: "to do the washing up",
    translation: "das Geschirr spülen",
    pronunciation: "/tuː duː ðə ˈwɒʃɪŋ ʌp/",
    wordType: "Verb",
    definition: "To wash all the used dishes, glasses and cutlery after a meal; British expression.",
    examples: [
      "I'll do the washing up if you put the leftovers away.",
      "He hates doing the washing up and wishes they had a dishwasher."
    ], exampleDE: "Ich spüle ab, wenn du die Reste wegräumst.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 82,
    word: "to clear the table",
    translation: "den Tisch abräumen",
    pronunciation: "/tuː klɪər ðə ˈteɪbl/",
    wordType: "Verb",
    definition: "To remove all the dishes, glasses and items from the table after a meal.",
    examples: [
      "Could you clear the table while I bring out the dessert?",
      "The children helped to clear the table after Sunday lunch."
    ], exampleDE: "Könntest du den Tisch abräumen, während ich den Nachtisch bringe?",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 83,
    word: "to set the table",
    translation: "den Tisch decken",
    pronunciation: "/tuː set ðə ˈteɪbl/",
    wordType: "Verb",
    definition: "To arrange plates, cutlery and glasses on the table before a meal.",
    examples: [
      "Can you set the table? Dinner will be ready in five minutes.",
      "She set the table with the best crockery for the dinner guests."
    ], exampleDE: "Kannst du den Tisch decken? Das Essen ist in fünf Minuten fertig.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 84,
    word: "to lay the table",
    translation: "den Tisch decken",
    pronunciation: "/tuː leɪ ðə ˈteɪbl/",
    wordType: "Verb",
    definition: "To arrange plates, cutlery and glasses on the table ready for a meal; slightly more formal than 'to set the table'.",
    examples: [
      "Would you mind laying the table while I finish cooking?",
      "He carefully laid the table with the good cutlery and linen napkins."
    ], exampleDE: "Würdest du den Tisch decken, während ich mit dem Kochen fertig werde?",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-04-03",
    category: "Kitchen/Cooking"
  },
  {
    id: 85,
    word: "significant",
    translation: "bedeutsam, wesentlich",
    pronunciation: "/sɪɡˈnɪfɪkənt/",
    wordType: "Adjektiv",
    definition: "Important or large enough to have a noticeable effect.",
    examples: [
      "The new policy had a significant impact on employee satisfaction.",
      "There is a significant difference between the two proposals."
    ], exampleDE: "Die neue Richtlinie hatte erhebliche Auswirkungen auf die Mitarbeiterzufriedenheit.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 86,
    word: "subtle",
    translation: "subtil, fein, kaum merklich",
    pronunciation: "/ˈsʌtl/",
    wordType: "Adjektiv",
    definition: "Not immediately obvious or easy to notice; delicate and understated.",
    examples: [
      "There was a subtle change in her tone that made everyone pay attention.",
      "He made a subtle hint that he wanted to leave early."
    ], exampleDE: "Es gab eine feine Veränderung in ihrem Ton, die alle aufmerken ließ.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 87,
    word: "genuine",
    translation: "echt, aufrichtig, authentisch",
    pronunciation: "/ˈdʒenjuɪn/",
    wordType: "Adjektiv",
    definition: "Truly what it appears to be; sincere and honest.",
    examples: [
      "Her smile was genuine – she was truly happy to see him.",
      "He showed a genuine interest in learning the language."
    ], exampleDE: "Ihr Lächeln war echt – sie freute sich wirklich, ihn zu sehen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 88,
    word: "remarkable",
    translation: "bemerkenswert, außergewöhnlich",
    pronunciation: "/rɪˈmɑːkəbl/",
    wordType: "Adjektiv",
    definition: "Worthy of attention; striking or extraordinary.",
    examples: [
      "She made a remarkable recovery after the surgery.",
      "The film's special effects were absolutely remarkable."
    ], exampleDE: "Sie machte nach der Operation eine bemerkenswerte Genesung durch.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 89,
    word: "considerate",
    translation: "rücksichtsvoll, aufmerksam",
    pronunciation: "/kənˈsɪdərɪt/",
    wordType: "Adjektiv",
    definition: "Careful not to cause inconvenience or hurt to others; thoughtful.",
    examples: [
      "He is always considerate of his neighbours and keeps the noise down.",
      "It was considerate of her to send a thank-you note."
    ], exampleDE: "Er nimmt immer Rücksicht auf seine Nachbarn und hält den Lärm gering.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 90,
    word: "persistent",
    translation: "beharrlich, hartnäckig, anhaltend",
    pronunciation: "/pəˈsɪstənt/",
    wordType: "Adjektiv",
    definition: "Continuing firmly despite difficulty or opposition; refusing to give up.",
    examples: [
      "Despite many rejections, she remained persistent and finally got the job.",
      "The persistent rain ruined our picnic plans."
    ], exampleDE: "Trotz vieler Absagen blieb sie hartnäckig und bekam schließlich die Stelle.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 91,
    word: "anxious",
    translation: "ängstlich, besorgt, nervös",
    pronunciation: "/ˈæŋkʃəs/",
    wordType: "Adjektiv",
    definition: "Feeling worried, uneasy, or nervous about a situation.",
    examples: [
      "He was anxious about the exam results and couldn't sleep.",
      "She felt anxious waiting for the doctor's call."
    ], exampleDE: "Er war wegen der Prüfungsergebnisse ängstlich und konnte nicht schlafen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 92,
    word: "exhausted",
    translation: "erschöpft, ausgelaugt",
    pronunciation: "/ɪɡˈzɔːstɪd/",
    wordType: "Adjektiv",
    definition: "Extremely tired; drained of physical or mental energy.",
    examples: [
      "After the marathon, she was completely exhausted and fell asleep instantly.",
      "He looked exhausted after working three back-to-back night shifts."
    ], exampleDE: "Nach dem Marathon war sie völlig erschöpft und schlief sofort ein.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 93,
    word: "frustrated",
    translation: "frustriert, enttäuscht, verärgert",
    pronunciation: "/ˈfrʌstreɪtɪd/",
    wordType: "Adjektiv",
    definition: "Feeling upset or annoyed because of an inability to achieve something.",
    examples: [
      "I was frustrated that the internet kept cutting out during my presentation.",
      "She felt frustrated when nobody listened to her ideas."
    ], exampleDE: "Ich war frustriert, dass das Internet während meiner Präsentation ständig ausfiel.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 94,
    word: "relieved",
    translation: "erleichtert",
    pronunciation: "/rɪˈliːvd/",
    wordType: "Adjektiv",
    definition: "Feeling no longer anxious or worried because something difficult has passed.",
    examples: [
      "He was relieved to hear that his flight was not cancelled.",
      "She felt deeply relieved when she passed the driving test."
    ], exampleDE: "Er war erleichtert zu hören, dass sein Flug nicht gestrichen wurde.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 95,
    word: "awkward",
    translation: "unangenehm, unbeholfen, peinlich",
    pronunciation: "/ˈɔːkwəd/",
    wordType: "Adjektiv",
    definition: "Causing or feeling social discomfort; difficult to handle or use.",
    examples: [
      "There was an awkward silence after he made the joke.",
      "She felt awkward being the only person who didn't know anyone at the party."
    ], exampleDE: "Nach seinem Witz entstand ein unangenehmes Schweigen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 96,
    word: "decent",
    translation: "anständig, ordentlich, passabel",
    pronunciation: "/ˈdiːsnt/",
    wordType: "Adjektiv",
    definition: "Of an acceptable standard; morally correct and honest.",
    examples: [
      "The hotel was decent – nothing special, but clean and comfortable.",
      "He is a decent person who always tries to do the right thing."
    ], exampleDE: "Das Hotel war in Ordnung – nichts Besonderes, aber sauber und gemütlich.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 97,
    word: "vivid",
    translation: "lebhaft, lebendig, intensiv",
    pronunciation: "/ˈvɪvɪd/",
    wordType: "Adjektiv",
    definition: "Producing powerful feelings or strong, clear images in the mind; bright and strong.",
    examples: [
      "She had a vivid dream about flying over the mountains.",
      "The documentary used vivid colours to bring the wildlife to life."
    ], exampleDE: "Sie hatte einen lebhaften Traum, in dem sie über die Berge flog.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 98,
    word: "compelling",
    translation: "überzeugend, fesselnd, zwingend",
    pronunciation: "/kəmˈpelɪŋ/",
    wordType: "Adjektiv",
    definition: "Evoking interest, attention, or admiration in a powerfully irresistible way.",
    examples: [
      "The novel had a compelling storyline that kept me reading all night.",
      "She made a compelling argument for increasing the budget."
    ], exampleDE: "Der Roman hatte eine fesselnde Handlung, die mich die ganze Nacht weiterlesen ließ.",
    imageUrl: "",
    difficulty: "C1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 99,
    word: "grateful",
    translation: "dankbar",
    pronunciation: "/ˈɡreɪtfl/",
    wordType: "Adjektiv",
    definition: "Feeling or showing thanks for something received.",
    examples: [
      "I am truly grateful for all the help you have given me.",
      "She was grateful that the rain stopped before the outdoor ceremony."
    ], exampleDE: "Ich bin wirklich dankbar für all die Hilfe, die du mir gegeben hast.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 100,
    word: "cynical",
    translation: "zynisch, misstrauisch",
    pronunciation: "/ˈsɪnɪkl/",
    wordType: "Adjektiv",
    definition: "Believing that people are motivated purely by self-interest; distrustful of human sincerity.",
    examples: [
      "He was cynical about politicians ever keeping their promises.",
      "After years in business, she had grown cynical about people's motives."
    ], exampleDE: "Er war zynisch, was das Einhalten von Versprechen durch Politiker anging.",
    imageUrl: "",
    difficulty: "C1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 101,
    word: "cautious",
    translation: "vorsichtig, behutsam",
    pronunciation: "/ˈkɔːʃəs/",
    wordType: "Adjektiv",
    definition: "Careful to avoid potential problems or dangers; not taking unnecessary risks.",
    examples: [
      "She was cautious when crossing the icy road.",
      "The investors took a cautious approach in the uncertain market."
    ], exampleDE: "Sie war vorsichtig, als sie die vereiste Straße überquerte.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 102,
    word: "mediocre",
    translation: "mittelmäßig, durchschnittlich",
    pronunciation: "/ˌmiːdiˈoʊkər/",
    wordType: "Adjektiv",
    definition: "Of only moderate quality; not very good; unremarkable.",
    examples: [
      "The performance was mediocre – the audience expected much more.",
      "He was unhappy with his mediocre exam results."
    ], exampleDE: "Die Vorstellung war mittelmäßig – das Publikum hatte viel mehr erwartet.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 103,
    word: "bold",
    translation: "mutig, gewagt, kühn",
    pronunciation: "/boʊld/",
    wordType: "Adjektiv",
    definition: "Willing to take risks; showing confidence and courage; not afraid.",
    examples: [
      "It was a bold decision to quit her job and start her own business.",
      "He wore a bold red jacket that stood out in the crowd."
    ], exampleDE: "Es war eine mutige Entscheidung, ihren Job zu kündigen und ihr eigenes Unternehmen zu gründen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 104,
    word: "overwhelming",
    translation: "überwältigend, erdrückend",
    pronunciation: "/ˌoʊvərˈwelmɪŋ/",
    wordType: "Adjektiv",
    definition: "Very great in amount or strength; too intense to deal with comfortably.",
    examples: [
      "The response to the charity appeal was overwhelming – thousands donated.",
      "She felt an overwhelming sense of relief when the operation was over."
    ], exampleDE: "Die Resonanz auf den Spendenaufruf war überwältigend – Tausende spendeten.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 105,
    word: "to achieve",
    translation: "erreichen, erzielen, schaffen",
    pronunciation: "/tuː əˈtʃiːv/",
    wordType: "Verb",
    definition: "To successfully reach a goal or result through effort or skill.",
    examples: [
      "She worked hard to achieve her dream of becoming a doctor.",
      "The team achieved great results despite limited resources."
    ], exampleDE: "Sie arbeitete hart, um ihren Traum zu verwirklichen, Ärztin zu werden.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 106,
    word: "to adapt",
    translation: "sich anpassen, adaptieren",
    pronunciation: "/tuː əˈdæpt/",
    wordType: "Verb",
    definition: "To change or adjust to suit new conditions or requirements.",
    examples: [
      "It took him a while to adapt to the new working environment.",
      "Animals adapt to their surroundings over thousands of years."
    ], exampleDE: "Er brauchte eine Weile, um sich an das neue Arbeitsumfeld anzupassen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 107,
    word: "to appreciate",
    translation: "schätzen, würdigen, zu schätzen wissen",
    pronunciation: "/tuː əˈpriːʃieɪt/",
    wordType: "Verb",
    definition: "To recognise and value the good qualities of something or someone.",
    examples: [
      "I really appreciate everything you have done to help me.",
      "He didn't appreciate how hard she worked until she left."
    ], exampleDE: "Ich schätze wirklich alles, was du getan hast, um mir zu helfen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 108,
    word: "to assume",
    translation: "annehmen, vermuten, voraussetzen",
    pronunciation: "/tuː əˈsjuːm/",
    wordType: "Verb",
    definition: "To accept something as true without proof; to take for granted.",
    examples: [
      "Don't assume everyone shares your opinion – ask first.",
      "I assumed he would be late, but he actually arrived early."
    ], exampleDE: "Geh nicht davon aus, dass alle deine Meinung teilen – frag erst nach.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 109,
    word: "to avoid",
    translation: "vermeiden, meiden, ausweichen",
    pronunciation: "/tuː əˈvɔɪd/",
    wordType: "Verb",
    definition: "To keep away from or stop oneself from doing something.",
    examples: [
      "Try to avoid eating too much sugar if you want to stay healthy.",
      "She avoided making eye contact during the difficult conversation."
    ], exampleDE: "Versuche zu vermeiden, zu viel Zucker zu essen, wenn du gesund bleiben willst.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 110,
    word: "to challenge",
    translation: "herausfordern, infrage stellen",
    pronunciation: "/tuː ˈtʃælɪndʒ/",
    wordType: "Verb",
    definition: "To question or dispute something; to test someone's abilities.",
    examples: [
      "The new CEO challenged the way the company had always done things.",
      "This role will challenge you in ways you have never experienced before."
    ], exampleDE: "Der neue Geschäftsführer stellte die Art und Weise infrage, wie das Unternehmen die Dinge immer gemacht hatte.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 111,
    word: "to convince",
    translation: "überzeugen, überreden",
    pronunciation: "/tuː kənˈvɪns/",
    wordType: "Verb",
    definition: "To persuade someone to believe something or to do something.",
    examples: [
      "He convinced his boss to give the team an extra day off.",
      "I couldn't convince her that the film was worth watching."
    ], exampleDE: "Er überzeugte seinen Chef, dem Team einen zusätzlichen freien Tag zu geben.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 112,
    word: "to demand",
    translation: "fordern, verlangen, beanspruchen",
    pronunciation: "/tuː dɪˈmɑːnd/",
    wordType: "Verb",
    definition: "To ask for something forcefully and insistently; to require.",
    examples: [
      "The workers demanded better pay and working conditions.",
      "Teaching demands a great deal of patience and dedication."
    ], exampleDE: "Die Arbeiter forderten bessere Bezahlung und Arbeitsbedingungen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 113,
    word: "to emphasize",
    translation: "betonen, hervorheben, unterstreichen",
    pronunciation: "/tuː ˈemfəsaɪz/",
    wordType: "Verb",
    definition: "To give special importance or prominence to something.",
    examples: [
      "The teacher emphasized the importance of reading every day.",
      "She emphasized that the deadline was non-negotiable."
    ], exampleDE: "Die Lehrerin betonte, wie wichtig es ist, jeden Tag zu lesen.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 114,
    word: "to encourage",
    translation: "ermutigen, fördern, bestärken",
    pronunciation: "/tuː ɪnˈkʌrɪdʒ/",
    wordType: "Verb",
    definition: "To give support, confidence, or hope to someone; to motivate.",
    examples: [
      "His parents always encouraged him to pursue his passion for music.",
      "The coach encouraged the team after a difficult first half."
    ], exampleDE: "Seine Eltern ermutigten ihn immer, seiner Leidenschaft für Musik nachzugehen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 115,
    word: "to hesitate",
    translation: "zögern, zaudern, innehalten",
    pronunciation: "/tuː ˈhezɪteɪt/",
    wordType: "Verb",
    definition: "To pause before doing or saying something, often due to uncertainty.",
    examples: [
      "She hesitated before answering the difficult question.",
      "Don't hesitate to call me if you need any help."
    ], exampleDE: "Sie zögerte, bevor sie die schwierige Frage beantwortete.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 116,
    word: "to influence",
    translation: "beeinflussen, prägen",
    pronunciation: "/tuː ˈɪnfluəns/",
    wordType: "Verb",
    definition: "To have an effect on the character, development, or behaviour of someone or something.",
    examples: [
      "His teacher influenced him to study architecture.",
      "Social media can heavily influence the way young people see themselves."
    ], exampleDE: "Sein Lehrer beeinflusste ihn, Architektur zu studieren.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 117,
    word: "to negotiate",
    translation: "verhandeln, aushandeln",
    pronunciation: "/tuː nɪˈɡoʊʃieɪt/",
    wordType: "Verb",
    definition: "To discuss something in order to reach an agreement.",
    examples: [
      "They negotiated a better deal by staying calm and prepared.",
      "The union negotiated improved holiday allowances for all staff."
    ], exampleDE: "Sie handelten ein besseres Angebot aus, indem sie ruhig und vorbereitet blieben.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 118,
    word: "to overcome",
    translation: "überwinden, bewältigen, besiegen",
    pronunciation: "/tuː ˌoʊvərˈkʌm/",
    wordType: "Verb",
    definition: "To succeed in dealing with or gaining control over something difficult.",
    examples: [
      "She overcame her fear of public speaking after joining a drama group.",
      "He worked hard to overcome the obstacles in his path."
    ], exampleDE: "Sie überwand ihre Angst vor dem öffentlichen Reden, nachdem sie einer Theatergruppe beigetreten war.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 119,
    word: "to pursue",
    translation: "verfolgen, anstreben, nachgehen",
    pronunciation: "/tuː pərˈsjuː/",
    wordType: "Verb",
    definition: "To follow or chase something; to continue to work towards a goal.",
    examples: [
      "She decided to pursue a career in journalism.",
      "The police pursued the suspect through the city streets."
    ], exampleDE: "Sie beschloss, eine Karriere im Journalismus zu verfolgen.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 120,
    word: "to recognize",
    translation: "erkennen, anerkennen, identifizieren",
    pronunciation: "/tuː ˈrekəɡnaɪz/",
    wordType: "Verb",
    definition: "To identify someone or something from previous experience; to acknowledge officially.",
    examples: [
      "I recognized her immediately even though I hadn't seen her in ten years.",
      "The company was recognized for its outstanding customer service."
    ], exampleDE: "Ich erkannte sie sofort, obwohl ich sie zehn Jahre lang nicht gesehen hatte.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 121,
    word: "to rely on",
    translation: "sich verlassen auf, abhängen von",
    pronunciation: "/tuː rɪˈlaɪ ɒn/",
    wordType: "Verb",
    definition: "To trust or depend on someone or something.",
    examples: [
      "You can always rely on her to get the job done on time.",
      "He relied on public transport to get to work every day."
    ], exampleDE: "Du kannst dich immer auf sie verlassen, dass sie die Arbeit pünktlich erledigt.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 122,
    word: "to reveal",
    translation: "enthüllen, offenbaren, bekannt geben",
    pronunciation: "/tuː rɪˈviːl/",
    wordType: "Verb",
    definition: "To make something unknown or hidden known to others.",
    examples: [
      "The documentary revealed shocking facts about the food industry.",
      "She finally revealed the secret she had been keeping for years."
    ], exampleDE: "Die Dokumentation enthüllte schockierende Fakten über die Lebensmittelindustrie.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 123,
    word: "to suspect",
    translation: "vermuten, verdächtigen, ahnen",
    pronunciation: "/tuː səˈspekt/",
    wordType: "Verb",
    definition: "To believe something is likely or possible; to think someone may be guilty.",
    examples: [
      "I suspect he didn't finish the report on time.",
      "The police suspected the neighbour from the very beginning."
    ], exampleDE: "Ich vermute, dass er den Bericht nicht rechtzeitig fertiggestellt hat.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 124,
    word: "to witness",
    translation: "bezeugen, miterleben, Zeuge sein von",
    pronunciation: "/tuː ˈwɪtnɪs/",
    wordType: "Verb",
    definition: "To see an event happen, especially an important or significant one.",
    examples: [
      "She witnessed the accident from her kitchen window.",
      "We are witnessing a major shift in the way people communicate."
    ], exampleDE: "Sie wurde vom Küchenfenster aus Zeugin des Unfalls.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 125,
    word: "Achievement",
    translation: "die Leistung, der Erfolg, die Errungenschaft",
    pronunciation: "/əˈtʃiːvmənt/",
    wordType: "Nomen",
    definition: "A thing done successfully, typically by effort, courage, or skill.",
    examples: [
      "Winning the championship was the greatest achievement of his career.",
      "Learning a new language is a remarkable achievement at any age."
    ], exampleDE: "Die Meisterschaft zu gewinnen war die größte Leistung seiner Karriere.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 126,
    word: "Approach",
    translation: "der Ansatz, die Herangehensweise, der Zugang",
    pronunciation: "/əˈproʊtʃ/",
    wordType: "Nomen",
    definition: "A way of dealing with a situation or problem; a method or strategy.",
    examples: [
      "We need a fresh approach to solve this long-standing problem.",
      "Her calm approach to conflict made her an effective manager."
    ], exampleDE: "Wir brauchen einen neuen Ansatz, um dieses seit Langem bestehende Problem zu lösen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 127,
    word: "Argument",
    translation: "das Argument, der Streit, die Auseinandersetzung",
    pronunciation: "/ˈɑːɡjumənt/",
    wordType: "Nomen",
    definition: "A reason given to support or oppose an idea; also a heated disagreement.",
    examples: [
      "He made a convincing argument for changing the company policy.",
      "They had a serious argument about money and didn't speak for a week."
    ], exampleDE: "Er brachte ein überzeugendes Argument für die Änderung der Unternehmensrichtlinie vor.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 128,
    word: "Attitude",
    translation: "die Einstellung, die Haltung, die Mentalität",
    pronunciation: "/ˈætɪtjuːd/",
    wordType: "Nomen",
    definition: "A settled way of thinking or feeling about something; one's outlook or stance.",
    examples: [
      "Her positive attitude helped the team stay motivated during tough times.",
      "You need to change your attitude if you want to succeed."
    ], exampleDE: "Ihre positive Einstellung half dem Team, in schwierigen Zeiten motiviert zu bleiben.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 129,
    word: "Challenge",
    translation: "die Herausforderung, die Aufgabe",
    pronunciation: "/ˈtʃælɪndʒ/",
    wordType: "Nomen",
    definition: "A difficult task or situation that tests someone's abilities.",
    examples: [
      "Moving abroad was the biggest challenge she had ever faced.",
      "The main challenge is keeping costs low while improving quality."
    ], exampleDE: "Ins Ausland zu ziehen war die größte Herausforderung, der sie je begegnet war.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 130,
    word: "Circumstance",
    translation: "der Umstand, die Situation, die Lage",
    pronunciation: "/ˈsɜːkəmstæns/",
    wordType: "Nomen",
    definition: "A fact or condition connected with or relevant to an event or action.",
    examples: [
      "Given the circumstances, she handled the crisis extremely well.",
      "Under no circumstance should you share your password with anyone."
    ], exampleDE: "Angesichts der Umstände meisterte sie die Krise außerordentlich gut.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 131,
    word: "Commitment",
    translation: "das Engagement, die Verpflichtung, die Hingabe",
    pronunciation: "/kəˈmɪtmənt/",
    wordType: "Nomen",
    definition: "The state of being dedicated to a cause, activity, or relationship.",
    examples: [
      "His commitment to the project was evident from day one.",
      "Marriage is a serious commitment that requires work from both partners."
    ], exampleDE: "Sein Engagement für das Projekt war vom ersten Tag an erkennbar.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 132,
    word: "Concern",
    translation: "die Sorge, das Anliegen, das Bedenken",
    pronunciation: "/kənˈsɜːn/",
    wordType: "Nomen",
    definition: "A matter of interest or importance; a feeling of worry.",
    examples: [
      "Safety is our main concern on every construction site.",
      "She expressed concern about the rising cost of living."
    ], exampleDE: "Sicherheit ist auf jeder Baustelle unser größtes Anliegen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 133,
    word: "Conflict",
    translation: "der Konflikt, der Streit, der Widerspruch",
    pronunciation: "/ˈkɒnflɪkt/",
    wordType: "Nomen",
    definition: "A serious disagreement or argument; a prolonged armed struggle.",
    examples: [
      "The conflict between the two departments was slowing everything down.",
      "The UN is working to resolve the conflict peacefully."
    ], exampleDE: "Der Konflikt zwischen den beiden Abteilungen bremste alles aus.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 134,
    word: "Consequence",
    translation: "die Konsequenz, die Folge, das Ergebnis",
    pronunciation: "/ˈkɒnsɪkwəns/",
    wordType: "Nomen",
    definition: "A result or effect of an action or condition.",
    examples: [
      "He didn't study and, as a consequence, he failed the exam.",
      "We must consider the consequences of our decisions carefully."
    ], exampleDE: "Er lernte nicht und fiel infolgedessen durch die Prüfung.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 135,
    word: "Context",
    translation: "der Kontext, der Zusammenhang, die Umgebung",
    pronunciation: "/ˈkɒntekst/",
    wordType: "Nomen",
    definition: "The circumstances surrounding an event or statement that help explain its meaning.",
    examples: [
      "You need to read the full article to understand the context of the quote.",
      "This word has a different meaning depending on the context."
    ], exampleDE: "Du musst den ganzen Artikel lesen, um den Kontext des Zitats zu verstehen.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 136,
    word: "Dilemma",
    translation: "das Dilemma, die Zwickmühle",
    pronunciation: "/dɪˈlemə/",
    wordType: "Nomen",
    definition: "A situation where a difficult choice has to be made between two equally undesirable alternatives.",
    examples: [
      "She faced a dilemma: take the higher-paying job or stay closer to family.",
      "The ethical dilemma had no easy answer."
    ], exampleDE: "Sie stand vor einem Dilemma: den besser bezahlten Job annehmen oder näher bei der Familie bleiben.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 137,
    word: "Evidence",
    translation: "der Beweis, die Belege, das Beweismaterial",
    pronunciation: "/ˈevɪdəns/",
    wordType: "Nomen",
    definition: "Facts or information indicating whether a belief or proposition is true.",
    examples: [
      "The police found no evidence linking him to the crime.",
      "There is growing evidence that exercise improves mental health."
    ], exampleDE: "Die Polizei fand keine Beweise, die ihn mit dem Verbrechen in Verbindung brachten.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 138,
    word: "Failure",
    translation: "das Scheitern, der Misserfolg, der Ausfall",
    pronunciation: "/ˈfeɪljər/",
    wordType: "Nomen",
    definition: "Lack of success; the omission of expected or required action.",
    examples: [
      "He saw every failure as a learning opportunity, not a setback.",
      "The power failure left half the city without electricity."
    ], exampleDE: "Er sah jeden Misserfolg als Lernchance, nicht als Rückschlag.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 139,
    word: "Habit",
    translation: "die Gewohnheit, die Angewohnheit",
    pronunciation: "/ˈhæbɪt/",
    wordType: "Nomen",
    definition: "A settled or regular tendency or practice, especially one that is hard to give up.",
    examples: [
      "She developed the habit of reading before bed to unwind.",
      "Smoking is a habit that is very difficult to break."
    ], exampleDE: "Sie entwickelte die Gewohnheit, vor dem Schlafengehen zu lesen, um abzuschalten.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 140,
    word: "Impact",
    translation: "die Auswirkung, der Einfluss, der Aufprall",
    pronunciation: "/ˈɪmpækt/",
    wordType: "Nomen",
    definition: "A marked effect or influence on something or someone.",
    examples: [
      "The new law had a major impact on small businesses.",
      "Climate change is having a devastating impact on coral reefs."
    ], exampleDE: "Das neue Gesetz hatte große Auswirkungen auf kleine Unternehmen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 141,
    word: "Intention",
    translation: "die Absicht, das Vorhaben, die Intention",
    pronunciation: "/ɪnˈtenʃn/",
    wordType: "Nomen",
    definition: "A thing intended; an aim or plan.",
    examples: [
      "His intention was to apologise, but he never found the right moment.",
      "I have every intention of finishing this project on time."
    ], exampleDE: "Seine Absicht war, sich zu entschuldigen, aber er fand nie den richtigen Moment.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 142,
    word: "Opportunity",
    translation: "die Gelegenheit, die Chance, die Möglichkeit",
    pronunciation: "/ˌɒpəˈtjuːnɪti/",
    wordType: "Nomen",
    definition: "A set of circumstances that makes it possible to do something desirable.",
    examples: [
      "This job offer is a fantastic opportunity that she shouldn't miss.",
      "He seized every opportunity to practise his English."
    ], exampleDE: "Dieses Jobangebot ist eine fantastische Gelegenheit, die sie sich nicht entgehen lassen sollte.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 143,
    word: "Perspective",
    translation: "die Perspektive, die Sichtweise, der Blickwinkel",
    pronunciation: "/pəˈspektɪv/",
    wordType: "Nomen",
    definition: "A particular attitude towards or way of regarding something; a point of view.",
    examples: [
      "Travelling abroad gave her a completely new perspective on life.",
      "It is important to consider the situation from different perspectives."
    ], exampleDE: "Reisen ins Ausland gab ihr eine völlig neue Sicht auf das Leben.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 144,
    word: "Priority",
    translation: "die Priorität, der Vorrang",
    pronunciation: "/praɪˈɒrɪti/",
    wordType: "Nomen",
    definition: "A thing regarded as more important than others; the fact of being treated first.",
    examples: [
      "Health should always be your number one priority.",
      "The government set education as its top priority for the coming year."
    ], exampleDE: "Gesundheit sollte immer deine oberste Priorität sein.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 145,
    word: "Responsibility",
    translation: "die Verantwortung, die Pflicht, die Zuständigkeit",
    pronunciation: "/rɪˌspɒnsɪˈbɪlɪti/",
    wordType: "Nomen",
    definition: "The state or fact of having a duty to deal with something; being accountable.",
    examples: [
      "As a parent, you have a responsibility to keep your children safe.",
      "She took full responsibility for the mistake and apologised publicly."
    ], exampleDE: "Als Elternteil hast du die Verantwortung, deine Kinder zu beschützen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 146,
    word: "Reward",
    translation: "die Belohnung, die Anerkennung, der Lohn",
    pronunciation: "/rɪˈwɔːd/",
    wordType: "Nomen",
    definition: "A thing given in recognition of service, effort, or achievement.",
    examples: [
      "Hard work should be met with fair reward.",
      "They offered a reward for anyone who could find the lost dog."
    ], exampleDE: "Harte Arbeit sollte mit einer fairen Belohnung honoriert werden.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 147,
    word: "Risk",
    translation: "das Risiko, die Gefahr, das Wagnis",
    pronunciation: "/rɪsk/",
    wordType: "Nomen",
    definition: "A situation involving exposure to danger or the chance of something going wrong.",
    examples: [
      "Starting a business always involves a certain amount of risk.",
      "There is a risk of flooding in low-lying areas after heavy rain."
    ], exampleDE: "Ein Unternehmen zu gründen ist immer mit einem gewissen Risiko verbunden.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 148,
    word: "Solution",
    translation: "die Lösung, die Auflösung",
    pronunciation: "/səˈluːʃn/",
    wordType: "Nomen",
    definition: "A means of solving a problem or dealing with a difficult situation.",
    examples: [
      "We need to find a long-term solution to the traffic problem.",
      "Talking it through calmly is often the best solution to an argument."
    ], exampleDE: "Wir müssen eine langfristige Lösung für das Verkehrsproblem finden.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 149,
    word: "Strategy",
    translation: "die Strategie, der Plan, das Konzept",
    pronunciation: "/ˈstrætɪdʒi/",
    wordType: "Nomen",
    definition: "A plan of action designed to achieve a long-term or overall goal.",
    examples: [
      "The company needs a clear strategy to compete in the global market.",
      "Playing chess requires careful strategy and forward thinking."
    ], exampleDE: "Das Unternehmen braucht eine klare Strategie, um auf dem Weltmarkt zu bestehen.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 150,
    word: "Struggle",
    translation: "der Kampf, die Mühe, das Ringen",
    pronunciation: "/ˈstrʌɡl/",
    wordType: "Nomen",
    definition: "A very difficult task or situation; a determined effort under difficulties.",
    examples: [
      "The struggle to balance work and family life is something many people share.",
      "The documentary showed the daily struggle of people living in poverty."
    ], exampleDE: "Der Kampf, Beruf und Familie unter einen Hut zu bringen, ist etwas, das viele Menschen teilen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 151,
    word: "Trust",
    translation: "das Vertrauen, das Zutrauen",
    pronunciation: "/trʌst/",
    wordType: "Nomen",
    definition: "Firm belief in the reliability, truth, or ability of someone or something.",
    examples: [
      "Trust is the foundation of every healthy relationship.",
      "It took years to rebuild the trust after he had lied."
    ], exampleDE: "Vertrauen ist die Grundlage jeder gesunden Beziehung.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 152,
    word: "Uncertainty",
    translation: "die Unsicherheit, die Ungewissheit, der Zweifel",
    pronunciation: "/ʌnˈsɜːtnti/",
    wordType: "Nomen",
    definition: "The state of being uncertain or not sure about something; unpredictability.",
    examples: [
      "The economic uncertainty made investors hesitant to commit large sums.",
      "Living with uncertainty is a skill that requires practise and resilience."
    ], exampleDE: "Die wirtschaftliche Unsicherheit machte Investoren zögerlich, große Summen zu investieren.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 153,
    word: "Awareness",
    translation: "das Bewusstsein, die Aufmerksamkeit, das Wissen",
    pronunciation: "/əˈweənɪs/",
    wordType: "Nomen",
    definition: "Knowledge or perception of a situation or fact; being conscious of something.",
    examples: [
      "The campaign aims to raise awareness about mental health issues.",
      "Her awareness of other people's feelings made her an excellent therapist."
    ], exampleDE: "Die Kampagne soll das Bewusstsein für psychische Gesundheit schärfen.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 154,
    word: "Tension",
    translation: "die Spannung, die Anspannung, die Reibung",
    pronunciation: "/ˈtenʃn/",
    wordType: "Nomen",
    definition: "Mental or emotional strain; a strained relationship between people or groups.",
    examples: [
      "There was visible tension between the two colleagues after the argument.",
      "The film builds tension slowly before the shocking final scene."
    ], exampleDE: "Nach dem Streit gab es eine sichtbare Spannung zwischen den beiden Kollegen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 155,
    word: "to figure out",
    translation: "herausfinden, verstehen, lösen",
    pronunciation: "/tuː ˈfɪɡər aʊt/",
    wordType: "Verb",
    definition: "To understand or discover something; to find the answer to a problem.",
    examples: [
      "I couldn't figure out how to use the new software at first.",
      "She finally figured out why the machine kept stopping."
    ], exampleDE: "Anfangs konnte ich nicht herausfinden, wie man die neue Software benutzt.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 156,
    word: "to give up",
    translation: "aufgeben, kapitulieren",
    pronunciation: "/tuː ɡɪv ʌp/",
    wordType: "Verb",
    definition: "To stop trying to do something; to admit defeat or surrender.",
    examples: [
      "Don't give up – you are almost there!",
      "He gave up smoking after twenty years."
    ], exampleDE: "Gib nicht auf – du bist fast am Ziel!",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 157,
    word: "to look forward to",
    translation: "sich freuen auf (etwas)",
    pronunciation: "/tuː lʊk ˈfɔːwəd tuː/",
    wordType: "Verb",
    definition: "To feel excited or pleased about something that is going to happen.",
    examples: [
      "I am really looking forward to our holiday next week.",
      "She looks forward to her morning coffee every single day."
    ], exampleDE: "Ich freue mich schon sehr auf unseren Urlaub nächste Woche.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 158,
    word: "to stand out",
    translation: "herausstechen, auffallen, sich abheben",
    pronunciation: "/tuː stænd aʊt/",
    wordType: "Verb",
    definition: "To be clearly better or more noticeable than others; to be conspicuous.",
    examples: [
      "Her bright yellow coat made her stand out in the crowd.",
      "His creative approach made his application stand out from all the others."
    ], exampleDE: "Ihr leuchtend gelber Mantel ließ sie in der Menge hervorstechen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 159,
    word: "to catch up",
    translation: "aufholen, nachholen, auf den neuesten Stand kommen",
    pronunciation: "/tuː kætʃ ʌp/",
    wordType: "Verb",
    definition: "To reach the same level or standard as others; to exchange news with someone.",
    examples: [
      "He missed three weeks of school and needed time to catch up.",
      "Let's have coffee soon – I'd love to catch up with you."
    ], exampleDE: "Er verpasste drei Wochen Schule und brauchte Zeit, um den Stoff nachzuholen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 160,
    word: "to put off",
    translation: "aufschieben, verschieben, vertagen",
    pronunciation: "/tuː pʊt ɒf/",
    wordType: "Verb",
    definition: "To postpone or delay doing something; also to cause someone to lose interest.",
    examples: [
      "Stop putting off the dentist appointment – just book it!",
      "The constant noise was putting her off her work."
    ], exampleDE: "Hör auf, den Zahnarzttermin aufzuschieben – buch ihn einfach!",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 161,
    word: "to come across",
    translation: "stoßen auf, wirken, einen Eindruck machen",
    pronunciation: "/tuː kʌm əˈkrɒs/",
    wordType: "Verb",
    definition: "To meet or find something by chance; to give a particular impression to others.",
    examples: [
      "I came across an old photo album while tidying the attic.",
      "He came across as very confident during the interview."
    ], exampleDE: "Beim Aufräumen des Dachbodens stieß ich auf ein altes Fotoalbum.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 162,
    word: "to make up your mind",
    translation: "sich entscheiden, einen Entschluss fassen",
    pronunciation: "/tuː meɪk ʌp jɔː maɪnd/",
    wordType: "Verb",
    definition: "To decide between two or more options after thinking carefully.",
    examples: [
      "Have you made up your mind about which university to apply to?",
      "I can't make up my mind – both options have their advantages."
    ], exampleDE: "Hast du dich entschieden, an welcher Universität du dich bewerben willst?",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 163,
    word: "to keep in mind",
    translation: "im Hinterkopf behalten, berücksichtigen",
    pronunciation: "/tuː kiːp ɪn maɪnd/",
    wordType: "Verb",
    definition: "To remember or consider something as important when thinking or deciding.",
    examples: [
      "Keep in mind that the deadline is Friday, not Monday.",
      "Please keep in mind that we have a limited budget for this project."
    ], exampleDE: "Denk daran, dass die Frist am Freitag ist, nicht am Montag.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 164,
    word: "to take for granted",
    translation: "als selbstverständlich ansehen, nicht schätzen",
    pronunciation: "/tuː teɪk fər ˈɡrɑːntɪd/",
    wordType: "Verb",
    definition: "To fail to appreciate the value of something because you are so used to it.",
    examples: [
      "Don't take your health for granted – look after yourself.",
      "He took his friends for granted until they were no longer around."
    ], exampleDE: "Nimm deine Gesundheit nicht als selbstverständlich hin – pass auf dich auf.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 165,
    word: "to run out of",
    translation: "ausgehen, aufbrauchen, keinen ... mehr haben",
    pronunciation: "/tuː rʌn aʊt ɒv/",
    wordType: "Verb",
    definition: "To use up the entire supply of something; to have none left.",
    examples: [
      "We ran out of milk, so I need to go to the shop.",
      "The car ran out of petrol on the motorway."
    ], exampleDE: "Uns ist die Milch ausgegangen, also muss ich zum Laden gehen.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 166,
    word: "to get along with",
    translation: "gut auskommen mit, sich gut verstehen mit",
    pronunciation: "/tuː ɡet əˈlɒŋ wɪð/",
    wordType: "Verb",
    definition: "To have a friendly relationship with someone; to be on good terms.",
    examples: [
      "She gets along with all of her colleagues really well.",
      "Do you think the new flatmates will get along with each other?"
    ], exampleDE: "Sie kommt mit all ihren Kollegen wirklich gut aus.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 167,
    word: "to point out",
    translation: "hinweisen auf, aufzeigen, darauf aufmerksam machen",
    pronunciation: "/tuː pɔɪnt aʊt/",
    wordType: "Verb",
    definition: "To direct attention to something; to mention something that might be overlooked.",
    examples: [
      "She pointed out several errors in the report before it was submitted.",
      "Can you point out the house on the map?"
    ], exampleDE: "Sie wies auf mehrere Fehler im Bericht hin, bevor er eingereicht wurde.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 168,
    word: "to bring up",
    translation: "ansprechen, erwähnen, aufbringen (Thema)",
    pronunciation: "/tuː brɪŋ ʌp/",
    wordType: "Verb",
    definition: "To mention a topic in conversation; also to raise a child.",
    examples: [
      "He brought up the issue of overtime pay at the team meeting.",
      "She was brought up by her grandparents in a small village."
    ], exampleDE: "Er brachte das Thema Überstundenbezahlung in der Teambesprechung zur Sprache.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 169,
    word: "to carry on",
    translation: "weitermachen, fortfahren, nicht aufhören",
    pronunciation: "/tuː ˈkæri ɒn/",
    wordType: "Verb",
    definition: "To continue doing something; to proceed despite difficulties.",
    examples: [
      "Carry on – you are doing a great job!",
      "They carried on working even when the power went out."
    ], exampleDE: "Mach weiter so – du machst das großartig!",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "Allgemein"
  },
  {
    id: 170,
    word: "Suspense",
    translation: "die Spannung, die Ungewissheit (Thriller)",
    pronunciation: "/səˈspens/",
    wordType: "Nomen",
    definition: "A feeling of excited or anxious uncertainty about what may happen.",
    examples: [
      "The director builds suspense slowly throughout the entire first act.",
      "The book kept me in suspense right until the final page."
    ], exampleDE: "Der Regisseur baut die Spannung im gesamten ersten Akt langsam auf.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 171,
    word: "Plot twist",
    translation: "die Wendung in der Geschichte, der überraschende Handlungsverlauf",
    pronunciation: "/plɒt twɪst/",
    wordType: "Nomen",
    definition: "An unexpected development in a story that changes the direction of the narrative.",
    examples: [
      "Nobody saw the plot twist coming – it completely changed the story.",
      "The best plot twists make you want to rewatch the whole film."
    ], exampleDE: "Niemand sah die überraschende Wendung kommen – sie veränderte die Geschichte völlig.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 172,
    word: "Cliffhanger",
    translation: "der Cliffhanger, das spannende offene Ende",
    pronunciation: "/ˈklɪfhæŋər/",
    wordType: "Nomen",
    definition: "An ending to a story or episode that leaves the audience in suspense.",
    examples: [
      "The season ended on a cliffhanger – we have no idea if she survived.",
      "Soap operas are famous for their dramatic cliffhangers."
    ], exampleDE: "Die Staffel endete mit einem Cliffhanger – wir haben keine Ahnung, ob sie überlebt hat.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 173,
    word: "Protagonist",
    translation: "der Protagonist, die Hauptfigur",
    pronunciation: "/proʊˈtæɡənɪst/",
    wordType: "Nomen",
    definition: "The main character in a story, film, or play; the hero or central figure.",
    examples: [
      "The protagonist of the series is a detective with a troubled past.",
      "We follow the protagonist on her journey from poverty to success."
    ], exampleDE: "Der Protagonist der Serie ist ein Ermittler mit einer schwierigen Vergangenheit.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 174,
    word: "Antagonist",
    translation: "der Antagonist, der Bösewicht, der Gegenspieler",
    pronunciation: "/ænˈtæɡənɪst/",
    wordType: "Nomen",
    definition: "A person who actively opposes the protagonist; the villain of a story.",
    examples: [
      "The antagonist was so well written that audiences almost sympathised with him.",
      "A great story needs a compelling antagonist, not just a great hero."
    ], exampleDE: "Der Antagonist war so gut geschrieben, dass das Publikum fast mit ihm sympathisierte.",
    imageUrl: "",
    difficulty: "C1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 175,
    word: "Flashback",
    translation: "der Rückblick, die Rückblende",
    pronunciation: "/ˈflæʃbæk/",
    wordType: "Nomen",
    definition: "A scene in a film or story set in a time earlier than the main action.",
    examples: [
      "The episode uses a flashback to explain the character's troubled childhood.",
      "The film cuts to a flashback every time she hears that song."
    ], exampleDE: "Die Folge verwendet eine Rückblende, um die schwierige Kindheit der Figur zu erklären.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 176,
    word: "Foreshadowing",
    translation: "die Vorausdeutung, die Andeutung",
    pronunciation: "/fɔːˈʃædoʊɪŋ/",
    wordType: "Nomen",
    definition: "A hint or warning of a future event in a story or film.",
    examples: [
      "The ominous music in the opening scene was clear foreshadowing.",
      "Looking back, the foreshadowing was obvious – we just didn't notice it at first."
    ], exampleDE: "Die unheilvolle Musik in der Eröffnungsszene war eine klare Vorausdeutung.",
    imageUrl: "",
    difficulty: "C1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 177,
    word: "Spoiler",
    translation: "der Spoiler, die unerwünschte Enthüllung",
    pronunciation: "/ˈspɔɪlər/",
    wordType: "Nomen",
    definition: "A piece of information that reveals important plot details before someone has seen a film or read a book.",
    examples: [
      "Warning: the next paragraph contains spoilers for the latest episode.",
      "He accidentally gave away a major spoiler and everyone was furious."
    ], exampleDE: "Achtung: Der nächste Absatz enthält Spoiler zur neuesten Folge.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 178,
    word: "Binge-watch",
    translation: "Serien am Stück schauen, Serienmarathon machen",
    pronunciation: "/ˈbɪndʒ wɒtʃ/",
    wordType: "Verb",
    definition: "To watch multiple episodes of a TV show in rapid succession.",
    examples: [
      "We binge-watched the entire series over the long weekend.",
      "She binge-watched three seasons of the show without leaving the sofa."
    ], exampleDE: "Wir haben die ganze Serie über das lange Wochenende am Stück durchgeschaut.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 179,
    word: "Season finale",
    translation: "das Staffelfinale, der letzte Teil einer Staffel",
    pronunciation: "/ˈsiːzn fɪˈnɑːli/",
    wordType: "Nomen",
    definition: "The last episode of a television season, often with a dramatic conclusion.",
    examples: [
      "The season finale left millions of fans desperate for the next series.",
      "She stayed up until 2 a.m. to watch the season finale live."
    ], exampleDE: "Das Staffelfinale ließ Millionen Fans sehnsüchtig auf die nächste Staffel warten.",
    imageUrl: "",
    difficulty: "A2",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 180,
    word: "Subplot",
    translation: "die Nebenhandlung, der Nebenstrang",
    pronunciation: "/ˈsʌbplɒt/",
    wordType: "Nomen",
    definition: "A secondary plot that runs alongside the main storyline in a film or book.",
    examples: [
      "The romantic subplot added depth and warmth to the action film.",
      "A well-crafted subplot can be just as engaging as the main story."
    ], exampleDE: "Die romantische Nebenhandlung verlieh dem Actionfilm Tiefe und Wärme.",
    imageUrl: "",
    difficulty: "C1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 181,
    word: "Character development",
    translation: "die Charakterentwicklung",
    pronunciation: "/ˈkærɪktər dɪˈveləpmənt/",
    wordType: "Nomen",
    definition: "The process by which a character in a story changes and grows over time.",
    examples: [
      "The show's character development is what keeps viewers coming back for more.",
      "Critics praised the film for its exceptional character development."
    ], exampleDE: "Die Charakterentwicklung der Serie ist das, was die Zuschauer immer wieder zurückkommen lässt.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 182,
    word: "Narrative",
    translation: "die Erzählung, das Narrativ, die Geschichte",
    pronunciation: "/ˈnærətɪv/",
    wordType: "Nomen",
    definition: "A spoken or written account of connected events; the art or process of storytelling.",
    examples: [
      "The film's narrative jumps between three different timelines.",
      "She used personal narrative to make her speech more engaging."
    ], exampleDE: "Die Erzählweise des Films springt zwischen drei verschiedenen Zeitebenen hin und her.",
    imageUrl: "",
    difficulty: "C1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 183,
    word: "Genre",
    translation: "das Genre, die Gattung, die Stilrichtung",
    pronunciation: "/ˈʒɒnrə/",
    wordType: "Nomen",
    definition: "A category of artistic composition, characterised by a particular style or form.",
    examples: [
      "Crime drama is her favourite genre – she never gets tired of it.",
      "The film blends the sci-fi and horror genres in a unique way."
    ], exampleDE: "Krimidrama ist ihr Lieblingsgenre – sie wird es nie müde.",
    imageUrl: "",
    difficulty: "B1",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {
    id: 184,
    word: "Screenplay",
    translation: "das Drehbuch",
    pronunciation: "/ˈskriːnpleɪ/",
    wordType: "Nomen",
    definition: "The script of a film, including dialogue and directions.",
    examples: [
      "She spent three years writing the screenplay for her debut film.",
      "The screenplay won an Oscar before the film was even shot."
    ], exampleDE: "Sie verbrachte drei Jahre damit, das Drehbuch für ihren Debütfilm zu schreiben.",
    imageUrl: "",
    difficulty: "B2",
    dateAdded: "2026-05-27",
    category: "TV"
  },
  {"id":185,"word":"Lighthouse","translation":"Leuchtturm","pronunciation":"/ˈlaɪthaʊs/","wordType":"Nomen","definition":"A tower with a bright light that guides ships at sea.","examples":["The lighthouse warned ships about the dangerous rocks.","We visited an old lighthouse by the coast."], exampleDE: "Der Leuchtturm warnte Schiffe vor den gefährlichen Felsen.","imageUrl":"","difficulty":"A2","dateAdded":"2026-06-15","notes":"","category":"Allgemein"},
  {"id":186,"word":"Ferris wheel","translation":"Riesenrad","pronunciation":"/ˈferɪs wiːl/","wordType":"Nomen","definition":"A large rotating wheel with passenger cabins attached to its rim.","examples":["We rode the Ferris wheel at the carnival.","The Ferris wheel offers a great view of the city."], exampleDE: "Wir fuhren auf dem Riesenrad auf dem Jahrmarkt.","imageUrl":"","difficulty":"A2","dateAdded":"2026-06-21","notes":"","category":"TV"},
  {"id":187,"word":"to stall","translation":"verzögern","pronunciation":"/stɔːl/","wordType":"Verb","definition":"To delay or stop making progress intentionally","examples":["Stop stalling and answer my question.","The car engine stalled at the traffic light."], exampleDE: "Hör auf hinzuhalten und beantworte meine Frage.","imageUrl":"","difficulty":"B1","dateAdded":"2026-06-22","notes":"","category":"TV"},
  {"id": 188, "word": "to reserve", "translation": "reservieren", "pronunciation": "/rɪˈzɜːv/", "wordType": "Verb", "definition": "To arrange for a table or seat to be kept for you.", "examples": ["I'd like to reserve a table for two at eight o'clock.", "You should reserve early because the restaurant gets busy."], "exampleDE": "Ich möchte einen Tisch für zwei Personen um acht Uhr reservieren.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 189, "word": "Reservation", "translation": "Reservierung", "pronunciation": "/ˌrezəˈveɪʃn/", "wordType": "Nomen", "definition": "An arrangement to have a table or room kept for you.", "examples": ["We have a reservation under the name Becker.", "The waiter checked our reservation and showed us to our seats."], "exampleDE": "Wir haben eine Reservierung auf den Namen Becker.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 190, "word": "Menu", "translation": "Speisekarte", "pronunciation": "/ˈmenjuː/", "wordType": "Nomen", "definition": "A list of the dishes available in a restaurant.", "examples": ["Could we see the menu, please?", "The menu had an English translation for tourists."], "exampleDE": "Könnten wir bitte die Speisekarte sehen?", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 191, "word": "Starter", "translation": "Vorspeise", "pronunciation": "/ˈstɑːtə/", "wordType": "Nomen", "definition": "A small dish eaten before the main course.", "examples": ["For my starter I'll have the tomato soup.", "The starters were so big we almost skipped the main course."], "exampleDE": "Als Vorspeise nehme ich die Tomatensuppe.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 192, "word": "Main course", "translation": "Hauptgericht", "pronunciation": "/ˌmeɪn ˈkɔːs/", "wordType": "Nomen", "definition": "The largest or most important dish of a meal.", "examples": ["What would you recommend as a main course?", "Her main course came with rice and grilled vegetables."], "exampleDE": "Was würden Sie als Hauptgericht empfehlen?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 193, "word": "Dessert", "translation": "Nachtisch", "pronunciation": "/dɪˈzɜːt/", "wordType": "Nomen", "definition": "A sweet dish eaten at the end of a meal.", "examples": ["Would you like to see the dessert menu?", "We were too full to order any dessert."], "exampleDE": "Möchten Sie die Dessertkarte sehen?", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 194, "word": "Bill", "translation": "Rechnung", "pronunciation": "/bɪl/", "wordType": "Nomen", "definition": "A piece of paper showing how much you owe for a meal.", "examples": ["Could we have the bill, please?", "He quietly paid the bill before anyone noticed."], "exampleDE": "Könnten wir bitte die Rechnung haben?", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 195, "word": "Tip", "translation": "Trinkgeld", "pronunciation": "/tɪp/", "wordType": "Nomen", "definition": "Extra money given to thank someone for good service.", "examples": ["We left a generous tip because the service was excellent.", "In some countries a tip is already included in the bill."], "exampleDE": "Wir gaben ein großzügiges Trinkgeld, weil der Service ausgezeichnet war.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 196, "word": "Waiter", "translation": "Kellner", "pronunciation": "/ˈweɪtə/", "wordType": "Nomen", "definition": "A person who serves food and drinks in a restaurant.", "examples": ["The waiter brought us some water and fresh bread.", "Our waiter was friendly and spoke a little German."], "exampleDE": "Der Kellner brachte uns Wasser und frisches Brot.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 197, "word": "to order", "translation": "bestellen", "pronunciation": "/ˈɔːdə/", "wordType": "Verb", "definition": "To ask for food or drink in a restaurant.", "examples": ["Are you ready to order, or do you need a few minutes?", "I ordered the fish, but my friend chose the steak."], "exampleDE": "Möchten Sie bestellen, oder brauchen Sie noch ein paar Minuten?", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 198, "word": "Beverage", "translation": "Getränk", "pronunciation": "/ˈbevərɪdʒ/", "wordType": "Nomen", "definition": "A drink, especially one other than water.", "examples": ["Hot beverages are served all day at the café.", "Would you like a beverage with your meal?"], "exampleDE": "Im Café werden den ganzen Tag über Heißgetränke serviert.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 199, "word": "Recommendation", "translation": "Empfehlung", "pronunciation": "/ˌrekəmenˈdeɪʃn/", "wordType": "Nomen", "definition": "A suggestion that something is good or worth trying.", "examples": ["On the waiter's recommendation, we tried the local fish.", "Do you have any recommendations for a good restaurant nearby?"], "exampleDE": "Auf Empfehlung des Kellners probierten wir den heimischen Fisch.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 200, "word": "Vegetarian", "translation": "vegetarisch", "pronunciation": "/ˌvedʒəˈteəriən/", "wordType": "Adjektiv", "definition": "Containing no meat or fish.", "examples": ["Do you have any vegetarian dishes on the menu?", "She has been vegetarian for almost ten years."], "exampleDE": "Haben Sie vegetarische Gerichte auf der Speisekarte?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 201, "word": "Allergy", "translation": "Allergie", "pronunciation": "/ˈælədʒi/", "wordType": "Nomen", "definition": "A medical condition that makes you react badly to something.", "examples": ["Please tell the waiter about any food allergy you have.", "His nut allergy means he has to check every dish."], "exampleDE": "Bitte teilen Sie dem Kellner mit, ob Sie eine Lebensmittelallergie haben.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 202, "word": "Receipt", "translation": "Quittung", "pronunciation": "/rɪˈsiːt/", "wordType": "Nomen", "definition": "A paper proving that you have paid for something.", "examples": ["Keep the receipt in case you want a refund.", "Could I have a receipt for my expenses, please?"], "exampleDE": "Bewahren Sie die Quittung auf, falls Sie eine Rückerstattung möchten.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 203, "word": "Cuisine", "translation": "Küche", "pronunciation": "/kwɪˈziːn/", "wordType": "Nomen", "definition": "A style of cooking typical of a country or region.", "examples": ["We came here to taste the local cuisine.", "Italian cuisine is famous all over the world."], "exampleDE": "Wir sind hierhergekommen, um die regionale Küche zu probieren.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 204, "word": "to split the bill", "translation": "die Rechnung teilen", "pronunciation": "/splɪt ðə bɪl/", "wordType": "Phrase", "definition": "To divide the cost of a meal between people.", "examples": ["Shall we split the bill evenly between the four of us?", "They decided to split the bill rather than work out each share."], "exampleDE": "Sollen wir die Rechnung gleichmäßig zwischen uns vieren teilen?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 205, "word": "Specialty", "translation": "Spezialität", "pronunciation": "/ˈspeʃəlti/", "wordType": "Nomen", "definition": "A dish a restaurant or region is especially known for.", "examples": ["Grilled octopus is the specialty of this restaurant.", "Try the regional specialty — it's only made here."], "exampleDE": "Gegrillter Oktopus ist die Spezialität dieses Restaurants.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 206, "word": "Booking", "translation": "Buchung", "pronunciation": "/ˈbʊkɪŋ/", "wordType": "Nomen", "definition": "An arrangement to use or have something at a later time.", "examples": ["I made a booking for three nights online.", "Our booking was confirmed by email within minutes."], "exampleDE": "Ich habe online eine Buchung für drei Nächte vorgenommen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 207, "word": "Course", "translation": "Gang", "pronunciation": "/kɔːs/", "wordType": "Nomen", "definition": "One separate part of a meal served at a time.", "examples": ["The set menu has four courses for a fixed price.", "We took our time and enjoyed every course."], "exampleDE": "Das Menü hat vier Gänge zu einem Festpreis.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 208, "word": "to check in", "translation": "einchecken", "pronunciation": "/tʃek ɪn/", "wordType": "Verb", "definition": "To register on arrival at a hotel or airport.", "examples": ["We can check in at the hotel after three o'clock.", "Please check in at least two hours before your flight."], "exampleDE": "Wir können nach drei Uhr im Hotel einchecken.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 209, "word": "to check out", "translation": "auschecken", "pronunciation": "/tʃek aʊt/", "wordType": "Verb", "definition": "To pay and leave a hotel at the end of your stay.", "examples": ["We have to check out before eleven in the morning.", "She checked out early to catch the first train."], "exampleDE": "Wir müssen vor elf Uhr morgens auschecken.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 210, "word": "Reception", "translation": "Rezeption", "pronunciation": "/rɪˈsepʃn/", "wordType": "Nomen", "definition": "The area in a hotel where guests arrive and get help.", "examples": ["Leave your key at reception when you go out.", "The reception is open twenty-four hours a day."], "exampleDE": "Geben Sie Ihren Schlüssel an der Rezeption ab, wenn Sie ausgehen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 211, "word": "Receptionist", "translation": "Empfangsmitarbeiter", "pronunciation": "/rɪˈsepʃənɪst/", "wordType": "Nomen", "definition": "A person who greets and helps guests at a hotel.", "examples": ["The receptionist gave us a map of the old town.", "Ask the receptionist if breakfast is included."], "exampleDE": "Der Empfangsmitarbeiter gab uns einen Stadtplan der Altstadt.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 212, "word": "to book", "translation": "buchen", "pronunciation": "/bʊk/", "wordType": "Verb", "definition": "To arrange to have or use something later.", "examples": ["We booked a room with a sea view.", "You can book the tour directly on their website."], "exampleDE": "Wir haben ein Zimmer mit Meerblick gebucht.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 213, "word": "Vacancy", "translation": "freies Zimmer", "pronunciation": "/ˈveɪkənsi/", "wordType": "Nomen", "definition": "A room that is available in a hotel.", "examples": ["The sign outside the hotel said there were no vacancies.", "Luckily the hotel still had a vacancy for one night."], "exampleDE": "Das Schild draußen wies darauf hin, dass keine Zimmer mehr frei waren.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 214, "word": "Double room", "translation": "Doppelzimmer", "pronunciation": "/ˌdʌbl ˈruːm/", "wordType": "Nomen", "definition": "A hotel room with a bed for two people.", "examples": ["We'd like to book a double room for the weekend.", "The double room was small but very clean."], "exampleDE": "Wir möchten ein Doppelzimmer für das Wochenende buchen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 215, "word": "Single room", "translation": "Einzelzimmer", "pronunciation": "/ˌsɪŋɡl ˈruːm/", "wordType": "Nomen", "definition": "A hotel room with a bed for one person.", "examples": ["A single room is cheaper than a double.", "He always asks for a quiet single room."], "exampleDE": "Ein Einzelzimmer ist günstiger als ein Doppelzimmer.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 216, "word": "Luggage", "translation": "Gepäck", "pronunciation": "/ˈlʌɡɪdʒ/", "wordType": "Nomen", "definition": "The bags and cases you take when travelling.", "examples": ["Can I leave my luggage here until check-in?", "She packed all her luggage into one small suitcase."], "exampleDE": "Kann ich mein Gepäck bis zum Check-in hier lassen?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 217, "word": "Suitcase", "translation": "Koffer", "pronunciation": "/ˈsuːtkeɪs/", "wordType": "Nomen", "definition": "A large bag with a handle for carrying clothes when travelling.", "examples": ["My suitcase was too heavy, so I had to repack it.", "He dragged his suitcase up the stairs to the room."], "exampleDE": "Mein Koffer war zu schwer, also musste ich ihn neu packen.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 218, "word": "Backpack", "translation": "Rucksack", "pronunciation": "/ˈbækpæk/", "wordType": "Nomen", "definition": "A bag carried on your back, often used by travellers.", "examples": ["A backpack is easier to carry than a suitcase on the train.", "She kept her passport in the front pocket of her backpack."], "exampleDE": "Ein Rucksack lässt sich im Zug leichter tragen als ein Koffer.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 219, "word": "to unpack", "translation": "auspacken", "pronunciation": "/ʌnˈpæk/", "wordType": "Verb", "definition": "To take things out of a bag or case.", "examples": ["Let's unpack before we go and explore the town.", "He unpacked his clothes and hung them in the wardrobe."], "exampleDE": "Lass uns auspacken, bevor wir die Stadt erkunden gehen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 220, "word": "Wake-up call", "translation": "Weckruf", "pronunciation": "/ˈweɪk ʌp kɔːl/", "wordType": "Nomen", "definition": "A phone call from the hotel to wake you at a set time.", "examples": ["Could I have a wake-up call at six tomorrow?", "The wake-up call came right on time."], "exampleDE": "Könnte ich morgen um sechs Uhr einen Weckruf bekommen?", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 221, "word": "Deposit", "translation": "Kaution", "pronunciation": "/dɪˈpɒzɪt/", "wordType": "Nomen", "definition": "Money paid in advance that may be returned later.", "examples": ["The hotel asked for a small deposit at check-in.", "You'll get your deposit back when you return the key."], "exampleDE": "Das Hotel verlangte beim Check-in eine kleine Kaution.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 222, "word": "Lobby", "translation": "Lobby", "pronunciation": "/ˈlɒbi/", "wordType": "Nomen", "definition": "A large entrance hall in a hotel or public building.", "examples": ["Let's meet in the lobby at nine in the morning.", "The lobby had comfortable chairs and free coffee."], "exampleDE": "Treffen wir uns morgens um neun in der Lobby.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 223, "word": "Amenities", "translation": "Annehmlichkeiten", "pronunciation": "/əˈmiːnətiz/", "wordType": "Nomen", "definition": "Useful or pleasant features that make a place comfortable.", "examples": ["The hotel offers amenities such as a pool and a gym.", "Free Wi-Fi is one of the amenities we always look for."], "exampleDE": "Das Hotel bietet Annehmlichkeiten wie einen Pool und ein Fitnessstudio.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 224, "word": "Housekeeping", "translation": "Zimmerreinigung", "pronunciation": "/ˈhaʊskiːpɪŋ/", "wordType": "Nomen", "definition": "The hotel service that cleans the rooms.", "examples": ["Housekeeping comes to clean the room every morning.", "Hang the sign on the door if you don't want housekeeping."], "exampleDE": "Die Zimmerreinigung kommt jeden Morgen, um das Zimmer zu putzen.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 225, "word": "Floor", "translation": "Stockwerk", "pronunciation": "/flɔː/", "wordType": "Nomen", "definition": "A level of a building.", "examples": ["Our room is on the fourth floor with a great view.", "Take the lift to the top floor for the restaurant."], "exampleDE": "Unser Zimmer ist im vierten Stockwerk mit einer tollen Aussicht.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 226, "word": "View", "translation": "Aussicht", "pronunciation": "/vjuː/", "wordType": "Nomen", "definition": "What you can see from a particular place.", "examples": ["The room has a beautiful view over the harbour.", "We paid a little more for a room with a sea view."], "exampleDE": "Das Zimmer hat eine schöne Aussicht über den Hafen.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 227, "word": "Departure", "translation": "Abflug", "pronunciation": "/dɪˈpɑːtʃə/", "wordType": "Nomen", "definition": "The act of leaving, especially of a plane or train.", "examples": ["Our departure is delayed by half an hour.", "Check the board for the departure gate."], "exampleDE": "Unser Abflug verspätet sich um eine halbe Stunde.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 228, "word": "Arrival", "translation": "Ankunft", "pronunciation": "/əˈraɪvl/", "wordType": "Nomen", "definition": "The act of reaching a place.", "examples": ["Our arrival time is just after midnight.", "On arrival, please go straight to passport control."], "exampleDE": "Unsere Ankunftszeit ist kurz nach Mitternacht.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 229, "word": "Boarding pass", "translation": "Bordkarte", "pronunciation": "/ˈbɔːdɪŋ pɑːs/", "wordType": "Nomen", "definition": "A card that lets you get on a plane.", "examples": ["Have your boarding pass and passport ready.", "I saved my boarding pass on my phone."], "exampleDE": "Halten Sie Ihre Bordkarte und Ihren Reisepass bereit.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 230, "word": "Gate", "translation": "Flugsteig", "pronunciation": "/ɡeɪt/", "wordType": "Nomen", "definition": "The place in an airport where you get on a plane.", "examples": ["Our flight leaves from gate twelve.", "The gate has changed, so we have to hurry."], "exampleDE": "Unser Flug geht von Flugsteig zwölf ab.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 231, "word": "Delay", "translation": "Verspätung", "pronunciation": "/dɪˈleɪ/", "wordType": "Nomen", "definition": "A situation in which something happens later than planned.", "examples": ["There was a long delay because of the weather.", "We missed our connection due to the delay."], "exampleDE": "Wegen des Wetters gab es eine lange Verspätung.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 232, "word": "to board", "translation": "einsteigen", "pronunciation": "/bɔːd/", "wordType": "Verb", "definition": "To get on a plane, train, ship or bus.", "examples": ["Passengers can board the plane in ten minutes.", "We boarded the ferry just before it left."], "exampleDE": "Die Passagiere können in zehn Minuten in das Flugzeug einsteigen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 233, "word": "Platform", "translation": "Bahnsteig", "pronunciation": "/ˈplætfɔːm/", "wordType": "Nomen", "definition": "The area beside the track where you wait for a train.", "examples": ["The train to Rome leaves from platform three.", "We ran along the platform to catch our train."], "exampleDE": "Der Zug nach Rom fährt von Bahnsteig drei ab.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 234, "word": "Aisle seat", "translation": "Gangplatz", "pronunciation": "/ˈaɪl siːt/", "wordType": "Nomen", "definition": "A seat next to the passage on a plane or train.", "examples": ["I prefer an aisle seat so I can stretch my legs.", "She asked to change her aisle seat for a window seat."], "exampleDE": "Ich bevorzuge einen Gangplatz, damit ich meine Beine ausstrecken kann.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 235, "word": "Window seat", "translation": "Fensterplatz", "pronunciation": "/ˈwɪndəʊ siːt/", "wordType": "Nomen", "definition": "A seat next to the window on a plane or train.", "examples": ["The child wanted the window seat to watch the clouds.", "From my window seat I could see the whole coast."], "exampleDE": "Das Kind wollte den Fensterplatz, um die Wolken zu beobachten.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 236, "word": "Customs", "translation": "Zoll", "pronunciation": "/ˈkʌstəmz/", "wordType": "Nomen", "definition": "The place where officials check goods you bring into a country.", "examples": ["We had nothing to declare at customs.", "Customs officers checked our bags carefully."], "exampleDE": "Wir hatten am Zoll nichts zu verzollen.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 237, "word": "Passport", "translation": "Reisepass", "pronunciation": "/ˈpɑːspɔːt/", "wordType": "Nomen", "definition": "An official document that allows you to travel abroad.", "examples": ["Don't forget your passport — we leave at dawn.", "My passport expires next year, so I need a new one."], "exampleDE": "Vergiss deinen Reisepass nicht – wir fahren im Morgengrauen los.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 238, "word": "Visa", "translation": "Visum", "pronunciation": "/ˈviːzə/", "wordType": "Nomen", "definition": "An official mark allowing you to enter a country.", "examples": ["You need a visa to visit some countries.", "We applied for our visa three weeks before the trip."], "exampleDE": "Für manche Länder braucht man ein Visum.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 239, "word": "Itinerary", "translation": "Reiseplan", "pronunciation": "/aɪˈtɪnərəri/", "wordType": "Nomen", "definition": "A detailed plan of a journey.", "examples": ["Our itinerary includes three cities in five days.", "She emailed me the full itinerary for the tour."], "exampleDE": "Unser Reiseplan umfasst drei Städte in fünf Tagen.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 240, "word": "Connection", "translation": "Anschluss", "pronunciation": "/kəˈnekʃn/", "wordType": "Nomen", "definition": "A train, bus or flight that lets you continue a journey.", "examples": ["We have a tight connection in Frankfurt.", "If the first flight is late, we'll miss our connection."], "exampleDE": "Wir haben einen knappen Anschluss in Frankfurt.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 241, "word": "Round trip", "translation": "Hin- und Rückfahrt", "pronunciation": "/ˌraʊnd ˈtrɪp/", "wordType": "Nomen", "definition": "A journey to a place and back again.", "examples": ["A round trip is cheaper than two single tickets.", "The round trip to the island takes about two hours."], "exampleDE": "Eine Hin- und Rückfahrt ist günstiger als zwei Einzeltickets.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 242, "word": "to transfer", "translation": "umsteigen", "pronunciation": "/trænsˈfɜː/", "wordType": "Verb", "definition": "To change from one vehicle to another during a journey.", "examples": ["We have to transfer in London on the way home.", "Transfer to the blue line at the central station."], "exampleDE": "Auf dem Heimweg müssen wir in London umsteigen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 243, "word": "Fare", "translation": "Fahrpreis", "pronunciation": "/feə/", "wordType": "Nomen", "definition": "The money you pay for a journey.", "examples": ["The bus fare into town is only two euros.", "Children travel at half the normal fare."], "exampleDE": "Der Busfahrpreis in die Stadt beträgt nur zwei Euro.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 244, "word": "Timetable", "translation": "Fahrplan", "pronunciation": "/ˈtaɪmteɪbl/", "wordType": "Nomen", "definition": "A list of the times when buses or trains arrive and leave.", "examples": ["Check the timetable so we don't miss the last bus.", "According to the timetable, the next train is at noon."], "exampleDE": "Schau auf den Fahrplan, damit wir den letzten Bus nicht verpassen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 245, "word": "Shuttle", "translation": "Zubringer", "pronunciation": "/ˈʃʌtl/", "wordType": "Nomen", "definition": "A bus or train that travels often between two places.", "examples": ["A free shuttle runs from the airport to the hotel.", "We took the shuttle bus to the city centre."], "exampleDE": "Ein kostenloser Zubringer fährt vom Flughafen zum Hotel.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 246, "word": "to catch", "translation": "erwischen", "pronunciation": "/kætʃ/", "wordType": "Verb", "definition": "To get on a bus, train or plane before it leaves.", "examples": ["We need to hurry to catch the early train.", "I just managed to catch the last ferry."], "exampleDE": "Wir müssen uns beeilen, um den frühen Zug zu erwischen.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 247, "word": "to miss", "translation": "verpassen", "pronunciation": "/mɪs/", "wordType": "Verb", "definition": "To fail to get on a bus, train or plane in time.", "examples": ["If we don't leave now, we'll miss the flight.", "She missed her connection because of the delay."], "exampleDE": "Wenn wir jetzt nicht losgehen, verpassen wir den Flug.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 248, "word": "Rental car", "translation": "Mietwagen", "pronunciation": "/ˈrentl kɑː/", "wordType": "Nomen", "definition": "A car you pay to use for a period of time.", "examples": ["We picked up our rental car at the airport.", "The rental car came with a full tank of fuel."], "exampleDE": "Wir holten unseren Mietwagen am Flughafen ab.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 249, "word": "Tour guide", "translation": "Reiseführer", "pronunciation": "/ˈtʊə ɡaɪd/", "wordType": "Nomen", "definition": "A person who shows tourists around a place.", "examples": ["Our tour guide knew the history of every building.", "Ask the tour guide if we have time for photos."], "exampleDE": "Unser Reiseführer kannte die Geschichte jedes Gebäudes.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 250, "word": "Guided tour", "translation": "Führung", "pronunciation": "/ˌɡaɪdɪd ˈtʊə/", "wordType": "Nomen", "definition": "An organised visit led by a guide.", "examples": ["We joined a guided tour of the old castle.", "The guided tour lasts about ninety minutes."], "exampleDE": "Wir nahmen an einer Führung durch das alte Schloss teil.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 251, "word": "Landmark", "translation": "Wahrzeichen", "pronunciation": "/ˈlændmɑːk/", "wordType": "Nomen", "definition": "A famous building or feature that is easy to recognise.", "examples": ["The tower is the most famous landmark in the city.", "We used the cathedral as a landmark to find our way."], "exampleDE": "Der Turm ist das berühmteste Wahrzeichen der Stadt.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 252, "word": "Sightseeing", "translation": "Besichtigung", "pronunciation": "/ˈsaɪtsiːɪŋ/", "wordType": "Nomen", "definition": "The activity of visiting interesting places as a tourist.", "examples": ["We spent the morning sightseeing in the old town.", "After a day of sightseeing, my feet were aching."], "exampleDE": "Wir verbrachten den Vormittag mit der Besichtigung der Altstadt.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 253, "word": "Souvenir", "translation": "Andenken", "pronunciation": "/ˌsuːvəˈnɪə/", "wordType": "Nomen", "definition": "An object you buy to remember a place or trip.", "examples": ["She bought a small souvenir for each of her friends.", "This magnet is a cheap souvenir from our holiday."], "exampleDE": "Sie kaufte für jede ihrer Freundinnen ein kleines Andenken.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 254, "word": "Admission", "translation": "Eintritt", "pronunciation": "/ədˈmɪʃn/", "wordType": "Nomen", "definition": "The money you pay to enter a place.", "examples": ["Admission to the museum is free on Sundays.", "The admission fee includes an audio guide."], "exampleDE": "Der Eintritt ins Museum ist sonntags frei.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 255, "word": "Brochure", "translation": "Broschüre", "pronunciation": "/ˈbrəʊʃə/", "wordType": "Nomen", "definition": "A small magazine with pictures and information.", "examples": ["I picked up a brochure about the local sights.", "The brochure lists all the opening times."], "exampleDE": "Ich nahm eine Broschüre über die örtlichen Sehenswürdigkeiten mit.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 256, "word": "Currency", "translation": "Währung", "pronunciation": "/ˈkʌrənsi/", "wordType": "Nomen", "definition": "The system of money used in a particular country.", "examples": ["What is the local currency in this country?", "We changed some currency before leaving home."], "exampleDE": "Was ist die Landeswährung in diesem Land?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 257, "word": "Exchange rate", "translation": "Wechselkurs", "pronunciation": "/ɪksˈtʃeɪndʒ reɪt/", "wordType": "Nomen", "definition": "How much one currency is worth in another.", "examples": ["The exchange rate is good for tourists this year.", "Check the exchange rate before you change money."], "exampleDE": "Der Wechselkurs ist dieses Jahr gut für Touristen.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 258, "word": "to exchange", "translation": "umtauschen", "pronunciation": "/ɪksˈtʃeɪndʒ/", "wordType": "Verb", "definition": "To change money from one currency into another.", "examples": ["Where can I exchange euros for dollars?", "We exchanged our cash at the bank, not the airport."], "exampleDE": "Wo kann ich Euro in Dollar umtauschen?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 259, "word": "Crowd", "translation": "Menschenmenge", "pronunciation": "/kraʊd/", "wordType": "Nomen", "definition": "A large number of people in one place.", "examples": ["A huge crowd gathered to watch the parade.", "We lost each other in the crowd at the market."], "exampleDE": "Eine riesige Menschenmenge versammelte sich, um die Parade zu sehen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 260, "word": "Viewpoint", "translation": "Aussichtspunkt", "pronunciation": "/ˈvjuːpɔɪnt/", "wordType": "Nomen", "definition": "A place from which you get a good view.", "examples": ["From the viewpoint you can see the whole valley.", "We hiked up to a viewpoint to watch the sunset."], "exampleDE": "Vom Aussichtspunkt aus kann man das ganze Tal sehen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 261, "word": "Local", "translation": "Einheimischer", "pronunciation": "/ˈləʊkl/", "wordType": "Nomen", "definition": "A person who lives in a particular place.", "examples": ["The locals were friendly and gave us good tips.", "Eat where the locals eat to find the best food."], "exampleDE": "Die Einheimischen waren freundlich und gaben uns gute Tipps.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 262, "word": "Detour", "translation": "Umweg", "pronunciation": "/ˈdiːtʊə/", "wordType": "Nomen", "definition": "A longer route taken instead of the usual one.", "examples": ["We made a short detour to see the waterfall.", "A detour added an hour to our journey."], "exampleDE": "Wir machten einen kurzen Umweg, um den Wasserfall zu sehen.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 263, "word": "Highlight", "translation": "Höhepunkt", "pronunciation": "/ˈhaɪlaɪt/", "wordType": "Nomen", "definition": "The best or most enjoyable part of something.", "examples": ["The boat trip was the highlight of our holiday.", "For me, the highlight was the old market square."], "exampleDE": "Die Bootsfahrt war der Höhepunkt unseres Urlaubs.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 264, "word": "to explore", "translation": "erkunden", "pronunciation": "/ɪkˈsplɔː/", "wordType": "Verb", "definition": "To travel around a place to discover what it is like.", "examples": ["We spent the afternoon exploring the narrow streets.", "Let's explore the coast before the rain comes."], "exampleDE": "Wir verbrachten den Nachmittag damit, die engen Gassen zu erkunden.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 265, "word": "Excursion", "translation": "Ausflug", "pronunciation": "/ɪkˈskɜːʃn/", "wordType": "Nomen", "definition": "A short trip made for pleasure.", "examples": ["We booked a day excursion to the nearby islands.", "The hotel offers excursions to the mountains."], "exampleDE": "Wir buchten einen Tagesausflug zu den nahe gelegenen Inseln.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 266, "word": "Heritage", "translation": "Kulturerbe", "pronunciation": "/ˈherɪtɪdʒ/", "wordType": "Nomen", "definition": "The history and traditions of a place or people.", "examples": ["The old town is part of the country's heritage.", "This site is protected as a world heritage location."], "exampleDE": "Die Altstadt ist Teil des Kulturerbes des Landes.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 267, "word": "Attraction", "translation": "Sehenswürdigkeit", "pronunciation": "/əˈtrækʃn/", "wordType": "Nomen", "definition": "A place that people visit for interest or pleasure.", "examples": ["The castle is the town's main attraction.", "Most attractions are within walking distance."], "exampleDE": "Das Schloss ist die Hauptsehenswürdigkeit der Stadt.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 268, "word": "Festival", "translation": "Fest", "pronunciation": "/ˈfestɪvl/", "wordType": "Nomen", "definition": "A special event or celebration, often held every year.", "examples": ["We arrived during a colourful street festival.", "The summer festival attracts visitors from all over."], "exampleDE": "Wir kamen während eines bunten Straßenfests an.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 269, "word": "Sunscreen", "translation": "Sonnencreme", "pronunciation": "/ˈsʌnskriːn/", "wordType": "Nomen", "definition": "A cream that protects your skin from the sun.", "examples": ["Don't forget to put on sunscreen at the beach.", "I packed a high-factor sunscreen for the trip."], "exampleDE": "Vergiss nicht, am Strand Sonnencreme aufzutragen.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 270, "word": "Sunburn", "translation": "Sonnenbrand", "pronunciation": "/ˈsʌnbɜːn/", "wordType": "Nomen", "definition": "Red, sore skin caused by too much sun.", "examples": ["He got a painful sunburn on the first day.", "Cover up to avoid sunburn around noon."], "exampleDE": "Er bekam am ersten Tag einen schmerzhaften Sonnenbrand.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 271, "word": "Swimsuit", "translation": "Badeanzug", "pronunciation": "/ˈswɪmsuːt/", "wordType": "Nomen", "definition": "A piece of clothing worn for swimming.", "examples": ["Pack your swimsuit — the hotel has a pool.", "She bought a new swimsuit for the holiday."], "exampleDE": "Pack deinen Badeanzug ein – das Hotel hat einen Pool.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 272, "word": "to sunbathe", "translation": "sonnenbaden", "pronunciation": "/ˈsʌnbeɪð/", "wordType": "Verb", "definition": "To sit or lie in the sun to enjoy its warmth.", "examples": ["They spent the afternoon sunbathing by the sea.", "I don't like to sunbathe for too long."], "exampleDE": "Sie verbrachten den Nachmittag damit, am Meer zu sonnenbaden.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 273, "word": "Pharmacy", "translation": "Apotheke", "pronunciation": "/ˈfɑːməsi/", "wordType": "Nomen", "definition": "A shop where you can buy medicines.", "examples": ["Is there a pharmacy near the hotel?", "The pharmacy gave me something for my headache."], "exampleDE": "Gibt es eine Apotheke in der Nähe des Hotels?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 274, "word": "Insurance", "translation": "Versicherung", "pronunciation": "/ɪnˈʃʊərəns/", "wordType": "Nomen", "definition": "An arrangement that protects you against loss or illness.", "examples": ["Make sure you have travel insurance before you go.", "The insurance covered the cost of the lost luggage."], "exampleDE": "Stelle sicher, dass du eine Reiseversicherung hast, bevor du fährst.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 275, "word": "Emergency", "translation": "Notfall", "pronunciation": "/ɪˈmɜːdʒənsi/", "wordType": "Nomen", "definition": "A serious situation that needs immediate action.", "examples": ["In an emergency, call this number for help.", "The hotel has a doctor on call for emergencies."], "exampleDE": "Rufen Sie im Notfall diese Nummer an, um Hilfe zu erhalten.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 276, "word": "Lost and found", "translation": "Fundbüro", "pronunciation": "/ˌlɒst ən ˈfaʊnd/", "wordType": "Nomen", "definition": "A place where lost items are kept until claimed.", "examples": ["I asked at the lost and found about my umbrella.", "She found her camera at the station's lost and found."], "exampleDE": "Ich fragte im Fundbüro nach meinem Regenschirm.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 277, "word": "Directions", "translation": "Wegbeschreibung", "pronunciation": "/dəˈrekʃnz/", "wordType": "Nomen", "definition": "Instructions on how to get to a place.", "examples": ["Could you give me directions to the old harbour?", "We asked a local for directions to the museum."], "exampleDE": "Könnten Sie mir den Weg zum alten Hafen beschreiben?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 278, "word": "to get lost", "translation": "sich verirren", "pronunciation": "/ɡet lɒst/", "wordType": "Phrase", "definition": "To no longer know where you are.", "examples": ["It's easy to get lost in these narrow streets.", "We got lost twice before finding the restaurant."], "exampleDE": "In diesen engen Gassen verirrt man sich leicht.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 279, "word": "nearby", "translation": "in der Nähe", "pronunciation": "/ˌnɪəˈbaɪ/", "wordType": "Adverb", "definition": "A short distance away.", "examples": ["Is there a supermarket nearby?", "We found a lovely café nearby for breakfast."], "exampleDE": "Gibt es einen Supermarkt in der Nähe?", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 280, "word": "crowded", "translation": "überfüllt", "pronunciation": "/ˈkraʊdɪd/", "wordType": "Adjektiv", "definition": "Full of people.", "examples": ["The beach was too crowded to find a free spot.", "We avoided the crowded main square at midday."], "exampleDE": "Der Strand war zu überfüllt, um einen freien Platz zu finden.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 281, "word": "affordable", "translation": "erschwinglich", "pronunciation": "/əˈfɔːdəbl/", "wordType": "Adjektiv", "definition": "Cheap enough that most people can pay for it.", "examples": ["We found an affordable hotel near the centre.", "The set menu is tasty and affordable."], "exampleDE": "Wir fanden ein erschwingliches Hotel in der Nähe des Zentrums.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 282, "word": "stunning", "translation": "atemberaubend", "pronunciation": "/ˈstʌnɪŋ/", "wordType": "Adjektiv", "definition": "Extremely beautiful or impressive.", "examples": ["The view from the cliff was absolutely stunning.", "We watched a stunning sunset over the bay."], "exampleDE": "Die Aussicht von der Klippe war absolut atemberaubend.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 283, "word": "to haggle", "translation": "feilschen", "pronunciation": "/ˈhæɡl/", "wordType": "Verb", "definition": "To argue in order to agree on a lower price.", "examples": ["At the market you are expected to haggle a little.", "He haggled with the seller and saved ten euros."], "exampleDE": "Auf dem Markt wird erwartet, dass man ein wenig feilscht.", "imageUrl": "", "difficulty": "B2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 284, "word": "Refund", "translation": "Rückerstattung", "pronunciation": "/ˈriːfʌnd/", "wordType": "Nomen", "definition": "Money given back to you, for example for a cancelled trip.", "examples": ["We asked for a refund when the tour was cancelled.", "The airline offered a full refund for the delay."], "exampleDE": "Wir baten um eine Rückerstattung, als die Tour abgesagt wurde.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 285, "word": "to recommend", "translation": "empfehlen", "pronunciation": "/ˌrekəˈmend/", "wordType": "Verb", "definition": "To suggest that something is good or worth trying.", "examples": ["Can you recommend a good place for dinner?", "I'd recommend visiting the market early in the morning."], "exampleDE": "Können Sie einen guten Ort zum Abendessen empfehlen?", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 286, "word": "to pack", "translation": "packen", "pronunciation": "/pæk/", "wordType": "Verb", "definition": "To put things into a bag or case for a journey.", "examples": ["I always pack light when I travel by plane.", "Did you pack the charger and the adapter?"], "exampleDE": "Ich packe immer leicht, wenn ich mit dem Flugzeug reise.", "imageUrl": "", "difficulty": "A2", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id": 287, "word": "Adapter", "translation": "Adapter", "pronunciation": "/əˈdæptə/", "wordType": "Nomen", "definition": "A device that lets you use a plug in a foreign socket.", "examples": ["Bring a travel adapter for your phone charger.", "I forgot my adapter and couldn't charge my laptop."], "exampleDE": "Bring einen Reiseadapter für dein Handyladegerät mit.", "imageUrl": "", "difficulty": "B1", "dateAdded": "2026-06-23", "notes": "", "category": "Reisen"},
  {"id":288,"word":"to indulge","translation":"sich hingeben","pronunciation":"/ɪnˈdʌldʒ/","wordType":"Verb","definition":"To allow oneself to enjoy something pleasurable, especially excessively.","examples":["I like to indulge in chocolate cake on weekends.","Parents should not indulge their children's every whim."],"exampleDE":"Ich gebe mich am Wochenende gerne Schokoladenkuchen hin.","imageUrl":"","difficulty":"B2","dateAdded":"2026-06-26","notes":"","category":"Allgemein"},
  {"id":289,"word":"Physiotherapist","translation":"Physiotherapeut","pronunciation":"/ˌfɪziəʊˈθerəpɪst/","wordType":"Nomen","definition":"A healthcare professional who treats injuries and movement problems through physical methods like exercise and massage.","examples":["The physiotherapist helped me recover from my knee injury.","She works as a physiotherapist at the local hospital."],"exampleDE":"Der Physiotherapeut half mir, mich von meiner Knieverletzung zu erholen.","imageUrl":"","difficulty":"B1","dateAdded":"2026-06-27","notes":"","category":"Allgemein"},
  {"id":290,"word":"no casualties","translation":"keine Opfer","pronunciation":"/nəʊ ˈkæʒuəltiz/","wordType":"Phrase","definition":"No people were killed or injured in an incident or accident.","examples":["The building collapsed, but fortunately there were no casualties.","The fire was quickly extinguished with no casualties reported."],"exampleDE":"Das Gebäude stürzte ein, aber glücklicherweise gab es keine Opfer.","imageUrl":"","difficulty":"B2","dateAdded":"2026-07-22","notes":"","category":"TV"},
  {"id":291,"word":"Manslaughter","translation":"Totschlag","pronunciation":"/ˈmænˌslɔːtər/","wordType":"Nomen","definition":"The unlawful killing of a person without intent or premeditation.","examples":["He was convicted of manslaughter after the accident.","The jury had to decide between murder and manslaughter."],"exampleDE":"Er wurde nach dem Unfall wegen Totschlags verurteilt.","imageUrl":"","difficulty":"C1","dateAdded":"2026-07-22","notes":"","category":"TV"},
  {"id":292,"word":"to lurk","translation":"lauern","pronunciation":"/lɜːrk/","wordType":"Verb","definition":"To wait hidden, ready to attack or appear suddenly.","examples":["A cat was lurking in the bushes.","Someone is lurking outside our house."],"exampleDE":"Eine Katze lauerte in den Büschen.","imageUrl":"","difficulty":"B2","dateAdded":"2026-07-26","notes":"","category":"Allgemein"},
  {"id":293,"word":"Wholesome","translation":"gesund, heilsam","pronunciation":"/ˈhoʊlsəm/","wordType":"Adjektiv","definition":"Good for your health or character; morally beneficial and pure.","examples":["She enjoys wholesome food like fresh vegetables and fruit.","The movie is wholesome entertainment for the whole family."],"exampleDE":"Sie genießt gesunde Nahrung wie frisches Gemüse und Obst.","imageUrl":"","difficulty":"B2","dateAdded":"2026-07-26","notes":"","category":"TV"},
  {"id":294,"word":"Ambush","translation":"Hinterhalt","pronunciation":"/ˈæmbʊʃ/","wordType":"Nomen","definition":"A surprise attack from a hidden position against an unsuspecting target.","examples":["The soldiers were caught in an ambush on the mountain road.","The rebels set up an ambush near the village entrance."],"exampleDE":"Die Soldaten gerieten auf der Bergstraße in einen Hinterhalt.","imageUrl":"","difficulty":"B2","dateAdded":"2026-08-30","notes":"","category":"TV"},
  {"id":295,"word":"retrieval mission","translation":"Bergungseinsatz","pronunciation":"/rɪˈtriːvəl ˈmɪʃən/","wordType":"Phrase","definition":"An operation to recover or bring back something or someone from a location.","examples":["The team went on a retrieval mission to recover the lost equipment.","The astronauts completed a successful retrieval mission in space."],"exampleDE":"Das Team startete einen Bergungseinsatz, um die verlorene Ausrüstung zu bergen.","imageUrl":"","difficulty":"B2","dateAdded":"2026-08-30","notes":"","category":"TV"}
];

const WIKI_TITLES = {
  'Ambush':'Ambush',
  'Physiotherapist':'Physical_therapy',
  // ── Reisen / Urlaub (2026-06-23) ──
  'Menu':'Menu',
  'Waiter':'Waiting_staff',
  'Receipt':'Receipt',
  'Reception':'Lobby_(room)',
  'Luggage':'Baggage',
  'Suitcase':'Suitcase',
  'Backpack':'Backpack',
  'Lobby':'Lobby_(room)',
  'Boarding pass':'Boarding_pass',
  'Platform':'Railway_platform',
  'Passport':'Passport',
  'Visa':'Travel_visa',
  'Tour guide':'Tour_guide',
  'Souvenir':'Gift_shop',
  'Sunscreen':'Sunscreen',
  'Sunburn':'Sunburn',
  'Swimsuit':'Swimsuit',
  'Pharmacy':'Pharmacy',
  'Adapter':'AC_adapter',
  'Ferris wheel':'Ferris_wheel',
  'Lighthouse':'Lighthouse',
  'Fridge':'Refrigerator','Refrigerator':'Refrigerator',
  'Coffee pot':'Coffeemaker','Cooker':'Kitchen_stove','Dishwasher':'Dishwasher',
  'Freezer':'Freezer','Kettle':'Kettle','Oven':'Oven','Stove':'Kitchen_stove',
  'Toaster':'Toaster','Washing machine':'Washing_machine','Grill':'Barbecue_grill',
  'Bottle opener':'Bottle_opener','Chopping board':'Cutting_board',
  'Colander':'Colander','Corkscrew':'Corkscrew','Frying pan':'Frying_pan',
  'Grater':'Grater','Cheese grater':'Grater','Juicer':'Juicer',
  'Kitchen foil':'Aluminium_foil','Kitchen scales':'Weighing_scale',
  'Ladle':'Ladle_(spoon)','Mixing bowl':'Bowl','Oven cloth':'Oven_glove',
  'Oven gloves':'Oven_glove','Rolling pin':'Rolling_pin',
  'Saucepan':'Cookware_and_bakeware','Scouring pad':'Scouring_pad',
  'Scourer':'Scouring_pad','Sieve':'Sieve','Tin opener':'Can_opener',
  'Tongs':'Tongs','Tray':'Tray','Whisk':'Whisk','Wooden spoon':'Wooden_spoon',
  'Knife':'Kitchen_knife','Fork':'Fork','Spoon':'Spoon',
  'Dessert spoon':'Spoon','Soup spoon':'Spoon','Tablespoon':'Tablespoon',
  'Teaspoon':'Teaspoon','Carving knife':'Kitchen_knife','Chopsticks':'Chopsticks',
  'Cup':'Cup','Bowl':'Bowl','Crockery':'Tableware','Glass':'Drinkware',
  'Jar':'Jar','Jug':'Pitcher_(container)','Mug':'Mug',
  'Plate':'Plate_(dishware)','Saucer':'Saucer','Sugar bowl':'Sugar_bowl',
  'Teapot':'Teapot','Wine glass':'Wine_glass','Bin':'Waste_container',
  'Cling film':'Plastic_wrap','Plastic wrap':'Plastic_wrap',
  'Cookery book':'Cookbook','Dishcloth':'Dishcloth',
  'Draining board':'Dish_drying_cabinet','Kitchen roll':'Paper_towel',
  'Plug':'Plug_(sanitation)','Tea towel':'Dish_towel','Shelf':'Shelf_(storage)','Sink':'Sink',
  'Tablecloth':'Tablecloth','Washing-up liquid':'Dishwashing_liquid',
  'Threshold':'Threshold_(architecture)','Serendipity':'Serendipity',
  'Breakthrough':'Innovation',
  /* ── P3-Ausbau (2026-08-01): konkrete Nomen ohne Bild-Eintrag ── */
  'Starter':'Appetizer','Main course':'Main_course','Dessert':'Dessert',
  'Bill':'Receipt','Tip':'Gratuity','Beverage':'Drink','Cuisine':'Cuisine',
  'Allergy':'Allergy','Receptionist':'Receptionist','Housekeeping':'Housekeeping',
  'Gate':'Gate_(airport)','Delay':'Flight_cancellation_and_delay',
  'Aisle seat':'Airline_seat','Window seat':'Airline_seat','Customs':'Customs',
  'Fare':'Ticket_(admission)','Timetable':'Public_transport_timetable','Shuttle':'Airport_bus',
  'Rental car':'Car_rental','Guided tour':'Tour_guide','Landmark':'Landmark',
  'Sightseeing':'Sightseeing','Admission':'Ticket_(admission)','Brochure':'Brochure',
  'Currency':'Banknote','Exchange rate':'Exchange_rate','Crowd':'Crowd',
  'Viewpoint':'Scenic_viewpoint','Detour':'Detour','Excursion':'Field_trip',
  'Heritage':'World_Heritage_Site','Attraction':'Tourist_attraction',
  'Festival':'Festival','Insurance':'Insurance','Emergency':'Emergency',
  'Lost and found':'Lost_and_found','Screenplay':'Screenwriting','Cliffhanger':'Cliffhanger'
};

const IMG_URLS = {
  'ambush':'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Embuscade_%28Guerre_de_Vend%C3%A9e%29_-_Evariste_Carpentier_%281%29-.jpg/330px-Embuscade_%28Guerre_de_Vend%C3%A9e%29_-_Evariste_Carpentier_%281%29-.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  'main course':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/330px-Wiener-Schnitzel02.jpg',
  'souvenir':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sterling_Pony%2C_Estes_Park_%282024%29-104A4561.jpg/330px-Sterling_Pony%2C_Estes_Park_%282024%29-104A4561.jpg',
  'jug':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ewer_and_basin_MET_DP362783_%28cropped%29.jpg/330px-Ewer_and_basin_MET_DP362783_%28cropped%29.jpg',
  'draining board':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Astiankuivauskaappi-20060227.jpg/330px-Astiankuivauskaappi-20060227.jpg',
  'plug':'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Gootsteenstop.png/330px-Gootsteenstop.png',
  'shelf':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Atifells_de_cuina_andalusins%2C_Museu_Arqueol%C3%B2gic_Municipal_d%27Alcoi.JPG/330px-Atifells_de_cuina_andalusins%2C_Museu_Arqueol%C3%B2gic_Municipal_d%27Alcoi.JPG',
  'bill':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/US-BEP-Receipt_for_currency_%2823_July_1915%29.jpg/330px-US-BEP-Receipt_for_currency_%2823_July_1915%29.jpg',
  'fare':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ticket_%28unseparated%29_Kurkino-Berchtesgaden.JPG/330px-Ticket_%28unseparated%29_Kurkino-Berchtesgaden.JPG',
  'currency':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Vereinigte_Ostindische_Compagnie_bond_-_Middelburg_-_Amsterdam_-_1622.jpg/330px-Vereinigte_Ostindische_Compagnie_bond_-_Middelburg_-_Amsterdam_-_1622.jpg',
  'excursion':'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2Bio_Field_Trip_Waiake.JPG/330px-2Bio_Field_Trip_Waiake.JPG',
  'screenplay':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Screenplaybw.jpg/330px-Screenplaybw.jpg',
  'visa':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Visa_usa.jpg/330px-Visa_usa.jpg',
  'tour guide':'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tour_Guide.jpg/330px-Tour_Guide.jpg',
  'sunscreen':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/330px-Sunscreen_on_back_under_normal_and_UV_light.jpg',
  'sunburn':'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Sunburn_Treatment_Practices.jpg/330px-Sunburn_Treatment_Practices.jpg',
  'swimsuit':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/BathingSuit1920s.jpg/330px-BathingSuit1920s.jpg',
  'pharmacy':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/PharmacistsMortar.svg/330px-PharmacistsMortar.svg.png',
  'adapter':'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Notebook-Computer-AC-Adapter.jpg/330px-Notebook-Computer-AC-Adapter.jpg',
  'lighthouse':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Aerial_photograph_60D_2012_05_13_8760_DxO_retusche.jpg/330px-Aerial_photograph_60D_2012_05_13_8760_DxO_retusche.jpg',
  'fridge':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Open_refrigerator_with_food_at_night.jpg/330px-Open_refrigerator_with_food_at_night.jpg',
  'refrigerator':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Open_refrigerator_with_food_at_night.jpg/330px-Open_refrigerator_with_food_at_night.jpg',
  'coffee pot':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Moka_Express_sideview.png/330px-Moka_Express_sideview.png',
  'cooker':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Iron_stove.jpg/330px-Iron_stove.jpg',
  'dishwasher':'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dishwasher_with_dishes.JPG/330px-Dishwasher_with_dishes.JPG',
  'kettle':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Bernadotte_Wasserkessel.jpg/330px-Bernadotte_Wasserkessel.jpg',
  'stove':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Iron_stove.jpg/330px-Iron_stove.jpg',
  'toaster':'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Consumer_Reports_-_Hamilton_Beach_Digital_toaster.tiff/lossless-page1-330px-Consumer_Reports_-_Hamilton_Beach_Digital_toaster.tiff.png',
  'washing machine':'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg/330px-LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg',
  'grill':'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Grilling.jpg/330px-Grilling.jpg',
  'bottle opener':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Kronkorken.gif/330px-Kronkorken.gif',
  'chopping board':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Chopping_Board.jpg/330px-Chopping_Board.jpg',
  'colander':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Ge%C3%ABmailleerd_vergiet_-_INDUS_V08877.jpg/330px-Ge%C3%ABmailleerd_vergiet_-_INDUS_V08877.jpg',
  'corkscrew':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Corkscrews_December_2014-1.jpg/330px-Corkscrews_December_2014-1.jpg',
  'frying pan':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Pfanne_%28Edelstahl%29.jpg/330px-Pfanne_%28Edelstahl%29.jpg',
  'grater':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Kuechenreibe_%28fcm%29.jpg/330px-Kuechenreibe_%28fcm%29.jpg',
  'cheese grater':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Kuechenreibe_%28fcm%29.jpg/330px-Kuechenreibe_%28fcm%29.jpg',
  'juicer':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Karottensaft.JPG/330px-Karottensaft.JPG',
  'kitchen foil':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Aluminio.jpg/330px-Aluminio.jpg',
  'kitchen scales':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Balance_%C3%A0_tabac_1850.JPG/330px-Balance_%C3%A0_tabac_1850.JPG',
  'ladle':'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Greek_-_Ladle_-_Walters_57909.jpg/330px-Greek_-_Ladle_-_Walters_57909.jpg',
  'mixing bowl':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/China%2C_Jiangxi_province%2C_Jingdezhen%2C_Ming_dynasty_%281368-1644%29%2C_Xuande_mark_-_Bowl_with_Decoration_of_the_%22Three_Friends%22_-_1953.631_-_Cleveland_Museum_of_Art.tif/lossy-page1-330px-thumbnail.tif.jpg',
  'oven cloth':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Oven_gloves_in_use.jpg/330px-Oven_gloves_in_use.jpg',
  'oven gloves':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Oven_gloves_in_use.jpg/330px-Oven_gloves_in_use.jpg',
  'saucepan':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pans_%28113563802%29.jpg/330px-Pans_%28113563802%29.jpg',
  'scouring pad':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/US_Navy_090502-A-3007S-082_Army_Cpl._Edmund_Hollub_of_the_807th_Medical_Command_volunteers_in_the_kitchen_on_board_the_hospital_ship_USNS_Comfort_%28T-AH_20%29.jpg/330px-US_Navy_090502-A-3007S-082_Army_Cpl._Edmund_Hollub_of_the_807th_Medical_Command_volunteers_in_the_kitchen_on_board_the_hospital_ship_USNS_Comfort_%28T-AH_20%29.jpg',
  'scourer':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/US_Navy_090502-A-3007S-082_Army_Cpl._Edmund_Hollub_of_the_807th_Medical_Command_volunteers_in_the_kitchen_on_board_the_hospital_ship_USNS_Comfort_%28T-AH_20%29.jpg/330px-US_Navy_090502-A-3007S-082_Army_Cpl._Edmund_Hollub_of_the_807th_Medical_Command_volunteers_in_the_kitchen_on_board_the_hospital_ship_USNS_Comfort_%28T-AH_20%29.jpg',
  'sieve':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Laboratory_sieves_BMK.jpg/330px-Laboratory_sieves_BMK.jpg',
  'tin opener':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kitchen-Modern-Can-Opener.jpg/330px-Kitchen-Modern-Can-Opener.jpg',
  'tongs':'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Kitchen-tongs.png/330px-Kitchen-tongs.png',
  'whisk':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Schneebesen1.JPG/330px-Schneebesen1.JPG',
  'wooden spoon':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cuiller_en_bois_-_%C3%A9chelle.jpg/330px-Cuiller_en_bois_-_%C3%A9chelle.jpg',
  'knife':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Cucina_012.jpg/330px-Cucina_012.jpg',
  'spoon':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Soup_Spoon.jpg/330px-Soup_Spoon.jpg',
  'dessert spoon':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Soup_Spoon.jpg/330px-Soup_Spoon.jpg',
  'soup spoon':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Soup_Spoon.jpg/330px-Soup_Spoon.jpg',
  'tablespoon':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Loeffel_03.JPG/330px-Loeffel_03.JPG',
  'teaspoon':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Loeffel_03.JPG/330px-Loeffel_03.JPG',
  'carving knife':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Cucina_012.jpg/330px-Cucina_012.jpg',
  'chopsticks':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Many-chopsticks.jpg/330px-Many-chopsticks.jpg',
  'cup':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Cup_and_Saucer_LACMA_47.35.6a-b_%281_of_3%29.jpg/330px-Cup_and_Saucer_LACMA_47.35.6a-b_%281_of_3%29.jpg',
  'bowl':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/China%2C_Jiangxi_province%2C_Jingdezhen%2C_Ming_dynasty_%281368-1644%29%2C_Xuande_mark_-_Bowl_with_Decoration_of_the_%22Three_Friends%22_-_1953.631_-_Cleveland_Museum_of_Art.tif/lossy-page1-330px-thumbnail.tif.jpg',
  'glass':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Drinkware.jpg/330px-Drinkware.jpg',
  'jar':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jar_of_yeast_extract.jpg/330px-Jar_of_yeast_extract.jpg',
  'mug':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Mug_of_Tea.JPG/330px-Mug_of_Tea.JPG',
  'plate':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Botanical_plate_with_spray_of_fruiting_Indian_Bean_Tree_MET_DP-1687-038_%28cropped%29.jpg/330px-Botanical_plate_with_spray_of_fruiting_Indian_Bean_Tree_MET_DP-1687-038_%28cropped%29.jpg',
  'saucer':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Cup_and_Saucer_LACMA_47.35.6a-b_%281_of_3%29.jpg/330px-Cup_and_Saucer_LACMA_47.35.6a-b_%281_of_3%29.jpg',
  'sugar bowl':'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/ATSF_Holloware_SugarBowl_Dscn0979_crop.jpg/330px-ATSF_Holloware_SugarBowl_Dscn0979_crop.jpg',
  'teapot':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Black_tea_pot_cropped.jpg/330px-Black_tea_pot_cropped.jpg',
  'wine glass':'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Twisted_stem_glass.JPG/330px-Twisted_stem_glass.JPG',
  'bin':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Waste_container_in_Japan.jpg/330px-Waste_container_in_Japan.jpg',
  'cling film':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Pvc-Film.jpg/330px-Pvc-Film.jpg',
  'plastic wrap':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Pvc-Film.jpg/330px-Pvc-Film.jpg',
  'cookery book':'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Eliza_Smith_The_Compleat_Housewife.jpg/330px-Eliza_Smith_The_Compleat_Housewife.jpg',
  'dishcloth':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Dishcloths.jpg/330px-Dishcloths.jpg',
  'kitchen roll':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Paper_towel.jpg/330px-Paper_towel.jpg',
  'tea towel':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Dishcloths.jpg/330px-Dishcloths.jpg',
  'sink':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Luxury_sink.jpg/330px-Luxury_sink.jpg',
  'washing-up liquid':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Afwasmiddel.jpg/330px-Afwasmiddel.jpg',
  'threshold':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/NMP_1780s_House_interior_Door_Sill.JPG/330px-NMP_1780s_House_interior_Door_Sill.JPG',
  'breakthrough':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edison_and_phonograph_edit2.jpg/330px-Edison_and_phonograph_edit2.jpg',
  'starter':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ringier_175_Jahre_Jubil%C3%A4um_%282499873203%29_%282%29.jpg/330px-Ringier_175_Jahre_Jubil%C3%A4um_%282499873203%29_%282%29.jpg',
  'dessert':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Desserts.jpg/330px-Desserts.jpg',
  'tip':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/20151007_174039-S.jpg/330px-20151007_174039-S.jpg',
  'cuisine':'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Espaguetis_carbonara.jpg/330px-Espaguetis_carbonara.jpg',
  'receptionist':'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Receptionists.jpg/330px-Receptionists.jpg',
  'housekeeping':'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/The_Girl_Guides_Association_in_Britain%2C_1914-1918_Q27921.jpg/330px-The_Girl_Guides_Association_in_Britain%2C_1914-1918_Q27921.jpg',
  'gate':'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Boeing_787-10_Dreamliner_G-ZBLE_at_Gate_B42%2C_Washington_Dulles_International_Airport%2C_31_January_2024.jpg/330px-Boeing_787-10_Dreamliner_G-ZBLE_at_Gate_B42%2C_Washington_Dulles_International_Airport%2C_31_January_2024.jpg',
  'delay':'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/HYD_board_2.jpg/330px-HYD_board_2.jpg',
  'aisle seat':'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/SSJ100_for_Interjet_-_Interiors_%289016257074%29.jpg/330px-SSJ100_for_Interjet_-_Interiors_%289016257074%29.jpg',
  'window seat':'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/SSJ100_for_Interjet_-_Interiors_%289016257074%29.jpg/330px-SSJ100_for_Interjet_-_Interiors_%289016257074%29.jpg',
  'timetable':'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/FahrplanTiefenbrunnen.JPG/330px-FahrplanTiefenbrunnen.JPG',
  'shuttle':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Skybus_Super_Shuttle_Optare_Solo_SR_M995_in_Melbourne.jpg/330px-Skybus_Super_Shuttle_Optare_Solo_SR_M995_in_Melbourne.jpg',
  'rental car':'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Enterprise_Rent-A-Car_in_South_Burlington%2C_Vermont.jpg/330px-Enterprise_Rent-A-Car_in_South_Burlington%2C_Vermont.jpg',
  'guided tour':'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tour_Guide.jpg/330px-Tour_Guide.jpg',
  'landmark':'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Hodges_cape-good-hope.jpg/330px-Hodges_cape-good-hope.jpg',
  'sightseeing':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/330px-New_york_times_square-terabass.jpg',
  'admission':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ticket_%28unseparated%29_Kurkino-Berchtesgaden.JPG/330px-Ticket_%28unseparated%29_Kurkino-Berchtesgaden.JPG',
  'brochure':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/%22Pastures_For_Habersham_County%22_brochures_by_S._C._Gunnels%2C_county_agent_-_DPLA_-_61e5c0f2980eaf4b457ddd178e0fce34.jpg/330px-%22Pastures_For_Habersham_County%22_brochures_by_S._C._Gunnels%2C_county_agent_-_DPLA_-_61e5c0f2980eaf4b457ddd178e0fce34.jpg',
  'exchange rate':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Money-Euro-USD-LEI_53073-480x360_%284791385567%29.jpg/330px-Money-Euro-USD-LEI_53073-480x360_%284791385567%29.jpg',
  'crowd':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Crowd_in_street.jpg/330px-Crowd_in_street.jpg',
  'viewpoint':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Scenic_View_1.jpg/330px-Scenic_View_1.jpg',
  'detour':'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/CR106WestboundDetour1.jpg/330px-CR106WestboundDetour1.jpg',
  'attraction':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/1_times_square_night_2013.jpg/330px-1_times_square_night_2013.jpg',
  'lost and found':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Bundesarchiv_Bild_183-M0125-421%2C_Fundb%C3%BCro_in_Berlin.jpg/330px-Bundesarchiv_Bild_183-M0125-421%2C_Fundb%C3%BCro_in_Berlin.jpg',
  'cliffhanger':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Perilsofpauline.jpg/330px-Perilsofpauline.jpg',
  'physiotherapist':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Physical_Therapists_at_work.jpg/330px-Physical_Therapists_at_work.jpg',
  'menu':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Menu_of_Fatto_a_Mano_Pizzeria%2C_North_Laine_%28desserts%29.jpg/330px-Menu_of_Fatto_a_Mano_Pizzeria%2C_North_Laine_%28desserts%29.jpg',
  'waiter':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Annie_O%27Black_1973.jpg/330px-Annie_O%27Black_1973.jpg',
  'receipt':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/US-BEP-Receipt_for_currency_%2823_July_1915%29.jpg/330px-US-BEP-Receipt_for_currency_%2823_July_1915%29.jpg',
  'reception':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Apartment_building_lobby.jpg/330px-Apartment_building_lobby.jpg',
  'luggage':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/20180520_Away_carryon_%281%29.jpg/330px-20180520_Away_carryon_%281%29.jpg',
  'suitcase':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Suitcase1.jpg/330px-Suitcase1.jpg',
  'backpack':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Rucksack1.jpg/330px-Rucksack1.jpg',
  'lobby':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Apartment_building_lobby.jpg/330px-Apartment_building_lobby.jpg',
  'boarding pass':'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/TS_boarding_pass_April_2000.jpg/330px-TS_boarding_pass_April_2000.jpg',
  'platform':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Warszawa_1963.jpg/330px-Warszawa_1963.jpg',
  'passport':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Passports-assorted.jpg/330px-Passports-assorted.jpg',
  'ferris wheel':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ain_Dubai_View.jpg/330px-Ain_Dubai_View.jpg',
  'freezer':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Open_refrigerator_with_food_at_night.jpg/330px-Open_refrigerator_with_food_at_night.jpg',
  'oven':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Four_%C3%A0_c%C3%A9ramique_-_Japan_Aur%C3%A9a_-_2011-0403-_P1070446.JPG/330px-Four_%C3%A0_c%C3%A9ramique_-_Japan_Aur%C3%A9a_-_2011-0403-_P1070446.JPG',
  'rolling pin':'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Chapaticooking.jpg/330px-Chapaticooking.jpg',
  'tray':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Brass_tray_inlaid_with_silver%2C_Egypt_or_Syria%2C_19th_century%2C_HAA_I.JPG/330px-Brass_tray_inlaid_with_silver%2C_Egypt_or_Syria%2C_19th_century%2C_HAA_I.JPG',
  'fork':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Assorted_forks.jpg/330px-Assorted_forks.jpg',
  'crockery':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Dining_table_laid_at_Chatsworth_House.jpg/330px-Dining_table_laid_at_Chatsworth_House.jpg',
  'tablecloth':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tablecloth_romanian_1full_view.jpg/330px-Tablecloth_romanian_1full_view.jpg',
  'serendipity':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Horace_Walpole.jpg/330px-Horace_Walpole.jpg',
  'beverage':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Glass_of_tea%2C_Yogyakarta.jpg/330px-Glass_of_tea%2C_Yogyakarta.jpg',
  'allergy':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hives2010.JPG/330px-Hives2010.JPG',
  'customs':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Netherlands_Customs_Douane_Schiphol_Airport.jpg/330px-Netherlands_Customs_Douane_Schiphol_Airport.jpg',
  'heritage':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/World_Heritage_Logo_global.svg/330px-World_Heritage_Logo_global.svg.png',
  'festival':'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Holi_Festival_of_Colors_Utah%2C_United_States_2013.jpg/330px-Holi_Festival_of_Colors_Utah%2C_United_States_2013.jpg',
  'insurance':'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Coast_review_%281910%29_%2814760820941%29.jpg/330px-Coast_review_%281910%29_%2814760820941%29.jpg',
  'emergency':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Woman_collapses_in_the_East_Village_of_New_York.jpg/330px-Woman_collapses_in_the_East_Village_of_New_York.jpg',
};
