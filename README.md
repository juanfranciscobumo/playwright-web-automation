# Playwright Web Automation

Framework de automatización web con Playwright y TypeScript para [SauceDemo](https://www.saucedemo.com).

## Requisitos previos

- Node.js >= 18
- npm o yarn

## Instalación

```bash
npm install
npx playwright install
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecuta todos los tests |
| `npm run test:headed` | Ejecuta tests con navegador visible |
| `npm run test:ui` | Abre la UI de Playwright |
| `npm run test:debug` | Ejecuta tests en modo debug |
| `npm run test:login` | Ejecuta tests de login |
| `npm run test:inventory` | Ejecuta tests de inventario |
| `npm run test:cart` | Ejecuta tests de carrito |
| `npm run test:checkout` | Ejecuta tests de checkout |
| `npm run report` | Abre el reporte HTML |

## Estructura del proyecto

```
├── fixtures/
│   └── test-data.ts           # Datos de prueba y fixtures
├── pages/                     # Page Objects
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   └── tests/                 # Tests
│       ├── login.spec.ts
│       ├── inventory.spec.ts
│       ├── cart.spec.ts
│       └── checkout.spec.ts
└── playwright.config.ts
```

## Page Objects

### BasePage
- `navigate(path)` - Navegar a una ruta
- `getTitle()` - Obtener título de la página
- `isVisible(selector)` - Verificar si un elemento es visible
- `click(selector)` - Hacer clic en un elemento
- `fill(selector, value)` - Llenar un campo

### LoginPage
- `visit()` - Navegar a la página de login
- `login(username, password)` - Login completo
- `getErrorMessage()` - Obtener mensaje de error

### InventoryPage
- `isInventoryDisplayed()` - Verificar inventario
- `getItemCount()` - Cantidad de productos
- `getItemNames()` - Nombres de productos
- `getItemPrices()` - Precios de productos
- `addToCart(index)` - Agregar al carrito
- `goToCart()` - Ir al carrito
- `getCartBadgeCount()` - Contador del carrito
- `sortBy(option)` - Ordenar productos

### CartPage
- `isCartDisplayed()` - Verificar carrito
- `getItemCount()` - Cantidad de items
- `removeItem(index)` - Eliminar item
- `checkout()` - Ir al checkout
- `continueShopping()` - Volver a comprar

### CheckoutPage
- `fillCheckoutInfo(firstName, lastName, postalCode)` - Llenar información
- `continueToOverview()` - Continuar al resumen
- `finishCheckout()` - Finalizar compra
- `cancelCheckout()` - Cancelar compra
- `getCompleteMessage()` - Obtener mensaje de confirmación

## Custom Fixtures

### loginPage
```typescript
test("ejemplo", async ({ loginPage }) => {
  await loginPage.login("user", "pass");
});
```

### inventoryPage
```typescript
test("ejemplo", async ({ inventoryPage }) => {
  await inventoryPage.addToCart(0);
  const count = await inventoryPage.getCartBadgeCount();
});
```

### cartPage
```typescript
test("ejemplo", async ({ cartPage }) => {
  await cartPage.checkout();
});
```

### checkoutPage
```typescript
test("ejemplo", async ({ checkoutPage }) => {
  await checkoutPage.fillCheckoutInfo("Juan", "Perez", "12345");
  await checkoutPage.finishCheckout();
});
```

## Tests incluidos

### Login
- Login exitoso
- Error con usuario bloqueado
- Error con credenciales inválidas
- Error con campos vacíos

### Inventario
- Mostrar productos
- Agregar productos al carrito
- Ordenar productos

### Carrito
- Agregar/eliminar productos
- Navegación

### Checkout
- Completar compra
- Cancelar compra
- Validaciones de campos

## Website Under Test

[SauceDemo](https://www.saucedemo.com) - Tienda de demostración para testing.

## Tecnologías

- Playwright 1.40+
- TypeScript 5
- Page Object Model
