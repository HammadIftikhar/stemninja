/**
 * ══════════════════════════════════════════════════════════
 * STEM NINJA — Google Apps Script
 * 
 * SETUP:
 * 1. Open your Google Sheet (create one called "STEM Ninja Sign-Ups")
 * 2. Extensions → Apps Script → paste this entire file
 * 3. Deploy → New Deployment → Web App
 *    - Execute as: Me (your Gmail)
 *    - Who has access: Anyone
 * 4. Copy the Web App URL → paste into signup.html SCRIPT_URL
 * 
 * WHAT THIS DOES:
 * - Saves every submission to the Google Sheet
 * - Sends YOU an instant notification email with all details
 * - Sends the STUDENT a personalised reply email with:
 *     - Their details confirmed
 *     - Booking links based on subject chosen (Preply / Superprof)
 *     - Patreon Google Calendar link
 * ══════════════════════════════════════════════════════════
 */

// ── CONFIG — update these ──────────────────────────────────
const YOUR_EMAIL        = 'your@gmail.com';          // your Gmail
const YOUR_NAME         = 'Hammad Iftikhar';
const PREPLY_PHYSICS    = 'https://preply.com/en/tutor/YOUR_ID';
const SUPERPROF_PHYSICS = 'https://www.superprof.com/YOUR_PHYSICS_PROFILE';
const SUPERPROF_MATHS   = 'https://www.superprof.com/YOUR_MATHS_PROFILE';
const PATREON_CALENDAR  = 'https://www.patreon.com/stemninja'; // replace with direct GCal link once set
const WHATSAPP_LINK     = 'https://wa.me/923230109633';
// ──────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    saveToSheet(data);
    notifyTutor(data);
    replyToStudent(data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── 1. Save to Google Sheet ─────────────────────────────────
function saveToSheet(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Sign-Ups');
  if (!sheet) {
    sheet = ss.insertSheet('Sign-Ups');
    sheet.appendRow(['Timestamp','Name','Email','WhatsApp','Level','Subject','Current Grade','Exam Date','Notes']);
    sheet.getRange(1,1,1,9).setFontWeight('bold');
  }
  sheet.appendRow([
    new Date().toLocaleString(),
    d.name || '', d.email || '', d.whatsapp || '',
    d.level || '', d.subject || '', d.grade || '',
    d.examdate || '', d.notes || ''
  ]);
}

// ── 2. Notify you instantly ─────────────────────────────────
function notifyTutor(d) {
  const subject = `🥷 New Sign-Up: ${d.name} — ${d.subject} (${d.level})`;
  const body = `
New STEM Ninja sign-up received!

━━━━━━━━━━━━━━━━━━━━━━━━
Student: ${d.name}
Email:   ${d.email}
WhatsApp:${d.whatsapp || 'not provided'}
Level:   ${d.level}
Subject: ${d.subject}
Grade:   ${d.grade || 'not provided'}
Exam:    ${d.examdate || 'not provided'}
Notes:   ${d.notes || 'none'}
━━━━━━━━━━━━━━━━━━━━━━━━

Reply to student: ${d.email}
  `;
  GmailApp.sendEmail(YOUR_EMAIL, subject, body);
}

// ── 3. Smart auto-reply to student ─────────────────────────
function replyToStudent(d) {
  if (!d.email) return;

  // Work out which booking links to include based on subject
  const subj = (d.subject || '').toLowerCase();
  const isPhysics = subj.includes('physics') || subj.includes('both');
  const isMaths   = subj.includes('maths')   || subj.includes('math') || subj.includes('both');

  let bookingLinks = '';
  if (isPhysics) {
    bookingLinks += `• Book Physics on Preply:    ${PREPLY_PHYSICS}\n`;
    bookingLinks += `• Book Physics on Superprof: ${SUPERPROF_PHYSICS}\n`;
  }
  if (isMaths) {
    bookingLinks += `• Book Maths on Superprof:   ${SUPERPROF_MATHS}\n`;
  }
  bookingLinks += `• Book via Patreon Calendar: ${PATREON_CALENDAR}\n`;

  const subject = `Welcome to STEM Ninja, ${d.name}! 🥷 Here are your next steps`;

  const body = `
Hi ${d.name},

Thank you for signing up to STEM Ninja! I've received your details and I'll be in touch within 24 hours.

Here's a summary of what you signed up for:
━━━━━━━━━━━━━━━━━━━━━━━━
Level:   ${d.level}
Subject: ${d.subject.replace(/_/g,' ')}
Grade:   ${d.grade || 'not provided'}
Exam:    ${d.examdate || 'not provided'}
━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS — How to book your FREE demo lesson:
${bookingLinks}
If you'd prefer to reach me directly:
• WhatsApp: ${WHATSAPP_LINK}

Looking forward to working with you!

— ${YOUR_NAME}
STEM Ninja | linktr.ee/stemninja
  `.trim();

  GmailApp.sendEmail(d.email, subject, body, {
    name: `${YOUR_NAME} | STEM Ninja`,
    replyTo: YOUR_EMAIL
  });
}
