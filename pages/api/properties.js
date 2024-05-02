// pages/api/properties.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const properties = await prisma.property.findMany({
        select: {
          id: true,
          address: true,
        },
      });
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}