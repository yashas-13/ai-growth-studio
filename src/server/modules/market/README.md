# Market intelligence module

Owns domains, tracked competitors, keyword sets, crawl jobs, technical findings, answer-engine query sets, citation observations and reports.

Application use cases: createAudit, scheduleCrawl, ingestCrawlResult, manageCompetitor, trackQuerySet, recordVisibilityObservation and buildReport.

Every observation must retain timestamp, source, collection method, query set and coverage limitations. Validate crawl targets against SSRF/private-network access; respect provider terms and robots/authorization boundaries. Never claim complete rankings where the source does not expose them.
