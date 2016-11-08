//Jonathan White 2016
//v 1.32
var value = "";
var bin = "";
var type = "";
var sig = "";
var exp = "";
var mode = "explore";
var cBin = "";

function desc() {
    if (type == "ub") {
        document.getElementById("desc").innerHTML = "An <b>Unsigned Byte Integer</b> stores a whole number in the range <b>0 to 255</b>. The whole number is converted from base 10 to base 2 to be stored in binary. If one tries to store a number larger than 255, it will still be converted to base 2, but only the first eight digits are saved. For example 257 in binary is 100000001, but only 00000001 is saved, and the value stored would be 1, not 257.";
    }
    else if (type == "sb") {
        document.getElementById("desc").innerHTML = "A <b>Signed Byte Integer</b> stores a whole number in the range <b>-128 to 127</b>. The number is stored similarly to an unsigned byte, where each bit represents a power of 2. However unlike an Unsigned Byte, the left-most bit, called the <b>most significant bit (msb)</b> is signed. This means that it represents a negative number instead of a positive number. In the case of one byte, the <b>msb</b> represents -128 instead of +128. For example 11111111 is equal to (-128 + 64 + 32 + 16 + 8 + 4 + 2 + 1), which is -1.";
    }
    else if (type == "boolean") {
        document.getElementById("desc").innerHTML = "A <b>Boolean</b> is a very simple data type that only needs one bit. A boolean has only two states: <b>true or false</b>. Booleans typically show up when evaluating conditional statements. 'Does something equal something else?' only has two answers, yes or no, and would be could with a boolean.";
    }
    else if (type == "f") {
        document.getElementById("desc").innerHTML = "A <b>Single Precision Floating Point Number</b>, usaully called a float spans 4 bytes. Unlike an integer, a float does not have to be a whole number, it can have decimal places. Floats can store a very wide range of values because the decimal can move, or float, depending on how large the number is. This is because the number is also not just converted to base 2, but instead is represented by an expression that is equivilant (or atleast very close) to the number. The equation consists of three parts: the <b>sign</b>, the <b>exponent</b>, and the <b>mantissa</b>.<li>The sign only consists of one bit, it it is 0, the number is positive, if it is 1 the number is negative. Mathematically this is represented as (-1)<sup>sign</sub>.</li><li>The exponent takes up the next 8 bits, and is stored as an unsigned integer. When calculating the number, 127 is subtracted from the value of the exponent, and two then is raised to that power. This is what gives floating point numbers the abillity to store very large, or very small numbers.</li><li>The mantissa consists of the remaining 23 bits. It is also stored as an unsigned integer. The mantissa is then converted to a value between 1 and 2 by concatenated '1.' in front of the integer value. Foe example a value of 524 stoed in the mantissa would become 1.524.</li>Each of the three parts are then multiplied together as shown in the equation:<br>(-1)<sup>Sign</sup> * 2<sup>(Exponent-127)</sup> * 1.Mantissa<br>The value of that equation is the value of the float. However, there are a few special cases. If all the bits of the exponent and mantissa are 0, the value of the float will also be 0, and not 2<sup>-127</sup>. If every bit of the exponent is 1, and the entire mantissa is 0, the float represents infinity, or negative infinity if the sign is 1. If the exponent is all 1's and the mantissa is anything but 0, the float with have a value of NaN, which represents an invalid number.";
    }
    else if (type == "d") {
        document.getElementById("desc").innerHTML = "A <b>Double Precision Floating Point Number</b> usually called a double takes up 8 bytes. It is stored just like a <b> single precision floating point</b>, except it consists of <i>double</i> the amount of bytes, hence the name. The sign still only consists of 1 bit, but the exponents noew spans 11 bits, and 1023 is subtracted from its integer value. The mantissa spans a whopping 52 bits, but otherwise behaves just the same as in a float. The equation for a double is:<br>(-1)<sup>Sign</sup> * 2<sup>(Exponent-1023)</sup> * 1.Mantissa<br>The only difference is how the exponent is calculated and the size the mantissa can reach. This allows a double to cover a much wider range of values than a float, and be precise to more decimal places. The same special cases still apply.";
    }
    else if (type == "string") {
        document.getElementById("desc").innerHTML = "A <b>String</b>, also called a literal, is a <b>sequence of characters</b>. Depending on the encoding each character can be represented as either one or two bytes. In this case each character is one byte. Each character has a corresponding number that depends on the encoding. These characters follow the <b><a href='http://ascii.cl/htmlcodes.htm' target='_blank'>HTML Codes</a></b>. This number is then coverted to binary and stored as an <b>Unsigned Byte</b>." ;
    }
}

function explore() {
        //mode = "explore";
        document.getElementById("explore").style.display = "initial";
        document.getElementById("test").style.display = "initial";
        document.getElementById("explore").style.border = "solid 4px";
        document.getElementById("test").style.border = "solid 2px";
        document.getElementById("info").innerHTML = "Input a custom value in the white box or click to toggle the green bits";

        if (mode == "test") {
            mode = "explore";
            document.getElementById("b1").style.display = "initial";
            document.getElementById("b2").style.display = "initial";
            document.getElementById("b3").style.display = "none";
            document.getElementById("b4").style.display = "none";
            document.getElementById("input").readOnly = false;
            document.getElementById("feedback").innerHTML = "";
            document.getElementById("feedback").style.display = "none";
            document.getElementById("bytesA").style.display = "none";
            document.getElementById("desc").style.display = "block";

            if (type == "ub") {
                randomUnsignedByte(true);
            }
            else if (type == "sb") {
                randomSignedByte(true);
            }
            else if (type == "string") {
                document.getElementById("charcodes").style.display = "table-row";
                randomString(true);
            }
        }
}

function test(){
    document.getElementById("explore").style.display = "initial";
    document.getElementById("test").style.display = "initial";
    document.getElementById("explore").style.border = "solid 2px";
    document.getElementById("test").style.border = "solid 4px";
    document.getElementById("info").innerHTML = "Convert the value to binary on the byte(s) below. Click the bits to toggle their value.";

    if (mode == "explore") {
        mode = "test";
        document.getElementById("b1").style.display = "none";
        document.getElementById("b2").style.display = "none";
        document.getElementById("b3").style.display = "initial";
        document.getElementById("b4").style.display = "initial";
        document.getElementById("input").readOnly = true;
        document.getElementById("feedback").innerHTML = "";
        document.getElementById("feedback").style.display = "initial";
        document.getElementById("bytesA").style.display = "none";
        document.getElementById("desc").style.display = "none";
        document.getElementById("b3").disabled = false;

        if (type == "ub") {
            var valuet = value;
            while (valuet == value) {
                randomUnsignedByte(true);
            }
            cBin = bin;
            bin = "00000000"
            showBytes(1, bin);
        }
        else if (type == "sb") {
            var valuet = value;
            while (valuet == value) {
                randomSignedByte(true);
            }
            cBin = bin;
            bin = "00000000"
            showBytes(1, bin);
        }
        else if (type == "string") {
            document.getElementById("charcodes").style.display = "none";
            var valuet = value;
            while (valuet == value) {
                randomString(true);
            }
            cBin = bin;
            bin = bin.replace(/1/g, "0");
            showBytes(bin.length / 8, bin);
        }
    }
}

function newTest() {
    mode = "explore";
    test();
}

function check() {
    document.getElementById("b3").disabled = true;

    if (bin == cBin) {
        //console.log("Correct!");
        document.getElementById("feedback").innerHTML = "You are correct!";
    }
    else {
        //console.log("Wrong.");
        document.getElementById("feedback").innerHTML = "Not quite. The correct answer was:"
        document.getElementById("bytesA").style.display = "block";
        document.getElementById("charcodesA").style.display = "none";

        for (i = 0; i < 8; i++) {
            document.getElementById("byte" + i + "A").style.display = "none";
        }
        for (i = 0; i < Math.floor(cBin.length/8); i++) {
            document.getElementById("byte" + i + "A").style.display = "table-cell";
        }

        for (i = 0; i < cBin.length; i++) {
            document.getElementById("bit"+Math.floor(i/8)+"" + (i%8) + "A").innerHTML = cBin.charAt(cBin.length - 1 - i);
        }
        
        if (type == "string") {
            document.getElementById("charcodesA").style.display = "table-row";
            for (i = 0; i < 8; i++) {
                document.getElementById("charcode" + i + "A").style.display = "none";
            }
            for (i = 0; i < Math.floor(cBin.length / 8) ; i++) {
                document.getElementById("charcode" + i + "A").style.display = "table-cell";
                document.getElementById("charcode" + i + "A").innerHTML = parseInt(cBin.substring(((cBin.length / 8)-1 - i) * 8, ((cBin.length / 8)-1 - i) * 8 + 8), 2) + "<sub>10</sub>";
            }

        }

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
        if (type != "sb") {
            type = "sb";
            unClick()
            document.getElementById("sb").style.borderWidth = "5";
            desc();
            explore();
        }

        value = "" + Math.floor(Math.random() * 256)-128;
        bin = ubBin((value.valueOf() + 256) % 256);
        for (i = bin.length; i < 8; i++) {
            bin = "0" + bin;
        }
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
        if (type != "ub") {
            type = "ub";
            unClick()
            document.getElementById("ub").style.borderWidth = "5";
            desc();
            explore();
        }

        value = "" + Math.floor(Math.random() * 256);
        bin = ubBin(value.valueOf());
        for (i = bin.length; i < 8; i++) {
            bin = "0" + bin;
        }
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
        if (type != "string") {
            type = "string";
            unClick()
            document.getElementById("string").style.borderWidth = "5";
            document.getElementById("charcodes").style.display = "table-row";
            desc();
            explore();
        }
        if (mode == "explore")
            var strings = ["ABcd", "abc123", "ABcdEFgh", "12345678", "Hello", "1234", "abcd", "Cat", "Dog", "Feighny", "Words", "ABC123", "Hot Dog", "Binary", "Base 2", "Pizza", "8 Bit", "String"];
        else
            var strings = ["Hello", "Cat", "Dog", "Feighny", "Words", "Hot Dog", "Binary", "Base 2", "Pizza", "8 Bit", "String", "Zero", "3.14", "1000", "Hotel"];

        value = strings[Math.floor(Math.random() * strings.length)];
        bin = sBin(value);
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
            bin = "00000001";
            value = "True";
        }
        else {
            bin = "00000000";
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
        type = "boolean";
        unClick();
        document.getElementById("boolean").style.borderWidth = "5";
        document.getElementById("input").value = " ";
        desc();

        if (Math.random() < 0.5) {
            bin = "00000000";
        }
        else {
            bin = "00000001";
        }
        boolean();
    }
}

function binaryBoolean(){
    boolean();
}

function boolean() {
    if (bin == "00000000") {
        document.getElementById("input").value = "False";
    }
    else if(bin == "00000001") {
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
        type = "f";
        unClick()
        document.getElementById("float").style.borderWidth = "5";
        document.getElementById("input").value = " ";
        document.getElementById("mantissa1").style.display = "block";
        desc();

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
        type = "d";
        unClick()
        document.getElementById("double").style.borderWidth = "5";
        document.getElementById("input").value = " ";
        document.getElementById("mantissa2").style.display = "block";
        desc();

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

	document.getElementById("explore").style.display = "none";
	document.getElementById("test").style.display = "none";
	document.getElementById("b1").style.display = "initial";
	document.getElementById("b2").style.display = "initial";
	document.getElementById("b3").style.display = "none";
	document.getElementById("b4").style.display = "none";

	document.getElementById("feedback").innerHTML = "";
	document.getElementById("feedback").style.display = "none";
	document.getElementById("desc").style.display = "block";
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
    //document.getElementById("bytebool").style.display = "none";
    //document.getElementById("bytebool").style.float = "right";

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
        if (mode == "explore") {
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
		else if (type == "boolean") {
			binaryBoolean();
		}
        }
        else if (mode == "test") {
            showBytes(bin.length/8,bin);
        }

    }
}
