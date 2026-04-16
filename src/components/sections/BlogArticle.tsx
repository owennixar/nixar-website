"use client";

import Link from "next/link";
import { Fragment } from "react";

/**
 * Simple markdown-to-JSX renderer for blog content.
 * Supports: ## headings, ### headings, **bold**, [links](url),
 * paragraphs, blockquotes (> ), bullet lists, numbered lists,
 * and | table | rows |.
 */
export default function BlogArticle({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    /* ── blank line → skip ─────────────────────────────────────── */
    if (line.trim() === "") {
      i++;
      continue;
    }

    /* ── H2 ────────────────────────────────────────────────────── */
    if (line.startsWith("## ")) {
      const headingText = line.slice(3);
      const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      elements.push(
        <h2
          key={i}
          id={headingId}
          className="mt-14 mb-6 font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3vw,2rem)] font-700 uppercase leading-[1.2] text-white"
        >
          {inline(headingText)}
        </h2>
      );
      i++;
      continue;
    }

    /* ── H3 ────────────────────────────────────────────────────── */
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="mt-10 mb-4 font-[family-name:var(--font-oswald)] text-[1.25rem] font-700 uppercase leading-[1.3] text-white"
        >
          {inline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    /* ── blockquote ────────────────────────────────────────────── */
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="my-6 border-l-4 border-[#E71840] pl-6 text-[1rem] italic leading-[1.8] text-[#aaa]"
        >
          {inline(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    /* ── table (| col | col |) ─────────────────────────────────── */
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      // skip separator row (|---|---|)
      const rows = tableLines.filter((r) => !r.match(/^\|\s*[-:]+/));
      if (rows.length > 0) {
        const headers = parseCells(rows[0]);
        const body = rows.slice(1).map(parseCells);
        elements.push(
          <div key={`tbl-${i}`} className="my-8 overflow-x-auto">
            <table className="w-full text-left text-[1rem]">
              <thead>
                <tr className="border-b border-[#333]">
                  {headers.map((h, ci) => (
                    <th
                      key={ci}
                      className="py-3 px-4 font-700 uppercase tracking-wider text-[#E71840] text-[1rem]"
                    >
                      {inline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri} className="border-b border-[#1a1a1a]">
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-3 px-4 text-[#ccc]">
                        {inline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    /* ── unordered list ────────────────────────────────────────── */
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].replace(/^[-*] /, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 ml-5 list-disc space-y-2">
          {items.map((item, ii) => (
            <li key={ii} className="text-[1rem] leading-[1.8] text-[#ccc]">
              {inline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    /* ── ordered list ──────────────────────────────────────────── */
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 ml-5 list-decimal space-y-2">
          {items.map((item, ii) => (
            <li key={ii} className="text-[1rem] leading-[1.8] text-[#ccc]">
              {inline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    /* ── paragraph ─────────────────────────────────────────────── */
    elements.push(
      <p
        key={i}
        className="my-4 text-[1rem] leading-[1.9] text-[#ccc] font-[family-name:var(--font-plus-jakarta)]"
      >
        {inline(line)}
      </p>
    );
    i++;
  }

  return <article className="blog-article">{elements}</article>;
}

/* ── inline markdown parsing ──────────────────────────────────────── */
function inline(text: string): React.ReactNode {
  // Split on bold, links, and inline code
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|`(.+?)`/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // text before match
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }

    if (match[1]) {
      // bold
      parts.push(
        <strong key={match.index} className="font-700 text-white">
          {match[1]}
        </strong>
      );
    } else if (match[2] && match[3]) {
      // link
      const href = match[3];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        parts.push(
          <Link
            key={match.index}
            href={href}
            className="text-[#E71840] underline underline-offset-2 hover:text-white transition-colors"
          >
            {match[2]}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E71840] underline underline-offset-2 hover:text-white transition-colors"
          >
            {match[2]}
          </a>
        );
      }
    } else if (match[4]) {
      // inline code
      parts.push(
        <code
          key={match.index}
          className="rounded bg-[#1a1a1a] px-1.5 py-0.5 text-[0.85em] text-[#E71840]"
        >
          {match[4]}
        </code>
      );
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length === 1 ? parts[0] : <Fragment>{parts}</Fragment>;
}

function parseCells(row: string): string[] {
  return row
    .split("|")
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
}
