# Day 17 Performance and Index Tuning Notes

## Fields used for filtering
| Field | Used by | Currently indexed? |
|---|---|---|
| `status` | `GET /api/v1/assets?status=`, frontend status filter dropdown | Yes (`@Indexed`) |
| `category` | `GET /api/v1/assets?category=`, asset category filters | Yes (`@Indexed`) |
| `location` | `GET /api/v1/assets?location=` | Yes (`@Indexed`) |

Filtering operations target single parameters individually via repository query derivation, ensuring efficient lookups without needing complex compound indexes for current operational patterns.

## Fields used for sorting
| Field | Used by | Currently indexed? |
|---|---|---|
| `assetTag` | `GET /api/v1/assets/paged?sortBy=assetTag` | Yes (`@Indexed` / Unique) |
| `createdAt` | Default chronological sorting | Yes (`@Indexed`) |
| `purchaseDate` | Date-based sorting options | Yes (`@Indexed`) |
| `name` | Alphabetical asset listing dropdown | **No index** — sorting by name performs an in-memory sort |

## Fields that should be unique
* **`assetTag`**: Enforces absolute uniqueness (`@Indexed(unique = true)`) to prevent duplicate physical assets from being registered in the inventory system.
* **`serialNumber`**: Enforces uniqueness to prevent hardware component collision.
* **`email`** (on `AppUser` collection): Enforces unique user mapping for authentication and JWT issuance.

## Fields used in reports
| Field | Used by |
|---|---|
| `status` | `AssetReportService` aggregation pipeline (`$group` by status) |
| `category` | `AssetReportService` aggregation pipeline (`$group` by category) |

Both fields maintain active indexes, allowing MongoDB's aggregation engine to execute grouping and counting stages efficiently without triggering full collection scans.

## Evidence: current indexes (via mongosh)
```text
mongosh "mongodb://localhost:27017/support_desk_db" --eval "db.assets.getIndexes()"

[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { assetTag: 1 }, name: 'assetTag_unique', unique: true },
  { v: 2, key: { category: 1 }, name: 'category' },
  { v: 2, key: { status: 1 }, name: 'status' },
  { v: 2, key: { location: 1 }, name: 'location' },
  { v: 2, key: { createdAt: 1 }, name: 'createdAt' }
]