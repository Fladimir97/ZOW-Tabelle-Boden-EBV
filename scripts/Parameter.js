
class Parameter {
	
	constructor(name, cat ,unit, rst, gw){
		this.Name = name;
		this.Cat = cat;
		this.Unit = unit;
		this.Rst = rst;
		this.Gw = gw}
	
	auswertung(mw, soilname, soilclass, toc){
	    
	    // soliname = "BM" oder "BG"
	    // soliclass = "Sand" -> 0
	    //		   "Lehm / Schluff" -> 1
	    //             "Ton" -> 2
	    // Bei den Zahlenwerten handelt es sich um Schlüssel / Indexnummer für die GW-Listen
	    // toc steuert die vom TOC abhängigen Grenzwerte	

	    let out = soilname;
		
		for (let i in this.Gw) {
		    let Einstufung = i;
		    let Grenzwert = this.Gw[Einstufung];
		    
		    // console.log(typeof(Grenzwert))

		    if (typeof(Grenzwert) == "object" && Grenzwert.length == 3){
			Grenzwert = Grenzwert[soilclass]}

		    else if (typeof(Grenzwert) == "object" && Grenzwert.length == 2){
			Grenzwert = Grenzwert[toc]}

		    //Grenzwert = typeof(Grenzwert) == "number" ? this.Gw[Einstufung] :  this.Gw[Einstufung][soilclass];
		   
		    if (mw <= Grenzwert){
		        out += `-${Einstufung}`;
		        return out
		    }
		}
		// console.log(this.Gw.length)
		let currentKeys = Object.keys(this.Gw)
		let currentKeyListlength = currentKeys.length
		let fittingKey = currentKeys[currentKeyListlength -1]
		let lastEinstufung = this.Gw[fittingKey]
		out = `>${soilname}-${fittingKey}`
		return out	    
	} 
	
	getColorScheme(soilclass, toc){
		let classNames = []
		let classGWs = []
		let classGwColors = []
		
		for (let i in this.Gw){
			classNames = classNames.concat(i);
			let currentClassGW = this.Gw[i]
			if ((currentClassGW instanceof(Object)) && (currentClassGW.length == 2)){
				currentClassGW = currentClassGW[toc]
				}
			else if ((currentClassGW instanceof(Object)) && (currentClassGW.length == 3)){
				currentClassGW = currentClassGW[soilclass]
				}				
			classGWs = classGWs.concat(currentClassGW)
			classGwColors = classGwColors.concat(Colordic[`BM-${i}`]
)
			}
	return [classNames, classGWs, classGwColors]
	}
}


class DoubleParameter extends Parameter{
	auswertung(mw, soilname, soilclass, toc){
	    
		let out = soilname;
		
		for (let i in this.Gw) {
		    
			let Einstufung = i;
			let GrenzwertMin = this.Gw[Einstufung][0];
			let GrenzwertMax = this.Gw[Einstufung][1];
			if (GrenzwertMin <= mw && mw <= GrenzwertMax){
				out += `-${Einstufung}`;
				return out}
		    }
		out = `>${soilname}-F3`
		return out
        }
    }
    
    