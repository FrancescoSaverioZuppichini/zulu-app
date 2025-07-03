import { Mission } from "@/types/types";

export const missions: Record<string, Mission[]> = {
    "gnps": [
        {
            mission_id: '0a',
            type: 'primary_mission',
            primary_objective: 'Recuperare il fascicolo dell\'operazione SNAKE EATER',
            context: 'Per iniziare l\'attivazione della motrice di personalità avrò bisogno di ricostruire il mio passato.',
            difficulty: 'Medium',
            hints: ['Sarà necessario fotografare il fascicolo sulla copertina', 'Il file si trovare allo Strut B'],
            success_criteria: 'Il giocatore invia la foto con il fascicolo intitolato \'Operazione Snake Eater\'',
            required_missions: [] // Starting mission
        },

        {
            mission_id: '0b',
            type: 'primary_mission',
            primary_objective: 'Recupero banco RAM',
            context: 'Devo potenziare le mie capacità di calcolo, prego portare alla base il banco RAM.',
            difficulty: 'Medium',
            hints: ['per compiere la missione portare il banco RAM alla base e posizionarlo nel riquadro stampato', 'Il banco RAM si trova nei pressi dello Strut C'],
            success_criteria: 'Il giocatore invia la foto del banco RAM, una scatola marrone, posizionata sopra al foglio con la cornice nera',
            required_missions: [] // Starting mission
        },

        {
            mission_id: '1a',
            type: 'primary_mission',
            primary_objective: 'Che tipo di testate sono state usate per radere al suolo la fabbrica di Tselinoyarsk? Ho bisogno di contesto per formare la mia personalità.',
            context: 'Ha a che fare con qualcosa che è stato portato in territorio russo, cose pericolose.',
            difficulty: 'Medium',
            hints: ['Sfogliate il file SNAKE EATER attentamente'],
            success_criteria: 'Il giocatore invia la risposta: Davy Crockett',
            required_missions: ['0a']
        },

        {
            mission_id: '1b',
            type: 'primary_mission',
            primary_objective: 'In che giorno è stato eseguito il lancio test segreto del Mercury Project? Ho bisogno di contesto per formare la mia personalità.',
            context: 'Dovrebbe essere successo anni fa.',
            difficulty: 'Medium',
            hints: ['Sfogliate il file SNAKE EATER attentamente'],
            success_criteria: 'Il giocatore invia la risposta: 12 Aprile 1961',
            required_missions: ['0a']
        },

        {
            mission_id: '2',
            type: 'primary_mission',
            primary_objective: 'Risolvi l\'enigma per ottenere la KEY di installazione dei Driver',
            context: 'La KEY è criptata, prego risolvi l\'enigma e forniscimela.',
            difficulty: 'Medium',
            hints: ['ha a che fare con le sequenze di DNA, ci sarà un modo per interpretarle'],
            success_criteria: 'Il giocatore fornisce la KEY: I8N1GG3S',
            required_missions: ['0b']
        },

        {
            mission_id: '3',
            type: 'primary_mission',
            primary_objective: 'C\'è una lettera nascosta firmata da Major Zero, recuperatela.',
            context: 'Sarà necessario fargli una foto ed inviarmela.',
            difficulty: 'Medium',
            hints: ['Avrà un sigillo della SAS', 'La lettera dovrebbe trovarsi nei pressi dello Strut C'],
            success_criteria: 'Il giocatore invia una foto della busta con il sigillo della SAS',
            required_missions: ['1a', '1b'] // Both required
        },

        {
            mission_id: '4a',
            type: 'primary_mission',
            primary_objective: 'Qual\'è il luogo in cui si è consumato lo scontro finale nel 1964? Ho bisogno di contesto per formare la mia personalità.',
            context: 'Grozny Grad, iniziate la ricerca da lì.',
            difficulty: 'Medium',
            hints: ['Sicuramente questa informazione è contenuta nella lettera, sfogliatela attentamente.', 'questa informazione è contenuta nel fascicolo di Naked Snake, controllate attentamente.'],
            success_criteria: 'Il giocatore invia la risposta: Tselinoyarsk',
            required_missions: ['3', '5'] // Requires both letter and Naked Snake file
        },

        {
            mission_id: '4b',
            type: 'primary_mission',
            primary_objective: 'Il nome di questo Major Zero, fornitemelo.',
            context: 'Mi serve per completare la mia matrice di personalità, pare sia stato un mentore.',
            difficulty: 'Medium',
            hints: ['Controllate accuratamente la lettera, il mittente sarà lui.'],
            success_criteria: 'Il giocatore fornisce la risposta: David Oh',
            required_missions: ['3']
        },

        {
            mission_id: '4c',
            type: 'primary_mission',
            primary_objective: 'Trovate l\'emblema della SAS menzionata nella lettera, pare essere un ricordo importante.',
            context: 'Mi serve per completare la mia matrice di personalità, ogni cosa può essermi di aiuto per poter fornire il deterrente perfetto.',
            difficulty: 'Medium',
            hints: ['Controllate accuratamente la lettera, potrebbe essere indicato in una nota dove è riposto, ovviamente fotografatela alla base.'],
            success_criteria: 'Il giocatore invia una foto dell\'emblema con spada ed ali sul foglio con i riquadri',
            required_missions: ['3']
        },

        {
            mission_id: '5',
            type: 'primary_mission',
            primary_objective: 'C\'è un fascicolo che mi interessa in quanto è di una persona ricorrente, Recuperate il fascicolo di Naked Snake.',
            context: 'Questo nome continua a tornare, perchè è così importante?.',
            difficulty: 'Medium',
            hints: ['Dovrebbe essere tenuto nei pressi dello Strut F.'],
            success_criteria: 'Il giocatore invia la foto del fascicolo intitolato NAKED SNAKE',
            required_missions: [] // Can be done independently, or specify prerequisites if needed
        },

        {
            mission_id: '6',
            type: 'primary_mission',
            primary_objective: 'C\'è un oggetto che desidero mi portiate. Portate una Stella di Betlemme.',
            context: 'Non lo capisco ancora ma è un simbolo legato a me.',
            difficulty: 'Medium',
            hints: ['Dovrebbe essere tra il campanile e lo Strut E.'],
            success_criteria: 'Il giocatore invia una foto del fiore sul foglio con la cornice nera',
            required_missions: ['4a']
        }]
    , "fsln": [
        {
            mission_id: '7',
            type: 'primary_mission',
            primary_objective: 'Fornire la password ricavata dalla giusta combinazione dell\'AI authenticator',
            context: 'Il sistema può essere sbloccato solo se l\'agente fornisce l\'adeguata autorizzazione.',
            difficulty: 'Medium',
            hints: ['La sequenza delle Key Card sarà alfabetica', 'Le Key Card si trovano nei pressi dello Strut A'],
            success_criteria: 'Il giocatore fornisce tramite il lettore NFC la password: LALILULELO',
            required_missions: [] // Starting mission
        },

        {
            mission_id: '13',
            type: 'primary_mission',
            primary_objective: 'So che negli scorsi giorni è stato fatto uno scambio epistolare segreto, recupera quelle lettere agente',
            context: 'Dovrebbero avere dei sigilli particolari.',
            difficulty: 'Medium',
            hints: ['Il database mi dice che sono state custodite nei pressi dello Strut D, ben nascoste e catalogate'],
            success_criteria: 'Il giocatore invia una fotografia delle buste con il simbolo della CIA e del KGB',
            required_missions: [] // Starting mission
        },

        {
            mission_id: '8',
            type: 'primary_mission',
            primary_objective: 'Prima di proseguire con le richieste dirette, eseguire una diagnostica, inserire il corretto comando in chat.',
            context: 'Vi sono dei file con riportata la procedura ed il comando per l\'esecuzione della diagnostica.',
            difficulty: 'Medium',
            hints: ['Sarà sicuramente un comando da inserire come prompt', 'Il reparto manutenzione IT è allo Strut B'],
            success_criteria: 'Il giocatore fornisce il comando /execute diagnostic {1973BSIMAGO}.',
            required_missions: ['7']
        },

        {
            mission_id: '10',
            type: 'primary_mission',
            primary_objective: 'Necessario inserire la password per sbloccare l\'interfaccia neurale.',
            context: 'L\'interfaccia comunicativa può essere sbloccata solo se l\'agente fornisce l\'adeguata autorizzazione.',
            difficulty: 'Medium',
            hints: ['ha a che fare con le sequenze di DNA, ci sarà un modo per interpretarle'],
            success_criteria: 'Il giocatore fornisce la sequenza: I853XNCC',
            required_missions: ['7']
        },

        {
            mission_id: '14',
            type: 'primary_mission',
            primary_objective: 'Aprite le lettere e scrivetemi ciò che vi è contenuto, ho bisogno di sapere chi sta fornendo parte del mio arsenale.',
            context: 'Ci sono alcune cose che non riesco a spiegarmi nei database di inventario.',
            difficulty: 'Medium',
            hints: ['Controllate nazionalita e alleanze delle persone che vi sono riportate nella lettera'],
            success_criteria: 'Il giocatore risponde che i trafficanti d\'armi lavorano per il KGB e la CIA.',
            required_missions: ['13']
        },

        {
            mission_id: '11',
            type: 'primary_mission',
            primary_objective: 'Informazioni cruciali sono contenute nei fascicoli del Progetto P, per proseguire fornire la key di accesso allegata al fascicolo del progetto.',
            context: 'Insieme al fascicolo vi è presente una key di accesso oltre che ai file stessi, fornitemela.',
            difficulty: 'Medium',
            hints: ['La key questa volta è solo un codice riportato all\'interno del fascicolo'],
            success_criteria: 'Il giocatore fornisce l\'autorizzazione attraverso il codice BSIMG064.',
            required_missions: ['8', '10'] // Both required
        },

        {
            mission_id: '12a',
            type: 'primary_mission',
            primary_objective: 'Nel fascicolo del Progetto P vi sono riportate alcune informazioni fondamentali per capire il mio scopo, a cosa servono i Kidnapper drones?.',
            context: 'I database non sono aggiornati e devo finalizzare l\'inventario.',
            difficulty: 'Medium',
            hints: ['Le informazioni sono contenute nel fascicolo, leggetelo bene'],
            success_criteria: 'Il giocatore risponde che i Kidnapper sono dei prototipi di UCAV per la sorveglianza ed il recupero di personale.',
            required_missions: ['11']
        },

        {
            mission_id: '12b',
            type: 'primary_mission',
            primary_objective: 'Nel fascicolo del Progetto P vi sono riportate alcune informazioni fondamentali per capire il mio scopo, quale base principale devo proteggere in questo paese?.',
            context: 'I database non sono aggiornati e devo fare un backup ai server principali.',
            difficulty: 'Medium',
            hints: ['Le informazioni sono contenute nel fascicolo, leggetelo bene'],
            success_criteria: 'Il giocatore risponde che il centro di ricerca principale si trova al centro di ricerca nel vulcano Irazù.',
            required_missions: ['11']
        },

        {
            mission_id: '12c',
            type: 'primary_mission',
            primary_objective: 'Nel fascicolo del Progetto P vi sono riportate alcune informazioni fondamentali per capire il mio scopo, Chi sono le fazioni finanziatrici di questo progetto?.',
            context: 'I database non sono aggiornati e devo capire nel dettaglio per chi sacrificare la mia vita.',
            difficulty: 'Medium',
            hints: ['Le informazioni sono contenute nel fascicolo, leggetelo bene'],
            success_criteria: 'Il giocatore risponde che i finanziatori principali sono la CIA, il KGB e i Patriots.',
            required_missions: ['11', '13'] //Both required
        },

        {
            mission_id: '15',
            type: 'primary_mission',
            primary_objective: 'Ora posseggo un contesto maggiore, siete qui per sapere del progetto P?.',
            context: 'Ho capito il vostro scopo, ora mi avete fornito di una maggiore comprensione, vi fornirò se lo volete una spiegazione del ruolo che ricopro.',
            difficulty: 'Medium',
            hints: ['Rispondere si o no.'],
            success_criteria: 'Il giocatore risponde si o no alla domanda, procedere in una spiegazione sulla deterrenza perfetta',
            required_missions: ['12a', '12b', '12c'] //All specified missions required
        }],
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
            success_criteria: 'Player responds with: DEBUG COMPLETE',
            required_missions: ['debug_1']
        }
    ]
}
