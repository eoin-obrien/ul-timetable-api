// Type definitions for title-capitalize 0.0.1
// Project: title-capitalization
// Definitions by: Eoin O'Brien <https://videtur.io>

/*~ Note that ES6 modules cannot directly export callable functions.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ This example shows how to have multiple overloads for your function */
export = capitalize;
declare function capitalize(title: string): string;
