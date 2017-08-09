//
//  javascript. 
//
//  None of this is written by me, except the bits which are.
//
//  @gwybod
//  


// https://stackoverflow.com/questions/3387427/remove-element-by-id
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function gpr(requestType, payload, target, outputdiv, timeout = '5000'){
    console.log("gpr", requestType, payload, target, outputdiv, timeout)
    if ((requestType ==='')||(payload === '')||(target==='')||(outputdiv==='')) { return;}
    var xhttp = new XMLHttpRequest();
    xhttp.timeout = timeout;
    xhttp.onreadystatechange = function() {switch(this.readyState){case 4: switch(this.status){ case 200: 
				document.getElementById(outputdiv).innerHTML = this.responseText
    }}}
    switch(requestType){
        case "POST":
			xhttp.open('POST', target, true)
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
			xhttp.send(payload)
			break
        case "GET":
		    xhttp.open('GET', target + '?' + payload, true)
		    xhttp.send()
		    break
    }
}


function grab(target, payload, requestType = 'GET', outputdiv = 'main', timeout = '5000'){
    console.log("grab", requestType, payload, target, outputdiv, timeout)
    if ((target==='')||(outputdiv==='')) { return;}
    var x = new XMLHttpRequest();
    x.timeout = timeout;
    x.onreadystatechange = function() {switch(this.readyState){case 4: switch(this.status){ case 200: 
				document.getElementById(outputdiv).innerHTML = this.responseText
    }}}
    switch(requestType){
        case "POST":
			x.open('POST', target, true)
			x.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
			x.send(payload)
			break
        case "GET":
		    x.open('GET', target + '?' + payload, true)
		    x.send()
		    break
    }
}

// Taken from Wikipedia: Damm_Algorithm
var table = [
  [0, 3, 1, 7, 5, 9, 8, 6, 4, 2],
  [7, 0, 9, 2, 1, 5, 4, 8, 6, 3],
  [4, 2, 0, 6, 8, 7, 1, 3, 5, 9],
  [1, 7, 5, 0, 9, 8, 3, 4, 2, 6],
  [6, 1, 2, 3, 0, 4, 5, 9, 7, 8],
  [3, 6, 7, 4, 2, 0, 9, 5, 8, 1],
  [5, 8, 6, 9, 7, 2, 0, 1, 3, 4],
  [8, 9, 4, 5, 3, 6, 2, 0, 1, 7],
  [9, 4, 3, 8, 6, 1, 7, 2, 0, 5],
  [2, 5, 8, 1, 4, 3, 6, 7, 9, 0]
];

function calcDamm(basenumber) { // Damm Algorighm
  console.log("calcDamm()", basenumber);
  var s,damm;
  damm = 0;
  s = String(basenumber); 
  for (var i=0; i<s.length; ++i) {
  	damm = table[damm][s.charAt(i)];
  }
  console.log("calcdamm is", damm)
  return damm;
}

function listen(source, outputDiv){
	var source = new EventSource(source)
	source.onmessage = function(event) {
		document.getElementById(outputDiv).innerHTML += event.data + "<br>"
	}
}

