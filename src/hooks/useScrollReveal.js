import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight IntersectionObserver wrapper for scroll-reveal animations.
 * Returns a ref to attach to the target element and a boolean that flips
 * to true once the element enters the viewport (fires once by default).
 *
 * Framer Motion's `whileInView` covers most reveal cases directly in JSX,
 * but this hook exists for components (e.g. AnimatedCounter, custom canvas/
 * SVG-driven effects) that need imperative access to the "now visible" event.
 */
export default function useScrollReveal({ threshold = 0.2, once = true, rootMargin = '0px' } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(node)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, isVisible]
}
