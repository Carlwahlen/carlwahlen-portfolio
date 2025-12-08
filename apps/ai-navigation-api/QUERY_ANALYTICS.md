# Query Analytics - View User Input

## Overview

The AI Navigation system automatically tracks **every query** that users type into the system. You can view this data to understand:
- What users are actually searching for
- Which queries are most common
- Success rates for different queries
- Exact text users have typed

## Methods to View Queries

### Method 1: Command Line Script (Recommended)

View all queries directly in your terminal:

```bash
cd apps/ai-navigation-api
npm run view-queries
```

This shows:
- Top 20 queries by frequency
- All unique queries with statistics
- Raw query logs (exact text users typed)
- Overall statistics

### Method 2: API Endpoints

Access query data via HTTP API:

#### Get All Queries
```bash
GET http://localhost:3010/v1/queries
```

Query parameters:
- `limit` - Number of results (default: 100)
- `flowId` - Filter by specific flow

Example:
```bash
curl http://localhost:3010/v1/queries?limit=50
curl http://localhost:3010/v1/queries?flowId=flow-services
```

#### Get Query Statistics
```bash
GET http://localhost:3010/v1/queries/stats
```

Returns:
- Total unique queries
- Total query count
- Average success rate
- Flow distribution
- Top 10 queries

#### Export Query Data
```bash
GET http://localhost:3010/v1/queries/export
```

Returns data in format suitable for synthetic data generation.

## What Data is Tracked

For each query, the system tracks:

- **Query text** - Exact text the user typed
- **Normalized query** - Lowercased, trimmed version (for grouping)
- **Intent** - What the system detected
- **Flow ID** - Which flow was matched
- **Target URL** - Where the user was directed
- **Frequency** - How many times this query (or similar) was used
- **Success rate** - Percentage of successful navigations
- **Timestamp** - When the query was made
- **Session ID** - User session identifier

## Example Output

```
📊 Fetching all user queries...

📈 Total unique queries: 45
📝 Total query logs: 127

🔝 Top 20 Queries by Frequency:

 1. ✅ "show me your case studies"
    Frequency: 23 | Success: 95.7% | Flow: flow-view-cases | URL: /#/case
    Last used: 2024-01-15T10:30:00.000Z

 2. ✅ "what services do you offer"
    Frequency: 18 | Success: 100.0% | Flow: flow-services | URL: /#/services
    Last used: 2024-01-15T09:15:00.000Z

...

📊 Statistics:

Total queries: 127
Unique queries: 45
Average success rate: 92.3%
Most common flow: flow-services (12 unique queries)
```

## Use Cases

1. **Understand User Language** - See how users actually phrase their queries
2. **Improve Matching** - Identify queries that aren't matching correctly
3. **Generate Synthetic Data** - Use real queries to generate 100x synthetic data
4. **Analytics** - Track which pages/flows are most popular
5. **Debugging** - See exact queries that led to incorrect navigation

## Privacy Note

⚠️ **Important**: In production, add authentication/authorization to protect query data, as it may contain sensitive information about what users are searching for.

## Files

- `scripts/view-queries.ts` - Command-line script to view queries
- `src/routes/queries.ts` - API endpoints for query data
- `src/infra/queryRepository.ts` - Storage for query data
- `src/services/queryService.ts` - Service for query operations

