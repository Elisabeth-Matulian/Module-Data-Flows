let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

function printOrder(order) {
  let printOut = "QTY".padEnd(8, " ") + "ITEM".padEnd(20, " ") + "TOTAL\n";
  let total = 0;
  for (const { itemName, quantity, unitPricePence } of order) {
    printOut += `${String(quantity).padEnd(8, " ")}${itemName.padEnd(20, " ")}${((quantity * unitPricePence) / 100).toFixed(2)}\n`;
    total += unitPricePence * quantity;
  }
  printOut += `Total: ${(total / 100).toFixed(2)}`;
  return printOut;
}
console.log(printOrder(order));
