import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactWindow from './ContactWindow'

describe('ContactWindow', () => {
  it('renders the form by default', () => {
    render(<ContactWindow />)
    expect(screen.getByLabelText('Votre nom')).toBeInTheDocument()
    expect(screen.getByLabelText('Adresse email')).toBeInTheDocument()
  })

  it('does not submit when name is empty', () => {
    render(<ContactWindow />)
    fireEvent.click(screen.getByText('Envoyer →'))
    expect(screen.queryByText('Message bien reçu !')).not.toBeInTheDocument()
  })

  it('does not submit when email is empty', () => {
    render(<ContactWindow />)
    fireEvent.change(screen.getByLabelText('Votre nom'), { target: { value: 'Jean' } })
    fireEvent.click(screen.getByText('Envoyer →'))
    expect(screen.queryByText('Message bien reçu !')).not.toBeInTheDocument()
  })

  it('shows success state when name and email are filled', () => {
    render(<ContactWindow />)
    fireEvent.change(screen.getByLabelText('Votre nom'), { target: { value: 'Jean' } })
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean@test.com' } })
    fireEvent.click(screen.getByText('Envoyer →'))
    expect(screen.getByText('Message bien reçu !')).toBeInTheDocument()
  })
})
