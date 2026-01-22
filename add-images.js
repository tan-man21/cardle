const fs = require("fs");

const data = JSON.parse(fs.readFileSync("cardDeck.json", "utf8"));

const updated = data.map((item, index) => ({
  ...item,
  image: `/icons/item-${index + 1}.jpg`
}));

fs.writeFileSync(
  "data-with-images.json",
  JSON.stringify(updated, null, 2)
);

console.log("✅ Images added successfully!");
