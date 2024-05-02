import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const showings = await prisma.showing.findMany({
        select: {
          id: true,
          scheduledAt: true,
          property: {
            select: {
              id: true,
              address: true,
              agentName: true,
              agencyName: true,
            },
          },
        },
      });

      res.status(200).json(showings);
    } catch (error) {
      console.error('Error fetching showings:', error);
      res.status(500).json({ error: 'An error occurred while fetching showings.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}