//
//  gwybods visitor web app javascript. 
//
//  All of this is written by me, except the bits which aren't.
//
//  If this code is useful in anyway, feel freel to reuse, 
//  @gwybod
//  

var constantsDefined

function defineConstants(){
	console.log('defineConstants()')
	if (localStorage.getItem('visitorapp')==="ACTIVE"){
		console.log('active', localStorage.getItem('WELCOME'))
		WELCOMEMSG = localStorage.getItem('WELCOME')
		document.getElementById('welcome').removeAttribute("contenteditable")
	}else{
		console.log('notactive')
		WELCOMEMSG = "Welcome"
	}
	LOCALLOGINFAIL = "The local login failed - sorry."
	LOCALLOGOUTFAIL = "The local logout failed - sorry."
	ATTEMPTLOGIN = "Attempting to sign you in.."
	INVALIDCARDNUM = "Invalid Card Number, please check and try again"
	CARDINUSE = "The card number you have enetered is in use. Please check with Reception"
	CARDNOTACTIVE = "The card number you have entered is not registered"
	ERPRE = "<div class='message'>"
	ERPST = "</div>"
	constantsDefined = true
}

function submitLogin(){
	console.log("submitlogin()")
    n4 = document.getElementById('s1').value
    t4 = document.getElementById('s2').value
    e4 = document.getElementById('s3').value
    m4 = document.getElementById('s4').value
    payload = "name="+n4+"&tel="+t4+"&email="+e4+"&number="+m4
    if (validCardNumber(m4)) {
		if (!cardActive(m4)) { 
				gpr('POST',payload,'bits/terms.bit', 'main')
			} else { alert(CARDINUSE) }
    } else { alert(INVALIDCARDNUM) }
}

function agreeTerms(n2, t2, e2, m2){
   console.log('acceptTerms', m2)
    c4 = document.getElementById('termsconfirm').value    
	if ((validCardNumber(c4))&&(c4 === m2)) {
		if (doLocalLogin(n2,t2,e2,m2)){
			payload = "name="+n2+"&tel="+t2+"&email="+e2+"&number="+m2
			grab('bits/dologin.bit', payload, 'POST')
			setTimeout(relo, 3000)
		} else { alert(LOCALLOGINFAIL) }
	} else { alert(INVALIDCARDNUM) }
}

function submitLogout(){
    console.log("submitlogout()")
    n6 = document.getElementById('d1').value
    payload = "number="+n6
	if (validCardNumber(n6)){
		if (cardActive(n6)){
			if (doLocalLogout(n6)){
				grab('bits/dologout.bit', payload, 'POST')
				setTimeout(relo, 3000)
			} else { alert(LOCALLOGOUTFAIL) }
		} else { alert(CARDNOTACTIVE) }	
	} else { alert(INVALIDCARDNUM) }
	console.log(n6, payload);
}

function relo() {
	console.log("relo()")
	grab('bits/main.bit')
}

function cardActive(cardNo){
	console.log("cardActive?")
	if (localStorage.getItem(cardNo) == 'ACTIVE' ) {return true}
	console.log ("no")
	return false
}

function createCards(startnumber,endnumber){
	for (i=startnumber; i< endnumber; i++){
		cardNo = i+calcDamm(i)
		localStorage.setItem(cardNo,'INACTIVE')
	}
}

function validCardNumber(num){
	console.log('check', num, num.length)
	isvalid = false
	if ((num.length) == "4"){
		cardnum = num.substr(0,3)
		checknum = num[3]
		if ((calcDamm((num.substr(0,3)))==(num[3]))){
			isvalid=true
		}
	}
	console.log("is this valid?", isvalid)
	return isvalid
}

function getready() {
	defineConstants() 
	console.log('getready()', WELCOMEMSG)

	document.getElementById("welcome").innerHTML = WELCOMEMSG
	relo()
}

function doLocalLogin(a, b, c, d){
	console.log('doLocalLogin()', a, b, c, d)
	if(cardActive(d)){
		return false 
	} else {
		localStorage.setItem(d, 'ACTIVE')
		localStorage.setItem(d+'NAME', a)
		localStorage.setItem(d+'TEL', b)
		localStorage.setItem(d+'EMAIL', c)
	}
	return true
}

function doLocalLogout(a){
	console.log("doLocalLogout()",a)
	if(localStorage.getItem(a)==='ACTIVE'){
		localStorage.setItem(a, null)
		localStorage.setItem(a+'NAME',null)
		localStorage.setItem(a+'TEL', null)
		localStorage.setItem(a+'EMAIL', null)
	} else { return false }
	return true
}

function finalize(){
	welcomemessage = document.getElementById('welcome').innerHTML
	localStorage.setItem("visitorapp", 'ACTIVE')
	localStorage.setItem("WELCOME", welcomemessage)
	document.getElementById('welcome').removeAttribute("contenteditable")
	console.log(localStorage.getItem("visitorapp"), localStorage.getItem("WELCOME"), welcomemessage)
}
function unfinalize(){
	localStorage.removeItem("visitorapp")
	localStorage.removeItem("WELCOME")
	document.getElementById('welcome').setAttribute("contenteditable", "true")
}
