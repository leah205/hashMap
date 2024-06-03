#!/usr/bin/env node

//resize array in set function
function HashMap() {
  let buckets = [];
  let tableSize = 8;
  const loadCapacity = 0.75;
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % tableSize;
    }
    return hashCode;
  }
  function set(key, value) {
    const hashCode = hash(key);
    let temp = buckets[hashCode];
    let newKey = true;

    while (temp) {
      if (temp.key == key) {
        temp.value = value;
        newKey = false;
      }
      temp = temp.nextNode;
    }
    if (newKey) {
      //addNewKey()
      temp = buckets[hashCode];
      while (temp && temp.nextNode) {
        temp = temp.nextNode;
      }
      if (temp) {
        //setTail()
        temp.nextNode = {
          key,
          value,
          nextNode: null,
        };
      } else {
        //setHead()
        buckets[hashCode] = {
          key,
          value,
          nextNode: null,
        };
      }
    }
    if (isLoadCapacityReached()) {
      console.log("expand");
      expandHash();
    }
  }

  function expandHash() {
    console.log(this);
    const pairs = entries();
    tableSize = tableSize * 2;
    clear();
    pairs.forEach(([key, value]) => {
      set(key, value);
    });
  }

  function isLoadCapacityReached() {
    let used = 0;
    buckets.forEach((bucket) => {
      if (bucket) used += 1;
    });
    if (used / tableSize >= loadCapacity) {
      return true;
    }
    return false;
  }

  function get(key) {
    const hashCode = hash(key);
    let temp = buckets[hashCode];
    while (temp) {
      if (temp.key === key) {
        return temp.value;
      }
      temp = temp.nextNode;
    }
    return null;
  }
  function has(key) {
    const hashCode = hash(key);
    let temp = buckets[hashCode];
    while (temp) {
      if (temp.key === key) {
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  function remove(key) {
    const hashCode = hash(key);
    let temp = buckets[hashCode];
    if (temp && temp.key === key) {
      buckets[hashCode] = temp.nextNode;
    } else {
      while (temp) {
        if (temp.nextNode && temp.nextNode.key === key) {
          temp.nextNode = temp.nextNode.nextNode;
          return true;
        } else temp = temp.nextNode;
      }
      return false;
    }
  }

  function length() {
    let length = 0;
    buckets.forEach((bucket) => {
      temp = bucket;
      while (temp) {
        length += 1;
        temp = temp.nextNode;
      }
    });
    return length;
  }

  function clear() {
    for (let i = 0; i < tableSize; i++) {
      buckets[i] = null;
    }
  }

  function keys() {
    let keyArr = [];
    buckets.forEach((bucket) => {
      temp = bucket;
      while (temp) {
        keyArr.push(temp.key);
        temp = temp.nextNode;
      }
    });
    return keyArr;
  }
  function values() {
    let valueArr = [];
    buckets.forEach((bucket) => {
      temp = bucket;
      while (temp) {
        valueArr.push(temp.value);
        temp = temp.nextNode;
      }
    });
    return valueArr;
  }

  function entries() {
    let entryArr = [];
    buckets.forEach((bucket) => {
      temp = bucket;
      while (temp) {
        entryArr.push([temp.key, temp.value]);
        temp = temp.nextNode;
      }
    });
    return entryArr;
  }

  return {
    set,
    buckets,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

const map = HashMap();
map.set("age", "89");
map.set("name", "dave");
map.set("name", "keith");
map.set("month", "september");
map.set("day", "tuesday");
map.set("color", "blue");
map.set("day", "monday");
map.set("cookie", "oatmeal");
map.set("food", "hot dog");
map.set("initials", "RJD");
map.set("book", "spinning silver");
//map.clear();
//map.set("age", "89");

console.log(map.buckets);
