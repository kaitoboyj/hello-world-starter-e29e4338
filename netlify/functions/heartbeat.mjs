// Netlify Scheduled Function — posts an "active" heartbeat to the bot's Telegram
// group every 30 minutes so the operator can tell the bot is still running.

export const config = {
  schedule: "*/30 * * * *",
};

function formatLagosTime(date) {
  return date.toLocaleString("en-GB", {
    timeZone: "Africa/Lagos",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default async function handler() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_GROUP_CHAT_ID;

  if (!token || !chatId) {
    console.error("heartbeat: TELEGRAM_BOT_TOKEN or TELEGRAM_GROUP_CHAT_ID is missing");
    return new Response(JSON.stringify({ ok: false, error: "missing config" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const text = `✅ <b>Bot is active</b>\n🕒 ${formatLagosTime(new Date())} (WAT)`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      text,
    }),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok || body.ok === false) {
    console.error(`heartbeat: sendMessage failed [${res.status}]: ${JSON.stringify(body)}`);
    return new Response(JSON.stringify({ ok: false, status: res.status, body }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  console.log(`heartbeat: sent to ${chatId}`);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
