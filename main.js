var value = "";
var bin = "";
var type = "";
var sig = "";
var exp = "";

function desc() {
    if (type == "ub") {
        document.getElementById("desc").innerHTML = "An Unsigned Byte Integer stores a whole number in the range [0,255]. The whole number is converted from base 10 to base 2 to be stored in binary. If one tries to store a number larger than 255, it will still be converted to base 2, but only the first eight digits are saved. For example 257 in binary is 100000001, but only 00000001 is saved, and the value stored would be 1, not 257.";
    }
}

function clear() {
    document.getElementById("input").value = "";
}

function random() {
    clear();
    if (type == "f") {
        randomFloat(true);
    }
    if (type == "d") {
        randomDouble(true);
    }
    if (type == "boolean") {
        randomBoolean(true);
    }
    if (type == "ub") {
        randomUnsignedByte(true);
    }
    if (type == "sb") {
        randomSignedByte(true);
    }
    if (type == "string") {
        randomString(true);
    }

}

function changeP(){
    value = document.getElementById("input").value;
    //document.getElementById("input").value = "";
    document.getElementById("info").innerHTML = "";

	if(type == "ub"){
	    customUnsignedByte(value);
	}
	else if (type == "sb") {
	    customSignedByte(value);
	    }
	else if (type == "boolean") {
	    customBoolean(value);
	}
	else if (type == "f"){
	    customFloat(value);
	}
	else if (type == "d") {
	    customDouble(value);
	}
	else if (type == "string") {
	    customString(value);
	}

	else {
	    //document.getElementById("input").value = value;
	}

}


function customSignedByte(value) {
    if (value.match("^(-|\\+)?\\d+$")) {
        value = parseInt(value);
        if (value > 127) {
            document.getElementById("info").innerHTML = "Value too high, rolling over";
            value = value % 256;
            if (value > 127) {
                value = value - 256;
            }
            console.log(value);
            //console.log("15 % 8 : " + (15 % 8));
            //console.log("-15 % 8 : " + (-15 % 8));
            //console.log("15 % -8 : " + (15 % -8));
            //console.log("-15 % -8 : " + (-15 % -8));
        }
        else if (value < -128) {
            document.getElementById("info").innerHTML = "Value too low, rolling over";
            value = ((value % 256) + 256);
        }

        if (value < 0) {
            bin = ubBin(value + 256);
        }
        else {
            bin = ubBin((value));
        }
        for (i = bin.length; i < 8; i++) {
            bin = "0" + bin;
        }
        //console.log(value);
        signedByte();
    }
    else {
        document.getElementById("info").innerHTML = "Invalid Value"
    }
}

function randomSignedByte(bool) {
    if (type != "sb" || bool) {
        unClick()
        document.getElementById("sb").style.borderWidth = "5";

        value = "" + Math.floor(Math.random() * 256)-128;
        bin = ubBin((value.valueOf() + 256) % 256);
        for (i = bin.length; i < 8; i++) {
            bin = "0" + bin;
        }
        type = "sb";
        signedByte();
    }
}

function binarySignedByte() {
    value = parseInt(bin, 2);
    if (value > 127) value = value - 256;
    signedByte();
}

function signedByte() {
    if (bin == "") { bin = "00000000"; }
    document.getElementById("input").value = parseInt(bin, 2);//value;
    if (parseInt(bin, 2) > 127) {
        document.getElementById("input").value = parseInt(bin, 2) - 256;//value;
    }
    document.getElementById('type').innerHTML = "Signed Byte Integer";
    type = "sb";
    showBytes(1, bin);
}

function customUnsignedByte(value) {
    if (value.match("^\\+?\\d+$")) {
        value = parseInt(value);
        if (value > 255) {
            document.getElementById("info").innerHTML = "Value too high, rolling over";
            console.log("too high");
            console.log(value + " , " + (value % 256));
            value = (value % 256);
            console.log(value);
        }
        bin = ubBin(value.valueOf());
        //document.getElementById("input").value = value;
        console.log(bin);
        unsignedByte();
    }
    else {
        document.getElementById("info").innerHTML = "Invalid Value"
    }
}

function randomUnsignedByte(bool) {
    if (type != "ub" || bool) {
        unClick()
        document.getElementById("ub").style.borderWidth = "5";

        value = "" + Math.floor(Math.random() * 256);
        bin = ubBin(value.valueOf());
        type = "ub";
        desc();
        unsignedByte();
    }
}

function binaryUnsignedByte() {
    value = parseInt(bin, 2);
    unsignedByte();
}

function unsignedByte(){
	if (bin == "") { bin = "00000000";}
	document.getElementById("input").value = parseInt(bin, 2);//value;
	document.getElementById('type').innerHTML = "Unsigned Byte Integer";
	type = "ub";
	showBytes(1,bin);
}

function customString(str) {
    if (str.length <= 8) {
        value = str;
        bin = sBin(value);
        string();
    }
    else {
        document.getElementById("info").innerHTML = "Please use a shorter string (8 characters or less)";
    }
}

function randomString(bool) {
    if (type != "string" || bool) {
        unClick()
        document.getElementById("string").style.borderWidth = "5";
        document.getElementById("charcodes").style.display = "table-row";

        var strings = ["ABcdEFgh", "Hello", "1234", "abcd1234"];
        value = strings[Math.floor(Math.random() * strings.length)];
        bin = sBin(value);
        type = "string"
        string();
    }
}

function binaryString() {
    value = "";
    for (i = 0; i < (bin.length / 8) ; i++) {
        var code = parseInt(bin.substring(i * 8, i * 8 + 8), 2);
        if (code < 32 || (code >= 127 && code < 161)) { code = 32 };
        value += String.fromCharCode(code);
    }
    //console.log(value);
    string();
}

function string(){
	document.getElementById("input").value = value;
	
	document.getElementById('type').innerHTML = "String";
	type = "string";
	showBytes(value.length,bin);
}

function customBoolean(value) {
    if (value.match("^(((T|t)(R|r)(U|u))|((F|f)(A|a)(L|l)(S|s)))(E|e)$") || value.match("^0|1$")) {
        //document.getElementById("input").value = value;
        if (value.match("^(T|t)(R|r)(U|u)(E|e)$") || value.match("^1$")) {
            bin = "1";
            value = "True";
        }
        else {
            bin = "0";
            value = "False";
        }
        boolean();
    }
    else {
        document.getElementById("info").innerHTML = "Invalid Value"
    }
}

function randomBoolean(bool) {
    if (type != "boolean" || bool) {
        unClick();
        document.getElementById("boolean").style.borderWidth = "5";
        document.getElementById("input").value = " ";

        if (Math.random() < 0.5) {
            bin = "0";
        }
        else {
            bin = "1";
        }
        type = "boolean";
        boolean();
    }
}

function binaryBoolean(){
    boolean();
}

function boolean() {
    if (bin == "0") {
        document.getElementById("input").value = "False";
    }
    else if(bin == "1") {
        document.getElementById("input").value = "True";
    }

	document.getElementById("type").innerHTML = "Boolean";
	type="boolean";
	showBytes(0,bin);
}

function customFloat(d) {
    var orVal = document.getElementById("input").value;
    //document.getElementById("input").value = d;

    if (value.match("^(-|\\+)?([0123456789]*\.?[0123456789]+)((E|e)(-|\\+)?[0123456789]+)?$")) {
        d = parseFloat(d);
        if (d > Math.pow(2, 128) * 1.999999) {
            d = "Infinity"
            //document.getElementById("info").innerHTML = "Value too large to represent";
        }
        if (d < -Math.pow(2, 128) * 1.999999) {
            d = "-Infinity";
            //document.getElementById("info").innerHTML = "Value too small to represent";
        }
    }
    d = "" + d;
    if (d == "0" || d == "+0") {
        bin = "0";
        exp = 0;
        sig = 0;
    }
    else if (d == "-0") {
        bin = "1";
        exp = 0;
        sig = 0;
    }
    else if (d == "Infinity" || d == "infinity" || d == "Inf" || d == "inf" || d == "+Infinity" || d == "+infinity" || d == "+Inf" || d == "+inf") {
        bin = "0";
        exp = 255;
        sig = 0;
    }
    else if (d == "-Infinity" || d == "-infinity" || d == "-Inf" || d == "-inf") {
        bin = "1";
        exp = 255;
        sig = 0;
    }
    else if (value.match("^(-|\\+)?([0123456789]*\.?[0123456789]+)((E|e)(-|\\+)?[0123456789]+)?$")) {
        var sign;
        if (d >= 0) { bin = "0" }
        else { bin = "1" }
        d = Math.abs(d);
        exp = 0;
        var man = 0;
        for (exp = 0; exp < 256; exp++) {
            man = d / Math.pow(2, exp - 127);
            if (man >= 1 & man < 2) { break; }
        }
        man = ("" + man).substring(2);
        if (man.length >= 9) { man = "" + Math.round((man.substring(0, 8) + "." + man.substring(8)).valueOf()); }
        if (man.valueOf() >= Math.pow(2, 24)) { man = "" + Math.round((man.substring(0, 7) + "." + man.substring(7)).valueOf()); }
        if (man.length == 0) { man = 0; }
        sig = man;
        //double();
    }
    else {
        document.getElementById("info").innerHTML = "Invalid Value";
        document.getElementById("input").innerHTM = orVal;
    }
    if (document.getElementById("info").innerHTML != "Invalid Value") {
        float();
    }

}

function randomFloat(bool) {
    if (type != "f" || bool) {
        unClick()
        document.getElementById("float").style.borderWidth = "5";
        document.getElementById("input").value = " ";
        document.getElementById("mantissa1").style.display = "block";

        value = 0;
        if (Math.random() < .7) {
            value = 1;
            bin = "0";
        }
        else {
            value = -1;
            bin = "1";
        }
        exp = Math.floor(Math.random() * Math.pow(2, 8));
        sig = Math.floor(Math.random() * Math.pow(2, 23));

        float();
    }
}

function binaryFloat() {
    exp = parseInt(bin.substring(1, 9), 2);
    sig = parseInt(bin.substring(9), 2);
    bin = bin.charAt(0);
    document.getElementById("input").value = " ";
    float();
}

function float(){
    document.getElementById("equ1").innerHTML = Math.pow(-1, bin.charAt(0).valueOf()) + " * ";

    value = Math.pow(-1, bin.charAt(0).valueOf()) + "." + sig;
    value = value.valueOf() * Math.pow(2, exp - 127);
    value = value + "";
    //if (value.indexOf("Inf") != -1) { double();}
    if (value.indexOf(".") == -1 && value.indexOf("f") == -1) {
        value = value + ".0";
    }

    var tb = ubBin(exp);
    for (var i = tb.length; i < 8; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;

    tb = ubBin(sig);
    for (var i = tb.length; i < 23; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;

    document.getElementById("sign1").innerHTML = bin.charAt(0);
    document.getElementById("sValue1").innerHTML = bin.charAt(0) + "<sub>10</sub>";
    document.getElementById("binSign1").innerHTML = bin.substring(0, 1);

    document.getElementById("equ1").innerHTML += Math.pow(2, (exp - 127)) + " * ";
    document.getElementById("exp1").innerHTML = (exp - 127);
    document.getElementById("eValue1").innerHTML = exp + "<sub>10</sub>";
    document.getElementById("binExp1").innerHTML = bin.substring(1, 9);

    document.getElementById("mValue1").innerHTML = sig + "<sub>10</sub>";
    document.getElementById("manE1").innerHTML = sig;
    document.getElementById("equ1").innerHTML += "1." + sig;
    document.getElementById("binMan1").innerHTML = bin.substring(9);

    document.getElementById("ans1").innerHTML = value;
    if (document.getElementById("input").value == " ") {
        document.getElementById("input").value = value;
    }
    document.getElementById('type').innerHTML = "Single Precision Floating Point Decimal";

    //special cases
    if (bin == "00000000000000000000000000000000") {
        document.getElementById("ans2").innerHTML = "0";
        value = "0";
        document.getElementById("equ2").innerHTML = "Special Case"
    }
    if (bin == "10000000000000000000000000000000") {
        document.getElementById("ans2").innerHTML = "-0";
        value = "-0";
        document.getElementById("equ2").innerHTML = "Special Case"
    }
    if (bin.substring(0, 9) == "011111111") {
        if (bin.substring(9) == "00000000000000000000000") {
            document.getElementById("ans2").innerHTML = "Infinity";
            value = "Infinity";
        }
        else {
            document.getElementById("ans2").innerHTML = "NaN";
            value = "NaN";
        }
        document.getElementById("equ2").innerHTML = "Special Case";
    }
    if (bin.substring(0, 9) == "111111111") {
        if (bin.substring(9) == "00000000000000000000000") {
            document.getElementById("ans2").innerHTML = "-Infinity";
            value = "-Infinity";
        }
        else {
            document.getElementById("ans1").innerHTML = "NaN";
            value = "NaN";
        }
        document.getElementById("equ1").innerHTML = "Special Case"
    }

    if (document.getElementById("input").value == " ") {
        document.getElementById("input").value = value;
    }

    type = "f";
    showBytes(4, bin);

}

function customDouble(d) {
    var orVal = document.getElementById("input").value;
    //document.getElementById("input").value = d;

    if (value.match("^(-|\\+)?([0123456789]*\.?[0123456789]+)((E|e)(-|\\+)?[0123456789]+)?$")) {
        d = parseFloat(d);
        if (d > Math.pow(2, 1024) * 1.9999999999999999) {
            d = "Infinity"
            //document.getElementById("info").innerHTML = "Value too large to represent";
        }
        if (d < -Math.pow(2, 1024) * 1.9999999999999999) {
            d = "-Infinity";
            //document.getElementById("info").innerHTML = "Value too small to represent";
        }
    }
    d = "" + d;
        if (d == "0" || d == "+0"){
            bin = "0";
            exp = 0;
            sig = 0;
        }
        else if (d == "-0") {
            bin = "1";
            exp = 0;
            sig = 0;
        }
        else if (d == "Infinity" || d == "infinity" || d == "Inf" || d == "inf" || d == "+Infinity" || d == "+infinity" || d == "+Inf" || d == "+inf") {
            bin = "0";
            exp = 2047;
            sig = 0;
        }
        else if (d == "-Infinity" || d == "-infinity" || d == "-Inf" || d == "-inf") {
            bin = "1";
            exp = 2047;
            sig = 0;
        }
        else if (value.match("^(-|\\+)?([0123456789]*\.?[0123456789]+)((E|e)(-|\\+)?[0123456789]+)?$")) {
            var sign;
            if (d >= 0) { bin = "0" }
            else { bin = "1" }
            d = Math.abs(d);
            exp = 0;
            var man = 0;
            for (exp = 0; exp < 2048; exp++) {
                man = d / Math.pow(2, exp - 1023);
                if (man >= 1 & man < 2) { break; }
            }
            man = ("" + man).substring(2);
            if (man.length > 16) { man = "" + Math.round((man.substring(0, 16) + "." + man.substring(16)).valueOf()); }
            if (man.valueOf() >= Math.pow(2, 52)) { man = "" + Math.round((man.substring(0, 15) + "." + man.substring(15)).valueOf()); }
            if (man.length == 0) { man = 0; }
            sig = man;
            //double();
        }
        else {
            document.getElementById("info").innerHTML = "Invalid Value";
            document.getElementById("input").innerHTM = orVal;
        }
        if (document.getElementById("info").innerHTML != "Invalid Value") {
            double();
        }
        
}

function randomDouble(bool) {
    if (type != "d" || bool) {
        unClick()
        document.getElementById("double").style.borderWidth = "5";
        document.getElementById("input").value = " ";
        document.getElementById("mantissa2").style.display = "block";

        value = 0;
        if (Math.random() < .7) {
            value = 1;
            bin = "0";
        }
        else {
            value = -1;
            bin = "1";
        }
        exp = Math.floor(Math.random() * Math.pow(2, 11));
        sig = Math.floor(Math.random() * Math.pow(2, 52));

        double();
    }
}
function binaryDouble() {
    exp = parseInt(bin.substring(1, 12), 2);
    sig = parseInt(bin.substring(12), 2);
    bin = bin.charAt(0);
    document.getElementById("input").value = " ";
    double();
}

function double() {

    document.getElementById("equ2").innerHTML = Math.pow(-1, bin.charAt(0).valueOf()) + " * ";

    value = Math.pow(-1,bin.charAt(0).valueOf()) + "." + sig;
    value = value.valueOf() * Math.pow(2, exp - 1023);
    value = value + "";
    //if (value.indexOf("Inf") != -1) { double();}
    if (value.indexOf(".") == -1 && value.indexOf("f") == -1) {
        value = value + ".0";
    }

    var tb = ubBin(exp);
    for (var i = tb.length; i < 11; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;

    tb = ubBin(sig);
    for (var i = tb.length; i < 52; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;

    document.getElementById("sign2").innerHTML = bin.charAt(0);
    document.getElementById("sValue2").innerHTML = bin.charAt(0) + "<sub>10</sub>";
    document.getElementById("binSign2").innerHTML = bin.substring(0,1);

    document.getElementById("equ2").innerHTML += Math.pow(2, (exp - 1023)) + " * ";
    document.getElementById("exp2").innerHTML = (exp - 1023);
    document.getElementById("eValue2").innerHTML = exp+"<sub>10</sub>";
    document.getElementById("binExp2").innerHTML = bin.substring(1, 12);

    document.getElementById("mValue2").innerHTML = sig + "<sub>10</sub>";
    document.getElementById("manE2").innerHTML = sig;
    document.getElementById("equ2").innerHTML += "1." + sig;
    document.getElementById("binMan2").innerHTML = bin.substring(12);

    document.getElementById("ans2").innerHTML = value;
    if(document.getElementById("input").value == " "){
        document.getElementById("input").value = value;
    }
    document.getElementById('type').innerHTML = "Double Precision Floating Point Decimal";

    //special cases
    if (bin == "0000000000000000000000000000000000000000000000000000000000000000") {
        document.getElementById("ans2").innerHTML = "0";
        value = "0";
        document.getElementById("equ2").innerHTML = "Special Case"
    }
    if (bin == "1000000000000000000000000000000000000000000000000000000000000000") {
        document.getElementById("ans2").innerHTML = "-0";
        value = "-0";
        document.getElementById("equ2").innerHTML = "Special Case"
    }
    if (bin.substring(0,12) == "011111111111") {
        if(bin.substring(12) == "0000000000000000000000000000000000000000000000000000"){
            document.getElementById("ans2").innerHTML = "Infinity";
            value = "Infinity";
        }
        else{
            document.getElementById("ans2").innerHTML = "NaN";
            value = "NaN";
        }
        document.getElementById("equ2").innerHTML = "Special Case";
    }
    if (bin.substring(0,12) == "111111111111") {
        if(bin.substring(12) == "0000000000000000000000000000000000000000000000000000"){
            document.getElementById("ans2").innerHTML = "-Infinity";
            value = "-Infinity";
        }
        else{
            document.getElementById("ans2").innerHTML = "NaN";
            value = "NaN";
        }
        document.getElementById("equ2").innerHTML = "Special Case"
    }

    if (document.getElementById("input").value == " ") {
        document.getElementById("input").value = value;
    }

    type = "d";
    showBytes(8, bin);
}

function unClick() {
    document.getElementById("info").innerHTML = "Input a custom value in the white box or click to toggle the green bits";

	document.getElementById("boolean").style.borderWidth = "2";
	document.getElementById("sb").style.borderWidth = "2";
	document.getElementById("ub").style.borderWidth = "2";
	document.getElementById("string").style.borderWidth = "2";
	document.getElementById("float").style.borderWidth = "2";
	document.getElementById("float").style.borderWidth = "2";
	document.getElementById("double").style.borderWidth = "2";
	
	document.getElementById("charcodes").style.display = "none";
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


function showBytes(b, str){

    //if (type == "f") { man1(str); }
    //if (type == "d") { man2(str) }
    
    var i = 0;
    //showHex(b, str);

    //hide all bytes
    for (i = 0; i < 8; i++){
        document.getElementById("byte" + i).style.display = "none";
        //document.getElementById("byte" + i).style.float = "right";

        document.getElementById("charcode" + i).style.display = "none";
    }
    document.getElementById("bytebool").style.display = "none";
    //document.getElementById("bytebool").style.float = "right";

    if (type == "boolean") {
        document.getElementById("bytebool").style.display = "table-cell";
        //document.getElementById("bytebool").style.float = "left";
        document.getElementById("bitbool").innerHTML = str;
    }
    else {
        //shows b bytes
        for (i = 0; i < b; i++) {
            document.getElementById("byte" + i).style.display = "table-cell";
            //document.getElementById("byte" + i).style.float = "left";
            if (type == "string") {
                document.getElementById("charcode" + ((b-1)-i)).style.display = "table-cell";
                document.getElementById("charcode" + ((b-1)-i)).innerHTML = parseInt(str.substring(i * 8, i * 8 + 8), 2)+"<sub>10</sub>";
            }
        }
        //fills in bits for b bytes
        for (i = 0; i < b * 8; i++) {
            if (i < str.length) {
                document.getElementById("bit" + Math.floor(i / 8) + "" + (i % 8)).innerHTML = str.charAt(str.length - i - 1);
            }
            else {
                document.getElementById("bit" + Math.floor(i / 8) + i % 8).innerHTML = "0";
            }
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

function toggle(bit) {
    if (bit == -1) {
        bin = ""+Math.abs(bin.charAt(0).valueOf() - 1)
        binaryBoolean();
    }
    else {
        bit = (bin.length - 1) - bit;
        //console.log(bin.length);
        bin = bin.substr(0, bit) + Math.abs(bin.charAt(bit).valueOf() - 1) + bin.substring(bit + 1);
        //console.log(bin.substr(0, bit).length);
        //console.log(type);
        if (type == "d") {
            binaryDouble();
        }
        else if (type == "f") {
            binaryFloat();
        }
        else if (type == "ub") {
            binaryUnsignedByte();
        }
        else if (type == "sb") {
            binarySignedByte();
        }
        else if (type == "string") {
            binaryString();
        }
    }
}