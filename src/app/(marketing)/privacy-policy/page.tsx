import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Webkye",
  description: "Webkye Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3">
            <span>🔐</span> Privacy Policy
          </h1>
          <p className="text-muted-foreground font-medium">Last Updated: March 2026</p>
        </div>

        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <section>
            <p className="mb-4">
              Webkye (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a digital services provider based in Delhi, India. We respect your privacy and are committed to protecting your personal information.
            </p>
            <p>
              By using this website, you agree to the practices described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Information We Collect</h2>
            <p className="mb-4">We may collect the following information:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="bg-secondary/30 p-6 rounded-xl border border-border">
                <h3 className="font-bold mb-3 text-primary uppercase tracking-wider text-sm">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Business details submitted through contact forms</li>
                </ul>
              </div>
              
              <div className="bg-secondary/30 p-6 rounded-xl border border-border">
                <h3 className="font-bold mb-3 text-primary uppercase tracking-wider text-sm">Technical Information</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Cookies and usage data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. How We Use Your Information</h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>respond to inquiries</li>
              <li>provide quotations and services</li>
              <li>communicate project updates</li>
              <li>improve website performance</li>
              <li>maintain security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Cookies & Tracking</h2>
            <p className="mb-4">
              Our website may use cookies and analytics tools to improve user experience and monitor website performance.
            </p>
            <p>
              You may disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Protection</h2>
            <p>
              We implement reasonable security measures to protect your personal information against unauthorized access, misuse, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Data Sharing</h2>
            <p className="mb-4">
              We do not sell, rent, or trade personal information.
            </p>
            <p>
              Information may be securely stored on hosting servers and communication tools used to provide services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. International Users</h2>
            <p>
              As we serve clients worldwide, your information may be processed in India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Your Rights</h2>
            <p className="mb-4">You may request to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
              <li>access your data</li>
              <li>correct your data</li>
              <li>request deletion of your data</li>
            </ul>
            <p className="flex items-center gap-2 font-medium">
              For privacy-related requests, contact: 
              <a href="mailto:info@webkye.in" className="text-primary hover:underline">📧 info@webkye.in</a>
            </p>
          </section>

          <section className="pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">8. Contact Information</h2>
            <div className="space-y-3 font-medium">
              <p className="text-lg">Webkye</p>
              <p className="text-muted-foreground">Delhi, India</p>
              <p className="flex items-center gap-2">
                <span>📧</span> 
                <a href="mailto:info@webkye.in" className="hover:text-primary transition-colors">info@webkye.in</a>
              </p>
              <p className="flex items-center gap-2">
                <span>📱</span> 
                <a href="tel:+919310498455" className="hover:text-primary transition-colors">+91 9310498455</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
