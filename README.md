# TurboRepo and Monorepos Documentation

## Introduction

### What is a Monorepo?

A **monorepo** (monolithic repository) is a single repository that stores the code for multiple projects. This approach offers several advantages, including:

- **Shared Dependencies**: Simplifies dependency management across projects.
- **Code Reuse**: Facilitates sharing code between different projects.
- **Consistent Tooling**: Ensures consistent linting, testing, and build processes.
- **Simplified Refactoring**: Easier to make large-scale changes across projects.

### What is TurboRepo?

**TurboRepo** is a high-performance build system for JavaScript and TypeScript monorepos, developed by Vercel. It provides features such as efficient task execution, advanced caching, and parallel processing to streamline the development process.
**Turborepo** is a tool to run tasks and kind of organize our builds and piplines for running different tasks

## Key Features of TurboRepo

1. **Task Scheduling**: Efficiently define and run tasks across your monorepo.
2. **Caching**: Avoid redundant work by caching task results.
3. **Parallel Execution**: Speed up builds by running multiple tasks in parallel.
4. **Custom Pipelines**: Tailor complex workflows to your project's needs.
5. **Remote Caching**: Share cache results across different environments for optimized build times.

## Installation

### Prerequisites

Ensure you have Node.js and npm or yarn installed on your system.

### Installing TurboRepo

```bash
npm install turbo --global
```

### Initializing Turborepo in our project

Navigate to the root of your monorepo and initialize TurboRepo:

```bash
npx turbo init
```
### Configuration of turborepo :

**TurboRepo** uses a turbo.json file for configuration. This file defines your pipelines and task dependencies.

#### Sample turbo.json Configuration :
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```
**In this example :** The build task depends on the build tasks of its dependencies.
The test task depends on the build task.

### Basic Usage :

#### Running tasks with turborepo :

Use the `turbo run` command to execute tasks defined in `turbo.json` file.

#### Running a single task :

```bash
turbo run build
```

#### Running multiple tasks :

```bash
turbo run build test
```
### Advanced Features

#### custom piplines

Define custom pipelines to handle complex workflows.

```json
{
  "pipeline": {
    "lint": {},
    "build": {
      "dependsOn": ["lint"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}

```

#### Caching

TurboRepo caches task outputs by default. Configure caching behavior in the turbo.json file.

```json
{
  "pipeline": {
    "build": {
      "cache": true
    },
    "test": {
      "cache": false
    }
  }
}

```

#### Remote Caching

Set up remote caching to share cached results across different environments. This is particularly useful in CI/CD pipelines.

```json
{
  "remoteCache": {
    "enabled": true,
    "store": "s3://my-turbo-cache"
  }
}

```

#### Integration with CI/CD

Integrate TurboRepo into your CI/CD pipeline to leverage its caching and parallel execution capabilities.

##### what is CI(Continuous Integration)

Continuous Integration is the practice of frequently merging code changes into a shared repository. Each change is automatically built and tested to detect issues early. The main goals of CI are to improve code quality and reduce integration problems.

##### What is CD(Continuous Deployment/Delivery)

Continuous Deployment refers to the practice of automatically deploying every change that passes the CI process to production. This ensures that the latest version of the application is always available to users.

Continuous Delivery, on the other hand, means that code changes are automatically prepared for a release to production but require a manual trigger to deploy. It ensures that the codebase is always in a deployable state.

##### Benefits of CI/CD

**Early Bug Detection:** Catch and fix issues early in the development cycle.
**Faster Development:** Speed up the development process by automating repetitive tasks.
**Improved Code Quality:** Ensure code quality through automated testing and code reviews.
**Consistent Deployments:** Reduce deployment errors by automating the deployment process.
**Increased Collaboration:** Enhance collaboration among team members by providing immediate feedback on code changes.

##### How to Integrate TurboRepo with CI/CD

To integrate TurboRepo with a CI/CD pipeline, you need to set up your CI/CD tool (such as GitHub Actions, GitLab CI, CircleCI, Jenkins, etc.) to run TurboRepo commands automatically whenever code changes are pushed to the repository.

##### Example of github actions

GitHub Actions is a popular CI/CD tool that integrates seamlessly with GitHub repositories. Here’s an example of how to set up a basic CI/CD pipeline using GitHub Actions and TurboRepo:

###### Create a Github Actions Workflow File

In our repository, we create a directory called .github/workflows and a file named ci.yml inside it.

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run build
      run: npx turbo run build

    - name: Run tests
      run: npx turbo run test

```

###### Explanation :

**Trigger:** The workflow is triggered on every push and pull request to the main branch.
**Job:** A single job named build is defined, running on the ubuntu-latest virtual environment.
**Steps:**
**Checkout:** Check out the repository code.
**Setup Node.js:** Set up Node.js with the specified version (e.g., 14).
**Install Dependencies:** Install project dependencies using npm.
**Run Build:** Run the build task using TurboRepo.
**Run Tests:** Run the test task using TurboRepo.
