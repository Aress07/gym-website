/**
 * ADRENAL'IN — Reservation web app (Google Apps Script)
 *
 * Deploy as a Web App (execute as: Me; access: Anyone), then put the
 * /exec URL in NEXT_PUBLIC_SHEETS_API_URL and the TOKEN below in
 * NEXT_PUBLIC_SHEETS_API_TOKEN (and GSCRIPT_TOKEN_* placeholders below).
 */

var TOKEN = PropertiesService.getScriptProperties().getProperty('TOKEN') || 'CHANGE_ME';
var STUDIO_EMAIL = PropertiesService.getScriptProperties().getProperty('STUDIO_EMAIL') || 'CHANGE_ME';
var STUDIO_PHONE = '06.86.44.36.43';
var TRIAL_PRICE = '10 €';
var COURSE_TABS = {
  RESERVATIONS: 'Réservations',
  INSTRUCTORS: 'Instructeurs',
};

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: 'adrenalin-reservation' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'missing-body' }, 400);
    }
    if (e.parameter.token !== TOKEN) {
      return json_({ ok: false, error: 'invalid-token' }, 401);
    }

    var data = JSON.parse(e.postData.contents);
    var payload = {
      site: String(data.site || ''),
      name: String(data.name || '').trim(),
      email: String(data.email || '').trim(),
      phone: String(data.phone || '').trim(),
      course: String(data.course || '').trim(),
      level: String(data.level || '').trim(),
      slot: String(data.slot || '').trim(),
      message: String(data.message || '').trim(),
      lang: String(data.lang || 'fr'),
    };

    if (payload.site !== 'adrenalin-website') {
      return json_({ ok: false, error: 'bad-site' }, 400);
    }
    if (!payload.name || !payload.email || !payload.phone || !payload.course || !payload.level || !payload.slot) {
      return json_({ ok: false, error: 'missing-fields' }, 400);
    }

    var now = new Date();
    var ref = 'ADN-' + Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd') + '-' + randomRef();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var resSheet = getOrCreateSheet_(ss, COURSE_TABS.RESERVATIONS, [
      'Date', 'Référence', 'Nom', 'Téléphone', 'Email', 'Cours', 'Niveau', 'Créneau souhaité', 'Message', 'Langue',
    ]);
    resSheet.appendRow([
      now, ref, payload.name, payload.phone, payload.email,
      payload.course, payload.level, payload.slot, payload.message, payload.lang,
    ]);

    var instrSheet = getOrCreateSheet_(ss, COURSE_TABS.INSTRUCTORS, [
      'Date', 'Référence', 'Nom', 'Email', 'Cours', 'Niveau', 'Créneau souhaité', 'Téléphone', 'Message', 'Statut',
    ]);
    instrSheet.appendRow([
      now, ref, payload.name, payload.email, payload.course, payload.level,
      payload.slot, payload.phone, payload.message, 'À traiter',
    ]);

    sendInvoices_(payload, ref);

    return json_({ ok: true, ref: ref }, 200);
  } catch (err) {
    return json_({ ok: false, error: 'server-error', detail: String(err) }, 500);
  }
}

function sendInvoices_(payload, ref) {
  var subject =
    "[ADRENAL'IN] Votre demande de cours d'essai à 10 € — Réf " + ref;

  var rowsHtml = [
    ['Référence', ref],
    ['Nom', payload.name],
    ['Téléphone', payload.phone],
    ['Cours choisi', payload.course],
    ['Niveau', payload.level],
    ['Créneau souhaité', payload.slot],
  ]
    .map(function (r) {
      return '<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;color:#090186;font-weight:700;white-space:nowrap">' +
        escape_(r[0]) + '</td><td style="padding:6px 10px;border-bottom:1px solid #eee">' +
        escape_(r[1]) + '</td></tr>';
    })
    .join('');

  if (payload.message) {
    rowsHtml += '<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;color:#090186;font-weight:700">Message</td>' +
      '<td style="padding:6px 10px;border-bottom:1px solid #eee">' + escape_(payload.message) + '</td></tr>';
  }

  var clientHtml =
    '<div style="font-family:Montserrat,Helvetica,Arial,sans-serif;color:#161619;max-width:560px;margin:0 auto">' +
    '<div style="background:#090186;border-radius:16px 16px 0 0;padding:18px 24px">' +
    '<span style="color:#ff1ea2;font-weight:800;font-size:20px">ADRENAL\'IN</span>' +
    '<span style="color:#ffffff;font-size:12px;margin-left:8px">Danse · Fitness · Pilates</span></div>' +
    '<div style="border:1px solid #eee;border-top:none;border-radius:0 0 16px 16px;padding:24px">' +
    '<h1 style="font-size:17px;margin:0 0 6px">Merci ' + escape_(payload.name) + ' !</h1>' +
    '<p style="font-size:14px;line-height:1.6;margin:0 0 14px">Votre demande de <strong>cours d\u2019essai à ' +
    TRIAL_PRICE + '</strong> est bien enregistrée. Détail de votre demande :</p>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px">' + rowsHtml + '</table>' +
    '<p style="font-size:13px;line-height:1.6;color:#a3a0a2;margin:14px 0 0">Le montant de ' + TRIAL_PRICE +
    ' sera déductible de votre inscription. L\u2019équipe ADRENAL\'IN vous confirmera votre créneau par téléphone.</p>' +
    '<p style="font-size:12px;color:#a3a0a2;margin:14px 0 0">ADRENAL\'IN — 1425 Avenue Octave Butin, 60280 ' +
    'Margny-lès-Compiègne — ' + STUDIO_PHONE + '</p></div></div>';

  MailApp.sendEmail(payload.email, subject, '', { htmlBody: clientHtml });

  if (STUDIO_EMAIL && STUDIO_EMAIL !== 'CHANGE_ME' && payload.email.toLowerCase() !== STUDIO_EMAIL.toLowerCase()) {
    var studioHtml = clientHtml +
      '<p style="font-size:12px;color:#a3a0a2">Copie interne — traiter la demande dans la feuille « ' +
      COURSE_TABS.INSTRUCTORS + ' ».</p>';
    MailApp.sendEmail(STUDIO_EMAIL, '[Copie] ' + subject, '', { htmlBody: studioHtml });
  }
}

function randomRef() {
  var chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var out = '';
  for (var i = 0; i < 4; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

function getOrCreateSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setFontColor('#ffffff');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#090186');
  }
  return sheet;
}

function escape_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json_(obj, code) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}