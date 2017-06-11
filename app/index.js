var $ = require('jquery');
require('./style.less');

function main(){
	$(".hello").html('<span>hello world!</span>');
      console.log(process.env.NODE_ENV);
}

main();