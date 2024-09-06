function getPhShapes(xmin, xmax, soil){
	let legendX = ["Grenzwert", "Grenzwert", "Grenzwert", "Grenzwert", "Grenzwert"]
	let legendY = [2.75, 6, 8, 10.75, 13]
	let legendText = [`>${soil}-F3`, `${soil}-F3`, `${soil}-0`, `${soil}-F3`, `>${soil}-F3`]

	let phShapes = [
			// BM-0
		{       type: 'rect',
            		xref: 'x',
            		yref: 'y',
            		x0: xmin,
            		y0: 6.5,
            		x1: "Grenzwert", // xmax,
            		y1: 9.5,
            		fillcolor: "#348238",
            		opacity: 0.5,
            		line: {
                		width: 1
            			}
        		},
			// BM-F3
		{       type: 'rect',
            		xref: 'x',
            		yref: 'y',
            		x0: xmin,
            		y0: 9.5,
            		x1: "Grenzwert",
            		y1: 12,
            		fillcolor: "#783923",
            		opacity: 0.5,
            		line: {
                		width: 1
            			}
        		},

		{       type: 'rect',
            		xref: 'x',
            		yref: 'y',
            		x0: xmin,
            		y0: 5.5,
            		x1: "Grenzwert",
            		y1: 6.5,
            		fillcolor: "#783923",
            		opacity: 0.5,
            		line: {
                		width: 1
            			}
        		},

			// > BM-F3
		{       type: 'rect',
            		xref: 'x',
            		yref: 'y',
            		x0: xmin,
            		y0: 12,
            		x1: "Grenzwert",
            		y1: 14,
            		fillcolor: "#722e2e",
            		opacity: 0.5,
            		line: {
                		width: 1
            			}
        		},

		{       type: 'rect',
            		xref: 'x',
            		yref: 'y',
            		x0: xmin,
            		y0: 0,
            		x1: "Grenzwert",
            		y1: 5.5,
            		fillcolor: "#722e2e",
            		opacity: 0.5,
            		line: {
                		width: 1
            			}
        		},
		]

	return [phShapes, legendX, legendY, legendText] 
	};



function getRowValues(Para, paName){
	let resY = []
	let resX = []
	let ErrorArray = []
	for(let column = 0; column < 12; column++){
		let MW = document.getElementById(`Inp${paName}${column}`).value;
		let roundedMW = parseFloat(MW).toFixed(Para.Rst)
		let SampleName = document.getElementById(`SampleName${column}`).value;
		console.log(MW + " " + SampleName)
		if (SampleName == ""){
			SampleName = `Eingabefeld ${column}`;
			}
		if ((! (MW == "")) && document.getElementById(`SampleNumber${column}`).checked){
			resY = resY.concat(parseFloat(MW));
			resX = resX.concat(SampleName);
			ErrorArray = ErrorArray.concat(roundedMW - MW)
			}
		}

	// Nach der Größe sortieren :-)

	if (resY.length > 1){
		let AllDataList = []
		for (index in resY){
			AllDataList.push({
                        	resx:	resX[index],
                		resy:   resY[index],
				err: 	ErrorArray[index],
                            		});
        		}
	
		AllDataList.sort((a, b) => ((parseFloat(a.resy) < parseFloat(b.resy)) ? -1 :(parseFloat(a.resy) == parseFloat(b.resy)) ?  0 : 1));

		for (n in AllDataList){
			resY[n] = AllDataList[n].resy ;
			resX[n] = AllDataList[n].resx ;
			ErrorArray[n] = AllDataList[n].err ;
			} 

    }

	return [resY, resX, ErrorArray ]
	}



function graphicAusw(){

	let ParaIndex = document.getElementById("GO").value
	let Para = Parameterliste[ParaIndex]
	let XY = getRowValues(Para, Para.Name)
	let x = XY[1]
	let y = XY[0]
	let ErrorArray = XY[2]
	//console.log(XY)

	if ((x.length > 1)&& (!(Para instanceof(DoubleParameter)))){
		x = x.concat(["Mittelwert (X̅)", "X̅ + Streuung"])
		
		let mittelw = mittelwert(y);
		let standardabweich = standardabweichung(y, mittelw);
		let streu = streuung(standardabweich, y.length);
		let mwStreu = mittelw + streu;
		y = y.concat([mittelw, mwStreu]);
		ErrorArray = ErrorArray.concat((parseFloat(mittelw).toFixed(Para.Rst)) - mittelw);
		ErrorArray = ErrorArray.concat((parseFloat(mwStreu).toFixed(Para.Rst)) - mwStreu);
		}
	
	


	if (x.length > 0){
	let NGC = Para.getColorScheme(document.getElementById("Bodenart").value, document.getElementById("TOC").value)
	//console.log(NGC)
	// DATA

	var data = [
  		{
    		x: x,
    		y: y,
    		error_y: {
      			type: 'data',
			symmetric: false,
      			array: ErrorArray,
      			visible: true
    			},
    		//type: 'scatter',
    		mode: "markers"
  		},
		   ];
	


	// LAYOUT	
	
	let schadstoffKlassen = NGC[0];
	let grenzwerte = NGC[1];
	let classColor = NGC[2];
	let shapesArray = []
	let legendX = []
	let legendY = []
	let legendText = []
	
	if (! (Para instanceof DoubleParameter)){
		for (let q = 0; q < schadstoffKlassen.length; q++){
			if (q == 0){
				let currentShape = {
            				type: 'rect',
            				xref: 'x',
            				yref: 'y',
            				x0: x[0],
            				y0: 0,
            				x1: "Grenzwert" , //x[x.length - 1]
            				y1: grenzwerte[q],
            				fillcolor: classColor[q],
            				opacity: 0.5,
            				line: {
                				width: 1
            					},
        				};
				legendX = legendX.concat("Grenzwert") // x[0]
				legendY = legendY.concat(grenzwerte[q])
				legendText = legendText.concat(`${document.getElementById("Bodenklasse").value}-${schadstoffKlassen[q]}`)
				shapesArray = shapesArray.concat(currentShape)
				}

			else if ((q != 0) && (grenzwerte[q] > grenzwerte[q -1]) && (grenzwerte[q] > grenzwerte[0])){
				let currentShape = {
            			type: 'rect',
            			xref: 'x',
            			yref: 'y',
            			x0: x[0],
            			y0: (grenzwerte[q-1] < grenzwerte[0]) ? grenzwerte[0]: grenzwerte[q-1],
            			x1: "Grenzwert" , //x[x.length - 1]
				// Bei Eluatwerten können die BM-0* Werte unter den BM-F0* Werten liegen
            			y1: (grenzwerte[q] < grenzwerte[0])? grenzwerte[0]: (grenzwerte[q] < grenzwerte[q-1]) ? grenzwerte[q-1]: grenzwerte[q],
            			fillcolor: classColor[q],
            			opacity: 0.5,
            			line: {
                			width: 1
            				}
        			}
				legendX = legendX.concat("Grenzwert")// x[0]
				legendY = legendY.concat(grenzwerte[q])
				legendText = legendText.concat(`${document.getElementById("Bodenklasse").value}-${schadstoffKlassen[q]}`)
				shapesArray = shapesArray.concat(currentShape)
				}
			
			}
		let currentShape = {
            		type: 'rect',
            		xref: 'x',
            		yref: 'y',
            		x0: x[0],
            		y0: grenzwerte[grenzwerte.length - 1],
            		x1: "Grenzwert", //x[x.length - 1]
			// Bei Eluatwerten können die BM-0* Werte unter den BM-F0* Werten liegen
            		y1: grenzwerte[grenzwerte.length - 1] * 10,
			// Ausnahmeregelung für Thallium und Quecksilber im Eluat - GW-Überschreitung -> >BM-F3
            		fillcolor: (Para == QuecksilberEl || Para == ThalliumEl || Para == TOC) ? Colordic[">BM-F3"] : Colordic[`>${legendText[legendText.length -1]}`],
            		opacity: 0.5,
            		line: {
                		width: 1
            			}
        		}
			legendX = legendX.concat("Grenzwert") //
			legendY = legendY.concat(grenzwerte[grenzwerte.length - 1] *1.2)
			legendText = (Para == QuecksilberEl || Para == ThalliumEl || Para == TOC) ? legendText.concat(`>${document.getElementById("Bodenklasse").value}-F3`) :  legendText.concat(`>${legendText[legendText.length -1]}`)
			shapesArray = shapesArray.concat(currentShape)
		}

		else if (Para instanceof DoubleParameter){
			//x = x.concat(["Grenzwert"])
			let phData = getPhShapes(x[0], x[x.length - 1], document.getElementById("Bodenklasse").value); //getPhShapes(x[0], x[x.length - 1], document.getElementById("Bodenklasse").value)
			shapesArray = shapesArray.concat(phData[0]);
			legendX = legendX.concat(phData[1]);
			legendY = legendY.concat(phData[2]);
			legendText = legendText.concat(phData[3]);
			}
	
	//console.log(legendText);
	//console.log(legendX);
	//console.log(legendY);
	let maxyVal = ((Math.max(...y)))
	let yRange = ((maxyVal * 1.25) >= (grenzwerte[0]* 1.25)) ? (maxyVal *1.25) : (grenzwerte[0]* 1.25);

	var traceLegend = {
  		x: legendX,
  		y: legendY,
  		text: legendText,
  		mode: 'text'
		};
	
	var layout = 
		{
  		title:`${document.getElementById("Abfallbezeichnung").value}<br>Parameter: ${Para.Name}`,
  		xaxis: {
 	   		showgrid: false,
    			zeroline: true,
    			//tickangle: 60,
    			showticklabels: true,
			title: "Proben"
  			},
  		yaxis: {showgrid: true,
    			zeroline: false,
    			gridcolor: 'black',
			tick0: 0,
			autorange: false,
			range: (Para instanceof(DoubleParameter)) ? [0, 14] : [0, yRange],
			autorangeoptions: {
				minallowed: 0,
				maxallowed: legendY[legendY.length -2] * 1.25,
				},
			title: Para.Unit,
  			},

  		//paper_bgcolor: 'rgb(233,233,233)',
  		//plot_bgcolor: 'rgb(233,233,233)',
  		showlegend:false,
  		//plot_bgcolor: 'rgb(104,172,212)',
    		// Hier werden die Hintergrundfarben erstellt
    		shapes: shapesArray,
		};
	
	let dataFertig = data.concat(traceLegend)

	Plotly.newPlot('myDiv', dataFertig, layout);}

	else {
	alert(`Beim Parameter ${Para.Name} sind keine Messwerte hinterlegt.\nEine grafische Auswertung kann nicht durchgeführt werden.`)
	}
}
	
	
	
