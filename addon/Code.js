// ================================================================
// Structory Green — add-on Google Sheets (version 0).
//
// Rôle, et rien d'autre :
//   1. ajouter le menu « Structory Green » dans le classeur ;
//   2. ouvrir un volet qui affiche https://structory.ai/green-embed/.
// Aucune logique de calcul ici : le calcul carbone reste dans le module Python.
//
// Contrat de messages : repris de Suivre Mes Comptes (addon/Panneau.js). Le volet n'accepte un
// message que s'il vient de https://structory.ai ET de la fenêtre de ce cadre. Green n'a pas de
// Communicator : « structory:open-communicator » et « structory:switch-org » sont donc ignorés.
// Pas de backtick, d'antislash ni de ${ dans le HTML (piège Apps Script).
// ================================================================

const GREEN_URL = 'https://structory.ai/green-embed/';
const ORIGINE = 'https://structory.ai';

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

// ── Page du volet ─────────────────────────────────────────────────

function panneauHtml_() {
  const css = [
    'html,body{height:100%;margin:0;font:13px Arial,sans-serif;background:#1c1917;color:#f5f5f4}',
    '#top{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#1c1917;border-bottom:3px solid #f59e0b}',
    '#marque{flex:1;font-size:15px;font-weight:700}',
    '#msg{padding:0 12px;color:#fbbf24;white-space:pre-wrap}',
    'iframe{border:0;width:100%;height:calc(100% - 54px);background:#1c1917}'
  ].join('');
  const js = [
    'function dire(m){document.getElementById("msg").textContent=m||"";}',
    'window.addEventListener("message",function(ev){',
    ' var d=ev.data;',
    ' if(ev.origin!==ORIGINE||ev.source!==document.getElementById("green").contentWindow||!d||typeof d.type!=="string")return;',
    ' if(d.type==="structory:ready"){dire("");}',
    ' else if(d.type==="structory:auth-error"){dire(MSG_AUTH);}',
    '});'
  ].join('\n');
  const consts = 'var ORIGINE=' + JSON.stringify(ORIGINE) + ',MSG_AUTH=' + JSON.stringify('Connexion au module requise.') + ';';
  return '<!DOCTYPE html><html><head><base target="_top"><style>' + css + '</style></head><body>' +
    '<div id="top"><div id="marque">Structory Green</div></div>' +
    '<p id="msg"></p>' +
    '<iframe id="green" src="' + GREEN_URL + '" title="Structory Green"></iframe>' +
    '<script>' + consts + '\n' + js + '</script></body></html>';
}
