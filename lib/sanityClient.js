import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'dei3mdyi',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skVhyZDaGbDhOCORWKVVTfT0LhxlfElcdUUWjSXiDdvYv5ugb3Nyr14oIwLp9fZtYSi3v4ZcjSlMxtTnPpl7KKA4aK0XzLMfcxN2OrpJ8pVR8wADhCkoC66P189FGrl8aEVRt6HuGTnWBff1PwfiPjgQrdloOSjXtdWTXlKTxfOrk2LbzQW2',
  useCdn: false,
})
