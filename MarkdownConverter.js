
var converter = new showdown.Converter();

var text    =  document.cookie;

var	trimmed = JSON.parse(text).replace(/\\n/g, ' ');
var	remBack = trimmed.replace(/\\/g, ' ');
var html    = converter.makeHtml(remBack);

console.log('text: ', text);
console.log('trimmed: ', trimmed);


document.getElementById('slides').innerHTML = html;
console.log('converted:', html);