import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Webkye",
  description: "Webkye Terms & Conditions - These terms govern the digital services provided by Webkye.",
};

export default function TermsPage() {
  return (
    <main className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3">
            <span>📜</span> Terms & Conditions
          </h1>
          <p className="text-muted-foreground font-medium">Last Updated: March 2026</p>
        </div>

        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <section>
            <p className="mb-4">
              These Terms & Conditions govern the services provided by Webkye.
            </p>
            <p>
              By engaging our services, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Services</h2>
            <p className="mb-4">Webkye provides digital services including:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                "Website Development",
                "Ecommerce Development",
                "Web Applications & SaaS",
                "CRM & ERP Solutions",
                "Maintenance & Support",
                "Hosting & Domain Assistance",
                "Custom digital services as mutually agreed"
              ].map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-secondary/20 p-3 rounded-lg border border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{service}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Project Initiation</h2>
            <p className="mb-4">Work begins only after:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>scope discussion and confirmation</li>
              <li>advance payment (30–40%)</li>
              <li>client approval</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Payments</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>30–40% advance payment is required to start work</li>
              <li>milestone payments may apply</li>
              <li>final delivery occurs after full payment</li>
              <li>payment delays may pause project progress</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Revisions & Scope</h2>
            <p className="mb-4">
              Revisions are allowed based on agreed scope.
            </p>
            <p>
              Major changes outside the agreed scope will be treated as additional work and billed separately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Client Responsibilities</h2>
            <p className="mb-4">Clients must:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>provide required content on time</li>
              <li>give timely approvals</li>
              <li>ensure they have rights to submitted content</li>
            </ul>
            <p className="italic text-muted-foreground text-sm">
              Delays from the client side may extend timelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Ownership</h2>
            <p className="mb-4">
              Ownership of the completed project transfers to the client only after full payment is received.
            </p>
            <p>
              Webkye reserves the right to showcase completed projects in its portfolio unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Third-Party Services</h2>
            <p>
              Webkye is not responsible for failures or issues caused by third-party services such as hosting providers, plugins, payment gateways, or external tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Limitation of Liability</h2>
            <p className="mb-4">Webkye shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>indirect or consequential losses</li>
              <li>business interruption</li>
              <li>data loss</li>
              <li>third-party failures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">9. Termination</h2>
            <p className="mb-4">Services may be terminated if:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>payments are not made</li>
              <li>the client becomes unresponsive</li>
              <li>terms are violated</li>
            </ul>
          </section>

          <section className="pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-4 text-foreground">10. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of Delhi courts.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
