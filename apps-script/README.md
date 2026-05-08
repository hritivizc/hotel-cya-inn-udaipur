# Google Sheet + Apps Script setup

This site uses a Google Apps Script Web App to save leads into a Google Sheet.

## 1) Create the Google Sheet

1. Create a new Google Sheet (example name: `CYA INN Leads`).
2. Copy the **Spreadsheet ID** from the URL:
   - Example: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit#gid=0`

## 2) Create the Apps Script

1. In the Google Sheet: **Extensions → Apps Script**
2. Replace the code in `Code.gs` with the contents of `apps-script/Code.gs` from this repo.
3. Set:
   - `SPREADSHEET_ID = '...'`
   - (Optional) `SHEET_NAME = 'Leads'`

## 3) Deploy as Web App

1. Click **Deploy → New deployment**
2. Select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/.../exec`)

## 4) Paste the Web App URL into the website

Update:

- `index.html` → `SCRIPT_URL`

Example:

```js
const SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec';
```

## Test

Open the live site and submit a name + phone. A new row should appear in the Sheet tab `Leads`.

