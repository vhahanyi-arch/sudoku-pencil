importScripts('./screenshot.js');
self.onmessage=e=>{try{self.postMessage({solution:SudokuScreenshot.validate(e.data)})}catch(error){self.postMessage({error:error.message})}};
