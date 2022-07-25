/*****************************ISC License (ISC)********************************
*Copyright 2022 OmniIndex Inc.                                                * 
*                                                                             *
*Permission to use, copy, modify, and/or distribute this software for any     *
*purpose with or without fee is hereby granted, provided that the above       * 
*copyright notice and this permission notice appear in all copies.            *
*                                                                             *      
*THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH* 
*REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY  *
*AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, *
*INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM  *
*LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE   *
*OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR    * 
*PERFORMANCE OF THIS SOFTWARE.                                                *
*****************************LICENSE END**************************************/

/************************NAMING CONVENTIONS************************************
 * @author Simon i Bain                                                       *
 * Email sibain@omniindex.io                                                  *
 * Date: July 2022                                                            *
 * Project: OmniIndex Blockchain.                          *
 * @file index.js                                                             *
 * @version 1.0                                                               *
 * This file holds the OmniIndex Blockchain NodeJS module                     *
 *                                                                            *
 * Naming Conventions                                                         *
 * Global Variables: PascalCase - ThisGlobal                                  *
 * Constants: UPPERCASE - THISCONSTANT                                        *
 * Local Variables: - CamelCase thisLocal                                     *
 * Operators: - Space around - this = this + that;                            *
 * Statement End: Colon let thisArray = [];                                   *
 * Line End: Colon let this = myFunction();                                   *
 * Function names: CamelCase - function thisIsMyFunction(){}                  *
 * Quotations:                                                                *
 * HTML Output: Attributes Single Quote (')                                   *
 * Text items: Double Quote (")                                               *
 * Back ticks: (`) These are used where we pull variables in to a string so   *
 * that we can pass the attribute quotes without too much confusion           *
 * Readability: We try to make the code readable which sometimes means        *
 * compromising on consicness. In places you will see                         *
 * a long hand loop instead of a more simple lambda loop (Arrow one). as      *
 * an example.                                                                *
 ************************************END**************************************/

//Requirements
const https = require('https');

//This is used to output data to the console. Should always be false unless debug/test
var Debug = false;

function setDebug(bool) {
    Debug = bool;
    if ( bool ) {
        console.log ( "Debug output is on" );
    }
}

/** Used for waiting timers  */
const MAXSLEEP = 100000;
/**
 * A simple method which waits for the alloted milli seconds before it proceeds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var SdkServer = undefined;

function setSdkServer(url) {
    SdkServer = url;
}

function getSdkServer(url) {
    return SdkServer;
}

/** This function is asynchronous in nature and makes a call to the OmniIndex 
 * SDK. The JSON string must be JSON compliant and have the following data
"user" : "sibain@omniindex.io",
"password" : "<password>",
"key" : "<Key>",
"unitName" : "<Unit>",
"server" : "<A seeded node server>",
"fieldname" : "data",
*If the data is to be encrypted and searchable it must be
"fielnameEncrypted" : "data"
*Date fields must be ended with the text 'date' and should not have the text 'Encrypted'
"testdate" : "10/07/2022 12:44:00"
 * @param json
 * @return response string
 */
async function mineData(json) {
    let responseText = undefined;
    try {
        responseText = await callBlockchain(json, "minedata");
    } catch ( err ) {
        responseText = "{ \"Success\" : \"Fail\", \"Message\" : \"" + err + "\" }";
    }
    return responseText;
}

/** This function is asynchronous in nature and makes a call to the OmniIndex 
 * SDK. It will not return a promise but a string holding the SDK response 
 * JSON.
 * jsonExample:
 * {
    "unitName": "<unit>",
    "type": "Owner/Global",
    "server": "<A Seeded Node Server>",
    EITHER
    "user": "<username>",
    "password": "<password>",
    OR
    "key" : "<key>",
    "analyticQuery": "SELECT * FROM    WHERE X = y OR x LIKE {'%plain text%'}"
 * }
 * @param json
 * @return response string
 */
 async function runanalyticquery(json) {
    let responseText = undefined;
    try {
        responseText = await callBlockchain(json, "runanalyticquery");
    } catch ( err ) {
        responseText = "{ \"Success\" : \"Fail\", \"Message\" : \"" + err + "\" }";
    }
    return responseText;
}

async function callBlockchain(json, method) {
    var jRequest = "";
    try {
        jRequest = json;// JSON.stringify(json);
    } catch ( err ) {
        return "{ \"Success\" : \"Fail\", \"Message\" : \"" + err + "\" }";
    }
    if ( Debug ) {
        console.log ( json );
    }
    let completed = false;
    var responseData = "";
    callback = function(response) {
        var str = '';  
        //another chunk of data has been received, so append
        response.on('data', function (chunk) {
            responseData += chunk;
        });
      
        //the whole response has been received, so we just print it out here
        response.on('end', function () {
          completed = true;
        });
      }   

    const options = {
        hostname: SdkServer,
        path: "/" + method,
        protocol: "https:",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'OmniIndex NodeJS Module',
          'Host': SdkServer,
          'Accept': 'application/json',
          'Connection': 'keep-alive',
          'Content-Length': jRequest.length         
        },
      };
      var req = https.request(options, callback);
      
      req.write(jRequest);
      req.end();
      var wait = 1000;
      while ( completed == false ) {
          if ( wait >= MAXSLEEP ) {
              responseData = "{ \"Success\" : \"Fail\", \"Message\" : \"Timeout: The Server cannot be reached.\" }";
              break;
          } else {
              wait = wait + 1000;
              await sleep(1000);
          }
      }
      if ( Debug ) {
          console.log(responseData);
      }     
      return responseData;        
}

module.exports = { setDebug, setSdkServer, getSdkServer, mineData, runanalyticquery };