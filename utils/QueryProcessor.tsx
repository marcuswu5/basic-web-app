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
		  let a = n.substring(0,j);
		  numbers.push(parseInt(i1, n));
		  s = s.slice(j);
	  }
	  return numbers.reduce((a, b) => Math.max(a, b), -Infinity);
  }

  return "";
}
