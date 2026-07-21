# Catering quote email backend (Google Apps Script)

Turns "Request This Quote" into a real submission: the site POSTs the quote
breakdown to this script, which renders it as a PDF and emails it to
`info@upcyclebrews.com` as an attachment — no `mailto:` link, no manual step.

## Deploy (5 minutes)

1. Sign in to the `info@upcyclebrews.com` Google Workspace account.
2. Go to [script.google.com](https://script.google.com) → **New project**.
3. Delete the placeholder `Code.gs` content and paste in the contents of
   this repo's `google-apps-script/Code.gs`.
4. Rename the project (top left) to something like "UPCYCLE Catering Quotes".
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me (info@upcyclebrews.com)**
   - Who has access: **Anyone**
   - Click **Deploy**.
6. The first deploy will prompt an authorization screen (this script is
   sending email as your own account, so Google requires you to approve it
   once) — click through **Advanced → Go to \[project name\] (unsafe)** if
   you see the "Google hasn't verified this app" warning. That warning is
   expected for a script you wrote yourself; you're authorizing your own
   code to use your own Gmail, not a third party.
7. Copy the **Web app URL** it gives you (ends in `/exec`).
8. Paste that URL as `QUOTE_ENDPOINT_URL` in `src/data.ts` in the main repo,
   commit, and push — the site will start submitting to it automatically.
   Until that constant is filled in, the site keeps using the old `mailto:`
   fallback, so nothing breaks in the meantime.

## Notes

- **Daily quota**: Workspace accounts get 1,500 `GmailApp.sendEmail()` calls/day
  — far more than a catering quote form will ever need.
- **Public endpoint**: "Who has access: Anyone" is required so the public
  website can POST to it without a Google login. This means anyone who
  discovers the URL could POST arbitrary data and trigger an email — low risk
  for a quote-request form, but if it ever gets abused/spammed, the fix is to
  add a shared-secret field the front end sends and the script checks before
  proceeding (see comment in `doPost` in `Code.gs` for where to add it).
- **Re-deploying after edits**: editing `Code.gs` in the script editor does
  NOT update the live `/exec` URL. Use **Deploy → Manage deployments → Edit
  (pencil icon) → New version → Deploy** to push code changes live.
- **Testing**: you can test the endpoint directly with:
  ```bash
  curl -X POST 'YOUR_WEB_APP_URL' \
    -H 'Content-Type: text/plain;charset=utf-8' \
    -d '{"adults":10,"children":0,"grandTotal":490,"summaryLines":[{"label":"Grazing Tables — Booking Fee","value":235},{"label":"Grazing Tables — Adults: 10 × $18/guest","value":180},{"label":"Tip Jar (18%)","value":75}]}'
  ```
  A `{"ok":true}` response means the email sent — check the
  `info@upcyclebrews.com` inbox for the PDF.
