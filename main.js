var value = "";
var bin = "";
var type = "";

function changeP(){
    value = document.getElementById("input").value;
    document.getElementById("input").value = "";
    document.getElementById("info").innerHTML = "";

	if(type == "ub"){
	    if (value.match("^\\+?\\d+$")) {
	        value = "" + parseInt(value);
		    if(value.valueOf() > 255){
		        document.getElementById("info").innerHTML = "Value too high, rolling over";
		        value = ""+(value.valueOf() % 256);
		    }
		    document.getElementById("value").innerHTML = value;
		    bin = ubBin(value.valueOf());
		    showBytes(1, bin);
		}
		else{
            document.getElementById("info").innerHTML = "Invalid Value"
		}
	}
	else if(type == "sb"){
	    if (value.match("^(-|\\+)?\\d+$")) {
	        value = ""+parseInt(value);
	        if(value.valueOf() > 127){
	            document.getElementById("info").innerHTML = "Value too high, rolling over";
	            value = "" + ((value.valueOf() % 256));
	            if(value.valueOf() > 127){ value = "" + (value.valueOf() - 256);}
	        }
	        else if(value.valueOf() < -128) {
	            document.getElementById("info").innerHTML = "Value too low, rolling over";
	            value = "" + ((value.valueOf() % 256));
	            if(value.valueOf() < -128){value = "" + (value.valueOf() - -256);}
	        }
	        document.getElementById("value").innerHTML = value;
	        bin = ubBin((value.valueOf() + 256) % 256);
	        showBytes(1, bin);
	    }
	    else{
	        document.getElementById("info").innerHTML = "Invalid Value"
	    }
	}
	else if (type == "boolean") {
	    if(value.match("^(((T|t)(R|r)(U|u))|((F|f)(A|a)(L|l)(S|s)))(E|e)$")){
	        document.getElementById("value").innerHTML = value;
	        if (value.match("^(T|t)(R|r)(U|u)(E|e)$")) {
	            bin = "1";
	            value = "True";
	        }
	        else{
	            bin = "0";
	            value = "False";
	        }
	        document.getElementById("value").innerHTML = value;
	        showBytes(1, bin);
	    }
	    else {
	        document.getElementById("info").innerHTML = "Invalid Value"
	    }
	}
	else if (type == "f"){
	    if (value.match("^(-|\\+)?([0123456789]*\.?[0123456789]+)((E|e)(-|\\+)?[0123456789]+)?$")) {
	        var f = parseFloat(value);
	        if (f > Math.pow(2, 128) * 1.999999) {
	            document.getElementById("info").innerHTML = "Value too large to represent";
	        }
	        else if (f < -Math.pow(2, 128) * 1.999999) {
	            document.getElementById("info").innerHTML = "Value too small to represent";
	        }
	        else {
	            document.getElementById("value").innerHTML = f;
	            var sign;
	            if (f >= 0) { sign = "0" }
	            else { sign = "1" }
	            f = Math.abs(f);
	            var exp = 0;
	            var man = 0;
	            for (exp = 0; exp < 256; exp++) {
	                man = f / Math.pow(2, exp - 127);
	                if (man > 1 & man < 2) { break; }
	            }
	            man = ("" + man).substring(2);
	            if (man.length > 7) { man = "" + Math.round((man.substring(0, 7) + "." + man.substring(7)).valueOf()); }
	            if (man.valueOf() >= Math.pow(2, 23)) { man = "" + Math.round((man.substring(0, 6) + "." + man.substring(6)).valueOf()); }
	            bin = sign;
	            var tb = ubBin(exp);
	            for (var i = tb.length; i < 8; i++) {
	                tb = "0" + tb;
	            }
	            bin = bin + tb;
	            var tb = ubBin(man.valueOf());
	            for (var i = tb.length; i < 23; i++) {
	                tb = "0" + tb;
	            }
	            bin = bin + tb;

	            showBytes(4, bin);
	            document.getElementById("sValue1").innerHTML = sign;
	            document.getElementById("eValue1").innerHTML = exp;
	            document.getElementById("mValue1").innerHTML = man;
	            document.getElementById("equ1").innerHTML = Math.pow(-1, sign.valueOf()) + " * " + Math.pow(2, exp - 127) + " * 1." + man;

	        }
	    }
	    else {
	        document.getElementById("info").innerHTML = "Invalid Value";
	    }
	}
	else if (type == "d") {
	    if (value.match("^(-|\\+)?([0123456789]*\.?[0123456789]+)((E|e)(-|\\+)?[0123456789]+)?$")) {
	        var d = parseFloat(value);
	        if (f > Math.pow(2, 1024) * 1.9999999999999999) {
	            document.getElementById("info").innerHTML = "Value too large to represent";
	        }
	        else if (f < -Math.pow(2, 1024) * 1.9999999999999999) {
	            document.getElementById("info").innerHTML = "Value too small to represent";
	        }
	        else {
	            document.getElementById("value").innerHTML = d;
	            var sign;
	            if (d >= 0) { sign = "0" }
	            else { sign = "1" }
	            d = Math.abs(d);
	            var exp = 0;
	            var man = 0;
	            for (exp = 0; exp < 2048; exp++) {
	                man = d / Math.pow(2, exp - 1023);
	                if (man > 1 & man < 2) { break; }
	            }
	            man = ("" + man).substring(2);
	            if (man.length > 16) { man = "" + Math.round((man.substring(0, 16) + "." + man.substring(16)).valueOf()); }
	            if (man.valueOf() >= Math.pow(2, 52)) { man = "" + Math.round((man.substring(0, 15) + "." + man.substring(15)).valueOf()); }
	            bin = sign;
	            var tb = ubBin(exp);
	            for (var i = tb.length; i < 11; i++) {
	                tb = "0" + tb;
	            }
	            bin = bin + tb;
	            var tb = ubBin(man.valueOf());
	            for (var i = tb.length; i < 52; i++) {
	                tb = "0" + tb;
	            }
	            bin = bin + tb;

	            showBytes(8, bin);
	            document.getElementById("sValue2").innerHTML = sign;
	            document.getElementById("eValue2").innerHTML = exp;
	            document.getElementById("mValue2").innerHTML = man;
	            document.getElementById("equ2").innerHTML = Math.pow(-1, sign.valueOf()) + " * " + Math.pow(2, exp - 1023) + " * 1." + man;
	        }
	    }
	    else {
	        document.getElementById("info").innerHTML = "Invalid Value";
	    }
	}
	else if (type == "string") {
	    if (value.length <= 7) {
	        document.getElementById("value").innerHTML = value;
	        showBytes(value.length + 1, sBin(value) + "00000000");
	    }
	    else {
	        document.getElementById("info").innerHTML = "Please use a shorter string (7 characters or less)";
	    }
	}

	else {
	    document.getElementById('value').innerHTML = value;
	}

}
function signedByte(){
	unClick()
	document.getElementById("sb").style.borderWidth = "5";
	
	value = ""+(Math.floor(Math.random()*256) - 128);
	document.getElementById('value').innerHTML = value;
	if(value.valueOf() < 0){
	bin = ubBin(256+parseInt(value));
	}
	else{
	bin = ubBin(value.valueOf());
	}
	document.getElementById('type').innerHTML = "Signed Byte Integer";
	type = "sb";
	showBytes(1,bin);
}

function unsignedByte(){
	unClick()
	document.getElementById("ub").style.borderWidth = "5";
	
	value = ""+Math.floor(Math.random()*256);
	document.getElementById('value').innerHTML = value;
	bin = ubBin(value.valueOf());
	document.getElementById('type').innerHTML = "Unsigned Byte Integer";
	type = "ub";
	showBytes(1,bin);
}

function string(){
	unClick()
	document.getElementById("string").style.borderWidth = "5";
	
	var strings = ["ABcd","Hello","1234","abc123"];
	value = strings[Math.floor(Math.random()*strings.length)];
	document.getElementById('value').innerHTML = value;//"\""+value+"\"";
	bin = sBin(value) + "00000000";
	document.getElementById('type').innerHTML = "String";
	type = "string";
	showBytes(value.length+1,bin);
}

function boolean(){
	unClick()
	document.getElementById("boolean").style.borderWidth = "5";
	
	if(Math.random() < 0.5){
		document.getElementById('value').innerHTML = "False";
		bin = "0";
	}
	else{
		document.getElementById('value').innerHTML = "True";
		bin = "1";
	}
	document.getElementById("type").innerHTML = "Boolean";
	type="boolean";
	showBytes(1,bin);
}

function float(){
	unClick();
	document.getElementById("float").style.borderWidth = "5";
    value = 0;
    if (Math.random() < .7) {
        value = 1;
        bin = "0"
        document.getElementById("sValue1").innerHTML = "0";
    }
    else {
        value = -1;
        bin = "1"
        document.getElementById("sValue1").innerHTML = "1";
    }
    document.getElementById("equ1").innerHTML = "";
    document.getElementById("equ1").innerHTML = value + " * ";

    var exp = Math.floor(Math.random() * 256);
    document.getElementById("eValue1").innerHTML = ""+exp;
    document.getElementById("equ1").innerHTML += Math.pow(2,(exp - 127)) + " * ";
    var tb = ubBin(exp);
    for (var i = tb.length; i < 8; i++){
        tb = "0" + tb;
    }
    bin = bin + tb;
    var sig = Math.floor(Math.random() * Math.pow(2, 23));
    document.getElementById("mValue1").innerHTML = sig;
    document.getElementById("equ1").innerHTML += "1." + sig;
    tb = ubBin(sig);
    for (var i = tb.length; i < 23; i++){
        tb = "0" + tb;
    }
    bin = bin + tb;
    value = value + "." + sig;
    value = value.valueOf() * Math.pow(2, exp - 127);
    //value = value * (1 + (sig * Math.pow(10, -23))) * Math.pow(2, exp - 127);
    value = value + ""
    if (value.indexOf(".") == -1){
        value = value + ".0";
    }

    document.getElementById('value').innerHTML = value;
    document.getElementById('type').innerHTML = "Single Precision Floating Point Decimal";
    type = "f";
    showBytes(4, bin);

}

function double(){
	unClick()
	document.getElementById("double").style.borderWidth = "5";
    value = 0;
    if (Math.random() < .7) {
        value = 1;
        bin = "0";
        document.getElementById("sValue2").innerHTML = "0";
    }
    else {
        value = -1;
        bin = "1";
        document.getElementById("sValue2").innerHTML = "1";
    }
    document.getElementById("equ2").innerHTML = "";
    document.getElementById("equ2").innerHTML = value + " * ";

    var exp = Math.floor(Math.random() * Math.pow(2,12));
    document.getElementById("equ2").innerHTML += Math.pow(2, (exp - 1023)) + " * ";
    document.getElementById("eValue2").innerHTML = exp;
	var tb = ubBin(exp);
    for (var i = tb.length; i < 11; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;
    var sig = Math.floor(Math.random() * Math.pow(2, 52));
    document.getElementById("mValue2").innerHTML = sig;
    document.getElementById("equ2").innerHTML += "1." + sig;
    tb = ubBin(sig);
    for (var i = tb.length; i < 52; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;
    value = value + "." + sig;
    value = value.valueOf() * Math.pow(2, exp - 1023);
    //value = (value + (sig * Math.pow(10, -52))) * Math.pow(2, exp - 1023);
    value = value + "";
    if (value.indexOf("Inf") != -1) { double();}
    if (value.indexOf(".") == -1) {
        value = value + ".0";
    }

    document.getElementById('value').innerHTML = value;
    document.getElementById('type').innerHTML = "Double Precision Floating Point Decimal";
    type = "d";
    showBytes(8, bin);
}

function unClick(){
	document.getElementById("boolean").style.borderWidth = "2";
	document.getElementById("sb").style.borderWidth = "2";
	document.getElementById("ub").style.borderWidth = "2";
	document.getElementById("string").style.borderWidth = "2";
	document.getElementById("float").style.borderWidth = "2";
	document.getElementById("float").style.borderWidth = "2";
	document.getElementById("double").style.borderWidth = "2";
	
	document.getElementById("main").style.visibility = "visible";
	document.getElementById("mantissa1").style.display = "none";
	document.getElementById("mantissa2").style.display = "none";
	document.getElementById("temp").style.visibility = "hidden";
}

function ubBin(n){
	if(n == 0){return "";}
	else{return ubBin(Math.floor(n/2)) + n%2;}
}
function sBin(str){
	var i = 0;
	var t = "";
	for(i = 0;i<str.length;i++){
		var ts = ubBin(str.charCodeAt(i));
		var k = 0;
		for(k = ts.length;k<8;k++){ts = "0"+ts;}
		t = t+ts;
	}
	return t;
}

function man1(str) {
    document.getElementById("mantissa1").style.display = "block";
    var i = 0;
    for (i = 0; i < 32; i++) {
        document.getElementById("bit" + i + "m").innerHTML = str.charAt(i);
    }
}
function man2(str) {
    document.getElementById("mantissa2").style.display = "block";
    var i = 0;
    for (i = 0; i < 64; i++) {
        document.getElementById("bit" + i + "m2").innerHTML = str.charAt(i);
    }
}

function showBytes(b, str) {

    if (type == "f") { man1(str); }
    if (type == "d") { man2(str) }

    var i = 0;
	showHex(b, str);
    //hide all bytes
    for (i = 0; i < 8; i++){
        document.getElementById("byte" + i).style.visibility = "hidden";
        document.getElementById("byte"+i).style.float = "right";
    }
    //shows b bytes
	for(i = 0;i<b;i++){
		document.getElementById("byte"+i).style.visibility = "visible";
		document.getElementById("byte"+i).style.float = "left";
	}
    //fills in bits for b bytes
	for(i = 0;i<b*8;i++){		
		if(i < str.length){
			document.getElementById("bit"+Math.floor(i/8)+""+(i%8)).innerHTML = str.charAt(str.length-i-1);
		}
		else{
			document.getElementById("bit"+Math.floor(i/8)+i%8).innerHTML = "0";
		}
	}
}

function showHex(b, binStr){
	hexStr = "";
	i = 0;
	for(i = 0;i<binStr.length;i+=4){
		val = 0;
		for(k = 0;k<4;k++){
			val += binStr.charAt(binStr.length-i-k-1).valueOf() * Math.pow(2,k);
		}
		char = ""+val;
		if(val == 10){char = "A";}
		if(val == 11){char = "B";}
		if(val == 12){char = "C";}
		if(val == 13){char = "D";}
		if(val == 14){char = "E";}
		if(val == 15){char = "F";}
		hexStr = char+hexStr;
	}
	for(i = hexStr.length;i<b*2;i++){
		hexStr = "0"+hexStr;
	}
	//document.getElementById("hexValue").innerHTML = hexStr;
	
	//hide all bytes
	for (i = 0; i < 8; i++){
		document.getElementById("byte" + i+"h").style.visibility = "hidden";
		document.getElementById("byte"+i+"h").style.float = "right";
	}
	//shows b bytes
	for(i = 0;i<b;i++){
		document.getElementById("byte"+i+"h").style.visibility = "visible";
		document.getElementById("byte"+i+"h").style.float = "left";
	}
	//fills in bits for b bytes
	for(i = 0;i<b*2;i++){		
		if(i < hexStr.length){
			document.getElementById("hex"+Math.floor(i/2)+""+(i%2)).innerHTML = hexStr.charAt(hexStr.length-i-1);
		}
		else{
			document.getElementById("bit"+Math.floor(i/2)+i%2).innerHTML = "0";
		}
	}
}
