/**
 * POTHER GOLPO BOOKING BACKEND
 *
 * Google Sheet columns:
 * Timestamp | Name | Phone | Email | Destination | Package |
 * Travel Date | Return Date | Travelers | Message | Status
 *
 * IMPORTANT:
 * 1. Create a Google Sheet.
 * 2. Copy the Sheet ID from its URL.
 * 3. Paste it into SPREADSHEET_ID below.
 * 4. Deploy this script as a Web App.
 */

const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Bookings";

function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const headers = [
    "Timestamp",
    "Name",
    "Phone",
    "Email",
    "Destination",
    "Package",
    "Travel Date",
    "Return Date",
    "Travelers",
    "Message",
    "Status"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);

  return "Pother Golpo booking sheet is ready.";
}

function doGet() {
  return ContentService
    .createTextOutput("Pother Golpo booking API is running.");
}

function doPost(e) {
  try {
    if (!e || !e.parameter) {
      throw new Error("No form data received.");
    }

    const data = e.parameter;

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      setupSheet();
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.destination || "",
      data.package || "",
      data.date || "",
      data.returnDate || "",
      data.travelers || "",
      data.message || "",
      "New"
    ]);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message: "Booking received successfully."
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    console.error(error);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          message: error.message
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}
