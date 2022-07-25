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
 * @file omniindextest.js                                                             *
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

var omniindex = require ('omniindex');


function setDebug() {
    omniindex.setDebug(true);
}
setDebug();


function setSdkServer() {
    omniindex.setSdkServer("sdk.omniindex.xyz")
}
setSdkServer();

function getSdkServer() {
    console.log(omniindex.getSdkServer());
}
getSdkServer();

async function runanalyticquery() { 
    let json = `{
    "unitName": "HIH Patient Portal",
    "type": "Owner",
    "server": "supply-node1.omniindex.xyz:8080",
    "user": "iamnotauser",
    "password": "thisisnotapassword",
    "analyticQuery": "SELECT * FROM    "
    }`;
    console.log (await omniindex.runanalyticquery(json));
}
runanalyticquery();
