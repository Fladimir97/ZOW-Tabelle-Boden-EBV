async function saveData(){
	let inputs = document.getElementsByTagName("input")
	let jsonObj = {}	
	for (let i = 0; i < inputs.length; i++){
		let currentInput = inputs[i]
		let value = (currentInput.value);
		let key = (currentInput.id);
		if (key.includes("checkbox")){
			value = currentInput.checked;
			};
		jsonObj[key] = value};
	//console.log(jsonObj)

	let toc = document.getElementById("TOC").value;
	jsonObj["TOC"] = toc 

	let Probenahme = document.getElementById("Probenahme").value;
	jsonObj["Probenahme"] = Probenahme 

	let Bodenklasse = document.getElementById("Bodenklasse").value;
	jsonObj["Bodenklasse"] = Bodenklasse 

	let Bodenart = document.getElementById("Bodenart").value;
	jsonObj["Bodenart"] = Bodenart
	
	let jsonText = JSON.stringify(jsonObj)
	//console.log(jsonText)
	
	const opts = {	
			types: [
	    			{
		      			description: "Json",
		      			accept: {
					        	"json/*": [".json"],
				      			},
	    			},
		  		],
  			excludeAcceptAllOption: true,
  			multiple: false,
			};

	const newHandle = await window.showSaveFilePicker(opts);

	// create a FileSystemWritableFileStream to write to
  	const writableStream = await newHandle.createWritable();

	// write our file
 	 await writableStream.write(jsonText);

	// close the file and write the contents to disk.
  	await writableStream.close();
}
	
	