/**
 * UPCYCLE Brews & Bites — catering quote intake.
 *
 * Deployed as a Web App (see google-apps-script/README.md for setup steps).
 * Receives the quote breakdown from the site's catering calculator, renders
 * it as a PDF, and sends two emails: an internal notification to
 * RECIPIENT_EMAIL, and (if the requester gave a valid-looking email) a
 * separate confirmation email to the requester with its own message and
 * the same PDF attached. These are two distinct sendEmail calls rather than
 * a Bcc, since a Bcc'd copy is always identical to the primary email and
 * can't carry different, customer-facing wording.
 */

var RECIPIENT_EMAIL = 'info@upcyclebrews.com';
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Google Sheet that collects newsletter signups. Create a Sheet, copy the
// long ID out of its URL (.../spreadsheets/d/THIS_PART/edit), and paste it
// here — then redeploy (Manage deployments -> Edit -> New version). Signups
// silently fail with 'newsletter_not_configured' until this is filled in.
var NEWSLETTER_SHEET_ID = '1_spVzvZNo3VHRlQql73v3adok1576x0KPoHmFxizi88';
var NEWSLETTER_SHEET_NAME = 'Newsletter';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Optional hardening: uncomment to require a shared secret the front end
    // sends alongside the payload, rejecting anything else. Set the same
    // value in src/data.ts's QUOTE_ENDPOINT_SECRET if you enable this.
    // if (data.secret !== 'REPLACE_WITH_A_RANDOM_STRING') {
    //   return jsonResponse({ ok: false, error: 'unauthorized' });
    // }

    if (data.type === 'newsletter') {
      return handleNewsletterSignup(data);
    }

    var pdfBlob = buildQuotePdf(data);
    var requesterEmail = data.email && EMAIL_RE.test(data.email) ? data.email : null;

    GmailApp.sendEmail(RECIPIENT_EMAIL, buildInternalSubject(data), buildInternalBody(data), {
      attachments: [pdfBlob],
      name: 'UPCYCLE Brews & Bites Website',
    });

    if (requesterEmail) {
      GmailApp.sendEmail(requesterEmail, buildConfirmationSubject(), buildConfirmationBody(data), {
        attachments: [pdfBlob],
        name: 'UPCYCLE Brews & Bites',
      });
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function handleNewsletterSignup(data) {
  var email = data.email && EMAIL_RE.test(data.email) ? data.email : null;
  if (!email) {
    return jsonResponse({ ok: false, error: 'invalid_email' });
  }
  if (!NEWSLETTER_SHEET_ID) {
    return jsonResponse({ ok: false, error: 'newsletter_not_configured' });
  }

  var spreadsheet = SpreadsheetApp.openById(NEWSLETTER_SHEET_ID);
  var sheet = spreadsheet.getSheetByName(NEWSLETTER_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(NEWSLETTER_SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Email']);
  }
  sheet.appendRow([new Date(), email]);

  GmailApp.sendEmail(RECIPIENT_EMAIL, buildNewsletterInternalSubject(), buildNewsletterInternalBody(email, spreadsheet.getUrl()), {
    name: 'UPCYCLE Brews & Bites Website',
  });

  GmailApp.sendEmail(email, buildNewsletterWelcomeSubject(), buildNewsletterWelcomeBody(), {
    name: 'UPCYCLE Brews & Bites',
  });

  return jsonResponse({ ok: true });
}

function buildNewsletterInternalSubject() {
  return 'New Newsletter Signup — UPCYCLE Brews & Bites';
}

function buildNewsletterInternalBody(email, sheetUrl) {
  return ['A new member just signed up for the newsletter from the website.', '', 'Email: ' + email, '', 'View the full list: ' + sheetUrl].join(
    '\n',
  );
}

function buildNewsletterWelcomeSubject() {
  return "You're In! Welcome to UPCYCLE Brews & Bites";
}

function buildNewsletterWelcomeBody() {
  return [
    'Hi there,',
    '',
    "Thanks for joining the UPCYCLE Brews & Bites newsletter! You'll be the first to hear about new pop-up locations, seasonal menu drops, and event announcements.",
    '',
    "We'll only send the good stuff — no spam, promise.",
    '',
    'See you soon,',
    'UPCYCLE Brews & Bites',
  ].join('\n');
}

function buildInternalSubject(data) {
  return 'UPCYCLE Web Quote Request — ($' + data.grandTotal + ')';
}

function buildInternalBody(data) {
  var lines = [
    'A new catering quote request came in from the website.',
    'See the attached PDF for the full breakdown.',
    '',
    'Name: ' + (data.name || '(not given)'),
    'Email: ' + (data.email || '(not given)'),
    'Phone: ' + (data.phone || '(not given)'),
    'Tentative Event Date: ' + (formatDate(data.eventDate) || '(not given)'),
  ];
  if (data.altDate) {
    lines.push('Alternative Date: ' + formatDate(data.altDate));
  }
  lines.push('');
  lines.push('Adults: ' + data.adults + (data.children ? '\nChildren: ' + data.children : ''));
  lines.push('Estimated Total: $' + data.grandTotal);
  return lines.join('\n');
}

function buildConfirmationSubject() {
  return 'Your Quote Request — UPCYCLE Brews & Bites';
}

function buildConfirmationBody(data) {
  var firstName = data.name ? String(data.name).split(' ')[0] : 'there';
  var eventDate = formatDate(data.eventDate);
  return [
    'Hi ' + firstName + ',',
    '',
    "Thanks for requesting a quote from UPCYCLE Brews & Bites! Your request has been submitted — attached is a copy of your quote estimate for your records.",
    '',
    (eventDate ? "We'll follow up within 24–48 hours to confirm your " + eventDate + ' date and finalize your quote.' : "We'll follow up within 24–48 hours to confirm the details and finalize your quote."),
    '',
    'Estimated Total: $' + data.grandTotal,
    '',
    'Questions in the meantime? Just reply to this email, or reach us at info@upcyclebrews.com / 845.428.2687.',
    '',
    'See you soon,',
    'UPCYCLE Brews & Bites',
  ].join('\n');
}

function buildQuotePdf(data) {
  var html = buildQuoteHtml(data);
  return Utilities.newBlob(html, 'text/html', 'quote.html')
    .getAs('application/pdf')
    .setName('UPCYCLE-Catering-Quote.pdf');
}

function buildQuoteHtml(data) {
  var lines = data.summaryLines || [];
  var rows = lines
    .map(function (line) {
      var note = line.note
        ? '<div style="font-size:11px;color:#666;margin-top:2px">' + escapeHtml(line.note) + '</div>'
        : '';
      return (
        '<tr>' +
        '<td style="padding:8px 0;border-bottom:1px dotted #ccc">' + escapeHtml(line.label) + note + '</td>' +
        '<td style="padding:8px 0;border-bottom:1px dotted #ccc;text-align:right;font-weight:bold;white-space:nowrap">$' +
        line.value +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  var guestLine =
    'Adults: ' + data.adults + (data.children ? ' &nbsp;&middot;&nbsp; Children: ' + data.children : '');

  var contactRows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Tentative Event Date', formatDate(data.eventDate)],
    ['Alternative Date', formatDate(data.altDate)],
  ]
    .filter(function (pair) {
      return pair[1];
    })
    .map(function (pair) {
      return (
        '<div><span style="color:#888">' + pair[0] + ':</span> ' + escapeHtml(pair[1]) + '</div>'
      );
    })
    .join('');

  return (
    '<html><body style="font-family:Arial,sans-serif;color:#222;padding:24px;max-width:640px">' +
    '<h1 style="font-size:20px;margin:0 0 4px">UPCYCLE Brews &amp; Bites</h1>' +
    '<div style="color:#666;margin-bottom:16px">Catering Quote Estimate</div>' +
    (contactRows ? '<div style="font-size:13px;margin-bottom:12px;line-height:1.6">' + contactRows + '</div>' : '') +
    '<div style="margin-bottom:12px;font-size:13px">' + guestLine + '</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px">' + rows + '</table>' +
    '<div style="display:flex;justify-content:space-between;padding-top:16px;font-size:18px;font-weight:bold">' +
    '<span>Estimated Total</span><span>$' + data.grandTotal + '</span>' +
    '</div>' +
    '<p style="font-size:11px;color:#888;margin-top:24px">' +
    'A $250 non-refundable deposit secures your date. All packages include insurance liability. ' +
    'Travel fees for Off-Site/Private events beyond 30 miles discussed upon consultation.' +
    '</p>' +
    '</body></html>'
  );
}

/** "2027-01-15" -> "January 15, 2027". Returns '' for anything that isn't a plain yyyy-mm-dd string. */
function formatDate(iso) {
  if (!iso) return '';
  var parts = String(iso).split('-');
  if (parts.length !== 3) return '';
  var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  if (isNaN(d.getTime())) return '';
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'MMMM d, yyyy');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
