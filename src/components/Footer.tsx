import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-night text-sand">
      <div className="rail rail-border">
        <div className="grid gap-12 border-b border-white/10 px-5 py-16 sm:px-7 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
          <div>
            <p className="ui-label text-sand/45">
              Turning inspiration into reality
            </p>
            <a
              href="mailto:info@hr20media.com"
              className="font-display mt-5 block text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            >
              info@hr20media.com
            </a>
            <p className="mt-4 max-w-sm text-sm text-sand/55">
              Commercial photography from concept to final frame. Based in
              Bournemouth, shooting on location and in-studio across the UK.
            </p>
          </div>

          <div>
            <p className="ui-label text-sand/40">Work</p>
            <ul className="mt-5 space-y-3 text-sm text-sand/75">
              <li>
                <Link href="/work/people" className="link-underline">
                  People
                </Link>
              </li>
              <li>
                <Link href="/work/products" className="link-underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/work/food" className="link-underline">
                  Food &amp; Beverages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="ui-label text-sand/40">Studio</p>
            <ul className="mt-5 space-y-3 text-sm text-sand/75">
              <li>
                <Link href="/#studio" className="link-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#process" className="link-underline">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="link-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="ui-label text-sand/45 normal-case tracking-normal">
            © {year} HR20MEDIA. All rights reserved.
          </p>
          <p className="ui-label text-sand/45">Bournemouth, UK — 50.72°N 1.88°W</p>
        </div>

        <div aria-hidden className="overflow-hidden border-t border-white/10">
          <p className="font-display select-none whitespace-nowrap px-4 text-center text-[18vw] font-bold leading-[0.8] tracking-tighter text-sand/[0.05] sm:text-[15vw]">
            HR20MEDIA
          </p>
        </div>
      </div>
    </footer>
  );
}
