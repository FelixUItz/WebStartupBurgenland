/* ===================================
   PitchIQ - StartUp Burgenland
   Screen-based state machine with 60 investor questions
====================================== */

(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────
  const FT_CONFIG = {
    TIMER_DURATION: 30,
    WORD_LIMIT: 50,
    CTA_THRESHOLD: 10,
    CTA_URL: 'https://PLACEHOLDER-BOOKING-URL.com',
    API_ENDPOINT: null,
    STORAGE_KEY: 'ft_progress',
    USER_KEY: 'ft_user'
  };

  // ── Categories ──────────────────────────────────────────
  const FT_CATEGORIES = {
    vision:      { name: 'Vision & Mission',            icon: '<i class="fa-solid fa-bullseye"></i>', color: '#E85D26' },
    market:      { name: 'Markt & Kunden',              icon: '<i class="fa-solid fa-chart-column"></i>', color: '#2D7DD2' },
    value:       { name: 'Value Proposition & USP',      icon: '<i class="fa-solid fa-gem"></i>', color: '#8B5CF6' },
    competition: { name: 'Wettbewerb',                   icon: '<i class="fa-solid fa-scale-balanced"></i>', color: '#DC2626' },
    business:    { name: 'Business Model & Finanzen',    icon: '<i class="fa-solid fa-coins"></i>', color: '#059669' },
    team:        { name: 'Team & Gr\u00FCnder',         icon: '<i class="fa-solid fa-users"></i>', color: '#D97706' },
    traction:    { name: 'Traction & Metrics',           icon: '<i class="fa-solid fa-chart-line"></i>', color: '#0891B2' },
    gtm:         { name: 'GTM, Risiken & Exit',          icon: '<i class="fa-solid fa-rocket"></i>', color: '#BE185D' }
  };

  // ── Self-Evaluation Criteria ────────────────────────────
  const SELF_EVAL_CRITERIA = [
    { id: 'concrete',    label: 'Ich habe eine konkrete Zahl oder ein Beispiel genannt' },
    { id: 'simple',      label: 'Ein Branchenfremder w\u00FCrde meine Antwort verstehen' },
    { id: 'short',       label: 'Meine Antwort war unter ' + FT_CONFIG.WORD_LIMIT + ' W\u00F6rter' },
    { id: 'noBuzzwords', label: 'Ich habe keine leeren Buzzwords benutzt' },
    { id: 'confident',   label: 'Ich war fl\u00FCssig und ohne langes Z\u00F6gern' }
  ];

  // ── Questions (60) ─────────────────────────────────────
  const FT_QUESTIONS = [
    // ===== VISION & MISSION (8) =====
    {
      id: 1, category: 'vision',
      question: 'Was macht euer Startup?',
      badAnswer: 'Wir sind eine innovative, KI-gest\u00FCtzte SaaS-Plattform, die mithilfe von Machine Learning und Big Data disruptive L\u00F6sungen f\u00FCr die digitale Transformation von Unternehmen im B2B-Bereich anbietet.',
      badExplanation: 'Buzzword-Bingo. Nach diesem Satz wei\u00DF niemand, was ihr tut. Wenn du es nicht in einfachen Worten erkl\u00E4ren kannst, zeigt das, dass du es selbst nicht wirklich verstehst.',
      goodAnswer: 'Wir helfen kleinen Handwerksbetrieben, ihre Auftr\u00E4ge digital zu verwalten. Statt Zettelwirtschaft nutzen sie unsere App und sparen 5 Stunden pro Woche.',
      goodExplanation: 'Klar, konkret, messbarer Nutzen. Tipp: Erkl\u00E4re dein Startup als Variante von etwas Bekanntem \u2013 \u201EEs ist wie X f\u00FCr Y.\u201C'
    },
    {
      id: 2, category: 'vision',
      question: 'Welches Problem l\u00F6st ihr?',
      badAnswer: 'Es gibt eine Ineffizienz im Markt, die wir adressieren. Viele Prozesse sind noch nicht digitalisiert und es gibt gro\u00DFes Optimierungspotenzial.',
      badExplanation: 'Zu vage. Welche Ineffizienz? Welche Prozesse? Investoren wollen den Schmerz sp\u00FCren \u2013 nicht eine Management-Zusammenfassung lesen.',
      goodAnswer: 'Handwerker verbringen 10+ Stunden pro Woche mit Papierkram: Angebote, Rechnungen, Termine. 73% sagen, das ist ihr gr\u00F6\u00DFter Schmerzpunkt. Ich habe 200 davon pers\u00F6nlich befragt.',
      goodExplanation: 'Spezifisch, datengest\u00FCtzt und pers\u00F6nlich validiert. Die 200 Interviews zeigen: Du bist kein Theoretiker, du kennst den Markt.'
    },
    {
      id: 3, category: 'vision',
      question: 'Warum jetzt? Warum existiert diese L\u00F6sung nicht schon?',
      badAnswer: 'Weil die Technologie jetzt reif genug ist und der Markt bereit daf\u00FCr ist.',
      badExplanation: 'Generisch. Das k\u00F6nnte jedes Startup sagen. Investoren fragen \u201EWhy now?\u201C um zu testen, ob du Marktver\u00E4nderungen verstehst \u2013 nicht ob du Phrasen dreschen kannst.',
      goodAnswer: 'Drei Faktoren: Smartphone-Nutzung bei Handwerkern \u00FCber 55 liegt jetzt bei 89%. Die E-Rechnungspflicht ab 2025 zwingt zur Digitalisierung. Und bisherige Tools sind zu komplex und teuer f\u00FCr Kleinbetriebe.',
      goodExplanation: 'Konkrete Trends + regulatorische Treiber + Marktl\u00FCcke = ein zeitfensterbasiertes Argument, das \u00FCberzeugt.'
    },
    {
      id: 4, category: 'vision',
      question: 'Wo seht ihr euch in 5 Jahren?',
      badAnswer: 'Wir wollen Marktf\u00FChrer in Europa werden und in alle Branchen expandieren.',
      badExplanation: 'Unrealistisch und generisch. \u201EMarktf\u00FChrer in Europa\u201C ab Seed-Stage in 5 Jahren ist ein rotes Tuch. Zeigt fehlendes Verst\u00E4ndnis f\u00FCr Skalierung.',
      goodAnswer: '5.000 zahlende Betriebe in DACH, 6.4 Mio. \u20AC ARR, profitabel. Standard-Software f\u00FCr Installateure. Dann vertikal expandieren: Elektriker, Maler, Dachdecker \u2013 gleiches Playbook.',
      goodExplanation: 'Ambitioniert aber nachvollziehbar. Klare Zahlen, logische Expansions-Strategie, ein Schritt nach dem anderen.'
    },
    {
      id: 5, category: 'vision',
      question: 'Warum machst DU das? Was ist deine pers\u00F6nliche Motivation?',
      badAnswer: 'Ich fand die Idee einfach spannend und sehe gro\u00DFes Potenzial. Ich will etwas aufbauen.',
      badExplanation: 'Null emotionale Verbindung. Investoren wetten auf Gr\u00FCnder \u2013 nicht auf Ideen. Sie wollen wissen, warum DU nicht aufgibst, wenn es hart wird.',
      goodAnswer: 'Mein Vater ist Installateur. Ich habe als Kind gesehen, wie er jeden Abend bis 22 Uhr am K\u00FCchentisch Rechnungen geschrieben hat. Das Problem kenne ich seit 20 Jahren \u2013 und jetzt kann ich es l\u00F6sen.',
      goodExplanation: 'Pers\u00F6nliche Story = Founder-Market Fit. Diese Motivation ist echt und nicht kopierbar. Investoren erinnern sich an Geschichten, nicht an Marktdaten.'
    },
    {
      id: 6, category: 'vision',
      question: 'Wie wird das ein Milliarden-Unternehmen?',
      badAnswer: 'Der Markt ist riesig, da gibt es genug Potenzial nach oben.',
      badExplanation: 'Keine Logik, keine Schritte. Investoren wollen verstehen, wie du von A nach B nach C kommst \u2013 nicht dass B gro\u00DF ist.',
      goodAnswer: 'Wir starten mit Installateuren in \u00D6sterreich (85.000 Betriebe). Dann DACH. Dann andere Gewerke \u2013 Elektriker, Maler, etc. gibt es 800.000 allein in DACH. Bei 1.200\u20AC/Jahr Abo ist das ein TAM von fast 1 Mrd. \u20AC. Wir brauchen nur 5% f\u00FCr 48 Mio. ARR.',
      goodExplanation: 'Klare Expansion-Logik: Geografie \u2192 Branchen. Bottom-Up-Rechnung statt Top-Down-Fantasie.'
    },
    {
      id: 7, category: 'vision',
      question: 'Was ist eure langfristige Vision?',
      badAnswer: 'Wir wollen die Arbeitswelt ver\u00E4ndern und digitalisieren.',
      badExplanation: 'So breit, dass es nichts bedeutet. Jedes zweite Startup \u201Ever\u00E4ndert die Arbeitswelt\u201C. Was genau ver\u00E4ndert ihr?',
      goodAnswer: 'Jeder Handwerker soll sich auf sein Handwerk konzentrieren k\u00F6nnen \u2013 nicht auf Papierkram. Wir bauen das Betriebssystem f\u00FCr das Handwerk: von der Auftragsannahme bis zur Steuer-\u00DCbermittlung, alles in einer App.',
      goodExplanation: 'Emotionale Vision + konkrete Produktstrategie. \u201EBetriebssystem f\u00FCr das Handwerk\u201C ist ein einpr\u00E4gsames Bild.'
    },
    {
      id: 8, category: 'vision',
      question: 'Seid ihr offen daf\u00FCr, eure Idee zu \u00E4ndern?',
      badAnswer: 'Nein, wir sind \u00FCberzeugt von unserem Konzept. Wir m\u00FCssen nur die Umsetzung perfektionieren.',
      badExplanation: 'Starrsinn ist das Gegenteil von dem, was Investoren suchen. Die besten Startups pivoten oft in fr\u00FChen Phasen \u2013 viele erfolgreiche Unternehmen haben mit einer komplett anderen Idee gestartet.',
      goodAnswer: 'Absolut. Wir sind verliebt in das Problem, nicht in unsere L\u00F6sung. Wir haben schon zweimal unseren Ansatz ge\u00E4ndert basierend auf Nutzerfeedback \u2013 und jedes Mal wurden unsere Zahlen besser.',
      goodExplanation: 'Zeigt Lernf\u00E4higkeit und Demut. \u201EVerliebt ins Problem, nicht in die L\u00F6sung\u201C ist genau die Denkweise, die Investoren suchen.'
    },

    // ===== MARKT & KUNDEN (8) =====
    {
      id: 9, category: 'market',
      question: 'Wie gro\u00DF ist euer Markt?',
      badAnswer: 'Der globale Markt f\u00FCr digitale Handwerksl\u00F6sungen wird auf 50 Milliarden Euro gesch\u00E4tzt. Riesiges Wachstumspotenzial.',
      badExplanation: 'Top-Down-Sch\u00E4tzung aus einem Google-Bericht. Die 50 Mrd. sind irrelevant. Investoren wollen wissen: Wie viel davon kannst DU realistisch bekommen?',
      goodAnswer: '85.000 Handwerksbetriebe mit 1-20 MA in \u00D6sterreich. Bei 1.200\u20AC/Jahr = SAM von 102 Mio. \u20AC. Realistisch 5% in 5 Jahren = 5.1 Mio. ARR. Dann DACH: 800.000 Betriebe, SAM w\u00E4chst auf 960 Mio. \u20AC.',
      goodExplanation: 'Bottom-Up: konkrete Betriebe \u00D7 konkreter Preis = nachpr\u00FCfbare Zahl. Der Investor kann die Logik challengen und vertraut ihr gerade deswegen.'
    },
    {
      id: 10, category: 'market',
      question: 'Wer ist euer idealer Kunde?',
      badAnswer: 'Eigentlich jedes Unternehmen, das noch nicht digitalisiert ist. Unser Produkt ist sehr flexibel einsetzbar.',
      badExplanation: '\u201EJeder\u201C als Zielgruppe = \u201ENiemand\u201C. Fehlender Fokus ist eines der gr\u00F6\u00DFten Red Flags f\u00FCr Investoren.',
      goodAnswer: 'Installateur-Betriebe, 3-10 Mitarbeiter, \u00D6sterreich. Chef ist 35-50, Handwerker und B\u00FCromanager in einer Person. Technikaffin genug f\u00FCrs Smartphone, aber null Zeit f\u00FCr komplexe Software. Ich kenne ihn \u2013 200 pers\u00F6nlich interviewt.',
      goodExplanation: 'Glasklare Persona. Die 200 Interviews beweisen: Du hast nicht am Schreibtisch theoretisiert, du warst drau\u00DFen beim Kunden.'
    },
    {
      id: 11, category: 'market',
      question: 'Wie validiert ihr, dass der Markt das braucht?',
      badAnswer: 'Wir haben eine Umfrage gemacht und 90% fanden die Idee gut. Au\u00DFerdem gibt es viel positives Feedback.',
      badExplanation: 'Umfragen und Feedback sind keine Validierung. Menschen sagen \u201Eja, kaufe ich!\u201C und tun es nicht. Der einzige Beweis ist: Jemand zahlt.',
      goodAnswer: '50 Betriebe testen unseren MVP seit 3 Monaten. 34 sind noch aktiv. 12 zahlen den vollen Preis \u2013 ohne Rabatt. Churn unter 5%. Das sind keine Meinungen, das sind Transaktionen.',
      goodExplanation: 'Echte Nutzung, echte Zahlung, echte Retention. Die besten Validierungen kommen aus dem Portemonnaie, nicht aus Frageb\u00F6gen.'
    },
    {
      id: 12, category: 'market',
      question: 'Was \u00FCberrascht euch am Nutzerverhalten?',
      badAnswer: 'Eigentlich nutzen sie das Produkt genau so wie wir es geplant haben.',
      badExplanation: 'Unglaubw\u00FCrdig. Kein Produkt wird so genutzt wie geplant. Diese Antwort zeigt: Du beobachtest deine Nutzer nicht genau genug.',
      goodAnswer: 'Wir dachten, sie nutzen die App haupts\u00E4chlich im B\u00FCro. Tats\u00E4chlich erstellen 68% ihre Rechnungen direkt auf der Baustelle vom Handy. Das hat unsere gesamte UX-Priorit\u00E4t verschoben \u2013 mobile-first war vorher nur ein Buzzword bei uns.',
      goodExplanation: 'Echte \u00DCberraschung + daraus abgeleitete Produkt\u00E4nderung. Das zeigt: Du h\u00F6rst zu, lernst und iterierst.'
    },
    {
      id: 13, category: 'market',
      question: 'Wer waren eure ersten Kunden und wie habt ihr sie gewonnen?',
      badAnswer: 'Wir haben \u00FCber Social Media auf uns aufmerksam gemacht und dann kamen die ersten Anfragen.',
      badExplanation: 'Vage und passiv. \u201EKamen Anfragen\u201C klingt nach Zufall, nicht nach Strategie.',
      goodAnswer: 'Mein erster Kunde war der Installateur-Betrieb meines Onkels. Er hat es 3 Kollegen empfohlen. Ich bin dann zu Innungsversammlungen gegangen und habe dort live gezeigt, wie ich eine Rechnung in 30 Sekunden erstelle. 8 der 12 Anwesenden wollten es sofort testen.',
      goodExplanation: 'Pers\u00F6nliches Netzwerk \u2192 Empfehlung \u2192 Dinge tun, die nicht skalieren. Genau so gewinnen die besten Startups ihre ersten Kunden.'
    },
    {
      id: 14, category: 'market',
      question: 'Welche Trends treiben euren Markt?',
      badAnswer: 'Die Digitalisierung schreitet voran und immer mehr Menschen nutzen Smartphones.',
      badExplanation: 'Das stimmt seit 2010. Welche SPEZIFISCHEN Trends sind relevant f\u00FCr EUREN Markt JETZT?',
      goodAnswer: 'Drei konkrete Trends: Die E-Rechnungspflicht ab 2025 eliminiert Papier per Gesetz. Fachkr\u00E4ftemangel zwingt Betriebe, effizienter zu arbeiten \u2013 jede eingesparte Admin-Stunde z\u00E4hlt. Und: Die Generation Smartphone \u00FCbernimmt jetzt die Betriebe von der analogen Generation.',
      goodExplanation: 'Drei spezifische, aktuelle Trends mit direktem Bezug zum eigenen Produkt. Nicht generisch, sondern branchen-relevant.'
    },
    {
      id: 15, category: 'market',
      question: 'Wie dringlich ist das Problem? Wie viel Geld oder Zeit verschwenden eure Kunden ohne eure L\u00F6sung?',
      badAnswer: 'Es ist definitiv ein gro\u00DFes Problem. Die Kunden sind unzufrieden mit dem Status Quo.',
      badExplanation: 'Keine Zahlen, keine Dringlichkeit. \u201EGro\u00DF\u201C und \u201Eunzufrieden\u201C sind relative Begriffe ohne Aussagekraft.',
      goodAnswer: 'Ein durchschnittlicher 5-Mann-Betrieb verliert 520 Stunden pro Jahr an Verwaltung \u2013 das sind 15.600\u20AC an Produktivarbeit. Gleichzeitig gehen 8% der Rechnungen verloren oder werden doppelt geschrieben. Das kostet real 3.000-5.000\u20AC pro Jahr.',
      goodExplanation: 'Konkreter Zeitverlust + konkreter Geldverlust = messbare Dringlichkeit. Der Investor kann den ROI sofort berechnen.'
    },
    {
      id: 16, category: 'market',
      question: 'Ist das wirklich ein Massenmarkt \u2013 oder nur eine Nische?',
      badAnswer: 'Es ist definitiv ein Massenmarkt. Handwerker gibt es \u00FCberall.',
      badExplanation: 'Behauptung statt Beweis. \u201EGibt es \u00FCberall\u201C ist kein Markt-Argument.',
      goodAnswer: 'Allein in DACH gibt es 800.000 Handwerksbetriebe mit 1-20 Mitarbeitern. Wir starten in einer Nische \u2013 Installateure \u2013 aber unser Playbook funktioniert f\u00FCr jedes Gewerk. Jeder dieser Betriebe hat das gleiche Verwaltungsproblem. Die Nische ist unsere Go-to-Market-Strategie, nicht unser Markt.',
      goodExplanation: 'Nische als bewusste Strategie, nicht als Limitation. Zeigt, dass du den Unterschied zwischen Startpunkt und Endmarkt verstehst.'
    },

    // ===== VALUE PROPOSITION & USP (7) =====
    {
      id: 17, category: 'value',
      question: 'Was ist eure Value Proposition?',
      badAnswer: 'Wir bieten eine All-in-One-L\u00F6sung, die alles kann, was unsere Kunden brauchen. One-Stop-Shop quasi.',
      badExplanation: '\u201EAll-in-One\u201C klingt nach Feature-Friedhof. Was genau ist der Wert? F\u00FCr wen? Im Vergleich zu was?',
      goodAnswer: 'Aus Papierchaos wird eine 3-Klick-Rechnung. Der Handwerker fotografiert den Lieferschein, die App erkennt die Positionen und erstellt in 30 Sekunden eine fertige Rechnung. Statt 45 Minuten abends am K\u00FCchentisch \u2013 fertig auf der Baustelle.',
      goodExplanation: 'Vorher-Nachher mit messbarem Zeitgewinn. Jeder versteht das Bild sofort \u2013 auch ein Investor, der noch nie eine Rechnung geschrieben hat.'
    },
    {
      id: 18, category: 'value',
      question: 'Was ist euer Unfair Advantage?',
      badAnswer: 'Unser Team ist unser gr\u00F6\u00DFter Vorteil \u2013 wir sind sehr motiviert und arbeiten hart.',
      badExplanation: 'Motivation ist kein Moat. Jeder Gr\u00FCnder ist motiviert. Ein Unfair Advantage muss schwer kopierbar sein \u2013 sonst ist es keiner.',
      goodAnswer: '18 Monate Trainingsdaten aus 50 Betrieben. Unser Modell erkennt 94% aller Positionen auf Lieferscheinen automatisch. Ein Mitbewerber braucht mindestens 12 Monate und 200.000\u20AC um diese Datenbasis aufzubauen. Jeder neue Kunde macht unsere Erkennung besser.',
      goodExplanation: 'Daten + Zeit = echter Moat. Netzwerkeffekte bei Daten: je mehr Kunden, desto besser das Produkt, desto schwerer einzuholen.'
    },
    {
      id: 19, category: 'value',
      question: 'Wie erkl\u00E4rt ihr euer Produkt so, dass es jeder versteht?',
      badAnswer: 'Wir haben ein Pitch Deck mit 30 Slides, das alle Details abdeckt.',
      badExplanation: '30 Slides sind kein Pitch, das ist ein Roman. Erkl\u00E4re es als Variante von etwas, das die Zuh\u00F6rer bereits kennen.',
      goodAnswer: 'Wir sind das Lexoffice f\u00FCr Handwerker \u2013 aber so einfach, dass es der Meister auf der Baustelle mit dreckigen H\u00E4nden bedienen kann. Foto machen, Rechnung fertig.',
      goodExplanation: '\u201EX f\u00FCr Y\u201C-Format: sofort verst\u00E4ndlich. Plus ein Bild, das im Kopf bleibt \u2013 dreckige H\u00E4nde, Baustelle, trotzdem digital.'
    },
    {
      id: 20, category: 'value',
      question: 'Was ist das Wichtigste, das eure Nutzer an euch sch\u00E4tzen?',
      badAnswer: 'Sie finden unser Produkt insgesamt sehr gut und sind zufrieden.',
      badExplanation: 'Nichtssagend. Was GENAU sch\u00E4tzen sie? Welches Feature? Welches Gef\u00FChl? Welches Problem ist gel\u00F6st?',
      goodAnswer: 'Wir fragen jeden Kunden: \u201EWas w\u00FCrdest du am meisten vermissen?\u201C Die Antwort Nr. 1: \u201EDass ich abends nicht mehr am Schreibtisch sitzen muss.\u201C Es geht nicht um die App \u2013 es geht um 2 Stunden mehr mit der Familie pro Tag.',
      goodExplanation: 'Emotionaler Nutzen > Feature-Liste. Die beste Value Proposition ist die, die der Kunde selbst formuliert.'
    },
    {
      id: 21, category: 'value',
      question: 'Was genau macht euch anders als alle anderen?',
      badAnswer: 'Wir haben die beste Technologie und den besten Service.',
      badExplanation: 'Das behauptet jeder. \u201EAm besten\u201C ist kein Differenzierungsmerkmal \u2013 es ist eine leere Behauptung.',
      goodAnswer: 'Drei Sachen: Erstens, wir sind branchenspezifisch \u2013 unsere Vorlagen kennen Installateur-Materialien, nicht generische Posten. Zweitens, Onboarding dauert 8 Minuten statt 6 Wochen. Drittens, 99\u20AC/Monat statt 500\u20AC. Wir sind nicht besser \u2013 wir sind passender.',
      goodExplanation: '\u201ENicht besser, sondern passender\u201C \u2013 das ist ein erwachsenes Differenzierungsargument. Drei konkrete Punkte, die nachpr\u00FCfbar sind.'
    },
    {
      id: 22, category: 'value',
      question: 'Welches Key Feature w\u00FCrdet ihr streichen, wenn ihr nur eines behalten d\u00FCrftet?',
      badAnswer: 'Wir w\u00FCrden keines streichen, alle Features sind wichtig.',
      badExplanation: 'Zeigt fehlende Priorisierung. Wenn alles wichtig ist, ist nichts wichtig. Investoren testen hier dein Produktdenken.',
      goodAnswer: 'Wir w\u00FCrden alles streichen au\u00DFer der Lieferschein-Scan-to-Rechnung-Funktion. Die allein spart 30 Minuten pro Tag. Alles andere ist nice-to-have, das ist must-have. 84% unserer Nutzer nutzen genau dieses Feature t\u00E4glich.',
      goodExplanation: 'Klarer Fokus auf den Kern-Wert. Zeigt Product-Market-Fit-Verst\u00E4ndnis: ein Feature, das allein die Nutzung rechtfertigt.'
    },
    {
      id: 23, category: 'value',
      question: 'K\u00F6nnen eure Features leicht kopiert werden?',
      badAnswer: 'Nein, wir haben jahrelang daran entwickelt.',
      badExplanation: 'Entwicklungszeit ist kein Schutz. Ein Konkurrent mit 10x Budget baut das in 3 Monaten. Was ist der echte Schutzwall?',
      goodAnswer: 'Die einzelnen Features schon \u2013 eine App bauen kann jeder. Aber unsere Datenbank mit 50.000 branchenspezifischen Material-Zuordnungen nicht. Und unsere 50 Kunden-Feedback-Loops, die das Produkt jede Woche verbessern, auch nicht. Der Moat ist nicht das Feature, sondern das \u00D6kosystem.',
      goodExplanation: 'Ehrlich \u00FCber Feature-Kopierbarkeit, aber stark im Argument f\u00FCr den echten Schutzwall: Daten + Kunden-Feedback.'
    },

    // ===== WETTBEWERB (7) =====
    {
      id: 24, category: 'competition',
      question: 'Wer sind eure Mitbewerber?',
      badAnswer: 'Eigentlich haben wir keine direkten Mitbewerber. Wir sind die Einzigen, die das so machen.',
      badExplanation: 'Rotes Tuch Nr. 1! Entweder kennt der Gr\u00FCnder seinen Markt nicht, oder es gibt keinen Markt. Beides katastrophal.',
      goodAnswer: 'Drei Kategorien: Generische Tools wie Lexoffice \u2013 gut f\u00FCr Freelancer, zu komplex f\u00FCr Handwerker. Branchen-Software wie Craftview \u2013 m\u00E4chtig, aber 500\u20AC/Monat und 6 Wochen Setup. Und die Excel-Zettel-L\u00F6sung, die 70% aktuell nutzen \u2013 kostenlos, aber fehleranf\u00E4llig und zeitfressend.',
      goodExplanation: 'Ehrliche Wettbewerbslandschaft in Kategorien. Zeigt: Du kennst den Markt UND deine Positionierung darin.'
    },
    {
      id: 25, category: 'competition',
      question: 'Wen f\u00FCrchtet ihr am meisten?',
      badAnswer: 'Niemanden wirklich. Wir sind gut positioniert.',
      badExplanation: 'Arroganz oder Naivit\u00E4t? Beides schlecht. Investoren stellen genau diese Frage, um zu sehen, ob du realistisch denkst.',
      goodAnswer: 'Lexoffice. Die haben 5 Millionen Kunden und k\u00F6nnten jederzeit ein Handwerker-Modul bauen. Unser Vorteil: F\u00FCr sie sind Handwerker 2% des Umsatzes \u2013 nie Priorit\u00E4t. F\u00FCr uns sind sie 100%. Dieser Fokus-Vorteil w\u00E4chst jeden Tag.',
      goodExplanation: 'Ehrliche Analyse + strategische Antwort. Du zeigst: Ich kenne die Gefahr UND wei\u00DF, warum wir trotzdem gewinnen.'
    },
    {
      id: 26, category: 'competition',
      question: 'Was passiert, wenn ein gro\u00DFer Player euer Produkt kopiert?',
      badAnswer: 'Gro\u00DFe Konzerne sind zu langsam daf\u00FCr. Das schaffen die nicht.',
      badExplanation: 'Naiv. SAP kauft 200 Unternehmen pro Jahr. Google, Microsoft und Co. haben unbegrenzte Ressourcen.',
      goodAnswer: 'Realistisches Szenario. Drei Schutzw\u00E4lle: 1) Unser Handwerker-Fokus ist zu nischig f\u00FCr generische Player. 2) Unsere Domain-Daten aus 50+ Betrieben sind unser Vorsprung und wachsen t\u00E4glich. 3) Wenn Lexoffice uns kaufen will \u2013 ist das ein Exit-Szenario, kein Problem.',
      goodExplanation: 'Pragmatisch statt naiv. Die Exit-Awareness am Ende zeigt strategische Reife.'
    },
    {
      id: 27, category: 'competition',
      question: 'Was versteht ihr an eurem Markt, das andere nicht verstehen?',
      badAnswer: 'Wir haben einfach mehr Erfahrung als andere in dem Bereich.',
      badExplanation: 'Behauptung ohne Substanz. WAS genau verstehst du, das anderen entgeht?',
      goodAnswer: 'Alle bisherigen L\u00F6sungen zwingen Handwerker, sich wie B\u00FCroangestellte zu verhalten \u2013 PC starten, Browser \u00F6ffnen, Formulare ausf\u00FCllen. Das funktioniert nicht, weil Handwerker keine Schreibtischt\u00E4ter sind. Die Eingabe muss dort passieren, wo die Arbeit passiert: auf der Baustelle, mit einer Hand, in 30 Sekunden.',
      goodExplanation: 'Ein echtes Insight, das die gesamte Produktstrategie erkl\u00E4rt. Das ist kein Feature-Vergleich \u2013 das ist ein fundamentales Marktverst\u00E4ndnis.'
    },
    {
      id: 28, category: 'competition',
      question: 'Wer k\u00F6nnte in Zukunft noch zum Wettbewerber werden?',
      badAnswer: 'Das wei\u00DF man nie so genau. Wir konzentrieren uns auf unser Produkt.',
      badExplanation: 'Strategische Blindheit. Investoren wollen sehen, dass du 2-3 Z\u00FCge vorausdenkst.',
      goodAnswer: 'Zwei Szenarien: Erstens, ein Handwerker-Gro\u00DFh\u00E4ndler wie die Richter+Frenzel Gruppe k\u00F6nnte eine eigene App bauen \u2013 die haben den Kundenzugang. Zweitens k\u00F6nnte ein CRM wie HubSpot ein vertikales Handwerker-Modul launchen. Gegen beide sch\u00FCtzt uns unsere UX-Spezialisierung und die Wechselkosten bei bestehenden Kunden.',
      goodExplanation: 'Du denkst in Szenarien und hast f\u00FCr jedes einen Plan. Das zeigt strategische Tiefe.'
    },
    {
      id: 29, category: 'competition',
      question: 'Wie unterscheidet sich euer Produkt konkret vom n\u00E4chsten Wettbewerber?',
      badAnswer: 'Wir sind einfacher zu bedienen und g\u00FCnstiger.',
      badExplanation: '\u201EEinfacher und g\u00FCnstiger\u201C sagt jeder. Wo ist der BEWEIS? Wie viel einfacher? Wie viel g\u00FCnstiger?',
      goodAnswer: 'Craftview: 500\u20AC/Monat, 6 Wochen Onboarding, 200+ Features. Wir: 99\u20AC/Monat, 8 Minuten Onboarding, 12 Features die wirklich z\u00E4hlen. Unser NPS ist 72, deren liegt bei 31. Der Beweis: Unsere Kunden bleiben im Schnitt 14 Monate, Craftview verliert 40% im ersten Quartal.',
      goodExplanation: 'Direkte Vergleichszahlen statt Behauptungen. Preis, Onboarding-Zeit, NPS, Retention \u2013 alles messbar.'
    },
    {
      id: 30, category: 'competition',
      question: 'Warum baut das nicht jemand, der den Markt schon kennt \u2013 z.B. ein Handwerker-Gro\u00DFh\u00E4ndler?',
      badAnswer: 'Die haben es halt noch nicht gemacht. Die sind nicht so innovativ.',
      badExplanation: 'Arrogant und kurzsichtig. Ein Gro\u00DFh\u00E4ndler hat den Kundenzugang, die Daten und die Marke. Was hast DU?',
      goodAnswer: 'Gro\u00DFh\u00E4ndler denken in Warenmargen, nicht in Software. Ihre DNA ist Logistik, nicht UX. Dazu kommt: Software ist nie das Kerngesch\u00E4ft \u2013 sie w\u00FCrden es halbherzig machen. Wir machen nichts anderes. Aber wir arbeiten MIT Gro\u00DFh\u00E4ndlern: Unsere App integriert deren Kataloge. Win-Win statt Konkurrenz.',
      goodExplanation: 'Statt Arroganz: Partnerschafts-Strategie. Zeigt, dass du den Markt als \u00D6kosystem verstehst.'
    },

    // ===== BUSINESS MODEL & FINANZEN (8) =====
    {
      id: 31, category: 'business',
      question: 'Wie verdient ihr Geld?',
      badAnswer: 'Wir monetarisieren \u00FCber verschiedene Revenue Streams und haben ein Freemium-Modell mit Premium-Features.',
      badExplanation: 'Was hei\u00DFt \u201Everschiedene Streams\u201C? Was kostet es? Was ist Free, was Premium? Das klingt nach: \u201EWir wissen es noch nicht.\u201C',
      goodAnswer: 'SaaS-Abo: 99\u20AC/Monat pro Betrieb. 3 Nutzer inkludiert, unbegrenzte Rechnungen, Lieferschein-Scan. Jeder weitere Nutzer 29\u20AC/Monat. Kein Freemium \u2013 stattdessen 30 Tage kostenlos testen. Durchschnittliche Vertragslaufzeit: 14 Monate.',
      goodExplanation: 'Klar, einfach, nachvollziehbar. Der Investor kann in 10 Sekunden die Unit Economics \u00FCberschlagen.'
    },
    {
      id: 32, category: 'business',
      question: 'Wie sehen eure Unit Economics aus?',
      badAnswer: 'Unsere Unit Economics sind positiv, wir wachsen profitabel.',
      badExplanation: '\u201EPositiv\u201C und \u201Eprofitabel\u201C sind Adjektive, keine Zahlen. Investoren wollen Metriken sehen, keine Meinungen.',
      goodAnswer: 'CAC: 180\u20AC via Google Ads und Messe-Leads. ARPU: 128\u20AC/Monat. Payback Period: 1.4 Monate. LTV bei 14 Monaten Vertragslaufzeit: 1.792\u20AC. LTV:CAC Ratio: ~10:1. Bruttomarge: 82%.',
      goodExplanation: 'Die SaaS-Kernmetriken auf einen Blick. Ein VC-Partner kann das in Sekunden einordnen: LTV:CAC \u00FCber 3:1 = gesund. 10:1 = exzellent.'
    },
    {
      id: 33, category: 'business',
      question: 'Wie viel Funding braucht ihr und wof\u00FCr?',
      badAnswer: 'Wir suchen 500.000\u20AC um zu wachsen und unser Produkt weiterzuentwickeln.',
      badExplanation: '\u201EWachsen\u201C und \u201Eweiterentwickeln\u201C sind keine Use Cases. Wie genau wird jeder Euro eingesetzt? Welche Milestones erreicht ihr damit?',
      goodAnswer: '400.000\u20AC f\u00FCr 18 Monate. 200K f\u00FCr 2 Senior Engineers (mobile App). 120K f\u00FCr Sales & Marketing (von 50 auf 500 Kunden). 80K Buffer. Ziel nach 18 Monaten: 500 zahlende Kunden, 640K ARR, Break-Even auf Monatsbasis.',
      goodExplanation: 'Klare Aufteilung, konkrete Milestones, realistischer Zeitrahmen. Der Investor sieht: Hier gibt es einen Plan, nicht nur eine Hoffnung.'
    },
    {
      id: 34, category: 'business',
      question: 'Wie ist eure aktuelle Burn Rate?',
      badAnswer: 'Die ist OK, wir kommen gut zurecht im Moment.',
      badExplanation: 'Unfassbar vage. Wenn du deine Burn Rate nicht kennst, kennst du dein Business nicht. Das ist Grundwissen.',
      goodAnswer: '12.000\u20AC pro Monat. Davon 8.000\u20AC Geh\u00E4lter (2 Gr\u00FCnder, je 4.000\u20AC), 2.000\u20AC Cloud & Tools, 2.000\u20AC Marketing. Bei aktuellem MRR von 6.400\u20AC ist unser Net Burn 5.600\u20AC. Runway noch 8 Monate.',
      goodExplanation: 'Jeder Euro aufgeschl\u00FCsselt. Tipp: Kenne deine Zahlen auswendig. Wenn ein Investor fragt, solltest du die Zahl in 5 Sekunden parat haben.'
    },
    {
      id: 35, category: 'business',
      question: 'Warum ist euer Produkt so gepreist wie es ist?',
      badAnswer: 'Wir haben uns an der Konkurrenz orientiert und sind etwas g\u00FCnstiger.',
      badExplanation: 'Preis = Wert. Wenn du den Preis nur an der Konkurrenz orientierst, hast du deinen eigenen Wert nicht verstanden.',
      goodAnswer: '99\u20AC/Monat klingt nach viel f\u00FCr einen Handwerker? Unser Produkt spart 10 Stunden/Monat Verwaltung. Bei einem Stundensatz von 60\u20AC sind das 600\u20AC eingesparter Produktivwert. Unser Preis ist 16% des Werts, den wir liefern. Bei Value-Based Pricing k\u00F6nnten wir deutlich mehr verlangen.',
      goodExplanation: 'Value-Based Pricing mit konkreter ROI-Rechnung. Der Investor sieht Pricing Power \u2013 also Raum, den Preis zu erh\u00F6hen.'
    },
    {
      id: 36, category: 'business',
      question: 'Wie lange reicht euer aktuelles Geld?',
      badAnswer: 'Noch eine Weile, wir sind da gut aufgestellt.',
      badExplanation: '\u201EEine Weile\u201C ist keine Antwort. Jeder Investor muss wissen: Wann geht das Geld aus? Das beeinflusst Deal-Urgency und Verhandlungsposition.',
      goodAnswer: '8 Monate Runway bei aktuellem Burn. Bei Plan-Wachstum von 12% MoM erreichen wir in 6 Monaten Break-Even auf Monatsbasis. Das Funding gibt uns Beschleunigung, nicht \u00DCberlebens-Notwendigkeit.',
      goodExplanation: 'Transparenter Runway + die Message: \u201EWir \u00FCberleben auch ohne euch, aber mit euch schneller.\u201C Das ist die st\u00E4rkste Verhandlungsposition.'
    },
    {
      id: 37, category: 'business',
      question: 'Was erwartet ihr als Gegenleistung vom Investor \u2013 au\u00DFer Geld?',
      badAnswer: 'Haupts\u00E4chlich brauchen wir das Kapital. Der Rest ergibt sich dann.',
      badExplanation: 'Verpasste Chance! Geld ist die Baseline. Die besten Gr\u00FCnder wissen, dass ein Investor Network, Expertise und T\u00FCren \u00F6ffnen kann.',
      goodAnswer: 'Drei Dinge: Erstens, Zugang zu eurem Handwerker-Portfolio \u2013 Cross-Selling-Potenzial. Zweitens, Intro zum Leiter der Installateur-Innung Bayern f\u00FCr unsere DACH-Expansion. Drittens, Erfahrung bei der Skalierung von SaaS-Sales-Teams von 0 auf 10.',
      goodExplanation: 'Spezifische, recherchierte Asks. Zeigt: Du hast den Investor vorher analysiert und wei\u00DFt, was er mitbringt.'
    },
    {
      id: 38, category: 'business',
      question: 'Wie sieht eure Cap Table aus?',
      badAnswer: 'Das ist noch nicht ganz final, wir sind da flexibel.',
      badExplanation: 'Red Flag. Eine unklare Cap Table signalisiert: Hier lauern Probleme. Vesting, Anteile, Optionen \u2013 das muss sitzen.',
      goodAnswer: '60/40 zwischen den beiden Gr\u00FCndern. 4 Jahre Vesting mit 1-Jahr Cliff. 10% ESOP-Pool f\u00FCr zuk\u00FCnftige Mitarbeiter reserviert. Keine externen Investoren bisher. Sauber und einfach \u2013 genau so, wie es ein neuer Investor gerne sieht.',
      goodExplanation: 'Klar, standard-konform, vorbereitet. Die ESOP-Reserve zeigt: Ihr habt an die n\u00E4chsten Einstellungen gedacht.'
    },

    // ===== TEAM & GRUENDER (8) =====
    {
      id: 39, category: 'team',
      question: 'Warum seid ausgerechnet ihr das richtige Team?',
      badAnswer: 'Wir sind ein diversifiziertes Team mit komplement\u00E4ren F\u00E4higkeiten und gro\u00DFer Leidenschaft f\u00FCr das Thema.',
      badExplanation: 'LinkedIn-Bio, nicht Interview-Antwort. WARUM seid IHR die Richtigen und nicht die 100 anderen Teams, die dasselbe Problem sehen?',
      goodAnswer: 'Ich bin Installateur-Meister und habe 8 Jahre einen Betrieb mit 12 Mitarbeitern gef\u00FChrt \u2013 ich kenne den Schmerz pers\u00F6nlich. Meine Co-Founderin war 5 Jahre Product Lead bei Lexoffice. Domain-Expertise trifft SaaS-Erfahrung. Wir l\u00F6sen unser eigenes Problem.',
      goodExplanation: 'Founder-Market Fit in zwei S\u00E4tzen. Pers\u00F6nliche Betroffenheit + relevante Berufserfahrung = ein Team, das Investoren Vertrauen gibt.'
    },
    {
      id: 40, category: 'team',
      question: 'Wie habt ihr euch kennengelernt?',
      badAnswer: 'Wir haben uns auf einer Networking-Veranstaltung getroffen und festgestellt, dass wir die gleiche Vision haben.',
      badExplanation: 'Klingt nach Zufall. Investoren pr\u00FCfen, ob die Gr\u00FCnderbeziehung belastbar ist \u2013 65% aller Startups scheitern an Gr\u00FCnder-Konflikten.',
      goodAnswer: 'Sandra hat meinen Handwerksbetrieb als Lexoffice-Kundenbetreuerin betreut. Sie hat 2 Jahre lang gesehen, wie ich mit deren Software k\u00E4mpfe. Irgendwann hat sie gesagt: \u201EDas m\u00FCsste man komplett neu bauen.\u201C 6 Monate sp\u00E4ter haben wir Vollzeit zusammen daran gearbeitet.',
      goodExplanation: 'Organische Geschichte, gemeinsame Erfahrung, nat\u00FCrliche Chemie. Die Beziehung hat Substanz \u2013 nicht nur eine geteilte Vision.'
    },
    {
      id: 41, category: 'team',
      question: 'Was passiert, wenn ein Co-Founder abspringt?',
      badAnswer: 'Das wird nicht passieren, wir verstehen uns super gut.',
      badExplanation: 'Naiv. 65% aller Startup-Todesf\u00E4lle sind auf Gr\u00FCnder-Konflikte zur\u00FCckzuf\u00FChren. Investoren wollen Realismus, keine Romantik.',
      goodAnswer: 'Abgesichert: 4-Jahres-Vesting mit 1-Jahr Cliff. Good/Bad Leaver im Gesellschaftervertrag geregelt. Externer Mediator vereinbart. Und ehrlich: Nach einer bereits \u00FCberstandenen Krise \u2013 wir haben uns \u00FCber die Produktstrategie heftig gestritten \u2013 wissen wir, dass wir auch unter Druck funktionieren.',
      goodExplanation: 'Juristische Absicherung + ehrliche Reflexion \u00FCber eine bereits \u00FCberstandene Krise. DAS \u00FCberzeugt.'
    },
    {
      id: 42, category: 'team',
      question: 'Wer macht was im Team?',
      badAnswer: 'Wir machen eigentlich alles zusammen und teilen uns die Aufgaben flexibel auf.',
      badExplanation: 'Keine klaren Verantwortlichkeiten = keine klare F\u00FChrung. Investoren sehen hier Chaos, nicht Flexibilit\u00E4t.',
      goodAnswer: 'Ich bin CEO: Vertrieb, Kundenbeziehungen und Innung-Partnerschaften \u2013 mein Netzwerk aus 8 Jahren Handwerk. Sandra ist CTO: Produktentwicklung, Backend, Machine Learning. \u00DCberlappung gibt es bewusst nur beim Produkt-Design \u2013 da challengen wir uns gegenseitig.',
      goodExplanation: 'Klare Rollen mit Begr\u00FCndung. Die eine bewusste \u00DCberlappung zeigt: Ihr habt dar\u00FCber nachgedacht.'
    },
    {
      id: 43, category: 'team',
      question: 'Wen w\u00FCrdet ihr als N\u00E4chstes einstellen?',
      badAnswer: 'Wahrscheinlich noch einen Entwickler, um schneller Features bauen zu k\u00F6nnen.',
      badExplanation: 'Vage und ohne strategischen Zusammenhang. WELCHEN Entwickler? F\u00FCr WELCHES Problem? Mit welcher Auswirkung?',
      goodAnswer: 'Einen Senior Mobile Engineer, spezialisiert auf React Native. Warum: 68% unserer Nutzung passiert mobil, aber unsere App ist noch ein Wrapper. Native-Feeling wird unsere Retention um gesch\u00E4tzt 15% verbessern. Wir haben bereits 3 Kandidaten in der Pipeline.',
      goodExplanation: 'Rolle \u2192 Begr\u00FCndung \u2192 erwarteter Impact \u2192 Pipeline. Zeigt: Du denkst strategisch \u00FCber Hiring nach, nicht reaktiv.'
    },
    {
      id: 44, category: 'team',
      question: 'Welche Domain-Expertise habt ihr?',
      badAnswer: 'Wir haben uns intensiv mit dem Markt besch\u00E4ftigt und viel recherchiert.',
      badExplanation: 'Recherche ist nicht Expertise. Investoren suchen \u201EEarned Secrets\u201C \u2013 Wissen, das man nur durch Jahre im Markt bekommt.',
      goodAnswer: 'Ich habe 8 Jahre lang jeden Tag Rechnungen geschrieben, Material bestellt und Lehrlinge eingearbeitet. Ich kenne die 47 h\u00E4ufigsten Installateur-Materialien auswendig, wei\u00DF welche Lieferanten 30 Tage Zahlungsziel geben und warum Handwerker Excel hassen aber trotzdem nutzen.',
      goodExplanation: 'DAS ist Domain-Expertise. Spezifisch, erlebt, nicht angelesen. Ein VC sp\u00FCrt sofort: Diese Person lebt in der Welt ihrer Kunden.'
    },
    {
      id: 45, category: 'team',
      question: 'Wer ist \u201Eder Boss\u201C?',
      badAnswer: 'Wir sind gleichberechtigt, bei uns gibt es keine Hierarchie.',
      badExplanation: 'Klingt nett, ist aber ein Problem. Wer entscheidet bei Uneinigkeit? Investoren brauchen eine klare Ansprechperson.',
      goodAnswer: 'Ich bin CEO und treffe die finalen Entscheidungen bei Strategie, Vertrieb und Fundraising. Sandra entscheidet final \u00FCber Produkt und Tech. Bei fundamentalen Uneinigkeiten \u2013 hatten wir bisher zweimal \u2013 diskutieren wir mit Zeitlimit und ich habe den Stichentscheid. Das haben wir schriftlich geregelt.',
      goodExplanation: 'Klare Governance, auch f\u00FCr Konfliktsituationen. Investoren investieren nicht in Demokratien, sondern in F\u00FChrung.'
    },
    {
      id: 46, category: 'team',
      question: 'Was ist die beeindruckendste Sache, die ihr zusammen erreicht habt?',
      badAnswer: 'Wir haben unser MVP in nur 3 Monaten gebaut.',
      badExplanation: 'Okay, aber nicht beeindruckend. Was habt ihr geschafft, das zeigt, wie ihr unter Druck arbeitet und Ergebnisse liefert?',
      goodAnswer: 'In unserer 3. Woche ist unser Server am Freitagabend abgest\u00FCrzt \u2013 mitten in der Rechnungs-Saison unserer Pilot-Kunden. Sandra hat 14 Stunden durchgearbeitet, ich habe jeden der 34 betroffenen Kunden pers\u00F6nlich angerufen und entschuldigt. Montag fr\u00FCh lief alles. Kein einziger Kunde hat gecancelled. Drei haben danach gesagt: \u201EJetzt wei\u00DF ich, dass ihr es ernst meint.\u201C',
      goodExplanation: 'Eine Geschichte, die zeigt: Krise \u2192 Teamwork \u2192 Kundenbindung. Das bleibt h\u00E4ngen \u2013 mehr als jede Metrik.'
    },

    // ===== TRACTION & METRICS (7) =====
    {
      id: 47, category: 'traction',
      question: 'Welche Traction habt ihr bisher?',
      badAnswer: 'Wir haben viel positives Feedback und einige Interessenten auf unserer Warteliste.',
      badExplanation: 'Feedback \u2260 Traction. Warteliste \u2260 Kunden. Traction = messbare Beweise, dass jemand zahlt, nutzt oder wiederkehrt.',
      goodAnswer: 'Gestartet vor 8 Monaten. 50 zahlende Kunden, 6.400\u20AC MRR, 12% MoM-Wachstum. NPS von 72. Ein Kunde hat uns unaufgefordert an 3 Kollegen empfohlen \u2013 viraler Koeffizient liegt bei 0.3.',
      goodExplanation: 'Harte Zahlen, die f\u00FCr sich sprechen. Revenue, Wachstum, Zufriedenheit und organisches Wachstum \u2013 die vier Metriken, die Investoren sehen wollen.'
    },
    {
      id: 48, category: 'traction',
      question: 'Was sind eure wichtigsten KPIs?',
      badAnswer: 'Wir tracken eigentlich alles \u2013 Downloads, Seitenaufrufe, Social Media Follower.',
      badExplanation: 'Vanity Metrics! Downloads zahlen keine Geh\u00E4lter. Wenn du alles trackst, hast du keinen Fokus.',
      goodAnswer: 'Drei North Stars: MRR und MRR-Wachstum \u2013 aktuell 6.400\u20AC, Ziel 15.000\u20AC in 6 Monaten. Monthly Active Usage Rate \u2013 78% nutzen die App 4x/Woche. Time-to-Value \u2013 neue Kunden erstellen erste Rechnung in unter 8 Minuten.',
      goodExplanation: 'Revenue, Engagement, Onboarding \u2013 die drei S\u00E4ulen eines SaaS-Business. Fokussiert statt ersch\u00F6pfend.'
    },
    {
      id: 49, category: 'traction',
      question: 'Wie ist euer Wachstum?',
      badAnswer: 'Wir wachsen kontinuierlich und gewinnen regelm\u00E4\u00DFig neue Kunden.',
      badExplanation: '\u201EKontinuierlich\u201C und \u201Eregelm\u00E4\u00DFig\u201C \u2013 wie viel? 1% pro Monat oder 30%? Ohne Zahl ist die Antwort wertlos.',
      goodAnswer: '12% MoM Revenue-Wachstum in den letzten 4 Monaten. Von 18 auf 50 zahlende Kunden in 6 Monaten. MRR von 2.300\u20AC auf 6.400\u20AC. Bei gleichbleibendem Tempo erreichen wir 15.000\u20AC MRR in 6 Monaten.',
      goodExplanation: 'Konkrete Growth Rate + Trendlinie + Projektion. Der Investor kann die Zahlen \u00FCberpr\u00FCfen und nach vorne modellieren.'
    },
    {
      id: 50, category: 'traction',
      question: 'Warum seid ihr nicht weiter?',
      badAnswer: 'Wir wollten erst das Produkt perfektionieren, bevor wir skalieren.',
      badExplanation: 'Perfektionismus ist kein Argument \u2013 er ist eine Ausrede. Launch early and iterate \u2013 Warten kostet Lerngelegenheiten.',
      goodAnswer: 'Faire Frage. Wir haben die ersten 4 Monate zu viel in Features investiert statt in Distribution. Das haben wir vor 4 Monaten korrigiert: Sales-fokussierter, pers\u00F6nliche Innung-Besuche, weniger Feature-Building. Seitdem 12% MoM statt vorher 3%.',
      goodExplanation: 'Ehrliches Eingestehen eines Fehlers + konkrete Korrektur + messbare Verbesserung. DAS zeigt Lernf\u00E4higkeit.'
    },
    {
      id: 51, category: 'traction',
      question: 'Wie hoch ist eure Churn Rate?',
      badAnswer: 'Die ist relativ niedrig, die meisten Kunden bleiben bei uns.',
      badExplanation: 'Wenn man dich nach einer Zahl fragt, sag die Zahl. \u201ERelativ niedrig\u201C ist keine Antwort, es ist ein Ausweichman\u00F6ver.',
      goodAnswer: '4.8% monatlich. Davon sind 2% Business-Churn \u2013 der Betrieb schlie\u00DFt oder wechselt den Inhaber. Echte Produkt-Churn liegt bei 2.8%. Hauptgrund: Betriebe unter 3 Mitarbeitern finden den Preis zu hoch. Wir testen gerade ein Starter-Abo f\u00FCr 49\u20AC.',
      goodExplanation: 'Zahl + Aufschl\u00FCsselung + Ursache + bereits eingeleitete Gegenma\u00DFnahme. Zeigt: Du VERSTEHST deine Churn, nicht nur die Zahl.'
    },
    {
      id: 52, category: 'traction',
      question: 'Kommen eure Kunden wieder oder sind es Einmal-K\u00E4ufer?',
      badAnswer: 'Die meisten kommen wieder und sind zufrieden.',
      badExplanation: '\u201EDie meisten\u201C ist vage. 51% ist auch \u201Edie meisten\u201C. Zahlen, bitte.',
      goodAnswer: 'SaaS-Abo also per Definition wiederkehrend. Aber die echte Metrik: 78% Active Usage Rate pro Monat. 92% unserer Kunden erstellen mindestens 10 Rechnungen pro Monat. Und: Unser Net Revenue Retention liegt bei 108% \u2013 bestehende Kunden geben \u00FCber die Zeit MEHR aus, weil sie zus\u00E4tzliche Nutzer hinzuf\u00FCgen.',
      goodExplanation: 'Active Usage + Net Revenue Retention \u00FCber 100% = negativer Churn in Dollar-Termen. DAS ist die Metrik, die Investoren lieben.'
    },
    {
      id: 53, category: 'traction',
      question: 'Was war euer gr\u00F6\u00DFter Fehler bisher?',
      badAnswer: 'Eigentlich haben wir nicht viele Fehler gemacht. Wir sind gut vorangekommen.',
      badExplanation: 'Unglaubw\u00FCrdig. Jedes Startup macht Fehler. Wer keine nennt, reflektiert nicht \u2013 oder l\u00FCgt. Investoren sch\u00E4tzen offene Fehler-Diskussionen.',
      goodAnswer: 'Wir haben 3 Monate ein KI-Feature gebaut, das Material-Preise automatisch aktualisiert. Hat 40.000\u20AC gekostet. Die Kunden haben es ignoriert \u2013 sie pflegen ihre Preise lieber selbst, weil sie individuelle Konditionen mit Gro\u00DFh\u00E4ndlern haben. Lektion: Build with customers, nicht f\u00FCr sie.',
      goodExplanation: 'Konkreter Fehler + Kosten + Lektion. Zeigt Selbstreflexion und die wichtigste Gr\u00FCnder-Eigenschaft: aus Fehlern lernen.'
    },

    // ===== GTM, RISIKEN & EXIT (7) =====
    {
      id: 54, category: 'gtm',
      question: 'Wie gewinnt ihr Kunden?',
      badAnswer: 'Haupts\u00E4chlich \u00FCber Social Media und Word of Mouth. Wir machen auch ein bisschen Content Marketing.',
      badExplanation: 'Kein Plan, keine Zahlen, kein System. \u201EEin bisschen\u201C ist keine Go-to-Market-Strategie.',
      goodAnswer: 'Drei Kan\u00E4le, priorisiert nach CAC: Innungs-Partnerschaften \u2013 die Installateur-Innung Burgenland empfiehlt uns, CAC ~0\u20AC. Google Ads auf \u201EHandwerker Rechnungssoftware\u201C \u2013 CAC 180\u20AC, konvertiert in 14 Tagen. Fachmessen \u2013 8 Leads pro Tag, CAC 220\u20AC. 70% Budget flie\u00DFt in Kanal 1 und 2.',
      goodExplanation: 'Drei Kan\u00E4le mit CAC pro Kanal und klarer Priorisierung. Der Investor sieht einen Plan, keine Hoffnung.'
    },
    {
      id: 55, category: 'gtm',
      question: 'Wie sieht euer Sales-Prozess aus?',
      badAnswer: 'Wir setzen auf Product-Led Growth \u2013 das Produkt verkauft sich quasi von selbst.',
      badExplanation: 'PLG ist eine Strategie, keine Magie. \u201EVerkauft sich von selbst\u201C zeigt fehlendes Verst\u00E4ndnis f\u00FCr den Verkaufsprozess.',
      goodAnswer: 'Dreistufig: Lead kommt \u00FCber Google/Innung/Messe \u2192 30-Tage-Trial mit pers\u00F6nlichem Onboarding-Call (20 Min) \u2192 Check-in am Tag 21. Conversion Trial-to-Paid: 38%. Deal Cycle: 35 Tage. Aktuell mache ich Sales selbst \u2013 ab Kunde 100 stellen wir den ersten AE ein.',
      goodExplanation: 'Konkreter Funnel mit Metriken an jedem Schritt und einem klaren Skalierungsplan.'
    },
    {
      id: 56, category: 'gtm',
      question: 'Was ist euer gr\u00F6\u00DFtes Risiko?',
      badAnswer: 'Eigentlich sehen wir keine gro\u00DFen Risiken. Wir sind gut aufgestellt.',
      badExplanation: 'DAS ist das gr\u00F6\u00DFte Risiko \u2013 ein Gr\u00FCnder, der keine Risiken sieht. Investoren vertrauen Gr\u00FCndern, die Risiken proaktiv benennen und managen.',
      goodAnswer: 'Unser gr\u00F6\u00DFtes Risiko: Single-Channel-Abh\u00E4ngigkeit. 60% unserer Neukunden kommen \u00FCber die Installateur-Innung Burgenland. Wenn diese Partnerschaft wegf\u00E4llt, bricht unser Wachstum ein. Deswegen bauen wir gerade Innungs-Partnerschaften in Nieder\u00F6sterreich und Steiermark auf.',
      goodExplanation: 'Ehrliche Risikoanalyse + aktive Mitigation. Das ist 10x \u00FCberzeugender als \u201Ekeine Risiken\u201C.'
    },
    {
      id: 57, category: 'gtm',
      question: 'Was passiert, wenn eure Hauptannahme falsch ist?',
      badAnswer: 'Das wird nicht passieren, wir haben das gut validiert.',
      badExplanation: 'Jede Annahme kann falsch sein. Die Frage testet dein Szenario-Denken, nicht deinen Optimismus.',
      goodAnswer: 'Unsere Hauptannahme: Handwerker wollen eine branchenspezifische L\u00F6sung statt eines generischen Tools. Wenn das falsch ist, haben wir Plan B: Wir werden zur Schnittstelle zwischen bestehenden Tools und Handwerkern \u2013 Middleware statt Frontend. Unsere Lieferschein-Erkennung funktioniert in beiden Szenarien.',
      goodExplanation: 'Plan B, der auf denselben Kernkompetenzen aufbaut. Zeigt strategisches Denken unter Unsicherheit.'
    },
    {
      id: 58, category: 'gtm',
      question: 'Wie skaliert ihr, ohne proportional Personal aufzubauen?',
      badAnswer: 'Unser Produkt ist digital, das skaliert automatisch.',
      badExplanation: 'Software skaliert, Support und Sales nicht. Investoren wollen verstehen: Was passiert bei 10x Kunden?',
      goodAnswer: 'Drei Hebel: Erstens, Self-Service-Onboarding \u2013 wir reduzieren den pers\u00F6nlichen Call von 20 auf 5 Minuten durch In-App-Tutorials. Zweitens, Community \u2013 ein Slack-Kanal, in dem Kunden sich gegenseitig helfen. Drittens, Partner-Vertrieb \u00FCber Innungen und Gro\u00DFh\u00E4ndler statt eigener Sales-Mannschaft.',
      goodExplanation: 'Drei konkrete Skalierungshebel, die Personal-Wachstum entkoppeln. Zeigt operative Skalierbarkeit.'
    },
    {
      id: 59, category: 'gtm',
      question: 'Was macht ihr, wenn wir nicht investieren?',
      badAnswer: 'Dann m\u00FCssen wir leider langsamer wachsen und andere Investoren suchen.',
      badExplanation: 'Klingt abh\u00E4ngig und verzweifelt. Der st\u00E4rkste Pitch ist: \u201EWir schaffen es auch ohne euch \u2013 aber mit euch schneller.\u201C',
      goodAnswer: 'Weitermachen. Wir sind in 6 Monaten cashflow-positiv bei aktuellem Wachstum. Das Investment beschleunigt unsere DACH-Expansion um 18 Monate. Ohne euch kommen wir dahin \u2013 aber 2 Jahre sp\u00E4ter. Die Frage ist: Wollt ihr dabei sein, wenn der Markt gerade kippt?',
      goodExplanation: 'St\u00E4rke zeigen. \u201EWir \u00FCberleben ohne euch\u201C + \u201Edie Opportunity hat ein Zeitfenster\u201C = FOMO beim Investor. Die attraktivsten Gr\u00FCnder sind die, die das Investment am wenigsten brauchen.'
    },
    {
      id: 60, category: 'gtm',
      question: 'Wie sieht ein Exit-Szenario aus?',
      badAnswer: 'Dar\u00FCber machen wir uns noch keine Gedanken, wir sind noch in einer fr\u00FChen Phase.',
      badExplanation: 'Investoren investieren MIT einem Exit im Kopf. Wenn du keinen hast, wissen sie nicht, wie sie ihr Geld zur\u00FCckbekommen.',
      goodAnswer: 'Drei Szenarien: Strategische \u00DCbernahme durch einen Tool-Anbieter wie Lexoffice oder DATEV \u2013 wir bringen Handwerker-Kunden, die sie nie erreichen. PE Buyout ab 5 Mio. ARR als profitable Nischen-SaaS. Oder weiterwachsen und selbst zum Platform-Player werden. Realistischstes Szenario: M&A in 5-7 Jahren bei 8-15x ARR Multiple.',
      goodExplanation: 'Mehrere Exit-Pfade mit realistischen Multiples. Der Investor sieht: Du denkst \u00FCber den Return nach \u2013 nicht nur \u00FCber das Produkt.'
    }
  ];

  // ── State ───────────────────────────────────────────────
  var state = {
    screen: 'EMAIL_GATE',       // EMAIL_GATE | CATEGORIES | QUESTION_FLOW
    questionPhase: 'QUESTION',  // QUESTION | BAD | GOOD | TIMER | EVAL | RESULT
    currentQuestion: null,
    currentCategory: null,
    evalChecked: [],
    evalScore: 0,
    timerRunning: false,
    timerStart: 0,
    timerRaf: null,
    progress: {},               // { questionId: score }
    user: null                  // { name, email }
  };

  var appEl = null;

  // ── LocalStorage ────────────────────────────────────────
  function saveProgress() {
    try { localStorage.setItem(FT_CONFIG.STORAGE_KEY, JSON.stringify(state.progress)); } catch (e) {}
  }
  function loadProgress() {
    try {
      var d = localStorage.getItem(FT_CONFIG.STORAGE_KEY);
      if (d) state.progress = JSON.parse(d);
    } catch (e) {}
  }
  function saveUser() {
    try { localStorage.setItem(FT_CONFIG.USER_KEY, JSON.stringify(state.user)); } catch (e) {}
  }
  function loadUser() {
    try {
      var d = localStorage.getItem(FT_CONFIG.USER_KEY);
      if (d) state.user = JSON.parse(d);
    } catch (e) {}
  }

  // ── Helpers ─────────────────────────────────────────────
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function questionsForCategory(catKey) {
    return FT_QUESTIONS.filter(function (q) { return q.category === catKey; });
  }

  function completedInCategory(catKey) {
    var qs = questionsForCategory(catKey);
    var count = 0;
    qs.forEach(function (q) { if (state.progress[q.id] !== undefined) count++; });
    return count;
  }

  function totalCompleted() {
    return Object.keys(state.progress).length;
  }

  // ── Navigation (pushState) ──────────────────────────────
  function pushState(screenName) {
    var s = { screen: screenName };
    if (screenName === 'QUESTION_FLOW' && state.currentCategory) {
      s.category = state.currentCategory;
    }
    try { history.pushState(s, '', ''); } catch (e) {}
  }

  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.screen) {
      if (e.state.screen === 'CATEGORIES') {
        state.screen = 'CATEGORIES';
        state.currentQuestion = null;
        state.currentCategory = null;
        cancelTimer();
        render();
      } else if (e.state.screen === 'EMAIL_GATE') {
        state.screen = 'EMAIL_GATE';
        cancelTimer();
        render();
      }
    } else {
      // Default: go to categories if user exists
      if (state.user) {
        state.screen = 'CATEGORIES';
        state.currentQuestion = null;
        state.currentCategory = null;
        cancelTimer();
        render();
      }
    }
  });

  // ── Timer ───────────────────────────────────────────────
  function cancelTimer() {
    state.timerRunning = false;
    if (state.timerRaf) {
      cancelAnimationFrame(state.timerRaf);
      state.timerRaf = null;
    }
  }

  function startTimer() {
    state.timerRunning = true;
    state.timerStart = performance.now();
    tickTimer();
  }

  function tickTimer() {
    if (!state.timerRunning) return;
    var elapsed = (performance.now() - state.timerStart) / 1000;
    var remaining = Math.max(0, FT_CONFIG.TIMER_DURATION - elapsed);

    // Update timer display
    var numEl = document.getElementById('ft-timer-number');
    var circleEl = document.getElementById('ft-timer-circle');
    if (numEl) numEl.textContent = Math.ceil(remaining);
    if (circleEl) {
      var circumference = 2 * Math.PI * 54;
      var offset = circumference * (1 - remaining / FT_CONFIG.TIMER_DURATION);
      circleEl.style.strokeDashoffset = offset;
    }

    if (remaining <= 0) {
      state.timerRunning = false;
      state.questionPhase = 'EVAL';
      render();
      return;
    }
    state.timerRaf = requestAnimationFrame(tickTimer);
  }

  // ── Render ──────────────────────────────────────────────
  function render() {
    if (!appEl) return;
    var html = '';
    switch (state.screen) {
      case 'EMAIL_GATE':  html = renderEmailGate();  break;
      case 'CATEGORIES':  html = renderCategories();  break;
      case 'QUESTION_FLOW': html = renderQuestionFlow(); break;
    }
    appEl.innerHTML = '<div class="ft-screen ft-fade-in">' + html + '</div>';
    bindEvents();
  }

  // ── Screen: Email Gate ──────────────────────────────────
  function renderEmailGate() {
    return '<div class="ft-email-gate">' +
      '<div class="ft-gate-card">' +
        '<div class="ft-gate-icon">' +
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' +
          '</svg>' +
        '</div>' +
        '<h2 class="ft-gate-title">60 Investor-Fragen trainieren</h2>' +
        '<p class="ft-gate-subtitle">Trainiere die h\u00E4ufigsten Investoren-Fragen mit Timer, Beispielantworten und Selbstbewertung.</p>' +
        '<form id="ft-gate-form">' +
          '<div class="ft-form-group">' +
            '<label for="ft-name">Name</label>' +
            '<input type="text" id="ft-name" placeholder="Dein Name" required>' +
          '</div>' +
          '<div class="ft-form-group">' +
            '<label for="ft-email">E-Mail</label>' +
            '<input type="email" id="ft-email" placeholder="deine@email.at" required>' +
          '</div>' +
          '<div class="ft-checkbox-group">' +
            '<input type="checkbox" id="ft-dsgvo" required>' +
            '<label for="ft-dsgvo">Ich stimme der <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">Datenschutzerkl\u00E4rung</a> zu.</label>' +
          '</div>' +
          '<button type="submit" class="ft-btn ft-btn-primary">Jetzt starten</button>' +
        '</form>' +
      '</div>' +
    '</div>';
  }

  // ── Screen: Categories ──────────────────────────────────
  function renderCategories() {
    var total = totalCompleted();
    var html = '<div class="ft-categories">';
    html += '<div class="ft-cat-header">';
    html += '<h2 class="ft-cat-title">W\u00E4hle eine Kategorie</h2>';
    html += '<p class="ft-cat-progress">' + total + ' von 60 Fragen bearbeitet</p>';
    html += '<div class="ft-progress-bar-total"><div class="ft-progress-fill" style="width:' + (total / 60 * 100) + '%"></div></div>';
    html += '</div>';
    html += '<div class="ft-cat-grid">';

    var catKeys = Object.keys(FT_CATEGORIES);
    catKeys.forEach(function (key) {
      var cat = FT_CATEGORIES[key];
      var qs = questionsForCategory(key);
      var done = completedInCategory(key);
      var pct = qs.length > 0 ? (done / qs.length * 100) : 0;

      html += '<div class="ft-cat-card" data-category="' + key + '">';
      html += '<div class="ft-cat-card-icon" style="background:' + cat.color + '">' + cat.icon + '</div>';
      html += '<h3 class="ft-cat-card-name">' + esc(cat.name) + '</h3>';
      html += '<p class="ft-cat-card-count">' + done + '/' + qs.length + ' Fragen</p>';
      html += '<div class="ft-progress-bar"><div class="ft-progress-fill" style="width:' + pct + '%;background:' + cat.color + '"></div></div>';
      html += '</div>';
    });

    html += '</div>';

    // CTA Banner after threshold
    if (total >= FT_CONFIG.CTA_THRESHOLD) {
      html += '<div class="ft-cta-banner">';
      html += '<div class="ft-cta-content">';
      html += '<h3>Bereit f\u00FCr echte Investoren?</h3>';
      html += '<p>Du hast bereits ' + total + ' Fragen trainiert. Buche jetzt ein pers\u00F6nliches Pitch-Coaching mit unseren Experten.</p>';
      html += '</div>';
      html += '<a href="' + FT_CONFIG.CTA_URL + '" class="ft-btn ft-btn-white" target="_blank" rel="noopener noreferrer">Coaching buchen</a>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  // ── Screen: Question Flow ───────────────────────────────
  function renderQuestionFlow() {
    var q = state.currentQuestion;
    if (!q) return '<p>Fehler: Keine Frage ausgew\u00E4hlt.</p>';
    var cat = FT_CATEGORIES[q.category];
    var html = '<div class="ft-question-flow">';

    // Back button
    html += '<button class="ft-back-btn" id="ft-back">';
    html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
    html += ' Zur\u00FCck zu Kategorien';
    html += '</button>';

    // Category badge
    html += '<div class="ft-q-badge" style="background:' + cat.color + '">' + cat.icon + ' ' + esc(cat.name) + '</div>';

    switch (state.questionPhase) {
      case 'QUESTION':
        html += renderPhaseQuestion(q);
        break;
      case 'BAD':
        html += renderPhaseBad(q);
        break;
      case 'GOOD':
        html += renderPhaseGood(q);
        break;
      case 'TIMER':
        html += renderPhaseTimer(q);
        break;
      case 'EVAL':
        html += renderPhaseEval(q);
        break;
      case 'RESULT':
        html += renderPhaseResult(q);
        break;
    }

    html += '</div>';
    return html;
  }

  function renderPhaseQuestion(q) {
    return '<div class="ft-phase">' +
      '<div class="ft-q-card">' +
        '<span class="ft-q-number">Frage ' + q.id + ' von 60</span>' +
        '<h3 class="ft-q-text">' + esc(q.question) + '</h3>' +
        '<p class="ft-q-tip">Tipp: Versuche deine Antwort in unter ' + FT_CONFIG.WORD_LIMIT + ' W\u00F6rtern zu formulieren.</p>' +
      '</div>' +
      '<button class="ft-btn ft-btn-primary" id="ft-next">Schlechte Antwort ansehen</button>' +
    '</div>';
  }

  function renderPhaseBad(q) {
    return '<div class="ft-phase">' +
      '<div class="ft-q-card">' +
        '<span class="ft-q-number">Frage ' + q.id + ' von 60</span>' +
        '<h3 class="ft-q-text">' + esc(q.question) + '</h3>' +
      '</div>' +
      '<div class="ft-answer-card ft-answer-bad">' +
        '<div class="ft-answer-label">Schlechte Antwort</div>' +
        '<p class="ft-answer-text">' + esc(q.badAnswer) + '</p>' +
        '<div class="ft-answer-explanation">' +
          '<strong>Warum schlecht?</strong> ' + esc(q.badExplanation) +
        '</div>' +
      '</div>' +
      '<button class="ft-btn ft-btn-primary" id="ft-next">Gute Antwort ansehen</button>' +
    '</div>';
  }

  function renderPhaseGood(q) {
    return '<div class="ft-phase">' +
      '<div class="ft-q-card">' +
        '<span class="ft-q-number">Frage ' + q.id + ' von 60</span>' +
        '<h3 class="ft-q-text">' + esc(q.question) + '</h3>' +
      '</div>' +
      '<div class="ft-answer-card ft-answer-good">' +
        '<div class="ft-answer-label">Gute Antwort</div>' +
        '<p class="ft-answer-text">' + esc(q.goodAnswer) + '</p>' +
        '<div class="ft-answer-explanation">' +
          '<strong>Warum gut?</strong> ' + esc(q.goodExplanation) +
        '</div>' +
      '</div>' +
      '<button class="ft-btn ft-btn-primary" id="ft-next">Jetzt \u00FCben (30 Sek.)</button>' +
    '</div>';
  }

  function renderPhaseTimer(q) {
    var circumference = 2 * Math.PI * 54;
    return '<div class="ft-phase ft-phase-timer">' +
      '<h3 class="ft-q-text ft-timer-question">' + esc(q.question) + '</h3>' +
      '<div class="ft-timer-container">' +
        '<svg class="ft-timer-svg" viewBox="0 0 120 120">' +
          '<circle cx="60" cy="60" r="54" fill="none" stroke="#e9ecef" stroke-width="6"/>' +
          '<circle id="ft-timer-circle" cx="60" cy="60" r="54" fill="none" stroke="#E63946" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="0" transform="rotate(-90 60 60)"/>' +
        '</svg>' +
        '<span id="ft-timer-number" class="ft-timer-number">' + FT_CONFIG.TIMER_DURATION + '</span>' +
      '</div>' +
      '<p class="ft-timer-hint">Formuliere jetzt deine Antwort laut \u2013 in unter ' + FT_CONFIG.WORD_LIMIT + ' W\u00F6rtern.</p>' +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
      '<button class="ft-btn ft-btn-outline" id="ft-restart-timer" style="width:auto;flex:1;min-width:180px;"><i class="fa-solid fa-rotate-right" style="margin-right:8px;"></i>Nochmal starten</button>' +
      '<button class="ft-btn ft-btn-outline" id="ft-skip-timer" style="width:auto;flex:1;min-width:180px;">Weiter zur Bewertung</button>' +
    '</div>' +
    '</div>';
  }

  function renderPhaseEval(q) {
    var html = '<div class="ft-phase">' +
      '<div class="ft-q-card">' +
        '<h3 class="ft-eval-title">Selbstbewertung</h3>' +
        '<p class="ft-eval-subtitle">Wie gut war deine Antwort auf: \u201E' + esc(q.question) + '\u201C</p>' +
      '</div>' +
      '<div class="ft-eval-list">';

    SELF_EVAL_CRITERIA.forEach(function (c, i) {
      html += '<label class="ft-eval-item">' +
        '<input type="checkbox" class="ft-eval-check" data-index="' + i + '">' +
        '<span class="ft-eval-checkmark"></span>' +
        '<span class="ft-eval-label">' + esc(c.label) + '</span>' +
      '</label>';
    });

    html += '</div>' +
      '<button class="ft-btn ft-btn-primary" id="ft-submit-eval">Auswertung zeigen</button>' +
    '</div>';
    return html;
  }

  function renderPhaseResult(q) {
    var score = state.evalScore;
    var good = score >= 3;
    var html = '<div class="ft-phase">';
    html += '<div class="ft-result-card ' + (good ? 'ft-result-good' : 'ft-result-bad') + '">';
    html += '<div class="ft-result-score">' + score + '/5</div>';
    html += '<h3 class="ft-result-title">' + (good ? 'Gut, weiter!' : 'Nochmal \u00FCben') + '</h3>';
    html += '<p class="ft-result-text">' + (good
      ? 'Solide Leistung! Du hast die wichtigsten Punkte getroffen.'
      : 'Noch nicht \u00FCberzeugend genug. Schau dir die gute Antwort nochmal an und versuche es erneut.') + '</p>';
    html += '</div>';

    if (!good) {
      html += '<button class="ft-btn ft-btn-outline" id="ft-retry">Nochmal versuchen</button>';
    }
    html += '<button class="ft-btn ft-btn-primary" id="ft-next-question">N\u00E4chste Frage</button>';
    html += '</div>';
    return html;
  }

  // ── Event Binding ───────────────────────────────────────
  function bindEvents() {
    // Email gate form
    var form = document.getElementById('ft-gate-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('ft-name').value.trim();
        var email = document.getElementById('ft-email').value.trim();
        var dsgvo = document.getElementById('ft-dsgvo').checked;
        if (!name || !email || !dsgvo) return;
        state.user = { name: name, email: email };
        saveUser();
        // Lead data saved locally
        if (FT_CONFIG.API_ENDPOINT) {
          try {
            fetch(FT_CONFIG.API_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(state.user)
            }).catch(function () {});
          } catch (err) {}
        }
        state.screen = 'CATEGORIES';
        pushState('CATEGORIES');
        render();
      });
    }

    // Category cards
    var catCards = document.querySelectorAll('.ft-cat-card');
    catCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var catKey = this.getAttribute('data-category');
        openCategory(catKey);
      });
    });

    // Back button
    var backBtn = document.getElementById('ft-back');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        cancelTimer();
        state.screen = 'CATEGORIES';
        state.currentQuestion = null;
        state.currentCategory = null;
        render();
      });
    }

    // Next button (phases)
    var nextBtn = document.getElementById('ft-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        advancePhase();
      });
    }

    // Restart timer
    var restartBtn = document.getElementById('ft-restart-timer');
    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        cancelTimer();
        state.questionPhase = 'TIMER';
        render();
      });
    }

    // Skip timer
    var skipBtn = document.getElementById('ft-skip-timer');
    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        cancelTimer();
        state.questionPhase = 'EVAL';
        render();
      });
    }

    // Submit eval
    var evalBtn = document.getElementById('ft-submit-eval');
    if (evalBtn) {
      evalBtn.addEventListener('click', function () {
        var checks = document.querySelectorAll('.ft-eval-check');
        var score = 0;
        checks.forEach(function (c) { if (c.checked) score++; });
        state.evalScore = score;
        state.progress[state.currentQuestion.id] = score;
        saveProgress();
        state.questionPhase = 'RESULT';
        render();
      });
    }

    // Retry
    var retryBtn = document.getElementById('ft-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', function () {
        state.questionPhase = 'QUESTION';
        render();
      });
    }

    // Next question
    var nextQBtn = document.getElementById('ft-next-question');
    if (nextQBtn) {
      nextQBtn.addEventListener('click', function () {
        goToNextQuestion();
      });
    }

    // Start timer if in timer phase
    if (state.questionPhase === 'TIMER' && !state.timerRunning) {
      startTimer();
    }
  }

  // ── Actions ─────────────────────────────────────────────
  function openCategory(catKey) {
    state.currentCategory = catKey;
    var qs = questionsForCategory(catKey);
    // Find first unanswered question, or first question
    var next = qs.find(function (q) { return state.progress[q.id] === undefined; });
    if (!next) next = qs[0];
    state.currentQuestion = next;
    state.questionPhase = 'QUESTION';
    state.screen = 'QUESTION_FLOW';
    pushState('QUESTION_FLOW');
    render();
  }

  function advancePhase() {
    switch (state.questionPhase) {
      case 'QUESTION': state.questionPhase = 'BAD'; break;
      case 'BAD':      state.questionPhase = 'GOOD'; break;
      case 'GOOD':     state.questionPhase = 'TIMER'; break;
    }
    render();
  }

  function goToNextQuestion() {
    if (!state.currentCategory) {
      state.screen = 'CATEGORIES';
      render();
      return;
    }
    var qs = questionsForCategory(state.currentCategory);
    var currentIdx = qs.findIndex(function (q) { return q.id === state.currentQuestion.id; });
    // Find next unanswered in this category
    var next = null;
    for (var i = 1; i < qs.length; i++) {
      var idx = (currentIdx + i) % qs.length;
      if (state.progress[qs[idx].id] === undefined) {
        next = qs[idx];
        break;
      }
    }
    if (!next) {
      // All done in this category, go to next unanswered, or back to categories
      next = qs[(currentIdx + 1) % qs.length];
      if (completedInCategory(state.currentCategory) >= qs.length) {
        state.screen = 'CATEGORIES';
        state.currentQuestion = null;
        state.currentCategory = null;
        render();
        return;
      }
    }
    state.currentQuestion = next;
    state.questionPhase = 'QUESTION';
    render();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Init ────────────────────────────────────────────────
  function init() {
    appEl = document.getElementById('pitchiq-app');
    if (!appEl) return;

    loadProgress();
    loadUser();

    if (state.user) {
      state.screen = 'CATEGORIES';
    } else {
      state.screen = 'EMAIL_GATE';
    }

    pushState(state.screen);
    render();
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
