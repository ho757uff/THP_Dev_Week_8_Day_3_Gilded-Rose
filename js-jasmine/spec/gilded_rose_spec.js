var { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function () {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  // Test: Decrease quality for normal items
  it("should decrease quality for normal items", function () {
    const items = [new Item("Normal Item", 10, 20)];
    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(19); // Vérifie que la qualité diminue de 1
  });

  // Test: Increase quality for Aged Brie
  it("should increase quality for Aged Brie", function () {
    const items = [new Item("Aged Brie", 10, 20)];
    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(21); // Vérifie que la qualité augmente de 1
  });

  // Test: Quality does not change for Sulfuras
  it("should not change quality for Sulfuras", function () {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(80); // Vérifie que la qualité reste inchangée
  });

  // Test: Increase quality for Backstage passes
  it("should increase quality for Backstage passes", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)
    ];
    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    // Vérifie que la qualité augmente de 1 pour plus de 10 jours restants
    expect(updatedItems[0].quality).toBe(21);
    // Vérifie que la qualité augmente de 2 pour 10 jours ou moins restants
    expect(updatedItems[1].quality).toBe(22);
    // Vérifie que la qualité augmente de 3 pour 5 jours ou moins restants
    expect(updatedItems[2].quality).toBe(23);
    // Vérifie que la qualité tombe à 0 après la date de péremption
    expect(updatedItems[3].quality).toBe(0);
  });

  // Test: Decrease quality twice as fast for Conjured items
  it("should decrease quality twice as fast for Conjured items", function () {
    const items = [new Item("Conjured Mana Cake", 10, 20)];
    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(18); // Vérifie que la qualité diminue de 2 pour "Conjured" items
  });

});
