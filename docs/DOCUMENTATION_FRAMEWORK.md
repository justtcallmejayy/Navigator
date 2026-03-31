# Documentation Framework

Last Updated: March 2026

## Goal

Keep documentation short, current, and easy to update.

## Active Docs

- USER_GUIDE.md: end-user help
- ARCHITECTURE.md: technical overview
- CONTENT_MANAGEMENT.md: publishing workflow
- TEAM_WORKFLOW.md: team process
- GIT_STRATEGY.md: branch and commit rules
- TECHNICAL_DEBT.md: known gaps
- CHANGELOG.md: release notes

## Rules

1. Keep only essential sections.
2. Prefer checklists over long prose.
3. Update docs in the same PR as behavior changes.
4. Delete stale docs instead of keeping placeholders.

## Release Update Checklist

1. Update USER_GUIDE.md for user-visible behavior.
2. Update ARCHITECTURE.md if technical flow changed.
3. Add release note to CHANGELOG.md.
4. Remove obsolete links and references.

## Review Cadence

- Per release: USER_GUIDE.md, CHANGELOG.md
- Monthly: TECHNICAL_DEBT.md
- Quarterly: full docs relevance review

