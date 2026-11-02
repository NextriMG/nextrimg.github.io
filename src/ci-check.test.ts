import { it, expect } from 'vitest'

// Test volontairement cassé : vérifie que la CI échoue sans déployer (étape 6). À annuler.
it('casse la CI exprès', () => {
  expect(1).toBe(2)
})
