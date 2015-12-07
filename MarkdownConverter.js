
var converter = new showdown.Converter(),

	text =  "A Second Level Header  ---------------------  Now is the time for all good men to come to  the aid",

	trimmed = text.replace(/\s\s+/g, '\n');
	console.log("trimmed:", trimmed);

    html      = converter.makeHtml(trimmed);

document.getElementById('slides').innerHTML = html;
console.log('converted:', html);