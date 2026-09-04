import { site } from "@/lib/site";

export const legalTerms = {
  quotationValidityDays: 15,
  claimNoticeDays: 15,
  jurisdiction: "Kolkata, West Bengal, India",
  arbitrationSeat: "Kolkata",
  effective: "4 September 2026",
} as const;

export type LegalBlock = string | readonly string[];

export type LegalSection = {
  id: string;
  heading: string;
  blocks: readonly LegalBlock[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  lede: string;
  updated: string;
  sections: readonly LegalSection[];
};

export const legalDocs: readonly LegalDoc[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    shortTitle: "Terms of Service",
    eyebrow: "Website terms",
    summary:
      "The terms on which you may use this website, and what an enquiry through it does and does not commit either of us to.",
    lede: "This website is a catalogue and an introduction, not a shop. These terms set out what you may do with it, what our listings mean, and where our responsibility ends.",
    updated: legalTerms.effective,
    sections: [
      {
        id: "who-we-are",
        heading: "1. Who we are",
        blocks: [
          `This website at ${site.url} (the "Site") is operated by ${site.name}, a merchant exporter of industrial fasteners registered in India and based in ${site.contact.address}. "We", "us" and "our" mean ${site.name}. "You" means the person or business using the Site.`,
          "By using the Site you accept these terms. If you do not accept them, please do not use the Site.",
        ],
      },
      {
        id: "what-this-site-is",
        heading: "2. What this site is",
        blocks: [
          "The Site presents our product ranges, the standards we work to, and the way we handle an export order. It exists so that a buyer can decide whether to send us an enquiry.",
          "Nothing on the Site is an offer to sell. Product listings, ranges, size tables and downloadable catalogues are an invitation to enquire. We publish no prices and take no payment through the Site. A sale exists only once we have issued a quotation or proforma invoice and you have accepted it in writing.",
        ],
      },
      {
        id: "enquiries",
        heading: "3. Enquiries and quotations",
        blocks: [
          "Sending an enquiry does not place an order and does not oblige us to supply. It starts a conversation.",
          `Any quotation we issue is governed by our Terms of Sale, which sit alongside these terms. Where the two differ on a commercial point — price, delivery, payment, claims — the Terms of Sale govern.`,
          "Please give us accurate information about the specification, quantity and destination. We quote on what you tell us, and a quotation based on wrong information is not one we can hold.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "4. Acceptable use",
        blocks: [
          "You may read, print and share the pages of this Site for the purpose of evaluating us as a supplier. You may not:",
          [
            "copy, republish or resell the Site's content, photography or catalogues as your own",
            "scrape, harvest or bulk-download the Site by automated means, or use it to build a competing catalogue or a dataset for resale",
            "use our name, logo or product listings in a way that suggests you manufacture, own or represent our goods without our written agreement",
            "attempt to gain unauthorised access to the Site or the systems it runs on, or interfere with its availability for others",
            "send us enquiries that are fraudulent, misleading, or intended to obtain a quotation you have no intention of acting on",
          ],
        ],
      },
      {
        id: "intellectual-property",
        heading: "5. Intellectual property",
        blocks: [
          `The design, text, drawings and arrangement of this Site, and the ${site.name} name and logo, belong to us or are used by us with permission.`,
          "Product photography originates with our manufacturing partners and is used to illustrate the type of goods we export. It is not a photograph of the specific consignment you will receive.",
          "Standard designations such as ISO, DIN, ASTM, ANSI, BS and IS belong to the bodies that issue them. We reference those standards to describe the goods we supply; the reference is not a claim of accreditation, licence or endorsement by the issuing body.",
        ],
      },
      {
        id: "third-party-links",
        heading: "6. Links to other services",
        blocks: [
          "The Site links out to WhatsApp, to your email client and to your telephone dialler so that you can reach us quickly. Those services are operated by other companies under their own terms and privacy policies. We do not control them and are not responsible for them.",
        ],
      },
      {
        id: "availability",
        heading: "7. Availability and changes",
        blocks: [
          "We try to keep the Site available and its information current, but we do not guarantee uninterrupted access. We may change, suspend or withdraw any part of the Site, including product ranges and specification tables, without notice.",
          "Specifications, size ranges and available grades change as our sourcing changes. Always confirm the current position in writing with your quotation rather than relying on a page you read earlier.",
        ],
      },
      {
        id: "liability",
        heading: "8. Our liability for the site",
        blocks: [
          "The Site is provided as it stands, for information. To the extent the law allows, we exclude liability for any loss arising from reliance on the Site's content, from its unavailability, or from any error in a published specification, where no quotation or contract has been formed between us.",
          "Where we do supply goods, our liability is governed by the Terms of Sale rather than by this clause.",
          "Nothing here excludes liability for fraud, or for anything that cannot lawfully be excluded.",
        ],
      },
      {
        id: "changes",
        heading: "9. Changes to these terms",
        blocks: [
          "We may revise these terms. The version published on this page is the one that applies, and the date at the head of the page tells you when it last changed. Continuing to use the Site after a change means you accept the revised terms.",
        ],
      },
      {
        id: "law",
        heading: "10. Governing law",
        blocks: [
          `These terms, and any dispute arising out of the use of this Site, are governed by the laws of India. The courts at ${legalTerms.jurisdiction} have exclusive jurisdiction.`,
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "terms-of-sale",
    title: "Terms of Sale",
    shortTitle: "Terms of Sale",
    eyebrow: "Trading terms",
    summary:
      "How our quotations, orders, shipments, payments and claims work — the commercial terms behind every consignment we export.",
    lede: "These are the trading terms behind a Chakraborty Overseas consignment: what a quotation commits us to, when an order becomes an order, who carries risk at which point, and how a claim is handled.",
    updated: legalTerms.effective,
    sections: [
      {
        id: "application",
        heading: "1. Application",
        blocks: [
          `These terms apply to every quotation we issue and every sale we make, unless we have signed a separate supply agreement with you that says otherwise. They prevail over any purchase-order conditions of yours that we have not expressly accepted in writing.`,
          "Where a letter of credit, contract or purchase order we have accepted contradicts a clause here, the accepted document governs on that point only.",
        ],
      },
      {
        id: "quotations",
        heading: "2. Quotations and validity",
        blocks: [
          `Unless the quotation says otherwise, it is valid for ${legalTerms.quotationValidityDays} days from its date. Fastener prices follow steel and fastener-grade wire rod, so a lapsed quotation has to be re-priced rather than simply extended.`,
          "Quotations are issued in USD or INR, on the Incoterm stated, and are subject to the material being available at the manufacturing unit at the time of order confirmation.",
          "A quotation is priced against the specification recorded on it — standard, grade, size, finish, packing and quantity. Any change to those is a new enquiry.",
        ],
      },
      {
        id: "orders",
        heading: "3. Orders and acceptance",
        blocks: [
          "An order is confirmed when we have issued a proforma invoice and you have accepted it in writing, and when the agreed advance or the operative letter of credit has been received.",
          "Until that point we are not obliged to procure material and no delivery period has started to run.",
        ],
      },
      {
        id: "specification",
        heading: "4. Specification, tolerance and samples",
        blocks: [
          "Goods are supplied to the standard and grade named on the accepted proforma invoice. Dimensional and mechanical tolerances are those permitted by that standard.",
          "Catalogue photographs, drawings and weights are indicative. Where appearance or finish matters to your application, ask for a sample or a pre-shipment photograph before production.",
          `${site.name} is a merchant exporter. The goods are manufactured by our sourcing partners, and mill test certificates are issued by the manufacturer for the batch supplied.`,
        ],
      },
      {
        id: "price-duties",
        heading: "5. Price, taxes and duties",
        blocks: [
          `Prices are quoted on one of the Incoterms we work to (${site.incoterms.join(", ")}), interpreted in accordance with Incoterms 2020.`,
          "Import duty, customs clearance, port charges, local taxes and any levy in the destination country are yours unless the agreed Incoterm places them on us.",
          "Bank charges outside India are for your account. Charges levied by our bank in India are for ours.",
        ],
      },
      {
        id: "payment",
        heading: "6. Payment",
        blocks: [
          "We work on advance payment, on an irrevocable letter of credit at sight, or on terms negotiated for buyers with an established record with us. The accepted proforma invoice records which applies.",
          "Title to the goods passes only when we have received payment in full. Risk passes at the point set by the agreed Incoterm, which may be earlier.",
          "Where payment is delayed, we may hold shipment or documents until it is received, and any resulting storage, demurrage or detention is for your account.",
        ],
      },
      {
        id: "delivery",
        heading: "7. Delivery and lead time",
        blocks: [
          "Lead times quoted are working estimates from the date of order confirmation. They depend on the manufacturing unit's production queue and on vessel or flight availability, and they are not conditions of the contract unless we have agreed a fixed date in writing.",
          `Loading is from ${site.contact.ports.split(" · ").slice(0, 3).join(", ")} or another port we have agreed. Partial shipment is permitted unless the accepted order or the letter of credit prohibits it.`,
          "We are not liable for delay caused by the carrier, by port or customs congestion, or by any authority in India or in the destination country.",
        ],
      },
      {
        id: "inspection",
        heading: "8. Inspection",
        blocks: [
          "You may appoint a third-party inspection agency of your choosing to inspect the goods at the manufacturing unit before dispatch. Tell us at the time of order confirmation so that it can be scheduled; the agency's fees are yours.",
          "Once goods have passed an inspection you arranged, a claim on a characteristic covered by that inspection is not one we can accept.",
        ],
      },
      {
        id: "documents",
        heading: "9. Export documentation",
        blocks: [
          "Unless we agree otherwise, each consignment is documented with:",
          [
            "commercial invoice and packing list",
            "certificate of origin",
            "mill test certificates traceable to the heat number, issued by the manufacturer",
            "bill of lading or airway bill",
            "any inspection or fumigation certificate the destination requires and you have asked for",
          ],
          "Tell us at order confirmation if your import formalities need a document in a particular form, legalisation or number of originals. Re-issuing documents after shipment is often impossible.",
        ],
      },
      {
        id: "claims",
        heading: "10. Shortages, damage and claims",
        blocks: [
          `Check the consignment on arrival. Any claim for shortage, damage or non-conformity must reach us in writing within ${legalTerms.claimNoticeDays} days of the goods arriving at the destination port or airport, with photographs, the packing list reference and the heat number from the mill test certificate.`,
          "Do not return, rework or dispose of goods under claim without our written authorisation — doing so makes the claim impossible to verify with the manufacturer.",
          "Loss or damage in transit is a claim against the carrier or the cargo insurer, not against us, where risk had already passed under the agreed Incoterm.",
        ],
      },
      {
        id: "warranty",
        heading: "11. Warranty and remedy",
        blocks: [
          "We warrant that the goods conform to the specification on the accepted proforma invoice and to the mill test certificate supplied with them. We give no other warranty, express or implied.",
          "Where a claim is accepted, our remedy is, at our option, replacement of the non-conforming goods on the next consignment or a credit for their invoice value. Our total liability for any order is limited to the invoice value of that order.",
          "We are not liable for indirect or consequential loss, including loss of profit, loss of contract, downtime, or the cost of removing or refitting installed goods.",
          "Selecting the right grade, class, coating and size for your application is an engineering decision that rests with you and your engineer. We supply to the specification you give us; we do not certify its fitness for your purpose.",
        ],
      },
      {
        id: "force-majeure",
        heading: "12. Force majeure",
        blocks: [
          "Neither of us is liable for failure or delay caused by something outside reasonable control — including war, civil unrest, sanctions, epidemic, flood or cyclone, fire, strike or labour action, raw material or power failure at the manufacturing unit, port closure, carrier failure, or an act of any government or authority.",
          "If the event continues for more than 90 days, either of us may cancel the affected part of the order, and we will refund any advance for goods not shipped.",
        ],
      },
      {
        id: "compliance",
        heading: "13. Export control and compliance",
        blocks: [
          "Every shipment is made subject to the Foreign Trade Policy of India and to Indian customs and exchange control law.",
          "You confirm that you will not re-export or divert the goods in breach of any applicable sanctions or export control regime, and that neither you nor the ultimate consignee is a party designated under one. We may decline or cancel an order where compliance is in doubt, and we will refund any advance received for it.",
        ],
      },
      {
        id: "cancellation",
        heading: "14. Cancellation",
        blocks: [
          "Once material has been allotted or production started at the manufacturing unit, an order cannot be cancelled without covering the costs already committed. Goods made to a non-standard size, grade or finish are not cancellable at all.",
        ],
      },
      {
        id: "law",
        heading: "15. Governing law and disputes",
        blocks: [
          `These terms and every contract under them are governed by the laws of India.`,
          `We will try to settle any dispute by discussion first. Failing that, the dispute shall be referred to arbitration by a sole arbitrator under the Arbitration and Conciliation Act, 1996, seated at ${legalTerms.arbitrationSeat}, conducted in English. Subject to that, the courts at ${legalTerms.jurisdiction} have exclusive jurisdiction.`,
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    shortTitle: "Privacy Policy",
    eyebrow: "Privacy",
    summary:
      "What happens to your information when you use this site or send us an enquiry. Short version: the site itself collects nothing.",
    lede: "This site sets no cookies, runs no analytics and has no tracking pixels. The enquiry form does not send anything to us — it opens your own email client with the message drafted, and you decide whether to send it.",
    updated: legalTerms.effective,
    sections: [
      {
        id: "summary",
        heading: "1. The short version",
        blocks: [
          "We are an exporter, not an advertising business. We hold what you send us in order to quote and to ship, and nothing beyond that.",
          [
            "The Site sets no cookies and runs no analytics, advertising or social tracking scripts.",
            "The enquiry form runs entirely in your browser. It composes an email and hands it to your email application; nothing is transmitted to us until you press send there.",
            "Typefaces are served from this Site, not from a font network, so browsing does not report you to a third party.",
            "We do not sell, rent or trade personal information. Ever.",
          ],
        ],
      },
      {
        id: "controller",
        heading: "2. Who is responsible",
        blocks: [
          `${site.name}, ${site.contact.address}, decides how the information described here is handled. In Indian law we are the data fiduciary; if you are writing from the EU or the UK, we are the controller.`,
          `You can reach us about anything on this page at ${site.contact.email}.`,
        ],
      },
      {
        id: "what-we-collect",
        heading: "3. What the website collects",
        blocks: [
          "Directly, nothing. There is no account, no login, no newsletter sign-up and no payment on this Site, and the catalogue and company profile download without asking who you are.",
          "As with any website, the server that delivers these pages records ordinary technical connection data — IP address, browser and device type, the page requested and the time. Our hosting provider keeps these logs briefly to deliver the site and to defend it against abuse. We do not use them to build a profile of you or try to identify you from them.",
        ],
      },
      {
        id: "what-you-send",
        heading: "4. What you send us",
        blocks: [
          "When you write to us — through the enquiry form's draft email, or directly by email, WhatsApp or telephone — we receive what you chose to put in the message. Typically that is:",
          [
            "your name and your company",
            "your email address, and your telephone or WhatsApp number if you use them",
            "the destination country and port",
            "the specification, grade, quantity and delivery terms you are asking about",
            "anything else you add, including the correspondence that follows",
          ],
          "If an order results, we will also hold the commercial and shipping details needed to execute and document it, including consignee details and the bank references your payment method requires.",
        ],
      },
      {
        id: "why",
        heading: "5. Why we hold it, and on what basis",
        blocks: [
          "To answer your enquiry, prepare a quotation, execute an order, ship it, document it and account for it — and to keep the records Indian tax, customs and company law require us to keep.",
          "Where the EU or UK GDPR applies to you, our lawful bases are the steps taken at your request before entering a contract and the performance of that contract (Article 6(1)(b)), our legitimate interest in responding to business correspondence and maintaining our commercial records (Article 6(1)(f)), and compliance with our legal obligations (Article 6(1)(c)). Where the Digital Personal Data Protection Act, 2023 applies, we rely on your consent in approaching us and on the legitimate uses it recognises.",
          "We do not use your details for marketing you did not ask for, and we do not add enquirers to a mailing list.",
        ],
      },
      {
        id: "sharing",
        heading: "6. Who else sees it",
        blocks: [
          "Only the parties an export actually requires, and only the part of it they need:",
          [
            "the manufacturing unit producing your goods — the specification, quantity and delivery date",
            "freight forwarders, customs house agents, shipping lines and airlines — consignee and shipping details, as the documents require",
            "any inspection agency you have appointed",
            "our bank, and yours, for the payment and the shipping documents",
            "customs, tax and export authorities in India, where the law requires it",
            "our professional advisers, where they need it to advise us",
          ],
          "We do not share your information with anyone else, and we place no advertising or data-broking service on this Site.",
        ],
      },
      {
        id: "transfers",
        heading: "7. Where it goes",
        blocks: [
          "We are in India and you are, in all likelihood, not. Corresponding with us and buying from us necessarily moves your information to India, and moves shipping details onward to the carriers and authorities in the destination country. That transfer is inherent in the transaction you are asking for.",
          "Where the GDPR applies, we rely on the necessity of the transfer for the performance of the contract with you, or for pre-contractual steps you have requested. Ask us if you need a different arrangement in place before you correspond.",
        ],
      },
      {
        id: "retention",
        heading: "8. How long we keep it",
        blocks: [
          "Enquiries that do not lead to an order are kept while there is a live prospect of business and are then cleared from our correspondence.",
          "Records of an actual export — invoices, shipping and customs documents, payment records — are kept for as long as Indian tax, customs, GST and company law require, which is a period of years and is not something we can shorten on request.",
        ],
      },
      {
        id: "security",
        heading: "9. Security",
        blocks: [
          "The Site is served over an encrypted connection. Correspondence and commercial records are held in business email and accounting systems with access limited to the people who need it.",
          "No system is perfect, and email in particular is not a secure channel. Please do not send bank credentials, card details or identity documents by email. Watch for fraudulent messages purporting to change our bank details — we will never notify a change of banking details by email alone; always confirm on the telephone number published on this Site.",
        ],
      },
      {
        id: "rights",
        heading: "10. Your rights",
        blocks: [
          "Write to us and we will act on it. Depending on where you are, you may ask us to:",
          [
            "tell you what we hold about you, and give you a copy",
            "correct anything inaccurate or incomplete",
            "erase what we no longer have a lawful reason to keep",
            "restrict or object to a particular use, including any based on legitimate interests",
            "receive the details you gave us in a portable form",
            "nominate someone to exercise these rights for you, as the Indian Act allows",
          ],
          `Send the request to ${site.contact.email} and we will respond within one month, or sooner. If we cannot do what you ask — usually because a statutory retention period covers the record — we will say so and explain why.`,
          "If you are not satisfied, you may complain to the Data Protection Board of India, or to your national supervisory authority if you are in the EU, or to the Information Commissioner's Office if you are in the UK. We would rather you came to us first.",
        ],
      },
      {
        id: "cookies",
        heading: "11. Cookies",
        blocks: [
          "This Site sets no cookies and stores nothing in your browser for its own purposes. There is no consent banner because there is nothing to consent to.",
          "If you follow a link from here to WhatsApp or to any other outside service, that service will apply its own cookies and its own privacy policy, over which we have no control.",
        ],
      },
      {
        id: "children",
        heading: "12. Children",
        blocks: [
          "This is a business-to-business site for industrial buyers. It is not directed at children, and we do not knowingly hold information about them. If you believe we have, tell us and we will delete it.",
        ],
      },
      {
        id: "changes",
        heading: "13. Changes",
        blocks: [
          "If we change how we handle information — if, for instance, we ever add an analytics tool or a server-side enquiry form — we will update this page and the date at the head of it before doing so.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "disclaimer",
    title: "Disclaimer",
    shortTitle: "Disclaimer",
    eyebrow: "Notices",
    summary:
      "What our published specifications, photographs and standard references mean — and, importantly, what they do not.",
    lede: "We publish size tables, grades and photographs so that a buyer can recognise what we supply. They are descriptive, not a specification you should design against.",
    updated: legalTerms.effective,
    sections: [
      {
        id: "indicative",
        heading: "1. Published information is indicative",
        blocks: [
          "Size ranges, grades, property classes, finishes and weights on this Site describe what we ordinarily export. They are collected from manufacturers' catalogues and from published standards, and they change as our sourcing changes.",
          "Do not design, quote or order against a page on this Site. The binding description of any goods is the one on the quotation or proforma invoice we issue to you, together with the mill test certificate supplied with the consignment.",
        ],
      },
      {
        id: "merchant-exporter",
        heading: "2. We are a merchant exporter",
        blocks: [
          `${site.name} sources from verified Indian manufacturing partners. We do not operate forging, machining, heat treatment, plating or testing facilities of our own.`,
          "Manufacturing certifications, including ISO 9001 quality management and the testing accreditations behind a mill test certificate, are held by those partners, not by us. Where we list them, we list them as supplier certifications. The registrations we hold in our own name — IEC, GSTIN and our export council membership — are set out on the Certifications page.",
        ],
      },
      {
        id: "photography",
        heading: "3. Product photography",
        blocks: [
          "Photographs illustrate the type, head form and finish of a fastener. They are taken from our manufacturing partners' catalogue material and are not photographs of the consignment you will receive.",
          "Appearance varies with size, manufacturing unit, coating batch and standard. Where finish or marking matters to you, ask for a sample or a pre-dispatch photograph of the actual production.",
        ],
      },
      {
        id: "standards",
        heading: "4. References to standards",
        blocks: [
          "ISO, DIN, ASTM, ANSI, BS, BSW, UNC and IS designations belong to the organisations that issue them. We use them to identify the specification a fastener is made to.",
          "A reference on this Site is not a claim that we are accredited, licensed, certified or endorsed by any standards body, nor a substitute for reading the standard itself. Standards are revised; check the edition that applies to your project.",
        ],
      },
      {
        id: "no-engineering-advice",
        heading: "5. Not engineering advice",
        blocks: [
          "Nothing on this Site is engineering, structural or safety advice. Choosing the grade, class, coating, length and torque for a joint — particularly in structural, pressure, marine or safety-critical work — is a decision for a qualified engineer with the full context of the application.",
          "We are glad to discuss what is available and what is commonly used, and we will tell you when a question is outside what a supplier can properly answer.",
        ],
      },
      {
        id: "third-party",
        heading: "6. Outside links and third parties",
        blocks: [
          "Links from this Site to other services are offered for convenience. We do not control them, do not endorse them, and are not responsible for their content or their handling of your information.",
        ],
      },
      {
        id: "fraud",
        heading: "7. Impersonation and payment fraud",
        blocks: [
          `Our only email domain is the one shown at ${site.contact.email}, and our published telephone and WhatsApp number is ${site.contact.phone}.`,
          "Exporters are a standing target for invoice-redirection fraud. We will never announce a change of bank account by email alone. If you receive any message that appears to come from us asking you to pay into a different account, stop and confirm it by telephone on the number published here before transferring anything.",
        ],
      },
      {
        id: "no-warranty",
        heading: "8. No warranty for the site",
        blocks: [
          "This Site is provided for information, as it stands. To the extent the law allows, we accept no liability for loss arising from reliance on it. Our obligations for goods we actually supply are set out in the Terms of Sale.",
        ],
      },
    ],
  },
] as const;

export const legalBySlug = (slug: string) =>
  legalDocs.find((d) => d.slug === slug);
