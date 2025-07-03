import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const { data } = req.body;
    
    // Append data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:Z', // Adjust range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values: [data], // data should be an array like ['John', 'Doe', 'john@email.com']
      },
    });

    res.status(200).json({ message: 'Data added successfully', response: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error adding data to sheet' });
  }
}