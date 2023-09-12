export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: Array<Item> = []) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        console.log("Before update:", JSON.stringify(this.items));
        this.items.forEach(item => {
            if (item.name !== "Sulfuras, Hand of Ragnaros") {
                this.adjustSellIn(item);
                this.adjustQuality(item);
            }
        });
        console.log("After update:", JSON.stringify(this.items));
        return this.items;
    }

    private adjustSellIn(item: Item): void {
        item.sellIn -= 1;
    }

    private adjustQuality(item: Item): void {
        switch (item.name) {
            case "Aged Brie":
                this.adjustAgedBrieQuality(item);
                break;
            case "Backstage passes to a TAFKAL80ETC concert":
                this.adjustBackstagePassQuality(item);
                break;
            default:
                this.adjustDefaultQuality(item);
                break;
        }
        this.ensureQualityBounds(item);
    }

    private adjustAgedBrieQuality(item: Item): void {
        console.log("Aged Brie before:", item.quality);
        item.quality += 1;
        if (item.sellIn < 0) item.quality += 1;
        console.log("Aged Brie after:", item.quality);
    }

    private adjustBackstagePassQuality(item: Item): void {
        console.log("Backstage Pass before:", item.quality);
        item.quality += item.sellIn < 6 ? 3 : item.sellIn < 11 ? 2 : 1;
        if (item.sellIn < 0) item.quality = 0;
        console.log("Backstage Pass after:", item.quality);
    }

    private adjustDefaultQuality(item: Item): void {
        console.log("Default item before:", item.quality);
        item.quality -= item.sellIn < 0 ? 2 : 1;
        console.log("Default item after:", item.quality);
    }

    private ensureQualityBounds(item: Item): void {
        item.quality = Math.max(0, Math.min(item.quality, 50));
    }
}
