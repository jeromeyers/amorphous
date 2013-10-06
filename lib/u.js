// "u" is a utilitarian reference to "Util" and is just a collection of utility functions
// that usually end up migrating elsewhere as that place becomes clear

var u = {
    emptyGuid: "00000000-0000-0000-0000-000000000000",
    newGuid: function(callback) {
        $.ajax({
            type: "GET",
            url: "content/Api.svc/guid/new",
            success: function(response) {
                if (u.isGuid(response)) {
                    callback(response);
                }
                else {
                    throw Error("u.newGuid(callback) failed to get a valid GUID from the server");
                }
            }
        });
    },
    getRandomNumber: function(max) {
        return Math.floor((Math.random() * max));
    },

    isValidId: function(valueToTest) {
        if (valueToTest) {
            if (u.isGuid(valueToTest)) {
                return valueToTest !== u.emptyGuid;
            }
        }
        return false;
    },
    isObj: function(test) {
        if (!test) return false;
        return test.toString() === '[object Object]';
    },
    isNumber: function(valueToTest) {
        return !isNaN(parseFloat(valueToTest)) && isFinite(valueToTest);
    },
    isUrl: function(valueToTest) {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(valueToTest);
    },
    isGuid: function(valueToTest) {
        return /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?$/.test(valueToTest);
    },
    isEmptyGuid: function(valueToTest) {
        return valueToTest === "00000000-0000-0000-0000-000000000000";
    },
    isInArray: function(item, array) {
        return $.inArray(item, array) > -1;
    },
    existy: function(testing) {
        return testing != null;
    },
    truthy: function(testing) {
        return (testing !== false) && u.existy(testing);
    },

    // Timed
    spaceOutSoManyRuns: function(interval, timesToRun, mainFunction, finalFunction) {
        (function myLoop(i) {
            setTimeout(function() {
                mainFunction(i);
                if (--i) myLoop(i);
                else if (finalFunction) finalFunction();
            }, interval);
        })(timesToRun);
    },

    // Url
    getQueryStringValue: function(queryStringKey, optionalQueryStringToSearch) {
        var queryString = optionalQueryStringToSearch || window.location.search.substring(1);
        var queryStringPairs = queryString.split("&");
        for (var i = 0, max = queryStringPairs.length; i < max; i++) {
            var loopPair = queryStringPairs[i].split("=");
            if (loopPair[0] == queryStringKey) {
                return unescape(loopPair[1]);
            }
        }
        return null;
    },
    knurl: function(queryStringObj, optionalBaseUrl) {
        var result = (optionalBaseUrl || u.baseUrl);
        var count = 0;
        for (var queryKey in queryStringObj) if (queryStringObj.hasOwnProperty(queryKey)) {
            result += (count === 0 && result.indexOf('?') === -1 ? '?' : '&'); // Sometimes we have a base url that already has static query string values
            result += (queryKey + '=' + queryStringObj[queryKey]);
            count++;
        }
        return result;
    },


    // String
    naturallyFormatString: function(stringToFormat) {
        if (stringToFormat.indexOf("_") > 0) {
            return this.naturallyFormatUnderscoreString(stringToFormat);
        }
        else {
            return this.naturallyFormatCamelString(stringToFormat);
        }
    },
    underscoreFormatNaturallyFormattedString: function(stringToFormat) {
        var result = '';
        var split = stringToFormat.split(" ");
        for (var i = 0, max = split.length; i < max; i++) {
            result += ((i === 0 ? '' : '_') + split[i]);
        }
        return result;
    },
    underscoreFormatCamelString: function(stringToFormat) {
        return this.underscoreFormatNaturallyFormattedString(this.naturallyFormatCamelString(stringToFormat));
    },
    replaceBackslashesWithDashes: function(stringToFormat) {
        return stringToFormat ? stringToFormat.replace(/\\/g, "-") : '';
    },
    naturallyFormatUnderscoreString: function(stringToFormat) {
        // Converts "this_named_thing" into "This Named Thing"
        var result = '';
        if (stringToFormat) {
            var split = stringToFormat.split("_");
            for (var i = 0, max = split.length; i < max; i++) {
                if (i !== 0) result += " ";
                result += split[i].charAt(0).toUpperCase() + split[i].slice(1).toLowerCase();
            }
        }
        return result;
    },
    naturallyFormatCamelString: function(stringToFormat) {
        // Converts "thisNamedThing" or "ThisNamedThing" to "This Named Thing";
        var result = '';
        if (stringToFormat) {
            // If we have an acronym, then presumably it will be all uppercase and we don't want to put spaces between the letters
            // So, check to see if the number of uppercase letters equals the total number of letters
            if (stringToFormat.length === u.getCountOfUppercaseLetters(stringToFormat)) {
                result = stringToFormat;
            }
            else {
                for (var i = 0, max = stringToFormat.length; i < max; i++) {
                    if (stringToFormat.charAt(i) === stringToFormat.charAt(i).toUpperCase() || i === 0) {
                        // There is a capital letter here, thus the start of a new word
                        if (i !== 0) result += " ";
                        result += stringToFormat.charAt(i).toUpperCase();
                    }
                    else {
                        result += stringToFormat.charAt(i).toLowerCase();
                    }
                }
            }
        }
        return result;
    },
    getCountOfUppercaseLetters: function(stringToCount) {
        var result = 0;
        if (typeof stringToCount === 'string') {
            for (var i = 0, max = stringToCount.length; i < max; i++) {
                if (stringToCount.charAt(i) === stringToCount.charAt(i).toUpperCase()) {
                    result++;
                }
            }
        }
        return result;
    },
    escapeBackslashes: function(stringToFormat) {
        return stringToFormat.replace(/\\\\/g, '\\').replace(/\\/g, '\\\\');
    },
    camelCaseToDashes: function(stringToFormat) {
        if (stringToFormat) {
            u.naturallyFormatCamelString(stringToFormat).replace(" ", "-").toLowerCase();
        }
        else {
            return '';
        }
    },
    lowercaseFirstLetter: function(stringToFormat) {
        if (stringToFormat) {
            return stringToFormat.charAt(0).toLowerCase() + stringToFormat.slice(1);
        }
        return '';
    },
    truncateString: function(stringToTruncate, length, includeEllipses) {
        if (typeof stringToTruncate === 'string' && stringToTruncate.length > length) {
            if (!includeEllipses) {
                return stringToTruncate.substring(0, length);
            }
            else {
                return stringToTruncate.substring(0, length) + '...';
            }
        }
        return stringToTruncate;
    },
    boolToYesNo: function(boolValue) {
        return boolValue ? 'Yes' : 'No';
    },

    // Array
    objectToArray: function(obj) {
        var result = [];
        if (obj) {
            for (var key in obj) if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }
        return result;
    },
    getNextIndex: function(valuesArray, currentValue) {
        var result = -1;
        var cur = valuesArray.indexOf(currentValue);
        if (cur === valuesArray.length - 1) {
            result  = 0;
        }
        else {
            result = cur + 1;
        }
        return result;
    },
    cycleThroughArray: function(valuesArray, currentValue) {
        return valuesArray[u.getNextIndex(valuesArray, currentValue)];
    },
    addElementOrRange: function(baseArray, toAdd) {
        var operateOn = [];
        if ($.isArray(baseArray)) {
            operateOn = baseArray;
        }
        if ($.isArray(toAdd)) {
            operateOn = operateOn.concat(toAdd);
        }
        else {
            operateOn.push(toAdd);
        }
        return operateOn;
    },

    // Html
    j: function(tag, id, content, className, style) {  // Modified CodeMirror's "elt()" function
        var j = $('<{0}></{0}'.format(tag));
        if (id) j.attr('id', id);
        if (className) j.addClass(className);
        if (style) j.css(style);
        if (content && content['jQuery']) j.append(content);
        if (typeof content == "string") j.text(content);
        else if (content) for (var i = 0; i < content.length; ++i) j.append(content[i]);
        return j;
    },

    // Errors
    get: function(url, success) {
        $.ajax({
            url: url,
            type: 'GET',
            success: success,
            error: u.errorHandler(url)
        });
    },
    post: function(url, data, success) {
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: success,
            error: u.errorHandler(url, data)
        });
    },
    errorHandler: function(callName, data) {
        return function(error) {
            console.log('error with: ' + callName);
            if (data) {
                console.log('error data: ', data);
            }
            console.log(error);
        }
    },

    // Cookies
    setCookie: function(cookieName, value, daysTillExpires) {
        var expires = '';
        if (daysTillExpires) {
            var date = new Date();
            date.setTime(date.getTime() + (daysTillExpires * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = cookieName + "=" + value + expires + "; path=/";
    },
    getCookie: function(cookieName) {
        var cookieNameWithEqual = cookieName + "=";
        var allCookies = document.cookie.split(';');
        for (var i = 0; i < allCookies.length; i++) {
            var cookie = allCookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }

            if (cookie.indexOf(cookieNameWithEqual) === 0) {
                return cookie.substring(cookieNameWithEqual.length, cookie.length);
            }
        }

        return null;
    },
    deleteCookie: function(cookieName) {
        u.setCookie(cookieName, '', -1);
    }
}
