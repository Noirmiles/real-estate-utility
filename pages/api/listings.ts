// pages/api/listings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const listings = await prisma.property.findMany();
      res.status(200).json(listings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({ error: 'An error occurred while fetching the listings.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.property.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: 'Listing deleted successfully.' });
    } catch (error) {
      console.error('Error deleting listing:', error);
      res.status(500).json({ error: 'An error occurred while deleting the listing.' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const updatedData = req.body;
      const updatedListing = await prisma.property.update({
        where: { id: Number(id) },
        data: updatedData,
      });
      res.status(200).json(updatedListing);
    } catch (error) {
      console.error('Error updating listing:', error);
      res.status(500).json({ error: 'An error occurred while updating the listing.' });
    }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
        }
}
