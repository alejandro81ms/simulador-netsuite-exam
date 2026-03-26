const QUESTIONS_DB = [
    {
        id: 1,
        text: "Which record types support the Multiple Currency feature? (Choose 2.)",
        type: "multi",
        options: [
            { label: "A. Vendor", value: "A" },
            { label: "B. Employees", value: "B" },
            { label: "C. Customer", value: "C" },
            { label: "D. Partners", value: "D" },
            { label: "E. Competitors", value: "E" }
        ],
        correct: ["A", "C"],
        explanation: "Vendor and Customer records support Multiple Currency feature in NetSuite."
    },
    {
        id: 2,
        text: "Which feature allows users to manage inventory in various locations?",
        type: "single",
        options: [
            { label: "A. Locations", value: "A" },
            { label: "B. Inventory", value: "B" },
            { label: "C. Multi-Location Inventory", value: "C" },
            { label: "D. Advanced Inventory Management", value: "D" }
        ],
        correct: "C",
        explanation: "Multi-Location Inventory feature enables tracking inventory across different locations."
    },
    {
        id: 3,
        text: "Which statement is correct about renaming records/transactions?",
        type: "single",
        options: [
            { label: "A. The navigational path to the record updates with the renaming.", value: "A" },
            { label: "B. Abbreviations for Transaction Names can only contain up to 10 alphanumeric and/or special characters.", value: "B" },
            { label: "C. Abbreviations for Account Type Names can be used to access the account when recording journal entries.", value: "C" },
            { label: "D. The renaming process applies to each language used within the system.", value: "D" }
        ],
        correct: "A",
        explanation: "When you rename records/transactions, the navigational path updates automatically."
    },
    {
        id: 4,
        text: "Which steps are needed to disable the Multi-Subsidiary Customer feature? (Choose 2.)",
        type: "multi",
        options: [
            { label: "A. Reverse or delete all transactions related to customers and their secondary subsidiaries.", value: "A" },
            { label: "B. Inactivate Customer records with multiple transactions on different subsidiaries.", value: "B" },
            { label: "C. Remove all secondary subsidiaries from Customer records.", value: "C" },
            { label: "D. Set only one primary subsidiary and one secondary subsidiary in the Customer record.", value: "D" }
        ],
        correct: ["A", "C"],
        explanation: "You must remove secondary subsidiaries and reverse/delete related transactions."
    },
    {
        id: 5,
        text: "Which is considered the primary classification used to organize records in a NetSuite OneWorld account?",
        type: "single",
        options: [
            { label: "A. Departments", value: "A" },
            { label: "B. Classes", value: "B" },
            { label: "C. Subsidiaries", value: "C" },
            { label: "D. Locations", value: "D" }
        ],
        correct: "C",
        explanation: "Subsidiaries are the primary classification in NetSuite OneWorld accounts."
    },
    {
        id: 6,
        text: "Which field type can be used to track Employee birthdays?",
        type: "single",
        options: [
            { label: "A. Date", value: "A" },
            { label: "B. Date/Time", value: "B" },
            { label: "C. Time of Day", value: "C" },
            { label: "D. Record is Parent", value: "D" }
        ],
        correct: "A",
        explanation: "Date field type is appropriate for tracking birthdays (no time component needed)."
    },
    {
        id: 7,
        text: "Which statement is true about custom forms?",
        type: "single",
        options: [
            { label: "A. Even if a custom form is stored with a record, a user cannot access the form if it is not enabled for their role.", value: "A" },
            { label: "B. If you set preferred forms without restricting them, employees can still change the form when entering records.", value: "B" },
            { label: "C. The Store Form with Record option is available for all custom entry and custom transaction forms.", value: "C" },
            { label: "D. Define preferred forms from Home > Set Preferences.", value: "D" }
        ],
        correct: "B",
        explanation: "Users can change forms when entering records if forms aren't restricted."
    },
    {
        id: 8,
        text: "Which statement is correct regarding Custom Transactions?",
        type: "single",
        options: [
            { label: "A. Custom Transaction Types can have auto-generated document numbers.", value: "A" },
            { label: "B. Custom Transaction Types cannot be imported via CSV.", value: "B" },
            { label: "C. Users can only create one custom form for each transaction type.", value: "C" },
            { label: "D. Custom Transaction Types cannot include Custom Transaction body fields.", value: "D" }
        ],
        correct: "A",
        explanation: "Custom Transaction Types support auto-generated document numbers like standard transactions."
    },
    {
        id: 9,
        text: "What customization feature allows users with no scripting knowledge to modify standard NetSuite processes?",
        type: "single",
        options: [
            { label: "A. SuiteBuilder", value: "A" },
            { label: "B. SuiteFlow", value: "B" },
            { label: "C. SuiteBundler", value: "C" },
            { label: "D. SuiteTalk", value: "D" }
        ],
        correct: "B",
        explanation: "SuiteFlow provides workflow automation without requiring scripting knowledge."
    },
    {
        id: 10,
        text: "Where can users set a Default Role upon logging into NetSuite?",
        type: "single",
        options: [
            { label: "A. On the Employee record > Access tab, mark the Default checkbox next to the assigned role.", value: "A" },
            { label: "B. On the Choose Role page, mark the Default checkbox next to the assigned role.", value: "B" },
            { label: "C. On the Home page, click the star icon below the Oracle NetSuite logo.", value: "C" },
            { label: "D. On the Role record > Users tab, mark the Default checkbox next to the assigned user.", value: "D" }
        ],
        correct: "B",
        explanation: "Default role is set on the Choose Role page during login."
    },
    {
        id: 11,
        text: "Where do users access NetSuite Performance Details?",
        type: "single",
        options: [
            { label: "A. Double-click the company logo.", value: "A" },
            { label: "B. Double-click the Oracle NetSuite logo.", value: "B" },
            { label: "C. Double-click the User Role dropdown menu.", value: "C" },
            { label: "D. Set up the Key Performance Indicators portlet.", value: "D" }
        ],
        correct: "B",
        explanation: "Double-clicking the Oracle NetSuite logo opens Performance Details."
    },
    {
        id: 12,
        text: "While editing a cash sale, a user must refresh the record to see the latest email received from the customer. What must the user also do to see the email without losing unsaved data on the cash sale?",
        type: "single",
        options: [
            { label: "A. Go to the Communication subtab and click Refresh on the Messages sublist.", value: "A" },
            { label: "B. Right-click the Refresh icon on the browser and click Soft Refresh.", value: "B" },
            { label: "C. Refresh the whole page.", value: "C" },
            { label: "D. Click the Receive Email Crosslink.", value: "D" }
        ],
        correct: "A",
        explanation: "Use Refresh on Messages sublist to update communications without losing unsaved data."
    },
    {
        id: 13,
        text: "Where in NetSuite can a user find the Show Internal IDs preference?",
        type: "single",
        options: [
            { label: "A. Setup tab > Enable Features", value: "A" },
            { label: "B. Home > General Preferences", value: "B" },
            { label: "C. Home > Set Preferences", value: "C" },
            { label: "D. Setup tab > Accounting Preferences", value: "D" }
        ],
        correct: "C",
        explanation: "Show Internal IDs is found under Home > Set Preferences."
    },
    {
        id: 14,
        text: "Which restrictions can apply to records on the Home > Set Preferences > Restrict View tab? (Choose 2.)",
        type: "multi",
        options: [
            { label: "A. Period", value: "A" },
            { label: "B. Segment", value: "B" },
            { label: "C. Location", value: "C" },
            { label: "D. Department", value: "D" }
        ],
        correct: ["C", "D"],
        explanation: "Location and Department restrictions can be set on the Restrict View tab."
    },
    {
        id: 15,
        text: "A user created a List of Items Sold Today report using a saved search. Which portlet allows the user to add this report to the Home dashboard?",
        type: "single",
        options: [
            { label: "A. Custom Search", value: "A" },
            { label: "B. Report Snapshots", value: "B" },
            { label: "C. Quick Search", value: "C" },
            { label: "D. Custom List", value: "D" }
        ],
        correct: "A",
        explanation: "Custom Search portlet can display saved search results on the dashboard."
    },
    {
        id: 16,
        text: "Which Documents > Mail Merge > Bulk Merge option is available for users to create bulk communications?",
        type: "single",
        options: [
            { label: "A. Event", value: "A" },
            { label: "B. Fax", value: "B" },
            { label: "C. CSV", value: "C" },
            { label: "D. Cases", value: "D" }
        ],
        correct: "B",
        explanation: "Fax is available as a bulk merge option for communications."
    },
    {
        id: 17,
        text: "Which statement is true about restricting files in the File Cabinet?",
        type: "single",
        options: [
            { label: "A. To make files available to company users only, select the Company-Wide Usage box on the file record.", value: "A" },
            { label: "B. NetSuite allows users to restrict individual files.", value: "B" },
            { label: "C. The Available Without Login preference is selected by default.", value: "C" },
            { label: "D. If a parent folder's restriction changes after a subfolder is created, the subfolder inherits the new restriction.", value: "D" }
        ],
        correct: "A",
        explanation: "Company-Wide Usage option restricts files to company users only."
    },
    {
        id: 18,
        text: "Where should a user go to set a default expiration (in days) for Estimate records?",
        type: "single",
        options: [
            { label: "A. Sales Preferences", value: "A" },
            { label: "B. The Estimate record", value: "B" },
            { label: "C. The Customer record", value: "C" },
            { label: "D. Accounting Preferences", value: "D" }
        ],
        correct: "A",
        explanation: "Sales Preferences contains settings for Estimate expiration defaults."
    },
    {
        id: 19,
        text: "Which statements are true when converting Leads? (Choose 2.)",
        type: "multi",
        options: [
            { label: "A. A Lead record can be converted to the Customer stage without creating a sales order transaction.", value: "A" },
            { label: "B. Leads converted to Customers can never be converted back to Leads.", value: "B" },
            { label: "C. When an Opportunity is created, the Lead record follows the status of the Opportunity record.", value: "C" },
            { label: "D. Leads can be converted to the Customer stage through a Relationships type CSV import.", value: "D" }
        ],
        correct: ["A", "C"],
        explanation: "Leads can convert to Customers without sales orders, and status follows Opportunity."
    },
    {
        id: 20,
        text: "What is the customer status after creating an Estimate for a Lead record?",
        type: "single",
        options: [
            { label: "A. Lead", value: "A" },
            { label: "B. Prospect", value: "B" },
            { label: "C. Customer", value: "C" },
            { label: "D. Contact", value: "D" }
        ],
        correct: "B",
        explanation: "Creating an Estimate changes Lead status to Prospect."
    },
    {
        id: 21,
        text: "Which options can be set by users under Setup > Sales > Sales Preferences > Forecasts? (Choose 2.)",
        type: "multi",
        options: [
            { label: "A. Calculate Forecasts as Weighted", value: "A" },
            { label: "B. Advanced Forecasting", value: "B" },
            { label: "C. Use Opportunities in Forecast", value: "C" },
            { label: "D. Allow Setting Probability in Forecast Editor", value: "D" },
            { label: "E. Allow Override of Quotas in Forecast Editor", value: "E" }
        ],
        correct: ["A", "D"],
        explanation: "Weighted calculations and probability settings are available in Forecast preferences."
    },
    {
        id: 22,
        text: "Where can users set subsidiary-level support preferences?",
        type: "single",
        options: [
            { label: "A. Case Profile", value: "A" },
            { label: "B. Setup > Company > General Preferences", value: "B" },
            { label: "C. Setup > Support > Support Preferences", value: "C" },
            { label: "D. Subsidiary record", value: "D" }
        ],
        correct: "D",
        explanation: "Subsidiary-level support preferences are set on the Subsidiary record."
    },
    {
        id: 23,
        text: "Which role or roles can edit locked cases?",
        type: "single",
        options: [
            { label: "A. Administrator only", value: "A" },
            { label: "B. Administrator and Support Administrator", value: "B" },
            { label: "C. Administrator, Support Administrator, and Support Manager", value: "C" },
            { label: "D. Administrator and roles with Full access on Cases", value: "D" }
        ],
        correct: "A",
        explanation: "Only Administrator can edit locked cases."
    },
    {
        id: 24,
        text: "What is the purpose of selecting Unsubscribed to Marketing by Default, under Marketing Preferences?",
        type: "single",
        options: [
            { label: "A. To enable the Global Subscription Status field on the Customer record.", value: "A" },
            { label: "B. To set the Global Subscription Status to Soft Opt-out once a new Customer record is created.", value: "B" },
            { label: "C. Existing customers are updated from Soft Opt-in to Unsubscribed.", value: "C" },
            { label: "D. To enable the Campaign Subscription Center link under Home > Dashboard > Settings portlet.", value: "D" }
        ],
        correct: "B",
        explanation: "This preference sets new customers to Soft Opt-out by default."
    },
    {
        id: 25,
        text: "Using the Standard Sales Order Form, what transaction is created when billing a Sales Order that has a Payment Method selected?",
        type: "single",
        options: [
            { label: "A. Progress Invoice", value: "A" },
            { label: "B. Cash Sale", value: "B" },
            { label: "C. Customer Payment", value: "C" },
            { label: "D. Invoice", value: "D" }
        ],
        correct: "B",
        explanation: "Cash Sale is created when billing a Sales Order with Payment Method."
    },
    {
        id: 26,
        text: "Which preference allows users to enter a quantity higher than the quantity committed for an item on an Item Fulfillment form?",
        type: "single",
        options: [
            { label: "A. Allow Overage on Item Fulfillments", value: "A" },
            { label: "B. Invoice in Advance of Fulfillment", value: "B" },
            { label: "C. Show Unfulfilled Items on Invoices", value: "C" },
            { label: "D. Allow Overage on Item Commitments", value: "D" }
        ],
        correct: "A",
        explanation: "Allow Overage on Item Fulfillments permits over-fulfillment."
    },
    {
        id: 27,
        text: "Which of these Customer Payment Methods are supported in NetSuite?",
        type: "single",
        options: [
            { label: "A. ACH Processing with Coastal Software", value: "A" },
            { label: "B. Electronic Funds Transfer", value: "B" },
            { label: "C. PayPal Express for Web Stores", value: "C" },
            { label: "D. Credit Card Processing for Sales Orders", value: "D" }
        ],
        correct: "A",
        explanation: "ACH Processing with Coastal Software is a supported payment method."
    },
    {
        id: 28,
        text: "Which transaction is created when clicking Refund in a Return Materials Authorization (RMA) record?",
        type: "single",
        options: [
            { label: "A. Bill Credit", value: "A" },
            { label: "B. Inventory Adjustment", value: "B" },
            { label: "C. Customer Refund", value: "C" },
            { label: "D. Cash Refund", value: "D" }
        ],
        correct: "D",
        explanation: "Cash Refund transaction is created from RMA Refund button."
    },
    {
        id: 29,
        text: "Which statement is true about Customer Return Authorization records?",
        type: "single",
        options: [
            { label: "A. If created with a Credit Form, the record generates a Customer Deposit.", value: "A" },
            { label: "B. If created with a Credit Form, the record generates a Credit Memo.", value: "B" },
            { label: "C. If created with a Cash Form, the record generates a Credit Memo.", value: "C" },
            { label: "D. If created with a Cash Form, the record generates a Cash Sale.", value: "D" }
        ],
        correct: "B",
        explanation: "Credit Form creates a Credit Memo from Return Authorization."
    },
    {
        id: 30,
        text: "Which item types may be used to cluster Item records and group them into one unit? (Choose 2.)",
        type: "multi",
        options: [
            { label: "A. Service Items", value: "A" },
            { label: "B. Assembly Items", value: "B" },
            { label: "C. Kit/Package Items", value: "C" },
            { label: "D. Lot-Numbered Items", value: "D" },
            { label: "E. Non-inventory For Resale", value: "E" }
        ],
        correct: ["B", "C"],
        explanation: "Assembly and Kit/Package items can group items into one unit."
    },
    {
        id: 31,
        text: "Which setting changes the quantity and value of an inventory item without entering a purchase order?",
        type: "single",
        options: [
            { label: "A. Order Items", value: "A" },
            { label: "B. Adjust Inventory", value: "B" },
            { label: "C. Reallocate Items", value: "C" },
            { label: "D. Review Negative Inventory", value: "D" }
        ],
        correct: "B",
        explanation: "Adjust Inventory changes quantity and value without purchase orders."
    },
    {
        id: 32,
        text: "Which feature enables users to define various units used to stock, purchase, and sell inventory items and to track non-monetary accounts?",
        type: "single",
        options: [
            { label: "A. Statistical Accounts", value: "A" },
            { label: "B. Multiple Units of Measure", value: "B" },
            { label: "C. Lot Tracking", value: "C" },
            { label: "D. Bar Coding and Item Labels", value: "D" }
        ],
        correct: "B",
        explanation: "Multiple Units of Measure feature defines different units for inventory operations."
    },
    {
        id: 33,
        text: "Which statement is true regarding Price Levels?",
        type: "single",
        options: [
            { label: "A. When the Multiple Prices feature is enabled, users can create up to 1,000 Price Levels.", value: "A" },
            { label: "B. Users can only enter a discount percentage on Price Levels.", value: "B" },
            { label: "C. Users are not allowed to inactivate a Price Level when it has a discount/mark-up percentage.", value: "C" },
            { label: "D. Price Levels cannot have the same discount/mark-up percentage.", value: "D" }
        ],
        correct: "A",
        explanation: "Multiple Prices feature allows up to 1,000 Price Levels."
    },
    {
        id: 34,
        text: "Which accounting preference allows invoices to include memos on Time records when the Bill Costs for Customers feature is enabled?",
        type: "single",
        options: [
            { label: "A. Copy Source Memos to Invoices", value: "A" },
            { label: "B. Copy Time Memos to Invoices", value: "B" },
            { label: "C. Copy All Memos to Invoices", value: "C" },
            { label: "D. Copy Expense Memos to Invoices", value: "D" }
        ],
        correct: "B",
        explanation: "Copy Time Memos to Invoices includes time record memos on invoices."
    },
    {
        id: 35,
        text: "Which statement is true regarding the Standard Purchase Order Approval Routing process?",
        type: "single",
        options: [
            { label: "A. A Purchase Request is automatically routed to the Supervisor if the Purchase Approver is unable to approve the transaction within 24 hours.", value: "A" },
            { label: "B. If the Purchase Limit of the employee is set to zero, then all Purchase Requests are automatically approved, even if a Purchase Approver is set.", value: "B" },
            { label: "C. A rejected Purchase Request can still be edited and resubmitted for approval.", value: "C" },
            { label: "D. A Purchase Request can no longer be edited once it has been approved.", value: "D" }
        ],
        correct: "C",
        explanation: "Rejected purchase requests can be edited and resubmitted."
    },
    {
        id: 36,
        text: "At which status does a Vendor Bill affect Accounts Payable?",
        type: "single",
        options: [
            { label: "A. Pending Approval", value: "A" },
            { label: "B. Open", value: "B" },
            { label: "C. Partially Billed", value: "C" },
            { label: "D. Unpaid", value: "D" }
        ],
        correct: "B",
        explanation: "Vendor Bill affects AP when status is Open."
    },
    {
        id: 37,
        text: "Which value can users enter in Global Search to include inactive records?",
        type: "single",
        options: [
            { label: "A. cu:-abc", value: "A" },
            { label: "B. cu:abc-", value: "B" },
            { label: "C. cu:+abc", value: "C" },
            { label: "D. cu:abc+", value: "D" }
        ],
        correct: "D",
        explanation: "Adding + at the end includes inactive records in search results."
    },
    {
        id: 38,
        text: "When added to the Criteria subtab of a Transaction search, which filter displays primary line data rows only?",
        type: "single",
        options: [
            { label: "A. Main Line = yes", value: "A" },
            { label: "B. Item on Any Line = specify item", value: "B" },
            { label: "C. Name = name of the item", value: "C" },
            { label: "D. Main Line = any", value: "D" }
        ],
        correct: "A",
        explanation: "Main Line = yes shows only primary transaction line data."
    },
    {
        id: 39,
        text: "Which statement is true about portlets?",
        type: "single",
        options: [
            { label: "A. Portlet controls are shown by default but can be hidden by the user.", value: "A" },
            { label: "B. Portlets with content that is calculated from current data includes an Export function.", value: "B" },
            { label: "C. All portlets can be expanded to full-screen view.", value: "C" },
            { label: "D. A pop-up may display, suggesting that portlets can be minimized to speed up dashboard loading time.", value: "D" }
        ],
        correct: "D",
        explanation: "NetSuite suggests minimizing portlets for faster dashboard loading."
    },
    {
        id: 40,
        text: "Which statement is true about Mass Updates?",
        type: "single",
        options: [
            { label: "A. A Mass Update definition must be saved before users can click Perform Update.", value: "A" },
            { label: "B. The first step to perform a Mass Update is to define new values that will be reflected on records.", value: "B" },
            { label: "C. On the Mass Update Preview Results page, users can exclude individual records.", value: "C" },
            { label: "D. Saved Mass Updates can be found on the list of Saved Searches.", value: "D" }
        ],
        correct: "C",
        explanation: "Users can exclude individual records on the Preview Results page."
    },
    {
        id: 41,
        text: "Which resources under the Support tab can a user access to submit a case?",
        type: "single",
        options: [
            { label: "A. NetSuite Administrator Group", value: "A" },
            { label: "B. NetSuite Account Center", value: "B" },
            { label: "C. NetSuite Support Aid", value: "C" },
            { label: "D. NetSuite Assistant", value: "D" }
        ],
        correct: "B",
        explanation: "NetSuite Account Center is where users submit support cases."
    },
    {
        id: 42,
        text: "Which is a channel for contacting NetSuite Customer Support?",
        type: "single",
        options: [
            { label: "A. Submit a Support Ticket using the Employee Center role.", value: "A" },
            { label: "B. Start a Live Chat conversation at the NetSuite Visitor home page.", value: "B" },
            { label: "C. Email a NetSuite Customer Support representative directly.", value: "C" },
            { label: "D. Submit an Online Case via SuiteAnswers.", value: "D" }
        ],
        correct: "D",
        explanation: "Submit Online Case through SuiteAnswers is a support channel."
    },
    {
        id: 43,
        text: "What can users find in SuiteAnswers, the NetSuite self-service support site?",
        type: "single",
        options: [
            { label: "A. New Release Notes", value: "A" },
            { label: "B. User Account Provisioning details", value: "B" },
            { label: "C. End user license agreement", value: "C" },
            { label: "D. The user account's File Cabinet usage", value: "D" }
        ],
        correct: "A",
        explanation: "SuiteAnswers provides New Release Notes and documentation."
    },
    {
        id: 44,
        text: "Which functionality is disabled in the Release Preview account?",
        type: "single",
        options: [
            { label: "A. Payroll", value: "A" },
            { label: "B. Email Campaigns", value: "B" },
            { label: "C. Two-Factor Authentication", value: "C" },
            { label: "D. Memorized Transactions", value: "D" }
        ],
        correct: "A",
        explanation: "Payroll functionality is disabled in Release Preview accounts."
    },
    {
        id: 45,
        text: "Don and Mark both have the Consultant role. The role has the Create permission for Opportunities. Under the Global Permissions subtab of his Employee record, Don is provisioned Edit permission for Opportunities. Which statement is true?",
        type: "single",
        options: [
            { label: "A. They can both edit Opportunity records.", value: "A" },
            { label: "B. Mark can create Opportunity records while Don can edit and create Opportunity records.", value: "B" },
            { label: "C. Don can create Opportunity records while Mark can edit and create Opportunity records.", value: "C" },
            { label: "D. Neither Don nor Mark can edit Opportunity records.", value: "D" }
        ],
        correct: "B",
        explanation: "Don has Edit permission via Global Permissions override."
    },
    {
        id: 46,
        text: "Which attribute cannot be modified when editing a custom role?",
        type: "single",
        options: [
            { label: "A. Inactive", value: "A" },
            { label: "B. Center Type", value: "B" },
            { label: "C. Employee Restrictions", value: "C" },
            { label: "D. Two-Factor Authentication", value: "D" }
        ],
        correct: "B",
        explanation: "Center Type cannot be changed after role creation."
    },
    {
        id: 47,
        text: "Which standard NetSuite role is set up with mandatory Two-Factor Authentication?",
        type: "single",
        options: [
            { label: "A. CEO", value: "A" },
            { label: "B. Administrator", value: "B" },
            { label: "C. Issue Administrator", value: "C" },
            { label: "D. CFO", value: "D" }
        ],
        correct: "B",
        explanation: "Administrator role has mandatory Two-Factor Authentication."
    },
    {
        id: 48,
        text: "When is a user asked to answer a security question before they can log in to NetSuite?",
        type: "single",
        options: [
            { label: "A. When the user provides an incorrect password upon initial login.", value: "A" },
            { label: "B. If the user logs in using a role with two-factor authentication enabled.", value: "B" },
            { label: "C. When a user proactively changes their password.", value: "C" },
            { label: "D. If the user attempts to log in using a new computer.", value: "D" }
        ],
        correct: "D",
        explanation: "Security questions appear when logging in from a new computer."
    },
    {
        id: 49,
        text: "What settings can users change by clicking Set Preferences from the Settings portlet?",
        type: "single",
        options: [
            { label: "A. Enable Features", value: "A" },
            { label: "B. Company Preferences", value: "B" },
            { label: "C. Accounting Preferences", value: "C" },
            { label: "D. User Preferences", value: "D" }
        ],
        correct: "D",
        explanation: "Set Preferences changes User Preferences settings."
    },
    {
        id: 50,
        text: "Where can you find logged OLD and NEW GL Impact of some transaction?",
        type: "single",
        options: [
            { label: "A. System notes", value: "A" },
            { label: "B. My Login Audit", value: "B" },
            { label: "C. Transaction Audit Trail", value: "C" },
            { label: "D. Transaction Numbering Audit Log", value: "D" }
        ],
        correct: "A",
        explanation: "System notes track changes including GL Impact modifications."
    }
];