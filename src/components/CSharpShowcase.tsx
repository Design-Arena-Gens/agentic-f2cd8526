"use client";

import { useMemo, useState } from "react";

const ROADMAP = [
  {
    phase: "Enterprise APIs",
    description:
      "Designed modular ASP.NET Core microservices with CQRS and MediatR, supporting 50k+ daily active users.",
    tech: ["ASP.NET Core", "EF Core", "PostgreSQL", "Redis"],
    highlight:
      "Implemented a resilient message bus with retries + backoff that cut integration failures by 38%."
  },
  {
    phase: "Realtime Collaboration",
    description:
      "Built SignalR-driven whiteboarding and document syncing with optimistic concurrency and CRDT merges.",
    tech: ["SignalR", "Azure Service Bus", "Blazor"],
    highlight:
      "Achieved <100ms sync latency across continents by tuning hubs + batching protocol frames."
  },
  {
    phase: "Tooling & DX",
    description:
      "Crafted Roslyn analyzers and Source Generators to enforce architectural rules and generate mapping layers.",
    tech: ["Roslyn", "Source Generators", "MSBuild"],
    highlight:
      "Slashed manual boilerplate by 70% while guaranteeing architectural guardrails in CI."
  }
];

const SAMPLE_SNIPPET = `public static class Pipeline
{
    public static IServiceCollection AddResilientHttpClient(this IServiceCollection services)
    {
        services.AddHttpClient("external")
            .AddPolicyHandler(HttpPolicyExtensions
                .HandleTransientHttpError()
                .OrResult(msg => msg.StatusCode == HttpStatusCode.TooManyRequests)
                .WaitAndRetryAsync(Backoff.DecorrelatedJitterBackoffV2(
                    medianFirstRetryDelay: TimeSpan.FromMilliseconds(250),
                    retryCount: 5
                )));

        return services;
    }
}`;

const gradientForIndex = (idx: number) => {
  const gradients = [
    "linear-gradient(135deg, rgba(59,130,246,.45), rgba(37,99,235,.15))",
    "linear-gradient(135deg, rgba(16,185,129,.45), rgba(5,150,105,.15))",
    "linear-gradient(135deg, rgba(236,72,153,.45), rgba(219,39,119,.15))"
  ];

  return gradients[idx % gradients.length];
};

export default function CSharpShowcase() {
  const [activePhase, setActivePhase] = useState(0);
  const timeline = useMemo(
    () =>
      ROADMAP.map((phase, idx) => ({
        ...phase,
        gradient: gradientForIndex(idx),
        active: idx === activePhase
      })),
    [activePhase]
  );

  return (
    <section className="showcase">
      <header className="hero">
        <span className="eyebrow">C# / .NET expertise</span>
        <h1>Production-grade C# delivered on autopilot</h1>
        <p>
          From greenfield APIs to platform refactors, I architect, implement, and harden C# systems that
          ship. Robust patterns, measurable outcomes, and relentless automation are the baseline.
        </p>
      </header>

      <div className="grid">
        <article className="snippet" aria-label="Resilient pipeline sample">
          <div className="snippet__label">Sample pattern</div>
          <pre>
            <code>{SAMPLE_SNIPPET}</code>
          </pre>
        </article>

        <article className="timeline" aria-label="Delivery track record">
          <div className="timeline__tabs" role="tablist">
            {timeline.map((phase, idx) => (
              <button
                key={phase.phase}
                role="tab"
                aria-selected={phase.active}
                className={phase.active ? "tab tab--active" : "tab"}
                onClick={() => setActivePhase(idx)}
              >
                <span>{phase.phase}</span>
              </button>
            ))}
          </div>

          <div className="timeline__panel" role="tabpanel">
            <p className="timeline__summary">{ROADMAP[activePhase].description}</p>
            <ul className="timeline__tech" aria-label="Key technologies">
              {ROADMAP[activePhase].tech.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="timeline__highlight">{ROADMAP[activePhase].highlight}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
