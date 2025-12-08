# 100x Synthetic Data Generation System

## Overview

This system generates **100x more synthetic test data** based on:
1. **Existing test cases** - Your seed data
2. **Real user query frequency** - What users actually search for
3. **Advanced linguistic variations** - Synonyms, paraphrasing, typos, and patterns

The goal is to ensure that **regardless of how users phrase their queries, they will land on the correct page**.

## How It Works

### 1. Query Tracking

Every user query is automatically tracked when they use the AI Navigation system:

- **Query text** - What the user typed
- **Intent** - What the system detected
- **Flow ID** - Which flow was matched
- **Target URL** - Where the user was directed
- **Success rate** - Whether navigation was successful (from feedback)

This data is stored in `queryRepository` and used to prioritize common queries.

### 2. Synthetic Data Generation

The `generate-100x-synthetic-data.ts` script:

1. Reads your existing test cases from `test-data/test-cases.json`
2. Reads real query frequency data from `test-data/query-frequency.json` (if available)
3. Generates 100x variations using:
   - **Synonym replacement** - "show" → "display", "see", "view", etc.
   - **Question patterns** - "I want to...", "Can you...", "Tell me about...", etc.
   - **Linguistic variations** - Contractions, formal/informal, etc.
   - **Typo variations** - Common misspellings
   - **Word addition/removal** - "please", "thanks", etc.
   - **Capitalization variations**

4. **Prioritizes high-frequency queries** - Queries that users actually use get more variations generated

5. Outputs to `test-data/test-cases-100x-synthetic.json`

## Usage

### Step 1: Generate 100x Synthetic Data

```bash
cd apps/ai-navigation-api
npx tsx scripts/generate-100x-synthetic-data.ts
```

This will:
- Generate 100x variations from your test cases
- Use real query frequency data if available (from Step 2)
- Create `test-data/test-cases-100x-synthetic.json`

### Step 2: Export Real Query Data (Optional but Recommended)

After users have used the AI Navigation system, export their actual queries:

```bash
npx tsx scripts/export-query-data.ts
```

This creates `test-data/query-frequency.json` with:
- All queries users have made
- Frequency of each query
- Success rate of each query
- Associated flow and intent

**Next time you run `generate-100x-synthetic-data.ts`, it will use this real data to prioritize common queries.**

### Step 3: Test Your Model

Use the synthetic data to test your AI navigation model:

```bash
npx tsx scripts/test-model.ts
```

You can modify `test-model.ts` to use `test-cases-100x-synthetic.json` instead of `test-cases.json`.

## Priority-Based Matching

The system automatically tracks query frequency and uses it for:

1. **Synthetic Data Generation** - High-frequency queries get more variations
2. **Future: Priority Matching** - Common queries can be matched first (to be implemented)

### Query Priority Score

Priority = `frequency × successRate`

- Higher frequency = more common query
- Higher success rate = more reliable navigation
- Higher priority = more important to match correctly

## Example Output

```
📊 Generating 100x synthetic data from 10 original test cases...

✅ Generated 127 variations for: "show me your case studies" (frequency: 15, success rate: 93.3%)
✅ Generated 98 variations for: "I want to contact you" (frequency: 8, success rate: 100.0%)
✅ Generated 145 variations for: "what services do you offer" (frequency: 22, success rate: 95.5%)
...

📈 Total variations generated: 1,247
✨ Unique variations: 1,156
📊 Expansion factor: 115.6x

💾 100x synthetic test data saved to: test-data/test-cases-100x-synthetic.json
```

## Data Flow

```
User Query
    ↓
AI Navigation API (tracks query)
    ↓
Query Repository (stores frequency)
    ↓
Export Query Data (export-query-data.ts)
    ↓
Query Frequency JSON
    ↓
Generate 100x Synthetic Data (uses frequency for prioritization)
    ↓
100x Synthetic Test Cases
    ↓
Test Model (validates matching accuracy)
```

## Benefits

1. **Comprehensive Coverage** - 100x more test cases means better coverage of user language variations
2. **Data-Driven** - Uses real user queries to prioritize what matters most
3. **Automatic** - Query tracking happens automatically, no manual work needed
4. **Scalable** - As more users use the system, the synthetic data gets better

## Future Enhancements

- **Priority-based matching in navigate.ts** - Match high-frequency queries first
- **Machine learning integration** - Use ML to generate even more realistic variations
- **Multi-language support** - Generate variations in multiple languages
- **Context-aware variations** - Generate variations based on user context (device, location, etc.)

## Files

- `scripts/generate-100x-synthetic-data.ts` - Main generation script
- `scripts/export-query-data.ts` - Export real query data
- `src/infra/queryRepository.ts` - Query tracking storage
- `src/services/queryService.ts` - Query tracking service
- `test-data/test-cases.json` - Original test cases
- `test-data/query-frequency.json` - Real user query data (generated)
- `test-data/test-cases-100x-synthetic.json` - Generated synthetic data

