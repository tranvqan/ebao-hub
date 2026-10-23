// Auto-generated eBao Data Bundle (Zero CORS offline execution)
window.EBAO_MODULES = [
  {
    "id": "MOD_01",
    "num": "01",
    "title": "Mod 01: Architecture & Product Factory",
    "subtitle": "Microservices, BFF, BS Layer, SOR & Declarative Service Orchestration",
    "icon": "box",
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
        "pdf_page": 12,
        "validation_rules": [
          {
            "ruleId": "VAL-PF-001",
            "module": "MOD_01",
            "moduleName": "Architecture & Product Factory",
            "lifecyclePhase": "01. Product Configuration",
            "stage": "Product Definition",
            "targetEntity": "T_PROD_TERM",
            "ruleName": "Policy Term vs Premium Paying Term Alignment",
            "condition": "Premium Paying Term (PPT) must be strictly <= Policy Term (PT).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_PF_TERM_MISMATCH",
            "errorMessage": "Premium paying term cannot exceed policy duration.",
            "systemAction": "Blocks product publication to SOR runtime tables.",
            "actuarialBasis": "Prevent negative reserve accumulation and unbacked liability exposure post-premium paying period.",
            "pdfPage": 26
          },
          {
            "ruleId": "VAL-PF-002",
            "module": "MOD_01",
            "moduleName": "Architecture & Product Factory",
            "lifecyclePhase": "01. Product Configuration",
            "stage": "Eligibility Setup",
            "targetEntity": "T_PROD_AGE_LIMIT",
            "ruleName": "Maturity Age Ceiling Enforcement",
            "condition": "Issue Age + Policy Term must not exceed Maximum Maturity Age (e.g. Age 75 or Age 99).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_PF_MAX_MATURITY_EXCEEDED",
            "errorMessage": "Entry age plus coverage term exceeds maximum maturity age defined in product charter.",
            "systemAction": "Invalidates product rate grid compilation.",
            "actuarialBasis": "Mortality tables terminate at maximum attained age; extrapolation beyond ceiling causes undefined pricing rates.",
            "pdfPage": 27
          }
        ]
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
        "pdf_page": 24,
        "validation_rules": [
          {
            "ruleId": "VAL-PF-001",
            "module": "MOD_01",
            "moduleName": "Architecture & Product Factory",
            "lifecyclePhase": "01. Product Configuration",
            "stage": "Product Definition",
            "targetEntity": "T_PROD_TERM",
            "ruleName": "Policy Term vs Premium Paying Term Alignment",
            "condition": "Premium Paying Term (PPT) must be strictly <= Policy Term (PT).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_PF_TERM_MISMATCH",
            "errorMessage": "Premium paying term cannot exceed policy duration.",
            "systemAction": "Blocks product publication to SOR runtime tables.",
            "actuarialBasis": "Prevent negative reserve accumulation and unbacked liability exposure post-premium paying period.",
            "pdfPage": 26
          },
          {
            "ruleId": "VAL-PF-002",
            "module": "MOD_01",
            "moduleName": "Architecture & Product Factory",
            "lifecyclePhase": "01. Product Configuration",
            "stage": "Eligibility Setup",
            "targetEntity": "T_PROD_AGE_LIMIT",
            "ruleName": "Maturity Age Ceiling Enforcement",
            "condition": "Issue Age + Policy Term must not exceed Maximum Maturity Age (e.g. Age 75 or Age 99).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_PF_MAX_MATURITY_EXCEEDED",
            "errorMessage": "Entry age plus coverage term exceeds maximum maturity age defined in product charter.",
            "systemAction": "Invalidates product rate grid compilation.",
            "actuarialBasis": "Mortality tables terminate at maximum attained age; extrapolation beyond ceiling causes undefined pricing rates.",
            "pdfPage": 27
          }
        ]
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
        "pdf_page": 28,
        "validation_rules": [
          {
            "ruleId": "VAL-PF-003",
            "module": "MOD_01",
            "moduleName": "Architecture & Product Factory",
            "lifecyclePhase": "01. Product Configuration",
            "stage": "Rider Compatibility",
            "targetEntity": "T_RIDER_COMPATIBILITY",
            "ruleName": "Rider Sum Assured & Term Capping",
            "condition": "Attached Rider Sum Assured <= 100% of Base Plan Sum Assured, and Rider Expiry Date <= Base Plan Expiry Date.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_PF_RIDER_EXCEEDS_BASE",
            "errorMessage": "Rider coverage cannot exceed base plan sum assured or extend beyond base maturity.",
            "systemAction": "Disallows rider attachment in proposal workbench.",
            "actuarialBasis": "Anti-selection control: supplementary riders cannot be utilized as standalone primary life coverage.",
            "pdfPage": 55
          }
        ]
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
    "pdf_chapter": "Chapter 1: System Foundation & Architecture",
    "validation_rules": [
      {
        "ruleId": "VAL-PF-001",
        "module": "MOD_01",
        "moduleName": "Architecture & Product Factory",
        "lifecyclePhase": "01. Product Configuration",
        "stage": "Product Definition",
        "targetEntity": "T_PROD_TERM",
        "ruleName": "Policy Term vs Premium Paying Term Alignment",
        "condition": "Premium Paying Term (PPT) must be strictly <= Policy Term (PT).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_PF_TERM_MISMATCH",
        "errorMessage": "Premium paying term cannot exceed policy duration.",
        "systemAction": "Blocks product publication to SOR runtime tables.",
        "actuarialBasis": "Prevent negative reserve accumulation and unbacked liability exposure post-premium paying period.",
        "pdfPage": 26
      },
      {
        "ruleId": "VAL-PF-002",
        "module": "MOD_01",
        "moduleName": "Architecture & Product Factory",
        "lifecyclePhase": "01. Product Configuration",
        "stage": "Eligibility Setup",
        "targetEntity": "T_PROD_AGE_LIMIT",
        "ruleName": "Maturity Age Ceiling Enforcement",
        "condition": "Issue Age + Policy Term must not exceed Maximum Maturity Age (e.g. Age 75 or Age 99).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_PF_MAX_MATURITY_EXCEEDED",
        "errorMessage": "Entry age plus coverage term exceeds maximum maturity age defined in product charter.",
        "systemAction": "Invalidates product rate grid compilation.",
        "actuarialBasis": "Mortality tables terminate at maximum attained age; extrapolation beyond ceiling causes undefined pricing rates.",
        "pdfPage": 27
      },
      {
        "ruleId": "VAL-PF-003",
        "module": "MOD_01",
        "moduleName": "Architecture & Product Factory",
        "lifecyclePhase": "01. Product Configuration",
        "stage": "Rider Compatibility",
        "targetEntity": "T_RIDER_COMPATIBILITY",
        "ruleName": "Rider Sum Assured & Term Capping",
        "condition": "Attached Rider Sum Assured <= 100% of Base Plan Sum Assured, and Rider Expiry Date <= Base Plan Expiry Date.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_PF_RIDER_EXCEEDS_BASE",
        "errorMessage": "Rider coverage cannot exceed base plan sum assured or extend beyond base maturity.",
        "systemAction": "Disallows rider attachment in proposal workbench.",
        "actuarialBasis": "Anti-selection control: supplementary riders cannot be utilized as standalone primary life coverage.",
        "pdfPage": 55
      },
      {
        "ruleId": "VAL-PF-004",
        "module": "MOD_01",
        "moduleName": "Architecture & Product Factory",
        "lifecyclePhase": "01. Product Configuration",
        "stage": "Cash Value Schedule",
        "targetEntity": "T_SURRENDER_VAL_SCHEDULE",
        "ruleName": "Cash Value Non-Negative & Non-Decreasing Guarantee",
        "condition": "Guaranteed Cash Value schedule must be monotonic non-decreasing for policy durations >= 3 years.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_PF_INVALID_CV_SCHEDULE",
        "errorMessage": "Surrender cash value schedule violates actuarial non-forfeiture minimum standard.",
        "systemAction": "Rejects cash value table import.",
        "actuarialBasis": "Compliance with Insurance Business Law statutory minimum guaranteed cash value standards.",
        "pdfPage": 29
      },
      {
        "ruleId": "VAL-PF-005",
        "module": "MOD_01",
        "moduleName": "Architecture & Product Factory",
        "lifecyclePhase": "01. Product Configuration",
        "stage": "Unit-Linked Parameters",
        "targetEntity": "T_ILP_FUND_CONFIG",
        "ruleName": "Investment Fund Apportionment Ceiling",
        "condition": "Apportionment percentages must be integers between 0% and 100%, and total must equal exactly 100%.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_PF_FUND_APPORTION_SUM",
        "errorMessage": "Fund allocation percentages must sum up to 100%.",
        "systemAction": "Blocks fund portfolio configuration save.",
        "actuarialBasis": "Prevents unallocated premium cash flows or over-allocated fund unit creation.",
        "pdfPage": 50
      }
    ],
    "validation_rules_count": 5
  },
  {
    "id": "MOD_02",
    "num": "02",
    "title": "Mod 02: New Business (NB APP)",
    "subtitle": "Proposal Capture, Product Configuration, Party Hierarchy & Initial Enforcement",
    "icon": "user-plus",
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
        "pdf_page": 45,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-001",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Agent Verification",
            "targetEntity": "T_AGENT_CONTRACT",
            "ruleName": "Agent License & Active Status Validation",
            "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_AGENT_INVALID",
            "errorMessage": "Agent is inactive, unlicensed for product, or currently suspended. Proposal issue generated.",
            "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
            "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-007",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Initial Premium Receipt",
            "targetEntity": "T_SUSPENSE_RECEIPT",
            "ruleName": "First Premium Minimum Tolerance Match",
            "condition": "Deposited initial premium must equal exact modal gross premium (tolerance 0 VND underpayment).",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_NB_PREM_SHORTFALL",
            "errorMessage": "Initial collection shortfall detected. Policy cannot issue until balance paid in full.",
            "systemAction": "Parks payment in Suspense Account (`T_SUSPENSE_ACCT`); holds issuance.",
            "actuarialBasis": "No policy contract can form without complete consideration received by insurer.",
            "pdfPage": 359
          },
          {
            "ruleId": "VAL-ISS-001",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "04. Policy Issuance",
            "stage": "SOR Enforce Commit",
            "targetEntity": "T_POLICY",
            "ruleName": "First Premium Receipt Allocation Before Enforce",
            "condition": "Total validated suspense receipts allocated to proposal must exactly equal First Gross Modal Premium.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
            "errorMessage": "Cannot issue policy: first modal premium is unpaid or incompletely allocated.",
            "systemAction": "Blocks commit to SOR `T_POLICY` table; proposal remains in `WAITING_FOR_ISSUE`.",
            "actuarialBasis": "Statutory premium accounting: coverage commencement triggers immediate unearned premium reserve (UPR).",
            "pdfPage": 21
          }
        ]
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
        "pdf_page": 58,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-001",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Agent Verification",
            "targetEntity": "T_AGENT_CONTRACT",
            "ruleName": "Agent License & Active Status Validation",
            "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_AGENT_INVALID",
            "errorMessage": "Agent is inactive, unlicensed for product, or currently suspended. Proposal issue generated.",
            "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
            "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-002",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Beneficiary Allocation",
            "targetEntity": "T_POLICY_BENEFICIARY",
            "ruleName": "Beneficiary Share Percentage 100% Balance",
            "condition": "The sum of share percentages for all beneficiaries within the same priority sequence must equal exactly 100.00%.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_BENEFICIARY_SUM_MISMATCH",
            "errorMessage": "Total beneficiary share percentage within same priority order must equal 100%.",
            "systemAction": "Blocks proposal submission and generates proposal issue.",
            "actuarialBasis": "Ensures unequivocal claims disbursement without inter-pleader estate litigation risk.",
            "pdfPage": 137
          }
        ]
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
        "pdf_page": 72,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-003",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Beneficiary Legal Type",
            "targetEntity": "T_POLICY_BENEFICIARY",
            "ruleName": "Trust Nomination Relationship Restriction",
            "condition": "For Trust Nomination (Sec 49L / Sec 73 CLPA), relationship is mandatory and strictly restricted to Spouse or Child.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_INVALID_TRUST_RELATION",
            "errorMessage": "Trust nomination only allows Spouse or Child. Other relatives must use Revocable nomination (49M).",
            "systemAction": "Validation fails on Beneficiary screen; blocks proposal validation.",
            "actuarialBasis": "Legal bankruptcy protection compliance: trust policies create an immediate statutory trust in favor of immediate family.",
            "pdfPage": 485
          },
          {
            "ruleId": "VAL-NB-004",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Financial Underwriting",
            "targetEntity": "T_PARTY_FINANCIAL",
            "ruleName": "Proposer Mandatory Annual Income Check",
            "condition": "Proposer Annual Income is mandatory (> 0) and Total Sum Assured <= Maximum Income Multiple (e.g. 25x for Age <= 35).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
            "errorMessage": "The Annual Income of the proposer must be entered. Proposal issue generated.",
            "systemAction": "Generates Underwriting Financial Requirement if multiple exceeded.",
            "actuarialBasis": "Anti-Money Laundering (AML) and anti-selection: ensures coverage is proportionate to economic human life value.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-005",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Juvenile Protection",
            "targetEntity": "T_POLICY_BENEFIT",
            "ruleName": "Juvenile Statutory Sum Assured Ceiling",
            "condition": "For Life Assured age < 4 years, Death Sum Assured capped at statutory limit (e.g. $20,000 / 500,000,000 VND).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_JUVENILE_SA_LIMIT",
            "errorMessage": "Sum assured exceeds statutory ceiling for juvenile life assured under 4 years of age.",
            "systemAction": "Auto-trims Sum Assured to statutory limit or blocks quote calculation.",
            "actuarialBasis": "Moral hazard prevention and statutory child welfare regulation compliance.",
            "pdfPage": 55
          }
        ]
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
        "pdf_page": 88,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-001",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Agent Verification",
            "targetEntity": "T_AGENT_CONTRACT",
            "ruleName": "Agent License & Active Status Validation",
            "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_AGENT_INVALID",
            "errorMessage": "Agent is inactive, unlicensed for product, or currently suspended. Proposal issue generated.",
            "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
            "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-006",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Health Declaration",
            "targetEntity": "T_NB_DECLARATION",
            "ruleName": "Declaration Form Mandatory Response Completeness",
            "condition": "Every question in the product declaration form must have an affirmative ('Yes') or negative ('No') recorded.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
            "errorMessage": "One or more health/lifestyle declaration questions remain unanswered.",
            "systemAction": "Blocks transition from Data Entry to Underwriting queue.",
            "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation for future contestability assessment.",
            "pdfPage": 61
          }
        ]
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
        "pdf_page": 102,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-002",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Beneficiary Allocation",
            "targetEntity": "T_POLICY_BENEFICIARY",
            "ruleName": "Beneficiary Share Percentage 100% Balance",
            "condition": "The sum of share percentages for all beneficiaries within the same priority sequence must equal exactly 100.00%.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_BENEFICIARY_SUM_MISMATCH",
            "errorMessage": "Total beneficiary share percentage within same priority order must equal 100%.",
            "systemAction": "Blocks proposal submission and generates proposal issue.",
            "actuarialBasis": "Ensures unequivocal claims disbursement without inter-pleader estate litigation risk.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-003",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Beneficiary Legal Type",
            "targetEntity": "T_POLICY_BENEFICIARY",
            "ruleName": "Trust Nomination Relationship Restriction",
            "condition": "For Trust Nomination (Sec 49L / Sec 73 CLPA), relationship is mandatory and strictly restricted to Spouse or Child.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_INVALID_TRUST_RELATION",
            "errorMessage": "Trust nomination only allows Spouse or Child. Other relatives must use Revocable nomination (49M).",
            "systemAction": "Validation fails on Beneficiary screen; blocks proposal validation.",
            "actuarialBasis": "Legal bankruptcy protection compliance: trust policies create an immediate statutory trust in favor of immediate family.",
            "pdfPage": 485
          }
        ]
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
        "pdf_page": 118,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-004",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Financial Underwriting",
            "targetEntity": "T_PARTY_FINANCIAL",
            "ruleName": "Proposer Mandatory Annual Income Check",
            "condition": "Proposer Annual Income is mandatory (> 0) and Total Sum Assured <= Maximum Income Multiple (e.g. 25x for Age <= 35).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
            "errorMessage": "The Annual Income of the proposer must be entered. Proposal issue generated.",
            "systemAction": "Generates Underwriting Financial Requirement if multiple exceeded.",
            "actuarialBasis": "Anti-Money Laundering (AML) and anti-selection: ensures coverage is proportionate to economic human life value.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-006",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Health Declaration",
            "targetEntity": "T_NB_DECLARATION",
            "ruleName": "Declaration Form Mandatory Response Completeness",
            "condition": "Every question in the product declaration form must have an affirmative ('Yes') or negative ('No') recorded.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
            "errorMessage": "One or more health/lifestyle declaration questions remain unanswered.",
            "systemAction": "Blocks transition from Data Entry to Underwriting queue.",
            "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation for future contestability assessment.",
            "pdfPage": 61
          }
        ]
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
        "pdf_page": 135,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-007",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Initial Premium Receipt",
            "targetEntity": "T_SUSPENSE_RECEIPT",
            "ruleName": "First Premium Minimum Tolerance Match",
            "condition": "Deposited initial premium must equal exact modal gross premium (tolerance 0 VND underpayment).",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_NB_PREM_SHORTFALL",
            "errorMessage": "Initial collection shortfall detected. Policy cannot issue until balance paid in full.",
            "systemAction": "Parks payment in Suspense Account (`T_SUSPENSE_ACCT`); holds issuance.",
            "actuarialBasis": "No policy contract can form without complete consideration received by insurer.",
            "pdfPage": 359
          },
          {
            "ruleId": "VAL-ISS-001",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "04. Policy Issuance",
            "stage": "SOR Enforce Commit",
            "targetEntity": "T_POLICY",
            "ruleName": "First Premium Receipt Allocation Before Enforce",
            "condition": "Total validated suspense receipts allocated to proposal must exactly equal First Gross Modal Premium.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
            "errorMessage": "Cannot issue policy: first modal premium is unpaid or incompletely allocated.",
            "systemAction": "Blocks commit to SOR `T_POLICY` table; proposal remains in `WAITING_FOR_ISSUE`.",
            "actuarialBasis": "Statutory premium accounting: coverage commencement triggers immediate unearned premium reserve (UPR).",
            "pdfPage": 21
          },
          {
            "ruleId": "VAL-ISS-002",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "04. Policy Issuance",
            "stage": "Document Generation",
            "targetEntity": "T_POLICY_CONTRACT",
            "ruleName": "Contract Schedule & Table of Guaranteed Benefits Generation",
            "condition": "Official policy schedule, benefit illustration, and general provisions PDF must compile with valid digital signature.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_ISS_PDF_GENERATION_FAILED",
            "errorMessage": "Policy contract rendering or digital signing failed. Re-run print spooler.",
            "systemAction": "Retries PDF compilation; alerts Operations supervisor if persistent.",
            "actuarialBasis": "Legal enforceability of contractual benefit schedules provided to policyholder.",
            "pdfPage": 35
          }
        ]
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
        "pdf_page": 88,
        "validation_rules": [
          {
            "ruleId": "VAL-NB-005",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "02. Proposal Registration",
            "stage": "Juvenile Protection",
            "targetEntity": "T_POLICY_BENEFIT",
            "ruleName": "Juvenile Statutory Sum Assured Ceiling",
            "condition": "For Life Assured age < 4 years, Death Sum Assured capped at statutory limit (e.g. $20,000 / 500,000,000 VND).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_JUVENILE_SA_LIMIT",
            "errorMessage": "Sum assured exceeds statutory ceiling for juvenile life assured under 4 years of age.",
            "systemAction": "Auto-trims Sum Assured to statutory limit or blocks quote calculation.",
            "actuarialBasis": "Moral hazard prevention and statutory child welfare regulation compliance.",
            "pdfPage": 55
          },
          {
            "ruleId": "VAL-ISS-002",
            "module": "MOD_02",
            "moduleName": "New Business (NB APP)",
            "lifecyclePhase": "04. Policy Issuance",
            "stage": "Document Generation",
            "targetEntity": "T_POLICY_CONTRACT",
            "ruleName": "Contract Schedule & Table of Guaranteed Benefits Generation",
            "condition": "Official policy schedule, benefit illustration, and general provisions PDF must compile with valid digital signature.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_ISS_PDF_GENERATION_FAILED",
            "errorMessage": "Policy contract rendering or digital signing failed. Re-run print spooler.",
            "systemAction": "Retries PDF compilation; alerts Operations supervisor if persistent.",
            "actuarialBasis": "Legal enforceability of contractual benefit schedules provided to policyholder.",
            "pdfPage": 35
          }
        ]
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
    "pdf_chapter": "Chapter 2: New Business (NB APP)",
    "validation_rules": [
      {
        "ruleId": "VAL-NB-001",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "02. Proposal Registration",
        "stage": "Agent Verification",
        "targetEntity": "T_AGENT_CONTRACT",
        "ruleName": "Agent License & Active Status Validation",
        "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_NB_AGENT_INVALID",
        "errorMessage": "Agent is inactive, unlicensed for product, or currently suspended. Proposal issue generated.",
        "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
        "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
        "pdfPage": 137
      },
      {
        "ruleId": "VAL-NB-002",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "02. Proposal Registration",
        "stage": "Beneficiary Allocation",
        "targetEntity": "T_POLICY_BENEFICIARY",
        "ruleName": "Beneficiary Share Percentage 100% Balance",
        "condition": "The sum of share percentages for all beneficiaries within the same priority sequence must equal exactly 100.00%.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_NB_BENEFICIARY_SUM_MISMATCH",
        "errorMessage": "Total beneficiary share percentage within same priority order must equal 100%.",
        "systemAction": "Blocks proposal submission and generates proposal issue.",
        "actuarialBasis": "Ensures unequivocal claims disbursement without inter-pleader estate litigation risk.",
        "pdfPage": 137
      },
      {
        "ruleId": "VAL-NB-003",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "02. Proposal Registration",
        "stage": "Beneficiary Legal Type",
        "targetEntity": "T_POLICY_BENEFICIARY",
        "ruleName": "Trust Nomination Relationship Restriction",
        "condition": "For Trust Nomination (Sec 49L / Sec 73 CLPA), relationship is mandatory and strictly restricted to Spouse or Child.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_NB_INVALID_TRUST_RELATION",
        "errorMessage": "Trust nomination only allows Spouse or Child. Other relatives must use Revocable nomination (49M).",
        "systemAction": "Validation fails on Beneficiary screen; blocks proposal validation.",
        "actuarialBasis": "Legal bankruptcy protection compliance: trust policies create an immediate statutory trust in favor of immediate family.",
        "pdfPage": 485
      },
      {
        "ruleId": "VAL-NB-004",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "02. Proposal Registration",
        "stage": "Financial Underwriting",
        "targetEntity": "T_PARTY_FINANCIAL",
        "ruleName": "Proposer Mandatory Annual Income Check",
        "condition": "Proposer Annual Income is mandatory (> 0) and Total Sum Assured <= Maximum Income Multiple (e.g. 25x for Age <= 35).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
        "errorMessage": "The Annual Income of the proposer must be entered. Proposal issue generated.",
        "systemAction": "Generates Underwriting Financial Requirement if multiple exceeded.",
        "actuarialBasis": "Anti-Money Laundering (AML) and anti-selection: ensures coverage is proportionate to economic human life value.",
        "pdfPage": 137
      },
      {
        "ruleId": "VAL-NB-005",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "02. Proposal Registration",
        "stage": "Juvenile Protection",
        "targetEntity": "T_POLICY_BENEFIT",
        "ruleName": "Juvenile Statutory Sum Assured Ceiling",
        "condition": "For Life Assured age < 4 years, Death Sum Assured capped at statutory limit (e.g. $20,000 / 500,000,000 VND).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_NB_JUVENILE_SA_LIMIT",
        "errorMessage": "Sum assured exceeds statutory ceiling for juvenile life assured under 4 years of age.",
        "systemAction": "Auto-trims Sum Assured to statutory limit or blocks quote calculation.",
        "actuarialBasis": "Moral hazard prevention and statutory child welfare regulation compliance.",
        "pdfPage": 55
      },
      {
        "ruleId": "VAL-NB-006",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "02. Proposal Registration",
        "stage": "Health Declaration",
        "targetEntity": "T_NB_DECLARATION",
        "ruleName": "Declaration Form Mandatory Response Completeness",
        "condition": "Every question in the product declaration form must have an affirmative ('Yes') or negative ('No') recorded.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
        "errorMessage": "One or more health/lifestyle declaration questions remain unanswered.",
        "systemAction": "Blocks transition from Data Entry to Underwriting queue.",
        "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation for future contestability assessment.",
        "pdfPage": 61
      },
      {
        "ruleId": "VAL-NB-007",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "02. Proposal Registration",
        "stage": "Initial Premium Receipt",
        "targetEntity": "T_SUSPENSE_RECEIPT",
        "ruleName": "First Premium Minimum Tolerance Match",
        "condition": "Deposited initial premium must equal exact modal gross premium (tolerance 0 VND underpayment).",
        "severity": "SOFT_WARNING",
        "errorCode": "WARN_NB_PREM_SHORTFALL",
        "errorMessage": "Initial collection shortfall detected. Policy cannot issue until balance paid in full.",
        "systemAction": "Parks payment in Suspense Account (`T_SUSPENSE_ACCT`); holds issuance.",
        "actuarialBasis": "No policy contract can form without complete consideration received by insurer.",
        "pdfPage": 359
      },
      {
        "ruleId": "VAL-ISS-001",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "04. Policy Issuance",
        "stage": "SOR Enforce Commit",
        "targetEntity": "T_POLICY",
        "ruleName": "First Premium Receipt Allocation Before Enforce",
        "condition": "Total validated suspense receipts allocated to proposal must exactly equal First Gross Modal Premium.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
        "errorMessage": "Cannot issue policy: first modal premium is unpaid or incompletely allocated.",
        "systemAction": "Blocks commit to SOR `T_POLICY` table; proposal remains in `WAITING_FOR_ISSUE`.",
        "actuarialBasis": "Statutory premium accounting: coverage commencement triggers immediate unearned premium reserve (UPR).",
        "pdfPage": 21
      },
      {
        "ruleId": "VAL-ISS-002",
        "module": "MOD_02",
        "moduleName": "New Business (NB APP)",
        "lifecyclePhase": "04. Policy Issuance",
        "stage": "Document Generation",
        "targetEntity": "T_POLICY_CONTRACT",
        "ruleName": "Contract Schedule & Table of Guaranteed Benefits Generation",
        "condition": "Official policy schedule, benefit illustration, and general provisions PDF must compile with valid digital signature.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_ISS_PDF_GENERATION_FAILED",
        "errorMessage": "Policy contract rendering or digital signing failed. Re-run print spooler.",
        "systemAction": "Retries PDF compilation; alerts Operations supervisor if persistent.",
        "actuarialBasis": "Legal enforceability of contractual benefit schedules provided to policyholder.",
        "pdfPage": 35
      }
    ],
    "validation_rules_count": 9
  },
  {
    "id": "MOD_03",
    "num": "03",
    "title": "Mod 03: Underwriting (UW APP & Risk Decisioning)",
    "subtitle": "STP Auto-Underwriting, 360° Risk Worksheet, Clinical Rating, Counter-Offers (LCA) & Delegation of Authority",
    "icon": "shield-check",
    "badge": "Risk Evaluation",
    "page_range": "Pages 7-8, 137-192",
    "summary": "Module 03 Underwriting operates as the core clinical, financial, and occupational risk assessment engine across eBao Gemini Life Core PAS. It provides automated Straight-Through Processing (STP) rule evaluation, a centralized 3-tab Underwriting Main Workbench (Application Info, UW Worksheet with risk aggregation, and Benefit-Level Decisions), clinical medical examination billing and tracking, numerical rating with Extra Mortality percentage and flat loadings, Counter-Offer (LCA) generation with 30-day customer acceptance tracking, and multi-tier Delegation of Authority (DOA) auto-escalation controls.",
    "mermaid_workflow": "graph TD\n    Queue[\"UW Worklist (Task Pool)\"] --> Lock[\"Claim / Lock Task by Underwriter\"]\n    Lock --> Eval[\"Evaluate Medical & Financial Risk\"]\n    Eval --> DecisionChoice{\"Risk Acceptable?\"}\n    DecisionChoice -- Standard Risk --> Standard[\"Standard Accept (0% Loading)\"]\n    DecisionChoice -- Elevated Risk --> Rated[\"Substandard Rating: EM Loading / Extra Premium\"]\n    DecisionChoice -- Specific Hazard --> Exclude[\"Issue Specific Exclusions\"]\n    DecisionChoice -- Uninsurable --> Decline[\"Decline / Postpone\"]\n    Rated --> ClientConsent[\"Issue Counter-Offer Letter\"]\n    Exclude --> ClientConsent\n    ClientConsent -- Accepted --> EnforceUW[\"Submit UW Disposal & Recalculate Premium\"]\n    Standard --> EnforceUW",
    "core_concepts": [
      [
        {
          "term": "Benefit-Level Decision Independence",
          "def": "The underwriting architecture allows evaluating the principal life benefit and each attached rider separately. A base plan can be accepted at standard rates while supplementary riders (CI, Accident, Disability) are loaded, excluded, or declined."
        },
        {
          "term": "Numerical Rating System (Credits & Debits)",
          "def": "A scientific actuarial risk classification model starting at 100% base mortality, adding debits for impairments (build, cardiovascular, family history, occupation) and subtracting credits for favorable factors, yielding final Extra Mortality percentage."
        },
        {
          "term": "Letter of Conditional Acceptance (LCA / Counter-Offer)",
          "def": "A formal legal document issued when a policy is accepted with non-standard terms (loading, exclusion, reduced SA). Freezes contract at PENDING_ACCEPTANCE for up to 30 calendar days awaiting customer signature and payment."
        },
        {
          "term": "360° Risk Aggregation (Customer Portfolio View)",
          "def": "Real-time summation of total inforce, pending, and lapsed Sum Assured held by the Life Assured across all corporate policies to enforce financial underwriting limits and determine clinical exam tiers."
        },
        {
          "term": "Medical Billing & Clinic Fee Reconciliation",
          "def": "Automated creation of accounts payable invoices (T_MED_BILLING) to compensate contracted hospital/clinic diagnostic networks, with built-in reversal and Free-Look refund clawback controls."
        }
      ]
    ],
    "actuary_notes": [
      [
        "Extra Mortality Formula: Gross Annual Premium = Base Annual Premium * (1 + EM%) + Flat Loading per mille * (Sum Assured / 1,000). Extra mortality ratings accumulate higher surrender cash values and statutory reserves.",
        "Numerical Rating Calibration: Debits (+25 to +300) represent additional expected mortality compared to standard population tables. Policies rated > +200% EM typically require facultative reinsurance placement.",
        "Non-Medical Limits Balancing: Non-medical thresholds are calibrated to balance acquisition turnaround speed (STP rate > 75%) against mortality anti-selection risk."
      ]
    ],
    "op_notes": [
      [
        "Centralized Multi-Module Intake: The Underwriting Workbench triages cases from New Business (NB), Customer Service alterations (CS Sum Assured increase, Transfer of Coverage), and Claims contestability referrals.",
        "Sensitive Underwriting Comments: Comments can be flagged 'Sensitive/Confidential' (hidden from sales agents) or 'Share with Claims' (automatically exposed to Claims Assessors for contestable investigations).",
        "30-Day LCA Expiration Management: Counter-offers not accepted within 30 calendar days automatically expire with proposal cancellation and initial premium refund."
      ]
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
        "title": "Underwriting Task Retrieval, Worklist Triage & Multi-Module Filtering",
        "role": "Underwriter (Junior / Senior / Chief)",
        "objective": "Retrieve, prioritize, and allocate pending underwriting cases across New Business, Customer Service (Alterations), and Claims referral pipelines based on task SLA, authority tier, and risk complexity.",
        "ui_path": "Underwriting > Work List",
        "pdf_page": 143,
        "prerequisites": [
          "User must hold active underwriting credentials ('ROLE_UW_JUNIOR', 'ROLE_UW_SENIOR', or 'ROLE_UW_CHIEF') in URP.",
          "Proposal or transaction transferred to Underwriting queue with status 'Waiting for Underwriting' or 'Underwriting in Progress'.",
          "User's assigned operating branch mapped to policy servicing entity."
        ],
        "steps": [
          "1. From the left main navigation menu, select Underwriting > Work List. System displays the centralized Underwriting Search Page.",
          "2. In the Search Criteria area, utilize Quick Search (enter exact Proposal No or Policy No) or click 'More Search' to expand multi-dimensional filters.",
          "3. Select Underwriting Type: check one or multiple operational sources:\n   - 'New Business' (Pending proposals originating from NB APP)\n   - 'Customer Service' (Sum Assured increase, Rider additions, Transfer of coverage, Reinstatements)\n   - 'Claims' (Contestable claims, non-disclosure investigations, pre-existing condition checks).",
          "4. Configure Advanced Filter Parameters: Select Registration Date Range (task creation timestamp), Priority Level (Urgent VIP, Standard, Escalated), and Task Status ('Waiting for Underwriting', 'Underwriting in Progress', 'Pending Requirements', 'Escalated').",
          "5. Filter by Authority Boundary: System automatically enforces row-level security: underwriters only see tasks whose total risk exposure is within their assigned authority tier or cases specifically delegated to them.",
          "6. Click 'Search'. System queries `T_UW_TASK` and displays matching records with Proposal No, Policyholder, Life Assured, Product Code, Total Sum Assured, Channel, SLA Aging Days, and Current Assignee.",
          "7. To take ownership of an unassigned case, select the row checkbox and click 'Assign to Me'. System locks the task, updating Assignee to current User ID and status to 'Underwriting in Progress'.",
          "8. Click the Proposal No hyperlink on the selected row. Step Result: System routes directly to the centralized 3-tab Underwriting Main Workbench."
        ],
        "fields_table": [
          {
            "name": "Underwriting Type",
            "type": "Multi-Checkbox",
            "required": "Yes",
            "desc": "New Business, Customer Service, or Claims."
          },
          {
            "name": "Proposal / Policy No",
            "type": "Text (Fuzzy/Exact)",
            "required": "No",
            "desc": "Unique contract identifier."
          },
          {
            "name": "Customer Name",
            "type": "Text",
            "required": "No",
            "desc": "Policyholder or Life Assured legal name."
          },
          {
            "name": "Task Status",
            "type": "Select",
            "required": "Yes",
            "desc": "Waiting for UW, UW in Progress, Pending Requirements, Escalated."
          },
          {
            "name": "Channel / Agency",
            "type": "Dropdown",
            "required": "No",
            "desc": "Distribution channel (Agency, Bancassurance, Direct)."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-UW-001",
            "ruleName": "Straight-Through Processing (STP) Eligibility Gating",
            "condition": "Age <= 45 AND Sum Assured <= Non-Medical Limit AND 100% Clean Health Declaration AND Agent Status = ACTIVE.",
            "severity": "ROUTING",
            "errorCode": "ROUTE_UW_MANUAL_QUEUE",
            "systemAction": "Bypasses manual queue if 100% pass; routes to Underwriting Worklist if any rule is triggered.",
            "actuarialBasis": "Filters standard low-risk mortality profiles for immediate auto-issuance while preserving underwriting capacity for complex risks.",
            "pdfPage": 7
          },
          {
            "ruleId": "VAL-UW-003",
            "ruleName": "Underwriter Authority Limit Worklist Boundary",
            "condition": "Underwriters cannot retrieve or approve cases exceeding their maximum delegated Sum Assured and EM loading threshold.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_UW_EXCEEDS_AUTHORITY",
            "systemAction": "Displays case in 'View Only' mode or routes to superior's approval pool.",
            "actuarialBasis": "Prevents unauthorized corporate risk accumulation beyond underwriter competency tier.",
            "pdfPage": 8
          }
        ],
        "actuary_notes": "SLA targets are strictly monitored: Standard NB cases have a 24-hour turnaround target, while Medical Referral cases carry a 5-working-day SLA.",
        "op_notes": "Cases can be bulk-reassigned by Underwriting Supervisors during peak campaign periods to rebalance team workloads."
      },
      {
        "code": "SOP-UW-02",
        "title": "Comprehensive Risk Estimation via 360° UW Worksheet & Risk Aggregation",
        "role": "Medical & Financial Underwriter",
        "objective": "Perform exhaustive multi-dimensional risk assessment reviewing customer lifetime risk aggregation, LIA medical codes, historical claims, and document images.",
        "ui_path": "Underwriting > Main > Tab 1: UW Worksheet",
        "pdf_page": 146,
        "prerequisites": [
          "Proposal opened in Underwriting Main Workbench.",
          "Client identity records matched in Master Person Index (`T_PARTY`)."
        ],
        "steps": [
          "1. In the Underwriting Main Workbench, locate the top Application Information panel. Review key summary metrics: Plan Code, Base Sum Assured, Modal Premium, Payment Mode, Agent Name, and Distribution Channel.",
          "2. Access Document Management System (DMS): Click the 'Image' hyperlink to open the integrated DMS viewer. Review high-resolution scans of signed application forms, medical questionnaires, and customer identification (CCCD/Passport).",
          "3. Select the 'UW Worksheet' tab. The system loads 5 integrated clinical and financial risk assessment sections:\n   - Section A: 'Policy Information' (Product structure, coverages, life assured relationship)\n   - Section B: 'Medical / Non-Medical Code Information' (Existing Life Insurance Association LIA impairment codes, adverse registry flags)\n   - Section C: 'Risk Summary & Aggregation' (Total inforce Sum Assured across all policies for this client)\n   - Section D: 'Life Survey & Field Inspection' (Occupational inspection reports, financial questionnaire)\n   - Section E: 'Underwriter Comments History' (Audit trail of all previous underwriter notes).",
          "4. Review Risk Aggregation: System automatically aggregates total active life coverage across all inforce, pending, and lapsed policies held by the Life Assured in `T_POLICY_BENEFIT`.\n   - If Total Aggregated SA exceeds Non-Medical Limit for attained age, system automatically triggers medical exam requirements.",
          "5. Review Claims & Customer Service History: Inspect Section C tables showing previous claim payouts (death, disability, hospital cash) and CS alterations on existing policies.",
          "6. Input Underwriter Internal Remarks: Click the '+ COMMENT' button to log clinical observations. Select Sensitivity flag:\n   - 'Sensitive / Confidential' (Restricted to Underwriting and Legal teams; invisible to sales agents)\n   - 'Share with Claims' (Automatically syndicated to Claims Assessor workbench for future contestability reference).",
          "7. Step Result: Risk worksheet status advances to 'EVALUATED'. System synthesizes all data points into the numerical rating worksheet."
        ],
        "fields_table": [
          {
            "name": "Total Aggregated SA",
            "type": "Currency Display",
            "required": "Yes",
            "desc": "Sum of all active life risks across corporate portfolio."
          },
          {
            "name": "LIA Impairment Code",
            "type": "Code Display",
            "required": "No",
            "desc": "Industry-shared medical adverse registry code."
          },
          {
            "name": "Comment Sensitivity",
            "type": "Select (Yes/No)",
            "required": "Yes",
            "desc": "Controls confidentiality of underwriter notes."
          },
          {
            "name": "Share with Claims",
            "type": "Checkbox",
            "required": "No",
            "desc": "Flags remarks for automatic exposure in Claims Workbench."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-NB-004",
            "ruleName": "Proposer Mandatory Annual Income & Financial Limit",
            "condition": "Total Aggregated Life Sum Assured must be <= Maximum Income Multiple (e.g. 25x Annual Income for Age <= 35).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
            "systemAction": "Blocks standard approval; generates Financial Underwriting requirement (Audited Tax Returns).",
            "actuarialBasis": "Anti-selection and moral hazard prevention: ensures insurance coverage correlates with economic earning power.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-UW-002",
            "ruleName": "Medical Requirement Completeness Prerequisite",
            "condition": "Underwriter cannot issue final approval while outstanding medical requirements remain unfulfilled.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_UW_PENDING_REQUIREMENTS",
            "systemAction": "Disables 'Approve' button on Decision tab.",
            "actuarialBasis": "Clinical risk integrity: policy cannot bind insurer without verified medical documentation.",
            "pdfPage": 337
          }
        ],
        "actuary_notes": "Risk aggregation formulas include 100% of Basic Life SA, 100% of Accelerated CI SA, and 50% of Accidental Death & Dismemberment SA.",
        "op_notes": "Comments flagged as 'Share with Claims' are legally discoverable during regulatory dispute resolution and must maintain objective clinical tone."
      },
      {
        "code": "SOP-UW-03",
        "title": "Medical & Non-Medical Requirement Issuance, Document Tracking & Clinic Billing",
        "role": "Underwriting Support Officer / Medical Underwriter",
        "objective": "Generate clinical medical exam requirements, dispatch attending physician statement (APS) requests, track document receipt completeness, and settle partner clinic examination invoices.",
        "ui_path": "Underwriting > Main > Tab 2: UW / Proposal Issues & Medical Billing",
        "pdf_page": 162,
        "prerequisites": [
          "Proposal requires medical examination based on Age/SA grid or positive health declaration.",
          "Contracted medical provider clinics onboarded in Partner Directory."
        ],
        "steps": [
          "1. From the Underwriting Main page, navigate to 'Tab 2: UW / Proposal Issues'.",
          "2. System displays automatically generated system issues (e.g., 'Age 48 and SA > $100k triggers Medical Exam Level 2').",
          "3. To raise manual clinical requirements, click '+ Add Requirement'. Select Requirement Category:\n   - 'MEDICAL_EXAM' (Full Medical Examination by Physician MER)\n   - 'LAB_TEST' (Lipid Profile, Fasting Blood Glucose / HbA1c, Liver Function Test LFT, Resting ECG, HIV Screen)\n   - 'SPECIALIST_REPORT' (Cardiologist Consultation, Exercise Stress Test, Echocardiogram)\n   - 'NON_MEDICAL' (Financial Questionnaire, Hazardous Sports Declaration, Foreign Travel Questionnaire).",
          "4. Select Preferred Clinic / Panel Provider from contracted medical network dropdown. System auto-populates clinic billing code and fee schedule.",
          "5. Set Follow-up Expiry Timer: System sets standard 30-day requirement fulfillment window with automated reminder alerts to servicing agent on Day 7, Day 14, and Day 21.",
          "6. Document Receipt & Completeness Sign-off: When clinic returns medical lab reports:\n   - Open the requirement row, review uploaded lab test values, and update 'Completeness IND' to 'Y - Complete'.\n   - If underwriter determines a test is no longer required due to mitigating factors, select 'Waive' and enter mandatory waiver justification ('Waived IND = Y').",
          "7. Settle Clinic Examination Invoice (`Underwriting > Medical Billing > Create Medical Billing`):\n   - Select Clinic Name, enter Invoice No, select Policy/Proposal No, input Fee Amount (e.g. $120.00 / 3,000,000 VND), and click 'Confirm'. System creates AP invoice in `T_MED_BILLING`.",
          "8. Reverse Erroneous Medical Billing: If billing record was created with incorrect fee or clinic, navigate to `Underwriting > Medical Billing > Reverse Medical Billing`, search the billing record, and click 'Reverse' to generate offsetting credit memo."
        ],
        "fields_table": [
          {
            "name": "Requirement Category",
            "type": "Select",
            "required": "Yes",
            "desc": "Medical Exam, Lab Test, Specialist Report, Non-Medical."
          },
          {
            "name": "Clinic Provider Code",
            "type": "Select",
            "required": "Conditional",
            "desc": "Contracted diagnostic hospital / clinic provider."
          },
          {
            "name": "Completeness IND",
            "type": "Select (Y/N)",
            "required": "Yes",
            "desc": "Flags whether laboratory findings are fully received."
          },
          {
            "name": "Waive IND",
            "type": "Select (Y/N)",
            "required": "Yes",
            "desc": "Underwriter formal waiver of mandatory requirement."
          },
          {
            "name": "Clinic Fee Amount",
            "type": "Currency",
            "required": "Yes",
            "desc": "Cost of medical check-up payable to partner clinic."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-NB-006",
            "ruleName": "Declaration Form Mandatory Response Completeness",
            "condition": "Every question in the health declaration form must have a recorded answer; positive answers auto-generate requirements.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
            "systemAction": "Blocks proposal advancement until all clinical declaration items are resolved.",
            "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation required to legally defend future policy contestability.",
            "pdfPage": 61
          },
          {
            "ruleId": "VAL-FL-003",
            "ruleName": "Medical Examination Cost Recovery on Free-Look",
            "condition": "All approved medical clinic fees recorded in T_MED_BILLING are deductible from premium refund if customer cancels in Free-Look.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_CLAWBACK_EXECUTION",
            "systemAction": "Automatically deducts accumulated medical billing fees from Free-Look refund voucher.",
            "actuarialBasis": "Statutory non-forfeiture law: insurer has the right to deduct actual incurred clinical examination costs from refund.",
            "pdfPage": 483
          }
        ],
        "actuary_notes": "Medical examination costs are tracked as underwriting expenses; for large sum assured policies, clinic fees are subsidized by reinsurance allowances.",
        "op_notes": "Requirements not satisfied within 60 calendar days automatically trigger 'Closure Due to Incomplete Requirements' with proposal refund."
      },
      {
        "code": "SOP-UW-04",
        "title": "Benefit-Level Underwriting Decisioning, Numerical Rating & Extra Mortality Loading",
        "role": "Underwriting Specialist / Chief Underwriter",
        "objective": "Formulate granular underwriting decisions evaluating the main life plan and each attached rider independently, applying numerical mortality ratings, flat extra loadings, or exclusion clauses.",
        "ui_path": "Underwriting > Main > Tab 3: UW Decision",
        "pdf_page": 145,
        "prerequisites": [
          "All mandatory medical and financial requirements completed or waived.",
          "Client numerical rating debits and credits calculated based on clinical evidence."
        ],
        "steps": [
          "1. In the Underwriting Main Workbench, navigate to 'Tab 3: UW Decision'.",
          "2. Review Benefit-Level Decision Hierarchy: The screen displays the Main Coverage item and every attached rider in distinct rows:\n   - Row 1: Main Plan `ENDOW_20` (Life Assured: Nguyen Van An)\n   - Row 2: Accelerated CI Rider `RIDER_CI_01`\n   - Row 3: Accidental Death & Dismemberment `RIDER_ADD_01`\n   - Row 4: Hospital Income Benefit `RIDER_HIB_01`\n   - Row 5: Waiver of Premium `RIDER_WP_01`.",
          "3. Formulate Independent Decision per Benefit: Underwriters can accept the base life coverage at standard rates while loading or declining specific high-risk riders.",
          "4. Select Decision Code for each row:\n   - 'STND - Standard Accept' (Standard mortality risk; Base rate 100%)\n   - 'PERC - Extra Mortality Percentage Loading' (Applies percentage debit to base mortality rate, e.g. +50% EM for hypertension, +100% EM for cardiovascular)\n   - 'FLAT - Flat Extra Loading' (Applies fixed cash addition per $1,000 Sum Assured, e.g. $2.50 / mille for commercial aviation)\n   - 'EXCL - Exclusion Clause' (Excludes specific organ, pre-existing condition, or hazardous pursuit from coverage)\n   - 'POST - Postpone' (Defers risk assessment for 3, 6, or 12 months awaiting medical stabilization)\n   - 'DECL - Decline' (Permanent refusal of coverage).",
          "5. Configure Percentage Loading (EM): Input loading percentage (e.g. '50%'). System recalculates benefit gross premium:\n   `Gross Premium = Base Annual Premium * (1 + 0.50)`.",
          "6. Configure Flat Extra Loading: Input Flat Rate per Mille (e.g. '$3.00') and duration (e.g. 'First 5 Years' or 'Entire Term'). System computes:\n   `Flat Premium Addition = SA / 1000 * 3.00`.",
          "7. Configure Exclusion Endorsement: Click 'Add Exclusion'. Select standard exclusion clause from master exclusion library (e.g., 'EX-SPINE: Diseases or injuries of lumbar spine and intervertebral discs').",
          "8. Click 'Calculate Revised Premium'. Step Result: System executes Product Factory rating microservice, updates total policy modal premium, and displays comparison between original and revised figures.",
          "9. If all decisions are Standard Accept, underwriter clicks 'Submit Decision'. Case status updates to 'Underwriting Completed' and advances proposal to Policy Issuance.",
          "10. If any decision involves Loading, Exclusion, or Reduced SA, system automatically generates an LCA (Letter of Conditional Acceptance / Counter-Offer) and sets status to 'Pending LCA'."
        ],
        "fields_table": [
          {
            "name": "Benefit Decision",
            "type": "Select",
            "required": "Yes",
            "desc": "Standard, Percentage Loading, Flat Loading, Exclusion, Postpone, Decline."
          },
          {
            "name": "EM Percentage (%)",
            "type": "Numeric (+%)",
            "required": "Conditional",
            "desc": "Extra mortality debit (+25% to +300%)."
          },
          {
            "name": "Flat Loading (per mille)",
            "type": "Numeric ($)",
            "required": "Conditional",
            "desc": "Flat cash addition per $1,000 Sum Assured."
          },
          {
            "name": "Flat Loading Duration",
            "type": "Select",
            "required": "Conditional",
            "desc": "Entire Policy Term or Temporary (1 to 10 Years)."
          },
          {
            "name": "Exclusion Clause Code",
            "type": "Search Select",
            "required": "Conditional",
            "desc": "Standard exclusion clause from master registry."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-UW-005",
            "ruleName": "Benefit-Level Decision Independence",
            "condition": "Underwriting decisions must be stored and versioned at individual benefit level in T_POLICY_BENEFIT.",
            "severity": "ROUTING",
            "errorCode": "INFO_UW_BENEFIT_LEVEL_DECISION",
            "systemAction": "Updates T_POLICY_BENEFIT.UW_DECISION individually for each attached coverage item.",
            "actuarialBasis": "Enables maximum customer retention by approving viable base life risks even if specialized health riders are uninsurable.",
            "pdfPage": 193
          },
          {
            "ruleId": "VAL-PF-003",
            "ruleName": "Rider Sum Assured & Term Capping",
            "condition": "If Base Plan Sum Assured is reduced by underwriting decision, attached rider Sum Assured must be automatically trimmed to not exceed base plan SA.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_PF_RIDER_EXCEEDS_BASE",
            "systemAction": "Trims rider SA to match reduced base plan ceiling.",
            "actuarialBasis": "Anti-selection control: supplementary riders cannot exceed principal life insurance liability.",
            "pdfPage": 55
          }
        ],
        "actuary_notes": "Policies rated with Extra Mortality percentage loadings accumulate higher cash surrender values and require higher statutory UPR reserves.",
        "op_notes": "Exclusion clauses remain permanently attached to the contract and are dynamically queried by Claims Assessors during claim registration."
      },
      {
        "code": "SOP-UW-05",
        "title": "Letter of Conditional Acceptance (LCA / Counter-Offer) Generation & Client Endorsement",
        "role": "Underwriting Case Manager / Agency Liaison",
        "objective": "Compile formal Letter of Conditional Acceptance (LCA / Counter-Offer) detailing ratings and exclusions, issue revised benefit illustrations, and process customer acceptance.",
        "ui_path": "Underwriting > Main > LCA Management",
        "pdf_page": 160,
        "prerequisites": [
          "Underwriting decision finalized with non-standard terms (Percentage loading, flat loading, or exclusion).",
          "Underwriting authority limits validated for LCA submission."
        ],
        "steps": [
          "1. On Underwriting Main Decision tab, when non-standard decision is submitted, system displays the 'LCA Generation Panel'.",
          "2. Review Counter-Offer Terms: The screen synthesizes the counter-offer proposal:\n   - Original Premium vs Revised Premium\n   - Additional Premium Payable (First modal difference)\n   - Special Condition Endorsements and Exclusion Wording\n   - Revised Table of Guaranteed Benefits.",
          "3. Authority Approval Check: System evaluates whether current user's authority covers the counter-offer terms:\n   - If Within Authority: LCA status updates to 'To Be Print'.\n   - If Beyond Authority: Case is auto-escalated to superior's approval pool with LCA status 'To Be Submitted'.",
          "4. Generate Official LCA Document: Click 'Print LCA'. System generates official Counter-Offer Letter PDF with corporate legal header, detailed medical explanation, revised quotation schedule, and Client Acceptance Slip.",
          "5. Dispatch LCA: System transmits electronic notification via SMS/Email to Policyholder and Servicing Agent containing secure portal link to review and sign the counter-offer.",
          "6. Set Acceptance Validity Timer: Counter-offer remains open for exactly 30 calendar days (`LCA_VALIDITY_DATE = LCA_DATE + 30`).",
          "7. Process Customer Response:\n   - Option A: Client Accepts: Policyholder signs e-Acceptance form via OTP/biometrics and deposits additional premium difference into bank clearing account.\n   - Option B: Client Declines: Case is closed with status 'Counter-Offer Declined by Customer'; initial premium refund voucher generated.\n   - Option C: 30-Day Expiry: Case lapses automatically with status 'LCA Expired'.",
          "8. Step Result: Upon confirmed customer acceptance and full premium settlement, LCA status updates to 'LCA Completed'. Case status advances to 'Underwriting Completed', releasing contract for Policy Issuance."
        ],
        "fields_table": [
          {
            "name": "LCA Reference No",
            "type": "Read-only Text",
            "required": "Yes",
            "desc": "Unique identifier in T_UW_COUNTER_OFFER."
          },
          {
            "name": "LCA Validity Days",
            "type": "Numeric (Default 30)",
            "required": "Yes",
            "desc": "Statutory offer validity window in calendar days."
          },
          {
            "name": "Additional Premium Due",
            "type": "Currency Display",
            "required": "Yes",
            "desc": "Difference between revised modal premium and initial deposit."
          },
          {
            "name": "Client Decision",
            "type": "Radio",
            "required": "Yes",
            "desc": "Accepted, Declined, or Expired."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-UW-004",
            "ruleName": "Counter-Offer Acceptance & Premium Adjustment",
            "condition": "Policy cannot be issued or inforced while an active Counter-Offer remains in unaccepted or unpaid state.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_UW_PENDING_CLIENT_ACCEPTANCE",
            "systemAction": "Freezes policy status at PENDING_ACCEPTANCE; blocks commit to SOR T_POLICY.",
            "actuarialBasis": "Contract law: counter-offer constitutes rejection of original proposal; contract only forms upon customer agreement to revised terms.",
            "pdfPage": 144
          },
          {
            "ruleId": "VAL-ISS-001",
            "ruleName": "First Premium Receipt Allocation Before Enforce",
            "condition": "Total validated suspense receipts allocated to proposal must exactly equal the revised First Gross Modal Premium.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
            "systemAction": "Blocks policy issuance until additional loading premium is fully settled.",
            "actuarialBasis": "Consideration requirement: coverage cannot commence without full premium funding.",
            "pdfPage": 21
          }
        ],
        "actuary_notes": "Statutory commencement date for accepted counter-offers is determined as the later date of LCA signing date or full premium payment receipt date.",
        "op_notes": "Agents receive automated daily push notifications tracking pending LCA expiration dates to maximize campaign conversion rates."
      },
      {
        "code": "SOP-UW-06",
        "title": "Delegation of Authority (DOA) Limit Validation & Auto-Escalation Workflow",
        "role": "Senior Underwriting Manager / Chief Underwriter",
        "objective": "Enforce institutional governance over maximum underwriter financial exposure, review cases escalated from junior staff, and coordinate reinsurance facultative referrals.",
        "ui_path": "Underwriting > Task Pool > Escalation Management",
        "pdf_page": 160,
        "prerequisites": [
          "Case escalated due to Sum Assured, EM percentage, or high-risk occupation exceeding lower underwriter authority limit.",
          "User must hold higher authority tier credentials in URP (`ROLE_UW_SENIOR`, `ROLE_UW_CHIEF`)."
        ],
        "steps": [
          "1. Navigate to Underwriting > Work List. Click 'Task Pool' and select the 'Pending Approval / Escalations' queue.",
          "2. System displays all cases escalated by junior underwriters or automated business rules. The table lists: Proposal No, Life Assured, Proposed SA, Requested EM Loading, Originating Underwriter, Escalation Trigger Reason, and Escalation Date.",
          "3. Select the escalated case to open the Escalation Review Dashboard.",
          "4. Review Escalation Reason: System highlights the specific trigger:\n   - 'SA Exceeds Limit' (e.g. SA is $450,000; Level 1 limit is $100,000)\n   - 'Rating Exceeds Limit' (e.g. EM loading is +150%; Level 2 limit is +100%)\n   - 'Decline Authority' (Only Chief Underwriter can sanction outright risk decline).",
          "5. Review Junior Underwriter Worksheet & Rationale: Inspect notes, clinical summaries, and preliminary recommendations provided by originating underwriter.",
          "6. Reinsurance Retention Limit Check: System compares Total Aggregated Life SA against corporate net retention limit ($100,000 / 2.5 Billion VND):\n   - If SA <= Retention Limit: Case is retained 100% internally.\n   - If SA > Retention Limit: Surplus is ceded automatically to Treaty Reinsurance or flagged for Facultative Reinsurance Referral.",
          "7. Formulate Superior Decision:\n   - 'APPROVE AS RECOMMENDED' (Endorses junior underwriter recommendation)\n   - 'MODIFY DECISION' (Adjusts loading percentage, changes exclusion scope, or requires additional clinical test)\n   - 'RE-ESCALATE' (Forwards to Chief Underwriter or Underwriting Committee for extreme exposures > $1,000,000).",
          "8. Input Senior Underwriter Sign-off Justification in audit log.",
          "9. Click 'Submit Approval'. Step Result: Case returns to originating underwriter with status 'Approval Completed' or auto-dispatches LCA directly to customer."
        ],
        "fields_table": [
          {
            "name": "Escalation Reason",
            "type": "Read-only Display",
            "required": "Yes",
            "desc": "Sum Assured, Loading %, Exclusion complexity, or Decline sanction."
          },
          {
            "name": "Senior Approval Decision",
            "type": "Radio",
            "required": "Yes",
            "desc": "Approve, Modify, or Re-escalate."
          },
          {
            "name": "Reinsurance Arrangement",
            "type": "Select",
            "required": "Yes",
            "desc": "100% Retained, Quota Share Treaty, Surplus Treaty, or Facultative Referral."
          },
          {
            "name": "Approval Audit Justification",
            "type": "Text Area",
            "required": "Yes",
            "desc": "Mandatory rationale recorded in permanent policy governance log."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-UW-003",
            "ruleName": "Underwriter Financial & Rating Authority Delegation",
            "condition": "Proposed Sum Assured and EM loading must be within the Underwriter's signed authority matrix limit.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_UW_EXCEEDS_AUTHORITY",
            "systemAction": "Auto-escalates task to Chief Underwriter or Underwriting Committee pool.",
            "actuarialBasis": "Internal control segregation to avoid unauthorized systemic risk assumption.",
            "pdfPage": 8
          },
          {
            "ruleId": "VAL-PF-002",
            "ruleName": "Maturity Age Ceiling Enforcement",
            "condition": "Underwriters cannot approve cases where entry age + term exceeds maximum product maturity age.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_PF_MAX_MATURITY_EXCEEDED",
            "systemAction": "Hard stop: blocks approval; forces term reduction or proposal decline.",
            "actuarialBasis": "Mortality tables terminate at maximum attained age; coverage beyond ceiling is mathematically unpriced.",
            "pdfPage": 27
          }
        ],
        "actuary_notes": "Corporate net retention limits are reviewed annually by the Appointed Actuary and approved by the Board of Directors.",
        "op_notes": "Cases requiring Facultative Reinsurance referral generate a dedicated electronic slip dispatched via secure reinsurer portal."
      }
    ],
    "sop_count": 6,
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
    "pdf_chapter": "Chapter 3: Underwriting Workbench & Clinical Risk Assessment",
    "validation_rules": [
      {
        "ruleId": "VAL-UW-001",
        "module": "MOD_03",
        "moduleName": "Underwriting (UW APP)",
        "lifecyclePhase": "03. Underwriting Assessment",
        "stage": "STP Auto-Underwriting",
        "targetEntity": "T_AUTO_UW_LOG",
        "ruleName": "Straight-Through Processing (STP) Eligibility Gating",
        "condition": "Age <= 45 AND Sum Assured <= Non-Medical Limit AND 100% Negative Health Declaration AND Agent Compliance = 'PASS'.",
        "severity": "ROUTING",
        "errorCode": "ROUTE_UW_MANUAL_QUEUE",
        "errorMessage": "Proposal fails STP criteria; escalated to manual Underwriting Workbench.",
        "systemAction": "Routes task to Senior Underwriter queue with rule discrepancy triggers.",
        "actuarialBasis": "Filters out elevated mortality/morbidity risks for human clinical judgment.",
        "pdfPage": 7
      },
      {
        "ruleId": "VAL-UW-002",
        "module": "MOD_03",
        "moduleName": "Underwriting (UW APP)",
        "lifecyclePhase": "03. Underwriting Assessment",
        "stage": "Medical Requirements",
        "targetEntity": "T_UW_REQUIREMENT",
        "ruleName": "Medical Requirement Completeness Hard Stop",
        "condition": "All generated medical and non-medical requirements must have Completeness IND = 'Y' or Waived IND = 'Y'.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_UW_PENDING_REQUIREMENTS",
        "errorMessage": "There are uncompleted required documents or pending medical exams. Cannot approve proposal.",
        "systemAction": "Disables 'Approve' and 'Issue Policy' buttons on Underwriting Workbench.",
        "actuarialBasis": "Prevents legally binding policy issuance without verified clinical health parameters.",
        "pdfPage": 337
      },
      {
        "ruleId": "VAL-UW-003",
        "module": "MOD_03",
        "moduleName": "Underwriting (UW APP)",
        "lifecyclePhase": "03. Underwriting Assessment",
        "stage": "Authority Limits",
        "targetEntity": "T_UW_AUTHORITY",
        "ruleName": "Underwriter Financial & Rating Authority Delegation",
        "condition": "Proposed Sum Assured and EM loading must be within the Underwriter's signed authority matrix limit.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_UW_EXCEEDS_AUTHORITY",
        "errorMessage": "Sum assured or loading exceeds current underwriter authority limit. Auto-escalation required.",
        "systemAction": "Auto-escalates task to Chief Underwriter or Underwriting Committee pool.",
        "actuarialBasis": "Internal control segregation to avoid unauthorized systemic risk assumption.",
        "pdfPage": 8
      },
      {
        "ruleId": "VAL-UW-004",
        "module": "MOD_03",
        "moduleName": "Underwriting (UW APP)",
        "lifecyclePhase": "03. Underwriting Assessment",
        "stage": "Counter-Offer Management",
        "targetEntity": "T_UW_COUNTER_OFFER",
        "ruleName": "Counter-Offer Acceptance & Premium Adjustment",
        "condition": "If rating applied (Loading > 0 or Exclusion), client signed acceptance and revised premium paid before policy can issue.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_UW_PENDING_CLIENT_ACCEPTANCE",
        "errorMessage": "Proposal has active Counter-Offer. Policy cannot inforce until client signs endorsement form.",
        "systemAction": "Freezes policy status at `PENDING_ACCEPTANCE` with 30-day offer expiration timer.",
        "actuarialBasis": "Contract law: counter-offer terminates original proposal; new contract forms only upon mutual agreement.",
        "pdfPage": 144
      },
      {
        "ruleId": "VAL-UW-005",
        "module": "MOD_03",
        "moduleName": "Underwriting (UW APP)",
        "lifecyclePhase": "03. Underwriting Assessment",
        "stage": "Benefit-Level Underwriting",
        "targetEntity": "T_POLICY_BENEFIT",
        "ruleName": "Benefit-Level Decision Independence",
        "condition": "Underwriting decisions are evaluated at individual benefit level: main plan and each rider evaluated independently.",
        "severity": "ROUTING",
        "errorCode": "INFO_UW_BENEFIT_LEVEL_DECISION",
        "errorMessage": "A rider may be declined or loaded while the base life coverage is accepted at standard rates.",
        "systemAction": "Updates `T_POLICY_BENEFIT.UW_DECISION` individually for each attached coverage item.",
        "actuarialBasis": "Enables maximum customer retention by approving viable base life risks even if specialized health riders are uninsurable.",
        "pdfPage": 193
      }
    ],
    "validation_rules_count": 5,
    "clinical_impairments": [
      {
        "id": "IMP-01",
        "name": "Standard Health (Clean Declaration)",
        "category": "Standard Risk",
        "debits": 0,
        "credits": -10,
        "emPct": 0,
        "flatRate": 0,
        "exclusion": "None",
        "decision": "STND - Standard Accept",
        "authTier": "Level 1 Underwriter ($100k)",
        "desc": "Non-smoker, BMI 21.5, normal blood pressure (115/75), zero personal or family adverse medical history. 100% STP eligible."
      },
      {
        "id": "IMP-02",
        "name": "Hypertension Stage 1 (Well-Controlled)",
        "category": "Cardiovascular",
        "debits": 40,
        "credits": -15,
        "emPct": 25,
        "flatRate": 0,
        "exclusion": "None",
        "decision": "PERC - +25% Extra Mortality Loading",
        "authTier": "Level 1 Underwriter ($100k)",
        "desc": "BP 138/88 on single monotherapy medication for > 12 months, ECG normal, zero end-organ damage. Rated +25% EM."
      },
      {
        "id": "IMP-03",
        "name": "Type 2 Diabetes Mellitus (HbA1c 7.8%)",
        "category": "Metabolic",
        "debits": 85,
        "credits": -10,
        "emPct": 75,
        "flatRate": 0,
        "exclusion": "None",
        "decision": "PERC - +75% Extra Mortality Loading",
        "authTier": "Level 2 Underwriter ($300k)",
        "desc": "Diagnosed 3 years ago, oral hypoglycemic agents, microalbuminuria negative, non-smoker. Rated +75% EM with mandatory annual checkup."
      },
      {
        "id": "IMP-04",
        "name": "Obesity Class II (BMI 35.2 kg/m²)",
        "category": "Build Impairment",
        "debits": 60,
        "credits": -10,
        "emPct": 50,
        "flatRate": 0,
        "exclusion": "None",
        "decision": "PERC - +50% Extra Mortality Loading",
        "authTier": "Level 1 Underwriter ($100k)",
        "desc": "Height 168 cm, Weight 99 kg. Fasting blood glucose normal, lipid panel moderately elevated. Rated +50% EM."
      },
      {
        "id": "IMP-05",
        "name": "Hazardous Occupation (Commercial Diver)",
        "category": "Occupational",
        "debits": 0,
        "credits": 0,
        "emPct": 0,
        "flatRate": 5.0,
        "exclusion": "Decompression Sickness Waiver",
        "decision": "FLAT - $5.00 per Mille Flat Loading",
        "authTier": "Level 2 Underwriter ($300k)",
        "desc": "Offshore deep-sea commercial diver (> 30 meters depth). Base life accepted with $5.00/mille flat extra loading; Accidental Death & Dismemberment declined."
      },
      {
        "id": "IMP-06",
        "name": "Chronic Lumbar Disc Herniation (L4-L5)",
        "category": "Musculoskeletal",
        "debits": 15,
        "credits": 0,
        "emPct": 0,
        "flatRate": 0,
        "exclusion": "EX-SPINE (Lumbar Spine & Disc Exclusion)",
        "decision": "EXCL - Standard Life with Spine Exclusion",
        "authTier": "Level 1 Underwriter ($100k)",
        "desc": "Conservative treatment without surgical intervention. Base Life accepted at standard rates; Total & Permanent Disability (TPD) rider issued with Spine Exclusion clause."
      },
      {
        "id": "IMP-07",
        "name": "Coronary Artery Disease with Stent Placement",
        "category": "Cardiovascular Critical",
        "debits": 160,
        "credits": -10,
        "emPct": 150,
        "flatRate": 0,
        "exclusion": "Riders CI & TPD Declined",
        "decision": "PERC - +150% Extra Mortality Loading",
        "authTier": "Level 3 Chief Underwriter ($1M)",
        "desc": "Single drug-eluting stent placed 18 months ago, asymptomatic, left ventricular ejection fraction 55%. Base life rated +150% EM; Critical Illness rider permanently declined."
      },
      {
        "id": "IMP-08",
        "name": "Active Malignant Neoplasm (Decline)",
        "category": "Oncology",
        "debits": 500,
        "credits": 0,
        "emPct": 0,
        "flatRate": 0,
        "exclusion": "N/A",
        "decision": "DECL - Outright Decline",
        "authTier": "Level 3 Chief Underwriter ($1M)",
        "desc": "Currently undergoing chemotherapy / radiation therapy. Life risk uninsurable; proposal declined with 100% initial premium refund."
      }
    ],
    "non_medical_grid": [
      {
        "ageBand": "Age 18 - 35",
        "maxNonMed": "$150,000 / 3.75B VND",
        "examL1": "$150,001 - $300,000",
        "testsL1": "MER, Urinalysis",
        "examL2": "> $300,000",
        "testsL2": "MER, Full Blood Count, Lipids, HbA1c, Resting ECG, HIV"
      },
      {
        "ageBand": "Age 36 - 45",
        "maxNonMed": "$100,000 / 2.50B VND",
        "examL1": "$100,001 - $250,000",
        "testsL1": "MER, Urinalysis, Fasting Glucose",
        "examL2": "> $250,000",
        "testsL2": "MER, Blood Profile, Lipids, Resting ECG, Chest X-Ray, HIV"
      },
      {
        "ageBand": "Age 46 - 55",
        "maxNonMed": "$50,000 / 1.25B VND",
        "examL1": "$50,001 - $150,000",
        "testsL1": "MER, Full Blood, Resting ECG",
        "examL2": "> $150,000",
        "testsL2": "MER, Complete Blood, HbA1c, Exercise Stress ECG, Urine Cotinine"
      },
      {
        "ageBand": "Age 56 - 65",
        "maxNonMed": "$20,000 / 500M VND",
        "examL1": "$20,001 - $75,000",
        "testsL1": "MER, Full Chemistry, Resting ECG",
        "examL2": "> $75,000",
        "testsL2": "Comprehensive Geriatric Profile, Stress Echo, Carotid Ultrasound"
      }
    ],
    "doa_matrix": [
      {
        "tier": "Level 1 (Junior UW)",
        "maxSA": "$100,000 / 2.5B VND",
        "maxEM": "+50% Extra Mortality",
        "flatCap": "$2.50 / mille",
        "exclusionScope": "Standard Single Exclusions",
        "declineAuth": "No (Escalation Required)"
      },
      {
        "tier": "Level 2 (Senior UW)",
        "maxSA": "$300,000 / 7.5B VND",
        "maxEM": "+100% Extra Mortality",
        "flatCap": "$5.00 / mille",
        "exclusionScope": "Complex Multiple Exclusions",
        "declineAuth": "No (Escalation Required)"
      },
      {
        "tier": "Level 3 (Chief UW)",
        "maxSA": "$1,000,000 / 25B VND",
        "maxEM": "+200% Extra Mortality",
        "flatCap": "$10.00 / mille",
        "exclusionScope": "Non-Standard Legal Clauses",
        "declineAuth": "Yes (Permanent Sanction)"
      },
      {
        "tier": "Executive / Reinsurance",
        "maxSA": "> $1,000,000 (Facultative)",
        "maxEM": "> +200% Extra Mortality",
        "flatCap": "> $10.00 / mille",
        "exclusionScope": "Reinsurer Special Treaty Terms",
        "declineAuth": "Yes (Committee Board)"
      }
    ]
  },
  {
    "id": "MOD_04",
    "num": "04",
    "title": "Mod 04: Customer Service (CS APP)",
    "subtitle": "In-force Policy Alterations, Non-forfeiture (RPU, ETA, APL), Surrender & Policy Loans",
    "icon": "refresh",
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
        "pdf_page": 204,
        "validation_rules": [
          {
            "ruleId": "VAL-FL-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Cool-off Window Verification",
            "targetEntity": "T_POLICY_DELIVERY",
            "ruleName": "Delivery Date Anchor & 21-Day Statutory Window",
            "condition": "Free-Look Cancellation request date must be <= Policy Delivery Date (DELIVERY_DATE) + 21 calendar days.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_WINDOW_EXPIRED",
            "errorMessage": "Free-look period has expired. Cancellation must be processed as Policy Surrender.",
            "systemAction": "Rejects Free-Look transaction; redirects operator to Surrender Workbench.",
            "actuarialBasis": "Insurance Business Law 08/2022/QH15 Article 35: 21-day cooling-off period measured strictly from confirmed receipt.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-FL-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Claim Conflict Check",
            "targetEntity": "T_CLAIM",
            "ruleName": "Zero Paid Claim Prerequisite for Free-Look Refund",
            "condition": "There must be absolutely zero claims paid out or pending under any benefit of this policy.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_CLAIMS_EXIST",
            "errorMessage": "There should be no claims paid out or pending under this policy to qualify for Free-Look cancellation.",
            "systemAction": "Hard stop: aborts cancellation; policy remains inforce.",
            "actuarialBasis": "Prevention of unjust enrichment: policyholder cannot claim insurance indemnity and subsequently demand premium refund.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-LN-003",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "ILP Pending Transaction Check",
            "targetEntity": "T_FUND_ORDER",
            "ruleName": "Investment Linked Pending Fund Freeze",
            "condition": "If policy is Investment-Linked (ILP), it must have zero pending fund unit orders (switches, top-ups, redemptions).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_PENDING_FUND_TX",
            "errorMessage": "Policy has unsettled fund transactions. Await unit pricing reconciliation before loan processing.",
            "systemAction": "Blocks loan calculation until all fund trades commit to SOR.",
            "actuarialBasis": "Fluctuating unit value: cash value cannot be accurately determined while NAV trade orders remain pending.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-CS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "General Alteration",
            "targetEntity": "T_POLICY",
            "ruleName": "Policy Active Inforce Status Requirement",
            "condition": "Policy status must be 'INFORCE' and Policy must not be in 'FROZEN' status (by pending claim or court freeze).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_POLICY_NOT_INFORCE",
            "errorMessage": "Policy is not active inforce or is currently frozen by Claims / Legal hold.",
            "systemAction": "Blocks alteration registration on CS Work List.",
            "actuarialBasis": "Alterations can only modify live contractual liabilities, not terminated or locked contracts.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-RS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Lapse Reason Validation",
            "targetEntity": "T_POLICY",
            "ruleName": "Permissible Lapse Reason Verification",
            "condition": "Policy lapse reason must be 'Normal Lapse', 'APL Lapse', or 'ILP Lapse'. Terminated policies cannot reinstate.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INVALID_LAPSE_REASON",
            "errorMessage": "Policy was terminated by Surrender, Death, or Maturity. Reinstatement is strictly prohibited.",
            "systemAction": "Rejects Reinstatement application immediately.",
            "actuarialBasis": "Surrendered or matured policies represent fully executed discharges of liability; contract cannot be revived.",
            "pdfPage": 489
          },
          {
            "ruleId": "VAL-RS-004",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Financial Settlement",
            "targetEntity": "T_AR_INVOICE",
            "ruleName": "Full Back-Premiums & Compound Interest Clearance",
            "condition": "Policyholder must pay 100% of all unpaid back-premiums + compound interest (e.g. 6.5% p.a.) + outstanding loan interest.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INCOMPLETE_PAYMENT",
            "errorMessage": "Cannot restore inforce status: back-premiums or reinstatement interest remain outstanding.",
            "systemAction": "Reinstatement status held at `PENDING_PAYMENT` until cashier receipt verification commits.",
            "actuarialBasis": "Restores mathematical reserves to the exact level required had the policy remained continuously inforce.",
            "pdfPage": 489
          }
        ]
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
        "pdf_page": 220,
        "validation_rules": [
          {
            "ruleId": "VAL-CS-005",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "Transfer of Coverage",
            "targetEntity": "T_POLICY_INSURED",
            "ruleName": "Transfer of Coverage (Change Life Assured) Eligibility",
            "condition": "Base plan product definition must have `Allow Transfer Coverage = Yes` AND FCC/AML validation passed.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_TRANSFER_NOT_ALLOWED",
            "errorMessage": "The main benefit does not permit Transfer of Coverage in product definition, or party FCC check failed.",
            "systemAction": "Blocks new life assured selection on CS Alteration UI.",
            "actuarialBasis": "Product structure control: corporate keyman plans permit executive transfer; juvenile endowment plans disallow.",
            "pdfPage": 254
          },
          {
            "ruleId": "VAL-CS-007",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "Change of Assignment",
            "targetEntity": "T_POLICY_ASSIGNMENT",
            "ruleName": "Assignment Legal Entity & Type Integrity",
            "condition": "Collateral Assignment strictly restricted to Corporate Entity (Bank/Lender). Absolute Assignment open to Company or Individual.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_INVALID_ASSIGNEE_TYPE",
            "errorMessage": "Collateral assignment can only be assigned to a licensed corporate institution.",
            "systemAction": "Blocks individual party selection when 'Collateral Assignment' is chosen.",
            "actuarialBasis": "Banking loan security law: commercial collateral rights cannot be vested in private natural persons without commercial licensing.",
            "pdfPage": 459
          }
        ]
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
        "pdf_page": 232,
        "validation_rules": [
          {
            "ruleId": "VAL-FL-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Cool-off Window Verification",
            "targetEntity": "T_POLICY_DELIVERY",
            "ruleName": "Delivery Date Anchor & 21-Day Statutory Window",
            "condition": "Free-Look Cancellation request date must be <= Policy Delivery Date (DELIVERY_DATE) + 21 calendar days.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_WINDOW_EXPIRED",
            "errorMessage": "Free-look period has expired. Cancellation must be processed as Policy Surrender.",
            "systemAction": "Rejects Free-Look transaction; redirects operator to Surrender Workbench.",
            "actuarialBasis": "Insurance Business Law 08/2022/QH15 Article 35: 21-day cooling-off period measured strictly from confirmed receipt.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-FL-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Claim Conflict Check",
            "targetEntity": "T_CLAIM",
            "ruleName": "Zero Paid Claim Prerequisite for Free-Look Refund",
            "condition": "There must be absolutely zero claims paid out or pending under any benefit of this policy.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_CLAIMS_EXIST",
            "errorMessage": "There should be no claims paid out or pending under this policy to qualify for Free-Look cancellation.",
            "systemAction": "Hard stop: aborts cancellation; policy remains inforce.",
            "actuarialBasis": "Prevention of unjust enrichment: policyholder cannot claim insurance indemnity and subsequently demand premium refund.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-LN-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "Loan Eligibility",
            "targetEntity": "T_POLICY_LOAN",
            "ruleName": "Maximum Loan-to-Value (LTV 85%) Ceiling",
            "condition": "Total Loan Amount + Existing Loan Principal + Accrued Interest <= Gross Cash Value * 85%.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_EXCEEDS_MAX_AVAILABLE",
            "errorMessage": "Requested loan amount exceeds maximum available borrowing limit (85% Net Cash Value).",
            "systemAction": "Validation fails on Loan Application UI; sets max permissible amount in helper box.",
            "actuarialBasis": "Collateral buffer: prevents policy lapse within 12 months due to compounding interest charges.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-LN-003",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "ILP Pending Transaction Check",
            "targetEntity": "T_FUND_ORDER",
            "ruleName": "Investment Linked Pending Fund Freeze",
            "condition": "If policy is Investment-Linked (ILP), it must have zero pending fund unit orders (switches, top-ups, redemptions).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_PENDING_FUND_TX",
            "errorMessage": "Policy has unsettled fund transactions. Await unit pricing reconciliation before loan processing.",
            "systemAction": "Blocks loan calculation until all fund trades commit to SOR.",
            "actuarialBasis": "Fluctuating unit value: cash value cannot be accurately determined while NAV trade orders remain pending.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-CS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "General Alteration",
            "targetEntity": "T_POLICY",
            "ruleName": "Policy Active Inforce Status Requirement",
            "condition": "Policy status must be 'INFORCE' and Policy must not be in 'FROZEN' status (by pending claim or court freeze).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_POLICY_NOT_INFORCE",
            "errorMessage": "Policy is not active inforce or is currently frozen by Claims / Legal hold.",
            "systemAction": "Blocks alteration registration on CS Work List.",
            "actuarialBasis": "Alterations can only modify live contractual liabilities, not terminated or locked contracts.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-RS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Lapse Reason Validation",
            "targetEntity": "T_POLICY",
            "ruleName": "Permissible Lapse Reason Verification",
            "condition": "Policy lapse reason must be 'Normal Lapse', 'APL Lapse', or 'ILP Lapse'. Terminated policies cannot reinstate.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INVALID_LAPSE_REASON",
            "errorMessage": "Policy was terminated by Surrender, Death, or Maturity. Reinstatement is strictly prohibited.",
            "systemAction": "Rejects Reinstatement application immediately.",
            "actuarialBasis": "Surrendered or matured policies represent fully executed discharges of liability; contract cannot be revived.",
            "pdfPage": 489
          },
          {
            "ruleId": "VAL-RS-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Statutory Window",
            "targetEntity": "T_POLICY",
            "ruleName": "24-Month Statutory Reinstatement Time Window",
            "condition": "Reinstatement request date must be within 24 months of Lapse Date (`LAPSE_DATE + 2 Years > SYSTEM_DATE`).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_TIME_WINDOW_EXPIRED",
            "errorMessage": "Statutory 2-year reinstatement window has expired. Policy is permanently lapsed.",
            "systemAction": "Blocks reinstatement processing; policy remains permanently in `LAPSED` state.",
            "actuarialBasis": "Article 26 Insurance Business Law: policyholder has the right to restore policy within 2 years from lapse date.",
            "pdfPage": 489
          },
          {
            "ruleId": "VAL-RS-004",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Financial Settlement",
            "targetEntity": "T_AR_INVOICE",
            "ruleName": "Full Back-Premiums & Compound Interest Clearance",
            "condition": "Policyholder must pay 100% of all unpaid back-premiums + compound interest (e.g. 6.5% p.a.) + outstanding loan interest.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INCOMPLETE_PAYMENT",
            "errorMessage": "Cannot restore inforce status: back-premiums or reinstatement interest remain outstanding.",
            "systemAction": "Reinstatement status held at `PENDING_PAYMENT` until cashier receipt verification commits.",
            "actuarialBasis": "Restores mathematical reserves to the exact level required had the policy remained continuously inforce.",
            "pdfPage": 489
          }
        ]
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
        "pdf_page": 254,
        "validation_rules": [
          {
            "ruleId": "VAL-FL-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Cool-off Window Verification",
            "targetEntity": "T_POLICY_DELIVERY",
            "ruleName": "Delivery Date Anchor & 21-Day Statutory Window",
            "condition": "Free-Look Cancellation request date must be <= Policy Delivery Date (DELIVERY_DATE) + 21 calendar days.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_WINDOW_EXPIRED",
            "errorMessage": "Free-look period has expired. Cancellation must be processed as Policy Surrender.",
            "systemAction": "Rejects Free-Look transaction; redirects operator to Surrender Workbench.",
            "actuarialBasis": "Insurance Business Law 08/2022/QH15 Article 35: 21-day cooling-off period measured strictly from confirmed receipt.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-FL-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Claim Conflict Check",
            "targetEntity": "T_CLAIM",
            "ruleName": "Zero Paid Claim Prerequisite for Free-Look Refund",
            "condition": "There must be absolutely zero claims paid out or pending under any benefit of this policy.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_CLAIMS_EXIST",
            "errorMessage": "There should be no claims paid out or pending under this policy to qualify for Free-Look cancellation.",
            "systemAction": "Hard stop: aborts cancellation; policy remains inforce.",
            "actuarialBasis": "Prevention of unjust enrichment: policyholder cannot claim insurance indemnity and subsequently demand premium refund.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-LN-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "Loan Eligibility",
            "targetEntity": "T_POLICY_LOAN",
            "ruleName": "Maximum Loan-to-Value (LTV 85%) Ceiling",
            "condition": "Total Loan Amount + Existing Loan Principal + Accrued Interest <= Gross Cash Value * 85%.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_EXCEEDS_MAX_AVAILABLE",
            "errorMessage": "Requested loan amount exceeds maximum available borrowing limit (85% Net Cash Value).",
            "systemAction": "Validation fails on Loan Application UI; sets max permissible amount in helper box.",
            "actuarialBasis": "Collateral buffer: prevents policy lapse within 12 months due to compounding interest charges.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-LN-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "Loan Date Validation",
            "targetEntity": "T_POLICY_LOAN",
            "ruleName": "Loan Date Anti-Backdating Rule",
            "condition": "Loan effective date cannot be backdated. May be forward-dated up to a maximum of 7 calendar days.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_BACKDATING_DISALLOWED",
            "errorMessage": "Loan date cannot be backdated. It can be forward dated up-to 7 days from system date.",
            "systemAction": "Rejects loan request with date discrepancy error.",
            "actuarialBasis": "Prevents retroactive interest manipulation and financial distortion.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-LN-003",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "ILP Pending Transaction Check",
            "targetEntity": "T_FUND_ORDER",
            "ruleName": "Investment Linked Pending Fund Freeze",
            "condition": "If policy is Investment-Linked (ILP), it must have zero pending fund unit orders (switches, top-ups, redemptions).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_PENDING_FUND_TX",
            "errorMessage": "Policy has unsettled fund transactions. Await unit pricing reconciliation before loan processing.",
            "systemAction": "Blocks loan calculation until all fund trades commit to SOR.",
            "actuarialBasis": "Fluctuating unit value: cash value cannot be accurately determined while NAV trade orders remain pending.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-CS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "General Alteration",
            "targetEntity": "T_POLICY",
            "ruleName": "Policy Active Inforce Status Requirement",
            "condition": "Policy status must be 'INFORCE' and Policy must not be in 'FROZEN' status (by pending claim or court freeze).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_POLICY_NOT_INFORCE",
            "errorMessage": "Policy is not active inforce or is currently frozen by Claims / Legal hold.",
            "systemAction": "Blocks alteration registration on CS Work List.",
            "actuarialBasis": "Alterations can only modify live contractual liabilities, not terminated or locked contracts.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-RS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Lapse Reason Validation",
            "targetEntity": "T_POLICY",
            "ruleName": "Permissible Lapse Reason Verification",
            "condition": "Policy lapse reason must be 'Normal Lapse', 'APL Lapse', or 'ILP Lapse'. Terminated policies cannot reinstate.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INVALID_LAPSE_REASON",
            "errorMessage": "Policy was terminated by Surrender, Death, or Maturity. Reinstatement is strictly prohibited.",
            "systemAction": "Rejects Reinstatement application immediately.",
            "actuarialBasis": "Surrendered or matured policies represent fully executed discharges of liability; contract cannot be revived.",
            "pdfPage": 489
          },
          {
            "ruleId": "VAL-RS-004",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Financial Settlement",
            "targetEntity": "T_AR_INVOICE",
            "ruleName": "Full Back-Premiums & Compound Interest Clearance",
            "condition": "Policyholder must pay 100% of all unpaid back-premiums + compound interest (e.g. 6.5% p.a.) + outstanding loan interest.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INCOMPLETE_PAYMENT",
            "errorMessage": "Cannot restore inforce status: back-premiums or reinstatement interest remain outstanding.",
            "systemAction": "Reinstatement status held at `PENDING_PAYMENT` until cashier receipt verification commits.",
            "actuarialBasis": "Restores mathematical reserves to the exact level required had the policy remained continuously inforce.",
            "pdfPage": 489
          }
        ]
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
        "pdf_page": 278,
        "validation_rules": [
          {
            "ruleId": "VAL-FL-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Cool-off Window Verification",
            "targetEntity": "T_POLICY_DELIVERY",
            "ruleName": "Delivery Date Anchor & 21-Day Statutory Window",
            "condition": "Free-Look Cancellation request date must be <= Policy Delivery Date (DELIVERY_DATE) + 21 calendar days.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_WINDOW_EXPIRED",
            "errorMessage": "Free-look period has expired. Cancellation must be processed as Policy Surrender.",
            "systemAction": "Rejects Free-Look transaction; redirects operator to Surrender Workbench.",
            "actuarialBasis": "Insurance Business Law 08/2022/QH15 Article 35: 21-day cooling-off period measured strictly from confirmed receipt.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-FL-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Claim Conflict Check",
            "targetEntity": "T_CLAIM",
            "ruleName": "Zero Paid Claim Prerequisite for Free-Look Refund",
            "condition": "There must be absolutely zero claims paid out or pending under any benefit of this policy.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_CLAIMS_EXIST",
            "errorMessage": "There should be no claims paid out or pending under this policy to qualify for Free-Look cancellation.",
            "systemAction": "Hard stop: aborts cancellation; policy remains inforce.",
            "actuarialBasis": "Prevention of unjust enrichment: policyholder cannot claim insurance indemnity and subsequently demand premium refund.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-LN-003",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "ILP Pending Transaction Check",
            "targetEntity": "T_FUND_ORDER",
            "ruleName": "Investment Linked Pending Fund Freeze",
            "condition": "If policy is Investment-Linked (ILP), it must have zero pending fund unit orders (switches, top-ups, redemptions).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_PENDING_FUND_TX",
            "errorMessage": "Policy has unsettled fund transactions. Await unit pricing reconciliation before loan processing.",
            "systemAction": "Blocks loan calculation until all fund trades commit to SOR.",
            "actuarialBasis": "Fluctuating unit value: cash value cannot be accurately determined while NAV trade orders remain pending.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-CS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "General Alteration",
            "targetEntity": "T_POLICY",
            "ruleName": "Policy Active Inforce Status Requirement",
            "condition": "Policy status must be 'INFORCE' and Policy must not be in 'FROZEN' status (by pending claim or court freeze).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_POLICY_NOT_INFORCE",
            "errorMessage": "Policy is not active inforce or is currently frozen by Claims / Legal hold.",
            "systemAction": "Blocks alteration registration on CS Work List.",
            "actuarialBasis": "Alterations can only modify live contractual liabilities, not terminated or locked contracts.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-RS-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Lapse Reason Validation",
            "targetEntity": "T_POLICY",
            "ruleName": "Permissible Lapse Reason Verification",
            "condition": "Policy lapse reason must be 'Normal Lapse', 'APL Lapse', or 'ILP Lapse'. Terminated policies cannot reinstate.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INVALID_LAPSE_REASON",
            "errorMessage": "Policy was terminated by Surrender, Death, or Maturity. Reinstatement is strictly prohibited.",
            "systemAction": "Rejects Reinstatement application immediately.",
            "actuarialBasis": "Surrendered or matured policies represent fully executed discharges of liability; contract cannot be revived.",
            "pdfPage": 489
          },
          {
            "ruleId": "VAL-RS-004",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Financial Settlement",
            "targetEntity": "T_AR_INVOICE",
            "ruleName": "Full Back-Premiums & Compound Interest Clearance",
            "condition": "Policyholder must pay 100% of all unpaid back-premiums + compound interest (e.g. 6.5% p.a.) + outstanding loan interest.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INCOMPLETE_PAYMENT",
            "errorMessage": "Cannot restore inforce status: back-premiums or reinstatement interest remain outstanding.",
            "systemAction": "Reinstatement status held at `PENDING_PAYMENT` until cashier receipt verification commits.",
            "actuarialBasis": "Restores mathematical reserves to the exact level required had the policy remained continuously inforce.",
            "pdfPage": 489
          }
        ]
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
        "pdf_page": 214,
        "validation_rules": [
          {
            "ruleId": "VAL-FL-001",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Cool-off Window Verification",
            "targetEntity": "T_POLICY_DELIVERY",
            "ruleName": "Delivery Date Anchor & 21-Day Statutory Window",
            "condition": "Free-Look Cancellation request date must be <= Policy Delivery Date (DELIVERY_DATE) + 21 calendar days.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_WINDOW_EXPIRED",
            "errorMessage": "Free-look period has expired. Cancellation must be processed as Policy Surrender.",
            "systemAction": "Rejects Free-Look transaction; redirects operator to Surrender Workbench.",
            "actuarialBasis": "Insurance Business Law 08/2022/QH15 Article 35: 21-day cooling-off period measured strictly from confirmed receipt.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-FL-003",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "05. 21-Day Free-Look",
            "stage": "Financial Clawback",
            "targetEntity": "T_COMMISSION_LEDGER",
            "ruleName": "100% Commission Clawback & Medical Fee Offset",
            "condition": "Refund = 100% Gross Premiums Paid minus Insurer Medical Examination Costs. 100% Agent Commission clawed back.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FL_CLAWBACK_EXECUTION",
            "errorMessage": "Negative commission voucher generated to reverse all agency earnings for cancelled policy.",
            "systemAction": "Posts negative commission record to `T_COMMISSION_LEDGER` and releases refund voucher.",
            "actuarialBasis": "Restores financial ledger to exact zero-liability pre-inception status.",
            "pdfPage": 483
          },
          {
            "ruleId": "VAL-LN-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "Loan Date Validation",
            "targetEntity": "T_POLICY_LOAN",
            "ruleName": "Loan Date Anti-Backdating Rule",
            "condition": "Loan effective date cannot be backdated. May be forward-dated up to a maximum of 7 calendar days.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_BACKDATING_DISALLOWED",
            "errorMessage": "Loan date cannot be backdated. It can be forward dated up-to 7 days from system date.",
            "systemAction": "Rejects loan request with date discrepancy error.",
            "actuarialBasis": "Prevents retroactive interest manipulation and financial distortion.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-CS-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "Alteration Content Diff",
            "targetEntity": "T_CS_ALTERATION",
            "ruleName": "Mandatory Delta (Data Difference) Check",
            "condition": "Submitted alteration payload must have at least one validated field difference compared to current SOR state.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_NO_CHANGES_DETECTED",
            "errorMessage": "There must be at least one information change detected to register an alteration item.",
            "systemAction": "Disables 'Apply Change' button until delta is present.",
            "actuarialBasis": "Prevents redundant database transactions, audit clutter, and unnecessary endorsement processing.",
            "pdfPage": 459
          },
          {
            "ruleId": "VAL-CS-004",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "Mid-Term Rider Attachment",
            "targetEntity": "T_POLICY_BENEFIT",
            "ruleName": "Rider Term & Maturity Synchronization Rule",
            "condition": "Rider coverage expiry date must not exceed Base Plan maturity date or Rider maximum coverage age limit.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_RIDER_TERM_OVERFLOW",
            "errorMessage": "Rider term exceeds remaining policy term of main benefit.",
            "systemAction": "Auto-caps rider term to match base plan or throws validation error.",
            "actuarialBasis": "Ancillary rider contracts cannot survive past the termination of the principal life insurance contract.",
            "pdfPage": 138
          },
          {
            "ruleId": "VAL-CS-006",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "08. Policy Alterations",
            "stage": "Transfer of Coverage Scope",
            "targetEntity": "T_POLICY_BENEFIT",
            "ruleName": "Automatic Rider Transfer & Premium Recalculation",
            "condition": "When Life Assured is transferred, all attached riders transfer simultaneously, and premium recalculates for new age/gender.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CS_TRANSFER_PREMIUM_RECALC",
            "errorMessage": "All riders attached to previous life assured transferred; premium adjusted to new risk profile.",
            "systemAction": "Generates Collection/Refund record for premium difference between old and new risk.",
            "actuarialBasis": "Mortality pricing adjustment: new life assured carries unique age, gender, and smoker actuarial risk factors.",
            "pdfPage": 255
          },
          {
            "ruleId": "VAL-RS-002",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Statutory Window",
            "targetEntity": "T_POLICY",
            "ruleName": "24-Month Statutory Reinstatement Time Window",
            "condition": "Reinstatement request date must be within 24 months of Lapse Date (`LAPSE_DATE + 2 Years > SYSTEM_DATE`).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_TIME_WINDOW_EXPIRED",
            "errorMessage": "Statutory 2-year reinstatement window has expired. Policy is permanently lapsed.",
            "systemAction": "Blocks reinstatement processing; policy remains permanently in `LAPSED` state.",
            "actuarialBasis": "Article 26 Insurance Business Law: policyholder has the right to restore policy within 2 years from lapse date.",
            "pdfPage": 489
          },
          {
            "ruleId": "VAL-RS-004",
            "module": "MOD_04",
            "moduleName": "Customer Service (CS APP)",
            "lifecyclePhase": "09. Reinstatement",
            "stage": "Financial Settlement",
            "targetEntity": "T_AR_INVOICE",
            "ruleName": "Full Back-Premiums & Compound Interest Clearance",
            "condition": "Policyholder must pay 100% of all unpaid back-premiums + compound interest (e.g. 6.5% p.a.) + outstanding loan interest.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_RS_INCOMPLETE_PAYMENT",
            "errorMessage": "Cannot restore inforce status: back-premiums or reinstatement interest remain outstanding.",
            "systemAction": "Reinstatement status held at `PENDING_PAYMENT` until cashier receipt verification commits.",
            "actuarialBasis": "Restores mathematical reserves to the exact level required had the policy remained continuously inforce.",
            "pdfPage": 489
          }
        ]
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
    "pdf_chapter": "Chapter 4: Customer Service & Policy Servicing (CS APP)",
    "validation_rules": [
      {
        "ruleId": "VAL-FL-001",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "05. 21-Day Free-Look",
        "stage": "Cool-off Window Verification",
        "targetEntity": "T_POLICY_DELIVERY",
        "ruleName": "Delivery Date Anchor & 21-Day Statutory Window",
        "condition": "Free-Look Cancellation request date must be <= Policy Delivery Date (DELIVERY_DATE) + 21 calendar days.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_FL_WINDOW_EXPIRED",
        "errorMessage": "Free-look period has expired. Cancellation must be processed as Policy Surrender.",
        "systemAction": "Rejects Free-Look transaction; redirects operator to Surrender Workbench.",
        "actuarialBasis": "Insurance Business Law 08/2022/QH15 Article 35: 21-day cooling-off period measured strictly from confirmed receipt.",
        "pdfPage": 483
      },
      {
        "ruleId": "VAL-FL-002",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "05. 21-Day Free-Look",
        "stage": "Claim Conflict Check",
        "targetEntity": "T_CLAIM",
        "ruleName": "Zero Paid Claim Prerequisite for Free-Look Refund",
        "condition": "There must be absolutely zero claims paid out or pending under any benefit of this policy.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_FL_CLAIMS_EXIST",
        "errorMessage": "There should be no claims paid out or pending under this policy to qualify for Free-Look cancellation.",
        "systemAction": "Hard stop: aborts cancellation; policy remains inforce.",
        "actuarialBasis": "Prevention of unjust enrichment: policyholder cannot claim insurance indemnity and subsequently demand premium refund.",
        "pdfPage": 483
      },
      {
        "ruleId": "VAL-FL-003",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "05. 21-Day Free-Look",
        "stage": "Financial Clawback",
        "targetEntity": "T_COMMISSION_LEDGER",
        "ruleName": "100% Commission Clawback & Medical Fee Offset",
        "condition": "Refund = 100% Gross Premiums Paid minus Insurer Medical Examination Costs. 100% Agent Commission clawed back.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_FL_CLAWBACK_EXECUTION",
        "errorMessage": "Negative commission voucher generated to reverse all agency earnings for cancelled policy.",
        "systemAction": "Posts negative commission record to `T_COMMISSION_LEDGER` and releases refund voucher.",
        "actuarialBasis": "Restores financial ledger to exact zero-liability pre-inception status.",
        "pdfPage": 483
      },
      {
        "ruleId": "VAL-LN-001",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "07. Policy Loans & APL",
        "stage": "Loan Eligibility",
        "targetEntity": "T_POLICY_LOAN",
        "ruleName": "Maximum Loan-to-Value (LTV 85%) Ceiling",
        "condition": "Total Loan Amount + Existing Loan Principal + Accrued Interest <= Gross Cash Value * 85%.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_LN_EXCEEDS_MAX_AVAILABLE",
        "errorMessage": "Requested loan amount exceeds maximum available borrowing limit (85% Net Cash Value).",
        "systemAction": "Validation fails on Loan Application UI; sets max permissible amount in helper box.",
        "actuarialBasis": "Collateral buffer: prevents policy lapse within 12 months due to compounding interest charges.",
        "pdfPage": 452
      },
      {
        "ruleId": "VAL-LN-002",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "07. Policy Loans & APL",
        "stage": "Loan Date Validation",
        "targetEntity": "T_POLICY_LOAN",
        "ruleName": "Loan Date Anti-Backdating Rule",
        "condition": "Loan effective date cannot be backdated. May be forward-dated up to a maximum of 7 calendar days.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_LN_BACKDATING_DISALLOWED",
        "errorMessage": "Loan date cannot be backdated. It can be forward dated up-to 7 days from system date.",
        "systemAction": "Rejects loan request with date discrepancy error.",
        "actuarialBasis": "Prevents retroactive interest manipulation and financial distortion.",
        "pdfPage": 452
      },
      {
        "ruleId": "VAL-LN-003",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "07. Policy Loans & APL",
        "stage": "ILP Pending Transaction Check",
        "targetEntity": "T_FUND_ORDER",
        "ruleName": "Investment Linked Pending Fund Freeze",
        "condition": "If policy is Investment-Linked (ILP), it must have zero pending fund unit orders (switches, top-ups, redemptions).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_LN_PENDING_FUND_TX",
        "errorMessage": "Policy has unsettled fund transactions. Await unit pricing reconciliation before loan processing.",
        "systemAction": "Blocks loan calculation until all fund trades commit to SOR.",
        "actuarialBasis": "Fluctuating unit value: cash value cannot be accurately determined while NAV trade orders remain pending.",
        "pdfPage": 452
      },
      {
        "ruleId": "VAL-CS-001",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "08. Policy Alterations",
        "stage": "General Alteration",
        "targetEntity": "T_POLICY",
        "ruleName": "Policy Active Inforce Status Requirement",
        "condition": "Policy status must be 'INFORCE' and Policy must not be in 'FROZEN' status (by pending claim or court freeze).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CS_POLICY_NOT_INFORCE",
        "errorMessage": "Policy is not active inforce or is currently frozen by Claims / Legal hold.",
        "systemAction": "Blocks alteration registration on CS Work List.",
        "actuarialBasis": "Alterations can only modify live contractual liabilities, not terminated or locked contracts.",
        "pdfPage": 452
      },
      {
        "ruleId": "VAL-CS-002",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "08. Policy Alterations",
        "stage": "Alteration Content Diff",
        "targetEntity": "T_CS_ALTERATION",
        "ruleName": "Mandatory Delta (Data Difference) Check",
        "condition": "Submitted alteration payload must have at least one validated field difference compared to current SOR state.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CS_NO_CHANGES_DETECTED",
        "errorMessage": "There must be at least one information change detected to register an alteration item.",
        "systemAction": "Disables 'Apply Change' button until delta is present.",
        "actuarialBasis": "Prevents redundant database transactions, audit clutter, and unnecessary endorsement processing.",
        "pdfPage": 459
      },
      {
        "ruleId": "VAL-CS-003",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "08. Policy Alterations",
        "stage": "Sum Assured Increase",
        "targetEntity": "T_POLICY_BENEFIT",
        "ruleName": "Sum Assured Increase Underwriting Reassessment",
        "condition": "Sum Assured Increase triggers mandatory medical health declaration and manual underwriting review.",
        "severity": "ROUTING",
        "errorCode": "ROUTE_CS_UW_REVIEW",
        "errorMessage": "Sum Assured increase requires underwriting risk assessment. Transferring to Underwriting Workbench.",
        "systemAction": "Generates Underwriting Task linked to CS Alteration ID.",
        "actuarialBasis": "Anti-selection: policyholders developing health conditions may attempt to dramatically increase coverage.",
        "pdfPage": 255
      },
      {
        "ruleId": "VAL-CS-004",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "08. Policy Alterations",
        "stage": "Mid-Term Rider Attachment",
        "targetEntity": "T_POLICY_BENEFIT",
        "ruleName": "Rider Term & Maturity Synchronization Rule",
        "condition": "Rider coverage expiry date must not exceed Base Plan maturity date or Rider maximum coverage age limit.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CS_RIDER_TERM_OVERFLOW",
        "errorMessage": "Rider term exceeds remaining policy term of main benefit.",
        "systemAction": "Auto-caps rider term to match base plan or throws validation error.",
        "actuarialBasis": "Ancillary rider contracts cannot survive past the termination of the principal life insurance contract.",
        "pdfPage": 138
      },
      {
        "ruleId": "VAL-CS-005",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "08. Policy Alterations",
        "stage": "Transfer of Coverage",
        "targetEntity": "T_POLICY_INSURED",
        "ruleName": "Transfer of Coverage (Change Life Assured) Eligibility",
        "condition": "Base plan product definition must have `Allow Transfer Coverage = Yes` AND FCC/AML validation passed.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CS_TRANSFER_NOT_ALLOWED",
        "errorMessage": "The main benefit does not permit Transfer of Coverage in product definition, or party FCC check failed.",
        "systemAction": "Blocks new life assured selection on CS Alteration UI.",
        "actuarialBasis": "Product structure control: corporate keyman plans permit executive transfer; juvenile endowment plans disallow.",
        "pdfPage": 254
      },
      {
        "ruleId": "VAL-CS-006",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "08. Policy Alterations",
        "stage": "Transfer of Coverage Scope",
        "targetEntity": "T_POLICY_BENEFIT",
        "ruleName": "Automatic Rider Transfer & Premium Recalculation",
        "condition": "When Life Assured is transferred, all attached riders transfer simultaneously, and premium recalculates for new age/gender.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CS_TRANSFER_PREMIUM_RECALC",
        "errorMessage": "All riders attached to previous life assured transferred; premium adjusted to new risk profile.",
        "systemAction": "Generates Collection/Refund record for premium difference between old and new risk.",
        "actuarialBasis": "Mortality pricing adjustment: new life assured carries unique age, gender, and smoker actuarial risk factors.",
        "pdfPage": 255
      },
      {
        "ruleId": "VAL-CS-007",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "08. Policy Alterations",
        "stage": "Change of Assignment",
        "targetEntity": "T_POLICY_ASSIGNMENT",
        "ruleName": "Assignment Legal Entity & Type Integrity",
        "condition": "Collateral Assignment strictly restricted to Corporate Entity (Bank/Lender). Absolute Assignment open to Company or Individual.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CS_INVALID_ASSIGNEE_TYPE",
        "errorMessage": "Collateral assignment can only be assigned to a licensed corporate institution.",
        "systemAction": "Blocks individual party selection when 'Collateral Assignment' is chosen.",
        "actuarialBasis": "Banking loan security law: commercial collateral rights cannot be vested in private natural persons without commercial licensing.",
        "pdfPage": 459
      },
      {
        "ruleId": "VAL-RS-001",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "09. Reinstatement",
        "stage": "Lapse Reason Validation",
        "targetEntity": "T_POLICY",
        "ruleName": "Permissible Lapse Reason Verification",
        "condition": "Policy lapse reason must be 'Normal Lapse', 'APL Lapse', or 'ILP Lapse'. Terminated policies cannot reinstate.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_RS_INVALID_LAPSE_REASON",
        "errorMessage": "Policy was terminated by Surrender, Death, or Maturity. Reinstatement is strictly prohibited.",
        "systemAction": "Rejects Reinstatement application immediately.",
        "actuarialBasis": "Surrendered or matured policies represent fully executed discharges of liability; contract cannot be revived.",
        "pdfPage": 489
      },
      {
        "ruleId": "VAL-RS-002",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "09. Reinstatement",
        "stage": "Statutory Window",
        "targetEntity": "T_POLICY",
        "ruleName": "24-Month Statutory Reinstatement Time Window",
        "condition": "Reinstatement request date must be within 24 months of Lapse Date (`LAPSE_DATE + 2 Years > SYSTEM_DATE`).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_RS_TIME_WINDOW_EXPIRED",
        "errorMessage": "Statutory 2-year reinstatement window has expired. Policy is permanently lapsed.",
        "systemAction": "Blocks reinstatement processing; policy remains permanently in `LAPSED` state.",
        "actuarialBasis": "Article 26 Insurance Business Law: policyholder has the right to restore policy within 2 years from lapse date.",
        "pdfPage": 489
      },
      {
        "ruleId": "VAL-RS-003",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "09. Reinstatement",
        "stage": "Attained Age Cap",
        "targetEntity": "T_POLICY_INSURED",
        "ruleName": "Life Assured Attained Age Ceiling Check",
        "condition": "Current attained age of Life Assured must not exceed maximum product coverage age limit.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_RS_AGE_CEILING_EXCEEDED",
        "errorMessage": "Life assured current age exceeds maximum product entry/coverage limit.",
        "systemAction": "Throws warning/error message and blocks approval.",
        "actuarialBasis": "Mortality rates at extreme attained ages are no longer covered by product pricing reserves.",
        "pdfPage": 489
      },
      {
        "ruleId": "VAL-RS-004",
        "module": "MOD_04",
        "moduleName": "Customer Service (CS APP)",
        "lifecyclePhase": "09. Reinstatement",
        "stage": "Financial Settlement",
        "targetEntity": "T_AR_INVOICE",
        "ruleName": "Full Back-Premiums & Compound Interest Clearance",
        "condition": "Policyholder must pay 100% of all unpaid back-premiums + compound interest (e.g. 6.5% p.a.) + outstanding loan interest.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_RS_INCOMPLETE_PAYMENT",
        "errorMessage": "Cannot restore inforce status: back-premiums or reinstatement interest remain outstanding.",
        "systemAction": "Reinstatement status held at `PENDING_PAYMENT` until cashier receipt verification commits.",
        "actuarialBasis": "Restores mathematical reserves to the exact level required had the policy remained continuously inforce.",
        "pdfPage": 489
      }
    ],
    "validation_rules_count": 17
  },
  {
    "id": "MOD_05",
    "num": "05",
    "title": "Mod 05: Billing & Collection",
    "subtitle": "Billing Schedules, Direct Debit, Grace Period Management & Suspense Matching",
    "icon": "credit-card",
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
        "pdf_page": 346,
        "validation_rules": [
          {
            "ruleId": "VAL-BIL-001",
            "module": "MOD_05",
            "moduleName": "Billing & Collection",
            "lifecyclePhase": "06. Billing & Grace Period",
            "stage": "Renewal Extraction",
            "targetEntity": "T_BILLING_SCHEDULE",
            "ruleName": "Advance Billing Notice Generation (T-30 Days)",
            "condition": "Renewal bills extracted exactly 30 calendar days prior to Next Due Date (`DUE_DATE`).",
            "severity": "ROUTING",
            "errorCode": "INFO_BIL_EXTRACTION_SUCCESS",
            "errorMessage": "Renewal notice generated and dispatched via SMS/Email/Portal.",
            "systemAction": "Creates Account Receivable (AR) record in `T_AR_INVOICE`.",
            "actuarialBasis": "Smooth operational cash flow intake and timely statutory premium notice delivery.",
            "pdfPage": 344
          },
          {
            "ruleId": "VAL-BIL-003",
            "module": "MOD_05",
            "moduleName": "Billing & Collection",
            "lifecyclePhase": "06. Billing & Grace Period",
            "stage": "Day 60 Expiration",
            "targetEntity": "T_POLICY",
            "ruleName": "Grace Expiration Gating: APL vs Auto-Lapse",
            "condition": "At 23:59:59 on Day 60, system checks Net Cash Value: If Net CV >= Overdue Premium -> APL; Else -> LAPSE.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BIL_GRACE_LAPSE_TRIGGER",
            "errorMessage": "Grace period expired without payment. Automatic non-forfeiture decision executed by batch engine.",
            "systemAction": "Updates policy status to `INFORCE_APL` or `LAPSED`; locks billing collection.",
            "actuarialBasis": "Actuarial reserve preservation: insurer cannot maintain unbacked risk reserve after grace exhaustion without collateral.",
            "pdfPage": 344
          }
        ]
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
        "pdf_page": 355,
        "validation_rules": [
          {
            "ruleId": "VAL-BIL-001",
            "module": "MOD_05",
            "moduleName": "Billing & Collection",
            "lifecyclePhase": "06. Billing & Grace Period",
            "stage": "Renewal Extraction",
            "targetEntity": "T_BILLING_SCHEDULE",
            "ruleName": "Advance Billing Notice Generation (T-30 Days)",
            "condition": "Renewal bills extracted exactly 30 calendar days prior to Next Due Date (`DUE_DATE`).",
            "severity": "ROUTING",
            "errorCode": "INFO_BIL_EXTRACTION_SUCCESS",
            "errorMessage": "Renewal notice generated and dispatched via SMS/Email/Portal.",
            "systemAction": "Creates Account Receivable (AR) record in `T_AR_INVOICE`.",
            "actuarialBasis": "Smooth operational cash flow intake and timely statutory premium notice delivery.",
            "pdfPage": 344
          }
        ]
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
        "pdf_page": 368,
        "validation_rules": [
          {
            "ruleId": "VAL-BIL-001",
            "module": "MOD_05",
            "moduleName": "Billing & Collection",
            "lifecyclePhase": "06. Billing & Grace Period",
            "stage": "Renewal Extraction",
            "targetEntity": "T_BILLING_SCHEDULE",
            "ruleName": "Advance Billing Notice Generation (T-30 Days)",
            "condition": "Renewal bills extracted exactly 30 calendar days prior to Next Due Date (`DUE_DATE`).",
            "severity": "ROUTING",
            "errorCode": "INFO_BIL_EXTRACTION_SUCCESS",
            "errorMessage": "Renewal notice generated and dispatched via SMS/Email/Portal.",
            "systemAction": "Creates Account Receivable (AR) record in `T_AR_INVOICE`.",
            "actuarialBasis": "Smooth operational cash flow intake and timely statutory premium notice delivery.",
            "pdfPage": 344
          },
          {
            "ruleId": "VAL-BIL-002",
            "module": "MOD_05",
            "moduleName": "Billing & Collection",
            "lifecyclePhase": "06. Billing & Grace Period",
            "stage": "Grace Period Counting",
            "targetEntity": "T_POLICY",
            "ruleName": "60-Day Grace Period Inforce Continuity",
            "condition": "During Grace Days 1 through 60, policy remains 100% inforce with full death and rider claim coverage.",
            "severity": "INFORMATIONAL",
            "errorCode": "INFO_BIL_GRACE_ACTIVE",
            "errorMessage": "Policy is in Grace Period. Claim occurring during this window is fully payable minus overdue premium.",
            "systemAction": "Suppresses lapse trigger; dispatches overdue reminders on Day 30 and Day 50.",
            "actuarialBasis": "Article 37 Insurance Business Law: mandatory 60-day grace protection for periodical premium payment policies.",
            "pdfPage": 342
          }
        ]
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
        "pdf_page": 368,
        "validation_rules": [
          {
            "ruleId": "VAL-BIL-002",
            "module": "MOD_05",
            "moduleName": "Billing & Collection",
            "lifecyclePhase": "06. Billing & Grace Period",
            "stage": "Grace Period Counting",
            "targetEntity": "T_POLICY",
            "ruleName": "60-Day Grace Period Inforce Continuity",
            "condition": "During Grace Days 1 through 60, policy remains 100% inforce with full death and rider claim coverage.",
            "severity": "INFORMATIONAL",
            "errorCode": "INFO_BIL_GRACE_ACTIVE",
            "errorMessage": "Policy is in Grace Period. Claim occurring during this window is fully payable minus overdue premium.",
            "systemAction": "Suppresses lapse trigger; dispatches overdue reminders on Day 30 and Day 50.",
            "actuarialBasis": "Article 37 Insurance Business Law: mandatory 60-day grace protection for periodical premium payment policies.",
            "pdfPage": 342
          },
          {
            "ruleId": "VAL-BIL-003",
            "module": "MOD_05",
            "moduleName": "Billing & Collection",
            "lifecyclePhase": "06. Billing & Grace Period",
            "stage": "Day 60 Expiration",
            "targetEntity": "T_POLICY",
            "ruleName": "Grace Expiration Gating: APL vs Auto-Lapse",
            "condition": "At 23:59:59 on Day 60, system checks Net Cash Value: If Net CV >= Overdue Premium -> APL; Else -> LAPSE.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BIL_GRACE_LAPSE_TRIGGER",
            "errorMessage": "Grace period expired without payment. Automatic non-forfeiture decision executed by batch engine.",
            "systemAction": "Updates policy status to `INFORCE_APL` or `LAPSED`; locks billing collection.",
            "actuarialBasis": "Actuarial reserve preservation: insurer cannot maintain unbacked risk reserve after grace exhaustion without collateral.",
            "pdfPage": 344
          }
        ]
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
    "pdf_chapter": "Chapter 6: Billing & Collection (FIN APP)",
    "validation_rules": [
      {
        "ruleId": "VAL-BIL-001",
        "module": "MOD_05",
        "moduleName": "Billing & Collection",
        "lifecyclePhase": "06. Billing & Grace Period",
        "stage": "Renewal Extraction",
        "targetEntity": "T_BILLING_SCHEDULE",
        "ruleName": "Advance Billing Notice Generation (T-30 Days)",
        "condition": "Renewal bills extracted exactly 30 calendar days prior to Next Due Date (`DUE_DATE`).",
        "severity": "ROUTING",
        "errorCode": "INFO_BIL_EXTRACTION_SUCCESS",
        "errorMessage": "Renewal notice generated and dispatched via SMS/Email/Portal.",
        "systemAction": "Creates Account Receivable (AR) record in `T_AR_INVOICE`.",
        "actuarialBasis": "Smooth operational cash flow intake and timely statutory premium notice delivery.",
        "pdfPage": 344
      },
      {
        "ruleId": "VAL-BIL-002",
        "module": "MOD_05",
        "moduleName": "Billing & Collection",
        "lifecyclePhase": "06. Billing & Grace Period",
        "stage": "Grace Period Counting",
        "targetEntity": "T_POLICY",
        "ruleName": "60-Day Grace Period Inforce Continuity",
        "condition": "During Grace Days 1 through 60, policy remains 100% inforce with full death and rider claim coverage.",
        "severity": "INFORMATIONAL",
        "errorCode": "INFO_BIL_GRACE_ACTIVE",
        "errorMessage": "Policy is in Grace Period. Claim occurring during this window is fully payable minus overdue premium.",
        "systemAction": "Suppresses lapse trigger; dispatches overdue reminders on Day 30 and Day 50.",
        "actuarialBasis": "Article 37 Insurance Business Law: mandatory 60-day grace protection for periodical premium payment policies.",
        "pdfPage": 342
      },
      {
        "ruleId": "VAL-BIL-003",
        "module": "MOD_05",
        "moduleName": "Billing & Collection",
        "lifecyclePhase": "06. Billing & Grace Period",
        "stage": "Day 60 Expiration",
        "targetEntity": "T_POLICY",
        "ruleName": "Grace Expiration Gating: APL vs Auto-Lapse",
        "condition": "At 23:59:59 on Day 60, system checks Net Cash Value: If Net CV >= Overdue Premium -> APL; Else -> LAPSE.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_BIL_GRACE_LAPSE_TRIGGER",
        "errorMessage": "Grace period expired without payment. Automatic non-forfeiture decision executed by batch engine.",
        "systemAction": "Updates policy status to `INFORCE_APL` or `LAPSED`; locks billing collection.",
        "actuarialBasis": "Actuarial reserve preservation: insurer cannot maintain unbacked risk reserve after grace exhaustion without collateral.",
        "pdfPage": 344
      }
    ],
    "validation_rules_count": 3
  },
  {
    "id": "MOD_06",
    "num": "06",
    "title": "Mod 06: Claims Management (CLM APP)",
    "subtitle": "FNOL, Medical Assessment, Benefit Calculation, Adjudication & Settlement",
    "icon": "activity",
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
        "pdf_page": 308,
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-001",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Coverage Verification",
            "targetEntity": "T_CLAIM",
            "ruleName": "Inforce Status on Incident Date Rule",
            "condition": "Policy must have been in status 'INFORCE' or 'INFORCE_APL' on the exact Claim Event Date (`CLAIM_EVENT_DATE`).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CLM_POLICY_NOT_INFORCE_ON_EVENT",
            "errorMessage": "Policy was lapsed, surrendered, or not yet commenced on the incident date. Claim must be declined.",
            "systemAction": "Auto-flags claim as 'Decline Recommended' with contractual coverage failure reason.",
            "actuarialBasis": "No insurance liability exists outside active premium-funded coverage windows.",
            "pdfPage": 271
          },
          {
            "ruleId": "VAL-CLM-002",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Contestability Assessment",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "2-Year Contestability Period Investigation Trigger",
            "condition": "If Event Date is within 2 years of Commencement Date or Reinstatement Date -> Trigger Mandatory Claim Investigation.",
            "severity": "ROUTING",
            "errorCode": "ROUTE_CLM_INVESTIGATION",
            "errorMessage": "Claim occurred within 2-year contestable window. Mandatory investigation for non-disclosure / pre-existing conditions.",
            "systemAction": "Routes claim to Special Investigation Unit (SIU) queue; blocks fast-track settlement.",
            "actuarialBasis": "Article 28 Insurance Business Law: protects risk pool from fraudulent anti-selection and non-disclosure.",
            "pdfPage": 296
          },
          {
            "ruleId": "VAL-CLM-003",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Benefit Conflict Check",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "Critical Illness vs TPD Installment Conflict Check",
            "condition": "When saving CI claim decision, system validates if there is an ongoing TPD installment claim on the same policy.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_ONGOING_TPD_CONFLICT",
            "errorMessage": "Ongoing TPD claim detected with remaining unpaid installments. Verify total benefit acceleration limits.",
            "systemAction": "Prompts warning message to claim assessor and prompts confirmation to continue.",
            "actuarialBasis": "Prevents double-paying accelerated benefits that share the same unified core life sum assured pool.",
            "pdfPage": 337
          },
          {
            "ruleId": "VAL-CLM-004",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Document Completeness",
            "targetEntity": "T_CLAIM_DOCUMENT",
            "ruleName": "Proof of Loss Document Completeness Verification",
            "condition": "All required claim documents must have Completeness IND = 'Y' or Waived IND = 'Y' before decision sign-off.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_UNCOMPLETED_DOCS",
            "errorMessage": "There is uncompleted required document. Please confirm to continue?",
            "systemAction": "Displays modal confirmation prompt; logs supervisor waiver in audit trail.",
            "actuarialBasis": "Legal documentation integrity required to defend settlement against reinsurance audit.",
            "pdfPage": 337
          },
          {
            "ruleId": "VAL-CLM-005",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Claim Payout Calculation",
            "targetEntity": "T_CLAIM_PAYOUT",
            "ruleName": "Indebtedness Deduction from Gross Claim Payout",
            "condition": "Net Claim Payout = Approved Claim SA + Reversionary/Terminal Bonuses - Outstanding Loans - Accrued Interest - Overdue Premiums.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CLM_CALCULATION_DISCREPANCY",
            "errorMessage": "Net payout must automatically deduct all outstanding policy debts before disbursement.",
            "systemAction": "Calculates net disbursement voucher and sets policy loan status to `CLOSED_BY_CLAIM`.",
            "actuarialBasis": "Senior creditor right: insurer possesses absolute statutory right of offset against claims proceeds for policy debts.",
            "pdfPage": 318
          }
        ]
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
        "pdf_page": 316,
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-001",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Coverage Verification",
            "targetEntity": "T_CLAIM",
            "ruleName": "Inforce Status on Incident Date Rule",
            "condition": "Policy must have been in status 'INFORCE' or 'INFORCE_APL' on the exact Claim Event Date (`CLAIM_EVENT_DATE`).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CLM_POLICY_NOT_INFORCE_ON_EVENT",
            "errorMessage": "Policy was lapsed, surrendered, or not yet commenced on the incident date. Claim must be declined.",
            "systemAction": "Auto-flags claim as 'Decline Recommended' with contractual coverage failure reason.",
            "actuarialBasis": "No insurance liability exists outside active premium-funded coverage windows.",
            "pdfPage": 271
          },
          {
            "ruleId": "VAL-CLM-002",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Contestability Assessment",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "2-Year Contestability Period Investigation Trigger",
            "condition": "If Event Date is within 2 years of Commencement Date or Reinstatement Date -> Trigger Mandatory Claim Investigation.",
            "severity": "ROUTING",
            "errorCode": "ROUTE_CLM_INVESTIGATION",
            "errorMessage": "Claim occurred within 2-year contestable window. Mandatory investigation for non-disclosure / pre-existing conditions.",
            "systemAction": "Routes claim to Special Investigation Unit (SIU) queue; blocks fast-track settlement.",
            "actuarialBasis": "Article 28 Insurance Business Law: protects risk pool from fraudulent anti-selection and non-disclosure.",
            "pdfPage": 296
          },
          {
            "ruleId": "VAL-CLM-003",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Benefit Conflict Check",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "Critical Illness vs TPD Installment Conflict Check",
            "condition": "When saving CI claim decision, system validates if there is an ongoing TPD installment claim on the same policy.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_ONGOING_TPD_CONFLICT",
            "errorMessage": "Ongoing TPD claim detected with remaining unpaid installments. Verify total benefit acceleration limits.",
            "systemAction": "Prompts warning message to claim assessor and prompts confirmation to continue.",
            "actuarialBasis": "Prevents double-paying accelerated benefits that share the same unified core life sum assured pool.",
            "pdfPage": 337
          },
          {
            "ruleId": "VAL-CLM-004",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Document Completeness",
            "targetEntity": "T_CLAIM_DOCUMENT",
            "ruleName": "Proof of Loss Document Completeness Verification",
            "condition": "All required claim documents must have Completeness IND = 'Y' or Waived IND = 'Y' before decision sign-off.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_UNCOMPLETED_DOCS",
            "errorMessage": "There is uncompleted required document. Please confirm to continue?",
            "systemAction": "Displays modal confirmation prompt; logs supervisor waiver in audit trail.",
            "actuarialBasis": "Legal documentation integrity required to defend settlement against reinsurance audit.",
            "pdfPage": 337
          },
          {
            "ruleId": "VAL-CLM-005",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Claim Payout Calculation",
            "targetEntity": "T_CLAIM_PAYOUT",
            "ruleName": "Indebtedness Deduction from Gross Claim Payout",
            "condition": "Net Claim Payout = Approved Claim SA + Reversionary/Terminal Bonuses - Outstanding Loans - Accrued Interest - Overdue Premiums.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CLM_CALCULATION_DISCREPANCY",
            "errorMessage": "Net payout must automatically deduct all outstanding policy debts before disbursement.",
            "systemAction": "Calculates net disbursement voucher and sets policy loan status to `CLOSED_BY_CLAIM`.",
            "actuarialBasis": "Senior creditor right: insurer possesses absolute statutory right of offset against claims proceeds for policy debts.",
            "pdfPage": 318
          }
        ]
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
        "pdf_page": 324,
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-003",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Benefit Conflict Check",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "Critical Illness vs TPD Installment Conflict Check",
            "condition": "When saving CI claim decision, system validates if there is an ongoing TPD installment claim on the same policy.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_ONGOING_TPD_CONFLICT",
            "errorMessage": "Ongoing TPD claim detected with remaining unpaid installments. Verify total benefit acceleration limits.",
            "systemAction": "Prompts warning message to claim assessor and prompts confirmation to continue.",
            "actuarialBasis": "Prevents double-paying accelerated benefits that share the same unified core life sum assured pool.",
            "pdfPage": 337
          },
          {
            "ruleId": "VAL-CLM-005",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Claim Payout Calculation",
            "targetEntity": "T_CLAIM_PAYOUT",
            "ruleName": "Indebtedness Deduction from Gross Claim Payout",
            "condition": "Net Claim Payout = Approved Claim SA + Reversionary/Terminal Bonuses - Outstanding Loans - Accrued Interest - Overdue Premiums.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CLM_CALCULATION_DISCREPANCY",
            "errorMessage": "Net payout must automatically deduct all outstanding policy debts before disbursement.",
            "systemAction": "Calculates net disbursement voucher and sets policy loan status to `CLOSED_BY_CLAIM`.",
            "actuarialBasis": "Senior creditor right: insurer possesses absolute statutory right of offset against claims proceeds for policy debts.",
            "pdfPage": 318
          }
        ]
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
        "pdf_page": 336,
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-001",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Coverage Verification",
            "targetEntity": "T_CLAIM",
            "ruleName": "Inforce Status on Incident Date Rule",
            "condition": "Policy must have been in status 'INFORCE' or 'INFORCE_APL' on the exact Claim Event Date (`CLAIM_EVENT_DATE`).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CLM_POLICY_NOT_INFORCE_ON_EVENT",
            "errorMessage": "Policy was lapsed, surrendered, or not yet commenced on the incident date. Claim must be declined.",
            "systemAction": "Auto-flags claim as 'Decline Recommended' with contractual coverage failure reason.",
            "actuarialBasis": "No insurance liability exists outside active premium-funded coverage windows.",
            "pdfPage": 271
          },
          {
            "ruleId": "VAL-CLM-002",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Contestability Assessment",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "2-Year Contestability Period Investigation Trigger",
            "condition": "If Event Date is within 2 years of Commencement Date or Reinstatement Date -> Trigger Mandatory Claim Investigation.",
            "severity": "ROUTING",
            "errorCode": "ROUTE_CLM_INVESTIGATION",
            "errorMessage": "Claim occurred within 2-year contestable window. Mandatory investigation for non-disclosure / pre-existing conditions.",
            "systemAction": "Routes claim to Special Investigation Unit (SIU) queue; blocks fast-track settlement.",
            "actuarialBasis": "Article 28 Insurance Business Law: protects risk pool from fraudulent anti-selection and non-disclosure.",
            "pdfPage": 296
          },
          {
            "ruleId": "VAL-CLM-003",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Benefit Conflict Check",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "Critical Illness vs TPD Installment Conflict Check",
            "condition": "When saving CI claim decision, system validates if there is an ongoing TPD installment claim on the same policy.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_ONGOING_TPD_CONFLICT",
            "errorMessage": "Ongoing TPD claim detected with remaining unpaid installments. Verify total benefit acceleration limits.",
            "systemAction": "Prompts warning message to claim assessor and prompts confirmation to continue.",
            "actuarialBasis": "Prevents double-paying accelerated benefits that share the same unified core life sum assured pool.",
            "pdfPage": 337
          },
          {
            "ruleId": "VAL-CLM-004",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Document Completeness",
            "targetEntity": "T_CLAIM_DOCUMENT",
            "ruleName": "Proof of Loss Document Completeness Verification",
            "condition": "All required claim documents must have Completeness IND = 'Y' or Waived IND = 'Y' before decision sign-off.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_UNCOMPLETED_DOCS",
            "errorMessage": "There is uncompleted required document. Please confirm to continue?",
            "systemAction": "Displays modal confirmation prompt; logs supervisor waiver in audit trail.",
            "actuarialBasis": "Legal documentation integrity required to defend settlement against reinsurance audit.",
            "pdfPage": 337
          },
          {
            "ruleId": "VAL-CLM-005",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Claim Payout Calculation",
            "targetEntity": "T_CLAIM_PAYOUT",
            "ruleName": "Indebtedness Deduction from Gross Claim Payout",
            "condition": "Net Claim Payout = Approved Claim SA + Reversionary/Terminal Bonuses - Outstanding Loans - Accrued Interest - Overdue Premiums.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_CLM_CALCULATION_DISCREPANCY",
            "errorMessage": "Net payout must automatically deduct all outstanding policy debts before disbursement.",
            "systemAction": "Calculates net disbursement voucher and sets policy loan status to `CLOSED_BY_CLAIM`.",
            "actuarialBasis": "Senior creditor right: insurer possesses absolute statutory right of offset against claims proceeds for policy debts.",
            "pdfPage": 318
          }
        ]
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
        "pdf_page": 260,
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-003",
            "module": "MOD_06",
            "moduleName": "Claims Management (CLM APP)",
            "lifecyclePhase": "10. Claims Management",
            "stage": "Benefit Conflict Check",
            "targetEntity": "T_CLAIM_ASSESSMENT",
            "ruleName": "Critical Illness vs TPD Installment Conflict Check",
            "condition": "When saving CI claim decision, system validates if there is an ongoing TPD installment claim on the same policy.",
            "severity": "SOFT_WARNING",
            "errorCode": "WARN_CLM_ONGOING_TPD_CONFLICT",
            "errorMessage": "Ongoing TPD claim detected with remaining unpaid installments. Verify total benefit acceleration limits.",
            "systemAction": "Prompts warning message to claim assessor and prompts confirmation to continue.",
            "actuarialBasis": "Prevents double-paying accelerated benefits that share the same unified core life sum assured pool.",
            "pdfPage": 337
          }
        ]
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
    "pdf_chapter": "Chapter 5: Claims Management (CLM APP)",
    "validation_rules": [
      {
        "ruleId": "VAL-CLM-001",
        "module": "MOD_06",
        "moduleName": "Claims Management (CLM APP)",
        "lifecyclePhase": "10. Claims Management",
        "stage": "Coverage Verification",
        "targetEntity": "T_CLAIM",
        "ruleName": "Inforce Status on Incident Date Rule",
        "condition": "Policy must have been in status 'INFORCE' or 'INFORCE_APL' on the exact Claim Event Date (`CLAIM_EVENT_DATE`).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CLM_POLICY_NOT_INFORCE_ON_EVENT",
        "errorMessage": "Policy was lapsed, surrendered, or not yet commenced on the incident date. Claim must be declined.",
        "systemAction": "Auto-flags claim as 'Decline Recommended' with contractual coverage failure reason.",
        "actuarialBasis": "No insurance liability exists outside active premium-funded coverage windows.",
        "pdfPage": 271
      },
      {
        "ruleId": "VAL-CLM-002",
        "module": "MOD_06",
        "moduleName": "Claims Management (CLM APP)",
        "lifecyclePhase": "10. Claims Management",
        "stage": "Contestability Assessment",
        "targetEntity": "T_CLAIM_ASSESSMENT",
        "ruleName": "2-Year Contestability Period Investigation Trigger",
        "condition": "If Event Date is within 2 years of Commencement Date or Reinstatement Date -> Trigger Mandatory Claim Investigation.",
        "severity": "ROUTING",
        "errorCode": "ROUTE_CLM_INVESTIGATION",
        "errorMessage": "Claim occurred within 2-year contestable window. Mandatory investigation for non-disclosure / pre-existing conditions.",
        "systemAction": "Routes claim to Special Investigation Unit (SIU) queue; blocks fast-track settlement.",
        "actuarialBasis": "Article 28 Insurance Business Law: protects risk pool from fraudulent anti-selection and non-disclosure.",
        "pdfPage": 296
      },
      {
        "ruleId": "VAL-CLM-003",
        "module": "MOD_06",
        "moduleName": "Claims Management (CLM APP)",
        "lifecyclePhase": "10. Claims Management",
        "stage": "Benefit Conflict Check",
        "targetEntity": "T_CLAIM_ASSESSMENT",
        "ruleName": "Critical Illness vs TPD Installment Conflict Check",
        "condition": "When saving CI claim decision, system validates if there is an ongoing TPD installment claim on the same policy.",
        "severity": "SOFT_WARNING",
        "errorCode": "WARN_CLM_ONGOING_TPD_CONFLICT",
        "errorMessage": "Ongoing TPD claim detected with remaining unpaid installments. Verify total benefit acceleration limits.",
        "systemAction": "Prompts warning message to claim assessor and prompts confirmation to continue.",
        "actuarialBasis": "Prevents double-paying accelerated benefits that share the same unified core life sum assured pool.",
        "pdfPage": 337
      },
      {
        "ruleId": "VAL-CLM-004",
        "module": "MOD_06",
        "moduleName": "Claims Management (CLM APP)",
        "lifecyclePhase": "10. Claims Management",
        "stage": "Document Completeness",
        "targetEntity": "T_CLAIM_DOCUMENT",
        "ruleName": "Proof of Loss Document Completeness Verification",
        "condition": "All required claim documents must have Completeness IND = 'Y' or Waived IND = 'Y' before decision sign-off.",
        "severity": "SOFT_WARNING",
        "errorCode": "WARN_CLM_UNCOMPLETED_DOCS",
        "errorMessage": "There is uncompleted required document. Please confirm to continue?",
        "systemAction": "Displays modal confirmation prompt; logs supervisor waiver in audit trail.",
        "actuarialBasis": "Legal documentation integrity required to defend settlement against reinsurance audit.",
        "pdfPage": 337
      },
      {
        "ruleId": "VAL-CLM-005",
        "module": "MOD_06",
        "moduleName": "Claims Management (CLM APP)",
        "lifecyclePhase": "10. Claims Management",
        "stage": "Claim Payout Calculation",
        "targetEntity": "T_CLAIM_PAYOUT",
        "ruleName": "Indebtedness Deduction from Gross Claim Payout",
        "condition": "Net Claim Payout = Approved Claim SA + Reversionary/Terminal Bonuses - Outstanding Loans - Accrued Interest - Overdue Premiums.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_CLM_CALCULATION_DISCREPANCY",
        "errorMessage": "Net payout must automatically deduct all outstanding policy debts before disbursement.",
        "systemAction": "Calculates net disbursement voucher and sets policy loan status to `CLOSED_BY_CLAIM`.",
        "actuarialBasis": "Senior creditor right: insurer possesses absolute statutory right of offset against claims proceeds for policy debts.",
        "pdfPage": 318
      }
    ],
    "validation_rules_count": 5
  },
  {
    "id": "MOD_07",
    "num": "07",
    "title": "Mod 07: Payment & Finance (FIN & GL Sub-Ledger)",
    "subtitle": "Commercial Banking, Dual-Control Cashier, 7-Segment Accounting Rules, Suspense Reconciliation & GL Posting",
    "icon": "landmark",
    "badge": "Financial Settlement",
    "page_range": "Pages 375 - 446",
    "summary": "Module 07 Payment & Finance governs all monetary inflows, disbursements, sub-ledger accounting rules, and General Ledger interface postings across eBao Gemini Life Core PAS. It provides commercial bank account maintenance, multi-tier Maker-Checker payment authorization (L10 to L140), suspense account tracking with automated 90-day refunds, and an exhaustive 7-segment accounting rule engine supporting Cash, ARAP, Non-Unit, and Unit fee sources with strict double-entry zero-balance enforcement (SUM(Dr) == SUM(Cr)).",
    "mermaid_workflow": "graph LR\n    Origin[\"Payout Origin (Claim / Surrender / Loan / Refund)\"] --> Payee[\"Verify Payee & Bank Account\"]\n    Payee --> TaxAML[\"Tax Withholding & AML Validation\"]\n    TaxAML --> Auth{\"Approval Threshold\"}\n    Auth -- Within Limit --> BatchPay[\"Generate Payment Batch\"]\n    Auth -- Exceeds Limit --> ExecSignOff[\"Financial Controller Sign-off\"]\n    ExecSignOff --> BatchPay\n    BatchPay --> EFT[\"Direct Bank Transfer / Wire Rails\"]\n    EFT --> Reconcile[\"Bank Settlement Reconciliation\"]\n    Reconcile --> Ledger[\"Post General Ledger (AP/AR Journal Entries)\"]",
    "core_concepts": [
      [
        {
          "term": "7-Segment Chart of Accounts",
          "def": "Standardized multi-dimensional financial account coding: Company (Seg 1), Branch (Seg 2), Natural Account (Seg 3), Sub-Account (Seg 4), Cost Center (Seg 5), Product Code (Seg 6), and Currency (Seg 7)."
        },
        {
          "term": "Dual-Control Maker-Checker Segregation",
          "def": "Strict operational separation enforced by system where the user who calculated or requested a payment voucher cannot authorize or disburse funds, preventing unauthorized internal transactions."
        },
        {
          "term": "Fee Source Sub-Ledgers (Cash, ARAP, NonUnit, Unit)",
          "def": "Segregates financial transactions into distinct sub-ledgers: Cash (immediate receipts/payouts F11/F32), ARAP (receivables/payables F12/F31), NonUnit (traditional mortality/admin fees), and Unit (ILP investment fund trade settlements)."
        },
        {
          "term": "Premium Suspense Account (T_SUSPENSE_ACCOUNT)",
          "def": "A temporary liability holding account for customer bank deposits received without immediate policy matching, featuring automated 90-day refund workflows (Job 13) for unresolved balances."
        },
        {
          "term": "Right of Offset in Insurance Claims",
          "def": "The insurer's absolute statutory right to deduct all outstanding policy indebtedness (loan principal, accrued loan interest, unpaid grace period premiums) prior to releasing net claim settlement proceeds."
        }
      ]
    ],
    "actuary_notes": [
      [
        "Mathematical Reserve Alignment: Real-time synchronization between sub-ledger transaction codes and actuarial reserves ensures that unearned premium reserve (UPR) and IFRS 17 Best Estimate Liabilities (BEL) match corporate ledgers.",
        "Policy Loan Indebtedness & Interest Compounding: Daily batch Job 12 accrues 6.5% p.a. interest ((Loan Principal * 0.065) / 365), compounding monthly into total loan debt and auto-triggering foreclosure notices if debt >= Gross Cash Value.",
        "Reinsurance Ceded Premium Allocation: Automatically provisions proportional treaty balances (Quota Share & Surplus) during month-end valuation, separating net retained risk from retroceded liability."
      ]
    ],
    "op_notes": [
      [
        "Authority Threshold Gating: Payment requisitions exceeding current user's signed authority automatically enter 'Temporary Fee Status' and route to Payment Authorization queue.",
        "Zero Tolerance Double-Entry Balance: Nightly batch job Job 15 'FN GL Posting' halts system date advancement if total debits do not equal total credits (SUM(Dr) != SUM(Cr)).",
        "Direct Credit vs Internal Transfer: Internal transfers within the same insurer tenant are exempt from disbursement authority caps and generate zero external bank clearing fees."
      ]
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
        "code": "SOP-FIN-01",
        "title": "Maintain Commercial Bank Accounts & Operating Branch Association",
        "role": "Finance Administrator",
        "objective": "Establish corporate collection and disbursement bank accounts, define ISO currency bindings, configure direct debit clearing formats, and restrict account operational permissions by servicing branch.",
        "ui_path": "Finance > Bank > Maintain Bank Account",
        "pdf_page": 407,
        "prerequisites": [
          "User must hold 'ROLE_FIN_ADMIN' or 'ROLE_TREASURY_MGR' privileges in URP.",
          "Commercial bank agreement, clearing routing code (SWIFT/CITAD), and corporate account number officially approved by Treasury Directorate.",
          "Operating branches (Head Office, Regional Hubs) mapped in General Ledger Segment 2."
        ],
        "steps": [
          "1. From the main menu, navigate to Finance > Bank > Maintain Bank Account. System displays the Maintain Bank Account search list with active corporate accounts.",
          "2. Click the '+ Add' button on the top right toolbar to initiate new bank account onboarding.",
          "3. In the Bank Account Details section, enter the Account Name (e.g., 'Sacom Life - Collections Direct Debit'), select the Bank Name from the master bank directory dropdown, and input the official Bank Code (e.g., '79303001' for Vietcombank Clearing).",
          "4. Enter the Bank Account Number. System enforces format validation: numerical length between 8 and 20 digits, no white spaces.",
          "5. Select Currency from dropdown: VND (Default base currency) or USD (Foreign exchange collection).",
          "6. In the Account Purpose checkboxes, specify account utilization: check 'Collection Account' (Receipts F11), 'Disbursement Account' (Payments F32), or both.",
          "7. In the Direct Debit Interface Configuration panel, select File Clearing Specification (e.g., 'ISO 20022 PAIN.008', 'Vietcombank Flat File Format V2', or 'NAPAS 24/7 Realtime API').",
          "8. Define Account Validity Period: Set Start Effective Date (Format: DD/MM/YYYY) and optional End Effective Date (leave blank for indefinite active operations).",
          "9. In the Servicing Branch Allocation panel, click 'Add Branch'. In the Branch Picker modal, multi-select authorized operational entities: [Head Office 001, Hanoi Regional 002, HCMC Regional 003]. Only policies belonging to mapped branches can transact through this bank account.",
          "10. Click 'Save & Submit'. Step Result: System validates bank routing code against national bank registry. Bank account status changes to 'ACTIVE' and registers in SOR table `T_BANK_ACCOUNT`."
        ],
        "fields_table": [
          {
            "name": "Bank Name",
            "type": "Dropdown",
            "required": "Yes",
            "desc": "Selected from central banking master directory (T_BANK_CODE)."
          },
          {
            "name": "Bank Account No",
            "type": "Text (Numeric)",
            "required": "Yes",
            "desc": "Unique corporate account number; length 8-20 characters."
          },
          {
            "name": "Currency Code",
            "type": "Select",
            "required": "Yes",
            "desc": "ISO-4217 Currency (VND / USD)."
          },
          {
            "name": "Account Purpose",
            "type": "Checkbox Group",
            "required": "Yes",
            "desc": "Collection (Inflow), Disbursement (Outflow), or Dual-Purpose."
          },
          {
            "name": "Clearing Format",
            "type": "Select",
            "required": "Yes",
            "desc": "Specifies electronic batch file layout for automated reconciliation."
          },
          {
            "name": "Start Effective Date",
            "type": "Date (DD/MM/YYYY)",
            "required": "Yes",
            "desc": "The first calendar date this account can receive or pay funds."
          },
          {
            "name": "Branch Association",
            "type": "Multi-Select Tree",
            "required": "Yes",
            "desc": "Controls row-level security for cashier collection routing."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-FIN-001",
            "ruleName": "Active Bank Account Mandatory for Cash Operations",
            "condition": "At least one active bank account must exist for the policy's operational branch and currency code before receipting or paying.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FIN_NO_ACTIVE_BANK_ACCT",
            "systemAction": "Blocks cashier receipt collection and payment voucher disbursement.",
            "actuarialBasis": "Treasury governance: prevents cash handling without verified bank account reconciliation links.",
            "pdfPage": 406
          },
          {
            "ruleId": "VAL-FIN-002",
            "ruleName": "End Effective Date Greater Than Start Date",
            "condition": "If End Effective Date is specified, it must be strictly greater than Start Effective Date.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FIN_INVALID_BANK_DATE_RANGE",
            "systemAction": "Rejects bank account configuration save with date sequence error.",
            "actuarialBasis": "Prevents inverted operational date windows in treasury clearing logs.",
            "pdfPage": 410
          }
        ],
        "actuary_notes": "All cash flows routed through corporate bank accounts feed directly into asset-liability management (ALM) cash liquidity forecasting models.",
        "op_notes": "Bank accounts with expired End Effective Dates automatically enter read-only archive mode; pending payments must be rerouted to active accounts."
      },
      {
        "code": "SOP-FIN-02",
        "title": "Configure 7-Segment Accounting Rules & Dynamic Fee Mapping",
        "role": "General Ledger Specialist / Finance Architect",
        "objective": "Define debit and credit chart of accounts mapping for every insurance fee transaction (Cashier, AR/AP, Non-Unit, Unit) across 7 standardized GL segments.",
        "ui_path": "Finance > Accounting > Set Accounting Rule",
        "pdf_page": 413,
        "prerequisites": [
          "User must hold 'ROLE_GL_SPECIALIST' or 'ROLE_FIN_CONTROLLER' credentials.",
          "7-Segment architecture verified: Company (Seg 1), Branch (Seg 2), Natural Account (Seg 3), Sub-Account (Seg 4), Cost Center (Seg 5), Product Line (Seg 6), Currency (Seg 7).",
          "Fee type code created in `T_FEE_TYPE` and flagged `POSTED_TO_GL = 'Y'`."
        ],
        "steps": [
          "1. From main navigation, select Finance > Accounting > Set Accounting Rule. System opens the Accounting Rule Configuration dashboard with tabbed fee sources.",
          "2. Select the target Fee Source tab based on the nature of the transaction:\n   - 'CASH' (Fee Type F11 Receipt Collection, F32 Actual Payment)\n   - 'ARAP' (Fee Type F12 Accounts Receivable Billing, F31 Accounts Payable Voucher)\n   - 'NONUNIT' (Traditional Mortality Charges, Administration Loading Fees)\n   - 'UNIT' (Unit-Linked Fund Allocations, Unit Redemptions, Fund Switching).",
          "3. Click '+ Add' to create a new rule. In the Rule Header section, enter Rule Code (e.g. 'AR-CASH-NB-01'), Rule Description, and select Business Transaction Type (e.g. 'TX-NB-008 Enforce Policy').",
          "4. In the Filter Criteria section, configure dynamic matching conditions:\n   - Payment Method: [Cash, Direct Debit, Credit Card, Bank Wire, AXS]\n   - Product Category: [Traditional Endowment, Term Life, Whole Life, ILP, Universal Life]\n   - Channel / Agency Tier: [Bancassurance, Agency Core, Direct Digital].",
          "5. In the Debit Account Specification (DR) panel, map the 7 Segments:\n   - Seg 1 (Company): '01' (Sacom Life)\n   - Seg 2 (Branch): Dynamic Macro '[POL_BRANCH]' or fixed code '001'\n   - Seg 3 (Account): Natural GL Code (e.g. '112000' Cash at Bank Clearing)\n   - Seg 4 (Sub-Account): '000' (Default Sub-ledger)\n   - Seg 5 (Cost Center): Dynamic '[POL_COST_CENTER]'\n   - Seg 6 (Product): Dynamic '[PROD_CODE]' (e.g. 'ENDOW_20')\n   - Seg 7 (Currency): Dynamic '[POL_CURRENCY]'.",
          "6. In the Credit Account Specification (CR) panel, map the corresponding 7 Segments:\n   - Seg 1 to 7 with offsetting liability/revenue account (e.g. Seg 3 = '411000' Gross Written Premium - First Year).",
          "7. Verify Mathematical Balance: System automatically verifies that Currency and Entity Dimensions between Debit and Credit are strictly compatible.",
          "8. Set Rule Status: Select 'Enabled'. Click 'Save'. Step Result: Rule compiles into cache `[BIZ-DATA][GL][ACCOUNTING_RULE]` and is immediately available for real-time and nightly batch posting."
        ],
        "fields_table": [
          {
            "name": "Fee Source",
            "type": "Tabs",
            "required": "Yes",
            "desc": "CASH, ARAP, NONUNIT, or UNIT sub-ledger source."
          },
          {
            "name": "Transaction Type",
            "type": "Dropdown",
            "required": "Yes",
            "desc": "Standard eBao transaction code (e.g. TX-BIL-003, TX-CLM-005)."
          },
          {
            "name": "DR Segment 1..7",
            "type": "Segmented Inputs",
            "required": "Yes",
            "desc": "Debit account dimensions supporting fixed values or dynamic policy macros."
          },
          {
            "name": "CR Segment 1..7",
            "type": "Segmented Inputs",
            "required": "Yes",
            "desc": "Credit account dimensions supporting fixed values or dynamic policy macros."
          },
          {
            "name": "Rule Status",
            "type": "Select",
            "required": "Yes",
            "desc": "Enabled (Active in posting engine) or Disabled (Bypassed)."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-GL-001",
            "ruleName": "Double-Entry Bookkeeping Zero-Balance Enforcement",
            "condition": "Total Debit Amount must exactly equal Total Credit Amount (SUM(Dr) == SUM(Cr)) for every posted journal entry.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_GL_UNBALANCED_ENTRY",
            "systemAction": "Rejects journal batch posting; aborts transaction commit and routes to GL Exception queue.",
            "actuarialBasis": "Core financial accounting integrity: ensures balance sheet and revenue accounts remain strictly synchronized.",
            "pdfPage": 411
          },
          {
            "ruleId": "VAL-GL-002",
            "ruleName": "Active Accounting Rule Match Requirement",
            "condition": "Every financial movement must match an enabled accounting rule with valid Fee Source (Cash/ARAP/Unit/NonUnit).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_GL_RULE_DISABLED",
            "systemAction": "Logs unmapped transaction in GL Exception Queue for Finance Administrator resolution.",
            "actuarialBasis": "Statutory audit standard: every financial movement must follow pre-defined, auditor-approved chart of accounts.",
            "pdfPage": 415
          }
        ],
        "actuary_notes": "Segregation of First Year Premium (4110) vs Renewal Premium (4120) is essential for statutory expense strain analysis and IFRS 17 CSM calculation.",
        "op_notes": "To mass-update rules across 200+ products, use the 'UPLOAD' feature with a standardized CSV template containing all 14 segment fields."
      },
      {
        "code": "SOP-FIN-03",
        "title": "Payment Requisition & Multi-Disbursement Method Processing",
        "role": "Cashier / Customer Service Financial Officer",
        "objective": "Capture, consolidate, and format outgoing payments generated by upstream modules (NB refunds, Free-look cancellations, Surrenders, Policy Loans, Death/CI Claims, and Suspense refunds).",
        "ui_path": "Finance > Payment > Payment Requisition",
        "pdf_page": 384,
        "prerequisites": [
          "Upstream business transaction (Surrender CS-FN-05, Claim CLM-05, Loan CS-FN-07, Free-Look CS-FN-06) approved and committed to SOR.",
          "Payment record generated in `T_BCP_CASH_FEE` with Fee Type F32 (Actual Payment) in status '0 - Waiting for Processing' or Temporary Fee Status."
        ],
        "steps": [
          "1. Access the Gemini Web Portal and navigate to Finance > Payment > Payment Requisition.",
          "2. In the Search Criteria panel, filter by Business Type (New Business Refund, Customer Service, Claims, Suspense Refund), Policy Number, or Proposal Number. Click 'Search'.",
          "3. The Payment Records table displays eligible pending payments with Policy No, Insured Name, Gross Payable, Loan Deductions, and Net Amount.",
          "4. Select one or multiple payment records by checking the row checkboxes.",
          "5. In the Disbursement Method Selection area, choose the designated disbursement route:\n   - 'DIRECT_CREDIT' (Electronic Bank Transfer via CITAD / FAST / NAPAS 24/7)\n   - 'CHEQUE' (Crossed Account Payee Corporate Cheque)\n   - 'CASHIER_ORDER' (Bank Guaranteed Cheque)\n   - 'INTERNAL_TRANSFER' (Offsetting premium deposit into another inforce policy).",
          "6. If 'DIRECT_CREDIT' is selected, verify payee bank details:\n   - Payee Name must match Policyholder / Verified Beneficiary / Assignee name.\n   - Bank Name, Bank Branch, and Bank Account Number verified against customer bank passbook or e-KYC record.",
          "7. If part of the payment is transferred to another policy (e.g. paying renewal on a spouse's policy), input the target Policy No and Transfer Amount.",
          "8. Review Net Payout vs Authority Threshold: System calculates Payout Amount = Total Payable minus Internal Transfer Amount. (Internal transfer amounts are exempt from disbursement authority checks).",
          "9. Click 'Submit Requisition'. Step Result:\n   - If Net Payout <= User's Payment Requisition Limit: Fee status advances to 'Waiting for Processing'.\n   - If Net Payout > User's Payment Requisition Limit: Fee status transitions to 'Temporary Fee Status' (Pending Authorization) and automatically generates an approval task in Payment Authorization queue.",
          "10. System generates Payment Requisition Voucher ID (`VOUCHER_NO`) in `T_PAYMENT_VOUCHER`."
        ],
        "fields_table": [
          {
            "name": "Disbursement Method",
            "type": "Radio Group",
            "required": "Yes",
            "desc": "Direct Credit, Cheque, Cashier Order, or Internal Transfer."
          },
          {
            "name": "Payee Name",
            "type": "Text (Read-only/Editable)",
            "required": "Yes",
            "desc": "Contractual beneficiary, policyholder, or bank assignee."
          },
          {
            "name": "Payee Bank Code",
            "type": "Select",
            "required": "Conditional",
            "desc": "Mandatory for Direct Credit; specifies receiving clearing bank."
          },
          {
            "name": "Payee Bank Account",
            "type": "Text (Numeric)",
            "required": "Conditional",
            "desc": "Mandatory for Direct Credit; recipient bank account number."
          },
          {
            "name": "Target Policy No",
            "type": "Text",
            "required": "Conditional",
            "desc": "Mandatory if Internal Transfer method selected."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-FIN-003",
            "ruleName": "Payee Identification & KYC Verification Check",
            "condition": "Disbursement Payee Name must exactly match Policyholder, Irrevocable Beneficiary, or Legal Assignee in T_PARTY.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FIN_PAYEE_NAME_MISMATCH",
            "systemAction": "Blocks submission of Direct Credit voucher if payee differs from contractual SOR party.",
            "actuarialBasis": "AML / CFT compliance: prevents third-party unauthorized fund diversion.",
            "pdfPage": 402
          },
          {
            "ruleId": "VAL-FIN-004",
            "ruleName": "Requisition Limit Gating (Auto Temporary Fee Status)",
            "condition": "If Cash Disbursement Amount > User Role Requisition Limit, system automatically sets Temporary Fee Status.",
            "severity": "ROUTING",
            "errorCode": "ROUTE_FIN_PAY_AUTH_REQUIRED",
            "systemAction": "Freezes voucher from disbursement release; routes to Payment Authorization queue.",
            "actuarialBasis": "Dual-control segregation of duties for all significant corporate financial disbursements.",
            "pdfPage": 388
          }
        ],
        "actuary_notes": "Loan and claim deductions must be fully netted off in the voucher to prevent over-disbursement beyond mathematical liabilities.",
        "op_notes": "Internal transfers within the same tenant do not generate bank clearing transaction fees, improving operational cost efficiency."
      },
      {
        "code": "SOP-FIN-04",
        "title": "Payment Authorization & Maker-Checker Dual-Control Release",
        "role": "Finance Supervisor / Treasury Manager / Finance Director",
        "objective": "Review and authorize payment requisitions exceeding staff limits or generated by automated batch runs (Maturity, Cash Bonus, Death Claims), enforcing strict Maker-Checker segregation.",
        "ui_path": "Finance > Payment > Payment Authorization",
        "pdf_page": 390,
        "prerequisites": [
          "User must hold an authorized Payment Authorization role in URP (e.g. `D_CSD_PAY_AUTH_L10` up to `L140`).",
          "Payment voucher must be in 'Temporary Fee Status' awaiting approval.",
          "Maker-Checker Constraint: The logged-in authorizer MUST NOT be the user who submitted the payment requisition or registered the upstream claim."
        ],
        "steps": [
          "1. From main navigation, select Finance > Payment > Payment Authorization. System opens the Payment Authorization management workbench.",
          "2. In the Search Filter panel, set criteria: Voucher Number, Policy Number, Business Type, Creation Date range. Click 'Search'.",
          "3. The system queries `T_PAYMENT_VOUCHER` and returns all records requiring authorization. For each record, the table displays: Voucher ID, Policy No, Payee Name, Transaction Type, Gross Amount, Deductions, Net Payout, Creator User ID, and Creation Date.",
          "4. Authorization Limit Check: If the voucher amount exceeds the logged-in user's signed authority limit (e.g. Voucher is $65,000 but user has Level 2 authority of $50,000), the row is displayed with an 'Exceeds Limit - View Only' badge and selection checkbox is disabled.",
          "5. For records within authority limit, click the 'View Details' hyperlink to inspect supporting audit documentation (approved claim worksheet, signed surrender request, or bank confirmation).",
          "6. Select the target payment voucher by clicking its checkbox.",
          "7. In the Decision Panel, select the Approval Action:\n   - 'AUTHORIZE' (Approve payment release)\n   - 'REJECT' (Decline payment release).",
          "8. If 'REJECT' is selected, a mandatory Reject Reason must be chosen from the dropdown (e.g., 'Incorrect Bank Account', 'Missing Beneficiary ID', 'Suspected Fraud Hold') and input remarks.",
          "9. Click 'Submit Decision'. Step Result:\n   - If Authorized: Voucher status updates to 'AUTHORIZED' and fee record advances to 'Waiting for Processing' (ready for bank release). Audit log records: Authorizer User ID, Timestamp, Approval Role Code.\n   - If Rejected: Voucher status updates to 'CANCELLED', fee status reverts, and upstream module is notified with the rejection reason.",
          "10. A success confirmation prompt is displayed: 'Payment Voucher [VOUCHER_NO] authorized successfully'."
        ],
        "fields_table": [
          {
            "name": "Approval Decision",
            "type": "Radio",
            "required": "Yes",
            "desc": "Authorize (Release) or Reject (Cancel)."
          },
          {
            "name": "Reject Reason",
            "type": "Dropdown",
            "required": "Conditional",
            "desc": "Mandatory if Reject decision chosen."
          },
          {
            "name": "Supervisor Comments",
            "type": "Text Area",
            "required": "No",
            "desc": "Optional audit remarks recorded in permanent GL log."
          },
          {
            "name": "Authorization Role",
            "type": "Read-only Display",
            "required": "Yes",
            "desc": "Current user authority profile (e.g. D_CSD_PAY_AUTH_L70)."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-GL-003",
            "ruleName": "Maker-Checker Segregation of Duties for Payments",
            "condition": "The user who registered, created, or calculated a payment voucher cannot authorize or release the payment disbursement.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FIN_MAKER_CHECKER_VIOLATION",
            "systemAction": "Disables 'Authorize' button; throws strict segregation of duties error.",
            "actuarialBasis": "SOX & statutory corporate governance: prevents internal embezzlement and unilateral unauthorized cash movements.",
            "pdfPage": 390
          },
          {
            "ruleId": "VAL-FIN-005",
            "ruleName": "Authorization Financial Cap Enforcement",
            "condition": "Voucher amount must be <= the maximum amount configured for user's authorization role tier.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FIN_AUTH_LIMIT_EXCEEDED",
            "systemAction": "Blocks authorization; enforces escalation to higher tier (e.g. Chief Financial Officer).",
            "actuarialBasis": "Delegation of authority governance controlling enterprise liquidity risk.",
            "pdfPage": 387
          }
        ],
        "actuary_notes": "Authorizations for large death claims (> $100k) trigger automatic reinsurance recovery requisition notifications to treaty reinsurers.",
        "op_notes": "Batch payments generated by nightly EOD runs (e.g. 500 maturity payouts) can be batch-authorized via 'Select All' if total batch amount is within supervisor limit."
      },
      {
        "code": "SOP-FIN-05",
        "title": "Suspense Account Deposit Allocation & Automated Refund Reconciliation",
        "role": "Cashier Supervisor / Bank Reconciliation Specialist",
        "objective": "Process unidentified bank deposits, reconcile premium receipts parked in suspense, allocate funds to pending proposals/policies, and execute automated batch refunds for excess balances.",
        "ui_path": "Finance > Cashier > Suspense Maintenance",
        "pdf_page": 359,
        "prerequisites": [
          "Corporate collection bank statement imported via MT940 / CAMT.053 electronic bank statement interface.",
          "Unmatched deposit records stored in `T_SUSPENSE_ACCOUNT` with status 'UNALLOCATED'."
        ],
        "steps": [
          "1. From main navigation, select Finance > Cashier > Suspense Maintenance. System displays the Suspense Account Management workbench.",
          "2. In the Search Criteria area, filter by Bank Account, Deposit Date Range, or Transaction Reference. Click 'Search'.",
          "3. System lists all suspense deposits showing: Suspense ID, Deposit Date, Bank Reference, Amount Deposited, Allocated Amount, and Remaining Balance.",
          "4. Identify Unmatched Payment: Review bank narrative/remittance info (e.g. 'NAPAS Transfer from Nguyen Van An 0912345678').",
          "5. To manually allocate: Click 'Allocate' on the target suspense row. System opens the Suspense Allocation modal.",
          "6. In the Search Policy panel, enter the Policy No, Proposal No, or Customer Citizen ID. Click 'Query'.",
          "7. System retrieves target contract showing Overdue Billing Invoice or Pending Proposal Requirement.",
          "8. Enter Allocation Amount (e.g. $4,800.00). Click 'Confirm Allocation'.",
          "9. Step Result: System executes journal entry JE-03:\n   - Dr. 219000 Premium Suspense Account\n   - Cr. 115000 Accounts Receivable / 411000 First Premium.\n   Suspense record balance updates to $0.00; Policy status advances immediately.",
          "10. Automated Batch Refund Handling (Job 13 in Nightly EOD):\n    - For suspense balances remaining unallocated for > 90 days or where proposal was declined/cancelled, the batch engine automatically generates an F32 refund record with fee status 'Waiting for Processing'.\n    - Refund funds return automatically to remitter's source bank account."
        ],
        "fields_table": [
          {
            "name": "Suspense ID",
            "type": "Read-only Text",
            "required": "Yes",
            "desc": "System-generated unique identifier in T_SUSPENSE_ACCOUNT."
          },
          {
            "name": "Bank Reference",
            "type": "Text",
            "required": "Yes",
            "desc": "Transaction reference provided by commercial clearing bank."
          },
          {
            "name": "Target Contract No",
            "type": "Text",
            "required": "Yes",
            "desc": "Validated Proposal No or Policy No receiving credit."
          },
          {
            "name": "Allocation Amount",
            "type": "Currency (Numeric)",
            "required": "Yes",
            "desc": "Amount transferred from suspense to contract ledger."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-FIN-006",
            "ruleName": "Suspense Allocation Cannot Exceed Available Balance",
            "condition": "Total allocated amount across all contracts must be <= Original Deposited Suspense Balance.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FIN_SUSPENSE_OVER_ALLOCATED",
            "systemAction": "Rejects allocation transaction with balance deficit error.",
            "actuarialBasis": "Prevents artificial creation of unbacked premium credits in policy ledgers.",
            "pdfPage": 360
          },
          {
            "ruleId": "VAL-FIN-007",
            "ruleName": "Suspense Balances Cannot Be Transferred to Terminated Contracts",
            "condition": "Target policy must not be in 'TERMINATED_DEATH' or 'TERMINATED_SURRENDER' status.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_FIN_CANNOT_CREDIT_TERMINATED_POLICY",
            "systemAction": "Blocks policy selection in allocation modal.",
            "actuarialBasis": "Closed liability contracts cannot accept ongoing premium consideration.",
            "pdfPage": 361
          }
        ],
        "actuary_notes": "Unallocated suspense balances represent short-term liabilities to depositors and are segregated from underwriting revenues in financial reports.",
        "op_notes": "Under MOF circular regulations, unidentified suspense deposits older than 180 days require statutory unclaimed moneys reporting."
      },
      {
        "code": "SOP-FIN-06",
        "title": "Daily EOD Financial Batch Posting & General Ledger ERP Export",
        "role": "Batch Operator / Financial Systems Controller",
        "objective": "Execute the 4 daily financial posting batch jobs (CASH, ARAP, NONUNIT, UNIT), validate double-entry balance integrity, and generate ERP interface files (SAP / Oracle).",
        "ui_path": "Finance > Accounting > GL Posting Batch",
        "pdf_page": 415,
        "prerequisites": [
          "Online business operations closed for current calendar day (Cashier counter closed at 17:00).",
          "Accounting rules verified and enabled in `T_ACCOUNTING_RULE`.",
          "Preceding batch jobs (Billing Extraction Job 01, Auto Collection Job 02) finished with return code 0."
        ],
        "steps": [
          "1. Access the Batch Console at 23:00 or initiate manual run via Finance > Accounting > GL Posting Batch.",
          "2. System launches Job 15 `JOB_GL_EXTRACT_ROLL` executing sequential sub-processes:\n   - Part A: 'FN GL Posting - CASH' extracts records from `T_BCP_CASH_FEE` where `POSTED_TO_GL = 'Y'`, `Posted = 'N'`, `FEE_STATUS = 1 (Confirmed)`.\n   - Part B: 'FN GL Posting - ARAP' extracts billing invoices and vouchers from `T_BCP_ARAP_FEE`.\n   - Part C: 'FN GL Posting - NONUNIT' extracts mortality cost, policy admin fee, and rider deductions.\n   - Part D: 'FN GL Posting - UNIT' extracts investment-linked fund unit valuations and asset management fees.",
          "3. Rule Matching Engine: For each extracted financial transaction, the engine evaluates Filter Criteria (Transaction Type, Payment Method, Product Line) against active accounting rules.",
          "4. Journal Line Generation: Generates matched Debit and Credit records in `T_SUB_LEDGER_ENTRY` populating all 7 segments.",
          "5. Balance Verification Check: The engine computes `SUM(DR_AMOUNT) - SUM(CR_AMOUNT)`. If difference != 0.00, the batch process triggers a critical alert and halts.",
          "6. ERP File Formatting: Compiles validated journal entries into ERP interface format (e.g. SAP IDoc `ACC_DOCUMENT03` or Oracle GL Interface CSV).",
          "7. Post-Posting State Update: Updates `T_BCP_*_FEE.POSTED = 'Y'` and stamps `POSTING_BATCH_ID` and `GL_POSTING_DATE`.",
          "8. Interface Transmission: Pushes export file to corporate SFTP directory `/interfaces/erp/gl_inbound/` with MD5 checksum verification.",
          "9. Step Result: System outputs batch execution summary: Total Records Extracted, Total Journal Lines Generated, Net Debits ($), Net Credits ($), Out-of-balance Exceptions (0).",
          "10. System flags Job 15 as 'SUCCESS (RC=0)', unlocking Job 16 System Date Rollover."
        ],
        "fields_table": [
          {
            "name": "Batch Process Date",
            "type": "Date Display",
            "required": "Yes",
            "desc": "Current accounting date being closed."
          },
          {
            "name": "Posting Scope",
            "type": "Select",
            "required": "Yes",
            "desc": "All Sub-ledgers (Cash, ARAP, NonUnit, Unit) or selective run."
          },
          {
            "name": "ERP Target Interface",
            "type": "Select",
            "required": "Yes",
            "desc": "SAP ERP S/4HANA, Oracle Financials Cloud, or SunSystems v6."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BAT-002",
            "ruleName": "System Date Roll Reconciliation Prerequisite",
            "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
            "systemAction": "Blocks business date advancement; sends emergency notification to On-Call Financial Controller.",
            "actuarialBasis": "Prevents calendar day gaps or overlapping valuation cycles in actuarial balance sheet.",
            "pdfPage": 24
          },
          {
            "ruleId": "VAL-GL-004",
            "ruleName": "Unposted Financial Records Zero Tolerance",
            "condition": "Zero unmapped financial fee records allowed during month-end closing (EOM) batch execution.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_GL_UNMAPPED_FEES_EXIST",
            "systemAction": "Halts month-end ledger lock; generates unmapped fee exception report.",
            "actuarialBasis": "Financial statement completeness: prevents unrecorded revenues or unrecognized claim expenses.",
            "pdfPage": 418
          }
        ],
        "actuary_notes": "The sub-ledger extracts generate the trial balance inputs used by actuarial reporting tools to calculate IFRS 17 Insurance Service Result.",
        "op_notes": "If an individual fee record cannot match any active accounting rule, it is written to `T_GL_SUSPEND_FEE` without blocking the remaining batch transactions."
      }
    ],
    "sop_count": 6,
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
    "pdf_chapter": "Chapter 7: Payment, Cashier & General Ledger Accounting",
    "validation_rules": [
      {
        "ruleId": "VAL-GL-001",
        "module": "MOD_07",
        "moduleName": "Payment & Finance",
        "lifecyclePhase": "11. Finance & Accounting",
        "stage": "Journal Balancing",
        "targetEntity": "T_GL_ENTRY",
        "ruleName": "Double-Entry Bookkeeping Zero-Balance Enforcement",
        "condition": "For every journal transaction, Total Debit Amount must exactly equal Total Credit Amount (`SUM(Dr) == SUM(Cr)`).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_GL_UNBALANCED_ENTRY",
        "errorMessage": "General Ledger entry is out of balance. Total debits do not equal total credits.",
        "systemAction": "Rejects journal batch posting; aborts transaction commit.",
        "actuarialBasis": "Core financial accounting integrity: ensures balance sheet and revenue accounts remain strictly synchronized.",
        "pdfPage": 411
      },
      {
        "ruleId": "VAL-GL-002",
        "module": "MOD_07",
        "moduleName": "Payment & Finance",
        "lifecyclePhase": "11. Finance & Accounting",
        "stage": "Accounting Rule Matching",
        "targetEntity": "T_GL_RULE",
        "ruleName": "Active Accounting Rule Match Requirement",
        "condition": "Every business transaction must match an enabled accounting rule with valid Fee Source (Cash/ARAP/Unit/NonUnit).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_GL_RULE_DISABLED",
        "errorMessage": "No active accounting rule matched for transaction type. GL posting aborted.",
        "systemAction": "Logs unmapped transaction in GL Exception Queue for Finance Administrator resolution.",
        "actuarialBasis": "Statutory audit standard: every financial movement must follow pre-defined, auditor-approved chart of accounts.",
        "pdfPage": 415
      },
      {
        "ruleId": "VAL-GL-003",
        "module": "MOD_07",
        "moduleName": "Payment & Finance",
        "lifecyclePhase": "11. Finance & Accounting",
        "stage": "Disbursement Authorization",
        "targetEntity": "T_PAYMENT_VOUCHER",
        "ruleName": "Maker-Checker Segregation of Duties for Payments",
        "condition": "The user who registered or calculated a payment voucher cannot authorize or release the payment disbursement.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_FIN_MAKER_CHECKER_VIOLATION",
        "errorMessage": "Dual-control segregation violation: creator of payment voucher cannot authorize payment.",
        "systemAction": "Disables 'Authorize' button for current user session.",
        "actuarialBasis": "SOX & internal operational risk compliance: prevents internal fraud and unauthorized financial embezzlement.",
        "pdfPage": 390
      }
    ],
    "validation_rules_count": 3,
    "journal_entry_patterns": [
      {
        "id": "JE-01",
        "name": "First Year Premium Collection (New Business Inforce)",
        "source": "CASH",
        "txCode": "TX-NB-008",
        "trigger": "Policy Issuance / First Premium Allocated",
        "dr": "112000 - Cash at Bank (Collections Clearing)",
        "cr": "411000 - Gross Written Premium (First Year)",
        "segDr": "01.001.112000.000.CC-OPS.PROD.VND",
        "segCr": "01.001.411000.000.CC-DIST.PROD.VND",
        "desc": "Debits corporate clearing account upon receipt of modal initial premium; credits first-year life insurance revenue."
      },
      {
        "id": "JE-02",
        "name": "Renewal Premium Direct Debit Collection",
        "source": "CASH / ARAP",
        "txCode": "TX-BIL-003",
        "trigger": "Bank Direct Debit Clearing Settlement",
        "dr": "112000 - Cash at Bank (Direct Debit Clearing)",
        "cr": "115000 - Accounts Receivable (Renewal Premium Due)",
        "segDr": "01.001.112000.000.CC-OPS.PROD.VND",
        "segCr": "01.001.115000.000.CC-OPS.PROD.VND",
        "desc": "Offsets outstanding Accounts Receivable created on T-30 billing extraction upon successful bank clearing return."
      },
      {
        "id": "JE-03",
        "name": "Unidentified Premium Deposit to Suspense",
        "source": "CASH",
        "txCode": "TX-BIL-001",
        "trigger": "Bank Statement MT940 Unmatched Inflow",
        "dr": "112000 - Cash at Bank (Collections Clearing)",
        "cr": "219000 - Premium Suspense Account (Unallocated)",
        "segDr": "01.001.112000.000.CC-OPS.00.VND",
        "segCr": "01.001.219000.000.CC-OPS.00.VND",
        "desc": "Parks customer payments lacking policy number in short-term liability suspense pending manual or automated reconciliation."
      },
      {
        "id": "JE-04",
        "name": "21-Day Free-Look Statutory Cancellation Refund",
        "source": "CASH",
        "txCode": "TX-CS-006",
        "trigger": "Free-Look Cancellation Approval (Day <= 21)",
        "dr": "411000 - Gross Written Premium (Reversal)",
        "cr": "518000 - Incurred Medical Examination Expenses (Offset)\nCr. 112000 - Cash at Bank (Disbursement Payable)",
        "segDr": "01.001.411000.000.CC-DIST.PROD.VND",
        "segCr": "01.001.518000.000.CC-UW.00.VND / 01.001.112000.000.CC-OPS.PROD.VND",
        "desc": "Reverses 100% of gross premium revenue, deducts actual medical examination costs, and releases net refund voucher."
      },
      {
        "id": "JE-05",
        "name": "Intermediary Sales Commission Provisioning",
        "source": "ARAP",
        "txCode": "TX-NB-009",
        "trigger": "Policy Issuance / Commission Engine Vested",
        "dr": "521000 - Intermediary Acquisition Commission Expense",
        "cr": "221000 - Commission Payable to Agents / Brokers",
        "segDr": "01.001.521000.000.CC-DIST.PROD.VND",
        "segCr": "01.001.221000.000.CC-DIST.00.VND",
        "desc": "Recognizes sales acquisition costs and provisions commission obligation payable on the bi-weekly agency cutoff."
      },
      {
        "id": "JE-06",
        "name": "100% Commission Clawback (Cancellation / Early Lapse)",
        "source": "ARAP",
        "txCode": "TX-CS-007",
        "trigger": "Free-Look Cancellation / Anti-Selection Lapse",
        "dr": "221000 - Commission Payable / 118000 Agent Debt Account",
        "cr": "521000 - Intermediary Acquisition Commission Expense (Reversal)",
        "segDr": "01.001.221000.000.CC-DIST.00.VND",
        "segCr": "01.001.521000.000.CC-DIST.PROD.VND",
        "desc": "Recovers 100% of unearned agent commissions upon policy cooling-off cancellation or lapse within clawback schedule."
      },
      {
        "id": "JE-07",
        "name": "Policy Loan Disbursement (Max LTV 85%)",
        "source": "CASH",
        "txCode": "TX-CS-008",
        "trigger": "Policy Loan Application Approved",
        "dr": "121000 - Policy Loans Principal (Asset Account)",
        "cr": "112000 - Cash at Bank (Disbursement Outflow)",
        "segDr": "01.001.121000.000.CC-ACT.PROD.VND",
        "segCr": "01.001.112000.000.CC-OPS.00.VND",
        "desc": "Creates policy loan investment asset collateralized against the policy surrender cash value."
      },
      {
        "id": "JE-08",
        "name": "Daily Policy Loan Interest Accrual (6.5% p.a.)",
        "source": "NONUNIT",
        "txCode": "TX-BAT-012",
        "trigger": "Batch Job 12 Nightly EOD Execution",
        "dr": "121100 - Policy Loan Accrued Interest Receivable (Asset)",
        "cr": "421000 - Policy Loan Interest Income (Revenue)",
        "segDr": "01.001.121100.000.CC-ACT.PROD.VND",
        "segCr": "01.001.421000.000.CC-ACT.PROD.VND",
        "desc": "Calculates and compounds daily loan interest: (Principal * 0.065) / 365, capitalizing into total loan indebtedness."
      },
      {
        "id": "JE-09",
        "name": "Death Claim Settlement with Complete Debt Offset",
        "source": "ARAP / CASH",
        "txCode": "TX-CLM-005",
        "trigger": "Death Claim Voucher Authorized",
        "dr": "511000 - Death Claims Incurred Expense ($100,000)",
        "cr": "121000 - Policy Loan Principal Asset ($15,000)\nCr. 121100 - Policy Loan Accrued Interest Asset ($1,200)\nCr. 115000 - Overdue Premium AR ($800)\nCr. 212000 - Claims Payable to Beneficiary ($83,000)",
        "segDr": "01.001.511000.000.CC-CLM.PROD.VND",
        "segCr": "Multiple Asset/Liability offsets",
        "desc": "Recognizes full gross death claim liability while exercising legal right of offset to recover all outstanding policy debts."
      },
      {
        "id": "JE-10",
        "name": "Policy Surrender Payout Execution",
        "source": "CASH",
        "txCode": "TX-CS-005",
        "trigger": "Surrender Application Approved & Signed",
        "dr": "512000 - Surrender Benefits Incurred Expense",
        "cr": "121000 - Policy Loan Principal / Interest Offset\nCr. 112000 - Cash at Bank (Disbursement Voucher)",
        "segDr": "01.001.512000.000.CC-CS.PROD.VND",
        "segCr": "01.001.112000.000.CC-OPS.00.VND",
        "desc": "Liquidates mathematical reserves to disburse net surrender value after deducting loans and applicable surrender charges."
      },
      {
        "id": "JE-11",
        "name": "Treaty Reinsurance Premium Ceded",
        "source": "ARAP",
        "txCode": "TX-BAT-014",
        "trigger": "Month-End Reinsurance Allocation Run",
        "dr": "531000 - Reinsurance Premium Ceded Expense",
        "cr": "231000 - Reinsurance Balance Payable to Treaty Partner",
        "segDr": "01.001.531000.000.CC-REIN.PROD.VND",
        "segCr": "01.001.231000.000.CC-REIN.00.VND",
        "desc": "Transfers surplus mortality risk to reinsurer (e.g. Swiss Re / Munich Re) according to quota share / surplus treaty terms."
      },
      {
        "id": "JE-12",
        "name": "Month-End Unearned Premium Reserve (UPR) Movement",
        "source": "NONUNIT",
        "txCode": "TX-BAT-015",
        "trigger": "EOM Actuarial Valuation Batch Run",
        "dr": "419000 - Change in Unearned Premium Reserve",
        "cr": "311000 - Unearned Premium Reserve Liability (UPR)",
        "segDr": "01.001.419000.000.CC-ACT.PROD.VND",
        "segCr": "01.001.311000.000.CC-ACT.PROD.VND",
        "desc": "Defers unearned portion of gross written premiums based on exact 1/365 pro-rata daily exposure method."
      }
    ],
    "gl_segments_spec": [
      {
        "seg": "Segment 1",
        "name": "Company / Legal Entity",
        "length": "2 Digits",
        "example": "01 (Sacom Life Vietnam)",
        "desc": "Distinguishes corporate legal entities in a multi-tenant holding structure."
      },
      {
        "seg": "Segment 2",
        "name": "Operating Branch / Servicing Unit",
        "length": "3 Digits",
        "example": "001 (Head Office), 002 (Hanoi)",
        "desc": "Controls regional row-level security and local tax jurisdiction accounting."
      },
      {
        "seg": "Segment 3",
        "name": "Natural Account Code",
        "length": "6 Digits",
        "example": "111000 (Cash), 411000 (Premium Income)",
        "desc": "Primary balance sheet and P&L financial classification."
      },
      {
        "seg": "Segment 4",
        "name": "Sub-Account / Ledger Extension",
        "length": "3 Digits",
        "example": "000 (General), 101 (Actuarial Reserves)",
        "desc": "Granular breakdown of statutory reserves and ledger provisions."
      },
      {
        "seg": "Segment 5",
        "name": "Cost Center / Responsibility Center",
        "length": "6 Chars",
        "example": "CC-OPS, CC-DIST-AGENCY, CC-CLM",
        "desc": "Allocates administrative and operational expenses to departmental units."
      },
      {
        "seg": "Segment 6",
        "name": "Product Line / Plan Code",
        "length": "8 Chars",
        "example": "ENDOW_20, TERM_10, ILP_BAL",
        "desc": "Enables multi-dimensional product profitability and actuarial margin analysis."
      },
      {
        "seg": "Segment 7",
        "name": "Currency Code",
        "length": "3 Chars",
        "example": "VND (704), USD (840)",
        "desc": "ISO-4217 currency identifier supporting multi-currency statutory books."
      }
    ]
  },
  {
    "id": "MOD_08",
    "num": "08",
    "title": "Mod 08: Batch Console (EOD/EOM)",
    "subtitle": "EOD/EOM Orchestration, Auto-Lapse, APL Execution, Interest Accrual & Valuation",
    "icon": "clock",
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
        "pdf_page": 428,
        "validation_rules": [
          {
            "ruleId": "VAL-BAT-001",
            "module": "MOD_08",
            "moduleName": "Batch Console (EOD/EOM)",
            "lifecyclePhase": "12. Batch Operations",
            "stage": "DAG Dependency Gating",
            "targetEntity": "T_BATCH_JOB_LOG",
            "ruleName": "Strict Job Dependency Return Code 0 Check",
            "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
            "errorMessage": "Upstream batch job failed or exited with warnings. Pipeline auto-gated to prevent data corruption.",
            "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
            "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
            "pdfPage": 16
          },
          {
            "ruleId": "VAL-BAT-002",
            "module": "MOD_08",
            "moduleName": "Batch Console (EOD/EOM)",
            "lifecyclePhase": "12. Batch Operations",
            "stage": "System Date Rolling",
            "targetEntity": "T_BIZ_DATE",
            "ruleName": "System Date Roll Reconciliation Prerequisite",
            "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
            "errorMessage": "Cannot advance business date: one or more EOD jobs failed or GL entries remain unposted.",
            "systemAction": "Blocks date rollover; prevents online users from operating in inconsistent calendar state.",
            "actuarialBasis": "Calendar day alignment: prevents chronological gaps or retroactive calculation overlaps in policy valuation.",
            "pdfPage": 24
          }
        ]
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
        "pdf_page": 435,
        "validation_rules": [
          {
            "ruleId": "VAL-LN-004",
            "module": "MOD_08",
            "moduleName": "Batch Console (EOD/EOM)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "Foreclosure Trigger",
            "targetEntity": "T_POLICY_LOAN",
            "ruleName": "Negative Equity Policy Foreclosure (Lapse)",
            "condition": "If Total Debt (Loan Principal + Accumulated Interest) >= Gross Cash Value -> Issue 30-Day Foreclosure Notice.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_FORECLOSURE_LAPSE",
            "errorMessage": "Policy debt exceeds total surrender cash value. Policy lapses automatically upon notice expiry.",
            "systemAction": "Job 07 in Nightly Batch flags policy for Foreclosure Termination.",
            "actuarialBasis": "Insurer cannot maintain life coverage when total outstanding indebtedness wipes out asset reserve.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-BAT-001",
            "module": "MOD_08",
            "moduleName": "Batch Console (EOD/EOM)",
            "lifecyclePhase": "12. Batch Operations",
            "stage": "DAG Dependency Gating",
            "targetEntity": "T_BATCH_JOB_LOG",
            "ruleName": "Strict Job Dependency Return Code 0 Check",
            "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
            "errorMessage": "Upstream batch job failed or exited with warnings. Pipeline auto-gated to prevent data corruption.",
            "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
            "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
            "pdfPage": 16
          },
          {
            "ruleId": "VAL-BAT-002",
            "module": "MOD_08",
            "moduleName": "Batch Console (EOD/EOM)",
            "lifecyclePhase": "12. Batch Operations",
            "stage": "System Date Rolling",
            "targetEntity": "T_BIZ_DATE",
            "ruleName": "System Date Roll Reconciliation Prerequisite",
            "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
            "errorMessage": "Cannot advance business date: one or more EOD jobs failed or GL entries remain unposted.",
            "systemAction": "Blocks date rollover; prevents online users from operating in inconsistent calendar state.",
            "actuarialBasis": "Calendar day alignment: prevents chronological gaps or retroactive calculation overlaps in policy valuation.",
            "pdfPage": 24
          }
        ]
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
        "pdf_page": 441,
        "validation_rules": [
          {
            "ruleId": "VAL-LN-004",
            "module": "MOD_08",
            "moduleName": "Batch Console (EOD/EOM)",
            "lifecyclePhase": "07. Policy Loans & APL",
            "stage": "Foreclosure Trigger",
            "targetEntity": "T_POLICY_LOAN",
            "ruleName": "Negative Equity Policy Foreclosure (Lapse)",
            "condition": "If Total Debt (Loan Principal + Accumulated Interest) >= Gross Cash Value -> Issue 30-Day Foreclosure Notice.",
            "severity": "HARD_STOP",
            "errorCode": "ERR_LN_FORECLOSURE_LAPSE",
            "errorMessage": "Policy debt exceeds total surrender cash value. Policy lapses automatically upon notice expiry.",
            "systemAction": "Job 07 in Nightly Batch flags policy for Foreclosure Termination.",
            "actuarialBasis": "Insurer cannot maintain life coverage when total outstanding indebtedness wipes out asset reserve.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-BAT-001",
            "module": "MOD_08",
            "moduleName": "Batch Console (EOD/EOM)",
            "lifecyclePhase": "12. Batch Operations",
            "stage": "DAG Dependency Gating",
            "targetEntity": "T_BATCH_JOB_LOG",
            "ruleName": "Strict Job Dependency Return Code 0 Check",
            "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
            "severity": "HARD_STOP",
            "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
            "errorMessage": "Upstream batch job failed or exited with warnings. Pipeline auto-gated to prevent data corruption.",
            "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
            "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
            "pdfPage": 16
          }
        ]
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
    "pdf_chapter": "Chapter 8: Batch Console & System Maintenance",
    "validation_rules": [
      {
        "ruleId": "VAL-LN-004",
        "module": "MOD_08",
        "moduleName": "Batch Console (EOD/EOM)",
        "lifecyclePhase": "07. Policy Loans & APL",
        "stage": "Foreclosure Trigger",
        "targetEntity": "T_POLICY_LOAN",
        "ruleName": "Negative Equity Policy Foreclosure (Lapse)",
        "condition": "If Total Debt (Loan Principal + Accumulated Interest) >= Gross Cash Value -> Issue 30-Day Foreclosure Notice.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_LN_FORECLOSURE_LAPSE",
        "errorMessage": "Policy debt exceeds total surrender cash value. Policy lapses automatically upon notice expiry.",
        "systemAction": "Job 07 in Nightly Batch flags policy for Foreclosure Termination.",
        "actuarialBasis": "Insurer cannot maintain life coverage when total outstanding indebtedness wipes out asset reserve.",
        "pdfPage": 452
      },
      {
        "ruleId": "VAL-BAT-001",
        "module": "MOD_08",
        "moduleName": "Batch Console (EOD/EOM)",
        "lifecyclePhase": "12. Batch Operations",
        "stage": "DAG Dependency Gating",
        "targetEntity": "T_BATCH_JOB_LOG",
        "ruleName": "Strict Job Dependency Return Code 0 Check",
        "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
        "severity": "HARD_STOP",
        "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
        "errorMessage": "Upstream batch job failed or exited with warnings. Pipeline auto-gated to prevent data corruption.",
        "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
        "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
        "pdfPage": 16
      },
      {
        "ruleId": "VAL-BAT-002",
        "module": "MOD_08",
        "moduleName": "Batch Console (EOD/EOM)",
        "lifecyclePhase": "12. Batch Operations",
        "stage": "System Date Rolling",
        "targetEntity": "T_BIZ_DATE",
        "ruleName": "System Date Roll Reconciliation Prerequisite",
        "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
        "severity": "HARD_STOP",
        "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
        "errorMessage": "Cannot advance business date: one or more EOD jobs failed or GL entries remain unposted.",
        "systemAction": "Blocks date rollover; prevents online users from operating in inconsistent calendar state.",
        "actuarialBasis": "Calendar day alignment: prevents chronological gaps or retroactive calculation overlaps in policy valuation.",
        "pdfPage": 24
      }
    ],
    "validation_rules_count": 3
  }
];
window.EBAO_VALIDATION_RULES = [
  {
    "ruleId": "VAL-PF-001",
    "module": "MOD_01",
    "moduleName": "Architecture & Product Factory",
    "lifecyclePhase": "01. Product Configuration",
    "stage": "Product Definition",
    "targetEntity": "T_PROD_TERM",
    "ruleName": "Policy Term vs Premium Paying Term Alignment",
    "condition": "Premium Paying Term (PPT) must be strictly <= Policy Term (PT).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_PF_TERM_MISMATCH",
    "errorMessage": "Premium paying term cannot exceed policy duration.",
    "systemAction": "Blocks product publication to SOR runtime tables.",
    "actuarialBasis": "Prevent negative reserve accumulation and unbacked liability exposure post-premium paying period.",
    "pdfPage": 26
  },
  {
    "ruleId": "VAL-PF-002",
    "module": "MOD_01",
    "moduleName": "Architecture & Product Factory",
    "lifecyclePhase": "01. Product Configuration",
    "stage": "Eligibility Setup",
    "targetEntity": "T_PROD_AGE_LIMIT",
    "ruleName": "Maturity Age Ceiling Enforcement",
    "condition": "Issue Age + Policy Term must not exceed Maximum Maturity Age (e.g. Age 75 or Age 99).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_PF_MAX_MATURITY_EXCEEDED",
    "errorMessage": "Entry age plus coverage term exceeds maximum maturity age defined in product charter.",
    "systemAction": "Invalidates product rate grid compilation.",
    "actuarialBasis": "Mortality tables terminate at maximum attained age; extrapolation beyond ceiling causes undefined pricing rates.",
    "pdfPage": 27
  },
  {
    "ruleId": "VAL-PF-003",
    "module": "MOD_01",
    "moduleName": "Architecture & Product Factory",
    "lifecyclePhase": "01. Product Configuration",
    "stage": "Rider Compatibility",
    "targetEntity": "T_RIDER_COMPATIBILITY",
    "ruleName": "Rider Sum Assured & Term Capping",
    "condition": "Attached Rider Sum Assured <= 100% of Base Plan Sum Assured, and Rider Expiry Date <= Base Plan Expiry Date.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_PF_RIDER_EXCEEDS_BASE",
    "errorMessage": "Rider coverage cannot exceed base plan sum assured or extend beyond base maturity.",
    "systemAction": "Disallows rider attachment in proposal workbench.",
    "actuarialBasis": "Anti-selection control: supplementary riders cannot be utilized as standalone primary life coverage.",
    "pdfPage": 55
  },
  {
    "ruleId": "VAL-PF-004",
    "module": "MOD_01",
    "moduleName": "Architecture & Product Factory",
    "lifecyclePhase": "01. Product Configuration",
    "stage": "Cash Value Schedule",
    "targetEntity": "T_SURRENDER_VAL_SCHEDULE",
    "ruleName": "Cash Value Non-Negative & Non-Decreasing Guarantee",
    "condition": "Guaranteed Cash Value schedule must be monotonic non-decreasing for policy durations >= 3 years.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_PF_INVALID_CV_SCHEDULE",
    "errorMessage": "Surrender cash value schedule violates actuarial non-forfeiture minimum standard.",
    "systemAction": "Rejects cash value table import.",
    "actuarialBasis": "Compliance with Insurance Business Law statutory minimum guaranteed cash value standards.",
    "pdfPage": 29
  },
  {
    "ruleId": "VAL-PF-005",
    "module": "MOD_01",
    "moduleName": "Architecture & Product Factory",
    "lifecyclePhase": "01. Product Configuration",
    "stage": "Unit-Linked Parameters",
    "targetEntity": "T_ILP_FUND_CONFIG",
    "ruleName": "Investment Fund Apportionment Ceiling",
    "condition": "Apportionment percentages must be integers between 0% and 100%, and total must equal exactly 100%.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_PF_FUND_APPORTION_SUM",
    "errorMessage": "Fund allocation percentages must sum up to 100%.",
    "systemAction": "Blocks fund portfolio configuration save.",
    "actuarialBasis": "Prevents unallocated premium cash flows or over-allocated fund unit creation.",
    "pdfPage": 50
  },
  {
    "ruleId": "VAL-NB-001",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "02. Proposal Registration",
    "stage": "Agent Verification",
    "targetEntity": "T_AGENT_CONTRACT",
    "ruleName": "Agent License & Active Status Validation",
    "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_NB_AGENT_INVALID",
    "errorMessage": "Agent is inactive, unlicensed for product, or currently suspended. Proposal issue generated.",
    "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
    "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
    "pdfPage": 137
  },
  {
    "ruleId": "VAL-NB-002",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "02. Proposal Registration",
    "stage": "Beneficiary Allocation",
    "targetEntity": "T_POLICY_BENEFICIARY",
    "ruleName": "Beneficiary Share Percentage 100% Balance",
    "condition": "The sum of share percentages for all beneficiaries within the same priority sequence must equal exactly 100.00%.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_NB_BENEFICIARY_SUM_MISMATCH",
    "errorMessage": "Total beneficiary share percentage within same priority order must equal 100%.",
    "systemAction": "Blocks proposal submission and generates proposal issue.",
    "actuarialBasis": "Ensures unequivocal claims disbursement without inter-pleader estate litigation risk.",
    "pdfPage": 137
  },
  {
    "ruleId": "VAL-NB-003",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "02. Proposal Registration",
    "stage": "Beneficiary Legal Type",
    "targetEntity": "T_POLICY_BENEFICIARY",
    "ruleName": "Trust Nomination Relationship Restriction",
    "condition": "For Trust Nomination (Sec 49L / Sec 73 CLPA), relationship is mandatory and strictly restricted to Spouse or Child.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_NB_INVALID_TRUST_RELATION",
    "errorMessage": "Trust nomination only allows Spouse or Child. Other relatives must use Revocable nomination (49M).",
    "systemAction": "Validation fails on Beneficiary screen; blocks proposal validation.",
    "actuarialBasis": "Legal bankruptcy protection compliance: trust policies create an immediate statutory trust in favor of immediate family.",
    "pdfPage": 485
  },
  {
    "ruleId": "VAL-NB-004",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "02. Proposal Registration",
    "stage": "Financial Underwriting",
    "targetEntity": "T_PARTY_FINANCIAL",
    "ruleName": "Proposer Mandatory Annual Income Check",
    "condition": "Proposer Annual Income is mandatory (> 0) and Total Sum Assured <= Maximum Income Multiple (e.g. 25x for Age <= 35).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
    "errorMessage": "The Annual Income of the proposer must be entered. Proposal issue generated.",
    "systemAction": "Generates Underwriting Financial Requirement if multiple exceeded.",
    "actuarialBasis": "Anti-Money Laundering (AML) and anti-selection: ensures coverage is proportionate to economic human life value.",
    "pdfPage": 137
  },
  {
    "ruleId": "VAL-NB-005",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "02. Proposal Registration",
    "stage": "Juvenile Protection",
    "targetEntity": "T_POLICY_BENEFIT",
    "ruleName": "Juvenile Statutory Sum Assured Ceiling",
    "condition": "For Life Assured age < 4 years, Death Sum Assured capped at statutory limit (e.g. $20,000 / 500,000,000 VND).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_NB_JUVENILE_SA_LIMIT",
    "errorMessage": "Sum assured exceeds statutory ceiling for juvenile life assured under 4 years of age.",
    "systemAction": "Auto-trims Sum Assured to statutory limit or blocks quote calculation.",
    "actuarialBasis": "Moral hazard prevention and statutory child welfare regulation compliance.",
    "pdfPage": 55
  },
  {
    "ruleId": "VAL-NB-006",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "02. Proposal Registration",
    "stage": "Health Declaration",
    "targetEntity": "T_NB_DECLARATION",
    "ruleName": "Declaration Form Mandatory Response Completeness",
    "condition": "Every question in the product declaration form must have an affirmative ('Yes') or negative ('No') recorded.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
    "errorMessage": "One or more health/lifestyle declaration questions remain unanswered.",
    "systemAction": "Blocks transition from Data Entry to Underwriting queue.",
    "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation for future contestability assessment.",
    "pdfPage": 61
  },
  {
    "ruleId": "VAL-NB-007",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "02. Proposal Registration",
    "stage": "Initial Premium Receipt",
    "targetEntity": "T_SUSPENSE_RECEIPT",
    "ruleName": "First Premium Minimum Tolerance Match",
    "condition": "Deposited initial premium must equal exact modal gross premium (tolerance 0 VND underpayment).",
    "severity": "SOFT_WARNING",
    "errorCode": "WARN_NB_PREM_SHORTFALL",
    "errorMessage": "Initial collection shortfall detected. Policy cannot issue until balance paid in full.",
    "systemAction": "Parks payment in Suspense Account (`T_SUSPENSE_ACCT`); holds issuance.",
    "actuarialBasis": "No policy contract can form without complete consideration received by insurer.",
    "pdfPage": 359
  },
  {
    "ruleId": "VAL-UW-001",
    "module": "MOD_03",
    "moduleName": "Underwriting (UW APP)",
    "lifecyclePhase": "03. Underwriting Assessment",
    "stage": "STP Auto-Underwriting",
    "targetEntity": "T_AUTO_UW_LOG",
    "ruleName": "Straight-Through Processing (STP) Eligibility Gating",
    "condition": "Age <= 45 AND Sum Assured <= Non-Medical Limit AND 100% Negative Health Declaration AND Agent Compliance = 'PASS'.",
    "severity": "ROUTING",
    "errorCode": "ROUTE_UW_MANUAL_QUEUE",
    "errorMessage": "Proposal fails STP criteria; escalated to manual Underwriting Workbench.",
    "systemAction": "Routes task to Senior Underwriter queue with rule discrepancy triggers.",
    "actuarialBasis": "Filters out elevated mortality/morbidity risks for human clinical judgment.",
    "pdfPage": 7
  },
  {
    "ruleId": "VAL-UW-002",
    "module": "MOD_03",
    "moduleName": "Underwriting (UW APP)",
    "lifecyclePhase": "03. Underwriting Assessment",
    "stage": "Medical Requirements",
    "targetEntity": "T_UW_REQUIREMENT",
    "ruleName": "Medical Requirement Completeness Hard Stop",
    "condition": "All generated medical and non-medical requirements must have Completeness IND = 'Y' or Waived IND = 'Y'.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_UW_PENDING_REQUIREMENTS",
    "errorMessage": "There are uncompleted required documents or pending medical exams. Cannot approve proposal.",
    "systemAction": "Disables 'Approve' and 'Issue Policy' buttons on Underwriting Workbench.",
    "actuarialBasis": "Prevents legally binding policy issuance without verified clinical health parameters.",
    "pdfPage": 337
  },
  {
    "ruleId": "VAL-UW-003",
    "module": "MOD_03",
    "moduleName": "Underwriting (UW APP)",
    "lifecyclePhase": "03. Underwriting Assessment",
    "stage": "Authority Limits",
    "targetEntity": "T_UW_AUTHORITY",
    "ruleName": "Underwriter Financial & Rating Authority Delegation",
    "condition": "Proposed Sum Assured and EM loading must be within the Underwriter's signed authority matrix limit.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_UW_EXCEEDS_AUTHORITY",
    "errorMessage": "Sum assured or loading exceeds current underwriter authority limit. Auto-escalation required.",
    "systemAction": "Auto-escalates task to Chief Underwriter or Underwriting Committee pool.",
    "actuarialBasis": "Internal control segregation to avoid unauthorized systemic risk assumption.",
    "pdfPage": 8
  },
  {
    "ruleId": "VAL-UW-004",
    "module": "MOD_03",
    "moduleName": "Underwriting (UW APP)",
    "lifecyclePhase": "03. Underwriting Assessment",
    "stage": "Counter-Offer Management",
    "targetEntity": "T_UW_COUNTER_OFFER",
    "ruleName": "Counter-Offer Acceptance & Premium Adjustment",
    "condition": "If rating applied (Loading > 0 or Exclusion), client signed acceptance and revised premium paid before policy can issue.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_UW_PENDING_CLIENT_ACCEPTANCE",
    "errorMessage": "Proposal has active Counter-Offer. Policy cannot inforce until client signs endorsement form.",
    "systemAction": "Freezes policy status at `PENDING_ACCEPTANCE` with 30-day offer expiration timer.",
    "actuarialBasis": "Contract law: counter-offer terminates original proposal; new contract forms only upon mutual agreement.",
    "pdfPage": 144
  },
  {
    "ruleId": "VAL-UW-005",
    "module": "MOD_03",
    "moduleName": "Underwriting (UW APP)",
    "lifecyclePhase": "03. Underwriting Assessment",
    "stage": "Benefit-Level Underwriting",
    "targetEntity": "T_POLICY_BENEFIT",
    "ruleName": "Benefit-Level Decision Independence",
    "condition": "Underwriting decisions are evaluated at individual benefit level: main plan and each rider evaluated independently.",
    "severity": "ROUTING",
    "errorCode": "INFO_UW_BENEFIT_LEVEL_DECISION",
    "errorMessage": "A rider may be declined or loaded while the base life coverage is accepted at standard rates.",
    "systemAction": "Updates `T_POLICY_BENEFIT.UW_DECISION` individually for each attached coverage item.",
    "actuarialBasis": "Enables maximum customer retention by approving viable base life risks even if specialized health riders are uninsurable.",
    "pdfPage": 193
  },
  {
    "ruleId": "VAL-ISS-001",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "04. Policy Issuance",
    "stage": "SOR Enforce Commit",
    "targetEntity": "T_POLICY",
    "ruleName": "First Premium Receipt Allocation Before Enforce",
    "condition": "Total validated suspense receipts allocated to proposal must exactly equal First Gross Modal Premium.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
    "errorMessage": "Cannot issue policy: first modal premium is unpaid or incompletely allocated.",
    "systemAction": "Blocks commit to SOR `T_POLICY` table; proposal remains in `WAITING_FOR_ISSUE`.",
    "actuarialBasis": "Statutory premium accounting: coverage commencement triggers immediate unearned premium reserve (UPR).",
    "pdfPage": 21
  },
  {
    "ruleId": "VAL-ISS-002",
    "module": "MOD_02",
    "moduleName": "New Business (NB APP)",
    "lifecyclePhase": "04. Policy Issuance",
    "stage": "Document Generation",
    "targetEntity": "T_POLICY_CONTRACT",
    "ruleName": "Contract Schedule & Table of Guaranteed Benefits Generation",
    "condition": "Official policy schedule, benefit illustration, and general provisions PDF must compile with valid digital signature.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_ISS_PDF_GENERATION_FAILED",
    "errorMessage": "Policy contract rendering or digital signing failed. Re-run print spooler.",
    "systemAction": "Retries PDF compilation; alerts Operations supervisor if persistent.",
    "actuarialBasis": "Legal enforceability of contractual benefit schedules provided to policyholder.",
    "pdfPage": 35
  },
  {
    "ruleId": "VAL-FL-001",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "05. 21-Day Free-Look",
    "stage": "Cool-off Window Verification",
    "targetEntity": "T_POLICY_DELIVERY",
    "ruleName": "Delivery Date Anchor & 21-Day Statutory Window",
    "condition": "Free-Look Cancellation request date must be <= Policy Delivery Date (DELIVERY_DATE) + 21 calendar days.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_FL_WINDOW_EXPIRED",
    "errorMessage": "Free-look period has expired. Cancellation must be processed as Policy Surrender.",
    "systemAction": "Rejects Free-Look transaction; redirects operator to Surrender Workbench.",
    "actuarialBasis": "Insurance Business Law 08/2022/QH15 Article 35: 21-day cooling-off period measured strictly from confirmed receipt.",
    "pdfPage": 483
  },
  {
    "ruleId": "VAL-FL-002",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "05. 21-Day Free-Look",
    "stage": "Claim Conflict Check",
    "targetEntity": "T_CLAIM",
    "ruleName": "Zero Paid Claim Prerequisite for Free-Look Refund",
    "condition": "There must be absolutely zero claims paid out or pending under any benefit of this policy.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_FL_CLAIMS_EXIST",
    "errorMessage": "There should be no claims paid out or pending under this policy to qualify for Free-Look cancellation.",
    "systemAction": "Hard stop: aborts cancellation; policy remains inforce.",
    "actuarialBasis": "Prevention of unjust enrichment: policyholder cannot claim insurance indemnity and subsequently demand premium refund.",
    "pdfPage": 483
  },
  {
    "ruleId": "VAL-FL-003",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "05. 21-Day Free-Look",
    "stage": "Financial Clawback",
    "targetEntity": "T_COMMISSION_LEDGER",
    "ruleName": "100% Commission Clawback & Medical Fee Offset",
    "condition": "Refund = 100% Gross Premiums Paid minus Insurer Medical Examination Costs. 100% Agent Commission clawed back.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_FL_CLAWBACK_EXECUTION",
    "errorMessage": "Negative commission voucher generated to reverse all agency earnings for cancelled policy.",
    "systemAction": "Posts negative commission record to `T_COMMISSION_LEDGER` and releases refund voucher.",
    "actuarialBasis": "Restores financial ledger to exact zero-liability pre-inception status.",
    "pdfPage": 483
  },
  {
    "ruleId": "VAL-BIL-001",
    "module": "MOD_05",
    "moduleName": "Billing & Collection",
    "lifecyclePhase": "06. Billing & Grace Period",
    "stage": "Renewal Extraction",
    "targetEntity": "T_BILLING_SCHEDULE",
    "ruleName": "Advance Billing Notice Generation (T-30 Days)",
    "condition": "Renewal bills extracted exactly 30 calendar days prior to Next Due Date (`DUE_DATE`).",
    "severity": "ROUTING",
    "errorCode": "INFO_BIL_EXTRACTION_SUCCESS",
    "errorMessage": "Renewal notice generated and dispatched via SMS/Email/Portal.",
    "systemAction": "Creates Account Receivable (AR) record in `T_AR_INVOICE`.",
    "actuarialBasis": "Smooth operational cash flow intake and timely statutory premium notice delivery.",
    "pdfPage": 344
  },
  {
    "ruleId": "VAL-BIL-002",
    "module": "MOD_05",
    "moduleName": "Billing & Collection",
    "lifecyclePhase": "06. Billing & Grace Period",
    "stage": "Grace Period Counting",
    "targetEntity": "T_POLICY",
    "ruleName": "60-Day Grace Period Inforce Continuity",
    "condition": "During Grace Days 1 through 60, policy remains 100% inforce with full death and rider claim coverage.",
    "severity": "INFORMATIONAL",
    "errorCode": "INFO_BIL_GRACE_ACTIVE",
    "errorMessage": "Policy is in Grace Period. Claim occurring during this window is fully payable minus overdue premium.",
    "systemAction": "Suppresses lapse trigger; dispatches overdue reminders on Day 30 and Day 50.",
    "actuarialBasis": "Article 37 Insurance Business Law: mandatory 60-day grace protection for periodical premium payment policies.",
    "pdfPage": 342
  },
  {
    "ruleId": "VAL-BIL-003",
    "module": "MOD_05",
    "moduleName": "Billing & Collection",
    "lifecyclePhase": "06. Billing & Grace Period",
    "stage": "Day 60 Expiration",
    "targetEntity": "T_POLICY",
    "ruleName": "Grace Expiration Gating: APL vs Auto-Lapse",
    "condition": "At 23:59:59 on Day 60, system checks Net Cash Value: If Net CV >= Overdue Premium -> APL; Else -> LAPSE.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_BIL_GRACE_LAPSE_TRIGGER",
    "errorMessage": "Grace period expired without payment. Automatic non-forfeiture decision executed by batch engine.",
    "systemAction": "Updates policy status to `INFORCE_APL` or `LAPSED`; locks billing collection.",
    "actuarialBasis": "Actuarial reserve preservation: insurer cannot maintain unbacked risk reserve after grace exhaustion without collateral.",
    "pdfPage": 344
  },
  {
    "ruleId": "VAL-LN-001",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "07. Policy Loans & APL",
    "stage": "Loan Eligibility",
    "targetEntity": "T_POLICY_LOAN",
    "ruleName": "Maximum Loan-to-Value (LTV 85%) Ceiling",
    "condition": "Total Loan Amount + Existing Loan Principal + Accrued Interest <= Gross Cash Value * 85%.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_LN_EXCEEDS_MAX_AVAILABLE",
    "errorMessage": "Requested loan amount exceeds maximum available borrowing limit (85% Net Cash Value).",
    "systemAction": "Validation fails on Loan Application UI; sets max permissible amount in helper box.",
    "actuarialBasis": "Collateral buffer: prevents policy lapse within 12 months due to compounding interest charges.",
    "pdfPage": 452
  },
  {
    "ruleId": "VAL-LN-002",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "07. Policy Loans & APL",
    "stage": "Loan Date Validation",
    "targetEntity": "T_POLICY_LOAN",
    "ruleName": "Loan Date Anti-Backdating Rule",
    "condition": "Loan effective date cannot be backdated. May be forward-dated up to a maximum of 7 calendar days.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_LN_BACKDATING_DISALLOWED",
    "errorMessage": "Loan date cannot be backdated. It can be forward dated up-to 7 days from system date.",
    "systemAction": "Rejects loan request with date discrepancy error.",
    "actuarialBasis": "Prevents retroactive interest manipulation and financial distortion.",
    "pdfPage": 452
  },
  {
    "ruleId": "VAL-LN-003",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "07. Policy Loans & APL",
    "stage": "ILP Pending Transaction Check",
    "targetEntity": "T_FUND_ORDER",
    "ruleName": "Investment Linked Pending Fund Freeze",
    "condition": "If policy is Investment-Linked (ILP), it must have zero pending fund unit orders (switches, top-ups, redemptions).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_LN_PENDING_FUND_TX",
    "errorMessage": "Policy has unsettled fund transactions. Await unit pricing reconciliation before loan processing.",
    "systemAction": "Blocks loan calculation until all fund trades commit to SOR.",
    "actuarialBasis": "Fluctuating unit value: cash value cannot be accurately determined while NAV trade orders remain pending.",
    "pdfPage": 452
  },
  {
    "ruleId": "VAL-LN-004",
    "module": "MOD_08",
    "moduleName": "Batch Console (EOD/EOM)",
    "lifecyclePhase": "07. Policy Loans & APL",
    "stage": "Foreclosure Trigger",
    "targetEntity": "T_POLICY_LOAN",
    "ruleName": "Negative Equity Policy Foreclosure (Lapse)",
    "condition": "If Total Debt (Loan Principal + Accumulated Interest) >= Gross Cash Value -> Issue 30-Day Foreclosure Notice.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_LN_FORECLOSURE_LAPSE",
    "errorMessage": "Policy debt exceeds total surrender cash value. Policy lapses automatically upon notice expiry.",
    "systemAction": "Job 07 in Nightly Batch flags policy for Foreclosure Termination.",
    "actuarialBasis": "Insurer cannot maintain life coverage when total outstanding indebtedness wipes out asset reserve.",
    "pdfPage": 452
  },
  {
    "ruleId": "VAL-CS-001",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "08. Policy Alterations",
    "stage": "General Alteration",
    "targetEntity": "T_POLICY",
    "ruleName": "Policy Active Inforce Status Requirement",
    "condition": "Policy status must be 'INFORCE' and Policy must not be in 'FROZEN' status (by pending claim or court freeze).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CS_POLICY_NOT_INFORCE",
    "errorMessage": "Policy is not active inforce or is currently frozen by Claims / Legal hold.",
    "systemAction": "Blocks alteration registration on CS Work List.",
    "actuarialBasis": "Alterations can only modify live contractual liabilities, not terminated or locked contracts.",
    "pdfPage": 452
  },
  {
    "ruleId": "VAL-CS-002",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "08. Policy Alterations",
    "stage": "Alteration Content Diff",
    "targetEntity": "T_CS_ALTERATION",
    "ruleName": "Mandatory Delta (Data Difference) Check",
    "condition": "Submitted alteration payload must have at least one validated field difference compared to current SOR state.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CS_NO_CHANGES_DETECTED",
    "errorMessage": "There must be at least one information change detected to register an alteration item.",
    "systemAction": "Disables 'Apply Change' button until delta is present.",
    "actuarialBasis": "Prevents redundant database transactions, audit clutter, and unnecessary endorsement processing.",
    "pdfPage": 459
  },
  {
    "ruleId": "VAL-CS-003",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "08. Policy Alterations",
    "stage": "Sum Assured Increase",
    "targetEntity": "T_POLICY_BENEFIT",
    "ruleName": "Sum Assured Increase Underwriting Reassessment",
    "condition": "Sum Assured Increase triggers mandatory medical health declaration and manual underwriting review.",
    "severity": "ROUTING",
    "errorCode": "ROUTE_CS_UW_REVIEW",
    "errorMessage": "Sum Assured increase requires underwriting risk assessment. Transferring to Underwriting Workbench.",
    "systemAction": "Generates Underwriting Task linked to CS Alteration ID.",
    "actuarialBasis": "Anti-selection: policyholders developing health conditions may attempt to dramatically increase coverage.",
    "pdfPage": 255
  },
  {
    "ruleId": "VAL-CS-004",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "08. Policy Alterations",
    "stage": "Mid-Term Rider Attachment",
    "targetEntity": "T_POLICY_BENEFIT",
    "ruleName": "Rider Term & Maturity Synchronization Rule",
    "condition": "Rider coverage expiry date must not exceed Base Plan maturity date or Rider maximum coverage age limit.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CS_RIDER_TERM_OVERFLOW",
    "errorMessage": "Rider term exceeds remaining policy term of main benefit.",
    "systemAction": "Auto-caps rider term to match base plan or throws validation error.",
    "actuarialBasis": "Ancillary rider contracts cannot survive past the termination of the principal life insurance contract.",
    "pdfPage": 138
  },
  {
    "ruleId": "VAL-CS-005",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "08. Policy Alterations",
    "stage": "Transfer of Coverage",
    "targetEntity": "T_POLICY_INSURED",
    "ruleName": "Transfer of Coverage (Change Life Assured) Eligibility",
    "condition": "Base plan product definition must have `Allow Transfer Coverage = Yes` AND FCC/AML validation passed.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CS_TRANSFER_NOT_ALLOWED",
    "errorMessage": "The main benefit does not permit Transfer of Coverage in product definition, or party FCC check failed.",
    "systemAction": "Blocks new life assured selection on CS Alteration UI.",
    "actuarialBasis": "Product structure control: corporate keyman plans permit executive transfer; juvenile endowment plans disallow.",
    "pdfPage": 254
  },
  {
    "ruleId": "VAL-CS-006",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "08. Policy Alterations",
    "stage": "Transfer of Coverage Scope",
    "targetEntity": "T_POLICY_BENEFIT",
    "ruleName": "Automatic Rider Transfer & Premium Recalculation",
    "condition": "When Life Assured is transferred, all attached riders transfer simultaneously, and premium recalculates for new age/gender.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CS_TRANSFER_PREMIUM_RECALC",
    "errorMessage": "All riders attached to previous life assured transferred; premium adjusted to new risk profile.",
    "systemAction": "Generates Collection/Refund record for premium difference between old and new risk.",
    "actuarialBasis": "Mortality pricing adjustment: new life assured carries unique age, gender, and smoker actuarial risk factors.",
    "pdfPage": 255
  },
  {
    "ruleId": "VAL-CS-007",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "08. Policy Alterations",
    "stage": "Change of Assignment",
    "targetEntity": "T_POLICY_ASSIGNMENT",
    "ruleName": "Assignment Legal Entity & Type Integrity",
    "condition": "Collateral Assignment strictly restricted to Corporate Entity (Bank/Lender). Absolute Assignment open to Company or Individual.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CS_INVALID_ASSIGNEE_TYPE",
    "errorMessage": "Collateral assignment can only be assigned to a licensed corporate institution.",
    "systemAction": "Blocks individual party selection when 'Collateral Assignment' is chosen.",
    "actuarialBasis": "Banking loan security law: commercial collateral rights cannot be vested in private natural persons without commercial licensing.",
    "pdfPage": 459
  },
  {
    "ruleId": "VAL-RS-001",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "09. Reinstatement",
    "stage": "Lapse Reason Validation",
    "targetEntity": "T_POLICY",
    "ruleName": "Permissible Lapse Reason Verification",
    "condition": "Policy lapse reason must be 'Normal Lapse', 'APL Lapse', or 'ILP Lapse'. Terminated policies cannot reinstate.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_RS_INVALID_LAPSE_REASON",
    "errorMessage": "Policy was terminated by Surrender, Death, or Maturity. Reinstatement is strictly prohibited.",
    "systemAction": "Rejects Reinstatement application immediately.",
    "actuarialBasis": "Surrendered or matured policies represent fully executed discharges of liability; contract cannot be revived.",
    "pdfPage": 489
  },
  {
    "ruleId": "VAL-RS-002",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "09. Reinstatement",
    "stage": "Statutory Window",
    "targetEntity": "T_POLICY",
    "ruleName": "24-Month Statutory Reinstatement Time Window",
    "condition": "Reinstatement request date must be within 24 months of Lapse Date (`LAPSE_DATE + 2 Years > SYSTEM_DATE`).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_RS_TIME_WINDOW_EXPIRED",
    "errorMessage": "Statutory 2-year reinstatement window has expired. Policy is permanently lapsed.",
    "systemAction": "Blocks reinstatement processing; policy remains permanently in `LAPSED` state.",
    "actuarialBasis": "Article 26 Insurance Business Law: policyholder has the right to restore policy within 2 years from lapse date.",
    "pdfPage": 489
  },
  {
    "ruleId": "VAL-RS-003",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "09. Reinstatement",
    "stage": "Attained Age Cap",
    "targetEntity": "T_POLICY_INSURED",
    "ruleName": "Life Assured Attained Age Ceiling Check",
    "condition": "Current attained age of Life Assured must not exceed maximum product coverage age limit.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_RS_AGE_CEILING_EXCEEDED",
    "errorMessage": "Life assured current age exceeds maximum product entry/coverage limit.",
    "systemAction": "Throws warning/error message and blocks approval.",
    "actuarialBasis": "Mortality rates at extreme attained ages are no longer covered by product pricing reserves.",
    "pdfPage": 489
  },
  {
    "ruleId": "VAL-RS-004",
    "module": "MOD_04",
    "moduleName": "Customer Service (CS APP)",
    "lifecyclePhase": "09. Reinstatement",
    "stage": "Financial Settlement",
    "targetEntity": "T_AR_INVOICE",
    "ruleName": "Full Back-Premiums & Compound Interest Clearance",
    "condition": "Policyholder must pay 100% of all unpaid back-premiums + compound interest (e.g. 6.5% p.a.) + outstanding loan interest.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_RS_INCOMPLETE_PAYMENT",
    "errorMessage": "Cannot restore inforce status: back-premiums or reinstatement interest remain outstanding.",
    "systemAction": "Reinstatement status held at `PENDING_PAYMENT` until cashier receipt verification commits.",
    "actuarialBasis": "Restores mathematical reserves to the exact level required had the policy remained continuously inforce.",
    "pdfPage": 489
  },
  {
    "ruleId": "VAL-CLM-001",
    "module": "MOD_06",
    "moduleName": "Claims Management (CLM APP)",
    "lifecyclePhase": "10. Claims Management",
    "stage": "Coverage Verification",
    "targetEntity": "T_CLAIM",
    "ruleName": "Inforce Status on Incident Date Rule",
    "condition": "Policy must have been in status 'INFORCE' or 'INFORCE_APL' on the exact Claim Event Date (`CLAIM_EVENT_DATE`).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CLM_POLICY_NOT_INFORCE_ON_EVENT",
    "errorMessage": "Policy was lapsed, surrendered, or not yet commenced on the incident date. Claim must be declined.",
    "systemAction": "Auto-flags claim as 'Decline Recommended' with contractual coverage failure reason.",
    "actuarialBasis": "No insurance liability exists outside active premium-funded coverage windows.",
    "pdfPage": 271
  },
  {
    "ruleId": "VAL-CLM-002",
    "module": "MOD_06",
    "moduleName": "Claims Management (CLM APP)",
    "lifecyclePhase": "10. Claims Management",
    "stage": "Contestability Assessment",
    "targetEntity": "T_CLAIM_ASSESSMENT",
    "ruleName": "2-Year Contestability Period Investigation Trigger",
    "condition": "If Event Date is within 2 years of Commencement Date or Reinstatement Date -> Trigger Mandatory Claim Investigation.",
    "severity": "ROUTING",
    "errorCode": "ROUTE_CLM_INVESTIGATION",
    "errorMessage": "Claim occurred within 2-year contestable window. Mandatory investigation for non-disclosure / pre-existing conditions.",
    "systemAction": "Routes claim to Special Investigation Unit (SIU) queue; blocks fast-track settlement.",
    "actuarialBasis": "Article 28 Insurance Business Law: protects risk pool from fraudulent anti-selection and non-disclosure.",
    "pdfPage": 296
  },
  {
    "ruleId": "VAL-CLM-003",
    "module": "MOD_06",
    "moduleName": "Claims Management (CLM APP)",
    "lifecyclePhase": "10. Claims Management",
    "stage": "Benefit Conflict Check",
    "targetEntity": "T_CLAIM_ASSESSMENT",
    "ruleName": "Critical Illness vs TPD Installment Conflict Check",
    "condition": "When saving CI claim decision, system validates if there is an ongoing TPD installment claim on the same policy.",
    "severity": "SOFT_WARNING",
    "errorCode": "WARN_CLM_ONGOING_TPD_CONFLICT",
    "errorMessage": "Ongoing TPD claim detected with remaining unpaid installments. Verify total benefit acceleration limits.",
    "systemAction": "Prompts warning message to claim assessor and prompts confirmation to continue.",
    "actuarialBasis": "Prevents double-paying accelerated benefits that share the same unified core life sum assured pool.",
    "pdfPage": 337
  },
  {
    "ruleId": "VAL-CLM-004",
    "module": "MOD_06",
    "moduleName": "Claims Management (CLM APP)",
    "lifecyclePhase": "10. Claims Management",
    "stage": "Document Completeness",
    "targetEntity": "T_CLAIM_DOCUMENT",
    "ruleName": "Proof of Loss Document Completeness Verification",
    "condition": "All required claim documents must have Completeness IND = 'Y' or Waived IND = 'Y' before decision sign-off.",
    "severity": "SOFT_WARNING",
    "errorCode": "WARN_CLM_UNCOMPLETED_DOCS",
    "errorMessage": "There is uncompleted required document. Please confirm to continue?",
    "systemAction": "Displays modal confirmation prompt; logs supervisor waiver in audit trail.",
    "actuarialBasis": "Legal documentation integrity required to defend settlement against reinsurance audit.",
    "pdfPage": 337
  },
  {
    "ruleId": "VAL-CLM-005",
    "module": "MOD_06",
    "moduleName": "Claims Management (CLM APP)",
    "lifecyclePhase": "10. Claims Management",
    "stage": "Claim Payout Calculation",
    "targetEntity": "T_CLAIM_PAYOUT",
    "ruleName": "Indebtedness Deduction from Gross Claim Payout",
    "condition": "Net Claim Payout = Approved Claim SA + Reversionary/Terminal Bonuses - Outstanding Loans - Accrued Interest - Overdue Premiums.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_CLM_CALCULATION_DISCREPANCY",
    "errorMessage": "Net payout must automatically deduct all outstanding policy debts before disbursement.",
    "systemAction": "Calculates net disbursement voucher and sets policy loan status to `CLOSED_BY_CLAIM`.",
    "actuarialBasis": "Senior creditor right: insurer possesses absolute statutory right of offset against claims proceeds for policy debts.",
    "pdfPage": 318
  },
  {
    "ruleId": "VAL-GL-001",
    "module": "MOD_07",
    "moduleName": "Payment & Finance",
    "lifecyclePhase": "11. Finance & Accounting",
    "stage": "Journal Balancing",
    "targetEntity": "T_GL_ENTRY",
    "ruleName": "Double-Entry Bookkeeping Zero-Balance Enforcement",
    "condition": "For every journal transaction, Total Debit Amount must exactly equal Total Credit Amount (`SUM(Dr) == SUM(Cr)`).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_GL_UNBALANCED_ENTRY",
    "errorMessage": "General Ledger entry is out of balance. Total debits do not equal total credits.",
    "systemAction": "Rejects journal batch posting; aborts transaction commit.",
    "actuarialBasis": "Core financial accounting integrity: ensures balance sheet and revenue accounts remain strictly synchronized.",
    "pdfPage": 411
  },
  {
    "ruleId": "VAL-GL-002",
    "module": "MOD_07",
    "moduleName": "Payment & Finance",
    "lifecyclePhase": "11. Finance & Accounting",
    "stage": "Accounting Rule Matching",
    "targetEntity": "T_GL_RULE",
    "ruleName": "Active Accounting Rule Match Requirement",
    "condition": "Every business transaction must match an enabled accounting rule with valid Fee Source (Cash/ARAP/Unit/NonUnit).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_GL_RULE_DISABLED",
    "errorMessage": "No active accounting rule matched for transaction type. GL posting aborted.",
    "systemAction": "Logs unmapped transaction in GL Exception Queue for Finance Administrator resolution.",
    "actuarialBasis": "Statutory audit standard: every financial movement must follow pre-defined, auditor-approved chart of accounts.",
    "pdfPage": 415
  },
  {
    "ruleId": "VAL-GL-003",
    "module": "MOD_07",
    "moduleName": "Payment & Finance",
    "lifecyclePhase": "11. Finance & Accounting",
    "stage": "Disbursement Authorization",
    "targetEntity": "T_PAYMENT_VOUCHER",
    "ruleName": "Maker-Checker Segregation of Duties for Payments",
    "condition": "The user who registered or calculated a payment voucher cannot authorize or release the payment disbursement.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_FIN_MAKER_CHECKER_VIOLATION",
    "errorMessage": "Dual-control segregation violation: creator of payment voucher cannot authorize payment.",
    "systemAction": "Disables 'Authorize' button for current user session.",
    "actuarialBasis": "SOX & internal operational risk compliance: prevents internal fraud and unauthorized financial embezzlement.",
    "pdfPage": 390
  },
  {
    "ruleId": "VAL-BAT-001",
    "module": "MOD_08",
    "moduleName": "Batch Console (EOD/EOM)",
    "lifecyclePhase": "12. Batch Operations",
    "stage": "DAG Dependency Gating",
    "targetEntity": "T_BATCH_JOB_LOG",
    "ruleName": "Strict Job Dependency Return Code 0 Check",
    "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
    "severity": "HARD_STOP",
    "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
    "errorMessage": "Upstream batch job failed or exited with warnings. Pipeline auto-gated to prevent data corruption.",
    "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
    "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
    "pdfPage": 16
  },
  {
    "ruleId": "VAL-BAT-002",
    "module": "MOD_08",
    "moduleName": "Batch Console (EOD/EOM)",
    "lifecyclePhase": "12. Batch Operations",
    "stage": "System Date Rolling",
    "targetEntity": "T_BIZ_DATE",
    "ruleName": "System Date Roll Reconciliation Prerequisite",
    "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
    "severity": "HARD_STOP",
    "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
    "errorMessage": "Cannot advance business date: one or more EOD jobs failed or GL entries remain unposted.",
    "systemAction": "Blocks date rollover; prevents online users from operating in inconsistent calendar state.",
    "actuarialBasis": "Calendar day alignment: prevents chronological gaps or retroactive calculation overlaps in policy valuation.",
    "pdfPage": 24
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
