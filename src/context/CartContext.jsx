import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'jenn-earthtones-cart'

function loadInitialState() {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}

// Each cart item is keyed by product id + size label, since the same
// artwork can be added in different sizes (original vs. print, etc.)
function lineKey(productId, sizeLabel) {
  return `${productId}::${sizeLabel}`
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, quantity } = action.payload
      const key = lineKey(product.id, size.label)
      const existing = state.items.find((i) => i.key === key)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            productId: product.id,
            slug: product.slug,
            title: product.title,
            artNumber: product.artNumber,
            palette: product.palette,
            image: product.images?.[0],
            size,
            quantity,
          },
        ],
      }
    }
    case 'UPDATE_QUANTITY': {
      const { key, quantity } = action.payload
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.key !== key) }
      }
      return {
        ...state,
        items: state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.key !== action.payload.key) }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  // Toast is deliberately kept OUTSIDE the reducer/localStorage state above —
  // it's transient UI feedback, not data we want persisted across reloads.
  const [toast, setToast] = useState(null) // { id, title } | null
  const toastTimeoutRef = useRef(null)

  // NEW: "Added to cart" modal feedback (AddToCartModal.jsx). Also transient
  // UI state, kept outside the reducer for the same reason as toast above.
  const [addedItem, setAddedItem] = useState(null) // { title, image, price } | null
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage unavailable — cart just won't persist across reloads
    }
  }, [state])

  // Clean up any pending toast timer if the whole app unmounts
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  const value = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.size.price * i.quantity, 0)
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

    return {
      items: state.items,
      subtotal,
      itemCount,
      toast,
      dismissToast: () => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
        setToast(null)
      },
      // NEW: exposed for AddToCartModal.jsx
      addedItem,
      isAddedModalOpen,
      closeAddedModal: () => setIsAddedModalOpen(false),
      addItem: (product, size, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, size, quantity } })

        // Fire the "added to cart" toast. Every screen that calls addItem
        // (ProductCard, ProductDetail, etc.) gets this for free — no need
        // to touch those components individually.
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
        setToast({ id: Date.now(), title: product.title })
        toastTimeoutRef.current = setTimeout(() => setToast(null), 3000)

        // NEW: open the AddToCartModal with the item just added. Price
        // lives on `size` (not the top-level product), matching how items
        // are stored above in ADD_ITEM.
        setAddedItem({
          title: product.title,
          image: product.images?.[0],
          price: size.price,
        })
        setIsAddedModalOpen(true)

        // Analytics hook: fire an `add_to_cart` event here, e.g.
        // window.gtag?.('event', 'add_to_cart', { items: [{ item_id: product.id, item_name: product.title, price: size.price }] })
      },
      updateQuantity: (key, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } }),
      removeItem: (key) => dispatch({ type: 'REMOVE_ITEM', payload: { key } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }
  }, [state, toast, addedItem, isAddedModalOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}