'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Link } from 'react-router-dom'

export default function ConfirmationDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-md">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
              Login Required
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                You need to log in to book a ticket. Please log in to continue.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
            <Link
              to="/login"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 sm:ml-3 sm:w-auto"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={onClose} // Pastikan ini dipanggil saat tombol "Cancel" ditekan
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
