// eBao Gemini Life Core PAS & InsureForge Knowledge Hub & Simulator
// Full Client-side Engine - Zero CORS / Double-Click Ready / Built-in PDF Viewer

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Global Application State
const STATE = {
  activeTab: 'modules',
  activeMasterSubtab: 'tbl-milestones',
  activeDiagSubtab: 'diag-pipeline',
  activeWorkbench: 'MOD_04',
  activeModuleId: 'MOD_01',
  activeTableIndex: 0,
  activePipelineStep: 0,
  systemDate: new Date('2026-10-20'),
  currentPdfPage: 1,

  // Filters
  datesSearchQuery: '',
  altFilterType: 'All',
  altSearchQuery: '',
  batchSearchQuery: '',
  tableDomainFilter: 'All',
  tableSearchQuery: '',
  txModuleFilter: 'All',
  txSearchQuery: '',
  matrixAppFilter: 'All',
  matrixLobFilter: 'All',
  matrixSearchQuery: '',
  matrixPage: 1,
  matrixPageSize: 25,

  // Active Policy Simulation State
  policy: {
    policyNo: 'POL-2026-88001',
    status: 'INFORCE', // INFORCE, INFORCE_APL, TERMINATED_FREE_LOOK, LAPSED, TERMINATED_DEATH
    planCode: 'ENDOW_20',
    planName: 'Endowment 20-Year (Par)',
    policyTerm: 20,
    payTerm: 15,
    commenceDate: '2023-10-20',
    issueDate: '2023-10-20',
    deliveryDate: '2023-10-25',
    ptdDate: '2027-10-20',
    dueDate: '2027-10-20',
    graceDaysElapsed: 0,
    insuredName: 'Nguyen Van An',
    insuredDOB: '1990-05-15',
    issueAge: 33,
    attainedAge: 36,
    gender: 'M',
    smoker: 'Non-Smoker',
    sumAssured: 100000,
    baseAnnualPrem: 4800,
    modalLoadingFactor: 1.0,
    extraMortalityPct: 0,
    flatLoadingMille: 0,
    currentAnnualPrem: 4800,
    totalPremiumsPaid: 19200,
    grossCashValue: 24800,
    loanPrincipal: 0,
    loanInterestAccrued: 0,
    accumulatedBonus: 3200,
    medicalExamCosts: 350,
    ilpAccountUnits: 2500,
    ilpUnitPrice: 8.50,
    unallocatedPrem: 200,
    allocationFee: 150
  },

  ledger: [
    { date: '2023-10-20', module: 'MOD_02 NB', tx: 'TX-NB-008 Enforce Policy', type: 'Cr. GWP', amount: 4800, balance: 4800 },
    { date: '2024-10-20', module: 'MOD_05 BIL', tx: 'TX-BIL-003 Renewal Collection', type: 'Cr. GWP', amount: 4800, balance: 9600 },
    { date: '2025-10-20', module: 'MOD_05 BIL', tx: 'TX-BIL-003 Renewal Collection', type: 'Cr. GWP', amount: 4800, balance: 14400 },
    { date: '2026-10-20', module: 'MOD_05 BIL', tx: 'TX-BIL-003 Renewal Collection', type: 'Cr. GWP', amount: 4800, balance: 19200 }
  ]
};

let chartInstance = null;

// ==============================================================
// 1. INITIALIZATION & ROUTING
// ==============================================================
function initApp() {
  setupNavigation();
  setupSystemDateControls();
  setupPdfViewer();
  setupSvgArchitectureDiagram();
  renderModuleDossier(STATE.activeModuleId);
  renderMasterTables();
  renderDiagramsView();
  renderSimulatorView();
  renderMatrixView();
  renderConfiguratorView();

  if (window.mermaid) {
    try {
      mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
      mermaid.run();
    } catch (e) {
      console.warn('Mermaid initialization note:', e);
    }
  }

  if (mod.id === 'MOD_07') {
    setTimeout(() => {
      renderGlPattern('JE-01');
    }, 50);
  }
}

function setupSystemDateControls() {
  const headerDateEl = document.getElementById('header-biz-date');
  const btnRoll = document.getElementById('btn-quick-roll-date');
  if (headerDateEl) {
    headerDateEl.textContent = STATE.systemDate.toISOString().split('T')[0];
  }
  if (btnRoll) {
    btnRoll.addEventListener('click', () => {
      STATE.systemDate.setDate(STATE.systemDate.getDate() + 1);
      const newDateStr = STATE.systemDate.toISOString().split('T')[0];
      if (headerDateEl) headerDateEl.textContent = newDateStr;

      if (STATE.policy.loanPrincipal > 0) {
        const dailyInterest = (STATE.policy.loanPrincipal * 0.065) / 365;
        STATE.policy.loanInterestAccrued += dailyInterest;
        addLedgerEntry('MOD_08 BAT', 'TX-BAT-012 Daily Loan Interest (6.5%)', 'Dr. Loan Interest', dailyInterest);
      }

      updateSimulatorActivePolicyBanner();
      renderWorkbench(STATE.activeWorkbench);
      renderLedgerTable();
      renderActuarialChart();
    });
  }
}

function setupNavigation() {
  // Main Tab Navigation (Support .ribbon-tab, .nav-tab, and button[data-tab])
  document.querySelectorAll('.ribbon-tab, .nav-tab, button[data-tab]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = button.dataset.tab;
      if (targetTab) {
        switchTab(targetTab);
      }
    });
  });

  // Master Tables Subtabs
  document.querySelectorAll('.subtab-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.subtab-btn').forEach(b => {
        b.classList.remove('subtab-active');
      });
      button.classList.add('subtab-active');

      const targetSubtab = button.dataset.subtab;
      STATE.activeMasterSubtab = targetSubtab;
      document.querySelectorAll('.master-subtab-view').forEach(view => view.classList.add('hidden'));
      const activeView = document.getElementById(`subtab-content-${targetSubtab}`);
      if (activeView) activeView.classList.remove('hidden');
    });
  });

  // Diagrams Subtabs
  document.querySelectorAll('.diag-subtab-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.diag-subtab-btn').forEach(b => {
        b.classList.remove('subtab-active', 'bg-blue-600', 'text-white', 'shadow-sm');
      });
      button.classList.add('subtab-active');

      const targetDiag = button.dataset.diagtab;
      if (targetDiag) {
        STATE.activeDiagSubtab = targetDiag;
        document.querySelectorAll('.diagram-subview').forEach(view => view.classList.add('hidden'));
        const activeDiagView = document.getElementById(`diag-content-${targetDiag}`);
        if (activeDiagView) activeDiagView.classList.remove('hidden');

        if (window.mermaid) {
          try { mermaid.run(); } catch (e) {}
        }
      }
    });
  });

  // Simulator Workbench Selector Tabs
  document.querySelectorAll('.wb-tab-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.wb-tab-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'border-2', 'border-blue-600', 'shadow-sm');
        b.classList.add('border-slate-300', 'bg-white', 'text-slate-700');
      });
      button.classList.remove('border-slate-300', 'bg-white', 'text-slate-700');
      button.classList.add('bg-blue-600', 'text-white', 'border-2', 'border-blue-600', 'shadow-sm');

      const wbId = button.dataset.wb;
      STATE.activeWorkbench = wbId;
      renderWorkbench(wbId);
    });
  });
}

function switchTab(tabName) {
  if (!tabName) return;
  STATE.activeTab = tabName;
  document.querySelectorAll('.ribbon-tab, .nav-tab, button[data-tab]').forEach(b => {
    if (b.dataset.tab === tabName) {
      b.classList.add('tab-active');
    } else {
      b.classList.remove('tab-active');
    }
  });

  document.querySelectorAll('.tab-view').forEach(view => view.classList.add('hidden'));
  const activeView = document.getElementById(`view-${tabName}`);
  if (activeView) activeView.classList.remove('hidden');

  if (tabName === 'simulator') {
    renderActuarialChart();
    renderWorkbench(STATE.activeWorkbench);
  } else if (tabName === 'diagrams' && window.mermaid) {
    try { mermaid.run(); } catch (e) {}
  }
}
window.switchTab = switchTab;

// ==============================================================
// 2. BUILT-IN PDF REFERENCE VIEWER CONTROLS (517 PAGES)
// ==============================================================
function setupPdfViewer() {
  const btnOpen = document.getElementById('btn-open-pdf-viewer');
  const btnClose = document.getElementById('btn-close-pdf-viewer');
  const btnJump = document.getElementById('btn-pdf-jump');
  const jumpInput = document.getElementById('pdf-jump-input');
  const backdrop = document.getElementById('pdf-viewer-backdrop');

  if (btnOpen) {
    btnOpen.addEventListener('click', (e) => {
      e.stopPropagation();
      openPdfViewer(STATE.currentPdfPage || 1);
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closePdfViewer();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closePdfViewer);
  }

  if (btnJump && jumpInput) {
    btnJump.addEventListener('click', () => {
      const page = parseInt(jumpInput.value) || 1;
      openPdfViewer(page);
    });
    jumpInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const page = parseInt(jumpInput.value) || 1;
        openPdfViewer(page);
      }
    });
  }

  // Escape key closes PDF viewer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePdfViewer();
    }
  });
}

function openPdfViewer(pageNum) {
  const page = Math.min(Math.max(1, parseInt(pageNum) || 1), 517);
  STATE.currentPdfPage = page;

  const drawer = document.getElementById('pdf-viewer-drawer');
  const backdrop = document.getElementById('pdf-viewer-backdrop');
  const frame = document.getElementById('pdf-viewer-frame');
  const jumpInput = document.getElementById('pdf-jump-input');
  const extLink = document.getElementById('pdf-external-link');

  if (jumpInput) jumpInput.value = page;
  if (frame) {
    frame.src = `Gemini_User_Guide.pdf#page=${page}`;
  }
  if (extLink) {
    extLink.href = `Gemini_User_Guide.pdf#page=${page}`;
  }

  if (backdrop) {
    backdrop.style.display = 'block';
    backdrop.classList.remove('hidden');
  }
  if (drawer) {
    drawer.style.display = 'flex';
    drawer.classList.remove('hidden');
  }
}

function closePdfViewer() {
  const drawer = document.getElementById('pdf-viewer-drawer');
  const backdrop = document.getElementById('pdf-viewer-backdrop');
  if (drawer) {
    drawer.style.display = 'none';
    drawer.classList.add('hidden');
  }
  if (backdrop) {
    backdrop.style.display = 'none';
    backdrop.classList.add('hidden');
  }
}

// Make accessible globally
window.openPdfViewer = openPdfViewer;
window.closePdfViewer = closePdfViewer;

// ==============================================================
// 3. VIEW 1: INTERACTIVE ARCHITECTURE DIAGRAM & STANDARDIZED DOSSIER
// ==============================================================
function setupSvgArchitectureDiagram() {
  const svg = document.getElementById('module-linked-svg');
  if (!svg) return;

  const nodeMap = {
    'Mod1': 'MOD_01',
    'Mod2': 'MOD_02',
    'Mod3': 'MOD_03',
    'Mod4': 'MOD_04',
    'Mod5': 'MOD_05',
    'Mod6': 'MOD_06',
    'Mod7': 'MOD_07',
    'Mod8': 'MOD_08'
  };

  const nodes = svg.querySelectorAll('.node');
  nodes.forEach(node => {
    const dataId = node.getAttribute('data-id');
    if (!dataId || dataId === 'SOR') return; // SOR is central database

    node.style.cursor = 'pointer';

    node.addEventListener('click', () => {
      const modId = nodeMap[dataId];
      if (!modId) return;

      // Reset all nodes stroke
      nodes.forEach(n => {
        const r = n.querySelector('rect');
        if (r) {
          r.setAttribute('stroke', 'var(--_node-stroke)');
          r.setAttribute('stroke-width', '0.75');
          r.style.filter = 'none';
        }
      });

      // Highlight selected node
      const activeRect = node.querySelector('rect');
      if (activeRect) {
        activeRect.setAttribute('stroke', '#38bdf8');
        activeRect.setAttribute('stroke-width', '2.5');
        activeRect.style.filter = 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.7))';
      }

      STATE.activeModuleId = modId;
      const mod = window.EBAO_MODULES.find(m => m.id === modId);
      const badge = document.getElementById('diag-active-badge');
      if (badge && mod) badge.textContent = mod.title;

      renderModuleDossier(modId);

      // Smooth scroll to dossier card
      const dossierEl = document.getElementById('module-dossier-card');
      if (dossierEl) {
        dossierEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Hover effect
    node.addEventListener('mouseenter', () => {
      const r = node.querySelector('rect');
      if (r && nodeMap[dataId] !== STATE.activeModuleId) {
        r.setAttribute('stroke', '#60a5fa');
        r.setAttribute('stroke-width', '1.5');
      }
    });

    node.addEventListener('mouseleave', () => {
      const r = node.querySelector('rect');
      if (r && nodeMap[dataId] !== STATE.activeModuleId) {
        r.setAttribute('stroke', 'var(--_node-stroke)');
        r.setAttribute('stroke-width', '0.75');
      }
    });
  });

  // Initial highlight for Mod1
  const mod1Node = svg.querySelector('.node[data-id="Mod1"]');
  if (mod1Node) {
    const r = mod1Node.querySelector('rect');
    if (r) {
      r.setAttribute('stroke', '#38bdf8');
      r.setAttribute('stroke-width', '2.5');
      r.style.filter = 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.7))';
    }
  }
}

function renderModuleDossier(moduleId) {
  const container = document.getElementById('module-dossier-card');
  if (!container || !window.EBAO_MODULES) return;

  const mod = window.EBAO_MODULES.find(m => m.id === moduleId) || window.EBAO_MODULES[0];

  // 1. Structured Core Concepts as distinct cards
  const conceptsHtml = (mod.core_concepts || []).map(c => `
    <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
      <div class="flex items-center justify-between">
        <span class="font-bold text-xs text-slate-900 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
          ${c.term}
        </span>
        <span class="text-[10px] font-mono font-semibold text-brand-navy bg-brand-navy-light px-2 py-0.5 rounded border border-blue-200">Core Concept</span>
      </div>
      <p class="text-xs text-slate-600 leading-relaxed pl-4">${c.def}</p>
    </div>
  `).join('');

  // 2. Comprehensive SOPs checklist with Prerequisites, Exact Steps, Validation Rules & Field Specs
  const sopsHtml = (mod.sops || []).map((sop, idx) => {
    // A. Prerequisites HTML
    const prereqHtml = (sop.prerequisites && sop.prerequisites.length > 0) ? `
      <div class="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 text-xs text-amber-950">
        <span class="font-bold uppercase tracking-wider block mb-1 text-[10px] text-amber-900 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Prerequisites & Required System State:
        </span>
        <ul class="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
          ${sop.prerequisites.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    // B. Validation Rules HTML
    const valRules = sop.validation_rules || [];
    const valRulesHtml = (valRules.length > 0) ? `
      <div class="bg-rose-50/70 p-3 rounded-xl border border-rose-200 text-xs space-y-2">
        <div class="font-bold text-rose-950 flex items-center justify-between">
          <span class="flex items-center gap-1.5 text-xs">
            <span class="w-2 h-2 rounded-full bg-rose-600"></span> Strict Validation Rules & System Hard Stops (${valRules.length})
          </span>
          <span class="text-[9px] bg-rose-200 text-rose-900 font-mono font-bold px-2 py-0.5 rounded">Core PAS Enforcement</span>
        </div>
        <div class="space-y-1.5">
          ${valRules.map(vr => `
            <div class="p-2 bg-white rounded-lg border border-rose-100 shadow-2xs space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">${vr.ruleId} • ${vr.errorCode}</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${vr.severity === 'HARD_STOP' ? 'bg-red-600 text-white' : (vr.severity === 'SOFT_WARNING' ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white')}">${vr.severity}</span>
              </div>
              <div class="font-bold text-slate-900 text-xs">${vr.ruleName}</div>
              <div class="text-[11px] text-slate-700"><span class="font-semibold text-slate-900">Condition:</span> ${vr.condition}</div>
              <div class="text-[10px] text-slate-500 italic"><span class="font-semibold text-slate-600">Action:</span> ${vr.systemAction}</div>
              <div class="text-[10px] text-emerald-800 bg-emerald-50/60 p-1 rounded leading-relaxed"><span class="font-semibold">Actuarial Note:</span> ${vr.actuarialBasis}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // C. Fields Table HTML
    const fields = sop.fields_table || [];
    const fieldsHtml = (fields.length > 0) ? `
      <details class="text-xs group">
        <summary class="cursor-pointer font-bold text-brand-navy hover:text-brand-navy-hover flex items-center gap-1.5 py-1 select-none">
          <span>📋 Inspect UI Input Fields Specification (${fields.length} Fields)</span>
        </summary>
        <div class="mt-2 overflow-x-auto border border-slate-200 rounded-lg shadow-2xs">
          <table class="w-full text-[11px] text-left border-collapse">
            <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th class="p-1.5">Field Name</th>
                <th class="p-1.5">Type</th>
                <th class="p-1.5">Required</th>
                <th class="p-1.5">Description & Validation Rule</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              ${fields.map(f => `
                <tr>
                  <td class="p-1.5 font-semibold text-slate-900">${f.name}</td>
                  <td class="p-1.5 font-mono text-slate-600">${f.type}</td>
                  <td class="p-1.5 ${f.required === 'Yes' ? 'font-bold text-rose-600' : 'text-slate-500'}">${f.required}</td>
                  <td class="p-1.5 text-slate-600">${f.desc}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </details>
    ` : '';

    return `
      <div class="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all space-y-3">
        <!-- SOP Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs font-bold text-blue-700 bg-white px-2.5 py-0.5 rounded border border-blue-200 shadow-2xs">${sop.code}</span>
            <span class="font-bold text-xs text-slate-900">${sop.title}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">${sop.role || 'Operator'}</span>
            <button onclick="openPdfViewer(${sop.pdf_page || mod.pdf_start_page || 1})" class="text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200 flex items-center gap-1 transition-colors">
              <span>📄</span> PDF P.${sop.pdf_page || mod.pdf_start_page}
            </button>
          </div>
        </div>
        
        ${sop.objective ? `<p class="text-xs text-slate-600 italic bg-white/80 p-2 rounded-lg border border-slate-100">${sop.objective}</p>` : ''}
        
        <!-- Prerequisites -->
        ${prereqHtml}
        
        <!-- SOP Step by Step Checklist with Number Badges -->
        <div class="space-y-2 pt-1">
          <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Step-by-Step Procedure:</div>
          ${(sop.steps || []).map((stepText, sIdx) => {
            const cleanStep = stepText.replace(/^\s*\d+[\.\)]\s*/, '').trim();
            return `
              <div class="flex items-start gap-3 text-xs text-slate-700">
                <span class="std-num-badge">${sIdx + 1}</span>
                <span class="leading-relaxed mt-0.5">${cleanStep}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Strict Validation Rules & Hard Stops -->
        ${valRulesHtml}

        <!-- Field Specifications -->
        ${fieldsHtml}
      </div>
    `;
  }).join('');

  // 3. Actuary Notes as clean bulleted list (NO COMMA RUN-ON)
  const actuaryList = Array.isArray(mod.actuary_notes) ? mod.actuary_notes : [mod.actuary_notes];
  const actuaryHtml = actuaryList.map(item => `
    <li class="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
      <span>${item}</span>
    </li>
  `).join('');

  // 4. Operations Notes as clean bulleted list (NO COMMA RUN-ON)
  const opList = Array.isArray(mod.op_notes) ? mod.op_notes : [mod.op_notes];
  const opHtml = opList.map(item => `
    <li class="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0"></span>
      <span>${item}</span>
    </li>
  `).join('');

  // 5. Summary split into clean bullets
  const summarySentences = mod.summary.split(/(?<=\.)\s+/).filter(s => s.trim().length > 0);
  const summaryHtml = summarySentences.map(s => `
    <li class="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
      <span>${s.trim()}</span>
    </li>
  `).join('');

  
  // Milestone Highlight Banner
  let milestoneBannerHtml = '';
  if (mod.id === 'MOD_02') {
    milestoneBannerHtml = `
      <div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div class="flex items-center gap-3">
          <span class="p-2 bg-emerald-100 text-emerald-800 rounded-lg">${window.getLineIcon ? window.getLineIcon('shield-check', 'w-5 h-5') : ''}</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-emerald-900 uppercase font-mono">Quy Tắc Trọng Yếu Vòng Đời</span>
              <span class="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">Mốc 21 Ngày Cân Nhắc</span>
            </div>
            <p class="text-xs text-emerald-800 mt-0.5">Thời hạn 21 ngày cân nhắc (Free-Look) kích hoạt <b>ngay khi khách hàng ký nhận bàn giao (DELIVERY_DATE / e-ACK)</b>, không tính từ ngày phát hành (Issue Date). Hoàn 100% phí (trừ phí y tế) và thu hồi 100% hoa hồng đại lý.</p>
          </div>
        </div>
        <button onclick="jumpToMilestone('card-ms-freelook')" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl whitespace-nowrap shadow-sm transition-all">
          Xem Chi Tiết Mốc 21 Ngày →
        </button>
      </div>
    `;
  } else if (mod.id === 'MOD_04') {
    milestoneBannerHtml = `
      <div class="mb-6 p-4 rounded-xl bg-purple-50 border border-purple-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div class="flex items-center gap-3">
          <span class="p-2 bg-brand-navy-light text-brand-navy rounded-lg">${window.getLineIcon ? window.getLineIcon('plus-circle', 'w-5 h-5') : ''}</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-purple-900 uppercase font-mono">Quy Tắc Trọng Yếu Vòng Đời</span>
              <span class="text-[10px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded">Gắn Rider Sau Khi Main Inforce</span>
            </div>
            <p class="text-xs text-purple-800 mt-0.5">Nghiệp vụ CS-FN-03: Chọn hiệu lực vào Kỳ đóng phí tiếp theo (Phí ngắn hạn = 0 VND) hoặc Hiệu lực ngay lập tức với <b>Phí bảo hiểm ngắn hạn (Pro-Rata Short Period Premium)</b>. Đồng bộ PTD hoàn toàn tại kỳ kế tiếp.</p>
          </div>
        </div>
        <button onclick="jumpToMilestone('card-ms-rider')" class="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl whitespace-nowrap shadow-sm transition-all">
          Xem Chi Tiết & Bộ Tính Phí Pro-Rata →
        </button>
      </div>
    `;
  } else if (mod.id === 'MOD_05') {
    milestoneBannerHtml = `
      <div class="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div class="flex items-center gap-3">
          <span class="p-2 bg-brand-gold-light text-brand-gold-dark rounded-lg">${window.getLineIcon ? window.getLineIcon('clock', 'w-5 h-5') : ''}</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-amber-900 uppercase font-mono">Quy Tắc Trọng Yếu Vòng Đời</span>
              <span class="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded">Mốc 60 Ngày Gia Hạn Đóng Phí</span>
            </div>
            <p class="text-xs text-amber-800 mt-0.5">Tiến trình 60 ngày gia hạn: Bảo hiểm 100% hiệu lực, gửi thông báo nhắc phí ngày 30 và cảnh báo ngày 45. Đúng 23:59:59 ngày thứ 60, hệ thống tự động kiểm tra Net Cash Value: <b>Thực hiện APL (Vay đóng phí) hoặc Mất hiệu lực (Auto-Lapse)</b>.</p>
          </div>
        </div>
        <button onclick="jumpToMilestone('card-ms-grace')" class="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg whitespace-nowrap shadow-sm transition-all">
          Xem Chi Tiết Mốc 60 Ngày & APL →
        </button>
      </div>
    `;
  }

  // 6. Database Tables
  const modTables = (window.EBAO_TABLES || []).filter(t => t.module === mod.id);
  const tablesHtml = modTables.map(t => `
    <span onclick="inspectTableByName('${t.name}')" class="font-mono text-[10px] bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer transition-colors shadow-2xs">
      ${t.name}
    </span>
  `).join('') || '<span class="text-slate-400 text-xs">Shared core schemas</span>';

  container.innerHTML = `
    <!-- Module Header Banner -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
      <div class="flex items-center gap-3.5">
        <div class="p-3 bg-brand-navy-light text-brand-navy rounded-2xl border border-brand-navy-border flex items-center justify-center">
        ${window.getLineIcon ? window.getLineIcon(mod.icon || 'layers', 'w-7 h-7') : ''}
      </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs font-bold text-brand-navy bg-brand-navy-light px-2.5 py-0.5 rounded-md border border-blue-200">${mod.id}</span>
            <span class="text-xs font-semibold text-slate-500 font-mono">${mod.page_range}</span>
            <span class="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">${mod.function_count} Functions</span>
            <span class="text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">${mod.sop_count} SOPs</span>
          </div>
          <h2 class="text-xl font-extrabold text-slate-900 mt-1">${mod.title}</h2>
          <div class="text-xs text-slate-500">${mod.pdf_chapter || ''}</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2.5">
        <button onclick="openPdfViewer(${mod.pdf_start_page || 1})" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 border border-indigo-400/30">
          ${window.getLineIcon ? window.getLineIcon("book", "w-3.5 h-3.5") : ""} <span>Open PDF Page ${mod.pdf_start_page || 1}</span>
        </button>
        <button onclick="jumpToSimulatorWorkbench('${mod.id}')" class="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5">
          ${window.getLineIcon ? window.getLineIcon("zap", "w-3.5 h-3.5") : ""} <span>Test in Simulator</span>
        </button>
      </div>
    </div>

    <!-- Summary Box (Clean Bulleted Points) -->
    <div class="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
      <b class="text-slate-900 font-bold block mb-2">Functional Scope & System Responsibilities:</b>
      <ul class="space-y-1.5">
        ${summaryHtml}
      </ul>
    </div>


    <!-- SPECIALIZED FINANCE & GL WORKBENCH (Only for MOD_07) -->
    ${mod.id === 'MOD_07' ? `
      <div id="sec-gl-interactive-engine" class="mb-6 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="p-1.5 bg-brand-navy-light text-brand-navy rounded-lg">${window.getLineIcon ? window.getLineIcon('landmark', 'w-4 h-4') : ''}</span>
              <h3 class="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Interactive 7-Segment Accounting Rule & Insurance Journal Entry Simulator
              </h3>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Explore real-world double-entry bookkeeping rules for all 12 core life insurance lifecycle transactions.</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-slate-600">Select Transaction:</span>
            <select id="sel-gl-tx-pattern" onchange="renderGlPattern(this.value)" class="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-navy">
              ${(mod.journal_entry_patterns || []).map(je => `<option value="${je.id}">${je.id}: ${je.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Dynamic Journal Entry T-Account Box -->
        <div id="gl-pattern-detail-box" class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <!-- Populated by renderGlPattern() -->
        </div>

        <!-- 7-Segment Architecture & Maker-Checker Limits Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <!-- 7-Segment Breakdown -->
          <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
            <span class="font-bold text-slate-900 uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
              <span>🗂️</span> Standard 7-Segment Chart of Accounts:
            </span>
            <div class="space-y-1.5 text-[11px]">
              ${(mod.gl_segments_spec || []).map(s => `
                <div class="flex items-center justify-between p-1.5 bg-white rounded border border-slate-100">
                  <span class="font-mono font-bold text-brand-navy">${s.seg} (${s.name})</span>
                  <span class="font-mono text-slate-600 bg-slate-50 px-1.5 py-0.2 rounded border border-slate-200">${s.example}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Multi-Tier Maker-Checker Authority Matrix -->
          <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
            <span class="font-bold text-slate-900 uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
              <span>🛡️</span> Maker-Checker Payment Authorization Limits (P.387):
            </span>
            <div class="space-y-1.5 text-[11px]">
              <div class="flex items-center justify-between p-1.5 bg-white rounded border border-slate-100">
                <span class="font-mono font-bold text-slate-800">D_CSD_PAY_AUTH_L10</span>
                <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">Max $10,000 / 250M VND</span>
              </div>
              <div class="flex items-center justify-between p-1.5 bg-white rounded border border-slate-100">
                <span class="font-mono font-bold text-slate-800">D_CSD_PAY_AUTH_L30</span>
                <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">Max $30,000 / 750M VND</span>
              </div>
              <div class="flex items-center justify-between p-1.5 bg-white rounded border border-slate-100">
                <span class="font-mono font-bold text-slate-800">D_CSD_PAY_AUTH_L70</span>
                <span class="font-bold text-amber-700 bg-amber-50 px-2 py-0.2 rounded border border-amber-200">Max $75,000 / 1.875B VND</span>
              </div>
              <div class="flex items-center justify-between p-1.5 bg-white rounded border border-slate-100">
                <span class="font-mono font-bold text-slate-800">D_CSD_PAY_AUTH_L100</span>
                <span class="font-bold text-purple-700 bg-purple-50 px-2 py-0.2 rounded border border-purple-200">Max $100,000 / 2.5B VND</span>
              </div>
              <div class="flex items-center justify-between p-1.5 bg-white rounded border border-slate-100">
                <span class="font-mono font-bold text-slate-800">D_CSD_PAY_AUTH_L140</span>
                <span class="font-bold text-red-700 bg-red-50 px-2 py-0.2 rounded border border-red-200">Unlimited (CFO / Board Sign-off)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- 2 Column Layout: Concepts & SOPs -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column: Core Concepts & Actuary/OP Notes -->
      <div class="space-y-5">
        <div>
          <h3 class="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
            ${window.getLineIcon ? window.getLineIcon("box", "w-3.5 h-3.5 text-brand-navy") : ""} Core Architectural Concepts (${(mod.core_concepts || []).length})
          </h3>
          <div class="space-y-2.5">
            ${conceptsHtml}
          </div>
        </div>

        <!-- Actuary Deep-Dive Callout (Clean Bulleted List) -->
        <div class="actuary-callout space-y-2 text-xs text-slate-700">
          <div class="font-bold text-emerald-900 flex items-center gap-2 border-b border-emerald-200/60 pb-1.5">
            ${window.getLineIcon ? window.getLineIcon("activity", "w-3.5 h-3.5 text-emerald-700") : ""} Actuary Technical Notes & Valuation Specifications:
          </div>
          <ul class="space-y-1.5">
            ${actuaryHtml}
          </ul>
        </div>

        <!-- Operations Callout (Clean Bulleted List) -->
        <div class="op-callout space-y-2 text-xs text-slate-700">
          <div class="font-bold text-amber-900 flex items-center gap-2 border-b border-amber-200/60 pb-1.5">
            <span>⚙️</span> Operations (OP) Checklist & SLA Controls:
          </div>
          <ul class="space-y-1.5">
            ${opHtml}
          </ul>
        </div>

        <!-- Database Tables Linked -->
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <span class="font-bold text-xs text-slate-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
            <span>🗄️</span> Associated Database Tables:
          </span>
          <div class="flex flex-wrap gap-1.5">
            ${tablesHtml}
          </div>
        </div>
      </div>

      <!-- Right Column: Standard Operating Procedures (SOPs) -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-extrabold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
            ${window.getLineIcon ? window.getLineIcon("file-text", "w-3.5 h-3.5 text-slate-700") : ""} Standard Operating Procedures (${mod.sop_count} Procedures)
          </h3>
          <span class="text-[11px] font-mono text-slate-500 font-semibold">Step-by-step checklist</span>
        </div>
        <div class="space-y-3 max-h-[850px] overflow-y-auto pr-1">
          ${sopsHtml}
        </div>
      </div>
    </div>
  `;
}

function jumpToSimulatorWorkbench(moduleId) {
  switchTab('simulator');
  const wbBtn = document.querySelector(`.wb-tab-btn[data-wb="${moduleId}"]`);
  if (wbBtn) wbBtn.click();
}

// ==============================================================
// 4. VIEW 2: MASTER CORE REFERENCE TABLES (STANDARD FORMATTING)
// ==============================================================
function renderMasterTables() {
  renderMilestonesSubtab();
  renderDatesTable();
  renderFreelookTable();
  renderAlterationsTable();
  renderValidationRulesTable();
  renderBatchSeqTable();

  // Search filters
  const searchDates = document.getElementById('search-dates-input');
  if (searchDates) {
    searchDates.addEventListener('input', (e) => {
      STATE.datesSearchQuery = e.target.value.toLowerCase();
      renderDatesTable();
    });
  }

  const searchAlt = document.getElementById('search-alterations-input');
  if (searchAlt) {
    searchAlt.addEventListener('input', (e) => {
      STATE.altSearchQuery = e.target.value.toLowerCase();
      renderAlterationsTable();
    });
  }

  const searchBatch = document.getElementById('search-batch-seq-input');
  if (searchBatch) {
    searchBatch.addEventListener('input', (e) => {
      STATE.batchSearchQuery = e.target.value.toLowerCase();
      renderBatchSeqTable();
    });
  }

  // Alteration Category filter pills
  const btnAll = document.getElementById('btn-filter-alt-all');
  const btnNonfin = document.getElementById('btn-filter-alt-nonfin');
  const btnFin = document.getElementById('btn-filter-alt-fin');

  const updateAltButtons = (activeBtn) => {
    [btnAll, btnNonfin, btnFin].forEach(b => {
      if (b) {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      }
    });
    if (activeBtn) {
      activeBtn.classList.remove('bg-slate-100', 'text-slate-700');
      activeBtn.classList.add('bg-blue-600', 'text-white');
    }
  };

  if (btnAll) btnAll.addEventListener('click', () => { STATE.altFilterType = 'All'; updateAltButtons(btnAll); renderAlterationsTable(); });
  if (btnNonfin) btnNonfin.addEventListener('click', () => { STATE.altFilterType = 'Non-Financial'; updateAltButtons(btnNonfin); renderAlterationsTable(); });
  if (btnFin) btnFin.addEventListener('click', () => { STATE.altFilterType = 'Financial'; updateAltButtons(btnFin); renderAlterationsTable(); });
}


// ==============================================================
// 4.1 SUBTAB: 3 CORE MILESTONES (21-DAY, 60-DAY, MID-TERM RIDER)
// ==============================================================
function jumpToMilestone(cardId) {
  switchTab('master-tables');
  const msBtn = document.querySelector('.subtab-btn[data-subtab="tbl-milestones"]');
  if (msBtn) msBtn.click();
  setTimeout(() => {
    const el = document.getElementById(cardId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function renderMilestonesSubtab() {
  // 1. Free-Look Live Calculator
  const flType = document.getElementById('calc-fl-product-type');
  const flPrem = document.getElementById('calc-fl-premium');
  const flMed = document.getElementById('calc-fl-med-fee');
  const flComm = document.getElementById('calc-fl-comm-rate');
  const flNav = document.getElementById('calc-fl-nav-diff');
  const flIlpRow = document.getElementById('out-fl-ilp-row');

  const updateFreelookCalc = () => {
    if (!flPrem || !flMed) return;
    const gross = parseFloat(flPrem.value) || 0;
    const med = parseFloat(flMed.value) || 0;
    const commRate = parseFloat(flComm.value) || 0;
    const isIlp = flType ? flType.value === 'ILP' : false;

    if (flIlpRow) flIlpRow.style.display = isIlp ? 'flex' : 'none';

    let netRefund = Math.max(0, gross - med);
    let navDiffAmt = 0;

    if (isIlp && flNav) {
      const navPct = (parseFloat(flNav.value) || 0) / 100;
      const unitValue = (gross - med) * 0.8;
      navDiffAmt = unitValue * navPct;
      netRefund = Math.max(0, gross - med + navDiffAmt);
      const outNav = document.getElementById('out-fl-ilp-adj');
      if (outNav) outNav.textContent = `${Math.round(navDiffAmt).toLocaleString()} VND (${(navPct * 100).toFixed(1)}%)`;
    }

    const clawbackAmt = (gross * commRate) / 100;

    const outGross = document.getElementById('out-fl-gross-prem');
    const outMed = document.getElementById('out-fl-med-deduct');
    const outRefund = document.getElementById('out-fl-net-refund');
    const outClawback = document.getElementById('out-fl-clawback');

    if (outGross) outGross.textContent = `${Math.round(gross).toLocaleString()} VND`;
    if (outMed) outMed.textContent = `-${Math.round(med).toLocaleString()} VND`;
    if (outRefund) outRefund.textContent = `${Math.round(netRefund).toLocaleString()} VND`;
    if (outClawback) outClawback.textContent = `${Math.round(clawbackAmt).toLocaleString()} VND (100% FYC)`;
  };

  [flType, flPrem, flMed, flComm, flNav].forEach(el => {
    if (el) el.addEventListener('input', updateFreelookCalc);
  });
  updateFreelookCalc();

  // 2. Grace Period Live Evaluator
  const grDays = document.getElementById('calc-gr-days');
  const grPrem = document.getElementById('calc-gr-prem');
  const grCv = document.getElementById('calc-gr-cv');
  const grDebt = document.getElementById('calc-gr-debt');

  const updateGraceCalc = () => {
    if (!grDays || !grPrem) return;
    const days = parseInt(grDays.value) || 0;
    const prem = parseFloat(grPrem.value) || 0;
    const cv = parseFloat(grCv.value) || 0;
    const debt = parseFloat(grDebt.value) || 0;
    const netCv = Math.max(0, cv - debt);

    const outNetCv = document.getElementById('out-gr-net-cv');
    const outNotice = document.getElementById('out-gr-notice-status');
    const outDaysLeft = document.getElementById('out-gr-days-left');
    const outDecision = document.getElementById('out-gr-decision-box');

    if (outNetCv) outNetCv.textContent = `${Math.round(netCv).toLocaleString()} VND`;

    if (outNotice) {
      if (days < 30) {
        outNotice.textContent = `Bình thường (Đang trong kỳ gia hạn, chưa tới hạn gửi nhắc phí)`;
        outNotice.className = 'font-semibold text-xs text-slate-600';
      } else if (days < 45) {
        outNotice.textContent = `Đã phát hành Thông Báo Nhắc Phí Lần 1 (NOTICE_PREM_REMIND_1)`;
        outNotice.className = 'font-semibold text-xs text-amber-700';
      } else if (days <= 60) {
        outNotice.textContent = `Đã gửi Cảnh Báo Nguy Cơ Mất Hiệu Lực Lần 2 (NOTICE_PREM_WARNING_FINAL)`;
        outNotice.className = 'font-semibold text-xs text-rose-700';
      } else {
        outNotice.textContent = `ĐÃ QUÁ HẠN 60 NGÀY (Cutoff đã kích hoạt batch EOD)`;
        outNotice.className = 'font-semibold text-xs text-purple-700';
      }
    }

    if (outDaysLeft) {
      const left = Math.max(0, 60 - days);
      outDaysLeft.textContent = days > 60 ? `Đã quá hạn ${days - 60} ngày` : `Còn ${left} ngày trước Cutoff`;
      outDaysLeft.className = days > 60 ? 'font-mono font-bold text-rose-600' : 'font-mono font-bold text-blue-700';
    }

    if (outDecision) {
      if (netCv >= prem) {
        outDecision.className = 'p-2.5 rounded-lg font-bold text-xs bg-emerald-50 text-emerald-800 border border-emerald-200';
        outDecision.innerHTML = `Kích hoạt Tự Động Vay Đóng Phí (APL) - Trạng thái: <code class="font-mono text-emerald-900 bg-white px-1 py-0.5 rounded">INFORCE_APL</code> (PTD nâng +1 kỳ, lãi vay 6.5%/năm).`;
      } else {
        outDecision.className = 'p-2.5 rounded-lg font-bold text-xs bg-rose-50 text-rose-800 border border-rose-200';
        outDecision.innerHTML = `Không đủ điều kiện APL (Net CV &lt; Phí). Hợp đồng Chuyển sang <code class="font-mono text-rose-900 bg-white px-1 py-0.5 rounded">LAPSED</code> (SA = 0, Rider hủy, khởi tạo 2 năm khôi phục).`;
      }
    }
  };

  [grDays, grPrem, grCv, grDebt].forEach(el => {
    if (el) el.addEventListener('input', updateGraceCalc);
  });
  updateGraceCalc();

  // 3. Mid-Term Rider Live Calculator
  const rdPrem = document.getElementById('calc-rd-annual-prem');
  const rdStart = document.getElementById('calc-rd-start-date');
  const rdDue = document.getElementById('calc-rd-due-date');
  const rdMain = document.getElementById('calc-rd-main-prem');

  const updateRiderCalc = () => {
    if (!rdPrem || !rdStart || !rdDue) return;
    const annPrem = parseFloat(rdPrem.value) || 0;
    const mainPrem = parseFloat(rdMain.value) || 0;
    const startDate = new Date(rdStart.value);
    const dueDate = new Date(rdDue.value);

    let diffDays = 0;
    if (!isNaN(startDate.getTime()) && !isNaN(dueDate.getTime())) {
      const diffMs = dueDate.getTime() - startDate.getTime();
      diffDays = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
    }

    const yearDays = 365;
    const proRataPct = Math.min(100, (diffDays / yearDays) * 100);
    const proRataAmt = annPrem * (diffDays / yearDays);
    const nextModalBill = mainPrem + annPrem;

    const outDays = document.getElementById('out-rd-days-count');
    const outPct = document.getElementById('out-rd-pro-rata-pct');
    const outAmt = document.getElementById('out-rd-pro-rata-amt');
    const outNext = document.getElementById('out-rd-next-modal-bill');

    if (outDays) outDays.textContent = `${diffDays} ngày / ${yearDays} ngày`;
    if (outPct) outPct.textContent = `${proRataPct.toFixed(2)}%`;
    if (outAmt) outAmt.textContent = `${Math.round(proRataAmt).toLocaleString()} VND`;
    if (outNext) outNext.textContent = `${Math.round(nextModalBill).toLocaleString()} VND`;
  };

  [rdPrem, rdStart, rdDue, rdMain].forEach(el => {
    if (el) el.addEventListener('input', updateRiderCalc);
  });
  updateRiderCalc();
}

function renderDatesTable() {
  const tbody = document.getElementById('tbody-dates');
  if (!tbody || !window.EBAO_LIFECYCLE_DATES) return;

  const datePages = {
    'D01': 45, 'D02': 50, 'D03': 60, 'D04': 88, 'D05': 12, 'D06': 342,
    'D07': 346, 'D08': 368, 'D09': 200, 'D10': 435, 'D11': 278, 'D12': 324, 'D13': 214
  };

  const filtered = window.EBAO_LIFECYCLE_DATES.filter(d => {
    if (!STATE.datesSearchQuery) return true;
    return d.name.toLowerCase().includes(STATE.datesSearchQuery) ||
           d.def.toLowerCase().includes(STATE.datesSearchQuery) ||
           d.db.toLowerCase().includes(STATE.datesSearchQuery) ||
           d.trigger.toLowerCase().includes(STATE.datesSearchQuery);
  });

  tbody.innerHTML = filtered.map(d => `
    <tr>
      <td class="text-center font-mono font-bold text-slate-400">${d.id}</td>
      <td class="font-bold text-slate-900">${d.name}</td>
      <td>
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">${d.stage}</span>
      </td>
      <td class="text-slate-700 max-w-xs">${d.def}</td>
      <td class="text-slate-700 max-w-sm">${d.trigger}</td>
      <td>
        <code class="font-mono text-xs text-blue-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">${d.db}</code>
      </td>
      <td class="text-center">
        <button onclick="openPdfViewer(${datePages[d.id] || 45})" class="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded border border-indigo-200">
          P.${datePages[d.id] || 45}
        </button>
      </td>
    </tr>
  `).join('');
}

function renderFreelookTable() {
  const tbody = document.getElementById('tbody-freelook');
  if (!tbody || !window.EBAO_FREELOOK_RULES) return;

  tbody.innerHTML = window.EBAO_FREELOOK_RULES.map(r => `
    <tr>
      <td class="font-bold text-slate-900 whitespace-nowrap">${r.dimension}</td>
      <td class="text-slate-800 bg-blue-50/20">${r.trad}</td>
      <td class="text-slate-800 bg-indigo-50/20">${r.ilp}</td>
      <td class="text-slate-500 text-xs italic">${r.note}</td>
    </tr>
  `).join('');
}

function renderAlterationsTable() {
  const tbody = document.getElementById('tbody-alterations');
  if (!tbody || !window.EBAO_CS_ALTERATIONS) return;

  const filtered = window.EBAO_CS_ALTERATIONS.filter(a => {
    if (STATE.altFilterType !== 'All' && a.type !== STATE.altFilterType) return false;
    if (!STATE.altSearchQuery) return true;
    return a.code.toLowerCase().includes(STATE.altSearchQuery) ||
           a.name.toLowerCase().includes(STATE.altSearchQuery) ||
           a.validations.toLowerCase().includes(STATE.altSearchQuery) ||
           a.impact.toLowerCase().includes(STATE.altSearchQuery);
  });

  tbody.innerHTML = filtered.map(a => `
    <tr>
      <td>
        <span class="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">${a.code}</span>
      </td>
      <td class="font-bold text-slate-900">${a.name}</td>
      <td>
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${a.type === 'Financial' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}">${a.type}</span>
      </td>
      <td class="text-slate-700 max-w-sm">${a.validations}</td>
      <td class="text-center">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${a.uw.includes('Yes') ? 'bg-rose-100 text-rose-700' : (a.uw.includes('Conditional') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700')}">
          ${a.uw}
        </span>
      </td>
      <td class="text-slate-700 max-w-sm">${a.impact}</td>
    </tr>
  `).join('');
}

function renderBatchSeqTable() {
  const tbody = document.getElementById('tbody-batch-seq');
  if (!tbody || !window.EBAO_BATCH_PIPELINE) return;

  const filtered = window.EBAO_BATCH_PIPELINE.filter(b => {
    if (!STATE.batchSearchQuery) return true;
    return b.code.toLowerCase().includes(STATE.batchSearchQuery) ||
           b.name.toLowerCase().includes(STATE.batchSearchQuery) ||
           b.desc.toLowerCase().includes(STATE.batchSearchQuery) ||
           b.tables.some(t => t.toLowerCase().includes(STATE.batchSearchQuery));
  });

  tbody.innerHTML = filtered.map(b => `
    <tr>
      <td class="text-center font-mono font-bold text-slate-400">${b.step}</td>
      <td class="font-mono text-xs font-semibold text-slate-600 bg-slate-50">${b.time}</td>
      <td>
        <code class="font-mono text-xs text-brand-navy bg-brand-navy-light px-2 py-0.5 rounded border border-blue-200">${b.code}</code>
      </td>
      <td class="font-bold text-slate-900">${b.name}</td>
      <td><span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">${b.freq}</span></td>
      <td><span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">${b.lob}</span></td>
      <td class="text-slate-600 text-xs">${b.prereq}</td>
      <td class="text-slate-700 max-w-sm">
        <div>${b.desc}</div>
        <div class="mt-1 flex flex-wrap gap-1">
          ${b.tables.map(t => `<span class="font-mono text-[9px] bg-slate-100 text-slate-600 px-1 py-0.5 rounded">${t}</span>`).join('')}
        </div>
      </td>
    </tr>
  `).join('');
}

// ==============================================================
// 5. VIEW 3: INTERACTIVE DIAGRAMS, PIPELINE & TABLES
// ==============================================================
function renderDiagramsView() {
  setupBatchPipelineInteractive();
  setupDatabaseTableExplorer();
  setupTransactionsCatalog();
}

function setupBatchPipelineInteractive() {
  const track = document.getElementById('pipeline-steps-track');
  if (!track || !window.EBAO_BATCH_PIPELINE) return;

  track.innerHTML = window.EBAO_BATCH_PIPELINE.map((job, idx) => `
    <div data-step="${idx}" class="pipeline-step p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer flex-shrink-0 w-64 ${idx === 0 ? 'active-step' : ''}">
      <div class="flex items-center justify-between mb-1">
        <span class="font-mono text-[10px] font-bold bg-white text-blue-700 px-1.5 py-0.5 rounded border border-slate-200">STEP ${idx+1}</span>
        <span class="font-mono text-[10px] text-slate-500">${job.time}</span>
      </div>
      <div class="font-bold text-xs text-slate-900 truncate">${job.name}</div>
      <div class="text-[10px] text-slate-500 truncate mt-0.5">${job.code}</div>
      <div class="mt-2 flex items-center justify-between">
        <span class="step-status-pill text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">Ready</span>
        <span class="text-[9px] text-slate-400 font-mono">${job.lob}</span>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.pipeline-step').forEach(stepEl => {
    stepEl.addEventListener('click', () => {
      const stepIdx = parseInt(stepEl.dataset.step);
      selectBatchStep(stepIdx);
    });
  });

  selectBatchStep(0);

  const btnStep = document.getElementById('btn-pipeline-step');
  const btnFast = document.getElementById('btn-pipeline-fast');
  const btnReset = document.getElementById('btn-pipeline-reset');
  const btnClearLog = document.getElementById('btn-clear-terminal');

  if (btnStep) {
    btnStep.addEventListener('click', () => {
      executeBatchStep(STATE.activePipelineStep);
      if (STATE.activePipelineStep < window.EBAO_BATCH_PIPELINE.length - 1) {
        selectBatchStep(STATE.activePipelineStep + 1);
      }
    });
  }

  if (btnFast) {
    btnFast.addEventListener('click', () => {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= window.EBAO_BATCH_PIPELINE.length) {
          clearInterval(interval);
          logToTerminal('[BATCH ENGINE] ALL 16 NIGHTLY BATCH JOBS COMPLETED SUCCESSFULLY. SYSTEM READY.');
          return;
        }
        selectBatchStep(current);
        executeBatchStep(current);
        current++;
      }, 300);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      document.querySelectorAll('.step-status-pill').forEach(pill => {
        pill.textContent = 'Ready';
        pill.className = 'step-status-pill text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600';
      });
      updatePipelineProgressBar(0);
      selectBatchStep(0);
      logToTerminal('[BATCH ENGINE] Pipeline reset to Initial State.');
    });
  }

  if (btnClearLog) {
    btnClearLog.addEventListener('click', () => {
      const term = document.getElementById('terminal-log-output');
      if (term) term.innerHTML = '<div>[SYSTEM] Log cleared. Ready.</div>';
    });
  }
}

function selectBatchStep(stepIdx) {
  STATE.activePipelineStep = stepIdx;
  const jobs = window.EBAO_BATCH_PIPELINE;
  if (!jobs || !jobs[stepIdx]) return;

  const job = jobs[stepIdx];

  document.querySelectorAll('.pipeline-step').forEach((el, idx) => {
    if (idx === stepIdx) el.classList.add('active-step');
    else el.classList.remove('active-step');
  });

  document.getElementById('pipe-job-step-badge').textContent = `STEP ${job.step}`;
  document.getElementById('pipe-job-time').textContent = job.time;
  document.getElementById('pipe-job-title').textContent = `${job.code} - ${job.name}`;
  document.getElementById('pipe-job-desc').textContent = job.desc;
  document.getElementById('pipe-job-prereq').textContent = job.prereq;
  document.getElementById('pipe-job-lob').textContent = job.lob;

  const tablesContainer = document.getElementById('pipe-job-tables');
  if (tablesContainer) {
    tablesContainer.innerHTML = job.tables.map(t => `
      <span class="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 cursor-pointer" onclick="inspectTableByName('${t}')">${t}</span>
    `).join('');
  }
}

function executeBatchStep(stepIdx) {
  const jobs = window.EBAO_BATCH_PIPELINE;
  if (!jobs || !jobs[stepIdx]) return;

  const job = jobs[stepIdx];
  const stepEl = document.querySelector(`.pipeline-step[data-step="${stepIdx}"]`);
  if (stepEl) {
    const pill = stepEl.querySelector('.step-status-pill');
    if (pill) {
      pill.textContent = 'Completed';
      pill.className = 'step-status-pill text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold';
    }
  }

  logToTerminal(`[${job.time}] RUNNING ${job.code} ... OK. Updated: [${job.tables.join(', ')}]`);
  updatePipelineProgressBar(stepIdx + 1);
}

function updatePipelineProgressBar(completedCount) {
  const total = window.EBAO_BATCH_PIPELINE.length;
  const pct = Math.round((completedCount / total) * 100);
  const textEl = document.getElementById('pipeline-progress-text');
  const barEl = document.getElementById('pipeline-progress-bar');
  if (textEl) textEl.textContent = `${completedCount} / ${total} Jobs Completed (${pct}%)`;
  if (barEl) barEl.style.width = `${pct}%`;
}

function logToTerminal(msg) {
  const term = document.getElementById('terminal-log-output');
  if (!term) return;
  const row = document.createElement('div');
  row.textContent = msg;
  term.appendChild(row);
  term.scrollTop = term.scrollHeight;
}

function setupDatabaseTableExplorer() {
  renderDatabaseTablesList();

  const searchInput = document.getElementById('search-tables-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.tableSearchQuery = e.target.value.toLowerCase();
      renderDatabaseTablesList();
    });
  }

  document.querySelectorAll('.domain-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.domain-pill').forEach(p => {
        p.classList.remove('bg-blue-600', 'text-white', 'font-semibold');
        p.classList.add('bg-slate-100', 'text-slate-600');
      });
      pill.classList.remove('bg-slate-100', 'text-slate-600');
      pill.classList.add('bg-blue-600', 'text-white', 'font-semibold');

      STATE.tableDomainFilter = pill.dataset.domain;
      renderDatabaseTablesList();
    });
  });

  inspectTableByName('T_POLICY');
}

function renderDatabaseTablesList() {
  const container = document.getElementById('table-items-list');
  if (!container || !window.EBAO_TABLES) return;

  const filtered = window.EBAO_TABLES.filter(t => {
    if (STATE.tableDomainFilter !== 'All' && t.category !== STATE.tableDomainFilter) return false;
    if (!STATE.tableSearchQuery) return true;
    return t.name.toLowerCase().includes(STATE.tableSearchQuery) ||
           t.pk.toLowerCase().includes(STATE.tableSearchQuery) ||
           t.desc.toLowerCase().includes(STATE.tableSearchQuery);
  });

  const countEl = document.getElementById('table-filter-count');
  if (countEl) countEl.textContent = `${filtered.length} tables`;

  container.innerHTML = filtered.map(t => `
    <div onclick="inspectTableByName('${t.name}')" class="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-colors flex items-center justify-between">
      <div>
        <div class="font-mono font-bold text-xs text-slate-900">${t.name}</div>
        <div class="text-[10px] text-slate-500 truncate max-w-[180px]">${t.desc}</div>
      </div>
      <div class="text-right">
        <span class="text-[9px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">${t.category}</span>
        <div class="text-[9px] font-mono text-blue-600 mt-0.5">PK: ${t.pk}</div>
      </div>
    </div>
  `).join('');
}

function inspectTableByName(tableName) {
  const table = window.EBAO_TABLES.find(t => t.name === tableName);
  if (!table) return;

  document.getElementById('inspect-table-name').textContent = table.name;
  document.getElementById('inspect-table-category').textContent = table.category;
  document.getElementById('inspect-table-module').textContent = table.module;
  document.getElementById('inspect-table-desc').textContent = table.desc;
  document.getElementById('inspect-table-pk').textContent = table.pk;
  document.getElementById('inspect-table-fk').textContent = table.fk;

  const parentsEl = document.getElementById('inspect-upstream-parents');
  const childrenEl = document.getElementById('inspect-downstream-children');

  const parentMatches = window.EBAO_TABLES.filter(t => table.fk.includes(t.name) && t.name !== table.name);
  if (parentsEl) {
    parentsEl.innerHTML = parentMatches.length > 0 ? parentMatches.map(p => `
      <div class="flex items-center justify-between bg-white p-1.5 rounded border border-slate-200 cursor-pointer hover:bg-emerald-50" onclick="inspectTableByName('${p.name}')">
        <span class="font-mono text-emerald-800 font-bold">${p.name}</span>
        <span class="text-[10px] text-slate-500">${p.category}</span>
      </div>
    `).join('') : '<div class="text-slate-400 italic">None (Root master table)</div>';
  }

  const childMatches = window.EBAO_TABLES.filter(t => t.fk.includes(table.name) && t.name !== table.name);
  if (childrenEl) {
    childrenEl.innerHTML = childMatches.length > 0 ? childMatches.map(c => `
      <div class="flex items-center justify-between bg-white p-1.5 rounded border border-slate-200 cursor-pointer hover:bg-indigo-50" onclick="inspectTableByName('${c.name}')">
        <span class="font-mono text-indigo-800 font-bold">${c.name}</span>
        <span class="text-[10px] text-slate-500">${c.category}</span>
      </div>
    `).join('') : '<div class="text-slate-400 italic">None (Leaf transaction table)</div>';
  }

  if (STATE.activeTab === 'diagrams' && STATE.activeDiagSubtab !== 'diag-tables') {
    const btn = document.querySelector('.diag-subtab-btn[data-diagtab="diag-tables"]');
    if (btn) btn.click();
  }
}

function setupTransactionsCatalog() {
  renderTransactionsCatalogTable();

  const searchInput = document.getElementById('search-transactions-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.txSearchQuery = e.target.value.toLowerCase();
      renderTransactionsCatalogTable();
    });
  }

  document.querySelectorAll('.tx-mod-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.tx-mod-pill').forEach(p => {
        p.classList.remove('bg-blue-600', 'text-white', 'font-bold');
        p.classList.add('bg-slate-100', 'text-slate-700');
      });
      pill.classList.remove('bg-slate-100', 'text-slate-700');
      pill.classList.add('bg-blue-600', 'text-white', 'font-bold');

      STATE.txModuleFilter = pill.dataset.txMod;
      renderTransactionsCatalogTable();
    });
  });
}

function renderTransactionsCatalogTable() {
  const tbody = document.getElementById('tbody-transactions');
  if (!tbody || !window.EBAO_TRANSACTIONS) return;

  const filtered = window.EBAO_TRANSACTIONS.filter(tx => {
    if (STATE.txModuleFilter !== 'All' && tx.module !== STATE.txModuleFilter) return false;
    if (!STATE.txSearchQuery) return true;
    return tx.code.toLowerCase().includes(STATE.txSearchQuery) ||
           tx.name.toLowerCase().includes(STATE.txSearchQuery) ||
           tx.entities.toLowerCase().includes(STATE.txSearchQuery) ||
           tx.impact.toLowerCase().includes(STATE.txSearchQuery) ||
           tx.trigger.toLowerCase().includes(STATE.txSearchQuery);
  });

  tbody.innerHTML = filtered.map(tx => `
    <tr>
      <td>
        <code class="font-mono text-xs font-bold text-brand-navy bg-brand-navy-light px-2 py-0.5 rounded border border-blue-200">${tx.code}</code>
      </td>
      <td class="font-bold text-slate-900">${tx.name}</td>
      <td>
        <span class="text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">${tx.module}</span>
      </td>
      <td>
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${tx.cat === 'Financial' || tx.cat === 'Collection' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}">${tx.cat}</span>
      </td>
      <td class="text-slate-600 text-xs">${tx.trigger}</td>
      <td>
        <div class="flex flex-wrap gap-1">
          ${tx.entities.split(',').map(e => `<span class="font-mono text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 cursor-pointer" onclick="inspectTableByName('${e.trim()}')">${e.trim()}</span>`).join('')}
        </div>
      </td>
      <td class="text-slate-700 text-xs">${tx.impact}</td>
    </tr>
  `).join('');
}

// ==============================================================
// 6. VIEW 4: EBAO LITE SIMULATOR (8 WORKBENCHES)
// ==============================================================
function renderSimulatorView() {
  updateSimulatorActivePolicyBanner();
  renderWorkbench(STATE.activeWorkbench);
  renderLedgerTable();
  renderActuarialChart();
}

function updateSimulatorActivePolicyBanner() {
  const p = STATE.policy;
  document.getElementById('sim-policy-no').textContent = p.policyNo;
  document.getElementById('sim-status-badge').textContent = p.status;

  const badge = document.getElementById('sim-status-badge');
  if (badge) {
    if (p.status === 'INFORCE') badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30';
    else if (p.status === 'INFORCE_APL') badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30';
    else if (p.status === 'TERMINATED_FREE_LOOK') badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30';
    else if (p.status === 'LAPSED') badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-400/30';
    else if (p.status === 'TERMINATED_DEATH') badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30';
  }

  document.getElementById('sim-insured-name').textContent = p.insuredName;
  document.getElementById('sim-insured-dob').textContent = `${p.insuredDOB} (Age ${p.attainedAge})`;
  document.getElementById('sim-plan-name').textContent = p.planName;
  document.getElementById('sim-ptd-date').textContent = p.ptdDate;

  document.getElementById('sim-sum-assured').textContent = `$${p.sumAssured.toLocaleString()}`;
  document.getElementById('sim-cash-value').textContent = `$${Math.round(p.grossCashValue).toLocaleString()}`;
  const totalDebt = p.loanPrincipal + p.loanInterestAccrued;
  document.getElementById('sim-loan-debt').textContent = `$${Math.round(totalDebt).toLocaleString()}`;
}

function renderWorkbench(wbId) {
  const container = document.getElementById('workbench-container');
  if (!container) return;

  const p = STATE.policy;

  if (wbId === 'MOD_01') {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <h3 class="font-extrabold text-base text-slate-900">Module 01: Product Configuration Workbench</h3>
        <button onclick="openPdfViewer(1)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.1
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Select Base Product</label>
          <select id="wb1-plan" class="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white">
            <option value="ENDOW_20" ${p.planCode==='ENDOW_20'?'selected':''}>Endowment 20-Year (Par)</option>
            <option value="TERM_20" ${p.planCode==='TERM_20'?'selected':''}>Level Term 20-Year</option>
            <option value="WHOLE_LIFE" ${p.planCode==='WHOLE_LIFE'?'selected':''}>Whole Life Savings</option>
          </select>
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Payment Frequency</label>
          <select id="wb1-mode" class="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white">
            <option value="1.0">Annual (Factor 1.0)</option>
            <option value="0.52">Semi-Annual (Factor 0.52)</option>
            <option value="0.265">Quarterly (Factor 0.265)</option>
            <option value="0.09">Monthly (Factor 0.09)</option>
          </select>
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Entry Age</label>
          <input type="number" id="wb1-entry-age" value="${p.issueAge}" class="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono">
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-slate-100 flex justify-end">
        <button id="btn-wb1-reconfigure" class="px-4 py-2 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold rounded-lg text-xs shadow-sm">
          Save Configuration & Recalculate
        </button>
      </div>
    `;

    document.getElementById('btn-wb1-reconfigure').onclick = () => {
      p.planCode = document.getElementById('wb1-plan').value;
      p.planName = document.getElementById('wb1-plan').options[document.getElementById('wb1-plan').selectedIndex].text;
      p.modalLoadingFactor = parseFloat(document.getElementById('wb1-mode').value);
      p.issueAge = parseInt(document.getElementById('wb1-entry-age').value);
      p.currentAnnualPrem = p.baseAnnualPrem * p.modalLoadingFactor;
      addLedgerEntry('MOD_01 PROD', 'TX-NB-003 Reconfigure Product Specs', 'Parameters Updated', 0);
      updateSimulatorActivePolicyBanner();
      renderActuarialChart();
    };
  }

  else if (wbId === 'MOD_02') {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
        <h3 class="font-extrabold text-base text-slate-900">Module 02: New Business & Statutory 21-Day Free-Look Cancellation</h3>
        <button onclick="openPdfViewer(88)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.88
        </button>
      </div>
      <p class="text-xs text-slate-500 mb-4">Under Insurance Law, policyholder has 21 days from Policy Delivery Date (e-ACK) to cancel and receive full refund minus medical examination costs.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Confirmed Delivery Date</label>
          <input type="date" id="wb2-delivery-date" value="${p.deliveryDate}" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono bg-white">
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Incurred Medical Exam Cost</label>
          <input type="number" id="wb2-med-cost" value="${p.medicalExamCosts}" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono bg-white">
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Product Line Type</label>
          <select id="wb2-lob" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white">
            <option value="Trad">Traditional (Endowment / Term / Whole Life)</option>
            <option value="ILP">Investment-Linked (ILP Unit Liquidation)</option>
          </select>
        </div>
      </div>

      <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs mb-4">
        <div class="font-bold text-amber-900 mb-1">Calculated Refund Breakdown:</div>
        <div class="text-slate-700 space-y-1">
          <div>Gross Premiums Paid: <b>$${p.totalPremiumsPaid.toLocaleString()}</b></div>
          <div>Less Deductible Medical Expenses: <b>-$${p.medicalExamCosts}</b></div>
          <div class="font-bold text-blue-700 text-sm pt-1 border-t border-amber-200">Net Refund Payable to Customer: $${(p.totalPremiumsPaid - p.medicalExamCosts).toLocaleString()}</div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
        <span class="text-xs text-rose-600 font-semibold">Action executes 100% Agent Commission Clawback and terminates policy VOID_AB_INITIO.</span>
        <button id="btn-wb2-execute-freelook" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-sm">
          Execute 21-Day Free-Look Cancellation
        </button>
      </div>
    `;

    document.getElementById('btn-wb2-execute-freelook').onclick = () => {
      const med = parseFloat(document.getElementById('wb2-med-cost').value);
      const refund = p.totalPremiumsPaid - med;
      p.status = 'TERMINATED_FREE_LOOK';
      p.grossCashValue = 0;
      p.sumAssured = 0;
      addLedgerEntry('MOD_02 NB', 'TX-CS-008 Statutory Free-Look Cancellation', 'Dr. Premium Refund', refund);
      addLedgerEntry('MOD_07 PAY', 'TX-PAY-001 Free-Look Refund Voucher', 'Cr. Cash at Bank', refund);
      addLedgerEntry('MOD_07 PAY', 'TX-PAY-003 Commission Clawback (100%)', 'Dr. Agent Clawback', p.baseAnnualPrem * 0.4);
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_02');
      renderLedgerTable();
      renderActuarialChart();
    };
  }

  else if (wbId === 'MOD_03') {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <h3 class="font-extrabold text-base text-slate-900">Module 03: Underwriting Risk Rating Workbench</h3>
        <button onclick="openPdfViewer(143)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.143
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Extra Mortality Loading (% EM)</label>
          <input type="number" id="wb3-em" value="${p.extraMortalityPct}" class="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white">
          <p class="text-[10px] text-slate-500 mt-1">E.g. +50% EM for cardiovascular risk</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Flat Per Mille Loading ($/1,000 SA)</label>
          <input type="number" id="wb3-flat" value="${p.flatLoadingMille}" step="0.5" class="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white">
          <p class="text-[10px] text-slate-500 mt-1">E.g. $2.50 per $1,000 SA for hazardous sports</p>
        </div>
      </div>
      <div class="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs mb-4">
        <div>Current Base Premium: <b>$${p.baseAnnualPrem.toLocaleString()}</b></div>
        <div class="font-bold text-blue-700 mt-1">New Rated Premium: $${p.currentAnnualPrem.toLocaleString()}</div>
      </div>
      <div class="flex justify-end pt-2 border-t border-slate-100">
        <button id="btn-wb3-apply-rating" class="px-4 py-2 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold rounded-lg text-xs shadow-sm">
          Apply Underwriting Loadings
        </button>
      </div>
    `;

    document.getElementById('btn-wb3-apply-rating').onclick = () => {
      const em = parseFloat(document.getElementById('wb3-em').value) || 0;
      const flat = parseFloat(document.getElementById('wb3-flat').value) || 0;
      p.extraMortalityPct = em;
      p.flatLoadingMille = flat;
      const emAmount = p.baseAnnualPrem * (em / 100);
      const flatAmount = (p.sumAssured / 1000) * flat;
      p.currentAnnualPrem = p.baseAnnualPrem + emAmount + flatAmount;
      addLedgerEntry('MOD_03 UW', `TX-UW-003 Apply Loading (+${em}% EM, +$${flat}/mille)`, 'Rated Premium', p.currentAnnualPrem);
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_03');
      renderLedgerTable();
    };
  }

  else if (wbId === 'MOD_04') {
    const maxLoan = p.grossCashValue * 0.85;
    const currentDebt = p.loanPrincipal + p.loanInterestAccrued;
    const availLoan = Math.max(0, maxLoan - currentDebt);

    container.innerHTML = `
      <div class="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
        <h3 class="font-extrabold text-base text-slate-900">Module 04: Customer Service (Policy Servicing) & Policy Loans Workbench</h3>
        <button onclick="openPdfViewer(196)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.196
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        
        <!-- Action A: DOB Re-rating -->
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-slate-900 mb-1">1. Retrospective DOB / Gender Correction</h4>
            <p class="text-[11px] text-slate-500 mb-3">Re-rates contract. If older: generates back-premium bill; if younger: refunds excess premium.</p>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label class="block text-slate-600 mb-1">Corrected DOB</label>
                <input type="date" id="wb4-dob" value="${p.insuredDOB}" class="w-full px-2 py-1.5 border border-slate-300 rounded font-mono bg-white">
              </div>
              <div>
                <label class="block text-slate-600 mb-1">True Issue Age</label>
                <input type="number" id="wb4-age" value="${p.issueAge}" class="w-full px-2 py-1.5 border border-slate-300 rounded font-mono bg-white">
              </div>
            </div>
          </div>
          <button id="btn-wb4-rerate-dob" class="mt-3 w-full py-2 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold rounded-lg text-xs shadow-sm">
            Recalculate Premium & Post Journal
          </button>
        </div>

        <!-- Action B: 85% Policy Loan -->
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-bold text-slate-900">2. Disburse Policy Loan (Max 85% LTV)</h4>
              <span class="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Avail: $${Math.round(availLoan).toLocaleString()}</span>
            </div>
            <p class="text-[11px] text-slate-500 mb-3">Statutory limit: 85% of Cash Value at 6.5% compound annual interest.</p>
            <div>
              <label class="block text-slate-600 mb-1">Borrow Amount ($)</label>
              <input type="number" id="wb4-loan-amt" value="${Math.min(5000, Math.round(availLoan))}" max="${availLoan}" class="w-full px-2 py-1.5 border border-slate-300 rounded font-mono bg-white">
            </div>
          </div>
          <div class="flex items-center gap-2 mt-3">
            <button id="btn-wb4-disburse-loan" class="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm">
              Disburse Loan
            </button>
            <button id="btn-wb4-repay-loan" class="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-xs">
              Repay All
            </button>
          </div>
        </div>

      </div>

      <!-- Action C: Add Supplementary Rider Mid-Term -->
      <div class="mt-4 p-4 bg-purple-50/60 rounded-xl border border-purple-200 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-base p-1.5 bg-purple-100 text-purple-700 rounded-lg">➕</span>
            <div>
              <h4 class="font-bold text-slate-900">3. Add Supplementary Rider Mid-Term (CS-FN-03 / TX-CS-017)</h4>
              <p class="text-[11px] text-slate-500">Attach rider to inforce policy. Choose Next Due Date ($0 short fee) or Immediate Inception with Pro-Rata Short Premium.</p>
            </div>
          </div>
          <span class="font-mono text-purple-700 font-bold bg-purple-100 px-2.5 py-0.5 rounded text-xs border border-purple-300">Underwritten</span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
          <div>
            <label class="block text-slate-700 font-semibold mb-1">Select Rider Product</label>
            <select id="wb4-rider-select" class="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono bg-white">
              <option value="CI_50|360|Critical Illness 50-Condition">CI-02 Critical Illness ($360/yr)</option>
              <option value="HI_01|240|Hospital Income Daily Cash">HI-03 Hospital Income ($240/yr)</option>
              <option value="ACC_01|120|Personal Accident Coverage">ACC-01 Personal Accident ($120/yr)</option>
            </select>
          </div>
          <div>
            <label class="block text-slate-700 font-semibold mb-1">Effective Date Inception Option</label>
            <select id="wb4-rider-opt" class="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
              <option value="IMMEDIATE">Immediate Inception (Pro-Rata Short Premium)</option>
              <option value="NEXT_DUE">Next Due Date (No Short-Period Fee)</option>
            </select>
          </div>
          <div>
            <label class="block text-slate-700 font-semibold mb-1">Next Policy Due Date</label>
            <input type="date" id="wb4-rider-due" value="${p.dueDate}" class="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono bg-white" readonly>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-purple-200">
          <div class="text-[11px] text-purple-900">
            Estimated Pro-Rata Due: <b id="wb4-pro-rata-preview" class="font-mono text-purple-800 text-xs">$180.00</b> (Days remaining: approx 182 days / 365)
          </div>
          <button id="btn-wb4-attach-rider" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs shadow-sm transition-all flex items-center gap-1.5">
            <span>➕</span> <span>Approve UW & Attach Rider</span>
          </button>
        </div>
      </div>

      <!-- Action D: Surrender -->
      <div class="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
        <div class="text-xs text-slate-500">
          Net Surrender Value Payable: <b class="text-slate-900 font-mono font-bold">$${Math.round(p.grossCashValue - currentDebt).toLocaleString()}</b>
        </div>
        <button id="btn-wb4-surrender" class="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg text-xs transition-colors">
          Surrender Policy (Terminate Contract)
        </button>
      </div>
    `;

    document.getElementById('btn-wb4-rerate-dob').onclick = () => {
      const newAge = parseInt(document.getElementById('wb4-age').value);
      const diffYears = newAge - p.issueAge;
      if (diffYears > 0) {
        const arrears = diffYears * 320 * 4;
        addLedgerEntry('MOD_04 CS', `TX-CS-005 DOB Alteration (Age ${p.issueAge} -> ${newAge})`, 'Dr. Premium Arrears Bill', arrears);
      } else if (diffYears < 0) {
        const refund = Math.abs(diffYears) * 280 * 4;
        addLedgerEntry('MOD_04 CS', `TX-CS-005 DOB Alteration (Age ${p.issueAge} -> ${newAge})`, 'Cr. Refund Voucher', refund);
      }
      p.issueAge = newAge;
      p.attainedAge = newAge + 3;
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_04');
      renderLedgerTable();
    };

    document.getElementById('btn-wb4-disburse-loan').onclick = () => {
      const amt = parseFloat(document.getElementById('wb4-loan-amt').value);
      if (amt <= 0 || amt > availLoan) {
        alert('Loan amount exceeds 85% Cash Value threshold!');
        return;
      }
      p.loanPrincipal += amt;
      addLedgerEntry('MOD_04 CS', `TX-CS-011 Disburse Policy Loan (85% LTV)`, 'Dr. Policy Loan Asset', amt);
      addLedgerEntry('MOD_07 PAY', `TX-PAY-001 Loan Disbursement Voucher`, 'Cr. Bank Account', amt);
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_04');
      renderLedgerTable();
      renderActuarialChart();
    };

    document.getElementById('btn-wb4-repay-loan').onclick = () => {
      const debt = p.loanPrincipal + p.loanInterestAccrued;
      if (debt <= 0) return;
      addLedgerEntry('MOD_04 CS', `TX-CS-012 Repay Policy Loan`, 'Cr. Policy Loan Asset', debt);
      p.loanPrincipal = 0;
      p.loanInterestAccrued = 0;
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_04');
      renderLedgerTable();
      renderActuarialChart();
    };

    // Rider Preview & Attachment Handler
    const updateWb4RiderPreview = () => {
      const riderVal = document.getElementById('wb4-rider-select').value;
      const optVal = document.getElementById('wb4-rider-opt').value;
      const annualPrem = parseFloat(riderVal.split('|')[1]) || 0;
      const prevEl = document.getElementById('wb4-pro-rata-preview');
      if (!prevEl) return;
      if (optVal === 'NEXT_DUE') {
        prevEl.innerHTML = '<span class="text-emerald-700 font-bold">$0.00</span> (Coverage begins on next anniversary)';
      } else {
        const proRata = Math.round(annualPrem * 0.5);
        prevEl.innerHTML = `<span class="text-purple-700 font-bold">$${proRata}.00</span> (Immediate coverage, pro-rata billed)`;
      }
    };

    const selRider = document.getElementById('wb4-rider-select');
    const selOpt = document.getElementById('wb4-rider-opt');
    if (selRider) selRider.onchange = updateWb4RiderPreview;
    if (selOpt) selOpt.onchange = updateWb4RiderPreview;
    updateWb4RiderPreview();

    const btnAttachRider = document.getElementById('btn-wb4-attach-rider');
    if (btnAttachRider) {
      btnAttachRider.onclick = () => {
        const riderVal = document.getElementById('wb4-rider-select').value;
        const optVal = document.getElementById('wb4-rider-opt').value;
        const [rCode, rPrem, rName] = riderVal.split('|');
        const annPrem = parseFloat(rPrem) || 0;

        if (optVal === 'IMMEDIATE') {
          const proRata = Math.round(annPrem * 0.5);
          p.currentAnnualPrem += annPrem;
          addLedgerEntry('MOD_04 CS', `TX-CS-017 Mid-Term Rider Addition: ${rName}`, 'Dr. Pro-Rata Short Premium Bill', proRata);
          alert(`✅ Rider attached successfully!
- Product: ${rName}
- Effective Date: Immediate (${STATE.systemDate.toISOString().split('T')[0]})
- Pro-Rata Short Bill: $${proRata}
- Next Consolidated Modal Bill: $${p.currentAnnualPrem}/yr`);
        } else {
          p.currentAnnualPrem += annPrem;
          addLedgerEntry('MOD_04 CS', `TX-CS-017 Rider Endorsement (Eff: Next Due Date): ${rName}`, 'Cr. Rider Endorsement Record', 0);
          alert(`✅ Rider attached successfully!
- Product: ${rName}
- Effective Date: Next Due Date (${p.dueDate})
- Immediate Short Fee: $0
- Next Modal Bill: $${p.currentAnnualPrem}/yr`);
        }
        updateSimulatorActivePolicyBanner();
        renderLedgerTable();
      };
    }

    document.getElementById('btn-wb4-surrender').onclick = () => {
      const netPayable = p.grossCashValue - currentDebt;
      p.status = 'TERMINATED_SURRENDER';
      p.grossCashValue = 0;
      p.sumAssured = 0;
      p.loanPrincipal = 0;
      p.loanInterestAccrued = 0;
      addLedgerEntry('MOD_04 CS', 'TX-CS-009 Full Policy Surrender', 'Dr. Surrender Expense', netPayable);
      addLedgerEntry('MOD_07 PAY', 'TX-PAY-001 Surrender Settlement Voucher', 'Cr. Bank Account', netPayable);
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_04');
      renderLedgerTable();
      renderActuarialChart();
    };
  }

  else if (wbId === 'MOD_05') {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
        <h3 class="font-extrabold text-base text-slate-900">Module 05: Billing & Collection Workbench</h3>
        <button onclick="openPdfViewer(342)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.342
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Premium Due Date</label>
          <span class="font-mono text-xs font-semibold text-slate-900">${p.dueDate}</span>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Grace Period Days Elapsed</label>
          <span class="font-mono text-xs font-bold text-blue-700">${p.graceDaysElapsed} / 60 Days</span>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label class="font-bold text-slate-700 block mb-1">Modal Amount Due</label>
          <span class="font-mono text-xs font-bold text-emerald-700">$${p.currentAnnualPrem.toLocaleString()}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button id="btn-wb5-gen-bill" class="px-3.5 py-2 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold rounded-lg text-xs">
          Generate T-30 Billing Notice
        </button>
        <button id="btn-wb5-advance-grace" class="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs">
          Advance Grace +15 Days
        </button>
        <button id="btn-wb5-collect" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs">
          Collect Premium (Direct Debit)
        </button>
      </div>
    `;

    document.getElementById('btn-wb5-gen-bill').onclick = () => {
      addLedgerEntry('MOD_05 BIL', 'TX-BIL-001 Generate T-30 Renewal Notice', 'Dr. Premium Receivable', p.currentAnnualPrem);
      renderLedgerTable();
    };

    document.getElementById('btn-wb5-advance-grace').onclick = () => {
      p.graceDaysElapsed += 15;
      if (p.graceDaysElapsed >= 60) {
        alert('Grace period 60 days exceeded! Batch APL / Auto-Lapse will trigger tonight.');
      }
      renderWorkbench('MOD_05');
    };

    document.getElementById('btn-wb5-collect').onclick = () => {
      p.graceDaysElapsed = 0;
      p.totalPremiumsPaid += p.currentAnnualPrem;
      p.grossCashValue += p.currentAnnualPrem * 0.65;
      addLedgerEntry('MOD_05 BIL', 'TX-BIL-003 Settle Direct Debit Clearing', 'Cr. Premium Receivable', p.currentAnnualPrem);
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_05');
      renderLedgerTable();
      renderActuarialChart();
    };
  }

  else if (wbId === 'MOD_06') {
    const currentDebt = p.loanPrincipal + p.loanInterestAccrued;
    const netDeathBenefit = p.sumAssured + p.accumulatedBonus - currentDebt;

    container.innerHTML = `
      <div class="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
        <h3 class="font-extrabold text-base text-slate-900">Module 06: Claims Adjudication & Debt Netting Workbench</h3>
        <button onclick="openPdfViewer(304)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.304
        </button>
      </div>
      <div class="p-4 bg-purple-50 rounded-xl border border-purple-200 text-xs mb-4">
        <h4 class="font-bold text-purple-900 mb-2">Death Claim Benefit Calculation Engine (Net of Debts):</h4>
        <div class="space-y-1.5 text-slate-700">
          <div class="flex justify-between">
            <span>Gross Contractual Sum Assured:</span>
            <b class="font-mono">$${p.sumAssured.toLocaleString()}</b>
          </div>
          <div class="flex justify-between">
            <span>Plus Accumulated Reversionary Bonuses:</span>
            <b class="font-mono text-emerald-700">+$${p.accumulatedBonus.toLocaleString()}</b>
          </div>
          <div class="flex justify-between text-rose-600 font-bold bg-white p-2 rounded border border-rose-200">
            <span>Less Outstanding Policy Loan Debt & Accrued Interest (Netting):</span>
            <span class="font-mono">-$${Math.round(currentDebt).toLocaleString()}</span>
          </div>
          <div class="flex justify-between text-base font-extrabold text-purple-900 pt-2 border-t border-purple-200">
            <span>Net Claim Settlement Payable:</span>
            <span class="font-mono">$${Math.round(netDeathBenefit).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
        <span class="text-xs text-slate-500">Terminates policy due to Life Assured Deceased.</span>
        <button id="btn-wb6-settle-claim" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs shadow-sm">
          Adjudicate & Settle Death Claim
        </button>
      </div>
    `;

    document.getElementById('btn-wb6-settle-claim').onclick = () => {
      p.status = 'TERMINATED_DEATH';
      p.sumAssured = 0;
      p.grossCashValue = 0;
      p.loanPrincipal = 0;
      p.loanInterestAccrued = 0;
      addLedgerEntry('MOD_06 CLM', 'TX-CLM-005 Adjudicate Death Claim Benefit', 'Dr. Death Claim Expense', netDeathBenefit);
      addLedgerEntry('MOD_06 CLM', 'TX-CLM-007 Net Out Policy Loan Debt', 'Cr. Policy Loan Asset', currentDebt);
      addLedgerEntry('MOD_07 PAY', 'TX-PAY-001 Death Settlement Voucher', 'Cr. Bank Clearing', netDeathBenefit);
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_06');
      renderLedgerTable();
      renderActuarialChart();
    };
  }

  else if (wbId === 'MOD_07') {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
        <h3 class="font-extrabold text-base text-slate-900">Module 07: Payment & Financial Accounting Workbench</h3>
        <button onclick="openPdfViewer(376)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.376
        </button>
      </div>
      <p class="text-xs text-slate-500 mb-4">Centralized disbursement hub for Claim vouchers, Policy Loan payouts, Surrender settlements, and GL Roll.</p>
      
      <div class="table-container mb-4">
        <table class="standard-table">
          <thead>
            <tr>
              <th>Voucher ID</th>
              <th>Origin</th>
              <th>Payee</th>
              <th>Amount</th>
              <th>AML Status</th>
              <th>Authorization</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-mono font-bold text-xs text-blue-700">VOUCH-2026-9901</td>
              <td>MOD_06 Claim Settlement</td>
              <td>Nguyen Thi Mai (Beneficiary)</td>
              <td class="font-mono font-bold text-emerald-700">$98,000</td>
              <td><span class="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">PASSED</span></td>
              <td><span class="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">AUTHORIZED</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end pt-2 border-t border-slate-100">
        <button id="btn-wb7-roll-gl" class="px-4 py-2 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold rounded-lg text-xs shadow-sm">
          Transmit Sub-Ledger Batch to ERP GL (SAP)
        </button>
      </div>
    `;

    document.getElementById('btn-wb7-roll-gl').onclick = () => {
      alert('Sub-ledger journals extracted and posted to SAP General Ledger. Batch balanced: Debits = Credits.');
      addLedgerEntry('MOD_07 PAY', 'TX-PAY-007 GL Batch Interface Extracted', 'GL Posted', 0);
      renderLedgerTable();
    };
  }

  else if (wbId === 'MOD_08') {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
        <h3 class="font-extrabold text-base text-slate-900">Module 08: Batch Console & System Maintenance Workbench</h3>
        <button onclick="openPdfViewer(426)" class="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
          📄 PDF Guide P.426
        </button>
      </div>
      <p class="text-xs text-slate-500 mb-4">Simulate the nightly automated EOD batch engine on this active policy.</p>

      <div class="grid grid-cols-2 gap-3 text-xs mb-4">
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span class="font-bold text-slate-700 block mb-1">Grace Period Days:</span>
          <span class="font-mono text-sm font-bold text-blue-700">${p.graceDaysElapsed} / 60</span>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span class="font-bold text-slate-700 block mb-1">Overdue Outcome at Day 60:</span>
          <span class="font-mono text-xs font-bold ${p.grossCashValue >= p.currentAnnualPrem ? 'text-emerald-700' : 'text-rose-700'}">
            ${p.grossCashValue >= p.currentAnnualPrem ? 'APL (Cash Value Sufficient)' : 'AUTO-LAPSE (Cash Value Insufficient)'}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button id="btn-wb8-run-apl" class="px-3.5 py-2 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold rounded-lg text-xs">
          Trigger Batch Job 08: Auto Premium Loan (APL)
        </button>
        <button id="btn-wb8-run-lapse" class="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs">
          Trigger Batch Job 09: Auto-Lapse
        </button>
      </div>
    `;

    document.getElementById('btn-wb8-run-apl').onclick = () => {
      if (p.grossCashValue >= p.currentAnnualPrem) {
        p.status = 'INFORCE_APL';
        p.loanPrincipal += p.currentAnnualPrem;
        p.graceDaysElapsed = 0;
        addLedgerEntry('MOD_08 BAT', 'TX-BAT-008 Execute Auto Premium Loan (APL)', 'Dr. Policy Loan Asset', p.currentAnnualPrem);
        alert('APL executed successfully! Loan drawn to pay overdue premium. Policy remains INFORCE_APL.');
      } else {
        alert('Net cash value insufficient for APL. Policy must LAPSE!');
      }
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_08');
      renderLedgerTable();
      renderActuarialChart();
    };

    document.getElementById('btn-wb8-run-lapse').onclick = () => {
      p.status = 'LAPSED';
      p.sumAssured = 0;
      p.grossCashValue = 0;
      addLedgerEntry('MOD_08 BAT', 'TX-BAT-009 Execute Auto-Lapse', 'Status LAPSED', 0);
      alert('Policy has LAPSED! Coverage extinguished. 2-year reinstatement window initialized.');
      updateSimulatorActivePolicyBanner();
      renderWorkbench('MOD_08');
      renderLedgerTable();
      renderActuarialChart();
    };
  }
}

function addLedgerEntry(module, tx, type, amount) {
  const dateStr = STATE.systemDate.toISOString().split('T')[0];
  STATE.ledger.unshift({
    date: dateStr,
    module: module,
    tx: tx,
    type: type,
    amount: amount,
    balance: STATE.policy.grossCashValue
  });
}

function renderLedgerTable() {
  const tbody = document.getElementById('tbody-ledger');
  if (!tbody) return;

  tbody.innerHTML = STATE.ledger.map(row => `
    <tr>
      <td class="font-mono text-xs text-slate-500">${row.date}</td>
      <td class="font-mono text-xs font-semibold text-blue-700">${row.module}</td>
      <td class="font-bold text-slate-900">${row.tx}</td>
      <td><span class="text-[10px] font-semibold px-2 py-0.5 rounded ${row.type.includes('Cr') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${row.type}</span></td>
      <td class="font-mono font-bold text-slate-900">$${Math.round(row.amount).toLocaleString()}</td>
      <td class="font-mono text-slate-500">$${Math.round(row.balance).toLocaleString()}</td>
    </tr>
  `).join('');
}

function renderActuarialChart() {
  const ctx = document.getElementById('actuarial-chart');
  if (!ctx) return;

  const p = STATE.policy;
  const totalDebt = p.loanPrincipal + p.loanInterestAccrued;
  const netEquity = Math.max(0, p.grossCashValue - totalDebt);

  const data = {
    labels: ['Net Cash Equity', 'Active Loan Debt', 'Accrued Interest'],
    datasets: [{
      data: [Math.round(netEquity), Math.round(p.loanPrincipal), Math.round(p.loanInterestAccrued)],
      backgroundColor: ['#10b981', '#f43f5e', '#f59e0b'],
      borderWidth: 0
    }]
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
      },
      cutout: '65%'
    }
  });
}

// ==============================================================
// 7. VIEW 5: 394 FUNCTIONS MATRIX (EXCEL v26.04)
// ==============================================================
function renderMatrixView() {
  const appFilter = document.getElementById('matrix-app-filter');
  const lobFilter = document.getElementById('matrix-lob-filter');
  const searchInput = document.getElementById('search-matrix-input');
  const btnPrev = document.getElementById('btn-matrix-prev');
  const btnNext = document.getElementById('btn-matrix-next');
  const btnExport = document.getElementById('btn-export-matrix-csv');

  if (appFilter) {
    appFilter.addEventListener('change', (e) => {
      STATE.matrixAppFilter = e.target.value;
      STATE.matrixPage = 1;
      renderMatrixRows();
    });
  }

  if (lobFilter) {
    lobFilter.addEventListener('change', (e) => {
      STATE.matrixLobFilter = e.target.value;
      STATE.matrixPage = 1;
      renderMatrixRows();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.matrixSearchQuery = e.target.value.toLowerCase();
      STATE.matrixPage = 1;
      renderMatrixRows();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (STATE.matrixPage > 1) {
        STATE.matrixPage--;
        renderMatrixRows();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      STATE.matrixPage++;
      renderMatrixRows();
    });
  }

  if (btnExport) {
    btnExport.addEventListener('click', exportMatrixToCSV);
  }

  renderMatrixRows();
}

function renderMatrixRows() {
  const tbody = document.getElementById('tbody-matrix');
  if (!tbody || !window.EBAO_FUNCTIONS) return;

  const filtered = window.EBAO_FUNCTIONS.filter(f => {
    if (STATE.matrixAppFilter !== 'All' && f.app !== STATE.matrixAppFilter) return false;
    if (STATE.matrixLobFilter !== 'All') {
      const l = STATE.matrixLobFilter.toLowerCase();
      const hasLob = (f.trad && l.includes('trad')) ||
                     (f.ilp && l.includes('ilp')) ||
                     (f.par && l.includes('par')) ||
                     (f.group && l.includes('group'));
      if (!hasLob) return false;
    }
    if (!STATE.matrixSearchQuery) return true;
    return (f.name && f.name.toLowerCase().includes(STATE.matrixSearchQuery)) ||
           (f.l1 && f.l1.toLowerCase().includes(STATE.matrixSearchQuery)) ||
           (f.l2 && f.l2.toLowerCase().includes(STATE.matrixSearchQuery)) ||
           (f.l3 && f.l3.toLowerCase().includes(STATE.matrixSearchQuery)) ||
           (f.desc && f.desc.toLowerCase().includes(STATE.matrixSearchQuery));
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / STATE.matrixPageSize) || 1;
  if (STATE.matrixPage > totalPages) STATE.matrixPage = totalPages;

  const startIdx = (STATE.matrixPage - 1) * STATE.matrixPageSize;
  const endIdx = Math.min(startIdx + STATE.matrixPageSize, total);
  const paged = filtered.slice(startIdx, endIdx);

  const infoEl = document.getElementById('matrix-pagination-info');
  const pageNumEl = document.getElementById('matrix-page-num');
  const btnPrev = document.getElementById('btn-matrix-prev');
  const btnNext = document.getElementById('btn-matrix-next');

  if (infoEl) infoEl.textContent = `Showing ${total === 0 ? 0 : startIdx + 1} to ${endIdx} of ${total} functions`;
  if (pageNumEl) pageNumEl.textContent = `Page ${STATE.matrixPage} of ${totalPages}`;
  if (btnPrev) btnPrev.disabled = STATE.matrixPage <= 1;
  if (btnNext) btnNext.disabled = STATE.matrixPage >= totalPages;

  tbody.innerHTML = paged.map((f, i) => `
    <tr>
      <td class="font-mono text-xs text-slate-400">${startIdx + i + 1}</td>
      <td><span class="font-mono text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">${f.app}</span></td>
      <td class="text-xs text-slate-600">${f.l1 || '-'}</td>
      <td class="text-xs text-slate-600">${f.l2 || '-'}</td>
      <td class="text-xs text-slate-600">${f.l3 || '-'}</td>
      <td class="font-bold text-slate-900">${f.name}</td>
      <td class="text-xs text-slate-600 max-w-sm">${f.desc || '-'}</td>
      <td>
        <div class="flex gap-1">
          ${f.trad ? '<span class="text-[9px] bg-blue-100 text-blue-700 px-1 rounded">TRAD</span>' : ''}
          ${f.ilp ? '<span class="text-[9px] bg-purple-100 text-purple-700 px-1 rounded">ILP</span>' : ''}
          ${f.par ? '<span class="text-[9px] bg-emerald-100 text-emerald-700 px-1 rounded">PAR</span>' : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

function exportMatrixToCSV() {
  if (!window.EBAO_FUNCTIONS) return;
  const headers = ['No', 'App', 'Level 1', 'Level 2', 'Level 3', 'Function Name', 'Description', 'Traditional', 'ILP', 'PAR'];
  const rows = window.EBAO_FUNCTIONS.map((f, idx) => [
    idx + 1,
    `"${f.app || ''}"`,
    `"${f.l1 || ''}"`,
    `"${f.l2 || ''}"`,
    `"${f.l3 || ''}"`,
    `"${f.name || ''}"`,
    `"${(f.desc || '').replace(/"/g, '""')}"`,
    f.trad ? 'Y' : 'N',
    f.ilp ? 'Y' : 'N',
    f.par ? 'Y' : 'N'
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'eBao_Gemini_Function_List_v26.04.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==============================================================
// 8. VIEW 6: INSUREFORGE PRODUCT STUDIO
// ==============================================================
function renderConfiguratorView() {
  const btnGen = document.getElementById('btn-generate-config');
  const btnCopy = document.getElementById('btn-copy-schema');

  if (btnGen) {
    btnGen.addEventListener('click', () => {
      const code = document.getElementById('cfg-prod-code').value;
      const name = document.getElementById('cfg-prod-name').value;
      const lob = document.getElementById('cfg-prod-lob').value;
      const cur = document.getElementById('cfg-prod-currency').value;
      const pTerm = parseInt(document.getElementById('cfg-policy-term').value);
      const payTerm = parseInt(document.getElementById('cfg-pay-term').value);
      const ltv = parseInt(document.getElementById('cfg-loan-ltv').value);

      const schema = {
        "schema_version": "2026.04",
        "system_target": "eBao Gemini Life Core PAS",
        "product_definition": {
          "product_code": code,
          "product_name": name,
          "line_of_business": lob,
          "currency": cur,
          "status": "ACTIVE_INFORCE"
        },
        "contractual_terms": {
          "policy_term_years": pTerm,
          "premium_paying_term_years": payTerm,
          "max_policy_loan_ltv_pct": ltv,
          "loan_interest_rate_pa": 0.065,
          "grace_period_days": 60,
          "free_look_cooling_off_days": 21
        },
        "modal_loadings": {
          "annual": 1.0,
          "semi_annual": 0.52,
          "quarterly": 0.265,
          "monthly": 0.09
        },
        "database_table_bindings": [
          "T_PROD_DEF",
          "T_PROD_TERM",
          "T_RATE_TABLE",
          "T_RATE_MATRIX",
          "T_SURRENDER_VAL_SCHEDULE",
          "T_NON_FORFEITURE_PARAM"
        ]
      };

      const preview = document.getElementById('config-schema-preview');
      if (preview) {
        preview.textContent = JSON.stringify(schema, null, 2);
      }
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const preview = document.getElementById('config-schema-preview');
      if (preview) {
        navigator.clipboard.writeText(preview.textContent);
        alert('Schema copied to clipboard!');
      }
    });
  }
}


// ==============================================================
// 4F. MASTER POLICY LIFECYCLE VALIDATION MATRIX (50+ RULES)
// ==============================================================
function renderValidationRulesTable() {
  const tbody = document.getElementById('tbody-validation-rules');
  if (!tbody || !window.EBAO_VALIDATION_RULES) return;

  const searchInput = document.getElementById('val-search-input');
  const phaseSelect = document.getElementById('val-filter-phase');
  const severitySelect = document.getElementById('val-filter-severity');
  const badgeTotal = document.getElementById('val-badge-total');

  if (!window._valListenersAttached) {
    if (searchInput) searchInput.addEventListener('input', () => renderValidationRulesTable());
    if (phaseSelect) phaseSelect.addEventListener('change', () => renderValidationRulesTable());
    if (severitySelect) severitySelect.addEventListener('change', () => renderValidationRulesTable());
    window._valListenersAttached = true;
  }

  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const phase = phaseSelect ? phaseSelect.value : 'All';
  const severity = severitySelect ? severitySelect.value : 'All';

  const filtered = window.EBAO_VALIDATION_RULES.filter(r => {
    if (phase !== 'All' && r.lifecyclePhase !== phase) return false;
    if (severity !== 'All' && r.severity !== severity) return false;
    if (query) {
      const matchText = `${r.ruleId} ${r.ruleName} ${r.errorCode} ${r.targetEntity} ${r.condition} ${r.systemAction} ${r.moduleName} ${r.actuarialBasis}`.toLowerCase();
      if (!matchText.includes(query)) return false;
    }
    return true;
  });

  if (badgeTotal) {
    badgeTotal.textContent = filtered.length;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="p-8 text-center text-slate-400 text-xs italic">
          No validation rules matched your search and filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    let severityBadge = '';
    if (r.severity === 'HARD_STOP') {
      severityBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200"><span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>HARD STOP</span>';
    } else if (r.severity === 'SOFT_WARNING') {
      severityBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200"><span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>WARNING</span>';
    } else if (r.severity === 'ROUTING') {
      severityBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200"><span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>ROUTING</span>';
    } else {
      severityBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">INFO</span>';
    }

    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="p-3 align-top">
          <div class="font-mono text-xs font-bold text-slate-900">${r.ruleId}</div>
          <div class="mt-1">${severityBadge}</div>
        </td>
        <td class="p-3 align-top">
          <div class="font-semibold text-slate-900 text-xs">${r.lifecyclePhase}</div>
          <div class="text-[11px] text-slate-500 font-mono mt-0.5">${r.stage}</div>
          <span class="inline-block mt-1 text-[10px] font-mono bg-slate-100 text-brand-navy px-1.5 py-0.5 rounded font-semibold border border-slate-200">${r.module}</span>
        </td>
        <td class="p-3 align-top">
          <span class="font-mono text-[11px] text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-200 font-bold block w-fit">
            ${r.targetEntity}
          </span>
        </td>
        <td class="p-3 align-top space-y-1.5">
          <div class="font-bold text-slate-900 text-xs">${r.ruleName}</div>
          <div class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
            <span class="font-semibold text-slate-900">Condition:</span> ${r.condition}
          </div>
          <div class="flex items-center gap-1.5 font-mono text-[10px] text-rose-700 font-bold">
            <span>⚠️ Error Code:</span>
            <span class="bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">${r.errorCode}</span>
          </div>
        </td>
        <td class="p-3 align-top space-y-1.5">
          <div class="text-xs text-slate-800 leading-relaxed">
            <span class="font-semibold text-slate-900">System Enforcement:</span> ${r.systemAction}
          </div>
          <div class="text-[11px] text-emerald-800 bg-emerald-50/80 p-2 rounded border border-emerald-200/60 leading-relaxed">
            <span class="font-bold text-emerald-900">Actuarial / Legal Rationale:</span> ${r.actuarialBasis}
          </div>
        </td>
        <td class="p-3 align-top text-center">
          <button onclick="openPdfViewer(${r.pdfPage || 1})" 
                  class="px-2.5 py-1 bg-white hover:bg-indigo-50 text-indigo-700 font-mono text-[11px] font-bold rounded border border-indigo-300 shadow-2xs transition-colors flex items-center gap-1 mx-auto">
            <span>📄</span> P.${r.pdfPage}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}
window.renderValidationRulesTable = renderValidationRulesTable;


// ==============================================================
// 4G. RENDER GL JOURNAL ENTRY PATTERN (INTERACTIVE SIMULATOR)
// ==============================================================
function renderGlPattern(patternId) {
  const box = document.getElementById('gl-pattern-detail-box');
  if (!box || !window.EBAO_MODULES) return;

  const mod07 = window.EBAO_MODULES.find(m => m.id === 'MOD_07');
  if (!mod07 || !mod07.journal_entry_patterns) return;

  const pattern = mod07.journal_entry_patterns.find(p => p.id === patternId) || mod07.journal_entry_patterns[0];

  box.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
      <div class="flex items-center gap-2">
        <span class="font-mono text-xs font-bold text-white bg-brand-navy px-2 py-0.5 rounded shadow-2xs">${pattern.id}</span>
        <span class="font-extrabold text-xs text-slate-900">${pattern.name}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">Fee Source: ${pattern.source}</span>
        <span class="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">${pattern.txCode}</span>
      </div>
    </div>

    <!-- T-Account Double Entry Box -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
      <!-- DEBIT SIDE -->
      <div class="p-3 bg-white rounded-lg border-l-4 border-l-emerald-600 border border-slate-200 shadow-2xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="font-extrabold text-xs text-emerald-800 uppercase tracking-wider">Debit (DR) Account</span>
          <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">Asset / Expense / Revenue Reversal</span>
        </div>
        <div class="font-bold text-slate-900 text-xs whitespace-pre-line">${pattern.dr}</div>
        <div class="text-[10px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
          <span class="font-semibold text-slate-700">7-Segment:</span> ${pattern.segDr}
        </div>
      </div>

      <!-- CREDIT SIDE -->
      <div class="p-3 bg-white rounded-lg border-l-4 border-l-blue-600 border border-slate-200 shadow-2xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="font-extrabold text-xs text-blue-800 uppercase tracking-wider">Credit (CR) Account</span>
          <span class="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">Revenue / Liability / Asset Offset</span>
        </div>
        <div class="font-bold text-slate-900 text-xs whitespace-pre-line">${pattern.cr}</div>
        <div class="text-[10px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
          <span class="font-semibold text-slate-700">7-Segment:</span> ${pattern.segCr}
        </div>
      </div>
    </div>

    <!-- Balance Check & Actuarial Context -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="font-bold text-emerald-950">Mathematical Double-Entry Balance Check:</span>
        <span class="text-emerald-800 font-semibold">SUM(Debit) == SUM(Credit) [0.00 Variance]</span>
      </div>
      <span class="font-mono text-[10px] font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-300">
        Status: 100% RECONCILED
      </span>
    </div>

    <p class="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100 leading-relaxed">
      <span class="font-bold text-slate-800 not-italic">Nghiệp Vụ & Căn Cứ Kế Toán:</span> ${pattern.desc}
    </p>
  `;
}
window.renderGlPattern = renderGlPattern;
