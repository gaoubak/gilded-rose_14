export class Item {
  static all = [];

  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    Item.all.push(this);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = Item.all as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (
        item.name !== "Aged Brie" &&
        item.name !== "Backstage passes to a TAFKAL80ETC concert" &&
        item.name !== "Sulfuras, Hand of Ragnaros"
      ) {
        item.quality -= 1;
        if (item.sellIn < 0 && item.quality > 0) {
          item.quality -= 1;
        }
      } else if (item.quality < 50) {
        item.quality += 1;
        if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn < 11 || item.sellIn < 6) {
            item.quality += 1;
          }
        }
      }

      if (
        item.name === "Aged Brie" ||
        item.name === "Backstage passes to a TAFKAL80ETC concert"
      ) {
        item.quality += 1;
      }

      if (item.name === "Sulfuras, Hand of Ragnaros") {
        item.sellIn -= 1;
      }
    });

    return this.items;
  }
}

new Item("Sulfuras, Hand of Ragnaros", 6, 32);
new Item("Aged Brie", 20, 50);
new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0);
new Item("Test 01", 0, 0);

console.log("Update Quality : ", new GildedRose().updateQuality());