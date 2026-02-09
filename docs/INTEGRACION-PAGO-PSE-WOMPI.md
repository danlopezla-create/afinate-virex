# Integración PSE con Wompi – Plan PYME y Plan ERP

## Objetivo

- **Plan PYME**: Al hacer clic en "Adquiérelo ya" en la página de precio, el cliente inicia de inmediato el proceso de pago (PSE, tarjetas débito/crédito) de forma virtual mediante Wompi.
- **Plan ERP**: El cliente envía requerimientos → afinate responde con demo personalizada y cotización → si el cliente acepta, paga la cotización mediante PSE (y/o tarjetas) de forma virtual.

Todo el pago debe ser 100% virtual (Widget o Checkout Web de Wompi).

---

## 1. Configuraciones y conexiones necesarias (Wompi)

### 1.1 Cuenta y llaves

- **Registro**: [comercios.wompi.co](https://comercios.wompi.co) – cuenta de comercio.
- **Llaves** (en Dashboard → Developers):
  - **Public key** (frontend): `pub_prod_...` o `pub_test_...` para sandbox.
  - **Private key** (solo backend): para consultar transacciones y/o API completa.
  - **Integrity secret** (solo backend): en "Secrets for technical integration" – **nunca** en frontend; se usa para generar la firma de integridad.

### 1.2 Eventos (Webhook)

- En el Dashboard de Wompi configurar la **URL de eventos** (webhook) de tu backend, por ejemplo:
  - Producción: `https://afinate.com/api/wompi/webhook`
  - Debe ser HTTPS y accesible desde internet.
- Wompi enviará un POST con el estado de la transacción (APPROVED, DECLINED, etc.). **Siempre** validar el pago por evento/webhook, no solo por la redirección del usuario.

### 1.3 PSE en la transacción

- En Colombia, Wompi permite PSE además de tarjetas. Para **Widget** o **Checkout Web** no hace falta enviar un `payment_method` específico: el usuario elige PSE o tarjeta en la pantalla de Wompi.
- Si usas **API directa** (`POST /v1/transactions`) para crear la transacción con PSE, el cuerpo debe incluir algo como:
  - `payment_method.type`: `"PSE"`
  - `payment_method.user_type`: `0` (persona) o `1` (empresa)
  - `payment_method.user_legal_id_type`: `"CC"` o `"NIT"`
  - `payment_method.user_legal_id`: número de documento
  - `payment_method.financial_institution_code`: código del banco (en sandbox suele usarse `"1"` aprobado, `"2"` rechazado).
- Para el flujo "Adquiérelo ya" (Plan PYME) lo más simple es usar **Widget** o **Checkout Web**: el usuario elige PSE o tarjeta en Wompi.

---

## 2. Flujo Plan PYME – "Adquiérelo ya"

1. **Página de precio** (`/pricing`): el usuario hace clic en "Adquiérelo ya" del plan PYME.
2. **Redirección o apertura de checkout**:
   - **Opción A – Checkout Web (form GET)**  
     Enlazar a una ruta que construya el formulario con:
     - `public-key`, `currency` (COP), `amount-in-cents` (ej. 49000000 para COP 490.000), `reference` (única por transacción), `signature:integrity` (generada en servidor), y opcional `redirect-url`.
   - **Opción B – Widget**  
     Llevar al usuario a una página de checkout (ej. `/checkout?plan=pyme`) que cargue el script de Wompi y, con datos obtenidos de un API (referencia, monto, firma), abra el widget.
3. **Backend (Astro API o servidor)**:
   - Endpoint que genere `reference` única (UUID o id interno).
   - Calcule `amount_in_cents` (ej. 49000000 para plan PYME mensual).
   - Genere la firma: `SHA256(reference + amount_in_cents + "COP" + integrity_secret)`.
   - Devuelva al frontend: `publicKey`, `reference`, `amountInCents`, `signature`, y opcional `redirectUrl` (ej. `/pricing/gracias?id=...`).
4. **Tras el pago**: Wompi redirige a `redirect-url` (si se configuró) y envía el evento al webhook. El backend debe actualizar el estado del usuario (suscripción PYME activa) al recibir el evento APPROVED.

---

## 3. Flujo Plan ERP – Demo + Cotización + Pago

1. **Solicitud**: El cliente va a "Solicitar demo" (ej. `/demo`) y envía requerimientos (formulario con datos de contacto, ERP actual, necesidades, etc.).
2. **Proceso interno afinate**: Se prepara demo personalizada y cotización (mensualidad, etc.).
3. **Respuesta al cliente**: Se envía al cliente la demo (acceso o enlace) y la cotización con monto en COP.
4. **Pago**: Si el cliente acepta, se le envía un **enlace de pago único** (Payment Link de Wompi o página de checkout con referencia única para esa cotización). El cliente paga por PSE o tarjeta de forma virtual.
5. **Webhook**: Al recibir APPROVED para esa referencia, se activa el acceso ERP para ese cliente y se marca la cotización como pagada.

Recomendación: usar **Payment Links** de Wompi (`POST /v1/payment_links`) para generar enlaces por cotización, o un endpoint propio que genere referencia + firma y muestre Checkout Web/Widget con el monto de la cotización.

---

## 4. Pasos técnicos recomendados en este repositorio

1. **Variables de entorno** (servidor/backend):
   - `WOMPI_PUBLIC_KEY`
   - `WOMPI_INTEGRITY_SECRET` (nunca en frontend)
   - `WOMPI_ENV` = `sandbox` | `production`

2. **Endpoint de preparación de checkout** (ej. `src/pages/api/wompi/checkout.ts` o similar):
   - Recibir: `plan` (pyme | erp) y, para ERP, `quote_id` o identificador de cotización.
   - Generar `reference`, calcular `amount_in_cents`, generar firma con `WOMPI_INTEGRITY_SECRET`.
   - Devolver JSON con los datos necesarios para el Widget o para construir el form de Checkout Web.

3. **Página de checkout** (ej. `/checkout`):
   - Para PYME: obtener datos del API y abrir Widget o enviar form a Checkout Web.
   - Para ERP: mismo flujo pero con monto y referencia asociados a la cotización.

4. **Webhook** (ej. `src/pages/api/wompi/webhook.ts`):
   - Recibir POST de Wompi, validar origen/firma si aplica, leer estado de la transacción.
   - Si estado APPROVED: actualizar Supabase (o BD) para activar plan del cliente (PYME o ERP) según la referencia.

5. **Botón "Adquiérelo ya"** en `pricing.astro`: en lugar de `href="/register"`, usar un enlace a `/checkout?plan=pyme` (o llamar a un endpoint que devuelva la URL del checkout con parámetros). El checkout debe ser la única entrada al pago (todo virtual).

Con esto se deja listo el flujo para iniciar las integraciones: front (botón + página checkout) + backend (firma, webhook, actualización de estado por plan).
