import Modal from './Modal'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmLabel?: string
  loading?: boolean
}

export default function ConfirmDialog({
  open, onClose, onConfirm, title = 'Confirm', message, confirmLabel = 'Confirm', loading,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm border rounded hover:bg-gray-50 transition disabled:opacity-30"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-30"
        >
          {loading ? 'Loading...' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
