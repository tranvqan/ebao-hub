# eBao Gemini Life Core PAS & InsureForge Knowledge Hub & Simulator

> **Enterprise Project**: Complete 517-Page PAS Restructuring, Master Policy Life Cycle Dates Taxonomy, 21-Day Free-Look Engine, Customer Service Master Alteration Taxonomy, 10-Step eBao Product Factory Guide, 10-Job Nightly Batch Sequence, Cross-Module Data Flow, and 8 Specialized Interactive Workbenches.
> 
> **Source Documents**: `Gemini_User_Guide.pdf` (517 Pages) & `Gemini_Function_List_v26.04.xlsx` (394 Functions).  
> **Engineered For**: **Product Actuaries** & **Life Insurance Operations (OP)**.  
> **Ecosystem Standard**: **InsureForge** Open Core PAS Specification.

---

## 🌟 Comprehensive Domain Coverage (100% of 517-Page Guide)

### 1. Master Policy Life Cycle Dates Taxonomy (12 Core Dates)
In eBao Gemini Life Core PAS, time mechanics govern every state transition, liability, and reserve calculation:
1. **Proposal / Application Date**: Date applicant signed the proposal. Validates issue age and agent licensing validity on date of sale.
2. **Commencement Date**: Contractual inception date when insurance risk officially begins. Base milestone for policy years, mortality charges, and bonus vesting.
3. **Policy Issue Date**: Timestamp when proposal passed all validations and was committed into System of Record (SOR). Triggers contract generation and commission release.
4. **Policy Delivery Date**: Date the policyholder confirmed receipt (signed e-ACK). **The statutory 21-day Free-Look period starts from THIS date, NOT the Issue Date!**
5. **Transaction Date**: Actual system clock date when an operator or batch executes an action. Immutable audit timestamp.
6. **Paid-To-Date (PTD)**: Date up to which premiums have been fully paid. Governs whether a policy is active or overdue.
7. **Premium Due Date**: Recurring contractual date for modal premium payments. Triggers T-30 billing notices.
8. **Grace Period Expiry Date**: Exactly 60 calendar days following Premium Due Date (`Due Date + 60 days`). Coverage remains active during grace. At Day 60 midnight, triggers Batch APL or Lapse.
9. **Policy Anniversary Date**: Annual recurrence of Commencement Date month/day. Triggers attained age increase, bonus declaration, and loan interest capitalization.
10. **Lapsed Date**: Date coverage ceased because grace expired with insufficient cash value. Starts statutory 2-year reinstatement window.
11. **Reinstatement Effective Date**: Date a lapsed policy is revived after medical underwriting approval and back-premium payment. Resets 2-year contestability period.
12. **Maturity / Expiry Date**: Contractual end date of policy term. Settles final Maturity Benefit + Terminal Bonus and closes policy.

---

### 2. The 21-Day Free-Look (Cooling-Off) Statutory Rules & Mechanics
- **Trigger**: Begins on **Policy Delivery Date** (e-ACK receipt signed by client), NOT Issue Date.
- **Refund Formula (Traditional Life / Endowment)**:
  $$\text{Net Refund} = 100\% \text{ of Total Initial Premiums Paid} - \text{Actual Incurred Medical Exam Expenses (MER)}$$
- **Refund Formula (Investment-Linked Policies - ILP)**:
  $$\text{Net Refund} = \text{Unallocated Premium} + \text{Market Value of Units Cancelled at Next Valuation Price} + \text{Allocation Charges Refunded} - \text{Medical Expenses}$$
- **Commission Clawback**: 100% of sales commissions paid to the agent are automatically reversed in Module 07.
- **System State Transition**: Policy status moves to `TERMINATED_FREE_LOOK` or `VOID_AB_INITIO`.

---

### 3. Customer Service (Policy Servicing) Master Alteration Taxonomy
Covering pages 196-303 and Appendix pages 445-517:

#### A. Non-Financial Alterations:
- **Change of Address & Contact Preferences**: Updates geography, tax jurisdiction codes.
- **Change of Beneficiary & Shares**: Must total **exactly 100.0%**. Mandatory Trustee appointment if nominee is <18.
- **Change of Policy Assignment**:
  - *Absolute Assignment*: Irrevocable transfer of 100% ownership to another party.
  - *Collateral Assignment*: Temporary pledge to a lending bank as security; locks surrender/loans until bank releases lien.
- **Change of DOB & Gender (With Retrospective Premium Re-Rating)**:
  - Modifying birth date recalculates Issue Age and Attained Age.
  - Triggers rating engine: If client was older, generates back-premium bill; if younger, generates refund voucher.
- **Change of Occupation / Hazard Class**: Re-rates accidental and disability rider loadings.
- **Change of Payment Method & Bank Account**: Re-validates bank direct debit details.
- **Change of Payment Frequency**: Annual $\leftrightarrow$ Semi-Annual $\leftrightarrow$ Quarterly $\leftrightarrow$ Monthly.
- **Rescind CS Endorsement**: Reverses an erroneous alteration, restoring policy state and sub-ledger accounting balances.

#### B. Financial Alterations:
- **Sum Assured Increase / Addition of Riders**: Mandatory submission to **CS Underwriting (Module 03)** for risk evaluation, extra mortality (EM) ratings, or exclusions.
- **Sum Assured Decrease / Deletion of Riders**: Validates minimum SA thresholds; refunds pro-rata unearned rider premium.
- **Policy Loan Drawing & Repayment**: Maximum allowable loan = **85% of Cash Value**. Daily compound interest accrues at **6.5% p.a.** and capitalizes annually.
- **Non-Forfeiture Conversions**:
  - *Reduced Paid-Up (RPU)*: Cash value converts to single premium for reduced SA; stops future premiums; terminates riders.
  - *Extended Term Insurance (ETA)*: Net cash value buys term insurance for full original SA for as long as possible.
  - *Automatic Premium Loan (APL)*: Overdue premium auto-loaned against cash value upon grace expiry.
- **Cash Extractions**:
  - *Full Policy Surrender*: Settles `Gross Cash Value - Loan Debt - Interest + Unearned Premium`. Terminates policy.
  - *Reversionary Bonus Surrender*: Monetizes accumulated declared bonuses while keeping base policy active!
- **Policy Reinstatement**: Within statutory 2-year window from Lapse Date: Health declaration, underwriting review, and back-premium payment with compound interest penalty.

---

### 4. Step-by-Step Guide: Configuring a New Product in eBao Product Factory
1. **Step 1: Product Master (`T_PROD_DEF`)**: Product code, name, LOB, currency, effective date range.
2. **Step 2: Eligibility & Term (`T_PROD_TERM`)**: Min/Max issue age, policy term options, premium pay period, maturity age cap.
3. **Step 3: Sum Assured Rules (`T_PROD_SA_RULE`)**: Min/Max SA, incremental multiples, juvenile statutory caps.
4. **Step 4: Premium Calculation & Rate Tables (`T_RATE_TABLE`)**: Mortality tables (Attained Age x Gender x Smoker x Term) and loading formulas.
5. **Step 5: Modal Loading Factors (`T_MODAL_FACTOR`)**: Annual 1.0, Semi-Annual 0.51, Quarterly 0.26, Monthly 0.088.
6. **Step 6: Cash Value Schedules & Bonuses (`T_SURRENDER_VAL_SCHEDULE`)**: GSV percentages by duration, compound reversionary bonus (1.8% p.a.), terminal bonus (15%).
7. **Step 7: Rider Compatibility Matrix (`T_RIDER_COMPATIBILITY`)**: Eligible riders and maximum rider SA ratios.
8. **Step 8: Auto-Underwriting STP Rules (`T_AUTO_UW_RULE`)**: Straight-Through Processing thresholds vs medical referral triggers.
9. **Step 9: Non-Forfeiture & Loan Parameters (`T_NON_FORFEITURE_PARAM`)**: APL enabled, max loan LTV (85%), loan interest rate (6.5%), RPU enabled.
10. **Step 10: Sandbox Verification & Compilation (`PUBLISH_TO_SOR`)**: Test quotes in sandbox $\rightarrow$ Publish to Gemini SOR runtime tables!

---

### 5. Exact Chronological Execution Order of Nightly Batch Jobs (Jobs 01 to 10)
```
[23:00] Pre-Batch System Lock & Database Checkpoint
   │
   ▼
[23:15] Job 01: JOB_BILLING_GEN (T-30 Days Billing Notice Generation)
   │
   ▼
[23:45] Job 02: JOB_DD_EXTRACT (Direct Debit Bank Clearing File Extraction)
   │
   ▼
[00:30] Job 03: JOB_BANK_RECON (Bank Settlement Return Import & PTD Roll)
   │
   ▼
[01:15] Job 04: JOB_GRACE_AGING (Grace Period Elapsed Aging: Days 1 to 60)
   │
   ▼
[02:00] Job 05: JOB_APL_EXEC (Grace Expired: Auto Premium Loan Execution)
   │
   ▼
[02:45] Job 06: JOB_AUTO_LAPSE (Grace Expired: Auto-Lapse Execution if CV <= 0)
   │
   ▼
[03:30] Job 07: JOB_LOAN_INTEREST_ACCRUAL (Daily Loan & APL Interest Accrual at 6.5%)
   │
   ▼
[04:15] Job 08: JOB_ACTUARIAL_VALUATION (Month-End Valuation Extract for Reserves & IFRS 17)
   │
   ▼
[05:00] Job 09: JOB_GL_ROLL (Sub-ledger Accounting Balance & ERP Posting)
   │
   ▼
[05:30] Job 10: JOB_DATE_ROLL (System Business Date Roll +1 Day & Maintenance Unlock)
```

---

### 6. The 8 Specialized Simulator Workbenches
In the **eBao Lite Simulator** tab, operators and actuaries can switch between:
1. **🎛️ Mod 01: ISO Orchestrator Desk**: Live testing of API pipelines (BFF $\rightarrow$ BS $\rightarrow$ Fabrics $\rightarrow$ SOR).
2. **📝 Mod 02: New Business Proposal Wizard**: 4-step inception wizard with live STP underwriting validation.
3. **🛡️ Mod 03: Underwriting Risk Evaluation Desk**: Underwriting terminal with BMI/BP findings, EM slider (+0% to +200%), exclusions, and counter-offer generation.
4. **🔄 Mod 04: Customer Service Servicing Desk**: Policy Loans (85% LTV), Full Surrender, RPU, 21-Day Free-Look Cancellation, DOB Re-rating, and Beneficiary updates.
5. **💳 Mod 05: Billing & Direct Debit Console**: T-30 billing scan, ISO 20022 direct debit export, and bank return clearing simulation (Success vs Insufficient Funds).
6. **🏥 Mod 06: Claims Adjudication Desk**: FNOL registration, 2-year contestability verification, debt netting of loans/grace premiums, and contract termination disposal.
7. **💰 Mod 07: Payment & Sub-Ledger Desk**: AML payee verification, EFT banking batch compilation, and live T-Account Sub-Ledger debit/credit journals.
8. **⚙️ Mod 08: Batch Console DAG Simulator**: Interactive execution of the exact 10-job nightly batch sequence with real-time animated console logs!
9. **🌐 15-Yr Ledger & Chart**: Projection schedule and interactive Chart.js visualization.

---

## 🚀 How to Run

Open directly in your web browser:  
👉 **[c:\Users\User\Downloads\19_Antigravity Project\eBao\index.html](file:///c:/Users/User/Downloads/19_Antigravity%20Project/eBao/index.html)**  
*(Zero-CORS, completely self-contained offline architecture).*
