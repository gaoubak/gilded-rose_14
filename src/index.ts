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
        this.items.forEach(item => {
            if (item.name !== "Sulfuras, Hand of Ragnaros") {
                this.adjustSellIn(item);
                this.adjustQuality(item);
            }
        });
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
        item.quality += 1;
        if (item.sellIn < 0) item.quality += 1;
    }

    private adjustBackstagePassQuality(item: Item): void {
        item.quality += item.sellIn < 6 ? 3 : item.sellIn < 11 ? 2 : 1;
        if (item.sellIn < 0) item.quality = 0;
    }

    private adjustDefaultQuality(item: Item): void {
        item.quality -= item.sellIn < 0 ? 2 : 1;
    }

    private ensureQualityBounds(item: Item): void {
        item.quality = Math.max(0, Math.min(item.quality, 50));
    }
}