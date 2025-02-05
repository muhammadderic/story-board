"use client"; // Mark this as a Client Component

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Story Board</h2>

            <p className="text-gray-400">
              Share your voice, inspire others, and shape a brighter future
            </p>

            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: storyboard@mucodevde.com</li>
              <li className="text-gray-400">Phone: +62</li>
              <li className="text-gray-400">
                Address: West Java, Indonesia
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400">
              Get the latest updates and news straight to your inbox.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button variant="destructive">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} muhammad deric. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};