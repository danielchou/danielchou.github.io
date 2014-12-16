/* Like .net GUID() */
function newGuid() {
	var guid = "";
	for (var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	return guid;
}

function newUniqueID(iLength, UserName) {
	var id = "";
	for (var i = 1; i <= iLength; i++) {
		id += Math.floor(Math.random() * 32.0).toString(32);
	}
	return id;
}

/* UniqueSessionKey with Global variables. ------------------- */
var USKey;
var BookingUser = "";
function GetUniqueSessionID(key) 
{
	/* var key = newUniqueID(9); */
	if (window.localStorage.getItem("USKey") == undefined) {
		window.localStorage["USKey"] = key;
	} else {
		if (window.localStorage["USKey"] === null) window.localStorage["USKey"] = key;
	}
	USKey = window.localStorage["USKey"];
}
/*-----------------------------*/

/*	可在Javascript中使用如同C#中的string.format
	ex : var fullName = String.format('Hello. My name is {0} {1}.', 'FirstName', 'LastName'); */
String.format = function () {
	var s = arguments[0];
	if (s == null) return "";
	for (var i = 0; i < arguments.length - 1; i++) {
		var reg = getStringFormatPlaceHolderRegEx(i);
		s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
	}
	return cleanStringFormatResult(s);
}

/*	可在Javascript中使用如同C#中的 String.Format (對jQuery String的擴充方法)
	usage : var fullName = 'Hello. My name is {0} {1}.'.format('FirstName', 'LastName'); */
String.prototype.format = function () {
	var txt = this.toString();
	for (var i = 0; i < arguments.length; i++) {
		var exp = getStringFormatPlaceHolderRegEx(i);
		txt = txt.replace(exp, (arguments[i] == null ? "" : arguments[i]));
	}
	return cleanStringFormatResult(txt);
}

//讓輸入的字串可以包含{}
function getStringFormatPlaceHolderRegEx(placeHolderIndex) {
	return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
}

/*允許format格式有多餘的position時，就不會將多餘的position輸出
ex: var fullName = 'Hello. My name is {0} {1} {2}.'.format('fristName', 'lastName');
	輸出的 fullName 為 'fristName lastName', 而不會是 'fristName lastName {2}' */
function cleanStringFormatResult(txt) {
	if (txt == null) return "";
	return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
}


