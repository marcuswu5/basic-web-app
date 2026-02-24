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
	  let index = query.indexOf("minus");
	  let n1 = parseInt(query.substring(0,index), 10);
	  let n2 = parseInt(query.slice(index),10);
	  return (n1 - n2).toString();
  }

  if (query.toLowerCase().includes("multiplied")) {
	  let index = query.indexOf("multiplied");
	  let n1 = parseInt(query.substring(0,index), 10);
	  let n2 = parseInt(query.slice(index),10);
	  return (n1 * n2).toString();
  }

  if (query.toLowerCase().includes("primes")) {
    let index = query.indexOf("primes");
    let s = query.slice(index);
    let numbers: number[] = [];
    for (let i = 0; i < 5; i++) {
      let j = s.indexOf(",");
      let a = s.substring(0,j);
      numbers.push(parseInt(a, 10));
      s = s.slice(j);
    }
    return numbers.filter(isPrime).join(", ");
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
