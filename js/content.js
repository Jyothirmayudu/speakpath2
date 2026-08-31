/* ============================================================
   CONTENT: 4 levels, each with 7 concepts + a 7-question quiz.
   Every concept is checked against a real English-teaching
   resource (British Council LearnEnglish, BBC Learning English),
   linked as "source" below. Explanations are written fresh, not
   copied, then verified against these pages.
   ============================================================ */
const LEVELS = [
  {
    id: 1,
    title: "Foundations for Speaking",
    desc: "The everyday building blocks: greeting people, talking about facts and routines, describing things, and asking simple questions.",
    concepts: [
      {
        id: "l1c1",
        title: "Greetings & Introductions",
        explain: "Every conversation starts with a greeting. In spoken English, the greeting you choose depends on the time of day and how well you know the person. Keep it short and natural — you don't need a full sentence to say hello.",
        examples: [
          "Good morning! / Good afternoon! / Good evening! (formal or with strangers)",
          "Hi! / Hey! / Hey there! (casual, with friends or colleagues)",
          "Nice to meet you. — used the first time you meet someone",
          "I'm Jyo. / My name's Jyo. — introducing yourself",
        ],
        tip: "Spoken tip: native speakers often skip 'How are you?' as a real question — they just say it as part of the greeting and expect a quick 'Good, you?' in return, not a detailed answer.",
        source: { label: "British Council LearnEnglish — Small talk", url: "https://learnenglish.britishcouncil.org/free-resources/learning-hub/discussions/small-talk" }
      },
      {
        id: "l1c2",
        title: "Personal Pronouns & the Verb \"To Be\"",
        explain: "The verb 'to be' (am/is/are) is probably the single most-used verb in spoken English — you'll need it constantly for introductions, descriptions, and small talk, so it's worth mastering early.\n\nEach pronoun pairs with a specific form: I am, you are, he/she/it is, we are, they are. In real speech, these almost always contract: I'm, you're, he's, she's, it's, we're, they're — the full form ('I am fine') can even sound a little stiff or emphatic in casual conversation.\n\nThe negative simply adds 'not': I'm not, you aren't / you're not, he isn't / he's not. Both negative contractions are correct — pick whichever feels more natural to say.",
        examples: [
          "I'm a software engineer. / You're right about that.",
          "She's from Hyderabad. / They're on their way.",
          "I'm not sure. / He isn't ready yet.",
          "Is she coming today? / Are you free tomorrow?",
        ],
        tip: "Spoken tip: contractions aren't just casual shortcuts — using 'I'm' instead of 'I am' in daily conversation is what native speakers actually do most of the time. Practising the contracted forms out loud will make you sound more natural, not less correct.",
        source: { label: "British Council LearnEnglish — Present simple: 'to be'", url: "https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-simple-be" }
      },
      {
        id: "l1c3",
        title: "Simple Present Tense in Conversation",
        explain: "The simple present is used for more than you might think: facts and general truths ('Water boils at 100°C'), habits and routines ('I wake up at six'), permanent situations ('She lives in Pune'), scheduled or timetabled events ('The train leaves at 9 pm'), and even step-by-step instructions ('You turn left, then go straight').\n\nFormation is simple but has one small trap: for he/she/it, add -s or -es to the base verb (work → works, watch → watches, go → goes). For I/you/we/they, use the base verb with no change. Questions and negatives use the helper verb 'do' or 'does' — Do you work here? / She doesn't work here — and once 'does' appears, the main verb drops its -s (never 'She doesn't works').\n\nFrequency adverbs — always, usually, often, sometimes, rarely, never — usually sit before the main verb, but after the verb 'to be': 'I usually walk to work' but 'I am usually early.' Getting this placement right is one of the fastest ways to sound more fluent.\n\nThe -s ending itself has three different pronunciations depending on the sound before it: an /s/ sound after quiet consonants (works, sits), a /z/ sound after voiced sounds (goes, plays), and an extra /ɪz/ syllable after hissing sounds (watches, misses). Native speakers do this automatically without thinking — with practice, so will you.",
        examples: [
          "I go to the gym every morning. (habit)",
          "Water boils at 100 degrees. (fact)",
          "The train leaves at 9 pm sharp. (schedule)",
          "She usually arrives early, but today she's late. (frequency + exception)",
          "He doesn't drink coffee. / Do they live nearby? (negative & question)",
        ],
        tip: "Spoken tip: try saying these three endings out loud — 'works' (s sound), 'goes' (z sound), 'watches' (extra iz syllable). Feeling the difference in your mouth is often faster than memorising the rule.",
        source: { label: "British Council LearnEnglish — Present simple", url: "https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-simple" }
      },
      {
        id: "l1c4",
        title: "Numbers, Time & Everyday Vocabulary",
        explain: "Being able to say numbers and times quickly, without translating in your head, is one of the biggest confidence boosters in spoken English. Practise saying clock times, dates, and quantities out loud until they feel automatic.",
        examples: [
          "It's half past six. / It's six thirty.",
          "It's a quarter to nine. / It's eight forty-five.",
          "I have two meetings today and three tomorrow.",
          "See you on the fifteenth of March.",
        ],
        tip: "Spoken tip: say the time two ways ('half past six' and 'six thirty') until both come out equally easily — different speakers prefer different styles.",
        source: { label: "British Council LearnEnglish — Vocabulary", url: "https://learnenglish.britishcouncil.org/vocabulary" }
      },
      {
        id: "l1c5",
        title: "Family, Colours & Everyday Objects",
        explain: "Being able to describe the people and objects around you without pausing to translate is a huge confidence boost. Family words, colours, and common household or office items come up constantly in everyday conversation — in small talk, introductions, and casual descriptions.\n\nA few family words are easy to mix up: 'uncle' and 'aunt' don't distinguish between mother's or father's side the way some languages do, and 'cousin' is used for both male and female cousins, of any age relative to you.",
        examples: [
          "This is my brother, and that's my sister-in-law.",
          "My uncle works in Bangalore.",
          "I like the blue one better than the red one.",
          "Can you pass me that pen on the table?",
        ],
        tip: "Spoken tip: describing objects by colour and position ('the blue folder on the left') is one of the most common everyday speaking tasks — practise it with things around your desk or home.",
        source: { label: "British Council LearnEnglish — Vocabulary", url: "https://learnenglish.britishcouncil.org/vocabulary" }
      },
      {
        id: "l1c6",
        title: "Asking Simple Questions",
        explain: "There are two main question types: Yes/No questions (answered with yes or no) and Wh-questions (asking for information, starting with what, where, when, who, why, how). Getting the word order right matters more in speech than people think, because listeners rely on it to know a question is coming.",
        examples: [
          "Do you live near here? (Yes/No question)",
          "Where do you live? (Wh-question)",
          "What time does the meeting start?",
          "Why did you choose that one?",
        ],
        tip: "Spoken tip: your voice usually rises at the end of a Yes/No question, and falls at the end of a Wh-question. Try both out loud — you'll hear the difference.",
        source: { label: "British Council LearnEnglish — Question words", url: "https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/question-words" }
      },
      {
        id: "l1c7",
        title: "Pronunciation Basics: Word Stress & Rhythm",
        explain: "English is a 'stress-timed' language — some syllables are stressed (said longer, louder, clearer) and others are quickly reduced, almost swallowed. This is very different from languages where every syllable gets roughly equal weight, and it's one of the biggest reasons learners feel they're not understood even when their grammar is correct.\n\nIn longer words, one syllable always carries the main stress: PHOtograph, phoTOGraphy, photoGRAPHic — notice how the stress moves as the word changes form. In two-syllable noun/verb pairs, stress often shifts too: PREsent (a gift) vs preSENT (to give); REcord (noun) vs reCORD (verb).\n\nGetting every single sound perfect matters far less than hitting the right stressed syllable — native listeners rely on stress patterns to recognise words quickly in fast speech.",
        examples: [
          "reCORD (verb: to record a video) vs REcord (noun: a music record)",
          "I'll inTROduce you to the team. (stress on TRO)",
          "comFORtable is often said quickly as 'COMFtable' in casual speech",
          "Can you conFIRM the booking? (stress on FIRM)",
        ],
        tip: "Spoken tip: when learning a new word, always check (and say aloud) which syllable is stressed — a dictionary's pronunciation guide usually marks it. This single habit improves how clearly you're understood more than almost anything else.",
        source: { label: "BBC Learning English — The Pronunciation Lounge", url: "https://www.bbc.co.uk/learningenglish/features/the_pronunciation_lounge" }
      },
    ],
    quiz: [
      {q:"Which greeting fits a casual chat with a friend?", opts:["Good evening, madam.","Hey! How's it going?","To whom it may concern.","Kindly be informed."], a:1,
        explain:"'Hey! How's it going?' is casual and friendly — perfect for a friend. The other options are overly formal or oddly phrased for everyday conversation."},
      {q:"Choose the correct sentence.", opts:["She are happy.","She is happy.","She be happy.","She am happy."], a:1,
        explain:"'She' takes 'is' — the verb 'to be' changes form with each pronoun: I am, you/we/they are, he/she/it is."},
      {q:"Choose the correct sentence.", opts:["She work in Chennai.","She working in Chennai.","She works in Chennai.","She to work in Chennai."], a:2,
        explain:"For he/she/it, the simple present verb takes an -s ending: work → works. 'Work', 'working' (without is), and 'to work' are all incorrect here."},
      {q:"How do you say 8:45 another way?", opts:["Quarter past eight","Quarter to nine","Half past eight","Eight and quarter"], a:1,
        explain:"8:45 can be said as 'eight forty-five' or 'a quarter to nine' — both mean fifteen minutes before nine o'clock."},
      {q:"Which word correctly completes: 'My ___ is a doctor.' (your parent's brother)", opts:["uncle","aunt","cousin","nephew"], a:0,
        explain:"'Uncle' refers to your parent's brother (or a similarly close male relative by marriage). 'Aunt' is the female equivalent, 'cousin' is your aunt or uncle's child, and 'nephew' is your sibling's son."},
      {q:"Which is a Wh-question?", opts:["Do you like tea?","Where is the station?","Is he coming?","Can you help?"], a:1,
        explain:"'Where is the station?' asks for information using the question word 'where', making it a Wh-question. The others are Yes/No questions, answerable with a simple yes or no."},
      {q:"In 'PREsent' (a gift) vs 'preSENT' (to give), what actually changes?", opts:["The spelling","Which syllable is stressed","The number of syllables","Nothing changes"], a:1,
        explain:"English has many two-syllable words where stress shifts between the noun and verb forms — PREsent (noun) vs preSENT (verb). Getting the stress right changes the meaning and makes you easier to understand."},
    ]
  },
  {
    id: 2,
    title: "Everyday Conversations",
    desc: "Move from facts to stories: talk about the past and present, make small talk, share preferences, ask politely, and give directions.",
    concepts: [
      {
        id: "l2c1",
        title: "Past Tense for Telling Stories",
        explain: "The simple past is how we talk about anything finished — yesterday, last week, or years ago. Regular verbs just add '-ed', but many common verbs are irregular and have to be learned by ear, not by rule.",
        examples: [
          "I watched a movie last night. (regular verb)",
          "We went to the market and bought some vegetables. (irregular verbs)",
          "She didn't call me back. (negative uses didn't + base verb)",
          "Did you enjoy the trip? (question uses Did)",
        ],
        tip: "Spoken tip: irregular past tense verbs (went, ate, saw, bought) are some of the most common words in spoken English — hearing them often in shows or podcasts helps them stick faster than memorising lists.",
        source: { label: "British Council LearnEnglish — Past simple", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple" }
      },
      {
        id: "l2c2",
        title: "Present Continuous for Actions Happening Now",
        explain: "The present continuous (am/is/are + verb-ing) describes actions happening right now, or temporary situations around the present time — as opposed to the simple present's habits and facts.\n\nIt's also commonly used for fixed future arrangements ('I'm meeting her tomorrow') and for describing a trend or changing situation ('Prices are rising').\n\nA frequent spoken mix-up: 'I work here' (a permanent fact) vs 'I'm working on a report right now' (a temporary, in-progress action). Choosing the wrong one can confuse the listener about whether something is a routine or a one-time happening.",
        examples: [
          "What are you doing? — I'm just checking my emails.",
          "She's studying for an exam this week. (temporary)",
          "I'm meeting a client at 3 pm. (fixed future plan)",
          "Things are getting better slowly. (a changing trend)",
        ],
        tip: "Spoken tip: verbs like 'know', 'like', 'want', and 'believe' (called stative verbs) usually aren't used in the continuous form — say 'I know the answer', not 'I'm knowing the answer'.",
        source: { label: "British Council LearnEnglish — Present continuous", url: "https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/present-continuous" }
      },
      {
        id: "l2c3",
        title: "Daily Routine & Small Talk",
        explain: "Small talk is the light, friendly conversation that fills gaps — before a meeting starts, in a lift, or while waiting. It's not about deep topics; it's about being warm and easy to talk to.",
        examples: [
          "How was your weekend?",
          "Busy day today, isn't it?",
          "Did you catch the match last night?",
          "It's been really hot this week, hasn't it?",
        ],
        tip: "Spoken tip: small talk questions often end with a short tag like 'isn't it?' or 'hasn't it?' — this invites the other person to agree and keep the conversation going.",
        source: { label: "British Council LearnEnglish — Small talk", url: "https://learnenglish.britishcouncil.org/free-resources/learning-hub/discussions/small-talk" }
      },
      {
        id: "l2c4",
        title: "Talking About Likes and Dislikes",
        explain: "Talking naturally about preferences is one of the most common things you'll do in conversation — from small talk about food to discussing hobbies. English has a small set of verbs that go from strong dislike to strong liking, and they're almost always followed by a verb in the -ing form (not the infinitive) when talking generally.\n\nBe careful with 'would like', which is different from 'like' — 'I like coffee' states a general preference, while 'I'd like a coffee' is a polite way of ordering or requesting one right now.",
        examples: [
          "I love travelling to new places.",
          "I really enjoy reading before bed.",
          "I don't mind waiting, it's fine.",
          "I can't stand loud noises early in the morning.",
          "I'd like a cup of tea, please. (a request, not a general preference)",
        ],
        tip: "Spoken tip: 'I'd like...' is one of the most useful polite phrases in English — it works for ordering food, asking for something, or making a request, all in one simple structure.",
        source: { label: "British Council LearnEnglish — Grammar", url: "https://learnenglish.britishcouncil.org/grammar" }
      },
      {
        id: "l2c5",
        title: "Making Polite Requests",
        explain: "In English, being direct can sound rude even when you don't mean it to. Softer phrasing makes the same request sound more polite, especially with people you don't know well.",
        examples: [
          "Could you pass the salt, please?",
          "Would you mind closing the window?",
          "Do you think you could send that file today?",
          "I was wondering if you could help me with this.",
        ],
        tip: "Spoken tip: softer phrases like 'Would you mind...' are usually said with a gentle, slightly rising tone — a flat, fast delivery can undo the politeness.",
        source: { label: "British Council LearnEnglish — Requests, offers and invitations", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/requests-offers-invitations" }
      },
      {
        id: "l2c6",
        title: "Common Phrases & Conversation Fillers",
        explain: "Fillers and discourse markers — words like 'well', 'you know', 'I mean', 'actually', 'so' — don't add grammatical meaning, but they're essential for natural spoken English. They give you a moment to think, soften a statement, or signal that you're about to explain or correct something.\n\nUsing a few naturally (not too many) makes your speech sound less rehearsed and more like real conversation, rather than a memorised script.",
        examples: [
          "Well, I think we should wait and see.",
          "It's, you know, a bit complicated to explain.",
          "I mean, it could work, but I'm not fully sure.",
          "Actually, I think there's a better way to do this.",
          "So, what do you think we should do next?",
        ],
        tip: "Spoken tip: 'actually' in English is often used to politely correct or add unexpected information ('Actually, I think it's Tuesday, not Monday') — it doesn't just mean 'currently'.",
        source: { label: "British Council LearnEnglish — Keeping a conversation going", url: "https://learnenglish.britishcouncil.org/sites/podcasts/files/LearnEnglish-Speaking-B1-Keeping-a-conversation-going.pdf" }
      },
      {
        id: "l2c7",
        title: "Asking for and Giving Directions",
        explain: "Directions rely heavily on prepositions of place and a small set of fixed phrases. Once you know these building blocks, you can describe almost any route.",
        examples: [
          "Excuse me, how do I get to the station?",
          "Go straight ahead and turn left at the signal.",
          "It's just past the bakery, on your right.",
          "It's about a five-minute walk from here.",
        ],
        tip: "Spoken tip: 'Excuse me' is the standard, polite way to interrupt a stranger to ask something — say it, pause briefly, then ask your question.",
        source: { label: "British Council LearnEnglish — Prepositions of place", url: "https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/prepositions-place" }
      },
    ],
    quiz: [
      {q:"Choose the correct past tense sentence.", opts:["I go to the market yesterday.","I goed to the market yesterday.","I went to the market yesterday.","I going to the market yesterday."], a:2,
        explain:"'Go' is irregular — its past tense is 'went', not 'goed'. Irregular verbs like this have to be memorised individually since they don't follow the regular -ed pattern."},
      {q:"Which sentence describes something happening right now?", opts:["I work in an office.","I'm working on a report right now.","I worked on a report yesterday.","I will work on a report."], a:1,
        explain:"The present continuous (am/is/are + -ing) describes an action in progress at this moment — 'I'm working on it right now' — while the simple present describes general facts or routines."},
      {q:"Which is natural small talk?", opts:["State your business immediately.","Busy day today, isn't it?","I require your assistance now.","Explain your weekend in detail."], a:1,
        explain:"'Busy day today, isn't it?' is a natural, friendly small talk question with a tag ending that invites agreement — the other options sound like formal demands, not casual chat."},
      {q:"Which sentence correctly expresses a strong dislike?", opts:["I don't mind loud noises.","I can't stand loud noises.","I'd like loud noises.","I'm knowing I dislike loud noises."], a:1,
        explain:"'Can't stand' expresses strong dislike. 'Don't mind' is neutral, 'I'd like' expresses a want, and 'know' isn't normally used in the continuous form."},
      {q:"Which sentence is the most polite request?", opts:["Give me the file.","Send the file now.","Would you mind sending the file?","File. Now."], a:2,
        explain:"'Would you mind sending the file?' softens the request politely. Direct commands like 'Send the file now' can sound abrupt, especially with people you don't know well."},
      {q:"Which sentence uses 'actually' the way native speakers typically do?", opts:["Actually, I am doing this task right now.","Actually, I think the meeting is on Tuesday, not Monday.","I actually to go now.","Actually is a nice word."], a:1,
        explain:"'Actually' is commonly used to politely correct information or add something unexpected — here, gently correcting the assumed day of the meeting."},
      {q:"What's the polite way to stop a stranger and ask for directions?", opts:["Hey you!","Excuse me...","Listen...","You there..."], a:1,
        explain:"'Excuse me' is the polite way to get a stranger's attention before asking a question — direct or abrupt openers can come across as rude, even unintentionally."},
    ]
  },
  {
    id: 3,
    title: "Building Fluency",
    desc: "Sound more natural: talk about future plans, express possibility and opinions, give advice, use phrasal verbs, describe things, and compare.",
    concepts: [
      {
        id: "l3c1",
        title: "Talking About the Future",
        explain: "English has three common ways to talk about the future, and each one carries a slightly different feeling: 'will' for quick decisions or predictions, 'going to' for plans you've already decided, and present continuous for fixed arrangements.",
        examples: [
          "I think it will rain later. (prediction)",
          "I'm going to start a new course next month. (already decided plan)",
          "I'm meeting a client on Friday. (fixed arrangement)",
          "I'll help you with that. (decision made right now)",
        ],
        tip: "Spoken tip: 'going to' is very often shortened in casual speech to 'gonna' — you'll hear it constantly, though it's best kept out of formal writing.",
        source: { label: "British Council LearnEnglish — Future forms", url: "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/future-forms-will-be-going-present-continuous" }
      },
      {
        id: "l3c2",
        title: "Modal Verbs for Possibility & Necessity",
        explain: "Modal verbs — can, could, may, might, must, should, have to — add meaning like possibility, ability, permission, or necessity to a main verb, without changing form for he/she/it (no -s ending, ever: 'she can', not 'she cans').\n\nDifferent modals show different strengths of certainty or obligation: 'must' and 'have to' show strong necessity (though 'must' often feels more personal, 'have to' more like an external rule); 'should' gives advice or a recommendation; 'might' and 'could' show possibility, without certainty.\n\nIn spoken English, 'have to' is far more common than 'must' for everyday obligations — 'must' can sound quite formal or strict in casual conversation.",
        examples: [
          "I might join later, I'm not sure yet. (possibility)",
          "You must submit the form by Friday. (strong necessity/rule)",
          "I have to leave early today. (everyday obligation)",
          "You should try the new restaurant nearby. (advice)",
          "Could you help me with this? (polite request, not just ability)",
        ],
        tip: "Spoken tip: modal verbs are always followed directly by the base verb with no 'to' in between — 'You should to go' is incorrect; it's simply 'You should go'.",
        source: { label: "British Council LearnEnglish — Modals: permission and obligation", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-permission-obligation" }
      },
      {
        id: "l3c3",
        title: "Expressing Opinions & Agreeing/Disagreeing",
        explain: "Sharing an opinion confidently, and disagreeing without sounding harsh, are key fluency skills. English has soft, ready-made phrases for both.",
        examples: [
          "I think this approach makes more sense.",
          "In my opinion, the second option is better.",
          "I see your point, but I'd look at it differently.",
          "That's a fair point — though I'd add one thing.",
        ],
        tip: "Spoken tip: disagreeing directly with 'You're wrong' can sound harsh — softeners like 'I see your point, but...' keep the tone friendly while still saying what you think.",
        source: { label: "British Council LearnEnglish — Agreeing and disagreeing", url: "https://learnenglish.britishcouncil.org/free-resources/speaking/b1/agreeing-disagreeing" }
      },
      {
        id: "l3c4",
        title: "Giving Advice & Suggestions",
        explain: "Giving advice or making a suggestion comes up constantly — helping a colleague, recommending a place to eat, or responding to a friend's problem. English has several ready-made structures for this, ranging from strong advice to gentle suggestion.\n\n'Should' gives fairly direct advice, while 'Why don't you...?' and 'How about...?' are softer, more like friendly suggestions than instructions.",
        examples: [
          "You should really see a doctor about that.",
          "Why don't you try calling them directly?",
          "How about we meet a bit earlier next time?",
          "If I were you, I'd double-check the numbers first.",
          "Maybe you could ask your manager for more time.",
        ],
        tip: "Spoken tip: 'How about' and 'What about' are followed by a noun or an -ing verb, not the base verb — 'How about going for a walk?' not 'How about go for a walk?'.",
        source: { label: "British Council LearnEnglish — Have to, must and should for obligation and advice", url: "https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/have-must-should-obligation-advice" }
      },
      {
        id: "l3c5",
        title: "Common Phrasal Verbs in Speech",
        explain: "Phrasal verbs (a verb + a small word like up, on, out) are everywhere in spoken English, even though they're rare in formal writing. Learning them in short phrases, rather than as single words, makes them easier to recall while speaking.",
        examples: [
          "I'm really looking forward to the weekend.",
          "Don't give up — you're almost there.",
          "We get along really well with our new manager.",
          "Can you look into this and get back to me?",
        ],
        tip: "Spoken tip: don't try to translate phrasal verbs word by word — 'give up' has nothing to do with 'give' or 'up' separately. Learn the whole chunk as one unit.",
        source: { label: "British Council LearnEnglish — Phrasal verbs", url: "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs" }
      },
      {
        id: "l3c6",
        title: "Describing People, Places & Things",
        explain: "Describing people, places, and things naturally requires putting adjectives in the right order and choosing vocabulary that's specific rather than vague. English adjective order generally follows: opinion → size → age → shape → colour → origin → material → purpose — though in speech we rarely stack more than two or three at once.\n\nUsing more specific, varied adjectives ('spacious' instead of just 'big', 'charming' instead of just 'nice') also makes descriptions sound noticeably more fluent.",
        examples: [
          "It's a small, cosy café near my office.",
          "She's a tall, friendly person with a great sense of humour.",
          "That's a beautiful old wooden table.",
          "The city is busy, but it has a lot of green parks too.",
        ],
        tip: "Spoken tip: when in doubt about adjective order, opinion words (nice, beautiful, interesting) usually come before more factual ones (size, colour, age) — 'a nice small room', not 'a small nice room'.",
        source: { label: "British Council LearnEnglish — Adjective order", url: "https://learnenglish.britishcouncil.org/comment/166989" }
      },
      {
        id: "l3c7",
        title: "Making Comparisons",
        explain: "Comparisons let you describe differences clearly and are used constantly in daily speech — comparing prices, people, places, and choices.",
        examples: [
          "This one is cheaper than that one.",
          "She's more confident than she used to be.",
          "It's the best option we've seen so far.",
          "This is just as good as the other one.",
        ],
        tip: "Spoken tip: for short adjectives add '-er/-est' (cheap → cheaper → cheapest); for longer ones use 'more/most' (confident → more confident → most confident).",
        source: { label: "British Council LearnEnglish — Comparative and superlative adjectives", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/comparative-superlative-adjectives" }
      },
    ],
    quiz: [
      {q:"Which sentence describes an already-decided plan?", opts:["I think it will rain.","I'm going to visit my parents next week.","I'll answer that.","It might rain."], a:1,
        explain:"'Going to' describes a plan that's already been decided before the moment of speaking — here, visiting parents next week. 'Will' is more for quick decisions or predictions made in the moment."},
      {q:"Which sentence expresses strong necessity or obligation?", opts:["I might go to the gym.","I could go to the gym.","I have to go to the gym.","I would go to the gym."], a:2,
        explain:"'Have to' expresses necessity or obligation. 'Might' and 'could' show possibility, and 'would' is used for hypotheticals or polite offers, not obligation."},
      {q:"Which is a softer way to disagree?", opts:["You're wrong.","That's not true at all.","I see your point, but I'd look at it differently.","No, that's incorrect."], a:2,
        explain:"'I see your point, but I'd look at it differently' acknowledges the other person's view before disagreeing — this softer structure keeps disagreement polite and constructive."},
      {q:"Which is a gentle suggestion rather than a command?", opts:["Do this now.","Why don't you try calling them directly?","You must call them.","Call them immediately."], a:1,
        explain:"'Why don't you...?' is a soft, friendly way to suggest an action, rather than instructing or commanding someone directly."},
      {q:"What does 'give up' mean?", opts:["To donate something","To stop trying","To hand over an object","To celebrate"], a:1,
        explain:"'Give up' is a phrasal verb meaning to stop trying or to quit — its meaning can't be guessed from 'give' and 'up' separately, so it's best learned as one chunk."},
      {q:"Which sentence uses adjective order naturally?", opts:["A wooden beautiful old table.","A beautiful old wooden table.","An old wooden beautiful table.","A table beautiful old wooden."], a:1,
        explain:"English typically orders adjectives as opinion → age → material: 'beautiful' (opinion), 'old' (age), 'wooden' (material) — 'a beautiful old wooden table'."},
      {q:"Choose the correct comparative.", opts:["This is more cheap.","This is cheaper.","This is cheap-er than.","This is most cheap."], a:1,
        explain:"For short adjectives like 'cheap', we add '-er' to form the comparative: 'cheaper'. 'More cheap' incorrectly mixes both comparative forms together."},
    ]
  },
  {
    id: 4,
    title: "Confident & Advanced Speaking",
    desc: "Speak with more precision: hypothetical situations, professional English, reported speech, natural idioms, intonation, and telling a connected story.",
    concepts: [
      {
        id: "l4c1",
        title: "Conditional Sentences for Hypotheticals",
        explain: "Conditionals let you talk about 'what if' situations. The two most useful ones in speech are the real condition (likely situations) and the unreal condition (imagined or unlikely situations).",
        examples: [
          "If it rains, we'll stay indoors. (real / likely condition)",
          "If I were you, I'd take the offer. (unreal / hypothetical advice)",
          "If I had more time, I would learn another language.",
          "If you don't leave now, you'll miss the train.",
        ],
        tip: "Spoken tip: 'If I were you...' is one of the most common ways to give advice in spoken English — notice it uses 'were' even with 'I', which feels unusual but is correct here.",
        source: { label: "British Council LearnEnglish — Conditionals: zero, first and second", url: "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-1" }
      },
      {
        id: "l4c2",
        title: "Passive Voice in Spoken English",
        explain: "The passive voice (is/was + past participle) shifts focus from who did something to what happened, or to the thing that was affected. It's used constantly in spoken English when the doer is unknown, unimportant, or obvious from context.\n\nIn everyday conversation, passive voice is often used to sound less accusatory ('The report wasn't finished on time' instead of pointing at exactly who didn't finish it) or when describing processes and general situations rather than specific people's actions.",
        examples: [
          "The meeting has been rescheduled to Friday.",
          "My phone was stolen last week.",
          "This decision was made by senior management.",
          "English is spoken in many countries around the world.",
        ],
        tip: "Spoken tip: overusing passive voice can make speech sound distant or evasive — use it when it genuinely fits (the doer is unknown or unimportant), but keep most everyday speech active for a more natural, direct feel.",
        source: { label: "British Council LearnEnglish — Passives", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives" }
      },
      {
        id: "l4c3",
        title: "Professional & Formal English",
        explain: "Meetings, presentations, and professional conversations call for a slightly more formal register — less slang, clearer structure, and more cushioning language.",
        examples: [
          "I'd like to walk you through the key numbers.",
          "Could we circle back to this point later?",
          "I take your point, but I'd like to add some context.",
          "Let's touch base again once the report is ready.",
        ],
        tip: "Spoken tip: 'circle back' and 'touch base' are common workplace phrases meaning to return to a topic or reconnect later — very useful in meetings.",
        source: { label: "British Council — Useful business English phrases", url: "https://www.britishcouncil.my/blog/12-useful-business-english-phrases-and-expressions-professionals" }
      },
      {
        id: "l4c4",
        title: "Reported Speech in Conversation",
        explain: "Reported speech lets you tell someone what another person said, without quoting them word for word. In casual spoken English, verb tenses often shift back one step into the past ('I am tired' becomes 'She said she was tired'), though in fast conversation, especially about something still true, people often keep the original tense too.\n\nCommon reporting verbs include 'say', 'tell', and 'ask' — note that 'tell' always needs an object (tell someone), while 'say' usually doesn't (say something).",
        examples: [
          "She said (that) she was running late.",
          "He told me he'd call back later.",
          "They asked if we were coming to the party.",
          "My manager said the deadline is next Friday. (kept present tense — still true now)",
        ],
        tip: "Spoken tip: in relaxed conversation, native speakers often drop the word 'that' after 'said' — 'She said she was tired' is just as natural as 'She said that she was tired'.",
        source: { label: "British Council LearnEnglish — Reported speech: statements", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-statements" }
      },
      {
        id: "l4c5",
        title: "Idioms & Natural Expressions",
        explain: "Idioms are fixed expressions whose meaning isn't obvious from the individual words. Using a few naturally, in the right situation, makes speech sound noticeably more fluent.",
        examples: [
          "It's not a big deal — don't worry about it.",
          "Let's just play it by ear and decide later.",
          "That project is a piece of cake for her.",
          "I'm on the fence about which one to choose.",
        ],
        tip: "Spoken tip: idioms work best in casual conversation. In a formal presentation, it's usually safer to use plainer language instead.",
        source: { label: "British Council LearnEnglish — Idioms and expressions", url: "https://learnenglish.britishcouncil.org/learning-hub/topics/idioms-expressions" }
      },
      {
        id: "l4c6",
        title: "Emphasis & Natural Intonation Patterns",
        explain: "Beyond grammar and vocabulary, how you say something changes what it means. Stressing a particular word in a sentence can shift emphasis entirely — the same words can mean several different things depending on which word gets the stress.\n\nRising intonation at the end of a statement can turn it into a question or express uncertainty or surprise, even without changing the words at all. Falling intonation signals confidence and completion. Native listeners rely heavily on these patterns, sometimes more than on exact word choice, to understand tone and intent.",
        examples: [
          "I didn't say SHE took it. (someone else said it)",
          "I didn't say she TOOK it. (maybe she just borrowed it)",
          "You're coming tonight? (rising tone — a question, checking)",
          "You're coming tonight. (falling tone — a confident statement)",
        ],
        tip: "Spoken tip: try saying the same sentence while stressing a different word each time — notice how the meaning shifts. This is one of the most powerful, and most overlooked, tools for sounding fluent and natural.",
        source: { label: "BBC Learning English — The Pronunciation Lounge", url: "https://www.bbc.co.uk/learningenglish/features/the_pronunciation_lounge" }
      },
      {
        id: "l4c7",
        title: "Storytelling & Linking Ideas",
        explain: "Longer spoken stories or explanations flow better with linking words that show relationships between ideas — contrast, result, and sequence — instead of a string of short, disconnected sentences.",
        examples: [
          "I wanted to leave early; however, the meeting ran long.",
          "The flight was delayed. As a result, we missed the connection.",
          "Although it was raining, we still went for a walk.",
          "First we discussed the budget, and then we moved to the timeline.",
        ],
        tip: "Spoken tip: in speech, 'however' and 'although' are often replaced by simpler 'but' and 'even though' — both are correct, but the simpler versions sound more natural in casual talk.",
        source: { label: "British Council LearnEnglish — Contrasting ideas: although, despite and others", url: "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/contrasting-ideas-although-despite-others" }
      },
    ],
    quiz: [
      {q:"Which is the unreal / hypothetical conditional?", opts:["If it rains, we'll stay in.","If I were you, I'd take the offer.","If you're free, call me.","If he calls, tell him I'm out."], a:1,
        explain:"'If I were you, I'd take the offer' is the unreal/hypothetical conditional — used to imagine a different situation and give advice, using 'were' with all subjects."},
      {q:"Which sentence is in the passive voice?", opts:["Someone stole my phone.","My phone was stolen.","I lost my phone.","My phone is missing since morning."], a:1,
        explain:"'My phone was stolen' uses was + past participle (stolen), focusing on the phone rather than who did it — that's the passive voice."},
      {q:"'Could we circle back to this later?' means...", opts:["Let's return to this topic later","Let's walk in a circle","Let's cancel this topic","Let's speed up the meeting"], a:0,
        explain:"'Circle back' is a common workplace phrase meaning to return to a topic later, once there's more information or time to discuss it properly."},
      {q:"Choose the correct reported speech for: She said, \"I am tired.\"", opts:["She said she is tired.","She said she was tired.","She said I am tired.","She say she was tired."], a:1,
        explain:"In reported speech, the present tense 'am' typically shifts back one step into the past tense 'was' — 'She said she was tired.'"},
      {q:"'It's a piece of cake' means the task is...", opts:["delicious","very easy","related to baking","very difficult"], a:1,
        explain:"'A piece of cake' is an idiom meaning something is very easy to do — it has nothing to do with actual cake."},
      {q:"A statement said with rising intonation at the end often signals...", opts:["confidence and completion","a question or uncertainty","anger","no particular meaning"], a:1,
        explain:"Rising intonation at the end of a sentence often turns a statement into a question, or signals surprise or uncertainty — even if the words themselves don't change."},
      {q:"Which word shows contrast between two ideas?", opts:["as a result","and then","however","first"], a:2,
        explain:"'However' introduces a contrast with what was just said — similar to 'but', just slightly more formal. 'As a result' shows a consequence, and 'and then' / 'first' show sequence."},
    ]
  },
];
