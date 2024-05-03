//pages/api/properties.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const properties = await prisma.property.findMany({
        select: {
          id: true,
          address: true,
          agentName: true,
          agencyName: true,
          // ... other fields you want to include
        },
      });

      res.status(200).json(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'An error occurred while fetching properties.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}