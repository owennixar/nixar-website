import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({
  items,
  dark = true,
}: {
  items: BreadcrumbItem[];
  dark?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 py-4">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span className={dark ? "text-gray-600" : "text-gray-400"}>
                /
              </span>
            )}
            {i === items.length - 1 ? (
              <span className={dark ? "text-gray-500" : "text-gray-400"}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={`transition-colors ${
                  dark
                    ? "text-gray-500 hover:text-white"
                    : "text-gray-400 hover:text-[#1A1A1A]"
                }`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
