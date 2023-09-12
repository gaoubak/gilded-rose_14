export class Item {
  static all: any = [];

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
        item.name === "Aged Brie" ||
        item.name === "Backstage passes to a TAFKAL80ETC concert"
      ) {
        item.quality += 1;
      } else {
        item.quality -= 1;
      }
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        item.quality =
          item.sellIn <= 10
            ? (item.quality += 2)
            : item.quality <= 5
            ? (item.quality += 3)
            : item.quality;
      }
    });
  }

  handleQualityNumber() {
    this.items.forEach((item) => {
      if (item.quality > 50 && item.name !== "Sulfuras, Hand of Ragnaros") {
        item.quality = 50;
      }
      if (item.quality < 0) {
        item.quality = 0;
      }
      if (
        item.name === "Backstage passes to a TAFKAL80ETC concert" &&
        item.sellIn === 0
      ) {
        item.quality = 0;
      }
    });
  }

  handleSellIn() {
    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
          item.sellIn = 0;
      } else {
        item.sellIn -= 1;
      }
    });
  }

  updateItems() {
    this.updateQuality();
    this.handleQualityNumber();
    this.handleSellIn();
    return this.items;
  }
}

//////

const sulfate = new Item("Sulfuras, Hand of Ragnaros", 6, 80);
const agedBrie = new Item("Aged Brie", 20, 59);
const backstage = new Item("Backstage passes to a TAFKAL80ETC concert", 2, 40);
const regularItem = new Item("regular", 10, 3);

describe('Item Manager', () => {
  it('Update sellIn for items', () => {

    new GildedRose().updateItems();
      
    expect(sulfate.sellIn).toBe(0);
    expect(regularItem.sellIn).toBe(9); 
  });
    
     it('should correctly update quality for items', () => {

    new GildedRose().updateItems();

   
    expect(sulfate.quality).toBe(80); 
    expect(agedBrie.quality).toBe(21); 
    expect(backstage.quality).toBe(29); 

  });
});
