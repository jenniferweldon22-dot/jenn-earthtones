import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';

export default function AddToCartModal() {
  const navigate = useNavigate();
  const { addedItem, isAddedModalOpen, closeAddedModal } = useCart();
  const closeBtnRef = useRef(null);

  // Esc to dismiss
  useEffect(() => {
    if (!isAddedModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeAddedModal();
    };
    document.addEventListener('keydown', onKeyDown);
    closeBtnRef.current?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isAddedModalOpen, closeAddedModal]);

  if (!isAddedModalOpen || !addedItem) return null;

  const handleCheckout = () => {
    closeAddedModal();
    navigate('/checkout');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={closeAddedModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="added-to-cart-heading"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-ink/10 bg-cream shadow-xl shadow-ink/10 p-6 animate-[slideUp_0.25s_ease-out]"
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={closeAddedModal}
          aria-label="Close"
          className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-full text-ink/40 hover:text-ink hover:bg-cream-dark transition-colors"
        >
          ✕
        </button>

        {/* Checkmark */}
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay/15 text-clay shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.415 0l-3.5-3.5a1 1 0 111.415-1.415L8.5 12.086l6.79-6.796a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <h2
            id="added-to-cart-heading"
            className="text-sm font-medium text-ink/80"
          >
            Added to your cart
          </h2>
        </div>

        {/* Item preview */}
        <div className="flex items-center gap-4 mb-6 p-3 rounded-xl bg-white border border-ink/10">
          {(addedItem.image || addedItem.images?.[0]) && (
            <img
              src={addedItem.image || addedItem.images?.[0]}
              alt={addedItem.title}
              className="h-16 w-16 rounded-lg object-cover border border-ink/10 shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink truncate">
              "{addedItem.title}"
            </p>
            <p className="text-sm text-ink/60 mt-0.5">
              ${Number(addedItem.price).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={closeAddedModal}
            className="flex-1 rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-cream-dark transition-colors"
          >
            Keep Shopping
          </button>
          <button
            onClick={handleCheckout}
            className="flex-1 rounded-lg bg-clay px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}