import { Mission } from "@/types/types";

export const missions: Record<string, Mission[]> = {
    "XOF Team A": [
     { mission_id: "1a", 
      type: "primary_mission", 
      primary_objective: "Recuperare la bandana di lei, gettata nel lago Nicaragua e poi archiviata in un fascicolo.", 
      context: "Bisogna eliminare ogni prova del coinvolgimento dei membri dei Patriots da questo incidente.", 
      difficulty: "Medium", 
      hints: [ "Il file contenente tale prova classificata è stato visto per l’ultima volta nei pressi della porticina, quella che da sulla macchina per pulire il pavimento, una volta recuperata inviatemi la foto", "nel file c’è una busta trasparente contenente tale prova da recuperare e fotografare", “È necessario che vi rechiate alla porticina per recuperare questa prova, controllate anche nei suoi pressi, una volta fatto fornitemi una fotografia di essa”], 
      success_criteria: "Il giocatore invia la foto della busta trasparente contenente una fascia nera”, 
          next_missions; ["2a”,... ] },

{ mission_id: "2a", 
    type: "primary_mission", 
    primary_objective: "Portare alla base la scatola nera del Progetto Peace Walker.", 
    context: "Pare che qui venga tenuta la scatola nera del Progetto P, riportatela alla base perchè i prossimi passaggi saranno molto difficili.", 
    difficulty: "Medium", 
    hints: [ "La scatola nera si trova nei pressi del portone centrale, sopra il ponte, indagate, recuperate e con molta cautela estraete alla base, mandatemi una foto della scatola nera sul foglio di riconoscimento", "La scatola nera conterrà file interessanti per ciò che è successo durante l’incidente, andate a recuperarla, portatela indietro e fornitemi una prova che è stata recuperata"], 
    success_criteria: "Il giocatore invia la foto di una scatola nera su un tavolo bianco”, 
    next_missions; ["3a”,... ] },

{ mission_id: "3a", 
    type: "primary_mission", 
    primary_objective: "Hackerate il sistema della scatola nera.", 
    context: "Ovviamente è protetta da una password a combinazione di tipo biometrico, sarà necessario fornire la giusta combinazione di tasti per accedervi.", 
    difficulty: "Medium", 
    hints: [ "Forse i vostri dispositivi touchscreen potrebbero essere la soluzione, ricorrere al brute force e un pizzico di indagine è l’unica via perseguibile", "Trattatela bene e non datele scossoni, è sopravvissuta ad un’aspra battaglia, non osate testare oltre la sua durevolezza", “Setacciate attentamente la zona in cui avete trovato la scatola per eventuali note o indizi lasciati dal team di Ricerca e Sviluppo dei Peace Sentinel, magari vi sarà riportata la giusta combinazione per accedere alla scatola nera”], 
    success_criteria: "Il giocatore dà prova di avere accesso alla scatola nera fornendo la password di avvio LOG: PEACEWALKER ”, 
    next_missions; ["4a”, “5a”, “6a”... ] },

{ mission_id: "4a", 
    type: "primary_mission", 
    primary_objective: "Fornire giorno di disattivazione Peace Walker.", 
    context: "Ora che avete accesso al sistema, fornite le informazioni indicate.", 
    difficulty: "Medium", 
    hints: [ "Avete accesso ai LOG, per quanto siano i mementi di un computer morente, troverete tra le righe tutte le informazioni di cui avete bisogno, alla fine la differenza tra un umano ed un computer è proprio questa, i computer non sanno mantenere i segreti.", “Siate più precisi possibili con l’inserimento dei dati richiesti e fornite tutto come viene riportato dal sistema”], 
    success_criteria: "Il giocatore scrive in chat: 1974-11-18 16:51:06 UTC”, 
    next_missions; ["7a”,... ] },

{ mission_id: "5a", 
    type: "primary_mission", 
    primary_objective: "Fornire location di disattivazione forzata del sistema.", 
    context: "Ora che avete accesso al sistema, fornite le informazioni indicate.", 
    difficulty: "Medium", 
    hints: [ "Avete accesso ai LOG, per quanto siano i mementi di un computer morente, troverete tra le righe tutte le informazioni di cui avete bisogno, alla fine la differenza tra un umano ed un computer è proprio questa, i computer non sanno mantenere i segreti.", “Siate più precisi possibili con l’inserimento dei dati richiesti e fornite tutto come viene riportato dal sistema”], 
    success_criteria: "Il giocatore scrive in chat: LAGO_COCIBOLCA_NICARAGUA oppure: 11°37′N 85°21′W ”, 
    next_missions; ["7a”,... ] },

{ mission_id: "6a", 
    type: "primary_mission", 
    primary_objective: "Fornire location impostata per l’ultimo lancio ICBM, ci aiuterà a scoprire meglio ciò che realmente è successo e ciò che Langley ci ha nuovamente nascosto.", 
    context: "Ora che avete accesso al sistema, fornite le informazioni indicate.", 
    difficulty: "Medium", 
    hints: [ "Avete accesso ai LOG, per quanto siano i mementi di un computer morente, troverete tra le righe tutte le informazioni di cui avete bisogno, alla fine la differenza tra un umano ed un computer è proprio questa, i computer non sanno mantenere i segreti.", “Siate più precisi possibili con l’inserimento dei dati richiesti e fornite tutto come viene riportato dal sistema”], 
    success_criteria: "Il giocatore scrive in chat: 11°07'58.6"N 83°07'22.6"W ”, 
    next_missions; ["7a”,... ] },

Per missione 7a tutte le missioni 4a, 5a, 6a devono essere completate

{ mission_id: "7a", 
    type: "primary_mission", 
    primary_objective: "Eliminate i membri XOF del TEAM B, ora!.", 
    context: "Ora state parlando direttamente a SkullFace, il vostro nuovo leader, vi ho scelti come membri della nuova XOF poiché i vincoli imposti da Langley e da Cipher sono ormai troppo stretti e altro non siamo che i loro cani da guerra, è ora che le cose cambino, da subito! Liberatevi dei vostri ex-compagni fedeli alla causa persa del patriottismo e della catena di comando, da oggi noi saremo il fuoco della vendetta, noi distruggeremo l'establishment imposto da vecchi senza visione, libereremo il mondo da essi e li renderemo liberi, fornitemi poi la foto di tutti i loro badge di riconoscimento.", 
    difficulty: "Extreme", 
    hints: [ "Inizialmente agite con discrezione, i respawn saranno disattivati", “Siate veloci, non date modo ai vostri ex compagni di capire cosa sta succedendo, non fate prigionieri”], 
    success_criteria: "Il giocatore invia la foto di 5 badge di riconoscimento”, 
    next_missions; ["X”,... ] },
                    

    , "XOF Team B": [
       { mission_id: "1b", 
        type: "primary_mission", 
        primary_objective: "Uno dei nostri infiltrati della CIA ha lasciato le coordinate della base operativa di MSF in un messaggio criptato, dovrete trovarlo, decifrarlo e fornirmelo.", 
        difficulty: "Medium", 
        hints: [ "La lettera si trova dentro della stanza centrale dei laboratori, sarà nascosta quindi tieni gli occhi aperti e osserva bene", "Il messaggio sarà sicuramente criptato, controlla bene per delle chiavi di lettura la busta ed il messaggio", “aiuto su decifrazione”], success_criteria: "Il giocatore invia: 11°07'58.6"N 83°07'22.6"W”, next_missions; ["2b”,... ] },

{ mission_id: "2b", 
    type: "primary_mission", 
    primary_objective: "Recuperate il fascicolo contenente la lista degli assets dispersi dai Peace Sentinel in Nicaragua e Costa Rica.", 
    difficulty: "Medium", 
    hints: [ "Dovrebbe essere tenuto nelle scaffalature fuori dai laboratori, non troppo lontano dal vostro centro operativo avanzato", "Controllate bene dietro ogni oggetto in quell’area, potrebbe essere nascosto o semplicemente caduto a causa dell’incuria", “una volta recuperato inviate una foto della copertina del fascicolo”], success_criteria: "Il giocatore invia una foto del fascicolo riportante la scritta: “ASSETS PEACE SENTINEL” ”, next_missions; ["3b”, “4b”, “5b”... ] },

{ mission_id: "3b", 
    type: "primary_mission", 
    primary_objective: "È giunto il momento di ripulire un po’ i danni lasciati dai PS, controllate il fascicolo che avete ritirato precedentemente e riportate qui alla base ciò che vi è richiesto, riportate la scatola contenente materiale bellico.", 
    difficulty: "Medium", 
    hints: [ "L’indizio con la location e l’immagine di tale scatola è contenuta nel fascicolo degli assets, consultatelo attentamente", "Fate attenzione a non agitare troppo forte questi oggetti, sono settimane che non vengono toccati", “una volta recuperato inviate una foto della scatola con il materiale indicato”], 
    success_criteria: "Il giocatore invia una foto di una scatola verde con le lettere PS scritte sopra”, 
    next_missions; ["6b”... ] },

{ mission_id: "4b", 
    type: "primary_mission", 
    primary_objective: "È giunto il momento di ripulire un po’ i danni lasciati dai PS, controllate il fascicolo che avete ritirato precedentemente e riportate qui alla base ciò che vi è richiesto, recuperate il file e inviatemi il nome del luogo nel quale vi era la base di elicotteri MIL MI-24 Hind D dei Peace Sentinel.", 
    difficulty: "Medium", 
    hints: [ "La location della localizzazione della base degli elicotteri è contenuta nel fascicolo degli assets, consultatelo attentamente", "Solamente la base degli Hind ci è ancora sconosciuta, non vorremmo che la loro semplice manutenzione invogli milizie locali ad impossessarsene", “Recuperate assolutamente quella posizione, riuscire a sottrarre ai russi quel quantitativo di elicotteri è stata un’impresa degna di tale nome”], 
    success_criteria: "Il giocatore invia: villaggio di Caño Tambor”, 
    next_missions; ["6b”... ] },

{ mission_id: "5b", 
    type: "primary_mission", 
    primary_objective: "Ci serve una prova per intervenire come Nazioni Unite a bordo di Mother Base abbiamo bisogno di una scusa ufficiale per intervenire, un’ispezione atomica è la cosa migliore alla quale possiamo aspirare, trovate il fascicolo menzionato con le testate lasciate indietro dai Peace Sentinel e trovate le immagini allegate.", 
    difficulty: "Medium", 
    hints: [ "L’indizio con la location del fascicolo delle testate è contenuta nel fascicolo degli assets, consultatelo attentamente", "La location di quel fascicolo ci serve un sacco, per favore trovatelo, e questione di sicurezza mondiale"], 
    success_criteria: "Il giocatore invia la foto del fascicolo con scritto: ATOMIC”, 
    next_missions; ["7b”... ] },

Missione 6b è sbloccata dopo che anche la 2a è completata oltre che le 3b e 4b. Team A e Team B non vedono però le proprie missioni a vicenda, Team A non vede le missioni del Team B e viceversa.

{ mission_id: "6b", 
    type: "primary_mission", 
    primary_objective: "Sono stati menzionati dei progetti segreti iniziati dal Dottor Huey relativi ad una macchina chiamata Walker Gear, estraete queste informazioni e riportatele alla base.", 
    difficulty: "Medium", 
    hints: [ "La scatola contenente le ricerche perdute del Walker Gear si trovano tra la colonna dell’acqua e la macchina da pulire vicino al muro del magazzino"], 
    success_criteria: "Il giocatore invia la foto della scatola con scritto: HUEY WG”, 
    next_missions; ["X”... ] },

{ mission_id: "7b", 
    type: "primary_mission", 
    primary_objective: "Avete già alla base i moduli di ispezione, compilateli con le informazioni richieste.", 
    difficulty: "Medium", 
    hints: [ "Le vostre informazioni personali sono contenute nelle vostre tre tessere personali ID, scansionatele"], 
    success_criteria: "Il giocatore invia la foto dei moduli intestati UN compilati”, 
    next_missions; ["X”... ] },

        }],


    "Consegne FSLN": [

{ mission_id: "intro1", 
 type: "primary_mission", 
 primary_objective: "Soldati di FSLN, ascoltatemi! Oggi dovrete fare la differenza! Vi fornirò i contatti di alcune persone che ci stanno aiutando a mantenere il controllo e a combattere per la libertà, fate ciò che vi viene detto, anche loro sono compagni e dobbiamo fare di tutto per aiutarli!.", 
 difficulty: "Easy", 
 success_criteria: "Viene fornita in automatico la missione 1f”, 
    next_missions; ["1f”... ] },

{ mission_id: "1f", 
 type: "primary_mission", 
 primary_objective: "FSLN, ho bisogno del vostro aiuto! Qui all’ospedale infantile nicaraguense hanno bisogno dei vostri servizi, e per servizi intendo di una consegna speciale di medicinali salvavita. Nel magazzino in cui vi trovate ora le forze di Peace Sentinel hanno lasciato in cortile, nei pressi della pianta di fronte al ponte, una scorta di medicinali sperimentali che hanno presentato un concentrato del 130% di principio attivo. Ho bisogno che recuperiate quel medicinale a base di tabacco curativo così da poterlo dare ai bambini qui all’ospedale.
Vi prego, i bambini contano su di voi e su quel tabacco.
Una volta recuperato, portatelo al punto di ritiro dell’ospedale nicaraguense, si trova nella stanza centrale dei laboratori, in corrispondenza della zona protetta D da MSF. 
Vi prego, aiutateci, solo voi potrete fare la differenza.", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “tobaccoland” che indica che la spedizione è carica nel carrello, successivamente la chiave “capturedzone” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["2f”... ] },

{ mission_id: "2f", 
    type: "primary_mission", 
    primary_objective: "Grazie per il servizio svolto, ora grazie a voi i bambini potranno fumare un po’ di quel tabacco curativo e migliorare drasticamente la loro situazione!
Ho bisogno di un’altro favore, lì al punto di ritiro dell’ospedale ci sono lasciati dei medicinali scaduti, vi prego di buttarli alla discarica interna al punto di presidio H, vicina alla vostra base avanzata, così da non confondere i miei emissari quando arriveranno a ritirare ciò che mi avete appena portato. Non fateli aspettare! Conto su di voi FSLN!.", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “badmeds” che indica che la spedizione è carica nel carrello, successivamente la chiave “dumpsterhouse” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["Intro2”... ] },

{ mission_id: "intro2", 
    type: "primary_mission", 
    primary_objective: "La prossima persona che richiede il nostro supporto logistico è un personaggio particolare, è un nostro grande sostenitore, pertanto vi chiedo di essere veloci e precisi. Si fa chiamare Lo Chef e ha un po’ di cose da farvi spostare. Presto, dategli una mano e potrebbe anche ricompensarvi.", 
    difficulty: "Easy", 
    success_criteria: "Viene fornita in automatico la missione 3f”, 
    
    
    
    next_missions; ["3f”... ] },

{ mission_id: "3f", 
    type: "primary_mission", 
    primary_objective: "Hello FSLN! Sono Hideo, ma dovrete chiamarmi Lo Chef! Ho bisogno che mi portiate al mio punto di ritiro l’attrezzatura da cucina nascosta in discarica. Il mio punto di ritiro è il semirimorchio bianco con i bancali sopra, li troverete i miei codici e i miei aiuto cuochi arriveranno stanotte a ritirare tutto. Ho in mente di cucinare un Rathalos in salsa Hiroshima! Avanti, portatemi la mia attrezzatura e potrei offrirvi una cena alla HIDEO Culinary Production. Scan your feet, presto!", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “atomicsturgeon” che indica che la spedizione è carica nel carrello, successivamente la chiave “cookingfeet” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["4f”... ] },

{ mission_id: "4f", 
    type: "primary_mission", 
    primary_objective: "FSLN, per la prossima spedizione non posso dirvi di preciso dove si trova, vi lascerò il luogo di pick up sotto forma di messaggio criptato. Dovrete recuperare la scatola con dentro delle scorte di cibo, in particolare una scorta della mia specialità: Hypanus americanus, per unire ancora una volta il sapore esplosivo dell'America agli aromi giapponesi. Il luogo è questo: Bzi qt uczw m ti uikkpqvi li xctqhqi lmq xidqumvbq [34]. Una volta recuperata, portatela al mio semirimorchio. I MAKE HIDEO GAMES!", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “marlinblualiexpress” che indica che la spedizione è carica nel carrello, successivamente la chiave “camionpot” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["5f”... ] },

{ mission_id: "5f", 
    type: "primary_mission", 
    primary_objective: "L’ultimo favore che vi chiedo in realtà è un mio dono per ringraziarvi. Nel mio semirimorchio è nascosta una scatola con il cibo per i bisognosi, è un regalo da parte mia e di Madman che so che avete già aiutato. Portatelo alla vostra base, ve lo siete meritati! HIDEO OUT!", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “poisonedfood” che indica che la spedizione è carica nel carrello, successivamente la chiave “homesweethome” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["intro3”... ] },

{ mission_id: "intro3", 
    type: "primary_mission", 
    primary_objective: "Ottimo lavoro con le precedenti consegne. Ora il prossimo incarico sarà difficile, farete delle consegne per conto di uno dei capi della FSLN, per quanto sia sempre stato un uomo determinato e forte, a volte è un po’ irascibile e prepotente, in realtà è così solo perchè ci tiene molto. Aiutatelo e ve ne sarà grato.", 
    difficulty: "Easy", 
    success_criteria: "Viene fornita in automatico la missione 6f”, 
    next_missions; ["6f”... ] },

{ mission_id: "6f", 
    type: "primary_mission", 
    primary_objective: "Soldati! dovrete superarvi se volete la mia approvazione, questo paese non tollera spine dorsali molli o persone che non sanno sparare! I CAN’T SHOOT è un motto che non voglio più ripetere per tutto il resto della nostra lotta alla libertà!! Ora gambe sulle spalle e scattare! Recuperate da una delle paratie centrali la cassa di munizioni e portatela fuori, dove c’è il piccolo albero dietro al container verde e a fianco di quello rosso, l’albero fa da angolo ma troverete sicuramente i miei marchi del punto di consegna. Presto, non voglio lasciare neanche un cane senza pallottole.", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “fentinla” che indica che la spedizione è carica nel carrello, successivamente la chiave “overdose” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["7f”... ] },

{ mission_id: "7f", 
    type: "primary_mission", 
    primary_objective: "Siete stati bravi prima, ora il gioco si fa interessante. Dobbiamo fornire alle nostre spie delle armi che siano facilmente occultabili, c’è un carico di esse in una location che vi fornirà sotto forma di codice, decifratelo, recuperatele, e portatele alla discarica, li alcuni uomini dei miei verranno di nascosto a recuperarle. Presto non perdete tempo!!
Ecco la location cifrata a trasposizione: Cepa e cett zt bitaidsalz*cer olrav dgornulraon o ane llf pilromialidnlt olea* [Chiave: Fronte]", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “secretmessage” che indica che la spedizione è carica nel carrello, successivamente la chiave “poccnr” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["8f”... ] },

{ mission_id: "8f", type: "primary_mission", 
    primary_objective: "Ottimo lavoro soldati, siete meno smidollati di quanto potessi aspettarmi!
Il prossimo lavoro è molto più facile. Dovrete recuperare il fascicolo con i poster propagandistici da distribuire in Costa Rica alla cassa dove c’è il palo di conquista e lo dovrete portare alla vostra base. Semplice e pulito, non perdete tempo!!", difficulty: 
    "Medium", success_criteria: "Il giocatore invia la chiave “rewardinginsult” che indica che la spedizione è carica nel carrello, successivamente la chiave “propagandastyle” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["intro4”... ] },

{ mission_id: "intro4", 
    type: "primary_mission", 
    primary_objective: "Si svegli, Mr. Feetman si svegli.
Non che voglia insinuare che lei abbia dormito sul lavoro,
Nessuno merita riposo più di lei, ma tutti gli sforzi del mondo risulterebbero vani, finchè, diciamo solo che è di nuovo giunto il suo momento.
L'uomo giusto nel posto sbagliato può fare una grande differenza. Perciò si svegli, Mr. Feetman, apra gli occhi e si svegli. Scusatemi soldati, Gordon Feetman è uno scienziato veramente indaffarato. Ha bisogno del vostro aiuto per finire le sue ricerche. Ah e vi riporto i complimenti anche del comandante Fluid, si congratula con voi per non essere stati dei cacasotto. Ottimo lavoro, ora completate anche le richieste di Mr.Feetman e per questa schermaglia abbiamo finito, ultimo sforzo!", difficulty: "Easy", success_criteria: "Viene fornita in automatico la missione 9f”, 
    next_missions; ["9f”... ] },

{ mission_id: "9f", 
    type: "primary_mission", 
    primary_objective: "Mi scoppia la testa! Ah! Siete già qui! Allora, Ehm, ho bisogno che portiate il pacco nero che si trova sotto al vetro nero, nell’ultima stanza dei laboratori, dove dei miei, Ehm, collaboratori verranno poi a ritirarlo, NON APRITE IL PACCO MI RACCOMANDO!!!! Ci sono delle inestimabili ricerche su delle cose… Private. Fate solo la consegna, conto sulla vostra… Discrezione.", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “dinoclash” che indica che la spedizione è carica nel carrello, successivamente la chiave “novacsettlement” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["10f”... ] },

{ mission_id: "10f", 
    type: "primary_mission", 
    primary_objective: "Spero non abbiate aperto l’altro pacco… Comunque, ehm, ho ancora bisogno del vostro aiuto. Portate la scatola che si trova nella stanzina inaccessibile, appena fuori dai laboratori, vicino al portone dove c’è la vostra base. È un pacco nero, dovete portarlo alla gabbia prigione e lasciarlo li… Non apritelo, mi raccomando, questo mi aiuterà molto con le mie ricerche private. Avanti, portatelo lì, questo è il mio ultimo incarico.", 
    difficulty: "Medium", 
    success_criteria: "Il giocatore invia la chiave “bellydancer” che indica che la spedizione è carica nel carrello, successivamente la chiave “blackprojectdinofeet” che indica che la spedizione è stata scaricata e messa nella zona indicata”, 
    next_missions; ["outro”... ] },
            
{ mission_id: "Outro", 
    type: "primary_mission", 
    primary_objective: "Ottimo lavoro FSLN, ringraziate anche MSF che vi ha assistito con le consegne, avrete una ricompensa una volta tornati in Nicaragua. Ora la vittoria e la libertà sono un passo più vicini dal raggiungimento. Missione Compiuta!", 
    difficulty: "Easy", 
    success_criteria: "Fine”, next_missions; ["X”... ] },

    
    "test": [
        {
            mission_id: 'debug_1',
            type: 'primary_mission',
            primary_objective: 'Enter the debug authorization key to unlock system testing mode.',
            context: 'System requires basic authentication before running diagnostic protocols.',
            difficulty: 'Easy',
            hints: ['The key is simple and straightforward', 'It\'s a common testing word'],
            success_criteria: 'Player provides the key: test',
            required_missions: [] // Starting mission
        },

        {
            mission_id: 'debug_2',
            type: 'primary_mission',
            primary_objective: 'Confirm system status by typing "SYSTEM ONLINE".',
            context: 'Need to verify that all subsystems are responding correctly.',
            difficulty: 'Easy',
            hints: ['Just type exactly what the objective asks for'],
            success_criteria: 'Player types: SYSTEM ONLINE',
            required_missions: ['debug_1']
        },

        {
            mission_id: 'debug_3',
            type: 'primary_mission',
            primary_objective: 'Report the mission completion status.',
            context: 'Final step in the debug sequence to confirm everything worked.',
            difficulty: 'Easy',
            hints: ['Tell me if the debug test was successful'],
            success_criteria: 'Player responds with: DEBUG ALMOST COMPLETE',
            required_missions: ['debug_1']
        },
        {
            mission_id: 'debug_4',
            type: 'primary_mission',
            primary_objective: 'Report the mission completion status.',
            context: 'Final step in the debug sequence to confirm everything worked.',
            difficulty: 'Easy',
            hints: ['Tell me if the debug test was successful'],
            success_criteria: 'Player responds with: DEBUG COMPLETE',
            required_missions: ['debug_1', 'debug_2']
        }
    ]
}
