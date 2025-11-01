import axios from 'axios';
import { WHATSAPP_TOKEN } from '../config/env.js';

export const sendWhatsAppMessage = async (to, text) => {
  await axios.post(
    `https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      text: { body: text },
    },
    { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
  );
};
