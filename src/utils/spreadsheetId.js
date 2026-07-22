/**
 * Accept a raw spreadsheet ID or a full Google Sheets URL and return the ID.
 */
export function extractSpreadsheetId(input) {
  const trimmed = String(input || '').trim()
  if (!trimmed) {
    return ''
  }

  const fromPath = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  if (fromPath?.[1]) {
    return fromPath[1]
  }

  const fromQuery = trimmed.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  if (fromQuery?.[1]) {
    return fromQuery[1]
  }

  return trimmed.split(/[/?#]/)[0]
}
