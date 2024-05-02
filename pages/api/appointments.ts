import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const { propertyId, scheduledAt, agentName, agentCompany } = req.body;
  
        // Create a new appointment in the database
        const appointment = await prisma.showing.create({
          data: {
            propertyId: parseInt(propertyId),
            scheduledAt: new Date(scheduledAt),
            agentName: agentName || '',
            agentCompany: agentCompany || '',
          },
        });
  
        res.status(201).json(appointment);
      } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'An error occurred while creating the appointment.' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed.' });
    }
  }