
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

console.log("API CONTACT CARGADA");
console.log("RESEND_API_KEY existe:", Boolean(process.env.RESEND_API_KEY));
console.log("CONTACT_EMAIL existe:", Boolean(process.env.CONTACT_EMAIL));

const resend = new Resend(process.env.RESEND_API_KEY);

const projectLabels: Record<string, string> = {
  web: "Web básica",
  landing: "Landing page",
  ecommerce: "Tienda online",
  unsure: "No lo tengo claro",
};

const extraLabels: Record<string, string> = {
  seo: "SEO y posicionamiento",
  analytics: "Google Analytics",
  maintenance: "Mantenimiento web",
  content: "Carga de contenido",
  marketing: "Marketing digital",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const body = req.body ?? {};

  // Campo trampa para bots: los usuarios reales lo dejan vacío.
  if (body.website) {
    return res.status(200).json({ success: true });
  }

  const { name, email, phone, company, project, extras, message } = body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof company !== "string" ||
    typeof project !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({
      error: "Revisa los campos obligatorios.",
    });
  }

  if (
    name.length > 100 ||
    email.length > 254 ||
    phone.length > 30 ||
    company.length > 150 ||
    message.length > 5000
  ) {
    return res.status(400).json({
      error: "Alguno de los campos supera el límite permitido.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: "El email no es válido." });
  }

  if (!projectLabels[project]) {
    return res.status(400).json({ error: "Selecciona un tipo de proyecto válido." });
  }

  if (
    !Array.isArray(extras) ||
    extras.length > Object.keys(extraLabels).length ||
    !extras.every(
      (extra: unknown) =>
        typeof extra === "string" && extra in extraLabels,
    )
  ) {
    return res.status(400).json({ error: "Los extras seleccionados no son válidos." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.error("Faltan variables de entorno para el formulario.");
    return res.status(500).json({ error: "El formulario no está configurado." });
  }

  const selectedExtras = extras.length
    ? extras.map((extra: string) => extraLabels[extra]).join(", ")
    : "Ninguno seleccionado";

  try {
    const { error } = await resend.emails.send({
      from: "Tuchi Digital <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: `Nueva consulta: ${projectLabels[project]}`,
      text: [
        "Nueva consulta desde la web de Tuchi Digital",
        "",
        `Nombre: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Teléfono: ${phone.trim() || "No indicado"}`,
        `Empresa: ${company.trim() || "No indicada"}`,
        `Tipo de proyecto: ${projectLabels[project]}`,
        `Extras: ${selectedExtras}`,
        "",
        "Mensaje:",
        message.trim(),
      ].join("\n"),
    });

    if (error) {
      console.error("Error de Resend:", error);
      return res.status(502).json({
        error: "No se pudo enviar la consulta. Inténtalo más tarde.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error enviando la consulta:", error);
    return res.status(500).json({
      error: "Ocurrió un error al enviar la consulta.",
    });
  }
}
