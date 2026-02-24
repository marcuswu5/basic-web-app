export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "marcusw";
  }

  if (query.toLowerCase().includes("andrew id")) {
	return ("marcusw");
  }

  if (query.toLowerCase().includes("what is")) {
    // Parse expressions like "what is 5 plus 3 multiplied by 2 minus 4"
    // Supports: plus, minus, multiplied by, power, divided by
    const operators = {
      "plus": "+",
      "minus": "-",
      "multiplied by": "*",
      "times": "*",
      "power": "**",
      "divided by": "/"
    };

    // Remove "what is" prefix and trim.
    const exprContent = query.replace(/^what is\s*/i, '').replace(/\?$/, '').trim();

    // Tokenize: match negative and positive numbers, and multi-word operators.
    const tokenPattern = /(-?\d+)|(multiplied by|divided by|power|plus|minus|times)/gi;
    const tokens: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = tokenPattern.exec(exprContent)) !== null) {
      tokens.push(m[0].toLowerCase());
    }

    if (tokens.length === 0) {
      return "I cannot parse that expression.";
    }
    
    // Convert tokens to an evaluatable string.
    let evalExpr = "";
    for (let i = 0; i < tokens.length; i++) {
      let t = tokens[i];
      if (operators[t]) {
        evalExpr += ` ${operators[t]} `;
      } else if (!isNaN(Number(t))) {
        evalExpr += t;
      } else {
        return "I cannot parse that expression.";
      }
    }

    // Evaluate expression safely
    try {
      // eslint-disable-next-line no-eval
      // Math.pow only for "**" support in older JS, otherwise eval suffices for simple expr
      // but since we're just handling numbers and the allowed operators, eval is acceptable here
      // For extra safety, can replace "**" with Math.pow
      const result = Function('"use strict";return (' + evalExpr + ')')();
      return result.toString();
    } catch (e) {
      return "Error evaluating expression.";
    }
  }

  if (query.toLowerCase().includes("largest")) {
	  let nums = query.indexOf(":");
	  let s = query.slice(nums + 1);
	  let numbers: number[] = [];
	  for (let i = 0; i < 3; i++) {
		  let j = query.indexOf(",");
		  let a = s.substring(0,j);
		  numbers.push(parseInt(a, 10));
		  s = s.slice(j);
	  }
	  return numbers.reduce((a, b) => Math.max(a, b), -Infinity).toString();
  }

  if (query.toLowerCase().includes("plus")) {
    // Match format: "num plus num" (e.g., "5 plus 7")
    const match = query.match(/(-?\d+)\s*plus\s*(-?\d+)/i);
    if (match) {
      const n1 = parseInt(match[1], 10);
      const n2 = parseInt(match[2], 10);
      return (n1 + n2).toString();
    }
  }

  if (query.toLowerCase().includes("minus")) {
    // Match format: "num minus num" (e.g., "10 minus 4")
    const match = query.match(/(-?\d+)\s*minus\s*(-?\d+)/i);
    if (match) {
      const n1 = parseInt(match[1], 10);
      const n2 = parseInt(match[2], 10);
      return (n1 - n2).toString();
    }
  }

  if (query.toLowerCase().includes("multiplied")) {
    // Match format: "num multiplied by num" (e.g., "8 multiplied by 2")
    const match = query.match(/(-?\d+)\s*multiplied\s*by\s*(-?\d+)/i);
    if (match) {
      const n1 = parseInt(match[1], 10);
      const n2 = parseInt(match[2], 10);
      return (n1 * n2).toString();
    }
  }

  if (query.toLowerCase().includes("power")) {
    // Match format: "num power num" (e.g., "2 power 3")
    const match = query.match(/(-?\d+)\s*power\s*(-?\d+)/i);
    if (match) {
      const n1 = parseInt(match[1], 10);
      const n2 = parseInt(match[2], 10);
      return (n1 ** n2).toString();
    }
  }

  if (query.toLowerCase().includes("primes")) {
    // Assume the format is: "primes: n1, n2, n3, ..."
    const afterColonIndex = query.indexOf(":");
    if (afterColonIndex !== -1) {
      const numListPart = query.slice(afterColonIndex + 1);
      const numbers = numListPart.split(",").map(str => parseInt(str.trim(), 10)).filter(n => !isNaN(n));
      return numbers.filter(isPrime).join(", ");
    }
  }

  function isPrime(n: number): boolean {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  return "";
}
