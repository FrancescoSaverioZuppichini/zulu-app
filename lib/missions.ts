import { Mission } from "@/types/types";

export const mamalPodMissions: Mission[] = [
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
        success_criteria: 'Il giocatore invia una foto del fiore sul foglio con i riquadri',
        required_missions: ['4a']
    }];
