## Description

Wordpress Page Builder Based on the new WordPress Editor.

## Development Workflow

### Branch names

-   When working on an issue, always create a new branch, its name should be as follow:
    If the task is to fix something: fix/[issue number], example: fix/32, fix/45,... etc
    If the task is for a new feature: feat/[issue number], example: feat/56, feat/78 ... etc

### pull requests

-   PRs should be merged to `develop` branch, not master
-   Make sure to link the issue to your pull request, so when we merge the branch it will automatically close.
-   Assign your colleague and ask him for review, PRs requires at least one approvement to be merged.

### Master Branch

we keep the `master` branch for production versions only, each commit to that branch should be linked to a specific version in repo.
this is gonna help us in the future to automate deployment to repository.

### Coding Standards in your workflow

1 - Install Prettier extension in your vs code: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

2- Enable `format on save` on the editor by following these steps: [steps](https://stackoverflow.com/questions/39494277/how-do-you-format-code-on-save-in-vs-code#answer-54665086)
