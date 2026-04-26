import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Webkye",
  description: "Webkye Refund & Cancellation Policy - Learn about our terms for project cancellations and refunds.",
};

export default function RefundPolicyPage() {
  return (
    <main className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3">
            <span>💰</span> Refund & Cancellation Policy
          </h1>
          <p className="text-muted-foreground font-medium">Last Updated: March 2026</p>
        </div>

        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <section>
            <p>
              This policy outlines refund and cancellation terms for services provided by Webkye.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Advance Payments</h2>
            <p className="bg-red-50/50 dark:bg-red-950/10 border-l-4 border-red-500 p-4 rounded-r-lg">
              Advance payments are non-refundable once the project has commenced.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Project Cancellation</h2>
            <p className="mb-4">If a client cancels after work has started:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>no refund will be issued</li>
              <li>completed work may be delivered upon request</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Non-Response</h2>
            <p className="mb-4">If a client is unresponsive for more than 15 days:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>the project may be marked inactive</li>
              <li>timelines may be extended</li>
              <li>no refunds will be issued</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Milestones & Completed Work</h2>
            <p>
              Payments for completed milestones or delivered services are non-refundable.
            </p>
          </section>

          <section className="pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-4 text-foreground text-primary">5. Exceptions</h2>
            <p className="font-medium">
              Refunds may only be considered if Webkye is unable to deliver the agreed service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
