# E-commerce con Astro + Wompi: Guía de Implementación

## Resumen Ejecutivo

**Astro sí es adecuado** para e-commerce con Wompi. La arquitectura recomendada combina:
- **Frontend (Astro)**: Carrito, productos, checkout
- **Server Endpoints (Astro)**: Generación de firma de integridad, webhooks
- **Widget Wompi**: Pagos seguros (tarjetas, PSE, Nequi, Daviplata, etc.)
- **Wompi API**: Validación de transacciones, suscripciones

---

## 1. ¿Se puede usar Astro para e-commerce?

**Sí.** Astro soporta:
- **Output server** (`output: 'server'`) – ya configurado en tu proyecto para Microsoft auth
- **API Routes** – endpoints en `src/pages/*.ts` para lógica backend
- **Variables de entorno** – para claves Wompi sin exponerlas al frontend

Astro permite flujos similares a Stripe o Lemon Squeezy, pero usando la API y el widget de Wompi.

---

## 2. Arquitectura Recomendada

```
[Productos] → [Agregar al carrito] → [Carrito] → [Checkout] → [API Astro] → [Widget Wompi] → [Webhook] → [Activar suscripción]
```

### Flujo detallado

1. **Carrito (frontend)**  
   - localStorage o estado compartido para productos, cantidades y descuentos
   - Cálculo de totales (precio × cantidad − descuentos)

2. **Checkout (frontend)**  
   - Página `/checkout` con resumen del carrito
   - Botón “Pagar con Wompi” que llama a tu API

3. **API Astro** (`/api/wompi/checkout`)  
   - Recibe: items del carrito, total, email del usuario (opcional)
   - Genera referencia única (UUID o similar)
   - Calcula monto en centavos (COP)
   - Genera **firma de integridad** con SHA256 (nunca en frontend)
   - Devuelve: `reference`, `amountInCents`, `signature`, `publicKey`

4. **Widget Wompi (frontend)**  
   - Usa `WidgetCheckout` de `https://checkout.wompi.co/widget.js`
   - Abre el widget con los datos devueltos por la API
   - El usuario paga en el widget

5. **Webhook Wompi** (`/api/wompi/webhook`)  
   - Wompi envía el evento cuando la transacción termina
   - Validar firma del webhook
   - Actualizar base de datos / estado de suscripción

---

## 3. Dependencias Necesarias

### NPM

```bash
# No se requiere SDK de Wompi; se usa el script del widget
# Para el carrito y estado, opciones:
npm install nanostores          # Estado reactivo liviano (opcional)
# o usar localStorage + vanilla JS
```

### Variables de entorno

```env
# Wompi - obtener en comercios.wompi.co
WOMPI_PUBLIC_KEY=pub_prod_xxx      # Llave pública (puede ir en frontend)
WOMPI_PRIVATE_KEY=prv_prod_xxx     # Solo backend
WOMPI_INTEGRITY_SECRET=prod_integrity_xxx  # Para firma - NUNCA exponer
WOMPI_ENV=production               # o "sandbox" para pruebas
```

---

## 4. Generación de la Firma de Integridad (Crítico)

La firma **debe generarse en el servidor**. Nunca en el frontend.

```
SHA256(reference + amountInCents + "COP" + integritySecret)
```

Ejemplo en Node/Deno:

```javascript
import { createHash } from 'node:crypto';

function generateIntegritySignature(reference, amountInCents, integritySecret) {
  const data = `${reference}${amountInCents}COP${integritySecret}`;
  return createHash('sha256').update(data).digest('hex');
}
```

---

## 5. Integración del Widget Wompi

### Opción A: Botón automático (simple)

```html
<form>
  <script
    src="https://checkout.wompi.co/widget.js"
    data-render="button"
    data-public-key="pub_prod_xxx"
    data-currency="COP"
    data-amount-in-cents="4950000"
    data-reference="REF-UNICA-123"
    data-signature:integrity="hash_generado_en_servidor"
  ></script>
</form>
```

### Opción B: Botón personalizado (recomendada para carrito)

1. Incluir el script del widget.
2. Llamar a la API para obtener `reference`, `signature` y `amountInCents`.
3. Instanciar `WidgetCheckout` y llamar `checkout.open()` al hacer clic.

---

## 6. Suscripciones y Pagos Recurrentes

Wompi permite:
- **Pagos únicos**: ideal para productos concretos
- **Pagos recurrentes**: mediante tokenización de tarjeta en la API

Para suscripciones:
1. Usar la **API de Wompi** (no solo el widget) para tokenizar tarjetas.
2. Crear cobros recurrentes desde tu backend con los tokens.
3. Configurar webhooks para fallos de pago y renovaciones.

Documentación:  
https://docs.wompi.co/docs/colombia/referencia/

---

## 7. Carrito: Lógica Óptima

### Estructura del carrito (localStorage)

```typescript
interface CartItem {
  productId: string;    // 'lucia' | 'sofia' | 'maria'
  name: string;
  price: number;        // en COP
  quantity: number;
  discount?: number;    // descuento en COP
}

interface Cart {
  items: CartItem[];
  promoCode?: string;
  promoDiscount?: number;
}
```

### Cálculo del total

```
subtotal = Σ (item.price * item.quantity - item.discount)
total = subtotal - promoDiscount
amountInCents = Math.round(total * 100)  // Wompi usa centavos
```

### Descuentos promocionales

- Definir reglas (ej.: “PROMO20” = 20 % de descuento)
- Validar en frontend y/o en el endpoint de checkout antes de generar la firma

---

## 8. Pasos de Implementación Sugeridos

1. **Catálogo de productos**  
   - Crear `src/lib/products.ts` con Lucía, Sofía y María (id, nombre, precio, imagen).

2. **Carrito (frontend)**  
   - Componente/servicio de carrito (localStorage).
   - Botones “Agregar al carrito” con `data-add-to-cart` (ya presentes).
   - Script para escuchar clics y actualizar carrito.

3. **Página `/checkout`**  
   - Mostrar items, subtotal, descuentos y total.
   - Botón “Pagar con Wompi” que:
     - Envía los datos del carrito a `/api/wompi/checkout`
     - Recibe `reference`, `signature`, `amountInCents`
     - Abre el widget con esos datos

4. **API `/api/wompi/checkout`**  
   - Valida carrito y total.
   - Genera referencia única.
   - Calcula firma de integridad.
   - Devuelve JSON con los parámetros del widget.

5. **Webhook `/api/wompi/webhook`**  
   - Recibe eventos de Wompi.
   - Verifica firma.
   - Actualiza estado de suscripción (o tabla de transacciones).

6. **Página de confirmación**  
   - `/checkout/success` y `/checkout/error` usando `redirect-url` de Wompi.

---

## 9. Seguridad

- **Firma de integridad**: solo en servidor.
- **Integrity secret**: nunca en frontend ni en repositorio.
- **Webhook**: verificar firma de Wompi.
- **HTTPS** en producción.

---

## 10. Recursos

- [Wompi Docs Colombia](https://docs.wompi.co/docs/colombia/inicio-rapido/)
- [Widget & Checkout Web](https://docs.wompi.co/docs/colombia/widget-checkout-web/)
- [Referencia API](https://docs.wompi.co/docs/colombia/referencia/)
- [Astro E-commerce Guide](https://docs.astro.build/en/guides/ecommerce/)
- [Comercios Wompi](https://comercios.wompi.co)
