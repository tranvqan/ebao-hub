// Auto-generated eBao Data Bundle (Zero CORS offline execution)
window.EBAO_MODULES = [
  {
    "id": "MOD_01",
    "num": "01",
    "title": "Mod 01: Architecture & Product Factory",
    "subtitle": "Microservices, BFF, BS Layer, SOR & Declarative Service Orchestration",
    "icon": "⚙️",
    "badge": "Core Architecture",
    "page_range": "Pages 1 - 32",
    "summary": "Gemini Life Core PAS is built on InsureMO's multi-layered microservices framework. It decouples UI from back-end transactional engines using Backend-For-Frontend (BFF) and Business Service (BS) orchestration. Core transactions commit to high-performance System of Record (SOR) tables while supporting non-invasive declarative orchestration (Garment & Fabrics) for localized business logic without code recompilation.",
    "mermaid_workflow": "graph TD\n    UI[\"Gemini Modern UI (Vue/React Portal)\"] --> BFF[\"BFF Layer (Backend For Frontend)\"]\n    BFF --> BS[\"Business Service (BS) Orchestration\"]\n    BS --> ISO[\"Internal Service Orchestration (Garment & Fabrics)\"]\n    ISO --> PF[\"Product Factory Runtime Engine\"]\n    ISO --> AtomicAPIs[\"Atomic Microservices (NB, UW, CS, CLM, FIN)\"]\n    AtomicAPIs --> SOR[\"SOR Tables (System of Record Database)\"]\n    AtomicAPIs --> EventBus[\"Event Bus / Message Queue\"]\n    EventBus --> BatchEngine[\"Batch Console Engine\"]",
    "core_concepts": [
      {
        "term": "BFF (Backend for Frontend)",
        "definition": "An aggregation and translation layer that adapts core microservices to specific web, mobile, and partner portal requirements, preventing frontend coupling to internal database schemas."
      },
      {
        "term": "BS (Business Service Layer)",
        "definition": "Orchestrates atomic microservices (building blocks) into composite end-to-end transaction APIs (e.g. Complete Proposal Submission or Claim Settlement)."
      },
      {
        "term": "SOR (System of Record)",
        "definition": "Authoritative database tables maintaining immutable transactional policy states separated cleanly from staging or temporary quotation workbenches."
      },
      {
        "term": "Garment & Fabrics Orchestration",
        "definition": "A declarative workflow pattern in Gemini where a 'Garment' represents the processing context and 'Fabrics' represent modular execution steps woven dynamically to customize regional rules without modifying core source code."
      }
    ],
    "actuary_notes": [
      "Atomic Rating Microservice: Gemini invokes the InsureMO Product Factory runtime engine as a headless rating service, accepting JSON payloads and returning calculated gross premiums, riders, and modal factors instantly.",
      "Dynamic Parameterization: Actuarial assumptions (interest rates, mortality tables, surrender penalty percentages) are decoupled into Config Tables, enabling product parameter tuning without releasing new software builds.",
      "Multi-Currency & Modal Loading: Standard modal conversion formulas: Monthly = Annual * 0.088 (or 1/12 with loading), Semi-Annual = Annual * 0.51, Quarterly = Annual * 0.26."
    ],
    "op_notes": [
      "Single Sign-On & URP (User Role & Permissions): Multi-tenant architecture allows segregated operational units (Servicing Branches, Agencies, Underwriting Pools) with strict row-level access control.",
      "Auditing & Immutable Event Logs: Every transition from Reception -> Underwriting -> Inforce -> Endorsement -> Claim is timestamped with user ID, before/after JSON diffs, and workflow execution IDs.",
      "High Throughput & Resiliency: Asynchronous task distribution ensures that heavy batch jobs (e.g., month-end valuation, premium billing runs) never degrade interactive UI response times."
    ],
    "sections": [
      {
        "heading": "1. Layered Microservices Topology",
        "content": "The InsureMO platform employs a 4-tier architectural abstraction:\n\n1. Presentation Layer (UI): Built with lightweight, responsive component libraries supporting diverse screen resolutions, role-based navigation, and real-time form validation.\n2. BFF Layer (Backend For Frontend): Acts as the gateway for web and mobile clients, handling session validation, request transformation, and regional localization.\n3. Business Service Layer (BS): Implements domain-driven services (e.g., NB BS, CS BS, Claim BS, Finance BS). It coordinates atomic services to ensure transactional integrity across multi-step insurance operations.\n4. System of Record (SOR): High-reliability relational data stores maintaining policy contracts, accounting ledgers, and audit histories."
      },
      {
        "heading": "2. Internal Service Orchestration (Garment & Fabrics)",
        "content": "In life insurance PAS implementations, regional markets frequently demand customizations (e.g., specific tax deductions, local KYC checks, non-standard grace calculations). Traditionally, these required hard-coded branches.\n\nGemini solves this using Garment & Fabrics Orchestration:\n- Garment: Represents the transactional envelope carrying policy state and payload throughout the API lifecycle.\n- Fabrics: Atomic, reusable functional steps (e.g., Validate National ID, Fetch Rate Table, Check AML Blacklist, Calculate Modal Premium).\n- Weaving: Business Analysts can re-order, inject, or bypass Fabrics at runtime via declarative rules, achieving complete customization with zero code changes."
      },
      {
        "heading": "3. Tenant & Master Data Management",
        "content": "Tenant segregation isolates product catalogs, organizational hierarchies, bank interfaces, and currency settings while sharing the resilient core runtime. Centralized Data Dictionaries and translation engines allow dual-language deployments with localized terminology."
      },
      {
        "heading": "4. Step-by-Step Guide: Configuring a New Product in eBao Product Factory",
        "content": "Configuring a new product in eBao Life Core PAS involves a 10-step parameterization process within the InsureMO Product Factory runtime engine:\n\n1. **Step 1: Product Master Definition (`T_PROD_DEF`)**:\n   - Define Product Code (e.g. `ENDOW_15`), Product Name, Line of Business (Traditional Life / Endowment), Base Currency (USD/VND), and Product Effective/Expiration Dates.\n2. **Step 2: Eligibility & Term Setup (`T_PROD_TERM`)**:\n   - Set Minimum Issue Age (18) and Maximum Issue Age (60).\n   - Define Policy Term (15 Years) and Premium Paying Term (Single, 5Y, 10Y, 15Y).\n   - Set Maturity Age Cap (e.g. Age 75).\n3. **Step 3: Sum Assured Rules (`T_PROD_SA_RULE`)**:\n   - Minimum Sum Assured (e.g. $10,000) and Maximum Sum Assured (e.g. $1,000,000).\n   - Incremental Step Multiple (e.g. multiples of $1,000).\n   - Juvenile Sum Assured Statutory Caps (under age 5 capped at $20,000).\n4. **Step 4: Premium Calculation Formula & Rate Tables (`T_RATE_TABLE`)**:\n   - Upload mortality rate tables (CSV/Excel matrix by Attained Age x Gender x Smoker Status).\n   - Define loading formulas: Base Premium = `SA / 1000 * Rate(Age, Gender, Term)`.\n5. **Step 5: Modal Loading Factors (`T_MODAL_FACTOR`)**:\n   - Annual = 1.0\n   - Semi-Annual = 0.51 (2% loading)\n   - Quarterly = 0.26 (4% loading)\n   - Monthly = 0.088 (5.6% loading)\n6. **Step 6: Cash Value Schedules & Bonus Engine (`T_SURRENDER_VAL_SCHEDULE`)**:\n   - Configure Guaranteed Surrender Value (GSV) percentages by policy duration (Yr 1: 0%, Yr 2: 30%, Yr 3: 50%, ..., Yr 15: 105%).\n   - Configure Reversionary Bonus (compound 1.8% p.a.) and Terminal Bonus (15% at maturity).\n7. **Step 7: Rider Compatibility Matrix (`T_RIDER_COMPATIBILITY`)**:\n   - Define eligible riders: AD&D, Accelerated Critical Illness, Waiver of Premium, Hospital Income.\n   - Set maximum rider SA ratio (e.g. Max Rider SA <= 100% of Base Plan SA).\n8. **Step 8: Auto-Underwriting STP Rules (`T_AUTO_UW_RULE`)**:\n   - Define straight-through processing thresholds: Age <= 45 and SA <= $150,000 and Clean Health Declaration -> 100% STP Pass.\n   - Define medical referral triggers (BMI > 32, adverse cardio history, hazardous sports).\n9. **Step 9: Non-Forfeiture & Loan Parameters (`T_NON_FORFEITURE_PARAM`)**:\n   - Automatic Premium Loan (APL): Enabled = Yes, Trigger = Day 60 overdue.\n   - Policy Loan: Max Loan-to-Value (LTV) = 85% of Gross Cash Value, Annual Interest Rate = 6.5% p.a.\n   - Non-Forfeiture Options: Reduced Paid-Up (RPU) = Enabled, Extended Term Insurance (ETA) = Enabled.\n10. **Step 10: Sandbox Verification & Compilation (`PUBLISH_TO_SOR`)**:\n    - Run quote test cases in Product Factory Sandbox.\n    - Compile declarative JSON schema and deploy to Gemini SOR runtime tables (`T_PROD_*`)."
      }
    ],
    "mapped_functions": [
      {
        "id": "F_001",
        "app": "COMMON",
        "l1": "User Setting",
        "l2": "Basic Information",
        "l3": "",
        "l4": "",
        "desc": "User account's basic information view and maintain, such as real name, organization name, E-mail, Supervisor, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_002",
        "app": "COMMON",
        "l1": "User Setting",
        "l2": "Safety Information",
        "l3": "",
        "l4": "",
        "desc": "User account's password modification.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_003",
        "app": "COMMON",
        "l1": "My Home",
        "l2": "Dashboard",
        "l3": "",
        "l4": "",
        "desc": "A graphical interface to display key performance data and progress of work based on user's role and authority.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_004",
        "app": "COMMON",
        "l1": "Global Search",
        "l2": "Global Search",
        "l3": "",
        "l4": "",
        "desc": "Global search for user to query info such as menu, policy, cusotmer, task etc. by input search critieria",
        "comments": "New Function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_219",
        "app": "COMMON",
        "l1": "ELS",
        "l2": "ELS Register Query",
        "l3": "",
        "l4": "",
        "desc": "Query ElderShield / CareShield Life (ELS) coverage information from Medinet, including basic and supplement plan details, to verify policy eligibility and claim entitlement.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_220",
        "app": "COMMON",
        "l1": "ELS",
        "l2": "ELS Medinet File",
        "l3": "",
        "l4": "",
        "desc": "View synchronized ELS data from Medinet—such as plan activation, termination, reinstatement and claim‑related updates—to ensure alignment with national ELS records.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_221",
        "app": "COMMON",
        "l1": "ELS",
        "l2": "ELS Register Update",
        "l3": "Query",
        "l4": "",
        "desc": "Review all ELS update submissions from NB/CS/Claim modules, with visibility of update type and Medinet response status (Pending / Success / Fail) for operational tracking.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_222",
        "app": "COMMON",
        "l1": "ELS",
        "l2": "ELS Register Update",
        "l3": "Follow up",
        "l4": "",
        "desc": "Handle ELS update exceptions returned by Medinet by correcting customer/policy data and resubmitting to maintain accurate ELS supplement records.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_223",
        "app": "COMMON",
        "l1": "ELS",
        "l2": "ELS Register Update",
        "l3": "Watch List",
        "l4": "",
        "desc": "Monitor outstanding ELS update follow‑up tasks across teams, with options to reassign items and ensure timely resolution of Medinet exceptions.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_224",
        "app": "COMMON",
        "l1": "ELS",
        "l2": "Active Member Reconciliation",
        "l3": "",
        "l4": "",
        "desc": "Reconcile insurer ELS supplement policy data with CPF Board / Medinet monthly Active Member records, identify unmatched entries, and perform corrections to maintain data consistency.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_225",
        "app": "COMMON",
        "l1": "Investment",
        "l2": "Fund Price",
        "l3": "Entry",
        "l4": "",
        "desc": "Query and maintain fund price.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_226",
        "app": "COMMON",
        "l1": "Investment",
        "l2": "Fund Price",
        "l3": "Approve",
        "l4": "",
        "desc": "Approve fund price. \nScheduled batch to confirm fund price after approved.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_227",
        "app": "COMMON",
        "l1": "Investment",
        "l2": "Fund Price",
        "l3": "Revise",
        "l4": "",
        "desc": "Revise fund price after approved or confirmed",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_228",
        "app": "COMMON",
        "l1": "Investment",
        "l2": "Exchange Rate",
        "l3": "",
        "l4": "",
        "desc": "Configure exchange rate for multi-currency operation.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_229",
        "app": "COMMON",
        "l1": "Investment",
        "l2": "Fund Holiday",
        "l3": "",
        "l4": "",
        "desc": "Set fund holidays.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_230",
        "app": "COMMON",
        "l1": "Maintain Hospital",
        "l2": "",
        "l3": "",
        "l4": "",
        "desc": "Maintain a comprehensive provider directory, including details for hospitals and clinics. This directory stores basic, representative, contact, bank, tax, and bankruptcy information, as well as fee schedules and associated doctors.\n\nIt supports key processes:\nUnderwriting & Claims retrieve providers to generate medical report applications.\nMedical Claims capture the treating hospital for the life assured's incident.",
        "comments": "New function in v2025",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_231",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Manage Policy Document",
        "l3": "Print Policy Document",
        "l4": "",
        "desc": "Print policy document/certificate, system will auto send policy document/certificate to pre-configured printer.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_232",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Manage Policy Document",
        "l3": "Reprint Policy Document",
        "l4": "",
        "desc": "Reprint policy document/certificate with original policy data when policy issued. Also support regenerate policy document/certificate when latest policy data. System will auto send policy document/certificate to pre-configured printer.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_233",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Manage Policy Document",
        "l3": "Query Policy Document",
        "l4": "",
        "desc": "Query policy document/certificate. User can preview policy document/certificate in PDF by this function.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_234",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Manage Letters",
        "l3": "Print Letter",
        "l4": "",
        "desc": "Print query letter, system will auto send letter to pre-configured printer.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_235",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Manage Letters",
        "l3": "Reprint Letter",
        "l4": "",
        "desc": "Reprint letter, system will auto send letter to pre-configured printer.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_236",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Manage Letters",
        "l3": "Reply Letter",
        "l4": "",
        "desc": "Reply letter",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_237",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Manage Letters",
        "l3": "Query Letter",
        "l4": "",
        "desc": "Query letter. User can preview letter in PDF by this function.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_238",
        "app": "COMMON",
        "l1": "Document",
        "l2": "Adhoc Letter Generation",
        "l3": "",
        "l4": "",
        "desc": "Function to backend staff to adoc trigger a pre-defined letter for specific policy.",
        "comments": "New function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_239",
        "app": "COMMON",
        "l1": "Reports",
        "l2": "Download",
        "l3": "",
        "l4": "",
        "desc": "Download reports of selected parameters in excel or PDF format.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_240",
        "app": "COMMON",
        "l1": "Reports",
        "l2": "Configuration",
        "l3": "",
        "l4": "",
        "desc": "Configure reports, including downloading/uploading template, maintaining template basic information, and maintaining report parameters.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_241",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Search Homepage",
        "l4": "",
        "desc": "Support advanced search criteria including policy no., proposal no., customer name, etc.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_242",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Policy Information",
        "l4": "",
        "desc": "It's a glance of policy information, including basic information, policy date info, policy status, and other key info.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_243",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Customer Information",
        "l4": "Policy Role Customer List",
        "desc": "Display customer information with hyperlink which links to customer query page, including policy holder information, life assured information, nominee/beneficiary information, trustee, etc.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_244",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Customer Information",
        "l4": "Customer Detail Information",
        "desc": "Link to customer query page to show customer detail information.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_245",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Financial Information",
        "l4": "",
        "desc": "Display policy financial information, including billing related financial information, suspense information, policy value information, etc.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_246",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Financial Information",
        "l4": "Outstanding Billing Information",
        "desc": "Dispay outstanding biling records with detail information, including billing date, billing amount and collection method.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_247",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Financial Information",
        "l4": "Outstanding Payment Information",
        "desc": "Dispay outstanding payment records with detaill information, including payment date, amount and payment method.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_248",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Financial Information",
        "l4": "Loan Account List",
        "desc": "Display loan information with original principle, latest principle balance, interest balance, create date, latest capitalization date etc. With links to the page showing detail transaction record of the loan and deposit accounts.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_249",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Financial Information",
        "l4": "Deposit Account List",
        "desc": "Display deposit information with original principle, latest principle balance, interest balance, create date, latest capitalization date etc. With links to the page showing detail transaction record of the loan and deposit accounts.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_250",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Product Information",
        "l4": "Benefit List",
        "desc": "Display all products of the policy and key product information, including life assured, sum assured, benefit status etc.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_251",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Product Information",
        "l4": "Detail Benefit Information",
        "desc": "Displays product detail information including cover start date, cover end date, payment frequency, etc., and extra premium, SA schedule and indexation segment info.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_252",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Investment Information",
        "l4": "",
        "desc": "Displays investment information including product level investment account record, policy virtual account record, pending and occurred fund transaction records, etc. Investment related bonus allocation information and regular withdraw plan.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_253",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Benefits and Bonus Information",
        "l4": "Survival Benefit Information",
        "desc": "Show survival benefit allocation plan and allocation history",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_254",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Benefits and Bonus Information",
        "l4": "Annuity Information",
        "desc": "Show annuity allocation plan and allocation history",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_255",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Benefits and Bonus Information",
        "l4": "Bonus Information",
        "desc": "Show bonus allocation plan and allocation history for cash bonus, reversionary bonus, loyalty bonus is applicable.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_256",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Transaction Information",
        "l4": "",
        "desc": "Show all transaction of the policy including NB, online CS, batch, claim transactions.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_257",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Transaction Fee Records",
        "l4": "Policy Collection and Payment Information",
        "desc": "Show all policy collection and payment transactions.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_258",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Transaction Fee Records",
        "l4": "Policy Receivable and Payable Information",
        "desc": "Show all policy transaction's receivable and payment fee records including renew billing records.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_259",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "UW History",
        "l4": "",
        "desc": "Displays all NB/CS underwriting history records at product level, including extra premium, restrict SA, exclusion, endorsement and conditions.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_260",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Claim History",
        "l4": "",
        "desc": "Displays all claim case history records with key information and links to query detail claim information. And payment detail information if the payment status is unpaid or partial paid.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_261",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Documents",
        "l4": "",
        "desc": "Displays all the correspondence document records generated in NB, UW, CS and claim. Provide view and download function.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_262",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "Comments",
        "l4": "",
        "desc": "Function to query and maintain comments linked to policies from different departments.",
        "comments": "New function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_263",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query",
        "l3": "New CS/Claim",
        "l4": "",
        "desc": "Enables users to quickly create CS/Claims applications for the policy",
        "comments": "New function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_264",
        "app": "COMMON",
        "l1": "Query",
        "l2": "Global Policy Query UI Configuration",
        "l3": "Global Policy Query Rendering",
        "l4": "",
        "desc": "Function to maintain and configure Global Policy Query UI",
        "comments": "New function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_305",
        "app": "SC APP",
        "l1": "Sales Channel",
        "l2": "Maintain Agent",
        "l3": "",
        "l4": "",
        "desc": "Create or query individual or corporate producer basic information, contact information etc.",
        "comments": "Rebuild in v24.08 (replace SOR)",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_306",
        "app": "SC APP",
        "l1": "Sales Channel",
        "l2": "Channel Organization",
        "l3": "",
        "l4": "",
        "desc": "Set up channel organization  for different distribution channels.",
        "comments": "Rebuild in v24.08 (replace SOR)",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_307",
        "app": "SC APP",
        "l1": "Sales Channel",
        "l2": "Agent Qualification",
        "l3": "",
        "l4": "",
        "desc": "Maintain qualification for individual agents or corporate agents by manually input on UI or by uploading file.",
        "comments": "Rebuild in v24.08 (replace SOR)",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_308",
        "app": "SC APP",
        "l1": "Sales Channel",
        "l2": "Transfer Agent",
        "l3": "",
        "l4": "",
        "desc": "Batch transfer the policy's service agent from one agent to another agent.",
        "comments": "Rebuild in v24.08 (replace SOR)",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_309",
        "app": "SC APP",
        "l1": "Sales Channel",
        "l2": "Basic Commission Query",
        "l3": "",
        "l4": "",
        "desc": "Show all basic commission for all premium transaction at policy product level.",
        "comments": "Rebuild in v24.08 (replace SOR)",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_310",
        "app": "COMMON",
        "l1": "System Administration",
        "l2": "Clear Cache",
        "l3": "",
        "l4": "",
        "desc": "Clear local web cache.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_311",
        "app": "COMMON",
        "l1": "System Administration",
        "l2": "Set Business Date",
        "l3": "",
        "l4": "",
        "desc": "Set business date of the system at tenant level.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_312",
        "app": "COMMON",
        "l1": "System Administration",
        "l2": "Query Version",
        "l3": "",
        "l4": "",
        "desc": "Query version deployed to current ENV",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_313",
        "app": "COMMON",
        "l1": "URP",
        "l2": "Maintain Organization",
        "l3": "",
        "l4": "",
        "desc": "Maintain organization and their hierarchy in the system.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_314",
        "app": "COMMON",
        "l1": "URP",
        "l2": "Maintain User",
        "l3": "",
        "l4": "",
        "desc": "- Create a new user and maintain existing users;\n- Grant roles to an existing user.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_315",
        "app": "COMMON",
        "l1": "URP",
        "l2": "Role Management",
        "l3": "",
        "l4": "",
        "desc": "- Create a new role and maintain existing roles;\n- Grant corresponding permissions.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_316",
        "app": "COMMON",
        "l1": "URP",
        "l2": "Permission Management",
        "l3": "",
        "l4": "",
        "desc": "- Create new permission;\n- Create new menu and UI element;\n- Configure API authority;\n- Hide specific permission code;\n- Export & check in.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_317",
        "app": "RULE ENGINE",
        "l1": "Rule & Rating",
        "l2": "Rule management",
        "l3": "",
        "l4": "",
        "desc": "- Add a new rule; \n- Edit rule;\n- Search for rules based on various categories.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_318",
        "app": "RULE ENGINE",
        "l1": "Rule & Rating",
        "l2": "Rule group",
        "l3": "",
        "l4": "",
        "desc": "- Search rule group.\n- Create a new rule group \n- Edit or delete existing rule group\n- Select the name, description, and module of the rule group and bind the rule group to an event.\n- Select the rule to attach to the rule group and define the order of execution of multiple rules to be run together",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_319",
        "app": "RULE ENGINE",
        "l1": "Rule & Rating",
        "l2": "Rule Event",
        "l3": "",
        "l4": "",
        "desc": "- Create Driver\n- Create Event",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_320",
        "app": "RULE ENGINE",
        "l1": "Rule & Rating",
        "l2": "Rule Tracking",
        "l3": "",
        "l4": "",
        "desc": "View the details of the rule tracking after calling rule Api.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_321",
        "app": "COMMON",
        "l1": "Rule & Rating",
        "l2": "Configure table",
        "l3": "",
        "l4": "",
        "desc": "Configure dynamic logic table (Rate table, Decision Table, Mapping Table )\n- Rate table: table with multiple condition parameters  which will impact result of data related\n- Decision Table:   Decision result judged by business rules\n- Mapping Table:   mapping configure during internal and external integration",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_322",
        "app": "COMMON",
        "l1": "Data Dictionary",
        "l2": "Data Table",
        "l3": "",
        "l4": "",
        "desc": "Maintain code table's code values",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_323",
        "app": "COMMON",
        "l1": "Data Dictionary",
        "l2": "Code Table",
        "l3": "",
        "l4": "",
        "desc": "Maintain code tables",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_324",
        "app": "COMMON",
        "l1": "Translation",
        "l2": "UI Label",
        "l3": "",
        "l4": "",
        "desc": "Maintain UI label name",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_325",
        "app": "COMMON",
        "l1": "Translation",
        "l2": "Code Table",
        "l3": "",
        "l4": "",
        "desc": "Maintain code table's code values' description shown on screen",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_326",
        "app": "COMMON",
        "l1": "Public Setting",
        "l2": "Message",
        "l3": "",
        "l4": "",
        "desc": "Maintain message description",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      }
    ],
    "function_count": 72,
    "sops": [
      {
        "code": "SOP-ARC-01",
        "title": "Multi-Tenant Switching, Login & User Role Permission (URP) Assignment",
        "ui_path": "System Admin > URP (User Role & Permissions) > User Management",
        "prerequisites": [
          "Administrator account credentials with URP access",
          "Valid employee email and active active directory / SSO link"
        ],
        "steps": [
          "1. Access the Gemini Web Portal via browser URL and authenticate using corporate SSO or username/password.",
          "2. If multi-tenant enabled, select the target Tenant/Entity (e.g. Life Insurance Entity Vietnam) from the top tenant picker dropdown.",
          "3. Navigate to Main Menu > System Admin > URP > User Management.",
          "4. In the Search Criteria area, enter the user's Employee ID or Email and click Search.",
          "5. In the Search Result table, click Edit on the user record.",
          "6. In the Role Assignment panel, check appropriate functional roles: [NB_OFFICER, UW_SENIOR, CS_SPECIALIST, CLM_ASSESSOR, ACTUARY_ANALYST, BATCH_ADMIN].",
          "7. In the Organizational Unit & Servicing Branch panel, bind user to authorized operational branches (e.g., Head Office, Hanoi Branch, HCMC Branch).",
          "8. Click Save and click Commit Permissions. Step Result: System outputs 'URP Matrix updated successfully'. User session inherits new role privileges immediately."
        ],
        "fields_table": [
          {
            "name": "Tenant Code",
            "type": "Select",
            "required": "Yes",
            "desc": "Unique identifier for operating insurance entity"
          },
          {
            "name": "User ID / Email",
            "type": "Text",
            "required": "Yes",
            "desc": "Unique corporate identifier"
          },
          {
            "name": "Role Profile",
            "type": "Multi-select",
            "required": "Yes",
            "desc": "Standard eBao role bundles controlling menu and button visibility"
          },
          {
            "name": "Branch Code",
            "type": "Tree Select",
            "required": "Yes",
            "desc": "Defines row-level data access boundary for policy searches"
          }
        ],
        "actuary_notes": "Actuarial roles typically receive read-only access to SOR transaction ledgers plus write access to Product Factory rate tables and valuation extract runs.",
        "op_notes": "Operations supervisors must ensure dual-control segregation: a user with Underwriting role must never have Cashier / Payment Release permissions.",
        "pdf_page": 12
      },
      {
        "code": "SOP-ARC-02",
        "title": "Inspecting & Customizing Internal Service Orchestration (Garment & Fabrics)",
        "ui_path": "System Admin > Internal Service Orchestration > Garment Pipeline",
        "prerequisites": [
          "System Analyst or Technical Lead privileges",
          "Understanding of BFF (Backend for Frontend) and Business Service (BS) topology"
        ],
        "steps": [
          "1. From Main Menu, navigate to System Admin > Internal Service Orchestration.",
          "2. In the Pipeline List, locate the target business service (e.g., 'NB_SUBMIT_PROPOSAL_GARMENT').",
          "3. Click View Fabrics Pipeline to open the visual execution graph.",
          "4. Inspect the sequence of atomic steps (Fabrics): Fabric 1 (Validate Mandatory Fields) -> Fabric 2 (Check Watchlist / PEP) -> Fabric 3 (Invoke Product Factory Rating) -> Fabric 4 (Trigger UW STP Rules) -> Fabric 5 (Commit to SOR).",
          "5. To modify local logic without changing code: Click 'Insert Step', select regional Fabric (e.g., 'VN_TAX_VAT_CALCULATION'), configure input/output JSON mapping parameters, and click Save.",
          "6. Click Test Garment Payload: Paste a sample proposal JSON payload and click 'Dry Run'.",
          "7. Verify that the execution log returns HTTP 200 OK with output context populated.",
          "8. Click Publish Pipeline to deploy the change into the runtime environment."
        ],
        "fields_table": [
          {
            "name": "Garment Code",
            "type": "String",
            "required": "Yes",
            "desc": "Unique identifier of the orchestration context"
          },
          {
            "name": "Fabric Step Name",
            "type": "String",
            "required": "Yes",
            "desc": "Atomic microservice invoked during pipeline step"
          },
          {
            "name": "Execution Condition",
            "type": "Expression",
            "required": "Optional",
            "desc": "SpEL or JSONPath expression determining whether step executes"
          }
        ],
        "actuary_notes": "Garment & Fabrics allows Actuaries to insert custom reserve or commission calculation fabrics directly into the issuance flow without waiting for IT core release cycles.",
        "op_notes": "Dry run feature provides step-by-step latency profiling to identify performance bottlenecks in third-party API calls (e.g. external credit bureau check).",
        "pdf_page": 24
      },
      {
        "code": "SOP-ARC-03",
        "title": "Configuring New Life Insurance Product: Plan Definition, Age Limits, Riders & Actuarial Rate Tables",
        "ui_path": "Main Menu > Architecture & Product Factory > Product Master > Plan Configuration Console",
        "prerequisites": [
          "Product Factory Administrator or Appointed Actuary role assigned in URP",
          "Product Specification Document, actuarial rate tables, and modal loading factors approved"
        ],
        "steps": [
          "1. Navigate to Architecture & Product Factory > Product Master > Create New Plan.",
          "2. Step 1 - Plan Header Definition:\n   - Enter Plan Code (e.g. 'ENDOW_20'), Plan Name ('Endowment 20-Year Participating'), LOB Type ('Traditional / Savings'), and Base Currency ('VND' / 'USD').",
          "3. Step 2 - Contract Term & Age Rules Configuration:\n   - Set Issue Age Range: Minimum Entry Age (30 Days), Maximum Entry Age (60 Years).\n   - Define Coverage Term (20 Years fixed) and Premium Payment Term (PPT: 10, 15, or 20 Years).",
          "4. Step 3 - Supplementary Rider Binding:\n   - Select allowed riders from compatibility matrix: 'CI-02 Critical Illness', 'HI-03 Hospital Income', 'ACC-01 Personal Accident', 'WOP-01 Waiver of Premium'.\n   - Set Maximum Rider SA multiplier: Rider SA cannot exceed 100% of Base SA.",
          "5. Step 4 - Actuarial Rate Tables Upload & Parameterization:\n   - Upload CSV/Excel rate tables: Gross Annual Premium per 1,000 SA, Guaranteed Cash Value schedule, Surrender Penalty scale, and Terminal Bonus factors.\n   - Configure Modal Factors: Annual (1.0), Semi-Annual (0.51), Quarterly (0.26), Monthly (0.088).",
          "6. Step 5 - Rating Engine Testing & Validation:\n   - Input test sample: Male, Age 35, Non-Smoker, SA 100,000,000 VND. Click 'Execute Rating Test'.\n   - Verify calculated premium matches actuarial specification with 0.00% variance.",
          "7. Step 6 - Publish to System of Record:\n   - Click 'Publish Plan'. System commits definitions into T_PLAN, T_PLAN_BENEFIT, T_RATE_TABLE, activating plan for instant quotation across Sales Portals and Core PAS."
        ],
        "fields_table": [
          {
            "name": "Plan Code",
            "type": "String (Unique)",
            "required": "Yes",
            "desc": "Contractual product identifier"
          },
          {
            "name": "Line of Business",
            "type": "Select",
            "required": "Yes",
            "desc": "Traditional, Par, Non-Par, ILP, Universal"
          },
          {
            "name": "Entry Age Bounds",
            "type": "Integer Range",
            "required": "Yes",
            "desc": "Min age (days) and Max entry age"
          },
          {
            "name": "Rate Table Matrices",
            "type": "File Upload / DB",
            "required": "Yes",
            "desc": "Mortality, premium rate, cash value schedules"
          }
        ],
        "actuary_notes": "All pricing tables are decoupled from backend code. Formula engine dynamically loads tables at runtime via headless API.",
        "op_notes": "Once published, plan parameters are version-controlled with audit logs to ensure regulatory compliance with Ministry of Finance approvals.",
        "pdf_page": 28
      }
    ],
    "sop_count": 3,
    "interconnections": {
      "module_code": "ARCH_ISO",
      "upstream_sources": [
        {
          "module": "COMMON / IT INFRA",
          "data": "Tenant profiles, database connections, and SSO identity provider"
        }
      ],
      "downstream_destinations": [
        {
          "module": "MOD_02 New Business",
          "impact": "Provides atomic rating microservice (Product Factory) and UI component schemas"
        },
        {
          "module": "MOD_03 Underwriting",
          "impact": "Provides centralized rules engine and risk evaluation microservices"
        },
        {
          "module": "MOD_04 Customer Service",
          "impact": "Provides ISO Garment/Fabrics execution pipelines for non-invasive regional alteration logic"
        },
        {
          "module": "MOD_05 Billing",
          "impact": "Coordinates asynchronous banking interface microservices"
        },
        {
          "module": "MOD_06 Claims",
          "impact": "Exposes Claim BS APIs and cross-module document repository integration"
        },
        {
          "module": "MOD_07 Payment",
          "impact": "Standardizes sub-ledger accounting schemas for ERP integration"
        },
        {
          "module": "MOD_08 Batch Console",
          "impact": "Supplies job scheduling runtime, thread pools, and distributed lock managers"
        }
      ],
      "shared_data_entities": [
        "T_PROD_DEF (Product Definitions)",
        "T_DATA_DICT (Data Dictionaries)",
        "T_URP_ROLE (User Permissions)"
      ],
      "lifecycle_events": [
        "SYSTEM_STARTUP",
        "TENANT_SWITCH",
        "ORCHESTRATION_PIPELINE_RELOAD"
      ]
    },
    "pdf_start_page": 1,
    "pdf_end_page": 32,
    "pdf_chapter": "Chapter 1: System Foundation & Architecture"
  },
  {
    "id": "MOD_02",
    "num": "02",
    "title": "Mod 02: New Business (NB APP)",
    "subtitle": "Proposal Capture, Product Configuration, Party Hierarchy & Initial Enforcement",
    "icon": "📝",
    "badge": "Policy Inception",
    "page_range": "Pages 33 - 142",
    "summary": "The New Business application governs the full inception lifecycle from quotation, initial registration (reception), party capture (Policyholder, Life Assured, Beneficiary, Trustee), product plan selection (Main Endowment/Term + Multi-Riders), health declaration questionnaires, to initial premium collection and policy enforcement.",
    "mermaid_workflow": "graph LR\n    Draft[\"Proposal Registration\"] --> Party[\"Party & Beneficiary Capture\"]\n    Party --> Plan[\"Product & Rider Configuration\"]\n    Plan --> Dec[\"Declaration Questionnaire\"]\n    Dec --> AutoUW{\"Auto-UW Rules Engine\"}\n    AutoUW -- Pass STP --> Bill[\"Initial Premium Billing\"]\n    AutoUW -- Referral --> UWQueue[\"UW Task Pool (Module 03)\"]\n    UWQueue -- UW Accept --> Bill\n    Bill --> Collect[\"Initial Collection (100% Inforcing Premium)\"]\n    Collect --> Inforce[\"Final Validation & Issue Inforce Policy\"]",
    "core_concepts": [
      {
        "term": "Initial Registration (Reception)",
        "definition": "The formal entry point creating a proposal record, capturing sales channel, servicing agent code, proposal date, and assigning a unique proposal ID."
      },
      {
        "term": "Party Roles Hierarchy",
        "definition": "Explicit separation of Policyholder (Owner), Life Assured (Primary/Joint), Beneficiaries (Revocable/Irrevocable with percentage allocation), and Trustee for minors."
      },
      {
        "term": "Rider Compatibility Rules",
        "definition": "Actuarial dependency matrices defining valid rider attachments, maximum rider Sum Assured relative to Main Plan SA, and matching term durations."
      },
      {
        "term": "Total In-forcing Premium",
        "definition": "The exact mandatory initial payment required (standard premium + extra modal loading + occupational/medical loadings) before the policy can transition to Inforce status."
      },
      {
        "term": "21-Day Free-Look (Cooling-Off) Period",
        "definition": "Statutory 21-day window starting from confirmed Policy Delivery Date (e-ACK) allowing policyholder to cancel with full refund (less actual medical fees) and triggering 100% agent commission clawback."
      }
    ],
    "actuary_notes": [
      "Sum Assured & Term Limits: Main Plan (e.g. Endowment 15Y) defines maximum term and premium paying period. Rider Sum Assured is typically capped at 100% to 300% of Main Plan SA depending on treaty limits.",
      "Endowment Premium Formula: Gross Premium = (Net Premium + Administrative Expense Loading + Distribution Commission) / (1 - Modal Expense Factor).",
      "Joint Life Rules: Gemini supports First-to-Die and Second-to-Die joint life models, adjusting mortality age equivalents based on Gompertz-Makeham mortality law.",
      "Auto-Underwriting STP Rate: Actuaries configure Straight-Through-Processing limits (e.g. Age <= 45 and SA <= $100,000 and Clean Health Declaration -> 100% STP without human underwriter referral).",
      "Free-Look Liability: Reserve liabilities and unearned premiums for policies in the 21-day window are tracked in suspense to facilitate void-ab-initio accounting reversals."
    ],
    "op_notes": [
      "Watch List Screening: Automatic matching of Policyholder and Life Assured against PEP (Politically Exposed Persons), AML, and Internal Adverse Claims Blacklists.",
      "Push vs Auto-Assign Task Strategy: Worklist auto-assign strategy distributes incoming proposals to underwriters based on licensing level, language, and current queue depth.",
      "Collection Reconciliation: Initial premium must match Total Inforcing Premium exactly. Any variance is held in NB Suspense until adjusted or supplemented."
    ],
    "sections": [
      {
        "heading": "1. Proposal Registration & Sales Channel Capture",
        "content": "Operations users or agent portals initiate proposals by selecting channel type (Agency, Bancassurance, Broker, Direct Digital). The system automatically links the servicing branch, commissions hierarchy, and validates agent licensing validity for the selected product."
      },
      {
        "heading": "2. Customer & Beneficiary Party Data Entry",
        "content": "Supports individual and corporate entities. Mandatory fields include full name, national ID/passport with issuance date and place, date of birth, gender, marital status, smoking status, nationality, and occupational classification (Class 1 to Class 4). Beneficiaries must have designated share percentages totaling exactly 100%."
      },
      {
        "heading": "3. Product & Rider Configuration",
        "content": "Users configure the Main Plan (e.g. Endowment 15-Year with Reversionary Bonus) and add eligible riders:\n- Accidental Death & Dismemberment (AD&D)\n- Critical Illness Rider (Accelerated or Additional)\n- Hospital Cash Income Rider\n- Waiver of Premium on Disability/Death of Policyholder\n\nGemini dynamically validates sum assured thresholds, entry age limits, and premium payment frequencies."
      },
      {
        "heading": "4. Declaration Forms & Underwriting Referral",
        "content": "Declaration forms are dynamically generated based on selected products and insured age/gender. If any adverse medical condition, family history, or high hazardous occupation is flagged, Gemini triggers an automated referral rule and routes the case directly to the Underwriting Task Pool."
      },
      {
        "heading": "5. Master Policy Life Cycle Dates & Time Taxonomy (12 Core Dates)",
        "content": "In eBao Gemini Life Core PAS, time and date mechanics govern every transaction, liability calculation, billing cycle, and statutory customer right. All 12 core life cycle dates are structured below:\n\n| # | Date Entity | Formal PAS Definition | System Trigger & Operational Impact | eBao DB Field & Table |\n| :---: | :--- | :--- | :--- | :--- |\n| **01** | **Proposal / Application Date** | The date the applicant completed and signed the formal proposal form. | Determines Issue Age, sets agent licensing validation cutoff, and initializes underwriting SLA tracking. | `T_PROPOSAL.APPLY_DATE` |\n| **02** | **Commencement Date (Risk Date)** | The official inception date when insurance coverage and mortality risk legally take effect. | Base anniversary for policy year counting, attained age increment, cash value schedule, and mortality deductions. | `T_POLICY.COMMENCE_DATE` |\n| **03** | **Policy Issue Date** | The system timestamp when the proposal passed all validations/UW and was generated into an inforce contract. | Triggers policy schedule PDF generation, welcome pack dispatch, initial sales commission booking, and SOR sync. | `T_POLICY.ISSUE_DATE` |\n| **04** | **Policy Delivery Date** | The date the policyholder physically or digitally received the policy contract (signed Ack Receipt / e-ACK). | **LEGAL MILESTONE**: Starts the statutory 21-day Free-Look (Cooling-off) period. If unconfirmed, defaults to Issue Date + 14 days. | `T_POLICY.DELIVERY_DATE` |\n| **05** | **Transaction Date** | The immutable database clock date/time when an operator or batch job executes an action. | Financial sub-ledger audit trail, billing journal entries, cashier receipts, and SOX regulatory compliance. | `T_AUDIT_LOG.TRANS_DATE` / `T_SUB_LEDGER.TRANS_DATE` |\n| **06** | **Paid-To-Date (PTD)** | The calendar date up to which contractual premiums have been fully settled and allocated. | Core status check: If `Current Date > PTD`, policy is in arrears; if `Current Date <= PTD`, policy is active and paid. | `T_POLICY.PAID_TO_DATE` |\n| **07** | **Premium Due Date** | The recurring scheduled date when the next modal premium is due (e.g. annually on Oct 20). | Triggers Module 05 Billing run at T-30 days, generates billing receivable records and dispatch notice. | `T_BILL_RECEIVABLE.DUE_DATE` |\n| **08** | **Grace Period Expiry Date** | Exactly 60 calendar days following the Premium Due Date (Due Date + 60 days). | Policy remains inforce during grace. At 23:59:59 of Day 60, triggers Batch Job for APL or Auto-Lapse. | `T_BILL_RECEIVABLE.GRACE_EXP_DATE` |\n| **09** | **Policy Anniversary Date** | Recurring annual milestone matching Commencement Date month and day. | Automatically increments attained age by +1, vests reversionary bonuses, capitalizes loan interest into principal. | `T_POLICY.ANNIVERSARY_DATE` |\n| **10** | **Lapsed Date** | The exact date on which insurance coverage terminated due to unpaid grace without sufficient cash value. | Sum assured set to 0, rider coverage extinguished; initializes statutory 2-year reinstatement window. | `T_POLICY.LAPSED_DATE` |\n| **11** | **Reinstatement Effective Date** | The date a lapsed policy is officially revived following medical underwriting and settlement of back-premiums. | Resets statutory 2-year contestability and suicide exclusion period for newly declared medical conditions. | `T_POLICY.REINSTATE_DATE` |\n| **12** | **Maturity / Expiry Date** | The contractual termination date of the policy term (Commence Date + Policy Term Years). | Triggers maturity claims processing, releases 100% Sum Assured + Terminal Bonus, and closes policy contract. | `T_POLICY.MATURITY_DATE` |"
      },
      {
        "heading": "6. The 21-Day Free-Look (Cooling-Off) Statutory Rules & Mechanics",
        "content": "The 21-Day Free-Look (Cooling-Off) cancellation is a statutory consumer protection right governed by strict core PAS underwriting and financial ledger rules:\n\n| Dimension / Rule Element | Traditional Products (Endowment / Whole Life / Term) | Investment-Linked Products (ILP / Unit-Linked) |\n| :--- | :--- | :--- |\n| **Statutory Free-Look Window** | Exactly **21 calendar days** from confirmed Policy Delivery Date (e-ACK receipt). | Exactly **21 calendar days** from confirmed Policy Delivery Date (e-ACK receipt). |\n| **Default Fallback Trigger** | If Delivery Receipt is unrecorded: `Issue Date + 14 days` postal allowance. | If Delivery Receipt is unrecorded: `Issue Date + 14 days` postal allowance. |\n| **Gross Refund Calculation** | **100% of Total Initial Premiums Paid** (Base + Riders). | **Unallocated Premium + Market Value of Units + Admin/Allocation Fees**. |\n| **Market Risk Absorption** | Insurer absorbs interest/market risk; customer receives full premium back. | Customer absorbs market risk; units redeemed at next available Net Asset Value (NAV). |\n| **Mandatory Deductions** | Actual medical examination costs (MER, ECG, blood panels) incurred by insurer. | Actual medical examination costs incurred by insurer during underwriting. |\n| **Net Refund Formula** | `Net Refund = Initial Premium Paid - Actual Medical Exam Expenses` | `Net Refund = Unallocated Prem + (Units * Unit Price) + Allocation Fee - Medical Fees` |\n| **Policy Contract Status** | Transitions from `INFORCE` to `TERMINATED_FREE_LOOK` (`VOID_AB_INITIO`). | Transitions from `INFORCE` to `TERMINATED_FREE_LOOK` (`VOID_AB_INITIO`). |\n| **Coverage Termination** | Sum Assured and all supplementary rider covers cease instantaneously upon registration. | Sum Assured, critical illness, and fund units are immediately locked and liquidated. |\n| **Agent Commission Clawback** | **100% Clawback** of initial sales commission paid or credited to servicing agent. | **100% Clawback** of initial sales commission paid or credited to servicing agent. |\n| **Sub-Ledger Accounting Entry** | `Dr. Gross Written Premium Refund` / `Cr. Cash at Bank (Disbursement)` | `Dr. ILP Liability & Fee Reserve` / `Cr. Cash at Bank (Disbursement)` |"
      }
    ],
    "mapped_functions": [
      {
        "id": "F_005",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Registration",
        "l3": "",
        "l4": "",
        "desc": "The function to manually create a new proposal in workbench with proposal basic information such as proposal number, proposal date, main plan, agent etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_006",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Task pool",
        "l4": "",
        "desc": "Manage all NB tasks in a centralized pool with authority control. Fuzzy search and precise search with more search criteria are supported.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_007",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Basic Information Input",
        "desc": "Capture policy basic information, such as agent, commencement date, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_008",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Policy Holder Input",
        "desc": "Capture policy holder information, including basic information, annual income, contact information, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_009",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Life Assured Input",
        "desc": "Capture life assured information, including basic information,  contact information, etc. Support add additional life assured(s) without limitation",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_010",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Payer Input",
        "desc": "Capture payer information, including basic information, annual income, contact information, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_011",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Collection Method Input",
        "desc": "Capture collection method, including new business payment method and renew payment method. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_012",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Disbursement Method Input",
        "desc": "Capture disbursement method which is used for refund. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_013",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Product Input",
        "desc": "Support all mainstream product lines data input, including Whole Life, Endowment, Critical Illness/Cancer, Mortgage/Credit Life, Unit Linked, Universal Life, Variable Universal Life, Variable Annuity, Accident, Health/Medical etc. Also support Premium Waiver/Payer Waiver/Spouse Waiver, Joint-life, Indexation, Level plan, Joint Life Product etc.",
        "comments": "Upgrade function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_014",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Beneficiary Input",
        "desc": "Capture beneficiary information, including basic information, nomination type, order, sharing information, etc. Support to add more than one beneficiary.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_015",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Beneficiary Owner Input",
        "desc": "Capture beneficiary owner information, including basic information, annual income, contact information, etc. Support to add more than one beneficiary owner.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_016",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Trustee Input",
        "desc": "Capture trustee information, including basic information, annual income, contact information, etc. Support to add more than one trustee.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_017",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Trusted Individual Input",
        "desc": "Capture Trusted Individual information, including basic information, contact information, etc. Support to add more than one trustee.",
        "comments": "New Function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_018",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Declaration Input",
        "desc": "Capture declaration information for policy holder, life assureds, and agent.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_019",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Proposal Rules Validation",
        "desc": "Proposal rules validation, including product rules and non-product rules.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_020",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Proposal Issues Handling",
        "desc": "Display Proposal issues according to the validation result of proposal rules. Support to add manual proposal issues, generate Query letter which can list out selected proposal issues and send query letter/proposal issue to agent/customer portal.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_021",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Other Supporting Functions",
        "desc": "Support to view/upload proposal material such as image, document (need work together with DMS (document management system). Show proposal task history. And also support to capture comments on current proposal and user can view all comments history.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_022",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Basic Information Input/Review",
        "desc": "Capture/Review policy basic information, such as agent, commencement date, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_023",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Policy Holder Input/Review",
        "desc": "Capture/Review policy holder information, including basic information, annual income, contact information, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_024",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Life Assured Input/Review",
        "desc": "Capture/Review life assured information, including basic information,  contact information, etc. Support add additional life assured(s) without limitation.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_025",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Payer Input/Review",
        "desc": "Capture/Review payer information, including basic information, annual income, contact information, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_026",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Collection Method Input/Review",
        "desc": "Capture/Review collection method, including new business payment method and renew payment method. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_027",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Disbursement Method Input/Review",
        "desc": "Capture/Review disbursement method which is used for refund. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_028",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Product Input/Review",
        "desc": "Capture/Review product information. Support all mainstream product lines, including Whole Life, Endowment, Critical Illness/Cancer, Mortgage/Credit Life, Unit Linked, Universal Life, Variable Universal Life, Variable Annuity, Accident, Health/Medical etc. Also support Premium Waiver/Payer Waiver/Spouse Waiver, Joint-life, Indexation, Level plan etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_029",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Beneficiary Input/Review",
        "desc": "Capture/Review beneficiary information, including basic information, nomination type, order, sharing information, etc. Support to add more than one beneficiary.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_030",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Beneficiary Owner Input/Review",
        "desc": "Capture/Review beneficiary owner information, including basic information, Beneficiary nomination type ,annual income, contact information, etc. Support to add more than one beneficiary owner.",
        "comments": "Upgrade function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_031",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Trustee Input/Review",
        "desc": "Capture/Review trustee information, including basic information, annual income, contact information, etc. Support to add more than one trustee.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_032",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Declaration Input/Review",
        "desc": "Capture/Review declaration information for policy holder, life assureds, and agent.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_033",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Proposal Rules Validation",
        "desc": "The same with Data Entry Proposal Rules Validation",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_034",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Proposal Issues Handling",
        "desc": "The same with Data Entry Proposal Issue Handling",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_035",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Verification",
        "l4": "Other Supporting Functions",
        "desc": "The same with Data Entry Other Supporting Functions",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_036",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Work List",
        "l3": "Pending Inforce",
        "l4": "",
        "desc": "List proposals that are accepted or conditionally accepted but not issued. Show not inforce reason and premium shortage. Support by-policy manual inforce and batch manual inforce. Support send remind to agent/customer by SMS/email. Quick assess to Query/Withdraw Proposal/Reverse New Business.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_037",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Watch List",
        "l3": "Task pool",
        "l4": "",
        "desc": "Function for operation department's admin user to view and monitor all outstanding tasks. Support both fuzzy search and precise search.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_038",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Watch List",
        "l3": "Task Release",
        "l4": "",
        "desc": "Support release tasks which is already claimed by a certain user.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_039",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Watch List",
        "l3": "Task Reassign",
        "l4": "",
        "desc": "Support to reassign tasks by 2 strategy: Push it to a specific user who has the authority of the workflow and accessible organization; Auto reassign it to a certain user who has the authority of the workflow and accessible organization;",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_040",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Reverse New Business",
        "l3": "",
        "l4": "",
        "desc": "Support to reverse proposal/policy whose status is withdrawn, declined, postponed, accepted, conditional accepted, or inforce to data entry/verification/underwriting where proposal/policy has gone through and capture reverse reason.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_041",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Withdraw Proposal",
        "l3": "",
        "l4": "",
        "desc": "Support to withdraw proposal and refund the suspense if any.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_042",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Query",
        "l3": "",
        "l4": "",
        "desc": "Support to query all the proposals created in workbench in both manual capture and e-submission. Support both fuzzy search and precise search. Displays the latest proposal status during policy issuance process, not inforce reason and premium shortage. Display the latest proposal data in terms of NB data entry/verification snapshot.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_043",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Configuration",
        "l3": "Declaration Question",
        "l4": "",
        "desc": "Support to configure declaration questions which can support 3 types of answer: single choice, multiple choice and text. Support to configure question with hierarchy. Support to edit/delete questions after creation only when the question is not applied in any proposal.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_044",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Configuration",
        "l3": "Declaration Form",
        "l4": "",
        "desc": "Create form by selecting existing questions and link to product. Support copy existing form to a new form. Support edit/delete form after creation only when the form is not applied in any proposal.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_045",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Configuration",
        "l3": "Workflow Configuration",
        "l4": "",
        "desc": "Policy issuance workflow configuration for STP and non-STP flow and task assignment strategy configuration",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_046",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Configuration",
        "l3": "Rule Configuration",
        "l4": "",
        "desc": "Proposal rules configurations are used by NB",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_047",
        "app": "NB APP",
        "l1": "New Business",
        "l2": "Configuration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "Other general configuration needed for New business, such as policy No setup, monthly policy inforce setup, occupation class etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_070",
        "app": "NB APP",
        "l1": "Underwriting",
        "l2": "Configuration",
        "l3": "Authority Configuration",
        "l4": "",
        "desc": "UW authority configuration",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_071",
        "app": "NB APP",
        "l1": "Underwriting",
        "l2": "Configuration",
        "l3": "Rule Configuration",
        "l4": "",
        "desc": "UW rules configurations are used by NB/CS/CLM UW",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_072",
        "app": "NB APP",
        "l1": "Underwriting",
        "l2": "Configuration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "Other general configuration needed for underwriting, such as risk aggregation limit, BMI, high risk occupation etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_143",
        "app": "NB APP",
        "l1": "Customer Service",
        "l2": "Configuration",
        "l3": "Workflow Configuration",
        "l4": "",
        "desc": "Policy service workflow configuration for STP and non-STP flow and task assignment strategy configuration",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_144",
        "app": "NB APP",
        "l1": "Customer Service",
        "l2": "Configuration",
        "l3": "Rule Configuration",
        "l4": "",
        "desc": "CS operation rules configurations are used by CS",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_145",
        "app": "NB APP",
        "l1": "Customer Service",
        "l2": "Configuration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "Other general configuration needed for CS, such as pending reason, termination reason etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      }
    ],
    "function_count": 49,
    "sops": [
      {
        "code": "SOP-NB-01",
        "title": "Initial Proposal Registration (Reception) & Agent Channel Binding",
        "ui_path": "Main Menu > New Business > Reception > Initial Registration",
        "prerequisites": [
          "Active agent code with valid product licensing",
          "Physical or digital proposal application document from client"
        ],
        "steps": [
          "1. Navigate to Main Menu > New Business > Reception > Initial Registration.",
          "2. On the Initial Registration screen, select Sales Channel Type (Agency, Bancassurance, Broker, Direct Digital).",
          "3. In the Servicing Agent field, enter the Agent Code or click the search icon. Select the agent name from the matching list. Step Result: System validates agent license status and automatically populates Branch Code and Agency Unit.",
          "4. In the Proposal Date field, enter the formal application signing date (defaults to current system date).",
          "5. In the Main Product Code field, select the target product (e.g., 'ENDOW_15' - Gemini Secure Endowment 15-Year).",
          "6. (Optional) In the Channel Proposal No field, enter external paper barcode or e-submission reference.",
          "7. Click Register Proposal. Step Result: System generates a unique Proposal Number (e.g., 'PROP-2026-0049281'), sets status to 'Waiting for Data Entry', and routes task to NB Work List."
        ],
        "fields_table": [
          {
            "name": "Channel Type",
            "type": "Select",
            "required": "Yes",
            "desc": "Distribution channel: Agency, Bank, Direct"
          },
          {
            "name": "Agent Code",
            "type": "Search Input",
            "required": "Yes",
            "desc": "Licensed producer code; must be active and accredited for product"
          },
          {
            "name": "Proposal Date",
            "type": "Date (YYYY-MM-DD)",
            "required": "Yes",
            "desc": "Date proposal was signed by applicant"
          },
          {
            "name": "Main Product Code",
            "type": "Select",
            "required": "Yes",
            "desc": "Core base plan selected for proposal"
          }
        ],
        "actuary_notes": "Main Product Code selection initializes the actuarial rule container, loading entry age limits (18-60) and valid term durations.",
        "op_notes": "If Agent Code is flagged as suspended or unaccredited for life products, the system throws an instant hard validation error: 'Agent Licensing Inactive'.",
        "pdf_page": 45
      },
      {
        "code": "SOP-NB-02",
        "title": "Data Entry - Policyholder (Individual/Organization) & KYC Capture",
        "ui_path": "New Business > Work List > Data Entry > Policyholder Information",
        "prerequisites": [
          "Proposal status is 'Waiting for Data Entry'",
          "Verified government ID / Passport / National ID card"
        ],
        "steps": [
          "1. From New Business > Work List, search for the Proposal Number and click Data Entry hyperlink.",
          "2. In the Policyholder Information section, select Customer Type: Click 'Individual' (or 'Organization' for corporate group).",
          "3. In the Customer Search icon, type applicant name and ID number to check if customer already exists in SOR Master Customer Data. If found, click 'Import Existing Customer'; if not found, select 'Create New Customer'.",
          "4. Enter Full Legal Name (must match National ID exactly).",
          "5. Select Identifier Type (National ID, Passport, Citizen ID), enter ID Number, Place of Issue, and Date of Issue.",
          "6. Enter Date of Birth (YYYY-MM-DD) and select Gender (Male/Female). Step Result: System calculates Attained Age automatically.",
          "7. Select Smoker Status: 'Smoker' or 'Non-Smoker'.",
          "8. In the Occupation section, select Occupation Category and Specific Job Title. Step Result: System derives Occupational Class (Class 1 to Class 4).",
          "9. In Address Information, enter Residential Address, Province/City, Postal Code, Mobile Number, and Email.",
          "10. Click Save Policyholder. Step Result: System saves party record and validates age eligibility against product rules."
        ],
        "fields_table": [
          {
            "name": "Customer Type",
            "type": "Radio",
            "required": "Yes",
            "desc": "Individual or Corporate Organization"
          },
          {
            "name": "Full Legal Name",
            "type": "Text (Max 120)",
            "required": "Yes",
            "desc": "Full legal name as per government registry"
          },
          {
            "name": "ID Number",
            "type": "Alphanumeric",
            "required": "Yes",
            "desc": "National identity number; checked for duplicates"
          },
          {
            "name": "Date of Birth",
            "type": "Date",
            "required": "Yes",
            "desc": "Used to calculate issue age and mortality rates"
          },
          {
            "name": "Occupation Class",
            "type": "Auto-derived (1-4)",
            "required": "Yes",
            "desc": "Determines occupational loading for accidental riders"
          }
        ],
        "actuary_notes": "Attained Age calculation logic in Gemini: Age = Int((Proposal Date - Date of Birth) / 365.25), or Age Nearest Birthday depending on product definition.",
        "op_notes": "Duplicate check triggers if ID Number and Date of Birth match an existing active party, prompting operator to merge or verify customer record.",
        "pdf_page": 58
      },
      {
        "code": "SOP-NB-03",
        "title": "Data Entry - Life Assured Setup & Insurable Interest Relationship",
        "ui_path": "New Business > Data Entry > Life Assured Section",
        "prerequisites": [
          "Policyholder information entry completed and saved"
        ],
        "steps": [
          "1. On the Data Entry page, scroll down to the Life Assured section.",
          "2. In the 'Relationship with Policyholder' dropdown, select:\n   - 'Self': System automatically mirrors all Policyholder demographic and address data into Life Assured fields.\n   - 'Spouse' / 'Child' / 'Parent' / 'Employee': System prompts for Life Assured demographic data.",
          "3. If Life Assured is not Self: Enter Full Name, ID Details, Date of Birth, Gender, Occupation, and Address.",
          "4. If Life Assured is a minor (under 18): System enforces mandatory Trustee appointment section.",
          "5. Verify Insurable Interest: System checks whether the selected relationship meets statutory insurable interest rules.",
          "6. Click Save Life Assured. Step Result: Green checkmark indicates party relationship validated."
        ],
        "fields_table": [
          {
            "name": "Relationship with Policyholder",
            "type": "Select",
            "required": "Yes",
            "desc": "Self, Spouse, Child, Parent, Business Partner, Key Employee"
          },
          {
            "name": "Insurable Interest Flag",
            "type": "Boolean",
            "required": "Yes",
            "desc": "System validation ensuring legal insurable interest"
          }
        ],
        "actuary_notes": "When Life Assured is child (<18 years), maximum allowable juvenile death sum assured is statutory capped (e.g. $20,000 max until age 5).",
        "op_notes": "Selecting 'Child' automatically disables smoker status field and defaults occupation class to Class 1 (Student).",
        "pdf_page": 72
      },
      {
        "code": "SOP-NB-04",
        "title": "Product & Rider Information Entry (Endowment Plan + Rider Compatibility)",
        "ui_path": "New Business > Data Entry > Product Information Section",
        "prerequisites": [
          "Life Assured age and occupation class saved",
          "Product eligibility limits verified"
        ],
        "steps": [
          "1. In the Product Information section, locate Main Product table.",
          "2. In the Main Product Sum Assured field, enter target coverage amount (e.g. 100,000 USD).",
          "3. Select Policy Term: '15 Years' (fixed for Endowment 15). Premium Paying Term automatically locks to '15 Years'.",
          "4. Select Payment Frequency: 'Annual', 'Semi-Annual', 'Quarterly', or 'Monthly'.",
          "5. In the Rider Table, click 'Add Rider':",
          "   - Rider 1: Select 'AD&D' (Accidental Death & Dismemberment). Enter Rider SA: 50,000 USD (Max 100% of Main SA).",
          "   - Rider 2: Select 'CI_ACC' (Accelerated Critical Illness). Enter Rider SA: 50,000 USD.",
          "   - Rider 3: Select 'WP_DIS' (Waiver of Premium on Disability). Sum Assured automatically locks to Annual Gross Premium.",
          "6. Click Calculate Premium button. Step Result: Gemini calls Product Factory rating microservice, returning calculated Net Premium, Modal Factor, Rider Premiums, and Total In-forcing Premium.",
          "7. Click Save Product Information."
        ],
        "fields_table": [
          {
            "name": "Sum Assured",
            "type": "Currency",
            "required": "Yes",
            "desc": "Contractual death and maturity benefit amount"
          },
          {
            "name": "Payment Frequency",
            "type": "Select",
            "required": "Yes",
            "desc": "Annual, Semi-Annual, Quarterly, Monthly"
          },
          {
            "name": "Rider Code",
            "type": "Multi-select",
            "required": "Optional",
            "desc": "Eligible supplementary benefits"
          },
          {
            "name": "Rider Sum Assured",
            "type": "Currency",
            "required": "Conditional",
            "desc": "Subject to maximum ratio against main plan SA"
          }
        ],
        "actuary_notes": "Product Factory validates rider attachment matrix. If CI Rider SA > Main Plan SA, error rule E_RIDER_SA_EXCEED triggers.",
        "op_notes": "Modal factor applied: Annual = 1.0, Semi = 0.51, Quarterly = 0.26, Monthly = 0.088.",
        "pdf_page": 88
      },
      {
        "code": "SOP-NB-05",
        "title": "Nomination & Beneficiaries Entry (Percentages Totaling 100%)",
        "ui_path": "New Business > Data Entry > Beneficiary Section",
        "prerequisites": [
          "Policyholder and Life Assured records complete"
        ],
        "steps": [
          "1. Scroll to the Beneficiary Information section.",
          "2. Select Designation Type: 'Revocable' (standard) or 'Irrevocable'.",
          "3. Click 'Add Beneficiary' button.",
          "4. Enter Beneficiary Full Legal Name, ID Number, Relationship to Life Assured (e.g. Spouse, Child).",
          "5. Enter Share Percentage (e.g. 50%).",
          "6. Click 'Add Beneficiary' again for second nominee: Enter Name, Relationship, and remaining Share Percentage (50%).",
          "7. System validates that sum of all beneficiary shares equals exactly 100.0%.",
          "8. If any beneficiary is under 18: In Trustee panel, enter Legal Trustee details (Full Name, ID, Address, Contact).",
          "9. Click Save Beneficiaries. Step Result: System confirms 'Beneficiary allocation validated at 100%'."
        ],
        "fields_table": [
          {
            "name": "Beneficiary Name",
            "type": "Text",
            "required": "Yes",
            "desc": "Designated claimant on death"
          },
          {
            "name": "Relationship",
            "type": "Select",
            "required": "Yes",
            "desc": "Spouse, Child, Parent, Sibling, Estate"
          },
          {
            "name": "Share Percentage",
            "type": "Decimal (0-100%)",
            "required": "Yes",
            "desc": "Must total exactly 100%"
          },
          {
            "name": "Trustee Name",
            "type": "Text",
            "required": "Conditional",
            "desc": "Mandatory if beneficiary age < 18"
          }
        ],
        "actuary_notes": "Nomination structure dictates death claim settlement paths. Irrevocable nominations require beneficiary written consent for any future CS policy loan or surrender.",
        "op_notes": "System blocks submission if total percentage sum is 99.9% or 100.1% due to rounding.",
        "pdf_page": 102
      },
      {
        "code": "SOP-NB-06",
        "title": "Declaration Questionnaire, Health History & Underwriting Rules Evaluation",
        "ui_path": "New Business > Data Entry > Declaration Form Section",
        "prerequisites": [
          "All party, product, and beneficiary sections saved"
        ],
        "steps": [
          "1. In the Declaration Form section, review dynamically generated medical questions based on applicant age and product line.",
          "2. For each question, select 'Yes' or 'No':\n   - Q1: Any history of cardiovascular, respiratory, diabetes, or cancer?\n   - Q2: Any surgical operations or hospitalization within past 5 years?\n   - Q3: Engaged in hazardous sports (aviation, deep scuba diving, motor racing)?\n   - Q4: Family history of hereditary diseases before age 60?",
          "3. If any answer is 'Yes': In Details text box, record diagnosis date, hospital name, and treatment details. Click 'Upload Document' to attach medical records (MER/APS/Discharge summary).",
          "4. Click 'Evaluate Underwriting Rules' button. Step Result: System Underwriting Rules Engine (Module 03) evaluates risk:",
          "   - If all 'No', SA <= $150k, and Age <= 45: Result = 'STP PASS'. System sets Proposal Status to 'Waiting for Initial Collection'.",
          "   - If any 'Yes' or SA > $150k: Result = 'REFER TO UNDERWRITING'. System creates Underwriting Task in UW Task Pool."
        ],
        "fields_table": [
          {
            "name": "Declaration Answers",
            "type": "Boolean (Yes/No)",
            "required": "Yes",
            "desc": "Statutory health and lifestyle disclosures"
          },
          {
            "name": "Medical Details",
            "type": "Text Area",
            "required": "Conditional",
            "desc": "Required if answer is Yes"
          },
          {
            "name": "Underwriting Rule Result",
            "type": "System Derived",
            "required": "Read-only",
            "desc": "STP_PASS, UW_REFERRAL, HARD_DECLINE"
          }
        ],
        "actuary_notes": "STP underwriting rules are calibrated by Actuaries to balance automated throughput (target 75-80% STP) against anti-selection risk.",
        "op_notes": "Cases flagged with adverse declarations automatically tag the Proposal with priority code 'UW_HIGH'.",
        "pdf_page": 118
      },
      {
        "code": "SOP-NB-07",
        "title": "Initial Premium Collection & Policy Enforcement (Issuing Inforce Policy)",
        "ui_path": "New Business > Proposal Query > Enforce Policy",
        "prerequisites": [
          "Proposal status is 'Waiting for Initial Collection' (Auto-UW passed or UW accepted)",
          "Full Initial Premium received in bank or cashier"
        ],
        "steps": [
          "1. From New Business > Work List, filter by Proposal Status 'Waiting for Initial Collection'.",
          "2. Click the Proposal Number to view Financial Summary. Note the exact Total Inforcing Premium (e.g. $6,250 USD).",
          "3. In the Initial Collection section, click 'Match Collection Record'. Select bank statement line or cashier receipt matching the amount and reference number.",
          "4. System verifies that Collected Amount >= Total Inforcing Premium.",
          "5. Click 'Enforce Policy' button. Step Result: Gemini executes the End-of-Inception transaction:\n   - Calls PA BS API to transfer proposal records into SOR System of Record tables.\n   - Generates official Policy Number (e.g. 'POL-2026-0081723').\n   - Sets Policy Status to 'INFORCE'.\n   - Sets Paid-To-Date to Commencement Date + 1 Year.\n   - Generates electronic Policy Contract Document (PDF) and dispatches welcome SMS/Email to Policyholder."
        ],
        "fields_table": [
          {
            "name": "Total Inforcing Premium",
            "type": "Currency",
            "required": "Yes",
            "desc": "Mandatory settlement amount"
          },
          {
            "name": "Payment Receipt Reference",
            "type": "String",
            "required": "Yes",
            "desc": "Bank transaction ID or cashier voucher"
          },
          {
            "name": "Commencement Date",
            "type": "Date",
            "required": "Yes",
            "desc": "Official policy start date"
          },
          {
            "name": "Policy Number",
            "type": "System Generated",
            "required": "Read-only",
            "desc": "Official immutable policy identifier in SOR"
          }
        ],
        "actuary_notes": "Upon policy enforcement, statutory policy reserves are initialized in Valuation tables, and initial commission liabilities are booked.",
        "op_notes": "If partial collection was received, policy remains in 'Collection Pending' status. Excess funds are credited to Policy Suspense.",
        "pdf_page": 135
      },
      {
        "code": "SOP-NB-08",
        "title": "Policy Delivery Confirmation (e-ACK) & Initializing Statutory 21-Day Free-Look Countdown",
        "ui_path": "Main Menu > New Business > Policy Dispatch & Delivery > Acknowledge Receipt",
        "prerequisites": [
          "Policy status in SOR is 'INFORCE'",
          "Physical Policy Kit dispatched via Courier OR e-Policy Kit delivered via SMS/Email Portal"
        ],
        "steps": [
          "1. Access Main Menu > New Business > Policy Dispatch & Delivery > Delivery Tracking.",
          "2. Query Policy Number or Delivery AWB/Tracking code.",
          "3. Select Acknowledgement Method:\n   - Option A: Digital e-ACK (Customer clicks verification link and inputs OTP sent to registered mobile).\n   - Option B: Physical Signed Receipt (Counter staff scans signed delivery receipt and uploads PDF).",
          "4. Enter Delivery Date / e-ACK Confirmation Timestamp (e.g. 2026-10-25 14:30:00).",
          "5. Click 'Confirm Delivery'. Step Result: System commits T_POLICY.DELIVERY_DATE, sets T_POLICY.FREE_LOOK_EXP_DATE = DELIVERY_DATE + 21 Days (at 23:59:59).",
          "6. In the event customer does not submit e-ACK, system automatically applies Statutory Default Fallback on Day 14 post-issue: DELIVERY_DATE = ISSUE_DATE + 14 Days postal grace.",
          "7. Free-Look Status Widget activates on Agent Portal & Customer Portal displaying days remaining."
        ],
        "fields_table": [
          {
            "name": "Policy Number",
            "type": "String",
            "required": "Yes",
            "desc": "Target inforce policy"
          },
          {
            "name": "Delivery Channel",
            "type": "Select",
            "required": "Yes",
            "desc": "e-Policy OTP, Courier Signed ACK, Branch In-Person"
          },
          {
            "name": "Delivery Date",
            "type": "Date / Timestamp",
            "required": "Yes",
            "desc": "Official start date of 21-day statutory countdown"
          },
          {
            "name": "Recipient Identity",
            "type": "String",
            "required": "Yes",
            "desc": "Policyholder National ID / OTP verification log"
          }
        ],
        "actuary_notes": "Statutory 21-day window strictly governs unearned premium reserve (UPR) liability and clawback exposure.",
        "op_notes": "If cancellation is submitted within 21 days, system triggers 100% FYC agent commission clawback.",
        "pdf_page": 88
      }
    ],
    "sop_count": 7,
    "interconnections": {
      "module_code": "NB_APP",
      "upstream_sources": [
        {
          "module": "MOD_01 Architecture",
          "data": "Product rules, rate tables, declaration forms, and agent licensing validity"
        }
      ],
      "downstream_destinations": [
        {
          "module": "MOD_03 Underwriting",
          "impact": "Sends referred proposals with adverse medical/financial declarations to UW Task Pool"
        },
        {
          "module": "MOD_05 Billing & Collection",
          "impact": "Creates initial premium billing receivable and reconciles initial collection"
        },
        {
          "module": "SOR System of Record",
          "impact": "Commits newly enforced inforce policies into core policy tables"
        },
        {
          "module": "MOD_08 Batch Console",
          "impact": "Feeds new policy inventory into nightly billing and valuation sweeps"
        }
      ],
      "shared_data_entities": [
        "T_PROPOSAL (Proposal Header)",
        "T_PARTY (Customer / Life Assured / Beneficiary)",
        "T_POLICY_BENEFIT (Main & Riders)"
      ],
      "lifecycle_events": [
        "PROPOSAL_REGISTERED",
        "AUTO_UW_EVALUATED",
        "INITIAL_PREMIUM_COLLECTED",
        "POLICY_ENFORCED_INFORCE"
      ]
    },
    "pdf_start_page": 33,
    "pdf_end_page": 142,
    "pdf_chapter": "Chapter 2: New Business (NB APP)"
  },
  {
    "id": "MOD_03",
    "num": "03",
    "title": "Mod 03: Underwriting (UW APP)",
    "subtitle": "Risk Assessment, EM Loadings, Exclusions, Decision Engine & Escalation",
    "icon": "🩺",
    "badge": "Risk Evaluation",
    "page_range": "Pages 143 - 195",
    "summary": "The Underwriting application provides a centralized risk evaluation workbench handling tasks from New Business, Policy Alterations (CS), and Reinstatements. It evaluates medical, occupational, and financial risk profiles, calculates Extra Mortality (EM) loadings, issues exclusions, tracks query letters, and executes definitive underwriting decisions.",
    "mermaid_workflow": "graph TD\n    Queue[\"UW Worklist (Task Pool)\"] --> Lock[\"Claim / Lock Task by Underwriter\"]\n    Lock --> Eval[\"Evaluate Medical & Financial Risk\"]\n    Eval --> DecisionChoice{\"Risk Acceptable?\"}\n    DecisionChoice -- Standard Risk --> Standard[\"Standard Accept (0% Loading)\"]\n    DecisionChoice -- Elevated Risk --> Rated[\"Substandard Rating: EM Loading / Extra Premium\"]\n    DecisionChoice -- Specific Hazard --> Exclude[\"Issue Specific Exclusions\"]\n    DecisionChoice -- Uninsurable --> Decline[\"Decline / Postpone\"]\n    Rated --> ClientConsent[\"Issue Counter-Offer Letter\"]\n    Exclude --> ClientConsent\n    ClientConsent -- Accepted --> EnforceUW[\"Submit UW Disposal & Recalculate Premium\"]\n    Standard --> EnforceUW",
    "core_concepts": [
      {
        "term": "Centralized UW Workbench",
        "definition": "A unified interface processing risk tasks across all lines of business and operational channels with full access to historical claims, policies, and prior underwriting decisions."
      },
      {
        "term": "Extra Mortality (EM) / Numerical Rating",
        "definition": "A quantitative rating system where standard risk is 100%. Elevated risks are represented as +50%, +100%, +150% EM, translating directly into extra premium percentages."
      },
      {
        "term": "Exclusion Clauses",
        "definition": "Specific endorsements excluding liability for pre-existing medical conditions (e.g. spinal disorders, bilateral cataract) or hazardous hobbies (e.g. scuba diving, aviation)."
      },
      {
        "term": "UW Authority Matrix & Escalation",
        "definition": "Multi-tiered approval limits where Junior Underwriters can approve up to defined Sum Assured / EM limits, and higher risk cases automatically escalate to Senior or Chief Underwriters."
      }
    ],
    "actuary_notes": [
      "Loading Calculation Types:\n  1. Percentage Loading (EM): Extra Premium = Standard Net Premium * (EM% / 100).\n  2. Per Mille Extra (Flat Rate): Extra Premium = Sum Assured * (Rate / 1000), commonly used for hazardous occupations or temporary post-surgery recovery.\n  3. Age Rating: Treating a 35-year-old insured as age 40 for mortality calculations.",
      "Reinsurance Cession Triggers: Automatic treaty verification when total sum assured (including existing active policies in force) exceeds company retention limits (e.g. $250,000), routing to Facultative Reinsurance.",
      "Cash Value Impact: In traditional eBao core implementations, extra premium loadings from EM do not contribute to standard Cash Surrender Values unless specifically configured under participating bonus rules."
    ],
    "op_notes": [
      "Underwriting Query Letters: Automated generation of medical examination requests (MER), Attending Physician Statements (APS), and financial questionnaires with SLA tracking.",
      "Task Expiry & Reminder: Pending underwriting tasks have automated reminders at Day 7, Day 14, and automatic cancellation/withdrawal at Day 30 if requirements remain unfulfilled.",
      "Underwriting Confirmation in CS: When an existing policyholder requests an increase in Sum Assured or addition of a critical illness rider, the CS user submits the case to UW, which returns an approval before the alteration can take effect."
    ],
    "sections": [
      {
        "heading": "1. Task Retrieval & Case Locking",
        "content": "Underwriters access cases through the centralized Task Pool using advanced filters (Sum Assured tier, Urgency, Channel, Assigned Underwriter). Retrieving a case locks it to prevent duplicate evaluation by concurrent officers."
      },
      {
        "heading": "2. Risk Summary & Medical Data Assessment",
        "content": "The Risk Summary screen presents an aggregated view of cumulative company exposure (Total Sum at Risk across all policies for the same Life Assured). Underwriters review declarations, biometrics (BMI, blood pressure), laboratory results, and medical examiner findings."
      },
      {
        "heading": "3. Rating, Loadings & Policy Alterations",
        "content": "When risks deviate from standard guidelines, underwriters input:\n- Medical Rating: EM percentage (e.g. +75% for controlled hypertension).\n- Occupational Loading: Class 3 or 4 flat dollar per mille rate.\n- Exclusion Codes: Selected from standard master data with multi-language clauses.\nThe system automatically triggers a recalculation of the Total Inforcing Premium."
      },
      {
        "heading": "4. Underwriting Disposal & Counter-Offers",
        "content": "Final disposals include:\n- Standard Accept: Transitions proposal directly to billing.\n- Accept with Loading/Exclusion (Counter-Offer): Triggers formal notification to client; requires written consent before enforcement.\n- Postpone: Defers coverage for a specified duration (e.g. 6 months following surgery).\n- Decline: Formally rejects coverage with mandatory adverse reason recording."
      }
    ],
    "mapped_functions": [
      {
        "id": "F_048",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Task pool",
        "l4": "",
        "desc": "Centralized task pool with authority control. Support both fuzzy search and precise search with advanced search criteria.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_049",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting",
        "l4": "",
        "desc": "A centralized risk assessment platform to do risk assessment, address outstanding issues, issue query/medical letters, make underwriting decisions for UW applications from NB, CS and Claim. It also supports to send the policy back to data entry/sales portal etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_050",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Worksheet",
        "l4": "Policy Information View",
        "desc": "Display risk assessment related key policy information, including policy level and product level information, customer information.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_051",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Worksheet",
        "l4": "Risk Aggregation View",
        "desc": "Display risk summary of all life assureds, including risk aggregation per SAR and premium dimension, NB UW history, claim history, and risk related CS history. Quick access to policy query, UW query, CS query, claim query to query further detail information of above transactions.",
        "comments": "Upgrade function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_052",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Worksheet",
        "l4": "Letters View",
        "desc": "List all letters generated for current underwriting case with letter view and replied image view function (image view need work with DMS).",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_053",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Worksheet",
        "l4": "Comments View",
        "desc": "Display all historical comments for current underwriting case.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_054",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Worksheet",
        "l4": "UW Decision View",
        "desc": "Display underwriting decision and escalation history.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_055",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Worksheet",
        "l4": "LCA View",
        "desc": "List all LCAs generated for current underwriting case with letter view and replied image view function (image view need work with DMS).",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_056",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Worksheet",
        "l4": "Worksheet Printing",
        "desc": "A one-click button that users can generate an underwriting worksheet for offline review by managers or reinsurers.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_057",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Rules",
        "l4": "",
        "desc": "Auto trigger pre-configured underwriting rules checking and show result at UW Issus screen.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_058",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Issues",
        "l4": "Issues Handling",
        "desc": "Display underwriting rules checked failed by the system. Support to close or delete existing issues, add manual issue, generate query letter, add medical exam requests and Non-medical request, etc.\nRaise new Proposal Issue during underwritign process",
        "comments": "Upgrade function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_059",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Issues",
        "l4": "Letter Handling",
        "desc": "Display outstanding query letters record. Support to update letter status.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_060",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Issues",
        "l4": "LCA Handling",
        "desc": "Display outstanding LCA record. Support to update letter status.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_061",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Decision",
        "l4": "Decision Input",
        "desc": "Capture underwriting decision and decision reason. The underwriting decision making is at policy level first, if all products decision are the same, user just need give policy level decision, no need input decision one by one product. If products decision are different, user can make decision one by one product for standardly accepted, conditionally accepted, declined or postponed. If conditionally accepted, UWer will be able to add extra loadings, restrict SA, exclusion, endorsement, agreement etc. Extra loading types and formulas are configured at product.",
        "comments": "Upgrade function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_062",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Decision",
        "l4": "Risk Information Modification",
        "desc": "Show risk-related information and UWer can modify them as part of UW decision. Such as life assureds occupation, risk level/UW class, smoker indicator, commencement date, backdating indicator etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_063",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting Decision",
        "l4": "LCA Preview",
        "desc": "Provide 'Generate LCA' button to generate PDF document of LCA for conditionally accepted cases. UWer can preview, delete and regenerate LCA.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_064",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Work List",
        "l3": "Underwriting",
        "l4": "Other Supporting Functions",
        "desc": "Provide a link to view full application data. Support to view/upload proposal material such as image, document (need work together with DMS (document management system).And also support to capture comments on current UW case and user can view all comments history with authority control.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_065",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Watch List",
        "l3": "Task pool",
        "l4": "",
        "desc": "Function for operation department's admin user to view and monitor all outstanding tasks. Support both fuzzy search and precise search.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_066",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Watch List",
        "l3": "Task Release",
        "l4": "",
        "desc": "Support release tasks which is already claimed by a certain user.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_067",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Watch List",
        "l3": "Task Reassign",
        "l4": "",
        "desc": "Support to reassign tasks by 2 strategy: Push it to a specific user who has the authority of the workflow and accessible organization; Auto reassign it to a certain user who has the authority of the workflow and accessible organization;",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_068",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Exclusion Query",
        "l3": "",
        "l4": "",
        "desc": "Support query all policy exclusion information after policy issuance.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_069",
        "app": "UW APP",
        "l1": "Underwriting",
        "l2": "Query",
        "l3": "",
        "l4": "",
        "desc": "Support query all UW applications with all detail snapshot data at the time to submit this UW case including UW worksheet, UW issues and UW decision, UWer can trace all historical UW decision and background of the case by this query function.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_070",
        "app": "NB APP",
        "l1": "Underwriting",
        "l2": "Configuration",
        "l3": "Authority Configuration",
        "l4": "",
        "desc": "UW authority configuration",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_071",
        "app": "NB APP",
        "l1": "Underwriting",
        "l2": "Configuration",
        "l3": "Rule Configuration",
        "l4": "",
        "desc": "UW rules configurations are used by NB/CS/CLM UW",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_072",
        "app": "NB APP",
        "l1": "Underwriting",
        "l2": "Configuration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "Other general configuration needed for underwriting, such as risk aggregation limit, BMI, high risk occupation etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      }
    ],
    "function_count": 25,
    "sops": [
      {
        "code": "SOP-UW-01",
        "title": "Retrieving & Locking Tasks from Underwriting Worklist (Task Pool)",
        "ui_path": "Main Menu > Underwriting > Work List > Task Pool",
        "prerequisites": [
          "User account authorized with Underwriting role profile (Junior, Senior, Chief)",
          "Proposals or CS alterations referred by Underwriting Rules Engine"
        ],
        "steps": [
          "1. Navigate to Main Menu > Underwriting > Work List.",
          "2. Click the 'Task Pool' tab to view unassigned underwriting tasks.",
          "3. In Search Filters, specify Criteria: LOB ('Life/Endowment'), Sum Assured Range, or Referral Reason.",
          "4. Click Search. Step Result: System displays matching cases ordered by SLA priority.",
          "5. Select the target case and click 'Claim Task' (or 'Assign to Me'). Step Result: Task status updates from 'Waiting for Underwriting' to 'Underwriting in Progress'. Case locks to your User ID to prevent duplicate concurrent review.",
          "6. Click the Case Hyperlink to open the Underwriting Worksheet UI."
        ],
        "fields_table": [
          {
            "name": "Task Pool Category",
            "type": "Select",
            "required": "Yes",
            "desc": "New Business, Customer Service, Reinstatement, Claims"
          },
          {
            "name": "Assigned Underwriter",
            "type": "User ID",
            "required": "Yes",
            "desc": "Owner of the active underwriting session"
          },
          {
            "name": "Lock Status",
            "type": "System Indicator",
            "required": "Read-only",
            "desc": "LOCKED by user; released on submit or timeout"
          }
        ],
        "actuary_notes": "Underwriting queues monitor reinsurance treaties: cases exceeding company retention limit automatically trigger treaty notifications.",
        "op_notes": "If an underwriter does not act on a locked task within 48 hours, supervisor auto-release batch unlocks task back to the pool.",
        "pdf_page": 148
      },
      {
        "code": "SOP-UW-02",
        "title": "Comprehensive Risk Assessment & Total Sum at Risk (SAR) Evaluation",
        "ui_path": "Underwriting > Underwriting Worksheet > Risk Summary Tab",
        "prerequisites": [
          "Underwriting task opened in locked session"
        ],
        "steps": [
          "1. In the Underwriting Worksheet, examine the top header banner displaying Applicant Name, Age, Gender, Occupation, and Main Product.",
          "2. Click the 'Risk Summary' tab. Step Result: System displays cumulative risk aggregation across the entire life company:\n   - Current Proposal Sum Assured\n   - Existing Inforce Life Policies for same Life Assured\n   - Total Cumulative Sum at Risk (SAR)\n   - Total Critical Illness Exposure across all contracts",
          "3. Check Customer Watchlist & AML screening alerts in the Compliance banner.",
          "4. Review Declaration Questionnaire answers: adverse medical or hazardous sports items are highlighted with red flags.",
          "5. Click 'View Document Attachments' to inspect uploaded Medical Examination Reports (MER), ECG, or blood biochemistry tests.",
          "6. Record clinical observations in Underwriter Clinical Notes field."
        ],
        "fields_table": [
          {
            "name": "Total Sum at Risk (SAR)",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Aggregated life coverage minus cash values across all policies"
          },
          {
            "name": "Existing Policies Count",
            "type": "Integer",
            "required": "Read-only",
            "desc": "Number of inforce policies held by life assured"
          },
          {
            "name": "Clinical Notes",
            "type": "Rich Text",
            "required": "Yes",
            "desc": "Underwriter's clinical justification for risk disposal"
          }
        ],
        "actuary_notes": "Cumulative SAR calculation formula: Total SAR = Sum(Policy_i Death Benefit - Policy_i Cash Value). Triggers financial underwriting if SAR > $500,000.",
        "op_notes": "High SAR requires financial underwriting proof: tax returns, audited balance sheets for key-man corporate policies.",
        "pdf_page": 156
      },
      {
        "code": "SOP-UW-03",
        "title": "Issuing Medical Requirements, Attending Physician Statements & Query Letters",
        "ui_path": "Underwriting Worksheet > UW Issues Tab > Generate Query Letter",
        "prerequisites": [
          "Underwriter determines medical or financial information is incomplete"
        ],
        "steps": [
          "1. On the Underwriting Worksheet, click the 'UW Issues' tab.",
          "2. Click 'Add UW Issue' button.",
          "3. Select Issue Category: 'Medical Requirement', 'Financial Requirement', or 'Administrative Clarification'.",
          "4. Select Specific Requirement Code: e.g., 'MER_02' (Medical Exam + Fasting Blood Glucose), 'APS_01' (Attending Physician Statement from Treating Hospital).",
          "5. Specify Due Date (defaults to +30 calendar days from today).",
          "6. Click 'Generate Query Letter' button. Step Result: System compiles personalized inquiry letter referencing proposal ID, required tests, and accredited panel clinics.",
          "7. Click 'Send Notification'. System dispatches SMS/email alert to servicing agent and applicant.",
          "8. Underwriting task status transitions to 'Waiting for Requirements'."
        ],
        "fields_table": [
          {
            "name": "Issue Category",
            "type": "Select",
            "required": "Yes",
            "desc": "Medical, Financial, Special Questionnaire"
          },
          {
            "name": "Requirement Code",
            "type": "Master Code",
            "required": "Yes",
            "desc": "Standard clinic examination package code"
          },
          {
            "name": "SLA Expiration Date",
            "type": "Date",
            "required": "Yes",
            "desc": "Deadline before automated cancellation reminder"
          }
        ],
        "actuary_notes": "Medical test packages are budgeted into product acquisition expense allowances; excessive tests on small SA erode product profitability.",
        "op_notes": "Automated batch checks requirements daily. Reminders are dispatched at Day 7, Day 14. If unfulfilled by Day 30, case auto-withdraws.",
        "pdf_page": 168
      },
      {
        "code": "SOP-UW-04",
        "title": "Applying Extra Mortality (EM) Loadings, Flat Extras & Exclusions",
        "ui_path": "Underwriting Worksheet > Make Decision Tab > Rating Panel",
        "prerequisites": [
          "All medical findings evaluated",
          "Risk profile deviates from standard 100% mortality"
        ],
        "steps": [
          "1. In Underwriting Worksheet, click 'Make Decision' tab.",
          "2. Under Risk Disposal, select 'Substandard Rating / Accept with Condition'.",
          "3. In the Benefit Rating Grid, select target benefit (e.g. Main Plan Death Benefit, CI Rider):",
          "   - Numerical Rating (EM): Enter Extra Mortality percentage (e.g. '+50%' for controlled mild hypertension, '+100%' for moderate cardiovascular risk).",
          "   - Flat Extra Premium: Enter dollar per thousand loading (e.g. '$3.00 per $1,000 SA') and Duration (e.g. 'Temporary 3 Years' or 'Permanent').",
          "   - Occupational Loading: Enter Occupational Extra Rate based on hazard class.",
          "4. In the Exclusions Grid, click 'Add Exclusion':",
          "   - Select Exclusion Type: 'Medical Condition', 'Geographical Territory', or 'Hazardous Activity'.",
          "   - Select Exclusion Code: e.g., 'EXCL_SPINE' (Degenerative disc disease of spine), 'EXCL_DIVING' (Scuba diving deeper than 30 meters).",
          "5. Click 'Recalculate Rated Premium'. Step Result: System displays Old Premium vs Revised Counter-Offer Premium with extra loadings included.",
          "6. Click 'Save Rating Decisions'."
        ],
        "fields_table": [
          {
            "name": "EM Loading Percentage",
            "type": "Percentage (+25% to +300%)",
            "required": "Conditional",
            "desc": "Extra mortality factor added to standard net rate"
          },
          {
            "name": "Flat Extra Premium",
            "type": "Currency per Mille",
            "required": "Conditional",
            "desc": "Fixed extra dollar amount per $1,000 SA"
          },
          {
            "name": "Exclusion Code",
            "type": "Master Code",
            "required": "Conditional",
            "desc": "Specific bodily impairment or hazard excluded from liability"
          }
        ],
        "actuary_notes": "Extra premium calculation: Base Extra = Base Net Premium * (EM / 100). Total Inforcing Premium = Base Standard + Base Extra + Flat Extra * (SA / 1000).",
        "op_notes": "Exclusion wording prints automatically on Endorsement Schedule page in formal policy contract.",
        "pdf_page": 179
      },
      {
        "code": "SOP-UW-05",
        "title": "Executing Underwriting Disposal (Standard, Counter-Offer, Postpone, Decline)",
        "ui_path": "Underwriting Worksheet > Make Decision Tab > Submit Disposal",
        "prerequisites": [
          "Underwriter decisions formulated and within personal authority limit"
        ],
        "steps": [
          "1. In Make Decision tab, verify Final Decision Radio Button:\n   - 'Standard Accept': Risk is within standard 100% mortality. No extra loadings.\n   - 'Accept with Rating / Counter-Offer': Extra premium or exclusions applied.\n   - 'Postpone': Risk temporarily uninsurable (e.g. awaiting post-operative recovery 6 months).\n   - 'Decline': Severe risk, uninsurable. Mandatory Adverse Reason Code required.",
          "2. If counter-offer or decline requires higher sign-off: System displays 'Exceeds Authority Level - Escalated to Senior Underwriter'. Click 'Submit for Escalation'.",
          "3. If within authority: Enter Final Underwriter Summary Comments.",
          "4. Click 'Submit Underwriting Disposal' button. Step Result:\n   - Standard Accept: Case automatically transitions to Billing / Initial Collection.\n   - Counter-Offer: System generates Counter-Offer Letter and dispatches to Client/Agent. Proposal status updates to 'Waiting for Counter-Offer Consent'.\n   - Decline: Proposal transitions to 'Declined'. AML/Fraud adverse database updated. Refund voucher for initial deposit generated."
        ],
        "fields_table": [
          {
            "name": "Final Disposal",
            "type": "Select",
            "required": "Yes",
            "desc": "Standard Accept, Substandard Accept, Postpone, Decline"
          },
          {
            "name": "Postpone Duration",
            "type": "Integer (Months)",
            "required": "Conditional",
            "desc": "Months before applicant may re-apply"
          },
          {
            "name": "Adverse Reason Code",
            "type": "Master Code",
            "required": "Conditional",
            "desc": "Medical or financial justification for decline"
          }
        ],
        "actuary_notes": "Decline statistics feed into monthly underwriting experience monitoring reports to detect regional anti-selection clusters.",
        "op_notes": "Counter-offers have strict statutory validity (typically 21 to 30 days). Client must sign written amendment agreement before policy can be issued.",
        "pdf_page": 190
      }
    ],
    "sop_count": 5,
    "interconnections": {
      "module_code": "UW_APP",
      "upstream_sources": [
        {
          "module": "MOD_02 New Business",
          "data": "New proposals exceeding STP limits or with adverse declarations"
        },
        {
          "module": "MOD_04 Customer Service",
          "data": "Financial alterations involving risk increases (Sum Assured increase, Rider additions)"
        },
        {
          "module": "MOD_04 CS Reinstatement",
          "data": "Lapsed policies applying for coverage revival after medical review"
        }
      ],
      "downstream_destinations": [
        {
          "module": "MOD_02 New Business",
          "impact": "Returns standard acceptance, counter-offer loadings (EM), or adverse decline decisions"
        },
        {
          "module": "MOD_04 Customer Service",
          "impact": "Approves or rejects requested policy endorsement alterations"
        },
        {
          "module": "MOD_05 Billing",
          "impact": "Transmits revised rated premiums with EM extra loadings for billing generation"
        }
      ],
      "shared_data_entities": [
        "T_UW_TASK (Underwriting Case)",
        "T_UW_ISSUE (Requirement Tracking)",
        "T_BENEFIT_RATING (EM Loadings & Exclusions)"
      ],
      "lifecycle_events": [
        "TASK_CLAIMED",
        "QUERY_LETTER_DISPATCHED",
        "RATING_APPLIED",
        "DISPOSAL_DECIDED"
      ]
    },
    "pdf_start_page": 143,
    "pdf_end_page": 195,
    "pdf_chapter": "Chapter 3: Underwriting Workbench (UW APP)"
  },
  {
    "id": "MOD_04",
    "num": "04",
    "title": "Mod 04: Customer Service (CS APP)",
    "subtitle": "In-force Policy Alterations, Non-forfeiture (RPU, ETA, APL), Surrender & Policy Loans",
    "icon": "🔄",
    "badge": "Policy Maintenance",
    "page_range": "Pages 196 - 303 & 445 - 517",
    "summary": "Customer Service governs all post-issue policy lifecycle events. It encompasses non-financial maintenance (address, beneficiary, payee), financial alterations (Sum Assured adjustments, rider additions/deletions), non-forfeiture options (Reduced Paid-Up, Extended Term, APL), cash value surrender, policy loans with daily interest accrual, and reinstatement of lapsed policies.",
    "mermaid_workflow": "graph TD\n    Inforce[\"In-force Policy Record\"] --> CSReg[\"Register CS Application\"]\n    CSReg --> CSType{\"Alteration Category\"}\n    CSType -- Non-Financial --> NonFin[\"Change Address / Beneficiary / Payee\"]\n    CSType -- Financial Alteration --> FinAlt[\"Change SA / Add Rider / Change Plan\"]\n    CSType -- Cash Extraction --> Cash[\"Full Surrender / Partial Withdrawal / Policy Loan\"]\n    CSType -- Non-Forfeiture --> NonForfeit[\"Convert to RPU / ETA / Trigger APL\"]\n    FinAlt --> CSUW{\"Risk Increase?\"}\n    CSUW -- Yes --> UWConfirm[\"Underwriting Approval (Module 03)\"]\n    CSUW -- No --> CSApprove[\"CS Validation & Quotation Engine\"]\n    UWConfirm --> CSApprove\n    NonFin --> CSApprove\n    Cash --> CSApprove\n    NonForfeit --> CSApprove\n    CSApprove --> CSExec[\"Apply Policy Endorsement & Update SOR\"]",
    "core_concepts": [
      {
        "term": "Guaranteed Surrender Value (GSV)",
        "definition": "The contractual minimum cash value guaranteed by the policy formula (e.g. percentage of total premiums paid excluding riders, minus surrender charge) available after a qualifying tenure (typically 2-3 years)."
      },
      {
        "term": "Reduced Paid-Up (RPU)",
        "definition": "A non-forfeiture option where accumulated net surrender value is used as a single net premium to purchase a reduced Sum Assured of the same plan without requiring any further premium payments."
      },
      {
        "term": "Extended Term Insurance (ETA)",
        "definition": "A non-forfeiture option where accumulated cash value purchases term insurance for the full original Sum Assured for as long a duration (years and days) as the cash value allows."
      },
      {
        "term": "Policy Loan & Interest Capitalization",
        "definition": "A cash advance against policy surrender value (typically up to 80-85% of GSV) accumulating daily compound interest; unpaid interest is capitalized into principal at each policy anniversary."
      },
      {
        "term": "Automatic Premium Loan (APL)",
        "definition": "An automated non-forfeiture safety net where unpaid overdue premium is converted into a loan against cash value at the expiration of the 60-day grace period."
      },
      {
        "term": "Supplementary Rider Mid-Term Inception & Pro-Rata Rules",
        "definition": "When adding a rider to an inforce policy, eBao supports two effective dates: Next Modal Due Date (0 VND short-period fee) OR Immediate Mid-Term Inception (calculated via Pro-Rata Short Premium Formula). Synchronizes with Main PTD on the next billing date."
      }
    ],
    "actuary_notes": [
      "RPU Calculation Mathematics:\n  Reduced SA = (Net Cash Value / Single Premium Rate at Attained Age for Same Term).\n  Riders are automatically terminated upon conversion to RPU unless explicitly non-forfeitable.",
      "Surrender Value with Reversionary Bonus (RB):\n  Total Cash Value = Base GSV + (Vested Reversionary Bonus * RB Cash Value Factor at Attained Age) + Terminal Bonus.\n  Outstanding policy loans and accrued loan interest are deducted: Net Payout = Total Cash Value - Loan Principal - Accrued Interest.",
      "Policy Loan Foreclosure Trigger: If total loan balance (Principal + Accumulated Interest) exceeds Gross Cash Surrender Value, policy foreclosure is triggered, and the policy lapses after formal 30-day notice.",
      "Rider Pro-Rata Pricing Formula: Pro-Rata Premium = Annual Rider Premium * (Days Remaining to Next Due Date / 365). Underwriting clearance is mandatory."
    ],
    "op_notes": [
      "Free-Look (Cooling-Off) Cancellation: Within 14-21 days of policy delivery, clients may cancel with 100% refund of premiums paid, less medical examination expenses incurred.",
      "CS Quotation Engine: Always generate a binding CS Quotation for client sign-off before executing financial alterations (showing Before/After SA, Premium, Cash Values, and Net Cash Flow).",
      "Rescind Policy CS: In exceptional operational errors, Gemini provides a 'Rescind CS' transaction that rolls back policy state to pre-alteration status, reversing ledger accounting entries."
    ],
    "sections": [
      {
        "heading": "1. CS Workbench Architecture & Registration",
        "content": "All policy servicing requests originate from the CS Work List. Operators select the target inforce policy, verify identity, and choose the specific endorsement type. The system enforces policy status prerequisites (e.g., policy must be 'Inforce' with zero pending financial disputes)."
      },
      {
        "heading": "2. Financial Alterations & Underwriting Disposal",
        "content": "When increasing Sum Assured or adding riders (e.g. adding CI rider after policy issue), Gemini routes the alteration to CS Underwriting. Underwriters can approve standard, apply extra mortality loadings, or reject the request without invalidating the underlying base policy."
      },
      {
        "heading": "3. Surrender, Policy Loans & Bonus Surrenders",
        "content": "Operators can process Full Surrender or partial cash extractions. For participating endowment products, Gemini supports Reversionary Bonus Surrender, where clients monetize accumulated declared bonuses while keeping the main policy sum assured fully active."
      },
      {
        "heading": "4. Non-Forfeiture Options: RPU, ETA & APL",
        "content": "When policyholders encounter financial hardship or cease premium payments:\n- RPU (Reduced Paid-Up): Permanently ends premium obligation; SA is reduced.\n- ETA (Extended Term): Maintains full death cover for a calculated term duration.\n- APL (Auto Premium Loan): Keeps original policy fully active by advancing overdue premium as a loan against available cash value."
      },
      {
        "heading": "5. Complete Customer Service (Policy Servicing) Alteration Master Taxonomy & Rules",
        "content": "eBao Gemini Life Core PAS partitions all policy service endorsements into strict Non-Financial and Financial categories, each with distinct workflow validations, underwriting rules, and sub-ledger impacts:\n\n### A. Non-Financial Alterations (Biến đổi phi tài chính)\n\n| Alteration Code | Alteration Name | Mandatory Validations & Rules | Underwriting Referral | System & Ledger Impact |\n| :--- | :--- | :--- | :---: | :--- |\n| `CS-NF-01` | **Change Address & Contact** | Valid postal code, verified mobile number format, active email address. | No | Updates tax jurisdiction codes, dispatches change confirmation notice. |\n| `CS-NF-02` | **Change Beneficiary Designation** | Cumulative nominee shares must equal **exactly 100.0%**. Minor (<18) requires Trustee. | No | Replaces beneficiary allocation register; updates insurable interest flags. |\n| `CS-NF-03` | **Absolute Assignment** | Legal deed executed, assignor & assignee KYC verified, policy not pledged. | No | 100% policyholder rights transferred to Assignee; updates policy master owner. |\n| `CS-NF-04` | **Collateral Assignment** | Commercial bank lending contract details, collateral pledge registered. | No | Locks surrender and policy loan facilities until written release from bank. |\n| `CS-NF-05` | **Change Payment Frequency** | Switches modal frequency (Annual, Semi, Qtr, Month). Effective on next Due Date. | No | Re-calculates modal loading factor; adjusts future billing notice schedules. |\n| `CS-NF-06` | **Change Payment Method / Bank** | Bank account verification, direct debit mandate pre-authorization. | No | Updates auto-debit routing profile; links new clearing account token. |\n| `CS-NF-07` | **Change Occupation / Hazard Class** | Job duties disclosure, industry hazard verification (Class 1 to 4). | Conditional | Updates occupational extra per mille loadings on accidental and disability riders. |\n| `CS-NF-08` | **Rescind CS Endorsement** | Rollback authorization by CS Supervisor; valid within same accounting period. | No | Reverses previous alteration endorsement; restores policy master and financial state. |\n\n---\n\n### B. Financial Alterations (Biến đổi tài chính)\n\n| Alteration Code | Alteration Name | Financial Calculation & Rules | Underwriting Referral | System & Ledger Impact |\n| :--- | :--- | :--- | :---: | :--- |\n| `CS-FN-01` | **Sum Assured Increase** | Pro-rata premium increment calculated using attained age and current rate matrix. | **Yes (Full UW)** | Issues counter-offer; generates back-premium or modal differential billing. |\n| `CS-FN-02` | **Sum Assured Decrease** | Remaining SA must exceed minimum policy threshold ($10,000). | No | Decreases modal premium; unearned pro-rata premium refunded to suspense. |\n| `CS-FN-03` | **Add Supplementary Rider** | Rider compatibility check; attaches Accidental, CI, or Medical plan. | **Yes (Full UW)** | Generates new rider benefit schedule and adjusts total modal premium due. |\n| `CS-FN-04` | **Delete Supplementary Rider** | Policyholder written cancellation; terminates rider coverage immediately. | No | Terminates rider schedule; calculates unearned premium refund voucher. |\n| `CS-FN-05` | **Change DOB & Gender** | Recalculates true entry age: If older, back-bill arrears; if younger, refund excess. | Conditional | Updates rate table factors; posts retroactive financial debit/credit journals. |\n| `CS-FN-06` | **Policy Loan Disbursement** | `Max Loan = 85% * Net Cash Value`. Daily compound interest accrued at 6.5% p.a. | No | Books loan asset: `Dr. Policy Loan Ledger / Cr. Bank Clearing Voucher`. |\n| `CS-FN-07` | **Policy Loan Repayment** | Principal and accrued interest settlement (partial or lump sum). | No | Retires loan debt: `Dr. Bank Cash Collection / Cr. Policy Loan Ledger`. |\n| `CS-FN-08` | **Reduced Paid-Up (RPU)** | `New SA = (Net Cash Value / Single Prem Rate per $1,000) * 1,000`. | No | Sets future premiums to $0; permanently extinguishes all supplementary riders. |\n| `CS-FN-09` | **Extended Term Insurance (ETA)** | Net cash value applied as single premium to purchase term insurance for original SA. | No | Fixes expiry date; converts policy type; ends future premium requirements. |\n| `CS-FN-10` | **Reversionary Bonus Surrender** | Monetizes accumulated reversionary bonus units at actuarial discounted cash factor. | No | Keeps base policy active; generates immediate cash bonus disbursement voucher. |\n| `CS-FN-11` | **Full Policy Surrender** | `Net Payout = Gross Cash Value - Loan Principal - Accrued Interest + Unearned Prem`. | No | Irrevocably terminates policy contract; releases net surrender payout voucher. |\n| `CS-FN-12` | **2-Year Policy Reinstatement** | Applicable within 24 months of lapse. Requires health declaration & back-premiums. | **Yes (Full UW)** | Re-activates inforce status; resets 2-year contestability on newly declared risks. |"
      }
    ],
    "mapped_functions": [
      {
        "id": "F_073",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Registration",
        "l3": "",
        "l4": "",
        "desc": "Create a CS application manually at the workbench.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_074",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Task pool",
        "l4": "",
        "desc": "Centralized pool for user to process CS Data Entry, CS UW Confirmation, Approval and Pending Issue. Supports both fuzzy search and precise search with advanced search criteria. Also offer a button to create a new application quickly.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_075",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "CS Application Data Entry",
        "desc": "One-stop working page to do CS application entry, address outstanding issues and letters, submit or reject the CS application. Provide function for user to complete CS application data entry and confirm on collection/refund transactions.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_076",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "UW Decision Confirmation and Modification",
        "desc": "For CS UW case, system will autodispose the task according to UW decision given. No manual intervention is needed.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_077",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Query Letter Generation",
        "desc": "Manage CS query letter.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_078",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "CS Application Rejection",
        "desc": "Provide function to reject CS application at item level.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_079",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Data Entry",
        "l4": "Other Supporting Functions",
        "desc": "Capture comments on current CS application case, and other users who can access to this case can view all the comments history with user, time and detail content.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_080",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Approval",
        "l4": "",
        "desc": "Share the same UI interface with Data Entry, but is read-only. Support to approve, reject, or send the application back to data entry.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_081",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Pending Inforce",
        "l4": "",
        "desc": "List application cases that are approved but not inforce due to pending collection.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_082",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Work List",
        "l3": "Cancel CS Application",
        "l4": "",
        "desc": "Manual and auto cancel CS application.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_083",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Freelook",
        "l4": "",
        "desc": "Perform freelook for selected product(s). Generate premium refund and claw back commission (if commission is generated) and medical fee if need.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_084",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Add Rider",
        "l4": "",
        "desc": "Add traditional premium paying rider from commencement date, immediately, from next due date, or from next anniversary. Add unit deduct rider for ILP policy from next charge due date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_085",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Apply Policy Loan",
        "l4": "",
        "desc": "Apply policy loan for both ILP and traditional policy.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": true,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_086",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Delete Rider",
        "l4": "",
        "desc": "Delete rider immediately or from next due date/next charge due date for both cash rider and unit-deduct rider (ILP policy). Generate premium refund or GSV refund according to product definition for cash riders.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_087",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Decrease SA",
        "l4": "",
        "desc": "Decrease Sum Assured of traditional policies or cash riders of ILP policy immediately or from commencement date/next due date. Cash value will be partial withdrawal in case the product is with cash value.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_088",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Increase SA",
        "l4": "",
        "desc": "Increase Sum Assured of traditional policies and cash riders of ILP policy immediately or from commencement date/next due date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_089",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Reinstatement",
        "l4": "",
        "desc": "Perform reinstatement for selected product(s) for both ILP and traditional policy.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_090",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Termination/Surrender",
        "l4": "",
        "desc": "Terminate the entire policy which is not investment linked. Generate premium refund or cash value refund according to product definition.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_091",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Cancellation (Void policy)",
        "l4": "",
        "desc": "To cancel/void a policy or rider product from commencement date or immediately.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_092",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Assignment",
        "l4": "",
        "desc": "Change assignment for policies with no beneficiaries, including changing the assignment type, adding an assignee, deleting an assignee, and changing assignee information.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_093",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Beneficiary",
        "l4": "",
        "desc": "Change beneficiary (nominee), including adding beneficiaries, deleting beneficiaries, and changing beneficiary information.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_094",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Contact Information",
        "l4": "",
        "desc": "Change the contact information of the policy holder and the existing life assured(s) on policy level.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_095",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Occupation",
        "l4": "",
        "desc": "Change the occupation of the life assured. If occupation class changed, recalculate premium from Commencement Date/Immediately or Next Due Date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_096",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Payment Frequency",
        "l4": "",
        "desc": "Change payment frequency for traditional and investment product. Move due date to the next in case change payment frequency from a high frequency to low frequency (e.g. from monthly to yearly).",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_097",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Payment Method",
        "l4": "",
        "desc": "Change payment method, including selecting new payment method and maintain account information. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_098",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Policy Holder",
        "l4": "",
        "desc": "Change policy holder for the policy whose policy holder is an individual, not an organization.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_099",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Smoker Status",
        "l4": "",
        "desc": "Change the smoker status of the Life Assured immediately or from the commencement date and recalculate premium.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_100",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change extra premium",
        "l4": "",
        "desc": "If add extra premium in the CS underwriting process, system will auto generate CS application record of changing extra premium in the same application case.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_101",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Birth Date or Gender",
        "l4": "",
        "desc": "Change the birth date and gender of the life assured(s) at policy level. Calculate the amount to collect or refund.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_102",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Benefits",
        "l4": "",
        "desc": "Support to change benefit. System will calculate premium difference to be collected after change benefit and also maintaint the SB and RB upon product conversion.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_103",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Beneficial Owner",
        "l4": "",
        "desc": "Support to change policy beneficial owner after policy issuance",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_104",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Disbursement Method",
        "l4": "",
        "desc": "Change payment/disbursement method and maintain account information. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_105",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Discount Type",
        "l4": "",
        "desc": "Support to change the policy level discount type, e.g. to remove staff discount, or to add a new faimly discount indicator on policy. System will calculate premium based on discount type accordingly",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_106",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Term",
        "l4": "",
        "desc": "Support to change product's coverage term and premium term. System will recalculate premium based on updated term information automatically",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_107",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Trustee",
        "l4": "",
        "desc": "Change trustee, including adding trustees, deleting trustees, and changing trustee information.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_108",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change HPS Examption Information",
        "l4": "",
        "desc": "Customer may apply to be exempted from the Home Protection Scheme (HPS) if his/her private insurance coverage is enough to cover outstanding housing loan against death, terminal illness (TI) and total permanent disability (TPD). System support to maintain this indicator for downstream integration/report purpose.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_109",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Indexation Information",
        "l4": "",
        "desc": "For product with indexation feature, support to change the indexation indicator. System will perform indexation automatically according to the indcator.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_110",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Survival Benefit or Cash Bonus Option",
        "l4": "",
        "desc": "Change Survival Benefit or Cash Bonus Option, including change disbursement method if the CB/SB option is to pay out.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": true,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_111",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Change Payer",
        "l4": "",
        "desc": "Change payer, including adding a payer, deleting a payer, and changing payer information.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_112",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Ad hoc Switch Fund",
        "l4": "",
        "desc": "Switch by amount, unit, or percentage from an existing funds to other funds.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_113",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Change Investment Regular Prem",
        "l4": "",
        "desc": "Perform an increase or decrease in the regular investment premium payment. In case of increase, a new stream will be created for increased amount and allocation charge rate will based on the policy year of the newly added stream.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_114",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Change Regular Premium Apportionment",
        "l4": "",
        "desc": "Change the fund apportionment of investment premium. Including adding a new fund, deleting existing fund(s), and change the premium apportionment in each fund.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_115",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Decrease Sum Assured",
        "l4": "",
        "desc": "Decrease the sum assured of main benefit or unit deduction rider for an ILP policy. New SA will take effective from next charge due date.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_116",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Full Surrender",
        "l4": "",
        "desc": "Perform full surrender for an ILP policy. All units will be sold and surrender charge will be calculated according to product formula.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_117",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Increase Sum Assured",
        "l4": "",
        "desc": "Increase the sum assured of main benefit or unit deduction rider for an ILP policy. New SA will take effective from next charge due date.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_118",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Partial Withdraw",
        "l4": "",
        "desc": "Perform ILP partial withdrawal by unit or by value. Partial withdrawal charge will be calculated according to configured product formula.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_119",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Set or Change Recurring Top-Up",
        "l4": "",
        "desc": "Increase, decrease or set the recurring top-up premiums for an ILP policy. New recurring top up will take effective from next premium due date. The recurrong top up frequency can be different from regular premium.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_120",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Set or Cancel Premium Holiday",
        "l4": "",
        "desc": "Support to set premium holiday indicator and maintain premium holiday start date and end date for ILP policy",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_121",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Set or Change Regular Withdrawal Plan",
        "l4": "",
        "desc": "Support to set or change regular withdrawal plan for ILP policy. System will perform auto partial withdrawal according to the plan.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_122",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "ILP Single Premium Top-Up",
        "l4": "",
        "desc": "Process single premium top-up request made by the policyholder. Single top up can be made to existing funds or new funds.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_123",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Perform Reduced Paid Up",
        "l4": "",
        "desc": "Support to perform reduced paid up for eligible policies.",
        "comments": "Newly added in v25.04",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_124",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Policy Suspension",
        "l4": "",
        "desc": "Policy suspension is a transaction item which is used for user to manually suspend the policy without the need to change any policy information.",
        "comments": "Newly added in v25.04",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_125",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Premium Adjustment",
        "l4": "",
        "desc": "Premium adjustment is a transaction item which is used to manually adjust the system calculated premium amount.",
        "comments": "Newly added in v25.04",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_126",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Reversionary Bonus Surrender",
        "l4": "",
        "desc": "Support to perform reversionary bonus surrender per customer's request. System will recalculate RB automatically.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": true,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_127",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Transfer of Coverage",
        "l4": "",
        "desc": "Support to transfer coverage to a new life assured with option to keep SA unchanged or keep premium unchanged",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_128",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "CS Alteration",
        "l3": "Underwriting Review",
        "l4": "",
        "desc": "Support to trigger underwriting review without change policy information. User may modify loading, exclusion, or condition during underwriting review",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_129",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Watch List",
        "l3": "Task pool",
        "l4": "",
        "desc": "Function for operation department's admin user to view and monitor all outstanding tasks. Support both fuzzy search and precise search.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_130",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Watch List",
        "l3": "Task Release",
        "l4": "",
        "desc": "Support release tasks which is already claimed by a certain user.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_131",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Watch List",
        "l3": "Task Reassign",
        "l4": "",
        "desc": "Support to reassign tasks by 2 strategy: Push it to a specific user who has the authority of the workflow and accessible organization; Auto reassign it to a certain user according to pre-defined auto assignment strategy.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_132",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "HPS Exemption File Upload",
        "l3": "",
        "l4": "",
        "desc": "Support to upload GDEC file from CPF board into core system to update the HPS indicator for each policy.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_133",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "HPS Exemption File Download",
        "l3": "",
        "l4": "",
        "desc": "Support to select the transaction period to download the cases meet the criteria for the certain period, the end date can’t be earlier than start date and both two dates can’t be a future date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_134",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Policy Servicing Quotation",
        "l3": "",
        "l4": "",
        "desc": "Perform reinstatement quotation",
        "comments": "",
        "lobs": {
          "term": false,
          "life": true,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_135",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Query",
        "l3": "Query Pool",
        "l4": "",
        "desc": "Query CS application cases created by both manual submission and e-submission. Support both fuzzy search and precise search. User can query detail data of each application which is a snapshot of the application data.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_136",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Maintain Customer",
        "l3": "",
        "l4": "",
        "desc": "Query existing individual/company customers. Support both fuzzy search and precise search. Add new individual/company customers.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_137",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Maintain Customer",
        "l3": "Individual customer",
        "l4": "",
        "desc": "Maintain individual customer information, including basic information, identifier information, occupation&income information, tax information, contact information, etc.",
        "comments": "Upgrade function in v25.04",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_138",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Maintain Customer",
        "l3": "Company customer",
        "l4": "",
        "desc": "Maintain company customer information, including basic information, representative information, contact information, etc. Support to connect company customer with individuals, so that when perform AML checking for the company customer, the connected individual can be screened together.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_139",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Reverse Policy Transaction",
        "l3": "",
        "l4": "",
        "desc": "Reverse both online and batch transaction for some reason. All data will be rollback with reversed GL posting. All history data will be kept.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_140",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Adjust Unit",
        "l3": "",
        "l4": "",
        "desc": "Adjust unit of the funds for ILP policies.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_141",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Adjust Maturity",
        "l3": "",
        "l4": "",
        "desc": "After maturity benefit extraction but before perform maturity payment, user can adjust the amount to revise the net maturity amount in Pre-Maturity Notice and Maturity payment calculation",
        "comments": "",
        "lobs": {
          "term": false,
          "life": true,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_142",
        "app": "CS APP",
        "l1": "Customer Service",
        "l2": "Configuration",
        "l3": "Authority",
        "l4": "",
        "desc": "Configure authority for CS items access, data entry, and freelook permission.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_143",
        "app": "NB APP",
        "l1": "Customer Service",
        "l2": "Configuration",
        "l3": "Workflow Configuration",
        "l4": "",
        "desc": "Policy service workflow configuration for STP and non-STP flow and task assignment strategy configuration",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_144",
        "app": "NB APP",
        "l1": "Customer Service",
        "l2": "Configuration",
        "l3": "Rule Configuration",
        "l4": "",
        "desc": "CS operation rules configurations are used by CS",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_145",
        "app": "NB APP",
        "l1": "Customer Service",
        "l2": "Configuration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "Other general configuration needed for CS, such as pending reason, termination reason etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      }
    ],
    "function_count": 73,
    "sops": [
      {
        "code": "SOP-CS-01",
        "title": "CS Worklist Search & Registering Inforce Policy Alterations",
        "ui_path": "Main Menu > Customer Service > Work List > Register New Application",
        "prerequisites": [
          "Policy status in SOR is 'INFORCE'",
          "No open unresolved disputes, freezing orders, or active claim investigations"
        ],
        "steps": [
          "1. Navigate to Main Menu > Customer Service > Work List.",
          "2. In the Search Criteria panel, enter Policy Number (e.g. 'POL-2026-0081723') and click Search.",
          "3. Verify Policy Status is 'INFORCE' and Paid-To-Date is current.",
          "4. Click 'Register New Application' button at top right.",
          "5. In the CS Application Registration pop-up:\n   - Application Date: Defaults to current system date.\n   - Channel / Request Origin: Customer Service Counter, Mobile App, Mail In, Call Center.\n   - Alteration Category: Select 'Non-Financial' or 'Financial'.",
          "6. In the Policy Alteration Item dropdown, select target transaction (alphabetically sorted A-Z):\n   - 'Change Address'\n   - 'Change Beneficiary'\n   - 'Apply Policy Loan'\n   - 'Surrender (Full)'\n   - 'Reduced Paid-Up (RPU)'\n   - 'Add Rider' / 'Increase Sum Assured'.",
          "7. Click Submit Registration. Step Result: System creates CS Application Number (e.g. 'CS-2026-001094'), sets status to 'Waiting for Application Entry', and navigates to the alteration details screen."
        ],
        "fields_table": [
          {
            "name": "Policy Number",
            "type": "String",
            "required": "Yes",
            "desc": "Target inforce contract in SOR"
          },
          {
            "name": "Request Channel",
            "type": "Select",
            "required": "Yes",
            "desc": "Counter, Postal Mail, Customer Portal, Agency"
          },
          {
            "name": "Alteration Item",
            "type": "Select (A-Z)",
            "required": "Yes",
            "desc": "Specific endorsement transaction"
          }
        ],
        "actuary_notes": "Financial alterations trigger re-evaluation of cash values, paid-to-dates, and unearned premium reserves.",
        "op_notes": "Policies with pending claims or in 'Grace Period' block certain alterations until financial settlement occurs.",
        "pdf_page": 204
      },
      {
        "code": "SOP-CS-02",
        "title": "Non-Financial Alteration: Change of Beneficiary & Share Allocation",
        "ui_path": "Customer Service > Application Entry > Change Beneficiary",
        "prerequisites": [
          "Policyholder signed Change of Beneficiary application form",
          "If existing nomination was irrevocable, written consent of current beneficiary required"
        ],
        "steps": [
          "1. On the Application Entry screen for 'Change Beneficiary', review existing active beneficiary records.",
          "2. To revoke existing beneficiary: Click Delete or Edit on the beneficiary row.",
          "3. To add a new nominee: Click 'Add Beneficiary' button.",
          "4. Enter Nominee Legal Name, National ID / Birth Certificate, Date of Birth, Gender, and Relationship to Life Assured.",
          "5. In Share Percentage, enter the allocated percentage.",
          "6. Repeat for additional nominees until the Cumulative Share Percentage equals exactly 100%.",
          "7. If any nominee is a minor (<18): Designate Trustee details.",
          "8. In the Document Checklist section, check 'Change Form Signed' and 'ID Copies Verified'.",
          "9. Click 'Apply Change' button. Step Result: System validates share integrity.",
          "10. Click 'Submit for Approval'. If within standard rule limits, auto-approval triggers; otherwise routes to CS Approval Worklist."
        ],
        "fields_table": [
          {
            "name": "Nominee Name",
            "type": "Text",
            "required": "Yes",
            "desc": "Full legal name as per government registry"
          },
          {
            "name": "Share Percentage",
            "type": "Decimal",
            "required": "Yes",
            "desc": "Must equal 100% across all nominees"
          },
          {
            "name": "Irrevocable Consent",
            "type": "File Upload",
            "required": "Conditional",
            "desc": "Required if previous nomination was irrevocable"
          }
        ],
        "actuary_notes": "Beneficiary change has zero reserve or pricing impact, but accurate recordkeeping prevents interpleader legal liabilities during death settlements.",
        "op_notes": "Confirmation letter and updated Policy Endorsement Schedule PDF are automatically generated upon approval.",
        "pdf_page": 220
      },
      {
        "code": "SOP-CS-03",
        "title": "Full Policy Surrender & Cash Value Settlement with Debt Offsetting",
        "ui_path": "Customer Service > Application Entry > Surrender",
        "prerequisites": [
          "Policy has acquired cash value (qualifying tenure >= 2-3 years)",
          "Policyholder signed Surrender Request Form with verified bank account details"
        ],
        "steps": [
          "1. From CS Work List, register 'Surrender' alteration item for target policy.",
          "2. On Application Entry UI, system automatically calculates and displays real-time Surrender Financial Ledger:\n   - Guaranteed Surrender Value (GSV)\n   - Accumulated Reversionary Bonus Cash Value\n   - Terminal Bonus (if applicable)\n   - Total Gross Cash Value\n   - Less: Outstanding Policy Loan Principal\n   - Less: Accrued Policy Loan Interest up to Surrender Date\n   - Plus: Unearned Modal Premium (if cancelled mid-period)\n   - Equals: Net Surrender Value Payable.",
          "3. Verify Disbursement Payee: Select Policyholder bank account from dropdown or add new verified bank account (Bank Name, Branch, Account Number, Account Holder Name).",
          "4. Click 'Generate Surrender Quotation'. System generates binding quote showing exact deductions and net payout amount for client sign-off.",
          "5. Upload signed client acceptance slip.",
          "6. Click 'Apply Change' and click 'Submit'.",
          "7. System checks approval limits: Senior CS Supervisor reviews and approves transaction.",
          "8. Step Result: Policy status transitions from 'INFORCE' to 'TERMINATED_SURRENDER'. All coverage ceases immediately. System posts disbursement order to Payment Module 07."
        ],
        "fields_table": [
          {
            "name": "Gross Surrender Value",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Contractual accumulated cash value"
          },
          {
            "name": "Outstanding Loan Balance",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Principal debt deducted from gross cash value"
          },
          {
            "name": "Accrued Loan Interest",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Interest accrued from last anniversary to surrender date"
          },
          {
            "name": "Net Surrender Payout",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Final disbursement amount transferred to policyholder"
          }
        ],
        "actuary_notes": "Surrender releases policy mathematical reserve into statutory surplus. Net Profit/Loss = Reserve Released - Surrender Value Paid.",
        "op_notes": "Once surrender is confirmed and disbursed, the action is irreversible under standard PAS operating rules.",
        "pdf_page": 232
      },
      {
        "code": "SOP-CS-04",
        "title": "Applying for Policy Loan & Loan Repayment Operations",
        "ui_path": "Customer Service > Application Entry > Apply Policy Loan",
        "prerequisites": [
          "Policy inforce with positive net cash surrender value",
          "No existing loan foreclosure in progress"
        ],
        "steps": [
          "1. In CS Work List, select target inforce policy and register 'Apply Policy Loan'.",
          "2. On the Policy Loan screen, system displays:\n   - Current Total Cash Value (e.g. $12,450 USD)\n   - Maximum Loan-to-Value (LTV) Limit (85% = $10,582.50 USD)\n   - Existing Outstanding Loan & Interest (e.g. $0.00)\n   - Maximum Available Loan Drawing ($10,582.50 USD).",
          "3. In Requested Loan Amount field, enter desired advance (e.g. $5,000 USD).",
          "4. Enter Loan Date (defaults to current date). System displays annual interest rate (e.g. 6.5% p.a.).",
          "5. Specify Disbursement Bank Account details.",
          "6. Click 'Apply Change' and click 'Submit'. Step Result: Loan transaction created. Policy status remains 'INFORCE'. Loan balance updated to $5,000 USD. Disbursement order dispatched to Payment Module 07.",
          "7. For Loan Repayment (subsequent operation):\n   - Register 'Repay Policy Loan' in CS Work List.\n   - Select Repayment Mode: 'Full Settlement' or 'Partial Repayment'.\n   - System calculates principal and daily accrued interest up to repayment date.\n   - Enter received payment reference, apply change, and settle loan balance."
        ],
        "fields_table": [
          {
            "name": "Available Loan Credit",
            "type": "Currency",
            "required": "Read-only",
            "desc": "85% Cash Value minus existing loan balance"
          },
          {
            "name": "Requested Loan Amount",
            "type": "Currency",
            "required": "Yes",
            "desc": "Must not exceed Available Loan Credit"
          },
          {
            "name": "Loan Interest Rate",
            "type": "Percentage",
            "required": "Read-only",
            "desc": "Contractual compound interest rate (6.5% p.a.)"
          }
        ],
        "actuary_notes": "Policy loans function as policyholder investments funded by company assets. Daily interest formula: Daily Interest = Principal * (Annual Rate / 365). Capitalized annually.",
        "op_notes": "If loan balance + accrued interest reaches 100% of Cash Value, system issues formal 30-day Foreclosure Notice. If unpaid, policy terminates.",
        "pdf_page": 254
      },
      {
        "code": "SOP-CS-05",
        "title": "Non-Forfeiture Execution: Converting Policy to Reduced Paid-Up (RPU)",
        "ui_path": "Customer Service > Application Entry > Reduced Paid-Up",
        "prerequisites": [
          "Policyholder requests permanent cessation of future premium payments",
          "Policy has sufficient cash value to purchase minimum allowable paid-up Sum Assured"
        ],
        "steps": [
          "1. From CS Work List, register 'Reduced Paid-Up' alteration item for target policy.",
          "2. On the RPU Application Entry screen, system displays:\n   - Original Main Sum Assured (e.g. $100,000 USD)\n   - Current Net Cash Surrender Value (e.g. $21,300 USD)\n   - Attained Age of Life Assured\n   - Single Net Premium Rate for remaining term.",
          "3. Click 'Calculate RPU Quotation'. Step Result: System executes actuarial conversion formula:\n   - Reduced Sum Assured = (Net Cash Value / Single Premium Rate per $1k) * 1,000 (e.g. $42,600 USD).\n   - Premium Due Amount permanently resets to $0.00.\n   - Supplementary riders (AD&D, CI, Waiver, Hospital Cash) are automatically terminated.",
          "4. Review RPU Schedule showing Reduced Death Benefit and Maturity Benefit.",
          "5. Upload signed client confirmation endorsement request.",
          "6. Click 'Apply Change' and 'Submit'. Step Result: Policy status updates to 'REDUCED_PAID_UP'. Paid-To-Date advances to Maturity Date. No further billing notices will be issued."
        ],
        "fields_table": [
          {
            "name": "Original Sum Assured",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Inception coverage amount"
          },
          {
            "name": "Net Cash Value",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Available single premium purchasing power"
          },
          {
            "name": "Reduced Sum Assured",
            "type": "Currency",
            "required": "Read-only",
            "desc": "New death/maturity cover payable without future premiums"
          }
        ],
        "actuary_notes": "RPU is mathematically actuarially equivalent to the original contract at conversion date, preserving policyholder equity without financial loss to insurer.",
        "op_notes": "Riders terminate immediately on RPU conversion; unearned rider premium from current period is refunded to policyholder.",
        "pdf_page": 278
      },
      {
        "code": "SOP-CS-06",
        "title": "Adding Supplementary Rider Post-Inforce: Underwriting, Effective Date & Pro-Rata Short Premium Calculation",
        "ui_path": "Main Menu > Customer Service > Work List > Register Alteration > Add Rider (CS-FN-03)",
        "prerequisites": [
          "Policy status in SOR is 'INFORCE' (Cannot attach rider if LAPSED, PAID_UP, or INFORCE_APL)",
          "Premium Paid-To-Date (PTD) is current with no overdue billing receivables"
        ],
        "steps": [
          "1. Navigate to Customer Service > Work List > Search Policy Number.",
          "2. Click 'Register New Application' > Select Category 'Financial' > Alteration Item 'Add Supplementary Rider' (CS-FN-03 / TX-CS-017).",
          "3. In the Rider Selection panel, select available compatible rider (e.g. 'ACC-01 Personal Accident', 'CI-02 Critical Illness 50-Condition', or 'HI-03 Hospital Income').",
          "4. Specify Rider Sum Assured and select Rider Inception Effective Date Option:\n   - Option 1 (Next Modal Due Date / Anniversary): Effective Date = Next Due Date. Pro-rata premium = 0 VND. Rider premium added to next scheduled modal invoice.\n   - Option 2 (Immediate Mid-Term Inception): Effective Date = UW Approval Date. System triggers Pro-Rata Short Period Premium calculation.",
          "5. System executes Underwriting Rules Engine (UW APP): Generates T_UW_TASK. If Sum Assured exceeds non-medical limit, prompts medical questionnaire / MER requirement.",
          "6. If Option 2 is selected and UW approved, system calculates Pro-Rata Short Premium: Pro-Rata = Annual Rider Premium * (Days Remaining until Next Due Date / 365).",
          "7. System generates an Out-of-Cycle Billing Invoice (T_BILL_RECEIVABLE). Upon receipt of pro-rata settlement, rider transitions to 'INFORCE_RIDER' and synchronizes its PTD to the Main Policy PTD."
        ],
        "fields_table": [
          {
            "name": "Rider Code",
            "type": "Select",
            "required": "Yes",
            "desc": "Compatible supplementary rider product code"
          },
          {
            "name": "Rider Sum Assured",
            "type": "Currency",
            "required": "Yes",
            "desc": "Requested coverage amount"
          },
          {
            "name": "Effective Date Option",
            "type": "Radio",
            "required": "Yes",
            "desc": "Next Due Date (No Pro-rata) vs Immediate Inception (Pro-rata billed)"
          },
          {
            "name": "Pro-Rata Short Premium",
            "type": "Read-Only Formula",
            "required": "Auto",
            "desc": "Annual Premium * (Days Remaining / 365)"
          },
          {
            "name": "Rider Expiry Date",
            "type": "Date",
            "required": "Auto",
            "desc": "Lesser of Main Policy Maturity Date or Rider Max Attained Age (e.g. 65)"
          }
        ],
        "actuary_notes": "Rider risk begins strictly on Effective Date. Pro-rata premium ensures actuarial cost of insurance (COI) matching without unearned risk gap.",
        "op_notes": "At the next modal due date, the rider premium consolidates into the main modal bill, maintaining unified billing frequency.",
        "pdf_page": 214
      }
    ],
    "sop_count": 5,
    "interconnections": {
      "module_code": "CS_APP",
      "upstream_sources": [
        {
          "module": "MOD_02 New Business",
          "data": "Inforce policy contracts and customer party registries in SOR"
        },
        {
          "module": "MOD_03 Underwriting",
          "data": "Underwriting approvals for rider additions and sum assured increases"
        },
        {
          "module": "MOD_05 Billing",
          "data": "Paid-to-Date and unearned premium balances"
        }
      ],
      "downstream_destinations": [
        {
          "module": "MOD_05 Billing",
          "impact": "Updates billing frequency, modal premiums, and direct debit bank accounts"
        },
        {
          "module": "MOD_07 Payment & Finance",
          "impact": "Dispatches disbursement orders for Surrenders, Policy Loans, and Cooling-off refunds"
        },
        {
          "module": "MOD_06 Claims",
          "impact": "Maintains active loan balances and non-forfeiture states deducted during claim settlement"
        },
        {
          "module": "MOD_08 Batch Console",
          "impact": "Provides loan balances for daily interest accrual and non-forfeiture status (RPU/ETA)"
        }
      ],
      "shared_data_entities": [
        "T_POLICY_ALTERATION (CS Transaction)",
        "T_POLICY_LOAN (Loan Ledger)",
        "T_BENEFICIARY_ALLOCATION"
      ],
      "lifecycle_events": [
        "ALTERATION_REGISTERED",
        "LOAN_DISBURSED",
        "POLICY_SURRENDERED",
        "CONVERTED_TO_RPU"
      ]
    },
    "pdf_start_page": 196,
    "pdf_end_page": 303,
    "pdf_chapter": "Chapter 4: Customer Service & Policy Servicing (CS APP)"
  },
  {
    "id": "MOD_05",
    "num": "05",
    "title": "Mod 05: Billing & Collection",
    "subtitle": "Billing Schedules, Direct Debit, Grace Period Management & Suspense Matching",
    "icon": "💳",
    "badge": "Revenue Collection",
    "page_range": "Pages 342 - 375",
    "summary": "The Billing & Collection application manages ongoing recurring premium collection. It generates automated billing notices in advance of due dates, orchestrates direct debit file exchanges with clearing banks, monitors grace period aging (30-60 days), handles manual payment receipts, and manages suspense ledger accounts for unmatched receipts.",
    "mermaid_workflow": "graph LR\n    Schedule[\"Billing Schedule Engine\"] --> Notice[\"Generate Premium Notice (T-30 Days)\"]\n    Notice --> DueDate[\"Policy Due Date\"]\n    DueDate --> CollectMode{\"Payment Channel\"}\n    CollectMode -- Direct Debit --> DDFile[\"Generate Bank Direct Debit File\"]\n    DDFile --> BankReturn[\"Process Bank Return / Settlement\"]\n    CollectMode -- Manual / Wire --> Counter[\"Manual Collection Entry\"]\n    BankReturn -- Success --> Apply[\"Apply Premium & Advance Paid-To-Date\"]\n    Counter -- Matched --> Apply\n    BankReturn -- Fail --> Grace[\"Grace Period Counter (Days 1 to 60)\"]\n    Grace -- Unpaid at Day 60 --> BatchTrigger[\"Batch Trigger: APL or Auto-Lapse (Module 08)\"]",
    "core_concepts": [
      {
        "term": "Paid-to-Date (PTD)",
        "definition": "The exact date up to which premiums have been fully settled, serving as the benchmark for billing notices, grace period countdowns, and cash value calculations."
      },
      {
        "term": "Grace Period",
        "definition": "A statutory duration (typically 30 to 60 days following premium due date) during which coverage remains fully in force even if premium has not yet been collected."
      },
      {
        "term": "Suspense Account (Unallocated Ledger)",
        "definition": "A temporary clearing ledger holding unidentified, overpaid, or partial funds received from bank transfers until operations users manually match them to specific policy billing items."
      },
      {
        "term": "Direct Debit Cycle",
        "definition": "Automated batch process extracting all active direct-debit policies due within the billing cycle window, generating standardized clearing files (NACHA, GIRO, BACS)."
      },
      {
        "term": "60-Day Premium Grace Period & Midnight Decision Engine",
        "definition": "Statutory 60-day grace period starting post-Due Date. Coverage remains 100% active. At Day 60 midnight, batch evaluates Net Cash Value: If Net CV >= Modal Premium -> APL Loan drawn (INFORCE_APL); else -> Auto-Lapse (LAPSED)."
      }
    ],
    "actuary_notes": [
      "Modal Factor Loading: Modal factors compensate for lost interest and administrative billing expenses. Total collected annually under monthly frequency is higher: Total = 12 * (Annual Premium * 0.088) = 1.056 * Annual Premium (5.6% modal loading).",
      "Unearned Premium Reserve (UPR): Premiums collected in advance past valuation date must be deferred on balance sheets as unearned reserves.",
      "Grace Period Claim Valuation: If death or critical illness occurs during the grace period, the full claim is payable, but the outstanding overdue premium is deducted from the claim settlement amount.",
      "APL Loan Mechanics: When APL triggers, loan interest accrues daily at compound annual rate (e.g. 6.5%). If accumulated loan debt equals cash value, policy terminates under non-forfeiture."
    ],
    "op_notes": [
      "Direct Debit Retries: Standard practice defines up to 2 retry attempts across 14-day intervals before marking direct debit as failed and sending urgent grace lapse warnings to client.",
      "Suspense Clearing Rules: Automated matching rules attempt matching by Policy Number, National ID, and exact payment amount. Residual items require manual operational review.",
      "Billing Freeze: Policies with active pending claims or major financial alterations are automatically locked from regular billing runs to prevent incorrect debiting."
    ],
    "sections": [
      {
        "heading": "1. Billing Run & Notice Generation",
        "content": "The Billing Console initiates automated billing runs prior to policy due dates (typically T-30 or T-15 days). The system verifies policy status (must be Inforce), calculates the current modal premium amount, and outputs personalized billing notices via physical mail, SMS, or email."
      },
      {
        "heading": "2. Direct Debit File Exchange & Clearing",
        "content": "For policies registered with automatic bank deductions or credit cards, Gemini compiles extraction batches conforming to bank-specific formats. Upon receiving return clearing files, the system parses successful transactions, advances the Paid-to-Date, and flags rejected accounts with specific bank failure codes (e.g. Insufficient Funds, Account Closed)."
      },
      {
        "heading": "3. Manual Collections & Suspense Account Management",
        "content": "Direct wire transfers, counter payments, and virtual account deposits are captured in Manual Collection. Funds that cannot be automatically associated with a valid open bill are credited to the Policy Suspense Account, allowing operations to allocate funds across multiple overdue billing items or refund excess amounts."
      },
      {
        "heading": "4. Grace Period Monitoring & Lapse Transition",
        "content": "Gemini maintains an active countdown from the due date. Warning letters are automatically dispatched at Day 30 and Day 45. If payment remains outstanding on Day 60, the policy transitions to the automated non-forfeiture evaluation process (APL trigger or Lapse)."
      }
    ],
    "mapped_functions": [
      {
        "id": "F_265",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Manual Suspend and Unsuspend Extraction",
        "l3": "",
        "l4": "",
        "desc": "Manual suspend or unsuspsend bank transfer.",
        "comments": "Deleted in new FN Workbench",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_266",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Billing Query",
        "l3": "",
        "l4": "",
        "desc": "Query NB/CS/Renew billing record, with a link to query ARAP and  suspense balances.",
        "comments": "New function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_267",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Configuration",
        "l3": "Fee Type",
        "l4": "",
        "desc": "To configure Fee Type List.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_268",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Configuration",
        "l3": "Payment Method",
        "l4": "",
        "desc": "To configure Payment Method.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_269",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Configuration",
        "l3": "Premium Notice",
        "l4": "",
        "desc": "To configure Premium Notice and Remider Notice's schedule.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_270",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Configuration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "General Configuration including GIRO Deduction Schedule, Attempt to Deduction, etc.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_271",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Change Billing Details",
        "l3": "",
        "l4": "",
        "desc": "To support billing level payment method update based on customer requests",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_272",
        "app": "FIN APP",
        "l1": "Billing",
        "l2": "Renew Extraction Failure",
        "l3": "Exceptions",
        "l4": "",
        "desc": "Query policies that were extracted for renewal but encountered failures or exceptions",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_273",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Manual Collection",
        "l3": "",
        "l4": "",
        "desc": "1.Support to create collection at policy level for NB, renew, CS as well as repay loan. All collection method defined at code table can be chosen at the screen. Additional information will be captured for specific pay mode, like cheque, debit card, credit card, etc. System will allocate collection to different purpose by rules, such as allocate to general suspense if the policy is a proposal, allocate to renew suspense if there is renew outstanding billing, allocate to CS suspense if there is outstanding CS billing, etc.\n2.To support write-off.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_274",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Collection Query",
        "l3": "",
        "l4": "",
        "desc": "Query collection record, with a link to query offset details page.",
        "comments": "New function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_275",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Collection Reversal",
        "l3": "",
        "l4": "",
        "desc": "User can reverse collection by this function. If the collection isn't been used by transaction, user can reverse directly. If the collection is used by transaction, user need reverse transaction first.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_276",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Write Off Approval",
        "l3": "",
        "l4": "",
        "desc": "Support to perform write off approval and task reassignment.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_277",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Cancel Write Off",
        "l3": "",
        "l4": "",
        "desc": "Support to cancel the approved write off before the related business is inforce",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_278",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Manage IBG",
        "l3": "",
        "l4": "",
        "desc": "Support Manual GIRO Form/Link and unlink existing IBG.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_279",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Configuration",
        "l3": "Payment Method",
        "l4": "",
        "desc": "To configure Payment Method.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_280",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Configuration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "General Configuration including GIRO Deduction Schedule, Attempt to Deduction, etc.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_281",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Batch Upload Collection",
        "l3": "",
        "l4": "",
        "desc": "Function to create collection in bulk.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_282",
        "app": "FIN APP",
        "l1": "Collection",
        "l2": "Transfer Suspense",
        "l3": "",
        "l4": "",
        "desc": "Transfer balance between different suspense accounts. Also support to transfer suspense from/ to suspense accounts to/ from Advance Premium Account (APA), Policy Loan, Automatic Premium Loan (APL) accounts.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      }
    ],
    "function_count": 18,
    "sops": [
      {
        "code": "SOP-BIL-01",
        "title": "Scheduling & Generating Automated Premium Billing Notices (T-30 Days)",
        "ui_path": "Main Menu > Finance > Billing > Billing Console > Schedule Billing Run",
        "prerequisites": [
          "Policies in 'INFORCE' status with upcoming due dates within window"
        ],
        "steps": [
          "1. Navigate to Main Menu > Finance > Billing > Billing Console.",
          "2. Click 'Schedule Billing Run' tab.",
          "3. Set Billing Cut-off Date (typically T+30 days ahead of current business date).",
          "4. Select Target Lines of Business ('Life / Traditional Endowment').",
          "5. Select Target Servicing Branches ('All Branches').",
          "6. Click 'Execute Billing Scan'. Step Result: System queries SOR for all inforce policies whose Paid-To-Date falls between current date and cut-off date.",
          "7. System generates open Billing Receivable items (Bills) with unique Bill ID, Modal Due Amount, and Statutory Due Date.",
          "8. Select Notification Output: Check 'Electronic Billing Notice (SMS/Email)' and 'Physical Notice Batch'.",
          "9. Click 'Generate & Dispatch Notices'. Step Result: Premium notices transmitted to policyholders with payment QR codes and banking instructions."
        ],
        "fields_table": [
          {
            "name": "Billing Cut-Off Window",
            "type": "Date Range",
            "required": "Yes",
            "desc": "Typically 15 to 30 days in advance of due date"
          },
          {
            "name": "Modal Bill Amount",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Standard modal premium plus any extra loadings"
          }
        ],
        "actuary_notes": "Billing generation establishes accounts receivable in sub-ledger: Dr. Premium Receivable / Cr. Gross Written Premium.",
        "op_notes": "Policies with pending claims, active surrenders, or legal disputes are automatically excluded from billing runs via system freeze flags.",
        "pdf_page": 346
      },
      {
        "code": "SOP-BIL-02",
        "title": "Generating Direct Debit Bank Extraction Batches (GIRO / ACH / BACS)",
        "ui_path": "Finance > Billing > Direct Debit > Batch Extraction",
        "prerequisites": [
          "Open bills generated for policies registered with direct debit bank accounts"
        ],
        "steps": [
          "1. Navigate to Finance > Billing > Direct Debit.",
          "2. Select Clearing Bank (e.g. Sacombank, Vietcombank, Standard Chartered).",
          "3. Select Billing Cycle Due Date.",
          "4. Click 'Extract Direct Debit Batch'. Step Result: System compiles all open bills for policyholders holding verified bank accounts at selected clearing bank.",
          "5. Verify Batch Summary: Displays Record Count (e.g. 1,420 policies) and Total Debit Amount (e.g. $845,000 USD).",
          "6. Click 'Generate Clearing File'. System outputs standard electronic banking format (ISO 20022 pain.008 or bank-specific fixed-width text file).",
          "7. Transmit file to clearing bank via secure SFTP host connection. Batch status marks as 'Sent to Bank - Awaiting Settlement'."
        ],
        "fields_table": [
          {
            "name": "Clearing Bank Code",
            "type": "Select",
            "required": "Yes",
            "desc": "Partner bank processing direct debits"
          },
          {
            "name": "Batch Total Amount",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Aggregated sum of all debit instructions in batch"
          },
          {
            "name": "Export File Format",
            "type": "Select",
            "required": "Yes",
            "desc": "ISO 20022 XML, CSV, NACHA, Bank Fixed Width"
          }
        ],
        "actuary_notes": "Direct debit collections have lowest lapse rates and highest persistency; actuaries build lower expense assumptions into direct-debit products.",
        "op_notes": "If bank rejects file due to formatting errors, operator can use 'Cancel & Re-extract Batch' tool.",
        "pdf_page": 355
      },
      {
        "code": "SOP-BIL-03",
        "title": "Importing Bank Clearing Return Files & Processing Automated Settlements",
        "ui_path": "Finance > Billing > Direct Debit > Import Clearing Return",
        "prerequisites": [
          "Return settlement file received from clearing bank"
        ],
        "steps": [
          "1. Navigate to Finance > Billing > Direct Debit > Import Return File.",
          "2. Click 'Choose File' and select bank settlement file (e.g. 'SETTLE_SACOM_20261020.txt').",
          "3. Click 'Upload & Validate'. System parses file and verifies record count against original extraction batch.",
          "4. System segments records into:\n   - Success Transactions (Bank Code 00 - Funds debited successfully)\n   - Failed Transactions (Bank Code 51 - Insufficient Funds, Code 04 - Account Closed).",
          "5. Click 'Process Settlements':\n   - For Success items: Gemini automatically applies premium, advances policy Paid-To-Date by 1 billing period, and clears billing receivable in sub-ledger.\n   - For Failed items: System logs failure reason code, leaves bill open, and initiates Grace Period aging counter.",
          "6. Click 'Export Settlement Report' for accounting reconciliation."
        ],
        "fields_table": [
          {
            "name": "Bank Return Code",
            "type": "String",
            "required": "Read-only",
            "desc": "Bank transaction status: 00 = Success, 51 = Insufficient funds"
          },
          {
            "name": "Settled Amount",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Total funds deposited into insurance company clearing account"
          }
        ],
        "actuary_notes": "Advancing Paid-To-Date updates unearned premium reserves and resets policy lapse risk scores in actuarial monitoring feeds.",
        "op_notes": "Failed direct debit policies automatically trigger automated SMS: 'Direct debit unsuccessful due to insufficient funds. Please deposit funds within 14 days'.",
        "pdf_page": 368
      },
      {
        "code": "SOP-BIL-04",
        "title": "60-Day Premium Grace Period Management, Reminder Dispatches & Midnight Auto-Lapse / APL Decision Engine",
        "ui_path": "Main Menu > Billing & Collection > Grace Period Portfolio Monitor > Aging Console",
        "prerequisites": [
          "Modal Premium Due Date has passed without full premium settlement",
          "Open T_BILL_RECEIVABLE record exists with status 'UNPAID'"
        ],
        "steps": [
          "1. Open Billing & Collection > Grace Period Portfolio Monitor.",
          "2. Daily Batch Job JOB_GRACE_AGING (01:15 AM) increments Unpaid Grace Days Counter (Day 1 to 60) for all policies where System Date > Premium Due Date.",
          "3. System maintains full coverage: If a death, disability, or medical claim occurs during Grace Days 1-60, claim is approved and payable (net of unpaid overdue premium).",
          "4. Day 30 Automated Milestone: System triggers NOTICE_PREM_REMIND_1 dispatching SMS, Email, and Customer App notification with direct payment gateway link.",
          "5. Day 45 Automated Milestone: System triggers NOTICE_PREM_WARNING_FINAL via registered mail and urgent SMS warning of impending contract termination / APL loan.",
          "6. Day 60 Midnight Cutoff (23:59:59): Nightly Batch Jobs JOB_APL_EXEC and JOB_AUTO_LAPSE_TRAD execute decision engine:\n   - Calculates Net Cash Value = Gross Cash Value - Loan Principal - Accrued Interest.\n   - Branch A (Net CV >= Unpaid Modal Premium): Executes APL. Draws policy loan, pays modal bill, advances PTD by 1 modal term, transitions status to 'INFORCE_APL', and begins daily compound loan interest.\n   - Branch B (Net CV < Unpaid Modal Premium): Executes Auto-Lapse. Sets Sum Assured to 0, terminates all riders, transitions status to 'LAPSED', and initializes 2-Year Statutory Reinstatement Countdown."
        ],
        "fields_table": [
          {
            "name": "Policy Number",
            "type": "String",
            "required": "Yes",
            "desc": "Inforce contract in past-due status"
          },
          {
            "name": "Premium Due Date",
            "type": "Date",
            "required": "Yes",
            "desc": "Contractual modal due date"
          },
          {
            "name": "Grace Days Elapsed",
            "type": "Integer (1-60)",
            "required": "Auto",
            "desc": "Current days past due date"
          },
          {
            "name": "Net Cash Value",
            "type": "Currency",
            "required": "Auto",
            "desc": "Gross CV minus outstanding debt & interest"
          },
          {
            "name": "Day 60 Execution Decision",
            "type": "Evaluation",
            "required": "Auto",
            "desc": "APL Loan Draw vs Contract Auto-Lapse"
          }
        ],
        "actuary_notes": "Statutory 60-day window protects policyholder equity. APL preserves mortality coverage using cash value as collateral.",
        "op_notes": "Once lapsed, revival within 24 months requires full reinstatement underwriting (Declaration of Good Health) and back-premium payment.",
        "pdf_page": 368
      }
    ],
    "sop_count": 3,
    "interconnections": {
      "module_code": "FIN_BILLING",
      "upstream_sources": [
        {
          "module": "MOD_02 New Business",
          "data": "Enforced policy modal premium and payment frequency"
        },
        {
          "module": "MOD_04 Customer Service",
          "data": "Alterations modifying premium, bank accounts, or billing mode"
        },
        {
          "module": "MOD_08 Batch Console",
          "data": "Nightly batch scheduler triggering T-30 billing runs"
        }
      ],
      "downstream_destinations": [
        {
          "module": "Clearing Banks",
          "impact": "Transmits electronic Direct Debit clearing files (GIRO/ACH/BACS)"
        },
        {
          "module": "MOD_08 Batch Console",
          "impact": "Feeds unpaid overdue policies into Grace Period Aging and APL triggers"
        },
        {
          "module": "MOD_07 Payment / Finance",
          "impact": "Generates refund vouchers for overpayments and manages suspense accounts"
        }
      ],
      "shared_data_entities": [
        "T_BILL_RECEIVABLE (Open Bills)",
        "T_BANK_FILE_BATCH (Clearing Batches)",
        "T_POLICY_SUSPENSE (Suspense Ledger)"
      ],
      "lifecycle_events": [
        "BILL_GENERATED",
        "DIRECT_DEBIT_EXTRACTED",
        "PREMIUM_SETTLED_PTD_ADVANCED",
        "GRACE_PERIOD_INITIATED"
      ]
    },
    "pdf_start_page": 342,
    "pdf_end_page": 375,
    "pdf_chapter": "Chapter 6: Billing & Collection (FIN APP)"
  },
  {
    "id": "MOD_06",
    "num": "06",
    "title": "Mod 06: Claims Management (CLM APP)",
    "subtitle": "FNOL, Medical Assessment, Benefit Calculation, Adjudication & Settlement",
    "icon": "🏥",
    "badge": "Claim Adjudication",
    "page_range": "Pages 304 - 341",
    "summary": "The Claims application orchestrates the entire claims lifecycle across all benefit lines. It covers First Notice of Loss (FNOL), claimant verification, medical and investigator assessment, benefit calculation (Death, TPD, Critical Illness, Hospital Cash, Medical Reimbursement), claims committee escalation, settlement execution, and subsequent policy status adjustments.",
    "mermaid_workflow": "graph TD\n    Incident[\"Insured Event Occurs\"] --> FNOL[\"Claim Registration (FNOL)\"]\n    FNOL --> Checklist[\"Document Verification & Checklist\"]\n    Checklist --> Accept[\"Claim Case Acceptance\"]\n    Accept --> Assess[\"Claim Evaluation & Medical Assessment\"]\n    Assess --> ExcludeCheck{\"Exclusion / Contestability?\"}\n    ExcludeCheck -- Incontestable & Valid --> Calc[\"Benefit Calculation Engine\"]\n    ExcludeCheck -- Incontestable / Fraud --> Rej[\"Claim Repudiation / Decline\"]\n    Calc --> Deduct[\"Deduct Outstanding Loans & Due Premiums\"]\n    Deduct --> Approve[\"Claim Approval Hierarchy\"]\n    Approve --> Settle[\"Settlement & Payout (Module 07)\"]\n    Settle --> PolicyEffect[\"Policy Termination or Sum Assured Reduction\"]",
    "core_concepts": [
      {
        "term": "FNOL (First Notice of Loss)",
        "definition": "Initial registration capturing event date, cause (Illness, Accident, Natural), reporter details, claimant identity, and initial estimated claim liability."
      },
      {
        "term": "Contestability Period (2-Year Rule)",
        "definition": "Statutory rule where claims occurring within 24 months of policy inception or reinstatement are subject to strict non-disclosure and pre-existing condition investigation."
      },
      {
        "term": "Accelerated vs Additional Benefit",
        "definition": "Accelerated CI pays out from and reduces the Main Plan Death Sum Assured; Additional CI pays an independent benefit without diminishing the base death protection."
      },
      {
        "term": "Net Claim Settlement Amount",
        "definition": "Gross Calculated Benefit minus Outstanding Policy Loans minus Accrued Loan Interest minus Unpaid Grace Period Premiums plus Unearned Advance Premiums."
      }
    ],
    "actuary_notes": [
      "IBNR & Case Reserves: Upon FNOL registration, Gemini automatically sets an Initial Case Reserve. Claim assessors can adjust this reserve dynamically based on medical findings.",
      "Endowment Maturity vs Death Benefit: In endowment products, death benefit equals Max(Sum Assured + Vested Reversionary Bonus, Total Premiums Paid). Maturity benefit equals Sum Assured + Vested Bonus + Terminal Bonus.",
      "Rider Exhaustion Matrix: Critical Illness payouts may extinguish the CI rider, waive future premiums on the base policy (if CI Waiver is attached), or adjust remaining life cover."
    ],
    "op_notes": [
      "Claims Watch List & Fraud Triggers: Automated alerts when claims are filed within 90 days of policy issuance, when claim causes involve high-fraud diagnosis codes, or when multiple claims are submitted simultaneously.",
      "Claims Medical Assessment UI: Dedicated medical evaluation screens to document hospital admission dates, surgery codes (ICD-9/ICD-10), pathology reports, and attending physician reviews.",
      "Multi-Tier Approval Matrix: Senior Claims Assessors, Claims Managers, and Claims Committees have structured financial sign-off limits before disbursement can proceed."
    ],
    "sections": [
      {
        "heading": "1. Claim Registration & FNOL Reception",
        "content": "Claim intake accepts notices from omnichannel sources (customer portal, mobile app, agent, branch). Registrars record event date, hospitalization dates, death certificate numbers, or diagnosis codes, and verify that the policy was inforce on the event date."
      },
      {
        "heading": "2. Case Acceptance & Document Tracking",
        "content": "Gemini generates a dynamic document requirement checklist based on claim type (e.g., Death Certificate, Original Policy Contract, Police Accident Report, Medical Records). Case status advances to 'Under Investigation' or 'Waiting for Evaluation' once essential documents are verified."
      },
      {
        "heading": "3. Adjudication & Benefit Calculation",
        "content": "The Benefit Engine calculates entitlements across all active benefits:\n- Validates waiting periods (e.g. 90-day CI waiting period).\n- Applies deductible and co-insurance rules for Medical Reimbursement.\n- Aggregates limits across multiple riders and policies held by the same life assured."
      },
      {
        "heading": "4. Settlement & Policy Status Updates",
        "content": "Upon claim approval, Gemini executes the financial settlement and updates the policy ledger:\n- Death Claim: Entire policy terminates; Life Assured status set to 'Deceased'.\n- Major CI Claim: CI rider terminates; if accelerated, base plan Sum Assured and subsequent premiums are reduced proportionally."
      }
    ],
    "mapped_functions": [
      {
        "id": "F_146",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Registration",
        "l3": "Claim Life Assured/Policy Search",
        "l4": "",
        "desc": "Search and select the correct insured/policy to initiate a claim. Retrieves the life‑assured profile and all associated policies via PA integration to ensure proper case linkage.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_147",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Registration",
        "l3": "Eligible claim types selection",
        "l4": "",
        "desc": "Derive eligible claim types after the insured is selected and display applicable policies under each type to guide compliant claim initiation.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_148",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Registration",
        "l3": "Claim Basic Information Entry",
        "l4": "Claim Information\nDiagnosis Information\nInformant Information",
        "desc": "Capture end‑to‑end intake data: event details, claim type(s), case classification (new vs. continuation), and clinical coding (ICD/free text), together with informant details (search or create). Supports multi‑type submission across Life/Health lines (Death, TPD, CI, Medical, Waiver, Disability, LTC).",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_149",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Registration",
        "l3": "Claim Basic Information Entry",
        "l4": "Caregiver Information\nDependant Information",
        "desc": "Record Caregiver and Dependant party roles specific to LTC claims to support eligibility assessment and downstream disbursement controls.",
        "comments": "Enhanced in Income CRP LTC R2 phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_150",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Registration",
        "l3": "Pend at Registration",
        "l4": "",
        "desc": "Save a pended registration to auto‑generate the Registration No. and Case No., then access and maintain the document checklist for evidence tracking.",
        "comments": "Enhanced in Income CRP LTC R2 phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_151",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Registration",
        "l3": "Reject Registration",
        "l4": "",
        "desc": "Reject a claim at registration with reason capture and letter triggering; the case will not progress to Acceptance.",
        "comments": "Enhanced in Income CRP LTC R4 phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_152",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Work List Pool",
        "l4": "",
        "desc": "Centralized, permission‑controlled queue consolidating claim tasks across Registration, Acceptance, Evaluation, Approval，Escalation Reply and Disbursing/Withholding, with advanced/fuzzy search for oversight and load balancing.",
        "comments": "Disbursing/Withholding is enhanced in Income CRP LTC",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_153",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Work List Pool",
        "l4": "",
        "desc": "Centralized, permission‑controlled queue consolidating claim tasks across Ongoing Claim and Recovery with advanced/fuzzy search for oversight and load balancing.",
        "comments": "Enhanced in Income CRP LTC R4 phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_154",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Acceptance",
        "l4": "Claim Basic Information View, Edit and Input\n- Claim Information\n- Diagnosis Information\n- Informant Information\n- Additional Information\n- Additional Claim Roles",
        "desc": "Review and enrich intake data during Acceptance. Capture/maintain clinical and causation attributes (e.g., ICD, accident code, dread disease code, cancer stage)  driven by claim-type configuration and additional claim roles.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_155",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Acceptance",
        "l4": "Claim Basic Information View, Edit and Input\n- Caregiver Information\n- Dependant Information\n- ADL Information\n- ELS Register Query",
        "desc": "For SG LTC claims, integrate with CDD to retrieve/update ADL assessments and query ELS (via Medinet) for coverage verification. Users may view, add, or edit ADL records as required.",
        "comments": "Enhanced in Income CRP LTC R2 phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_156",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Acceptance",
        "l4": "Claim Issue",
        "desc": "Run data validations across claim, policy and documents; surface Acceptance Issues for remediation and route to requirement letters, investigation, or accept.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_157",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Acceptance",
        "l4": "Case Level Initial Decision Making",
        "desc": "Make case‑level preliminary decisions (Accept, Pend, Reject, Withdrawn) with mandatory reasons for adverse outcomes. For ILP Death claims, capture Price Effective Date for unit liquidation.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_158",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Acceptance",
        "l4": "Policy Level Initial Decision Making",
        "desc": "Make policy‑level decisions across all policies under the insured. Apply configuration‑driven policy freeze by claim type (overrideable) and derive policy disposition from product‑level results.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_159",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Acceptance",
        "l4": "Product Level Initial Decision Making",
        "desc": "Adjudicate at product level using pre‑configured rules; block acceptance with explicit failure reasons or accept and auto‑compute claim reserves per product formula.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_160",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Acceptance",
        "l4": "Policy level payee",
        "desc": "Default payee determination (policyholder for non‑death; beneficiary split by allocation for death) with full override to ensure compliant disbursement party selection.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_161",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Case Basic Information",
        "desc": "Provide a consolidated case worksheet of intake/acceptance data to set context for assessment and decisioning.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_162",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Life Assured Information",
        "desc": "Present the life‑assured profile including medical conditions, underwriting history and prior claims to support liability/causation analysis.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_163",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Poicy/Product Level",
        "desc": "Summarize policy/product information—status, inception, servicing agent, debts, exclusions and risk‑relevant endorsements—with ability to reload latest policy data for current‑state adjudication.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_164",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Assessment Information & Disbursement Plan",
        "desc": "Provide a manager‑ready summary of amounts, product‑level decisions, disbursement plan and the status of key actions (requirements, investigations) to streamline approval.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_165",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Diagnosis Information",
        "desc": "Display clinical coding and diagnosis details captured during intake/acceptance for continuous clinical context and traceability.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_166",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Comment History",
        "desc": "Show a chronological audit of comments (user, timestamp, content) across the case lifecycle for transparent collaboration.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_167",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Review Schedule",
        "desc": "View and maintain LTC follow‑up schedules (periodic, survivorship, ad‑hoc) that govern ongoing entitlement and payment continuity.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_168",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - ADL Information",
        "desc": "View, edit and track the history of ADL assessments for LTC eligibility and continued payment qualification.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_169",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - ELS Register Query",
        "desc": "Integrate with SG Medinet to present ELS basic and supplement plan details for LTC coverage verification.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_170",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Worksheet - Free Text for Letter",
        "desc": "Capture free‑text narrative for inclusion in outcome/settlement letters to ensure clear customer communication.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_171",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Issues",
        "desc": "Execute assessment‑stage validations and present Claim Issues for resolution; route to requirements, investigation/escalation, underwriting referral or proceed to decision.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_172",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Liability Level",
        "desc": "Perform liability‑level assessment: import factors (incl. medical bills), compute base entitlement and final payable via configured formulas and historical balances, with review/override controls.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_173",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Adjustment",
        "desc": "Apply product‑level adjustments (medical fees, deductions, RB/CB/SB, terminal bonus). Support auto‑calculation, overrides and manual entries to finalize net entitlement.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_174",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision Making",
        "desc": "Manually/Auto make product‑level decisions (Admit/Reject/Cancel/Withdrawn/Ex‑gratia) with configuration‑driven defaults (e.g., post‑settlement product termination) and user overrides.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_175",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision - Admit",
        "desc": "On Admit, capture product disposition: status, termination (defaulted by configuration with editable termination date) and waiver parameters (enable premium waiver with editable start/end).\nAuto decision making if it does not hit rejection rules.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_176",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision - Reject",
        "desc": "On Reject, capture standardized reason, keep product in‑force by default (overrideable) and set product payment to 0.\nAuto decision making if it hits rejection rules.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_177",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision - Cancel",
        "desc": "On Cancel, record reason, default to keep product in‑force (overrideable) and set product payment to 0.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_178",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision - Ex-gratia-Full",
        "desc": "Grant ex‑gratia (full) payment at product level with auditability and downstream disbursement handling.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_179",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision - Ex-gratia-Partial",
        "desc": "Grant ex‑gratia (partial) payment at product level, including proportional allocation in the disbursement plan.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_180",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision - Withdrawn",
        "desc": "On Withdrawn, capture standardized reason, default to keep product in‑force (overrideable) and set product payment to 0.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_181",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Product Level - Decision - Denied&Rescind with refund",
        "desc": "Handle Denied & Rescind with refund: capture reason, default product termination and process refunds by product type (traditional: total premiums paid; ILP: account value at system date plus charges).",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_182",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Assessment - Policy Level - Adjustment",
        "desc": "Manage policy‑level adjustments for claw‑backs (outstanding premium, APL/loan balances, charges, debts) and refunds (suspense, APA, premiums, charges); auto‑calculate with overrides.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_183",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Disbursement Plan Summary",
        "desc": "Summarize policy‑level disbursement and adjustments with drill‑down to product/liability breakdown to validate allocation integrity.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_184",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Disbursement Plan Input - Lump Sum",
        "desc": "Build lump‑sum disbursement plans: default payees, capture payment method and allocate amounts per payee.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_185",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Disbursement Plan Input - Installment",
        "desc": "Configure instalment‑based disbursement plans: default payees and capture payment method, schedule parameters and instalment breakdown.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_186",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Approval",
        "l4": "",
        "desc": "Supports approving and sending tasks (evaluation, ongoing claim, change disbursement plan, or abandon claim recovery) back to rework, either manually or automatically.",
        "comments": "Enhanced in Income CRP LTC R4 phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_187",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Issues - Underwriting",
        "desc": "Refer accepted policies to underwriting for re‑underwriting comments; resume assessment upon reply with a complete audit trail.",
        "comments": "New Function in v2023",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_188",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Evaluation",
        "l4": "Claim Issues - Escalation/Investigation Request Raising",
        "desc": "Raise escalation/investigation requests at Acceptance/Evaluation with full history tracking for governance and SLA control.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_189",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Escalation Reply",
        "l4": "Escalation/Investigation Request Reply",
        "desc": "Process escalation/investigation replies: reviewers document findings and return the case to the originating stage for continued processing.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_190",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Ongoing Claim",
        "l4": "",
        "desc": "Manage periodic reviews, survivorship checks, and disbursement plan changes for long-term care (LTC) ongoing claims.",
        "comments": "Enhanced in Income CRP LTC R4 phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_191",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Disbursing/Withholding Claim",
        "l4": "",
        "desc": "Administer pending/unpaid disbursements: update payee/payment details, adjust instalment plans and validate before final settlement.",
        "comments": "Enhanced in Income CRP LTC R4 phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_192",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Recovery",
        "l4": "",
        "desc": "Track recoveries triggered by ongoing‑claim events (e.g., get well or death) with controls to abandon or write‑off where justified.",
        "comments": "Enhanced in Income CRP LTC R4 phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_193",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "Accept Policy",
        "desc": "Control policy acceptance within Evaluation, including reserve updates and acceptance/reversal with full financial impact traceability.",
        "comments": "Enhanced in claim UI upgrade",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_194",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "Document Checklist",
        "desc": "Maintain document checklists (required, additional, provider) with status tracking and edit access across Registration, Acceptance, Evaluation and ongoing claim;\nAbility to auto add document into checklist upon case update.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_195",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "Image",
        "desc": "Manage claim documents and images across all stages with DMS integration for storage, retrieval and preview;\nAuto process (update submission date and pending reason) triggered upon document submssion.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_196",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Claim Issues",
        "l4": "Requirement Letter",
        "desc": "Generate and manage requirement letters to customers or medical institutions; track status and responses within the case.\nAutomatically generate a reminder schedule based on configuration, and send reminders accordingly.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_197",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "Medical Bill",
        "desc": "Capture inpatient/outpatient medical bills linked to liabilities via product configuration; auto‑compute totals and claimable amounts. Editable in Acceptance/Evaluation, read‑only at Approval.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_198",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "Edit Case Info",
        "desc": "Edit case details post‑intake (excluding claim type) using the Acceptance UI to preserve consistency.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_199",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "Outcome letter",
        "desc": "Preview outcome/settlement letters, add customer comments or suppress generation based on business rules.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_200",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "History",
        "desc": "Provide a transaction history dashboard including workflow steps, policy reloads, letters, changes on payment details and other milestones for audit clarity.\nProvide visibility of approval rejections (who/when/why) to inform rework;",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_201",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Actions & Supporting",
        "l4": "Claim Customers",
        "desc": "Automatically screen customer grade, occupation, and high-risk status for claim party roles (e.g., informant, policyholder, life assured, caregiver, beneficiary, payee) based on configuration.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_202",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Work List",
        "l3": "Other Supporting Functions",
        "l4": "",
        "desc": "Enable collaboration and automation: full comment history, e‑claims API intake, and straight‑through processing via auto‑acceptance/evaluation/approval where rules are met.",
        "comments": "Upgrade function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_203",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Watch List",
        "l3": "Task pool",
        "l4": "",
        "desc": "Operations watch list for global monitoring of outstanding claim tasks with fuzzy/advanced search and real‑time status visibility.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_204",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Watch List",
        "l3": "Task Reassign",
        "l4": "",
        "desc": "Manually reassign tasks or update priority assignees within authority and organizational boundaries; integrates with auto round‑robin logic.",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_205",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "CDD Query",
        "l3": "",
        "l4": "",
        "desc": "Query ADL records via SG CDD by NRIC/Policy No. to support disability severity determination for LTC adjudication.",
        "comments": "Enhanced in Income CRP LTC R2 phase",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_206",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Change Disbursement Plan",
        "l3": "",
        "l4": "",
        "desc": "Amend disbursement plans for unpaid amounts post‑approval—release pending payments, update payee/payment details—and retain a complete audit trail.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_207",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Cancel Case",
        "l3": "",
        "l4": "",
        "desc": "Cancel cases prior to settlement with workflow rollback and financial impact checks per configuration.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_208",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Reverse Case",
        "l3": "",
        "l4": "",
        "desc": "Reverse settled cases subject to eligibility (e.g., unpaid payments, no terminated products), consistently reversing fees, payments and accumulated claim amounts.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_209",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Query",
        "l3": "",
        "l4": "",
        "desc": "Comprehensive claim case query (manual and e‑submission) with fuzzy/advanced filters and point‑in‑time snapshots for auditability.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_210",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Copy Case",
        "l3": "",
        "l4": "",
        "desc": "Clone existing cases into Acceptance or Evaluation, with options to copy documents and medical bills to accelerate processing.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_211",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Add Insured for Claim",
        "l3": "",
        "l4": "",
        "desc": "Add or edit additional insureds (e.g., free child cover/newborn) and attach them to existing benefits for eligibility and processing.",
        "comments": "New function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_212",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Medical Billing",
        "l3": "Create Medical Billing",
        "l4": "",
        "desc": "Allow users to search for claim information and submit medical billing details, which the system validates and processes to create payable and payment records.",
        "comments": "New function in v2024",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_213",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Medical Billing",
        "l3": "Medical Billing Records",
        "l4": "",
        "desc": "Enable users to search, view, and cancel existing medical billing records for claims, with cancellation reversing the related payable and payment records",
        "comments": "Enhanced in Income CRP LTC phase",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_214",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Configuration",
        "l3": "Authority",
        "l4": "",
        "desc": "Maintain claims authority and controls—workflow permissions, case classifications and approval limits—to enforce delegated authority.",
        "comments": "New function in v2025",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_215",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Configuration",
        "l3": "Workflow",
        "l4": "",
        "desc": "Administer claims workflow and task assignment rules (queues, stages, assignment strategies) to optimize throughput and governance.",
        "comments": "New function in v2025",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_216",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Configuration",
        "l3": "Rule Validations",
        "l4": "",
        "desc": "Configure validation rules executed at intake, acceptance, evaluation and approval to ensure quality and compliance.",
        "comments": "New function in v2025",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_217",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Configuration",
        "l3": "General Configurations",
        "l4": "",
        "desc": "Maintain claims reference data and parameters (dropdown lists, options and screen behaviors) that drive calculation logic and UI rendering.",
        "comments": "New function in v2025",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_218",
        "app": "CLM APP",
        "l1": "Claims",
        "l2": "Download CPF Submission File",
        "l3": "",
        "l4": "",
        "desc": "The function generates a CPF‑Board‑compliant file containing claim payment records made via the CPFB method, enabling insurers in Singapore to submit these payments directly to the Central Provident Fund Board for processing.",
        "comments": "New function in v2024",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": true,
          "ltc": false
        }
      }
    ],
    "function_count": 73,
    "sops": [
      {
        "code": "SOP-CLM-01",
        "title": "Claim Registration & First Notice of Loss (FNOL) Intake",
        "ui_path": "Main Menu > Claims > Registration > First Notice of Loss",
        "prerequisites": [
          "Insured event notice received from beneficiary, agent, hospital, or customer portal",
          "Target policy existed on date of event"
        ],
        "steps": [
          "1. Navigate to Main Menu > Claims > Registration > FNOL.",
          "2. In the Search Policy area, enter Policy Number (e.g. 'POL-2026-0081723') or Life Assured ID and click Search.",
          "3. System checks Policy Status on Event Date: Verifies policy was 'INFORCE' on the date loss occurred.",
          "4. In Incident Information:\n   - Event Date: Date death, accident, or diagnosis occurred.\n   - Cause of Claim: Sickness, Accident, Natural Death, Suicide, Critical Illness.\n   - Primary Diagnosis: Search ICD-10 Code (e.g. 'I21.9' - Acute Myocardial Infarction).\n   - Place of Event / Hospital: Select hospital from master hospital list.",
          "5. In Reporter Information: Record Reporter Full Name, Relationship to Insured, Phone, and Email.",
          "6. Click 'Register Claim'. Step Result: Gemini creates unique Claim Case Number (e.g. 'CLM-2026-00412'), reserves Initial Case Reserve liability, and generates dynamic Document Requirement Checklist."
        ],
        "fields_table": [
          {
            "name": "Event Date",
            "type": "Date",
            "required": "Yes",
            "desc": "Date on which loss incident occurred"
          },
          {
            "name": "Claim Cause",
            "type": "Select",
            "required": "Yes",
            "desc": "Illness, Accidental, Natural, Self-inflicted"
          },
          {
            "name": "ICD-10 Diagnosis",
            "type": "Search Code",
            "required": "Yes",
            "desc": "International medical diagnostic code"
          },
          {
            "name": "Reporter Name",
            "type": "Text",
            "required": "Yes",
            "desc": "Person notifying the insurer of the loss"
          }
        ],
        "actuary_notes": "Registration instantly books an Initial Case Reserve in Actuarial Claims Ledger: Case Reserve = Main Sum Assured + Rider Limits.",
        "op_notes": "If Event Date is prior to Policy Commencement Date, system issues instant hard block: 'Loss predates policy inception'.",
        "pdf_page": 308
      },
      {
        "code": "SOP-CLM-02",
        "title": "Claim Investigation & 2-Year Statutory Contestability Verification",
        "ui_path": "Claims > Claim Evaluation > Investigation & Verification Tab",
        "prerequisites": [
          "Claim case registered with verified document checklist"
        ],
        "steps": [
          "1. From Claims Work List, open target Claim Case.",
          "2. Click 'Evaluation & Investigation' tab.",
          "3. System displays Contestability Analysis:\n   - Duration since Policy Inception: Displays exact elapsed months (e.g. '14 Months').\n   - If Duration < 24 Months: Red Flag 'CONTESTABLE CLAIM - INITIATE MEDICAL VERIFICATION'.",
          "4. If contestable: Assign Claim Investigator to verify prior medical history at national health databases and primary care clinics.",
          "5. Compare historical hospital admission records against original proposal Declaration Questionnaire (Module 02).",
          "6. If material non-disclosure detected (e.g. undisclosed pre-existing cancer treatment prior to application signing):",
          "   - Record evidence in Non-Disclosure Findings panel.",
          "   - System prepares Claim Repudiation & Policy Rescission recommendation for Legal/Claims Committee review.",
          "7. If no non-disclosure or claim is incontestable (>24 months): Check 'Claim Valid & Incontestable' to proceed to Benefit Calculation."
        ],
        "fields_table": [
          {
            "name": "Elapsed Inforce Months",
            "type": "Integer",
            "required": "Read-only",
            "desc": "Months from inception/reinstatement to event date"
          },
          {
            "name": "Contestability Flag",
            "type": "Status (Contestable / Incontestable)",
            "required": "Read-only",
            "desc": "Under 24 months requires investigation"
          },
          {
            "name": "Investigation Summary",
            "type": "Rich Text",
            "required": "Yes",
            "desc": "Investigator's factual report"
          }
        ],
        "actuary_notes": "2-year incontestability clause protects insurer from pre-existing anti-selection while providing legal certainty to bona fide policyholders.",
        "op_notes": "Early claims (within first 90-180 days) automatically route to Senior Claims Manager queue.",
        "pdf_page": 316
      },
      {
        "code": "SOP-CLM-03",
        "title": "Benefit Calculation Engine: Adjudicating Death Claims & Offsetting Outstanding Loans",
        "ui_path": "Claims > Claim Evaluation > Benefit Calculation Tab",
        "prerequisites": [
          "Claim validated as compensable by claims assessor"
        ],
        "steps": [
          "1. Click 'Benefit Calculation' tab in Claims Worksheet.",
          "2. System automatically loads active policy coverage schedule and calculates Gross Benefit:\n   - Main Plan Sum Assured: $100,000 USD\n   - Accumulated Reversionary Bonus: $7,200 USD\n   - Terminal Bonus: $2,500 USD\n   - AD&D Benefit (if accident verified): $50,000 USD\n   - Total Gross Claim Benefit: $159,700 USD.",
          "3. In Debt Offsetting Grid, system automatically retrieves and nets out liabilities:\n   - Outstanding Policy Loan Principal: -$5,000 USD\n   - Accrued Loan Interest: -$215 USD\n   - Unpaid Grace Period Premiums (if event occurred in grace): -$0.00\n   - Plus Unearned Premium Refund: +$140 USD.",
          "4. Net Settlement Amount = $154,625 USD.",
          "5. In Nominee Allocation panel, system divides net settlement according to registered beneficiary percentages (e.g. Nominee 1 50% = $77,312.50, Nominee 2 50% = $77,312.50).",
          "6. Click 'Approve Benefit Calculation'. Step Result: Case advances to Multi-Tier Authorization queue."
        ],
        "fields_table": [
          {
            "name": "Gross Death Benefit",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Sum Assured + Vested Bonuses + Accidental benefit"
          },
          {
            "name": "Outstanding Policy Debt",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Principal plus interest deducted at source"
          },
          {
            "name": "Net Benefit Payout",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Final funds released to registered nominees"
          }
        ],
        "actuary_notes": "Actuarial formula: Net Death Payout = Max(SA, Total Premiums) + Vested Bonuses - Policy Loan - Loan Interest + Unearned Premium.",
        "op_notes": "Death claim settlement automatically updates Life Assured status to 'DECEASED' across all system modules.",
        "pdf_page": 324
      },
      {
        "code": "SOP-CLM-04",
        "title": "Executing Claim Settlement & Policy Lifecycle Termination Disposal",
        "ui_path": "Claims > Claim Approval > Settlement Execution",
        "prerequisites": [
          "Benefit calculation approved by authorized Claims Manager / Committee"
        ],
        "steps": [
          "1. Log in with Claims Approval authority level.",
          "2. In Claims Approval Worklist, select target case and click 'Approve Settlement'.",
          "3. System prompts for Final Disposal Action confirmation:\n   - For Total Death Claim: System initiates 'Contract Termination by Death'.\n   - For Accelerated Critical Illness Claim: Base Sum Assured is reduced by CI payout; remaining death benefit continues.\n   - For Hospital Cash Reimbursement: Policy remains fully inforce.",
          "4. Click 'Confirm & Execute Settlement'. Step Result:\n   - System creates Disbursement Vouchers in Payment Module 07 for each beneficiary.\n   - Transitions Policy Status in SOR from 'INFORCE' to 'TERMINATED_CLAIM'.\n   - Reverses remaining case reserves and posts settled claim expense to financial ledger.\n   - Generates official Claim Settlement Voucher PDF."
        ],
        "fields_table": [
          {
            "name": "Approval Sign-Off",
            "type": "Action",
            "required": "Yes",
            "desc": "Claims Manager electronic signature"
          },
          {
            "name": "Policy Disposal State",
            "type": "System Status",
            "required": "Read-only",
            "desc": "TERMINATED_CLAIM, INFORCE_REDUCED, INFORCE_ACTIVE"
          }
        ],
        "actuary_notes": "Claim payment finalizes actual-to-expected mortality experience records for annual actuarial valuation studies.",
        "op_notes": "Settlement notification is automatically transmitted to servicing agent to facilitate death certificate hand-over.",
        "pdf_page": 336
      },
      {
        "code": "SOP-CLM-05",
        "title": "Adjudicating Living Benefit Claims: Critical Illness (CI) & Cashless Hospital Income Settlement",
        "ui_path": "Main Menu > Claims Management > Living Benefits Workbench > Adjudicate Claim",
        "prerequisites": [
          "Supplementary Rider is in 'INFORCE_RIDER' status at time of event occurrence",
          "Medical records, pathology reports, hospital discharge summary, and attending physician statement submitted"
        ],
        "steps": [
          "1. Open Claims Management > Living Benefits Workbench > Search Policy Number.",
          "2. Select Claim Benefit Type: 'Critical Illness (Major/Minor)' or 'Hospital Income Daily Cash Benefit'.",
          "3. Verify Contractual Waiting Period & Survival Period:\n   - Critical Illness: System validates that Date of Diagnosis >= Policy Commence Date + 90 Days Waiting Period.\n   - Check Survival Period condition: Insured must survive at least 14 days post-diagnosis for specific CI definitions.",
          "4. In the Diagnosis & Medical Adjudication Panel:\n   - Select ICD-10 Diagnosis Code (e.g. 'C34 Malignant neoplasm of bronchus and lung' or 'I21 Acute myocardial infarction').\n   - Cross-reference with standard 50 CI contractual definitions in eBao Medical Ontology.",
          "5. Benefit Calculation Engine:\n   - For Critical Illness: Benefit Amount = 100% of Rider Sum Assured (Accelerated reduces Base Plan SA; Additional pays on top without reducing Base SA).\n   - For Hospital Income: Days of Confinement (Deductible 0-1 day) * Daily Benefit Limit + ICU Intensive Care 200% Loading.",
          "6. Offset Outstanding Debt:\n   - System checks open policy loans or unpaid premiums during grace period, auto-netting debt from gross benefit payout.",
          "7. Approve Settlement Voucher:\n   - Click 'Authorize Payout'. System generates T_CLAIM_DISBURSEMENT, triggers bank EFT transfer, and updates rider status to 'TERMINATED_CLAIMED'."
        ],
        "fields_table": [
          {
            "name": "Claim Benefit Type",
            "type": "Select",
            "required": "Yes",
            "desc": "CI Major, CI Minor, Hospital Cash, TPD"
          },
          {
            "name": "ICD-10 Code",
            "type": "Search / Select",
            "required": "Yes",
            "desc": "Standard medical diagnosis code"
          },
          {
            "name": "Date of Diagnosis",
            "type": "Date",
            "required": "Yes",
            "desc": "Must satisfy 90-day waiting period"
          },
          {
            "name": "Net Benefit Payable",
            "type": "Currency (Auto)",
            "required": "Auto",
            "desc": "Gross claim minus unpaid premiums and debt"
          }
        ],
        "actuary_notes": "Accelerated CI claims immediately reduce base sum assured and future gross premium reserve liabilities. Additional CI leaves base policy intact.",
        "op_notes": "Electronic integration with hospital billing systems allows direct cashless guarantee of payment (GOP) issuance.",
        "pdf_page": 260
      }
    ],
    "sop_count": 5,
    "interconnections": {
      "module_code": "CLM_APP",
      "upstream_sources": [
        {
          "module": "MOD_02 / SOR",
          "data": "Inforce policy coverage schedule, life assured demographics, and issue date"
        },
        {
          "module": "MOD_04 Customer Service",
          "data": "Outstanding policy loans and accrued interest balances to be deducted"
        },
        {
          "module": "MOD_05 Billing",
          "data": "Paid-to-Date to verify whether incident occurred within statutory Grace Period"
        }
      ],
      "downstream_destinations": [
        {
          "module": "MOD_07 Payment & Finance",
          "impact": "Issues approved claim settlement disbursement vouchers to beneficiaries"
        },
        {
          "module": "SOR Policy Core",
          "impact": "Terminates policy (Death) or reduces base Sum Assured / terminates riders (CI)"
        },
        {
          "module": "MOD_08 Batch Console",
          "impact": "Removes terminated policy from active billing and actuarial valuation runs"
        }
      ],
      "shared_data_entities": [
        "T_CLAIM_CASE (FNOL & Claim Header)",
        "T_CLAIM_BENEFIT_CALC (Adjudication Matrix)",
        "T_CLAIM_RESERVE (Case Reserves)"
      ],
      "lifecycle_events": [
        "FNOL_REGISTERED",
        "CONTESTABILITY_VERIFIED",
        "CLAIM_ADJUDICATED",
        "SETTLEMENT_DISBURSED_POLICY_TERMINATED"
      ]
    },
    "pdf_start_page": 304,
    "pdf_end_page": 341,
    "pdf_chapter": "Chapter 5: Claims Management (CLM APP)"
  },
  {
    "id": "MOD_07",
    "num": "07",
    "title": "Mod 07: Payment & Finance",
    "subtitle": "Disbursement Workflows, Payee Validation, Settlement Rails & Sub-ledger AP/AR",
    "icon": "💰",
    "badge": "Financial Settlement",
    "page_range": "Pages 376 - 425",
    "summary": "The Payment & Finance application governs outgoing disbursements generated by Claims, Policy Surrenders, Policy Loans, Annuity/Survival Benefit payouts, and Premium Refunds. It enforces strict payee validation, anti-fraud checks, multi-tiered authorization, electronic banking file generation, and sub-ledger accounting integration with ERP/General Ledger systems.",
    "mermaid_workflow": "graph LR\n    Origin[\"Payout Origin (Claim / Surrender / Loan / Refund)\"] --> Payee[\"Verify Payee & Bank Account\"]\n    Payee --> TaxAML[\"Tax Withholding & AML Validation\"]\n    TaxAML --> Auth{\"Approval Threshold\"}\n    Auth -- Within Limit --> BatchPay[\"Generate Payment Batch\"]\n    Auth -- Exceeds Limit --> ExecSignOff[\"Financial Controller Sign-off\"]\n    ExecSignOff --> BatchPay\n    BatchPay --> EFT[\"Direct Bank Transfer / Wire Rails\"]\n    EFT --> Reconcile[\"Bank Settlement Reconciliation\"]\n    Reconcile --> Ledger[\"Post General Ledger (AP/AR Journal Entries)\"]",
    "core_concepts": [
      {
        "term": "Disbursement Payee Hierarchy",
        "definition": "Strict hierarchy ensuring payouts are routed only to legally validated payees: Policyholder (for loans/surrenders/survival benefits), Designated Beneficiaries (for death claims), or Court-Appointed Administrators."
      },
      {
        "term": "Payment Voucher & Batch",
        "definition": "Grouping approved disbursements into consolidated payment vouchers and ISO 20022 / pain.001 clearing files for bank transmission."
      },
      {
        "term": "Sub-ledger Accounting (AP/AR)",
        "definition": "Automated generation of balanced debit/credit journal entries mapped to insurance chart of accounts for every financial movement in Gemini."
      },
      {
        "term": "Tax Withholding & Deduction",
        "definition": "Automated withholding of statutory tax on investment returns, surrender gains, or non-resident disbursements before net payout."
      }
    ],
    "actuary_notes": [
      "Survival Benefit & Guaranteed Cash Back: Endowment products with scheduled cash back (e.g. 5% SA payable every 3 years) automatically generate scheduled payment vouchers without manual policyholder application.",
      "Sub-ledger Accounting Rules:\n  - Surrender Payout: Dr. Policyholder Surrender Expense / Cr. Cash at Bank.\n  - Policy Loan Disbursement: Dr. Policy Loans Receivable / Cr. Cash at Bank.\n  - Death Claim Payout: Dr. Death Claims Incurred / Cr. Cash at Bank.",
      "Net Present Value of Disbursements: Ensures accurate timing of cash flow forecasting for Actuarial Asset-Liability Matching (ALM)."
    ],
    "op_notes": [
      "Third-Party Payee Prohibition: Gemini enforces strict anti-money laundering controls prohibiting disbursements to bank accounts not matching the verified name of the policyholder or beneficiary.",
      "Payment Return Handling: If an electronic bank transfer fails due to invalid account details, Gemini reverses the payment voucher to 'Payment Pending Correction' and notifies customer service.",
      "Dual-Control Authorization: Segregation of duties mandates that the operator creating a payment cannot be the user who authorizes release to the clearing bank."
    ],
    "sections": [
      {
        "heading": "1. Disbursement Origin & Payee Validation",
        "content": "Disbursement orders flow automatically from upstream operational decisions (approved claims, surrender requests, loan agreements). The system verifies that payee identity documents, tax residency, and domestic bank clearing codes (BIC/SWIFT/IBAN) are verified."
      },
      {
        "heading": "2. Payment Authorization Hierarchy",
        "content": "Operations users review pending payments in the Payment Worklist. Multi-tier approval thresholds enforce segregation of duties based on disbursement amount (e.g., Level 1 up to $10,000, Level 2 up to $50,000, Financial Director above $50,000)."
      },
      {
        "heading": "3. Payment Batch Generation & Banking Rails",
        "content": "Approved payments are compiled into scheduled payment batches. Gemini supports automated interface protocols (SFTP/API) directly connecting to corporate clearing banks, transmitting payment instructions and ingesting return confirmation files."
      },
      {
        "heading": "4. Financial Sub-Ledger & General Ledger Posting",
        "content": "Every settlement event automatically generates detailed financial accounting entries in Gemini's sub-ledger, tagging business transaction code, cost center, line of business, and policy ID. Daily reconciliation files export balanced journals directly into SAP, Oracle Financials, or corporate ERPs."
      }
    ],
    "mapped_functions": [
      {
        "id": "F_283",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Payment Requisition",
        "l3": "",
        "l4": "",
        "desc": "User can query out all payable records, suspense balance to create payment accordingly. User can also repay loan by this function to offset payable/suspense balance with outstanding loan amount. User will input disbursement method, system will generate payment records, finance user will continue the payment process. In addition, user can transfer payable to current or other policy's suspense account by this function.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_284",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Payment Authorization",
        "l3": "",
        "l4": "",
        "desc": "If the payment amount exceed user's limit authority at payment requisition, then this payment need be approved by user with higher authority. This function is designed for the higher authority user to approve these payments.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_285",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Medical Payment",
        "l3": "",
        "l4": "",
        "desc": "User can perform payment requisition for medical billing.",
        "comments": "Removed as the medical payment will be generated once medical billing is submitted.",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_286",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Manual Payment",
        "l3": "",
        "l4": "",
        "desc": "Perform manual payment for all modes' payment request except cheque.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_287",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Cancel Payment",
        "l3": "",
        "l4": "",
        "desc": "User can reverse payment by this function.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_288",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Cancel Payment Approval",
        "l3": "",
        "l4": "",
        "desc": "Maker-checker process for cancel payment",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_289",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Change Payment Details",
        "l3": "",
        "l4": "",
        "desc": "1.Change the payment's disbursement method or Disbursement Payee.\n2.Release unclaimed money.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_290",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Change Disbursement Payee Approval Work List",
        "l3": "",
        "l4": "",
        "desc": "UI for user to approve the Change Disbursement Payee request.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_291",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Payment Account Approval Work List",
        "l3": "",
        "l4": "",
        "desc": "UI for user to approval new DC Account.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_292",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Payment Query",
        "l3": "",
        "l4": "",
        "desc": "Query payment record, with a link to query offset details page.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_293",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Configration",
        "l3": "Payment Method",
        "l4": "",
        "desc": "To configure the available Disbursement Method.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_294",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Configration",
        "l3": "General Configuration",
        "l4": "",
        "desc": "To configure the auto-refund suspense's threshold and cap, payment attempts,suspend period to 2nd try for failure payment and etc.",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_295",
        "app": "FIN APP",
        "l1": "Payment",
        "l2": "Handling of Cheque",
        "l3": "",
        "l4": "",
        "desc": "To clear/outdate/stop the migrated unpresented cheque.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_296",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Bank",
        "l3": "Maintain Bank",
        "l4": "",
        "desc": "Maintain the 3rd party Bank information.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_297",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Bank",
        "l3": "Maintain Bank Account",
        "l4": "",
        "desc": "Link insurer's bank account to pay modes for collection and payment. Then system will have the trace that which collection go into which bank account; which payment go out from which bank account.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_298",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Bank",
        "l3": "Set up Bank Account Master",
        "l4": "",
        "desc": "Set up a insurer's bank account for collection and payment (i.e. cash bank), including creating, modifying, and disabling a bank account.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_299",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "BSR",
        "l3": "BS Balance Query_Account Level",
        "l4": "",
        "desc": "To capture a monthly snapshot balance and calculate aging for BS GL Accounts including suspense balance, overdue premium, outstanding payables, etc.",
        "comments": "New function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_300",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Authority",
        "l3": "BS",
        "l4": "",
        "desc": "To Configure the Authority for:\n1.Premium Refund Limit\n2.Medical Payment Limit \n3.Premium Write Off",
        "comments": "Upgrade function in v2026",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_301",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Accounting",
        "l3": "GL Posting Query",
        "l4": "",
        "desc": "Function for user to query GL transaction details.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_302",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Accounting",
        "l3": "Filter Configuration",
        "l4": "",
        "desc": "Maintain Filters, including adding, deleting, or modifying filters.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_303",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Accounting",
        "l3": "Segment Configuration",
        "l4": "",
        "desc": "Maintain Segments, including adding, deleting, or modifying segments.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_304",
        "app": "FIN APP",
        "l1": "Finance",
        "l2": "Accounting",
        "l3": "Set Accounting Rule",
        "l4": "",
        "desc": "Set up an accounting rule for all fee types, including creating, modifying, disabling, and enabling the accounting rule for GL posting.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      }
    ],
    "function_count": 22,
    "sops": [
      {
        "code": "SOP-PAY-01",
        "title": "Disbursement Payee Verification & Anti-Money Laundering (AML) Checks",
        "ui_path": "Finance > Payment > Work List > Payee Verification",
        "prerequisites": [
          "Approved claim, surrender, policy loan, or refund voucher received from upstream modules"
        ],
        "steps": [
          "1. Navigate to Main Menu > Finance > Payment > Work List.",
          "2. Locate target pending disbursement voucher (e.g. 'VOUCH-2026-009182').",
          "3. Click 'Verify Payee & Account'.",
          "4. System cross-checks Payee Name against legal contract parties (Policyholder or Beneficiary).",
          "5. Verify Bank Account details: Domestic Bank Name, Branch Code, Account Number, SWIFT/BIC.",
          "6. System runs automated AML PEP & Sanctions screening on payee account details.",
          "7. If Payee name matches contract party exactly and AML clearance is clean: Check 'Payee Identity Verified'.",
          "8. If third-party account detected without legal court grant: System blocks payment with 'Third-Party Payee Prohibited under AML regulations'.",
          "9. Click Save Verification."
        ],
        "fields_table": [
          {
            "name": "Voucher Reference",
            "type": "String",
            "required": "Read-only",
            "desc": "Disbursement order identifier"
          },
          {
            "name": "Payee Legal Name",
            "type": "Text",
            "required": "Yes",
            "desc": "Must match verified identity document"
          },
          {
            "name": "Bank Account Number",
            "type": "Alphanumeric",
            "required": "Yes",
            "desc": "Recipient clearing bank account"
          },
          {
            "name": "AML Screening Status",
            "type": "Status",
            "required": "Read-only",
            "desc": "CLEARED, FLAGGED, PROHIBITED"
          }
        ],
        "actuary_notes": "Accurate payee verification ensures statutory compliance and avoids unauthorized diversion of policyholder funds.",
        "op_notes": "Third-party payments are permissible only with court-appointed probate letters or registered power of attorney.",
        "pdf_page": 382
      },
      {
        "code": "SOP-PAY-02",
        "title": "Compiling Payment Batches & Generating Electronic Bank Transfer (EFT) Rails",
        "ui_path": "Finance > Payment > Batch Payment > Generate Bank File",
        "prerequisites": [
          "Disbursement vouchers verified and approved by Financial Controller"
        ],
        "steps": [
          "1. Navigate to Finance > Payment > Batch Payment.",
          "2. Select Payout Category: 'Claim Payouts', 'Surrender Disbursements', 'Policy Loans', or 'Premium Refunds'.",
          "3. Select Disbursement Clearing Bank (e.g. Sacombank Corporate Banking).",
          "4. Check all verified vouchers to include in batch.",
          "5. System displays Batch Aggregation: Total Vouchers (e.g. 18), Total Amount (e.g. $214,500 USD).",
          "6. Click 'Compile Payment Batch'. Step Result: Unique Batch ID created (e.g. 'PAY-BATCH-20261020-01').",
          "7. Click 'Export Electronic Banking File' (ISO 20022 pain.001 credit transfer format).",
          "8. Dual-Control Officer reviews file hash and transmits to bank via host-to-host SFTP connection.",
          "9. Upon bank confirmation return: System advances voucher status to 'PAID' and posts sub-ledger accounting entries."
        ],
        "fields_table": [
          {
            "name": "Payment Batch ID",
            "type": "String",
            "required": "Read-only",
            "desc": "Consolidated clearing transaction number"
          },
          {
            "name": "Total Batch Payout",
            "type": "Currency",
            "required": "Read-only",
            "desc": "Total cash released from corporate bank account"
          },
          {
            "name": "Sub-Ledger Journal",
            "type": "Accounting Entry",
            "required": "Auto-posted",
            "desc": "Dr. Claim Expense / Cr. Bank Clearing Account"
          }
        ],
        "actuary_notes": "Disbursement timing is tracked by Actuarial Asset-Liability Matching (ALM) engines to optimize cash liquidity yields.",
        "op_notes": "If a bank transfer bounces due to invalid account number, system alerts operator and reverses voucher to 'Pending Account Correction'.",
        "pdf_page": 398
      },
      {
        "code": "SOP-PAY-03",
        "title": "Cashier Premium Collection, Suspense Ledger Matching & Electronic Receipting",
        "ui_path": "Main Menu > Payment & Finance > Cashier Management > Receipting & Suspense Console",
        "prerequisites": [
          "Bank credit clearing statement / direct cashier collection recorded",
          "Open billing receivable or unallocated payment voucher in system"
        ],
        "steps": [
          "1. Access Payment & Finance > Cashier Management > Unallocated Suspense Inflow.",
          "2. Query unallocated bank deposits in T_SUSPENSE_ACCT by Transaction Reference, Remitter Name, or Amount.",
          "3. Match Inflow with Open Policy Bill:\n   - Enter Policy Number or Proposal Number.\n   - System queries T_BILL_RECEIVABLE for matched outstanding amount.",
          "4. In the Payment Allocation Screen:\n   - Allocate amount: Base Premium, Supplementary Riders, Modal Loading, and Premium Suspense Balance (if overpaid).\n   - Select Collection Channel: Over-the-counter Cash, Credit Card POS, Bank Wire Transfer, QR Code Mobile Payment.",
          "5. Click 'Confirm Receipt & Allocate'. Step Result:\n   - System generates Electronic Tax Invoice / Premium Official Receipt (PDF with digital signature).\n   - System posts balanced sub-ledger journal: Dr. Bank Clearing Account / Cr. Premium Income Receivable (T_SUB_LEDGER).\n   - System immediately advances Policy Paid-To-Date (PTD) by 1 modal payment term."
        ],
        "fields_table": [
          {
            "name": "Suspense Inflow ID",
            "type": "String",
            "required": "Yes",
            "desc": "Unallocated bank transaction record"
          },
          {
            "name": "Policy / Proposal No",
            "type": "String",
            "required": "Yes",
            "desc": "Destination target contract in SOR"
          },
          {
            "name": "Collection Method",
            "type": "Select",
            "required": "Yes",
            "desc": "Bank Transfer, QR, Credit Card, Counter"
          },
          {
            "name": "Allocated Amount",
            "type": "Currency",
            "required": "Yes",
            "desc": "Must equal or exceed open bill due amount"
          }
        ],
        "actuary_notes": "Receipting automatically clears premium receivables and triggers daily unearned premium reserve (UPR) recalculation.",
        "op_notes": "Any overpayment is held in customer suspense balance (T_SUSPENSE_ACCT) to be credited against future billing or refunded upon request.",
        "pdf_page": 388
      },
      {
        "code": "SOP-PAY-04",
        "title": "Agent Commission Settlement, Statutory Clawback Debiting & Sub-Ledger ERP Posting",
        "ui_path": "Main Menu > Payment & Finance > Agency Compensation > Commission Ledger & Clawback Console",
        "prerequisites": [
          "Agent licensing and contract agreement active in Agency Module",
          "Trigger event occurred: Initial policy enforcement (Credit) OR 21-Day Free-Look / Lapse (Clawback Debit)"
        ],
        "steps": [
          "1. Open Payment & Finance > Agency Compensation > Commission Ledger.",
          "2. Review Daily Trigger Events:\n   - Scenario A: New Inforce Policies -> System calculates First Year Commission (FYC = Annual Premium * Commission Rate % based on plan code and pay term).\n   - Scenario B: 21-Day Free-Look Cancellations (TERMINATED_FREE_LOOK) -> System flags mandatory 100% FYC Clawback.\n   - Scenario C: First Year Policy Lapses (LAPSED) -> System calculates pro-rata commission clawback.",
          "3. Execute Clawback Batch Run:\n   - Select target servicing agent accounts.\n   - System generates negative commission transaction (Dr. Agent Commission Ledger T_AGENT_COMM_TRX).\n   - Clawback debit is automatically offset against upcoming weekly or monthly commission earnings.",
          "4. Balance Sub-Ledger Journals:\n   - Posts balanced entry: Dr. Commission Expense Refund / Cr. Agent Commission Payable.\n   - Validates total debit equals total credit (0.00 discrepancy).",
          "5. Generate Agency Settlement Statements:\n   - Export consolidated statement showing Gross FYC, Renewal Commission (RYC), Clawback deductions, Withholding Tax (PIT 5%), and Net Remittance."
        ],
        "fields_table": [
          {
            "name": "Agent License Code",
            "type": "String",
            "required": "Yes",
            "desc": "Servicing agent identifier"
          },
          {
            "name": "Commission Transaction Type",
            "type": "Select",
            "required": "Yes",
            "desc": "FYC Credit, RYC Credit, Free-Look Clawback, Lapse Clawback"
          },
          {
            "name": "Policy Number",
            "type": "String",
            "required": "Yes",
            "desc": "Associated contract generating commission"
          },
          {
            "name": "Net Remittance",
            "type": "Currency (Auto)",
            "required": "Auto",
            "desc": "Gross earnings minus clawbacks and taxes"
          }
        ],
        "actuary_notes": "Commission clawback protects acquisition expense recovery assumptions built into actuarial pricing models.",
        "op_notes": "If an agent terminates with negative commission balance, system flags debt recovery flag and transfers to agency legal collections.",
        "pdf_page": 412
      }
    ],
    "sop_count": 4,
    "interconnections": {
      "module_code": "FIN_PAYMENT",
      "upstream_sources": [
        {
          "module": "MOD_06 Claims",
          "data": "Approved claim settlement payouts"
        },
        {
          "module": "MOD_04 Customer Service",
          "data": "Surrender payouts, policy loan disbursements, and reversionary bonus surrenders"
        },
        {
          "module": "MOD_02 / MOD_05",
          "data": "Premium refund vouchers and cooling-off cancellation payouts"
        }
      ],
      "downstream_destinations": [
        {
          "module": "Clearing Banks",
          "impact": "Transmits ISO 20022 pain.001 EFT credit transfer payment batches"
        },
        {
          "module": "General Ledger (ERP)",
          "impact": "Posts balanced sub-ledger journal entries (Debits & Credits) to corporate ERP (SAP/Oracle)"
        }
      ],
      "shared_data_entities": [
        "T_PAYMENT_VOUCHER (Disbursement Order)",
        "T_PAYMENT_BATCH (EFT Bank Batch)",
        "T_SUB_LEDGER_ENTRY (AP/AR Journals)"
      ],
      "lifecycle_events": [
        "PAYEE_AML_VERIFIED",
        "PAYMENT_BATCH_COMPILED",
        "EFT_TRANSMITTED",
        "GENERAL_LEDGER_POSTED"
      ]
    },
    "pdf_start_page": 376,
    "pdf_end_page": 425,
    "pdf_chapter": "Chapter 7: Payment & Accounting (FIN APP)"
  },
  {
    "id": "MOD_08",
    "num": "08",
    "title": "Mod 08: Batch Console (EOD/EOM)",
    "subtitle": "EOD/EOM Orchestration, Auto-Lapse, APL Execution, Interest Accrual & Valuation",
    "icon": "⏱️",
    "badge": "Batch & System Engine",
    "page_range": "Pages 426 - 444 & Functions",
    "summary": "The Batch Console coordinates all automated time-triggered system activities. It executes nightly End-of-Day (EOD), Month-End (EOM), and Year-End (EOY) batch sequences. Critical life PAS automated processes include billing file generation, grace period expiry handling, Automatic Premium Loan (APL) execution, policy lapse enforcement, daily loan interest accrual, and actuarial reserve valuation extracts.",
    "mermaid_workflow": "graph TD\n    Trigger[\"Nightly Batch Scheduler (00:00 AM)\"] --> PreCheck[\"Batch System Pre-Check & Lock\"]\n    PreCheck --> Job1[\"Job 01: Direct Debit Billing Run\"]\n    Job1 --> Job2[\"Job 02: Bank Collection Return Import\"]\n    Job2 --> Job3[\"Job 03: Grace Period Aging (Day 1..60)\"]\n    Job3 --> Job4{\"Grace Expired (>60 Days)?\"}\n    Job4 -- Cash Value > Overdue Premium --> APL[\"Job 04: Execute APL (Auto Premium Loan)\"]\n    Job4 -- Cash Value <= 0 --> Lapse[\"Job 05: Execute Auto-Lapse (Policy Terminated)\"]\n    APL --> Job6[\"Job 06: Daily Policy Loan & APL Interest Accrual\"]\n    Lapse --> Job6\n    Job6 --> Job7[\"Job 07: Actuarial Reserve Valuation Extract\"]\n    Job7 --> Job8[\"Job 08: GL Accounting Ledger Roll\"]\n    Job8 --> Unlock[\"Unlock System & Send Batch Status Report\"]",
    "core_concepts": [
      {
        "term": "EOD (End of Day) Batch",
        "definition": "Automated nightly batch sequence advancing system business date, updating policy aging counters, accruing loan interest, and processing scheduled state transitions."
      },
      {
        "term": "APL Batch Job",
        "definition": "Batch script identifying policies exceeding grace period with sufficient cash value, auto-generating a premium loan transaction, advancing Paid-to-Date, and notifying the policyholder."
      },
      {
        "term": "Auto-Lapse Batch Job",
        "definition": "Batch script identifying unpaid policies where cash value is zero or insufficient for APL, transitioning policy status from Inforce to Lapsed and extinguishing coverage."
      },
      {
        "term": "Actuarial Valuation Extract",
        "definition": "Extracts policy-level inforce portfolios (sum assured, attained age, policy duration, reserve factors) into flat files/databases for valuation software (Prophet, Mo.net, InsureForge)."
      }
    ],
    "actuary_notes": [
      "Interest Accrual Formula: Daily Loan Interest = Outstanding Principal * (Annual Loan Interest Rate / 365). Compounded or capitalized at policy anniversary.",
      "Valuation Data Feed Integrity: EOM batch verifies that policy status in SOR matches actuarial reserve inventory, reconciling inforce policy counts, total sum at risk, and premium run-rates.",
      "Reversionary Bonus Declaration Batch: Year-end batch applying Board-approved reversionary bonus rates (e.g. 1.5% of Sum Assured + 2.0% of existing bonuses) to eligible participating policies."
    ],
    "op_notes": [
      "Batch Monitoring Dashboard: Real-time graphical console displaying job status (Waiting, Running, Completed, Failed), execution duration, record processing counts, and error logs.",
      "Fail-Safe Restartability: All batch jobs are designed with idempotent checkpoints; if a job aborts midway due to network or database timeouts, operators can resume from the exact point of interruption without data duplication.",
      "System Lock & Maintenance Window: During critical accounting cutoff batches, interactive UI write operations are paused while read-only queries remain available."
    ],
    "sections": [
      {
        "heading": "1. Batch Console Architecture & Job Dependencies",
        "content": "The Gemini Batch Console organizes jobs into directed dependency graphs. Downstream jobs (such as Auto-Lapse) cannot execute until upstream dependencies (Bank Collection Import and Grace Aging) complete with exit code 0."
      },
      {
        "heading": "2. Automated Life Cycle Nightly Transitions",
        "content": "Core nightly transitions include:\n- Advancing grace period elapsed days.\n- Automatically triggering APL when grace expires if Net Cash Surrender Value >= Overdue Modal Premium.\n- Automatically executing Lapse when Net Cash Surrender Value < Overdue Modal Premium.\n- Capitalizing unpaid loan interest upon policy anniversary."
      },
      {
        "heading": "3. Valuation Extracts & Actuarial Feeds",
        "content": "At Month-End (EOM), the Valuation Batch compiles granular inforce policy profiles, mortality risk exposures, reinsurance cessions, and cash value liabilities, outputting standardized feeds directly consumable by corporate Actuarial and Finance departments."
      },
      {
        "heading": "4. Operational Maintenance & Error Handling",
        "content": "Provides operations administrators with comprehensive tools to monitor batch SLAs, trigger on-demand ad-hoc batches (e.g., special billing rerun), view thread pools, and manage system parameter configurations."
      },
      {
        "heading": "5. Exact Chronological Execution Sequence of Nightly EOD/EOM Batch Jobs (Jobs 01 to 16)",
        "content": "The eBao Gemini Batch Console coordinates all automated nightly life cycle transitions, billing, banking, non-forfeiture, bonus allocations, and financial sub-ledger extractions in strict chronological order with explicit dependency gating:\n\n| Step | Time | Batch Job Code | Job Name | Frequency | Target LOB | Core Business Function & Database Impact |\n| :---: | :---: | :--- | :--- | :--- | :--- | :--- |\n| **01** | `22:30` | `JOB_CLEAR_PENDING_PROPOSAL` | Clear Pending Proposals | Daily | All LOBs | Auto-withdraws proposals unfulfilled after 30-day requirement SLA. Updates `T_PROPOSAL.STATUS='WITHDRAWN'`. |\n| **02** | `22:45` | `JOB_CLEAR_PENDING_CS` | Clear Pending CS Applications | Daily | All LOBs | Cancels abandoned CS alteration requests exceeding 30-day requirement SLA. Updates `T_CS_APPL.STATUS='CANCELLED'`. |\n| **03** | `23:00` | `JOB_BATCH_INFORCE_POLICY` | Auto-Inforce Matched Policies | Daily | All LOBs | Enforces approved proposals where 100% initial premium is matched. Converts `T_PROPOSAL` to `T_POLICY` (Status `INFORCE`). |\n| **04** | `23:15` | `JOB_BILLING_GEN` | Billing Notice Generation | Daily | Trad & ILP | Scans portfolio where `PTD <= System Date + 30 Days`. Inserts open bills into `T_BILL_RECEIVABLE` with Due Date and Grace End Date. |\n| **05** | `23:45` | `JOB_DD_EXTRACT` | Direct Debit Clearing Extraction | Daily | Bank Clearing | Aggregates open bills; compiles ISO 20022 pain.008 clearing files; marks bills as `EXTRACTED_SENT_TO_BANK`. |\n| **06** | `00:30` | `JOB_BANK_RECON` | Bank Clearing Return Ingest | Daily | Bank Clearing | Parses bank return clearing files; settles matched bills; advances `PTD` to next cycle; creates `T_COLLECTION_TXN`. |\n| **07** | `01:15` | `JOB_GRACE_AGING` | Grace Period Elapsed Aging | Daily | All LOBs | Increments unpaid days counter (1 to 60) for past-due policies. Dispatches warning reminders on Day 30 and Day 45. |\n| **08** | `02:00` | `JOB_APL_EXEC` | Auto Premium Loan (APL) Run | Daily | Trad Life | For Day 60 overdue policies: If `Net Cash Value >= Modal Premium`, draws APL loan, pays bill, advances PTD, sets status `INFORCE_APL`. |\n| **09** | `02:45` | `JOB_AUTO_LAPSE_TRAD` | Auto-Lapse Execution (Trad) | Daily | Trad Life | For Day 60 overdue policies: If `Net Cash Value < Modal Premium`, lapses policy. Updates `T_POLICY.STATUS='LAPSED'`; sets SA to 0. |\n| **10** | `03:00` | `JOB_ILP_PLD_AND_LAPSE` | ILP Potential Lapse & Unit Lapse | Daily | Unit-Linked | Calculates Potential Lapse Date (PLD). If Account Value is insufficient for COI/fees, executes ILP lapse and sells residual units. |\n| **11** | `03:15` | `JOB_BONUS_ALLOC_ENGINE` | Bonus & Survival Benefit Alloc | Sched / EOY | Par & Savings | Vests Reversionary Bonus (RB), generates Cash Bonus (CB) or Survival Benefit (SB/Coupon) payment requisitions in `T_BONUS_ALLOC`. |\n| **12** | `03:30` | `JOB_LOAN_INTEREST_ACCRUAL` | Daily Loan Interest Accrual | Daily | Trad Life | Calculates daily compound interest at 6.5% p.a. on all active policy and APL loans. Capitalizes interest into principal at anniversary. |\n| **13** | `04:00` | `JOB_SUSPENSE_AUTO_REFUND` | Auto-Refund Suspense Balances | Daily | All LOBs | Scans and auto-refunds unallocated suspense credits for declined, withdrawn, or claim-terminated policies. Inserts `T_PAYMENT_VOUCHER`. |\n| **14** | `04:30` | `JOB_ACTUARIAL_VALUATION` | Actuarial Liability & IFRS 17 Extract | Month-End | Actuarial | Compiles inforce policy liability inventory, unearned premium reserves, mathematical reserves, and IFRS 17 BEL extracts to `T_VALUATION`. |\n| **15** | `05:00` | `JOB_GL_EXTRACT_ROLL` | General Ledger Sub-Ledger Posting | Daily | Accounting | Compiles balanced sub-ledger debit/credit journals from billing, collections, claims, and payouts; transmits balanced batch to corporate ERP. |\n| **16** | `05:30` | `JOB_DATE_ROLL` | System Business Date Advancement | Daily | System Admin | Advances system business date by +1 day (`System Date = System Date + 1`), purges transient buffers, and releases maintenance locks. |"
      }
    ],
    "mapped_functions": [
      {
        "id": "F_327",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Job Definition",
        "l3": "",
        "l4": "Batch Jobs",
        "desc": "- Define batch jobs. Maintain batch job information including name, type, execution frequency, etc. \n- View dependency graph for all batch.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_328",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Job Submit",
        "l3": "",
        "l4": "",
        "desc": "Manually submit ad-hoc or pre-schedule batch job.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_329",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Job Monitoring",
        "l3": "",
        "l4": "Batch Job",
        "desc": "Monitor batch job execution results. It displays status of pre-schedule or ad-hoc batch execution.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_330",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "NB",
        "l4": "Auto Withdraw the Proposal",
        "desc": "Auto withdraw proposals with conditions after a pre-defined period.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_331",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "NB",
        "l4": "NB Auto Inforce Job",
        "desc": "Batch to inforce policy.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_332",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "CS Auto Inforce Job",
        "desc": "Batch to inforce CS application.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_333",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "Cancel CS Application",
        "desc": "Auto cancel CS applications with conditions after a pre-defined period.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_334",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "Update Policy HPS Exemption Information",
        "desc": "Update the policy HPS exemption information according to uploaded file.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_335",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "CPF Projection Send Batch",
        "desc": "Extract the CPF projection request and generate the projection send file.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": true,
          "ltc": false
        }
      },
      {
        "id": "F_336",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "CPF Projection Return Batch",
        "desc": "Process the CPF projection return file",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": true,
          "ltc": false
        }
      },
      {
        "id": "F_337",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "CPF Termination File",
        "desc": "Process the CPF termination file",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": true,
          "ltc": false
        }
      },
      {
        "id": "F_338",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "CPF LTC Active Member File",
        "desc": "Batch job to generate the CPF LTC active member list files",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_339",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "ELS Query",
        "desc": "Batch job to call ELS Query API to query the basic eldershield policy information.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_340",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "ELS Update",
        "desc": "Extract ELS update records and call ELS update API to update the eldershield supplement policy information to Medinet.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_341",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "Auto Policy Termination",
        "desc": "Process policy termination according to third-party information (i.e CPF/Medinet/CRM)",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_342",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "CS",
        "l4": "Auto Perform CS Alteration",
        "desc": "Auto perform CS alteration according to  third-party information (i.e CPF/Medinet/CRM)",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": true
        }
      },
      {
        "id": "F_343",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Claim",
        "l4": "Generate Claim Installment Payment",
        "desc": "Generate claim payment according to claim installment schedule.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_344",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Extract Renew Billing",
        "desc": "Generate billing records with status=0-waiting for processing for traditional/ILP products x days before due date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_345",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Confirm Renew Billing",
        "desc": "Apply renew premium if premium paid.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_346",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Process Non-forfeiture (NFO) for Traditional Policy",
        "desc": "Perform normal lapse/APL lapse/Raise APL,auto paid up for traditional policy according to product configuration.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_347",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Auto Renew Renewable Policy",
        "desc": "Perform auto renewal for renewable policy x days before renewal due date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_348",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Generate Premium Notice",
        "desc": "Extract qualified policies to generate premium notice.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_349",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Generate Premium Reminder Notice",
        "desc": "Extract qualified policies to generate premium reminder notice.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_350",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Confirm Waived Renew Billing",
        "desc": "Renew Confirm for premium-waived product.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_351",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Auto Convert Payment Frequency",
        "desc": "This is the daily batch job to convert the rider's payment frequency automatically with the following conditions:\n1. premium status of main product is fully paid\n2. premium status of rider is regular\n3. new payment frequency  for this rider is pre-defined on Configuration Table: Auto_Convert_Payment_Frequency_Cfg\nAfter rider's payment frequency changed, system will\t recalculate the rider’s installment premium and outstanding premium based on new payment frequency",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_352",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Renew",
        "l4": "Recurring single top up premium extraction and confirm",
        "desc": "To apply the recurring single top up premium amount. The RSP (recurring single top up premium) plan due date will be moved to next after it is successful applied.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_353",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Bonus",
        "l4": "Allocate Cash Bonus (CB)",
        "desc": "Calculate and allocate cash bonus for qualified policy. Allocation schedule and calculation formula are configured at product. If CB option is pay out in cash, user can perform payment requisition to pay out cash bonus OR batch to auto pay out.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_354",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Bonus",
        "l4": "Allocate Survival Bonus (SB)",
        "desc": "Calculate and allocate survival benefits (i.e. cash benefits) for qualified policy. Allocation schedule and calculation formula are configured at product. If SB option is pay out in cash, user can perform payment requisition to pay out Survival Bonus OR batch to auto pay out.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_355",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Bonus",
        "l4": "Cancel CB SB Payment",
        "desc": "This is the daily batch job which processed to cancel cb sb opt1 payment records and inserts a new receivable record (Payment Method= Internal transfer) to transfer the CB/SB payable amount into CB/SB deposit balance, with the following conditions:\n1.\tThe CB/SB option of benefit is CB/SB Option1: To receive SB/CB by Pay Out\n2.\tCb sb opt1 Batch payment batch already run and payment records already generated.\n3.\tThe payment status of CB/SB Payment is not payment confirmed or bank transferring\n4.\tAuto cancellation batch process date= CB/SB Payment Generation Date + Auto Cancellation(Days) of CB/SB Payment\nNotes:\n ‘Auto Cancellation(Days) of CB/SB Payment’ is configured in Configuration Table: Batch_Advance_Days_Cfg. for example, for now Auto Cancellation(Days) is 30",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_356",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Bonus",
        "l4": "Allocate Reversionary Bonus (RB)",
        "desc": "Calculate and allocate reversionary  bonus for qualified policy. Allocation schedule and calculation formula are configured at product.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_357",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Bonus",
        "l4": "Generate SB/CB (Cash Out Option) Payment",
        "desc": "Generate CB and SB payment by batch for policies which CB/SB option 1 is pay out in cash.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_358",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Account",
        "l4": "Settle Loan Account Interest",
        "desc": "Calculate and generate loan interest for loan account, including policy loan and automatic policy loan according to pre-defined frequency, due date, interest calculation method, declared interest rate. Interest amount can be posted to GL.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_359",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Account",
        "l4": "Capitalize Loan Account Interest",
        "desc": "Capitalize loan account interest according to pre-defined frequency, due date interest amount calculated at Batch Loan Interest Settlement. The batch will update accounts information including next capitalization date, capitalized amount etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_360",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Account",
        "l4": "Settle Deposit Account Interest",
        "desc": "Calculate and generate deposit interest for deposit account, such as survival/cash benefit, cash bonus, reversionary bonus, loyalty bonus, advanced premium, annuity etc. according to pre-defined frequency, due date, interest calculation method, declared interest rate. Interest amount can be posted to GL. New deposit account type can be added in code table.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_361",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Account",
        "l4": "Capitalize Deposit Account Interest",
        "desc": "Capitalize deposit account interest according to pre-defined frequency, due date interest amount calculated at Batch Loan Interest Settlement. The batch will update accounts information including next capitalization date, capitalized amount etc.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_362",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Annuity",
        "l4": "Generate Annuity Installment Payable",
        "desc": "Extract annuity for qualified policy according to product configuration as well as annuity installment payment schedule customer chosen and generate all ARAP amount and annuity net payable amount. Calculation formula is configured at product.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_363",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Annuity",
        "l4": "Generate Annuity Instalment Notice",
        "desc": "Generate annuity notice x days before annuity installment due date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_364",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Annuity",
        "l4": "Generate Annuity Installment Payment",
        "desc": "Generate annuity payment by batch for policy with annuity payable amount.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_365",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Maturity",
        "l4": "Generate Maturity Payable",
        "desc": "Extract maturity for qualified policy and generate all ARAP amount and maturity net payable amount, terminate policy and product. Calculation formula is configured at product.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_366",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Maturity",
        "l4": "Generate Maturity Notice",
        "desc": "Generate maturity notice x days before maturity date.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_367",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Maturity",
        "l4": "Generate Maturity Payment",
        "desc": "Generate maturity payment by batch for policies with maturity payable amount.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_368",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "Maturity",
        "l4": "Auto Expiry Policy/Product without Maturity Benefit",
        "desc": "Extract qualified policies to perform auto expiry. The batch will update policy/product status to be termination with expiry reason.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_369",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Auto Set or Cancel Premium Holiday",
        "desc": "Daily batch job to auto set or cancel the premium holiday indicator for eligible ILP policy.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_370",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Confirm Fund Price",
        "desc": "Daily batch job to confirm the approved fund price which will be used in subsequent transactions.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_371",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Process Fund Transactions",
        "desc": "Pending fund transaction is applied after fund price is declared. Units of fund will be updated accordingly.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_372",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Process Charge Deductions",
        "desc": "Calculate and deduct the risk charge, policy fee, other admin fee etc. according to product charge definition. All calculation formula is configured at product. It also calculates Potential Lapse Date(PLD) if total invest value (TIV) is not enough to deduct charges.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_373",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Process Non-forfeiture (NFO) for ILP Policy",
        "desc": "Lapse universal life or variable life policy if batch date <= Potential Lapse Date(PLD).",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_374",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Process UL Interest Settlement",
        "desc": "Settle UL saving account interest after account interest is declared.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_375",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Process Regular Withdrawal",
        "desc": "This is the daily job that extract the policies to process scheduled regular withdrawal based on the following conditions:\n1. Policy Status is inforce and not forzen.\n2. There is an active regular withdraw plan on this policy and System Date>=Regular withdraw Due Date, and Regular withdraw amount<Total Account Value- Minimum Holding Amount-Pending selling transaction amount if any.\nAfter regular withdraw batch processed. system will generate the pending selling fund transaction.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_376",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Sell Units for Lapsed ILP Policy",
        "desc": "This is the daily batch jot that sell all units of ILP Lapsed Policy with the following confiditions:\n1. Policy status is lapsed and not frozen.\n2. Remaining TIV>0\n3.System date>= Lapse Date + Waiting Days After Lapse (Parameter on product configuration)\nSystem will generate pending selling fund transaction records to withdrawl remaining units.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_377",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP",
        "l4": "Fund Closure & Delist Batch",
        "desc": "When certain ILP fund is terminated, system will extract the related ILP policy and auto re-set its fund apportionment rates or transfer the fund value from the terminated fund to a new fund.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_378",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP Bonus",
        "l4": "Policy Maitenance Fee Refund Allocation",
        "desc": "This is one type of ILP bonus which will be allocated if the product has such feature.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_379",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP Bonus",
        "l4": "Power Up Bonus Allocation",
        "desc": "This is the daily batch jot that process to allocate Power-up bonus with the following conditions\n1, The policy is inforce and not frozen.\n2, The policy has power up bonus pay plan(bonus type=Power-up Bonus) predefined on product and the power up bonus pay plan is active\n3. Current system date >= Bonus Due Date\nSystem will calcualte Powner-up bonus amount according to pre-defined formula, and generate pending fund transaction to purchase fund units with bonus amount.\nSystem update bonus due date according to pre-defined bonus allocation schedule",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_380",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP Bonus",
        "l4": "Loyalty Bonus Allocation",
        "desc": "This is the daily batch job that processes the Loyalty bonus allocation for an ILP product with the loyalty bonus feature when it is due.\n-Loyalty Bonus amount  is calcualted according to pre-defined formula on product  with  Bonus Type=Loyalty Bonus\n-Loyalty Bonus Plan is pre-defined in bonus allocation schedule on product \nAfter Loyalty bonus is allocated, system generates pending fund transaction to purchase fund units with bonus amount, and update bonus due date according to pre-defined bonus allocation schedule.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_381",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP Bonus",
        "l4": "Welcome Bonus Allocation",
        "desc": "Fund welcome bonus accloation for an ILP product with the welcome bonus feature.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_382",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "ILP Bonus",
        "l4": "Fund Dividend Allocation and Confirm",
        "desc": "Extract the policy and allocate the dividend to fund. The dividend can be pay out or reinvest according to the policy's disposal option.",
        "comments": "Added on 27/07/2026 by Joanna",
        "lobs": {
          "term": false,
          "life": false,
          "investment": true,
          "health": false,
          "shield": false,
          "ltc": false
        }
      },
      {
        "id": "F_383",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN GL Posting - CASH",
        "desc": "This is a daily batch job to extract data from T_CASH table for GL posting.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_384",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN GL Posting - ARAP",
        "desc": "This is a daily batch job to extract data from T_PREM_ARAP table for GL posting.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_385",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN GL Posting - NON UNIT",
        "desc": "This is a daily batch job to extract data from T_CAPITAL_DISTRIBUTE table for GL posting.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_386",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN GL Posting - UNIT",
        "desc": "This is a daily batch job to extract data from T_FUND_CASH table for GL posting.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_387",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "Premium Accrual",
        "desc": "This is a month end batch job to extract outstanding premium for GL Premium Accrual purpose.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_388",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "Premium Accrual Reversal",
        "desc": "This is a month beginning batch job to perform Premium Accrual Reversal.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_389",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN DwP Suspense Refund",
        "desc": "This batch is to automatically refund money in suspense if policy is declined, withdrawn or postponed.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_390",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN In Force Suspense Refund",
        "desc": "It's a daily batch for system performs suspense refund. The system extracts a list of policies (with policy status = inforce) with total suspense balance >0 for single pay and general suspense >$10 for non-single pay.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_391",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN Lapse Suspense Refund",
        "desc": "It's a daily batch for system performs suspense refund. The system extracts a list of policies (with policy status = Lapsed) with total suspense balance >= $0 for >= 6 months will need to have monies refunded to PH.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_392",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "FN Termination Suspense Refund",
        "desc": "It's a daily batch for system performs suspense refund. The system extracts a list of policies when policies have been terminated caused by claim;with suspese balance >0 and collection method=giro.",
        "comments": "",
        "lobs": {
          "term": true,
          "life": true,
          "investment": true,
          "health": true,
          "shield": true,
          "ltc": true
        }
      },
      {
        "id": "F_393",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "CPF Deduction Extract and Send Batch",
        "desc": "Extract policy which has CPF deduction request and generate the CPF deduction send file.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": true,
          "ltc": false
        }
      },
      {
        "id": "F_394",
        "app": "BATCH CONSOLE",
        "l1": "Batch",
        "l2": "Batch Jobs",
        "l3": "FIN",
        "l4": "CPF Deduction Return Batch",
        "desc": "Process the CPF deduction return file.",
        "comments": "",
        "lobs": {
          "term": false,
          "life": false,
          "investment": false,
          "health": false,
          "shield": true,
          "ltc": false
        }
      }
    ],
    "function_count": 68,
    "sops": [
      {
        "code": "SOP-BAT-01",
        "title": "Accessing the Batch Console & Monitoring Nightly EOD Execution DAG",
        "ui_path": "Main Menu > Batch Console > Job Dependency Monitor",
        "prerequisites": [
          "Batch Operator credentials with system administration privileges",
          "Interactive UI daily cut-off announced to operations staff"
        ],
        "steps": [
          "1. Access Main Menu > Batch Console.",
          "2. In the Batch Monitor Dashboard, review the Directed Acyclic Graph (DAG) of scheduled nightly jobs.",
          "3. Verify System Business Date (e.g. '2026-10-20').",
          "4. At scheduled cut-off (e.g. 23:00), click 'Initiate EOD Pre-Check'. System verifies all interactive cashier sessions are closed and database locks are clear.",
          "5. Click 'Start Nightly Batch Sequence' (or let cron daemon trigger).",
          "6. Monitor real-time job progress bar: Job 01 (Billing Run) -> Job 02 (Collection Import) -> Job 03 (Grace Aging) -> Job 04 (APL Execution) -> Job 05 (Auto-Lapse) -> Job 06 (Loan Interest Accrual) -> Job 07 (Valuation Extract) -> Job 08 (Date Roll).",
          "7. Verify that all 8 jobs complete with exit code 'SUCCESS - 0 ERRORS'.",
          "8. System business date advances to '2026-10-21'. UI lock is released for morning business operations."
        ],
        "fields_table": [
          {
            "name": "Batch Sequence ID",
            "type": "String",
            "required": "Read-only",
            "desc": "Nightly execution run identifier"
          },
          {
            "name": "System Business Date",
            "type": "Date",
            "required": "Read-only",
            "desc": "Accounting date advancing at end of batch"
          },
          {
            "name": "Job Status Indicator",
            "type": "Status",
            "required": "Read-only",
            "desc": "WAITING, RUNNING, COMPLETED, FAILED"
          }
        ],
        "actuary_notes": "The valuation job (Job 07) runs at month-end, feeding policy liability inventories into valuation software.",
        "op_notes": "If any job fails (e.g. database timeout), the DAG pauses immediately and alerts the on-call Batch Operator with error logs.",
        "pdf_page": 428
      },
      {
        "code": "SOP-BAT-02",
        "title": "Executing Automatic Premium Loan (APL) & Policy Auto-Lapse Batch Jobs",
        "ui_path": "Batch Console > Ad-hoc Batch > Non-Forfeiture & Lapse Execution",
        "prerequisites": [
          "Bank collection imports and grace period aging completed"
        ],
        "steps": [
          "1. From Batch Console, select Job 04: 'JOB_APL_EXECUTION'.",
          "2. Job scans inforce policies where Due Date + Grace Period (60 days) < Current Business Date and Bill remains unpaid.",
          "3. For each overdue policy, the batch engine checks Net Cash Surrender Value:\n   - Condition 1: If Net Cash Value >= Overdue Modal Premium:\n     * System auto-creates an APL Loan Transaction for the premium amount.\n     * Policy status transitions to 'APL_ACTIVE'.\n     * Paid-To-Date advances by 1 billing cycle.\n     * Generates APL Execution Advice letter to policyholder.\n   - Condition 2: If Net Cash Value < Overdue Modal Premium:\n     * Job 05 ('JOB_AUTO_LAPSE_EXECUTION') executes.\n     * Policy status transitions to 'LAPSED'.\n     * Sum Assured is zeroed. Insurance protection terminates.\n     * Reinstatement eligibility countdown (24 months) begins.\n     * Generates Official Lapse Notice.",
          "4. Review Batch Execution Log for count of APL converted vs Lapsed policies."
        ],
        "fields_table": [
          {
            "name": "Grace Expiry Threshold",
            "type": "Integer",
            "required": "Read-only",
            "desc": "60 calendar days following premium due date"
          },
          {
            "name": "APL Loan Balance Added",
            "type": "Currency",
            "required": "Auto-calculated",
            "desc": "Overdue modal premium capitalized as loan"
          },
          {
            "name": "Lapse Reinstatement Window",
            "type": "Integer",
            "required": "Read-only",
            "desc": "Statutory 2-year window for reinstatement"
          }
        ],
        "actuary_notes": "APL protects policy persistency by preventing involuntary lapses, but accumulates interest liabilities that must be monitored.",
        "op_notes": "Operations customer service uses the Batch Lapse Log to initiate win-back retention telemarketing campaigns.",
        "pdf_page": 435
      },
      {
        "code": "SOP-BAT-03",
        "title": "Running Month-End Actuarial Valuation Extract & Asset-Liability Feeds",
        "ui_path": "Batch Console > Monthly Batches > Actuarial Valuation Extract",
        "prerequisites": [
          "Last day of calendar month EOD batch completed",
          "Financial sub-ledger closed and reconciled"
        ],
        "steps": [
          "1. On Month-End cutoff date, navigate to Batch Console > Monthly Batches.",
          "2. Select 'JOB_ACTUARIAL_VALUATION_EXTRACT'.",
          "3. Select Reporting Basis: 'Statutory Local GAAP', 'IFRS 17', or 'Risk-Based Capital (RBC)'.",
          "4. Click 'Execute Valuation Extraction'.",
          "5. System queries SOR and compiles granular policy liability profiles:\n   - Policy Number, Product Code, Issue Age, Gender, Smoker Status\n   - Current Attained Age, Policy Duration (Months)\n   - Inforce Sum Assured, Inforce Premium Run-Rate\n   - Cash Surrender Value, Accumulated Reversionary Bonus\n   - Outstanding Policy Loans and Accrued Interest\n   - Reinsurance Cession Treaty Code & Ceded SA.",
          "6. System writes flat-file extract (CSV/Parquet) to secure Actuarial SFTP repository.",
          "7. Valuation extract feeds directly into actuarial modeling software (Prophet, Mo.net, InsureForge Core Engine) for reserve calculations."
        ],
        "fields_table": [
          {
            "name": "Reporting Basis",
            "type": "Select",
            "required": "Yes",
            "desc": "IFRS 17, Local Statutory, RBC Solvency II"
          },
          {
            "name": "Valuation Extract File",
            "type": "Data File",
            "required": "Auto-generated",
            "desc": "Standard actuarial model input dataset"
          },
          {
            "name": "Reconciled Inforce Count",
            "type": "Integer",
            "required": "Read-only",
            "desc": "Total active policy inventory matching SOR"
          }
        ],
        "actuary_notes": "Valuation extract is the single source of truth for actuarial reserves, Solvency Capital Requirements (SCR), and IFRS 17 Best Estimate Liabilities (BEL).",
        "op_notes": "Valuation extract cannot be executed until all pending Month-End manual cashier adjustments are fully posted.",
        "pdf_page": 441
      }
    ],
    "sop_count": 3,
    "interconnections": {
      "module_code": "BATCH_CONSOLE",
      "upstream_sources": [
        {
          "module": "MOD_05 Billing",
          "data": "Overdue unpaid bills exceeding 60-day grace period"
        },
        {
          "module": "MOD_04 CS",
          "data": "Inforce cash surrender values and active policy loan balances"
        },
        {
          "module": "All Core Modules",
          "data": "State transitions, business dates, and month-end portfolio liability snapshots"
        }
      ],
      "downstream_destinations": [
        {
          "module": "MOD_04 Customer Service",
          "impact": "Automatically executes APL loan creation or converts policy status to LAPSED"
        },
        {
          "module": "MOD_05 Billing",
          "impact": "Advances system business date and triggers scheduled recurring billing scans"
        },
        {
          "module": "Corporate Actuarial & InsureForge",
          "impact": "Generates Month-End Actuarial Valuation extracts for reserve modeling"
        }
      ],
      "shared_data_entities": [
        "T_BATCH_JOB_DEF (Job DAG)",
        "T_BATCH_EXEC_LOG (Execution Log)",
        "T_VALUATION_EXTRACT (Actuarial Inventory)"
      ],
      "lifecycle_events": [
        "NIGHTLY_BATCH_STARTED",
        "APL_JOB_EXECUTED",
        "AUTO_LAPSE_EXECUTED",
        "VALUATION_EXTRACT_GENERATED"
      ]
    },
    "pdf_start_page": 426,
    "pdf_end_page": 517,
    "pdf_chapter": "Chapter 8: Batch Console & System Maintenance"
  }
];
window.EBAO_FUNCTIONS = [
  {
    "id": "F_001",
    "app": "COMMON",
    "l1": "User Setting",
    "l2": "Basic Information",
    "l3": "",
    "l4": "",
    "desc": "User account's basic information view and maintain, such as real name, organization name, E-mail, Supervisor, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_002",
    "app": "COMMON",
    "l1": "User Setting",
    "l2": "Safety Information",
    "l3": "",
    "l4": "",
    "desc": "User account's password modification.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_003",
    "app": "COMMON",
    "l1": "My Home",
    "l2": "Dashboard",
    "l3": "",
    "l4": "",
    "desc": "A graphical interface to display key performance data and progress of work based on user's role and authority.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_004",
    "app": "COMMON",
    "l1": "Global Search",
    "l2": "Global Search",
    "l3": "",
    "l4": "",
    "desc": "Global search for user to query info such as menu, policy, cusotmer, task etc. by input search critieria",
    "comments": "New Function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_005",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Registration",
    "l3": "",
    "l4": "",
    "desc": "The function to manually create a new proposal in workbench with proposal basic information such as proposal number, proposal date, main plan, agent etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_006",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Task pool",
    "l4": "",
    "desc": "Manage all NB tasks in a centralized pool with authority control. Fuzzy search and precise search with more search criteria are supported.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_007",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Basic Information Input",
    "desc": "Capture policy basic information, such as agent, commencement date, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_008",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Policy Holder Input",
    "desc": "Capture policy holder information, including basic information, annual income, contact information, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_009",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Life Assured Input",
    "desc": "Capture life assured information, including basic information,  contact information, etc. Support add additional life assured(s) without limitation",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_010",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Payer Input",
    "desc": "Capture payer information, including basic information, annual income, contact information, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_011",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Collection Method Input",
    "desc": "Capture collection method, including new business payment method and renew payment method. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_012",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Disbursement Method Input",
    "desc": "Capture disbursement method which is used for refund. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_013",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Product Input",
    "desc": "Support all mainstream product lines data input, including Whole Life, Endowment, Critical Illness/Cancer, Mortgage/Credit Life, Unit Linked, Universal Life, Variable Universal Life, Variable Annuity, Accident, Health/Medical etc. Also support Premium Waiver/Payer Waiver/Spouse Waiver, Joint-life, Indexation, Level plan, Joint Life Product etc.",
    "comments": "Upgrade function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_014",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Beneficiary Input",
    "desc": "Capture beneficiary information, including basic information, nomination type, order, sharing information, etc. Support to add more than one beneficiary.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_015",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Beneficiary Owner Input",
    "desc": "Capture beneficiary owner information, including basic information, annual income, contact information, etc. Support to add more than one beneficiary owner.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_016",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Trustee Input",
    "desc": "Capture trustee information, including basic information, annual income, contact information, etc. Support to add more than one trustee.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_017",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Trusted Individual Input",
    "desc": "Capture Trusted Individual information, including basic information, contact information, etc. Support to add more than one trustee.",
    "comments": "New Function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_018",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Declaration Input",
    "desc": "Capture declaration information for policy holder, life assureds, and agent.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_019",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Proposal Rules Validation",
    "desc": "Proposal rules validation, including product rules and non-product rules.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_020",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Proposal Issues Handling",
    "desc": "Display Proposal issues according to the validation result of proposal rules. Support to add manual proposal issues, generate Query letter which can list out selected proposal issues and send query letter/proposal issue to agent/customer portal.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_021",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Other Supporting Functions",
    "desc": "Support to view/upload proposal material such as image, document (need work together with DMS (document management system). Show proposal task history. And also support to capture comments on current proposal and user can view all comments history.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_022",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Basic Information Input/Review",
    "desc": "Capture/Review policy basic information, such as agent, commencement date, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_023",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Policy Holder Input/Review",
    "desc": "Capture/Review policy holder information, including basic information, annual income, contact information, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_024",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Life Assured Input/Review",
    "desc": "Capture/Review life assured information, including basic information,  contact information, etc. Support add additional life assured(s) without limitation.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_025",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Payer Input/Review",
    "desc": "Capture/Review payer information, including basic information, annual income, contact information, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_026",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Collection Method Input/Review",
    "desc": "Capture/Review collection method, including new business payment method and renew payment method. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_027",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Disbursement Method Input/Review",
    "desc": "Capture/Review disbursement method which is used for refund. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_028",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Product Input/Review",
    "desc": "Capture/Review product information. Support all mainstream product lines, including Whole Life, Endowment, Critical Illness/Cancer, Mortgage/Credit Life, Unit Linked, Universal Life, Variable Universal Life, Variable Annuity, Accident, Health/Medical etc. Also support Premium Waiver/Payer Waiver/Spouse Waiver, Joint-life, Indexation, Level plan etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_029",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Beneficiary Input/Review",
    "desc": "Capture/Review beneficiary information, including basic information, nomination type, order, sharing information, etc. Support to add more than one beneficiary.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_030",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Beneficiary Owner Input/Review",
    "desc": "Capture/Review beneficiary owner information, including basic information, Beneficiary nomination type ,annual income, contact information, etc. Support to add more than one beneficiary owner.",
    "comments": "Upgrade function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_031",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Trustee Input/Review",
    "desc": "Capture/Review trustee information, including basic information, annual income, contact information, etc. Support to add more than one trustee.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_032",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Declaration Input/Review",
    "desc": "Capture/Review declaration information for policy holder, life assureds, and agent.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_033",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Proposal Rules Validation",
    "desc": "The same with Data Entry Proposal Rules Validation",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_034",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Proposal Issues Handling",
    "desc": "The same with Data Entry Proposal Issue Handling",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_035",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Verification",
    "l4": "Other Supporting Functions",
    "desc": "The same with Data Entry Other Supporting Functions",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_036",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Work List",
    "l3": "Pending Inforce",
    "l4": "",
    "desc": "List proposals that are accepted or conditionally accepted but not issued. Show not inforce reason and premium shortage. Support by-policy manual inforce and batch manual inforce. Support send remind to agent/customer by SMS/email. Quick assess to Query/Withdraw Proposal/Reverse New Business.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_037",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Watch List",
    "l3": "Task pool",
    "l4": "",
    "desc": "Function for operation department's admin user to view and monitor all outstanding tasks. Support both fuzzy search and precise search.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_038",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Watch List",
    "l3": "Task Release",
    "l4": "",
    "desc": "Support release tasks which is already claimed by a certain user.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_039",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Watch List",
    "l3": "Task Reassign",
    "l4": "",
    "desc": "Support to reassign tasks by 2 strategy: Push it to a specific user who has the authority of the workflow and accessible organization; Auto reassign it to a certain user who has the authority of the workflow and accessible organization;",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_040",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Reverse New Business",
    "l3": "",
    "l4": "",
    "desc": "Support to reverse proposal/policy whose status is withdrawn, declined, postponed, accepted, conditional accepted, or inforce to data entry/verification/underwriting where proposal/policy has gone through and capture reverse reason.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_041",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Withdraw Proposal",
    "l3": "",
    "l4": "",
    "desc": "Support to withdraw proposal and refund the suspense if any.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_042",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Query",
    "l3": "",
    "l4": "",
    "desc": "Support to query all the proposals created in workbench in both manual capture and e-submission. Support both fuzzy search and precise search. Displays the latest proposal status during policy issuance process, not inforce reason and premium shortage. Display the latest proposal data in terms of NB data entry/verification snapshot.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_043",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Configuration",
    "l3": "Declaration Question",
    "l4": "",
    "desc": "Support to configure declaration questions which can support 3 types of answer: single choice, multiple choice and text. Support to configure question with hierarchy. Support to edit/delete questions after creation only when the question is not applied in any proposal.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_044",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Configuration",
    "l3": "Declaration Form",
    "l4": "",
    "desc": "Create form by selecting existing questions and link to product. Support copy existing form to a new form. Support edit/delete form after creation only when the form is not applied in any proposal.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_045",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Configuration",
    "l3": "Workflow Configuration",
    "l4": "",
    "desc": "Policy issuance workflow configuration for STP and non-STP flow and task assignment strategy configuration",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_046",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Configuration",
    "l3": "Rule Configuration",
    "l4": "",
    "desc": "Proposal rules configurations are used by NB",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_047",
    "app": "NB APP",
    "l1": "New Business",
    "l2": "Configuration",
    "l3": "General Configuration",
    "l4": "",
    "desc": "Other general configuration needed for New business, such as policy No setup, monthly policy inforce setup, occupation class etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_048",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Task pool",
    "l4": "",
    "desc": "Centralized task pool with authority control. Support both fuzzy search and precise search with advanced search criteria.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_049",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting",
    "l4": "",
    "desc": "A centralized risk assessment platform to do risk assessment, address outstanding issues, issue query/medical letters, make underwriting decisions for UW applications from NB, CS and Claim. It also supports to send the policy back to data entry/sales portal etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_050",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Worksheet",
    "l4": "Policy Information View",
    "desc": "Display risk assessment related key policy information, including policy level and product level information, customer information.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_051",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Worksheet",
    "l4": "Risk Aggregation View",
    "desc": "Display risk summary of all life assureds, including risk aggregation per SAR and premium dimension, NB UW history, claim history, and risk related CS history. Quick access to policy query, UW query, CS query, claim query to query further detail information of above transactions.",
    "comments": "Upgrade function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_052",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Worksheet",
    "l4": "Letters View",
    "desc": "List all letters generated for current underwriting case with letter view and replied image view function (image view need work with DMS).",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_053",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Worksheet",
    "l4": "Comments View",
    "desc": "Display all historical comments for current underwriting case.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_054",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Worksheet",
    "l4": "UW Decision View",
    "desc": "Display underwriting decision and escalation history.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_055",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Worksheet",
    "l4": "LCA View",
    "desc": "List all LCAs generated for current underwriting case with letter view and replied image view function (image view need work with DMS).",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_056",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Worksheet",
    "l4": "Worksheet Printing",
    "desc": "A one-click button that users can generate an underwriting worksheet for offline review by managers or reinsurers.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_057",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Rules",
    "l4": "",
    "desc": "Auto trigger pre-configured underwriting rules checking and show result at UW Issus screen.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_058",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Issues",
    "l4": "Issues Handling",
    "desc": "Display underwriting rules checked failed by the system. Support to close or delete existing issues, add manual issue, generate query letter, add medical exam requests and Non-medical request, etc.\nRaise new Proposal Issue during underwritign process",
    "comments": "Upgrade function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_059",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Issues",
    "l4": "Letter Handling",
    "desc": "Display outstanding query letters record. Support to update letter status.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_060",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Issues",
    "l4": "LCA Handling",
    "desc": "Display outstanding LCA record. Support to update letter status.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_061",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Decision",
    "l4": "Decision Input",
    "desc": "Capture underwriting decision and decision reason. The underwriting decision making is at policy level first, if all products decision are the same, user just need give policy level decision, no need input decision one by one product. If products decision are different, user can make decision one by one product for standardly accepted, conditionally accepted, declined or postponed. If conditionally accepted, UWer will be able to add extra loadings, restrict SA, exclusion, endorsement, agreement etc. Extra loading types and formulas are configured at product.",
    "comments": "Upgrade function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_062",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Decision",
    "l4": "Risk Information Modification",
    "desc": "Show risk-related information and UWer can modify them as part of UW decision. Such as life assureds occupation, risk level/UW class, smoker indicator, commencement date, backdating indicator etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_063",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting Decision",
    "l4": "LCA Preview",
    "desc": "Provide 'Generate LCA' button to generate PDF document of LCA for conditionally accepted cases. UWer can preview, delete and regenerate LCA.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_064",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Work List",
    "l3": "Underwriting",
    "l4": "Other Supporting Functions",
    "desc": "Provide a link to view full application data. Support to view/upload proposal material such as image, document (need work together with DMS (document management system).And also support to capture comments on current UW case and user can view all comments history with authority control.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_065",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Watch List",
    "l3": "Task pool",
    "l4": "",
    "desc": "Function for operation department's admin user to view and monitor all outstanding tasks. Support both fuzzy search and precise search.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_066",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Watch List",
    "l3": "Task Release",
    "l4": "",
    "desc": "Support release tasks which is already claimed by a certain user.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_067",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Watch List",
    "l3": "Task Reassign",
    "l4": "",
    "desc": "Support to reassign tasks by 2 strategy: Push it to a specific user who has the authority of the workflow and accessible organization; Auto reassign it to a certain user who has the authority of the workflow and accessible organization;",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_068",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Exclusion Query",
    "l3": "",
    "l4": "",
    "desc": "Support query all policy exclusion information after policy issuance.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_069",
    "app": "UW APP",
    "l1": "Underwriting",
    "l2": "Query",
    "l3": "",
    "l4": "",
    "desc": "Support query all UW applications with all detail snapshot data at the time to submit this UW case including UW worksheet, UW issues and UW decision, UWer can trace all historical UW decision and background of the case by this query function.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_070",
    "app": "NB APP",
    "l1": "Underwriting",
    "l2": "Configuration",
    "l3": "Authority Configuration",
    "l4": "",
    "desc": "UW authority configuration",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_071",
    "app": "NB APP",
    "l1": "Underwriting",
    "l2": "Configuration",
    "l3": "Rule Configuration",
    "l4": "",
    "desc": "UW rules configurations are used by NB/CS/CLM UW",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_072",
    "app": "NB APP",
    "l1": "Underwriting",
    "l2": "Configuration",
    "l3": "General Configuration",
    "l4": "",
    "desc": "Other general configuration needed for underwriting, such as risk aggregation limit, BMI, high risk occupation etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_073",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Registration",
    "l3": "",
    "l4": "",
    "desc": "Create a CS application manually at the workbench.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_074",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Task pool",
    "l4": "",
    "desc": "Centralized pool for user to process CS Data Entry, CS UW Confirmation, Approval and Pending Issue. Supports both fuzzy search and precise search with advanced search criteria. Also offer a button to create a new application quickly.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_075",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "CS Application Data Entry",
    "desc": "One-stop working page to do CS application entry, address outstanding issues and letters, submit or reject the CS application. Provide function for user to complete CS application data entry and confirm on collection/refund transactions.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_076",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "UW Decision Confirmation and Modification",
    "desc": "For CS UW case, system will autodispose the task according to UW decision given. No manual intervention is needed.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_077",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Query Letter Generation",
    "desc": "Manage CS query letter.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_078",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "CS Application Rejection",
    "desc": "Provide function to reject CS application at item level.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_079",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Data Entry",
    "l4": "Other Supporting Functions",
    "desc": "Capture comments on current CS application case, and other users who can access to this case can view all the comments history with user, time and detail content.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_080",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Approval",
    "l4": "",
    "desc": "Share the same UI interface with Data Entry, but is read-only. Support to approve, reject, or send the application back to data entry.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_081",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Pending Inforce",
    "l4": "",
    "desc": "List application cases that are approved but not inforce due to pending collection.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_082",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Work List",
    "l3": "Cancel CS Application",
    "l4": "",
    "desc": "Manual and auto cancel CS application.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_083",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Freelook",
    "l4": "",
    "desc": "Perform freelook for selected product(s). Generate premium refund and claw back commission (if commission is generated) and medical fee if need.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_084",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Add Rider",
    "l4": "",
    "desc": "Add traditional premium paying rider from commencement date, immediately, from next due date, or from next anniversary. Add unit deduct rider for ILP policy from next charge due date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_085",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Apply Policy Loan",
    "l4": "",
    "desc": "Apply policy loan for both ILP and traditional policy.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": true,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_086",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Delete Rider",
    "l4": "",
    "desc": "Delete rider immediately or from next due date/next charge due date for both cash rider and unit-deduct rider (ILP policy). Generate premium refund or GSV refund according to product definition for cash riders.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_087",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Decrease SA",
    "l4": "",
    "desc": "Decrease Sum Assured of traditional policies or cash riders of ILP policy immediately or from commencement date/next due date. Cash value will be partial withdrawal in case the product is with cash value.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_088",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Increase SA",
    "l4": "",
    "desc": "Increase Sum Assured of traditional policies and cash riders of ILP policy immediately or from commencement date/next due date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_089",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Reinstatement",
    "l4": "",
    "desc": "Perform reinstatement for selected product(s) for both ILP and traditional policy.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_090",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Termination/Surrender",
    "l4": "",
    "desc": "Terminate the entire policy which is not investment linked. Generate premium refund or cash value refund according to product definition.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_091",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Cancellation (Void policy)",
    "l4": "",
    "desc": "To cancel/void a policy or rider product from commencement date or immediately.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_092",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Assignment",
    "l4": "",
    "desc": "Change assignment for policies with no beneficiaries, including changing the assignment type, adding an assignee, deleting an assignee, and changing assignee information.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_093",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Beneficiary",
    "l4": "",
    "desc": "Change beneficiary (nominee), including adding beneficiaries, deleting beneficiaries, and changing beneficiary information.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_094",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Contact Information",
    "l4": "",
    "desc": "Change the contact information of the policy holder and the existing life assured(s) on policy level.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_095",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Occupation",
    "l4": "",
    "desc": "Change the occupation of the life assured. If occupation class changed, recalculate premium from Commencement Date/Immediately or Next Due Date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_096",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Payment Frequency",
    "l4": "",
    "desc": "Change payment frequency for traditional and investment product. Move due date to the next in case change payment frequency from a high frequency to low frequency (e.g. from monthly to yearly).",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_097",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Payment Method",
    "l4": "",
    "desc": "Change payment method, including selecting new payment method and maintain account information. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_098",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Policy Holder",
    "l4": "",
    "desc": "Change policy holder for the policy whose policy holder is an individual, not an organization.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_099",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Smoker Status",
    "l4": "",
    "desc": "Change the smoker status of the Life Assured immediately or from the commencement date and recalculate premium.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_100",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change extra premium",
    "l4": "",
    "desc": "If add extra premium in the CS underwriting process, system will auto generate CS application record of changing extra premium in the same application case.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_101",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Birth Date or Gender",
    "l4": "",
    "desc": "Change the birth date and gender of the life assured(s) at policy level. Calculate the amount to collect or refund.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_102",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Benefits",
    "l4": "",
    "desc": "Support to change benefit. System will calculate premium difference to be collected after change benefit and also maintaint the SB and RB upon product conversion.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_103",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Beneficial Owner",
    "l4": "",
    "desc": "Support to change policy beneficial owner after policy issuance",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_104",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Disbursement Method",
    "l4": "",
    "desc": "Change payment/disbursement method and maintain account information. Supported payment methods according to code table configuration, such as cash, credit card, direct card, etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_105",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Discount Type",
    "l4": "",
    "desc": "Support to change the policy level discount type, e.g. to remove staff discount, or to add a new faimly discount indicator on policy. System will calculate premium based on discount type accordingly",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_106",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Term",
    "l4": "",
    "desc": "Support to change product's coverage term and premium term. System will recalculate premium based on updated term information automatically",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_107",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Trustee",
    "l4": "",
    "desc": "Change trustee, including adding trustees, deleting trustees, and changing trustee information.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_108",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change HPS Examption Information",
    "l4": "",
    "desc": "Customer may apply to be exempted from the Home Protection Scheme (HPS) if his/her private insurance coverage is enough to cover outstanding housing loan against death, terminal illness (TI) and total permanent disability (TPD). System support to maintain this indicator for downstream integration/report purpose.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_109",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Indexation Information",
    "l4": "",
    "desc": "For product with indexation feature, support to change the indexation indicator. System will perform indexation automatically according to the indcator.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_110",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Survival Benefit or Cash Bonus Option",
    "l4": "",
    "desc": "Change Survival Benefit or Cash Bonus Option, including change disbursement method if the CB/SB option is to pay out.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": true,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_111",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Change Payer",
    "l4": "",
    "desc": "Change payer, including adding a payer, deleting a payer, and changing payer information.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_112",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Ad hoc Switch Fund",
    "l4": "",
    "desc": "Switch by amount, unit, or percentage from an existing funds to other funds.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_113",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Change Investment Regular Prem",
    "l4": "",
    "desc": "Perform an increase or decrease in the regular investment premium payment. In case of increase, a new stream will be created for increased amount and allocation charge rate will based on the policy year of the newly added stream.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_114",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Change Regular Premium Apportionment",
    "l4": "",
    "desc": "Change the fund apportionment of investment premium. Including adding a new fund, deleting existing fund(s), and change the premium apportionment in each fund.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_115",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Decrease Sum Assured",
    "l4": "",
    "desc": "Decrease the sum assured of main benefit or unit deduction rider for an ILP policy. New SA will take effective from next charge due date.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_116",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Full Surrender",
    "l4": "",
    "desc": "Perform full surrender for an ILP policy. All units will be sold and surrender charge will be calculated according to product formula.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_117",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Increase Sum Assured",
    "l4": "",
    "desc": "Increase the sum assured of main benefit or unit deduction rider for an ILP policy. New SA will take effective from next charge due date.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_118",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Partial Withdraw",
    "l4": "",
    "desc": "Perform ILP partial withdrawal by unit or by value. Partial withdrawal charge will be calculated according to configured product formula.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_119",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Set or Change Recurring Top-Up",
    "l4": "",
    "desc": "Increase, decrease or set the recurring top-up premiums for an ILP policy. New recurring top up will take effective from next premium due date. The recurrong top up frequency can be different from regular premium.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_120",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Set or Cancel Premium Holiday",
    "l4": "",
    "desc": "Support to set premium holiday indicator and maintain premium holiday start date and end date for ILP policy",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_121",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Set or Change Regular Withdrawal Plan",
    "l4": "",
    "desc": "Support to set or change regular withdrawal plan for ILP policy. System will perform auto partial withdrawal according to the plan.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_122",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "ILP Single Premium Top-Up",
    "l4": "",
    "desc": "Process single premium top-up request made by the policyholder. Single top up can be made to existing funds or new funds.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_123",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Perform Reduced Paid Up",
    "l4": "",
    "desc": "Support to perform reduced paid up for eligible policies.",
    "comments": "Newly added in v25.04",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_124",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Policy Suspension",
    "l4": "",
    "desc": "Policy suspension is a transaction item which is used for user to manually suspend the policy without the need to change any policy information.",
    "comments": "Newly added in v25.04",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_125",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Premium Adjustment",
    "l4": "",
    "desc": "Premium adjustment is a transaction item which is used to manually adjust the system calculated premium amount.",
    "comments": "Newly added in v25.04",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_126",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Reversionary Bonus Surrender",
    "l4": "",
    "desc": "Support to perform reversionary bonus surrender per customer's request. System will recalculate RB automatically.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": true,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_127",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Transfer of Coverage",
    "l4": "",
    "desc": "Support to transfer coverage to a new life assured with option to keep SA unchanged or keep premium unchanged",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_128",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "CS Alteration",
    "l3": "Underwriting Review",
    "l4": "",
    "desc": "Support to trigger underwriting review without change policy information. User may modify loading, exclusion, or condition during underwriting review",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_129",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Watch List",
    "l3": "Task pool",
    "l4": "",
    "desc": "Function for operation department's admin user to view and monitor all outstanding tasks. Support both fuzzy search and precise search.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_130",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Watch List",
    "l3": "Task Release",
    "l4": "",
    "desc": "Support release tasks which is already claimed by a certain user.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_131",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Watch List",
    "l3": "Task Reassign",
    "l4": "",
    "desc": "Support to reassign tasks by 2 strategy: Push it to a specific user who has the authority of the workflow and accessible organization; Auto reassign it to a certain user according to pre-defined auto assignment strategy.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_132",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "HPS Exemption File Upload",
    "l3": "",
    "l4": "",
    "desc": "Support to upload GDEC file from CPF board into core system to update the HPS indicator for each policy.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_133",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "HPS Exemption File Download",
    "l3": "",
    "l4": "",
    "desc": "Support to select the transaction period to download the cases meet the criteria for the certain period, the end date can’t be earlier than start date and both two dates can’t be a future date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_134",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Policy Servicing Quotation",
    "l3": "",
    "l4": "",
    "desc": "Perform reinstatement quotation",
    "comments": "",
    "lobs": {
      "term": false,
      "life": true,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_135",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Query",
    "l3": "Query Pool",
    "l4": "",
    "desc": "Query CS application cases created by both manual submission and e-submission. Support both fuzzy search and precise search. User can query detail data of each application which is a snapshot of the application data.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_136",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Maintain Customer",
    "l3": "",
    "l4": "",
    "desc": "Query existing individual/company customers. Support both fuzzy search and precise search. Add new individual/company customers.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_137",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Maintain Customer",
    "l3": "Individual customer",
    "l4": "",
    "desc": "Maintain individual customer information, including basic information, identifier information, occupation&income information, tax information, contact information, etc.",
    "comments": "Upgrade function in v25.04",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_138",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Maintain Customer",
    "l3": "Company customer",
    "l4": "",
    "desc": "Maintain company customer information, including basic information, representative information, contact information, etc. Support to connect company customer with individuals, so that when perform AML checking for the company customer, the connected individual can be screened together.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_139",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Reverse Policy Transaction",
    "l3": "",
    "l4": "",
    "desc": "Reverse both online and batch transaction for some reason. All data will be rollback with reversed GL posting. All history data will be kept.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_140",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Adjust Unit",
    "l3": "",
    "l4": "",
    "desc": "Adjust unit of the funds for ILP policies.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_141",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Adjust Maturity",
    "l3": "",
    "l4": "",
    "desc": "After maturity benefit extraction but before perform maturity payment, user can adjust the amount to revise the net maturity amount in Pre-Maturity Notice and Maturity payment calculation",
    "comments": "",
    "lobs": {
      "term": false,
      "life": true,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_142",
    "app": "CS APP",
    "l1": "Customer Service",
    "l2": "Configuration",
    "l3": "Authority",
    "l4": "",
    "desc": "Configure authority for CS items access, data entry, and freelook permission.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_143",
    "app": "NB APP",
    "l1": "Customer Service",
    "l2": "Configuration",
    "l3": "Workflow Configuration",
    "l4": "",
    "desc": "Policy service workflow configuration for STP and non-STP flow and task assignment strategy configuration",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_144",
    "app": "NB APP",
    "l1": "Customer Service",
    "l2": "Configuration",
    "l3": "Rule Configuration",
    "l4": "",
    "desc": "CS operation rules configurations are used by CS",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_145",
    "app": "NB APP",
    "l1": "Customer Service",
    "l2": "Configuration",
    "l3": "General Configuration",
    "l4": "",
    "desc": "Other general configuration needed for CS, such as pending reason, termination reason etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_146",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Registration",
    "l3": "Claim Life Assured/Policy Search",
    "l4": "",
    "desc": "Search and select the correct insured/policy to initiate a claim. Retrieves the life‑assured profile and all associated policies via PA integration to ensure proper case linkage.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_147",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Registration",
    "l3": "Eligible claim types selection",
    "l4": "",
    "desc": "Derive eligible claim types after the insured is selected and display applicable policies under each type to guide compliant claim initiation.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_148",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Registration",
    "l3": "Claim Basic Information Entry",
    "l4": "Claim Information\nDiagnosis Information\nInformant Information",
    "desc": "Capture end‑to‑end intake data: event details, claim type(s), case classification (new vs. continuation), and clinical coding (ICD/free text), together with informant details (search or create). Supports multi‑type submission across Life/Health lines (Death, TPD, CI, Medical, Waiver, Disability, LTC).",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_149",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Registration",
    "l3": "Claim Basic Information Entry",
    "l4": "Caregiver Information\nDependant Information",
    "desc": "Record Caregiver and Dependant party roles specific to LTC claims to support eligibility assessment and downstream disbursement controls.",
    "comments": "Enhanced in Income CRP LTC R2 phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_150",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Registration",
    "l3": "Pend at Registration",
    "l4": "",
    "desc": "Save a pended registration to auto‑generate the Registration No. and Case No., then access and maintain the document checklist for evidence tracking.",
    "comments": "Enhanced in Income CRP LTC R2 phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_151",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Registration",
    "l3": "Reject Registration",
    "l4": "",
    "desc": "Reject a claim at registration with reason capture and letter triggering; the case will not progress to Acceptance.",
    "comments": "Enhanced in Income CRP LTC R4 phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_152",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Work List Pool",
    "l4": "",
    "desc": "Centralized, permission‑controlled queue consolidating claim tasks across Registration, Acceptance, Evaluation, Approval，Escalation Reply and Disbursing/Withholding, with advanced/fuzzy search for oversight and load balancing.",
    "comments": "Disbursing/Withholding is enhanced in Income CRP LTC",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_153",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Work List Pool",
    "l4": "",
    "desc": "Centralized, permission‑controlled queue consolidating claim tasks across Ongoing Claim and Recovery with advanced/fuzzy search for oversight and load balancing.",
    "comments": "Enhanced in Income CRP LTC R4 phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_154",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Acceptance",
    "l4": "Claim Basic Information View, Edit and Input\n- Claim Information\n- Diagnosis Information\n- Informant Information\n- Additional Information\n- Additional Claim Roles",
    "desc": "Review and enrich intake data during Acceptance. Capture/maintain clinical and causation attributes (e.g., ICD, accident code, dread disease code, cancer stage)  driven by claim-type configuration and additional claim roles.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_155",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Acceptance",
    "l4": "Claim Basic Information View, Edit and Input\n- Caregiver Information\n- Dependant Information\n- ADL Information\n- ELS Register Query",
    "desc": "For SG LTC claims, integrate with CDD to retrieve/update ADL assessments and query ELS (via Medinet) for coverage verification. Users may view, add, or edit ADL records as required.",
    "comments": "Enhanced in Income CRP LTC R2 phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_156",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Acceptance",
    "l4": "Claim Issue",
    "desc": "Run data validations across claim, policy and documents; surface Acceptance Issues for remediation and route to requirement letters, investigation, or accept.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_157",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Acceptance",
    "l4": "Case Level Initial Decision Making",
    "desc": "Make case‑level preliminary decisions (Accept, Pend, Reject, Withdrawn) with mandatory reasons for adverse outcomes. For ILP Death claims, capture Price Effective Date for unit liquidation.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_158",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Acceptance",
    "l4": "Policy Level Initial Decision Making",
    "desc": "Make policy‑level decisions across all policies under the insured. Apply configuration‑driven policy freeze by claim type (overrideable) and derive policy disposition from product‑level results.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_159",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Acceptance",
    "l4": "Product Level Initial Decision Making",
    "desc": "Adjudicate at product level using pre‑configured rules; block acceptance with explicit failure reasons or accept and auto‑compute claim reserves per product formula.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_160",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Acceptance",
    "l4": "Policy level payee",
    "desc": "Default payee determination (policyholder for non‑death; beneficiary split by allocation for death) with full override to ensure compliant disbursement party selection.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_161",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Case Basic Information",
    "desc": "Provide a consolidated case worksheet of intake/acceptance data to set context for assessment and decisioning.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_162",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Life Assured Information",
    "desc": "Present the life‑assured profile including medical conditions, underwriting history and prior claims to support liability/causation analysis.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_163",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Poicy/Product Level",
    "desc": "Summarize policy/product information—status, inception, servicing agent, debts, exclusions and risk‑relevant endorsements—with ability to reload latest policy data for current‑state adjudication.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_164",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Assessment Information & Disbursement Plan",
    "desc": "Provide a manager‑ready summary of amounts, product‑level decisions, disbursement plan and the status of key actions (requirements, investigations) to streamline approval.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_165",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Diagnosis Information",
    "desc": "Display clinical coding and diagnosis details captured during intake/acceptance for continuous clinical context and traceability.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_166",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Comment History",
    "desc": "Show a chronological audit of comments (user, timestamp, content) across the case lifecycle for transparent collaboration.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_167",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Review Schedule",
    "desc": "View and maintain LTC follow‑up schedules (periodic, survivorship, ad‑hoc) that govern ongoing entitlement and payment continuity.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_168",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - ADL Information",
    "desc": "View, edit and track the history of ADL assessments for LTC eligibility and continued payment qualification.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_169",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - ELS Register Query",
    "desc": "Integrate with SG Medinet to present ELS basic and supplement plan details for LTC coverage verification.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_170",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Worksheet - Free Text for Letter",
    "desc": "Capture free‑text narrative for inclusion in outcome/settlement letters to ensure clear customer communication.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_171",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Issues",
    "desc": "Execute assessment‑stage validations and present Claim Issues for resolution; route to requirements, investigation/escalation, underwriting referral or proceed to decision.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_172",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Liability Level",
    "desc": "Perform liability‑level assessment: import factors (incl. medical bills), compute base entitlement and final payable via configured formulas and historical balances, with review/override controls.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_173",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Adjustment",
    "desc": "Apply product‑level adjustments (medical fees, deductions, RB/CB/SB, terminal bonus). Support auto‑calculation, overrides and manual entries to finalize net entitlement.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_174",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision Making",
    "desc": "Manually/Auto make product‑level decisions (Admit/Reject/Cancel/Withdrawn/Ex‑gratia) with configuration‑driven defaults (e.g., post‑settlement product termination) and user overrides.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_175",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision - Admit",
    "desc": "On Admit, capture product disposition: status, termination (defaulted by configuration with editable termination date) and waiver parameters (enable premium waiver with editable start/end).\nAuto decision making if it does not hit rejection rules.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_176",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision - Reject",
    "desc": "On Reject, capture standardized reason, keep product in‑force by default (overrideable) and set product payment to 0.\nAuto decision making if it hits rejection rules.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_177",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision - Cancel",
    "desc": "On Cancel, record reason, default to keep product in‑force (overrideable) and set product payment to 0.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_178",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision - Ex-gratia-Full",
    "desc": "Grant ex‑gratia (full) payment at product level with auditability and downstream disbursement handling.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_179",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision - Ex-gratia-Partial",
    "desc": "Grant ex‑gratia (partial) payment at product level, including proportional allocation in the disbursement plan.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_180",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision - Withdrawn",
    "desc": "On Withdrawn, capture standardized reason, default to keep product in‑force (overrideable) and set product payment to 0.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_181",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Product Level - Decision - Denied&Rescind with refund",
    "desc": "Handle Denied & Rescind with refund: capture reason, default product termination and process refunds by product type (traditional: total premiums paid; ILP: account value at system date plus charges).",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_182",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Assessment - Policy Level - Adjustment",
    "desc": "Manage policy‑level adjustments for claw‑backs (outstanding premium, APL/loan balances, charges, debts) and refunds (suspense, APA, premiums, charges); auto‑calculate with overrides.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_183",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Disbursement Plan Summary",
    "desc": "Summarize policy‑level disbursement and adjustments with drill‑down to product/liability breakdown to validate allocation integrity.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_184",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Disbursement Plan Input - Lump Sum",
    "desc": "Build lump‑sum disbursement plans: default payees, capture payment method and allocate amounts per payee.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_185",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Disbursement Plan Input - Installment",
    "desc": "Configure instalment‑based disbursement plans: default payees and capture payment method, schedule parameters and instalment breakdown.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_186",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Approval",
    "l4": "",
    "desc": "Supports approving and sending tasks (evaluation, ongoing claim, change disbursement plan, or abandon claim recovery) back to rework, either manually or automatically.",
    "comments": "Enhanced in Income CRP LTC R4 phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_187",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Issues - Underwriting",
    "desc": "Refer accepted policies to underwriting for re‑underwriting comments; resume assessment upon reply with a complete audit trail.",
    "comments": "New Function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_188",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Evaluation",
    "l4": "Claim Issues - Escalation/Investigation Request Raising",
    "desc": "Raise escalation/investigation requests at Acceptance/Evaluation with full history tracking for governance and SLA control.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_189",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Escalation Reply",
    "l4": "Escalation/Investigation Request Reply",
    "desc": "Process escalation/investigation replies: reviewers document findings and return the case to the originating stage for continued processing.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_190",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Ongoing Claim",
    "l4": "",
    "desc": "Manage periodic reviews, survivorship checks, and disbursement plan changes for long-term care (LTC) ongoing claims.",
    "comments": "Enhanced in Income CRP LTC R4 phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_191",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Disbursing/Withholding Claim",
    "l4": "",
    "desc": "Administer pending/unpaid disbursements: update payee/payment details, adjust instalment plans and validate before final settlement.",
    "comments": "Enhanced in Income CRP LTC R4 phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_192",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Recovery",
    "l4": "",
    "desc": "Track recoveries triggered by ongoing‑claim events (e.g., get well or death) with controls to abandon or write‑off where justified.",
    "comments": "Enhanced in Income CRP LTC R4 phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_193",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "Accept Policy",
    "desc": "Control policy acceptance within Evaluation, including reserve updates and acceptance/reversal with full financial impact traceability.",
    "comments": "Enhanced in claim UI upgrade",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_194",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "Document Checklist",
    "desc": "Maintain document checklists (required, additional, provider) with status tracking and edit access across Registration, Acceptance, Evaluation and ongoing claim;\nAbility to auto add document into checklist upon case update.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_195",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "Image",
    "desc": "Manage claim documents and images across all stages with DMS integration for storage, retrieval and preview;\nAuto process (update submission date and pending reason) triggered upon document submssion.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_196",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Claim Issues",
    "l4": "Requirement Letter",
    "desc": "Generate and manage requirement letters to customers or medical institutions; track status and responses within the case.\nAutomatically generate a reminder schedule based on configuration, and send reminders accordingly.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_197",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "Medical Bill",
    "desc": "Capture inpatient/outpatient medical bills linked to liabilities via product configuration; auto‑compute totals and claimable amounts. Editable in Acceptance/Evaluation, read‑only at Approval.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_198",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "Edit Case Info",
    "desc": "Edit case details post‑intake (excluding claim type) using the Acceptance UI to preserve consistency.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_199",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "Outcome letter",
    "desc": "Preview outcome/settlement letters, add customer comments or suppress generation based on business rules.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_200",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "History",
    "desc": "Provide a transaction history dashboard including workflow steps, policy reloads, letters, changes on payment details and other milestones for audit clarity.\nProvide visibility of approval rejections (who/when/why) to inform rework;",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_201",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Actions & Supporting",
    "l4": "Claim Customers",
    "desc": "Automatically screen customer grade, occupation, and high-risk status for claim party roles (e.g., informant, policyholder, life assured, caregiver, beneficiary, payee) based on configuration.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_202",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Work List",
    "l3": "Other Supporting Functions",
    "l4": "",
    "desc": "Enable collaboration and automation: full comment history, e‑claims API intake, and straight‑through processing via auto‑acceptance/evaluation/approval where rules are met.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_203",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Watch List",
    "l3": "Task pool",
    "l4": "",
    "desc": "Operations watch list for global monitoring of outstanding claim tasks with fuzzy/advanced search and real‑time status visibility.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_204",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Watch List",
    "l3": "Task Reassign",
    "l4": "",
    "desc": "Manually reassign tasks or update priority assignees within authority and organizational boundaries; integrates with auto round‑robin logic.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_205",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "CDD Query",
    "l3": "",
    "l4": "",
    "desc": "Query ADL records via SG CDD by NRIC/Policy No. to support disability severity determination for LTC adjudication.",
    "comments": "Enhanced in Income CRP LTC R2 phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_206",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Change Disbursement Plan",
    "l3": "",
    "l4": "",
    "desc": "Amend disbursement plans for unpaid amounts post‑approval—release pending payments, update payee/payment details—and retain a complete audit trail.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_207",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Cancel Case",
    "l3": "",
    "l4": "",
    "desc": "Cancel cases prior to settlement with workflow rollback and financial impact checks per configuration.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_208",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Reverse Case",
    "l3": "",
    "l4": "",
    "desc": "Reverse settled cases subject to eligibility (e.g., unpaid payments, no terminated products), consistently reversing fees, payments and accumulated claim amounts.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_209",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Query",
    "l3": "",
    "l4": "",
    "desc": "Comprehensive claim case query (manual and e‑submission) with fuzzy/advanced filters and point‑in‑time snapshots for auditability.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_210",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Copy Case",
    "l3": "",
    "l4": "",
    "desc": "Clone existing cases into Acceptance or Evaluation, with options to copy documents and medical bills to accelerate processing.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_211",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Add Insured for Claim",
    "l3": "",
    "l4": "",
    "desc": "Add or edit additional insureds (e.g., free child cover/newborn) and attach them to existing benefits for eligibility and processing.",
    "comments": "New function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_212",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Medical Billing",
    "l3": "Create Medical Billing",
    "l4": "",
    "desc": "Allow users to search for claim information and submit medical billing details, which the system validates and processes to create payable and payment records.",
    "comments": "New function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_213",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Medical Billing",
    "l3": "Medical Billing Records",
    "l4": "",
    "desc": "Enable users to search, view, and cancel existing medical billing records for claims, with cancellation reversing the related payable and payment records",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_214",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Configuration",
    "l3": "Authority",
    "l4": "",
    "desc": "Maintain claims authority and controls—workflow permissions, case classifications and approval limits—to enforce delegated authority.",
    "comments": "New function in v2025",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_215",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Configuration",
    "l3": "Workflow",
    "l4": "",
    "desc": "Administer claims workflow and task assignment rules (queues, stages, assignment strategies) to optimize throughput and governance.",
    "comments": "New function in v2025",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_216",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Configuration",
    "l3": "Rule Validations",
    "l4": "",
    "desc": "Configure validation rules executed at intake, acceptance, evaluation and approval to ensure quality and compliance.",
    "comments": "New function in v2025",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_217",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Configuration",
    "l3": "General Configurations",
    "l4": "",
    "desc": "Maintain claims reference data and parameters (dropdown lists, options and screen behaviors) that drive calculation logic and UI rendering.",
    "comments": "New function in v2025",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_218",
    "app": "CLM APP",
    "l1": "Claims",
    "l2": "Download CPF Submission File",
    "l3": "",
    "l4": "",
    "desc": "The function generates a CPF‑Board‑compliant file containing claim payment records made via the CPFB method, enabling insurers in Singapore to submit these payments directly to the Central Provident Fund Board for processing.",
    "comments": "New function in v2024",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": true,
      "ltc": false
    }
  },
  {
    "id": "F_219",
    "app": "COMMON",
    "l1": "ELS",
    "l2": "ELS Register Query",
    "l3": "",
    "l4": "",
    "desc": "Query ElderShield / CareShield Life (ELS) coverage information from Medinet, including basic and supplement plan details, to verify policy eligibility and claim entitlement.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_220",
    "app": "COMMON",
    "l1": "ELS",
    "l2": "ELS Medinet File",
    "l3": "",
    "l4": "",
    "desc": "View synchronized ELS data from Medinet—such as plan activation, termination, reinstatement and claim‑related updates—to ensure alignment with national ELS records.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_221",
    "app": "COMMON",
    "l1": "ELS",
    "l2": "ELS Register Update",
    "l3": "Query",
    "l4": "",
    "desc": "Review all ELS update submissions from NB/CS/Claim modules, with visibility of update type and Medinet response status (Pending / Success / Fail) for operational tracking.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_222",
    "app": "COMMON",
    "l1": "ELS",
    "l2": "ELS Register Update",
    "l3": "Follow up",
    "l4": "",
    "desc": "Handle ELS update exceptions returned by Medinet by correcting customer/policy data and resubmitting to maintain accurate ELS supplement records.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_223",
    "app": "COMMON",
    "l1": "ELS",
    "l2": "ELS Register Update",
    "l3": "Watch List",
    "l4": "",
    "desc": "Monitor outstanding ELS update follow‑up tasks across teams, with options to reassign items and ensure timely resolution of Medinet exceptions.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_224",
    "app": "COMMON",
    "l1": "ELS",
    "l2": "Active Member Reconciliation",
    "l3": "",
    "l4": "",
    "desc": "Reconcile insurer ELS supplement policy data with CPF Board / Medinet monthly Active Member records, identify unmatched entries, and perform corrections to maintain data consistency.",
    "comments": "Enhanced in Income CRP LTC phase",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_225",
    "app": "COMMON",
    "l1": "Investment",
    "l2": "Fund Price",
    "l3": "Entry",
    "l4": "",
    "desc": "Query and maintain fund price.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_226",
    "app": "COMMON",
    "l1": "Investment",
    "l2": "Fund Price",
    "l3": "Approve",
    "l4": "",
    "desc": "Approve fund price. \nScheduled batch to confirm fund price after approved.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_227",
    "app": "COMMON",
    "l1": "Investment",
    "l2": "Fund Price",
    "l3": "Revise",
    "l4": "",
    "desc": "Revise fund price after approved or confirmed",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_228",
    "app": "COMMON",
    "l1": "Investment",
    "l2": "Exchange Rate",
    "l3": "",
    "l4": "",
    "desc": "Configure exchange rate for multi-currency operation.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_229",
    "app": "COMMON",
    "l1": "Investment",
    "l2": "Fund Holiday",
    "l3": "",
    "l4": "",
    "desc": "Set fund holidays.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_230",
    "app": "COMMON",
    "l1": "Maintain Hospital",
    "l2": "",
    "l3": "",
    "l4": "",
    "desc": "Maintain a comprehensive provider directory, including details for hospitals and clinics. This directory stores basic, representative, contact, bank, tax, and bankruptcy information, as well as fee schedules and associated doctors.\n\nIt supports key processes:\nUnderwriting & Claims retrieve providers to generate medical report applications.\nMedical Claims capture the treating hospital for the life assured's incident.",
    "comments": "New function in v2025",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_231",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Manage Policy Document",
    "l3": "Print Policy Document",
    "l4": "",
    "desc": "Print policy document/certificate, system will auto send policy document/certificate to pre-configured printer.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_232",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Manage Policy Document",
    "l3": "Reprint Policy Document",
    "l4": "",
    "desc": "Reprint policy document/certificate with original policy data when policy issued. Also support regenerate policy document/certificate when latest policy data. System will auto send policy document/certificate to pre-configured printer.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_233",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Manage Policy Document",
    "l3": "Query Policy Document",
    "l4": "",
    "desc": "Query policy document/certificate. User can preview policy document/certificate in PDF by this function.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_234",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Manage Letters",
    "l3": "Print Letter",
    "l4": "",
    "desc": "Print query letter, system will auto send letter to pre-configured printer.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_235",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Manage Letters",
    "l3": "Reprint Letter",
    "l4": "",
    "desc": "Reprint letter, system will auto send letter to pre-configured printer.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_236",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Manage Letters",
    "l3": "Reply Letter",
    "l4": "",
    "desc": "Reply letter",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_237",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Manage Letters",
    "l3": "Query Letter",
    "l4": "",
    "desc": "Query letter. User can preview letter in PDF by this function.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_238",
    "app": "COMMON",
    "l1": "Document",
    "l2": "Adhoc Letter Generation",
    "l3": "",
    "l4": "",
    "desc": "Function to backend staff to adoc trigger a pre-defined letter for specific policy.",
    "comments": "New function in v2023",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_239",
    "app": "COMMON",
    "l1": "Reports",
    "l2": "Download",
    "l3": "",
    "l4": "",
    "desc": "Download reports of selected parameters in excel or PDF format.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_240",
    "app": "COMMON",
    "l1": "Reports",
    "l2": "Configuration",
    "l3": "",
    "l4": "",
    "desc": "Configure reports, including downloading/uploading template, maintaining template basic information, and maintaining report parameters.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_241",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Search Homepage",
    "l4": "",
    "desc": "Support advanced search criteria including policy no., proposal no., customer name, etc.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_242",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Policy Information",
    "l4": "",
    "desc": "It's a glance of policy information, including basic information, policy date info, policy status, and other key info.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_243",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Customer Information",
    "l4": "Policy Role Customer List",
    "desc": "Display customer information with hyperlink which links to customer query page, including policy holder information, life assured information, nominee/beneficiary information, trustee, etc.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_244",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Customer Information",
    "l4": "Customer Detail Information",
    "desc": "Link to customer query page to show customer detail information.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_245",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Financial Information",
    "l4": "",
    "desc": "Display policy financial information, including billing related financial information, suspense information, policy value information, etc.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_246",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Financial Information",
    "l4": "Outstanding Billing Information",
    "desc": "Dispay outstanding biling records with detail information, including billing date, billing amount and collection method.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_247",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Financial Information",
    "l4": "Outstanding Payment Information",
    "desc": "Dispay outstanding payment records with detaill information, including payment date, amount and payment method.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_248",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Financial Information",
    "l4": "Loan Account List",
    "desc": "Display loan information with original principle, latest principle balance, interest balance, create date, latest capitalization date etc. With links to the page showing detail transaction record of the loan and deposit accounts.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_249",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Financial Information",
    "l4": "Deposit Account List",
    "desc": "Display deposit information with original principle, latest principle balance, interest balance, create date, latest capitalization date etc. With links to the page showing detail transaction record of the loan and deposit accounts.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_250",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Product Information",
    "l4": "Benefit List",
    "desc": "Display all products of the policy and key product information, including life assured, sum assured, benefit status etc.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_251",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Product Information",
    "l4": "Detail Benefit Information",
    "desc": "Displays product detail information including cover start date, cover end date, payment frequency, etc., and extra premium, SA schedule and indexation segment info.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_252",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Investment Information",
    "l4": "",
    "desc": "Displays investment information including product level investment account record, policy virtual account record, pending and occurred fund transaction records, etc. Investment related bonus allocation information and regular withdraw plan.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_253",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Benefits and Bonus Information",
    "l4": "Survival Benefit Information",
    "desc": "Show survival benefit allocation plan and allocation history",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_254",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Benefits and Bonus Information",
    "l4": "Annuity Information",
    "desc": "Show annuity allocation plan and allocation history",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_255",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Benefits and Bonus Information",
    "l4": "Bonus Information",
    "desc": "Show bonus allocation plan and allocation history for cash bonus, reversionary bonus, loyalty bonus is applicable.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_256",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Transaction Information",
    "l4": "",
    "desc": "Show all transaction of the policy including NB, online CS, batch, claim transactions.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_257",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Transaction Fee Records",
    "l4": "Policy Collection and Payment Information",
    "desc": "Show all policy collection and payment transactions.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_258",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Transaction Fee Records",
    "l4": "Policy Receivable and Payable Information",
    "desc": "Show all policy transaction's receivable and payment fee records including renew billing records.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_259",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "UW History",
    "l4": "",
    "desc": "Displays all NB/CS underwriting history records at product level, including extra premium, restrict SA, exclusion, endorsement and conditions.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_260",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Claim History",
    "l4": "",
    "desc": "Displays all claim case history records with key information and links to query detail claim information. And payment detail information if the payment status is unpaid or partial paid.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_261",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Documents",
    "l4": "",
    "desc": "Displays all the correspondence document records generated in NB, UW, CS and claim. Provide view and download function.",
    "comments": "Upgrade function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_262",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "Comments",
    "l4": "",
    "desc": "Function to query and maintain comments linked to policies from different departments.",
    "comments": "New function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_263",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query",
    "l3": "New CS/Claim",
    "l4": "",
    "desc": "Enables users to quickly create CS/Claims applications for the policy",
    "comments": "New function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_264",
    "app": "COMMON",
    "l1": "Query",
    "l2": "Global Policy Query UI Configuration",
    "l3": "Global Policy Query Rendering",
    "l4": "",
    "desc": "Function to maintain and configure Global Policy Query UI",
    "comments": "New function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_265",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Manual Suspend and Unsuspend Extraction",
    "l3": "",
    "l4": "",
    "desc": "Manual suspend or unsuspsend bank transfer.",
    "comments": "Deleted in new FN Workbench",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_266",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Billing Query",
    "l3": "",
    "l4": "",
    "desc": "Query NB/CS/Renew billing record, with a link to query ARAP and  suspense balances.",
    "comments": "New function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_267",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Configuration",
    "l3": "Fee Type",
    "l4": "",
    "desc": "To configure Fee Type List.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_268",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Configuration",
    "l3": "Payment Method",
    "l4": "",
    "desc": "To configure Payment Method.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_269",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Configuration",
    "l3": "Premium Notice",
    "l4": "",
    "desc": "To configure Premium Notice and Remider Notice's schedule.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_270",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Configuration",
    "l3": "General Configuration",
    "l4": "",
    "desc": "General Configuration including GIRO Deduction Schedule, Attempt to Deduction, etc.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_271",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Change Billing Details",
    "l3": "",
    "l4": "",
    "desc": "To support billing level payment method update based on customer requests",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_272",
    "app": "FIN APP",
    "l1": "Billing",
    "l2": "Renew Extraction Failure",
    "l3": "Exceptions",
    "l4": "",
    "desc": "Query policies that were extracted for renewal but encountered failures or exceptions",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_273",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Manual Collection",
    "l3": "",
    "l4": "",
    "desc": "1.Support to create collection at policy level for NB, renew, CS as well as repay loan. All collection method defined at code table can be chosen at the screen. Additional information will be captured for specific pay mode, like cheque, debit card, credit card, etc. System will allocate collection to different purpose by rules, such as allocate to general suspense if the policy is a proposal, allocate to renew suspense if there is renew outstanding billing, allocate to CS suspense if there is outstanding CS billing, etc.\n2.To support write-off.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_274",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Collection Query",
    "l3": "",
    "l4": "",
    "desc": "Query collection record, with a link to query offset details page.",
    "comments": "New function in v2024",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_275",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Collection Reversal",
    "l3": "",
    "l4": "",
    "desc": "User can reverse collection by this function. If the collection isn't been used by transaction, user can reverse directly. If the collection is used by transaction, user need reverse transaction first.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_276",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Write Off Approval",
    "l3": "",
    "l4": "",
    "desc": "Support to perform write off approval and task reassignment.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_277",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Cancel Write Off",
    "l3": "",
    "l4": "",
    "desc": "Support to cancel the approved write off before the related business is inforce",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_278",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Manage IBG",
    "l3": "",
    "l4": "",
    "desc": "Support Manual GIRO Form/Link and unlink existing IBG.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_279",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Configuration",
    "l3": "Payment Method",
    "l4": "",
    "desc": "To configure Payment Method.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_280",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Configuration",
    "l3": "General Configuration",
    "l4": "",
    "desc": "General Configuration including GIRO Deduction Schedule, Attempt to Deduction, etc.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_281",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Batch Upload Collection",
    "l3": "",
    "l4": "",
    "desc": "Function to create collection in bulk.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_282",
    "app": "FIN APP",
    "l1": "Collection",
    "l2": "Transfer Suspense",
    "l3": "",
    "l4": "",
    "desc": "Transfer balance between different suspense accounts. Also support to transfer suspense from/ to suspense accounts to/ from Advance Premium Account (APA), Policy Loan, Automatic Premium Loan (APL) accounts.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_283",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Payment Requisition",
    "l3": "",
    "l4": "",
    "desc": "User can query out all payable records, suspense balance to create payment accordingly. User can also repay loan by this function to offset payable/suspense balance with outstanding loan amount. User will input disbursement method, system will generate payment records, finance user will continue the payment process. In addition, user can transfer payable to current or other policy's suspense account by this function.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_284",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Payment Authorization",
    "l3": "",
    "l4": "",
    "desc": "If the payment amount exceed user's limit authority at payment requisition, then this payment need be approved by user with higher authority. This function is designed for the higher authority user to approve these payments.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_285",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Medical Payment",
    "l3": "",
    "l4": "",
    "desc": "User can perform payment requisition for medical billing.",
    "comments": "Removed as the medical payment will be generated once medical billing is submitted.",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_286",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Manual Payment",
    "l3": "",
    "l4": "",
    "desc": "Perform manual payment for all modes' payment request except cheque.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_287",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Cancel Payment",
    "l3": "",
    "l4": "",
    "desc": "User can reverse payment by this function.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_288",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Cancel Payment Approval",
    "l3": "",
    "l4": "",
    "desc": "Maker-checker process for cancel payment",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_289",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Change Payment Details",
    "l3": "",
    "l4": "",
    "desc": "1.Change the payment's disbursement method or Disbursement Payee.\n2.Release unclaimed money.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_290",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Change Disbursement Payee Approval Work List",
    "l3": "",
    "l4": "",
    "desc": "UI for user to approve the Change Disbursement Payee request.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_291",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Payment Account Approval Work List",
    "l3": "",
    "l4": "",
    "desc": "UI for user to approval new DC Account.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_292",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Payment Query",
    "l3": "",
    "l4": "",
    "desc": "Query payment record, with a link to query offset details page.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_293",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Configration",
    "l3": "Payment Method",
    "l4": "",
    "desc": "To configure the available Disbursement Method.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_294",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Configration",
    "l3": "General Configuration",
    "l4": "",
    "desc": "To configure the auto-refund suspense's threshold and cap, payment attempts,suspend period to 2nd try for failure payment and etc.",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_295",
    "app": "FIN APP",
    "l1": "Payment",
    "l2": "Handling of Cheque",
    "l3": "",
    "l4": "",
    "desc": "To clear/outdate/stop the migrated unpresented cheque.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_296",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Bank",
    "l3": "Maintain Bank",
    "l4": "",
    "desc": "Maintain the 3rd party Bank information.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_297",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Bank",
    "l3": "Maintain Bank Account",
    "l4": "",
    "desc": "Link insurer's bank account to pay modes for collection and payment. Then system will have the trace that which collection go into which bank account; which payment go out from which bank account.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_298",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Bank",
    "l3": "Set up Bank Account Master",
    "l4": "",
    "desc": "Set up a insurer's bank account for collection and payment (i.e. cash bank), including creating, modifying, and disabling a bank account.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_299",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "BSR",
    "l3": "BS Balance Query_Account Level",
    "l4": "",
    "desc": "To capture a monthly snapshot balance and calculate aging for BS GL Accounts including suspense balance, overdue premium, outstanding payables, etc.",
    "comments": "New function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_300",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Authority",
    "l3": "BS",
    "l4": "",
    "desc": "To Configure the Authority for:\n1.Premium Refund Limit\n2.Medical Payment Limit \n3.Premium Write Off",
    "comments": "Upgrade function in v2026",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_301",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Accounting",
    "l3": "GL Posting Query",
    "l4": "",
    "desc": "Function for user to query GL transaction details.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_302",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Accounting",
    "l3": "Filter Configuration",
    "l4": "",
    "desc": "Maintain Filters, including adding, deleting, or modifying filters.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_303",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Accounting",
    "l3": "Segment Configuration",
    "l4": "",
    "desc": "Maintain Segments, including adding, deleting, or modifying segments.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_304",
    "app": "FIN APP",
    "l1": "Finance",
    "l2": "Accounting",
    "l3": "Set Accounting Rule",
    "l4": "",
    "desc": "Set up an accounting rule for all fee types, including creating, modifying, disabling, and enabling the accounting rule for GL posting.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_305",
    "app": "SC APP",
    "l1": "Sales Channel",
    "l2": "Maintain Agent",
    "l3": "",
    "l4": "",
    "desc": "Create or query individual or corporate producer basic information, contact information etc.",
    "comments": "Rebuild in v24.08 (replace SOR)",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_306",
    "app": "SC APP",
    "l1": "Sales Channel",
    "l2": "Channel Organization",
    "l3": "",
    "l4": "",
    "desc": "Set up channel organization  for different distribution channels.",
    "comments": "Rebuild in v24.08 (replace SOR)",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_307",
    "app": "SC APP",
    "l1": "Sales Channel",
    "l2": "Agent Qualification",
    "l3": "",
    "l4": "",
    "desc": "Maintain qualification for individual agents or corporate agents by manually input on UI or by uploading file.",
    "comments": "Rebuild in v24.08 (replace SOR)",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_308",
    "app": "SC APP",
    "l1": "Sales Channel",
    "l2": "Transfer Agent",
    "l3": "",
    "l4": "",
    "desc": "Batch transfer the policy's service agent from one agent to another agent.",
    "comments": "Rebuild in v24.08 (replace SOR)",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_309",
    "app": "SC APP",
    "l1": "Sales Channel",
    "l2": "Basic Commission Query",
    "l3": "",
    "l4": "",
    "desc": "Show all basic commission for all premium transaction at policy product level.",
    "comments": "Rebuild in v24.08 (replace SOR)",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_310",
    "app": "COMMON",
    "l1": "System Administration",
    "l2": "Clear Cache",
    "l3": "",
    "l4": "",
    "desc": "Clear local web cache.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_311",
    "app": "COMMON",
    "l1": "System Administration",
    "l2": "Set Business Date",
    "l3": "",
    "l4": "",
    "desc": "Set business date of the system at tenant level.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_312",
    "app": "COMMON",
    "l1": "System Administration",
    "l2": "Query Version",
    "l3": "",
    "l4": "",
    "desc": "Query version deployed to current ENV",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_313",
    "app": "COMMON",
    "l1": "URP",
    "l2": "Maintain Organization",
    "l3": "",
    "l4": "",
    "desc": "Maintain organization and their hierarchy in the system.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_314",
    "app": "COMMON",
    "l1": "URP",
    "l2": "Maintain User",
    "l3": "",
    "l4": "",
    "desc": "- Create a new user and maintain existing users;\n- Grant roles to an existing user.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_315",
    "app": "COMMON",
    "l1": "URP",
    "l2": "Role Management",
    "l3": "",
    "l4": "",
    "desc": "- Create a new role and maintain existing roles;\n- Grant corresponding permissions.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_316",
    "app": "COMMON",
    "l1": "URP",
    "l2": "Permission Management",
    "l3": "",
    "l4": "",
    "desc": "- Create new permission;\n- Create new menu and UI element;\n- Configure API authority;\n- Hide specific permission code;\n- Export & check in.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_317",
    "app": "RULE ENGINE",
    "l1": "Rule & Rating",
    "l2": "Rule management",
    "l3": "",
    "l4": "",
    "desc": "- Add a new rule; \n- Edit rule;\n- Search for rules based on various categories.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_318",
    "app": "RULE ENGINE",
    "l1": "Rule & Rating",
    "l2": "Rule group",
    "l3": "",
    "l4": "",
    "desc": "- Search rule group.\n- Create a new rule group \n- Edit or delete existing rule group\n- Select the name, description, and module of the rule group and bind the rule group to an event.\n- Select the rule to attach to the rule group and define the order of execution of multiple rules to be run together",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_319",
    "app": "RULE ENGINE",
    "l1": "Rule & Rating",
    "l2": "Rule Event",
    "l3": "",
    "l4": "",
    "desc": "- Create Driver\n- Create Event",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_320",
    "app": "RULE ENGINE",
    "l1": "Rule & Rating",
    "l2": "Rule Tracking",
    "l3": "",
    "l4": "",
    "desc": "View the details of the rule tracking after calling rule Api.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_321",
    "app": "COMMON",
    "l1": "Rule & Rating",
    "l2": "Configure table",
    "l3": "",
    "l4": "",
    "desc": "Configure dynamic logic table (Rate table, Decision Table, Mapping Table )\n- Rate table: table with multiple condition parameters  which will impact result of data related\n- Decision Table:   Decision result judged by business rules\n- Mapping Table:   mapping configure during internal and external integration",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_322",
    "app": "COMMON",
    "l1": "Data Dictionary",
    "l2": "Data Table",
    "l3": "",
    "l4": "",
    "desc": "Maintain code table's code values",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_323",
    "app": "COMMON",
    "l1": "Data Dictionary",
    "l2": "Code Table",
    "l3": "",
    "l4": "",
    "desc": "Maintain code tables",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_324",
    "app": "COMMON",
    "l1": "Translation",
    "l2": "UI Label",
    "l3": "",
    "l4": "",
    "desc": "Maintain UI label name",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_325",
    "app": "COMMON",
    "l1": "Translation",
    "l2": "Code Table",
    "l3": "",
    "l4": "",
    "desc": "Maintain code table's code values' description shown on screen",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_326",
    "app": "COMMON",
    "l1": "Public Setting",
    "l2": "Message",
    "l3": "",
    "l4": "",
    "desc": "Maintain message description",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_327",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Job Definition",
    "l3": "",
    "l4": "Batch Jobs",
    "desc": "- Define batch jobs. Maintain batch job information including name, type, execution frequency, etc. \n- View dependency graph for all batch.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_328",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Job Submit",
    "l3": "",
    "l4": "",
    "desc": "Manually submit ad-hoc or pre-schedule batch job.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_329",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Job Monitoring",
    "l3": "",
    "l4": "Batch Job",
    "desc": "Monitor batch job execution results. It displays status of pre-schedule or ad-hoc batch execution.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_330",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "NB",
    "l4": "Auto Withdraw the Proposal",
    "desc": "Auto withdraw proposals with conditions after a pre-defined period.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_331",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "NB",
    "l4": "NB Auto Inforce Job",
    "desc": "Batch to inforce policy.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_332",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "CS Auto Inforce Job",
    "desc": "Batch to inforce CS application.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_333",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "Cancel CS Application",
    "desc": "Auto cancel CS applications with conditions after a pre-defined period.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_334",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "Update Policy HPS Exemption Information",
    "desc": "Update the policy HPS exemption information according to uploaded file.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_335",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "CPF Projection Send Batch",
    "desc": "Extract the CPF projection request and generate the projection send file.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": true,
      "ltc": false
    }
  },
  {
    "id": "F_336",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "CPF Projection Return Batch",
    "desc": "Process the CPF projection return file",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": true,
      "ltc": false
    }
  },
  {
    "id": "F_337",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "CPF Termination File",
    "desc": "Process the CPF termination file",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": true,
      "ltc": false
    }
  },
  {
    "id": "F_338",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "CPF LTC Active Member File",
    "desc": "Batch job to generate the CPF LTC active member list files",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_339",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "ELS Query",
    "desc": "Batch job to call ELS Query API to query the basic eldershield policy information.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_340",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "ELS Update",
    "desc": "Extract ELS update records and call ELS update API to update the eldershield supplement policy information to Medinet.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_341",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "Auto Policy Termination",
    "desc": "Process policy termination according to third-party information (i.e CPF/Medinet/CRM)",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_342",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "CS",
    "l4": "Auto Perform CS Alteration",
    "desc": "Auto perform CS alteration according to  third-party information (i.e CPF/Medinet/CRM)",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": true
    }
  },
  {
    "id": "F_343",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Claim",
    "l4": "Generate Claim Installment Payment",
    "desc": "Generate claim payment according to claim installment schedule.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_344",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Extract Renew Billing",
    "desc": "Generate billing records with status=0-waiting for processing for traditional/ILP products x days before due date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_345",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Confirm Renew Billing",
    "desc": "Apply renew premium if premium paid.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_346",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Process Non-forfeiture (NFO) for Traditional Policy",
    "desc": "Perform normal lapse/APL lapse/Raise APL,auto paid up for traditional policy according to product configuration.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_347",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Auto Renew Renewable Policy",
    "desc": "Perform auto renewal for renewable policy x days before renewal due date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_348",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Generate Premium Notice",
    "desc": "Extract qualified policies to generate premium notice.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_349",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Generate Premium Reminder Notice",
    "desc": "Extract qualified policies to generate premium reminder notice.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_350",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Confirm Waived Renew Billing",
    "desc": "Renew Confirm for premium-waived product.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_351",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Auto Convert Payment Frequency",
    "desc": "This is the daily batch job to convert the rider's payment frequency automatically with the following conditions:\n1. premium status of main product is fully paid\n2. premium status of rider is regular\n3. new payment frequency  for this rider is pre-defined on Configuration Table: Auto_Convert_Payment_Frequency_Cfg\nAfter rider's payment frequency changed, system will\t recalculate the rider’s installment premium and outstanding premium based on new payment frequency",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_352",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Renew",
    "l4": "Recurring single top up premium extraction and confirm",
    "desc": "To apply the recurring single top up premium amount. The RSP (recurring single top up premium) plan due date will be moved to next after it is successful applied.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_353",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Bonus",
    "l4": "Allocate Cash Bonus (CB)",
    "desc": "Calculate and allocate cash bonus for qualified policy. Allocation schedule and calculation formula are configured at product. If CB option is pay out in cash, user can perform payment requisition to pay out cash bonus OR batch to auto pay out.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_354",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Bonus",
    "l4": "Allocate Survival Bonus (SB)",
    "desc": "Calculate and allocate survival benefits (i.e. cash benefits) for qualified policy. Allocation schedule and calculation formula are configured at product. If SB option is pay out in cash, user can perform payment requisition to pay out Survival Bonus OR batch to auto pay out.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_355",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Bonus",
    "l4": "Cancel CB SB Payment",
    "desc": "This is the daily batch job which processed to cancel cb sb opt1 payment records and inserts a new receivable record (Payment Method= Internal transfer) to transfer the CB/SB payable amount into CB/SB deposit balance, with the following conditions:\n1.\tThe CB/SB option of benefit is CB/SB Option1: To receive SB/CB by Pay Out\n2.\tCb sb opt1 Batch payment batch already run and payment records already generated.\n3.\tThe payment status of CB/SB Payment is not payment confirmed or bank transferring\n4.\tAuto cancellation batch process date= CB/SB Payment Generation Date + Auto Cancellation(Days) of CB/SB Payment\nNotes:\n ‘Auto Cancellation(Days) of CB/SB Payment’ is configured in Configuration Table: Batch_Advance_Days_Cfg. for example, for now Auto Cancellation(Days) is 30",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_356",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Bonus",
    "l4": "Allocate Reversionary Bonus (RB)",
    "desc": "Calculate and allocate reversionary  bonus for qualified policy. Allocation schedule and calculation formula are configured at product.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_357",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Bonus",
    "l4": "Generate SB/CB (Cash Out Option) Payment",
    "desc": "Generate CB and SB payment by batch for policies which CB/SB option 1 is pay out in cash.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_358",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Account",
    "l4": "Settle Loan Account Interest",
    "desc": "Calculate and generate loan interest for loan account, including policy loan and automatic policy loan according to pre-defined frequency, due date, interest calculation method, declared interest rate. Interest amount can be posted to GL.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_359",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Account",
    "l4": "Capitalize Loan Account Interest",
    "desc": "Capitalize loan account interest according to pre-defined frequency, due date interest amount calculated at Batch Loan Interest Settlement. The batch will update accounts information including next capitalization date, capitalized amount etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_360",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Account",
    "l4": "Settle Deposit Account Interest",
    "desc": "Calculate and generate deposit interest for deposit account, such as survival/cash benefit, cash bonus, reversionary bonus, loyalty bonus, advanced premium, annuity etc. according to pre-defined frequency, due date, interest calculation method, declared interest rate. Interest amount can be posted to GL. New deposit account type can be added in code table.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_361",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Account",
    "l4": "Capitalize Deposit Account Interest",
    "desc": "Capitalize deposit account interest according to pre-defined frequency, due date interest amount calculated at Batch Loan Interest Settlement. The batch will update accounts information including next capitalization date, capitalized amount etc.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_362",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Annuity",
    "l4": "Generate Annuity Installment Payable",
    "desc": "Extract annuity for qualified policy according to product configuration as well as annuity installment payment schedule customer chosen and generate all ARAP amount and annuity net payable amount. Calculation formula is configured at product.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_363",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Annuity",
    "l4": "Generate Annuity Instalment Notice",
    "desc": "Generate annuity notice x days before annuity installment due date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_364",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Annuity",
    "l4": "Generate Annuity Installment Payment",
    "desc": "Generate annuity payment by batch for policy with annuity payable amount.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_365",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Maturity",
    "l4": "Generate Maturity Payable",
    "desc": "Extract maturity for qualified policy and generate all ARAP amount and maturity net payable amount, terminate policy and product. Calculation formula is configured at product.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_366",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Maturity",
    "l4": "Generate Maturity Notice",
    "desc": "Generate maturity notice x days before maturity date.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_367",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Maturity",
    "l4": "Generate Maturity Payment",
    "desc": "Generate maturity payment by batch for policies with maturity payable amount.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_368",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "Maturity",
    "l4": "Auto Expiry Policy/Product without Maturity Benefit",
    "desc": "Extract qualified policies to perform auto expiry. The batch will update policy/product status to be termination with expiry reason.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_369",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Auto Set or Cancel Premium Holiday",
    "desc": "Daily batch job to auto set or cancel the premium holiday indicator for eligible ILP policy.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_370",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Confirm Fund Price",
    "desc": "Daily batch job to confirm the approved fund price which will be used in subsequent transactions.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_371",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Process Fund Transactions",
    "desc": "Pending fund transaction is applied after fund price is declared. Units of fund will be updated accordingly.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_372",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Process Charge Deductions",
    "desc": "Calculate and deduct the risk charge, policy fee, other admin fee etc. according to product charge definition. All calculation formula is configured at product. It also calculates Potential Lapse Date(PLD) if total invest value (TIV) is not enough to deduct charges.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_373",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Process Non-forfeiture (NFO) for ILP Policy",
    "desc": "Lapse universal life or variable life policy if batch date <= Potential Lapse Date(PLD).",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_374",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Process UL Interest Settlement",
    "desc": "Settle UL saving account interest after account interest is declared.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_375",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Process Regular Withdrawal",
    "desc": "This is the daily job that extract the policies to process scheduled regular withdrawal based on the following conditions:\n1. Policy Status is inforce and not forzen.\n2. There is an active regular withdraw plan on this policy and System Date>=Regular withdraw Due Date, and Regular withdraw amount<Total Account Value- Minimum Holding Amount-Pending selling transaction amount if any.\nAfter regular withdraw batch processed. system will generate the pending selling fund transaction.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_376",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Sell Units for Lapsed ILP Policy",
    "desc": "This is the daily batch jot that sell all units of ILP Lapsed Policy with the following confiditions:\n1. Policy status is lapsed and not frozen.\n2. Remaining TIV>0\n3.System date>= Lapse Date + Waiting Days After Lapse (Parameter on product configuration)\nSystem will generate pending selling fund transaction records to withdrawl remaining units.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_377",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP",
    "l4": "Fund Closure & Delist Batch",
    "desc": "When certain ILP fund is terminated, system will extract the related ILP policy and auto re-set its fund apportionment rates or transfer the fund value from the terminated fund to a new fund.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_378",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP Bonus",
    "l4": "Policy Maitenance Fee Refund Allocation",
    "desc": "This is one type of ILP bonus which will be allocated if the product has such feature.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_379",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP Bonus",
    "l4": "Power Up Bonus Allocation",
    "desc": "This is the daily batch jot that process to allocate Power-up bonus with the following conditions\n1, The policy is inforce and not frozen.\n2, The policy has power up bonus pay plan(bonus type=Power-up Bonus) predefined on product and the power up bonus pay plan is active\n3. Current system date >= Bonus Due Date\nSystem will calcualte Powner-up bonus amount according to pre-defined formula, and generate pending fund transaction to purchase fund units with bonus amount.\nSystem update bonus due date according to pre-defined bonus allocation schedule",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_380",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP Bonus",
    "l4": "Loyalty Bonus Allocation",
    "desc": "This is the daily batch job that processes the Loyalty bonus allocation for an ILP product with the loyalty bonus feature when it is due.\n-Loyalty Bonus amount  is calcualted according to pre-defined formula on product  with  Bonus Type=Loyalty Bonus\n-Loyalty Bonus Plan is pre-defined in bonus allocation schedule on product \nAfter Loyalty bonus is allocated, system generates pending fund transaction to purchase fund units with bonus amount, and update bonus due date according to pre-defined bonus allocation schedule.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_381",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP Bonus",
    "l4": "Welcome Bonus Allocation",
    "desc": "Fund welcome bonus accloation for an ILP product with the welcome bonus feature.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_382",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "ILP Bonus",
    "l4": "Fund Dividend Allocation and Confirm",
    "desc": "Extract the policy and allocate the dividend to fund. The dividend can be pay out or reinvest according to the policy's disposal option.",
    "comments": "Added on 27/07/2026 by Joanna",
    "lobs": {
      "term": false,
      "life": false,
      "investment": true,
      "health": false,
      "shield": false,
      "ltc": false
    }
  },
  {
    "id": "F_383",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN GL Posting - CASH",
    "desc": "This is a daily batch job to extract data from T_CASH table for GL posting.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_384",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN GL Posting - ARAP",
    "desc": "This is a daily batch job to extract data from T_PREM_ARAP table for GL posting.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_385",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN GL Posting - NON UNIT",
    "desc": "This is a daily batch job to extract data from T_CAPITAL_DISTRIBUTE table for GL posting.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_386",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN GL Posting - UNIT",
    "desc": "This is a daily batch job to extract data from T_FUND_CASH table for GL posting.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_387",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "Premium Accrual",
    "desc": "This is a month end batch job to extract outstanding premium for GL Premium Accrual purpose.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_388",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "Premium Accrual Reversal",
    "desc": "This is a month beginning batch job to perform Premium Accrual Reversal.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_389",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN DwP Suspense Refund",
    "desc": "This batch is to automatically refund money in suspense if policy is declined, withdrawn or postponed.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_390",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN In Force Suspense Refund",
    "desc": "It's a daily batch for system performs suspense refund. The system extracts a list of policies (with policy status = inforce) with total suspense balance >0 for single pay and general suspense >$10 for non-single pay.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_391",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN Lapse Suspense Refund",
    "desc": "It's a daily batch for system performs suspense refund. The system extracts a list of policies (with policy status = Lapsed) with total suspense balance >= $0 for >= 6 months will need to have monies refunded to PH.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_392",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "FN Termination Suspense Refund",
    "desc": "It's a daily batch for system performs suspense refund. The system extracts a list of policies when policies have been terminated caused by claim;with suspese balance >0 and collection method=giro.",
    "comments": "",
    "lobs": {
      "term": true,
      "life": true,
      "investment": true,
      "health": true,
      "shield": true,
      "ltc": true
    }
  },
  {
    "id": "F_393",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "CPF Deduction Extract and Send Batch",
    "desc": "Extract policy which has CPF deduction request and generate the CPF deduction send file.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": true,
      "ltc": false
    }
  },
  {
    "id": "F_394",
    "app": "BATCH CONSOLE",
    "l1": "Batch",
    "l2": "Batch Jobs",
    "l3": "FIN",
    "l4": "CPF Deduction Return Batch",
    "desc": "Process the CPF deduction return file.",
    "comments": "",
    "lobs": {
      "term": false,
      "life": false,
      "investment": false,
      "health": false,
      "shield": true,
      "ltc": false
    }
  }
];
window.EBAO_LIFECYCLE_DATES = [
  {
    "id": "D01",
    "name": "Proposal / Application Date",
    "def": "The date the applicant completed and signed the formal proposal form.",
    "trigger": "Determines Issue Age, sets agent licensing validation cutoff, and initializes underwriting SLA tracking.",
    "db": "T_PROPOSAL.APPLY_DATE",
    "stage": "New Business",
    "badge": "Staging"
  },
  {
    "id": "D02",
    "name": "Commencement Date (Risk Date)",
    "def": "The official inception date when insurance coverage and mortality risk legally take effect.",
    "trigger": "Base anniversary for policy year counting, attained age increment, cash value schedule, and mortality deductions.",
    "db": "T_POLICY.COMMENCE_DATE",
    "stage": "Inception",
    "badge": "Legal"
  },
  {
    "id": "D03",
    "name": "Policy Issue Date",
    "def": "The system timestamp when the proposal passed all validations/UW and was generated into an inforce contract.",
    "trigger": "Triggers policy schedule PDF generation, welcome pack dispatch, initial sales commission booking, and SOR sync.",
    "db": "T_POLICY.ISSUE_DATE",
    "stage": "Issuance",
    "badge": "SOR Sync"
  },
  {
    "id": "D04",
    "name": "Policy Delivery Date",
    "def": "The date the policyholder physically or digitally received the policy contract (signed Ack Receipt / e-ACK).",
    "trigger": "CRITICAL LEGAL MILESTONE: Starts the statutory 21-day Free-Look (Cooling-off) period. If unconfirmed, defaults to Issue Date + 14 days.",
    "db": "T_POLICY.DELIVERY_DATE",
    "stage": "Delivery",
    "badge": "Statutory"
  },
  {
    "id": "D05",
    "name": "Transaction Date",
    "def": "The immutable database clock date/time when an operator or batch job executes an action.",
    "trigger": "Financial sub-ledger audit trail, billing journal entries, cashier receipts, and SOX regulatory compliance.",
    "db": "T_AUDIT_LOG.TRANS_DATE / T_SUB_LEDGER.TRANS_DATE",
    "stage": "Audit / Accounting",
    "badge": "Immutable"
  },
  {
    "id": "D06",
    "name": "Paid-To-Date (PTD)",
    "def": "The calendar date up to which contractual premiums have been fully settled and allocated.",
    "trigger": "Core status check: If Current Date > PTD, policy is in arrears; if Current Date <= PTD, policy is active and paid.",
    "db": "T_POLICY.PAID_TO_DATE",
    "stage": "Billing / Premium",
    "badge": "Financial"
  },
  {
    "id": "D07",
    "name": "Premium Due Date",
    "def": "The recurring scheduled date when the next modal premium is due (e.g. annually on Oct 20).",
    "trigger": "Triggers Module 05 Billing run at T-30 days, generates billing receivable records and dispatch notice.",
    "db": "T_BILL_RECEIVABLE.DUE_DATE",
    "stage": "Billing",
    "badge": "Schedule"
  },
  {
    "id": "D08",
    "name": "Grace Period Expiry Date",
    "def": "Exactly 60 calendar days following the Premium Due Date (Due Date + 60 days).",
    "trigger": "Policy remains inforce during grace. At 23:59:59 of Day 60, triggers Batch Job for APL or Auto-Lapse.",
    "db": "T_BILL_RECEIVABLE.GRACE_EXP_DATE",
    "stage": "Grace Period",
    "badge": "Enforcement"
  },
  {
    "id": "D09",
    "name": "Policy Anniversary Date",
    "def": "Recurring annual milestone matching Commencement Date month and day.",
    "trigger": "Automatically increments attained age by +1, vests reversionary bonuses, capitalizes loan interest into principal.",
    "db": "T_POLICY.ANNIVERSARY_DATE",
    "stage": "Inforce Servicing",
    "badge": "Annual"
  },
  {
    "id": "D10",
    "name": "Lapsed Date",
    "def": "The exact date on which insurance coverage terminated due to unpaid grace without sufficient cash value.",
    "trigger": "Sum assured set to 0, rider coverage extinguished; initializes statutory 2-year reinstatement window.",
    "db": "T_POLICY.LAPSED_DATE",
    "stage": "Non-Forfeiture",
    "badge": "Terminated"
  },
  {
    "id": "D11",
    "name": "Reinstatement Effective Date",
    "def": "The date a lapsed policy is officially revived following medical underwriting and settlement of back-premiums.",
    "trigger": "Resets statutory 2-year contestability and suicide exclusion period for newly declared medical conditions.",
    "db": "T_POLICY.REINSTATE_DATE",
    "stage": "Reactivation",
    "badge": "Underwritten"
  },
  {
    "id": "D12",
    "name": "Maturity / Expiry Date",
    "def": "The contractual termination date of the policy term (Commence Date + Policy Term Years).",
    "trigger": "Triggers maturity claims processing, releases 100% Sum Assured + Terminal Bonus, and closes policy contract.",
    "db": "T_POLICY.MATURITY_DATE",
    "stage": "Termination",
    "badge": "Payout"
  },
  {
    "id": "D13",
    "name": "Supplementary Rider Effective / Inception Date (Mid-Term Attachment)",
    "def": "The contractual risk inception date of a supplementary rider attached to an already inforce policy after initial policy issuance.",
    "trigger": "Determined by Alteration Rule CS-FN-03: Option A aligns with Next Due Date / Anniversary (no pro-rata needed); Option B takes effect immediately upon Underwriting Approval with Pro-Rata Short Period Premium billing.",
    "db": "T_POLICY_RIDER.EFF_DATE / T_POLICY_RIDER.EXP_DATE",
    "stage": "Customer Service (Endorsement)",
    "badge": "Endorsement"
  }
];
window.EBAO_POLICY_MILESTONES = [
  {
    "id": "MS_01_FREELOOK",
    "title": "Mốc 21 Ngày Cân Nhắc (21-Day Free-Look / Cooling-Off Period)",
    "code": "STATUTORY_21_DAYS",
    "tag": "Statutory Free-Look",
    "color": "emerald",
    "icon": "🛡️",
    "legal_basis": "Luật Kinh doanh Bảo hiểm & Điều khoản chung HĐBH",
    "clock_start": "Bắt đầu tính từ ngày Bên mua bảo hiểm xác nhận đã nhận Hợp đồng (T_POLICY.DELIVERY_DATE / e-ACK timestamp qua SMS/Email OTP). KHÔNG TÍNH từ Issue Date! (Nếu không ghi nhận được e-ACK, hệ thống mặc định fallback: Issue Date + 14 ngày bưu điện).",
    "duration": "Đúng 21 ngày lịch (Calendar Days), kết thúc vào 23:59:59 của ngày thứ 21.",
    "customer_right": "Khách hàng có toàn quyền đơn phương hủy bỏ hợp đồng mà không chịu bất kỳ chế tài phạt vi phạm hợp đồng nào.",
    "refund_formula_trad": "Net Refund = 100% Tổng phí ban đầu đã đóng (HĐ Chính + Riders) - Chi phí khám sức khỏe thực tế (MER/ECG/Xét nghiệm máu).",
    "refund_formula_ilp": "Net Refund = Phí chưa phân bổ + (Số lượng CCQ đã mua × Giá NAV tại ngày định giá kế tiếp) + Phí ban đầu/Phí rủi ro đã trừ - Chi phí khám sức khỏe.",
    "commission_clawback": "Hệ thống tự động thu hồi (Clawback) 100% hoa hồng năm nhất (FYC) đã hạch toán vào tài khoản đại lý (T_AGENT_COMM_TRX).",
    "status_transition": "Trạng thái hợp đồng chuyển từ INFORCE sang TERMINATED_FREE_LOOK (Hủy vô hiệu từ đầu - VOID_AB_INITIO). Dự phòng phí chưa kiếm được (UPR) được hoàn nhập 100%.",
    "db_impact": [
      "T_POLICY.STATUS = 'TERMINATED_FREE_LOOK'",
      "T_POLICY.TERMINATE_DATE = TRANS_DATE",
      "T_AGENT_COMM_TRX.CLAWBACK_AMT = 100% FYC",
      "T_CLAIM_DISBURSEMENT (Refund Voucher)"
    ],
    "pdf_pages": [
      45,
      88,
      204
    ]
  },
  {
    "id": "MS_02_GRACE_PERIOD",
    "title": "Mốc 60 Ngày Gia Hạn Đóng Phí & Cơ Chế Auto-Lapse / APL (60-Day Grace Period Engine)",
    "code": "GRACE_PERIOD_60_DAYS",
    "tag": "Grace Period Engine",
    "color": "amber",
    "icon": "⏳",
    "legal_basis": "Điều khoản tiêu chuẩn ngành bảo hiểm nhân thọ & Quy tắc đóng phí định kỳ",
    "clock_start": "Bắt đầu từ ngày kế tiếp của Ngày đến hạn đóng phí (Premium Due Date). Module 05 chạy batch quét trước T-30 ngày sinh hóa đơn T_BILL_RECEIVABLE. Nếu đến Due Date chưa thanh toán, ngày 1 gia hạn chính thức kích hoạt.",
    "duration": "Đúng 60 ngày lịch (Grace Period = Due Date + 60 days).",
    "inforce_status": "Trong suốt 60 ngày gia hạn, hợp đồng VẪN CÓ HIỆU LỰC HOÀN TOÀN (INFORCE). Toàn bộ quyền lợi bảo hiểm sinh mệnh và sản phẩm bổ trợ (nằm viện, tai nạn, CI) vẫn được bảo vệ 100%.",
    "claim_during_grace": "Nếu xảy ra sự kiện bảo hiểm trong 60 ngày này, công ty bảo hiểm VẪN CHI TRẢ ĐẦY ĐỦ bồi thường, nhưng sẽ khấu trừ khoản phí bảo hiểm quá hạn chưa đóng khỏi số tiền chi trả.",
    "automated_notices": [
      {
        "day": 30,
        "type": "NOTICE_PREM_REMIND_1",
        "channel": "SMS / Email / ZNS",
        "content": "Thông báo nhắc đóng phí lần 1 kèm link cổng thanh toán trực tuyến."
      },
      {
        "day": 45,
        "type": "NOTICE_PREM_WARNING_FINAL",
        "channel": "Thư chuyển phát nhanh / SMS khẩn",
        "content": "Cảnh báo nguy cơ hợp đồng mất hiệu lực và hướng dẫn quy trình đóng phí."
      }
    ],
    "midnight_cutoff_day_60": "Đúng 23:59:59 của ngày thứ 60, Nightly Batch Job JOB_APL_EXEC và JOB_AUTO_LAPSE_TRAD chạy kiểm tra điều kiện Net Cash Value = Total Cash Value - Loan Principal - Loan Interest:",
    "apl_rule": "Nếu Net Cash Value >= Phí định kỳ chưa đóng: Kích hoạt Tự động tạm ứng đóng phí (APL). Trạng thái chuyển thành INFORCE_APL, PTD tăng 1 kỳ phí, sinh bản ghi nợ T_POLICY_LOAN và bắt đầu tính lãi vay APL cộng dồn hàng ngày (6.5% - 8.5%/năm).",
    "auto_lapse_rule": "Nếu Net Cash Value < Phí định kỳ chưa đóng: Kích hoạt Mất hiệu lực tự động (Auto-Lapse). Trạng thái chuyển thành LAPSED, Số tiền bảo hiểm chuyển về 0, toàn bộ Rider bị hủy, kích hoạt thời hạn 2 năm xin khôi phục (2-Year Reinstatement Window).",
    "db_impact": [
      "T_BILL_RECEIVABLE.STATUS = 'OVERDUE'",
      "T_POLICY.STATUS = 'INFORCE_APL' or 'LAPSED'",
      "T_POLICY_LOAN (Bản ghi vay nợ APL)",
      "T_POLICY.LAPSED_DATE"
    ],
    "pdf_pages": [
      346,
      368,
      435
    ]
  },
  {
    "id": "MS_03_MIDTERM_RIDER",
    "title": "Ngày Hiệu Lực & Cách Tính Phí Khi Gắn Sản Phẩm Bổ Trợ (Rider) Sau Khi HĐ Chính Đang Inforce",
    "code": "MIDTERM_RIDER_ATTACHMENT",
    "tag": "Mid-Term Endorsement",
    "color": "indigo",
    "icon": "➕",
    "legal_basis": "Quy trình nghiệp vụ Customer Service CS-FN-03 / Giao dịch TX-CS-017 (Add Supplementary Rider Post-Issuance)",
    "uw_requirement": "Bắt buộc phải thẩm định Y khoa và Tài chính (Medical & Financial UW) trước khi chấp thuận. Sinh task thẩm định T_UW_TASK. Không được gắn Rider nếu HĐ chính đang ở trạng thái LAPSED, PAID_UP hoặc INFORCE_APL.",
    "effective_date_options": [
      {
        "opt": "Lựa chọn 1: Hiệu lực vào Ngày kỷ niệm / Kỳ đóng phí kế tiếp (Next Due Date)",
        "eff_date": "Next Due Date (T_POLICY.PAID_TO_DATE)",
        "pro_rata_amt": "0 VND (Không thu phí ngắn hạn)",
        "billing_rule": "Phí Rider sẽ được tính gộp vào kỳ đóng phí định kỳ kế tiếp cùng với HĐ chính. Tránh phát sinh hóa đơn lẻ."
      },
      {
        "opt": "Lựa chọn 2: Hiệu lực ngay lập tức tại ngày chấp thuận giữa kỳ (Immediate Mid-Term Inception)",
        "eff_date": "Approval Date (Ngày hoàn tất thẩm định và khách hàng đồng ý)",
        "pro_rata_amt": "Thu Phí bảo hiểm ngắn hạn (Pro-Rata Short Period Premium)",
        "billing_rule": "Hệ thống sinh hóa đơn thu phí giữa kỳ T_BILL_RECEIVABLE. Rider chỉ chính thức có hiệu lực (INFORCE_RIDER) sau khi thu đủ khoản phí này."
      }
    ],
    "pro_rata_formula": "Phí Pro-Rata = Phí năm của Rider × (Số ngày còn lại đến Next Due Date / 365) [hoặc 366 nếu năm nhuận]",
    "ptd_synchronization": "Tại ngày đến hạn đóng phí định kỳ kế tiếp (Next Due Date), Paid-To-Date (PTD) của Rider sẽ được ĐỒNG BỘ HOÀN TOÀN với PTD của Hợp đồng chính: PTD_Rider = PTD_Main. Các kỳ thu phí sau đó gộp chung 1 hóa đơn.",
    "maturity_alignment": "Thời hạn bảo hiểm của Rider KHÔNG ĐƯỢC vượt quá thời hạn hợp đồng chính (Rider Expiry Date <= Main Maturity Date) và tự động hết hạn khi Người được bảo hiểm đạt độ tuổi tối đa quy định của Rider (Ví dụ: Trợ cấp nằm viện tối đa đến 65 tuổi, Bệnh hiểm nghèo tối đa đến 70 tuổi).",
    "db_impact": [
      "T_POLICY_RIDER (Thêm bản ghi Rider mới)",
      "T_UW_TASK (Task thẩm định bổ sung)",
      "T_BILL_RECEIVABLE (Hóa đơn phí ngắn hạn pro-rata)",
      "T_POLICY_ALTERATION (Lịch sử nghiệp vụ CS)"
    ],
    "pdf_pages": [
      200,
      214,
      235,
      342
    ]
  }
];
window.EBAO_FREELOOK_RULES = [
  {
    "dimension": "Statutory Free-Look Window",
    "trad": "Exactly 21 calendar days from confirmed Policy Delivery Date (e-ACK receipt).",
    "ilp": "Exactly 21 calendar days from confirmed Policy Delivery Date (e-ACK receipt).",
    "note": "Regulated under Insurance Business Law."
  },
  {
    "dimension": "Default Fallback Trigger",
    "trad": "If Delivery Receipt is unrecorded: Issue Date + 14 days postal allowance.",
    "ilp": "If Delivery Receipt is unrecorded: Issue Date + 14 days postal allowance.",
    "note": "Prevents statutory dispute."
  },
  {
    "dimension": "Gross Refund Calculation",
    "trad": "100% of Total Initial Premiums Paid (Base Plan + Supplementary Riders).",
    "ilp": "Unallocated Premium + Market Value of Units + Admin/Allocation Fees Refunded.",
    "note": "ILP reflects actual unit asset value."
  },
  {
    "dimension": "Market Risk Absorption",
    "trad": "Insurer absorbs interest and operational costs; customer receives 100% premium back.",
    "ilp": "Customer absorbs market price risk; units redeemed at next available Net Asset Value (NAV).",
    "note": "Protects company against fund volatility."
  },
  {
    "dimension": "Mandatory Deductions",
    "trad": "Actual medical examination costs (MER, ECG, blood tests) incurred by insurer during UW.",
    "ilp": "Actual medical examination costs incurred by insurer during underwriting.",
    "note": "Only third-party clinic fees deducted."
  },
  {
    "dimension": "Net Refund Formula",
    "trad": "Net Refund = Initial Premium Paid - Actual Medical Exam Expenses",
    "ilp": "Net Refund = Unallocated Prem + (Units * Unit Price) + Allocation Fee - Medical Fees",
    "note": "Computed in Module 04 CS Workbench."
  },
  {
    "dimension": "Policy Contract Status",
    "trad": "Transitions from INFORCE to TERMINATED_FREE_LOOK (VOID_AB_INITIO).",
    "ilp": "Transitions from INFORCE to TERMINATED_FREE_LOOK (VOID_AB_INITIO).",
    "note": "Contract is legally treated as void from inception."
  },
  {
    "dimension": "Coverage Termination",
    "trad": "Sum Assured and all supplementary rider covers cease instantaneously upon registration.",
    "ilp": "Sum Assured, critical illness, and fund units are immediately locked and liquidated.",
    "note": "No claim payable once submitted."
  },
  {
    "dimension": "Agent Commission Clawback",
    "trad": "100% Clawback of initial sales commission paid or credited to servicing agent.",
    "ilp": "100% Clawback of initial sales commission paid or credited to servicing agent.",
    "note": "Agent ledger debited in Module 07."
  },
  {
    "dimension": "Sub-Ledger Accounting Entry",
    "trad": "Dr. Gross Written Premium Refund / Cr. Cash at Bank (Disbursement Voucher)",
    "ilp": "Dr. ILP Liability & Fee Reserve / Cr. Cash at Bank (Disbursement Voucher)",
    "note": "Balanced journal posted to ERP."
  }
];
window.EBAO_CS_ALTERATIONS = [
  {
    "code": "CS-NF-01",
    "name": "Change Address & Contact",
    "type": "Non-Financial",
    "validations": "Valid postal code, verified mobile number format, active email address.",
    "uw": "No",
    "impact": "Updates tax jurisdiction codes, dispatches change confirmation notice."
  },
  {
    "code": "CS-NF-02",
    "name": "Change Beneficiary Designation",
    "type": "Non-Financial",
    "validations": "Cumulative nominee shares must equal exactly 100.0%. Minor (<18) requires Trustee.",
    "uw": "No",
    "impact": "Replaces beneficiary allocation register; updates insurable interest flags."
  },
  {
    "code": "CS-NF-03",
    "name": "Absolute Assignment",
    "type": "Non-Financial",
    "validations": "Legal deed executed, assignor & assignee KYC verified, policy not pledged.",
    "uw": "No",
    "impact": "100% policyholder rights transferred to Assignee; updates policy master owner."
  },
  {
    "code": "CS-NF-04",
    "name": "Collateral Assignment",
    "type": "Non-Financial",
    "validations": "Commercial bank lending contract details, collateral pledge registered.",
    "uw": "No",
    "impact": "Locks surrender and policy loan facilities until written release from bank."
  },
  {
    "code": "CS-NF-05",
    "name": "Change Payment Frequency",
    "type": "Non-Financial",
    "validations": "Switches modal frequency (Annual, Semi, Qtr, Month). Effective on next Due Date.",
    "uw": "No",
    "impact": "Re-calculates modal loading factor; adjusts future billing notice schedules."
  },
  {
    "code": "CS-NF-06",
    "name": "Change Payment Method / Bank",
    "type": "Non-Financial",
    "validations": "Bank account verification, direct debit mandate pre-authorization.",
    "uw": "No",
    "impact": "Updates auto-debit routing profile; links new clearing account token."
  },
  {
    "code": "CS-NF-07",
    "name": "Change Occupation / Hazard Class",
    "type": "Non-Financial",
    "validations": "Job duties disclosure, industry hazard verification (Class 1 to 4).",
    "uw": "Conditional",
    "impact": "Updates occupational extra per mille loadings on accidental and disability riders."
  },
  {
    "code": "CS-NF-08",
    "name": "Rescind CS Endorsement",
    "type": "Non-Financial",
    "validations": "Rollback authorization by CS Supervisor; valid within same accounting period.",
    "uw": "No",
    "impact": "Reverses previous alteration endorsement; restores policy master and financial state."
  },
  {
    "code": "CS-FN-01",
    "name": "Sum Assured Increase",
    "type": "Financial",
    "validations": "Pro-rata premium increment calculated using attained age and current rate matrix.",
    "uw": "Yes (Full UW)",
    "impact": "Issues counter-offer; generates back-premium or modal differential billing."
  },
  {
    "code": "CS-FN-02",
    "name": "Sum Assured Decrease",
    "type": "Financial",
    "validations": "Remaining SA must exceed minimum policy threshold ($10,000).",
    "uw": "No",
    "impact": "Decreases modal premium; unearned pro-rata premium refunded to suspense."
  },
  {
    "code": "CS-FN-03",
    "name": "Add Supplementary Rider",
    "type": "Financial",
    "validations": "Rider compatibility check; attaches Accidental, CI, or Medical plan.",
    "uw": "Yes (Full UW)",
    "impact": "Generates new rider benefit schedule and adjusts total modal premium due."
  },
  {
    "code": "CS-FN-04",
    "name": "Delete Supplementary Rider",
    "type": "Financial",
    "validations": "Policyholder written cancellation; terminates rider coverage immediately.",
    "uw": "No",
    "impact": "Terminates rider schedule; calculates unearned premium refund voucher."
  },
  {
    "code": "CS-FN-05",
    "name": "Change DOB & Gender",
    "type": "Financial",
    "validations": "Recalculates true entry age: If older, back-bill arrears; if younger, refund excess.",
    "uw": "Conditional",
    "impact": "Updates rate table factors; posts retroactive financial debit/credit journals."
  },
  {
    "code": "CS-FN-06",
    "name": "Policy Loan Disbursement",
    "type": "Financial",
    "validations": "Max Loan = 85% * Net Cash Value. Daily compound interest accrued at 6.5% p.a.",
    "uw": "No",
    "impact": "Books loan asset: Dr. Policy Loan Ledger / Cr. Bank Clearing Voucher."
  },
  {
    "code": "CS-FN-07",
    "name": "Policy Loan Repayment",
    "type": "Financial",
    "validations": "Principal and accrued interest settlement (partial or lump sum).",
    "uw": "No",
    "impact": "Retires loan debt: Dr. Bank Cash Collection / Cr. Policy Loan Ledger."
  },
  {
    "code": "CS-FN-08",
    "name": "Reduced Paid-Up (RPU)",
    "type": "Financial",
    "validations": "New SA = (Net Cash Value / Single Prem Rate per $1,000) * 1,000.",
    "uw": "No",
    "impact": "Sets future premiums to $0; permanently extinguishes all supplementary riders."
  },
  {
    "code": "CS-FN-09",
    "name": "Extended Term Insurance (ETA)",
    "type": "Financial",
    "validations": "Net cash value applied as single premium to purchase term insurance for original SA.",
    "uw": "No",
    "impact": "Fixes expiry date; converts policy type; ends future premium requirements."
  },
  {
    "code": "CS-FN-10",
    "name": "Reversionary Bonus Surrender",
    "type": "Financial",
    "validations": "Monetizes accumulated reversionary bonus units at actuarial discounted cash factor.",
    "uw": "No",
    "impact": "Keeps base policy active; generates immediate cash bonus disbursement voucher."
  },
  {
    "code": "CS-FN-11",
    "name": "Full Policy Surrender",
    "type": "Financial",
    "validations": "Net Payout = Gross Cash Value - Loan Principal - Accrued Interest + Unearned Prem.",
    "uw": "No",
    "impact": "Irrevocably terminates policy contract; releases net surrender payout voucher."
  },
  {
    "code": "CS-FN-12",
    "name": "2-Year Policy Reinstatement",
    "type": "Financial",
    "validations": "Applicable within 24 months of lapse. Requires health declaration & back-premiums.",
    "uw": "Yes (Full UW)",
    "impact": "Re-activates inforce status; resets 2-year contestability on newly declared risks."
  }
];
window.EBAO_BATCH_PIPELINE = [
  {
    "step": 1,
    "time": "22:30",
    "code": "JOB_CLEAR_PENDING_PROPOSAL",
    "name": "Clear Pending Proposals",
    "freq": "Daily",
    "lob": "All LOBs",
    "desc": "Auto-withdraws proposals unfulfilled after 30-day requirement SLA.",
    "tables": [
      "T_PROPOSAL",
      "T_AUDIT_LOG"
    ],
    "prereq": "System Maintenance Lock Acquired",
    "status": "Ready"
  },
  {
    "step": 2,
    "time": "22:45",
    "code": "JOB_CLEAR_PENDING_CS",
    "name": "Clear Pending CS Applications",
    "freq": "Daily",
    "lob": "All LOBs",
    "desc": "Cancels abandoned CS alteration requests exceeding 30-day requirement SLA.",
    "tables": [
      "T_CS_APPL",
      "T_CS_ITEM"
    ],
    "prereq": "JOB_CLEAR_PENDING_PROPOSAL Completed",
    "status": "Ready"
  },
  {
    "step": 3,
    "time": "23:00",
    "code": "JOB_BATCH_INFORCE_POLICY",
    "name": "Auto-Inforce Matched Policies",
    "freq": "Daily",
    "lob": "All LOBs",
    "desc": "Enforces approved proposals where 100% initial premium is matched.",
    "tables": [
      "T_PROPOSAL",
      "T_POLICY",
      "T_POLICY_BENEFIT"
    ],
    "prereq": "Collection Receipts Reconciled",
    "status": "Ready"
  },
  {
    "step": 4,
    "time": "23:15",
    "code": "JOB_BILLING_GEN",
    "name": "Billing Notice Generation",
    "freq": "Daily",
    "lob": "Trad & ILP",
    "desc": "Scans portfolio where PTD <= System Date + 30 Days. Inserts open bills.",
    "tables": [
      "T_BILL_RECEIVABLE",
      "T_POLICY"
    ],
    "prereq": "Policy Status Synchronized",
    "status": "Ready"
  },
  {
    "step": 5,
    "time": "23:45",
    "code": "JOB_DD_EXTRACT",
    "name": "Direct Debit Clearing Extraction",
    "freq": "Daily",
    "lob": "Bank Clearing",
    "desc": "Aggregates open bills; compiles ISO 20022 pain.008 clearing files.",
    "tables": [
      "T_BANK_FILE_BATCH",
      "T_BILL_RECEIVABLE"
    ],
    "prereq": "JOB_BILLING_GEN Completed",
    "status": "Ready"
  },
  {
    "step": 6,
    "time": "00:30",
    "code": "JOB_BANK_RECON",
    "name": "Bank Clearing Return Ingest",
    "freq": "Daily",
    "lob": "Bank Clearing",
    "desc": "Parses bank return clearing files; settles matched bills; advances PTD.",
    "tables": [
      "T_BILL_RECEIVABLE",
      "T_COLLECTION_TXN",
      "T_POLICY"
    ],
    "prereq": "Bank SFTP Return Files Ingested",
    "status": "Ready"
  },
  {
    "step": 7,
    "time": "01:15",
    "code": "JOB_GRACE_AGING",
    "name": "Grace Period Elapsed Aging",
    "freq": "Daily",
    "lob": "All LOBs",
    "desc": "Increments unpaid days counter (1 to 60) for past-due policies. Triggers notices.",
    "tables": [
      "T_BILL_RECEIVABLE",
      "T_POLICY_GRACE"
    ],
    "prereq": "JOB_BANK_RECON Completed",
    "status": "Ready"
  },
  {
    "step": 8,
    "time": "02:00",
    "code": "JOB_APL_EXEC",
    "name": "Auto Premium Loan (APL) Run",
    "freq": "Daily",
    "lob": "Trad Life",
    "desc": "If Net Cash Value >= Modal Premium at Day 60, draws APL loan and pays bill.",
    "tables": [
      "T_POLICY_LOAN",
      "T_POLICY_LOAN_TXN",
      "T_POLICY"
    ],
    "prereq": "JOB_GRACE_AGING Completed (Day 60 Gated)",
    "status": "Ready"
  },
  {
    "step": 9,
    "time": "02:45",
    "code": "JOB_AUTO_LAPSE_TRAD",
    "name": "Auto-Lapse Execution (Trad)",
    "freq": "Daily",
    "lob": "Trad Life",
    "desc": "If Net Cash Value < Modal Premium at Day 60, lapses policy (Status LAPSED, SA=0).",
    "tables": [
      "T_POLICY",
      "T_BILL_RECEIVABLE"
    ],
    "prereq": "JOB_APL_EXEC Completed",
    "status": "Ready"
  },
  {
    "step": 10,
    "time": "03:00",
    "code": "JOB_ILP_PLD_AND_LAPSE",
    "name": "ILP Potential Lapse & Unit Lapse",
    "freq": "Daily",
    "lob": "Unit-Linked",
    "desc": "Calculates Potential Lapse Date (PLD) and lapses ILP policy when account value is 0.",
    "tables": [
      "T_ILP_ACCOUNT",
      "T_ILP_UNIT_TXN",
      "T_POLICY"
    ],
    "prereq": "JOB_AUTO_LAPSE_TRAD Completed",
    "status": "Ready"
  },
  {
    "step": 11,
    "time": "03:15",
    "code": "JOB_BONUS_ALLOC_ENGINE",
    "name": "Bonus & Survival Benefit Alloc",
    "freq": "Sched / EOY",
    "lob": "Par & Savings",
    "desc": "Vests Reversionary Bonus (RB), generates Cash Bonus (CB) or Survival Benefit vouchers.",
    "tables": [
      "T_BONUS_ALLOCATION",
      "T_PAYMENT_VOUCHER"
    ],
    "prereq": "Declared Bonus Rates Published",
    "status": "Ready"
  },
  {
    "step": 12,
    "time": "03:30",
    "code": "JOB_LOAN_INTEREST_ACCRUAL",
    "name": "Daily Loan Interest Accrual",
    "freq": "Daily",
    "lob": "Trad Life",
    "desc": "Calculates daily compound interest at 6.5% p.a. on all active policy and APL loans.",
    "tables": [
      "T_POLICY_LOAN",
      "T_POLICY_LOAN_TXN"
    ],
    "prereq": "JOB_APL_EXEC Completed",
    "status": "Ready"
  },
  {
    "step": 13,
    "time": "04:00",
    "code": "JOB_SUSPENSE_AUTO_REFUND",
    "name": "Auto-Refund Suspense Balances",
    "freq": "Daily",
    "lob": "All LOBs",
    "desc": "Scans and auto-refunds unallocated suspense credits for declined/withdrawn policies.",
    "tables": [
      "T_SUSPENSE_ACCOUNT",
      "T_PAYMENT_VOUCHER"
    ],
    "prereq": "JOB_CLEAR_PENDING_PROPOSAL Completed",
    "status": "Ready"
  },
  {
    "step": 14,
    "time": "04:30",
    "code": "JOB_ACTUARIAL_VALUATION",
    "name": "Actuarial Liability & IFRS 17 Extract",
    "freq": "Month-End",
    "lob": "Actuarial",
    "desc": "Compiles inforce liability inventory, unearned premium reserves, and IFRS 17 BEL.",
    "tables": [
      "T_VALUATION_EXTRACT",
      "T_POLICY"
    ],
    "prereq": "All Policy Status & Bonus Runs Completed",
    "status": "Ready"
  },
  {
    "step": 15,
    "time": "05:00",
    "code": "JOB_GL_EXTRACT_ROLL",
    "name": "General Ledger Sub-Ledger Posting",
    "freq": "Daily",
    "lob": "Accounting",
    "desc": "Compiles balanced sub-ledger debit/credit journals and posts to corporate ERP.",
    "tables": [
      "T_SUB_LEDGER_ENTRY",
      "T_GL_BATCH"
    ],
    "prereq": "All Daily Financial Transactions Locked",
    "status": "Ready"
  },
  {
    "step": 16,
    "time": "05:30",
    "code": "JOB_DATE_ROLL",
    "name": "System Business Date Advancement",
    "freq": "Daily",
    "lob": "System Admin",
    "desc": "Advances system business date by +1 day (Date = Date + 1) and releases locks.",
    "tables": [
      "T_SYSTEM_PARAM",
      "T_BATCH_EXEC_LOG"
    ],
    "prereq": "JOB_GL_EXTRACT_ROLL Completed Successfully",
    "status": "Ready"
  }
];
window.EBAO_TABLES = [
  {
    "name": "T_TENANT",
    "category": "Master Setup",
    "module": "MOD_01",
    "pk": "TENANT_ID",
    "fk": "None",
    "desc": "Multi-tenant operating insurance entities"
  },
  {
    "name": "T_URP_USER",
    "category": "Security & Users",
    "module": "MOD_01",
    "pk": "USER_ID",
    "fk": "TENANT_ID -> T_TENANT",
    "desc": "System users, operators, agents, underwriters"
  },
  {
    "name": "T_URP_ROLE",
    "category": "Security & Users",
    "module": "MOD_01",
    "pk": "ROLE_ID",
    "fk": "None",
    "desc": "Security role profiles and functional permissions"
  },
  {
    "name": "T_DATA_DICT",
    "category": "Master Setup",
    "module": "MOD_01",
    "pk": "DICT_ID",
    "fk": "None",
    "desc": "Master data dictionary and localized lookup codes"
  },
  {
    "name": "T_ORGANIZATION",
    "category": "Master Setup",
    "module": "MOD_01",
    "pk": "ORG_ID",
    "fk": "PARENT_ORG_ID -> T_ORGANIZATION",
    "desc": "Corporate agency hierarchy and branch offices"
  },
  {
    "name": "T_PROD_DEF",
    "category": "Product Engine",
    "module": "MOD_01",
    "pk": "PRODUCT_ID",
    "fk": "None",
    "desc": "Core product definition, LOB, status, currency"
  },
  {
    "name": "T_PROD_TERM",
    "category": "Product Engine",
    "module": "MOD_01",
    "pk": "TERM_ID",
    "fk": "PRODUCT_ID -> T_PROD_DEF",
    "desc": "Entry ages, policy term, and premium paying terms"
  },
  {
    "name": "T_RATE_TABLE",
    "category": "Product Engine",
    "module": "MOD_01",
    "pk": "RATE_TABLE_ID",
    "fk": "PRODUCT_ID -> T_PROD_DEF",
    "desc": "Mortality and benefit rating table headers"
  },
  {
    "name": "T_RATE_MATRIX",
    "category": "Product Engine",
    "module": "MOD_01",
    "pk": "RATE_ID",
    "fk": "RATE_TABLE_ID -> T_RATE_TABLE",
    "desc": "Granular rate grid: Age x Gender x Smoker x Term"
  },
  {
    "name": "T_MODAL_FACTOR",
    "category": "Product Engine",
    "module": "MOD_01",
    "pk": "FACTOR_ID",
    "fk": "PRODUCT_ID -> T_PROD_DEF",
    "desc": "Modal loading factors (Annual, Semi, Qtr, Month)"
  },
  {
    "name": "T_SURRENDER_VAL_SCHEDULE",
    "category": "Product Engine",
    "module": "MOD_01",
    "pk": "SV_SCHED_ID",
    "fk": "PRODUCT_ID -> T_PROD_DEF",
    "desc": "Cash value schedule percentages by policy year"
  },
  {
    "name": "T_PARTY",
    "category": "Party Master",
    "module": "MOD_02",
    "pk": "PARTY_ID",
    "fk": "None",
    "desc": "Master entity record for Individual or Corporate client"
  },
  {
    "name": "T_PARTY_INDIVIDUAL",
    "category": "Party Master",
    "module": "MOD_02",
    "pk": "PARTY_ID",
    "fk": "PARTY_ID -> T_PARTY",
    "desc": "Demographics: DOB, Gender, Smoker status"
  },
  {
    "name": "T_PARTY_IDENTIFIER",
    "category": "Party Master",
    "module": "MOD_02",
    "pk": "IDENTIFIER_ID",
    "fk": "PARTY_ID -> T_PARTY",
    "desc": "National ID, Passport, Citizen ID numbers"
  },
  {
    "name": "T_PARTY_ADDRESS",
    "category": "Party Master",
    "module": "MOD_02",
    "pk": "ADDRESS_ID",
    "fk": "PARTY_ID -> T_PARTY",
    "desc": "Residential, mailing, and billing addresses"
  },
  {
    "name": "T_PARTY_OCCUPATION",
    "category": "Party Master",
    "module": "MOD_02",
    "pk": "OCCUPATION_ID",
    "fk": "PARTY_ID -> T_PARTY",
    "desc": "Job title, industry, and derived Occupation Class"
  },
  {
    "name": "T_PROPOSAL",
    "category": "New Business",
    "module": "MOD_02",
    "pk": "PROPOSAL_ID",
    "fk": "AGENT_ID -> T_URP_USER, ORG_ID",
    "desc": "Proposal application header in staging"
  },
  {
    "name": "T_POLICY",
    "category": "Policy Core",
    "module": "MOD_02",
    "pk": "POLICY_ID",
    "fk": "PROPOSAL_ID, HOLDER_ID -> T_PARTY",
    "desc": "Official inforce insurance contract in System of Record"
  },
  {
    "name": "T_POLICY_BENEFIT",
    "category": "Policy Core",
    "module": "MOD_02",
    "pk": "BENEFIT_ID",
    "fk": "POLICY_ID -> T_POLICY, PRODUCT_ID -> T_PROD_DEF",
    "desc": "Contractual benefits (Main Plan & Riders)"
  },
  {
    "name": "T_POLICY_INSURED",
    "category": "Policy Core",
    "module": "MOD_02",
    "pk": "INSURED_ID",
    "fk": "POLICY_ID -> T_POLICY, PARTY_ID -> T_PARTY",
    "desc": "Life Assured binding and insurable relationship"
  },
  {
    "name": "T_BENEFICIARY",
    "category": "Policy Core",
    "module": "MOD_02",
    "pk": "BENE_ID",
    "fk": "POLICY_ID -> T_POLICY, PARTY_ID -> T_PARTY",
    "desc": "Nominated beneficiaries and percentage shares (Sum=100%)"
  },
  {
    "name": "T_TRUSTEE",
    "category": "Policy Core",
    "module": "MOD_02",
    "pk": "TRUSTEE_ID",
    "fk": "BENE_ID -> T_BENEFICIARY, PARTY_ID -> T_PARTY",
    "desc": "Appointed legal trustees for minor beneficiaries"
  },
  {
    "name": "T_UW_TASK",
    "category": "Underwriting",
    "module": "MOD_03",
    "pk": "TASK_ID",
    "fk": "PROPOSAL_ID, POLICY_ID, USER_ID",
    "desc": "Underwriting case, assigned officer, lock status"
  },
  {
    "name": "T_UW_ISSUE",
    "category": "Underwriting",
    "module": "MOD_03",
    "pk": "ISSUE_ID",
    "fk": "TASK_ID -> T_UW_TASK",
    "desc": "Medical & financial requirement tracking (MER/APS)"
  },
  {
    "name": "T_UW_RATING",
    "category": "Underwriting",
    "module": "MOD_03",
    "pk": "RATING_ID",
    "fk": "TASK_ID -> T_UW_TASK, BENEFIT_ID -> T_POLICY_BENEFIT",
    "desc": "Extra Mortality (EM) loadings and flat extras"
  },
  {
    "name": "T_POLICY_EXCLUSION",
    "category": "Underwriting",
    "module": "MOD_03",
    "pk": "EXCL_ID",
    "fk": "POLICY_ID -> T_POLICY, TASK_ID -> T_UW_TASK",
    "desc": "Medical and hazardous activity exclusion clauses"
  },
  {
    "name": "T_CS_APPL",
    "category": "Customer Service",
    "module": "MOD_04",
    "pk": "CS_APPL_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Policy alteration transaction header"
  },
  {
    "name": "T_CS_ITEM",
    "category": "Customer Service",
    "module": "MOD_04",
    "pk": "CS_ITEM_ID",
    "fk": "CS_APPL_ID -> T_CS_APPL",
    "desc": "Specific alteration action details (Surrender, RPU, DOB)"
  },
  {
    "name": "T_POLICY_ASSIGNMENT",
    "category": "Customer Service",
    "module": "MOD_04",
    "pk": "ASSIGN_ID",
    "fk": "POLICY_ID -> T_POLICY, ASSIGNEE_ID -> T_PARTY",
    "desc": "Absolute and Collateral assignment registry"
  },
  {
    "name": "T_POLICY_LOAN",
    "category": "Policy Loans",
    "module": "MOD_04",
    "pk": "LOAN_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Active loan accounts, principal, and interest rate (6.5%)"
  },
  {
    "name": "T_POLICY_LOAN_TXN",
    "category": "Policy Loans",
    "module": "MOD_04",
    "pk": "LOAN_TXN_ID",
    "fk": "LOAN_ID -> T_POLICY_LOAN",
    "desc": "Granular loan movements: Advance, Repayment, Interest"
  },
  {
    "name": "T_BONUS_ALLOCATION",
    "category": "Bonuses",
    "module": "MOD_04",
    "pk": "BONUS_ALLOC_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Accumulated Reversionary and Cash Bonus balances"
  },
  {
    "name": "T_BILL_RECEIVABLE",
    "category": "Billing",
    "module": "MOD_05",
    "pk": "BILL_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Open modal billing items, due dates, paid status"
  },
  {
    "name": "T_BANK_FILE_BATCH",
    "category": "Billing & Bank",
    "module": "MOD_05",
    "pk": "BATCH_ID",
    "fk": "TENANT_ID -> T_TENANT",
    "desc": "Direct Debit clearing files sent to banks (pain.008)"
  },
  {
    "name": "T_COLLECTION_TXN",
    "category": "Collection",
    "module": "MOD_05",
    "pk": "COLLECT_ID",
    "fk": "BILL_ID -> T_BILL_RECEIVABLE",
    "desc": "Receipt records from bank clearing or cashier"
  },
  {
    "name": "T_SUSPENSE_ACCOUNT",
    "category": "Suspense Ledger",
    "module": "MOD_05",
    "pk": "SUSPENSE_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Unallocated deposits and excess funds ledger"
  },
  {
    "name": "T_DEPOSIT_LEDGER",
    "category": "Collection",
    "module": "MOD_05",
    "pk": "DEPOSIT_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Policyholder premium deposit balance"
  },
  {
    "name": "T_CLAIM_CASE",
    "category": "Claims",
    "module": "MOD_06",
    "pk": "CLAIM_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Claim case header, event date, cause, case status"
  },
  {
    "name": "T_CLAIM_DIAGNOSIS",
    "category": "Claims",
    "module": "MOD_06",
    "pk": "DIAG_ID",
    "fk": "CLAIM_ID -> T_CLAIM_CASE",
    "desc": "ICD-10 medical codes, hospital admission details"
  },
  {
    "name": "T_CLAIM_CHECKLIST",
    "category": "Claims",
    "module": "MOD_06",
    "pk": "CHECKLIST_ID",
    "fk": "CLAIM_ID -> T_CLAIM_CASE",
    "desc": "Required claim documents and verification status"
  },
  {
    "name": "T_CLAIM_BENEFIT_CALC",
    "category": "Claims",
    "module": "MOD_06",
    "pk": "CALC_ID",
    "fk": "CLAIM_ID -> T_CLAIM_CASE, LOAN_ID -> T_POLICY_LOAN",
    "desc": "Benefit calculation matrix and loan debt offsetting"
  },
  {
    "name": "T_CLAIM_SETTLEMENT",
    "category": "Claims",
    "module": "MOD_06",
    "pk": "SETTLEMENT_ID",
    "fk": "CLAIM_ID -> T_CLAIM_CASE",
    "desc": "Approved claim settlement and nominee payout splits"
  },
  {
    "name": "T_PAYMENT_VOUCHER",
    "category": "Payment",
    "module": "MOD_07",
    "pk": "VOUCHER_ID",
    "fk": "PAYEE_PARTY_ID -> T_PARTY, SOURCE_REF_ID",
    "desc": "Outgoing disbursement orders (Claim, Surrender, Loan)"
  },
  {
    "name": "T_PAYMENT_BATCH",
    "category": "Payment",
    "module": "MOD_07",
    "pk": "PAY_BATCH_ID",
    "fk": "TENANT_ID -> T_TENANT",
    "desc": "ISO 20022 EFT electronic bank credit transfer files"
  },
  {
    "name": "T_SUB_LEDGER_ENTRY",
    "category": "General Ledger",
    "module": "MOD_07",
    "pk": "ENTRY_ID",
    "fk": "VOUCHER_ID -> T_PAYMENT_VOUCHER, COLLECT_ID -> T_COLLECTION_TXN",
    "desc": "Balanced debit/credit accounting journal entries"
  },
  {
    "name": "T_PREM_ARAP",
    "category": "General Ledger",
    "module": "MOD_07",
    "pk": "ARAP_ID",
    "fk": "BILL_ID -> T_BILL_RECEIVABLE",
    "desc": "Premium accounts receivable and payable sub-ledger"
  },
  {
    "name": "T_BATCH_JOB_DEF",
    "category": "Batch Console",
    "module": "MOD_08",
    "pk": "JOB_ID",
    "fk": "None",
    "desc": "Scheduled batch job definitions, DAG dependencies"
  },
  {
    "name": "T_BATCH_EXEC_LOG",
    "category": "Batch Console",
    "module": "MOD_08",
    "pk": "LOG_ID",
    "fk": "JOB_ID -> T_BATCH_JOB_DEF",
    "desc": "Nightly execution run logs, start/end timestamps, exit codes"
  },
  {
    "name": "T_VALUATION_EXTRACT",
    "category": "Actuarial Valuation",
    "module": "MOD_08",
    "pk": "EXTRACT_ID",
    "fk": "POLICY_ID -> T_POLICY",
    "desc": "Month-end policy liability extracts for Actuarial & IFRS 17"
  }
];
window.EBAO_TRANSACTIONS = [
  {
    "code": "TX-NB-001",
    "name": "Register Proposal (Reception)",
    "module": "MOD_02",
    "cat": "Reception",
    "trigger": "Agent Portal / Counter",
    "entities": "T_PROPOSAL",
    "impact": "None (Staging)"
  },
  {
    "code": "TX-NB-002",
    "name": "Save Customer & Party Details",
    "module": "MOD_02",
    "cat": "Data Entry",
    "trigger": "OP Officer / API",
    "entities": "T_PARTY, T_CUSTOMER_EXT",
    "impact": "None"
  },
  {
    "code": "TX-NB-003",
    "name": "Configure Main & Rider Plan",
    "module": "MOD_02",
    "cat": "Configuration",
    "trigger": "OP / Product Engine",
    "entities": "T_POLICY_BENEFIT, T_POLICY_RIDER",
    "impact": "None"
  },
  {
    "code": "TX-NB-004",
    "name": "Save Beneficiary Allocations",
    "module": "MOD_02",
    "cat": "Nomination",
    "trigger": "OP Officer",
    "entities": "T_BENEFICIARY, T_TRUSTEE",
    "impact": "None"
  },
  {
    "code": "TX-NB-005",
    "name": "Evaluate Auto-UW STP Rules",
    "module": "MOD_02",
    "cat": "Underwriting",
    "trigger": "Rules Engine",
    "entities": "T_PROPOSAL_UW_STATUS",
    "impact": "None"
  },
  {
    "code": "TX-NB-006",
    "name": "Capture Health Declaration",
    "module": "MOD_02",
    "cat": "Declaration",
    "trigger": "Applicant / Agent",
    "entities": "T_DECLARATION_ANS",
    "impact": "None"
  },
  {
    "code": "TX-NB-007",
    "name": "Record Initial Premium Receipt",
    "module": "MOD_02",
    "cat": "Collection",
    "trigger": "Bank File / Cashier",
    "entities": "T_COLLECTION_TXN, T_SUSPENSE",
    "impact": "Dr. Cash / Cr. Staging Suspense"
  },
  {
    "code": "TX-NB-008",
    "name": "Enforce Policy (Issue Inforce)",
    "module": "MOD_02",
    "cat": "Inception",
    "trigger": "OP Officer / Batch",
    "entities": "T_POLICY, T_PROPOSAL, T_SOR_SYNC",
    "impact": "Dr. Staging Suspense / Cr. GWP"
  },
  {
    "code": "TX-NB-009",
    "name": "Withdraw Proposal",
    "module": "MOD_02",
    "cat": "Exception",
    "trigger": "Client Request / SLA",
    "entities": "T_PROPOSAL",
    "impact": "Refund voucher if funds collected"
  },
  {
    "code": "TX-NB-010",
    "name": "Reverse Proposal",
    "module": "MOD_02",
    "cat": "Reversal",
    "trigger": "OP Supervisor",
    "entities": "T_PROPOSAL, T_AUDIT_LOG",
    "impact": "Reverse staging vouchers"
  },
  {
    "code": "TX-UW-001",
    "name": "Claim Underwriting Task",
    "module": "MOD_03",
    "cat": "Task Mgmt",
    "trigger": "Underwriter",
    "entities": "T_UW_TASK",
    "impact": "Locks case to underwriter ID"
  },
  {
    "code": "TX-UW-002",
    "name": "Issue Medical Query Letter (MER)",
    "module": "MOD_03",
    "cat": "Requirement",
    "trigger": "Underwriter",
    "entities": "T_UW_ISSUE, T_QUERY_LETTER",
    "impact": "Sets 30-day requirement SLA"
  },
  {
    "code": "TX-UW-003",
    "name": "Apply Extra Mortality (EM) Loading",
    "module": "MOD_03",
    "cat": "Rating",
    "trigger": "Underwriter",
    "entities": "T_BENEFIT_RATING",
    "impact": "Recalculates rated premium"
  },
  {
    "code": "TX-UW-004",
    "name": "Apply Flat Per Mille Loading",
    "module": "MOD_03",
    "cat": "Rating",
    "trigger": "Underwriter",
    "entities": "T_BENEFIT_RATING",
    "impact": "Adds flat dollar surcharge"
  },
  {
    "code": "TX-UW-005",
    "name": "Add Policy Exclusion Clause",
    "module": "MOD_03",
    "cat": "Exclusion",
    "trigger": "Underwriter",
    "entities": "T_POLICY_EXCLUSION",
    "impact": "Prints exclusion on schedule"
  },
  {
    "code": "TX-UW-006",
    "name": "Underwriting Standard Accept",
    "module": "MOD_03",
    "cat": "Disposal",
    "trigger": "Underwriter",
    "entities": "T_UW_TASK, T_PROPOSAL",
    "impact": "Transitions proposal to Billing"
  },
  {
    "code": "TX-UW-007",
    "name": "Issue Counter-Offer",
    "module": "MOD_03",
    "cat": "Disposal",
    "trigger": "Underwriter",
    "entities": "T_UW_TASK, T_COUNTER_OFFER",
    "impact": "Dispatches revised terms to client"
  },
  {
    "code": "TX-UW-008",
    "name": "Postpone Coverage",
    "module": "MOD_03",
    "cat": "Disposal",
    "trigger": "Underwriter",
    "entities": "T_UW_TASK, T_PROPOSAL",
    "impact": "Defers proposal by X months"
  },
  {
    "code": "TX-UW-009",
    "name": "Decline Risk",
    "module": "MOD_03",
    "cat": "Disposal",
    "trigger": "Chief Underwriter",
    "entities": "T_UW_TASK, T_AML_ADVERSE",
    "impact": "Formally rejects; refunds deposit"
  },
  {
    "code": "TX-UW-010",
    "name": "CS Alteration UW Confirm",
    "module": "MOD_03",
    "cat": "Endorsement",
    "trigger": "CS Referral",
    "entities": "T_UW_TASK, T_CS_APPL",
    "impact": "Approves/rejects CS risk increase"
  },
  {
    "code": "TX-CS-001",
    "name": "Change Address & Contact",
    "module": "MOD_04",
    "cat": "Non-Fin",
    "trigger": "Policyholder",
    "entities": "T_PARTY_ADDRESS",
    "impact": "Updates tax jurisdiction codes"
  },
  {
    "code": "TX-CS-002",
    "name": "Change Beneficiary Designation",
    "module": "MOD_04",
    "cat": "Non-Fin",
    "trigger": "Policyholder",
    "entities": "T_BENEFICIARY",
    "impact": "None"
  },
  {
    "code": "TX-CS-003",
    "name": "Absolute Assignment",
    "module": "MOD_04",
    "cat": "Non-Fin",
    "trigger": "Assignor / Assignee",
    "entities": "T_POLICY",
    "impact": "Legal ownership transferred"
  },
  {
    "code": "TX-CS-004",
    "name": "Collateral Assignment",
    "module": "MOD_04",
    "cat": "Non-Fin",
    "trigger": "Lending Bank",
    "entities": "T_POLICY_ASSIGNMENT",
    "impact": "Locks surrender & loan rights"
  },
  {
    "code": "TX-CS-005",
    "name": "Change DOB & Gender",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Proof",
    "entities": "T_PARTY, T_POLICY_BENEFIT",
    "impact": "Premium re-rated; back-bill/refund"
  },
  {
    "code": "TX-CS-006",
    "name": "Change Payment Frequency",
    "module": "MOD_04",
    "cat": "Non-Fin",
    "trigger": "Policyholder",
    "entities": "T_POLICY",
    "impact": "Updates future modal billing amount"
  },
  {
    "code": "TX-CS-007",
    "name": "Change Bank Direct Debit Account",
    "module": "MOD_04",
    "cat": "Non-Fin",
    "trigger": "Policyholder",
    "entities": "T_PAYMENT_METHOD",
    "impact": "Direct debit target bank switched"
  },
  {
    "code": "TX-CS-008",
    "name": "21-Day Free-Look Cancellation",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Cooling-off",
    "entities": "T_POLICY",
    "impact": "100% refund minus medical expenses"
  },
  {
    "code": "TX-CS-009",
    "name": "Full Policy Surrender",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Application",
    "entities": "T_POLICY, T_SURRENDER_TXN",
    "impact": "Pays Net GSV; terminates policy"
  },
  {
    "code": "TX-CS-010",
    "name": "Reversionary Bonus Surrender",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Application",
    "entities": "T_BONUS_ALLOCATION",
    "impact": "Cashes in bonus; base policy active"
  },
  {
    "code": "TX-CS-011",
    "name": "Disburse Policy Loan (85% LTV)",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Loan Request",
    "entities": "T_POLICY_LOAN, T_LOAN_TXN",
    "impact": "Dr. Policy Loan / Cr. Bank"
  },
  {
    "code": "TX-CS-012",
    "name": "Policy Loan Repayment",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Payment",
    "entities": "T_POLICY_LOAN, T_COLLECTION",
    "impact": "Dr. Bank / Cr. Policy Loan"
  },
  {
    "code": "TX-CS-013",
    "name": "Reduced Paid-Up (RPU) Conversion",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Non-Forfeiture",
    "entities": "T_POLICY_BENEFIT, T_POLICY",
    "impact": "SA reduced; future premiums zeroed"
  },
  {
    "code": "TX-CS-014",
    "name": "Extended Term Insurance (ETA)",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Non-Forfeiture",
    "entities": "T_POLICY_BENEFIT, T_POLICY",
    "impact": "Converts CV to fixed term cover"
  },
  {
    "code": "TX-CS-015",
    "name": "Increase Sum Assured",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client / UW Approved",
    "entities": "T_POLICY_BENEFIT",
    "impact": "Higher coverage and premium"
  },
  {
    "code": "TX-CS-016",
    "name": "Decrease Sum Assured",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Request",
    "entities": "T_POLICY_BENEFIT",
    "impact": "Lower coverage; refunds pro-rata"
  },
  {
    "code": "TX-CS-017",
    "name": "Add Supplementary Rider",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client / UW Approved",
    "entities": "T_POLICY_RIDER",
    "impact": "Adds rider benefit schedule"
  },
  {
    "code": "TX-CS-018",
    "name": "Delete Supplementary Rider",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Client Request",
    "entities": "T_POLICY_RIDER",
    "impact": "Rider stops; unearned premium refunded"
  },
  {
    "code": "TX-CS-019",
    "name": "Reinstatement of Lapsed Policy",
    "module": "MOD_04",
    "cat": "Financial",
    "trigger": "Medical UW Approved",
    "entities": "T_POLICY",
    "impact": "Back-premiums & penalty interest paid"
  },
  {
    "code": "TX-CS-020",
    "name": "Rescind CS Endorsement",
    "module": "MOD_04",
    "cat": "Reversal",
    "trigger": "Supervisor Override",
    "entities": "T_CS_APPL, T_POLICY, T_GL",
    "impact": "Reverses alteration & restores state"
  },
  {
    "code": "TX-BIL-001",
    "name": "Generate Billing Notice (T-30)",
    "module": "MOD_05",
    "cat": "Billing",
    "trigger": "Scheduler Batch",
    "entities": "T_BILL_RECEIVABLE",
    "impact": "Dr. Premium Receivable / Cr. GWP"
  },
  {
    "code": "TX-BIL-002",
    "name": "Extract Direct Debit Clearing File",
    "module": "MOD_05",
    "cat": "Billing",
    "trigger": "Bank Batch Run",
    "entities": "T_BANK_FILE_BATCH",
    "impact": "Flags bills as 'Sent to Bank'"
  },
  {
    "code": "TX-BIL-003",
    "name": "Import Bank Clearing Return (00)",
    "module": "MOD_05",
    "cat": "Collection",
    "trigger": "Bank File Ingest",
    "entities": "T_BILL_RECEIVABLE, T_POLICY",
    "impact": "Dr. Bank / Cr. Premium Receivable"
  },
  {
    "code": "TX-BIL-004",
    "name": "Record Manual Counter Payment",
    "module": "MOD_05",
    "cat": "Collection",
    "trigger": "Cashier Entry",
    "entities": "T_COLLECTION_TXN",
    "impact": "Dr. Cash / Cr. Premium Receivable"
  },
  {
    "code": "TX-BIL-005",
    "name": "Allocate Suspense Funds to Bill",
    "module": "MOD_05",
    "cat": "Collection",
    "trigger": "OP Accountant",
    "entities": "T_SUSPENSE, T_BILL",
    "impact": "Dr. Suspense Account / Cr. Receivable"
  },
  {
    "code": "TX-BIL-006",
    "name": "Refund Suspense Credit Balance",
    "module": "MOD_05",
    "cat": "Collection",
    "trigger": "OP Accountant",
    "entities": "T_SUSPENSE, T_PAY_VOUCH",
    "impact": "Dr. Suspense / Cr. Bank"
  },
  {
    "code": "TX-BIL-007",
    "name": "Trigger 60-Day Grace Countdown",
    "module": "MOD_05",
    "cat": "Billing",
    "trigger": "Due Date Missed",
    "entities": "T_POLICY_GRACE",
    "impact": "Initializes grace aging counter"
  },
  {
    "code": "TX-BIL-008",
    "name": "Auto-Deposit Settlement Offset",
    "module": "MOD_05",
    "cat": "Billing",
    "trigger": "Batch Sweeper",
    "entities": "T_DEPOSIT_LEDGER",
    "impact": "Offsets open bill against deposit balance"
  },
  {
    "code": "TX-CLM-001",
    "name": "Register FNOL (Notice of Loss)",
    "module": "MOD_06",
    "cat": "Reception",
    "trigger": "Beneficiary / Agent",
    "entities": "T_CLAIM_CASE",
    "impact": "Books initial Case Reserve"
  },
  {
    "code": "TX-CLM-002",
    "name": "Validate Document Checklist",
    "module": "MOD_06",
    "cat": "Tracking",
    "trigger": "Claims Assessor",
    "entities": "T_CLAIM_CHECKLIST",
    "impact": "Advances case to 'Evaluation'"
  },
  {
    "code": "TX-CLM-003",
    "name": "2-Year Contestability Check",
    "module": "MOD_06",
    "cat": "Investigation",
    "trigger": "Rules Engine",
    "entities": "T_CLAIM_CASE",
    "impact": "Flags contestable claims (<24 mos)"
  },
  {
    "code": "TX-CLM-004",
    "name": "Medical Examination & ICD-10",
    "module": "MOD_06",
    "cat": "Assessment",
    "trigger": "Medical Assessor",
    "entities": "T_CLAIM_DIAGNOSIS",
    "impact": "Confirms covered medical condition"
  },
  {
    "code": "TX-CLM-005",
    "name": "Adjudicate Death Claim Benefit",
    "module": "MOD_06",
    "cat": "Calculation",
    "trigger": "Benefit Engine",
    "entities": "T_CLAIM_BENEFIT_CALC",
    "impact": "Computes SA + Bonuses - Debt"
  },
  {
    "code": "TX-CLM-006",
    "name": "Adjudicate Accelerated CI Claim",
    "module": "MOD_06",
    "cat": "Calculation",
    "trigger": "Benefit Engine",
    "entities": "T_CLAIM_BENEFIT_CALC",
    "impact": "Calculates CI payout; reduces base SA"
  },
  {
    "code": "TX-CLM-007",
    "name": "Net Out Policy Loans & Interest",
    "module": "MOD_06",
    "cat": "Offsetting",
    "trigger": "Benefit Engine",
    "entities": "T_CLAIM_BENEFIT_CALC",
    "impact": "Deducts loans from claim payout"
  },
  {
    "code": "TX-CLM-008",
    "name": "Approve Claim Settlement",
    "module": "MOD_06",
    "cat": "Approval",
    "trigger": "Claims Committee",
    "entities": "T_CLAIM_CASE",
    "impact": "Authorizes disbursement voucher"
  },
  {
    "code": "TX-CLM-009",
    "name": "Execute Death Termination",
    "module": "MOD_06",
    "cat": "Disposal",
    "trigger": "Settlement Engine",
    "entities": "T_POLICY",
    "impact": "Terminates policy; Life Assured Deceased"
  },
  {
    "code": "TX-CLM-010",
    "name": "Repudiate Claim (Decline)",
    "module": "MOD_06",
    "cat": "Disposal",
    "trigger": "Legal Committee",
    "entities": "T_CLAIM_CASE",
    "impact": "Dispatches repudiation letter; reverses reserve"
  },
  {
    "code": "TX-PAY-001",
    "name": "Create Payment Voucher",
    "module": "MOD_07",
    "cat": "Voucher Gen",
    "trigger": "Upstream Modules",
    "entities": "T_PAYMENT_VOUCHER",
    "impact": "Books payable liability"
  },
  {
    "code": "TX-PAY-002",
    "name": "AML Payee Identity Clearance",
    "module": "MOD_07",
    "cat": "Compliance",
    "trigger": "AML Screening",
    "entities": "T_PAYMENT_VOUCHER",
    "impact": "Flags cleared or suspicious"
  },
  {
    "code": "TX-PAY-003",
    "name": "Authorize Payment Release",
    "module": "MOD_07",
    "cat": "Approval",
    "trigger": "Finance Manager",
    "entities": "T_PAYMENT_VOUCHER",
    "impact": "Authorizes release to bank"
  },
  {
    "code": "TX-PAY-004",
    "name": "Compile ISO 20022 EFT Batch",
    "module": "MOD_07",
    "cat": "Bank Clearing",
    "trigger": "Payout Scheduler",
    "entities": "T_PAYMENT_BATCH",
    "impact": "Compiles pain.001 clearing file"
  },
  {
    "code": "TX-PAY-005",
    "name": "Reconcile Bank Settlement (Paid)",
    "module": "MOD_07",
    "cat": "Settlement",
    "trigger": "Bank Confirm File",
    "entities": "T_PAYMENT_VOUCHER",
    "impact": "Dr. Payable / Cr. Bank Clearing"
  },
  {
    "code": "TX-PAY-006",
    "name": "Reverse Bounced Payment Voucher",
    "module": "MOD_07",
    "cat": "Reversal",
    "trigger": "Bank Reject Notice",
    "entities": "T_PAYMENT_VOUCHER",
    "impact": "Reverses journal; alerts CS"
  },
  {
    "code": "TX-PAY-007",
    "name": "Post Sub-Ledger Journal to ERP",
    "module": "MOD_07",
    "cat": "GL Interface",
    "trigger": "EOD Accounting Roll",
    "entities": "T_SUB_LEDGER_ENTRY",
    "impact": "Transmits balanced debits/credits to SAP"
  },
  {
    "code": "TX-BAT-001",
    "name": "JOB_CLEAR_PENDING_PROPOSAL",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (22:30)",
    "entities": "T_PROPOSAL",
    "impact": "Auto-withdraws unfulfilled proposals"
  },
  {
    "code": "TX-BAT-002",
    "name": "JOB_CLEAR_PENDING_CS",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (22:45)",
    "entities": "T_CS_APPL",
    "impact": "Auto-cancels expired CS applications"
  },
  {
    "code": "TX-BAT-003",
    "name": "JOB_BATCH_INFORCE_POLICY",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (23:00)",
    "entities": "T_POLICY, T_PROPOSAL",
    "impact": "Auto-inforces matched policies"
  },
  {
    "code": "TX-BAT-004",
    "name": "JOB_BILLING_GEN",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (23:15)",
    "entities": "T_BILL_RECEIVABLE",
    "impact": "Generates T-30 billing receivables"
  },
  {
    "code": "TX-BAT-005",
    "name": "JOB_DD_EXTRACT",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (23:45)",
    "entities": "T_BANK_FILE_BATCH",
    "impact": "Extracts direct debit pain.008 files"
  },
  {
    "code": "TX-BAT-006",
    "name": "JOB_BANK_RECON",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (00:30)",
    "entities": "T_BILL_RECEIVABLE, T_POLICY",
    "impact": "Settles bills; advances PTD"
  },
  {
    "code": "TX-BAT-007",
    "name": "JOB_GRACE_AGING",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (01:15)",
    "entities": "T_POLICY_GRACE",
    "impact": "Increments overdue counter (1..60)"
  },
  {
    "code": "TX-BAT-008",
    "name": "JOB_APL_EXEC",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (02:00)",
    "entities": "T_POLICY_LOAN, T_POLICY",
    "impact": "Draws APL if Net Cash Value >= Premium"
  },
  {
    "code": "TX-BAT-009",
    "name": "JOB_AUTO_LAPSE_TRAD",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (02:45)",
    "entities": "T_POLICY",
    "impact": "Lapses policy if CV < Premium"
  },
  {
    "code": "TX-BAT-010",
    "name": "JOB_ILP_PLD_AND_LAPSE",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (03:00)",
    "entities": "T_ILP_ACCOUNT, T_POLICY",
    "impact": "Calculates PLD; liquidates lapsed units"
  },
  {
    "code": "TX-BAT-011",
    "name": "JOB_BONUS_ALLOC_ENGINE",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (03:15)",
    "entities": "T_BONUS_ALLOCATION",
    "impact": "Vests RB; generates CB/SB vouchers"
  },
  {
    "code": "TX-BAT-012",
    "name": "JOB_LOAN_INTEREST_ACCRUAL",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (03:30)",
    "entities": "T_POLICY_LOAN",
    "impact": "Accrues 6.5% interest; capitalizes"
  },
  {
    "code": "TX-BAT-013",
    "name": "JOB_SUSPENSE_AUTO_REFUND",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (04:00)",
    "entities": "T_SUSPENSE_ACCOUNT",
    "impact": "Auto-refunds excess suspense balances"
  },
  {
    "code": "TX-BAT-014",
    "name": "JOB_ACTUARIAL_VALUATION",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (04:30)",
    "entities": "T_VALUATION_EXTRACT",
    "impact": "Extracts reserves & IFRS 17 BEL"
  },
  {
    "code": "TX-BAT-015",
    "name": "JOB_GL_EXTRACT_ROLL",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (05:00)",
    "entities": "T_SUB_LEDGER_ENTRY",
    "impact": "Posts balanced journals to ERP GL"
  },
  {
    "code": "TX-BAT-016",
    "name": "JOB_DATE_ROLL",
    "module": "MOD_08",
    "cat": "Batch",
    "trigger": "Scheduler (05:30)",
    "entities": "T_SYSTEM_PARAM",
    "impact": "Advances business date +1 day"
  }
];
