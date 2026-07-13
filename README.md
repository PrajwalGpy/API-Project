# API Project

## Project Overview

This repository contains an automated test suite for the Restful Booker API. It verifies authentication and booking lifecycle functionality through Playwright Test, ensuring the API returns correct responses for create, read, update, and delete operations.

This is an API validation project, not a production application.

## Technical Architecture

| Component | Technology | Responsibility |
| --- | --- | --- |
| Test runner | Playwright Test | Executes API scenarios, manages retries, and collects results |
| HTTP client | Playwright `request` API | Sends authenticated and unauthenticated JSON requests |
| API modules | `/api` | Encapsulates endpoint calls for auth and booking operations |
| Utilities | `/utility` | Provides shared request abstraction and payload generation |
| Test data | `/test-data` | Stores valid user credentials and booking payload fixtures |
| Configuration | `playwright.config.js` | Defines base URL, reporter settings, browser projects, and execution behavior |

## Folder Structure

| Path | Description |
| --- | --- |
| `/api` | Reusable API wrappers for auth and booking endpoints |
| `/tests` | Playwright test cases that validate API behavior |
| `/utility` | Shared request helper and payload generator utilities |
| `/test-data` | Static JSON fixtures for users and booking payloads |
| `/playwright.config.js` | Playwright configuration for execution and reporting |
| `/package.json` | Scripts and development dependencies |

## Getting Started

These instructions assume Fedora with Zsh.

1. Install required packages:

```bash
sudo dnf install git nodejs npm
```

2. Verify the runtime:

```bash
node --version
npm --version
```

3. Clone the repository and change directory:

```bash
git clone <repository-url>
cd API-Project
```

4. Install dependencies:

```bash
npm install
```

5. Install Playwright browser dependencies:

```bash
npm run install:browsers
```

## Usage

### Run the full suite

```bash
npm test
```

### Run a specific test file

```bash
npx playwright test tests/booking.spec.js
```

### Run in headed mode

```bash
npm run test:headed
```

### Open the Playwright report

```bash
npm run report
```

### Generate Allure results

```bash
npm run allure:report
```

## Primary Use Cases

- Validate authentication with valid credentials and confirm token issuance.
- Create a booking record and assert the response payload.
- Retrieve a booking by ID and verify field values.
- Update an existing booking and confirm modifications.
- Delete a booking and validate removal behavior.

## Core Features

- Structured API client layer for authentication and booking endpoints
- Central request helper with JSON headers and token handling
- Data-driven payload generation and JSON fixture support
- Playwright multi-project configuration for consistent execution
- HTML and Allure reporting for test visibility
- Booking lifecycle workflow covering create, read, update, and delete operations

## Notes

- Python is not required for executing this suite.
- The base URL is configured for the public Restful Booker API.
