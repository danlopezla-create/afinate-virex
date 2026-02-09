# Arquitectura afinate: Astro, Budibase, n8n, Evolution API, Supabase

## Resumen

Este documento define los parámetros para vincular la web Astro con el tablero Budibase, y el flujo de datos entre WhatsApp (Evolution API), n8n, Gemini, Supabase y los agentes Lucía, Sofía y María.

---

## 1. Infraestructura en la nube

| Servicio    | Uso principal                                      |
|------------|-----------------------------------------------------|
| **Cloudflare** | DNS, SSL, CDN para afinate.com                      |
| **Hetzner**   | VPS (ej. `afinate-ubuntu-8gb-nbg1-1`) – raíz `root@afinate-ubuntu-8gb-nbg1-1:~#` |
| **Tailscale** | VPN: Hetzner + local + Coolify                      |
| **Supabase**  | PostgreSQL, RLS, 100GB storage, APIs               |
| **Coolify**   | Orquestación Docker: n8n, Budibase, Evolution API, Astro |

---

## 2. Vincular la web Astro con el tablero Budibase

### 2.1 Dónde corre cada cosa

- **Astro (web pública)**: Puede estar en el mismo VPS vía Coolify o en otro host; dominio típico `https://afinate.com`.
- **Budibase**: Instalado en el VPS vía Coolify (Docker). Debe tener una URL pública o interna estable (ej. subdominio o puerto).

### 2.2 Parámetros para “vincular” Astro y Budibase

1. **URL del tablero Budibase**
   - En Coolify: asignar dominio o puerto al servicio Budibase (ej. `https://app.afinate.com` o `https://afinate.com:8443`).
   - En Cloudflare: crear registro DNS (CNAME o A) que apunte a la IP del VPS (o al proxy de Coolify) y configurar SSL si aplica.
   - Obtener la URL base del **cliente** de Budibase (donde los usuarios abren las apps publicadas), no la URL del builder.

2. **Embed en Astro**
   - En Budibase: publicar la app del tablero de clientes y en Settings → Embed copiar el iframe.
   - En Astro: en la página del dashboard (o la ruta donde quieras el tablero), incrustar el iframe con esa URL, por ejemplo:
     ```html
     <iframe
       src="https://app.afinate.com/embed/app/XXXXX"
       width="100%" height="800" frameborder="0"
       allow="clipboard-write" title="Tablero afinate"
     />
     ```
   - Sustituir `XXXXX` por el ID real de la app publicada (lo da Budibase al publicar/embed).

3. **Permisos en Budibase**
   - Las pantallas que se embeben deben tener **Access level: Public**.
   - Las tablas usadas en esas pantallas deben tener **Public** Read/Write (o el mínimo necesario) en “Manage access”.

4. **Autenticación**
   - Si el tablero debe ser privado (solo usuarios logueados), hay dos caminos:
     - **Opción A**: No embeber; redirigir desde Astro a la URL de Budibase (`https://app.afinate.com`) y que el usuario inicie sesión ahí (Budibase soporta OIDC/SSO en versiones self‑hosted).
     - **Opción B**: Mantener pantallas públicas solo para widgets muy limitados (ej. una tabla de solo lectura) y el resto del dashboard en rutas protegidas de Budibase.
   - Para SSO (ej. mismo usuario que en Astro), habría que configurar OIDC en Budibase y en el IdP; las cookies no se comparten entre dominio Astro y dominio Budibase por defecto.

5. **Resumen de parámetros útiles**

   | Parámetro        | Dónde definirlo        | Ejemplo / Nota |
   |------------------|------------------------|----------------|
   | URL base Budibase | Coolify + DNS          | `https://app.afinate.com` |
   | Embed URL        | Budibase → Settings → Embed | `https://app.afinate.com/embed/app/&lt;app_id&gt;` |
   | App ID           | Budibase al publicar   | UUID de la app |
   | Acceso pantallas | Budibase → Screen → Access level | Public para embed |
   | Acceso tablas    | Budibase → Data → Manage access | Public R/W según necesidad |

---

## 3. Flujo de datos: WhatsApp → Lucía → Sofía → María

### 3.1 Componentes

- **WhatsApp oficial (Meta)**: Número corporativo autorizado.
- **Evolution API**: Conecta el número con los clientes; recibe mensajes y archivos.
- **n8n**: Orquesta flujos (recibir archivo → llamar Gemini → guardar en Supabase → disparar análisis).
- **Gemini 1.5 Pro**: Extrae datos contables de documentos (fecha, tercero, descripción, monto antes de IVA, IVA, retenciones, monto neto).
- **Supabase (PostgreSQL)**: Por cliente: archivos, registros contables, estados financieros, recomendaciones.
- **Budibase**: Tablero para que el cliente (y afinate) vea sus datos; puede leer/escribir en Supabase vía conexión Budibase ↔ PostgreSQL.

### 3.2 Lucía – Asistente contable de IA

- **Entrada**: Archivos del cliente (facturas, recibos, extractos) recibidos por WhatsApp (Evolution API).
- **Proceso**:
  1. n8n recibe el webhook o evento de Evolution API cuando llega un archivo.
  2. n8n descarga el archivo y lo envía a Gemini 1.5 Pro (o a un agente que use Gemini) para extraer: fecha, tercero, descripción, monto antes de IVA, IVA, retenciones, monto neto.
  3. n8n clasifica y escribe en PostgreSQL (Supabase): tabla de documentos (archivo + metadatos) y tabla de movimientos/contabilidad por cliente.
  4. El archivo puede guardarse en Supabase Storage y la ruta en la BD.
- **Salida**: Contabilidad clasificada y almacenada por cliente en PostgreSQL (y archivo referenciado).

Las automatizaciones pueden ser:
- **Dentro de n8n**: flujos que llaman a Gemini (API) y a Supabase (HTTP o nodo Supabase).
- **Fuera de n8n**: un servicio (ej. pequeño backend en el VPS o serverless) que reciba desde n8n el archivo + metadata y devuelva la estructura contable; n8n seguiría orquestando.

### 3.3 Sofía – Analista financiero de IA

- **Entrada**: Datos ya organizados por Lucía (tablas contables en PostgreSQL por cliente).
- **Proceso**:
  1. n8n (o un cron/scheduled flow) puede ejecutar consultas a Supabase para agregar datos por cliente.
  2. Un agente o script (en n8n o externo) construye estados financieros históricos (estado de resultados, balance, flujo de caja) y proyectados.
  3. Los resultados se guardan en tablas dedicadas en Supabase (por cliente) o en archivos (PDF/JSON) referenciados en la BD.
- **Salida**: Estados financieros históricos y proyectados disponibles en la BD (y/o en el tablero Budibase).

### 3.4 María – Gerente financiero de IA

- **Entrada**: Estados financieros y datos generados por Sofía + contexto del cliente.
- **Proceso**:
  1. Lee desde Supabase los estados y métricas del cliente.
  2. Genera recomendaciones (texto o estructurado) y las guarda en una tabla “recomendaciones” o “reportes” por cliente.
- **Salida**: Recomendaciones almacenadas y mostrables en el tablero (Budibase) o vía API/WhatsApp.

---

## 4. Conexiones técnicas recomendadas

| Origen       | Destino        | Cómo |
|-------------|----------------|------|
| Evolution API | n8n          | Webhook en n8n para mensajes/archivos de WhatsApp |
| n8n         | Gemini        | HTTP Request a API de Google (Gemini 1.5 Pro) |
| n8n         | Supabase      | Nodo Supabase (PostgreSQL + Storage) o HTTP a REST API |
| Budibase    | Supabase      | Conexión “PostgreSQL” o “REST API” en Budibase al mismo proyecto Supabase |
| Astro       | Budibase      | iframe con URL de embed (solo lectura de configuración en Astro) |
| Coolify     | Hetzner       | Servicios Docker en el VPS; Tailscale para acceso seguro |

### 4.1 Variables / secretos útiles

- **Supabase**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (o anon key según permisos) para n8n y para Budibase.
- **Evolution API**: URL base y token para webhooks y envío de mensajes.
- **Gemini**: API key para llamadas desde n8n o desde un servicio intermedio.
- **Budibase**: URL pública del cliente y App ID del embed (guardados en Astro como env o en config).

---

## 5. Orden sugerido para construir

1. **Coolify + Hetzner**: Tener n8n, Evolution API, Budibase y (si aplica) Astro desplegados y accesibles.
2. **Supabase**: Crear proyecto, tablas por cliente (documentos, movimientos_contables, estados_financieros, recomendaciones), RLS y opcional Storage.
3. **Evolution API**: Configurar número de WhatsApp (Meta), webhook apuntando a n8n.
4. **n8n – Lucía**: Flujo que recibe archivo → Gemini extrae datos → escribe en Supabase.
5. **n8n – Sofía**: Flujo (programado o por evento) que lee contabilidad del cliente → genera estados financieros → escribe en Supabase.
6. **n8n – María**: Flujo que lee estados y genera recomendaciones → escribe en Supabase.
7. **Budibase**: Crear app “Tablero de clientes” conectada a Supabase, publicar y configurar embed.
8. **Astro**: Añadir ruta (ej. `/dashboard`) con iframe del embed de Budibase usando la URL y parámetros definidos arriba.

Con esto se tienen definidos los parámetros de conexión y el flujo completo para seguir construyendo el proyecto afinate de forma ordenada.
