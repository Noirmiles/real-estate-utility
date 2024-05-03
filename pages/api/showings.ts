// pages/api/showings.ts
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
          propertyId: true,
          agentName: true,
          agentCompany: true,
          clientName: true,
          clientEmail: true,
        },
      });

      const propertyIds = showings.map((showing) => showing.propertyId);

      const properties = await prisma.property.findMany({
        where: {
          id: {
            in: propertyIds,
          },
        },
        select: {
          id: true,
          address: true,
          agentName: true,
          agencyName: true,
        },
      });

      const showingsWithProperty = showings.map((showing) => {
        const property = properties.find((prop) => prop.id === showing.propertyId);
        return {
          ...showing,
          property: property || null,
        };
      });

      res.status(200).json(showingsWithProperty);
    } catch (error) {
      console.error('Error fetching showings:', error);
      res.status(500).json({ error: 'An error occurred while fetching showings.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}