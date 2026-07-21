/**
 * UPCYCLE Brews & Bites — catering quote intake.
 *
 * Deployed as a Web App (see google-apps-script/README.md for setup steps).
 * Receives the quote breakdown from the site's catering calculator, renders
 * it as a PDF, and emails it to RECIPIENT_EMAIL as an attachment — Bcc'ing
 * the requester (if they gave a valid-looking email) as their confirmation
 * that the request went through.
 */

var RECIPIENT_EMAIL = 'info@upcyclebrews.com';
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Optional hardening: uncomment to require a shared secret the front end
    // sends alongside the payload, rejecting anything else. Set the same
    // value in src/data.ts's QUOTE_ENDPOINT_SECRET if you enable this.
    // if (data.secret !== 'REPLACE_WITH_A_RANDOM_STRING') {
    //   return jsonResponse({ ok: false, error: 'unauthorized' });
    // }

    var pdfBlob = buildQuotePdf(data);
    var requesterEmail = data.email && EMAIL_RE.test(data.email) ? data.email : null;

    var bodyLines = [
      'A new catering quote request came in from the website.',
      'See the attached PDF for the full breakdown.',
      '',
      'Name: ' + (data.name || '(not given)'),
      'Email: ' + (data.email || '(not given)'),
      'Phone: ' + (data.phone || '(not given)'),
      '',
      'Adults: ' + data.adults + (data.children ? '\nChildren: ' + data.children : ''),
      'Estimated Total: $' + data.grandTotal,
    ];

    GmailApp.sendEmail(RECIPIENT_EMAIL, buildSubject(data), bodyLines.join('\n'), {
      attachments: [pdfBlob],
      name: 'UPCYCLE Brews & Bites Website',
      bcc: requesterEmail || undefined,
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function buildSubject(data) {
  var who = data.name ? data.name + ' — ' : '';
  return 'Catering Quote Request — ' + who + 'UPCYCLE Brews & Bites';
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

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
