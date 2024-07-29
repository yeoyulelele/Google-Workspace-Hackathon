# HR Recruitment and Management System

## Overview

This project streamlines HR recruitment and management processes using Google Workspace tools, including:

1. Job Applications Submission via Google Forms.
2. Resume Screening using Gemini AI.
3. Interview Scheduling in AppSheet.
4. Employee Management in AppSheet.
5. Leave Applications via Google Forms and AppSheet.
6. Automated Emails for schedule notifications.

## Table of Contents

1. [Getting Started](#getting-started)
   - [AppSheet & Google Forms Links](#appsheet-links)
   - [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Usage](#usage)
5. [Support](#support)

## Getting Started
These instructions will help you set up the project.

### AppSheet & Google Forms Links

- **Run the App in Browser**: [Open AppSheet App](https://www.appsheet.com/start/c1421cb7-1920-461e-bc10-2ff3bb7c76f1)
- **Install the App on Mobile**: [Install AppSheet App](https://www.appsheet.com/newshortcut/c1421cb7-1920-461e-bc10-2ff3bb7c76f1)

- **Jobs Applications Form**: [Open Form](https://forms.gle/8vtRvKHq7ByAYtGc6)
- **Leave Application Form**: [Open Form](https://forms.gle/48nWK9D6JAZQqSZ29)

### Prerequisites

- Google Workspace account
- Google Sheets
- Google Forms
- Google Drive
- AppSheet
- Gemini AI API key

## Project Structure
```
HR-Recruitment-Management/
├── scripts/
│ ├── resumeScreening.gs
│ ├── passValue.gs
│ ├── sendEmail.gs
│ ├── updateEmployeeID.gs
├── forms/
│ ├── Jobs Applications (Google Form)
│ ├── Leave Application (Google Form)
├── sheets/
│ ├── Table1.gsheet
│     ├── Jobs Applications
│     ├── Interview Schedule
│     ├── Profile
│     ├── Schedule
│     ├── Leave Application Form
│     ├── Leave Schedule
└── README.md
```
## Features

### Job Applications Submission

Collect job applications and resumes using Google Forms linked to a Google Sheet.

### Resume Screening

Extract text from submitted PDF resumes and screen them using Gemini AI.

### Interview Scheduling

Schedule interviews in AppSheet based on resume screening results.

### Employee Management

Add, edit, and delete employee data in AppSheet, and schedule training sessions.

### Leave Applications

Use a Google Form for leave applications, managed and approved/declined in AppSheet.

### Automated Emails

Send emails to inform about schedule arrangements.

## Usage

1. Set up Google Forms for job and leave applications.
2. Link forms to Google Sheets.
3. Deploy scripts in Google Apps Script.
4. Configure AppSheet applications for interview scheduling and employee management.
   
## Support
For any issues or questions, please contact yeoyule66@gmail.com.
