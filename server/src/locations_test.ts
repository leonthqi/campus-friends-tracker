import * as assert from 'assert';
import {
    centroid, distance, sameLocation, squaredDistance, distanceMoreThan, Location, Region
  } from './locations';


describe('locations', function() {

  it('sameLocations', function() {
    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 0, y: 0}), true);
    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 0, y: 1}), true);
    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 1, y: 0}), true);
    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 1, y: 1}), true);

    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 0, y: 1}), false);
    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 1, y: 0}), false);
    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 1, y: 1}), false);

    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 0, y: 0}), false);
    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 1, y: 0}), false);
    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 1, y: 1}), false);

    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 0, y: 0}), false);
    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 0, y: 1}), false);
    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 1, y: 1}), false);

    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 0, y: 0}), false);
    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 0, y: 1}), false);
    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 1, y: 0}), false);
  });

  it('squaredDistance', function() {
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 1, y: 1}), 2);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 0, y: 1}), 1);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 1, y: 0}), 1);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 2, y: 0}), 4);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 0, y: 2}), 4);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 2, y: 2}), 8);
  });

  it('distance', function() {
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 1, y: 1}) - Math.sqrt(2)) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 0, y: 1}) - 1) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 1, y: 0}) - 1) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 2, y: 0}) - 2) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 0, y: 2}) - 2) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 2, y: 2}) - Math.sqrt(8)) < 1e-3);
  });

  it('centroid', function() {
    assert.deepStrictEqual(centroid([{x: 0, y: 1}]), {x: 0, y: 1});
    assert.deepStrictEqual(centroid([{x: 1, y: 2}]), {x: 1, y: 2});

    assert.deepStrictEqual(centroid([{x: 0, y: 0}, {x: 1, y: 2}]), {x: 0.5, y: 1});
    assert.deepStrictEqual(centroid([{x: 0, y: 0}, {x: 1, y: 2}]), {x: 0.5, y: 1});
    assert.deepStrictEqual(centroid([{x: 0, y: 1}, {x: 1, y: 2}]), {x: 0.5, y: 1.5});
    assert.deepStrictEqual(
        centroid([{x: 0, y: 1}, {x: 1, y: 2}, {x: 2, y: 3}]), {x: 1, y: 2});
  });

  it('distanceMoreThan', function() {
    // TODO: write these in task 3
    const region: Region = {x1: 2, x2: 8, y1: 2, y2: 8};

    // Covers top side
    const top: Location = {x: 5, y: 0}; 
    assert.deepStrictEqual(distanceMoreThan(top, region, 1), true);  
    assert.deepStrictEqual(distanceMoreThan(top, region, 3), false);
  
    // Covers right side
    const right: Location = {x: 10, y: 6};
    assert.deepStrictEqual(distanceMoreThan(right, region, 1), true);
    assert.deepStrictEqual(distanceMoreThan(right, region, 3), false);
  
    // Covers bottom side
    const bottom: Location = {x: 4, y: 10};
    assert.deepStrictEqual(distanceMoreThan(bottom, region, 1), true);
    assert.deepStrictEqual(distanceMoreThan(bottom, region, 3), false);
  
    // Covers left side
    const left: Location = {x: 0, y: 4};
    assert.deepStrictEqual(distanceMoreThan(left, region, 1), true);
    assert.deepStrictEqual(distanceMoreThan(left, region, 3), false);
  
    // Covers top-right corner
    const tr: Location = {x: 12, y: 0};
    assert.deepStrictEqual(distanceMoreThan(tr, region, 5), false);
    assert.deepStrictEqual(distanceMoreThan(tr, region, 6), false);
  
    // Covers top-left corner
    const tl: Location = {x: -1, y: 0};
    assert.deepStrictEqual(distanceMoreThan(tl, region, 3), true);
    assert.deepStrictEqual(distanceMoreThan(tl, region, 4), false);
  
    // Covers bottom-right corner
    const br: Location = {x: 11, y: 11};
    assert.deepStrictEqual(distanceMoreThan(br, region, 4), true);
    assert.deepStrictEqual(distanceMoreThan(br, region, 5), false);
  
    // Covers bottom-left corner
    const bl: Location = {x: -2, y: 12};
    assert.deepStrictEqual(distanceMoreThan(bl, region, 5), true);
    assert.deepStrictEqual(distanceMoreThan(bl, region, 6), false);
  });

});
