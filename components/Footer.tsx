import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-nocturnal)] border-t border-[var(--color-mint)]/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-[var(--color-saffron)] to-[var(--color-forsythia)] flex items-center justify-center">
                 <Image src="/svg/cube-16-solid.svg" alt="Logo" width={20} height={20} />
              </div>
              <span className="font-sans font-bold text-xl tracking-tight text-[var(--color-arctic)]">DataSync</span>
            </div>
            <p className="text-[var(--color-mint)] text-sm mb-6">
              Premium AI tooling to sync, transform, and scale your data pipelines seamlessly.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-[var(--color-oceanic)] flex items-center justify-center hover:bg-[var(--color-saffron)] transition-colors duration-[180ms] group">
                <Image src="/svg/link-solid.svg" alt="Twitter" width={16} height={16} className="filter invert opacity-70 group-hover:opacity-100 group-hover:invert-0" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[var(--color-oceanic)] flex items-center justify-center hover:bg-[var(--color-saffron)] transition-colors duration-[180ms] group">
                <Image src="/svg/link-solid.svg" alt="LinkedIn" width={16} height={16} className="filter invert opacity-70 group-hover:opacity-100 group-hover:invert-0" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[var(--color-arctic)] mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-[var(--color-mint)]">
              <li><Link href="#features" className="hover:text-[var(--color-forsythia)] transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-[var(--color-forsythia)] transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-arctic)] mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-[var(--color-mint)]">
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-arctic)] mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-[var(--color-mint)]">
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-[var(--color-forsythia)] transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--color-mint)]/10 text-sm text-[var(--color-mint)]">
          <p>&copy; {new Date().getFullYear()} DataSync Inc. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
