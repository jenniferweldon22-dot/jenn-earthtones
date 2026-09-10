import React from 'react'
import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found — Jenn Earthtones" description="This page could not be found." />
      <div className="container-art py-32 text-center">
        <p className="text-sm text-clay font-medium mb-3">404</p>
        <h1 className="font-display text-4xl font-medium mb-6">This page wandered off.</h1>
        <p className="text-ink/60 mb-8">The page you're looking for doesn't exist, or the artwork has already sold.</p>
        <Button to="/shop">Back to the Shop</Button>
      </div>
    </>
  )
}
