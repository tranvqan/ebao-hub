// Auto-generated eBao Data Bundle (Zero CORS offline execution)
window.EBAO_MODULES = [
  {
    "id": "MOD_01",
    "num": "01",
    "title": "Mod 01: Architecture & Product Factory",
    "subtitle": "4-Layer Microservices, Garment & Fabrics Orchestration, 2PC Distributed Transactions & 10-Step Product Factory",
    "icon": "box",
    "badge": "Core Architecture",
    "page_range": "Pages 1 - 32",
    "summary": "Nền tảng kiến trúc Core PAS eBao Gemini Life và Động cơ Định cấu hình Sản phẩm (Product Factory). Vận hành trên mô hình Microservices 4 tầng (UI, BFF, Business Services, System of Record) với cơ chế điều phối quy trình nội bộ khai báo Garment & Fabrics cho phép tùy biến logic theo từng Tenant (như bổ sung tính thuế GST/VAT) mà không sửa mã nguồn cốt lõi. Tích hợp khung quản lý giao dịch phân tán toàn cục 2PC (InsureMO Seata AT) với cơ chế tự động bù trừ qua t_pub_tx_undo_log. Module cung cấp xưởng sản phẩm Product Factory 10 bước khép kín từ định nghĩa sản phẩm, bảng tỷ lệ phí đa chiều, hệ số kỳ đóng phí, lịch giá trị hoàn lại, ma trận rider tương thích, đến phát hành phiên bản runtime lên SOR với cơ chế bảo vệ nâng cấp baseline (record_usage = 5).",
    "mermaid_workflow": "graph TD\n    subgraph UI_Layer [\"1. Presentation Layer (UI)\"]\n        UI_NB[\"Sales Portal / NB Workbench\"]\n        UI_CS[\"Customer Service Portal\"]\n        UI_CLM[\"Claim Processing Portal\"]\n    end\n\n    subgraph BFF_Layer [\"2. Backend for Frontend (BFF) Layer\"]\n        BFF[\"Regional BFF & API Gateway<br/>(Protocol Translation & Session Auth)\"]\n    end\n\n    subgraph BS_Layer [\"3. Business Service (BS) Layer - Garment & Fabrics\"]\n        PA_BS[\"PA BS (Policy Admin)\"]\n        CLM_BS[\"Claim BS (Claims)\"]\n        BCP_BS[\"BCP BS (Billing & Collection)\"]\n        \n        subgraph Pipeline [\"Quotation Garment Pipeline\"]\n            F1[\"Step 1: Build Context\"] --> F2[\"Step 2: Pre-Validation\"]\n            F2 --> F3[\"Step 3: Fetch Master Data\"]\n            F3 --> F4[\"Step 4: Rate Calculation\"]\n            F4 --> F5[\"Step 16: GST/Tax (Tenant Fabric)\"]\n            F5 --> F6[\"Step 17: Save & 2PC Log\"]\n        end\n    end\n\n    subgraph Global_TX [\"Global Transaction & Compensation (InsureMO Seata AT)\"]\n        TX_MGR[\"Transaction Coordinator\"]\n        UNDO_LOG[(\"t_pub_tx_undo_log<br/>(JPA Pre-image Snapshot)\")]\n    end\n\n    subgraph SOR_Layer [\"4. System of Record (SOR) Relational Database\"]\n        T_POL[(\"t_pol_policy<br/>(Master Contract)\")]\n        T_CV[(\"t_pol_cash_value<br/>(CV Schedule)\")]\n        T_RATE[(\"t_rt_ratetable_data<br/>(Actuarial Rates)\")]\n    end\n\n    UI_NB -->|REST/JSON| BFF\n    UI_CS -->|REST/JSON| BFF\n    UI_CLM -->|REST/JSON| BFF\n    BFF --> PA_BS\n    BFF --> CLM_BS\n    BFF --> BCP_BS\n    PA_BS --> Pipeline\n    Pipeline -->|2PC Two-Phase Commit| TX_MGR\n    TX_MGR -->|Record State| UNDO_LOG\n    Pipeline -->|Commit Validated State| T_POL\n    Pipeline -->|Commit Validated State| T_CV\n    Pipeline -->|Read Matrix| T_RATE\n\n    classDef ui fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;\n    classDef bff fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#b45309;\n    classDef bs fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#6d28d9;\n    classDef sor fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#15803d;\n    classDef tx fill:#ffe4e6,stroke:#e11d48,stroke-width:2px,color:#be123c;\n\n    class UI_NB,UI_CS,UI_CLM ui;\n    class BFF bff;\n    class PA_BS,CLM_BS,BCP_BS,F1,F2,F3,F4,F5,F6 bs;\n    class T_POL,T_CV,T_RATE sor;\n    class TX_MGR,UNDO_LOG tx;",
    "core_concepts": [
      {
        "term": "Kiến trúc Microservices 4 Tầng",
        "def": "Presentation Layer (UI), BFF (Backend for Frontend), Business Services (PA BS, Claim BS, BCP BS), SOR (System of Record lưu trữ bảng t_pol_*, t_party_* bất biến)."
      },
      {
        "term": "Mô hình Khai báo Garment & Fabrics",
        "def": "Garment là điểm vào xử lý nghiệp vụ (entrypoint Java method mang JSON context); Fabrics là các microservices nguyên tử (atomic steps) được dệt (weave) tuần tự. Cho phép thêm/sửa step theo Tenant mà không sửa mã nguồn baseline."
      },
      {
        "term": "Khung Giao dịch Toàn cục & Bù trừ (Global 2PC Transaction)",
        "def": "Dựa trên InsureMO Seata AT mode. Mỗi thao tác ghi dữ liệu cục bộ tự động trích xuất JPA Entity snapshot vào bảng t_pub_tx_undo_log; nếu dịch vụ hạ nguồn thất bại, giao dịch tự động đảo ngược về trạng thái ban đầu."
      },
      {
        "term": "Đa Khách thuê & Múi giờ UTC",
        "def": "JVM chạy trên chuẩn múi giờ UTC; BFF và Business Service chuyển đổi ngày kinh doanh theo múi giờ tenant (ví dụ Asia/Ho_Chi_Minh). Phân vùng dữ liệu triệt để ngăn chặn rò rỉ dữ liệu chéo giữa các Tenant."
      },
      {
        "term": "Quy chuẩn Đặt tên Cache Redis & Invalidation",
        "def": "Tiền tố bắt buộc '[BIZ-DATA] + [Tên Module] + [Chi tiết]' (ví dụ [BIZ-DATA][PROD]RateTable). Hết hạn mặc định 24h, hỗ trợ xóa tập trung qua cơ chế broadcast RabbitMQ."
      },
      {
        "term": "Cơ chế Ghi đè Cấu hình Baseline (record_usage = 5)",
        "def": "Bảng Code Table, Data Table, I18n Message cho phép reload theo Tenant. Thiết lập record_usage = 5 giúp cấu hình của Tenant không bị ghi đè khi nâng cấp phiên bản Gemini baseline."
      },
      {
        "term": "Quy trình 10 Bước Định Cấu Hình Sản Phẩm (Product Factory)",
        "def": "Trải qua 10 bước chuẩn hóa từ Product Master, Terms/Eligibility, Sum Assured Bounds, Rate Tables, Modal Loadings, Cash Value Schedule, Rider Matrix, Auto-UW STP, Non-Forfeiture đến Compile & Publish SOR."
      }
    ],
    "actuary_notes": [
      "Từ góc độ Định phí Bảo hiểm (Actuarial), Product Factory của eBao Gemini áp dụng cấu trúc dữ liệu đa chiều tối ưu hóa cho việc tính toán dòng tiền và phí bảo hiểm theo công thức: Annual_Premium = (Sum_Assured / 1000) * Base_Rate(Age, Gender, Smoker, Term) * Modal_Factor + Flat_Loading.",
      "Bảng tỷ lệ phí (t_rt_ratetable_data) hỗ trợ n chiều tra cứu, kết hợp hệ số đóng phí (Annual = 1.0, Semi-Annual = 0.52, Quarterly = 0.27, Monthly = 0.09).",
      "Lịch giá trị hoàn lại (Cash Value Schedule) và tỷ lệ chia lãi tích lũy/bảo tức đảo ngược (Reversionary Bonus) được kiểm soát chặt chẽ bằng ràng buộc không được âm, không vượt quá Số tiền bảo hiểm, và tuân thủ biên khả năng thanh toán theo quy định của Bộ Tài chính."
    ],
    "op_notes": [
      "Về mặt Vận hành Công nghệ (System Operations), việc phân tách rõ ràng giữa New Business Workbench và SOR Tables thông qua API gọi PA BS giúp tách biệt hoàn toàn rủi ro dữ liệu giữa giai đoạn ghi nhận hồ sơ và giai đoạn quản lý hợp đồng sau phát hành.",
      "Quản trị viên hệ thống khi bổ sung cấu hình cho thị trường Việt Nam (như thuế VAT 10% hoặc các khoản phí quản lý quỹ) phải tuân thủ quy tắc tạo cấu hình trong Configuration Group riêng của Tenant trên MC Environment (https://[tenantcode]-gimc.insuremo.com) và luôn đặt tham số record_usage = 5 để bảo vệ an toàn tuyệt đối khi nâng cấp bản vá Core."
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
        "id": "SOP-ARC-01",
        "title": "Multi-Tenant Isolation, URP Role Assignment & Branch Data Boundary",
        "role": "System Administrator / Security Lead",
        "objective": "Thiết lập phân vùng dữ liệu khách thuê (Multi-tenant Data Boundary), cơ cấu tổ chức chi nhánh và gán quyền người dùng (URP) đảm bảo cô lập hoàn toàn giữa các tenant và chi nhánh nghiệp vụ.",
        "pdf_page": 12,
        "prerequisites": [
          "Tài khoản quản trị viên cấp cao có phân quyền SUPER_ADMIN trên hệ sinh thái InsureMO.",
          "Mã định danh Tenant (Tenant Code, ví dụ SACOM_VN, AFLI_VN) đã được kích hoạt trên MC Environment.",
          "Cây cơ cấu tổ chức chi nhánh (Branch Org Tree) đã được phê duyệt bằng văn bản."
        ],
        "steps": [
          {
            "step": 1,
            "title": "Xác thực Tenant Context & Phân định ranh giới dữ liệu",
            "action": "Truy cập System Admin -> URP -> Tenant Context. Kiểm tra biến môi trường TENANT_ID vàTENANT_CODE hiện hành. Đảm bảo mọi truy vấn cơ sở dữ liệu đều tự động áp dụng điều kiện lọc mặc định 'WHERE tenant_id = :CURRENT_TENANT'."
          },
          {
            "step": 2,
            "title": "Khởi tạo Cây Chi nhánh và Phòng ban (Branch Hierarchy)",
            "action": "Vào Organization Management -> Branch Setup. Nhập mã chi nhánh (ví dụ BR-HCM-01), tên chi nhánh (Chi nhánh TP. Hồ Chí Minh), mã chi nhánh cấp cha (Parent Branch), và tiền tố hợp đồng (Policy Number Prefix)."
          },
          {
            "step": 3,
            "title": "Định nghĩa Vai trò Nghiệp vụ (Role Definition) & Menu Authorization",
            "action": "Vào Role Management -> Add Role. Tạo vai trò mới (ví dụ UW_OFFICER_L2, CLAIM_ASSESSOR_L1). Chọn các chức năng và menu được phép truy cập trong cây thẩm quyền (Function Tree) với các quyền Read, Write, Approve, Export."
          },
          {
            "step": 4,
            "title": "Gán Giới hạn Phân quyền Dữ liệu Chi nhánh (Data Boundary Assignment)",
            "action": "Trong màn hình Role Data Scope, thiết lập phạm vi dữ liệu: 'Own Branch Only' (chỉ dữ liệu chi nhánh mình), 'Sub-branches Included' (bao gồm chi nhánh trực thuộc), hoặc 'All Branches' (toàn quốc - dành cho ban thẩm định/kế toán trung tâm)."
          },
          {
            "step": 5,
            "title": "Tạo Người dùng (User Account) & Gán Phân quyền Kép (Dual Role Mapping)",
            "action": "Vào User Management -> Create User. Nhập thông tin nhân viên, email, số điện thoại, gán chi nhánh công tác, và gắn các Role tương ứng. Áp dụng chính sách bảo mật xác thực 2 lớp (MFA)."
          },
          {
            "step": 6,
            "title": "Kiểm thử Ranh giới Dữ liệu (Isolation Audit & Sign-off)",
            "action": "Đăng nhập bằng tài khoản vừa tạo trên phiên bản thử nghiệm. Kiểm tra lệnh truy vấn hồ sơ để xác nhận không thể nhìn thấy hồ sơ thuộc chi nhánh hoặc Tenant khác. Xuất nhật ký phân quyền (Audit Log)."
          }
        ],
        "fields_table": [
          {
            "name": "TENANT_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã định danh duy nhất của khách thuê (ví dụ: SACOM_VN)"
          },
          {
            "name": "BRANCH_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã định danh chi nhánh (ví dụ: BR-HCM-01)"
          },
          {
            "name": "DATA_SCOPE_TYPE",
            "type": "Enum",
            "required": "Yes",
            "desc": "Phạm vi dữ liệu: OWN_USER, BRANCH_ONLY, BRANCH_AND_SUB, ALL_COMPANY"
          },
          {
            "name": "ROLE_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã vai trò trong hệ thống URP (ví dụ: UW_L2)"
          },
          {
            "name": "EFFECTIVE_FROM",
            "type": "Date",
            "required": "Yes",
            "desc": "Ngày bắt đầu có hiệu lực của quyền truy cập"
          },
          {
            "name": "EFFECTIVE_TO",
            "type": "Date",
            "required": "No",
            "desc": "Ngày hết hạn hiệu lực của quyền truy cập"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-ARC-01-A",
            "ruleName": "Cấm truy cập chéo giữa 2 Tenant ID khác nhau trong cùng một JVM session. Trả về mã lỗi 403 Forbidden.",
            "errorCode": "ERR_VAL_ARC_01_A",
            "severity": "HARD_STOP",
            "condition": "Cấm truy cập chéo giữa 2 Tenant ID khác nhau trong cùng một JVM session. Trả về mã lỗi 403 Forbidden.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 12
          },
          {
            "ruleId": "VAL-ARC-01-B",
            "ruleName": "Mỗi người dùng nghiệp vụ bắt buộc phải gắn với tối thiểu 1 Chi nhánh hợp lệ có trạng thái ACTIVE.",
            "errorCode": "ERR_VAL_ARC_01_B",
            "severity": "HARD_STOP",
            "condition": "Mỗi người dùng nghiệp vụ bắt buộc phải gắn với tối thiểu 1 Chi nhánh hợp lệ có trạng thái ACTIVE.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 12
          },
          {
            "ruleId": "VAL-ARC-01-C",
            "ruleName": "Chỉ tài khoản có cờ IS_HEAD_OFFICE = true mới được cấp phạm vi dữ liệu ALL_COMPANY.",
            "errorCode": "ERR_VAL_ARC_01_C",
            "severity": "HARD_STOP",
            "condition": "Chỉ tài khoản có cờ IS_HEAD_OFFICE = true mới được cấp phạm vi dữ liệu ALL_COMPANY.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 12
          }
        ]
      },
      {
        "code": "SOP-ARC-02",
        "id": "SOP-ARC-02",
        "title": "Declarative Microservices Orchestration (Garment & Fabrics Pipeline)",
        "role": "Integration Architect / Core Solution Specialist",
        "objective": "Cấu hình, điều phối và mở rộng luồng xử lý nghiệp vụ nội bộ bằng cơ chế dệt Garment & Fabrics, cho phép thêm bước nghiệp vụ riêng của từng Tenant (ví dụ tính thuế GST/VAT, kiểm tra AML nâng cao) mà không sửa mã nguồn Java baseline.",
        "pdf_page": 17,
        "prerequisites": [
          "Truy cập vào trung tâm cấu hình BS Configuration Center trên môi trường MC.",
          "Garment mục tiêu đã được đăng ký trong danh mục dịch vụ (ví dụ NewBusinessQuotationGarment).",
          "Các Fabrics cần thiết (Java method microservice) đã được đóng gói và nạp vào Fabric Registry."
        ],
        "steps": [
          {
            "step": 1,
            "title": "Mở Danh mục Garment và Chọn Luồng Nghiệp vụ Cần Điều phối",
            "action": "Truy cập BS Configuration Center -> Orchestration. Tìm kiếm Garment cần cấu hình (ví dụ quotationApplicationGarment). Xem danh sách các bước chuẩn (Baseline Fabrics Pipeline)."
          },
          {
            "step": 2,
            "title": "Khởi tạo Phiên bản Cấu hình Dành riêng cho Tenant (Tenant Specific Pipeline)",
            "action": "Nhấn nút 'Create Tenant Weaving Rule'. Chọn Tenant đích (ví dụ SACOM_VN hoặc AFLI). Hệ thống sao chép pipeline từ bản Baseline sang giao diện chỉnh sửa trực quan."
          },
          {
            "step": 3,
            "title": "Kiểm tra Thứ tự Các Bước Tiêu chuẩn (Steps 1 đến 8)",
            "action": "Rà soát các Fabrics chuẩn: Step 1 Build context, Step 2 Pre-validation, Step 3 Prepare data, Step 4 Quotation application processing, Step 5 Post-validation, Step 6 Event broadcast, Step 7 Suspense check, Step 8 Routing."
          },
          {
            "step": 4,
            "title": "Chèn Fabric Bổ sung của Tenant (Insert Custom Fabric)",
            "action": "Chọn vị trí giữa Step 15 và Step 17. Nhấn '+ Insert Fabric'. Chọn Fabric 'processingGstTaxFabric' (hoặc 'vietnamVatCalculationFabric'). Cấu hình tham số đầu vào lấy từ Processing Context và tham số đầu ra ghi vào Response Context."
          },
          {
            "step": 5,
            "title": "Định nghĩa Quy tắc Nhánh & Suspense Handling (Branching Rules)",
            "action": "Thiết lập điều kiện rẽ nhánh tại Step 8: Nếu 'suspense_check_result == SUCCESS' thì chuyển tiếp Step 9; nếu 'SUSPEND' thì chuyển hướng sang Step 12 Suspense Notification Fabric."
          },
          {
            "step": 6,
            "title": "Lưu, Biên dịch & Triển khai Kiểm thử (Dry Run & Hot Reload)",
            "action": "Nhấn 'Compile & Validate Pipeline'. Hệ thống kiểm tra tính hợp lệ của chuỗi Fabrics. Nhấn 'Hot Reload' để cập nhật pipeline vào runtime cache mà không cần khởi động lại container BS."
          }
        ],
        "fields_table": [
          {
            "name": "GARMENT_ID",
            "type": "String",
            "required": "Yes",
            "desc": "Mã định danh của dịch vụ nghiệp vụ chính (Garment)"
          },
          {
            "name": "FABRIC_STEP_NO",
            "type": "Integer",
            "required": "Yes",
            "desc": "Thứ tự thực thi của Fabric trong pipeline (1, 2, 3...)"
          },
          {
            "name": "FABRIC_NAME",
            "type": "String",
            "required": "Yes",
            "desc": "Tên định danh Java method của microservice nguyên tử"
          },
          {
            "name": "EXECUTION_MODE",
            "type": "Enum",
            "required": "Yes",
            "desc": "Chế độ thực thi: SYNCHRONOUS, ASYNCHRONOUS, CONDITIONAL"
          },
          {
            "name": "FAILURE_POLICY",
            "type": "Enum",
            "required": "Yes",
            "desc": "Hành vi khi bước lỗi: ABORT_AND_ROLLBACK, IGNORE_AND_CONTINUE, RETRY"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-ARC-02-A",
            "ruleName": "Thứ tự thực thi Fabric Step No phải là số nguyên dương tăng dần không trùng lặp.",
            "errorCode": "ERR_VAL_ARC_02_A",
            "severity": "HARD_STOP",
            "condition": "Thứ tự thực thi Fabric Step No phải là số nguyên dương tăng dần không trùng lặp.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 17
          },
          {
            "ruleId": "VAL-ARC-02-B",
            "ruleName": "Tất cả các tham số Input Context mà Fabric yêu cầu phải được cung cấp bởi các Fabric thực thi trước đó.",
            "errorCode": "ERR_VAL_ARC_02_B",
            "severity": "HARD_STOP",
            "condition": "Tất cả các tham số Input Context mà Fabric yêu cầu phải được cung cấp bởi các Fabric thực thi trước đó.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 17
          },
          {
            "ruleId": "VAL-ARC-02-C",
            "ruleName": "Bước Pick and Return Step bắt buộc phải là bước cuối cùng trong pipeline để hoàn trả kết quả cho client.",
            "errorCode": "ERR_VAL_ARC_02_C",
            "severity": "HARD_STOP",
            "condition": "Bước Pick and Return Step bắt buộc phải là bước cuối cùng trong pipeline để hoàn trả kết quả cho client.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 17
          }
        ]
      },
      {
        "code": "SOP-ARC-03",
        "id": "SOP-ARC-03",
        "title": "Global Distributed Transaction & Undo Log Compensation Management",
        "role": "Core PAS Architect / Database Administrator",
        "objective": "Quản trị khung giao dịch toàn cục phân tán 2PC (InsureMO Seata AT), giám sát bảng nhật ký bù trừ t_pub_tx_undo_log và xử lý phục hồi tự động khi có sự cố dịch vụ hạ nguồn trong quá trình phát hành hợp đồng.",
        "pdf_page": 22,
        "prerequisites": [
          "Quyền quản trị Database Administrator hoặc Core System Architect.",
          "Truy cập vào bảng t_pub_tx_undo_log và giao diện giám sát Transaction Coordinator (TC).",
          "Hiểu rõ chu trình 2 pha: Phase 1 Local Commit + Undo Image Record; Phase 2 Global Commit (Async Delete Undo Log) hoặc Global Rollback (Compensate State)."
        ],
        "steps": [
          {
            "step": 1,
            "title": "Kích hoạt Giám sát Giao dịch Toàn cục (Global Transaction Inspection)",
            "action": "Vào Transaction Monitor -> Active Global Transactions. Lọc các giao dịch có thời gian thực thi vượt quá ngưỡng cảnh báo (Duration > 5000ms) hoặc có trạng thái SUSPENDED."
          },
          {
            "step": 2,
            "title": "Tra cứu Bản ghi Snapshot Bù trừ (Examine Undo Log Snapshot)",
            "action": "Truy vấn bảng t_pub_tx_undo_log theo XID (Global Transaction ID). Kiểm tra trường rollback_info chứa JSON lưu trữ pre-image (trạng thái bản ghi trước khi thay đổi) và post-image."
          },
          {
            "step": 3,
            "title": "Mô phỏng Xử lý Lỗi Dịch vụ Hạ nguồn (Simulate Downstream Failure)",
            "action": "Trong trường hợp dịch vụ thanh toán (Payment Gateway) hoặc dịch vụ cấp số hợp đồng bị timeout: Transaction Coordinator phát lệnh Rollback toàn cục tới tất cả Resource Managers (RM)."
          },
          {
            "step": 4,
            "title": "Kích hoạt Đảo ngược Trạng thái Tự động (Execute Automated Compensation)",
            "action": "RM đọc dữ liệu pre-image trong t_pub_tx_undo_log, so sánh với trạng thái hiện tại của dòng dữ liệu trong cơ sở dữ liệu để kiểm tra dirty write. Nếu khớp, khôi phục lại giá trị pre-image ban đầu."
          },
          {
            "step": 5,
            "title": "Dọn dẹp Bù trừ Sau Hoàn tất (Post-Rollback Cleanup)",
            "action": "Sau khi bù trừ thành công, Transaction Coordinator xóa dòng nhật ký tương ứng trong t_pub_tx_undo_log và giải phóng khóa toàn cục (Global Lock)."
          },
          {
            "step": 6,
            "title": "Kiểm tra Tính Nhất quán Dữ liệu (Consistency Verification & Reconciliation)",
            "action": "Chạy báo cáo đối soát Data Reconciliation giữa bảng tạm New Business và bảng SOR (t_pol_policy) đảm bảo không có hợp đồng 'mồ côi' (orphan records) bị lưu sót."
          }
        ],
        "fields_table": [
          {
            "name": "XID",
            "type": "String",
            "required": "Yes",
            "desc": "Global Transaction ID duy nhất trên toàn hệ sinh thái microservices"
          },
          {
            "name": "BRANCH_ID",
            "type": "Long",
            "required": "Yes",
            "desc": "Branch Transaction ID của từng microservice thành phần"
          },
          {
            "name": "ROLLBACK_INFO",
            "type": "Blob/JSON",
            "required": "Yes",
            "desc": "Dữ liệu JSON snapshot lưu pre-image và post-image của JPA Entity"
          },
          {
            "name": "LOG_STATUS",
            "type": "Integer",
            "required": "Yes",
            "desc": "Trạng thái log: 0 = Normal, 1 = Defense Rollback, 2 = Completed"
          },
          {
            "name": "LOG_CREATED",
            "type": "Timestamp",
            "required": "Yes",
            "desc": "Thời điểm tạo bản ghi snapshot giao dịch"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-ARC-03-A",
            "ruleName": "Tuyệt đối không được xóa thủ công bản ghi trong t_pub_tx_undo_log khi transaction đang ở trạng thái ACTIVE.",
            "errorCode": "ERR_VAL_ARC_03_A",
            "severity": "HARD_STOP",
            "condition": "Tuyệt đối không được xóa thủ công bản ghi trong t_pub_tx_undo_log khi transaction đang ở trạng thái ACTIVE.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 22
          },
          {
            "ruleId": "VAL-ARC-03-B",
            "ruleName": "Nếu phát hiện Dirty Write (dữ liệu hiện tại khác post-image), cơ chế tự động bù trừ phải dừng lại và gửi cảnh báo mức CRITICAL cho DBA.",
            "errorCode": "ERR_VAL_ARC_03_B",
            "severity": "HARD_STOP",
            "condition": "Nếu phát hiện Dirty Write (dữ liệu hiện tại khác post-image), cơ chế tự động bù trừ phải dừng lại và gửi cảnh báo mức CRITICAL cho DBA.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 22
          },
          {
            "ruleId": "VAL-ARC-03-C",
            "ruleName": "Thời gian timeout tối đa của một Global Transaction là 60 giây; vượt quá thời gian này hệ thống tự động kích hoạt rollback.",
            "errorCode": "ERR_VAL_ARC_03_C",
            "severity": "HARD_STOP",
            "condition": "Thời gian timeout tối đa của một Global Transaction là 60 giây; vượt quá thời gian này hệ thống tự động kích hoạt rollback.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 22
          }
        ]
      },
      {
        "code": "SOP-ARC-04",
        "id": "SOP-ARC-04",
        "title": "Product Definition, Term Alignment & Sum Assured Eligibility Boundaries",
        "role": "Product Actuary / Product Configuration Specialist",
        "objective": "Thiết lập sản phẩm bảo hiểm mới trên Product Factory: Định nghĩa thông tin tổng quát sản phẩm, các kỳ hạn hợp đồng (Policy Term), kỳ hạn đóng phí (Premium Term), giới hạn tuổi tham gia và hạn mức số tiền bảo hiểm (SA).",
        "pdf_page": 26,
        "prerequisites": [
          "Bản tóm tắt tính năng sản phẩm (Product Spec) và Quy tắc - Điều khoản đã được Bộ Tài chính phê duyệt.",
          "Mã sản phẩm (Product Code, ví dụ ENDOW_20, UL_FLEX) đã được cấp phép trong danh mục sản phẩm.",
          "Tài khoản thuộc nhóm Chuyên viên Định phí (Product Actuary) có quyền khởi tạo cấu hình trên MC."
        ],
        "steps": [
          {
            "step": 1,
            "title": "Đăng ký Mã Sản phẩm Mới (Create Product Master Header)",
            "action": "Vào Product Factory -> Product Master -> Add Product. Nhập Product Code (ví dụ PROD_ENDOW_20), Tên sản phẩm tiếng Việt và tiếng Anh, Loại hình bảo hiểm (Endowment, Term, Whole Life, Unit-Linked), và Đơn vị tiền tệ (VND)."
          },
          {
            "step": 2,
            "title": "Thiết lập Phiên bản Sản phẩm (Product Versioning & Effective Dates)",
            "action": "Tạo phiên bản mới (Version 1.0). Thiết lập Ngày bắt đầu bán (Effective Start Date) và Ngày kết thúc (Effective End Date). Chọn trạng thái là DRAFT."
          },
          {
            "step": 3,
            "title": "Cấu hình Cặp Thời hạn Hợp đồng & Thời hạn Đóng phí (PT & PPT Alignment)",
            "action": "Vào tab Policy Terms. Định cấu hình cặp Thời hạn bảo vệ (Policy Term - PT) và Thời hạn đóng phí (Premium Paying Term - PPT). Ví dụ: PT = 20 năm, PPT = 10, 15, hoặc 20 năm; hoặc Đóng phí 1 lần (Single Premium)."
          },
          {
            "step": 4,
            "title": "Thiết lập Giới hạn Tuổi Người được bảo hiểm & Bên mua bảo hiểm",
            "action": "Vào tab Eligibility Criteria. Nhập Tuổi tham gia tối thiểu của NĐBH (ví dụ: 30 ngày tuổi), Tuổi tham gia tối đa (ví dụ: 65 tuổi), và Tuổi tối đa khi đáo hạn hợp đồng (ví dụ: 80 tuổi hoặc 99 tuổi)."
          },
          {
            "step": 5,
            "title": "Xác lập Giới hạn Số tiền Bảo hiểm (Sum Assured Boundaries)",
            "action": "Vào tab Sum Assured Rules. Cấu hình Số tiền bảo hiểm tối thiểu (Min SA, ví dụ 100,000,000 VND), Số tiền bảo hiểm tối đa (Max SA, ví dụ 10,000,000,000 VND), và Bước nhảy số tiền (SA Step Unit, ví dụ 1,000,000 VND)."
          },
          {
            "step": 6,
            "title": "Lưu Dự thảo và Chạy Bộ Kiểm tra Hợp lệ Ban đầu (Run Validation Suite)",
            "action": "Nhấn nút 'Validate Term & Age Alignment'. Hệ thống kích hoạt các quy tắc kiểm tra chéo (ví dụ Max Age + PT <= Max Maturity Age). Đảm bảo không có thông báo lỗi cảnh báo."
          }
        ],
        "fields_table": [
          {
            "name": "PROD_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã định danh sản phẩm duy nhất trong toàn hệ thống"
          },
          {
            "name": "PROD_TYPE",
            "type": "Enum",
            "required": "Yes",
            "desc": "Loại hình: TRADITIONAL, INVESTMENT_LINKED, UNIVERSAL_LIFE, TERM"
          },
          {
            "name": "POLICY_TERM_YEARS",
            "type": "Integer",
            "required": "Yes",
            "desc": "Thời hạn hợp đồng tính bằng năm (hoặc đến tuổi cố định)"
          },
          {
            "name": "PREM_PAYING_TERM_YEARS",
            "type": "Integer",
            "required": "Yes",
            "desc": "Thời hạn đóng phí tính bằng năm (phải <= Policy Term)"
          },
          {
            "name": "MIN_ENTRY_AGE_DAYS",
            "type": "Integer",
            "required": "Yes",
            "desc": "Tuổi tham gia tối thiểu tính bằng ngày (cho trẻ sơ sinh)"
          },
          {
            "name": "MAX_ENTRY_AGE_YEARS",
            "type": "Integer",
            "required": "Yes",
            "desc": "Tuổi tham gia tối đa tính bằng năm"
          },
          {
            "name": "MAX_MATURITY_AGE",
            "type": "Integer",
            "required": "Yes",
            "desc": "Tuổi tối đa của Người được bảo hiểm tại ngày đáo hạn"
          },
          {
            "name": "MIN_SUM_ASSURED",
            "type": "Decimal",
            "required": "Yes",
            "desc": "Số tiền bảo hiểm tối thiểu chấp nhận trên hệ thống"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-ARC-04-A",
            "ruleName": "Thời hạn đóng phí (PPT) phải nhỏ hơn hoặc bằng Thời hạn hợp đồng (PT). Vi phạm sẽ bị chặn lưu với mã lỗi ERR_PF_TERM_MISMATCH.",
            "errorCode": "ERR_VAL_ARC_04_A",
            "severity": "HARD_STOP",
            "condition": "Thời hạn đóng phí (PPT) phải nhỏ hơn hoặc bằng Thời hạn hợp đồng (PT). Vi phạm sẽ bị chặn lưu với mã lỗi ERR_PF_TERM_MISMATCH.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 26
          },
          {
            "ruleId": "VAL-ARC-04-B",
            "ruleName": "Tổng của Tuổi tham gia tối đa và Thời hạn hợp đồng không được vượt quá Tuổi đáo hạn tối đa (Max Entry Age + PT <= Max Maturity Age).",
            "errorCode": "ERR_VAL_ARC_04_B",
            "severity": "HARD_STOP",
            "condition": "Tổng của Tuổi tham gia tối đa và Thời hạn hợp đồng không được vượt quá Tuổi đáo hạn tối đa (Max Entry Age + PT <= Max Maturity Age).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 26
          },
          {
            "ruleId": "VAL-ARC-04-C",
            "ruleName": "Số tiền bảo hiểm yêu cầu phải là bội số nguyên của Bước nhảy số tiền (SA Step Unit).",
            "errorCode": "ERR_VAL_ARC_04_C",
            "severity": "HARD_STOP",
            "condition": "Số tiền bảo hiểm yêu cầu phải là bội số nguyên của Bước nhảy số tiền (SA Step Unit).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 26
          }
        ]
      },
      {
        "code": "SOP-ARC-05",
        "id": "SOP-ARC-05",
        "title": "Multi-Dimensional Rate Table, Modal Loading & Actuarial Formula Compilation",
        "role": "Appointed Actuary / Pricing Specialist",
        "objective": "Nạp bảng tỷ lệ phí bảo hiểm đa chiều (Rate Tables), cấu hình các hệ số định kỳ đóng phí (Modal Factors), và biên dịch công thức tính phí toán học trong Product Factory.",
        "pdf_page": 28,
        "prerequisites": [
          "Bảng tỷ lệ phí thuần và phí gộp đã được Bộ phận Định phí (Pricing Team) tính toán và phê duyệt theo mô hình Prophet/Excel.",
          "Tệp dữ liệu tỷ lệ phí chuẩn định dạng CSV/Excel với các chiều tra cứu: Age, Gender, Smoker, Term, Sub-Plan.",
          "Cấu trúc bảng t_rt_ratetable_data đã được ánh xạ đúng schema trong Data Dictionary."
        ],
        "steps": [
          {
            "step": 1,
            "title": "Khởi tạo Định nghĩa Bảng Tỷ lệ Phí (Create Rate Table Definition)",
            "action": "Vào Rate Tables -> Add Rate Table. Đặt mã bảng (ví dụ RT_ENDOW20_MORT_2026), chọn loại bảng (Premium Rate Table, Cost of Insurance Rate Table, hoặc Surrender Charge Rate Table)."
          },
          {
            "step": 2,
            "title": "Thiết lập Các Chiều Tra cứu (Define Search Dimensions)",
            "action": "Khai báo các cột làm khóa tra cứu (Lookup Keys): AGE (Integer, Range 0-70), GENDER (String, M/F), SMOKER_STATUS (String, S/NS), POLICY_TERM (Integer). Cột giá trị trả về là RATE_PER_THOUSAND (Decimal 6 chữ số thập phân)."
          },
          {
            "step": 3,
            "title": "Tải lên Ma trận Tỷ lệ Phí (Batch Import Matrix)",
            "action": "Nhấn nút 'Upload Data Matrix'. Tải lên tệp CSV chứa dữ liệu. Hệ thống thực hiện kiểm tra sơ bộ định dạng dữ liệu (Data Format Pre-check), kiểm tra các ô trống (Null checks), và tính toàn vẹn của ma trận."
          },
          {
            "step": 4,
            "title": "Cấu hình Hệ số Kỳ Đóng phí (Modal Loading Factors Setup)",
            "action": "Vào Modal Loading Settings. Thiết lập hệ số quy đổi theo phương thức đóng phí chuẩn: Annual = 1.000, Semi-Annual = 0.520, Quarterly = 0.270, Monthly = 0.090."
          },
          {
            "step": 5,
            "title": "Biên dịch Công thức Phí Toán học (Actuarial Expression Compilation)",
            "action": "Trong Formula Builder, nhập biểu thức tính toán: 'ROUND((SA / 1000) * LOOKUP(RT_ENDOW20, AGE, GENDER, SMOKER) * MODAL_FACTOR, 0)'. Nhấn 'Compile Formula' để kiểm tra cú pháp và hiệu năng tính toán."
          },
          {
            "step": 6,
            "title": "Chạy Kiểm thử Khớp Phí Độc lập (Reconciliation Benchmark Test)",
            "action": "Nhập 5 kịch bản mẫu (Test Vectors) gồm các độ tuổi, giới tính và tần suất đóng phí khác nhau. So sánh kết quả phí tính được từ Product Factory với bảng minh họa chuẩn của Định phí. Sai số cho phép bằng 0 VND."
          }
        ],
        "fields_table": [
          {
            "name": "RATE_TABLE_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã bảng tỷ lệ phí duy nhất (ví dụ: RT_ENDOW_STD_2026)"
          },
          {
            "name": "DIMENSION_KEYS",
            "type": "Array",
            "required": "Yes",
            "desc": "Danh sách các khóa chiều không gian dùng để tra cứu"
          },
          {
            "name": "RATE_VALUE",
            "type": "Decimal(10,6)",
            "required": "Yes",
            "desc": "Tỷ lệ phí trên mỗi đơn vị 1,000 VND số tiền bảo hiểm"
          },
          {
            "name": "MODAL_FACTOR_ANNUAL",
            "type": "Decimal(4,3)",
            "required": "Yes",
            "desc": "Hệ số đóng phí năm"
          },
          {
            "name": "MODAL_FACTOR_SEMI",
            "type": "Decimal(4,3)",
            "required": "Yes",
            "desc": "Hệ số đóng phí nửa năm (chứa lãi suất và chi phí quản lý)"
          },
          {
            "name": "MODAL_FACTOR_QUARTER",
            "type": "Decimal(4,3)",
            "required": "Yes",
            "desc": "Hệ số đóng phí quý"
          },
          {
            "name": "MODAL_FACTOR_MONTH",
            "type": "Decimal(4,3)",
            "required": "Yes",
            "desc": "Hệ số đóng phí tháng"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-ARC-05-A",
            "ruleName": "Tỷ lệ phí Rate Value trong toàn bộ bảng phải là số dương nghiêm ngặt (> 0).",
            "errorCode": "ERR_VAL_ARC_05_A",
            "severity": "HARD_STOP",
            "condition": "Tỷ lệ phí Rate Value trong toàn bộ bảng phải là số dương nghiêm ngặt (> 0).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 28
          },
          {
            "ruleId": "VAL-ARC-05-B",
            "ruleName": "Ma trận tỷ lệ phí phải phủ kín 100% không gian tra cứu; không được phép tồn tại ô trống hoặc giá trị NULL.",
            "errorCode": "ERR_VAL_ARC_05_B",
            "severity": "HARD_STOP",
            "condition": "Ma trận tỷ lệ phí phải phủ kín 100% không gian tra cứu; không được phép tồn tại ô trống hoặc giá trị NULL.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 28
          },
          {
            "ruleId": "VAL-ARC-05-C",
            "ruleName": "Các hệ số kỳ đóng phí phải thỏa mãn điều kiện chống kinh doanh chênh lệch giá (No-arbitrage): Annual <= 2*Semi <= 4*Quarter <= 12*Month.",
            "errorCode": "ERR_VAL_ARC_05_C",
            "severity": "HARD_STOP",
            "condition": "Các hệ số kỳ đóng phí phải thỏa mãn điều kiện chống kinh doanh chênh lệch giá (No-arbitrage): Annual <= 2*Semi <= 4*Quarter <= 12*Month.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 28
          }
        ]
      },
      {
        "code": "SOP-ARC-06",
        "id": "SOP-ARC-06",
        "title": "Cash Value Schedule, Bonus Engine & Non-Forfeiture Publishing to SOR",
        "role": "Lead Product Architect / Release Manager",
        "objective": "Cấu hình lịch trình giá trị hoàn lại (Cash Value Schedule), cơ chế tích lũy bảo tức, các quyền chọn không hủy bỏ hiệu lực (Non-Forfeiture Options: RPU, ETI, APL), và phát hành phiên bản sản phẩm chính thức lên SOR.",
        "pdf_page": 29,
        "prerequisites": [
          "Bảng tỷ lệ phí và các quy tắc sản phẩm đã vượt qua 100% các bài kiểm tra xác thực (Validation Suite).",
          "Biểu giá trị hoàn lại theo từng năm hợp đồng đã được Appointed Actuary ký duyệt.",
          "Biên bản nghiệm thu cấu hình sản phẩm giữa Khối Kỹ thuật Nghiệp vụ và Khối CNTT."
        ],
        "steps": [
          {
            "step": 1,
            "title": "Cấu hình Bảng Tỷ lệ Giá trị Hoàn lại (Cash Value Schedule Setup)",
            "action": "Vào Non-Forfeiture -> Cash Value Tables. Nạp bảng hệ số giá trị hoàn lại trên 1,000 VND số tiền bảo hiểm theo Năm hợp đồng (Policy Year 1..n). Xác nhận năm đầu tiên có giá trị hoàn lại (thường từ Năm 2 hoặc Năm 3)."
          },
          {
            "step": 2,
            "title": "Thiết lập Động cơ Bảo tức & Chia lãi (Bonus & Dividend Engine)",
            "action": "Vào Bonus Configuration. Cấu hình loại hình bảo tức: Bảo tức định kỳ (Reversionary Bonus), Bảo tức tri ân/đáo hạn (Terminal Bonus), và Lãi suất tích lũy bảo tức để lại (Accumulated Dividend Interest Rate, ví dụ 5.5%/năm)."
          },
          {
            "step": 3,
            "title": "Cấu hình Các Quyền chọn Không hủy bỏ Hiệu lực (Non-Forfeiture Options)",
            "action": "Vào Non-Forfeiture Options. Bật các tùy chọn cho phép khách hàng áp dụng khi ngừng đóng phí: Đóng phí tự động từ giá trị hoàn lại (APL - Automatic Premium Loan), Bảo hiểm giảm số tiền bảo hiểm (RPU - Reduced Paid-Up), và Gia hạn số tiền bảo hiểm (ETI - Extended Term Insurance)."
          },
          {
            "step": 4,
            "title": "Thiết lập Hạn mức & Lãi suất Vay theo Hợp đồng (Policy Loan Parameters)",
            "action": "Cấu hình Tỷ lệ cho vay tối đa trên Giá trị hoàn lại ròng (Max Loan to CSV Ratio, ví dụ 80%), Mức vay tối thiểu (ví dụ 5,000,000 VND), và Lãi suất vay hợp đồng theo quy định (ví dụ 6.5%/năm)."
          },
          {
            "step": 5,
            "title": "Ghi nhận Tham số Bảo vệ Nâng cấp (Set record_usage = 5)",
            "action": "Trong bảng cấu hình Tenant MC, đánh dấu tham số record_usage = 5 cho tất cả các bảng dữ liệu sản phẩm của Tenant. Quy định này ngăn chặn tiến trình nâng cấp baseline ghi đè làm mất cấu hình riêng."
          },
          {
            "step": 6,
            "title": "Biên dịch Toàn cục & Phát hành lên Runtime SOR (Compile & Publish to SOR)",
            "action": "Nhấn nút 'Publish to System of Record (SOR)'. Hệ thống thực hiện kiểm tra toàn vẹn 10 bước, nạp dữ liệu vào các bảng runtime t_prod_def, t_prod_term, t_prod_sa_rule, và phát thông điệp RabbitMQ xóa cache cũ."
          }
        ],
        "fields_table": [
          {
            "name": "CSV_START_YEAR",
            "type": "Integer",
            "required": "Yes",
            "desc": "Năm hợp đồng đầu tiên bắt đầu phát sinh giá trị hoàn lại"
          },
          {
            "name": "CSV_RATE_PER_1000",
            "type": "Decimal(8,4)",
            "required": "Yes",
            "desc": "Tỷ lệ giá trị hoàn lại trên mỗi 1,000 VND số tiền bảo hiểm"
          },
          {
            "name": "APL_ALLOWED",
            "type": "Boolean",
            "required": "Yes",
            "desc": "Cho phép kích hoạt tính năng Tự động tạm ứng đóng phí bảo hiểm (APL)"
          },
          {
            "name": "MAX_LOAN_PCT_OF_CSV",
            "type": "Decimal(4,2)",
            "required": "Yes",
            "desc": "Tỷ lệ tối đa được phép vay trên Giá trị hoàn lại ròng (80%)"
          },
          {
            "name": "POLICY_LOAN_ANNUAL_INT",
            "type": "Decimal(4,3)",
            "required": "Yes",
            "desc": "Lãi suất năm tính cho các khoản tạm ứng vay theo hợp đồng (6.5%)"
          },
          {
            "name": "RECORD_USAGE",
            "type": "Integer",
            "required": "Yes",
            "desc": "Cờ bảo vệ cấu hình Tenant chống bị ghi đè khi nâng cấp baseline (Bắt buộc = 5)"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-ARC-06-A",
            "ruleName": "Giá trị hoàn lại của mọi năm hợp đồng không được vượt quá Số tiền bảo hiểm quyền lợi tử vong.",
            "errorCode": "ERR_VAL_ARC_06_A",
            "severity": "HARD_STOP",
            "condition": "Giá trị hoàn lại của mọi năm hợp đồng không được vượt quá Số tiền bảo hiểm quyền lợi tử vong.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 29
          },
          {
            "ruleId": "VAL-ARC-06-B",
            "ruleName": "Tỷ lệ vay theo hợp đồng không được vượt quá 80% Giá trị hoàn lại sau khi đã khấu trừ các khoản nợ phí và tạm ứng trước đó.",
            "errorCode": "ERR_VAL_ARC_06_B",
            "severity": "HARD_STOP",
            "condition": "Tỷ lệ vay theo hợp đồng không được vượt quá 80% Giá trị hoàn lại sau khi đã khấu trừ các khoản nợ phí và tạm ứng trước đó.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 29
          },
          {
            "ruleId": "VAL-ARC-06-C",
            "ruleName": "Tham số record_usage bắt buộc phải bằng 5 đối với tất cả cấu hình sản phẩm phát hành của Tenant.",
            "errorCode": "ERR_VAL_ARC_06_C",
            "severity": "HARD_STOP",
            "condition": "Tham số record_usage bắt buộc phải bằng 5 đối với tất cả cấu hình sản phẩm phát hành của Tenant.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 29
          }
        ]
      }
    ],
    "sop_count": 6,
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
    "pdf_end_page": 33,
    "pdf_chapter": "Module 01: Architecture Overview & System Configuration (Pages 1-33)",
    "validation_rules": [
      {
        "ruleId": "VAL-PF-001",
        "ruleName": "Policy Term vs Premium Paying Term Alignment",
        "errorCode": "ERR_PF_TERM_MISMATCH",
        "severity": "HARD_STOP",
        "condition": "Premium Paying Term (PPT) must be strictly <= Policy Term (PT).",
        "systemAction": "Chặn biên dịch và phát hành sản phẩm lên bảng runtime SOR.",
        "actuarialBasis": "Ngăn ngừa dự phòng kỹ thuật âm và rủi ro không có dòng tiền thu phí bù đắp chi phí bảo hiểm trong tương lai.",
        "pdfPage": 26
      },
      {
        "ruleId": "VAL-PF-002",
        "ruleName": "Entry Age Boundary & Maturity Ceiling",
        "errorCode": "ERR_PF_AGE_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "Min Entry Age < Max Entry Age AND (Max Entry Age + Policy Term) <= Max Maturity Age (typically 80 or 99).",
        "systemAction": "Hệ thống từ chối lưu cấu hình điều kiện tham gia sản phẩm.",
        "actuarialBasis": "Bảo đảm xác suất tử vong không vượt quá giới hạn bảng tỷ lệ tử vong CSO/Việt Nam 2014.",
        "pdfPage": 27
      },
      {
        "ruleId": "VAL-PF-003",
        "ruleName": "Multi-Dimensional Rate Table Full Coverage",
        "errorCode": "ERR_PF_RATE_GAP",
        "severity": "HARD_STOP",
        "condition": "Rate Table matrix must cover all defined combinations of Age, Gender, and Smoker status without NULL cells.",
        "systemAction": "Chặn nhập ma trận phí và xuất danh sách các tọa độ bị thiếu dữ liệu.",
        "actuarialBasis": "Đảm bảo New Business Workbench không bao giờ gặp lỗi tính phí không tìm thấy tỷ lệ tại runtime.",
        "pdfPage": 28
      },
      {
        "ruleId": "VAL-PF-004",
        "ruleName": "No-Arbitrage Modal Loading Hierarchy",
        "errorCode": "ERR_PF_MODAL_ARBITRAGE",
        "severity": "HARD_STOP",
        "condition": "Annual Premium <= 2 * Semi-Annual <= 4 * Quarterly <= 12 * Monthly Premium.",
        "systemAction": "Cảnh báo đỏ và chặn lưu cấu hình hệ số định kỳ.",
        "actuarialBasis": "Phương thức đóng phí kỳ nhỏ hơn phải gánh thêm lãi suất trả chậm và chi phí quản lý vận hành.",
        "pdfPage": 28
      },
      {
        "ruleId": "VAL-PF-005",
        "ruleName": "Cash Value Ceiling & Monotonic Growth",
        "errorCode": "ERR_PF_CSV_OVERFLOW",
        "severity": "HARD_STOP",
        "condition": "0 <= Cash Value Rate(t) <= Sum Assured for all policy years t.",
        "systemAction": "Chặn phê duyệt biểu giá trị hoàn lại.",
        "actuarialBasis": "Tránh hiện tượng tự sát vì lợi ích kinh tế hoặc trục lợi giá trị hoàn lại vượt quá trách nhiệm bảo vệ.",
        "pdfPage": 29
      },
      {
        "ruleId": "VAL-PF-006",
        "ruleName": "Garment & Fabrics Monotonic Pipeline Sequence",
        "errorCode": "ERR_ARC_FABRIC_ORDER",
        "severity": "HARD_STOP",
        "condition": "Fabric step numbers in a Garment pipeline must be strictly positive and increasing without circular references.",
        "systemAction": "Từ chối biên dịch pipeline điều phối dịch vụ nội bộ.",
        "actuarialBasis": "Bảo đảm tính xác định đơn dòng (deterministic sequential flow) của nghiệp vụ bảo hiểm.",
        "pdfPage": 15
      },
      {
        "ruleId": "VAL-PF-007",
        "ruleName": "Tenant Configuration Upgrade Protection Flag",
        "errorCode": "ERR_ARC_RECORD_USAGE_INVALID",
        "severity": "HARD_STOP",
        "condition": "All custom Tenant configuration records in MC environment must have record_usage = 5.",
        "systemAction": "Cảnh báo nguy cơ bị mất cấu hình khi hệ thống nâng cấp phiên bản Gemini SDK.",
        "actuarialBasis": "Bảo vệ các quy định nghiệp vụ và bảng phí đã đăng ký của công ty bảo hiểm khi có bản vá hệ điều hành core.",
        "pdfPage": 28
      },
      {
        "ruleId": "VAL-PF-008",
        "ruleName": "Two-Phase Commit Pre-Image Snapshot Validation",
        "errorCode": "ERR_ARC_UNDO_LOG_MISSING",
        "severity": "CRITICAL",
        "condition": "Before executing any local write, pre-image snapshot of the entity must be persisted in t_pub_tx_undo_log.",
        "systemAction": "Hủy giao dịch (Abort) ngay lập tức và ngăn cản việc ghi vào bảng SOR.",
        "actuarialBasis": "Bảo toàn tính toàn vẹn dữ liệu hợp đồng; nếu dịch vụ hạ nguồn đứt gãy, hệ thống có thể hoàn tác chính xác 100%.",
        "pdfPage": 22
      },
      {
        "ruleId": "VAL-PF-009",
        "ruleName": "Standardized Cache Naming Convention",
        "errorCode": "WARN_ARC_CACHE_KEY_INVALID",
        "severity": "WARNING",
        "condition": "Cache keys must strictly start with prefix '[BIZ-DATA]' + Module Name + Detail (e.g. '[BIZ-DATA][PROD]RateTable').",
        "systemAction": "Khóa cache sẽ không nhận được lệnh xóa tự động khi có thông điệp broadcast qua RabbitMQ.",
        "actuarialBasis": "Tránh dùng lại dữ liệu phí cũ đã lỗi thời trong bộ nhớ đệm khi bảng tỷ lệ phí mới đã được kích hoạt.",
        "pdfPage": 25
      },
      {
        "ruleId": "VAL-PF-010",
        "ruleName": "JVM UTC Timezone Strict Compliance",
        "errorCode": "ERR_ARC_TIMEZONE_POLLUTION",
        "severity": "HARD_STOP",
        "condition": "Gemini container JVM timezone must be UTC (0); localized conversion occurs only at BFF/BS boundary.",
        "systemAction": "Chặn khởi động dịch vụ Core PAS.",
        "actuarialBasis": "Ngày hiệu lực hợp đồng và thời gian 21 ngày cân nhắc phải được tính toán chính xác tuyệt đối trên cùng một chuẩn thời gian.",
        "pdfPage": 24
      },
      {
        "ruleId": "VAL-PF-011",
        "ruleName": "Rider Policy Term Bound by Base Plan",
        "errorCode": "ERR_PF_RIDER_TERM_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "Rider Policy Term (PT_Rider) must be <= Base Policy Term (PT_Base).",
        "systemAction": "Chặn liên kết rider vào gói sản phẩm chính.",
        "actuarialBasis": "Sản phẩm bổ trợ không thể tồn tại độc lập khi hợp đồng chính đã đáo hạn hoặc chấm dứt hiệu lực.",
        "pdfPage": 27
      },
      {
        "ruleId": "VAL-PF-012",
        "ruleName": "Policy Loan Ceiling & Regulatory Interest Floor",
        "errorCode": "ERR_PF_LOAN_TERMS_INVALID",
        "severity": "HARD_STOP",
        "condition": "Max Loan Ratio <= 80% Net CSV AND Policy Loan Annual Interest Rate >= 5.0%.",
        "systemAction": "Chặn cấu hình điều khoản vay hợp đồng.",
        "actuarialBasis": "Tuân thủ quy định trần an toàn tài chính của Luật Kinh doanh Bảo hiểm và bảo đảm rủi ro thấu chi không vượt quá quỹ hoàn lại.",
        "pdfPage": 29
      }
    ],
    "validation_rules_count": 12,
    "product_factory_archetypes": [
      {
        "code": "PROD-ENDOW-20",
        "name": "Sacom Bảo Gia Phúc (Endowment 20-Yr)",
        "category": "Traditional Endowment with Savings & Terminal Bonus",
        "description": "Sản phẩm tích lũy truyền thống 20 năm, kết hợp bảo vệ quyền lợi Tử vong / Thương tật toàn bộ vĩnh viễn (TPD) và Bảo tức tri ân khi đáo hạn.",
        "pt": 20,
        "ppt": 20,
        "minAge": 0,
        "maxAge": 60,
        "maxMaturityAge": 80,
        "minSA": 100000000,
        "maxSA": 10000000000,
        "baseRatePer1000": 38.5,
        "hasSurrenderValue": true,
        "csvStartYear": 2,
        "csvRateYr5": 145.0,
        "csvRateYr10": 380.0,
        "csvRateYr20": 1050.0,
        "reversionaryBonusPct": 1.5,
        "terminalBonusPct": 10.0,
        "modalFactors": {
          "Annual": 1.0,
          "Semi": 0.52,
          "Quarter": 0.27,
          "Month": 0.09
        },
        "allowedRiders": [
          "RIDER-PA-01 (Tai nạn 24/7)",
          "RIDER-CI-02 (37 Bệnh lý nghiêm trọng)",
          "RIDER-MED-03 (Chăm sóc y tế cao cấp)"
        ],
        "features": [
          "Bảo tức tích lũy hàng năm",
          "Đáo hạn nhận 100% STBH + Toàn bộ Bảo tức",
          "Hỗ trợ Tự động tạm ứng đóng phí (APL)",
          "Vay tối đa 80% Giá trị hoàn lại"
        ]
      },
      {
        "code": "PROD-TERM-10",
        "name": "Sacom An Tâm Vững Bước (Level Term 10-Yr)",
        "category": "Pure Protection Level Term Insurance",
        "description": "Bảo hiểm tử kỳ thuần túy 10 năm với mức phí cố định, bảo vệ thu nhập người trụ cột ở mức chi phí thấp nhất, không có giá trị hoàn lại.",
        "pt": 10,
        "ppt": 10,
        "minAge": 18,
        "maxAge": 65,
        "maxMaturityAge": 75,
        "minSA": 200000000,
        "maxSA": 20000000000,
        "baseRatePer1000": 8.2,
        "hasSurrenderValue": false,
        "csvStartYear": 0,
        "csvRateYr5": 0.0,
        "csvRateYr10": 0.0,
        "csvRateYr20": 0.0,
        "reversionaryBonusPct": 0.0,
        "terminalBonusPct": 0.0,
        "modalFactors": {
          "Annual": 1.0,
          "Semi": 0.52,
          "Quarter": 0.27,
          "Month": 0.09
        },
        "allowedRiders": [
          "RIDER-PA-01 (Tai nạn 24/7)",
          "RIDER-CI-02 (37 Bệnh lý nghiêm trọng)"
        ],
        "features": [
          "Phí bảo hiểm thấp tối đa",
          "100% Phí thuần cho rủi ro tử vong",
          "Không có giá trị giải ước",
          "Không áp dụng chính sách vay hợp đồng"
        ]
      },
      {
        "code": "PROD-WHOLE-99",
        "name": "Sacom Trọn Đời Yêu Thương (Whole Life to 99)",
        "category": "Whole Life with Cash Value & Compounding Dividends",
        "description": "Bảo hiểm trọn đời đến 99 tuổi, đóng phí ngắn hạn (10, 15, 20 năm), bảo đảm tài chính vững chắc và chuyển giao di sản kế thừa qua các thế hệ.",
        "pt": 99,
        "ppt": 15,
        "minAge": 0,
        "maxAge": 65,
        "maxMaturityAge": 99,
        "minSA": 150000000,
        "maxSA": 50000000000,
        "baseRatePer1000": 46.8,
        "hasSurrenderValue": true,
        "csvStartYear": 2,
        "csvRateYr5": 160.0,
        "csvRateYr10": 420.0,
        "csvRateYr20": 980.0,
        "reversionaryBonusPct": 2.0,
        "terminalBonusPct": 15.0,
        "modalFactors": {
          "Annual": 1.0,
          "Semi": 0.52,
          "Quarter": 0.27,
          "Month": 0.09
        },
        "allowedRiders": [
          "RIDER-PA-01",
          "RIDER-CI-02",
          "RIDER-MED-03",
          "RIDER-WOP-04 (Miễn đóng phí bệnh hiểm nghèo)"
        ],
        "features": [
          "Bảo vệ trọn đời đến 99 tuổi",
          "Đóng phí ngắn hạn 15 năm",
          "Giá trị hoàn lại tăng trưởng liên tục",
          "Hỗ trợ rút một phần giá trị tài khoản từ năm 10"
        ]
      },
      {
        "code": "PROD-UL-INV",
        "name": "Sacom Đầu Tư Linh Hoạt (Unit-Linked Universal Life)",
        "category": "Investment-Linked Life Insurance (ILP)",
        "description": "Sản phẩm bảo hiểm liên kết đơn vị đầu tư hiện đại, tách bạch rõ ràng giữa phí bảo hiểm rủi ro (COI), chi phí ban đầu, và giá trị tài khoản đầu tư sinh lời theo danh mục quỹ.",
        "pt": 99,
        "ppt": 99,
        "minAge": 18,
        "maxAge": 65,
        "maxMaturityAge": 99,
        "minSA": 300000000,
        "maxSA": 100000000000,
        "baseRatePer1000": 22.0,
        "hasSurrenderValue": true,
        "csvStartYear": 1,
        "csvRateYr5": 210.0,
        "csvRateYr10": 580.0,
        "csvRateYr20": 1320.0,
        "reversionaryBonusPct": 0.0,
        "terminalBonusPct": 0.0,
        "modalFactors": {
          "Annual": 1.0,
          "Semi": 0.52,
          "Quarter": 0.27,
          "Month": 0.09
        },
        "allowedRiders": [
          "RIDER-PA-01",
          "RIDER-CI-02",
          "RIDER-MED-03"
        ],
        "features": [
          "Đầu tư linh hoạt vào 3 quỹ: Tăng trưởng, Cân bằng, Bảo toàn",
          "Khấu trừ phí rủi ro COI hàng tháng từ quỹ",
          "Phí ban đầu: Năm 1 (60%), Năm 2 (30%), Năm 3 (10%), Năm 4+ (0%)",
          "Miễn phí chuyển đổi quỹ 4 lần/năm"
        ]
      }
    ],
    "garment_fabrics_catalog": [
      {
        "step": 1,
        "fabric": "buildContextQuotationFabric",
        "desc": "Khởi tạo ngữ cảnh xử lý báo giá từ request của client (Quotation JSON Envelope).",
        "layer": "BS Context Builder"
      },
      {
        "step": 2,
        "fabric": "preValidationDataFormatFabric",
        "desc": "Kiểm tra định dạng dữ liệu (Schema validation) và quy tắc nhập liệu ban đầu.",
        "layer": "Pre-Validation"
      },
      {
        "step": 3,
        "fabric": "prepareMasterDataFabric",
        "desc": "Truy vấn thông tin sản phẩm từ cache Redis [BIZ-DATA][PROD] và thông tin khách hàng.",
        "layer": "Data Provider"
      },
      {
        "step": 4,
        "fabric": "quotationCoreProcessingFabric",
        "desc": "Thực thi thuật toán định phí: Tra cứu bảng tỷ lệ phí và áp dụng hệ số định kỳ.",
        "layer": "Actuarial Engine"
      },
      {
        "step": 5,
        "fabric": "postValidationBusinessRulesFabric",
        "desc": "Kiểm tra giới hạn SA, tuổi tham gia, và điều kiện thẩm định sơ bộ.",
        "layer": "Business Rule Validator"
      },
      {
        "step": 6,
        "fabric": "applicationEventBroadcastFabric",
        "desc": "Phát thông điệp sự kiện tính phí báo giá qua RabbitMQ cho hệ thống analytics.",
        "layer": "Event Broker"
      },
      {
        "step": 7,
        "fabric": "checkSuspenseStatusFabric",
        "desc": "Kiểm tra các cờ tạm dừng (Suspense Check) nếu có ngoại lệ cần duyệt thủ công.",
        "layer": "Routing Engine"
      },
      {
        "step": 8,
        "fabric": "routeSuspenseBranchFabric",
        "desc": "Điều hướng quy trình theo kết quả kiểm tra Suspense (Pass hay Pend UW).",
        "layer": "Workflow Router"
      },
      {
        "step": 16,
        "fabric": "processingGstTaxFabric",
        "desc": "[Tenant Custom Fabric - AFLI/SACOM] Tính toán thuế giá trị gia tăng hoặc phí đặc thù theo quốc gia.",
        "layer": "Tenant Custom Extension"
      },
      {
        "step": 17,
        "fabric": "saveUpdatedDataFabric",
        "desc": "Ghi nhận dữ liệu vào bảng New Business và tạo snapshot t_pub_tx_undo_log.",
        "layer": "Persistence & 2PC"
      },
      {
        "step": 18,
        "fabric": "saveEventBroadcastFabric",
        "desc": "Phát sự kiện lưu trữ dữ liệu báo giá thành công.",
        "layer": "Event Broker"
      },
      {
        "step": 19,
        "fabric": "prepareResponseDataFabric",
        "desc": "Đóng gói kết quả tính phí, biểu minh họa tóm tắt vào Response Object.",
        "layer": "Response Assembler"
      },
      {
        "step": 20,
        "fabric": "putCustomerDetailsFabric",
        "desc": "Bổ sung thông tin đối tượng tham gia và đại lý phục vụ vào Response.",
        "layer": "Response Assembler"
      },
      {
        "step": 21,
        "fabric": "pickAndReturnStepFabric",
        "desc": "Trích xuất Response Object từ Context và hoàn trả JSON cho client qua BFF.",
        "layer": "Exit Gateway"
      }
    ],
    "product_factory_10_steps": [
      {
        "step": 1,
        "name": "Product Master Definition",
        "table": "t_prod_def, t_prod_version",
        "desc": "Khai báo mã sản phẩm, phân loại hình bảo hiểm, tiền tệ và quản lý phiên bản hiệu lực."
      },
      {
        "step": 2,
        "name": "Terms & Age Eligibility Setup",
        "table": "t_prod_term, t_prod_age_limit",
        "desc": "Cấu hình cặp Policy Term & Premium Paying Term, giới hạn tuổi tham gia và tuổi đáo hạn."
      },
      {
        "step": 3,
        "name": "Sum Assured Bounds & Rules",
        "table": "t_prod_sa_rule",
        "desc": "Xác lập hạn mức Số tiền bảo hiểm tối thiểu, tối đa và bước nhảy số tiền theo kênh phân phối."
      },
      {
        "step": 4,
        "name": "Rate Tables & Actuarial Expression",
        "table": "t_rt_ratetable_data, t_pub_res_ctx_*",
        "desc": "Nạp ma trận tỷ lệ phí đa chiều (Age, Gender, Smoker) và biên dịch công thức phí toán học."
      },
      {
        "step": 5,
        "name": "Modal Loading Factors",
        "table": "t_modal_factor",
        "desc": "Thiết lập hệ số quy đổi theo kỳ đóng phí (Annual = 1.0, Semi = 0.52, Quarter = 0.27, Month = 0.09)."
      },
      {
        "step": 6,
        "name": "Surrender Cash Value Schedule",
        "table": "t_surrender_val_schedule",
        "desc": "Nạp bảng tỷ lệ giá trị hoàn lại theo năm hợp đồng và cấu hình động cơ bảo tức/chia lãi."
      },
      {
        "step": 7,
        "name": "Rider Compatibility Matrix",
        "table": "t_rider_compatibility",
        "desc": "Quy định danh mục các sản phẩm bổ trợ được phép bán kèm, hạn mức SA rider theo hợp đồng chính."
      },
      {
        "step": 8,
        "name": "Auto-Underwriting STP Engine",
        "table": "t_auto_uw_rule",
        "desc": "Thiết lập ngưỡng phát hành tự động không qua thẩm định viên (STP Limits & Medical Thresholds)."
      },
      {
        "step": 9,
        "name": "Non-Forfeiture & Policy Loan",
        "table": "t_non_forfeiture_param",
        "desc": "Kích hoạt tính năng APL, RPU, ETI và trần tỷ lệ cho vay hợp đồng (Max 80% CSV, Lãi 6.5%/năm)."
      },
      {
        "step": 10,
        "name": "SOR Compilation & Publish",
        "table": "record_usage = 5 -> SOR Runtime",
        "desc": "Kiểm tra toàn vẹn, gắn cờ record_usage = 5 bảo vệ nâng cấp baseline và phát hành lên SOR."
      }
    ]
  },
  {
    "id": "MOD_02",
    "num": "02",
    "title": "Mod 02: New Business & Policy Issuance",
    "subtitle": "NB Workbench, Reception, Data Entry, First Premium Collection, Policy Contract Dispatch & 21-Day Free-Look",
    "icon": "user-plus",
    "badge": "Policy Inception",
    "page_range": "Pages 33 - 142",
    "summary": "Phân hệ Tiếp nhận Hồ sơ Yêu cầu Bảo hiểm và Phát hành Hợp đồng (New Business & Policy Issuance - NB APP). Bao quát toàn bộ vòng đời giai đoạn đầu từ Khởi tạo tiếp nhận (Reception) sinh mã Proposal No. và Policy No., nhập liệu chi tiết thông tin các bên (Bên mua bảo hiểm, Người được bảo hiểm, Người nộp phí, Người thụ hưởng cân đối 100%), liên kết sản phẩm chính và sản phẩm bổ trợ (Rider SA <= Parent SA), kiểm tra tuân thủ kênh Bancassurance (quy tắc 60 ngày giải ngân Thông tư 67/TT-BTC), kiểm soát Maker-Checker xác minh dữ liệu, điều phối luồng thẩm định tự động STP hoặc chuyển bàn thẩm định Underwriting, đối soát khớp thu phí đầu tiên (First Premium Suspense Allocation), kích hoạt lệnh Enforcing phát hành hợp đồng chính thức lên SOR, và giám sát thời gian 21 ngày cân nhắc (Free-Look Period) kích hoạt từ ngày khách hàng ký nhận bàn giao hợp đồng (e-ACK Delivery Date).",
    "mermaid_workflow": "graph TD\n    subgraph STG1 [\"1. Reception (Tiếp nhận)\"]\n        REC1[\"Nhập thông tin ban đầu & Kênh bán\"]\n        REC2[\"Kiểm tra Agent License & Quota\"]\n        REC3[\"Sinh mã Proposal No. & Policy No.\"]\n    end\n\n    subgraph STG2 [\"2. Data Entry (Nhập liệu)\"]\n        DE1[\"Policyholder (Individual/Org & PEP)\"]\n        DE2[\"Life Assured (Insurable Interest)\"]\n        DE3[\"Main Product + Rider (SA Bounds)\"]\n        DE4[\"Beneficiaries (Tổng % = 100%)\"]\n        DE5[\"Declaration Form (Y tế & Lối sống)\"]\n    end\n\n    subgraph STG3 [\"3. Verification (Kiểm tra)\"]\n        VER[\"Maker-Checker Verification Submit<br/>(Đối soát chéo dữ liệu & AML)\"]\n    end\n\n    subgraph STG4 [\"4. Underwriting Routing\"]\n        AUTOUW{\"STP Evaluation<br/>(Quy tắc Thẩm định Tự động)\"}\n        MANUW[\"Underwriting Workbench<br/>(Chuyên viên Thẩm định / LCA 30 ngày)\"]\n    end\n\n    subgraph STG5 [\"5. Payment & Suspense\"]\n        PAY[\"Nộp Phí Đầu Tiên (First Premium)<br/>(Virtual Account / Bank Transfer)\"]\n        SUSP[\"Khớp Phí & Treo Suspense GL 2211\"]\n    end\n\n    subgraph STG6 [\"6. Enforcing & Issuance\"]\n        ENF[\"Kích hoạt Lệnh Enforce Issue\"]\n        SOR[(\"Chuyển dữ liệu sang SOR<br/>t_pol_policy (Inforce)\")]\n        PDF[\"Tạo File Hợp Đồng Điện Tử (e-Policy PDF)\"]\n    end\n\n    subgraph STG7 [\"7. Delivery & 21-Day Free-Look\"]\n        ACK[\"Khách hàng Ký Nhận e-ACK (DELIVERY_DATE)\"]\n        FL[\"Kích hoạt Đếm Ngược 21 Ngày Cân Nhắc\"]\n    end\n\n    REC1 --> REC2 --> REC3 --> DE1\n    DE1 --> DE2 --> DE3 --> DE4 --> DE5 --> VER\n    VER --> AUTOUW\n    AUTOUW -->|Pass STP| PAY\n    AUTOUW -->|Referral| MANUW\n    MANUW -->|Standard / LCA Accepted| PAY\n    PAY --> SUSP --> ENF\n    ENF --> SOR\n    ENF --> PDF\n    PDF --> ACK --> FL\n\n    classDef rec fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;\n    classDef de fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#b45309;\n    classDef ver fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#6d28d9;\n    classDef uw fill:#ffe4e6,stroke:#e11d48,stroke-width:2px,color:#be123c;\n    classDef pay fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#15803d;\n    classDef enf fill:#ccfbf1,stroke:#0d9488,stroke-width:2px,color:#115e59;\n    classDef ack fill:#f3e8ff,stroke:#9333ea,stroke-width:2px,color:#7e22ce;\n\n    class REC1,REC2,REC3 rec;\n    class DE1,DE2,DE3,DE4,DE5 de;\n    class VER ver;\n    class AUTOUW,MANUW uw;\n    class PAY,SUSP pay;\n    class ENF,SOR,PDF enf;\n    class ACK,FL ack;",
    "core_concepts": [
      {
        "term": "Vòng đời 6 Giai đoạn New Business",
        "def": "Tiếp nhận (Reception) -> Nhập liệu (Data Entry) -> Kiểm tra xác minh (Verification Maker-Checker) -> Thẩm định rủi ro (Underwriting STP/Manual) -> Thu phí ban đầu (First Premium Allocation) -> Phát hành & Thực thi (Enforcing & Policy Issuance)."
      },
      {
        "term": "Sinh Mã Số Kép Ngay Từ Tiếp Nhận",
        "def": "Tại bước Initial Registration, hệ thống sinh đồng thời Proposal No. (quản lý hồ sơ yêu cầu) và Policy No. (mã hợp đồng tương lai), gắn chặt với Servicing Agent có chứng chỉ hành nghề hợp lệ."
      },
      {
        "term": "Quy tắc Phân định Ranh giới Bên tham gia (Party Hierarchy)",
        "def": "Hỗ trợ Policyholder là Cá nhân hoặc Tổ chức; Người được bảo hiểm có mối quan hệ quyền lợi có thể được bảo hiểm (Insurable Interest); Người thụ hưởng (Beneficiary) bắt buộc tổng tỷ lệ phân chia = 100%; trường hợp người thụ hưởng dưới 18 tuổi bắt buộc chỉ định Người giám hộ/Ủy thác (Trustee)."
      },
      {
        "term": "Ràng buộc Cấu hình Sản phẩm Bổ trợ (Rider Boundary)",
        "def": "Thời hạn Rider không được vượt quá HĐ chính; tổng STBH Rider không vượt quá STBH HĐ chính (Sum of SA not greater than Parent SA); tự động loại trừ các Rider không tương thích."
      },
      {
        "term": "Kiểm soát Tuân thủ Kênh Bancassurance (Thông tư 67/2023/TT-BTC)",
        "def": "Chặn tuyệt đối việc bán bảo hiểm liên kết đầu tư kèm khoản vay trong thời hạn 60 ngày trước và sau giải ngân vốn vay ngân hàng."
      },
      {
        "term": "Cơ chế Khớp Thu Phí Đầu Tiên (First Premium Suspense)",
        "def": "Phí nộp ban đầu được treo tại tài khoản trung gian Suspense Account (Module 07 GL 2211). Lệnh Enforce chỉ được phép kích hoạt khi số tiền nộp khớp chính xác 100% phí kỳ đầu tiên."
      },
      {
        "term": "Mốc 21 Ngày Cân Nhắc Tính từ Ngày Bàn Giao (Delivery Date)",
        "def": "Thời hạn 21 ngày Free-Look luật định chỉ bắt đầu đếm khi hệ thống ghi nhận DELIVERY_DATE qua biên nhận điện tử e-ACK, không tính từ ngày phát hành (Issue Date). Nếu hủy hợp đồng trong 21 ngày: Hoàn 100% phí đã nộp trừ chi phí khám y tế; thu hồi 100% hoa hồng đại lý (Clawback)."
      }
    ],
    "actuary_notes": [
      "Từ góc độ Định phí & Quản trị Rủi ro, giai đoạn New Business là chốt chặn quan trọng nhất để bảo đảm chất lượng dữ liệu đầu vào.",
      "Tỷ lệ phí và số tiền bảo hiểm được tính toán tự động dựa trên ma trận tỷ lệ phí của Product Factory.",
      "Mọi trường hợp hồ sơ thỏa mãn tiêu chí chuẩn (tuổi, STBH trong hạn mức non-medical, câu trả lời y tế toàn bộ là 'Không') sẽ được động cơ định quy tắc Auto-UW chuyển thẳng sang luồng STP (Straight-Through Processing), giúp tối ưu hóa chi phí khai thác (Acquisition Expense).",
      "Ngược lại, nếu hủy hợp đồng trong thời hạn 21 ngày cân nhắc, toàn bộ dự phòng toán học chưa phát sinh, phí hoàn trả được hạch toán giảm trừ doanh thu phí thuần, và hoa hồng khai thác (FYC) đã tạm tính được thu hồi 100%."
    ],
    "op_notes": [
      "Về mặt Vận hành Hệ thống (Core Operations), màn hình New Business Worklist cho phép điều phối phân bổ công việc theo 2 cơ chế: Push (Hệ thống tự động phân bổ theo dung lượng và thẩm quyền của chuyên viên) và Pull (Chuyên viên tự nhận hồ sơ từ hàng đợi chung).",
      "Khi thực hiện lệnh Enforce, PA BS gọi giao dịch toàn cục 2PC để chuyển toàn bộ dữ liệu từ các bảng tạm New Business sang các bảng SOR bất biến (t_pol_policy, t_pol_party).",
      "Tiến trình EOD Batch hàng đêm quét các hợp đồng có trạng thái Issued nhưng chưa có Delivery Date quá 30 ngày để kích hoạt cảnh báo nhắc nhở đại lý hoàn tất bàn giao."
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
        "id": "SOP-NB-01",
        "title": "Initial Proposal Registration (Reception) & Agent Channel Binding",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-01",
        "pdf_page": 45,
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
        "validation_rules": [
          {
            "ruleId": "VAL-NB-001",
            "ruleName": "Agent License & Active Status Validation",
            "errorCode": "ERR_NB_AGENT_INVALID",
            "severity": "HARD_STOP",
            "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
            "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
            "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-007",
            "ruleName": "First Premium Minimum Tolerance Match",
            "errorCode": "WARN_NB_PREM_SHORTFALL",
            "severity": "SOFT_WARNING",
            "condition": "Deposited initial premium must equal exact modal gross premium (tolerance 0 VND underpayment).",
            "systemAction": "Parks payment in Suspense Account (`T_SUSPENSE_ACCT`); holds issuance.",
            "actuarialBasis": "No policy contract can form without complete consideration received by insurer.",
            "pdfPage": 359
          },
          {
            "ruleId": "VAL-ISS-001",
            "ruleName": "First Premium Receipt Allocation Before Enforce",
            "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
            "severity": "HARD_STOP",
            "condition": "Total validated suspense receipts allocated to proposal must exactly equal First Gross Modal Premium.",
            "systemAction": "Blocks commit to SOR `T_POLICY` table; proposal remains in `WAITING_FOR_ISSUE`.",
            "actuarialBasis": "Statutory premium accounting: coverage commencement triggers immediate unearned premium reserve (UPR).",
            "pdfPage": 21
          }
        ]
      },
      {
        "code": "SOP-NB-02",
        "id": "SOP-NB-02",
        "title": "Data Entry - Policyholder (Individual/Organization) & KYC Capture",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-02",
        "pdf_page": 58,
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
        "validation_rules": [
          {
            "ruleId": "VAL-NB-001",
            "ruleName": "Agent License & Active Status Validation",
            "errorCode": "ERR_NB_AGENT_INVALID",
            "severity": "HARD_STOP",
            "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
            "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
            "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-002",
            "ruleName": "Beneficiary Share Percentage 100% Balance",
            "errorCode": "ERR_NB_BENEFICIARY_SUM_MISMATCH",
            "severity": "HARD_STOP",
            "condition": "The sum of share percentages for all beneficiaries within the same priority sequence must equal exactly 100.00%.",
            "systemAction": "Blocks proposal submission and generates proposal issue.",
            "actuarialBasis": "Ensures unequivocal claims disbursement without inter-pleader estate litigation risk.",
            "pdfPage": 137
          }
        ]
      },
      {
        "code": "SOP-NB-03",
        "id": "SOP-NB-03",
        "title": "Data Entry - Life Assured Setup & Insurable Interest Relationship",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-03",
        "pdf_page": 72,
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
        "validation_rules": [
          {
            "ruleId": "VAL-NB-003",
            "ruleName": "Trust Nomination Relationship Restriction",
            "errorCode": "ERR_NB_INVALID_TRUST_RELATION",
            "severity": "HARD_STOP",
            "condition": "For Trust Nomination (Sec 49L / Sec 73 CLPA), relationship is mandatory and strictly restricted to Spouse or Child.",
            "systemAction": "Validation fails on Beneficiary screen; blocks proposal validation.",
            "actuarialBasis": "Legal bankruptcy protection compliance: trust policies create an immediate statutory trust in favor of immediate family.",
            "pdfPage": 485
          },
          {
            "ruleId": "VAL-NB-004",
            "ruleName": "Proposer Mandatory Annual Income Check",
            "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
            "severity": "HARD_STOP",
            "condition": "Proposer Annual Income is mandatory (> 0) and Total Sum Assured <= Maximum Income Multiple (e.g. 25x for Age <= 35).",
            "systemAction": "Generates Underwriting Financial Requirement if multiple exceeded.",
            "actuarialBasis": "Anti-Money Laundering (AML) and anti-selection: ensures coverage is proportionate to economic human life value.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-005",
            "ruleName": "Juvenile Statutory Sum Assured Ceiling",
            "errorCode": "ERR_NB_JUVENILE_SA_LIMIT",
            "severity": "HARD_STOP",
            "condition": "For Life Assured age < 4 years, Death Sum Assured capped at statutory limit (e.g. $20,000 / 500,000,000 VND).",
            "systemAction": "Auto-trims Sum Assured to statutory limit or blocks quote calculation.",
            "actuarialBasis": "Moral hazard prevention and statutory child welfare regulation compliance.",
            "pdfPage": 55
          }
        ]
      },
      {
        "code": "SOP-NB-04",
        "id": "SOP-NB-04",
        "title": "Product & Rider Information Entry (Endowment Plan + Rider Compatibility)",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-04",
        "pdf_page": 88,
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
            "required": "No",
            "desc": "Eligible supplementary benefits"
          },
          {
            "name": "Rider Sum Assured",
            "type": "Currency",
            "required": "No",
            "desc": "Subject to maximum ratio against main plan SA"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-NB-001",
            "ruleName": "Agent License & Active Status Validation",
            "errorCode": "ERR_NB_AGENT_INVALID",
            "severity": "HARD_STOP",
            "condition": "Agent code must exist, hold status = 'ACTIVE', possess valid MOF agency license for product line, and not be suspended.",
            "systemAction": "Generates Underwriting Hard Issue; freezes proposal progression to Underwriting.",
            "actuarialBasis": "Statutory compliance (Insurance Business Law): sales commissions cannot be provisioned or paid to unlicensed intermediaries.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-006",
            "ruleName": "Declaration Form Mandatory Response Completeness",
            "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
            "severity": "HARD_STOP",
            "condition": "Every question in the product declaration form must have an affirmative ('Yes') or negative ('No') recorded.",
            "systemAction": "Blocks transition from Data Entry to Underwriting queue.",
            "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation for future contestability assessment.",
            "pdfPage": 61
          }
        ]
      },
      {
        "code": "SOP-NB-05",
        "id": "SOP-NB-05",
        "title": "Nomination & Beneficiaries Entry (Percentages Totaling 100%)",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-05",
        "pdf_page": 102,
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
            "required": "No",
            "desc": "Mandatory if beneficiary age < 18"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-NB-002",
            "ruleName": "Beneficiary Share Percentage 100% Balance",
            "errorCode": "ERR_NB_BENEFICIARY_SUM_MISMATCH",
            "severity": "HARD_STOP",
            "condition": "The sum of share percentages for all beneficiaries within the same priority sequence must equal exactly 100.00%.",
            "systemAction": "Blocks proposal submission and generates proposal issue.",
            "actuarialBasis": "Ensures unequivocal claims disbursement without inter-pleader estate litigation risk.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-003",
            "ruleName": "Trust Nomination Relationship Restriction",
            "errorCode": "ERR_NB_INVALID_TRUST_RELATION",
            "severity": "HARD_STOP",
            "condition": "For Trust Nomination (Sec 49L / Sec 73 CLPA), relationship is mandatory and strictly restricted to Spouse or Child.",
            "systemAction": "Validation fails on Beneficiary screen; blocks proposal validation.",
            "actuarialBasis": "Legal bankruptcy protection compliance: trust policies create an immediate statutory trust in favor of immediate family.",
            "pdfPage": 485
          }
        ]
      },
      {
        "code": "SOP-NB-06",
        "id": "SOP-NB-06",
        "title": "Declaration Questionnaire, Health History & Underwriting Rules Evaluation",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-06",
        "pdf_page": 118,
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
            "required": "No",
            "desc": "Required if answer is Yes"
          },
          {
            "name": "Underwriting Rule Result",
            "type": "System Derived",
            "required": "No",
            "desc": "STP_PASS, UW_REFERRAL, HARD_DECLINE"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-NB-004",
            "ruleName": "Proposer Mandatory Annual Income Check",
            "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
            "severity": "HARD_STOP",
            "condition": "Proposer Annual Income is mandatory (> 0) and Total Sum Assured <= Maximum Income Multiple (e.g. 25x for Age <= 35).",
            "systemAction": "Generates Underwriting Financial Requirement if multiple exceeded.",
            "actuarialBasis": "Anti-Money Laundering (AML) and anti-selection: ensures coverage is proportionate to economic human life value.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-NB-006",
            "ruleName": "Declaration Form Mandatory Response Completeness",
            "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
            "severity": "HARD_STOP",
            "condition": "Every question in the product declaration form must have an affirmative ('Yes') or negative ('No') recorded.",
            "systemAction": "Blocks transition from Data Entry to Underwriting queue.",
            "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation for future contestability assessment.",
            "pdfPage": 61
          }
        ]
      },
      {
        "code": "SOP-NB-07",
        "id": "SOP-NB-07",
        "title": "Initial Premium Collection & Policy Enforcement (Issuing Inforce Policy)",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-07",
        "pdf_page": 135,
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
            "required": "No",
            "desc": "Official immutable policy identifier in SOR"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-NB-007",
            "ruleName": "First Premium Minimum Tolerance Match",
            "errorCode": "WARN_NB_PREM_SHORTFALL",
            "severity": "SOFT_WARNING",
            "condition": "Deposited initial premium must equal exact modal gross premium (tolerance 0 VND underpayment).",
            "systemAction": "Parks payment in Suspense Account (`T_SUSPENSE_ACCT`); holds issuance.",
            "actuarialBasis": "No policy contract can form without complete consideration received by insurer.",
            "pdfPage": 359
          },
          {
            "ruleId": "VAL-ISS-001",
            "ruleName": "First Premium Receipt Allocation Before Enforce",
            "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
            "severity": "HARD_STOP",
            "condition": "Total validated suspense receipts allocated to proposal must exactly equal First Gross Modal Premium.",
            "systemAction": "Blocks commit to SOR `T_POLICY` table; proposal remains in `WAITING_FOR_ISSUE`.",
            "actuarialBasis": "Statutory premium accounting: coverage commencement triggers immediate unearned premium reserve (UPR).",
            "pdfPage": 21
          },
          {
            "ruleId": "VAL-ISS-002",
            "ruleName": "Contract Schedule & Table of Guaranteed Benefits Generation",
            "errorCode": "ERR_ISS_PDF_GENERATION_FAILED",
            "severity": "HARD_STOP",
            "condition": "Official policy schedule, benefit illustration, and general provisions PDF must compile with valid digital signature.",
            "systemAction": "Retries PDF compilation; alerts Operations supervisor if persistent.",
            "actuarialBasis": "Legal enforceability of contractual benefit schedules provided to policyholder.",
            "pdfPage": 35
          }
        ]
      },
      {
        "code": "SOP-NB-08",
        "id": "SOP-NB-08",
        "title": "Policy Delivery Confirmation (e-ACK) & Initializing Statutory 21-Day Free-Look Countdown",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-NB-08",
        "pdf_page": 88,
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
        "validation_rules": [
          {
            "ruleId": "VAL-NB-005",
            "ruleName": "Juvenile Statutory Sum Assured Ceiling",
            "errorCode": "ERR_NB_JUVENILE_SA_LIMIT",
            "severity": "HARD_STOP",
            "condition": "For Life Assured age < 4 years, Death Sum Assured capped at statutory limit (e.g. $20,000 / 500,000,000 VND).",
            "systemAction": "Auto-trims Sum Assured to statutory limit or blocks quote calculation.",
            "actuarialBasis": "Moral hazard prevention and statutory child welfare regulation compliance.",
            "pdfPage": 55
          },
          {
            "ruleId": "VAL-ISS-002",
            "ruleName": "Contract Schedule & Table of Guaranteed Benefits Generation",
            "errorCode": "ERR_ISS_PDF_GENERATION_FAILED",
            "severity": "HARD_STOP",
            "condition": "Official policy schedule, benefit illustration, and general provisions PDF must compile with valid digital signature.",
            "systemAction": "Retries PDF compilation; alerts Operations supervisor if persistent.",
            "actuarialBasis": "Legal enforceability of contractual benefit schedules provided to policyholder.",
            "pdfPage": 35
          }
        ]
      }
    ],
    "sop_count": 8,
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
    "pdf_start_page": 32,
    "pdf_end_page": 140,
    "pdf_chapter": "Module 02: Gemini New Business User Guide (Pages 32-140)",
    "validation_rules": [
      {
        "ruleId": "VAL-NB-001",
        "ruleName": "Agent License & Active Status Validation",
        "errorCode": "ERR_NB_AGENT_INVALID",
        "severity": "HARD_STOP",
        "condition": "Servicing Agent must have ACTIVE status and valid regulatory product license on Proposal Registration Date.",
        "systemAction": "Chặn lưu màn hình tiếp nhận và không cấp mã Proposal No.",
        "actuarialBasis": "Tuân thủ Điều 82 Luật Kinh doanh Bảo hiểm và bảo đảm tính hợp lệ pháp lý của kênh phân phối.",
        "pdfPage": 137
      },
      {
        "ruleId": "VAL-NB-002",
        "ruleName": "Beneficiary Share Percentage 100% Balance",
        "errorCode": "ERR_NB_BENEFICIARY_SUM_MISMATCH",
        "severity": "HARD_STOP",
        "condition": "Sum of sharing percentages for all designated primary beneficiaries must equal strictly 100.00%.",
        "systemAction": "Chặn lưu thông tin người thụ hưởng và chặn phát hành Proposal Issue.",
        "actuarialBasis": "Tránh tranh chấp quyền thừa kế và bất định nghĩa vụ chi trả bồi thường khi phát sinh sự kiện bảo hiểm tử vong.",
        "pdfPage": 66
      },
      {
        "ruleId": "VAL-NB-003",
        "ruleName": "Trustee Requirement for Minor Beneficiaries",
        "errorCode": "ERR_NB_TRUSTEE_MISSING",
        "severity": "HARD_STOP",
        "condition": "If any primary beneficiary is under 18 years of age, a legal Trustee (Guardian) must be designated.",
        "systemAction": "Yêu cầu nhập thông tin Trustee trước khi cho phép xác nhận danh sách thụ hưởng.",
        "actuarialBasis": "Bảo đảm tính hợp pháp trong việc tiếp nhận quyền lợi bảo hiểm theo Bộ luật Dân sự.",
        "pdfPage": 56
      },
      {
        "ruleId": "VAL-NB-004",
        "ruleName": "Proposer Mandatory Annual Income & PEP AML Check",
        "errorCode": "ERR_NB_AML_PEP_BLOCK",
        "severity": "HARD_STOP",
        "condition": "Annual Income must be specified; if Politically Exposed Person (PEP) flag = YES, enhanced AML approval required.",
        "systemAction": "Chuyển trạng thái hồ sơ sang Pending Compliance Review.",
        "actuarialBasis": "Tuân thủ Luật Phòng chống rửa tiền và thẩm định khả năng tài chính duy trì đóng phí dài hạn.",
        "pdfPage": 95
      },
      {
        "ruleId": "VAL-NB-005",
        "ruleName": "Juvenile Statutory Sum Assured Ceiling",
        "errorCode": "ERR_NB_JUVENILE_SA_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "If Life Assured age < 14, total Sum Assured across all active policies cannot exceed regulatory ceiling (200,000,000 VND).",
        "systemAction": "Cắt giảm STBH về mức trần cho phép hoặc chặn phê duyệt tiếp nhận.",
        "actuarialBasis": "Ngăn ngừa rủi ro trục lợi bảo hiểm và tổn hại tính mạng đối với trẻ em vị thành niên.",
        "pdfPage": 74
      },
      {
        "ruleId": "VAL-NB-006",
        "ruleName": "Declaration Form Mandatory Response Completeness",
        "errorCode": "ERR_NB_DECLARATION_INCOMPLETE",
        "severity": "HARD_STOP",
        "condition": "100% of questions in the medical and lifestyle declaration questionnaire must be answered; NULL is prohibited.",
        "systemAction": "Chặn gửi hồ sơ sang bước thẩm định.",
        "actuarialBasis": "Bảo đảm nghĩa vụ cung cấp thông tin trung thực tuyệt đối (Utmost Good Faith) của khách hàng.",
        "pdfPage": 63
      },
      {
        "ruleId": "VAL-NB-007",
        "ruleName": "First Premium Minimum Tolerance Match",
        "errorCode": "ERR_NB_PREMIUM_UNDERPAID",
        "severity": "HARD_STOP",
        "condition": "Deposited initial premium must cover >= 100.0% of the calculated modal installment premium.",
        "systemAction": "Chặn lệnh Enforce phát hành hợp đồng; thông báo bổ sung phí thiếu.",
        "actuarialBasis": "Hợp đồng bảo hiểm chỉ có hiệu lực khi doanh nghiệp bảo hiểm đã nhận đủ phí bảo hiểm kỳ đầu tiên.",
        "pdfPage": 63
      },
      {
        "ruleId": "VAL-NB-008",
        "ruleName": "Rider Sum Assured Bound by Base Plan SA",
        "errorCode": "ERR_NB_RIDER_SA_OVERFLOW",
        "severity": "HARD_STOP",
        "condition": "Rider Sum Assured must be <= Parent Base Plan Sum Assured (Sum of SA not greater than Parent SA = Yes).",
        "systemAction": "Chặn gắn rider và thông báo điều chỉnh STBH sản phẩm bổ trợ.",
        "actuarialBasis": "Sản phẩm bổ trợ đóng vai trò gia tăng bảo vệ, không được vượt quá nghĩa vụ bảo hiểm cốt lõi.",
        "pdfPage": 138
      },
      {
        "ruleId": "VAL-NB-009",
        "ruleName": "Overlapping Active Proposal Duplicate Check",
        "errorCode": "WARN_NB_OVERLAPPING_COVERAGE",
        "severity": "WARNING",
        "condition": "System checks existing active proposals for the same Life Assured; overlapping coverage triggers underwriting referral.",
        "systemAction": "Cảnh báo và tự động chuyển hồ sơ sang luồng thẩm định tài chính thủ công.",
        "actuarialBasis": "Kiểm soát rủi ro bảo hiểm vượt mức thu nhập (Over-insurance) và tích lũy rủi ro tài chính cá nhân.",
        "pdfPage": 139
      },
      {
        "ruleId": "VAL-NB-010",
        "ruleName": "Bancassurance 60-Day Loan Drawdown Prohibition",
        "errorCode": "ERR_NB_BANCA_60DAY_VIOLATION",
        "severity": "HARD_STOP",
        "condition": "Under Circular 67/2023/TT-BTC, investment-linked insurance cannot be sold within 60 days before or after a bank loan disbursement.",
        "systemAction": "Từ chối tiếp nhận hồ sơ qua kênh ngân hàng.",
        "actuarialBasis": "Bảo vệ người vay vốn khỏi tình trạng bị ép buộc mua bảo hiểm để được giải ngân vốn vay.",
        "pdfPage": 45
      },
      {
        "ruleId": "VAL-NB-011",
        "ruleName": "Statutory 21-Day Free-Look Trigger from Delivery Date",
        "errorCode": "ERR_NB_FREELOOK_START_INVALID",
        "severity": "CRITICAL",
        "condition": "Statutory 21-day Free-Look countdown starts STRICTLY from DELIVERY_DATE (e-ACK timestamp), NOT Issue Date.",
        "systemAction": "Cập nhật trường FREELOOK_START_DATE = DELIVERY_DATE và FREELOOK_END_DATE = DELIVERY_DATE + 21 ngày.",
        "actuarialBasis": "Tuân thủ Điều 35 Luật Kinh doanh Bảo hiểm số 08/2022/QH15.",
        "pdfPage": 88
      },
      {
        "ruleId": "VAL-NB-012",
        "ruleName": "Free-Look Full Refund & Commission Clawback Integrity",
        "errorCode": "ERR_NB_FREELOOK_SETTLEMENT_MISMATCH",
        "severity": "HARD_STOP",
        "condition": "Refund = 100% Gross Premium - Incurred Medical Fees; 100% Agent First Year Commission (FYC) clawed back via GL.",
        "systemAction": "Tự động sinh bút toán đảo thu nhập phí và ghi nợ tài khoản công nợ đại lý.",
        "actuarialBasis": "Khôi phục nguyên trạng dòng tiền tài chính trước khi hợp đồng được phát hành.",
        "pdfPage": 88
      },
      {
        "ruleId": "VAL-NB-013",
        "ruleName": "Conditional Acceptance (LCA) Response Validity 30 Days",
        "errorCode": "ERR_NB_LCA_EXPIRED",
        "severity": "HARD_STOP",
        "condition": "Client signed consent for Counter-Offer (LCA) must be received within 30 calendar days of LCA dispatch.",
        "systemAction": "Tự động chuyển trạng thái hồ sơ sang Proposal Cancelled / Not Taken Up (NTU).",
        "actuarialBasis": "Tình trạng sức khỏe của người được bảo hiểm có thể biến đổi sau 30 ngày, vô hiệu hóa điều kiện định phí ban đầu.",
        "pdfPage": 140
      },
      {
        "ruleId": "VAL-NB-014",
        "ruleName": "Maker-Checker Data Verification Mandatory Separation",
        "errorCode": "ERR_NB_MAKER_CHECKER_COLLUSION",
        "severity": "HARD_STOP",
        "condition": "The user performing the Verification step must be strictly different from the user who entered the Data Entry.",
        "systemAction": "Chặn phê duyệt xác minh và yêu cầu phân công chuyên viên kiểm soát độc lập.",
        "actuarialBasis": "Nguyên tắc kiểm soát nội bộ 4 mắt (Four-Eyes Principle) phòng chống gian lận và sai lệch dữ liệu hợp đồng.",
        "pdfPage": 67
      }
    ],
    "validation_rules_count": 14,
    "lifecycle_stages": [
      {
        "stage": "01",
        "name": "Reception / Initial Registration",
        "status": "Waiting for Data Entry",
        "desc": "Ghi nhận kênh bán, đại lý phục vụ, thông tin sơ bộ và sinh mã Proposal No. / Policy No."
      },
      {
        "stage": "02",
        "name": "Data Entry & Party Capture",
        "status": "Data Entry in Progress",
        "desc": "Nhập liệu chi tiết Bên mua, NĐBH, Người nộp phí, Người thụ hưởng (100%), và Bảng câu hỏi y tế."
      },
      {
        "stage": "03",
        "name": "Maker-Checker Verification",
        "status": "Waiting for Verification",
        "desc": "Chuyên viên kiểm soát độc lập rà soát tính chính xác của dữ liệu nhập liệu và kiểm tra AML."
      },
      {
        "stage": "04",
        "name": "Underwriting Decision",
        "status": "Waiting for Underwriting",
        "desc": "Động cơ Auto-UW xử lý thẳng (STP) hoặc chuyển sang Bàn thẩm định thủ công đánh giá rủi ro lâm sàng."
      },
      {
        "stage": "05",
        "name": "First Premium Allocation",
        "status": "Pending Issue",
        "desc": "Khách hàng nộp phí đầu tiên, hệ thống đối soát tài khoản ảo và phân bổ treo tại Suspense GL 2211."
      },
      {
        "stage": "06",
        "name": "Enforce & Policy Issuance",
        "status": "Issued / Inforce",
        "desc": "Thực thi phát hành, chuyển dữ liệu sang SOR (t_pol_policy), xuất file hợp đồng điện tử e-Policy PDF."
      },
      {
        "stage": "07",
        "name": "Delivery & 21-Day Free-Look",
        "status": "Delivered",
        "desc": "Ghi nhận e-ACK Delivery Date và kích hoạt đếm ngược 21 ngày cân nhắc luật định."
      }
    ]
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
      {
        "term": "Thẩm Định Độc Lập Theo Cấp Quyền Lợi (Benefit-Level UW Independence)",
        "def": "Kiến trúc thẩm định của eBao Gemini cho phép thẩm định và đưa ra quyết định độc lập cho sản phẩm chính và từng sản phẩm bổ trợ (Riders). Sản phẩm chính có thể được chấp nhận mức phí chuẩn trong khi các Rider y tế, bệnh hiểm nghèo có thể bị tăng phí (Loading), loại trừ (Exclusion) hoặc từ chối (Decline)."
      },
      {
        "term": "Mô Hình Chấm Điểm Số Học Rủi Ro (Numerical Rating System)",
        "def": "Phương pháp định lượng rủi ro bắt đầu từ 100% tỷ lệ tử vong chuẩn (Base Mortality), cộng các điểm phạt rủi ro (Debits) do bệnh lý, tim mạch, nghề nghiệp, tiền sử gia đình và trừ điểm thưởng bảo vệ (Credits), tính ra Tỷ lệ Tăng phí Tử vong bổ sung (Extra Mortality % - EM)."
      },
      {
        "term": "Thư Thỏa Thuận Chấp Thuận Có Điều Kiện (Letter of Conditional Acceptance - LCA)",
        "def": "Chứng từ pháp lý phát hành khi hợp đồng được chấp nhận với điều kiện phi chuẩn (tăng phí, loại trừ, giảm STBH). Hợp đồng chuyển trạng thái PENDING_ACCEPTANCE với thời hạn phản hồi 30 ngày dương lịch chờ khách hàng ký xác nhận phụ lục và nộp phí chênh lệch."
      },
      {
        "term": "Tổng Hợp Rủi Ro Toàn Diện 360° (Customer Portfolio Risk Aggregation)",
        "def": "Tự động dồn tích toàn bộ Số tiền bảo hiểm có hiệu lực, đang chờ xử lý và đã mất hiệu lực của Người được bảo hiểm trên toàn bộ các hợp đồng trong hệ thống để đối soát hạn mức thẩm định tài chính và chỉ định cấp bậc khám y khoa (Medical Exam Tiers)."
      },
      {
        "term": "Quản Lý Viện Phí Khám & Quyết Toán Bệnh Viện (Medical Exam Billing)",
        "def": "Tự động sinh phiếu công nợ phải trả (T_MED_BILLING) chi trả cho mạng lưới bệnh viện/phòng khám liên kết khi chỉ định kiểm tra y khoa, tích hợp cơ chế thu hồi chi phí khám nếu khách hàng hủy hợp đồng trong 21 ngày cân nhắc (Free-Look)."
      }
    ],
    "actuary_notes": [
      "Định phí sản phẩm và phương pháp trích lập dự phòng tuân thủ quy chuẩn IFRS 17 và Bộ Tài chính."
    ],
    "op_notes": [
      "Vận hành tuân thủ SLA và ma trận phân quyền DOA của Core PAS."
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
        "id": "SOP-UW-01",
        "title": "Underwriting Task Retrieval, Worklist Triage & Multi-Module Filtering",
        "role": "Underwriter (Junior / Senior / Chief)",
        "objective": "Retrieve, prioritize, and allocate pending underwriting cases across New Business, Customer Service (Alterations), and Claims referral pipelines based on task SLA, authority tier, and risk complexity.",
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
            "errorCode": "ROUTE_UW_MANUAL_QUEUE",
            "severity": "ROUTING",
            "condition": "Age <= 45 AND Sum Assured <= Non-Medical Limit AND 100% Clean Health Declaration AND Agent Status = ACTIVE.",
            "systemAction": "Bypasses manual queue if 100% pass; routes to Underwriting Worklist if any rule is triggered.",
            "actuarialBasis": "Filters standard low-risk mortality profiles for immediate auto-issuance while preserving underwriting capacity for complex risks.",
            "pdfPage": 7
          },
          {
            "ruleId": "VAL-UW-003",
            "ruleName": "Underwriter Authority Limit Worklist Boundary",
            "errorCode": "ERR_UW_EXCEEDS_AUTHORITY",
            "severity": "HARD_STOP",
            "condition": "Underwriters cannot retrieve or approve cases exceeding their maximum delegated Sum Assured and EM loading threshold.",
            "systemAction": "Displays case in 'View Only' mode or routes to superior's approval pool.",
            "actuarialBasis": "Prevents unauthorized corporate risk accumulation beyond underwriter competency tier.",
            "pdfPage": 8
          }
        ]
      },
      {
        "code": "SOP-UW-02",
        "id": "SOP-UW-02",
        "title": "Comprehensive Risk Estimation via 360° UW Worksheet & Risk Aggregation",
        "role": "Medical & Financial Underwriter",
        "objective": "Perform exhaustive multi-dimensional risk assessment reviewing customer lifetime risk aggregation, LIA medical codes, historical claims, and document images.",
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
            "errorCode": "ERR_NB_ANNUAL_INCOME_MANDATORY",
            "severity": "HARD_STOP",
            "condition": "Total Aggregated Life Sum Assured must be <= Maximum Income Multiple (e.g. 25x Annual Income for Age <= 35).",
            "systemAction": "Blocks standard approval; generates Financial Underwriting requirement (Audited Tax Returns).",
            "actuarialBasis": "Anti-selection and moral hazard prevention: ensures insurance coverage correlates with economic earning power.",
            "pdfPage": 137
          },
          {
            "ruleId": "VAL-UW-002",
            "ruleName": "Medical Requirement Completeness Prerequisite",
            "errorCode": "ERR_UW_PENDING_REQUIREMENTS",
            "severity": "HARD_STOP",
            "condition": "Underwriter cannot issue final approval while outstanding medical requirements remain unfulfilled.",
            "systemAction": "Disables 'Approve' button on Decision tab.",
            "actuarialBasis": "Clinical risk integrity: policy cannot bind insurer without verified medical documentation.",
            "pdfPage": 337
          }
        ]
      },
      {
        "code": "SOP-UW-03",
        "id": "SOP-UW-03",
        "title": "Medical & Non-Medical Requirement Issuance, Document Tracking & Clinic Billing",
        "role": "Underwriting Support Officer / Medical Underwriter",
        "objective": "Generate clinical medical exam requirements, dispatch attending physician statement (APS) requests, track document receipt completeness, and settle partner clinic examination invoices.",
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
            "required": "No",
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
            "errorCode": "ERR_NB_INCOMPLETE_DECLARATION",
            "severity": "HARD_STOP",
            "condition": "Every question in the health declaration form must have a recorded answer; positive answers auto-generate requirements.",
            "systemAction": "Blocks proposal advancement until all clinical declaration items are resolved.",
            "actuarialBasis": "Duty of utmost good faith (Uberrimae Fidei) documentation required to legally defend future policy contestability.",
            "pdfPage": 61
          },
          {
            "ruleId": "VAL-FL-003",
            "ruleName": "Medical Examination Cost Recovery on Free-Look",
            "errorCode": "ERR_FL_CLAWBACK_EXECUTION",
            "severity": "HARD_STOP",
            "condition": "All approved medical clinic fees recorded in T_MED_BILLING are deductible from premium refund if customer cancels in Free-Look.",
            "systemAction": "Automatically deducts accumulated medical billing fees from Free-Look refund voucher.",
            "actuarialBasis": "Statutory non-forfeiture law: insurer has the right to deduct actual incurred clinical examination costs from refund.",
            "pdfPage": 483
          }
        ]
      },
      {
        "code": "SOP-UW-04",
        "id": "SOP-UW-04",
        "title": "Benefit-Level Underwriting Decisioning, Numerical Rating & Extra Mortality Loading",
        "role": "Underwriting Specialist / Chief Underwriter",
        "objective": "Formulate granular underwriting decisions evaluating the main life plan and each attached rider independently, applying numerical mortality ratings, flat extra loadings, or exclusion clauses.",
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
            "required": "No",
            "desc": "Extra mortality debit (+25% to +300%)."
          },
          {
            "name": "Flat Loading (per mille)",
            "type": "Numeric ($)",
            "required": "No",
            "desc": "Flat cash addition per $1,000 Sum Assured."
          },
          {
            "name": "Flat Loading Duration",
            "type": "Select",
            "required": "No",
            "desc": "Entire Policy Term or Temporary (1 to 10 Years)."
          },
          {
            "name": "Exclusion Clause Code",
            "type": "Search Select",
            "required": "No",
            "desc": "Standard exclusion clause from master registry."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-UW-005",
            "ruleName": "Benefit-Level Decision Independence",
            "errorCode": "INFO_UW_BENEFIT_LEVEL_DECISION",
            "severity": "ROUTING",
            "condition": "Underwriting decisions must be stored and versioned at individual benefit level in T_POLICY_BENEFIT.",
            "systemAction": "Updates T_POLICY_BENEFIT.UW_DECISION individually for each attached coverage item.",
            "actuarialBasis": "Enables maximum customer retention by approving viable base life risks even if specialized health riders are uninsurable.",
            "pdfPage": 193
          },
          {
            "ruleId": "VAL-PF-003",
            "ruleName": "Rider Sum Assured & Term Capping",
            "errorCode": "ERR_PF_RIDER_EXCEEDS_BASE",
            "severity": "HARD_STOP",
            "condition": "If Base Plan Sum Assured is reduced by underwriting decision, attached rider Sum Assured must be automatically trimmed to not exceed base plan SA.",
            "systemAction": "Trims rider SA to match reduced base plan ceiling.",
            "actuarialBasis": "Anti-selection control: supplementary riders cannot exceed principal life insurance liability.",
            "pdfPage": 55
          }
        ]
      },
      {
        "code": "SOP-UW-05",
        "id": "SOP-UW-05",
        "title": "Letter of Conditional Acceptance (LCA / Counter-Offer) Generation & Client Endorsement",
        "role": "Underwriting Case Manager / Agency Liaison",
        "objective": "Compile formal Letter of Conditional Acceptance (LCA / Counter-Offer) detailing ratings and exclusions, issue revised benefit illustrations, and process customer acceptance.",
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
            "errorCode": "ERR_UW_PENDING_CLIENT_ACCEPTANCE",
            "severity": "HARD_STOP",
            "condition": "Policy cannot be issued or inforced while an active Counter-Offer remains in unaccepted or unpaid state.",
            "systemAction": "Freezes policy status at PENDING_ACCEPTANCE; blocks commit to SOR T_POLICY.",
            "actuarialBasis": "Contract law: counter-offer constitutes rejection of original proposal; contract only forms upon customer agreement to revised terms.",
            "pdfPage": 144
          },
          {
            "ruleId": "VAL-ISS-001",
            "ruleName": "First Premium Receipt Allocation Before Enforce",
            "errorCode": "ERR_ISS_UNPAID_FIRST_PREMIUM",
            "severity": "HARD_STOP",
            "condition": "Total validated suspense receipts allocated to proposal must exactly equal the revised First Gross Modal Premium.",
            "systemAction": "Blocks policy issuance until additional loading premium is fully settled.",
            "actuarialBasis": "Consideration requirement: coverage cannot commence without full premium funding.",
            "pdfPage": 21
          }
        ]
      },
      {
        "code": "SOP-UW-06",
        "id": "SOP-UW-06",
        "title": "Delegation of Authority (DOA) Limit Validation & Auto-Escalation Workflow",
        "role": "Senior Underwriting Manager / Chief Underwriter",
        "objective": "Enforce institutional governance over maximum underwriter financial exposure, review cases escalated from junior staff, and coordinate reinsurance facultative referrals.",
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
            "errorCode": "ERR_UW_EXCEEDS_AUTHORITY",
            "severity": "HARD_STOP",
            "condition": "Proposed Sum Assured and EM loading must be within the Underwriter's signed authority matrix limit.",
            "systemAction": "Auto-escalates task to Chief Underwriter or Underwriting Committee pool.",
            "actuarialBasis": "Internal control segregation to avoid unauthorized systemic risk assumption.",
            "pdfPage": 8
          },
          {
            "ruleId": "VAL-PF-002",
            "ruleName": "Maturity Age Ceiling Enforcement",
            "errorCode": "ERR_PF_MAX_MATURITY_EXCEEDED",
            "severity": "HARD_STOP",
            "condition": "Underwriters cannot approve cases where entry age + term exceeds maximum product maturity age.",
            "systemAction": "Hard stop: blocks approval; forces term reduction or proposal decline.",
            "actuarialBasis": "Mortality tables terminate at maximum attained age; coverage beyond ceiling is mathematically unpriced.",
            "pdfPage": 27
          }
        ]
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
        "ruleName": "Straight-Through Processing (STP) Eligibility Gating",
        "errorCode": "ROUTE_UW_MANUAL_QUEUE",
        "severity": "ROUTING",
        "condition": "Age <= 45 AND Sum Assured <= Non-Medical Limit AND 100% Negative Health Declaration AND Agent Compliance = 'PASS'.",
        "systemAction": "Routes task to Senior Underwriter queue with rule discrepancy triggers.",
        "actuarialBasis": "Filters out elevated mortality/morbidity risks for human clinical judgment.",
        "pdfPage": 7
      },
      {
        "ruleId": "VAL-UW-002",
        "ruleName": "Medical Requirement Completeness Hard Stop",
        "errorCode": "ERR_UW_PENDING_REQUIREMENTS",
        "severity": "HARD_STOP",
        "condition": "All generated medical and non-medical requirements must have Completeness IND = 'Y' or Waived IND = 'Y'.",
        "systemAction": "Disables 'Approve' and 'Issue Policy' buttons on Underwriting Workbench.",
        "actuarialBasis": "Prevents legally binding policy issuance without verified clinical health parameters.",
        "pdfPage": 337
      },
      {
        "ruleId": "VAL-UW-003",
        "ruleName": "Underwriter Financial & Rating Authority Delegation",
        "errorCode": "ERR_UW_EXCEEDS_AUTHORITY",
        "severity": "HARD_STOP",
        "condition": "Proposed Sum Assured and EM loading must be within the Underwriter's signed authority matrix limit.",
        "systemAction": "Auto-escalates task to Chief Underwriter or Underwriting Committee pool.",
        "actuarialBasis": "Internal control segregation to avoid unauthorized systemic risk assumption.",
        "pdfPage": 8
      },
      {
        "ruleId": "VAL-UW-004",
        "ruleName": "Counter-Offer Acceptance & Premium Adjustment",
        "errorCode": "ERR_UW_PENDING_CLIENT_ACCEPTANCE",
        "severity": "HARD_STOP",
        "condition": "If rating applied (Loading > 0 or Exclusion), client signed acceptance and revised premium paid before policy can issue.",
        "systemAction": "Freezes policy status at `PENDING_ACCEPTANCE` with 30-day offer expiration timer.",
        "actuarialBasis": "Contract law: counter-offer terminates original proposal; new contract forms only upon mutual agreement.",
        "pdfPage": 144
      },
      {
        "ruleId": "VAL-UW-005",
        "ruleName": "Benefit-Level Decision Independence",
        "errorCode": "INFO_UW_BENEFIT_LEVEL_DECISION",
        "severity": "ROUTING",
        "condition": "Underwriting decisions are evaluated at individual benefit level: main plan and each rider evaluated independently.",
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
    "title": "Mod 04: Customer Service & Policy Alterations",
    "subtitle": "CS Workbench, 30 Policy Alteration Items, Mid-Term Rider Attachment, Policy Loans, RPU & Reinstatement",
    "icon": "refresh",
    "badge": "Policy Maintenance",
    "page_range": "Pages 196 - 303 & 445 - 517",
    "summary": "Phân hệ Dịch vụ Khách hàng và Bảo trì Hợp đồng (Customer Service & Policy Alterations - CS APP). Quản lý toàn diện 30 nghiệp vụ thay đổi hợp đồng (Alteration Items) từ phi tài chính (đổi người thụ hưởng, chuyển quyền sở hữu, đổi địa chỉ) đến tài chính phức tạp (vay hợp đồng tối đa 80% CSV, hủy hợp đồng nhận giá trị giải ước, chuyển đổi bảo hiểm giảm RPU, khôi phục hiệu lực Reinstatement, và gắn thêm sản phẩm bổ trợ giữa kỳ Mid-Term Rider Attachment tính phí ngắn hạn Pro-Rata). Vận hành trên bàn làm việc CS Workbench theo chu trình 5 bước nghiêm ngặt: Đăng ký tiếp nhận (Registration) -> Nhập liệu (Application Entry) -> Thẩm định rủi ro tại cấp quyền lợi (Benefit-Level UW) -> Phê duyệt thẩm quyền (Approval) -> Thu/chi tài chính và Đồng bộ hiệu lực lên SOR (Inforce).",
    "mermaid_workflow": "graph TD\n    Inforce[\"In-force Policy Record\"] --> CSReg[\"Register CS Application\"]\n    CSReg --> CSType{\"Alteration Category\"}\n    CSType -- Non-Financial --> NonFin[\"Change Address / Beneficiary / Payee\"]\n    CSType -- Financial Alteration --> FinAlt[\"Change SA / Add Rider / Change Plan\"]\n    CSType -- Cash Extraction --> Cash[\"Full Surrender / Partial Withdrawal / Policy Loan\"]\n    CSType -- Non-Forfeiture --> NonForfeit[\"Convert to RPU / ETA / Trigger APL\"]\n    FinAlt --> CSUW{\"Risk Increase?\"}\n    CSUW -- Yes --> UWConfirm[\"Underwriting Approval (Module 03)\"]\n    CSUW -- No --> CSApprove[\"CS Validation & Quotation Engine\"]\n    UWConfirm --> CSApprove\n    NonFin --> CSApprove\n    Cash --> CSApprove\n    NonForfeit --> CSApprove\n    CSApprove --> CSExec[\"Apply Policy Endorsement & Update SOR\"]",
    "core_concepts": [
      {
        "term": "Chu trình 5 Bước Thực thi Thay đổi Hợp đồng",
        "def": "Đăng ký tiếp nhận (Registration) -> Nhập liệu thay đổi (Entry) -> Thẩm định rủi ro (Auto/Manual UW) -> Phê duyệt thẩm quyền (CS Approval) -> Khớp thu/chi tài chính & Đồng bộ SOR (Inforce)."
      },
      {
        "term": "Danh mục Chuẩn 30 Nghiệp vụ Thay đổi (30 Alteration Items)",
        "def": "Phân định rõ ràng giữa nhóm Tài chính (Financial Impact = Yes như Vay, Hủy, Giảm STBH, RPU, Gắn Rider) và nhóm Phi tài chính (Financial Impact = No như Đổi người thụ hưởng, Đổi thông tin liên lạc, Đổi hình thức nhận quyền lợi)."
      },
      {
        "term": "Thẩm định Rủi ro Độc lập Cấp Quyền lợi (Benefit-Level UW for CS)",
        "def": "Các thay đổi làm tăng rủi ro (Tăng STBH, Gắn Rider, Đổi nghề nghiệp sang nhóm nguy hiểm, Đổi nhóm sức khỏe) bắt buộc kích hoạt phân luồng sang Underwriting Workbench để thẩm định riêng quyền lợi đó mà không ảnh hưởng HĐ chính."
      },
      {
        "term": "Gắn Rider Giữa Kỳ & Phí Ngắn Hạn Pro-Rata",
        "def": "Cho phép chọn Hiệu lực ngay (tính phí ngắn hạn Pro-Rata Short Premium từ ngày hiệu lực đến ngày đến hạn đóng phí PTD tiếp theo) hoặc Hiệu lực vào Kỳ đóng phí kế tiếp (phí ngắn hạn = 0 VND)."
      },
      {
        "term": "Cơ chế Vay Hợp đồng & Cấn trừ Nợ (Policy Loan & Debt Offset)",
        "def": "Hạn mức vay tối đa 80% Giá trị hoàn lại ròng (Net CSV = CSV + Bảo tức tích lũy - Nợ gốc và lãi vay hiện tại). Lãi suất vay 6.5%/năm tính gộp hàng ngày. Tự động cấn trừ toàn bộ nợ khi chi trả bồi thường hoặc hủy hợp đồng."
      },
      {
        "term": "Quyền chọn Phi Hủy bỏ Hiệu lực - Bảo hiểm Giảm (Reduced Paid-Up - RPU)",
        "def": "Sử dụng toàn bộ Giá trị hoàn lại ròng tại thời điểm yêu cầu làm phí đơn thuần (Single Net Premium) để mua một Hợp đồng cùng loại với Số tiền bảo hiểm giảm tương ứng; chấm dứt nghĩa vụ đóng phí tương lai."
      },
      {
        "term": "Khôi phục Hiệu lực Hợp đồng trong 24 Tháng (Policy Reinstatement)",
        "def": "Cho phép khôi phục hợp đồng mất hiệu lực (Lapsed) trong vòng 24 tháng; nộp Giấy bảo đảm sức khỏe (Health Warranty), đóng toàn bộ phí chậm nộp kèm lãi phạt, và tái kích hoạt điều khoản loại trừ tự tử 2 năm (Suicide Clause Reset)."
      }
    ],
    "actuary_notes": [
      "Từ góc độ Định phí & Quản trị Quỹ dự phòng, các nghiệp vụ thay đổi hợp đồng có ảnh hưởng tài chính đòi hỏi hệ thống phải tính toán lại chính xác dự phòng toán học và dòng tiền tương lai.",
      "Khi thực hiện RPU, công thức quy đổi tuân thủ nguyên lý cân bằng actuarial: Net_CSV = Reduced_SA * A_{x+t:n-t|}, trong đó mọi sản phẩm bổ trợ gắn kèm đều bị chấm dứt hiệu lực vì RPU không hỗ trợ đóng phí rider.",
      "Đối với nghiệp vụ gắn Rider giữa kỳ, công thức phí ngắn hạn là: Short_Premium = Annual_Rider_Premium * (Remaining_Days / 365), đảm bảo không phát sinh rủi ro bảo hiểm không có phí bảo trợ."
    ],
    "op_notes": [
      "Về mặt Vận hành Hệ thống, eBao Gemini quản lý trạng thái hợp đồng bằng cơ chế Khóa giao dịch (Policy Freezing Flag).",
      "Khi một hồ sơ CS hoặc Claim đang ở trạng thái Processing, toàn bộ hợp đồng sẽ bị khóa, ngăn chặn việc tạo thêm hồ sơ thay đổi trùng lặp.",
      "Mọi khoản chênh lệch phí phát sinh từ thay đổi hợp đồng đều sinh bản ghi thu/chi trong Collection/Refund Workbench và đồng bộ sang Module 07 GL Journal Entry trước khi chuyển trạng thái hợp đồng sang Inforce."
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
        "id": "SOP-CS-01",
        "title": "CS Worklist Search & Registering Inforce Policy Alterations",
        "role": "Customer Service Specialist",
        "objective": "Tiếp nhận yêu cầu thay đổi từ khách hàng, tra cứu hợp đồng có hiệu lực (Inforce) và đăng ký hồ sơ thay đổi (Application Registration) trên CS Workbench.",
        "pdf_page": 204,
        "prerequisites": [
          "Hợp đồng bảo hiểm đang ở trạng thái có hiệu lực (INFORCE) hoặc mất hiệu lực (LAPSED đối với nghiệp vụ Reinstatement).",
          "Hợp đồng không bị khóa bởi hồ sơ bồi thường (Claim Frozen) hoặc hồ sơ thay đổi khác đang xử lý (CS Frozen).",
          "Người dùng thuộc chi nhánh có thẩm quyền truy cập hợp đồng (Servicing Branch access)."
        ],
        "steps": [
          "1. From the main menu, navigate to Customer Service > Registration.",
          "2. In the Search Criteria, input Policy Number, Policyholder Name, or Identifier ID. Click Search.",
          "3. Verify that the policy status is INFORCE, Premium Paid-To-Date (PTD) is current, and no CS_FROZEN flag is active.",
          "4. In the Branch Received field, select the processing branch; select Touch Point (CS Counter, Mobile App, Agency Office).",
          "5. In the Policy Alteration Items section, select one or more items to be altered from the alphabetical catalog (A...Z).",
          "6. Click Submit. The system generates an Application Number (e.g. CS-2026-00412) and sets status to 'Pending Data Entry'.",
          "7. Click 'Go to Application Entry' to proceed to detail data capture."
        ],
        "fields_table": [
          {
            "name": "POLICY_NO",
            "type": "String",
            "required": "Yes",
            "desc": "Mã số hợp đồng bảo hiểm cần thay đổi"
          },
          {
            "name": "BRANCH_RECEIVED",
            "type": "String",
            "required": "Yes",
            "desc": "Chi nhánh tiếp nhận yêu cầu thay đổi"
          },
          {
            "name": "TOUCH_POINT",
            "type": "Enum",
            "required": "Yes",
            "desc": "Kênh tiếp nhận: COUNTER, PORTAL, MOBILE, CALL_CENTER"
          },
          {
            "name": "ALTERATION_ITEMS",
            "type": "Multi-Select",
            "required": "Yes",
            "desc": "Danh sách các nghiệp vụ thay đổi cần thực hiện"
          },
          {
            "name": "REQUEST_DATE",
            "type": "Date",
            "required": "Yes",
            "desc": "Ngày khách hàng nộp đơn yêu cầu thay đổi"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-01-A",
            "ruleName": "Không cho phép tạo hồ sơ thay đổi nếu hợp đồng đang bị khóa bởi tiến trình Claim hoặc hồ sơ CS khác.",
            "errorCode": "ERR_VAL_CS_01_A",
            "severity": "HARD_STOP",
            "condition": "Không cho phép tạo hồ sơ thay đổi nếu hợp đồng đang bị khóa bởi tiến trình Claim hoặc hồ sơ CS khác.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 204
          },
          {
            "ruleId": "VAL-CS-01-B",
            "ruleName": "Hợp đồng đã chấm dứt (TERMINATED) hoặc hủy (CANCELLED) không được phép đăng ký thay đổi, ngoại trừ Reinstatement cho LAPSED.",
            "errorCode": "ERR_VAL_CS_01_B",
            "severity": "HARD_STOP",
            "condition": "Hợp đồng đã chấm dứt (TERMINATED) hoặc hủy (CANCELLED) không được phép đăng ký thay đổi, ngoại trừ Reinstatement cho LAPSED.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 204
          }
        ]
      },
      {
        "code": "SOP-CS-02",
        "id": "SOP-CS-02",
        "title": "Non-Financial Alteration: Change of Beneficiary & Share Allocation",
        "role": "Customer Service Specialist",
        "objective": "Thực hiện cập nhật danh sách Người thụ hưởng, điều chỉnh tỷ lệ chia bảo hiểm bắt buộc tổng bằng 100%, và gán Người giám hộ cho người thụ hưởng dưới 18 tuổi.",
        "pdf_page": 220,
        "prerequisites": [
          "Đơn yêu cầu thay đổi người thụ hưởng có chữ ký xác nhận của Bên mua bảo hiểm.",
          "Bản sao CCCD/Giấy khai sinh hợp lệ của tất cả Người thụ hưởng mới.",
          "Hồ sơ CS đã được đăng ký thành công với hạng mục 'Nomination - Beneficiary'."
        ],
        "steps": [
          "1. From CS Work List, select the application and click Edit in the Application Entry section.",
          "2. Click on the 'Nomination - Beneficiary' tab. System displays the current list of primary and contingent beneficiaries.",
          "3. To modify existing allocations, adjust the Percentage Share column directly.",
          "4. To add a new beneficiary, click '+ Add Beneficiary'. Input Full Name, ID Type, ID Number, DOB, and Relationship with Insured.",
          "5. Verify that the sum of Percentage Share for all primary beneficiaries equals strictly 100.00%.",
          "6. If any primary beneficiary is younger than 18 years, the Trustee section becomes mandatory. Input Trustee Full Name and ID.",
          "7. Click Save. System performs AML/PEP screening against sanctions databases.",
          "8. Click 'Submit Application'. Since this is Non-Financial, system routes directly to CS Approval without Underwriting."
        ],
        "fields_table": [
          {
            "name": "BENEFICIARY_NAME",
            "type": "String",
            "required": "Yes",
            "desc": "Họ và tên đầy đủ của người thụ hưởng"
          },
          {
            "name": "RELATIONSHIP",
            "type": "Enum",
            "required": "Yes",
            "desc": "Mối quan hệ với NĐBH: SPOUSE, CHILD, PARENT, SIBLING, OTHER"
          },
          {
            "name": "SHARE_PERCENT",
            "type": "Decimal(5,2)",
            "required": "Yes",
            "desc": "Tỷ lệ hưởng quyền lợi bảo hiểm (Tổng = 100.00%)"
          },
          {
            "name": "BENEFICIARY_TYPE",
            "type": "Enum",
            "required": "Yes",
            "desc": "Loại thụ hưởng: PRIMARY (Chính), CONTINGENT (Kế thừa)"
          },
          {
            "name": "TRUSTEE_NAME",
            "type": "String",
            "required": "No",
            "desc": "Bắt buộc nhập nếu người thụ hưởng < 18 tuổi"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-02-A",
            "ruleName": "Tổng tỷ lệ chia của các người thụ hưởng chính bắt buộc phải bằng chính xác 100.00%.",
            "errorCode": "ERR_VAL_CS_02_A",
            "severity": "HARD_STOP",
            "condition": "Tổng tỷ lệ chia của các người thụ hưởng chính bắt buộc phải bằng chính xác 100.00%.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 220
          },
          {
            "ruleId": "VAL-CS-02-B",
            "ruleName": "Người thụ hưởng dưới 18 tuổi bắt buộc phải có thông tin Người giám hộ / Đại diện pháp luật (Trustee).",
            "errorCode": "ERR_VAL_CS_02_B",
            "severity": "HARD_STOP",
            "condition": "Người thụ hưởng dưới 18 tuổi bắt buộc phải có thông tin Người giám hộ / Đại diện pháp luật (Trustee).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 220
          }
        ]
      },
      {
        "code": "SOP-CS-03",
        "id": "SOP-CS-03",
        "title": "Full Policy Surrender & Cash Value Settlement with Debt Offsetting",
        "role": "CS Senior Officer / Cashier",
        "objective": "Tiếp nhận yêu cầu hủy hợp đồng trước hạn (Surrender), tính toán Giá trị hoàn lại tích lũy, cấn trừ nợ gốc và lãi vay hợp đồng, và lập lệnh chi trả tiền giải ước ròng.",
        "pdf_page": 232,
        "prerequisites": [
          "Hợp đồng đã có Giá trị hoàn lại (thường từ sau năm hợp đồng thứ 2 trở đi).",
          "Đơn yêu cầu chấm dứt hợp đồng kèm bản gốc bộ hợp đồng bảo hiểm hoặc cam kết thất lạc.",
          "Xác minh danh tính Bên mua bảo hiểm qua CCCD gắn chip hoặc eKYC sinh trắc học."
        ],
        "steps": [
          "1. From CS Work List, open the Surrender application. System retrieves policy data from SOR.",
          "2. Click 'Compute Surrender Value'. The Actuarial Valuation Engine calculates:",
          "   a. Guaranteed Cash Value (CSV) based on current Policy Duration and Paid-To-Date (PTD).",
          "   b. Accumulated Reversionary / Terminal Bonuses and Interest on dividends.",
          "   c. Outstanding Policy Loan Principal and Accrued Daily Loan Interest.",
          "   d. Any outstanding premium debt or administrative fees.",
          "3. System presents the Net Surrender Settlement Breakdown:",
          "   Net Payable = (Guaranteed CSV + Accrued Bonuses) - (Loan Principal + Accrued Interest + Debt).",
          "4. Select Disbursement Method: Direct Bank Transfer (IBAN/Account No) or Cash at Counter.",
          "5. Upload customer ID confirmation and signed surrender agreement.",
          "6. Click 'Submit for Approval'. If Net Payable > 100,000,000 VND, system routes to CS Director DOA.",
          "7. Upon Approval, system triggers PA BS to update Policy Status to 'SURRENDERED' and generates GL Journal Entry (Dr GL 4112 / Cr GL 1111)."
        ],
        "fields_table": [
          {
            "name": "GROSS_CSV_AMOUNT",
            "type": "Decimal",
            "required": "No",
            "desc": "Giá trị hoàn lại đảm bảo theo bảng biểu phí"
          },
          {
            "name": "BONUS_ACCUMULATED",
            "type": "Decimal",
            "required": "No",
            "desc": "Bảo tức tích lũy và lãi chia lũy kế đến ngày giải ước"
          },
          {
            "name": "LOAN_PRINCIPAL_DUE",
            "type": "Decimal",
            "required": "No",
            "desc": "Dư nợ gốc khoản vay hợp đồng cần cấn trừ"
          },
          {
            "name": "LOAN_INTEREST_DUE",
            "type": "Decimal",
            "required": "No",
            "desc": "Lãi vay tích lũy tính đến ngày phê duyệt giải ước"
          },
          {
            "name": "NET_PAYABLE_AMOUNT",
            "type": "Decimal",
            "required": "No",
            "desc": "Số tiền thực chi trả cho Bên mua bảo hiểm"
          },
          {
            "name": "BANK_ACCOUNT_NO",
            "type": "String",
            "required": "Yes",
            "desc": "Số tài khoản ngân hàng chính chủ của Bên mua BH"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-03-A",
            "ruleName": "Hợp đồng chưa đủ thời gian phát sinh giá trị hoàn lại (năm 1) sẽ nhận giá trị hoàn lại = 0 VND.",
            "errorCode": "ERR_VAL_CS_03_A",
            "severity": "HARD_STOP",
            "condition": "Hợp đồng chưa đủ thời gian phát sinh giá trị hoàn lại (năm 1) sẽ nhận giá trị hoàn lại = 0 VND.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 232
          },
          {
            "ruleId": "VAL-CS-03-B",
            "ruleName": "Nếu tổng nợ vay và lãi lớn hơn tổng giá trị hoàn lại, hệ thống từ chối chi trả và yêu cầu thu hồi nợ.",
            "errorCode": "ERR_VAL_CS_03_B",
            "severity": "HARD_STOP",
            "condition": "Nếu tổng nợ vay và lãi lớn hơn tổng giá trị hoàn lại, hệ thống từ chối chi trả và yêu cầu thu hồi nợ.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 232
          },
          {
            "ruleId": "VAL-CS-03-C",
            "ruleName": "Hợp đồng sau khi Surrender sẽ chấm dứt vĩnh viễn, không thể khôi phục (Reinstatement) dưới bất kỳ hình thức nào.",
            "errorCode": "ERR_VAL_CS_03_C",
            "severity": "HARD_STOP",
            "condition": "Hợp đồng sau khi Surrender sẽ chấm dứt vĩnh viễn, không thể khôi phục (Reinstatement) dưới bất kỳ hình thức nào.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 232
          }
        ]
      },
      {
        "code": "SOP-CS-04",
        "id": "SOP-CS-04",
        "title": "Applying for Policy Loan & Loan Repayment Operations",
        "role": "Customer Service Officer / Finance Cashier",
        "objective": "Xử lý yêu cầu tạm ứng từ giá trị hoàn lại (Vay theo hợp đồng tối đa 80% Net CSV) và ghi nhận thanh toán hoàn trả nợ gốc/lãi vay.",
        "pdf_page": 254,
        "prerequisites": [
          "Hợp đồng có trạng thái INFORCE và có Giá trị hoàn lại ròng > 5,000,000 VND.",
          "Hợp đồng không áp dụng quyền chọn RPU hoặc đang trong tình trạng nợ phí quá hạn.",
          "Bên mua bảo hiểm có đầy đủ năng lực hành vi dân sự."
        ],
        "steps": [
          "1. From CS Work List, open the 'Apply Policy Loan' application.",
          "2. System automatically queries SOR to determine Maximum Available Loan:",
          "   Max Loan = (Current CSV + Bonuses) * 80% - Existing Loan Principal - Accrued Interest.",
          "3. In the Requested Loan Amount field, enter the amount customer wishes to borrow (Min: 2,000,000 VND; Max: Max Available).",
          "4. Confirm Annual Loan Interest Rate (fixed at 6.5%/year, daily compounding interest basis).",
          "5. Select Disbursement Method (Bank Transfer) and input receiving bank account details.",
          "6. Click 'Compute Loan Schedule' to view projected interest accumulation table.",
          "7. Submit for CS Supervisor Approval. Upon approval, system creates a Disbursement Order in Module 07 GL.",
          "8. Policy state updates: LOAN_PRINCIPAL increases; daily batch accrues daily interest (Principal * 6.5% / 365)."
        ],
        "fields_table": [
          {
            "name": "MAX_LOAN_ALLOWED",
            "type": "Decimal",
            "required": "No",
            "desc": "Hạn mức tối đa được vay (80% Net CSV)"
          },
          {
            "name": "REQUESTED_LOAN_AMT",
            "type": "Decimal",
            "required": "Yes",
            "desc": "Số tiền khách hàng đề nghị vay"
          },
          {
            "name": "LOAN_INTEREST_RATE",
            "type": "Decimal(4,3)",
            "required": "No",
            "desc": "Lãi suất năm tính cho khoản vay (6.5%/năm)"
          },
          {
            "name": "PAYOUT_BANK_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã ngân hàng nhận tiền giải ngân"
          },
          {
            "name": "LOAN_START_DATE",
            "type": "Date",
            "required": "No",
            "desc": "Ngày bắt đầu tính lãi khoản vay"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-04-A",
            "ruleName": "Số tiền vay không được vượt quá 80% Giá trị hoàn lại ròng tại thời điểm xét duyệt.",
            "errorCode": "ERR_VAL_CS_04_A",
            "severity": "HARD_STOP",
            "condition": "Số tiền vay không được vượt quá 80% Giá trị hoàn lại ròng tại thời điểm xét duyệt.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 254
          },
          {
            "ruleId": "VAL-CS-04-B",
            "ruleName": "Mức vay tối thiểu là 2,000,000 VND trên mỗi giao dịch.",
            "errorCode": "ERR_VAL_CS_04_B",
            "severity": "HARD_STOP",
            "condition": "Mức vay tối thiểu là 2,000,000 VND trên mỗi giao dịch.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 254
          },
          {
            "ruleId": "VAL-CS-04-C",
            "ruleName": "Nếu tổng nợ gốc + lãi vay đạt ngưỡng 100% CSV, hợp đồng sẽ bị cảnh báo mất hiệu lực trong 30 ngày.",
            "errorCode": "ERR_VAL_CS_04_C",
            "severity": "HARD_STOP",
            "condition": "Nếu tổng nợ gốc + lãi vay đạt ngưỡng 100% CSV, hợp đồng sẽ bị cảnh báo mất hiệu lực trong 30 ngày.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 254
          }
        ]
      },
      {
        "code": "SOP-CS-05",
        "id": "SOP-CS-05",
        "title": "Non-Forfeiture Execution: Converting Policy to Reduced Paid-Up (RPU)",
        "role": "Actuarial Specialist / Senior CS Officer",
        "objective": "Xử lý chuyển đổi hợp đồng sang chế độ Bảo hiểm giảm (RPU): Chấm dứt nghĩa vụ đóng phí tương lai, sử dụng Net CSV làm phí đơn thuần để mua số tiền bảo hiểm mới tương ứng.",
        "pdf_page": 278,
        "prerequisites": [
          "Hợp đồng truyền thống có điều khoản phi hủy bỏ hiệu lực (Non-Forfeiture Provision).",
          "Hợp đồng đã đóng phí tối thiểu 2 hoặc 3 năm và có Giá trị hoàn lại ròng dương.",
          "Khách hàng đã được tư vấn đầy đủ về việc hủy bỏ toàn bộ quyền lợi bổ trợ khi áp dụng RPU."
        ],
        "steps": [
          "1. From CS Work List, select the 'Perform Reduced Paid Up' alteration application.",
          "2. Click 'Calculate RPU Conversion'. The Engine executes the actuarial equation:",
          "   a. Net CSV Available = (Current CSV - Outstanding Loans - Accrued Interest).",
          "   b. Reduced SA = Original SA * (Net CSV / Full Reserve at Duration t).",
          "3. System displays the new policy profile: Reduced Sum Assured, Future Premium = 0 VND, Maturity Date unchanged.",
          "4. All attached Supplementary Riders are flagged for automatic TERMINATION on RPU effective date.",
          "5. Present RPU Conversion Agreement to Policyholder for signed confirmation.",
          "6. Submit for Actuarial / CS Manager Approval.",
          "7. Upon Approval, PA BS updates contract status to 'PAID_UP', cancels recurring billing schedules, and synchronizes SOR."
        ],
        "fields_table": [
          {
            "name": "ORIGINAL_SA",
            "type": "Decimal",
            "required": "No",
            "desc": "Số tiền bảo hiểm gốc ban đầu của hợp đồng"
          },
          {
            "name": "NET_CSV_CONVERTED",
            "type": "Decimal",
            "required": "No",
            "desc": "Giá trị hoàn lại ròng được sử dụng để mua RPU"
          },
          {
            "name": "REDUCED_SA_NEW",
            "type": "Decimal",
            "required": "No",
            "desc": "Số tiền bảo hiểm giảm mới sau khi chuyển đổi RPU"
          },
          {
            "name": "NEW_MODAL_PREMIUM",
            "type": "Decimal",
            "required": "No",
            "desc": "Phí bảo hiểm định kỳ mới (= 0 VND)"
          },
          {
            "name": "RPU_EFFECTIVE_DATE",
            "type": "Date",
            "required": "Yes",
            "desc": "Ngày bắt đầu có hiệu lực của chế độ RPU"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-05-A",
            "ruleName": "Số tiền bảo hiểm giảm (Reduced SA) không được thấp hơn mức tối thiểu theo quy định (5,000,000 VND).",
            "errorCode": "ERR_VAL_CS_05_A",
            "severity": "HARD_STOP",
            "condition": "Số tiền bảo hiểm giảm (Reduced SA) không được thấp hơn mức tối thiểu theo quy định (5,000,000 VND).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 278
          },
          {
            "ruleId": "VAL-CS-05-B",
            "ruleName": "Mọi sản phẩm bổ trợ (Riders) bắt buộc bị chấm dứt hiệu lực đồng thời với ngày kích hoạt RPU.",
            "errorCode": "ERR_VAL_CS_05_B",
            "severity": "HARD_STOP",
            "condition": "Mọi sản phẩm bổ trợ (Riders) bắt buộc bị chấm dứt hiệu lực đồng thời với ngày kích hoạt RPU.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 278
          },
          {
            "ruleId": "VAL-CS-05-C",
            "ruleName": "Hợp đồng sau khi chuyển đổi RPU không được tiếp tục áp dụng chính sách vay hợp đồng.",
            "errorCode": "ERR_VAL_CS_05_C",
            "severity": "HARD_STOP",
            "condition": "Hợp đồng sau khi chuyển đổi RPU không được tiếp tục áp dụng chính sách vay hợp đồng.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 278
          }
        ]
      },
      {
        "code": "SOP-CS-06",
        "id": "SOP-CS-06",
        "title": "Adding Supplementary Rider Post-Inforce: Underwriting & Pro-Rata Short Premium",
        "role": "CS Specialist / Underwriting Liaison",
        "objective": "Gắn thêm sản phẩm bổ trợ vào hợp đồng đang có hiệu lực: Lựa chọn ngày hiệu lực, chuyển thẩm định y khoa và tính toán phí bảo hiểm ngắn hạn Pro-Rata đến kỳ đóng phí tiếp theo.",
        "pdf_page": 214,
        "prerequisites": [
          "Hợp đồng chính đang ở trạng thái INFORCE và không nợ phí bảo hiểm.",
          "Sản phẩm bổ trợ đề nghị gắn nằm trong danh mục tương thích của sản phẩm chính (Rider Compatibility Matrix).",
          "Tuổi hiện tại của Người được bảo hiểm nằm trong giới hạn tuổi tham gia của Rider."
        ],
        "steps": [
          "1. From CS Work List, open the 'Add Rider' application. System loads active policy details.",
          "2. Click '+ Add Rider'. Select Rider Plan (e.g. Accidental Death 24/7, 37 Critical Illness, Medical Expense).",
          "3. Input Rider Sum Assured. System validates: Rider SA <= Base Plan SA.",
          "4. Select Effective Date Option:",
          "   a. 'Effective Immediately': Coverage starts today; requires Pro-Rata Short Period Premium.",
          "   b. 'Effective on Next Due Date': Coverage starts on next Paid-To-Date; Pro-Rata Premium = 0 VND.",
          "5. If 'Effective Immediately' is selected, system calculates Pro-Rata Short Premium:",
          "   Short Premium = Annual Rider Premium * (Days from Effective Date to Next PTD / 365).",
          "6. System prompts medical questions. If any 'Yes' response or SA exceeds Non-medical limit, system flags 'UW Required = YES'.",
          "7. Submit application. If UW required, application routes to Underwriting Workbench (Benefit-Level UW).",
          "8. Underwriter issues Standard Accept or Counter-Offer (LCA with Loading/Exclusion).",
          "9. Client pays Pro-Rata Short Premium into Suspense. CS executes Inforce command to commit Rider into SOR."
        ],
        "fields_table": [
          {
            "name": "RIDER_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã sản phẩm bổ trợ được chọn gắn thêm"
          },
          {
            "name": "RIDER_SA",
            "type": "Decimal",
            "required": "Yes",
            "desc": "Số tiền bảo hiểm của sản phẩm bổ trợ"
          },
          {
            "name": "EFFECTIVE_TYPE",
            "type": "Enum",
            "required": "Yes",
            "desc": "Loại hiệu lực: IMMEDIATE (Ngay lập tức) hoặc NEXT_DUE (Kỳ tới)"
          },
          {
            "name": "PRO_RATA_SHORT_PREM",
            "type": "Decimal",
            "required": "No",
            "desc": "Phí ngắn hạn pro-rata phải thu bổ sung"
          },
          {
            "name": "NEXT_DUE_DATE",
            "type": "Date",
            "required": "No",
            "desc": "Ngày đến hạn đóng phí định kỳ tiếp theo của HĐ chính"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-06-A",
            "ruleName": "Số tiền bảo hiểm Rider không được vượt quá Số tiền bảo hiểm hợp đồng chính.",
            "errorCode": "ERR_VAL_CS_06_A",
            "severity": "HARD_STOP",
            "condition": "Số tiền bảo hiểm Rider không được vượt quá Số tiền bảo hiểm hợp đồng chính.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 214
          },
          {
            "ruleId": "VAL-CS-06-B",
            "ruleName": "Thời hạn bảo hiểm của Rider không được kéo dài vượt quá thời hạn hợp đồng chính.",
            "errorCode": "ERR_VAL_CS_06_B",
            "severity": "HARD_STOP",
            "condition": "Thời hạn bảo hiểm của Rider không được kéo dài vượt quá thời hạn hợp đồng chính.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 214
          },
          {
            "ruleId": "VAL-CS-06-C",
            "ruleName": "Phí bảo hiểm ngắn hạn Pro-Rata phải được thanh toán đủ 100% trước khi kích hoạt lệnh Inforce.",
            "errorCode": "ERR_VAL_CS_06_C",
            "severity": "HARD_STOP",
            "condition": "Phí bảo hiểm ngắn hạn Pro-Rata phải được thanh toán đủ 100% trước khi kích hoạt lệnh Inforce.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 214
          }
        ]
      },
      {
        "code": "SOP-CS-07",
        "id": "SOP-CS-07",
        "title": "Policy Reinstatement (Khôi Phục Hiệu Lực Hợp Đồng Sau Khi Lapsed)",
        "role": "CS Specialist / Underwriting Officer",
        "objective": "Tiếp nhận và xử lý yêu cầu khôi phục hiệu lực cho hợp đồng bảo hiểm đã bị mất hiệu lực (Lapsed) do quá hạn đóng phí 60 ngày trong thời hạn tối đa 24 tháng.",
        "pdf_page": 262,
        "prerequisites": [
          "Hợp đồng có trạng thái LAPSED và thời gian mất hiệu lực chưa quá 24 tháng kể từ ngày đến hạn đóng phí chưa nộp.",
          "Người được bảo hiểm còn sống tại thời điểm nộp đơn yêu cầu khôi phục.",
          "Bên mua bảo hiểm đồng ý thanh toán toàn bộ các khoản phí chậm nộp kèm lãi phạt tính theo quy định."
        ],
        "steps": [
          "1. From CS Work List, search for the LAPSED policy and select 'Reinstatement' alteration item.",
          "2. Click 'Compute Reinstatement Debt'. The Financial Engine calculates:",
          "   a. Total Overdue Modal Premiums from the unpaid due date to current date.",
          "   b. Reinstatement Late Interest (computed at statutory rate, e.g. 6.5%/year on unpaid premiums).",
          "   c. Any outstanding policy loan debt and interest.",
          "   Total Reinstatement Amount = Overdue Premiums + Late Interest + Due Debt.",
          "3. Customer completes the Declaration of Good Health (Health Warranty questionnaire).",
          "4. If health status has changed or lapsed duration > 6 months, system triggers mandatory Underwriting referral.",
          "5. Underwriter reviews risk: Standard Reinstatement or Reinstatement with Loading/Exclusion.",
          "6. Customer deposits the required Total Reinstatement Amount into the designated Virtual Account.",
          "7. CS Officer verifies funds in Suspense GL 2211 and clicks 'Enforce Reinstatement'.",
          "8. System updates Policy Status from LAPSED back to INFORCE, advances PTD, and resets the statutory 2-year Suicide Exclusion clause."
        ],
        "fields_table": [
          {
            "name": "LAPSED_DATE",
            "type": "Date",
            "required": "No",
            "desc": "Ngày hợp đồng chính thức bị mất hiệu lực (Grace 60 days cutoff)"
          },
          {
            "name": "OVERDUE_PREMIUM_TOTAL",
            "type": "Decimal",
            "required": "No",
            "desc": "Tổng các kỳ phí bảo hiểm chưa nộp"
          },
          {
            "name": "LATE_INTEREST_AMOUNT",
            "type": "Decimal",
            "required": "No",
            "desc": "Tiền lãi phạt chậm nộp phí (6.5%/năm)"
          },
          {
            "name": "TOTAL_REINSTATE_DUE",
            "type": "Decimal",
            "required": "No",
            "desc": "Tổng số tiền khách hàng phải nộp để khôi phục"
          },
          {
            "name": "HEALTH_WARRANTY_FLAG",
            "type": "Boolean",
            "required": "Yes",
            "desc": "Cam kết bảo đảm tình trạng sức khỏe không thay đổi"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-07-A",
            "ruleName": "Hợp đồng đã mất hiệu lực quá 24 tháng không được phép khôi phục; bắt buộc phải mua hợp đồng mới.",
            "errorCode": "ERR_VAL_CS_07_A",
            "severity": "HARD_STOP",
            "condition": "Hợp đồng đã mất hiệu lực quá 24 tháng không được phép khôi phục; bắt buộc phải mua hợp đồng mới.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 262
          },
          {
            "ruleId": "VAL-CS-07-B",
            "ruleName": "NĐBH đã tử vong hoặc thương tật toàn bộ vĩnh viễn trong thời gian Lapsed sẽ bị từ chối khôi phục tuyệt đối.",
            "errorCode": "ERR_VAL_CS_07_B",
            "severity": "HARD_STOP",
            "condition": "NĐBH đã tử vong hoặc thương tật toàn bộ vĩnh viễn trong thời gian Lapsed sẽ bị từ chối khôi phục tuyệt đối.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 262
          },
          {
            "ruleId": "VAL-CS-07-C",
            "ruleName": "Thời hạn loại trừ tự tử 2 năm (Suicide Exclusion) được tính lại từ ngày khôi phục hiệu lực hợp đồng thành công.",
            "errorCode": "ERR_VAL_CS_07_C",
            "severity": "HARD_STOP",
            "condition": "Thời hạn loại trừ tự tử 2 năm (Suicide Exclusion) được tính lại từ ngày khôi phục hiệu lực hợp đồng thành công.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 262
          }
        ]
      },
      {
        "code": "SOP-CS-08",
        "id": "SOP-CS-08",
        "title": "Policy Alteration Financial Settlement & PTD Synchronization",
        "role": "CS Supervisor / Finance Accountant",
        "objective": "Đối soát các khoản thu/chi tài chính phát sinh từ thay đổi hợp đồng, kiểm soát phê duyệt phân quyền (DOA) và thực hiện cam kết 2PC đồng bộ dữ liệu lên SOR.",
        "pdf_page": 270,
        "prerequisites": [
          "Hồ sơ thay đổi đã vượt qua bước thẩm định (nếu có) và thu đủ tiền chênh lệch (nếu là nghiệp vụ thu phí).",
          "Tài liệu chứng từ đính kèm (ID, e-sign, giấy khám) đã được hoàn tất 100%.",
          "Chuyên viên phê duyệt có thẩm quyền DOA tương ứng với giá trị giao dịch."
        ],
        "steps": [
          "1. From CS Work List, navigate to the 'Approval' queue. System lists applications waiting for sign-off.",
          "2. Review the Alteration Summary: Changed attributes, Pre-Image vs Post-Image, and Financial Impact.",
          "3. In the Collection / Refund section, verify transaction receipts:",
          "   a. For Collections: Ensure Virtual Account has confirmed 100% receipt in Suspense GL 2211.",
          "   b. For Refunds/Loans: Verify payee identity and validate bank account details against policyholder master.",
          "4. Click 'Approve Application'. If within user DOA limit, status becomes 'Approved'; if exceeding, escalates to next DOA level.",
          "5. In the Inforce section, click 'Execute Policy Alteration Inforce'.",
          "6. PA BS initiates Global 2PC Transaction: persists snapshot in t_pub_tx_undo_log, updates SOR tables (t_pol_policy, t_pol_rider), and clears policy freeze flag.",
          "7. System triggers Event Broadcast to RabbitMQ and generates Official Endorsement PDF Annex.",
          "8. Dispatch confirmation notification (SMS & Email) to customer."
        ],
        "fields_table": [
          {
            "name": "APP_NO",
            "type": "String",
            "required": "No",
            "desc": "Mã hồ sơ yêu cầu thay đổi (CS Application Number)"
          },
          {
            "name": "FINANCIAL_BALANCE",
            "type": "Decimal",
            "required": "No",
            "desc": "Số dư tài chính chênh lệch: Dương (Phải thu), Âm (Phải chi)"
          },
          {
            "name": "DOA_LEVEL_REQUIRED",
            "type": "String",
            "required": "No",
            "desc": "Cấp phân quyền phê duyệt yêu cầu (L1: <50M, L2: <200M, L3: >200M)"
          },
          {
            "name": "INFORCE_TIMESTAMP",
            "type": "Timestamp",
            "required": "No",
            "desc": "Thời điểm giao dịch chính thức có hiệu lực trên SOR"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CS-08-A",
            "ruleName": "Tuyệt đối không được kích hoạt lệnh Inforce nếu số tiền phải thu trong Suspense chưa đủ 100%.",
            "errorCode": "ERR_VAL_CS_08_A",
            "severity": "HARD_STOP",
            "condition": "Tuyệt đối không được kích hoạt lệnh Inforce nếu số tiền phải thu trong Suspense chưa đủ 100%.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 270
          },
          {
            "ruleId": "VAL-CS-08-B",
            "ruleName": "Người phê duyệt (Approver) phải khác với người nhập liệu (Maker) để đảm bảo nguyên tắc kiểm soát 4 mắt.",
            "errorCode": "ERR_VAL_CS_08_B",
            "severity": "HARD_STOP",
            "condition": "Người phê duyệt (Approver) phải khác với người nhập liệu (Maker) để đảm bảo nguyên tắc kiểm soát 4 mắt.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 270
          },
          {
            "ruleId": "VAL-CS-08-C",
            "ruleName": "Nếu giao dịch 2PC thất bại, toàn bộ trạng thái hợp đồng trên SOR phải được hoàn tác nguyên trạng.",
            "errorCode": "ERR_VAL_CS_08_C",
            "severity": "HARD_STOP",
            "condition": "Nếu giao dịch 2PC thất bại, toàn bộ trạng thái hợp đồng trên SOR phải được hoàn tác nguyên trạng.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 270
          }
        ]
      }
    ],
    "sop_count": 8,
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
    "pdf_start_page": 193,
    "pdf_end_page": 275,
    "pdf_chapter": "Module 04: Gemini Customer Service User Guide (Pages 193-275)",
    "validation_rules": [
      {
        "ruleId": "VAL-CS-001",
        "ruleName": "Frozen Policy Check",
        "errorCode": "ERR_CS_POLICY_FROZEN",
        "severity": "HARD_STOP",
        "condition": "Policy must not be locked by pending CS or Claim processing.",
        "systemAction": "Chặn tạo hồ sơ thay đổi mới.",
        "actuarialBasis": "Ngăn chặn ghi đè dữ liệu và sai lệch giá trị giải ước khi có nhiều giao dịch đồng thời.",
        "pdfPage": 200
      },
      {
        "ruleId": "VAL-CS-002",
        "ruleName": "Maximum Policy Loan Cap 80% Net CSV",
        "errorCode": "ERR_CS_LOAN_CAP_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "Requested Loan <= 80% * (Cash Value - Existing Debt).",
        "systemAction": "Từ chối duyệt khoản vay hoặc cắt giảm về mức trần cho phép.",
        "actuarialBasis": "Bảo vệ an toàn tài chính của quỹ, bảo đảm hợp đồng không bị thấu chi âm vốn.",
        "pdfPage": 254
      },
      {
        "ruleId": "VAL-CS-003",
        "ruleName": "Debt Deduction Priority on Surrender",
        "errorCode": "ERR_CS_DEBT_RECOVERY_FAILED",
        "severity": "HARD_STOP",
        "condition": "Outstanding Loan Principal + Accrued Interest must be deducted first before Net Payout.",
        "systemAction": "Tự động cấn trừ toàn bộ nợ vào giá trị giải ước ròng.",
        "actuarialBasis": "Ưu tiên thu hồi vốn vay bảo đảm khả năng thanh toán của doanh nghiệp bảo hiểm.",
        "pdfPage": 232
      },
      {
        "ruleId": "VAL-CS-004",
        "ruleName": "Beneficiary Allocation 100% Balance",
        "errorCode": "ERR_CS_BENEFICIARY_SUM_MISMATCH",
        "severity": "HARD_STOP",
        "condition": "Sum of primary beneficiary shares must equal strictly 100.00%.",
        "systemAction": "Chặn lưu danh sách người thụ hưởng.",
        "actuarialBasis": "Tránh tranh chấp quyền thừa kế và xác định rõ ràng trách nhiệm chi trả bảo hiểm.",
        "pdfPage": 220
      },
      {
        "ruleId": "VAL-CS-005",
        "ruleName": "Rider Termination on RPU Execution",
        "errorCode": "ERR_CS_RPU_RIDER_CONFLICT",
        "severity": "HARD_STOP",
        "condition": "All supplementary riders must be terminated upon conversion to Reduced Paid-Up.",
        "systemAction": "Tự động hủy các rider gắn kèm vào ngày hiệu lực RPU.",
        "actuarialBasis": "Chế độ RPU không còn dòng tiền đóng phí định kỳ để duy trì chi phí rủi ro của rider.",
        "pdfPage": 278
      },
      {
        "ruleId": "VAL-CS-006",
        "ruleName": "Rider Sum Assured Ceiling by Main Policy",
        "errorCode": "ERR_CS_RIDER_SA_OVERFLOW",
        "severity": "HARD_STOP",
        "condition": "Rider Sum Assured must be <= Base Policy Sum Assured.",
        "systemAction": "Chặn lưu thông tin sản phẩm bổ trợ.",
        "actuarialBasis": "Quyền lợi bổ trợ không thể vượt quá nghĩa vụ bảo vệ cốt lõi của hợp đồng chính.",
        "pdfPage": 214
      },
      {
        "ruleId": "VAL-CS-007",
        "ruleName": "Rider Term Boundary by Main Policy",
        "errorCode": "ERR_CS_RIDER_TERM_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "Rider Policy Term must expire on or before Base Policy Term.",
        "systemAction": "Tự động rút ngắn thời hạn rider về bằng thời hạn hợp đồng chính.",
        "actuarialBasis": "Sản phẩm bổ trợ phụ thuộc không thể tồn tại độc lập khi hợp đồng chính đã đáo hạn.",
        "pdfPage": 214
      },
      {
        "ruleId": "VAL-CS-008",
        "ruleName": "Reinstatement 24-Month Maximum Window",
        "errorCode": "ERR_CS_REINSTATE_EXPIRED",
        "severity": "HARD_STOP",
        "condition": "Elapsed time from Lapsed Date must be <= 24 calendar months.",
        "systemAction": "Từ chối tiếp nhận hồ sơ khôi phục; tư vấn khách hàng mua hợp đồng mới.",
        "actuarialBasis": "Sau 24 tháng, rủi ro tử vong và bệnh tật biến đổi lớn so với định phí ban đầu.",
        "pdfPage": 262
      },
      {
        "ruleId": "VAL-CS-009",
        "ruleName": "Suicide Exclusion Clause Reset",
        "errorCode": "INFO_CS_SUICIDE_RESET",
        "severity": "CRITICAL",
        "condition": "Statutory 2-year Suicide Exclusion period resets from the successful Reinstatement Date.",
        "systemAction": "Cập nhật trường SUICIDE_EXCLUSION_END_DATE trên bảng SOR t_pol_policy.",
        "actuarialBasis": "Phòng chống trục lợi bảo hiểm bằng hành vi tự sát sau khi khôi phục hợp đồng.",
        "pdfPage": 262
      },
      {
        "ruleId": "VAL-CS-010",
        "ruleName": "Pro-Rata Short Premium 100% Collection",
        "errorCode": "ERR_CS_SHORT_PREM_UNPAID",
        "severity": "HARD_STOP",
        "condition": "Calculated Pro-Rata Short Premium must be received in full before Inforce execution.",
        "systemAction": "Chặn kích hoạt lệnh Inforce cho sản phẩm bổ trợ gắn thêm giữa kỳ.",
        "actuarialBasis": "Không bảo vệ rủi ro khi doanh nghiệp chưa nhận đủ phí bảo hiểm tương ứng.",
        "pdfPage": 214
      },
      {
        "ruleId": "VAL-CS-011",
        "ruleName": "Insurable Interest on Policyholder Transfer",
        "errorCode": "ERR_CS_NO_INSURABLE_INTEREST",
        "severity": "HARD_STOP",
        "condition": "New Policyholder must have documented Insurable Interest with the Life Assured.",
        "systemAction": "Từ chối chuyển giao quyền sở hữu hợp đồng bảo hiểm.",
        "actuarialBasis": "Tuân thủ Điều 34 Luật Kinh doanh Bảo hiểm số 08/2022/QH15.",
        "pdfPage": 230
      },
      {
        "ruleId": "VAL-CS-012",
        "ruleName": "Non-Smoker Rate Reclassification Minimum 12 Months",
        "errorCode": "ERR_CS_SMOKER_TEST_FAILED",
        "severity": "HARD_STOP",
        "condition": "Smoker to Non-Smoker reclassification requires minimum 12 months non-smoking proof.",
        "systemAction": "Chuyển hồ sơ sang Bàn thẩm định y khoa đánh giá.",
        "actuarialBasis": "Bảo đảm giảm phí tương xứng với mức giảm rủi ro tử vong thực tế.",
        "pdfPage": 236
      },
      {
        "ruleId": "VAL-CS-013",
        "ruleName": "Occupational Loading Adjustment",
        "errorCode": "WARN_CS_OCCUPATION_RATING",
        "severity": "WARNING",
        "condition": "Change in occupation class triggers immediate premium adjustment or special exclusions.",
        "systemAction": "Tính toán phụ phí bổ sung và gửi thông báo nộp tiền cho khách hàng.",
        "actuarialBasis": "Tỷ lệ tử vong và tai nạn lao động biến thiên theo nhóm nghề nghiệp thực tế.",
        "pdfPage": 223
      },
      {
        "ruleId": "VAL-CS-014",
        "ruleName": "Delegation of Authority (DOA) Multi-Tier Sign-off",
        "errorCode": "ERR_CS_DOA_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "Approver must possess authority level matching or exceeding the transaction financial value.",
        "systemAction": "Tự động chuyển hồ sơ lên cấp phê duyệt cao hơn (Trưởng phòng/Giám đốc CS).",
        "actuarialBasis": "Kiểm soát rủi ro gian lận và thất thoát tài chính nội bộ doanh nghiệp bảo hiểm.",
        "pdfPage": 196
      },
      {
        "ruleId": "VAL-CS-015",
        "ruleName": "Free-Look 21-Day Statutory Window",
        "errorCode": "ERR_CS_FREELOOK_EXPIRED",
        "severity": "HARD_STOP",
        "condition": "Free-look cancellation valid only if requested within 21 calendar days of e-ACK delivery date.",
        "systemAction": "Chuyển giao dịch từ Free-Look sang Surrender.",
        "actuarialBasis": "Quyền hủy hợp đồng nhận lại 100% phí chỉ có hiệu lực trong 21 ngày cân nhắc luật định.",
        "pdfPage": 198
      },
      {
        "ruleId": "VAL-CS-016",
        "ruleName": "Mandatory Underwriting on Increase SA",
        "errorCode": "ERR_CS_INCREASE_SA_UW_REQUIRED",
        "severity": "HARD_STOP",
        "condition": "Any increase in Sum Assured triggers full medical and financial underwriting review.",
        "systemAction": "Khóa hợp đồng và tạo hồ sơ thẩm định trên Underwriting Workbench.",
        "actuarialBasis": "Kiểm soát rủi ro lựa chọn nghịch (Anti-selection) khi khách hàng có dấu hiệu xấu về sức khỏe.",
        "pdfPage": 198
      },
      {
        "ruleId": "VAL-CS-017",
        "ruleName": "Minimum Sum Assured Floor",
        "errorCode": "ERR_CS_SA_BELOW_MINIMUM",
        "severity": "HARD_STOP",
        "condition": "Revised Sum Assured after decrease must be >= Product Minimum SA constraint.",
        "systemAction": "Chặn lưu số tiền bảo hiểm mới.",
        "actuarialBasis": "Bảo đảm quy mô hợp đồng đủ bù đắp chi phí quản lý vận hành định kỳ.",
        "pdfPage": 198
      },
      {
        "ruleId": "VAL-CS-018",
        "ruleName": "Loan Repayment Allocation Hierarchy",
        "errorCode": "ERR_CS_REPAYMENT_ORDER_INVALID",
        "severity": "HARD_STOP",
        "condition": "Repayment funds must clear accrued loan interest first before reducing loan principal.",
        "systemAction": "Tự động phân bổ thu tiền theo thứ tự ưu tiên Lãi -> Gốc.",
        "actuarialBasis": "Nguyên lý kế toán tài chính chuẩn tắc bảo vệ doanh thu lãi vay của công ty bảo hiểm.",
        "pdfPage": 254
      },
      {
        "ruleId": "VAL-CS-019",
        "ruleName": "Two-Phase Commit Undo Log Snapshot",
        "errorCode": "ERR_CS_2PC_UNDO_MISSING",
        "severity": "CRITICAL",
        "condition": "JPA entity pre-image must be recorded in t_pub_tx_undo_log before applying CS changes to SOR.",
        "systemAction": "Hủy giao dịch Inforce và hoàn tác toàn bộ thay đổi.",
        "actuarialBasis": "Bảo toàn 100% tính toàn vẹn dữ liệu hợp đồng trên SOR khi có lỗi dịch vụ phân tán.",
        "pdfPage": 196
      },
      {
        "ruleId": "VAL-CS-020",
        "ruleName": "Mandatory Endorsement PDF Generation",
        "errorCode": "ERR_CS_ENDORSEMENT_GEN_FAILED",
        "severity": "HARD_STOP",
        "condition": "Every successfully enforced alteration must generate an official digital Endorsement Annex PDF.",
        "systemAction": "Kích hoạt cơ chế retry tự động của hệ thống DMS.",
        "actuarialBasis": "Phụ lục hợp đồng là căn cứ pháp lý duy nhất xác nhận điều chỉnh thỏa thuận bảo hiểm.",
        "pdfPage": 204
      }
    ],
    "validation_rules_count": 20,
    "alteration_catalog_30": [
      {
        "code": "ALT-01",
        "name": "Add Rider",
        "category": "Financial",
        "product": "Both",
        "uw": true,
        "financial": true,
        "desc": "Gắn thêm sản phẩm bổ trợ vào hợp đồng đang có hiệu lực; yêu cầu thẩm định y tế và tính phí ngắn hạn Pro-Rata."
      },
      {
        "code": "ALT-02",
        "name": "Apply Policy Loan",
        "category": "Financial",
        "product": "Both",
        "uw": false,
        "financial": true,
        "desc": "Tạm ứng từ giá trị hoàn lại hợp đồng (tối đa 80% Net CSV), tính lãi 6.5%/năm."
      },
      {
        "code": "ALT-03",
        "name": "Cancellation (Void Policy)",
        "category": "Financial",
        "product": "Both",
        "uw": false,
        "financial": true,
        "desc": "Hủy bỏ hiệu lực hợp đồng vô hiệu từ đầu do vi phạm nghĩa vụ kê khai trung thực hoặc gian lận."
      },
      {
        "code": "ALT-04",
        "name": "Change Assignment",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Chuyển giao quyền lợi bảo hiểm từ Bên chuyển nhượng (Assignor) sang Bên nhận chuyển nhượng (Assignee)."
      },
      {
        "code": "ALT-05",
        "name": "Change Birth Date or Gender",
        "category": "Financial",
        "product": "Both",
        "uw": true,
        "financial": true,
        "desc": "Đính chính ngày sinh hoặc giới tính của NĐBH; tính lại tỷ lệ phí, truy thu hoặc hoàn phí chênh lệch."
      },
      {
        "code": "ALT-06",
        "name": "Change Beneficial Owner",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Cập nhật thông tin chủ sở hữu hưởng lợi phục vụ phòng chống rửa tiền (AML/CFT)."
      },
      {
        "code": "ALT-07",
        "name": "Change Benefits",
        "category": "Financial",
        "product": "Traditional",
        "uw": true,
        "financial": true,
        "desc": "Thay đổi cơ cấu quyền lợi bảo hiểm truyền thống (nâng cấp/hạ cấp gói bảo vệ)."
      },
      {
        "code": "ALT-08",
        "name": "Change Contact Information",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Thay đổi địa chỉ thường trú, email, số điện thoại liên lạc của Bên mua bảo hiểm."
      },
      {
        "code": "ALT-09",
        "name": "Change Discount Type",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Cập nhật chính sách chiết khấu phí bảo hiểm cho khách hàng VIP hoặc nhân viên."
      },
      {
        "code": "ALT-10",
        "name": "Change Disbursement Method",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Thay đổi phương thức chi trả quyền lợi: Chuyển khoản ngân hàng, PayNow, hoặc tiền mặt."
      },
      {
        "code": "ALT-11",
        "name": "Change Occupation",
        "category": "Financial",
        "product": "Both",
        "uw": true,
        "financial": true,
        "desc": "Thay đổi nhóm nghề nghiệp của NĐBH (Nhóm 1 đến 4); điều chỉnh phụ phí nghề nghiệp."
      },
      {
        "code": "ALT-12",
        "name": "Change of Benefit Level (Health)",
        "category": "Financial",
        "product": "Both",
        "uw": true,
        "financial": true,
        "desc": "Nâng hoặc hạ chương trình bảo hiểm sức khỏe y tế (Standard -> Gold -> Diamond)."
      },
      {
        "code": "ALT-13",
        "name": "Change Payer",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Thay đổi người nộp phí bảo hiểm định kỳ và thiết lập ủy nhiệm thu mới."
      },
      {
        "code": "ALT-14",
        "name": "Change Payment Method",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Thay đổi hình thức thanh toán phí: Thẻ tín dụng tự động, Trích nợ trực tiếp (Direct Debit), Chuyển khoản."
      },
      {
        "code": "ALT-15",
        "name": "Change Payment Frequency",
        "category": "Financial",
        "product": "Both",
        "uw": false,
        "financial": true,
        "desc": "Thay đổi định kỳ đóng phí: Năm (1.0), Nửa năm (0.52), Quý (0.27), Tháng (0.09)."
      },
      {
        "code": "ALT-16",
        "name": "Change Policy Holder",
        "category": "Non-Financial",
        "product": "Both",
        "uw": true,
        "financial": false,
        "desc": "Chuyển giao quyền sở hữu hợp đồng bảo hiểm cho Bên mua bảo hiểm mới thỏa mãn Insurable Interest."
      },
      {
        "code": "ALT-17",
        "name": "Change Survival Benefit Option",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Thay đổi hình thức nhận quyền lợi định kỳ/bảo tức: Nhận tiền mặt, Tích lũy hưởng lãi, hoặc Mua bảo tức tích lũy."
      },
      {
        "code": "ALT-18",
        "name": "Change Smoker Status",
        "category": "Financial",
        "product": "Both",
        "uw": true,
        "financial": true,
        "desc": "Đổi tình trạng hút thuốc từ Có sang Không hút (sau tối thiểu 12 tháng cai thuốc có kết quả xét nghiệm y khoa)."
      },
      {
        "code": "ALT-19",
        "name": "Change Term",
        "category": "Financial",
        "product": "Both",
        "uw": true,
        "financial": true,
        "desc": "Thay đổi thời hạn hợp đồng bảo hiểm (Policy Term) hoặc thời hạn đóng phí (Premium Term)."
      },
      {
        "code": "ALT-20",
        "name": "Decrease SA",
        "category": "Financial",
        "product": "Traditional",
        "uw": false,
        "financial": true,
        "desc": "Giảm số tiền bảo hiểm để giảm gánh nặng phí đóng; nhận hoàn lại phần giá trị hoàn lại tương ứng."
      },
      {
        "code": "ALT-21",
        "name": "Delete Rider",
        "category": "Financial",
        "product": "Both",
        "uw": false,
        "financial": true,
        "desc": "Hủy bỏ sản phẩm bổ trợ gắn kèm; giảm mức phí bảo hiểm định kỳ của kỳ kế tiếp."
      },
      {
        "code": "ALT-22",
        "name": "Free look Cancellation",
        "category": "Financial",
        "product": "Both",
        "uw": false,
        "financial": true,
        "desc": "Hủy hợp đồng trong thời hạn 21 ngày cân nhắc tính từ ngày nhận e-ACK; hoàn 100% phí trừ chi phí y tế."
      },
      {
        "code": "ALT-23",
        "name": "Increase SA",
        "category": "Financial",
        "product": "Traditional",
        "uw": true,
        "financial": true,
        "desc": "Tăng số tiền bảo hiểm của hợp đồng; bắt buộc thẩm định y khoa và tài chính bổ sung."
      },
      {
        "code": "ALT-24",
        "name": "Nomination - Beneficiary",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Cập nhật, thêm mới hoặc điều chỉnh tỷ lệ chia của danh sách Người thụ hưởng (tổng % = 100%)."
      },
      {
        "code": "ALT-25",
        "name": "Nomination - Trustee",
        "category": "Non-Financial",
        "product": "Both",
        "uw": false,
        "financial": false,
        "desc": "Chỉ định hoặc thay đổi Người giám hộ / Người đại diện theo pháp luật cho người thụ hưởng dưới 18 tuổi."
      },
      {
        "code": "ALT-26",
        "name": "Perform Reduced Paid Up (RPU)",
        "category": "Financial",
        "product": "Traditional",
        "uw": false,
        "financial": true,
        "desc": "Dừng đóng phí tương lai, chuyển đổi toàn bộ Net CSV thành hợp đồng có số tiền bảo hiểm giảm tương ứng."
      },
      {
        "code": "ALT-27",
        "name": "Reinstatement",
        "category": "Financial",
        "product": "Both",
        "uw": true,
        "financial": true,
        "desc": "Khôi phục hiệu lực hợp đồng mất hiệu lực trong 24 tháng; đóng đủ phí nợ + lãi phạt và khai báo y tế."
      },
      {
        "code": "ALT-28",
        "name": "Reversionary Bonus Surrender",
        "category": "Financial",
        "product": "Traditional",
        "uw": false,
        "financial": true,
        "desc": "Rút một phần hoặc toàn bộ giá trị hoàn lại của các khoản bảo tức tích lũy để lấy tiền mặt."
      },
      {
        "code": "ALT-29",
        "name": "Surrender (Full Surrender)",
        "category": "Financial",
        "product": "Both",
        "uw": false,
        "financial": true,
        "desc": "Chấm dứt hiệu lực hợp đồng hoàn toàn để nhận Giá trị giải ước ròng sau khi cấn trừ nợ gốc và lãi vay."
      },
      {
        "code": "ALT-30",
        "name": "Transfer of Coverage",
        "category": "Financial",
        "product": "Traditional",
        "uw": true,
        "financial": true,
        "desc": "Chuyển giao quyền lợi bảo hiểm sang một đối tượng được bảo hiểm mới hoặc gói bảo hiểm kế thừa."
      }
    ]
  },
  {
    "id": "MOD_05",
    "num": "05",
    "title": "Mod 05: Billing, Collection & Payment (BCP APP)",
    "subtitle": "Automated Billing Notices, Direct Debit Clearing, Suspense Allocation, 60-Day Grace Engine & APL Execution",
    "icon": "credit-card",
    "badge": "Revenue Collection",
    "page_range": "Pages 342 - 375",
    "summary": "Phân hệ Lập Hóa đơn, Thu phí và Chi trả (Billing, Collection & Payment - BCP APP). Quản lý toàn bộ chu trình dòng tiền thu phí tái tục (Renewal Premium), tạo hóa đơn và thông báo nhắc phí tự động (T-30 ngày), kết nối các kênh thu phí đa dạng (Direct Debit ngân hàng, Thẻ tín dụng tự động, Mã định danh thanh toán ảo Virtual Account VietQR/NAPAS), quản lý tài khoản trung gian Suspense GL 2211, xử lý đối soát tệp trả về (Bank Return File Clearing), vận hành động cơ 60 ngày gia hạn đóng phí (60-Day Statutory Grace Period Engine) với các mốc nhắc phí ngày 30 và cảnh báo nguy cơ ngày 45, tự động kích hoạt quyền chọn Tự động Tạm ứng Đóng phí (Automatic Premium Loan - APL) khi đủ giá trị hoàn lại, hoặc chuyển trạng thái Hợp đồng Mất Hiệu Lực (Midnight Auto-Lapse) tại thời điểm 23:59:59 của ngày thứ 60.",
    "mermaid_workflow": "graph LR\n    Schedule[\"Billing Schedule Engine\"] --> Notice[\"Generate Premium Notice (T-30 Days)\"]\n    Notice --> DueDate[\"Policy Due Date\"]\n    DueDate --> CollectMode{\"Payment Channel\"}\n    CollectMode -- Direct Debit --> DDFile[\"Generate Bank Direct Debit File\"]\n    DDFile --> BankReturn[\"Process Bank Return / Settlement\"]\n    CollectMode -- Manual / Wire --> Counter[\"Manual Collection Entry\"]\n    BankReturn -- Success --> Apply[\"Apply Premium & Advance Paid-To-Date\"]\n    Counter -- Matched --> Apply\n    BankReturn -- Fail --> Grace[\"Grace Period Counter (Days 1 to 60)\"]\n    Grace -- Unpaid at Day 60 --> BatchTrigger[\"Batch Trigger: APL or Auto-Lapse (Module 08)\"]",
    "core_concepts": [
      {
        "term": "Chu trình Quản lý Hóa đơn & Thu phí Khép kín (BCP Lifecycle)",
        "def": "Lập lịch hóa đơn (Billing Schedule T-30) -> Trích nợ ngân hàng (Direct Debit Batch) -> Đối soát tệp thanh toán (Bank Clearing Return File) -> Phân bổ tài khoản treo (Suspense Allocation) -> Cập nhật ngày đến hạn Paid-To-Date (PTD)."
      },
      {
        "term": "Động cơ 60 Ngày Gia hạn Đóng phí (60-Day Statutory Grace Engine)",
        "def": "Áp dụng theo Điều 37 Luật Kinh doanh Bảo hiểm số 08/2022/QH15. Trong suốt 60 ngày gia hạn, hợp đồng hoàn toàn giữ nguyên hiệu lực bảo vệ 100%. Nếu xảy ra sự kiện bảo hiểm trong thời gian này, doanh nghiệp chi trả đầy đủ quyền lợi sau khi cấn trừ kỳ phí chưa nộp."
      },
      {
        "term": "Tiến trình Gửi Thông báo Nhắc phí Đa tầng (Tiered Reminder Notices)",
        "def": "Cấu hình qua bảng tham số PremiumReminderNoticeDays. Tự động kích hoạt: Lần 1 (Ngày đến hạn Due Date - 30 ngày), Lần 2 (Tại ngày Due Date), Nhắc gia hạn (Grace Day 30), và Cảnh báo nguy cơ mất hiệu lực cuối cùng (Grace Day 45)."
      },
      {
        "term": "Quyết định Nửa đêm Ngày Thứ 60 (Midnight EOD Cutoff Decision)",
        "def": "Đúng 23:59:59 của ngày thứ 60 gia hạn, tiến trình EOD Batch kiểm tra Net CSV: Nếu Net CSV >= Phí định kỳ, tự động kích hoạt APL (Vay đóng phí từ CSV, tính lãi 6.5%/năm); nếu Net CSV không đủ, tự động chuyển hợp đồng sang trạng thái LAPSED."
      },
      {
        "term": "Kiến trúc Tài khoản Treo Trung gian (Suspense Hierarchy - GL 2211)",
        "def": "Phân chia thành General Suspense, NB Suspense, Renewal Suspense, CS Suspense. Tiền nộp vào được ghi Có TK 2211; chỉ khi phân bổ thành công mới chuyển sang Nợ TK 2211 / Có TK 4111 (Doanh thu phí bảo hiểm)."
      },
      {
        "term": "Bể Thu Tiền Chưa Khớp (Unmatched Collection Pool)",
        "def": "Các giao dịch chuyển tiền thiếu thông tin hợp đồng hoặc sai số hợp đồng được gom vào Unmatched Pool, chờ chuyên viên kế toán BCP thực hiện tra soát và gán thủ công."
      },
      {
        "term": "Chi trả Quyền lợi & Hủy Lệnh Chi (Disbursement & Cancel Payment)",
        "def": "Quản lý lệnh chi tiền (Lump Sum hoặc Installments) cho chi trả bồi thường, hoàn phí giải ước, chi trả bảo tức hoặc giải ngân vay hợp đồng, hỗ trợ quy trình Maker-Checker trước khi phát lệnh qua cổng ngân hàng."
      }
    ],
    "actuary_notes": [
      "Từ góc độ Định phí & Dòng tiền, tiến trình Billing & Grace Period là mạch máu quyết định Tỷ lệ Duy trì Hợp đồng (Persistency Rate K1, K2).",
      "Cơ chế APL đóng vai trò cứu cánh tài chính giúp duy trì hiệu lực hợp đồng cho khách hàng mà không làm suy giảm Quỹ dự phòng toán học, bởi khoản tạm ứng đóng phí được xem là một khoản cho vay sinh lời với lãi suất quy định (6.5%/năm).",
      "Tuy nhiên, nếu khoản vay APL cộng dồn vượt quá Giá trị hoàn lại ròng, hợp đồng sẽ rơi vào trạng thái 'APL Lapsed', chấm dứt hoàn toàn trách nhiệm bảo vệ và trích lập dự phòng của doanh nghiệp."
    ],
    "op_notes": [
      "Về mặt Vận hành Công nghệ, hệ thống BCP xử lý tệp thanh toán theo chuẩn định dạng ngân hàng đối tác (NAPAS, Vietcombank, Sacombank, BIDV).",
      "Khi thực hiện trích nợ tự động (Direct Debit), hệ thống khóa trường BILLING_STATUS = 'IN_COLLECTION' để tránh trích nợ trùng lặp.",
      "Tiến trình EOD Batch chạy vào ban đêm sử dụng thuật toán song song hóa (Multi-threading) để quét và xử lý hàng triệu hợp đồng đến hạn đóng phí hoặc hết hạn 60 ngày gia hạn chỉ trong vòng dưới 30 phút."
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
        "code": "SOP-BCP-01",
        "id": "SOP-BCP-01",
        "title": "Premium Billing Schedule, Due Date Calculation & Automated Reminder Notice Dispatch",
        "role": "Billing Operations Specialist",
        "objective": "Quản lý lịch lập hóa đơn phí tái tục, tính toán ngày đến hạn (Due Date) theo định kỳ đóng phí và tự động kích hoạt tiến trình gửi Thông báo nhắc phí (T-30 ngày).",
        "pdf_page": 346,
        "prerequisites": [
          "Hợp đồng đang có hiệu lực (INFORCE) với trạng thái đóng phí định kỳ (Regular Premium).",
          "Cấu hình bảng tham số PremiumReminderNoticeDays đã được thiết lập hợp lệ trên MC.",
          "Cổng gửi thông báo đa kênh (SMS Gateway, Email Service, Zalo ZNS) đang hoạt động bình thường."
        ],
        "steps": [
          "1. From the main menu, navigate to Billing > Billing Schedule Configuration.",
          "2. System automatically scans policies whose Paid-To-Date (PTD) equals Current Date + 30 days.",
          "3. Verify that the calculated Next Due Date matches the policy's modal frequency (Annual, Semi-Annual, Quarterly, Monthly).",
          "4. Inspect billing generation batch job 'JOB_BILLING_GENERATE'. System extracts modal installment amounts.",
          "5. System triggers the first billing reminder notice (T-30 Notice) containing Policy No, Insured Name, Premium Amount, Due Date, and VietQR Dynamic Payment Link.",
          "6. System updates BILLING_STATUS to 'NOTICE_SENT' and records notice dispatch timestamp in t_bcp_notice_log.",
          "7. For Direct Debit / Credit Card policies, system flags the record as 'ELIGIBLE_FOR_AUTO_EXTRACTION'."
        ],
        "fields_table": [
          {
            "name": "POLICY_NO",
            "type": "String",
            "required": "Yes",
            "desc": "Số hợp đồng bảo hiểm đến hạn đóng phí"
          },
          {
            "name": "NEXT_DUE_DATE",
            "type": "Date",
            "required": "No",
            "desc": "Ngày đến hạn đóng phí định kỳ tiếp theo"
          },
          {
            "name": "BILLING_AMOUNT",
            "type": "Decimal",
            "required": "No",
            "desc": "Số tiền phí bảo hiểm định kỳ phải đóng"
          },
          {
            "name": "MODAL_FREQUENCY",
            "type": "Enum",
            "required": "No",
            "desc": "Định kỳ đóng phí: ANNUAL, SEMI, QUARTER, MONTH"
          },
          {
            "name": "NOTICE_CHANNEL",
            "type": "Enum",
            "required": "Yes",
            "desc": "Kênh gửi thông báo: EMAIL_SMS, ZALO_ZNS, POSTAL_MAIL"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-01-A",
            "ruleName": "Hợp đồng đã đóng phí đủ thời hạn đóng phí (PPT reached) không được tạo hóa đơn thu phí mới.",
            "errorCode": "ERR_VAL_BCP_01_A",
            "severity": "HARD_STOP",
            "condition": "Hợp đồng đã đóng phí đủ thời hạn đóng phí (PPT reached) không được tạo hóa đơn thu phí mới.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 346
          },
          {
            "ruleId": "VAL-BCP-01-B",
            "ruleName": "Không phát hành thông báo đóng phí đối với hợp đồng đang ở trạng thái WAIVED (Được miễn đóng phí).",
            "errorCode": "ERR_VAL_BCP_01_B",
            "severity": "HARD_STOP",
            "condition": "Không phát hành thông báo đóng phí đối với hợp đồng đang ở trạng thái WAIVED (Được miễn đóng phí).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 346
          }
        ]
      },
      {
        "code": "SOP-BCP-02",
        "id": "SOP-BCP-02",
        "title": "Direct Debit Clearing Batch File Generation & Bank Dispatch (GIRO / ACH / NAPAS)",
        "role": "Clearing Operations Specialist",
        "objective": "Khởi tạo và xuất tệp trích nợ tự động định kỳ (Direct Debit Batch Extraction) gửi tới các ngân hàng đối tác hoặc cổng thanh toán quốc gia NAPAS.",
        "pdf_page": 355,
        "prerequisites": [
          "Hợp đồng đã đăng ký ủy quyền trích nợ tự động (Direct Debit Mandate) có trạng thái VERIFIED.",
          "Tài khoản ngân hàng của khách hàng hợp lệ và liên kết với ngân hàng đối tác hỗ trợ thu hộ.",
          "Ngày trích nợ nằm trong cửa sổ thời gian khấu trừ (Clearing Window: T-5 ngày đến T+0)."
        ],
        "steps": [
          "1. Navigate to Billing > Direct Debit > Batch Extraction.",
          "2. Select Target Bank (e.g. Sacombank, Vietcombank, BIDV, NAPAS Portal).",
          "3. Set Extraction Date Range and click 'Query Eligible Policies'. System filters all policies due for collection.",
          "4. Review Total Records and Aggregate Batch Amount.",
          "5. Click 'Generate Batch File'. System formats data into bank-compliant format (CSV, TXT Fixed-width, XML ISO 20022).",
          "6. System updates BILLING_STATUS of extracted policies to 'IN_COLLECTION' to prevent duplicate extraction.",
          "7. Download encrypted batch file and upload to Bank SFTP Server / Clearing Gateway.",
          "8. System logs Batch ID (e.g. DD-SCB-20261023-01) and transitions state to 'Awaiting Bank Response'."
        ],
        "fields_table": [
          {
            "name": "BATCH_ID",
            "type": "String",
            "required": "No",
            "desc": "Mã lô trích nợ tự động duy nhất"
          },
          {
            "name": "CLEARING_BANK_CODE",
            "type": "String",
            "required": "Yes",
            "desc": "Mã ngân hàng xử lý thanh toán bù trừ"
          },
          {
            "name": "TOTAL_RECORDS",
            "type": "Integer",
            "required": "No",
            "desc": "Tổng số lượng hợp đồng trong tệp trích nợ"
          },
          {
            "name": "TOTAL_AMOUNT",
            "type": "Decimal",
            "required": "No",
            "desc": "Tổng số tiền đề nghị trích nợ trong lô"
          },
          {
            "name": "EXTRACTION_DATE",
            "type": "Date",
            "required": "No",
            "desc": "Ngày xuất tệp thanh toán bù trừ"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-02-A",
            "ruleName": "Một hợp đồng không được xuất hiện trong 2 tệp trích nợ đang cùng ở trạng thái 'IN_COLLECTION'.",
            "errorCode": "ERR_VAL_BCP_02_A",
            "severity": "HARD_STOP",
            "condition": "Một hợp đồng không được xuất hiện trong 2 tệp trích nợ đang cùng ở trạng thái 'IN_COLLECTION'.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 355
          },
          {
            "ruleId": "VAL-BCP-02-B",
            "ruleName": "Tài khoản ngân hàng chưa được xác minh ủy quyền (Mandate Unverified) không được đưa vào tệp trích nợ.",
            "errorCode": "ERR_VAL_BCP_02_B",
            "severity": "HARD_STOP",
            "condition": "Tài khoản ngân hàng chưa được xác minh ủy quyền (Mandate Unverified) không được đưa vào tệp trích nợ.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 355
          }
        ]
      },
      {
        "code": "SOP-BCP-03",
        "id": "SOP-BCP-03",
        "title": "Importing Bank Clearing Return Files, Virtual Account Auto-Reconciliation & Settlement",
        "role": "Reconciliation Accountant",
        "objective": "Nạp tệp kết quả trích nợ từ ngân hàng (Bank Return File), tự động đối soát các khoản thu thành công/thất bại, phân bổ tài khoản treo và cập nhật ngày PTD.",
        "pdf_page": 364,
        "prerequisites": [
          "Tệp kết quả trích nợ đã được tải về từ cổng thanh toán của ngân hàng đối tác.",
          "Tệp có đầy đủ mã kết quả phản hồi (Return Code: 00 = Success, 51 = Insufficient Funds, 14 = Invalid Card, etc.).",
          "Tài khoản trung gian Suspense GL 2211 đang hoạt động bình thường."
        ],
        "steps": [
          "1. Navigate to Collection > Batch Upload. Select Bank Code and upload return file.",
          "2. Click 'Process Clearing File'. The Reconciliation Engine parses records line-by-line:",
          "   a. Matches Policy No and Proposal ID against active billing records.",
          "   b. Checks Return Code from bank.",
          "3. For Successful Records (Code 00):",
          "   a. System creates a Collection Record in t_bcp_collection.",
          "   b. Automatically applies funds to clear Renewal Premium.",
          "   c. Advances Paid-To-Date (PTD) to the next due cycle.",
          "   d. Generates GL Journal Entry: Dr GL 1111 (Bank Cash) / Cr GL 4111 (Premium Revenue).",
          "4. For Failed Records (e.g. Insufficient Funds):",
          "   a. System records failure reason code.",
          "   b. Policy remains in Grace Period; triggers SMS retry notice to customer.",
          "5. View Reconciliation Summary Dashboard: Total Processed, Success Count, Failed Count, Matched Amount.",
          "6. Click 'Confirm Batch Settlement' to commit transaction to SOR."
        ],
        "fields_table": [
          {
            "name": "FILE_NAME",
            "type": "String",
            "required": "Yes",
            "desc": "Tên tệp tin kết quả đối soát ngân hàng"
          },
          {
            "name": "SUCCESS_COUNT",
            "type": "Integer",
            "required": "No",
            "desc": "Số lượng giao dịch trừ tiền thành công"
          },
          {
            "name": "FAILED_COUNT",
            "type": "Integer",
            "required": "No",
            "desc": "Số lượng giao dịch trừ tiền thất bại"
          },
          {
            "name": "TOTAL_CLEARED_AMT",
            "type": "Decimal",
            "required": "No",
            "desc": "Tổng số tiền thực thu thành công chuyển vào sổ cái"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-03-A",
            "ruleName": "Tệp đối soát đã nạp thành công không được nạp lại lần thứ 2 để chống ghi nhận trùng lặp thu phí.",
            "errorCode": "ERR_VAL_BCP_03_A",
            "severity": "HARD_STOP",
            "condition": "Tệp đối soát đã nạp thành công không được nạp lại lần thứ 2 để chống ghi nhận trùng lặp thu phí.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 364
          },
          {
            "ruleId": "VAL-BCP-03-B",
            "ruleName": "Chênh lệch giữa số tiền ngân hàng báo có và tổng số tiền hạch toán trên Core phải bằng đúng 0 VND.",
            "errorCode": "ERR_VAL_BCP_03_B",
            "severity": "HARD_STOP",
            "condition": "Chênh lệch giữa số tiền ngân hàng báo có và tổng số tiền hạch toán trên Core phải bằng đúng 0 VND.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 364
          }
        ]
      },
      {
        "code": "SOP-BCP-04",
        "id": "SOP-BCP-04",
        "title": "Manual Collection Entry & Suspense Allocation (NB, Renewal, CS, Top-Up)",
        "role": "Cashier / Collection Officer",
        "objective": "Ghi nhận thu tiền phí bảo hiểm thủ công tại quầy (tiền mặt, máy POS, chuyển khoản trực tiếp) và phân bổ tiền vào tài khoản treo nghiệp vụ tương ứng.",
        "pdf_page": 359,
        "prerequisites": [
          "Chứng từ nộp tiền hợp lệ (Ủy nhiệm chi, Phiếu nộp tiền ngân hàng, Biên lai POS).",
          "Số tiền thực tế đã ghi có vào tài khoản ngân hàng của Công ty Bảo hiểm.",
          "Xác định được mã số hợp đồng hoặc mã hồ sơ yêu cầu bảo hiểm của khách hàng."
        ],
        "steps": [
          "1. From main menu, navigate to Collection > Manual Collection > Receive Collection.",
          "2. Input Policy Number or Proposal Number. System loads policyholder and current debt details.",
          "3. In the Collection Details section, enter Collection Date, Currency (VND), and Amount Received.",
          "4. Select Collection Method: Cash at Counter, Bank Transfer, POS Card Swipe.",
          "5. Select Target Cash Bank Account (e.g. Sacombank Operating Account).",
          "6. In the Allocation Type section, allocate received funds:",
          "   a. First Premium (NB Suspense)",
          "   b. Renewal Premium (Renewal Suspense)",
          "   c. Top-Up Premium (Unit-Linked Fund Investment)",
          "   d. Policy Loan Repayment (Principal + Interest)",
          "   e. Mid-term Alteration Short Premium (CS Suspense)",
          "7. Click 'Allocate Funds'. System validates whether the amount satisfies modal requirement.",
          "8. Click Save. System generates Official Collection Receipt (Biên nhận thu tiền điện tử) and posts to GL 2211."
        ],
        "fields_table": [
          {
            "name": "RECEIPT_NO",
            "type": "String",
            "required": "No",
            "desc": "Số biên nhận thu tiền điện tử tự sinh"
          },
          {
            "name": "COLLECTION_AMOUNT",
            "type": "Decimal",
            "required": "Yes",
            "desc": "Số tiền thực tế thu từ khách hàng"
          },
          {
            "name": "ALLOCATION_TYPE",
            "type": "Enum",
            "required": "Yes",
            "desc": "Loại phân bổ: NB, RENEWAL, TOPUP, LOAN_REPAY, CS"
          },
          {
            "name": "PAYMENT_METHOD",
            "type": "Enum",
            "required": "Yes",
            "desc": "Phương thức thu: CASH, BANK_TRANSFER, POS"
          },
          {
            "name": "BANK_TRANS_REF",
            "type": "String",
            "required": "No",
            "desc": "Mã giao dịch ngân hàng / FT code"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-04-A",
            "ruleName": "Số tiền phân bổ thu phí định kỳ không được thấp hơn mức phí tối thiểu của kỳ đóng phí.",
            "errorCode": "ERR_VAL_BCP_04_A",
            "severity": "HARD_STOP",
            "condition": "Số tiền phân bổ thu phí định kỳ không được thấp hơn mức phí tối thiểu của kỳ đóng phí.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 359
          },
          {
            "ruleId": "VAL-BCP-04-B",
            "ruleName": "Thu hoàn trả khoản vay hợp đồng bắt buộc phân bổ thanh toán lãi vay trước khi giảm gốc vay.",
            "errorCode": "ERR_VAL_BCP_04_B",
            "severity": "HARD_STOP",
            "condition": "Thu hoàn trả khoản vay hợp đồng bắt buộc phân bổ thanh toán lãi vay trước khi giảm gốc vay.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 359
          }
        ]
      },
      {
        "code": "SOP-BCP-05",
        "id": "SOP-BCP-05",
        "title": "Suspense Account Management, Unmatched Pool & Balance Transfer",
        "role": "Senior BCP Accountant",
        "objective": "Quản trị bể tiền chưa khớp (Unmatched Collection Pool), thực hiện đối soát thủ công các khoản tiền chuyển sai cú pháp và chuyển tiền giữa các tài khoản treo.",
        "pdf_page": 366,
        "prerequisites": [
          "Danh sách các giao dịch báo có trong sao kê ngân hàng nhưng chưa khớp với bất kỳ hợp đồng nào trên hệ thống.",
          "Yêu cầu tra soát hoặc thư xác nhận của khách hàng/ngân hàng về thông tin hợp đồng đích.",
          "Quyền kế toán xử lý tài khoản treo trên BCP."
        ],
        "steps": [
          "1. Navigate to Collection > Unmatched Collection Pool.",
          "2. System lists all orphaned cash inflows (Trạng thái: UNMATCHED).",
          "3. Select an unmatched transaction. Review Payer Name, Bank Remittance Remark, and Timestamp.",
          "4. Use Smart Search to locate the intended Policy Number or Proposal ID by customer name / citizen ID.",
          "5. Once policy is verified, select 'Assign Collection to Policy'.",
          "6. System transfers funds from Unmatched Suspense into Policy Renewal Suspense (GL 2211).",
          "7. If customer overpaid (Dư tiền), select 'Transfer Excess Suspense to APA' (Tài khoản Phí đóng trước - Advance Premium Account).",
          "8. If customer requests a refund of excess money, initiate 'Suspense Refund Requisition' to return money to customer's bank account."
        ],
        "fields_table": [
          {
            "name": "UNMATCHED_TX_ID",
            "type": "String",
            "required": "No",
            "desc": "Mã giao dịch treo chưa khớp duy nhất"
          },
          {
            "name": "REMITTANCE_REMARK",
            "type": "String",
            "required": "No",
            "desc": "Nội dung chuyển khoản trên sổ phụ ngân hàng"
          },
          {
            "name": "TARGET_POLICY_NO",
            "type": "String",
            "required": "Yes",
            "desc": "Số hợp đồng được gán sau khi tra soát thành công"
          },
          {
            "name": "SUSPENSE_ACTION",
            "type": "Enum",
            "required": "Yes",
            "desc": "Hành động: APPLY_TO_POLICY, TRANSFER_APA, REFUND_CUSTOMER"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-05-A",
            "ruleName": "Mọi khoản tiền trong Unmatched Pool quá 90 ngày chưa xác định được nguồn gốc bắt buộc chuyển vào tài khoản tiền gửi chờ xử lý tuân thủ quy định kiểm toán.",
            "errorCode": "ERR_VAL_BCP_05_A",
            "severity": "HARD_STOP",
            "condition": "Mọi khoản tiền trong Unmatched Pool quá 90 ngày chưa xác định được nguồn gốc bắt buộc chuyển vào tài khoản tiền gửi chờ xử lý tuân thủ quy định kiểm toán.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 366
          },
          {
            "ruleId": "VAL-BCP-05-B",
            "ruleName": "Lệnh hoàn trả tiền treo (Suspense Refund) bắt buộc phải chuyển về đúng tài khoản ngân hàng đã chuyển tiền đến.",
            "errorCode": "ERR_VAL_BCP_05_B",
            "severity": "HARD_STOP",
            "condition": "Lệnh hoàn trả tiền treo (Suspense Refund) bắt buộc phải chuyển về đúng tài khoản ngân hàng đã chuyển tiền đến.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 366
          }
        ]
      },
      {
        "code": "SOP-BCP-06",
        "id": "SOP-BCP-06",
        "title": "60-Day Premium Grace Period Tracking, Reminders (Day 30, 45) & EOD Auto-Lapse",
        "role": "Core Batch Supervisor / Customer Retention Lead",
        "objective": "Vận hành và giám sát động cơ 60 ngày gia hạn đóng phí luật định (Điều 37 Luật KDBH 2022), tự động gửi nhắc phí và kích hoạt quyết định mất hiệu lực tại EOD ngày thứ 60.",
        "pdf_page": 350,
        "prerequisites": [
          "Hợp đồng đã quá ngày đến hạn đóng phí (Due Date) mà chưa nhận đủ phí bảo hiểm định kỳ.",
          "Tiến trình EOD Batch hàng đêm (Job 'JOB_GRACE_PERIOD_EVAL') được lên lịch kích hoạt đúng 00:00:00 hàng ngày.",
          "Các mẫu thông báo nhắc nhở ngày 30 và cảnh báo ngày 45 đã được cấu hình trong Template Engine."
        ],
        "steps": [
          "1. Daily at 00:00:00, Batch Job evaluates all policies past Due Date. Computes Grace Days Elapsed = Current System Date - Due Date.",
          "2. If Grace Days Elapsed <= 60:",
          "   a. Policy remains fully INFORCE with 100% protection benefits intact.",
          "   b. If Grace Days = 30: System dispatches 'NOTICE_PREM_REMIND_1' (Thông báo Nhắc phí Lần 1).",
          "   c. If Grace Days = 45: System dispatches 'NOTICE_PREM_WARNING_FINAL' (Cảnh báo Nguy cơ Mất Hiệu Lực Lần 2).",
          "3. At 23:59:59 of Grace Day 60 (Statutory Cutoff):",
          "   System executes the Non-Forfeiture Evaluation Engine:",
          "   a. Checks if Policy allows Automatic Premium Loan (APL_ALLOWED = TRUE) and Net CSV >= Modal Premium.",
          "   b. If YES: Triggers SOP-BCP-07 to execute APL Loan (Status -> INFORCE_APL).",
          "   c. If NO (Term Life or CSV < Premium): Transitions Policy Status to 'LAPSED' (Mất Hiệu Lực).",
          "4. If Policy becomes LAPSED: Recurring billing schedule is suspended; 24-month Reinstatement countdown begins.",
          "5. Dispatches Formal Policy Lapse Notice to Policyholder and Agent."
        ],
        "fields_table": [
          {
            "name": "DUE_DATE",
            "type": "Date",
            "required": "No",
            "desc": "Ngày đến hạn đóng phí của hợp đồng"
          },
          {
            "name": "GRACE_DAYS_ELAPSED",
            "type": "Integer",
            "required": "No",
            "desc": "Số ngày gia hạn đã trôi qua (0 đến 60 ngày)"
          },
          {
            "name": "GRACE_CUTOFF_DATE",
            "type": "Date",
            "required": "No",
            "desc": "Thời điểm chốt hạn 60 ngày gia hạn đóng phí"
          },
          {
            "name": "NOTICE_STATUS",
            "type": "Enum",
            "required": "No",
            "desc": "Trạng thái thông báo: ACTIVE, REMIND_1_SENT, FINAL_WARNING_SENT, LAPSED"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-06-A",
            "ruleName": "Trong thời gian 60 ngày gia hạn, quyền lợi bảo vệ giữ nguyên 100%; nghiêm cấm từ chối bồi thường vì lý do chưa đóng phí.",
            "errorCode": "ERR_VAL_BCP_06_A",
            "severity": "HARD_STOP",
            "condition": "Trong thời gian 60 ngày gia hạn, quyền lợi bảo vệ giữ nguyên 100%; nghiêm cấm từ chối bồi thường vì lý do chưa đóng phí.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 350
          },
          {
            "ruleId": "VAL-BCP-06-B",
            "ruleName": "Nếu sự kiện bảo hiểm tử vong/thương tật xảy ra trong 60 ngày gia hạn, quyền lợi bồi thường được chi trả đầy đủ sau khi khấu trừ kỳ phí chưa nộp.",
            "errorCode": "ERR_VAL_BCP_06_B",
            "severity": "HARD_STOP",
            "condition": "Nếu sự kiện bảo hiểm tử vong/thương tật xảy ra trong 60 ngày gia hạn, quyền lợi bồi thường được chi trả đầy đủ sau khi khấu trừ kỳ phí chưa nộp.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 350
          },
          {
            "ruleId": "VAL-BCP-06-C",
            "ruleName": "Thời điểm chuyển Lapsed là thời điểm kết thúc ngày thứ 60 (23:59:59); không được chuyển sớm trước hạn luật định.",
            "errorCode": "ERR_VAL_BCP_06_C",
            "severity": "HARD_STOP",
            "condition": "Thời điểm chuyển Lapsed là thời điểm kết thúc ngày thứ 60 (23:59:59); không được chuyển sớm trước hạn luật định.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 350
          }
        ]
      },
      {
        "code": "SOP-BCP-07",
        "id": "SOP-BCP-07",
        "title": "Non-Forfeiture Automatic Premium Loan (APL) Execution & CSV Depletion",
        "role": "Actuarial Operations / Core Batch Engine",
        "objective": "Tự động trích tiền từ Giá trị hoàn lại ròng để đóng phí bảo hiểm (APL) vào nửa đêm ngày thứ 60, duy trì hiệu lực hợp đồng liên tục cho khách hàng.",
        "pdf_page": 373,
        "prerequisites": [
          "Hợp đồng đã quá 60 ngày gia hạn đóng phí mà khách hàng chưa thanh toán phí định kỳ.",
          "Hợp đồng có điều khoản phi hủy bỏ hiệu lực (APL) được kích hoạt.",
          "Giá trị hoàn lại ròng (Net CSV) tại ngày thứ 60 lớn hơn hoặc bằng mức phí định kỳ phải đóng."
        ],
        "steps": [
          "1. At Grace Day 60 Cutoff, APL Engine queries current policy financial attributes:",
          "   Net CSV = Guaranteed CSV + Accumulated Bonuses - Existing Loan Principal - Accrued Interest.",
          "2. Engine compares: Is Net CSV >= Modal Premium Due?",
          "3. If Condition is met, Engine initiates Automatic Premium Loan:",
          "   a. Creates a Loan Record under APL Category: Principal = Modal Premium Amount.",
          "   b. Sets APL Interest Rate = 6.5%/year (compounded daily).",
          "   c. Allocates loan amount to clear Renewal Premium debt.",
          "   d. Advances Paid-To-Date (PTD) to the next due cycle.",
          "   e. Updates Policy Status to 'INFORCE_APL'.",
          "4. Generates GL Journal Entry: Dr GL 1288 (Khoản vay hợp đồng APL) / Cr GL 4111 (Doanh thu phí tái tục).",
          "5. Generates and dispatches 'Notice of Automatic Premium Loan' informing policyholder of loan balance and daily interest.",
          "6. If in subsequent cycles Net CSV becomes insufficient for another full modal premium, system executes Partial APL or transitions to APL_LAPSED."
        ],
        "fields_table": [
          {
            "name": "APL_LOAN_AMOUNT",
            "type": "Decimal",
            "required": "No",
            "desc": "Số tiền phí bảo hiểm được tạm ứng tự động"
          },
          {
            "name": "NET_CSV_BEFORE_APL",
            "type": "Decimal",
            "required": "No",
            "desc": "Giá trị hoàn lại ròng trước khi tạm ứng"
          },
          {
            "name": "NET_CSV_AFTER_APL",
            "type": "Decimal",
            "required": "No",
            "desc": "Giá trị hoàn lại ròng còn lại sau khi tạm ứng"
          },
          {
            "name": "APL_INTEREST_RATE",
            "type": "Decimal(4,3)",
            "required": "No",
            "desc": "Lãi suất vay APL tính theo năm (6.5%/năm)"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-07-A",
            "ruleName": "Nếu Net CSV < Phí định kỳ, không được thực hiện APL toàn phần; hệ thống tự động chuyển sang APL Lapsed.",
            "errorCode": "ERR_VAL_BCP_07_A",
            "severity": "HARD_STOP",
            "condition": "Nếu Net CSV < Phí định kỳ, không được thực hiện APL toàn phần; hệ thống tự động chuyển sang APL Lapsed.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 373
          },
          {
            "ruleId": "VAL-BCP-07-B",
            "ruleName": "Lãi vay APL được tính dồn hàng ngày và tự động vốn hóa vào nợ gốc vào mỗi ngày kỷ niệm hợp đồng.",
            "errorCode": "ERR_VAL_BCP_07_B",
            "severity": "HARD_STOP",
            "condition": "Lãi vay APL được tính dồn hàng ngày và tự động vốn hóa vào nợ gốc vào mỗi ngày kỷ niệm hợp đồng.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 373
          },
          {
            "ruleId": "VAL-BCP-07-C",
            "ruleName": "Khách hàng có thể hoàn trả khoản vay APL bất kỳ lúc nào để khôi phục lại giá trị hoàn lại của hợp đồng.",
            "errorCode": "ERR_VAL_BCP_07_C",
            "severity": "HARD_STOP",
            "condition": "Khách hàng có thể hoàn trả khoản vay APL bất kỳ lúc nào để khôi phục lại giá trị hoàn lại của hợp đồng.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 373
          }
        ]
      },
      {
        "code": "SOP-BCP-08",
        "id": "SOP-BCP-08",
        "title": "Outbound Disbursement Processing (Lump Sum, Installments) & Payment Cancellation",
        "role": "Disbursement Specialist / Cashier",
        "objective": "Quản lý và thực hiện các lệnh chi trả tiền ra bên ngoài (Disbursement): Hoàn phí 21 ngày Free-Look, bồi thường, giải ước, giải ngân vay hợp đồng hoặc chi trả niên kim định kỳ.",
        "pdf_page": 381,
        "prerequisites": [
          "Lệnh yêu cầu chi trả (Payment Requisition) đã được phê duyệt hợp lệ từ Module 02 (Free-Look), Module 04 (CS/Surrender/Loan), hoặc Module 06 (Claims).",
          "Tài khoản ngân hàng của người thụ hưởng đã được xác minh thông tin chính chủ.",
          "Tài khoản chi trả của công ty bảo hiểm có đủ số dư thanh toán."
        ],
        "steps": [
          "1. From main menu, navigate to Payment > Disbursement Workbench.",
          "2. System displays approved payment requisitions waiting for disbursement.",
          "3. Select records to pay. Review Payee Name, ID Number, Bank Account Number, Bank Name, and Payout Amount.",
          "4. Select Disbursement Plan: Lump Sum (Một lần) or Installment (Nhiều kỳ định kỳ đối với niên kim).",
          "5. Select Outbound Payment Gateway: Host-to-Host Bank API, NAPAS 247 Instant Transfer, or Cheque.",
          "6. Click 'Execute Payment Batch'. System transmits transfer orders to the banking system.",
          "7. Upon Bank Confirmation (Success 200 OK):",
          "   a. System updates Payment Status to 'PAID'.",
          "   b. Records Bank Transaction ID (FT Code).",
          "   c. Generates GL Journal Entry: Dr GL 2212 (Treo chi trả bồi thường/giải ước) / Cr GL 1111 (Tiền gửi ngân hàng).",
          "8. If bank rejects transfer (e.g. Account Closed), system marks record as 'FAILED' and returns to CS queue for payee update."
        ],
        "fields_table": [
          {
            "name": "PAYMENT_REF_NO",
            "type": "String",
            "required": "No",
            "desc": "Mã định danh lệnh chi tiền ra duy nhất"
          },
          {
            "name": "DISBURSEMENT_TYPE",
            "type": "Enum",
            "required": "No",
            "desc": "Loại hình chi trả: LUMP_SUM, INSTALLMENT"
          },
          {
            "name": "PAYEE_NAME",
            "type": "String",
            "required": "Yes",
            "desc": "Họ và tên người nhận tiền thực tế"
          },
          {
            "name": "PAYEE_BANK_ACCOUNT",
            "type": "String",
            "required": "Yes",
            "desc": "Số tài khoản ngân hàng người nhận"
          },
          {
            "name": "PAID_AMOUNT",
            "type": "Decimal",
            "required": "No",
            "desc": "Số tiền thực chi chuyển khoản"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BCP-08-A",
            "ruleName": "Tên chủ tài khoản ngân hàng nhận tiền phải trùng khớp với thông tin người thụ hưởng hoặc Bên mua bảo hiểm trên hợp đồng.",
            "errorCode": "ERR_VAL_BCP_08_A",
            "severity": "HARD_STOP",
            "condition": "Tên chủ tài khoản ngân hàng nhận tiền phải trùng khớp với thông tin người thụ hưởng hoặc Bên mua bảo hiểm trên hợp đồng.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 381
          },
          {
            "ruleId": "VAL-BCP-08-B",
            "ruleName": "Lệnh chi tiền đã ở trạng thái 'PAID' không được phép hủy trực tiếp; bắt buộc phải thực hiện quy trình thu hồi (Payment Reversal) có phê duyệt Giám đốc Tài chính.",
            "errorCode": "ERR_VAL_BCP_08_B",
            "severity": "HARD_STOP",
            "condition": "Lệnh chi tiền đã ở trạng thái 'PAID' không được phép hủy trực tiếp; bắt buộc phải thực hiện quy trình thu hồi (Payment Reversal) có phê duyệt Giám đốc Tài chính.",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 381
          }
        ]
      }
    ],
    "sop_count": 8,
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
    "pdf_end_page": 405,
    "pdf_chapter": "Module 05: Gemini BCP User Guide (Pages 342-405)",
    "validation_rules": [
      {
        "ruleId": "VAL-BCP-001",
        "ruleName": "60-Day Full Protection Integrity",
        "errorCode": "ERR_BCP_GRACE_REJECTION_PROHIBITED",
        "severity": "CRITICAL",
        "condition": "Policy remains 100% Inforce with full coverage benefits during all 60 days of Grace Period.",
        "systemAction": "Bảo lưu trạng thái hợp đồng và tiếp nhận hồ sơ bồi thường bình thường.",
        "actuarialBasis": "Tuân thủ Điều 37 Luật Kinh doanh Bảo hiểm số 08/2022/QH15.",
        "pdfPage": 350
      },
      {
        "ruleId": "VAL-BCP-002",
        "ruleName": "Overdue Premium Offset on Grace Claim",
        "errorCode": "ERR_BCP_CLAIM_PREM_OFFSET_REQUIRED",
        "severity": "HARD_STOP",
        "condition": "Unpaid modal premium must be deducted from the claim payout if death or event occurs during Grace Period.",
        "systemAction": "Tự động tạo bản ghi khấu trừ phí trước khi duyệt chi trả bồi thường.",
        "actuarialBasis": "Bảo đảm nguyên tắc công bằng định phí: Phí bảo hiểm của kỳ rủi ro phát sinh phải được thanh toán đầy đủ.",
        "pdfPage": 350
      },
      {
        "ruleId": "VAL-BCP-003",
        "ruleName": "APL Cash Value Sufficiency Constraint",
        "errorCode": "ERR_BCP_APL_INSUFFICIENT_CSV",
        "severity": "HARD_STOP",
        "condition": "APL requires Net CSV >= Modal Installment Premium on Midnight of Grace Day 60.",
        "systemAction": "Chuyển hướng quyết định từ APL sang Auto-Lapse.",
        "actuarialBasis": "Ngăn ngừa việc tạm ứng vượt quá tài sản đảm bảo của hợp đồng dẫn đến nợ xấu bảo hiểm.",
        "pdfPage": 373
      },
      {
        "ruleId": "VAL-BCP-004",
        "ruleName": "Midnight Auto-Lapse Cutoff Strict Timing",
        "errorCode": "ERR_BCP_PREMATURE_LAPSE_PROHIBITED",
        "severity": "HARD_STOP",
        "condition": "Auto-lapse execution occurs strictly at 23:59:59 of Grace Day 60, not earlier.",
        "systemAction": "Chặn lệnh cập nhật Lapsed thủ công của người dùng trước hạn chót.",
        "actuarialBasis": "Bảo vệ quyền lợi khách hàng có quyền nộp phí đến phút cuối cùng của ngày thứ 60.",
        "pdfPage": 350
      },
      {
        "ruleId": "VAL-BCP-005",
        "ruleName": "Suspense Minimum Tolerance Match 100%",
        "errorCode": "ERR_BCP_SUSPENSE_UNDERFUNDED",
        "severity": "HARD_STOP",
        "condition": "Renewal allocation requires suspense balance >= 100.0% of modal installment premium.",
        "systemAction": "Giữ tiền trong tài khoản Suspense và không nâng ngày PTD.",
        "actuarialBasis": "Doanh nghiệp bảo hiểm không chấp nhận thanh toán dở dang làm lệch chu kỳ bảo vệ.",
        "pdfPage": 363
      },
      {
        "ruleId": "VAL-BCP-006",
        "ruleName": "Direct Debit Duplicate Extraction Lock",
        "errorCode": "ERR_BCP_DD_CONCURRENT_EXTRACTION",
        "severity": "HARD_STOP",
        "condition": "Policy cannot be extracted into multiple active clearing batches simultaneously.",
        "systemAction": "Khóa trường BILLING_STATUS = 'IN_COLLECTION'.",
        "actuarialBasis": "Ngăn ngừa trừ tiền trùng lặp từ tài khoản ngân hàng của khách hàng.",
        "pdfPage": 355
      },
      {
        "ruleId": "VAL-BCP-007",
        "ruleName": "Mandate Verification Prior to Clearing",
        "errorCode": "ERR_BCP_MANDATE_UNVERIFIED",
        "severity": "HARD_STOP",
        "condition": "Direct debit extraction permitted only for accounts with VERIFIED mandate status.",
        "systemAction": "Loại bỏ hợp đồng khỏi danh sách xuất tệp trích nợ tự động.",
        "actuarialBasis": "Tuân thủ quy định thanh toán không dùng tiền mặt và phòng tránh khiếu nại trái phép.",
        "pdfPage": 355
      },
      {
        "ruleId": "VAL-BCP-008",
        "ruleName": "Clearing File Idempotency Guarantee",
        "errorCode": "ERR_BCP_FILE_ALREADY_PROCESSED",
        "severity": "HARD_STOP",
        "condition": "A bank clearing return file can only be processed and settled exactly once.",
        "systemAction": "Từ chối nạp tệp và gửi cảnh báo trùng lặp cho kế toán.",
        "actuarialBasis": "Ngăn chặn ghi nhận doanh thu phí và cập nhật PTD hai lần.",
        "pdfPage": 364
      },
      {
        "ruleId": "VAL-BCP-009",
        "ruleName": "Unmatched Pool 90-Day Aging Cutoff",
        "errorCode": "WARN_BCP_UNMATCHED_AGING_OVERFLOW",
        "severity": "WARNING",
        "condition": "Unidentified funds remaining in Unmatched Pool > 90 days must be transferred to Audit Holding Account.",
        "systemAction": "Tự động chuyển vào tài khoản tiền gửi chờ thanh toán kiểm toán.",
        "actuarialBasis": "Bảo đảm tính trung thực của báo cáo tài chính và tuân thủ chuẩn mực kế toán doanh nghiệp bảo hiểm.",
        "pdfPage": 366
      },
      {
        "ruleId": "VAL-BCP-010",
        "ruleName": "APL Statutory Interest Accrual Standard",
        "errorCode": "ERR_BCP_APL_RATE_NONCOMPLIANT",
        "severity": "HARD_STOP",
        "condition": "APL loan interest is accrued daily at the approved statutory rate (6.5%/year) and capitalized annually.",
        "systemAction": "Áp dụng tỷ lệ lãi suất mặc định của bảng tham số hệ thống.",
        "actuarialBasis": "Tuân thủ quy tắc tính toán lãi vay hợp đồng đã được phê chuẩn trong Product Spec.",
        "pdfPage": 373
      },
      {
        "ruleId": "VAL-BCP-011",
        "ruleName": "Paid-Up Exemption from Billing Generation",
        "errorCode": "ERR_BCP_PAIDUP_BILLING_PROHIBITED",
        "severity": "HARD_STOP",
        "condition": "Policies with status PAID_UP or WAIVED must be excluded from billing notice generation.",
        "systemAction": "Tự động bỏ qua hợp đồng trong tiến trình quét lập hóa đơn.",
        "actuarialBasis": "Khách hàng không còn nghĩa vụ đóng phí; tránh gây hiểu lầm và khiếu nại.",
        "pdfPage": 346
      },
      {
        "ruleId": "VAL-BCP-012",
        "ruleName": "Advance Premium Account (APA) Auto-Drawdown",
        "errorCode": "INFO_BCP_APA_AUTO_DRAWDOWN",
        "severity": "HARD_STOP",
        "condition": "If Advance Premium Account balance > 0, system automatically draws from APA before billing customer.",
        "systemAction": "Trích tiền APA, cập nhật PTD và không xuất tệp trích nợ ngân hàng.",
        "actuarialBasis": "Ưu tiên giải tỏa nguồn vốn trả trước của khách hàng trước khi tạo thêm nghĩa vụ thanh toán.",
        "pdfPage": 345
      },
      {
        "ruleId": "VAL-BCP-013",
        "ruleName": "Payee Name Identity Strict Match",
        "errorCode": "ERR_BCP_PAYEE_NAME_MISMATCH",
        "severity": "HARD_STOP",
        "condition": "Disbursement bank account owner name must match Policyholder or Designated Beneficiary.",
        "systemAction": "Chặn giải ngân và yêu cầu xác minh bổ sung hoặc cung cấp tài khoản chính chủ.",
        "actuarialBasis": "Phòng chống gian lận nội bộ và bảo đảm tính pháp lý trong việc chi trả quyền lợi bảo hiểm.",
        "pdfPage": 381
      },
      {
        "ruleId": "VAL-BCP-014",
        "ruleName": "Paid Disbursement Reversal Authorization",
        "errorCode": "ERR_BCP_REVERSAL_DOA_UNAUTHORIZED",
        "severity": "HARD_STOP",
        "condition": "Cancelling a PAID disbursement order requires Chief Financial Officer (CFO) dual authorization.",
        "systemAction": "Khóa lệnh hủy và chuyển luồng phê duyệt sang tài khoản CFO.",
        "actuarialBasis": "Kiểm soát rủi ro thất thoát ngân quỹ doanh nghiệp bảo hiểm.",
        "pdfPage": 396
      },
      {
        "ruleId": "VAL-BCP-015",
        "ruleName": "Paid-To-Date Synchronization Across Riders",
        "errorCode": "ERR_BCP_PTD_DESYNCHRONIZATION",
        "severity": "HARD_STOP",
        "condition": "Advancing Base Policy PTD automatically advances all active attached riders' PTD concurrently.",
        "systemAction": "Tự động đồng bộ hóa toàn bộ PTD của các rider theo hợp đồng chính.",
        "actuarialBasis": "Bảo đảm đồng nhất chu kỳ thu phí và tính toán dự phòng nghiệp vụ của toàn bộ gói hợp đồng.",
        "pdfPage": 363
      },
      {
        "ruleId": "VAL-BCP-016",
        "ruleName": "Two-Phase Commit Settlement Post-Image Recording",
        "errorCode": "ERR_BCP_2PC_UNDO_MISSING",
        "severity": "CRITICAL",
        "condition": "Every renewal settlement must persist undo log snapshot before updating SOR tables.",
        "systemAction": "Hủy giao dịch thu phí và trả lời lỗi cho ngân hàng.",
        "actuarialBasis": "Bảo đảm tính toàn vẹn 100% của sổ sách kế toán bảo hiểm trong kiến trúc phân tán.",
        "pdfPage": 416
      }
    ],
    "validation_rules_count": 16
  },
  {
    "id": "MOD_06",
    "num": "06",
    "title": "Mod 06: Claims Management (CLM APP & Settlement Engine)",
    "subtitle": "FNOL, Medical Assessment, Benefit Calculation, Adjudication & Settlement",
    "icon": "activity",
    "badge": "Claim Adjudication",
    "page_range": "Pages 304 - 341",
    "summary": "Trung tâm giải quyết quyền lợi bảo hiểm toàn diện (Claims Workbench) theo chuẩn eBao Gemini Core PAS (Pages 271-341 Gemini User Guide), bao gồm toàn bộ vòng đời: Tiếp nhận thông báo tổn thất (FNOL), Tiếp nhận hồ sơ (Case Acceptance), Thẩm định quyền lợi (Policy Evaluation), Nhập viện phí & Đồng chi trả (Medical Bill & Co-pay), Lập kế hoạch chi trả & Cấn trừ nợ (Disbursement & Debt Offset), Thẩm định chuyên sâu & Điều tra trục lợi (Claim UW & Investigation), Phê duyệt DOA đa cấp (Claim Approval), và Hạch toán chi trả & Cập nhật trạng thái hợp đồng/khách hàng (Settlement & Post-Claim Life Cycle Updates). Quản lý tất cả các dòng quyền lợi bảo hiểm: Quyền lợi Tử vong (Death Claim), Thương tật toàn bộ và vĩnh viễn (TPD Lump sum / Installment Annuity), Bệnh hiểm nghèo (Critical Illness - Early/Advanced), Y tế & Nằm viện (Medical Reimbursement & Hospital Cash), và Quyền lợi Miễn đóng phí (Waiver of Premium - WP). Cơ chế Khóa hợp đồng tự động (Automatic Policy Freezing): Khi tiếp nhận yêu cầu bồi thường tử vong, hệ thống tự động gắn cờ Freeze Policy = TRUE để khóa toàn bộ giao dịch CS, đổi người thụ hưởng, vay tiền hoặc trích nợ tự động trong suốt quá trình xử lý hồ sơ. Cơ chế Quyết toán cấn trừ nợ tự động (Automatic Debt & Premium Offsetting): Đối với quyền lợi Tử vong, hệ thống tự động cấn trừ Dư nợ vay hợp đồng gốc + Lãi vay gộp dồn tích và Số phí bảo hiểm định kỳ còn nợ (Outstanding Modal Premium) trong thời gian gia hạn 60 ngày trước khi xác định Số tiền chi trả thực tế (Net Claim Payable). Động cơ Phân bổ Người thụ hưởng đa cấp (Payee Priority Hierarchy Engine): Tự động xác định người nhận tiền theo thứ tự ưu tiên pháp lý nghiêm ngặt: Bên nhận chuyển nhượng (Assignee) > Người được ủy thác (Trustee) > Người thụ hưởng được chỉ định theo tỷ lệ % (Beneficiary Nominees) > Bên mua bảo hiểm / Người thừa kế hợp pháp. Cơ chế Tự động Bán chứng chỉ quỹ (Auto-Liquidation of Unit-Link Units): Đối với sản phẩm liên kết đầu tư (ILP), khi tiếp nhận hồ sơ Tử vong hoặc TPD, hệ thống tự động bán toàn bộ đơn vị quỹ tại ngày định giá tiếp theo (Next Valuation Date) để chuẩn bị thanh khoản giải ngân. Từ chối bồi thường & Hủy hợp đồng do gian lận (Denied & Rescind with Refund): Trường hợp vi phạm nghiêm trọng nghĩa vụ kê khai theo Điều 22 Luật KDBH, hệ thống thực hiện hủy hợp đồng và tự động hoàn lại phí đã đóng (Traditional) hoặc hoàn lại Giá trị tài khoản hợp đồng TIV (ILP) sau khi trừ chi phí y tế hợp lý.",
    "mermaid_workflow": "graph TD\n    Incident[\"Insured Event Occurs\"] --> FNOL[\"Claim Registration (FNOL)\"]\n    FNOL --> Checklist[\"Document Verification & Checklist\"]\n    Checklist --> Accept[\"Claim Case Acceptance\"]\n    Accept --> Assess[\"Claim Evaluation & Medical Assessment\"]\n    Assess --> ExcludeCheck{\"Exclusion / Contestability?\"}\n    ExcludeCheck -- Incontestable & Valid --> Calc[\"Benefit Calculation Engine\"]\n    ExcludeCheck -- Incontestable / Fraud --> Rej[\"Claim Repudiation / Decline\"]\n    Calc --> Deduct[\"Deduct Outstanding Loans & Due Premiums\"]\n    Deduct --> Approve[\"Claim Approval Hierarchy\"]\n    Approve --> Settle[\"Settlement & Payout (Module 07)\"]\n    Settle --> PolicyEffect[\"Policy Termination or Sum Assured Reduction\"]",
    "core_concepts": [
      {
        "term": "FNOL & Claim Case Registration (P.274)",
        "def": "Khởi tạo hồ sơ bồi thường (First Notice of Loss). Hệ thống tự sinh mã Claim Case No duy nhất, ghi nhận Ngày xảy ra sự kiện (Event Date <= System Date), Ngày thông báo (Notification Date <= System Date), Kênh tiếp nhận, Người nộp đơn (Claimant), và gắn kết với Người được bảo hiểm (Life Assured) trong Core PAS."
      },
      {
        "term": "Policy Freezing & Liability Locking (P.323, 333)",
        "def": "Cơ chế phong tỏa hợp đồng tự động (Freeze Policy Flag). Mặc định là TRUE và bắt buộc (không được bỏ chọn) đối với Tử vong (DTH), có thể cấu hình đối với TPD và CI. Khi hợp đồng bị Freeze, mọi giao dịch CS (vay, hủy, rút tiền), BCP (trích nợ tự động) đều bị chặn đứng để bảo vệ an toàn tài chính."
      },
      {
        "term": "Claim Reserve & Auto-Provisioning (P.324)",
        "def": "Trích lập dự phòng bồi thường tự động (Notified Amount / Case Reserve). Ngay khi hồ sơ được chấp nhận (Acceptance), hệ thống tự động tính toán và trích lập dự phòng bồi thường ban đầu theo công thức định phí sản phẩm, ghi nhận bút toán Nợ TK 6211 / Có TK 3318 (Dự phòng bồi thường chờ giải quyết)."
      },
      {
        "term": "Deductibles, Co-insurance & Accumulators (P.287, 300, 328)",
        "def": "Động cơ tính toán viện phí & y tế. Bóc tách hóa đơn viện phí theo từng hạng mục (Tiền phòng, Phẫu thuật, Thuốc men, Điều trị đặc biệt), tự động áp dụng Mức miễn thường (Deductible), Tỷ lệ đồng chi trả (Co-insurance ví dụ 80/20), và kiểm tra Hạn mức tích lũy hàng năm/trọn đời (Claim Accumulator remaining limit)."
      },
      {
        "term": "Death Claim Debt & Outstanding Premium Offsetting (P.286, 334)",
        "def": "Quy tắc cấn trừ công nợ bồi thường tử vong: Net Payable = Sum Assured + Reversionary Bonus - (Policy Loan Principal + Accrued Loan Interest) - Outstanding Modal Premium (nếu tử vong trong 60 ngày gia hạn đóng phí). Chỉ áp dụng cấn trừ phí nợ cho quyền lợi Tử vong, không áp dụng cho các quyền lợi khác."
      },
      {
        "term": "Payee Priority Hierarchy Engine (P.337-338)",
        "def": "Động cơ phân bổ người nhận tiền giải ngân: 1) Nếu có Assignee (Bên nhận chuyển nhượng thế chấp/tuyệt đối): Assignee hưởng quyền ưu tiên số 1; 2) Nếu có Trustee: Trustee nhận tiền; 3) Nếu có Beneficiary: Chia đều theo tỷ lệ phần trăm (Tổng tỷ lệ bắt buộc = 100.00%); 4) Nếu không có ai: Mặc định chi trả cho Bên mua bảo hiểm (Policyholder) hoặc người thừa kế theo quy định pháp luật."
      },
      {
        "term": "Waiver of Premium (WP) Activation (P.289-291, 340)",
        "def": "Kích hoạt quyền lợi Miễn đóng phí: Khi chấp thuận quyền lợi WP, hệ thống cập nhật Premium Waive Flag = YES, thiết lập Waiver Start Date = Next Due Date, Waiver End Date = Ngày đáo hạn sản phẩm. Trạng thái đóng phí chuyển thành PREMIUM_WAIVED và PTD tự động được nâng định kỳ mà không sinh hóa đơn thu phí."
      },
      {
        "term": "Denied & Rescind with Refund vs Repudiate (P.290, 340)",
        "def": "Phân biệt các quyết định từ chối: 1) Repudiate: Từ chối bồi thường do sự kiện không thuộc phạm vi bảo hiểm hoặc rơi vào điều khoản loại trừ (Hợp đồng vẫn duy trì inforce bình thường); 2) Denied & Rescind: Từ chối bồi thường và HỦY hợp đồng do không trung thực khi kê khai y tế (Hoàn lại 100% phí bảo hiểm đã đóng đối với Traditional, hoặc hoàn lại Giá trị tài khoản TIV đối với ILP)."
      }
    ],
    "actuary_notes": [
      "Định phí Dự phòng Bồi thường (Claim Reserving - IBNR & OCR): Ngay khi bấm Submit tại màn hình Case Acceptance, hệ thống chạy công thức Case Reserve tự động theo từng cấp quyền lợi. Đối với quyền lợi Tử vong, dự phòng tối thiểu = 100% Số tiền bảo hiểm + Bảo tức tích lũy. Đối với viện phí, dự phòng = Min(Claimed Amount, Annual Sub-limit).",
      "Cơ chế Trừ Phí Bảo Hiểm Nợ (Outstanding Premium Offsetting - P.286): Tuân thủ nghiêm ngặt Điều 37 Luật KDBH 2022 và tài liệu eBao P.286: Chỉ khấu trừ phí nợ đối với quyền lợi Tử vong khi ngày xảy ra sự kiện nằm trong 60 ngày gia hạn đóng phí. Tuyệt đối không cấn trừ phí nợ đối với quyền lợi Nằm viện, Phẫu thuật hoặc Bệnh hiểm nghèo để đảm bảo nguyên tắc bảo toàn quyền lợi khách hàng.",
      "Giải ngân Quyền lợi TPD theo Kỳ (TPD Installment Annuity - P.294, 332): Cho phép cấu hình chi trả TPD 1 lần (Lump Sum 100%) hoặc chi trả định kỳ phân kỳ (ví dụ 10 kỳ trong 10 năm, mỗi năm 10% STBH kèm lãi suất dồn tích theo quy định hợp đồng).",
      "Xử lý Đơn vị Quỹ ILP khi Tử vong/TPD (Auto-Unit Redemption - P.334): Core PAS tự động gửi lệnh bán toàn bộ đơn vị quỹ (Total Units Liquidation) sang hệ thống Quản lý Quỹ (Fund Management) với giá đơn vị quỹ chốt tại Ngày hiệu lực giá (Admission Price Effective Date = Ngày thông báo hoặc Ngày thông báo + 1 ngày làm việc)."
    ],
    "op_notes": [
      "SLA Tiếp nhận & Phê duyệt Bồi thường: SLA tiếp nhận FNOL trong vòng 24h kể từ khi nhận hồ sơ. SLA chi trả bồi thường chuẩn là 15 - 30 ngày theo quy định tại Điều 31 Luật Kinh doanh bảo hiểm 2022.",
      "Kiểm soát Gian lận & Dấu hiệu Đỏ (Fraud / Red Flag Detection - P.330): Hệ thống tự động kích hoạt cảnh báo Red Flag khi: 1) Sự kiện xảy ra trong vòng 2 năm kể từ ngày phát hành (Contestable Period); 2) Khiếu nại bồi thường tần suất cao (Frequent Claims > 3 lần/năm); 3) Mã bệnh viện nằm trong Danh sách đen / Cần kiểm tra (Hospital Blacklist); 4) Sự kiện tử vong do tai nạn không rõ ràng.",
      "Bảng Phân Quyền Phê Duyệt Bồi Thường (DOA Matrix - P.340): Thiết lập hạn mức phê duyệt theo chức danh: Cán bộ bồi thường Junior (Max 50M VND), Senior Specialist (Max 200M VND), Trưởng phòng Bồi thường (Max 500M VND), Giám đốc Khối Nghiệp vụ (Max 2 Tỷ VND), Hội đồng Bồi thường Claims Committee (Trên 2 Tỷ VND hoặc các ca Ex-gratia chi trả vì lý do thương mại)."
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
        "id": "SOP-CLM-01",
        "title": "First Notice of Loss (FNOL) Registration & Claim Case Creation",
        "role": "Core PAS Specialist",
        "objective": "Claims > Work List > Register a Case (P.274)",
        "pdf_page": 304,
        "prerequisites": [
          "Người được bảo hiểm (Life Assured) phải tồn tại trong cơ sở dữ liệu khách hàng (T_PARTY) và có ít nhất 1 hợp đồng đang ở trạng thái Inforce hoặc đang trong thời gian gia hạn 60 ngày.",
          "Người nộp đơn bồi thường (Claimant) có đầy đủ giấy tờ định danh (CCCD/Hộ chiếu) hợp lệ.",
          "Ngày xảy ra sự kiện tổn thất (Event Date) và Ngày thông báo (Notification Date) không được vượt quá Ngày kinh doanh hiện tại của hệ thống (System Business Date)."
        ],
        "steps": [
          "Bước 1: Truy cập menu Claims > Work List, nhấn nút 'Register a Case' để mở màn hình Claims Registration Page (Figure 3, P.274).",
          "Bước 2: Tại phần Claim Information: Nhập Ngày xảy ra sự kiện (Event Date), Ngày thông báo (Notification Date), Bản chất tổn thất (Claim Nature: Disease, Accident, Natural Death), và Kênh tiếp nhận (Manual, Customer Portal, Agency Mobile App).",
          "Bước 3: Chọn Loại hình bồi thường (Claim Type): Death (DTH), Total & Permanent Disability (TPD), Critical Illness (CIC), Medical Reimbursement (MED), Hospital Cash, hoặc Waiver of Premium (PWC).",
          "Bước 4: Tại phần Claimant Information: Tìm kiếm hoặc tạo mới hồ sơ Người nộp đơn bồi thường (Claimant Party), xác định mối quan hệ với Người được bảo hiểm (Self, Spouse, Child, Parent, Legal Heir, Corporate Representative).",
          "Bước 5: Nhập ghi chú ban đầu tại ô General Comments nếu có thông tin đặc biệt từ hiện trường hoặc cơ quan giám định.",
          "Bước 6: Nhấn nút 'Submit' để lưu hồ sơ. Hệ thống thực thi quy tắc kiểm tra toàn vẹn, tự sinh mã hồ sơ Claim Case No duy nhất theo định dạng CLM-YYYYMMDD-XXXXX, gắn trạng thái ban đầu là 'Waiting for Acceptance', và tạo liên kết Policy-Party role cho Claimant."
        ],
        "fields_table": [
          {
            "name": "Claim Case No",
            "type": "Text (Read-only)",
            "required": "Yes",
            "desc": "Hệ thống tự động sinh khi submit thành công (CLM-YYYYMMDD-XXXXX)"
          },
          {
            "name": "Event Date",
            "type": "Date Picker",
            "required": "Yes",
            "desc": "Ngày xảy ra sự kiện rủi ro (tai nạn, tử vong, chẩn đoán, nhập viện)"
          },
          {
            "name": "Notification Date",
            "type": "Date Picker",
            "required": "Yes",
            "desc": "Ngày công ty bảo hiểm nhận được thông báo tổn thất"
          },
          {
            "name": "Claim Type",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Death, TPD, Critical Illness, Medical, Hospitalization, Waiver"
          },
          {
            "name": "Claim Nature",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Bản chất sự kiện: Tai nạn, Bệnh tật, Tự nhiên, Thai sản"
          },
          {
            "name": "Claimant ID & Name",
            "type": "Party Lookup",
            "required": "Yes",
            "desc": "Người đại diện nộp hồ sơ yêu cầu giải quyết bồi thường"
          },
          {
            "name": "Relationship to LA",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Mối quan hệ với Người được bảo hiểm"
          },
          {
            "name": "General Comments",
            "type": "Textarea",
            "required": "No",
            "desc": "Ghi chú tóm tắt sơ bộ về diễn biến tổn thất"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-001",
            "ruleName": "Event Date & Notification Date Validation",
            "errorCode": "ERR_CLM_FUTURE_DATE_INVALID",
            "severity": "HARD_STOP",
            "condition": "Ngày xảy ra sự kiện và Ngày thông báo không được trễ hơn ngày hệ thống (Event Date <= System Date và Notification Date <= System Date - P.319, 335).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-002",
            "ruleName": "Valid Life Assured Existence Check",
            "errorCode": "ERR_CLM_INVALID_LIFE_ASSURED",
            "severity": "HARD_STOP",
            "condition": "Hồ sơ bồi thường bắt buộc phải gắn với một Người được bảo hiểm đang tồn tại trong hệ thống, không được tạo hồ sơ rỗng (P.272, 320).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      },
      {
        "code": "SOP-CLM-02",
        "id": "SOP-CLM-02",
        "title": "Case Acceptance, Policy Freezing & Initial Reserve Provisioning",
        "role": "Core PAS Specialist",
        "objective": "Claims > Case Acceptance > Decision Page (P.277-281)",
        "pdf_page": 304,
        "prerequisites": [
          "Hồ sơ bồi thường ở trạng thái 'Waiting for Acceptance' hoặc 'Acceptance in Progress'.",
          "Cán bộ tiếp nhận có thẩm quyền phân quyền xử lý tiếp nhận hồ sơ bồi thường."
        ],
        "steps": [
          "Bước 1: Từ Claims Worklist, tìm kiếm hồ sơ theo Claim Case No và nhấp chọn để mở màn hình Case Acceptance Entry Page (Figure 6, P.278).",
          "Bước 2: Cập nhật thông tin y tế ban đầu: Tra cứu mã chẩn đoán bệnh theo chuẩn quốc tế ICD-10 (Diagnosis Code & Description) và chọn Bệnh viện điều trị (Hospital Code).",
          "Bước 3: Nhấn 'Next' để chuyển sang màn hình Claims Acceptance Decision Page (Figure 7, P.279). Nhấp vào liên kết từng hợp đồng liên quan để mở trang Acceptance Policy Page.",
          "Bước 4: Bật cờ chấp nhận sản phẩm 'Accept Product = Y' cho từng sản phẩm chính và sản phẩm bổ trợ có quyền lợi tương ứng với sự kiện rủi ro.",
          "Bước 5: Kiểm tra cờ phong tỏa hợp đồng 'Freeze Policy Indicator': Hệ thống tự động thiết lập Freeze Policy = TRUE đối với quyền lợi Tử vong (bắt buộc, không được chỉnh sửa) để phong tỏa toàn bộ giao dịch CS và thu phí (P.323, 333).",
          "Bước 6: Kiểm tra số tiền dự phòng ban đầu (Notified Amount / Initial Case Reserve): Hệ thống tự động tính toán theo công thức định phí sản phẩm.",
          "Bước 7: Nhấn 'Submit'. Hệ thống thực thi tự động bán toàn bộ đơn vị quỹ (Auto-Unit Liquidation) nếu là hợp đồng liên kết đầu tư (ILP) đối với ca Death/TPD, cập nhật trạng thái hồ sơ thành 'Waiting for Evaluation' (P.281, 334)."
        ],
        "fields_table": [
          {
            "name": "Diagnosis Code (ICD-10)",
            "type": "Fuzzy Search Lookup",
            "required": "Yes",
            "desc": "Mã bệnh án chuẩn quốc tế ICD-10 (ví dụ C34: Ung thư phổi, I21: Nhồi máu cơ tim)"
          },
          {
            "name": "Hospital Code",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Bệnh viện hoặc cơ sở y tế nơi điều trị"
          },
          {
            "name": "Accept Product Flag",
            "type": "Toggle (Y/N)",
            "required": "Yes",
            "desc": "Đánh dấu chấp nhận đưa sản phẩm/quyền lợi vào thẩm định"
          },
          {
            "name": "Freeze Policy Flag",
            "type": "Checkbox (Locked)",
            "required": "Yes",
            "desc": "Tự động khóa hợp đồng đối với hồ sơ Tử vong"
          },
          {
            "name": "Notified Amount",
            "type": "Currency (Auto-calc)",
            "required": "Yes",
            "desc": "Dự phòng bồi thường tự động ghi nhận ban đầu"
          },
          {
            "name": "Price Effective Date",
            "type": "Date (ILP Only)",
            "required": "No",
            "desc": "Ngày chốt giá định giá bán đơn vị quỹ cho hợp đồng ILP"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-003",
            "ruleName": "Mandatory ICD-10 Diagnosis Code",
            "errorCode": "ERR_CLM_MISSING_DIAGNOSIS_CODE",
            "severity": "HARD_STOP",
            "condition": "Bắt buộc phải nhập Mã chẩn đoán y tế (ICD-10) trước khi submit chấp nhận hồ sơ cho tất cả các loại hình bồi thường (P.333).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-004",
            "ruleName": "Policy Eligibility & Active Coverage Validation",
            "errorCode": "ERR_CLM_POLICY_INELIGIBLE",
            "severity": "HARD_STOP",
            "condition": "Chặn tiếp nhận nếu: 1) Hợp đồng đang bị Freeze bởi giao dịch CS khác; 2) Ngày sự kiện nằm ngoài thời hạn bảo hiểm (Event Date < Commencement Date hoặc > Coverage End Date); 3) Hợp đồng đã Lapsed quá 60 ngày gia hạn (P.334).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-005",
            "ruleName": "Mandatory Death Claim Policy Freezing",
            "errorCode": "ERR_CLM_DEATH_FREEZE_MANDATORY",
            "severity": "HARD_STOP",
            "condition": "Đối với yêu cầu bồi thường Tử vong, cờ Freeze Policy bắt buộc là YES và không được phép ghi đè (EditLockPolicy = N) nhằm bảo vệ an toàn tài sản (P.323, 333).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      },
      {
        "code": "SOP-CLM-03",
        "id": "SOP-CLM-03",
        "title": "Medical Bill Processing, Inpatient Days & Deductible/Co-pay Assessment",
        "role": "Core PAS Specialist",
        "objective": "Claims > Medical Bill Entry (P.300-301, 327-328)",
        "pdf_page": 304,
        "prerequisites": [
          "Loại hồ sơ bồi thường là Medical Reimbursement (MED) hoặc Hospital Cash.",
          "Đã thu thập đầy đủ hóa đơn tài chính VAT bệnh viện, bảng kê chi tiết viện phí và giấy ra viện."
        ],
        "steps": [
          "Bước 1: Từ màn hình Case Acceptance hoặc Evaluation, nhấp chọn nút 'Medical Bill' để mở giao diện quản lý hóa đơn viện phí (P.300).",
          "Bước 2: Nhấn 'Add Bill' và chọn Medical Bill Type: Inpatient Medical Bill (Nội trú), Outpatient Medical Bill (Ngoại trú), hoặc Dental Bill (Nha khoa).",
          "Bước 3: Nhập thông tin hành chính viện phí: Số hóa đơn VAT, Ngày vào viện (Admission Date), Ngày ra viện (Discharge Date), Số ngày nằm viện thực tế (Inpatient Days), và Khoa phòng điều trị (ICU / Tiêu chuẩn).",
          "Bước 4: Nhập chi tiết các khoản mục chi phí: Tiền phòng & ăn uống (Room & Board), Tiền phẫu thuật (Surgical Fees), Chi phí thuốc men (Prescription Drugs), Chi phí xét nghiệm/chẩn đoán hình ảnh, và Vật tư y tế.",
          "Bước 5: Bấm 'Compute Bill'. Hệ thống tự động tính toán các khoản chi phí không thuộc phạm vi bảo hiểm (Non-covered / Excluded Items), chi phí vượt hạn mức ngày nằm viện (Room Limit Exceeded).",
          "Bước 6: Hệ thống áp dụng Mức miễn thường (Deductible Amount) theo quy tắc khấu trừ trước, sau đó nhân với Tỷ lệ đồng chi trả (Co-insurance % ví dụ 80% công ty trả / 20% khách hàng chi trả), tính ra Số tiền chi trả bồi thường y tế hợp lý (Eligible Payable Amount) (P.328).",
          "Bước 7: Nhấn 'Save' để liên kết viện phí đã thẩm định vào tổng quyền lợi bồi thường của hợp đồng."
        ],
        "fields_table": [
          {
            "name": "Medical Bill Type",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Inpatient, Outpatient, Day Surgery, Emergency Outpatient"
          },
          {
            "name": "Bill / Invoice Number",
            "type": "Text",
            "required": "Yes",
            "desc": "Số hóa đơn tài chính VAT hợp lệ của bệnh viện"
          },
          {
            "name": "Admission Date & Discharge Date",
            "type": "Date Range",
            "required": "Yes",
            "desc": "Thời gian điều trị nội trú thực tế"
          },
          {
            "name": "Inpatient Days",
            "type": "Integer (Auto)",
            "required": "Yes",
            "desc": "Số ngày nằm viện nội trú tính toán"
          },
          {
            "name": "ICU Days",
            "type": "Integer",
            "required": "No",
            "desc": "Số ngày nằm phòng chăm sóc đặc biệt (ICU)"
          },
          {
            "name": "Total Invoiced Amount",
            "type": "Currency",
            "required": "Yes",
            "desc": "Tổng số tiền ghi trên hóa đơn bệnh viện"
          },
          {
            "name": "Non-covered Amount",
            "type": "Currency",
            "required": "No",
            "desc": "Chi phí ngoài phạm vi (thuốc bổ, dịch vụ tự chọn)"
          },
          {
            "name": "Deductible Applied",
            "type": "Currency (Auto)",
            "required": "Yes",
            "desc": "Mức miễn thường khấu trừ theo quy tắc sản phẩm"
          },
          {
            "name": "Co-insurance Ratio",
            "type": "Percentage",
            "required": "Yes",
            "desc": "Tỷ lệ đồng chi trả của công ty bảo hiểm (80%, 90%, 100%)"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-006",
            "ruleName": "Discharge Date Must Be Greater Than Admission Date",
            "errorCode": "ERR_CLM_INVALID_HOSPITAL_DATES",
            "severity": "HARD_STOP",
            "condition": "Ngày ra viện phải bằng hoặc sau ngày vào viện. Số ngày nằm viện không được vượt quá thời gian nằm viện thực tế giữa 2 mốc ngày (P.300).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-007",
            "ruleName": "Medical Bill Deductible & Co-pay Calculation Integrity",
            "errorCode": "ERR_CLM_BILL_MATH_MISMATCH",
            "severity": "HARD_STOP",
            "condition": "Tổng chi trả viện phí = Min(Chi phí hợp lệ sau miễn thường * Tỷ lệ đồng chi trả, Hạn mức tối đa năm còn lại). Không được chi trả vượt quá hóa đơn thực tế (P.328).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      },
      {
        "code": "SOP-CLM-04",
        "id": "SOP-CLM-04",
        "title": "Benefit Liability Evaluation & Claim Accumulator Tracking",
        "role": "Core PAS Specialist",
        "objective": "Claims > Policy Evaluation > Liability Evaluation (P.283-288)",
        "pdf_page": 304,
        "prerequisites": [
          "Hồ sơ bồi thường ở trạng thái 'Waiting for Evaluation'.",
          "Các hóa đơn y tế (nếu có) đã được hoàn tất nhập liệu và kiểm tra tính hợp lệ."
        ],
        "steps": [
          "Bước 1: Từ Claims Worklist, nhấp mở hồ sơ đang chờ thẩm định để hiển thị màn hình Case Summary of Evaluation (Figure 9, P.281).",
          "Bước 2: Nhấp vào từng sản phẩm được chấp thuận để mở trang Claims Policy Evaluation Page (Figure 10, P.283).",
          "Bước 3: Tại vùng Liability Evaluation, tích chọn quyền lợi bảo hiểm tương ứng cần giải quyết (Tử vong, Thương tật, Bệnh hiểm nghèo, Viện phí, Phẫu thuật).",
          "Bước 4: Nhấn nút 'Compute' để hệ thống tự động chạy công thức định phí: Tính toán Evaluation Payment Amount (Số tiền theo công thức lý thuyết) và Claimed Payment Amount (Số tiền sau khi trừ các giới hạn tích lũy Accumulator) (P.287).",
          "Bước 5: Nhấp liên kết Accumulator Information để kiểm tra lịch sử chi trả lũy kế: Đối chiếu Hạn mức trọn đời (Lifetime Limit), Hạn mức theo năm hợp đồng (Annual Limit), và Hạn mức theo đợt điều trị (Per Event Limit).",
          "Bước 6: Trường hợp cần điều chỉnh: Nhập số tiền điều chỉnh tại ô Payment Amount trong mục Product Adjustment và ghi rõ lý do chuyên môn (P.284).",
          "Bước 7: Chọn Quyết định bồi thường tại mục Claim Decision: Admit (Chấp thuận chi trả 100%), Ex-gratia-Full (Chi trả nhân đạo 100%), Ex-gratia-Partial (Chi trả nhân đạo một phần), Repudiate (Từ chối bồi thường), hoặc Denied & Rescind (Từ chối và hủy hợp đồng) (P.285, 290).",
          "Bước 8: Nhấn 'Save' để cập nhật kết quả thẩm định quyền lợi của từng sản phẩm."
        ],
        "fields_table": [
          {
            "name": "Liability Name",
            "type": "Text (Read-only)",
            "required": "Yes",
            "desc": "Tên quyền lợi bảo hiểm cụ thể đang thẩm định"
          },
          {
            "name": "Sum Assured @ Event Date",
            "type": "Currency",
            "required": "Yes",
            "desc": "Số tiền bảo hiểm có hiệu lực tại ngày xảy ra sự kiện"
          },
          {
            "name": "Evaluation Payment Amount",
            "type": "Currency (Auto-calc)",
            "required": "Yes",
            "desc": "Số tiền tính toán lý thuyết theo công thức sản phẩm"
          },
          {
            "name": "Remaining Accumulator Limit",
            "type": "Currency (Read-only)",
            "required": "Yes",
            "desc": "Hạn mức tích lũy còn lại trong năm hoặc trọn đời"
          },
          {
            "name": "Actual Payment Amount",
            "type": "Currency",
            "required": "Yes",
            "desc": "Số tiền thực tế quyết định chi trả (sau điều chỉnh)"
          },
          {
            "name": "Claim Decision",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Admit, Ex-gratia-Full, Ex-gratia-Partial, Repudiate, Rescind"
          },
          {
            "name": "Adjustment Reason",
            "type": "Dropdown List & Textarea",
            "required": "No",
            "desc": "Lý do điều chỉnh số tiền chi trả"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-008",
            "ruleName": "Accumulator Remaining Limit Hard Stop",
            "errorCode": "ERR_CLM_ACCUMULATOR_EXCEEDED",
            "severity": "HARD_STOP",
            "condition": "Số tiền chi trả thẩm định không được vượt quá Hạn mức bồi thường lũy kế còn lại (Remaining Accumulator Limit) của quyền lợi đó (P.284, 287).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-009",
            "ruleName": "Mandatory Repudiation Reason Justification",
            "errorCode": "ERR_CLM_REPUDIATE_REASON_REQ",
            "severity": "HARD_STOP",
            "condition": "Nếu quyết định là Repudiate hoặc Denied & Rescind, bắt buộc phải chọn Mã lý do từ chối chuẩn và nhập thuyết minh căn cứ pháp lý/y khoa chi tiết (P.285, 290).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      },
      {
        "code": "SOP-CLM-05",
        "id": "SOP-CLM-05",
        "title": "Waiver of Premium (WP) Evaluation & Policy Premium Waiver Activation",
        "role": "Core PAS Specialist",
        "objective": "Claims > Case Evaluation > Waive Claims Evaluation (P.289-291)",
        "pdf_page": 304,
        "prerequisites": [
          "Hợp đồng có đính kèm sản phẩm bổ trợ Miễn đóng phí (Waiver of Premium Rider) hoặc có điều khoản miễn đóng phí trong sản phẩm chính.",
          "Người được bảo hiểm của quyền lợi miễn phí đã thỏa mãn định nghĩa tổn thất (Bệnh hiểm nghèo giai đoạn cuối, TPD, hoặc tử vong đối với gói bảo hiểm cho con)."
        ],
        "steps": [
          "Bước 1: Trên trang Case Evaluation - Policy, nhấp chọn sản phẩm bổ trợ Miễn đóng phí đã được chấp thuận (P.289).",
          "Bước 2: Trong mục Liability Evaluation, tích chọn quyền lợi Waiver Liability và nhấn 'Compute'.",
          "Bước 3: Tại phần Evaluated Product Options: Đánh dấu thiết lập cờ 'Premium Waive = YES' (P.290).",
          "Bước 4: Thiết lập Ngày bắt đầu miễn phí (Waiver Start Date): Mặc định là Ngày đến hạn đóng phí tiếp theo (Next Due Date - NDD) ngay sau ngày xảy ra sự kiện tổn thất.",
          "Bước 5: Thiết lập Ngày kết thúc miễn phí (Waiver End Date): Mặc định bằng Ngày đáo hạn của sản phẩm được miễn phí (Product Expiry Date) hoặc khi Người được bảo hiểm đạt độ tuổi tối đa theo quy tắc sản phẩm.",
          "Bước 6: Kiểm tra số tiền bảo hiểm được miễn: Sum Assured Waived = 100% Phí bảo hiểm định kỳ của các sản phẩm được bảo hộ (P.291, 340).",
          "Bước 7: Nhấn 'Save'. Hệ thống tự động cập nhật Policy Payment Summary: Đổi trạng thái phí của các sản phẩm liên quan thành 'Premium Waived', ngăn chặn việc kết xuất hóa đơn thu phí định kỳ trong tương lai nhưng duy trì hợp đồng Inforce đầy đủ."
        ],
        "fields_table": [
          {
            "name": "Premium Waive Flag",
            "type": "Toggle (Y/N)",
            "required": "Yes",
            "desc": "Kích hoạt trạng thái miễn đóng phí cho hợp đồng"
          },
          {
            "name": "Waiver Effective Start Date",
            "type": "Date Picker",
            "required": "Yes",
            "desc": "Ngày bắt đầu có hiệu lực miễn nộp phí (Next Due Date)"
          },
          {
            "name": "Waiver Effective End Date",
            "type": "Date Picker",
            "required": "Yes",
            "desc": "Ngày kết thúc thời gian miễn nộp phí"
          },
          {
            "name": "Annual Waived Premium Amount",
            "type": "Currency (Auto)",
            "required": "Yes",
            "desc": "Tổng số phí bảo hiểm hàng năm được miễn trừ"
          },
          {
            "name": "Waived Products Covered",
            "type": "Multi-select List",
            "required": "Yes",
            "desc": "Danh sách các sản phẩm/rider được hưởng cơ chế miễn phí"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-010",
            "ruleName": "Waiver Start Date Alignment Rule",
            "errorCode": "ERR_CLM_INVALID_WAIVER_START_DATE",
            "severity": "HARD_STOP",
            "condition": "Ngày bắt đầu miễn phí phải là Ngày đến hạn đóng phí kế tiếp (NDD) sau ngày tổn thất. Không được miễn phí hồi tố cho kỳ phí đã thanh toán trước ngày tổn thất (P.290, 340).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-011",
            "ruleName": "Waiver End Date Cannot Exceed Product Expiry",
            "errorCode": "ERR_CLM_WAIVER_END_EXCEEDS_EXPIRY",
            "severity": "HARD_STOP",
            "condition": "Ngày kết thúc miễn phí không được vượt quá ngày kết thúc thời hạn đóng phí hoặc ngày đáo hạn của hợp đồng chính (P.290).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      },
      {
        "code": "SOP-CLM-06",
        "id": "SOP-CLM-06",
        "title": "Disbursement Planning, Debt Offsetting & Payee Priority Engine",
        "role": "Core PAS Specialist",
        "objective": "Claims > Case Summary > Disbursement Plan (P.292-295, 337-339)",
        "pdf_page": 304,
        "prerequisites": [
          "Tất cả các sản phẩm và quyền lợi trong hồ sơ bồi thường đã được hoàn tất thẩm định (All products evaluated - P.336).",
          "Tổng số tiền chi trả ròng (Net Benefit Amount) đã được chốt và cân bằng."
        ],
        "steps": [
          "Bước 1: Tại màn hình Case Summary, nhấp chọn mục 'Benefit Amount Allocation / Disbursement Plan' để mở giao diện lập kế hoạch chi trả (Figure 13, P.293).",
          "Bước 2: Thực hiện cấn trừ công nợ tự động (Automatic Debt Offsetting): Đối với ca bồi thường Tử vong, hệ thống tự động cấn trừ Dư nợ gốc vay hợp đồng + Lãi vay dồn tích (từ T_POL_LOAN) và Phí bảo hiểm định kỳ còn nợ nếu tử vong trong 60 ngày gia hạn (từ T_BCP_INVOICE) (P.286).",
          "Bước 3: Xác định Phương thức chi trả (Disbursement Plan Type): Chọn 'Lump Sum' (Chi trả 1 lần) hoặc 'Installment' (Chi trả phân kỳ niên kim đối với TPD - P.294).",
          "Bước 4: Chạy Động cơ Phân bổ Người thụ hưởng (Payee Hierarchy Engine): Hệ thống tự động thiết lập danh sách người nhận tiền (Payee List) theo thứ tự ưu tiên: 1) Assignee (nếu có chuyển nhượng); 2) Trustee (nếu có ủy thác); 3) Beneficiary Nominees (theo tỷ lệ % chỉ định); 4) Policyholder (P.337-338).",
          "Bước 5: Kiểm tra tính cân bằng phân bổ: Tổng Allocated Disbursement Amount phải bằng chính xác 100% số tiền chi trả sau cấn trừ (Disbursement Balance = 0 VND).",
          "Bước 6: Chọn Kênh thanh toán cho từng Payee: Direct Credit (Chuyển khoản ngân hàng - nhập Tên ngân hàng, Chi nhánh, Số tài khoản, Tên chủ TK), Nhận tiền mặt tại quầy (Cheque / Cashier), hoặc Chuyển nộp phí cho hợp đồng khác (Transfer to Policy) (P.338).",
          "Bước 7: Nhấn 'Save' để hoàn tất kế hoạch giải ngân."
        ],
        "fields_table": [
          {
            "name": "Gross Claim Payable",
            "type": "Currency (Auto)",
            "required": "Yes",
            "desc": "Tổng quyền lợi bồi thường gộp được duyệt"
          },
          {
            "name": "Offset: Policy Loan Principal & Interest",
            "type": "Currency (Auto)",
            "required": "Yes",
            "desc": "Dư nợ gốc vay hợp đồng và lãi vay lũy kế tự động cấn trừ"
          },
          {
            "name": "Offset: Unpaid Grace Premium",
            "type": "Currency (Auto)",
            "required": "Yes",
            "desc": "Phí bảo hiểm nợ trong 60 ngày gia hạn tự động cấn trừ"
          },
          {
            "name": "Net Disbursement Amount",
            "type": "Currency (Auto)",
            "required": "Yes",
            "desc": "Số tiền bồi thường ròng thực nhận của khách hàng"
          },
          {
            "name": "Disbursement Method",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Lump Sum (1 lần), Installment Annuity (Phân kỳ hàng năm)"
          },
          {
            "name": "Payee Name & ID",
            "type": "Party Lookup",
            "required": "Yes",
            "desc": "Người nhận quyền lợi theo thứ tự ưu tiên pháp lý"
          },
          {
            "name": "Allocation Share %",
            "type": "Percentage",
            "required": "Yes",
            "desc": "Tỷ lệ phân chia quyền lợi (Tổng = 100%)"
          },
          {
            "name": "Payment Method",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Direct Credit (Ngân hàng), Cheque, Transfer to Policy"
          },
          {
            "name": "Bank Name & Account No",
            "type": "Bank Lookup & Text",
            "required": "Yes",
            "desc": "Thông tin tài khoản ngân hàng thụ hưởng chính chủ"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-012",
            "ruleName": "Allocated Amount Must Exactly Match Payable Balance",
            "errorCode": "ERR_CLM_DISBURSEMENT_SUM_MISMATCH",
            "severity": "HARD_STOP",
            "condition": "Tổng số tiền phân bổ cho tất cả người thụ hưởng phải bằng 100% số tiền bồi thường ròng sau khi cấn trừ nợ (P.336).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-013",
            "ruleName": "Death Claim Outstanding Premium & Loan Offsetting",
            "errorCode": "ERR_CLM_MANDATORY_DEBT_OFFSET",
            "severity": "HARD_STOP",
            "condition": "Đối với quyền lợi Tử vong, bắt buộc phải cấn trừ toàn bộ dư nợ vay hợp đồng và phí nợ gia hạn trước khi giải ngân cho người thụ hưởng (P.286, 334).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          },
          {
            "ruleId": "VAL-CLM-014",
            "ruleName": "Beneficiary Allocation Percentage Sum Must Equal 100%",
            "errorCode": "ERR_CLM_BENEFICIARY_SHARE_SUM_INVALID",
            "severity": "HARD_STOP",
            "condition": "Tổng tỷ lệ phần trăm phân bổ cho các Người thụ hưởng chỉ định bắt buộc phải bằng chính xác 100.00% (P.338).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      },
      {
        "code": "SOP-CLM-07",
        "id": "SOP-CLM-07",
        "title": "Fraud Investigation, Medical Report Fee & Claims UW Referral",
        "role": "Core PAS Specialist",
        "objective": "Claims > Investigation / Claim UW (P.302-304, 316, 330)",
        "pdf_page": 304,
        "prerequisites": [
          "Hồ sơ bồi thường xuất hiện dấu hiệu nghi ngờ gian lận (Red Flag), hoặc tử vong trong vòng 2 năm thử thách (Contestable Period), hoặc hồ sơ phức tạp cần ý kiến chuyên gia Underwriting."
        ],
        "steps": [
          "Bước 1: Từ màn hình Case Acceptance hoặc Evaluation, nhấp chọn nút 'Escalation' hoặc 'Underwriting' (P.280, 303).",
          "Bước 2: Trường hợp Điều tra trục lợi (Investigation Referral): Chọn Escalation Type = 'Claim Investigator', chọn Lý do Red Flag: Suspicious Claim, Frequent Claims, hoặc Unclear Death Circumstances (P.330). Nhập yêu cầu điều tra chi tiết và gửi hồ sơ.",
          "Bước 3: Điều tra viên (Claim Investigator) nhận hồ sơ tại Worklist, tiến hành xác minh thực địa tại bệnh viện, hiện trường tai nạn, công an địa phương, và tải lên Báo cáo điều tra (Investigation Report) tại mục Document List (P.298, 302).",
          "Bước 4: Trường hợp Thẩm định lại rủi ro (Claim UW Referral): Nhấp chọn nút 'Underwriting' để mở giao diện Claim UW Main UI (Figure 23, P.304). Bác sĩ thẩm định rà soát lịch sử kê khai sức khỏe ban đầu so với bệnh án thực tế, đưa ra ý kiến thẩm định chuyên môn (UW Opinion: Admit, Rescind do không kê khai trung thực, hoặc Exclude).",
          "Bước 5: Trường hợp cần thanh toán phí trích sao bệnh án: Truy cập menu Claims > Medical Report Fee, tạo phiếu chi trả chi phí thu thập bệnh án cho Bệnh viện/Phòng khám với số tiền quy định (P.316).",
          "Bước 6: Trưởng ban điều tra hoặc Bác sĩ UW gửi phản hồi chính thức (Respond Escalation). Trạng thái hồ sơ được cập nhật và quay trở lại bàn làm việc của Cán bộ bồi thường để tiếp tục quy trình."
        ],
        "fields_table": [
          {
            "name": "Escalation Type",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Claim Investigator, Senior Claim Specialist, Claims Underwriter"
          },
          {
            "name": "Reason for Fraud / Red Flag",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Suspicious Claim, Frequent Claims, Contestable Period, Early Claim"
          },
          {
            "name": "Investigation Instructions",
            "type": "Textarea",
            "required": "Yes",
            "desc": "Nội dung chỉ đạo xác minh thực địa và đối chiếu hồ sơ"
          },
          {
            "name": "Investigator Report Findings",
            "type": "Textarea & Attachment",
            "required": "No",
            "desc": "Kết luận điều tra thực tế kèm tài liệu bằng chứng"
          },
          {
            "name": "UW Clinical Recommendation",
            "type": "Dropdown & Textarea",
            "required": "No",
            "desc": "Ý kiến kết luận của Bác sĩ thẩm định y khoa"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-015",
            "ruleName": "Pending Investigation / UW Referral Must Be Responded Before Approval",
            "errorCode": "ERR_CLM_PENDING_ESCALATION_BLOCK",
            "severity": "HARD_STOP",
            "condition": "Không thể nộp hồ sơ phê duyệt nếu yêu cầu điều tra hoặc trưng cầu ý kiến Underwriting chưa được gửi phản hồi chính thức (P.336).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      },
      {
        "code": "SOP-CLM-08",
        "id": "SOP-CLM-08",
        "title": "Claims Multi-Level DOA Approval, Settlement Execution & Case Reversal",
        "role": "Core PAS Specialist",
        "objective": "Claims > Case Approval & Reversal (P.296-297, 310-311, 340-341)",
        "pdf_page": 304,
        "prerequisites": [
          "Kế hoạch chi trả (Disbursement Plan) đã được cân bằng chính xác.",
          "Tất cả các yêu cầu điều tra, bổ sung tài liệu và query letter đã được phản hồi hoàn tất.",
          "Cấp duyệt đăng nhập có hạn mức phân quyền tài chính (DOA Level) lớn hơn hoặc bằng tổng số tiền bồi thường cần duyệt."
        ],
        "steps": [
          "Bước 1: Trình duyệt hồ sơ: Từ Case Evaluation, nhấn 'Submit for Approval'. Hồ sơ chuyển sang trạng thái 'Waiting for Approval' (P.296).",
          "Bước 2: Cán bộ phê duyệt có thẩm quyền mở Claims Approval Worklist, chọn hồ sơ thuộc hạn mức DOA của mình (Figure 16, P.297).",
          "Bước 3: Rà soát toàn diện: Kiểm tra lại diễn biến tổn thất, mã ICD-10, bảng tính cấn trừ nợ vay/phí nợ, và danh sách người thụ hưởng.",
          "Bước 4: Nhập quyết định phê duyệt: Nhấp 'Approve' (Đồng thuận chi trả), hoặc 'Reject' (Từ chối duyệt), hoặc 'Escalate' (Trình lên cấp thẩm quyền cao hơn nếu vượt hạn mức) (P.340).",
          "Bước 5: Thực thi giải ngân & Cập nhật vòng đời hợp đồng tự động (Post-Claim Life Cycle Updates - P.340-341):",
          "  a. Sinh chứng từ công nợ phải trả bồi thường sang hệ thống Tài chính kế toán (Accounts Payable voucher): Hạch toán Nợ TK 6211 / Có TK 3318 và Nợ TK 3318 / Có TK 1113.",
          "  b. Thu hồi nợ vay: Hạch toán Có TK 1288 (Tạm ứng đóng phí/Vay HĐ) và Có TK 4111 (Doanh thu phí bảo hiểm nợ).",
          "  c. Cập nhật trạng thái hợp đồng: Nếu là bồi thường Tử vong Hợp đồng chính -> Chuyển trạng thái Policy Status thành 'TERMINATED_CLAIM', đồng thời chấm dứt toàn bộ Riders.",
          "  d. Cập nhật trạng thái khách hàng: Đối với ca Tử vong, chuyển trạng thái Party Status của Người được bảo hiểm thành 'DECEASED' (P.341).",
          "Bước 6: Nghiệp vụ Hủy bồi thường / Thu hồi (Claims Reversal - P.310-311): Trường hợp phát hiện sai sót sau khi đã duyệt, cấp quản lý truy cập menu Claims > Reverse Case, nhập mã hồ sơ và lý do thu hồi, kích hoạt giao dịch đảo bút toán kế toán, khôi phục trạng thái hợp đồng Inforce và gửi thông báo thu hồi tiền bồi thường."
        ],
        "fields_table": [
          {
            "name": "Approval Officer ID & Role",
            "type": "Text (Read-only)",
            "required": "Yes",
            "desc": "Mã và chức danh người đang thực hiện phê duyệt"
          },
          {
            "name": "Officer Financial Authority Cap",
            "type": "Currency (Read-only)",
            "required": "Yes",
            "desc": "Hạn mức tiền tối đa người duyệt được quyền quyết định"
          },
          {
            "name": "Total Claim Payable to Approve",
            "type": "Currency (Read-only)",
            "required": "Yes",
            "desc": "Tổng số tiền bồi thường cần phê duyệt của hồ sơ"
          },
          {
            "name": "Approval Decision",
            "type": "Dropdown List",
            "required": "Yes",
            "desc": "Approve (Duyệt), Reject (Bác bỏ), Escalate (Trình lên cấp trên)"
          },
          {
            "name": "Approval Comments",
            "type": "Textarea",
            "required": "Yes",
            "desc": "Ý kiến phê duyệt hoặc lý do yêu cầu điều chỉnh"
          },
          {
            "name": "Post-Approval Policy Status",
            "type": "Badge (Auto)",
            "required": "Yes",
            "desc": "Trạng thái hợp đồng sau khi duyệt: TERMINATED, WAIVED, INFORCE_PAID"
          },
          {
            "name": "Party Status Updated",
            "type": "Badge (Auto)",
            "required": "Yes",
            "desc": "Trạng thái khách hàng cập nhật: DECEASED"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-CLM-016",
            "ruleName": "DOA Financial Authority Limit Enforcement",
            "errorCode": "ERR_CLM_APPROVAL_LIMIT_EXCEEDED",
            "severity": "HARD_STOP",
            "condition": "Người phê duyệt chỉ được duyệt các hồ sơ có tổng giá trị bồi thường và giá trị miễn phí nằm trong hạn mức ủy quyền tài chính được cấp. Vượt hạn mức bắt buộc phải trình Escalation lên cấp cao hơn (P.340).",
            "systemAction": "Hệ thống chặn giao dịch và hiển thị thông báo lỗi",
            "actuarialBasis": "Bảo toàn an toàn tài chính và tuân thủ quy tắc nghiệp vụ",
            "pdfPage": 304
          }
        ]
      }
    ],
    "sop_count": 8,
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
        "ruleName": "Event Date & Notification Date Future Check",
        "errorCode": "ERR_CLM_FUTURE_DATE_INVALID",
        "severity": "HARD_STOP",
        "condition": "Ngày xảy ra sự kiện và Ngày thông báo bồi thường không được trễ hơn Ngày kinh doanh hiện tại của hệ thống Core PAS (Event Date <= System Date && Notification Date <= System Date).",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-002",
        "ruleName": "Life Assured Existence & Contract Binding",
        "errorCode": "ERR_CLM_INVALID_LIFE_ASSURED",
        "severity": "HARD_STOP",
        "condition": "Bắt buộc hồ sơ bồi thường phải gắn với Người được bảo hiểm hợp lệ và có hợp đồng bảo hiểm hiệu lực tương ứng trong hệ thống.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-003",
        "ruleName": "Mandatory International ICD-10 Diagnosis Code",
        "errorCode": "ERR_CLM_MISSING_DIAGNOSIS_CODE",
        "severity": "HARD_STOP",
        "condition": "Bắt buộc phải nhập Mã chẩn đoán y tế ICD-10 trước khi gửi chấp nhận hồ sơ (Case Acceptance Submit) cho tất cả các loại hình bồi thường.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-004",
        "ruleName": "Active Coverage Date Range Enforcement",
        "errorCode": "ERR_CLM_POLICY_INELIGIBLE",
        "severity": "HARD_STOP",
        "condition": "Chặn tiếp nhận nếu Ngày xảy ra sự kiện rủi ro nằm ngoài thời hạn bảo hiểm (Event Date < Risk Commencement Date hoặc Event Date > Coverage End Date).",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-005",
        "ruleName": "Automatic Mandatory Policy Freezing on Death",
        "errorCode": "ERR_CLM_DEATH_FREEZE_MANDATORY",
        "severity": "HARD_STOP",
        "condition": "Đối với yêu cầu bồi thường Tử vong (Death Claim), hệ thống bắt buộc kích hoạt cờ Freeze Policy = TRUE và không cho phép người dùng bỏ chọn để phong tỏa toàn bộ giao dịch hợp đồng.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-006",
        "ruleName": "Medical Bill Inpatient Date Sequence Check",
        "errorCode": "ERR_CLM_INVALID_HOSPITAL_DATES",
        "severity": "HARD_STOP",
        "condition": "Ngày ra viện (Discharge Date) phải lớn hơn hoặc bằng Ngày vào viện (Admission Date). Số ngày nằm viện không được vượt quá khoảng cách thực tế giữa hai ngày.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-007",
        "ruleName": "Medical Deductible & Co-insurance Math Validation",
        "errorCode": "ERR_CLM_BILL_MATH_MISMATCH",
        "severity": "HARD_STOP",
        "condition": "Số tiền bồi thường viện phí hợp lệ được tính chính xác: Eligible Amount = Min(Invoiced Amount - Excluded Items - Deductible, Annual Cap) * Co-insurance %.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-008",
        "ruleName": "Accumulator Remaining Limit Hard Stop",
        "errorCode": "ERR_CLM_ACCUMULATOR_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "Số tiền thẩm định bồi thường không được vượt quá Hạn mức bồi thường lũy kế còn lại (Remaining Accumulator Limit) của quyền lợi đó trong năm hoặc trọn đời.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-009",
        "ruleName": "Mandatory Reason Code for Claim Repudiation / Rescission",
        "errorCode": "ERR_CLM_REPUDIATE_REASON_REQ",
        "severity": "HARD_STOP",
        "condition": "Khi quyết định bồi thường là Repudiate (Từ chối) hoặc Denied & Rescind (Hủy HĐ), bắt buộc phải chọn Mã lý do từ chối chuẩn và nhập đầy đủ thuyết minh căn cứ pháp lý/y khoa.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-010",
        "ruleName": "Waiver of Premium Start Date Alignment",
        "errorCode": "ERR_CLM_INVALID_WAIVER_START_DATE",
        "severity": "HARD_STOP",
        "condition": "Ngày bắt đầu có hiệu lực miễn nộp phí bảo hiểm (Waiver Start Date) phải trùng khớp với Ngày đến hạn đóng phí định kỳ kế tiếp (Next Due Date) sau ngày sự kiện tổn thất.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-011",
        "ruleName": "Waiver End Date Expiry Boundary Check",
        "errorCode": "ERR_CLM_WAIVER_END_EXCEEDS_EXPIRY",
        "severity": "HARD_STOP",
        "condition": "Ngày kết thúc thời hạn miễn đóng phí không được vượt quá Ngày kết thúc thời hạn đóng phí hoặc Ngày đáo hạn của sản phẩm được bảo vệ.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-012",
        "ruleName": "Disbursement Allocation Mathematical Balance (100% Match)",
        "errorCode": "ERR_CLM_DISBURSEMENT_SUM_MISMATCH",
        "severity": "HARD_STOP",
        "condition": "Tổng số tiền phân bổ trong Kế hoạch chi trả (Allocated Disbursement Amount) phải bằng chính xác 100% Số tiền bồi thường ròng phải chi trả (Balance Amount = 0 VND).",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-013",
        "ruleName": "Death Claim Automatic Debt & Outstanding Premium Offsetting",
        "errorCode": "ERR_CLM_MANDATORY_DEBT_OFFSET",
        "severity": "HARD_STOP",
        "condition": "Đối với quyền lợi Tử vong, hệ thống bắt buộc tự động khấu trừ toàn bộ Dư nợ vay hợp đồng gốc + Lãi vay gộp và Phí bảo hiểm định kỳ còn nợ (trong 60 ngày gia hạn) trước khi giải ngân.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-014",
        "ruleName": "Beneficiary Nominee Share Percentage Sum = 100%",
        "errorCode": "ERR_CLM_BENEFICIARY_SHARE_SUM_INVALID",
        "severity": "HARD_STOP",
        "condition": "Tổng tỷ lệ phần trăm phân bổ cho các Người thụ hưởng chỉ định trong danh sách chi trả bắt buộc phải bằng chính xác 100.00%.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-015",
        "ruleName": "Pending Investigation & Claims UW Blocking Rule",
        "errorCode": "ERR_CLM_PENDING_ESCALATION_BLOCK",
        "severity": "HARD_STOP",
        "condition": "Chặn nộp phê duyệt hồ sơ nếu có yêu cầu Điều tra xác minh gian lận hoặc yêu cầu Thẩm định rủi ro y khoa đang ở trạng thái Pending chưa có ý kiến phản hồi.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
      },
      {
        "ruleId": "VAL-CLM-016",
        "ruleName": "DOA Multi-Level Financial Authority Limit Enforcement",
        "errorCode": "ERR_CLM_APPROVAL_LIMIT_EXCEEDED",
        "severity": "HARD_STOP",
        "condition": "Cán bộ phê duyệt chỉ được duyệt hồ sơ có tổng số tiền bồi thường và số tiền miễn phí nằm trong hạn mức ủy quyền tài chính DOA được phân quyền. Vượt hạn mức bắt buộc trình Escalation lên cấp cao hơn.",
        "systemAction": "Hệ thống tự động thực thi và ghi nhận lịch sử kiểm toán",
        "actuarialBasis": "Tuân thủ luật KDBH 2022 và tài liệu Gemini Core PAS",
        "pdfPage": 304
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
      {
        "term": "Hệ Thống Mã Tài Khoản Kế Toán 7 Phân Đoạn (7-Segment COA)",
        "def": "Cấu trúc mã hóa tài khoản đa chiều chuẩn bảo hiểm quốc tế: Đơn vị/Pháp nhân (Seg 1: Company), Chi nhánh hạch toán (Seg 2: Branch), Tài khoản tự nhiên (Seg 3: Natural Account), Tài khoản phụ (Seg 4: Sub-Account), Trung tâm chi phí (Seg 5: Cost Center), Mã dòng sản phẩm (Seg 6: Product Code), và Đồng tiền giao dịch (Seg 7: Currency)."
      },
      {
        "term": "Kiểm Soát Kép Phân Quyền Phê Duyệt (Dual-Control Maker-Checker)",
        "def": "Nguyên tắc kiểm soát nội bộ nghiêm ngặt: Chuyên viên tạo đề nghị chi trả hoặc thu tiền (Maker) tuyệt đối không được kiêm nhiệm phê duyệt lệnh chi (Checker), ngăn chặn triệt để rủi ro gian lận tài chính."
      },
      {
        "term": "Phân Hệ Sổ Phụ Nguồn Phí (Fee Source Sub-Ledgers: Cash, ARAP, NonUnit, Unit)",
        "def": "Bóc tách các luồng giao dịch tài chính thành 4 sổ phụ độc lập: Sổ quỹ tiền mặt/ngân hàng (Cash Sub-ledger), Sổ công nợ phải thu/phải trả (ARAP Sub-ledger), Sổ phí truyền thống (NonUnit Sub-ledger), và Sổ giao dịch chứng chỉ quỹ ILP (Unit Sub-ledger)."
      },
      {
        "term": "Tài Khoản Treo Thu Phí Trung Gian (Premium Suspense Account - GL 2211)",
        "def": "Tài khoản nghĩa vụ nợ ngắn hạn lưu giữ các khoản tiền khách hàng đóng vào nhưng chưa khớp hoàn toàn với hóa đơn định kỳ, tích hợp tiến trình tự động hoàn trả (Job 13) sau 90 ngày nếu không đối soát được hợp đồng."
      },
      {
        "term": "Quyền Khấu Trừ Nghĩa Vụ Nợ Tự Động (Statutory Right of Offset)",
        "def": "Quyền năng pháp lý của doanh nghiệp bảo hiểm tự động cấn trừ mọi nghĩa vụ nợ quá hạn (dư nợ gốc vay HĐ, lãi vay dồn tích, phí bảo hiểm nợ trong 60 ngày gia hạn) trước khi giải ngân giá trị hoàn lại hoặc chi trả quyền lợi bồi thường."
      }
    ],
    "actuary_notes": [
      "Định phí sản phẩm và phương pháp trích lập dự phòng tuân thủ quy chuẩn IFRS 17 và Bộ Tài chính."
    ],
    "op_notes": [
      "Vận hành tuân thủ SLA và ma trận phân quyền DOA của Core PAS."
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
        "id": "SOP-FIN-01",
        "title": "Maintain Commercial Bank Accounts & Operating Branch Association",
        "role": "Finance Administrator",
        "objective": "Establish corporate collection and disbursement bank accounts, define ISO currency bindings, configure direct debit clearing formats, and restrict account operational permissions by servicing branch.",
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
            "errorCode": "ERR_FIN_NO_ACTIVE_BANK_ACCT",
            "severity": "HARD_STOP",
            "condition": "At least one active bank account must exist for the policy's operational branch and currency code before receipting or paying.",
            "systemAction": "Blocks cashier receipt collection and payment voucher disbursement.",
            "actuarialBasis": "Treasury governance: prevents cash handling without verified bank account reconciliation links.",
            "pdfPage": 406
          },
          {
            "ruleId": "VAL-FIN-002",
            "ruleName": "End Effective Date Greater Than Start Date",
            "errorCode": "ERR_FIN_INVALID_BANK_DATE_RANGE",
            "severity": "HARD_STOP",
            "condition": "If End Effective Date is specified, it must be strictly greater than Start Effective Date.",
            "systemAction": "Rejects bank account configuration save with date sequence error.",
            "actuarialBasis": "Prevents inverted operational date windows in treasury clearing logs.",
            "pdfPage": 410
          }
        ]
      },
      {
        "code": "SOP-FIN-02",
        "id": "SOP-FIN-02",
        "title": "Configure 7-Segment Accounting Rules & Dynamic Fee Mapping",
        "role": "General Ledger Specialist / Finance Architect",
        "objective": "Define debit and credit chart of accounts mapping for every insurance fee transaction (Cashier, AR/AP, Non-Unit, Unit) across 7 standardized GL segments.",
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
            "errorCode": "ERR_GL_UNBALANCED_ENTRY",
            "severity": "HARD_STOP",
            "condition": "Total Debit Amount must exactly equal Total Credit Amount (SUM(Dr) == SUM(Cr)) for every posted journal entry.",
            "systemAction": "Rejects journal batch posting; aborts transaction commit and routes to GL Exception queue.",
            "actuarialBasis": "Core financial accounting integrity: ensures balance sheet and revenue accounts remain strictly synchronized.",
            "pdfPage": 411
          },
          {
            "ruleId": "VAL-GL-002",
            "ruleName": "Active Accounting Rule Match Requirement",
            "errorCode": "ERR_GL_RULE_DISABLED",
            "severity": "HARD_STOP",
            "condition": "Every financial movement must match an enabled accounting rule with valid Fee Source (Cash/ARAP/Unit/NonUnit).",
            "systemAction": "Logs unmapped transaction in GL Exception Queue for Finance Administrator resolution.",
            "actuarialBasis": "Statutory audit standard: every financial movement must follow pre-defined, auditor-approved chart of accounts.",
            "pdfPage": 415
          }
        ]
      },
      {
        "code": "SOP-FIN-03",
        "id": "SOP-FIN-03",
        "title": "Payment Requisition & Multi-Disbursement Method Processing",
        "role": "Cashier / Customer Service Financial Officer",
        "objective": "Capture, consolidate, and format outgoing payments generated by upstream modules (NB refunds, Free-look cancellations, Surrenders, Policy Loans, Death/CI Claims, and Suspense refunds).",
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
            "required": "No",
            "desc": "Mandatory for Direct Credit; specifies receiving clearing bank."
          },
          {
            "name": "Payee Bank Account",
            "type": "Text (Numeric)",
            "required": "No",
            "desc": "Mandatory for Direct Credit; recipient bank account number."
          },
          {
            "name": "Target Policy No",
            "type": "Text",
            "required": "No",
            "desc": "Mandatory if Internal Transfer method selected."
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-FIN-003",
            "ruleName": "Payee Identification & KYC Verification Check",
            "errorCode": "ERR_FIN_PAYEE_NAME_MISMATCH",
            "severity": "HARD_STOP",
            "condition": "Disbursement Payee Name must exactly match Policyholder, Irrevocable Beneficiary, or Legal Assignee in T_PARTY.",
            "systemAction": "Blocks submission of Direct Credit voucher if payee differs from contractual SOR party.",
            "actuarialBasis": "AML / CFT compliance: prevents third-party unauthorized fund diversion.",
            "pdfPage": 402
          },
          {
            "ruleId": "VAL-FIN-004",
            "ruleName": "Requisition Limit Gating (Auto Temporary Fee Status)",
            "errorCode": "ROUTE_FIN_PAY_AUTH_REQUIRED",
            "severity": "ROUTING",
            "condition": "If Cash Disbursement Amount > User Role Requisition Limit, system automatically sets Temporary Fee Status.",
            "systemAction": "Freezes voucher from disbursement release; routes to Payment Authorization queue.",
            "actuarialBasis": "Dual-control segregation of duties for all significant corporate financial disbursements.",
            "pdfPage": 388
          }
        ]
      },
      {
        "code": "SOP-FIN-04",
        "id": "SOP-FIN-04",
        "title": "Payment Authorization & Maker-Checker Dual-Control Release",
        "role": "Finance Supervisor / Treasury Manager / Finance Director",
        "objective": "Review and authorize payment requisitions exceeding staff limits or generated by automated batch runs (Maturity, Cash Bonus, Death Claims), enforcing strict Maker-Checker segregation.",
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
            "required": "No",
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
            "errorCode": "ERR_FIN_MAKER_CHECKER_VIOLATION",
            "severity": "HARD_STOP",
            "condition": "The user who registered, created, or calculated a payment voucher cannot authorize or release the payment disbursement.",
            "systemAction": "Disables 'Authorize' button; throws strict segregation of duties error.",
            "actuarialBasis": "SOX & statutory corporate governance: prevents internal embezzlement and unilateral unauthorized cash movements.",
            "pdfPage": 390
          },
          {
            "ruleId": "VAL-FIN-005",
            "ruleName": "Authorization Financial Cap Enforcement",
            "errorCode": "ERR_FIN_AUTH_LIMIT_EXCEEDED",
            "severity": "HARD_STOP",
            "condition": "Voucher amount must be <= the maximum amount configured for user's authorization role tier.",
            "systemAction": "Blocks authorization; enforces escalation to higher tier (e.g. Chief Financial Officer).",
            "actuarialBasis": "Delegation of authority governance controlling enterprise liquidity risk.",
            "pdfPage": 387
          }
        ]
      },
      {
        "code": "SOP-FIN-05",
        "id": "SOP-FIN-05",
        "title": "Suspense Account Deposit Allocation & Automated Refund Reconciliation",
        "role": "Cashier Supervisor / Bank Reconciliation Specialist",
        "objective": "Process unidentified bank deposits, reconcile premium receipts parked in suspense, allocate funds to pending proposals/policies, and execute automated batch refunds for excess balances.",
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
            "errorCode": "ERR_FIN_SUSPENSE_OVER_ALLOCATED",
            "severity": "HARD_STOP",
            "condition": "Total allocated amount across all contracts must be <= Original Deposited Suspense Balance.",
            "systemAction": "Rejects allocation transaction with balance deficit error.",
            "actuarialBasis": "Prevents artificial creation of unbacked premium credits in policy ledgers.",
            "pdfPage": 360
          },
          {
            "ruleId": "VAL-FIN-007",
            "ruleName": "Suspense Balances Cannot Be Transferred to Terminated Contracts",
            "errorCode": "ERR_FIN_CANNOT_CREDIT_TERMINATED_POLICY",
            "severity": "HARD_STOP",
            "condition": "Target policy must not be in 'TERMINATED_DEATH' or 'TERMINATED_SURRENDER' status.",
            "systemAction": "Blocks policy selection in allocation modal.",
            "actuarialBasis": "Closed liability contracts cannot accept ongoing premium consideration.",
            "pdfPage": 361
          }
        ]
      },
      {
        "code": "SOP-FIN-06",
        "id": "SOP-FIN-06",
        "title": "Daily EOD Financial Batch Posting & General Ledger ERP Export",
        "role": "Batch Operator / Financial Systems Controller",
        "objective": "Execute the 4 daily financial posting batch jobs (CASH, ARAP, NONUNIT, UNIT), validate double-entry balance integrity, and generate ERP interface files (SAP / Oracle).",
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
            "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
            "severity": "HARD_STOP",
            "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
            "systemAction": "Blocks business date advancement; sends emergency notification to On-Call Financial Controller.",
            "actuarialBasis": "Prevents calendar day gaps or overlapping valuation cycles in actuarial balance sheet.",
            "pdfPage": 24
          },
          {
            "ruleId": "VAL-GL-004",
            "ruleName": "Unposted Financial Records Zero Tolerance",
            "errorCode": "ERR_GL_UNMAPPED_FEES_EXIST",
            "severity": "HARD_STOP",
            "condition": "Zero unmapped financial fee records allowed during month-end closing (EOM) batch execution.",
            "systemAction": "Halts month-end ledger lock; generates unmapped fee exception report.",
            "actuarialBasis": "Financial statement completeness: prevents unrecorded revenues or unrecognized claim expenses.",
            "pdfPage": 418
          }
        ]
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
        "ruleName": "Double-Entry Bookkeeping Zero-Balance Enforcement",
        "errorCode": "ERR_GL_UNBALANCED_ENTRY",
        "severity": "HARD_STOP",
        "condition": "For every journal transaction, Total Debit Amount must exactly equal Total Credit Amount (`SUM(Dr) == SUM(Cr)`).",
        "systemAction": "Rejects journal batch posting; aborts transaction commit.",
        "actuarialBasis": "Core financial accounting integrity: ensures balance sheet and revenue accounts remain strictly synchronized.",
        "pdfPage": 411
      },
      {
        "ruleId": "VAL-GL-002",
        "ruleName": "Active Accounting Rule Match Requirement",
        "errorCode": "ERR_GL_RULE_DISABLED",
        "severity": "HARD_STOP",
        "condition": "Every business transaction must match an enabled accounting rule with valid Fee Source (Cash/ARAP/Unit/NonUnit).",
        "systemAction": "Logs unmapped transaction in GL Exception Queue for Finance Administrator resolution.",
        "actuarialBasis": "Statutory audit standard: every financial movement must follow pre-defined, auditor-approved chart of accounts.",
        "pdfPage": 415
      },
      {
        "ruleId": "VAL-GL-003",
        "ruleName": "Maker-Checker Segregation of Duties for Payments",
        "errorCode": "ERR_FIN_MAKER_CHECKER_VIOLATION",
        "severity": "HARD_STOP",
        "condition": "The user who registered or calculated a payment voucher cannot authorize or release the payment disbursement.",
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
        "def": "Automated nightly batch sequence advancing system business date, updating policy aging counters, accruing loan interest, and processing scheduled state transitions."
      },
      {
        "term": "APL Batch Job",
        "def": "Batch script identifying policies exceeding grace period with sufficient cash value, auto-generating a premium loan transaction, advancing Paid-to-Date, and notifying the policyholder."
      },
      {
        "term": "Auto-Lapse Batch Job",
        "def": "Batch script identifying unpaid policies where cash value is zero or insufficient for APL, transitioning policy status from Inforce to Lapsed and extinguishing coverage."
      },
      {
        "term": "Actuarial Valuation Extract",
        "def": "Extracts policy-level inforce portfolios (sum assured, attained age, policy duration, reserve factors) into flat files/databases for valuation software (Prophet, Mo.net, InsureForge)."
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
        "id": "SOP-BAT-01",
        "title": "Accessing the Batch Console & Monitoring Nightly EOD Execution DAG",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-BAT-01",
        "pdf_page": 428,
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
            "required": "No",
            "desc": "Nightly execution run identifier"
          },
          {
            "name": "System Business Date",
            "type": "Date",
            "required": "No",
            "desc": "Accounting date advancing at end of batch"
          },
          {
            "name": "Job Status Indicator",
            "type": "Status",
            "required": "No",
            "desc": "WAITING, RUNNING, COMPLETED, FAILED"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-BAT-001",
            "ruleName": "Strict Job Dependency Return Code 0 Check",
            "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
            "severity": "HARD_STOP",
            "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
            "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
            "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
            "pdfPage": 16
          },
          {
            "ruleId": "VAL-BAT-002",
            "ruleName": "System Date Roll Reconciliation Prerequisite",
            "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
            "severity": "HARD_STOP",
            "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
            "systemAction": "Blocks date rollover; prevents online users from operating in inconsistent calendar state.",
            "actuarialBasis": "Calendar day alignment: prevents chronological gaps or retroactive calculation overlaps in policy valuation.",
            "pdfPage": 24
          }
        ]
      },
      {
        "code": "SOP-BAT-02",
        "id": "SOP-BAT-02",
        "title": "Executing Automatic Premium Loan (APL) & Policy Auto-Lapse Batch Jobs",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-BAT-02",
        "pdf_page": 435,
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
            "required": "No",
            "desc": "60 calendar days following premium due date"
          },
          {
            "name": "APL Loan Balance Added",
            "type": "Currency",
            "required": "No",
            "desc": "Overdue modal premium capitalized as loan"
          },
          {
            "name": "Lapse Reinstatement Window",
            "type": "Integer",
            "required": "No",
            "desc": "Statutory 2-year window for reinstatement"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-LN-004",
            "ruleName": "Negative Equity Policy Foreclosure (Lapse)",
            "errorCode": "ERR_LN_FORECLOSURE_LAPSE",
            "severity": "HARD_STOP",
            "condition": "If Total Debt (Loan Principal + Accumulated Interest) >= Gross Cash Value -> Issue 30-Day Foreclosure Notice.",
            "systemAction": "Job 07 in Nightly Batch flags policy for Foreclosure Termination.",
            "actuarialBasis": "Insurer cannot maintain life coverage when total outstanding indebtedness wipes out asset reserve.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-BAT-001",
            "ruleName": "Strict Job Dependency Return Code 0 Check",
            "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
            "severity": "HARD_STOP",
            "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
            "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
            "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
            "pdfPage": 16
          },
          {
            "ruleId": "VAL-BAT-002",
            "ruleName": "System Date Roll Reconciliation Prerequisite",
            "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
            "severity": "HARD_STOP",
            "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
            "systemAction": "Blocks date rollover; prevents online users from operating in inconsistent calendar state.",
            "actuarialBasis": "Calendar day alignment: prevents chronological gaps or retroactive calculation overlaps in policy valuation.",
            "pdfPage": 24
          }
        ]
      },
      {
        "code": "SOP-BAT-03",
        "id": "SOP-BAT-03",
        "title": "Running Month-End Actuarial Valuation Extract & Asset-Liability Feeds",
        "role": "Core PAS Specialist",
        "objective": "Thực hiện nghiệp vụ chuẩn hóa cho SOP-BAT-03",
        "pdf_page": 441,
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
            "required": "No",
            "desc": "Standard actuarial model input dataset"
          },
          {
            "name": "Reconciled Inforce Count",
            "type": "Integer",
            "required": "No",
            "desc": "Total active policy inventory matching SOR"
          }
        ],
        "validation_rules": [
          {
            "ruleId": "VAL-LN-004",
            "ruleName": "Negative Equity Policy Foreclosure (Lapse)",
            "errorCode": "ERR_LN_FORECLOSURE_LAPSE",
            "severity": "HARD_STOP",
            "condition": "If Total Debt (Loan Principal + Accumulated Interest) >= Gross Cash Value -> Issue 30-Day Foreclosure Notice.",
            "systemAction": "Job 07 in Nightly Batch flags policy for Foreclosure Termination.",
            "actuarialBasis": "Insurer cannot maintain life coverage when total outstanding indebtedness wipes out asset reserve.",
            "pdfPage": 452
          },
          {
            "ruleId": "VAL-BAT-001",
            "ruleName": "Strict Job Dependency Return Code 0 Check",
            "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
            "severity": "HARD_STOP",
            "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
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
        "ruleName": "Negative Equity Policy Foreclosure (Lapse)",
        "errorCode": "ERR_LN_FORECLOSURE_LAPSE",
        "severity": "HARD_STOP",
        "condition": "If Total Debt (Loan Principal + Accumulated Interest) >= Gross Cash Value -> Issue 30-Day Foreclosure Notice.",
        "systemAction": "Job 07 in Nightly Batch flags policy for Foreclosure Termination.",
        "actuarialBasis": "Insurer cannot maintain life coverage when total outstanding indebtedness wipes out asset reserve.",
        "pdfPage": 452
      },
      {
        "ruleId": "VAL-BAT-001",
        "ruleName": "Strict Job Dependency Return Code 0 Check",
        "errorCode": "ERR_BAT_UPSTREAM_JOB_FAILED",
        "severity": "HARD_STOP",
        "condition": "A downstream batch job can only trigger if all prerequisite upstream jobs completed with Return Code = 0 (SUCCESS).",
        "systemAction": "Halts batch pipeline execution; triggers alert SMS/Email to On-Call Batch Engineer.",
        "actuarialBasis": "Sequential integrity: daily interest cannot accrue before premium collections are booked and updated in SOR.",
        "pdfPage": 16
      },
      {
        "ruleId": "VAL-BAT-002",
        "ruleName": "System Date Roll Reconciliation Prerequisite",
        "errorCode": "ERR_BAT_DATE_ROLL_BLOCKED",
        "severity": "HARD_STOP",
        "condition": "System Date can only advance (T -> T+1) after all 16 Nightly Batch Jobs complete and GL reconciliation passes.",
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
    },
    "name": "Basic Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Safety Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Dashboard",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Global Search",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Registration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Verification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Pending Inforce",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task Release",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task Reassign",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reverse New Business",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Withdraw Proposal",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Declaration Question",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Declaration Form",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Workflow Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "General Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Worksheet",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Worksheet",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Worksheet",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Worksheet",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Worksheet",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Worksheet",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Worksheet",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Rules",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Issues",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Issues",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Issues",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Decision",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Decision",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Decision",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task Release",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task Reassign",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Exclusion Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Authority Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "General Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Registration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Approval",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Pending Inforce",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Cancel CS Application",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Freelook",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Add Rider",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Apply Policy Loan",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": false
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
    },
    "name": "Delete Rider",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Decrease SA",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Increase SA",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reinstatement",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Termination/Surrender",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Cancellation (Void policy)",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Change Assignment",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Change Beneficiary",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Change Contact Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Occupation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Payment Frequency",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Payment Method",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Policy Holder",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Smoker Status",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change extra premium",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Birth Date or Gender",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Benefits",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Beneficial Owner",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Disbursement Method",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Discount Type",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Term",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Trustee",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change HPS Examption Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Indexation Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Survival Benefit or Cash Bonus Option",
    "trad": true,
    "ilp": false,
    "par": true,
    "group": false
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
    },
    "name": "Change Payer",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "ILP Ad hoc Switch Fund",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Change Investment Regular Prem",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Change Regular Premium Apportionment",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Decrease Sum Assured",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Full Surrender",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Increase Sum Assured",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Partial Withdraw",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Set or Change Recurring Top-Up",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Set or Cancel Premium Holiday",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Set or Change Regular Withdrawal Plan",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Single Premium Top-Up",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "Perform Reduced Paid Up",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Policy Suspension",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Premium Adjustment",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Reversionary Bonus Surrender",
    "trad": true,
    "ilp": false,
    "par": true,
    "group": false
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
    },
    "name": "Transfer of Coverage",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Underwriting Review",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task Release",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task Reassign",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "HPS Exemption File Upload",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "HPS Exemption File Download",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Policy Servicing Quotation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": false
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
    },
    "name": "Query Pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maintain Customer",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Individual customer",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Company customer",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reverse Policy Transaction",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Adjust Unit",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Adjust Maturity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": false
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
    },
    "name": "Authority",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Workflow Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "General Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Claim Life Assured/Policy Search",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Eligible claim types selection",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Claim Basic Information Entry",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Claim Basic Information Entry",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Pend at Registration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reject Registration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Work List Pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Work List Pool",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Acceptance",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Acceptance",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Acceptance",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Acceptance",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Acceptance",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Acceptance",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Acceptance",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Evaluation",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Evaluation",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Approval",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Evaluation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Escalation Reply",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Ongoing Claim",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Disbursing/Withholding Claim",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Recovery",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Claim Issues",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Actions & Supporting",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Other Supporting Functions",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task pool",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Task Reassign",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "CDD Query",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Change Disbursement Plan",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Cancel Case",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reverse Case",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Copy Case",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Add Insured for Claim",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Create Medical Billing",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Medical Billing Records",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Authority",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Workflow",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule Validations",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "General Configurations",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Download CPF Submission File",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": true
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
    },
    "name": "ELS Register Query",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "ELS Medinet File",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Query",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Follow up",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Watch List",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Active Member Reconciliation",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Entry",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "Approve",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "Revise",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "Exchange Rate",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Fund Holiday",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "Maintain Hospital",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Print Policy Document",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reprint Policy Document",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Query Policy Document",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Print Letter",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reprint Letter",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Reply Letter",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Query Letter",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Adhoc Letter Generation",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Download",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Search Homepage",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Policy Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Customer Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Customer Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Financial Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Financial Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Financial Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Financial Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Financial Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Product Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Product Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Investment Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Benefits and Bonus Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Benefits and Bonus Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Benefits and Bonus Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Transaction Information",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Transaction Fee Records",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Transaction Fee Records",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "UW History",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Claim History",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Documents",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Comments",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "New CS/Claim",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Global Policy Query Rendering",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Manual Suspend and Unsuspend Extraction",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Billing Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Fee Type",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Payment Method",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Premium Notice",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "General Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Billing Details",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Exceptions",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Manual Collection",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Collection Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Collection Reversal",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Write Off Approval",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Cancel Write Off",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Manage IBG",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Payment Method",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "General Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Batch Upload Collection",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Transfer Suspense",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Payment Requisition",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Payment Authorization",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Medical Payment",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Manual Payment",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Cancel Payment",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Cancel Payment Approval",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Payment Details",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Change Disbursement Payee Approval Work List",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Payment Account Approval Work List",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Payment Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Payment Method",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "General Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Handling of Cheque",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maintain Bank",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maintain Bank Account",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Set up Bank Account Master",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "BS Balance Query_Account Level",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "BS",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "GL Posting Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Filter Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Segment Configuration",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Set Accounting Rule",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maintain Agent",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Channel Organization",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Agent Qualification",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Transfer Agent",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Basic Commission Query",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Clear Cache",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Set Business Date",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Query Version",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maintain Organization",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maintain User",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Role Management",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Permission Management",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule management",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule group",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule Event",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Rule Tracking",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Configure table",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Data Table",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Code Table",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "UI Label",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Code Table",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Message",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Job Definition",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Job Submit",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Job Monitoring",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "NB",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "NB",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "CS",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "CS",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "CS",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": true
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": true
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": true
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "CS",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Claim",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Renew",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Renew",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "Bonus",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Bonus",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Bonus",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": false
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
    },
    "name": "Bonus",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Bonus",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Account",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Account",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Account",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Account",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Annuity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Annuity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Annuity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maturity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maturity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maturity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "Maturity",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Bonus",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Bonus",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Bonus",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Bonus",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "ILP Bonus",
    "trad": false,
    "ilp": true,
    "par": false,
    "group": false
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": true,
    "ilp": true,
    "par": true,
    "group": true
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
    },
    "name": "FIN",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": true
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
    },
    "name": "FIN",
    "trad": false,
    "ilp": false,
    "par": false,
    "group": true
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
