
function ausw(){
	const soilname = document.getElementById("Bodenklasse").value;
	const soilclass = document.getElementById("Bodenart").value;
	const toc = document.getElementById("TOC").value;
	const EinstRelevZW = document.getElementById("ZW").value;
	const inhomogeneParameterListe = [];
	
	const Abfallbezeichnung = document.getElementById("Abfallbezeichnung").value;
	const Abfallmenge = document.getElementById("Abfallmenge").value;
	const Probenahme = document.getElementById("Probenahme").value;

	let BerichtInnerHTML = (Abfallbezeichnung == "") ? `<h2 style="color:black">Auswertung</h2>` :`<h2 style="color:black">Auswertung - ${Abfallbezeichnung}</h2>` ;

	BerichtInnerHTML += "<h3>Stammdaten</h3>"
	BerichtInnerHTML += `	<table class="BerichtTabelle">
					<tr>
						<th>Menge in m³</th>
						<th>Bodenart</th>
						<th>Bodenklasse</th>
						<th>TOC ≥ 0,5 M-%?</th>
      						<th>Einstufungsrelevanter Zuordnungswert</th>
					</tr>
					<tr>
						<td align=center>${Abfallmenge}</td>
						<td align=center>${document.getElementById("Bodenart").options[document.getElementById("Bodenart").selectedIndex].text
}</td>
						<td align=center>${document.getElementById("Bodenklasse").options[document.getElementById("Bodenklasse").selectedIndex].text}</td>
						<td align=center>${document.getElementById("TOC").options[document.getElementById("TOC").selectedIndex].text}</td>
      						<td align=center>${soilname}-${document.getElementById("ZW").options[document.getElementById("ZW").selectedIndex].text}</td>
					</tr>
				</table>`

	document.getElementById("StammdatenHeadline").innerHTML = `	<table class="BerichtTabelle">
					<tr>
						<th>Bezeichnung / Herkunft</th>
						<th>Menge in m³</th>
						<th>Bodenart</th>
						<th>Bodenklasse</th>
						<th>TOC ≥ 0,5 M-%?</th>
      						<th>Einstufungsrelevanter Zuordnungswert</th>
					</tr>
					<tr>
						<td>${Abfallbezeichnung}</td>
						<td align=center>${Abfallmenge}</td>
						<td align=center>${document.getElementById("Bodenart").options[document.getElementById("Bodenart").selectedIndex].text
}</td>
						<td align=center>${document.getElementById("Bodenklasse").options[document.getElementById("Bodenklasse").selectedIndex].text}</td>
						<td align=center>${document.getElementById("TOC").options[document.getElementById("TOC").selectedIndex].text}</td>
      						<td align=center>${soilname}-${document.getElementById("ZW").options[document.getElementById("ZW").selectedIndex].text}</td>

      
					</tr>
				</table><br>` 

	if (Abfallmenge != "" && Probenahme == 0){
		BerichtInnerHTML += pn98(Abfallmenge)}

	if (Abfallmenge != "" && Probenahme == 1){
		BerichtInnerHTML += din(Abfallmenge)}
	// console.log(BerichtInnerHTML )
	
	if (document.querySelectorAll('input[type="checkbox"]:checked').length > 0){
		BerichtInnerHTML += "<h3>Einzelne Parameter im Überblick</h3>"
		}	

	for (index in Parameterliste){
		let CurrentParameter = Parameterliste[index];
		let PaName = CurrentParameter.Name;
		
		// Init Lists
		let MWList = [];
		let MWRoundedList  = [];
		let ErgList = [];
		let ErgColorList = []
		let MWNameList = [];
		let GWList = [];
		
		// Bericht Checkbox überprüfen
		let CheckboxValue = document.getElementById(`checkbox${index}`).checked;
		//console.log(CheckboxValue)
		
		for (let n = 0; n < 12; n++){
			let CurrentEntry = document.getElementById(`Inp${PaName}${n}`);
			let CurrentMW = CurrentEntry.value;
			//console.log(CurrentMW );
			let CurrentMWNameEntry = document.getElementById(`SampleName${n}`);
			let CurrentMWName = (CurrentMWNameEntry.value == "")? `Eingabefeld ${n+1}` : CurrentMWNameEntry.value;
			// Reset der Ergebnis Label;
			let CurrentErgLabel = document.getElementById(`Erg${PaName}${n}`);
			CurrentErgLabel.style.backgroundColor = "";
			CurrentErgLabel.textContent = "";
			

			if (CurrentMW != ""){

				MWNameList.push(CurrentMWName);
				MWList.push(CurrentMW);
				
				let CurrentRoundedValue = CurrentMW % 1 === 0 ? CurrentMW : parseFloat(CurrentMW).toFixed(CurrentParameter.Rst);
				MWRoundedList.push(CurrentRoundedValue);
				let Ergebnis = CurrentParameter.auswertung(CurrentRoundedValue, soilname, soilclass, toc);
				ErgList.push(Ergebnis);
				

				// Grenzwert Liste akutalisieren

				let CurrentGWKey = Ergebnis.split("-")[1]
				let CurrentGW = CurrentParameter.Gw[CurrentGWKey]
				
				if (CurrentParameter.Name == "PH-Wert"){
					CurrentGW = `${CurrentGW[0]} - ${CurrentGW[1]}`				
					
					}
				
				if (typeof(CurrentGW) != "number"){
					if (CurrentGW.length == 2){
						CurrentGW = `${CurrentGW[toc]}`
						} 
					else if (CurrentGW.length == 3){
						CurrentGW = CurrentGW[soilclass]
						}			
					}
				// console.log(CurrentParameter.Name + " " + CurrentGW)
				GWList.push(CurrentGW)
				CurrentErgLabel.textContent = Ergebnis;
				let CurrentColor = Colordic[Ergebnis];
				ErgColorList.push(CurrentColor)
				// console.log("Aktuelle Farbe " + CurrentColor  )
				CurrentErgLabel.style.backgroundColor = CurrentColor;
				}
			}
		
		// Homogenität
		let homogenLabel = document.getElementById(`HomogenErgLabel${PaName}`);
		homogenLabel.style.backgroundColor = "";
		homogenLabel.textContent = "";
		if (isGwDefined(CurrentParameter, EinstRelevZW)){
			
			
			let zw = getEinstRelZW(CurrentParameter, EinstRelevZW, toc, soilclass)
			// console.log(zw)
			/*
			if (! (typeof(zw) == "number")){
				if (zw.length == 2){
					zw = zw[toc];
					}
				else if (zw.length == 3){
					zw = zw[soilclass];
					}
				}
			*/
			let homogenErg = homogen(MWList, zw);
			// console.log(PaName + "\tGrnzwert\t" + zw )
			homogenLabel.textContent = homogenErg[0];
			homogenLabel.style.backgroundColor = homogenErg[1];
			
			if (homogenErg[0] == "inhomogen"){
				inhomogeneParameterListe.push(CurrentParameter.Name)}
			}

			// Die Datensätze werden der Größe nach sortiert - Von klein nach groß

			let AllDataList = [];

			for (u in MWList){
				AllDataList.push({	sp:	MWNameList[u],
							mw:	MWList[u],
							rd: 	MWRoundedList[u],
							es:	ErgColorList[u],
							gw:	GWList[u],
							eg:	ErgList[u]



						});
				};
			
			// Arrow Funktion - Sortieren nach mw von klein nach groß!
			AllDataList.sort((a, b) => ((parseFloat(a.mw) < parseFloat(b.mw)) ? -1 :(parseFloat(a.mw) == parseFloat(b.mw)) ?  0 : 1)); 
			
			for (let g = 0; g < AllDataList.length; g++){
				MWNameList[g] = AllDataList[g].sp;
				MWList[g] = AllDataList[g].mw;
				MWRoundedList[g] = AllDataList[g].rd;
				ErgColorList[g] = AllDataList[g].es;
				GWList[g] = AllDataList[g].gw;
				ErgList[g] = AllDataList[g].eg}
			
			// Mittelwert und Standardabweichung

			if (MWList.length > 1 && (!(CurrentParameter instanceof DoubleParameter))){
				// 4 von 5 Regel - Mittelwert wird eingefügt
				let currentMittelWert = mittelwert(MWList);
				MWNameList.push("Mittelwert (X̅)");
				MWList.push(currentMittelWert.toFixed(3));
				let roundedCurrentMittelWert = currentMittelWert.toFixed(CurrentParameter.Rst);
				let currentMittelWertErgebnis = CurrentParameter.auswertung(roundedCurrentMittelWert, soilname, soilclass, toc);
				MWRoundedList.push(roundedCurrentMittelWert);
				ErgColorList.push(Colordic[currentMittelWertErgebnis]);
				let CurrentMittelWertGrenzwert = getEinstRelZW(CurrentParameter, currentMittelWertErgebnis.split("-")[1], toc, soilclass)
				GWList.push(CurrentMittelWertGrenzwert);
				ErgList.push(currentMittelWertErgebnis);

				
				//Statistischer Ansatz
				let currentStandardabw = standardabweichung(MWList.slice(0, MWList.length -1), currentMittelWert);
				let currentStreuung = streuung(currentStandardabw, MWList.length -1);
				let currentMwPlusStreuung = currentMittelWert + currentStreuung;
				let roundedCurrentMwPlusStreuung = currentMwPlusStreuung.toFixed(CurrentParameter.Rst);
				let currentMwPlusStreuungErgebnis = CurrentParameter.auswertung(roundedCurrentMwPlusStreuung, soilname, soilclass, toc);
				MWNameList.push("X̅ + Streuung");
				MWList.push(currentMwPlusStreuung.toFixed(3));
				MWRoundedList.push(roundedCurrentMwPlusStreuung);
				ErgColorList.push(Colordic[currentMwPlusStreuungErgebnis]);
				let currentMwPlusStreuungErgebnisGrenzwert = getEinstRelZW(CurrentParameter, currentMwPlusStreuungErgebnis.split("-")[1], toc, soilclass);
				GWList.push(currentMwPlusStreuungErgebnisGrenzwert);
				ErgList.push(currentMwPlusStreuungErgebnis );
				
				}



		// Bericht Tabellen einfügen
		if (MWList.length > 0 && CheckboxValue){
			BerichtInnerHTML += `<h3 style="color:black">${PaName}</h3>`
			BerichtInnerHTML += `<table class="BerichtTabelle">
						<tr>
							<th>Probe</th>
							<th>Messwert</th>
							<th>gerundet</th>
							<th>Einheit</th>
							<th>Einstufung</th>
							<th>Grenzwert</th>
						</tr>`

			for (x in MWList){
				
				BerichtInnerHTML += 	`<tr>
								<td>${MWNameList[x]}</td>
								<td align=center>${MWList[x]}</td>
								<td align=center>${MWRoundedList[x]}</td>
								<td align=center>${CurrentParameter.Unit}</td>
								<td align=center style="background-color:${ErgColorList[x]}">${ErgList[x]}</td>
								<td align=center>${GWList[x]} ${CurrentParameter.Unit}</td>
							</tr>`
				// Eine Reihe mit den Messwerten wird eingefügt


				}
			BerichtInnerHTML += "</table><br>"
			}
		

		}
		if (inhomogeneParameterListe.length > 0){
			BerichtInnerHTML += "<h3>Inhomogene Parameter</h3><ul>"
			for (k in inhomogeneParameterListe){
				BerichtInnerHTML += `<li>${inhomogeneParameterListe[k]}</li>`
				}
			BerichtInnerHTML += "</ul>"
			}

		const Bericht = document.getElementById("Bericht")
		Bericht.innerHTML = BerichtInnerHTML 
	
		Bericht.style.color = "black"; 
		Bericht.style.background = "white";  

	}



function isGwDefined(Para, GrenzW){
    if (Para instanceof DoubleParameter){
	return false};
    const erg = Para.Gw[GrenzW];
    if (erg == undefined){
        return false
    }
    else {
        return true
    }
}

function getEinstRelZW(Parameter,GrenzW, toc, soil){
    let relevZW = Parameter.Gw[GrenzW];
    if (typeof(relevZW) == "object"){
        if (relevZW.length == 2){
            relevZW = relevZW[toc]
        } else if (relevZW.length == 3){
            relevZW = relevZW[soil]
        }
    }
    return relevZW
}


function mittelwert (input){
    if ((typeof(input) == "object") && (input.length > 1)){
        let result = 0;
        for (let i = 0; i < input.length; i++){
            result += parseFloat(input[i]);
            }
        result /= input.length;
        return result}
}


function standardabweichung(Messwerte, Mittelwert){
    let over = 0;
    for (let i = 0; i < Messwerte.length; i++){
        let currentMW = parseFloat(Messwerte[i]);
        let Klammer = currentMW - parseFloat(Mittelwert);
        over += Math.pow(Klammer, 2);
        }
    let ges = Math.pow((over /(Messwerte.length - 1)), 0.5);
    return ges
}

function streuung(standardabweichung, probenzahl) {
    let streuung = 1.65 * (parseFloat(standardabweichung) / Math.pow(probenzahl, 0.5))
    return streuung
}
