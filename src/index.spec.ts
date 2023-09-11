import runGoldenMaster from 'jest-golden-master';
import { GildedRose, Item, AgedBrie, BackstagePasses, Sulfuras, NormalItem } from './index';

describe('GildedRose constructor', () => {
    it('should instantiate with default items if none provided', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([]);
            expect(gildedRose.items).toEqual([]);
        });
    });

    it('should instantiate with provided items', () => {
        runGoldenMaster(async () => {
            const items = [new NormalItem('normal', 10, 20)];
            const gildedRose = new GildedRose(items);
            expect(gildedRose.items).toEqual(items);
        });
    });
});

describe('GildedRose', () => {
    it('should decrease quality and sellIn for a normal item', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new NormalItem('normal', 10, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(19);
            expect(items[0].sellIn).toBe(9);
        });
    });

    it('should increase quality for Aged Brie', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new AgedBrie('Aged Brie', 10, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(21);
        });
    });

    it('should not decrease quality below 0', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new NormalItem('normal', 10, 0)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(0);
        });
    });

    it('should handle Sulfuras correctly (no change)', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new Sulfuras('Sulfuras, Hand of Ragnaros', 10, 80)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(80);
            expect(items[0].sellIn).toBe(10);
        });
    });

    it('should increase quality for Backstage passes as concert approaches', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new BackstagePasses('Backstage passes to a TAFKAL80ETC concert', 12, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(21);
        });
    });

    it('should increase quality by 2 for Backstage passes with 10 days or less', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new BackstagePasses('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(22);
        });
    });

    it('should increase quality by 3 for Backstage passes with 5 days or less', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new BackstagePasses('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(23);
        });
    });

    it('should drop quality to 0 for Backstage passes after concert', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new BackstagePasses('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(0);
        });
    });

    it('should not increase quality above 50 for Aged Brie', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new AgedBrie('Aged Brie', 10, 50)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(50);
        });
    });

    it('should degrade twice as fast for normal items once sell date has passed', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new NormalItem('normal', 0, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(18);
        });
    });

    it('should increase quality of Aged Brie by 1 when sellIn is negative', () => {
        runGoldenMaster(async () => {
            const gildedRose = new GildedRose([new AgedBrie('Aged Brie', -1, 20)]);
            const items = gildedRose.updateItems();
            expect(items[0].quality).toBe(22);
        });
    });
});