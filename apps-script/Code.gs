/**
 * Hotel CYA INN lead-capture endpoint (Google Apps Script).
 *
 * Setup:
 * 1) Create a Google Sheet (or use an existing one)
 * 2) Extensions → Apps Script
 * 3) Paste this file into Code.gs
 * 4) Set SPREADSHEET_ID (from the Sheet URL)
 * 5) Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
 * 6) Copy the Web app URL and paste into `index.html` → SCRIPT_URL
 */

const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Leads'; // change if you want a different tab name

function doGet(e) {
  const params = (e && e.parameter) ? e.parameter : {};

  const timestamp = new Date();
  const name = (params.name || '').toString().trim();
  const phone = (params.phone || '').toString().trim();

  const institute = (params.institute || '').toString().trim(); // optional
  const source = (params.source || 'qr').toString().trim();     // optional

  if (!name || !phone) {
    return ContentService
      .createTextOutput('missing name/phone')
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss, SHEET_NAME);

  ensureHeader_(sheet);
  sheet.appendRow([timestamp, name, phone, institute, source]);

  return ContentService
    .createTextOutput('ok')
    .setMimeType(ContentService.MimeType.TEXT);
}

function ensureHeader_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, 5).getValues()[0];
  const isEmpty = firstRow.every((cell) => !cell);
  if (!isEmpty) return;

  sheet.getRange(1, 1, 1, 5).setValues([[
    'Timestamp',
    'Name',
    'Phone',
    'Institute',
    'Source',
  ]]);
}

function getOrCreateSheet_(ss, name) {
  const existing = ss.getSheetByName(name);
  if (existing) return existing;
  return ss.insertSheet(name);
}

