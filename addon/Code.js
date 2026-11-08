// ================================================================
// Structory Green — add-on Google Sheets.
//
// Rôle :
//   1. ajouter le menu « Structory Green » dans le classeur ;
//   2. ouvrir un volet qui affiche https://structory.ai/green-embed/ ;
//   3. à la demande de la page, ouvrir le Communicator de l'espace choisi, avec un billet
//      à usage unique obtenu côté serveur (jamais le jeton de session dans une URL).
// Aucune logique de calcul ici : le calcul carbone reste dans le module Python.
//
// Contrat de messages : repris de Suivre Mes Comptes (addon/Panneau.js). Le volet n'accepte un
// message que s'il vient de https://structory.ai ET de la fenêtre de ce cadre.
// Pas de backtick, d'antislash ni de ${ dans le HTML (piège Apps Script).
//
// À CONFIRMER (décisions D1 et D2, issue #10) : route serveur et URL du Communicator partagé.
// Tant qu'elles ne sont pas confirmées, COMMUNICATOR_URL reste vide et le billet n'est pas demandé.
// ================================================================

const GREEN_URL = 'https://structory.ai/green-embed/';
const ORIGINE = 'https://structory.ai';
const API_URL = 'https://api.precogn.org';
const TICKET_PATH = '/api/sheet/embed-ticket'; // À CONFIRMER (D1)
const COMMUNICATOR_URL = ''; // À CONFIRMER (D1) : Communicator partagé

// Appelé à l'ouverture du classeur : crée le menu de l'add-on.
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Ouvrir Structory Green', 'ouvrirPanneau')
    .addToUi();
}

// Sans onInstall, le menu n'apparaît pas à la première installation.
function onInstall(e) {
  onOpen(e);
}

function ouvrirPanneau() {
  const html = HtmlService.createHtmlOutput(panneauHtml_()).setTitle('Structory Green');
  SpreadsheetApp.getUi().showSidebar(html);
}

// Carte de la page d'accueil de l'add-on (panneau latéral Workspace).
function onHomepage(e) {
  const section = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph()
      .setText('Ouvrez le volet Structory Green depuis le menu Extensions.'));
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Structory Green'))
    .addSection(section)
    .build();
}

// ── Appelé par la page du volet (google.script.run) ───────────────

// Adresse du Communicator de l'espace : billet neuf à chaque ouverture (60 s, usage unique).
// Retourne { success, url } ou { success: false, message }. Jamais le jeton de session.
function communicatorUrlFor(orgId) {
  try {
    if (!COMMUNICATOR_URL) return { success: false, message: 'Communicator non configuré.' };
    const ticket = getTicket_(String(orgId));
    return { success: true, url: COMMUNICATOR_URL + '?orgId=' + encodeURIComponent(String(orgId))
      + '&embed=1&ticket=' + encodeURIComponent(ticket) };
  } catch (err) {
    return { success: false, message: 'Impossible d’ouvrir le Communicator.' };
  }
}

// Billet à usage unique, demandé au serveur avec le jeton d'identité Google.
function getTicket_(orgId) {
  const token = ScriptApp.getIdentityToken();
  const resp = UrlFetchApp.fetch(API_URL + TICKET_PATH, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ orgId: orgId }),
    muteHttpExceptions: true
  });
  if (resp.getResponseCode() !== 200) throw new Error('ticket');
  const data = JSON.parse(resp.getContentText());
  if (!data.ticket) throw new Error('ticket');
  return data.ticket;
}

// ── Page du volet ─────────────────────────────────────────────────

function panneauHtml_() {
  const css = [
    'html,body{height:100%;margin:0;font:13px Arial,sans-serif;background:#1c1917;color:#f5f5f4}',
    '#top{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#1c1917;border-bottom:3px solid #f59e0b}',
    '#marque{flex:1;font-size:15px;font-weight:700}',
    '#aide{width:28px;height:28px;border-radius:14px;border:2px solid #f59e0b;background:transparent;color:#f59e0b;font-weight:700;cursor:pointer}',
    '#msg{padding:0 12px;color:#fbbf24;white-space:pre-wrap}',
    'iframe{border:0;width:100%;height:calc(100% - 54px);background:#1c1917}',
    '#cadre{display:none}'
  ].join('');
  const js = [
    'var S={vue:"org"};',
    'function dire(m){document.getElementById("msg").textContent=m||"";}',
    'function montrer(vue){S.vue=vue;document.getElementById("green").style.display=vue==="org"?"block":"none";',
    ' document.getElementById("cadre").style.display=vue==="communicator"?"block":"none";}',
    'function ouvrirCommunicator(id){dire("");google.script.run.withSuccessHandler(function(r){',
    ' if(!r||!r.success){dire(r&&r.message?r.message:"Erreur");return;}',
    ' document.getElementById("cadre").src=r.url;montrer("communicator");}).withFailureHandler(function(x){dire(String(x));}).communicatorUrlFor(id);}',
    'window.addEventListener("message",function(ev){',
    ' var d=ev.data;',
    ' if(ev.origin!==ORIGINE||ev.source!==document.getElementById("green").contentWindow||!d||typeof d.type!=="string")return;',
    ' if(d.type==="structory:ready"){dire("");}',
    ' else if(d.type==="structory:auth-error"){dire(MSG_AUTH);}',
    ' else if(d.type==="structory:open-communicator"&&d.orgId){ouvrirCommunicator(String(d.orgId));}',
    ' else if(d.type==="structory:switch-org"){montrer("org");}',
    '});'
  ].join('\n');
  const consts = 'var ORIGINE=' + JSON.stringify(ORIGINE) + ',MSG_AUTH=' + JSON.stringify('Connexion au module requise.') + ';';
  return '<!DOCTYPE html><html><head><base target="_top"><style>' + css + '</style></head><body>' +
    '<div id="top"><div id="marque">Structory Green</div></div>' +
    '<p id="msg"></p>' +
    '<iframe id="green" src="' + GREEN_URL + '" title="Structory Green"></iframe>' +
    '<iframe id="cadre" title="Communicator"></iframe>' +
    '<script>' + consts + '\n' + js + '</script></body></html>';
}
