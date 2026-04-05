import * as assert from 'assert';
import { buildTree , findClosestInTree, closestInTree, LocationTree} from './location_tree';
import { Region } from './locations';


describe('location_tree', function() {

  it('buildTree', function() {
    assert.deepStrictEqual(buildTree([]), {kind: "empty"});

    assert.deepStrictEqual(buildTree([{x: 1, y: 1}]),
        {kind: "single", loc: {x: 1, y: 1}});
    assert.deepStrictEqual(buildTree([{x: 2, y: 2}]),
        {kind: "single", loc: {x: 2, y: 2}});

    assert.deepStrictEqual(buildTree([{x: 1, y: 1}, {x: 3, y: 3}]),
        {kind: "split", at: {x: 2, y: 2},
         nw: {kind: "single", loc: {x: 1, y: 1}},
         ne: {kind: "empty"},
         sw: {kind: "empty"},
         se: {kind: "single", loc: {x: 3, y: 3}}});
    assert.deepStrictEqual(buildTree([{x: 1, y: 3}, {x: 3, y: 1}]),
        {kind: "split", at: {x: 2, y: 2},
         nw: {kind: "empty"},
         ne: {kind: "single", loc: {x: 3, y: 1}},
         sw: {kind: "single", loc: {x: 1, y: 3}},
         se: {kind: "empty"}});

    assert.deepStrictEqual(buildTree(
        [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 5}, {x: 7, y: 7}]),
        {kind: "split", at: {x: 4, y: 4},
         nw: {kind: "split", at: {x: 2, y: 2},
              nw: {kind: "single", loc: {x: 1, y: 1}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 3, y: 3}}},
         ne: {kind: "empty"},
         sw: {kind: "empty"},
         se: {kind: "split", at: {x: 6, y: 6},
              nw: {kind: "single", loc: {x: 5, y: 5}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 7, y: 7}}}});
    assert.deepStrictEqual(buildTree(
        [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}]),
        {kind: "split", at: {x: 2, y: 2},
          nw: {kind: "split", at: {x: 0.5, y: 0.5},
            nw: {kind: "single", loc: {x: 0, y: 0}},
            ne: {kind: "empty"},
            sw: {kind: "empty"},
            se: {kind: "single", loc: {x: 1, y: 1}}},
          ne: {kind: "empty"},
          sw: {kind: "empty"},
          se: {kind: "split", at: {x: 3, y: 3},
              nw: {kind: "single", loc: {x: 2, y: 2}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "split", at: {x: 3.5, y: 3.5},
                nw: {kind: "single", loc: {x: 3, y: 3}},
                ne: {kind: "empty"},
                sw: {kind: "empty"},
                se: {kind: "single", loc: {x: 4, y: 4}}}}});
    assert.deepStrictEqual(buildTree(
        [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 3}, {x: 7, y: 1},
         {x: 1, y: 7}, {x: 3, y: 5}, {x: 5, y: 5}, {x: 7, y: 7}]),
        {kind: "split", at: {x: 4, y: 4},
         nw: {kind: "split", at: {x: 2, y: 2},
              nw: {kind: "single", loc: {x: 1, y: 1}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 3, y: 3}}},
         ne: {kind: "split", at: {x: 6, y: 2},
              nw: {kind: "empty"},
              sw: {kind: "single", loc: {x: 5, y: 3}},
              ne: {kind: "single", loc: {x: 7, y: 1}},
              se: {kind: "empty"}},
         sw: {kind: "split", at: {x: 2, y: 6},
              nw: {kind: "empty"},
              ne: {kind: "single", loc: {x: 3, y: 5}},
              sw: {kind: "single", loc: {x: 1, y: 7}},
              se: {kind: "empty"}},
         se: {kind: "split", at: {x: 6, y: 6},
              nw: {kind: "single", loc: {x: 5, y: 5}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 7, y: 7}}}});
  });

  it('closestInTree', function() {
    // TODO: implement this in Task 4
    const REGION: Region = {x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity};

    const treeA: LocationTree = buildTree([{x: 6, y: 6},{x: 10, y: 6},{x: 10, y: 10}]);
    const treeB: LocationTree = buildTree([{x: 5, y: 5},{x: 5, y: 10},{x: 10, y: 10}]);
    const treeC: LocationTree = buildTree([{x: 5, y: 5},{x: 10, y: 5},{x: 10, y: 10}]);
    const treeD: LocationTree = buildTree([{x: 5, y: 5},{x: 5, y: 10},{x: 10, y: 5}]);
    const treeE: LocationTree = buildTree([{x: 5, y: 5},{x: 10, y: 5},{x: 10, y: 10},{x: 10, y: 12}]);
  
    // Empty tree
    assert.deepStrictEqual(closestInTree(buildTree([]),
      {x: 3, y: 3}, REGION,
      {loc: {x: 1, y: 1}, dist: 5}),
      {loc: {x: 1, y: 1}, dist: 5}
    );
  
    // Single tree
    assert.deepStrictEqual(closestInTree(buildTree([{x: 7, y: 3}]),
      {x: 5, y: 3}, REGION,
      {loc: {x: 10, y: 10}, dist: 9}),
      {loc: {x: 7, y: 3}, dist: 2}
    );
  
    // NW closer to NE
    let result = closestInTree(treeA, {x: 8, y: 6}, REGION, {loc: {x: 0, y: 0}, dist: 20});
    assert.strictEqual(result.dist, 2);
    assert.ok(result.loc !== undefined && (
      (result.loc.x === 10 && result.loc.y === 6) ||
      (result.loc.x === 6 && result.loc.y === 6)
    ));
  
    // NW closer to SW
    result = closestInTree(treeA, {x: 6, y: 7}, REGION, {loc: {x: 0, y: 0}, dist: 20});
    assert.deepStrictEqual(result, {loc: {x: 6, y: 6}, dist: 1});
  
    // NE closer to NW
    result = closestInTree(treeB, {x: 6, y: 5}, REGION, {loc: {x: 0, y: 0}, dist: 20});
    assert.deepStrictEqual(result, {loc: {x: 5, y: 5}, dist: 1});
  
    // NE closer to SE
    result = closestInTree(treeB, {x: 9, y: 9}, REGION, {loc: {x: 0, y: 0}, dist: 50});
    assert.deepStrictEqual(result, {loc: {x: 10, y: 10}, dist: Math.sqrt(2)});
  
    // SW closer to NW
    result = closestInTree(treeC, {x: 6, y: 9}, REGION, {loc: {x: 0, y: 0}, dist: 20});
    assert.deepStrictEqual(result, {loc: {x: 5, y: 5}, dist: Math.sqrt(17)});
  
    // SW closer to SE
    result = closestInTree(treeC, {x: 9, y: 9}, REGION, {loc: {x: 15, y: 15}, dist: 100});
    assert.deepStrictEqual(result, {loc: {x: 10, y: 10}, dist: Math.sqrt(2)});
  
    // SE closer to SW
    result = closestInTree(treeD, {x: 9, y: 10}, REGION, {loc: {x: 0, y: 0}, dist: 50});
    assert.deepStrictEqual(result, {loc: {x: 5, y: 10}, dist: 4});
  
    // SE closer to NE
    result = closestInTree(treeD, {x: 10, y: 9}, REGION, {loc: {x: 0, y: 0}, dist: 50});
    assert.deepStrictEqual(result, {loc: {x: 10, y: 5}, dist: 4});
  
    // Recursion many
    result = closestInTree(treeE, {x: 9, y: 11}, REGION, {loc: {x: 5, y: 5}, dist: 10});
    assert.strictEqual(result.dist, Math.sqrt(2));
    assert.deepStrictEqual(result.loc, {x: 10, y: 10});
  });


  it('findClosestInTree', function() {
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 2, y: 1}]),
        [{x: 1, y: 1}]),
      [{x: 2, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 3}]),
        [{x: 1, y: 1}]),
      [{x: 2, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}]),
      [{x: 1, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}, {x: 4.9, y: 4.9}]),
      [{x: 5, y: 5}, Math.sqrt((5-4.9)**2+(5-4.9)**2)]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}, {x: -1, y: -1}]),
      [{x: 1, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 4, y: 1}, {x: -1, y: -1}, {x: 10, y: 10}]),
      [{x: 5, y: 1}, 1]);
  });

});
