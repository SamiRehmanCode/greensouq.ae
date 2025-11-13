"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Follow Us */}
          <div>
            <h3 className="font-bold text-black mb-4">Follow us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-[#9AD92B]">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#9AD92B]">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#9AD92B]">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#9AD92B]">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#9AD92B]">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#9AD92B]">
                <MessageCircle size={20} />
              </Link>
            </div>
          </div>

          {/* Find It Fast */}
          <div>
            <h3 className="font-bold text-black mb-4">Find it Fast</h3>
            <ul className="space-y-2">
              {["Latest Blogs", "FAQs", "Shipping"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#9AD92B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="font-bold text-black mb-4">Important Links</h3>
            <ul className="space-y-2">
              {["About us", "Contact us", "Shipping charges", "Terms and Conditions"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#9AD92B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Misc Links */}
          <div>
            <h3 className="font-bold text-black mb-4">Misc Links</h3>
            <ul className="space-y-2">
              {["My Account", "Checkout", "Your Cart"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#9AD92B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-black mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                <span className="font-semibold">Mobile:</span> +971 50 512 1105
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-semibold">Email:</span>{" "}
                <Link href="mailto:info@greensouq.ae" className="hover:text-[#9AD92B]">
                  info@greensouq.ae
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">© {currentYear} GreenSouq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
