import { escapeHTML as e } from './utils.mjs';
import { casePage } from './case-layout.mjs';
import { mindpassSchema } from '../data/mindpass-schema.mjs';
export { escapeHTML } from './utils.mjs';

const schemaSelection = {
  patients: { base: ['id', 'wallet_address', 'subsidy_balance'], groups: { PROFILE: ['total_deposits', 'support_code'] } },
  therapists: { base: ['id', 'wallet_address', 'specialty', 'ekyc_status'], groups: { 'PROFILE & VERIFICATION': ['sbt_status', 'rating', 'total_sessions', 'clinical_specialty', 'resume_url', 'license_url', 'id_card_url'] } },
  sessions: { base: ['id', 'patient_wallet', 'therapist_wallet', 'status', 'settlement_status', 'contract_address'], groups: {
    CORE: ['session_mode', 'active_end_request_id'],
    FUNDING: ['funding_source', 'subsidy_applied_eth', 'wallet_required_eth', 'wallet_funded_eth', 'protocol_fee_eth', 'therapist_payout_eth'],
    LIFECYCLE: ['provider_accepted_at', 'payment_due_at', 'patient_paid_at', 'funded_at', 'patient_joined_at', 'therapist_joined_at', 'session_started_at', 'completed_at', 'rejected_at', 'payment_timeout_at', 'no_show_deadline_at'],
    SETTLEMENT: ['penalty_fee_eth', 'refund_amount_eth', 'settlement_source', 'patient_refund_eth', 'vault_refund_eth'],
    'ON-CHAIN': ['onchain_session_id', 'chain_id', 'booking_tx_hash', 'accept_tx_hash', 'patient_fund_tx_hash', 'subsidy_fund_tx_hash', 'complete_tx_hash', 'resolve_tx_hash', 'withdraw_tx_hash'],
    SYNC: ['last_onchain_event', 'last_synced_block', 'last_synced_log_index', 'last_synced_tx_hash', 'last_synced_at', 'sync_error']
  } },
  support_requests: { base: ['id', 'session_id', 'reporter_wallet', 'issue_type'], groups: { WORKFLOW: ['reporter_role', 'message', 'status', 'created_at'] } },
  session_end_requests: { base: ['id', 'session_id', 'requested_by_wallet', 'status'], groups: { RESOLUTION: ['requested_by_role', 'target_wallet', 'target_role', 'requester_confirmed_at', 'target_responded_at', 'accepted_at', 'declined_at', 'cancelled_at', 'expired_at'] } },
  chat_messages: { base: ['id', 'session_id', 'sender_wallet', 'message_type'], groups: { MESSAGE: ['sender_role', 'content', 'metadata', 'is_deleted', 'created_at'] } },
  chat_attachments: { base: ['id', 'message_id', 'session_id', 'storage_path'], groups: { FILE: ['uploader_wallet', 'mime_type', 'byte_size', 'storage_bucket', 'original_filename'] } },
  redeem_codes: { base: ['id', 'code', 'eth_value'], groups: { REDEMPTION: ['is_used', 'used_by_wallet', 'used_at'] }, peripheral: true },
  activities: { base: ['id', 'wallet_address', 'status'], groups: { ACTIVITY: ['title', 'created_at'] }, peripheral: true },
  therapist_auth_logs: { base: ['id', 'therapist_wallet', 'action'], groups: { AUDIT: ['user_agent', 'created_at'] }, peripheral: true }
};
const visibleSchemaNames = new Set(Object.keys(schemaSelection).filter(name => !schemaSelection[name].peripheral));
const schemaRelations = Object.entries(mindpassSchema).flatMap(([table, schema]) => schema.foreignKeys.map(fk => ({ fromTable: table, fromColumn: fk.column, toTable: fk.table, toColumn: fk.references }))).filter(fk => visibleSchemaNames.has(fk.fromTable) && visibleSchemaNames.has(fk.toTable));
const schemaType = type => type === 'timestamp with time zone' ? 'timestamptz' : type === 'double precision' ? 'float8' : type.toLowerCase();
function schemaField(table, field) {
  const source = mindpassSchema[table];
  const type = source?.columns[field];
  if (!type) throw Error(`MindPass schema field missing from supplied SQL: ${table}.${field}`);
  const key = source.primaryKey === field ? 'PK' : source.foreignKeys.some(fk => fk.column === field) ? 'FK' : '';
  return `<li data-schema-field="${e(field)}"><span class="mindpass-schema-key">${key}</span><code>${e(field)}</code><span class="mindpass-schema-type">${e(schemaType(type))}</span></li>`;
}
function schemaNode(name) {
  const selection = schemaSelection[name];
  if (!mindpassSchema[name]) throw Error(`MindPass schema table missing from supplied SQL: ${name}`);
  const groups = Object.entries(selection.groups).map(([label, fields]) => `<div class="mindpass-schema-group"><p>${e(label)}</p><ul>${fields.map(field => schemaField(name, field)).join('')}</ul></div>`).join('');
  return `<article class="mindpass-schema-node mindpass-schema-node--${e(name)}${selection.peripheral ? ' mindpass-schema-node--peripheral' : ''}" data-schema-node="${e(name)}" tabindex="0" aria-label="${e(name)} schema table"${selection.peripheral ? ' aria-hidden="true"' : ''}>
    <header class="mindpass-schema-node__header"><h3>${e(name)}</h3></header>
    <ul class="mindpass-schema-fields">${selection.base.map(field => schemaField(name, field)).join('')}</ul>
    <div class="mindpass-schema-extra" aria-hidden="true">${groups}</div>
  </article>`;
}

export function renderCaseStudy(p, pagination) {
  const lifecycle = p.lifecycleLabels.map(label => `<li>${e(label)}</li>`).join('');
  const capabilities = p.capabilities.map(([title, copy]) => `
    <li><h3>${e(title)}</h3><p>${e(copy)}</p></li>`).join('');
  const contributions = p.contributions.map(([title, copy]) => `
    <li><h3>${e(title)}</h3><p>${e(copy)}</p></li>`).join('');
  const validation = p.validationLayers.map(([title, copy]) => `
    <div><h3>${e(title)}</h3><p>${e(copy)}</p></div>`).join('');

  const schemaNodes = ['patients', 'therapists', 'sessions', 'support_requests', 'session_end_requests', 'chat_messages', 'chat_attachments', 'activities', 'therapist_auth_logs', 'redeem_codes'].map(schemaNode).join('');
  const relationshipList = schemaRelations.map(fk => `<li data-from-table="${e(fk.fromTable)}" data-from-column="${e(fk.fromColumn)}" data-to-table="${e(fk.toTable)}" data-to-column="${e(fk.toColumn)}"><code>${e(fk.fromTable)}.${e(fk.fromColumn)}</code> → <code>${e(fk.toTable)}.${e(fk.toColumn)}</code></li>`).join('');

  const body = `
  <section id="overview" class="case-hero mindpass-hero container">
    <p class="eyebrow">FINTECH / FULL-STACK MVP</p>
    <h1 class="reveal ready">Smart-contract escrow<br><span>for conditional service settlement.</span></h1>
    <noscript><style>.mindpass-hero h1.reveal.ready{opacity:1;transform:none}</style></noscript>
    <p class="case-subtitle">${e(p.title)}</p>
    <p class="lead">${e(p.description)}</p>
    <p class="project-context">${e(p.period)} · ${e(p.context)} · Four-person group project</p>
    <p class="tech-line">${p.heroTechnologies.map(e).join(' · ')}</p>
    <div class="actions project-actions"><a class="primary-link" href="${e(p.prototypeUrl)}">View live prototype ↗</a><a href="${e(p.url)}">GitHub ↗</a><a href="./index.html#work">← All Work</a></div>
  </section>

  <section id="product" class="section mindpass-product near-black">
    <div class="container">
      <p class="eyebrow">PRODUCT</p>
      <h2>More than<br><span class="muted">a payment button.</span></h2>
      <div class="mindpass-product-copy">${p.productParagraphs.map(copy => `<p>${e(copy)}</p>`).join('')}</div>
      <ol class="mindpass-lifecycle" aria-label="Request to withdrawal lifecycle">${lifecycle}</ol>
      <ul class="mindpass-outcomes">${capabilities}</ul>
    </div>
  </section>

  <section id="architecture" class="section mindpass-architecture">
    <div class="container">
      <p class="eyebrow">ARCHITECTURE</p>
      <h2>Settlement on-chain.<br><span class="muted">Coordination off-chain.</span></h2>
      <p class="lead">${e(p.architectureSummary)}</p>
      <figure class="mindpass-architecture-map" aria-label="Application, bridge, on-chain settlement and off-chain data layers">
        <div class="mindpass-architecture-layer"><p class="mindpass-layer-label">APPLICATION</p><h3>Next.js application</h3><p>Wallet entry · role-aware workflows · dashboards</p></div>
        <div class="mindpass-architecture-layer"><p class="mindpass-layer-label">BRIDGE</p><h3>Wagmi / viem</h3><p>Contract actions · events · transaction receipts</p></div>
        <div class="mindpass-architecture-layer mindpass-architecture-layer--chain"><p class="mindpass-layer-label">ON-CHAIN</p><h3>MindPassEscrow · Sepolia</h3><p>Settlement rules · balances · outcomes</p></div>
        <div class="mindpass-architecture-layer"><p class="mindpass-layer-label">OFF-CHAIN DATA</p><h3>Supabase</h3><p>Operational records · realtime application state</p></div>
      </figure>
      <p class="mindpass-supporting">${e(p.architectureNote)}</p>
      <p class="tech-line">${p.architectureTechnologies.map(e).join(' · ')}</p>
    </div>
  </section>

  <section id="data-model" class="section mindpass-data-model near-black">
    <div class="container">
      <p class="eyebrow">APPLICATION DATA MODEL</p>
      <h2>Operational state behind<br><span class="muted">the settlement workflow.</span></h2>
      <p class="lead">${e(p.dataModelIntro)}</p>
      <figure class="mindpass-schema" aria-label="MindPass relational application schema centred on sessions">
        <div class="mindpass-schema-diagram">
          <svg class="mindpass-schema-lines" aria-hidden="true" focusable="false"></svg>
          <div class="mindpass-schema-grid">${schemaNodes}</div>
        </div>
        <figcaption><span>Selected entities and fields from the application schema.</span><button type="button" class="mindpass-schema-toggle" aria-expanded="false" aria-controls="mindpass-schema-relations">Explore schema detail <span aria-hidden="true">+</span></button></figcaption>
        <div id="mindpass-schema-relations" class="mindpass-schema-relations" aria-hidden="true">
          <p>SCHEMA RELATIONSHIPS</p>
          <ul>${relationshipList}</ul>
        </div>
      </figure>
      <p class="mindpass-supporting">${e(p.dataModelNote)}</p>
    </div>
  </section>

  <section id="contribution" class="section mindpass-contribution container">
    <p class="eyebrow">MY CONTRIBUTION</p>
    <h2>Led technical implementation<br><span class="muted">and final system integration.</span></h2>
    <p class="lead">${e(p.contributionIntro)}</p>
    <ul class="mindpass-contribution-grid">${contributions}</ul>
    <p class="mindpass-supporting">${e(p.contributionNote)}</p>
    <p class="mindpass-small-note">${e(p.contributionDisclaimer)}</p>
  </section>

  <section id="validation" class="section mindpass-validation near-black">
    <div class="container">
      <p class="eyebrow">VALIDATION</p>
      <h2>Verified beyond<br><span class="muted">the interface.</span></h2>
      <p class="lead">The final MVP was tested across the contract, blockchain and application layers.</p>
      <div class="mindpass-validation-grid">${validation}</div>
      <p class="mindpass-supporting">${e(p.validationScenarios)}</p>
    </div>
  </section>

  <section id="scope" class="section mindpass-scope container">
    <p class="eyebrow">SCOPE</p>
    <h2>A working MVP.<br><span class="muted">Not a production platform.</span></h2>
    <div class="mindpass-scope-copy">${p.scopeParagraphs.map(copy => `<p>${e(copy)}</p>`).join('')}</div>
    <div class="actions project-actions"><a class="primary-link" href="${e(p.prototypeUrl)}">View live prototype ↗</a><a href="${e(p.url)}">Explore the source ↗</a></div>
  </section>`;

  return casePage({
    title: p.title, description: p.description,
    nav: [['overview', 'Overview'], ['architecture', 'Architecture'], ['data-model', 'Data Model'], ['contribution', 'Contribution'], ['validation', 'Validation']],
    body, pagination, pageClass: 'mindpass-page'
  });
}
