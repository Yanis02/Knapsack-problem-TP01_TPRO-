
function compare(a, b) {
  if (a.weight < b.weight) {
    return -1;
  }
  if (a.weight > b.weight) {
    return 1;
  }
  return 0;
}

function knapsackSolve(items, weight) {
  // Sorting Items 

  items.sort(compare);

  var M = [[]];

  for (var j = 0; j < weight + 2; j++) {
    M[0][j] = 0;
  }
  for (var i = 1; i < items.length + 1; i++) {
    M[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (j = 0; j < items[i - 1].weight; j++) {
      M[i][j] = M[i - 1][j];
    }
    for (j = items[i - 1].weight; j < weight + 1; j++) {
      M[i][j] = Math.max(
        M[i - 1][j],
        M[i - 1][j - items[i - 1].weight] + items[i - 1].value
      );
    }
  }

  var chosen = [];

  i = items.length;
  j = weight;
  var V = 0;

  while (i !== 0 && j !== 0) {
    if (M[i][j] === M[i - 1][j]) {
      chosen[i - 1] = 0;
      i = i - 1;
    } else {
      chosen[i - 1] = 1;
      j = j - items[i - 1].weight;
      V = V + items[i - 1].value;
      i = i - 1;
    }
  }
  
  return { chosen: chosen, valueOptim: V }
}

export default knapsackSolve;
