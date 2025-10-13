import React from 'react';

function Footer({ trip }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
        <p>&copy; {currentYear} Your Company Name. All Rights Reserved.</p>
        <p className="text-sm mt-1">
          Built with ❤️ by Kratigya
        </p>
      </div>
    </footer>
  );
}

export default Footer;
