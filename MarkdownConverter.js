

var converter = new showdown.Converter(),
    text      = 'A First Level Header\n'+
				'====================\n'+

				'A Second Level Header\n'+
				'---------------------\n'+
				'\n'+
				'paragraph is paragrah is paragraph is paragraph is paragraph second half second half second half second half\n' +
				'\n'+
				'paragraph is paragraph',

				
    html      = converter.makeHtml(text);

document.getElementById('slides').innerHTML = html;
console.log('converted:', html);