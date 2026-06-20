/* 
  ______        _       _         __  __ 
 |  ____|      | |     | |       / _|/ _|
 | |__ ___  ___| |_ ___| |_ ___ | |_| |_ 
 |  __/ _ \/ __| __/ __| __/ _ \|  _|  _|
 | | |  __/\__ \ |_\__ \ || (_) | | | |  
 |_|  \___||___/\__|___/\__\___/|_| |_|  
                                         

*/     

const Arsen = new Parameter("Arsen(FS)", "Feststoff", "mg/kg", 0, {
    "0":    [10, 20, 20],
    "0*":   20,
    "F0*":   40,
    "F1":    40,
    "F2":    40,
    "F3":   150,
});


const Blei = new Parameter("Blei", "Feststoff", "mg/kg", 0, {
    "0":    [40, 70, 100],
    "0*":   140,
    "F0*":   140,
    "F1":   140,
    "F2":   140,
    "F3":   700,
})


const Cadmium = new Parameter("Cadmium(FS)", "Feststoff", "mg/kg", 0, {
	"0"	: [0.4, 1, 1.5],
	"0*"	: 1,
	"F0*"	: 2,
	"F1"	: 2,
	"F2"	: 2,
	"F3"	: 10,
})

const Chrom = new Parameter("Chrom(FS)", "Feststoff", "mg/kg", 0, {
	"0"	: [30, 60, 100],
	"0*"	: 120,
	"F0*"	: 120,
	"F1"	: 120,
	"F2"	: 120,
	"F3"	: 600,
})


const Kupfer = new Parameter("Kupfer(FS)", "Feststoff", "mg/kg", 0, {
	"0"	: [20, 40, 60],
	"0*"	: 80,
	"F0*"	: 80,
	"F1"	: 80,
	"F2"	: 80,
	"F3"	: 320,
})


const Nickel = new Parameter("Nickel(FS)", "Feststoff", "mg/kg", 0, {
	"0"	: [15, 50, 70],
	"0*"	: 100,
	"F0*"	: 100,
	"F1"	: 100,
	"F2"	: 100,
	"F3"	: 350,
})


const Quecksilber = new Parameter("Quecksilber(FS)", "Feststoff", "mg/kg", 1, {
	"0"	: [0.2, 0.3, 0.3],
	"0*"	: 0.6,
	"F0*"	: 0.6,
	"F1"	: 0.6,
	"F2"	: 0.6,
	"F3"	: 5,

})


const Thallium = new Parameter("Thallium(FS)", "Feststoff", "mg/kg", 1, {
	"0"	: [0.5, 1.0, 1.0] ,
	"0*"	: 1.0,
	"F0*"	: 2,
	"F1"	: 2,
	"F2"	: 2,
	"F3"	: 7,
})


const Zink = new Parameter("Zink(FS)", "Feststoff", "mg/kg", 0, {
	"0"	: [60, 150, 200],
	"0*"	: 300,
	"F0*"	: 300,
	"F1"	: 300,
	"F2"	: 300,
	"F3"	: 1200,
})

const FeststoffList = [Arsen,Blei, Cadmium, Chrom, Kupfer, Nickel, Quecksilber, Thallium, Zink]
/* 
  ______ _             _   
 |  ____| |           | |  
 | |__  | |_   _  __ _| |_ 
 |  __| | | | | |/ _` | __|
 | |____| | |_| | (_| | |_ 
 |______|_|\__,_|\__,_|\__|
                           
                           
*/


const PH = new DoubleParameter("PH-Wert", "Eluat", "PH", 1, {
    "0"     : [6.5, 9.5],
    "F3"    : [5.5, 12.0],
});


const Leitfaehigkeit = new Parameter("Elektrische Leitfähigkeit", "Eluat", "µS/cm", 0, {
	"0"	: 350,
	"0*"	: 350,
	"F0*"	: 350,
	"F1"	: 500, 
	"F2"	: 500, 
	"F3"	: 2000,
})

const Sulfat = new Parameter("Sulfat", "Eluat", "mg/l", 0, {
	"0"	: 250,
	"0*"	: 250,
	"F0*"	: 250,
	"F1"	: 450, 
	"F2"	: 450,
	"F3"	: 1000,
})


const ArsenEl = new Parameter("Arsen(EL)", "Eluat", "µg/l", 0, {
    "0":    [8, 13],
    "0*":    [8, 13],
    "F0*":   12,
    "F1":   20,
    "F2":    85,
    "F3":    100,
});


const BleiEl = new Parameter("Blei(EL)", "Eluat", "µg/l", 0, {
	"0"	: [23, 43],
	"0*"	: [23, 43],
	"F0*"	: 35,
	"F1"	: 90, 
	"F2"	: 250,
	"F3"	: 470,
})



const CadmiumEl = new Parameter("Cadmium(EL)", "Eluat", "µg/l", 0, {
	"0"	: [2, 4],
	"0*"	: [2, 4],
	"F0*"	: 3.0,
	"F1"	: 3.0,
	"F2"	: 10,
	"F3"	: 15,

})

const ChromEl = new Parameter("Chrom(EL)", "Eluat", "µg/l", 0, {
	"0"	: [10, 19],
	"0*"	: [10, 19],
	"F0*"	: 15,
	"F1"	: 150, 
	"F2"	: 290,
	"F3"	: 530,
})


const KupferEl = new Parameter("Kupfer(EL)", "Eluat", "µg/l", 0, {
	"0"	: [20, 41],
	"0*"	: [20, 41],
	"F0*"	: 30,
	"F1"	: 110, 
	"F2"	: 170,
	"F3"	: 320,
})

const NickelEl = new Parameter("Nickel(EL)", "Eluat", "µg/l", 0, {
	"0"	: [20, 31],
	"0*"	: [20, 31],
	"F0*"	: 30,
	"F1"	: 30,
	"F2"	: 150,
	"F3"	: 280,

})


const QuecksilberEl = new Parameter("Quecksilber(EL)", "Eluat", "µg/l", 1, {
	"0"	: 0.1,
	"0*"	: 0.1,
	"F3"	: 0.1,
})


const ThalliumEl = new Parameter("Thallium(EL)", "Eluat", "µg/l", 1, {
	"0"	: [0.2, 0.3],
	"0*"	: [0.2, 0.3],
	"F3"	: [0.2, 0.3]
})


const ZinkEl = new Parameter("Zink(EL)", "Eluat", "µg/l", 0, {
	"0"	: [100, 210],
	"0*"	: [100, 210],
	"F0*"	: 150,
	"F1"	: 160, 
	"F2"	: 840,
	"F3"	: 1600,
})

const EluatList = [PH, Leitfaehigkeit, Sulfat, ArsenEl, BleiEl, CadmiumEl, ChromEl, KupferEl, NickelEl, QuecksilberEl, ThalliumEl, ZinkEl]

/* 
   ____                        _ _    
  / __ \                      (_) |   
 | |  | |_ __ __ _  __ _ _ __  _| | __
 | |  | | '__/ _` |/ _` | '_ \| | |/ /
 | |__| | | | (_| | (_| | | | | |   < 
  \____/|_|  \__, |\__,_|_| |_|_|_|\_\
              __/ |                   
             |___/                    

*/    


const TOC = new Parameter("TOC", "Organik", "M-%", 0, {
	"0"	: 1,
	"0*"	: 1,
	"F0*"	: 5,
	"F1"	: 5,
	"F2"	: 5,
	"F3"	: 5,
})

const MKWC40 = new Parameter("MKW-C₁₀₋₄₀", "Feststoff", "mg/kg", 0, {
	"0"	: 600,
	"0*"	: 600,
	"F0*"	: 600,
	"F1"	: 600,
	"F2"	: 600,
	"F3"	: 2000,
})

const MKWC22 = new Parameter("MKW-C₁₀₋₂₂", "Feststoff", "mg/kg", 0, {
	"0"	: 300,
	"0*"	: 300,
	"F0*"	: 300,
	"F1"	: 300,
	"F2"	: 300,
	"F3"	: 1000,
})

const Benzoapyren = new Parameter("Benzoapyren", "Feststoff", "mg/kg", 1, {
	"0"	: 0.3,
})

const PAK15 = new Parameter("PAK₁₅", "Eluat", "µg/l", 1, {
	"0"	: 0.2,
	"0*"	: 0.2,
	"F0*"	: 0.3,
	"F1"	: 1.5, 
	"F2"	: 3.8,
	"F3"	: 20.0,

})

const PAK16 = new Parameter("PAK₁₆", "Feststoff", "mg/kg", 0, {
	"0"	: 3,
	"0*"	: 6,
	"F0*"	: 6,
	"F1"	: 6,
	"F2"	: 9,
	"F3"	: 30,

})

const Methylnaphthaline = new Parameter("(Methyl)naphthaline", "Eluat", "µg/l", 0, {
	"0"	: 2,
	"0*"	: 2,
})

const PCB = new Parameter("PCB₆ und PCB-118(FS)", "Feststoff", "mg/kg", 2, {
	"0"	: 0.05,
	"0*"	: 0.1,
})

const PCBEl = new Parameter("PCB₆ und PCB-118(EL)", "Eluat", "µg/l", 2, {
	"0"	: 0.01,
	"0*"	: 0.01,
})

const EOX = new Parameter("EOX", "Feststoff", "mg/kg", 0, {
	"0"	: 1,
	"0*"	: 1,
})


const OrganikList = [TOC, MKWC40, MKWC22, Benzoapyren, PAK15, PAK16, Methylnaphthaline, PCB, PCBEl, EOX]

/*
  _      _     _             
 | |    (_)   | |            
 | |     _ ___| |_ ___ _ __  
 | |    | / __| __/ _ \ '_ \ 
 | |____| \__ \ ||  __/ | | |
 |______|_|___/\__\___|_| |_|

*/      



const InitParaList = [FeststoffList, EluatList, OrganikList]

const Parameterliste = FeststoffList.concat(EluatList, OrganikList)
