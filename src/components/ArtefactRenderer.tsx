import type { Artefact } from "../types";
import { RichText } from "./RichText";
import { AvaMark } from "./AvaMark";
import { Mail, MessageSquare } from "lucide-react";

// Realistic-but-stylised in-world documents (spec §5.4). Marked up as readable
// structured content, never images of text (WCAG 1.4.5).

export function ArtefactRenderer({ artefact }: { artefact: Artefact }) {
  switch (artefact.kind) {
    case "email":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-canvas px-4 py-2 text-sm">
            <Mail size={16} className="text-brand" aria-hidden />
            <span className="font-semibold">{artefact.subject}</span>
            <span className="ml-auto text-ink/60">{artefact.from}</span>
          </figcaption>
          <div className="space-y-3 px-4 py-4 text-[0.95rem] leading-relaxed">
            {artefact.body.map((line, i) => (
              <p key={i}>
                <RichText text={line} />
              </p>
            ))}
          </div>
        </figure>
      );

    case "chatThread":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-canvas px-4 py-2 text-sm">
            <MessageSquare size={16} className="text-brand" aria-hidden />
            <span className="font-semibold">Team channel</span>
          </figcaption>
          <ul className="divide-y divide-hairline">
            {artefact.messages.map((m, i) => (
              <li key={i} className="px-4 py-3">
                <span className="block text-xs font-semibold text-brand">
                  {m.author}
                </span>
                <span className="text-[0.95rem]">
                  <RichText text={m.text} />
                </span>
              </li>
            ))}
          </ul>
        </figure>
      );

    case "aiReply":
      return (
        <figure className="overflow-hidden rounded-xl border border-brand/30 bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-brand/5 px-4 py-2 text-sm">
            <AvaMark size={18} />
            <span className="font-semibold">{artefact.title ?? "Ava"}</span>
          </figcaption>
          <div className="px-4 py-4 text-[0.95rem] leading-relaxed">
            <RichText text={artefact.body} />
          </div>
        </figure>
      );

    case "notes":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          {artefact.title && (
            <figcaption className="border-b border-hairline bg-canvas px-4 py-2 text-sm font-semibold">
              {artefact.title}
            </figcaption>
          )}
          <ul className="list-disc space-y-2 px-8 py-4 text-[0.95rem]">
            {artefact.lines.map((line, i) => (
              <li key={i}>
                <RichText text={line} />
              </li>
            ))}
          </ul>
        </figure>
      );

    case "spreadsheet":
    case "table": {
      const isSheet = artefact.kind === "spreadsheet";
      return (
        <figure className="overflow-x-auto rounded-xl border border-hairline bg-surface shadow-card">
          {isSheet && (
            <figcaption className="border-b border-hairline bg-canvas px-4 py-2 text-sm font-semibold">
              Spreadsheet
            </figcaption>
          )}
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-canvas">
                {artefact.columns.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="border-b border-hairline px-3 py-2 font-semibold"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {artefact.rows.map((row, ri) => (
                <tr key={ri} className="even:bg-canvas/50">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-hairline px-3 py-2 align-top"
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    }
  }
}
