#!/bin/bash
REPO="stephen-wm/whispr-chat"

# Delete default GitHub labels first
gh label delete "bug" --yes 2>/dev/null
gh label delete "documentation" --yes 2>/dev/null
gh label delete "duplicate" --yes 2>/dev/null
gh label delete "good first issue" --yes 2>/dev/null
gh label delete "help wanted" --yes 2>/dev/null
gh label delete "invalid" --yes 2>/dev/null
gh label delete "wontfix" --yes 2>/dev/null

# Type labels
gh label create "bug" --color "D73A4A" --description "Something is broken or not working as expected"
gh label create "feature" --color "0075CA" --description "New feature or enhancement"
gh label create "chore" --color "E4E669" --description "Maintenance, tooling, or configuration changes"
gh label create "refactor" --color "C5DEF5" --description "Code restructure with no behavior change"
gh label create "docs" --color "0075CA" --description "Documentation changes only"
gh label create "test" --color "BFD4F2" --description "Adding or fixing tests"
gh label create "ci" --color "F9D0C4" --description "CI/CD pipeline changes"
gh label create "perf" --color "E99695" --description "Performance improvements"
gh label create "security" --color "B60205" --description "Security fix or improvement"
gh label create "revert" --color "E4E669" --description "Reverts a previous change"

# Status labels
gh label create "needs-triage" --color "EDEDED" --description "Needs review and categorization by a maintainer"
gh label create "in-progress" --color "FBCA04" --description "Actively being worked on"
gh label create "blocked" --color "B60205" --description "Blocked by another issue or external dependency"
gh label create "on-hold" --color "D93F0B" --description "Paused, waiting for more information or a decision"
gh label create "ready-for-review" --color "0E8A16" --description "Implementation complete, ready for code review"
gh label create "needs-changes" --color "E11D48" --description "Changes requested during review"
gh label create "duplicate" --color "CFD3D7" --description "This issue or PR already exists"
gh label create "wontfix" --color "FFFFFF" --description "Acknowledged but will not be addressed"
gh label create "invalid" --color "E4E4E4" --description "Not a valid issue or does not meet requirements"

# Priority labels
gh label create "critical priority" --color "B60205" --description "Must be fixed immediately — system unusable or data at risk"
gh label create "high priority" --color "D93F0B" --description "Important, should be addressed soon"
gh label create "medium priority" --color "FBCA04" --description "Should be addressed but not urgent"
gh label create "low priority" --color "0E8A16" --description "Nice to have, low urgency"

# Scope labels
gh label create "authentication" --color "C2E0C6" --description "Authentication and authorization"
gh label create "user interface" --color "BFD4F2" --description "User interface and components"
gh label create "database" --color "F9D0C4" --description "Database schema or queries"
gh label create "api" --color "FEF2C0" --description "API routes or server actions"
gh label create "deps" --color "E4E669" --description "Dependency updates"
gh label create "billing" --color "D4C5F9" --description "Billing and subscriptions"
gh label create "docs" --color "C5DEF5" --description "Documentation scope"

# Other labels
gh label create "dependencies" --color "0075CA" --description "Dependency update (used by Dependabot)"
gh label create "stale" --color "EDEDED" --description "No recent activity — will be closed if unaddressed"
gh label create "pinned" --color "0075CA" --description "Pinned — exempt from stale closure"
gh label create "do-not-close" --color "B60205" --description "Must not be automatically closed"
gh label create "needs-refinement" --color "FBCA04" --description "User story needs further discussion before implementation"
gh label create "user story" --color "D4C5F9" --description "Feature described from the user perspective"
gh label create "good first issue" --color "7057FF" --description "Good for newcomers"
gh label create "help wanted" --color "008672" --description "Extra attention or help is needed"

echo "✅ All labels created successfully"
