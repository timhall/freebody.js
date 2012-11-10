// Javascript syntax sample

// One-line comment

/*
Multi-line
Comment
*/

// Variable
var word = 'Hi!';

// Multiple variables (note the comma between intermediate values with a semi-colon at the end)
var a = 'A', b = 'B',
    c = 'C', d; // (Don't necessarily have to be initialized)
	
// Array
var group = ['A', 'B', 'C'];

group[0] // = 'A' zero-based indices always
group[3] // = undefined / error

// Object
var lamp = {
	technology: 'Fluorescent',
	type: 'T8',
	subType: 'Linear',
	length: 4,
	qualifications: ['CEE']
};

// Example function
var incentive = function (fixture) {
	var rebateRate = 0.25, // $0.25 / Watt
		rebate = {}, isEligible;
	
	// Conditions:
	// == equals
	// != not equals
	// >, >=, <, <=
	if (fixture.lamp.type == 'T8') {
		isEligible = true;
	} else if (fixture.lamp.type != 'T12') {
		// Note the space between else and if as opposed to VBA's elseif
		isEligible = true;
	}
	
	if (isEligible) {
		// Note that you don't need to define a property on an object before assigning to it,
		//	but the variable does need to be an object, hence rebate = {} at the top of the function
		rebate.incentive = fixture.totalWattage * rebateRate;
		rebate.notes = 'Standard rebate';
	} else {
		rebate.incentive = 0;
		rebate.notes = 'Ineligible fixture';
	}
	
	// Return is the way to get something out of a function
	return rebate;
};

// Finally, call the function and store the result in totalIncentive
var fixture = { /*...*/ },
	totalIncentive = incentive(fixture);
/* Syntax notes:

Curlies start on the same line as the function / if statement

All variables and function names are camelcase
(Lowercase first word, uppercase remaining)
e.g. firstSecondThird or incentiveCalcFunction

Strings are surrounded by single quotes ('string')

Always use parenthesis for if statements and functions
if ( logic... ) {
function (a, b, c) {

Always use var to define variables
*/