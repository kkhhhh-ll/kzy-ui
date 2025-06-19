## LRU 算法

LRU（Least Recently Used，最近最少使用）是一种常见的缓存淘汰策略，其核心思想是：当缓存空间不足时，优先淘汰最近最少被访问的数据。

```
class LRUCache {
  constructor(maxSize = 5) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }
  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      // Move the accessed item to the end to maintain LRU order
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
  }
  delete(key) {
    this.cache.delete(key);
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove the first (least recently used) item
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```
